// src/services/reminderService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const REMINDER_CACHE = "cached_reminders";


export async function getReminders() {
  try {
    const user = auth().currentUser;
    if (!user) return [];

    const snapshot = await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("reminders")
      .orderBy("date", "asc")
      .get();

    const reminders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));


    await AsyncStorage.setItem(REMINDER_CACHE, JSON.stringify(reminders));
    return reminders;
  } catch (error) {
    console.log("⚠️ Offline mode: loading cached reminders...");
    const cached = await AsyncStorage.getItem(REMINDER_CACHE);
    return cached ? JSON.parse(cached) : [];
  }
}


export async function addReminder(reminder) {
  const user = auth().currentUser;
  if (!user) return;

  const ref = firestore().collection("users").doc(user.uid).collection("reminders");
  const docRef = await ref.add({
    ...reminder,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  // Update local cache
  const reminders = await getReminders();
  reminders.push({ id: docRef.id, ...reminder });
  await AsyncStorage.setItem(REMINDER_CACHE, JSON.stringify(reminders));

  return docRef.id;
}


export async function toggleReminder(id, completed) {
  const user = auth().currentUser;
  if (!user) return;

  await firestore()
    .collection("users")
    .doc(user.uid)
    .collection("reminders")
    .doc(id)
    .update({ completed });
}

/** Delete reminder */
export async function deleteReminder(id) {
  const user = auth().currentUser;
  if (!user) return;

  await firestore()
    .collection("users")
    .doc(user.uid)
    .collection("reminders")
    .doc(id)
    .delete();

  // Update cache
  const reminders = await getReminders();
  const filtered = reminders.filter((r) => r.id !== id);
  await AsyncStorage.setItem(REMINDER_CACHE, JSON.stringify(filtered));
}
