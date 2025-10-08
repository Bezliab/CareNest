import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./AddReminderstyle";

export default function AddReminderScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const handleAddReminder = () => {
    if (!title) return alert("Please enter a reminder title");
    alert("Reminder added successfully ✅");
    navigation.goBack();
  };

  return (
    <LinearGradient colors={["#eef2f3", "#f8fbff"]} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Reminder</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reminder Title</Text>
          <TextInput
            placeholder="e.g., Take prenatal vitamins"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>

        {/* Note */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            placeholder="Add extra details..."
            placeholderTextColor="#999"
            value={note}
            onChangeText={setNote}
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            multiline
          />
        </View>

        {/* Date and Time Pickers */}
        <View style={styles.datetimeContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#667eea" />
            <Text style={styles.dateText}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time-outline" size={20} color="#667eea" />
            <Text style={styles.dateText}>
              {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
          />
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.gradientButton}
          >
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
            <Text style={styles.addButtonText}>Save Reminder</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
