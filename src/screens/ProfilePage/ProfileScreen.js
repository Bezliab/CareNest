// screens/ProfileScreen.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./ProfileScreenStyle";

const ProfileScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(28); // current week of pregnancy (example: 28 weeks)

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Mary Johnson</Text>
        <Text style={styles.subText}>Age: 29 | 28 Weeks Pregnant</Text>
      </View>

      {/* Pregnancy Progress */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pregnancy Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(progress / 40) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress} / 40 Weeks</Text>
      </View>

      {/* Personal Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={20} color="#1976d2" />
          <Text style={styles.infoText}>Due Date: 15th December 2025</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="call" size={20} color="#1976d2" />
          <Text style={styles.infoText}>Emergency Contact: +234 801 234 5678</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="medkit" size={20} color="#1976d2" />
          <Text style={styles.infoText}>Doctor: Dr. Akinwale (Obstetrician)</Text>
        </View>
      </View>

      {/* Health Stats */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Health Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>68 kg</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>110/75</Text>
            <Text style={styles.statLabel}>BP</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1 Sept</Text>
            <Text style={styles.statLabel}>Last Checkup</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("EditProfile")}>
            <Icon name="create" size={17} color="#fff" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("Reminder")}>
            <Icon name="alarm" size={17} color="#fff" />
            <Text style={styles.actionText}>Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("Doctor")}>
            <Icon name="chatbubbles" size={17} color="#fff" />
            <Text style={styles.actionText}>Contact Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Support & Education</Text>
        <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("Article")}>
          <Icon name="book" size={20} color="#1976d2" />
          <Text style={styles.linkText}>Read Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("Faq")}>
          <Icon name="help-circle" size={20} color="#1976d2" />
          <Text style={styles.linkText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("HelpCenter")}>
          <Icon name="call" size={20} color="#1976d2" />
          <Text style={styles.linkText}>Help Center</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
