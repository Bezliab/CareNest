import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { addAppointment } from '../services/firebaseService';

export default function BookAppointmentScreen({ navigation }) {
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleBook = async () => {
    if (!doctorName || !date || !time) {
      return Alert.alert('Missing info', 'Please fill all fields.');
    }

    try {
      await addAppointment({
        doctorName,
        date,
        time,
        reason,
        status: 'pending',
      });

      Alert.alert('Success', 'Appointment booked successfully!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <TextInput
        placeholder="Doctor's Name"
        style={styles.input}
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <TextInput
        placeholder="Date (e.g. 2025-10-10)"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="Time (e.g. 10:00 AM)"
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        placeholder="Reason"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.button} onPress={handleBook}>
        <Text style={styles.buttonText}>Save Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#76ffa4ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
