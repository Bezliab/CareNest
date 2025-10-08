import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './DoctorProfilestyle';

const DoctorProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.avatarSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Dr. Alexandra Miles</Text>
          <Text style={styles.specialty}>Obstetrician / Gynecologist</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#667eea" />
            <Text style={styles.infoText}>alex.miles@carenest.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="call" size={20} color="#667eea" />
            <Text style={styles.infoText}>+1 234 567 890</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Passionate about supporting expectant mothers through safe, informed, and
            empowering pregnancy journeys. Dedicated to patient care and evidence-based medicine.
          </Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};



export default DoctorProfile;
