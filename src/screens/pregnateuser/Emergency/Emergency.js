// screens/EmergencyScreen.js
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { ensureLocationPermissionWithAlert } from '../../../utils/permissions';

// Demo JSON data (clinics with coordinates)
const clinics = [
  {
    name: 'City Clinic',
    phone: '+2348012345678',
    latitude: 6.5244,
    longitude: 3.3792,
  },
  {
    name: 'General Hospital',
    phone: '+2348098765432',
    latitude: 6.4654,
    longitude: 3.4064,
  },
  {
    name: 'Community Health Center',
    phone: '+2348071122334',
    latitude: 6.6,
    longitude: 3.35,
  },
];

const EMERGENCY_CONTACT_KEY = 'emergencyContact';

const EmergencyScreen = () => {
  const [nearestClinic, setNearestClinic] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    // Ask permission on mount and load saved contact
    (async () => {
      await ensureLocationPermissionWithAlert();
      loadSavedContact();
    })();

    // cleanup watch if any
    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  // Load saved contact from storage
  const loadSavedContact = async () => {
    try {
      const saved = await AsyncStorage.getItem(EMERGENCY_CONTACT_KEY);
      if (saved) setEmergencyContact(JSON.parse(saved));
    } catch (err) {
      console.warn('Error loading contact:', err);
    }
  };

  // Save emergency contact
  const saveContact = async contact => {
    try {
      await AsyncStorage.setItem(
        EMERGENCY_CONTACT_KEY,
        JSON.stringify(contact),
      );
      setEmergencyContact(contact);
      Alert.alert('Saved', `${contact.name} set as your emergency contact`);
    } catch (err) {
      console.warn('Error saving contact:', err);
    }
  };

  // Helper: calculate simple squared Euclidean distance (enough for small deltas)
  const _distanceSq = (lat1, lon1, lat2, lon2) => {
    return Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2);
  };

  // Find nearest clinic (asks permission, gets current position)
  const findNearestClinic = async () => {
    const ok = await ensureLocationPermissionWithAlert();
    if (!ok) return;

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        let nearest = null;
        let minDist = Number.POSITIVE_INFINITY;
        for (const clinic of clinics) {
          const dist = _distanceSq(
            latitude,
            longitude,
            clinic.latitude,
            clinic.longitude,
          );
          if (dist < minDist) {
            minDist = dist;
            nearest = clinic;
          }
        }
        setNearestClinic(nearest);
      },
      error => {
        console.warn('Location error:', error);
        Alert.alert(
          'Location error',
          error.message || 'Unable to fetch location.',
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        // Android-only option that forces location prompt on some devices:
        forceRequestLocation: Platform.OS === 'android',
      },
    );
  };

  // Optional: start watching user location (not used by default)
  const startWatchPosition = async () => {
    const ok = await ensureLocationPermissionWithAlert();
    if (!ok) return;

    watchIdRef.current = Geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ latitude, longitude });
      },
      err => console.warn('watch error', err),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  };

  // Call clinic

  const callClinic = phone => {
    Linking.openURL(`tel:${phone}`).catch(err => {
      console.warn('Call error', err);
      Alert.alert('Error', 'Unable to make a call.');
    });

  };

  // Send emergency SMS with location
  const sendEmergencySMS = () => {
    if (!emergencyContact) {
      Alert.alert('No Contact', 'Please save an emergency contact first.');
      return;
    }
    if (!userLocation) {
      Alert.alert('No Location', 'Please find your location first.');
      return;
    }

    const { latitude, longitude } = userLocation;
    const message = `🚨 Emergency! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;

    const smsUrl = `sms:${emergencyContact.phone}${
      Platform.OS === 'ios' ? '&' : '?'
    }body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl).catch(err => {
      console.warn('SMS error', err);
      Alert.alert('Error', 'Unable to open SMS app.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 Emergency Page</Text>

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

      <TouchableOpacity style={styles.smsButton} onPress={sendEmergencySMS}>
        <Icon name="chatbox" size={22} color="#fff" />
        <Text style={styles.buttonText}>Send Emergency SMS</Text>
      </TouchableOpacity>

      {emergencyContact && (
        <Text style={styles.savedContact}>
          ⭐ Emergency Contact: {emergencyContact.name} (
          {emergencyContact.phone})
        </Text>
      )}
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  smsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardSub: { fontSize: 14, color: '#555', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  iconText: { color: '#fff', fontWeight: '600', marginLeft: 5 },
  savedContact: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },

  iconText: { color: "#fff", fontWeight: "600", marginLeft: 5 },
  savedContact: { textAlign: "center", marginTop: 10, fontSize: 14, fontWeight: "500" },

  iconText: { color: '#fff', fontWeight: '600', marginLeft: 5 },
  savedContact: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },

});
