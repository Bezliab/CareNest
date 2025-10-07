// src/screens/ForgotPassword/OTPVerificationScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const OTPVerificationScreen = ({ route, navigation }) => {
  const { confirmation } = route.params;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    try {
      setLoading(true);
      await confirmation.confirm(code);
      Alert.alert("Verified", "OTP verified successfully!");
      navigation.replace("ResetPassword");
    } catch (error) {
      Alert.alert("Error", "Invalid or expired OTP. Try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={verifyCode}
      >
        <Text style={styles.buttonText}>{loading ? "Verifying..." : "Verify OTP"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", color: "#1976d2", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 20 },
  button: { width: "100%", backgroundColor: "#1976d2", paddingVertical: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
