import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, db, storage } from '../../api/firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './EditProfileScreenStyle';

// 🟢 i18n + HelpMum translator
import i18n, { helpMumTranslate } from '../../api/translator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../utils/themeContext';

export default function EditProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const dynamicStyles = {
    backgroundColor: isDark ? '#121212' : '#fff',
    color: isDark ? '#fff' : '#000',
    inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
    borderColor: isDark ? '#333' : '#ddd',
  };
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [lang, setLang] = useState('en'); // track current language

  // 🟡 Load selected language from AsyncStorage
  useEffect(() => {
    const loadLang = async () => {
      try {
        const stored = await AsyncStorage.getItem('appLanguage');
        if (stored) setLang(stored);
      } catch (err) {
        console.warn('Language load error:', err);
      }
    };
    loadLang();
  }, []);

  // 🔹 Wait for Firebase Auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (!currentUser) {
        Alert.alert(
          await helpMumTranslate('Error', lang),
          await helpMumTranslate('User not logged in.', lang),
        );
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setEmail(currentUser.email || '');

      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setAddress(data.address || '');
          setBio(data.bio || '');
          setProfileImage(data.avatar || null);
        } else {
          // Create user document if not existing
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            name: '',
            phone: '',
            address: '',
            bio: '',
            avatar: '',
            createdAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        Alert.alert(
          await helpMumTranslate('Error', lang),
          await helpMumTranslate('Could not load your profile data.', lang),
        );
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [lang]);

  // 🔹 Pick image from gallery
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) Alert.alert('Error', response.errorMessage);
      else setProfileImage(response.assets[0].uri);
    });
  };

  // 🔹 Upload image to Firebase Storage
  const uploadImage = async () => {
    if (!profileImage) return null;
    const response = await fetch(profileImage);
    const blob = await response.blob();

    const fileRef = ref(storage, `avatars/${user.uid}.jpg`);
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
  };

  // 🔹 Save profile changes
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      let avatarUrl = profileImage;

      // Upload new image if it's local
      if (profileImage && profileImage.startsWith('file://')) {
        avatarUrl = await uploadImage();
      }

      await updateDoc(userRef, {
        name,
        phone,
        address,
        bio,
        avatar: avatarUrl || null,
        updatedAt: serverTimestamp(),
      });

      Alert.alert(
        await helpMumTranslate('Success', lang),
        await helpMumTranslate('Profile updated successfully!', lang),
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        await helpMumTranslate('Error', lang),
        await helpMumTranslate('Failed to update profile.', lang),
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.header}>
        {i18n.t('editProfileTitle', { defaultValue: 'Edit Profile' })}
      </Text>

      {/* 🔹 Profile Image */}
      <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera" size={28} color="#666" />
            <Text style={styles.placeholderText}>
              {i18n.t('addPhoto', { defaultValue: 'Add Photo' })}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 🔹 Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {i18n.t('fullName', { defaultValue: 'Full Name' })}
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={i18n.t('enterName', { defaultValue: 'Enter your name' })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {i18n.t('email', { defaultValue: 'Email' })}
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f0f0f0' }]}
          value={email}
          editable={false}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {i18n.t('phone', { defaultValue: 'Phone Number' })}
        </Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder={i18n.t('enterPhone', {
            defaultValue: 'Enter your phone number',
          })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {i18n.t('address', { defaultValue: 'Address' })}
        </Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder={i18n.t('enterAddress', {
            defaultValue: 'Enter your address',
          })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {i18n.t('bio', { defaultValue: 'Bio' })}
        </Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder={i18n.t('shortBio', { defaultValue: 'Short bio...' })}
        />
      </View>

      {/* 🔹 Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, saving && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {i18n.t('saveChanges', { defaultValue: 'Save Changes' })}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
