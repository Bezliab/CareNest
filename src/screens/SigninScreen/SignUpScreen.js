import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "./Signupscreenstyle";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const relations = ["Husband", "Friend", "Son", "Daughter", "Others"];

  const handleSignup = async () => {
    if (
      !name ||
      !emailOrPhone ||
      !password ||
      !emergencyRelation ||
      !emergencyName ||
      !emergencyPhone
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Create user in Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        emailOrPhone,
        password
      );

      const userId = userCredential.user.uid;

      // ✅ Store additional info in Firestore
      await firestore().collection("users").doc(userId).set({
        name,
        emailOrPhone,
        emergencyRelation,
        emergencyName,
        emergencyPhone,
        createdAt: new Date().toISOString(),
      });

      // ✅ Auto login (Firebase already signs in user after signup)
      Alert.alert("Success", "Account created successfully!");
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } catch (error) {
      console.error("Signup Error:", error);
      let message = error.message;

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }

      Alert.alert("Signup Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Emergency Contact Dropdown */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>
          {emergencyRelation || "Select Emergency Contact"}
        </Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {relations.map((relation) => (
            <TouchableOpacity
              key={relation}
              onPress={() => {
                setEmergencyRelation(relation);
                setShowDropdown(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownItemText}>{relation}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Name"
        value={emergencyName}
        onChangeText={setEmergencyName}
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Phone Number"
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
        keyboardType="phone-pad"
      />

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

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={{ color: "#3b82f6" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export { SignupScreen };