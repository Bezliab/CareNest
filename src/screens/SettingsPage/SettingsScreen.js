import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../../utils/AppContext';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../api/translator'; // 🔥 our translator function
import styles from './SettingsScreenStyle';

const SettingsScreen = ({ navigation }) => {
  const { darkMode, toggleTheme, notificationsEnabled, toggleNotifications } =
    useAppContext();

  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language || 'en');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [loadingLang, setLoadingLang] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('appLanguage');
        if (storedLang) {
          setLanguage(storedLang);
          await changeLanguage(storedLang); // apply on load
        }
      } catch (error) {
        console.log('Error loading saved language:', error);
      }
    };
    loadLanguage();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert(t('logout_success'), t('logout_message'));
      navigation.replace('Login');
    } catch (error) {
      Alert.alert(t('error'), error.message);
    }
  };

  // ✅ Change app language using HelpMumHQ AI Translator
  const changeLanguage = async value => {
    setShowLanguagePicker(false);
    setLoadingLang(true);
    try {
      await changeLanguage(value); // calls HelpMumHQ Translator API internally
      setLanguage(value);
      await AsyncStorage.setItem('appLanguage', value);
      Alert.alert('Success', `Language changed to ${value.toUpperCase()}`);
    } catch (err) {
      console.error('Language switch failed:', err);
      Alert.alert('Error', 'Could not change language at this time.');
    } finally {
      setLoadingLang(false);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#121212' : '#f9f9f9' },
      ]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Profile Section */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Icon name="person-circle" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? '#fff' : '#000' }]}>
          {t('edit_profile')}
        </Text>
      </TouchableOpacity>

      {/* Dark Mode */}
      <View style={styles.item}>
        <Icon name="moon" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? '#fff' : '#000' }]}>
          {t('dark_mode')}
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {/* Notifications */}
      <View style={styles.item}>
        <Icon name="notifications" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? '#fff' : '#000' }]}>
          {t('notifications')}
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Language Selection */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => setShowLanguagePicker(true)}
      >
        <Icon name="language" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? '#fff' : '#000' }]}>
          {t('language')} ({language.toUpperCase()})
        </Text>
        <Icon name="chevron-forward" size={20} color="#555" />
      </TouchableOpacity>

      {/* Modal for Language Picker */}
      <Modal
        visible={showLanguagePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t('select_language')}</Text>
            <Picker
              selectedValue={language}
              onValueChange={changeLanguage}
              style={styles.picker}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Yoruba" value="yo" />
              <Picker.Item label="Hausa" value="ha" />
              <Picker.Item label="Igbo" value="ig" />
            </Picker>

            {loadingLang ? (
              <ActivityIndicator size="large" color="#1976d2" />
            ) : (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowLanguagePicker(false)}
              >
                <Text style={styles.modalButtonText}>{t('done')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="lock-closed" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? '#fff' : '#000' }]}>
          {t('privacy_policy')}
        </Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="information-circle" size={24} color="#1976d2" />
        <Text style={[styles.itemText, { color: darkMode ? '#fff' : '#000' }]}>
          {t('about')}
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.item, styles.logout]}
        onPress={handleLogout}
      >
        <Icon name="log-out" size={24} color="#d32f2f" />
        <Text style={[styles.itemText, styles.logoutText]}>{t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
