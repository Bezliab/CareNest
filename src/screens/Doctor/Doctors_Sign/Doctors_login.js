// DoctorLoginScreen.js
<<<<<<< HEAD
// React Native CLI — Firebase Auth + FineUI-inspired design

import React, { useState, useRef } from "react";
=======
import React, { useState, useRef } from 'react';
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  SafeAreaView,
  ActivityIndicator,
<<<<<<< HEAD
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "./Doctors_loginStyle";

export default function DoctorLoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
=======
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './Doctors_loginStyle';

export default function DoctorLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const cardLift = useRef(new Animated.Value(0)).current;

<<<<<<< HEAD
  const liftCard = (toValue) => {
=======
  const liftCard = toValue => {
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    Animated.timing(cardLift, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
<<<<<<< HEAD
      Alert.alert("Missing Fields", "Please enter your email and password.");
=======
      Alert.alert('Missing Fields', 'Please enter your email and password.');
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
      return;
    }

    setLoading(true);
    try {
<<<<<<< HEAD
      // Firebase sign-in
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Optional: Check if doctor exists in Firestore
      const docRef = await firestore().collection("doctors").doc(userId).get();
      if (!docRef.exists) {
        await auth().signOut();
        Alert.alert(
          "Access Denied",
          "This account is not registered as a doctor."
=======
      // Firebase Auth
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;

      // Fetch doctor data from Firestore
      const doctorDoc = await firestore()
        .collection('doctors')
        .doc(userId)
        .get();

      if (!doctorDoc.exists) {
        await auth().signOut();
        Alert.alert(
          'Access Denied',
          'This account is not registered as a doctor.',
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
        );
        setLoading(false);
        return;
      }

<<<<<<< HEAD
      // Success
      Alert.alert("Success", "Welcome back, Doctor!");
      navigation.replace("doctorDashboard");
    } catch (error) {
      console.log("Doctor Login Error:", error);
      let message = "Login failed. Please try again.";

      if (error.code === "auth/invalid-email") message = "Invalid email format.";
      else if (error.code === "auth/user-not-found") message = "No account found with this email.";
      else if (error.code === "auth/wrong-password") message = "Incorrect password.";
      else if (error.code === "auth/too-many-requests") message = "Too many attempts. Please try again later.";

      Alert.alert("Login Failed", message);
=======
      const doctorData = doctorDoc.data();

      // Store doctor info globally (optional improvement)
      global.currentDoctor = { id: userId, ...doctorData };

      Alert.alert(
        'Login Successful',
        `Welcome back, Dr. ${doctorData.name || 'User'}!`,
      );

      // Navigate with doctor info
      navigation.replace('doctorDashboard', {
        doctor: doctorData,
        doctorId: userId,
      });
    } catch (error) {
      console.log('Doctor Login Error:', error);
      let message = 'Login failed. Please try again.';

      if (error.code === 'auth/invalid-email')
        message = 'Invalid email format.';
      else if (error.code === 'auth/user-not-found')
        message = 'No account found with this email.';
      else if (error.code === 'auth/wrong-password')
        message = 'Incorrect password.';
      else if (error.code === 'auth/too-many-requests')
        message = 'Too many attempts. Please try again later.';

      Alert.alert('Login Failed', message);
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
<<<<<<< HEAD
        behavior={Platform.OS === "ios" ? "padding" : "height"}
=======
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                {
                  translateY: cardLift.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -8],
                  }),
                },
              ],
            },
          ]}
        >
<<<<<<< HEAD
          {/* Header area: logo + title */}
          <View style={styles.headerRow}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../../Assets/LOGO.png")}
=======
          <View style={styles.headerRow}>
            <View style={styles.logoBox}>
              <Image
                source={require('../../../Assets/LOGO.png')}
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
                style={styles.logo}
              />
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.title}>Welcome Back, Doctor</Text>
              <Text style={styles.subtitle}>
                Sign in to access your dashboard
              </Text>
            </View>
          </View>

<<<<<<< HEAD
          {/* Form */}
=======
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
          <View style={styles.form}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>Email</Text>
              <Text style={styles.helperText}>Use your registered email</Text>
            </View>
            <View style={styles.inputRow}>
              <Icon name="email" size={20} color="#111827" />
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="doctor@example.com"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                onFocus={() => liftCard(1)}
                onBlur={() => liftCard(0)}
<<<<<<< HEAD
                returnKeyType="next"
=======
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
              />
            </View>

            <View style={[styles.inputLabelRow, { marginTop: 12 }]}>
              <Text style={styles.inputLabel}>Password</Text>
            </View>

            <View style={styles.inputRow}>
              <Icon name="lock" size={20} color="#111827" />
              <TextInput
                secureTextEntry={!showPassword}
                placeholder="••••••••"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                onFocus={() => liftCard(1)}
                onBlur={() => liftCard(0)}
<<<<<<< HEAD
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.eyeBtn}
              >
                <Icon
                  name={showPassword ? "visibility" : "visibility-off"}
=======
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(s => !s)}
                style={styles.eyeBtn}
              >
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, loading && { opacity: 0.7 }]}
<<<<<<< HEAD
              onPress={handleLogin} 
=======
              onPress={handleLogin}
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Log In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.smallRow}>
              <Text style={styles.smallText}>Don’t have an account?</Text>
<<<<<<< HEAD
              <TouchableOpacity onPress={() => navigation.navigate("DoctorSignUp")}>
                <Text style={[styles.linkText, { marginLeft: 8 }]}>Sign Up</Text>
=======
              <TouchableOpacity
                onPress={() => navigation.navigate('DoctorSignUp')}
              >
                <Text style={[styles.linkText, { marginLeft: 8 }]}>
                  Sign Up
                </Text>
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

<<<<<<< HEAD
        {/* Footer */}
=======
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Secure · Encrypted Healthcare Access
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
