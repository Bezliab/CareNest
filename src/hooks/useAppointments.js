// src/hooks/useAppointments.js
import { useEffect, useState, useRef } from "react";
import firestore from "@react-native-firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { pushPendingOpGeneric, getLocalList, saveLocalList, flushPendingOps } from "../Services/syncServices";
import auth from "@react-native-firebase/auth";

const LOCAL_KEY = "@CareNest:appointments_local";
const OPS_KEY = "@CareNest:appointment_ops";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const colRef = firestore().collection("users").doc(user.uid).collection("appointments");

    unsubscribeRef.current = colRef.onSnapshot(
      async (snap) => {
        const items = [];
        snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
        if (!isMounted) return;
        setAppointments(items);
        await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(items));
        setLoading(false);
      },
      async (err) => {
        console.warn("appointments snapshot error:", err);
        const cached = await getLocalList(LOCAL_KEY);
        if (isMounted) {
          setAppointments(cached);
          setLoading(false);
        }
      }
    );

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

  const addAppointment = async (payload) => {
    const user = auth().currentUser;
    if (!user) throw new Error("No user");
    const id = payload.id || uuidv4();
    const col = firestore().collection("users").doc(user.uid).collection("appointments");

    const newItem = { id, ...payload };
    const local = await getLocalList(LOCAL_KEY);
    const newLocal = [newItem, ...local];
    await saveLocalList(LOCAL_KEY, newLocal);
    setAppointments(newLocal);

    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        await col.doc(id).set(payload);
      } catch (err) {
        await pushPendingOpGeneric(OPS_KEY, { op: "add", id, payload });
      }
    } else {
      await pushPendingOpGeneric(OPS_KEY, { op: "add", id, payload });
    }
    return id;
  };

  const updateAppointment = async (id, updates) => {
    const user = auth().currentUser;
    if (!user) throw new Error("No user");
    const docRef = firestore().collection("users").doc(user.uid).collection("appointments").doc(id);

    const local = await getLocalList(LOCAL_KEY);
    const updatedLocal = local.map((it) => (it.id === id ? { ...it, ...updates } : it));
    await saveLocalList(LOCAL_KEY, updatedLocal);
    setAppointments(updatedLocal);

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

  const deleteAppointment = async (id) => {
    const user = auth().currentUser;
    if (!user) throw new Error("No user");

    const local = await getLocalList(LOCAL_KEY);
    const newLocal = local.filter((it) => it.id !== id);
    await saveLocalList(LOCAL_KEY, newLocal);
    setAppointments(newLocal);

    const net = await NetInfo.fetch();
    if (net.isConnected) {
      try {
        await firestore().collection("users").doc(user.uid).collection("appointments").doc(id).delete();
      } catch (err) {
        await pushPendingOpGeneric(OPS_KEY, { op: "delete", id });
      }
    } else {
      await pushPendingOpGeneric(OPS_KEY, { op: "delete", id });
    }
  };

  return {
    appointments,
    loading,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
