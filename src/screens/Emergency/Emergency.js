// screens/EmergencyScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/Ionicons";
import { requestPermissions } from "../../utils/permissions"; 

// ✅ Demo JSON data (clinics with coordinates)
const clinics = [
  { name: "City Clinic", phone: "+2348012345678", latitude: 6.5244, longitude: 3.3792 },
  { name: "General Hospital", phone: "+2348098765432", latitude: 6.4654, longitude: 3.4064 },
  { name: "Community Health Center", phone: "+2348071122334", latitude: 6.6000, longitude: 3.3500 },
];

const EmergencyScreen = () => {
  const [nearestClinic, setNearestClinic] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // ask permissions on screen load
    requestPermissions();
    loadSavedContact();
  }, []);

  // Load saved contact from storage
  const loadSavedContact = async () => {
    try {
      const saved = await AsyncStorage.getItem("emergencyContact");
      if (saved) setEmergencyContact(JSON.parse(saved));
    } catch (err) {
      console.warn("Error loading contact:", err);
    }
  };

  // Save emergency contact
  const saveContact = async (contact) => {
    try {
      await AsyncStorage.setItem("emergencyContact", JSON.stringify(contact));
      setEmergencyContact(contact);
      Alert.alert("✅ Saved", `${contact.name} set as your emergency contact`);
    } catch (err) {
      console.warn("Error saving contact:", err);
    }
  };

  // Find nearest clinic
  const findNearestClinic = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        // simple distance calculation
        let nearest = null;
        let minDist = Number.MAX_VALUE;
        clinics.forEach((clinic) => {
          const dist = Math.sqrt(
            Math.pow(latitude - clinic.latitude, 2) +
            Math.pow(longitude - clinic.longitude, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            nearest = clinic;
          }
        });
        setNearestClinic(nearest);
      },
      (error) => {
        Alert.alert("Permission Needed", "Location permission required.");
        console.log("Location error:", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Call clinic
  const callClinic = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  // Send emergency SMS with location
  const sendEmergencySMS = () => {
    if (!emergencyContact) {
      Alert.alert("No Contact", "Please save an emergency contact first.");
      return;
    }

    if (!userLocation) {
      Alert.alert("No Location", "Please find your location first.");
      return;
    }

    const { latitude, longitude } = userLocation;
    const message = `🚨 Emergency! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;

    Linking.openURL(
      `sms:${emergencyContact.phone}?body=${encodeURIComponent(message)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 Emergency Page</Text>

      {/* Find nearest clinic */}
      <TouchableOpacity style={styles.button} onPress={findNearestClinic}>
        <Icon name="locate" size={22} color="#fff" />
        <Text style={styles.buttonText}>Find Nearest Clinic</Text>
      </TouchableOpacity>

      {nearestClinic && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{nearestClinic.name}</Text>
          <Text style={styles.cardSub}>{nearestClinic.phone}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => callClinic(nearestClinic.phone)}
            >
              <Icon name="call" size={22} color="#fff" />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => saveContact(nearestClinic)}
            >
              <Icon name="star" size={22} color="#fff" />
              <Text style={styles.iconText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Send SMS */}
      <TouchableOpacity style={styles.smsButton} onPress={sendEmergencySMS}>
        <Icon name="chatbox" size={22} color="#fff" />
        <Text style={styles.buttonText}>Send Emergency SMS</Text>
      </TouchableOpacity>

      {emergencyContact && (
        <Text style={styles.savedContact}>
          ⭐ Emergency Contact: {emergencyContact.name} ({emergencyContact.phone})
        </Text>
      )}
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  smsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardSub: { fontSize: 14, color: "#555", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  iconText: { color: "#fff", fontWeight: "600", marginLeft: 5 },
  savedContact: { textAlign: "center", marginTop: 10, fontSize: 14, fontWeight: "500" },
});
