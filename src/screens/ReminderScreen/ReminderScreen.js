import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./ReminderScreenStyle";

const ReminderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search reminders..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* Top Grid */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={[styles.card, { backgroundColor: "#4a90e2" }]} onPress={() => navigation.navigate("TodayScreen")}>
            <View style={styles.cardLeft}>
              <Ionicons name="calendar-outline" size={24} color="#fff" />
              <Text style={styles.cardTitle}>Today</Text>
            </View>
            <Text style={styles.cardCount}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: "#f5a623" }]} onPress={() => navigation.navigate("ScheduleScreen")}>
            <View style={styles.cardLeft}>
              <Ionicons name="time-outline" size={24} color="#fff" />
              <Text style={styles.cardTitle}>Scheduled</Text>
            </View>
            <Text style={styles.cardCount}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: "#9b59b6" }]} onPress={() => navigation.navigate("AllReminderScreen")}>
            <View style={styles.cardLeft}>
              <Ionicons name="list-circle-outline" size={24} color="#fff" />
              <Text style={styles.cardTitle}>All</Text>
            </View>
            <Text style={styles.cardCount}>12</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: "#27ae60" }]} onPress={() => navigation.navigate("CompletedScreen")}>
            <View style={styles.cardLeft}>
              <Ionicons name="checkmark-done-circle-outline" size={24} color="#fff" />
              <Text style={styles.cardTitle}>Completed</Text>
            </View>
            <Text style={styles.cardCount}>8</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor's Reminder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor's Reminder</Text>
          <View style={styles.reminderCardDoctor}>
            <Ionicons name="medkit-outline" size={22} color="#b22222" style={{ marginBottom: 6 }} />
            <Text style={styles.reminderTitle}>Prenatal Checkup</Text>
            <Text style={styles.reminderDesc}>
              Don’t forget your checkup on Oct 12, 10:00 AM.
            </Text>
          </View>
        </View>

        {/* My Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Reminders</Text>
          <View style={styles.reminderCard}>
            <Ionicons name="fitness-outline" size={20} color="#667eea" style={{ marginBottom: 6 }} />
            <Text style={styles.reminderTitle}>Take Vitamins</Text>
            <Text style={styles.reminderDesc}>Every morning at 8:00 AM</Text>
          </View>
          <View style={styles.reminderCard}>
            <Ionicons name="water-outline" size={20} color="#667eea" style={{ marginBottom: 6 }} />
            <Text style={styles.reminderTitle}>Drink Water</Text>
            <Text style={styles.reminderDesc}>8 glasses daily</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Reminder Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddReminder")}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addBtnText}>Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderScreen;


