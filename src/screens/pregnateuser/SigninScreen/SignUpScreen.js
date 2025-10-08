import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './Signupscreenstyle';
import { useTheme } from '../../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient'); // Default
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🩸 Helper: Determine pregnancy stage from due date
  const calculatePregnancyStage = dueDate => {
    const today = new Date();
    const conceptionDate = new Date(dueDate);
    conceptionDate.setMonth(conceptionDate.getMonth() - 9); // approximate 9 months

    const diffWeeks = Math.floor(
      (today - conceptionDate) / (1000 * 60 * 60 * 24 * 7),
    );
    if (diffWeeks < 13) return 'First Trimester';
    if (diffWeeks < 27) return 'Second Trimester';
    return 'Third Trimester';
  };

  // 🧾 Handle Registration
  const handleSignup = async () => {
    if (!name || !age || !bloodGroup || !location || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;

      const stage = calculatePregnancyStage(dueDate);

      await firestore().collection('users').doc(userId).set({
        name,
        age,
        bloodGroup,
        location,
        dueDate: dueDate.toISOString(),
        pregnancyStage: stage,
        role,
        email,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        'Success',
        `Welcome ${name}! You have registered as a ${role}.`,
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (error) {
      console.error('Signup Error:', error);
      let message = error.message;

      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }

      Alert.alert('Signup Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>👶 Create Your CareNest Account</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Age */}
      <View style={styles.inputContainer}>
        <Icon name="calendar-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Due Date Picker */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <Icon name="time-outline" size={20} color="#666" />
        <Text style={styles.input}>Due Date: {dueDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              setDueDate(selectedDate);
            }
            setShowDatePicker(false);
          }}
        />
      )}

      {/* Blood Group */}
      <View style={styles.inputContainer}>
        <Icon name="heart-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Blood Group (e.g. O+)"
          value={bloodGroup}
          onChangeText={setBloodGroup}
        />
      </View>

      {/* Location */}
      <View style={styles.inputContainer}>
        <Icon name="location-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Submit */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={{ color: '#2563eb' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
