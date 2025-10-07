// src/services/syncService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const REMINDERS_KEY = "@CareNest:reminders";
const REMINDERS_OPS_KEY = "@CareNest:reminder_ops"; // pending ops while offline
const APPOINTMENTS_KEY = "@CareNest:appointments";
const APPOINTMENTS_OPS_KEY = "@CareNest:appointment_ops";

const userCollection = (uid) => firestore().collection("users").doc(uid);

// helper: store local list
export const saveLocalList = async (key, list = []) => {
  await AsyncStorage.setItem(key, JSON.stringify(list));
};

// helper: get local list
export const getLocalList = async (key) => {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

// pending ops format: { op: 'add'|'update'|'delete', collection: 'reminders'|'appointments', id, payload }
export const pushPendingOp = async (op) => {
  const ops = await getLocalList(REMINDERS_OPS_KEY);
  ops.push(op);
  await AsyncStorage.setItem(REMINDERS_OPS_KEY, JSON.stringify(ops));
};

export const pushPendingOpGeneric = async (opKey, op) => {
  const ops = await getLocalList(opKey);
  ops.push(op);
  await AsyncStorage.setItem(opKey, JSON.stringify(ops));
};

export const flushPendingOps = async (uid) => {
  // Try reminders ops then appointments ops
  const reminderOpsRaw = await AsyncStorage.getItem(REMINDERS_OPS_KEY);
  const apptOpsRaw = await AsyncStorage.getItem(APPOINTMENTS_OPS_KEY);

  const reminderOps = reminderOpsRaw ? JSON.parse(reminderOpsRaw) : [];
  const apptOps = apptOpsRaw ? JSON.parse(apptOpsRaw) : [];

  const userDoc = userCollection(uid).collection("meta"); // adjust if storing under user/doc/collection
  // For this code we will write reminders under users/{uid}/reminders collection
  const remindersCol = firestore().collection("users").doc(uid).collection("reminders");
  const apptsCol = firestore().collection("users").doc(uid).collection("appointments");

  // apply ops in order
  try {
    for (const op of reminderOps) {
      if (op.op === "add") {
        await remindersCol.doc(op.id).set(op.payload);
      } else if (op.op === "update") {
        await remindersCol.doc(op.id).update(op.payload);
      } else if (op.op === "delete") {
        await remindersCol.doc(op.id).delete();
      }
    }
    for (const op of apptOps) {
      if (op.op === "add") {
        await apptsCol.doc(op.id).set(op.payload);
      } else if (op.op === "update") {
        await apptsCol.doc(op.id).update(op.payload);
      } else if (op.op === "delete") {
        await apptsCol.doc(op.id).delete();
      }
    }

    // clear ops on success
    await AsyncStorage.removeItem(REMINDERS_OPS_KEY);
    await AsyncStorage.removeItem(APPOINTMENTS_OPS_KEY);
    return true;
  } catch (err) {
    console.warn("Error flushing ops:", err);
    return false;
  }
};

// Listen for connectivity and auto-flush
export const watchConnectivityAndSync = (uid) => {
  const unsubscribe = NetInfo.addEventListener(async (state) => {
    if (state.isConnected && uid) {
      await flushPendingOps(uid);
    }
  });
  return unsubscribe;
};
