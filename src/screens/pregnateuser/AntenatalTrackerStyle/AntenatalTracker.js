import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./AntenatalTrackerStyle";

export default function AntenatalScreen({ route }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [nextAppointment, setNextAppointment] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Assume userId passed from login or dashboard
  const userId = route?.params?.userId || "demoUser";

  // Fetch appointments for this user
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("appointments")
      .where("userId", "==", userId)
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);

        // Find next upcoming appointment
        const today = new Date();
        const upcoming = data.find(
          (a) => new Date(a.date) >= today && a.status !== "completed"
        );
        setNextAppointment(upcoming || null);
      });

    return () => unsubscribe();
  }, []);

  const markAsDone = async (id) => {
    try {
      await firestore().collection("appointments").doc(id).update({
        status: "completed",
      });
      Alert.alert("✅ Success", "Appointment marked as completed.");
    } catch (err) {
      console.error(err);
    }
  };

  const markedDates = appointments.reduce((acc, appt) => {
    acc[appt.date] = {
      marked: true,
      dotColor: appt.status === "completed" ? "#16a34a" : "#f97316",
      selected: appt.date === selectedDate,
      selectedColor: "#2563eb",
    };
    return acc;
  }, {});

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedAppointment(item);
        setModalVisible(true);
      }}
    >
      <View
        style={[
          styles.card,
          item.status === "completed" && { borderColor: "#16a34a" },
        ]}
      >
        <Text style={styles.cardDate}>📅 {item.date}</Text>
        <Text style={styles.cardText}>👩‍⚕️ Doctor: {item.doctor}</Text>
        <Text style={styles.cardText}>📍 Location: {item.location}</Text>
        <Text
          style={[
            styles.cardStatus,
            { color: item.status === "completed" ? "#16a34a" : "#f97316" },
          ]}
        >
          {item.status === "completed" ? "Completed" : "Upcoming"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Antenatal Schedule</Text>

      {/* Next Visit Card */}
      {nextAppointment ? (
        <View style={styles.nextCard}>
          <Text style={styles.nextTitle}>Next Visit</Text>
          <Text style={styles.nextDate}>📅 {nextAppointment.date}</Text>
          <Text style={styles.nextDetail}>
            👩‍⚕️ {nextAppointment.doctor} at {nextAppointment.location}
          </Text>
        </View>
      ) : (
        <View style={styles.noNextCard}>
          <Text style={styles.noNextText}>
            🎉 You have no upcoming antenatal visits scheduled.
          </Text>
        </View>
      )}

      {/* Calendar */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#2563eb",
          selectedDayBackgroundColor: "#2563eb",
        }}
        style={{ marginTop: 10 }}
      />

      {/* Appointments List */}
      <Text style={styles.subHeader}>Your Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.emptyText}>No appointments found.</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Appointment Details Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <Text style={styles.modalHeader}>Appointment Details</Text>
                <Text style={styles.modalText}>
                  📅 Date: {selectedAppointment.date}
                </Text>
                <Text style={styles.modalText}>
                  👩‍⚕️ Doctor: {selectedAppointment.doctor}
                </Text>
                <Text style={styles.modalText}>
                  📍 Location: {selectedAppointment.location}
                </Text>
                <Text
                  style={[
                    styles.modalStatus,
                    {
                      color:
                        selectedAppointment.status === "completed"
                          ? "#16a34a"
                          : "#f97316",
                    },
                  ]}
                >
                  {selectedAppointment.status === "completed"
                    ? "Completed"
                    : "Upcoming"}
                </Text>

                {selectedAppointment.status !== "completed" && (
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => {
                      markAsDone(selectedAppointment.id);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.saveText}>Mark as Attended</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
