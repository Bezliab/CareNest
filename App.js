import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './src/screens/LandingScreen/LandingScreen';
import LoginScreen from './src/screens/Loginscreen/LoginScreen';
import SignUpScreen from './src/screens/SigninScreen/SignUpScreen';
import Dashboard from './src/screens/Dashboard/Dashboard';
import HealthScreen from './src/screens/HealthPage/Healthscreen';
import HealthMetricsScreen from './src/screens/HealthMetricsScreen/HealthMetricsScreen';
import ReminderScreen from './src/screens/ReminderScreen/ReminderScreen';
import TodayScreen from './src/screens/ReminderScreen/TodayScreen/TodayScreen';
import ScheduleScreen from './src/screens/ReminderScreen/ScheduleScreen/ScheduleScreen';
import AllReminderScreen from './src/screens/ReminderScreen/AllReminderScreen/AllReminderScreen';
import CompletedScreen from './src/screens/ReminderScreen/CompletedScreen/CompletedScreen';
import AppointmentScreen from './src/screens/AppointmentScreen/AppointmentScreen';
import EmergencyScreen from './src/screens/Emergency/Emergency';
import { TouchableOpacity, Text } from 'react-native';
import SettingsScreen from './src/screens/SettingsPage/SettingsScreen';
import ProfileScreen from './src/screens/ProfilePage/ProfileScreen';
import ArticleScreen from './src/screens/ArticleScreen/ArticleScreen';
import FaqScreen from './src/screens/FaqScreen/FaqScreen';
import HistoryScreen from './src/screens/HistoryScreen/HistoryScreen';
import DoctorScreen from './src/screens/DoctorsScreen/DoctorScreen';
import HelpCenterScreen from './src/screens/HelpCentreScreen/HelpCentreScreen';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';
import bookingpageScreen from './src/screens/bookingpage/bookingpageScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Hide header only on LandingPage */}
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />

        {/* Keep header + automatic back button */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: 'Login' }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerTitle: 'Create Account' }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Health"
          component={HealthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthMetricsScreen"
          component={HealthMetricsScreen}
          options={{ headerShown: false }}
        />
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
          name="Emergency"
          component={EmergencyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerTitle: 'Setting' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerTitle: 'Profile' }}
        />

        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Faq"
          component={FaqScreen}
          options={{ headerTitle: 'Faq' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerTitle: 'Faq' }}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenterScreen}
          options={{ headerTitle: 'Faq' }}
        />
        <Stack.Screen
          name="Doctor"
          component={DoctorScreen}
          options={{ headerTitle: 'Faq' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerTitle: 'Faq' }}
        />
        <Stack.Screen
          name="bookingpage"
          component={bookingpageScreen}
          options={{ headerTitle: 'Book Appointment' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
