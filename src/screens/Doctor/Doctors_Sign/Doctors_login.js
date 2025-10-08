// DoctorLoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "./Doctors_loginStyle";

export default function Doctors_login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const doctorDoc = await firestore().collection("doctors").doc(userId).get();

      if (!doctorDoc.exists) {
        await auth().signOut();
        Alert.alert("Access Denied", "This account is not registered as a doctor.");
        return;
      }

      const doctorData = doctorDoc.data();

      if (!doctorData.verified) {
        await auth().signOut();
        Alert.alert("Verification Pending", "Your account is awaiting verification.");
        return;
      }

      Alert.alert("Login Successful", `Welcome back, Dr. ${doctorData.fullName || "User"}!`);
      navigation.replace("doctorDashboard", {
        doctor: doctorData,
        doctorId: userId,
      });
    } catch (error) {
      console.log("Login Error:", error);
      let message = "Login failed. Please try again.";
      if (error.code === "auth/invalid-email") message = "Invalid email format.";
      else if (error.code === "auth/user-not-found") message = "No account found with this email.";
      else if (error.code === "auth/wrong-password") message = "Incorrect password.";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Doctor Login</Text>
        <Text style={styles.subtitle}>Access your dashboard</Text>

        <View style={styles.inputGroup}>
          <Icon name="email" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
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

        <TouchableOpacity
          style={[styles.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Log In</Text>}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("DoctorSignUp")}>
            <Text style={styles.loginLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
