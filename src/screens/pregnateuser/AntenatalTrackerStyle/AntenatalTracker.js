import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./AntenatalTrackerStyle";

export default function AntenatalTrackerScreen() {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [doctor, setDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("appointments")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);
      });

    return () => unsubscribe();
  }, []);

  const addAppointment = async () => {
    if (!date || !location || !doctor) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await firestore().collection("appointments").add({
        date,
        location,
        doctor,
        status: "upcoming",
        createdAt: new Date().toISOString(),
      });
      Alert.alert("Success", "Appointment added!");
      setDate("");
      setLocation("");
      setDoctor("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const markCompleted = async (id) => {
    await firestore().collection("appointments").doc(id).update({
      status: "completed",
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        item.status === "completed" && { borderColor: "#16a34a" },
      ]}
    >
      <Text style={styles.cardDate}>📅 {item.date}</Text>
      <Text style={styles.cardText}>👩‍⚕️ {item.doctor}</Text>
      <Text style={styles.cardText}>📍 {item.location}</Text>
      <Text
        style={[
          styles.cardStatus,
          { color: item.status === "completed" ? "#16a34a" : "#f97316" },
        ]}
      >
        {item.status === "completed" ? "Completed" : "Upcoming"}
      </Text>
      {item.status !== "completed" && (
        <TouchableOpacity
          onPress={() => markCompleted(item.id)}
          style={styles.completeBtn}
        >
          <Text style={styles.completeText}>Mark as Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const markedDates = appointments.reduce((acc, appt) => {
    acc[appt.date] = {
      marked: true,
      dotColor: appt.status === "completed" ? "#16a34a" : "#f97316",
    };
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Antenatal Visit Tracker</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#2563eb",
          selectedDayBackgroundColor: "#2563eb",
        }}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Add Appointment</Text>
      </TouchableOpacity>

      <Text style={styles.subHeader}>Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Add Appointment Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>New Appointment</Text>
            <TextInput
              placeholder="Enter date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
              style={styles.input}
            />
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
            <TextInput
              placeholder="Doctor / Midwife Name"
              value={doctor}
              onChangeText={setDoctor}
              style={styles.input}
            />
            <TouchableOpacity onPress={addAppointment} style={styles.saveBtn}>
              <Text style={styles.saveText}>Save Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
