// DoctorSignUpScreen.js
// React Native CLI — FineUI-inspired doctor registration form

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './DoctorSignupStyle';
export default function DoctorSignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword || !specialization) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    setLoading(true);
    // Replace with Firebase or API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Doctor account created successfully');
      navigation?.navigate('DoctorSignIn');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Doctor Sign Up</Text>
        <Text style={styles.subtitle}>Create your medical professional account</Text>

        <View style={styles.inputGroup}>
          <Icon name="person" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="email" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="medical-services" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Specialization (e.g., Pediatrician)"
            value={specialization}
            onChangeText={setSpecialization}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="lock" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="lock-outline" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.submitText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorSignIn')}>
            <Text style={styles.loginLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


