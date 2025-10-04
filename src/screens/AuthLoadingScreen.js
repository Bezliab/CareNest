import React, { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // ✅ User already logged in
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        // ❌ No user, go to Signup/Login
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.text}>Loading your account...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
  },
});
