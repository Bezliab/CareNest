import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import styles from "./AppointmentScreenstyle";

export default function AppointmentScreen({ navigation }) {
  // Appointments (in real app you’d fetch these from Firestore/API)
  const appointments = [
    {
      id: 1,
      date: "October 12, 2025",
      time: "10:30 AM",
      doctor: "Dr. Amina Yusuf",
      type: "Prenatal Check-up",
      location: "Maternal Care Clinic, Room 203",
    },
    {
      id: 2,
      date: "October 26, 2025",
      time: "2:00 PM",
      doctor: "Dr. Tunde Ade",
      type: "Ultrasound Scan",
      location: "Maternal Care Clinic, Room 105",
    },
    {
      id: 3,
      date: "November 10, 2025",
      time: "11:00 AM",
      doctor: "Dr. Chika Obi",
      type: "Nutrition Counseling",
      location: "Maternal Care Clinic, Room 310",
    },
  ];

  // first one is "Next Appointment"
  const nextAppointment = appointments[0];
  const upcomingAppointments = appointments.slice(1);

  return (
    <LinearGradient colors={["#eef2f3", "#f8fbff"]} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>My Appointments</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Next Appointment Card */}
        <View style={styles.card}>
          <Ionicons name="calendar-outline" size={36} color="#667eea" />
          <Text style={styles.title}>Your Next Appointment</Text>
          <Text style={styles.date}>{nextAppointment.date}</Text>
          <Text style={styles.time}>{nextAppointment.time}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="person-circle-outline" size={22} color="#444" />
            <Text style={styles.detail}>{nextAppointment.doctor}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="heart-outline" size={22} color="#e53935" />
            <Text style={styles.detail}>{nextAppointment.type}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={22} color="#0288d1" />
            <Text style={styles.detail}>{nextAppointment.location}</Text>
          </View>

          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderText}>Set Reminder ⏰</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointments Timeline */}
        <Text style={styles.subHeader}>Upcoming Appointments</Text>
        {upcomingAppointments.map((appt) => (
          <View key={appt.id} style={styles.timelineCard}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{appt.date}</Text>
              <Text style={styles.timelineTime}>{appt.time}</Text>
              <Text style={styles.timelineType}>{appt.type}</Text>
              <Text style={styles.timelineDoctor}>{appt.doctor}</Text>
              <Text style={styles.timelineLocation}>{appt.location}</Text>
            </View>
          </View>
        ))}

        {/* Tip Section */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={24} color="#ffa000" />
          <Text style={styles.tipText}>
            Don’t forget to rest well before your check-ups and keep a small
            notebook to track your questions.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
