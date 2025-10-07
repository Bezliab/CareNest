import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Platform,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import PushNotification from "react-native-push-notification";
import { Calendar } from "react-native-calendars";
import styles from "./ReminderScreenStyle";

const ReminderScreen = () => {
  // 🔔 Reminder States
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Antenatal Checkup",
      description: "Next hospital visit",
      date: "2025-10-08",
      time: new Date(),
      icon: "medkit-outline",
      color: "#b22222",
    },
    {
      id: 2,
      title: "Take Iron / Folic Acid",
      description: "Take every morning after breakfast",
      date: "2025-10-09",
      time: new Date(),
      icon: "fitness-outline",
      color: "#667eea",
    },
    {
      id: 3,
      title: "Hydrate & Exercise",
      description: "Drink water and do light stretches",
      date: "2025-10-10",
      time: new Date(),
      icon: "water-outline",
      color: "#00bfff",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 👈 for edit mode

  // 🕒 Notification setup
  useEffect(() => {
    PushNotification.configure({
      onNotification: (notification) =>
        console.log("Notification:", notification),
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
    Alert.alert(
      "Reminder Set!",
      `${reminder.title} at ${reminder.time.toLocaleTimeString()}`
    );
  };

  // 🕓 Time Picker
  const onChangeTime = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowPicker(false);
      return;
    }

    if (selectedTime && selectedReminder) {
      const updatedReminders = reminders.map((rem) =>
        rem.id === selectedReminder.id ? { ...rem, time: selectedTime } : rem
      );
      setReminders(updatedReminders);
      scheduleNotification({ ...selectedReminder, time: selectedTime });
    }

    setShowPicker(false);
    setSelectedReminder(null);
  };

  // ➕ Add or Update reminder
  const saveReminder = () => {
    if (!newTitle || !newDescription || !selectedDate) {
      Alert.alert("Error", "Please fill in all fields and select a date.");
      return;
    }

    if (isEditing && selectedReminder) {
      // ✏️ Update existing reminder
      const updated = reminders.map((r) =>
        r.id === selectedReminder.id
          ? {
              ...r,
              title: newTitle,
              description: newDescription,
              date: selectedDate,
            }
          : r
      );
      setReminders(updated);
      setIsEditing(false);
      setSelectedReminder(null);
      Alert.alert("Updated!", "Reminder has been updated successfully.");
    } else {
      // ➕ Add new reminder
      const newReminder = {
        id: reminders.length + 1,
        title: newTitle,
        description: newDescription,
        date: selectedDate,
        time: new Date(),
        icon: "notifications-outline",
        color: "#4a90e2",
      };
      setReminders([...reminders, newReminder]);
      Alert.alert("Added!", "New reminder created successfully.");
    }

    setNewTitle("");
    setNewDescription("");
    setSelectedDate("");
    setModalVisible(false);
  };

  // 🗑 Delete reminder
  const deleteReminder = (id) => {
    Alert.alert("Delete Reminder", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setReminders(reminders.filter((r) => r.id !== id));
          Alert.alert("Deleted", "Reminder removed successfully.");
        },
      },
    ]);
  };

  // 📅 Highlight dates on calendar
  const markedDates = reminders.reduce((acc, rem) => {
    acc[rem.date] = { marked: true, dotColor: rem.color };
    return acc;
  }, {});

  // 🧾 Render reminder card
  const renderItem = ({ item }) => (
    <View style={[styles.reminderCard, { borderLeftColor: item.color }]}>
      <View style={styles.reminderRow}>
        <Ionicons name={item.icon} size={24} color={item.color} />
        <View>
          <Text style={styles.reminderTitle}>{item.title}</Text>
          <Text style={styles.reminderDesc}>{item.description}</Text>
          <Text style={styles.reminderDate}>📅 {item.date}</Text>
          <Text style={styles.reminderTime}>
            ⏰ {item.time.toLocaleTimeString()}
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        {/* ⏰ Set Time */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            setSelectedReminder(item);
            setShowPicker(true);
          }}
        >
          <Ionicons name="time-outline" size={18} color="#fff" />
          <Text style={styles.editBtnText}>Time</Text>
        </TouchableOpacity>

        {/* ✏️ Edit */}
        <TouchableOpacity
          style={[styles.editBtn, { backgroundColor: "#4b5563" }]}
          onPress={() => {
            setIsEditing(true);
            setSelectedReminder(item);
            setNewTitle(item.title);
            setNewDescription(item.description);
            setSelectedDate(item.date);
            setModalVisible(true);
          }}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>

        {/* 🗑 Delete */}
        <TouchableOpacity
          style={[styles.editBtn, { backgroundColor: "#dc2626" }]}
          onPress={() => deleteReminder(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.editBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Antenatal Reminders & Schedule</Text>

      {/* 📅 Calendar Section */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            selectedColor: "#2563eb",
            marked: markedDates[selectedDate]?.marked,
          },
        }}
        theme={{
          todayTextColor: "#2563eb",
          selectedDayBackgroundColor: "#2563eb",
          arrowColor: "#2563eb",
        }}
      />

      {/* ➕ Add Reminder Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setIsEditing(false);
          setModalVisible(true);
          setNewTitle("");
          setNewDescription("");
        }}
      >
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Add New Reminder</Text>
      </TouchableOpacity>

      {/* 🔔 Reminder List */}
      <Text style={styles.subHeader}>Your Reminders</Text>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* 🕓 Time Picker */}
      {showPicker && (
        <DateTimePicker
          value={selectedReminder ? selectedReminder.time : new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeTime}
        />
      )}

      {/* 🧾 Add/Edit Reminder Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              {isEditing ? "Edit Reminder" : "Add Reminder"}
            </Text>
            <TextInput
              placeholder="Reminder Title"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              style={styles.input}
            />
            <Text style={styles.selectedDateText}>
              {selectedDate
                ? `Selected Date: ${selectedDate}`
                : "Select a date from calendar"}
            </Text>

            <TouchableOpacity onPress={saveReminder} style={styles.saveBtn}>
              <Text style={styles.saveText}>
                {isEditing ? "Update Reminder" : "Save Reminder"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setIsEditing(false);
              }}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ReminderScreen;
