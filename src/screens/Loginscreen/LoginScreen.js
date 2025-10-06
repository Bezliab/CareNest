import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import styles from "./LoginScreenStyle";

export default function LoginScreen({ navigation }) {
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
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Success", "Welcome back!");
      navigation.replace("Dashboard");
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
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require("../../Assets/LOGO.png")}
              style={styles.logo}
            />
            <View style={styles.titleBox}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue to your dashboard</Text>
            </View>
          </View>

          {/* Email Field */}
          <View style={styles.inputLabelRow}>
            <Text style={styles.inputLabel}>Email</Text>
            <Text style={styles.helperText}>Use your registered email</Text>
          </View>
          <View style={styles.inputRow}>
            <Icon name="email" size={20} color="#6b7280" />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              style={styles.input}
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              onFocus={() => liftCard(1)}
              onBlur={() => liftCard(0)}
              returnKeyType="next"
            />
          </View>

          {/* Password Field */}
          <View style={[styles.inputLabelRow, { marginTop: 12 }]}>
            <Text style={styles.inputLabel}>Password</Text>
          </View>
          <View style={styles.inputRow}>
            <Icon name="lock" size={20} color="#6b7280" />
            <TextInput
              secureTextEntry={!showPassword} // stays as stars when hidden
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              onFocus={() => liftCard(1)}
              onBlur={() => liftCard(0)}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <Icon
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <View style={styles.rowBetween}>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? "Logging in..." : "Sign in"}
            </Text>
          </TouchableOpacity>

          {/* Sign Up Redirect */}
          <View style={styles.smallRow}>
            <Text style={styles.smallText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={[styles.linkText, { marginLeft: 6 }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
