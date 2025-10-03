// screens/SettingsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import styles from "./SettingsScreenStyle";

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("Yoruba"); // default language
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* <Text style={styles.header}>⚙️ Settings</Text> */}

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon name="person-circle" size={24} color="#1976d2" />
        <Text style={styles.itemText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Theme Toggle */}
      <View style={styles.item}>
        <Icon name="moon" size={24} color="#1976d2" />
        <Text style={styles.itemText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {/* Language Selection */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => setShowLanguagePicker((s) => !s)}
      >
        <Icon name="language" size={24} color="#1976d2" />
        <Text style={styles.itemText}>Language ({language})</Text>
        <Icon
          name={showLanguagePicker ? "chevron-up" : "chevron-down"}
          size={20}
          color="#555"
        />
      </TouchableOpacity>

      {/* Show Picker only when expanded */}
      {showLanguagePicker && (
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={language}
            onValueChange={(value) => {
              setLanguage(value);
              setShowLanguagePicker(false); // close after choosing
            }}
            mode="dropdown"
            style={[
              styles.dropdown,
              Platform.OS === "ios" ? { height: 180 } : { height: 48, color: "#000" },
            ]}
            itemStyle={Platform.OS === "ios" ? { fontSize: 18, color: "#000" } : {}}
          >
            <Picker.Item label="Hausa" value="Hausa" />
            <Picker.Item label="Yoruba" value="Yoruba" />
            <Picker.Item label="Igbo" value="Igbo" />
          </Picker>
        </View>
      )}

      {/* Notifications */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="notifications" size={24} color="#1976d2" />
        <Text style={styles.itemText}>Notifications</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="lock-closed" size={24} color="#1976d2" />
        <Text style={styles.itemText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="information-circle" size={24} color="#1976d2" />
        <Text style={styles.itemText}>About</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={[styles.item, styles.logout]} onPress={() => {}}>
        <Icon name="log-out" size={24} color="#d32f2f" />
        <Text style={[styles.itemText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
