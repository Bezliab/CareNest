// ReminderScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import PushNotification from "react-native-push-notification";

const ReminderScreen = () => {
  // Example reminders
  const initialReminders = [
    { id: 1, title: "Antenatal Checkup", description: "Next checkup", time: new Date(), icon: "medkit-outline", color: "#b22222" },
    { id: 2, title: "Take Iron / Folic Acid", description: "Every morning", time: new Date(), icon: "fitness-outline", color: "#667eea" },
    { id: 3, title: "Tetanus Vaccine", description: "Next dose", time: new Date(), icon: "bandage-outline", color: "#f39c12" },
    { id: 4, title: "Hydrate & Exercise", description: "Stay healthy", time: new Date(), icon: "water-outline", color: "#00bfff" },
  ];

  const [reminders, setReminders] = useState(initialReminders);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    // Configure push notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("Notification:", notification);
      },
      requestPermissions: Platform.OS === "ios",
    });
  }, []);

  const scheduleNotification = (reminder) => {
    PushNotification.localNotificationSchedule({
      id: reminder.id.toString(),
      message: `${reminder.title} - ${reminder.description}`,
      date: reminder.time,
      allowWhileIdle: true,
    });
    Alert.alert("Reminder Set!", `${reminder.title} at ${reminder.time.toLocaleTimeString()}`);
  };

  const onChangeTime = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate && selectedReminder !== null) {
      const updatedReminders = reminders.map((rem) =>
        rem.id === selectedReminder.id ? { ...rem, time: selectedDate } : rem
      );
      setReminders(updatedReminders);
      scheduleNotification({ ...selectedReminder, time: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>🔔 Your Reminders</Text>

        {reminders.map((reminder) => (
          <View key={reminder.id} style={[styles.reminderCard, { borderLeftColor: reminder.color }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={reminder.icon} size={24} color={reminder.color} style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text style={styles.reminderDesc}>{reminder.description}</Text>
                <Text style={styles.reminderTime}>Time: {reminder.time.toLocaleTimeString()}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => {
                setSelectedReminder(reminder);
                setShowPicker(true);
              }}
            >
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.editBtnText}>Set Time</Text>
            </TouchableOpacity>
          </View>
        ))}

        {showPicker && (
          <DateTimePicker
            value={selectedReminder ? selectedReminder.time : new Date()}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChangeTime}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  scrollContainer: { padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  reminderCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    justifyContent: "space-between",
  },
  reminderTitle: { fontSize: 18, fontWeight: "bold" },
  reminderDesc: { fontSize: 14, color: "#555", marginVertical: 2 },
  reminderTime: { fontSize: 12, color: "#888" },
  editBtn: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4a90e2",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  editBtnText: { color: "#fff", marginLeft: 5 },
});

export default ReminderScreen;
