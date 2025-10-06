import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, firestore } from '../../api/firebaseConfig';
import styles from './ProfileScreenStyle';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // 🔹 Real-time listener to update profile when edited
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        doc => {
          if (doc.exists) {
            setUserData(doc.data());
          }
          setLoading(false);
        },
        error => {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Could not load profile data.');
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* 🔹 HEADER WITH GRADIENT */}
      <LinearGradient
        colors={['#74b9ff', '#a29bfe']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Image
            source={{
              uri:
                userData?.avatar ||
                'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData?.name || 'User'}</Text>
          <Text style={styles.bio}>
            {userData?.bio || 'Excited mom-to-be 💕'}
          </Text>
        </View>
      </LinearGradient>

      {/* 🔹 PERSONAL INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoRow}>
          <Icon name="mail-outline" size={20} color="#1976d2" />
          <Text style={styles.infoText}>
            {userData?.email || 'No email provided'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="call-outline" size={20} color="#1976d2" />
          <Text style={styles.infoText}>
            {userData?.phone || 'No phone number'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="location-outline" size={20} color="#1976d2" />
          <Text style={styles.infoText}>
            {userData?.address || 'No address added'}
          </Text>
        </View>
      </View>

      {/* 🔹 QUICK STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Icon name="alarm-outline" size={24} color="#1976d2" />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Reminders</Text>
        </View>
        <View style={styles.statBox}>
          <Icon name="chatbubbles-outline" size={24} color="#1976d2" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Messages</Text>
        </View>
        <View style={styles.statBox}>
          <Icon name="calendar-outline" size={24} color="#1976d2" />
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </View>
      </View>

      {/* 🔹 QUICK ACTIONS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Icon name="create-outline" size={17} color="#fff" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate('Reminder')}
          >
            <Icon name="alarm-outline" size={17} color="#fff" />
            <Text style={styles.actionText}>Reminders</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔹 SETTINGS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => navigation.navigate('HelpCenter')}
        >
          <Icon name="help-circle-outline" size={22} color="#1976d2" />
          <Text style={styles.settingText}>Help Center</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Icon name="notifications-outline" size={22} color="#1976d2" />
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={async () => {
            await auth().signOut();
            navigation.replace('Login');
          }}
        >
          <Icon name="log-out-outline" size={22} color="red" />
          <Text style={[styles.settingText, { color: 'red' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
