import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

// ✅ All your screens
import LandingPage from './src/screens/LandingScreen/LandingScreen';
import FirstPage from './src/screens/FirstPage/FirstPage';
import LoginScreen from './src/screens/Loginscreen/LoginScreen';
import SignUpScreen from './src/screens/SigninScreen/SignUpScreen';
import Dashboard from './src/screens/Dashboard/Dashboard';
import HealthScreen from './src/screens/HealthPage/Healthscreen';
import ReminderScreen from './src/screens/ReminderScreen/ReminderScreen';
import TodayScreen from './src/screens/ReminderScreen/TodayScreen/TodayScreen';
import ScheduleScreen from './src/screens/ReminderScreen/ScheduleScreen/ScheduleScreen';
import AllReminderScreen from './src/screens/ReminderScreen/AllReminderScreen/AllReminderScreen';
import CompletedScreen from './src/screens/ReminderScreen/CompletedScreen/CompletedScreen';
import AppointmentScreen from './src/screens/AppointmentScreen/AppointmentScreen';
import EmergencyScreen from './src/screens/Emergency/Emergency';
import SettingsScreen from './src/screens/SettingsPage/SettingsScreen';
import ProfileScreen from './src/screens/ProfilePage/ProfileScreen';
import ArticleScreen from './src/screens/ArticleScreen/ArticleScreen';
import FaqScreen from './src/screens/FaqScreen/FaqScreen';
import HistoryScreen from './src/screens/HistoryScreen/HistoryScreen';
import DoctorScreen from './src/screens/DoctorsScreen/DoctorScreen';
import HelpCenterScreen from './src/screens/HelpCentreScreen/HelpCentreScreen';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';
import bookingpageScreen from './src/screens/bookingpage/bookingpageScreen';
import AddRemider from './src/screens/AddReminder/AddReminderSreen';
import ResourcesScreen from './src/screens/Rescources/ResourcesScreen';
import HealthTipsScreen from './src/screens/HealthTipsScreen/HealthTipsScreen';
import Doctor_Sign from './src/screens/Doctors_Sign/Doctors_Sign';

const Stack = createNativeStackNavigator();

//
// ---------- SPLASH SCREEN ----------
function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Check Firebase authentication after delay
    const timeout = setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          });
        } else {
          // 👇 Show FirstPage before LandingPage
          navigation.reset({
            index: 0,
            routes: [{ name: 'FirstPage' }],
          });
        }
        setCheckingAuth(false);
      });
      return unsubscribe;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, slideAnim, navigation]);

  return (
    <View style={styles.splashContainer}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../CareNest/src/Assets/health-image.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CareNest</Text>
      </Animated.View>

      {checkingAuth && (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ marginTop: 25 }}
        />
      )}
    </View>
  );
}

//
// ---------- MAIN APP ----------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Splash Screen */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />

        {/* Intro / First Page (before Login or Signup) */}
        <Stack.Screen
          name="FirstPage"
          component={FirstPage}
          options={{ headerShown: false }}
        />

        {/* Landing Page (Login/Signup Choice) */}
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />

        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true, headerTitle: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: true, headerTitle: 'Create Account' }}
        />

        {/* Dashboard */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />

        {/* Health Pages */}
        <Stack.Screen name="Health" component={HealthScreen} />
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen
          name="TodayScreen"
          component={TodayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleScreen"
          component={ScheduleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllReminderScreen"
          component={AllReminderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompletedScreen"
          component={CompletedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctor_Sign"
          component={Doctor_Sign}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Emergency"
          component={EmergencyScreen}
          options={{ headerShown: false }}
        />

        {/* Profile and Settings */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true, headerTitle: 'Settings' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true, headerTitle: 'Profile' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: true, headerTitle: 'Edit Profile' }}
        />

        {/* Info and Support */}
        <Stack.Screen name="Article" component={ArticleScreen} />
        <Stack.Screen
          name="Faq"
          component={FaqScreen}
          options={{ headerShown: true, headerTitle: 'FAQ' }}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenterScreen}
          options={{ headerShown: true, headerTitle: 'Help Center' }}
        />
        <Stack.Screen
          name="Doctor"
          component={DoctorScreen}
          options={{ headerShown: true, headerTitle: 'Doctors' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: true, headerTitle: 'History' }}
        />
        <Stack.Screen
          name="bookingpage"
          component={bookingpageScreen}
          options={{ headerShown: true, headerTitle: 'Book Appointment' }}
        />

        {/* Reminders and Resources */}
        <Stack.Screen
          name="AddReminder"
          component={AddRemider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Resources"
          component={ResourcesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryTips"
          component={HealthTipsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//
// ---------- STYLES ----------
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  logo: {
    width: 180,
    height: 180,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2563eb',
    marginTop: 15,
    letterSpacing: 1,
  },
});
