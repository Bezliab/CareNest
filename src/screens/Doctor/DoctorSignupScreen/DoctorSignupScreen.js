// src/screens/Doctor/DoctorSignUpScreen.js
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
  Image,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import styles from "./DoctorSignupStyle";

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

  // ✅ Fix: Handle Android "content://" URIs properly
  const pickDocument = async (setFileUri) => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
      });

      if (result.didCancel || !result.assets || result.assets.length === 0)
        return;

      let uri = result.assets[0].uri;

      if (Platform.OS === "android" && uri.startsWith("content://")) {
        const destPath = `${RNFS.TemporaryDirectoryPath}${Date.now()}.jpg`;
        await RNFS.copyFile(uri, destPath);
        uri = "file://" + destPath;
      } else if (!uri.startsWith("file://")) {
        uri = "file://" + uri;
      }

      setFileUri(uri);
      Alert.alert("Success", "File selected successfully!");
    } catch (error) {
      console.error("File handling error:", error);
      Alert.alert("Error", "Failed to pick or process the file.");
    }
  };

  // ✅ Fix: Safe Firebase Upload Function
  const uploadFile = async (path, folderName, fileName) => {
    if (!path) throw new Error("File path is empty");

    let filePath = path;
    if (!filePath.startsWith("file://")) {
      filePath = "file://" + filePath;
    }

    const ref = storage().ref(`doctors/${folderName}/${fileName}_${Date.now()}.jpg`);

    try {
      console.log("Uploading:", filePath);
      await ref.putFile(filePath);
      const url = await ref.getDownloadURL();
      console.log(`${fileName} uploaded successfully:`, url);
      return url;
    } catch (err) {
      console.error("Upload failed for:", fileName, err);
      throw err;
    }
  };

  // ✅ Sign Up Logic
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
      return Alert.alert(
        "Missing Fields",
        "Please fill all fields and upload required documents."
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert("Password Error", "Passwords do not match.");
    }

    try {
      setLoading(true);

      // 🔐 Create user
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const userId = userCredential.user.uid;

      // ☁️ Upload license & ID
      const licenseUrl = await uploadFile(licenseUri, userId, "license");
      const idUrl = await uploadFile(idUri, userId, "id");

      // 🧠 Save doctor info to Firestore
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
        "Account created successfully. ."
      );
      navigation.navigate("DoctorDashboard");
    } catch (error) {
      console.error("Signup error:", error);
      let message = "Signup failed. Please try again.";
      if (error.code === "auth/email-already-in-use")
        message = "This email is already in use.";
      else if (error.code === "auth/invalid-email")
        message = "Invalid email address.";
      else if (error.code === "auth/weak-password")
        message = "Password should be at least 6 characters.";
      Alert.alert("Signup Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🩺 Doctor Registration</Text>
        <Text style={styles.subtitle}>
          Provide accurate details for verification
        </Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Icon name="person" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Icon name="email" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Specialization */}
        <View style={styles.inputGroup}>
          <Icon name="medical-services" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Specialization"
            style={styles.input}
            value={specialization}
            onChangeText={setSpecialization}
          />
        </View>

        {/* Hospital */}
        <View style={styles.inputGroup}>
          <Icon name="local-hospital" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Hospital Name"
            style={styles.input}
            value={hospitalName}
            onChangeText={setHospitalName}
          />
        </View>

        {/* State */}
        <View style={styles.inputGroup}>
          <Icon name="location-city" size={20} color="#0b72ff" />
          <TextInput
            placeholder="State"
            style={styles.input}
            value={state}
            onChangeText={setState}
          />
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Icon name="location-on" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Location / City"
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Upload License */}
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => pickDocument(setLicenseUri)}
        >
          <Icon name="description" size={20} color="#0b72ff" />
          <Text style={styles.uploadText}>
            {licenseUri ? "License Uploaded ✅" : "Upload Medical License"}
          </Text>
        </TouchableOpacity>
        {licenseUri && (
          <Image source={{ uri: licenseUri }} style={styles.previewImage} />
        )}

        {/* Upload ID */}
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => pickDocument(setIdUri)}
        >
          <Icon name="badge" size={20} color="#0b72ff" />
          <Text style={styles.uploadText}>
            {idUri ? "ID Uploaded ✅" : "Upload Work/ID Card"}
          </Text>
        </TouchableOpacity>
        {idUri && <Image source={{ uri: idUri }} style={styles.previewImage} />}

        {/* Password */}
        <View style={styles.inputGroup}>
          <Icon name="lock" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="lock-outline" size={20} color="#0b72ff" />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Navigation */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("DoctorLogin")}>
            <Text style={styles.loginLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
