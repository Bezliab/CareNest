// BookAppointmentScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SpecialistDetailScreen = ({ route, navigation }) => {
  const { specialist } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const dates = [
    { day: 'MON', date: 25 },
    { day: 'TUE', date: 26 },
    { day: 'WED', date: 27 },
    { day: 'THU', date: 28 },
    { day: 'FRI', date: 29 },
    { day: 'SAT', date: 30 },
    { day: 'SUN', date: 31 },
  ];

  const timeSlots = ['08:00 AM', '10:00 AM', '11:00 AM', '09:00 PM'];

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to book an appointment');
      return;
    }

    try {
      const appointment = {
        doctorId: specialist.id || specialist.uid, // ensures correct doctor reference
        doctorName: specialist.name,
        specialty: specialist.specialty,
        patientId: currentUser.uid,
        patientName: currentUser.displayName || 'Anonymous',
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('appointments').add(appointment);

      Alert.alert('Success', 'Appointment booked successfully!');
      navigation.navigate('BookingConfirmation', {
        specialist,
        date: selectedDate,
        time: selectedTime,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{specialist.name}</Text>
          <Text style={styles.specialty}>{specialist.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{specialist.rating}</Text>
            <TouchableOpacity style={styles.reviewsButton}>
              <Text style={styles.reviewsText}>See reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Make an appointment</Text>

        <Text style={styles.subSectionTitle}>CHOOSE DAY</Text>
        <View style={styles.datesContainer}>
          <TouchableOpacity
            style={styles.todayButton}
            onPress={() => setSelectedDate('Today')}
          >
            <Text style={styles.todayButtonText}>TODAY</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  selectedDate === date.date && styles.dateButtonSelected,
                ]}
                onPress={() => setSelectedDate(date.date)}
              >
                <Text style={styles.dateDay}>{date.day}</Text>
                <Text
                  style={[
                    styles.dateNumber,
                    selectedDate === date.date && styles.dateNumberSelected,
                  ]}
                >
                  {date.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.subSectionTitle}>CHOOSE TIME</Text>
        <View style={styles.timesContainer}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeButton,
                selectedTime === time && styles.timeButtonSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  selectedTime === time && styles.timeButtonTextSelected,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>Book an appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' },
  headerInfo: { alignItems: 'flex-start' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  specialty: { fontSize: 16, color: '#666', marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { marginLeft: 4, fontSize: 16, fontWeight: '500' },
  reviewsButton: { marginLeft: 12 },
  reviewsText: { color: '#007AFF', fontSize: 14, fontWeight: '500' },
  section: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  todayButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  todayButtonText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  dateButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  dateButtonSelected: { backgroundColor: '#007AFF' },
  dateDay: { fontSize: 10, color: '#666', marginBottom: 2 },
  dateNumber: { fontSize: 14, fontWeight: '500', color: '#000' },
  dateNumberSelected: { color: '#fff' },
  timesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  timeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  timeButtonSelected: { backgroundColor: '#007AFF' },
  timeButtonText: { fontSize: 14, color: '#000' },
  timeButtonTextSelected: { color: '#fff' },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default SpecialistDetailScreen;
