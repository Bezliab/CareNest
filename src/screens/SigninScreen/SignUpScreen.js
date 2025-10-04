import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // adjust path to your firebase.js
import styles from "./Signupscreenstyle";
const handleSignUp = async () => {
  if (!name || !email || !phone || !password) {
    Alert.alert("Missing Fields", "Please fill in all fields");
    return;
  }

  try {
    // 1️⃣ Create user in Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // 2️⃣ Update display name
    await user.updateProfile({ displayName: name });

    // 3️⃣ Save extra info in Firestore
    await firestore.collection('users').doc(user.uid).set({
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    });

    Alert.alert("Account Created", "Welcome!");
    navigation.replace("Dashboard"); // navigate to main screen

  } catch (error) {
    Alert.alert("Sign Up Failed", error.message);
  }
};


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Update display name
      await updateProfile(user, { displayName: name });

      // Step 3: Save user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Account Created", "Welcome to MaternalCare!");
      navigation.replace("Dashboard"); // navigate to your main page

    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.switchLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
