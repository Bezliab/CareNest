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
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
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
  }, []);

  const handleAction = async (appt, action) => {
    try {
      await updateDoc(doc(db, 'appointments', appt.id), { status: action });
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
    </SafeAreaView>
  );
};

export default DoctorAppointmentsScreen;
