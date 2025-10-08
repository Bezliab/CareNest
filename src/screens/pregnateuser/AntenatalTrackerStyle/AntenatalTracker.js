import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../../../utils/themeContext';

export default function AntenatalJourneyScreen({ route }) {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const dynamicStyles = {
    backgroundColor: isDark ? '#121212' : '#fff',
    color: isDark ? '#fff' : '#000',
    inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
    borderColor: isDark ? '#333' : '#ddd',
  };
  const [appointments, setAppointments] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [gestationalWeeks, setGestationalWeeks] = useState(24); // example: 24 weeks
  const [trimester, setTrimester] = useState('Second Trimester');

  const userId = route?.params?.userId || 'demoUser';

  useEffect(() => {
    // Determine trimester based on weeks
    if (gestationalWeeks <= 12) setTrimester('First Trimester');
    else if (gestationalWeeks <= 28) setTrimester('Second Trimester');
    else setTrimester('Third Trimester');

    const unsubscribe = firestore()
      .collection('appointments')
      .where('userId', '==', userId)
      .orderBy('date', 'asc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);

        const today = new Date();
        const upcoming = data.find(
          a => new Date(a.date) >= today && a.status !== 'completed',
        );
        setNextAppointment(upcoming || null);
      });

    return () => unsubscribe();
  }, [gestationalWeeks]);

  const renderVisit = ({ item }) => (
    <View
      style={[
        styles.visitCard,
        item.status === 'completed'
          ? { borderColor: '#16a34a' }
          : { borderColor: '#f97316' },
      ]}
    >
      <Text style={styles.visitDate}>📅 {item.date}</Text>
      <Text style={styles.visitDetail}>👩‍⚕️ {item.doctor}</Text>
      <Text style={styles.visitDetail}>📍 {item.location}</Text>
      {item.notes && <Text style={styles.visitNote}>📝 {item.notes}</Text>}
      <Text
        style={[
          styles.visitStatus,
          { color: item.status === 'completed' ? '#16a34a' : '#f97316' },
        ]}
      >
        {item.status === 'completed' ? 'Completed' : 'Upcoming'}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Pregnancy Journey</Text>

      {/* Encouragement */}
      <View style={styles.encourageCard}>
        <Text style={styles.encourageText}>
          🌸 You are doing amazing! Keep up with your antenatal visits.
        </Text>
      </View>

      {/* Trimester & Progress */}
      <View style={styles.trimesterCard}>
        <Text style={styles.trimesterText}>{trimester}</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(gestationalWeeks / 40) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.weeksText}>{gestationalWeeks} / 40 weeks</Text>
      </View>

      {/* Next Appointment */}
      {nextAppointment && (
        <View style={styles.nextCard}>
          <Text style={styles.nextTitle}>Next Visit</Text>
          <Text style={styles.nextDate}>📅 {nextAppointment.date}</Text>
          <Text style={styles.nextDetail}>
            👩‍⚕️ {nextAppointment.doctor} at {nextAppointment.location}
          </Text>
          {nextAppointment.notes && (
            <Text style={styles.nextNote}>📝 {nextAppointment.notes}</Text>
          )}
        </View>
      )}

      {/* All Visits */}
      <Text style={styles.sectionHeader}>Your Visit Timeline</Text>
      {appointments.length === 0 ? (
        <Text style={styles.emptyText}>No visits recorded yet.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={renderVisit}
        />
      )}

      {/* Health Tips */}
      <Text style={styles.sectionHeader}>Health Tips</Text>
      <View style={styles.tipCard}>
        <Text style={styles.tipText}>
          🥗 Eat a balanced diet with iron and folic acid.
        </Text>
        <Text style={styles.tipText}>
          🏃‍♀️ Engage in safe exercises recommended by your doctor.
        </Text>
        <Text style={styles.tipText}>💧 Stay hydrated daily.</Text>
        <Text style={styles.tipText}>🛌 Ensure sufficient rest and sleep.</Text>
        <Text style={styles.tipText}>
          🩺 Attend all scheduled antenatal visits.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },

  encourageCard: {
    backgroundColor: '#ffe4e6',
    padding: 14,
    borderRadius: 16,
    marginBottom: 15,
  },
  encourageText: {
    color: '#b91c1c',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },

  trimesterCard: {
    backgroundColor: '#e0f2fe',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  trimesterText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d4ed8',
    marginBottom: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#bae6fd',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  weeksText: { fontSize: 14, color: '#1e293b', fontWeight: '600' },

  nextCard: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  nextTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b45309',
    marginBottom: 6,
  },
  nextDate: { fontSize: 18, fontWeight: '600', color: '#78350f' },
  nextDetail: { fontSize: 15, color: '#713f12', marginTop: 4 },
  nextNote: {
    fontSize: 14,
    color: '#334155',
    fontStyle: 'italic',
    marginTop: 4,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 15,
    marginBottom: 10,
  },

  visitCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  visitDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 4,
  },
  visitDetail: { fontSize: 14, color: '#475569', marginBottom: 2 },
  visitNote: {
    fontSize: 13,
    color: '#334155',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  visitStatus: { fontSize: 14, fontWeight: '600', marginTop: 4 },

  tipCard: {
    backgroundColor: '#d1fae5',
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  tipText: { fontSize: 14, color: '#065f46', marginBottom: 6 },
});
