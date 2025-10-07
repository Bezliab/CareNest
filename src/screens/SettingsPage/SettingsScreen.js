import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import auth from "@react-native-firebase/auth";
import { useAppContext } from "../../utils/AppContext";
import styles from "./SettingsScreenStyle";

const SettingsScreen = ({ navigation }) => {
  const [language, setLanguage] = useState("Yoruba");
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const { darkMode, toggleTheme, notificationsEnabled, toggleNotifications } = useAppContext();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert("Logged Out", "You have been signed out successfully!");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#f9f9f9" },
      ]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Profile Section */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon name="person-circle" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      {/* Dark Mode */}
      <View style={styles.item}>
        <Icon name="moon" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>
          Dark Mode
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {/* Notifications */}
      <View style={styles.item}>
        <Icon name="notifications" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>
          Notifications
        </Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Language Selection */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => setShowLanguagePicker(true)}
      >
        <Icon name="language" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>
          Language ({language})
        </Text>
        <Icon name="chevron-forward" size={20} color="#555" />
      </TouchableOpacity>

      {/* MODAL for language picker */}
      <Modal
        visible={showLanguagePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <Picker
              selectedValue={language}
              onValueChange={(value) => setLanguage(value)}
              style={styles.picker}
            >
              <Picker.Item label="Hausa" value="Hausa" />
              <Picker.Item label="Yoruba" value="Yoruba" />
              <Picker.Item label="Igbo" value="Igbo" />
            </Picker>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowLanguagePicker(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="lock-closed" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>
          Privacy Policy
        </Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="information-circle" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? "#fff" : "#000" }]}>
          About
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.item, styles.logout]}
        onPress={handleLogout}
      >
        <Icon name="log-out" size={24} color="#d32f2f" />
        <Text style={[styles.itemText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
