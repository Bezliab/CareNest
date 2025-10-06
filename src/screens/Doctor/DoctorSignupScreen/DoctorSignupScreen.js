// DoctorSignUpScreen.js
// React Native CLI — Doctor registration with document uploads & Firebase Auth

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "./DoctorSignupStyle"; // ✅ Import external styles

export default function DoctorSignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [licenseUri, setLicenseUri] = useState(null);
  const [idUri, setIdUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickDocument = async (setFileUri) => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setFileUri(result.assets[0].uri);
    }
  };

  const handleSignUp = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !specialization ||
      !state ||
      !location ||
      !licenseUri ||
      !idUri
    ) {
      return Alert.alert("Error", "Please fill in all fields and upload required documents.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      setLoading(true);

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const licenseRef = storage().ref(`doctors/${userId}/license.jpg`);
      const idRef = storage().ref(`doctors/${userId}/id_card.jpg`);
      await licenseRef.putFile(licenseUri);
      await idRef.putFile(idUri);
      const licenseUrl = await licenseRef.getDownloadURL();
      const idUrl = await idRef.getDownloadURL();

      await firestore().collection("doctors").doc(userId).set({
        fullName,
        email,
        specialization,
        hospitalName,
        state,
        location,
        licenseUrl,
        idUrl,
        verified: false,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        "Success",
        "Your account has been created. Please wait while we verify your credentials."
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "DoctorSignIn" }],
      });
    } catch (error) {
      console.error("Signup Error:", error);
      let message = "Signup failed. Please try again.";
      if (error.code === "auth/email-already-in-use") message = "This email is already in use.";
      else if (error.code === "auth/invalid-email") message = "Invalid email address.";
      else if (error.code === "auth/weak-password") message = "Password should be at least 6 characters.";
      Alert.alert("Signup Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Doctor Sign Up</Text>
        <Text style={styles.subtitle}>Please fill all details for verification</Text>

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
            placeholder="Specialization (e.g., Gynecologist)"
            value={specialization}
            onChangeText={setSpecialization}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="local-hospital" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="Hospital / Clinic Name"
            value={hospitalName}
            onChangeText={setHospitalName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="location-city" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="location-on" size={20} color="#0b72ff" />
          <TextInput
            style={styles.input}
            placeholder="City / Area / Address"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(setLicenseUri)}>
          <Icon name="description" size={20} color="#0b72ff" />
          <Text style={styles.uploadText}>
            {licenseUri ? "License Uploaded ✅" : "Upload Medical License"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(setIdUri)}>
          <Icon name="badge" size={20} color="#0b72ff" />
          <Text style={styles.uploadText}>
            {idUri ? "ID Uploaded ✅" : "Upload Work/ID Card"}
          </Text>
        </TouchableOpacity>

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
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Sign Up</Text>}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("DoctorSignIn")}>
            <Text style={styles.loginLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
