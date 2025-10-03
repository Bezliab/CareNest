import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AllReminderScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>All Reminders</Text>
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

export default AllReminderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },

  dateText: { fontSize: 16, color: "#666", textAlign: "center", marginVertical: 10 },

  scrollContainer: { padding: 16, paddingBottom: 100 },

  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderTitle: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  reminderDesc: { fontSize: 14, color: "#666" },
  reminderTime: { fontSize: 14, fontWeight: "bold", color: "#667eea" },

  addBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#667eea",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 6 },
});
