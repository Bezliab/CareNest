import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import auth from "@react-native-firebase/auth";
import styles from "./LoginScreenStyle";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email/phone and password.");
      return;
    }

    setLoading(true);

    try {
      // Firebase authentication
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Success", "Welcome back!");
      navigation.replace("Dashboard"); // Move directly to Dashboard
    } catch (error) {
      console.log("Login Error:", error);
      let message = "Login failed. Please try again.";

      if (error.code === "auth/invalid-email") {
        message = "Invalid email format.";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      }

      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Log In"}
        </Text>
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.switchLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export { LoginScreen };