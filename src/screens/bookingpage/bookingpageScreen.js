import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BookingScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Book Appointment</Text>

      {/* Doctor Card */}
      <View style={styles.card}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Next Available:</Text>
          <Text style={styles.value}>{doctor.nextAvailable}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Consultation Fee:</Text>
          <Text style={styles.price}>${doctor.price}</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => alert("✅ Appointment booked successfully!")}
      >
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },

  /* Title */
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 30,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  doctorSpecialty: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    marginBottom: 16,
  },

  /* Info Row */
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3498db",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#27ae60",
  },

  /* Button */
  confirmButton: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#3498db",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});

export default BookingScreen;
