import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./TodayScreenStyle";

const TodayScreen = ({ navigation }) => {
  const todayReminders = [
    { id: 1, title: "Take Vitamins", time: "8:00 AM", desc: "Prenatal vitamins with water", icon: "fitness-outline" },
    { id: 2, title: "Doctor Appointment", time: "10:00 AM", desc: "Clinic checkup with Dr. James", icon: "medkit-outline" },
    { id: 3, title: "Drink Water", time: "12:00 PM", desc: "2 glasses of water", icon: "water-outline" },
    { id: 4, title: "Rest Time", time: "3:00 PM", desc: "Take a 30 min nap", icon: "bed-outline" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Reminders</Text>
        <View style={{ width: 24 }} /> {/* spacer for alignment */}
      </View>

      {/* Date */}
      <Text style={styles.dateText}>Oct 2, 2025</Text>

      {/* Reminder List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {todayReminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderCard}>
            <Ionicons name={reminder.icon} size={24} color="#667eea" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.reminderTitle}>{reminder.title}</Text>
              <Text style={styles.reminderDesc}>{reminder.desc}</Text>
            </View>
            <Text style={styles.reminderTime}>{reminder.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddReminder")}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addBtnText}>Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodayScreen;


