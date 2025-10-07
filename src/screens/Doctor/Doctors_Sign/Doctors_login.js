// DoctorLoginScreen.js
// React Native CLI — Firebase Auth + FineUI-inspired design

import React, { useState, useRef } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "./Doctors_loginStyle";

export default function DoctorLoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const cardLift = useRef(new Animated.Value(0)).current;

  const liftCard = (toValue) => {
    Animated.timing(cardLift, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
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
        );
        setLoading(false);
        return;
      }

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          {/* Header area: logo + title */}
          <View style={styles.headerRow}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../../Assets/LOGO.png")}
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

          {/* Form */}
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
                returnKeyType="next"
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
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.eyeBtn}
              >
                <Icon
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, loading && { opacity: 0.7 }]}
              onPress={handleLogin} 
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
              <TouchableOpacity onPress={() => navigation.navigate("DoctorSignUp")}>
                <Text style={[styles.linkText, { marginLeft: 8 }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Secure · Encrypted Healthcare Access
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
