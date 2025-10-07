import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig"; // ✅ Firebase setup

export default function DoctorPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  // ask permission (Android automatically prompts; iOS needs plist)
  const requestLocationPermission = async () => {
    return true; // permission handled automatically
  };

  // convert degrees to km distance
  function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const fetchAllDoctors = async () => {
    const doctorsRef = collection(db, "doctors");
    const snapshot = await getDocs(doctorsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const handleChooseLocation = async () => {
    const permission = await requestLocationPermission();
    if (!permission) {
      Alert.alert("Permission denied", "Please allow location access.");
      return;
    }

    setLoading(true);

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setHasLocation(true);

        try {
          const allDoctors = await fetchAllDoctors();

          // filter within 20 km radius
          const nearbyDoctors = allDoctors.filter((doc) => {
            if (doc.latitude && doc.longitude) {
              const distance = getDistance(
                latitude,
                longitude,
                doc.latitude,
                doc.longitude
              );
              return distance <= 20;
            }
            return false;
          });

          setDoctors(nearbyDoctors);
        } catch (e) {
          console.error("Error fetching doctors:", e);
          Alert.alert("Error", "Could not fetch doctors from database.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
        Alert.alert("Error", "Unable to get your location.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Nearby Doctors</Text>

      {!hasLocation ? (
        <TouchableOpacity
          onPress={handleChooseLocation}
          style={styles.locationButton}
        >
          <Text style={styles.locationButtonText}>Use My Location</Text>
        </TouchableOpacity>
      ) : loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : doctors.length === 0 ? (
        <Text style={styles.noDoctorsText}>No nearby doctors found.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {doctors.map((doc) => (
            <View key={doc.id} style={styles.card}>
              <Text style={styles.name}>{doc.name}</Text>
              <Text style={styles.specialty}>{doc.specialty}</Text>
              <Text style={styles.hospital}>{doc.hospital}</Text>
              <Text style={styles.detail}>
                ⭐ {doc.rating || "N/A"} | {doc.experience || 0} years exp.
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fa", padding: 16 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20, color: "#222" },
  locationButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  locationButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  noDoctorsText: { textAlign: "center", marginTop: 40, color: "#666" },
  scrollContainer: { paddingBottom: 40 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#111" },
  specialty: { color: "#007bff", marginTop: 4 },
  hospital: { color: "#444", marginTop: 4 },
  detail: { color: "#666", marginTop: 6, fontSize: 13 },
});
