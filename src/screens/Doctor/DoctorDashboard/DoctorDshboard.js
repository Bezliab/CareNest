// DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DoctorDashboard({ navigation }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          const docRef = firestore().collection('doctors').doc(user.uid);
          const docSnap = await docRef.get();

          if (docSnap.exists) {
            setDoctor({ id: user.uid, ...docSnap.data() });
          } else {
            Alert.alert('Not Found', 'Doctor profile not found in database.');
          }
        } catch (error) {
          console.log('Error fetching doctor:', error);
          Alert.alert('Error', 'Could not load doctor profile.');
        } finally {
          setLoading(false);
        }
      } else {
        navigation.replace('DoctorLoginScreen');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('DoctorLoginScreen');
    } catch (error) {
      Alert.alert('Logout Failed', 'Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No doctor profile found.</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => navigation.replace('DoctorLoginScreen')}
        >
          <Text style={styles.retryText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={require('../../../Assets/doctor_avatar.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#e63946" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.infoRow}>
          <Icon name="email" size={18} color="#007AFF" />
          <Text style={styles.infoText}>{doctor.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={18} color="#007AFF" />
          <Text style={styles.infoText}>{doctor.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="hospital-building" size={18} color="#007AFF" />
          <Text style={styles.infoText}>
            {doctor.clinicName || 'No clinic info'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('DoctorAppointmentsScreen')}
      >
        <Icon name="calendar-month" size={26} color="#fff" />
        <Text style={styles.cardButtonText}>View My Appointments</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  doctorName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
  },
  specialty: {
    fontSize: 14,
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  cardButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#e63946',
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});
