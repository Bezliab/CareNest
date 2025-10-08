// screens/HelpCenterScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './HelpCentreStyle';
import { useTheme } from '../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

export default function HelpCenterScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/* <Text style={styles.header}>🆘 Help Centre</Text> */}

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search help topics..."
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Quick Help Topics */}
      <Text style={styles.sectionTitle}>Quick Help Topics</Text>
      <TouchableOpacity style={styles.helpItem}>
        <Icon name="person-circle-outline" size={24} color="#1976d2" />
        <Text style={styles.helpText}>Managing your profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.helpItem}>
        <Icon name="notifications-outline" size={24} color="#1976d2" />
        <Text style={styles.helpText}>Notification settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.helpItem}>
        <Icon name="lock-closed-outline" size={24} color="#1976d2" />
        <Text style={styles.helpText}>Privacy and security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.helpItem}>
        <Icon name="language-outline" size={24} color="#1976d2" />
        <Text style={styles.helpText}>Changing app language</Text>
      </TouchableOpacity>

      {/* Contact Support */}
      <Text style={styles.sectionTitle}>Need More Help?</Text>
      <TouchableOpacity style={styles.contactButton}>
        <Icon name="chatbubbles-outline" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Chat with Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Icon name="mail-outline" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Email Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Icon name="call-outline" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Call Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
