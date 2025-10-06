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
import { auth, firestore, storage } from '../../api/firebaseConfig';
import styles from './EditProfileScreenStyle';

export default function EditProfileScreen({ navigation }) {
  const user = auth().currentUser;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  // 🔹 Load user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          const data = doc.data();
          setName(data.name || '');
          setEmail(data.email || user.email);
          setPhone(data.phone || '');
          setAddress(data.address || '');
          setBio(data.bio || '');
          setProfileImage(data.avatar || null);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Error', 'Could not load your profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 🔹 Pick image
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) Alert.alert('Error', response.errorMessage);
      else setProfileImage(response.assets[0].uri);
    });
  };

  // 🔹 Upload image
  const uploadImage = async () => {
    if (!profileImage) return null;
    const fileName = `${user.uid}_avatar.jpg`;
    const reference = storage().ref(`avatars/${fileName}`);
    await reference.putFile(profileImage);
    return await reference.getDownloadURL();
  };

  // 🔹 Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const avatarUrl = await uploadImage();

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(
          {
            name,
            email,
            phone,
            address,
            bio,
            avatar: avatarUrl || profileImage,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );

      Alert.alert('✅ Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Save Error:', error);
      Alert.alert('❌ Error', 'Failed to update profile. Try again.');
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
      <Text style={styles.header}>Edit Profile</Text>

      {/* 🔹 Profile Image */}
      <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera" size={28} color="#666" />
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* 🔹 Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholder="Short bio..."
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
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
