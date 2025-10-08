// src/navigation/DoctorStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Doctor_Sign from '../Doctor/Doctors_Sign/Doctors_login';
import DoctorSignUpScreen from '../Doctor/DoctorSignupScreen/DoctorSignupScreen';
import DoctorDshboard from '../Doctor/DoctorDashboard/DoctorDshboard';
import DoctorAppointments from '../Doctor/DoctorsAppointment/DoctorsAppointMent';
import DoctorProfile from '../Doctor/DoctorProfile/DoctorProfile';
import PatientManagement from '../Doctor/PatientManagement/PatientManagement';
import AddPatient from '../Doctor/PatientManagement/AddPatient';
import PatientDetails from '../Doctor/PatientManagement/PatientDetails';
import FacilityResources from '../Doctor/FacultyResources/FacuultyResources';
import Analytics from '../Doctor/Analytics/Analytics';

const Stack = createNativeStackNavigator();

export default function DoctorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login_doctor" component={Doctor_Sign} />
      <Stack.Screen name="DoctorSignUp" component={DoctorSignUpScreen} />
      <Stack.Screen name="DoctorDashboard" component={DoctorDshboard} />
      <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="PatientList" component={PatientManagement} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} />
      <Stack.Screen name="FacilityResources" component={FacilityResources} />
      <Stack.Screen name="AnalyticsReports" component={Analytics} />
    </Stack.Navigator>
  );
}
