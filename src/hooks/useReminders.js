// src/hooks/useReminders.js
import { useEffect, useState, useRef } from "react";
import firestore from "@react-native-firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // npm i uuid
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { pushPendingOpGeneric, getLocalList, saveLocalList, flushPendingOps } from "../Services/syncService";
import auth from "@react-native-firebase/auth";

const LOCAL_KEY = "@CareNest:reminders_local";
const OPS_KEY = "@CareNest:reminder_ops";

export default function useReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const colRef = firestore().collection("users").doc(user.uid).collection("reminders");

    // Subscribe to Firestore changes
    unsubscribeRef.current = colRef.onSnapshot(
      async (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (!isMounted) return;
        setReminders(items);
        await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(items));
        setLoading(false);
      },
      async (err) => {
        // network or permission error -> load from cache
        console.warn("reminders snapshot error:", err);
        const cached = await getLocalList(LOCAL_KEY);
        if (isMounted) {
          setReminders(cached);
          setLoading(false);
        }
      }
    );

    // On connectivity restore attempt to flush any pending ops
    const netUnsub = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await flushPendingOps(user.uid);
      }
    });

    return () => {
      isMounted = false;
      if (unsubscribeRef.current) unsubscribeRef.current();
      netUnsub();
    };
  }, []);

  // helper to add reminder (offline-first)
  const addReminder = async (payload) => {
    const user = auth().currentUser;
    if (!user) throw new Error("No user");
    const id = payload.id || uuidv4();
    const docRef = firestore().collection("users").doc(user.uid).collection("reminders").doc(id);

    // optimistically update local cache & state
    const newItem = { id, ...payload };
    const local = await getLocalList(LOCAL_KEY);
    const newLocal = [newItem, ...local];
    await saveLocalList(LOCAL_KEY, newLocal);
    setReminders((r) => [newItem, ...r]);

    // attempt write to Firestore
    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        await docRef.set(payload);
      } catch (err) {
        console.warn("Firestore add failed, queueing op:", err);
        await pushPendingOpGeneric(OPS_KEY, { op: "add", id, payload });
      }
    } else {
      await pushPendingOpGeneric(OPS_KEY, { op: "add", id, payload });
    }
    return id;
  };

  const updateReminder = async (id, updates) => {
    const user = auth().currentUser;
    if (!user) throw new Error("No user");
    const docRef = firestore().collection("users").doc(user.uid).collection("reminders").doc(id);

    // update local
    const local = await getLocalList(LOCAL_KEY);
    const updatedLocal = local.map((it) => (it.id === id ? { ...it, ...updates } : it));
    await saveLocalList(LOCAL_KEY, updatedLocal);
    setReminders(updatedLocal);

    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        await docRef.update(updates);
      } catch (err) {
        await pushPendingOpGeneric(OPS_KEY, { op: "update", id, payload: updates });
      }
    } else {
      await pushPendingOpGeneric(OPS_KEY, { op: "update", id, payload: updates });
    }
  };

  const deleteReminder = async (id) => {
    const user = auth().currentUser;
    if (!user) throw new Error("No user");
    const docRef = firestore().collection("users").doc(user.uid).collection("reminders").doc(id);

    // update local
    const local = await getLocalList(LOCAL_KEY);
    const newLocal = local.filter((it) => it.id !== id);
    await saveLocalList(LOCAL_KEY, newLocal);
    setReminders(newLocal);

    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        await docRef.delete();
      } catch (err) {
        await pushPendingOpGeneric(OPS_KEY, { op: "delete", id });
      }
    } else {
      await pushPendingOpGeneric(OPS_KEY, { op: "delete", id });
    }
  };

  return {
    reminders,
    loading,
    addReminder,
    updateReminder,
    deleteReminder,
  };
}
