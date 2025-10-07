//Doctor appointment page


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './DoctorAppointmentsStyle';
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
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
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
  }, []);

  const handleAction = async (appt, action) => {
    try {
      await updateDoc(doc(db, 'appointments', appt.id), { status: action });
      Alert.alert('Success', Appointment ${action});
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
    </SafeAreaView>
  );
};

export default DoctorAppointments;
