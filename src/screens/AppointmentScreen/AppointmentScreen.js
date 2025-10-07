import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './AppointmentScreenstyle';

export default function AppointmentScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    // 🔹 Real-time listener for user's appointments (offline + sync)
    const unsubscribe = firestore()
      .collection('appointments')
      .where('userId', '==', user.uid)
      .onSnapshot(
        snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAppointments(data);
          setLoading(false);
        },
        error => {
          console.error('Error fetching appointments:', error);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  // Handle empty state
  if (!appointments || appointments.length === 0) {
    return (
      <LinearGradient colors={['#eef2f3', '#f8fbff']} style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header}>My Appointments</Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons name="calendar-outline" size={60} color="#ccc" />
          <Text style={{ marginTop: 10, color: '#777' }}>
            No appointments found.
          </Text>
        </View>
      </LinearGradient>
    );
  }

  // Split into next and upcoming appointments
  const sortedAppointments = appointments.sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const nextAppointment = sortedAppointments[0];
  const upcomingAppointments = sortedAppointments.slice(1);

  return (
    <LinearGradient colors={['#eef2f3', '#f8fbff']} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>My Appointments</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Next Appointment Card */}
        <View style={styles.card}>
          <Ionicons name="calendar-outline" size={36} color="#667eea" />
          <Text style={styles.title}>Your Next Appointment</Text>
          <Text style={styles.date}>{nextAppointment.date}</Text>
          <Text style={styles.time}>{nextAppointment.time}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="person-circle-outline" size={22} color="#444" />
            <Text style={styles.detail}>
              {nextAppointment.doctor || 'Dr. Unknown'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="heart-outline" size={22} color="#e53935" />
            <Text style={styles.detail}>
              {nextAppointment.type || 'Antenatal Visit'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={22} color="#0288d1" />
            <Text style={styles.detail}>
              {nextAppointment.location || 'Clinic'}
            </Text>
          </View>

          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderText}>Set Reminder ⏰</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointments Timeline */}
        <Text style={styles.subHeader}>Upcoming Appointments</Text>
        {upcomingAppointments.map(appt => (
          <View key={appt.id} style={styles.timelineCard}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{appt.date}</Text>
              <Text style={styles.timelineTime}>{appt.time}</Text>
              <Text style={styles.timelineType}>
                {appt.type || 'Antenatal Visit'}
              </Text>
              <Text style={styles.timelineDoctor}>
                {appt.doctor || 'Doctor'}
              </Text>
              <Text style={styles.timelineLocation}>
                {appt.location || 'Clinic'}
              </Text>
            </View>
          </View>
        ))}

        {/* Tip Section */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={24} color="#ffa000" />
          <Text style={styles.tipText}>
            Don’t forget to rest well before your check-ups and keep a small
            notebook to track your questions.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
