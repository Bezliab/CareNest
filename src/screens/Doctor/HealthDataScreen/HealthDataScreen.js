// HealthDataScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "react-native-document-picker";
import styles from "./HealthDataStyle";

const HealthDataScreen = () => {
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [labTest, setLabTest] = useState("");
  const [reportFile, setReportFile] = useState(null);

  const handleUploadReport = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      const fileRef = ref(storage, `reports/${auth.currentUser.uid}/${res.name}`);
      const response = await fetch(res.uri);
      const blob = await response.blob();

      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);

      setReportFile(url);
      Alert.alert("Success", "Report uploaded successfully!");
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) Alert.alert("Error", err.message);
    }
  };

  const handleSaveData = async () => {
    if (!bloodPressure || !weight || !bloodSugar) {
      Alert.alert("Error", "Please fill all vital fields");
      return;
    }

    try {
      await addDoc(collection(db, "patientsHealthData"), {
        uid: auth.currentUser.uid,
        bloodPressure,
        weight,
        bloodSugar,
        labTest,
        reportFile: reportFile || null,
        timestamp: new Date(),
      });

      Alert.alert("Success", "Health data saved successfully!");
      setBloodPressure("");
      setWeight("");
      setBloodSugar("");
      setLabTest("");
      setReportFile(null);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Record Patient Health Data</Text>

      <TextInput
        placeholder="Blood Pressure (e.g., 120/80)"
        style={styles.input}
        value={bloodPressure}
        onChangeText={setBloodPressure}
      />
      <TextInput
        placeholder="Weight (kg)"
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        placeholder="Blood Sugar (mg/dL)"
        style={styles.input}
        keyboardType="numeric"
        value={bloodSugar}
        onChangeText={setBloodSugar}
      />
      <TextInput
        placeholder="Lab Test Results"
        style={styles.input}
        value={labTest}
        onChangeText={setLabTest}
      />

      <TouchableOpacity style={styles.button} onPress={handleUploadReport}>
        <Text style={styles.buttonText}>
          {reportFile ? "Report Uploaded ✅" : "Upload Report"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSaveData}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HealthDataScreen;
