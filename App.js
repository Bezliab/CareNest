import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// 🧠 Import translation setup
import './src/api/translator';
import { useTranslation } from 'react-i18next';

// ✅ Import AppProvider for global context
import { AppProvider } from './src/utils/AppContext';
// Import theme context
import { ThemeProvider } from './src/utils/themeContext';

// Screens
import LandingPage from './src/screens/LandingScreen/LandingScreen';
import FirstPage from './src/screens/FirstPage/FirstPage';
import LoginScreen from './src/screens/pregnateuser/Loginscreen/LoginScreen';
import SignUpScreen from './src/screens/pregnateuser/SigninScreen/SignUpScreen';
import Dashboard from './src/screens/pregnateuser/Dashboard/Dashboard';
import HealthScreen from './src/screens/pregnateuser/HealthPage/Healthscreen';
import BookAppointmentScreen from './src/screens/BookAppointment/BookAppointmentScreen';
import ReminderScreen from './src/screens/ReminderScreen/ReminderScreen';
import ScheduleScreen from './src/screens/ReminderScreen/ScheduleScreen/ScheduleScreen';
import AppointmentScreen from './src/screens/AppointmentScreen/AppointmentScreen';
import EmergencyScreen from './src/screens/pregnateuser/Emergency/Emergency';
import SettingsScreen from './src/screens/SettingsPage/SettingsScreen';
import ProfileScreen from './src/screens/pregnateuser/ProfilePage/ProfileScreen';
import ArticleScreen from './src/screens/ArticleScreen/ArticleScreen';
import FaqScreen from './src/screens/FaqScreen/FaqScreen';
import HistoryScreen from './src/screens/pregnateuser/HistoryScreen/HistoryScreen';
import DoctorScreen from './src/screens/Doctor/DoctorsScreen/DoctorScreen';
import HelpCenterScreen from './src/screens/HelpCentreScreen/HelpCentreScreen';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';
import bookingpageScreen from './src/screens/bookingpage/bookingpageScreen';
import AddReminderScreen from './src/screens/AddReminder/AddReminderSreen';
import HealthTipsScreen from './src/screens/pregnateuser/HealthTipsScreen/HealthTipsScreen';
import Doctor_Sign from './src/screens/Doctor/Doctors_Sign/Doctors_login';
import DoctorSignUpScreen from './src/screens/Doctor/DoctorSignupScreen/DoctorSignupScreen';
import DoctorDshboard from './src/screens/Doctor/DoctorDashboard/DoctorDshboard';
import HealthMetricsScreen from './src/screens/pregnateuser/HealthMetricsScreen/HealthMetricsScreen';
import AntenatalTrackerStyle from './src/screens/pregnateuser/AntenatalTrackerStyle/AntenatalTracker';
import FetalDevelopment from './src/screens/pregnateuser/FetalDevelopment/FetalDevelopment';
import MotherNutrition from './src/screens/pregnateuser/MotherNutrition/MotherNutrition';
import MentalwellBeing from './src/screens/pregnateuser/MentalwellBeing/MentalwellBeing';
import PertanalExcercise from './src/screens/pregnateuser/PertanalExercise/PertanalExercise';
import LaborDelivery from './src/screens/pregnateuser/LaborDelivery/LaborDelivery';
import RecoveryGuide from './src/screens/pregnateuser/RecoveryGuide/RecoveryGuide';
import PatientManagement from './src/screens/Doctor/PatientManagement/PatientManagement';
import AddPatient from './src/screens/Doctor/PatientManagement/AddPatient';
import PatientDetails from './src/screens/Doctor/PatientManagement/PatientDetails';
import FacilityResources from './src/screens/Doctor/FacultyResources/FacuultyResources';
import Analytics from './src/screens/Doctor/Analytics/Analytics';
import DoctorAppointments from './src/screens/Doctor/DoctorsAppointment/DoctorsAppointMent';
import DoctorProfile from './src/screens/Doctor/DoctorProfile/DoctorProfile';

import useFcmToken from './src/hooks/useFCMtoken';
import { enablePersistenceIfAvailable } from './src/api/firebaseConfig';

const Stack = createNativeStackNavigator();

function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { t } = useTranslation(); // ✅ for translations

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

    const timeout = setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          });
        } else {
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
          source={require('./src/Assets/APP.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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

export default function App() {
  useFcmToken();

  // ✅ Enable Firestore offline persistence
  firestore()
    .settings({ persistence: true })
    .then(() => console.log('✅ Firestore offline persistence enabled'))
    .catch(err => console.log('⚠️ Firestore persistence error:', err));

  return (
    // ✅ Wrap NavigationContainer inside AppProvider
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="FirstPage" component={FirstPage} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="BookAppointment"
              component={BookAppointmentScreen}
            />
            <Stack.Screen name="Health" component={HealthScreen} />
            <Stack.Screen name="Reminder" component={ReminderScreen} />
            <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
            <Stack.Screen name="Appointment" component={AppointmentScreen} />
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
            <Stack.Screen name="DoctorSignUp" component={DoctorSignUpScreen} />
            <Stack.Screen name="Doctor_Sign" component={Doctor_Sign} />
            <Stack.Screen name="doctorDashboard" component={DoctorDshboard} />
            <Stack.Screen name="Doctor" component={DoctorScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Article" component={ArticleScreen} />
            <Stack.Screen name="Faq" component={FaqScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="bookingpage" component={bookingpageScreen} />
            <Stack.Screen
              name="AddReminderScreen"
              component={AddReminderScreen}
            />
            <Stack.Screen name="healthTips" component={HealthTipsScreen} />
            <Stack.Screen
              name="healthmetrics"
              component={HealthMetricsScreen}
            />
            <Stack.Screen
              name="AntenatalTracker"
              component={AntenatalTrackerStyle}
            />
            <Stack.Screen name="fetaldeve" component={FetalDevelopment} />
            <Stack.Screen name="MotherHealth" component={MotherNutrition} />
            <Stack.Screen name="Pertanal" component={PertanalExcercise} />
            <Stack.Screen name="mentalwell" component={MentalwellBeing} />
            <Stack.Screen name="delivery" component={LaborDelivery} />
            <Stack.Screen name="Recovery" component={RecoveryGuide} />
            <Stack.Screen name="PatientList" component={PatientManagement} />
            <Stack.Screen name="AddPatient" component={AddPatient} />
            <Stack.Screen name="PatientDetails" component={PatientDetails} />
            <Stack.Screen
              name="FacilityResources"
              component={FacilityResources}
            />
            <Stack.Screen name="AnalyticsReports" component={Analytics} />
            <Stack.Screen
              name="DoctorAppointments"
              component={DoctorAppointments}
            />
            <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  logo: {
    width: 580,
    height: 380,
  },
});
