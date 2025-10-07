// src/hooks/useFirebase.js
import { useEffect, useState } from 'react';
import {
  currentUserId,
  getCurrentUserProfile,
  listenAppointments,
  listenReminders,
  getAppointmentsCached,
  getRemindersCached,
} from '../api/firebaseService';

export function useUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getCurrentUserProfile();
      if (mounted) setUser(u);
    })();
    return () => (mounted = false);
  }, []);
  return { user, setUser };
}

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const uid = currentUserId();
    if (!uid) return;
    // optimistic: load cached first
    (async () => {
      const cached = await getAppointmentsCached(uid);
      if (cached && cached.length) setAppointments(cached);
    })();

    const unsub = listenAppointments(uid, items => setAppointments(items));
    return () => unsub && unsub();
  }, []);
  return { appointments, setAppointments };
}

export function useReminders() {
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    const uid = currentUserId();
    if (!uid) return;
    (async () => {
      const cached = await getRemindersCached(uid);
      if (cached && cached.length) setReminders(cached);
    })();

    const unsub = listenReminders(uid, items => setReminders(items));
    return () => unsub && unsub();
  }, []);
  return { reminders, setReminders };
}
// Usage: Call these hooks in your components to get real-time data with caching
// e.g. const { user } = useUser(); const { appointments } = useAppointments();
