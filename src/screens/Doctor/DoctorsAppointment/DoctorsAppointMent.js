<<<<<<< HEAD
//Doctor appointment page


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './DoctorsAppointmentStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db, auth } from '../../../api/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const AppointmentRow = ({ appt, onAction }) => (
  <View style={styles.apptCard}>
    <View>
      <Text style={styles.apptPatient}>{appt.patientName ?? 'Patient'}</Text>
      <Text style={styles.apptMeta}>{appt.when?.toDate ? appt.when.toDate().toLocaleString() : new Date().toLocaleString()}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={[styles.status, { color: appt.status === 'pending' ? '#f59e0b' : appt.status === 'cancelled' ? '#ef4444' : '#10b981' }]}>{appt.status ?? 'pending'}</Text>
      {appt.status === 'pending' && (
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <TouchableOpacity style={styles.acceptBtn} onPress={() => onAction(appt, 'confirm')}><Text style={{ color: '#fff' }}>Accept</Text></TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn} onPress={() => onAction(appt, 'cancel')}><Text style={{ color: '#fff' }}>Reject</Text></TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);

const DoctorAppointments = () => {
=======
// DoctorAppointmentsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db, auth } from '../../../api/firebaseConfig';
import styles from './DoctorAppointmentsStyle';

const AppointmentRow = ({ appt, onAction }) => {
  const statusColor =
    appt.status === 'pending'
      ? '#f59e0b'
      : appt.status === 'cancelled'
      ? '#ef4444'
      : '#10b981';

  return (
    <View style={styles.apptCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.apptPatient}>{appt.patientName ?? 'Patient'}</Text>
        <Text style={styles.apptMeta}>
          {appt.when?.toDate
            ? appt.when.toDate().toLocaleString()
            : new Date().toLocaleString()}
        </Text>
        {appt.reason ? (
          <Text style={styles.reasonText}>Reason: {appt.reason}</Text>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.status, { color: statusColor }]}>
          {appt.status ?? 'pending'}
        </Text>

        {appt.status === 'pending' && (
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => onAction(appt, 'confirmed')}
            >
              <Text style={{ color: '#fff' }}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectBtn}
              onPress={() => onAction(appt, 'cancelled')}
            >
              <Text style={{ color: '#fff' }}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const DoctorAppointmentsScreen = () => {
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
<<<<<<< HEAD
    if (!user) return setLoading(false);

    const ref = collection(db, 'appointments');
    const q = query(ref, where('doctorId', '==', user.uid), orderBy('when', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(s => arr.push({ id: s.id, ...s.data() }));
      setAppointments(arr);
      setLoading(false);
    }, err => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
=======
    if (!user) {
      Alert.alert('Error', 'No doctor logged in.');
      setLoading(false);
      return;
    }

    const ref = collection(db, 'appointments');
    const q = query(
      ref,
      where('doctorId', '==', user.uid),
      orderBy('when', 'desc'),
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const list = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        setAppointments(list);
        setLoading(false);
      },
      error => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch appointments.');
        setLoading(false);
      },
    );

    return () => unsubscribe();
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
  }, []);

  const handleAction = async (appt, action) => {
    try {
      await updateDoc(doc(db, 'appointments', appt.id), { status: action });
<<<<<<< HEAD
  Alert.alert('Success', `Appointment ${action}`);

    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not update appointment');
    }
  };

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#0f766e" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Appointments</Text></View>
      <FlatList data={appointments} keyExtractor={i => i.id} renderItem={({ item }) => <AppointmentRow appt={item} onAction={handleAction} />} contentContainerStyle={{ padding: 16 }} />
=======
      const readable =
        action === 'confirmed'
          ? 'Appointment confirmed'
          : 'Appointment cancelled';
      Alert.alert('Success', readable);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not update appointment.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="calendar-month" size={26} color="#007AFF" />
        <Text style={styles.title}>My Appointments</Text>
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="calendar-remove" size={50} color="#999" />
          <Text style={styles.emptyText}>No appointments yet</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AppointmentRow appt={item} onAction={handleAction} />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    </SafeAreaView>
  );
};

<<<<<<< HEAD
export default DoctorAppointments;
=======
export default DoctorAppointmentsScreen;
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
