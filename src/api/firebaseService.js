// src/api/firebaseService_rnf.js
// Uses react-native-firebase (native) APIs
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

/*
  NOTES:
  - This file uses react-native-firebase (native). Ensure these packages installed:
    @react-native-firebase/app
    @react-native-firebase/auth
    @react-native-firebase/firestore
    @react-native-firebase/storage
  - Firestore persistence in RN native SDK is handled by default.
*/

const CACHE_KEYS = {
  APPOINTMENTS: uid => `appointments:${uid}`,
  REMINDERS: uid => `reminders:${uid}`,
  USER: uid => `user:${uid}`,
};

async function writeCache(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Cache write failed', e.message);
  }
}
async function readCache(key) {
  try {
    const s = await AsyncStorage.getItem(key);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.warn('Cache read failed', e.message);
    return null;
  }
}

/* ---------------- User ---------------- */
export async function getUser(uid) {
  const snap = await firestore().collection('users').doc(uid).get();
  if (snap.exists) {
    const data = snap.data();

    // Auto compute pregnancy progress if data available
    if (data.expectedDeliveryDate) {
      const progress = calculatePregnancyProgress(data.expectedDeliveryDate);
      data.pregnancyProgress = progress;
    }

    await writeCache(CACHE_KEYS.USER(uid), data);
    return data;
  }
  return null;
}

export async function updateUser(uid, data) {
  await firestore()
    .collection('users')
    .doc(uid)
    .update({
      ...data,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}

/* ---------------- Pregnancy ---------------- */
export async function savePregnancyDetails(
  uid,
  { expectedDeliveryDate, lastPeriodDate },
) {
  const data = {
    expectedDeliveryDate: expectedDeliveryDate
      ? new Date(expectedDeliveryDate).toISOString()
      : null,
    lastPeriodDate: lastPeriodDate
      ? new Date(lastPeriodDate).toISOString()
      : null,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  await firestore().collection('users').doc(uid).update(data);
  await writeCache(CACHE_KEYS.USER(uid), data);
  return data;
}

/**
 * Calculates pregnancy progress given an expected delivery date.
 * Returns: { weeks, days, remainingDays, progressPercent }
 */
export function calculatePregnancyProgress(expectedDeliveryDate) {
  if (!expectedDeliveryDate) return null;

  const today = new Date();
  const edd = new Date(expectedDeliveryDate);
  const conceptionStart = new Date(edd);
  conceptionStart.setDate(edd.getDate() - 280); // 40 weeks earlier

  const totalDays = 280;
  const elapsedDays = Math.max(
    0,
    Math.min(
      totalDays,
      Math.floor((today - conceptionStart) / (1000 * 60 * 60 * 24)),
    ),
  );
  const remainingDays = totalDays - elapsedDays;

  const weeks = Math.floor(elapsedDays / 7);
  const days = elapsedDays % 7;
  const progressPercent = Math.round((elapsedDays / totalDays) * 100);

  return { weeks, days, remainingDays, progressPercent };
}

/* ---------------- Appointments ---------------- */
export async function addAppointment(uid, appointment) {
  const docRef = await firestore()
    .collection('appointments')
    .add({
      userId: uid,
      ...appointment,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
}

export async function getAppointments(uid, { limitCount = 50 } = {}) {
  const q = await firestore()
    .collection('appointments')
    .where('userId', '==', uid)
    .orderBy('createdAt', 'desc')
    .limit(limitCount)
    .get();

  const items = q.docs.map(d => ({ id: d.id, ...d.data() }));
  await writeCache(CACHE_KEYS.APPOINTMENTS(uid), items);
  return items;
}

export function listenAppointments(uid, onUpdate, onError) {
  const unsub = firestore()
    .collection('appointments')
    .where('userId', '==', uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      snapshot => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        writeCache(CACHE_KEYS.APPOINTMENTS(uid), items);
        onUpdate(items);
      },
      err => {
        console.error('listenAppointments error', err);
        onError && onError(err);
      },
    );
  return unsub;
}

/* ---------------- Reminders ---------------- */
export async function addReminder(uid, reminder) {
  const docRef = await firestore()
    .collection('reminders')
    .add({
      userId: uid,
      ...reminder,
      sentStatus: 'pending',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
}

export async function getReminders(uid) {
  const q = await firestore()
    .collection('reminders')
    .where('userId', '==', uid)
    .orderBy('scheduledAt', 'asc')
    .get();

  const items = q.docs.map(d => ({ id: d.id, ...d.data() }));
  await writeCache(CACHE_KEYS.REMINDERS(uid), items);
  return items;
}

export function listenReminders(uid, onUpdate, onError) {
  const unsub = firestore()
    .collection('reminders')
    .where('userId', '==', uid)
    .orderBy('scheduledAt', 'asc')
    .onSnapshot(
      snapshot => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        writeCache(CACHE_KEYS.REMINDERS(uid), items);
        onUpdate(items);
      },
      err => {
        console.error('listenReminders error', err);
        onError && onError(err);
      },
    );
  return unsub;
}

/* ---------------- Health Records ---------------- */
export async function addHealthRecord(uid, record) {
  const docRef = await firestore()
    .collection('health_records')
    .add({
      userId: uid,
      ...record,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
}

export async function updateHealthRecord(recordId, data) {
  await firestore()
    .collection('health_records')
    .doc(recordId)
    .update({
      ...data,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}

/* ---------------- Emergencies ---------------- */
export async function triggerEmergency(uid, emergencyPayload = {}) {
  const docRef = await firestore()
    .collection('emergencies')
    .add({
      userId: uid,
      ...emergencyPayload,
      status: 'triggered',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
}

/* ---------------- Generic helpers ---------------- */
export async function updateDocument(collectionName, docId, data) {
  await firestore()
    .collection(collectionName)
    .doc(docId)
    .update({
      ...data,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}
export async function deleteDocument(collectionName, docId) {
  await firestore().collection(collectionName).doc(docId).delete();
}

/* ---------------- Cache getters ---------------- */
export async function getAppointmentsCached(uid) {
  return (await readCache(CACHE_KEYS.APPOINTMENTS(uid))) || [];
}
export async function getRemindersCached(uid) {
  return (await readCache(CACHE_KEYS.REMINDERS(uid))) || [];
}
export async function getUserCached(uid) {
  return (await readCache(CACHE_KEYS.USER(uid))) || null;
}

/* ---------------- Convenience ---------------- */
export const currentUserId = () => auth().currentUser?.uid || null;
export async function getCurrentUserProfile() {
  const uid = currentUserId();
  if (!uid) return null;
  const u = await getUser(uid);
  return u;
}
