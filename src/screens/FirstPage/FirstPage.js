// ChooseRoleScreen.js
// React Native CLI — page where user chooses to sign in as Doctor or User

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './FirstPageStyle';
export default function ChooseRoleScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://placehold.co/100x100/0f172a/ffffff?text=H' }}
            style={styles.logo}
          />
          <Text style={styles.appName}>MediConnect</Text>
          <Text style={styles.subtitle}>Sign in as a User or Doctor</Text>
        </View>

        {/* Role Selection Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Icon name="person" size={26} color="#0b72ff" />
            <Text style={styles.roleText}>Sign in as Mother</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.navigate('Doctor_Sign')}
          >
            <Icon name="medical-services" size={26} color="#0b72ff" />
            <Text style={styles.roleText}>Sign in as Doctor</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Secure healthcare access for everyone</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


