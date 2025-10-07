import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Signupscreenstyle';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 👶 Pregnancy tracking
  const [useLmp, setUseLmp] = useState(false);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [lastPeriodDate, setLastPeriodDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const relations = ['Husband', 'Friend', 'Son', 'Daughter', 'Others'];

  // 📸 Select Image Function
  const selectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  // 📅 Handle Date Selection
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (!selectedDate) return;

    if (useLmp) {
      setLastPeriodDate(selectedDate);
      const edd = new Date(selectedDate);
      edd.setDate(edd.getDate() + 280); // 40 weeks
      setExpectedDeliveryDate(edd);
    } else {
      setExpectedDeliveryDate(selectedDate);
    }
  };

  // 🧭 Handle Signup
  const handleSignup = async () => {
    if (
      !name ||
      !emailOrPhone ||
      !password ||
      !emergencyRelation ||
      !emergencyName ||
      !emergencyPhone ||
      !expectedDeliveryDate
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await auth().createUserWithEmailAndPassword(
        emailOrPhone,
        password,
      );
      const userId = userCredential.user.uid;

      let photoURL = null;

      // 🖼 Upload Profile Picture
      if (photo) {
        setUploading(true);
        const reference = storage().ref(`profilePictures/${userId}.jpg`);
        await reference.putFile(photo.uri);
        photoURL = await reference.getDownloadURL();
        setUploading(false);
      }

      // 💾 Save user data in Firestore
      await firestore()
        .collection('users')
        .doc(userId)
        .set({
          name,
          emailOrPhone,
          emergencyRelation,
          emergencyName,
          emergencyPhone,
          photoURL,
          expectedDeliveryDate: expectedDeliveryDate.toISOString(),
          lastPeriodDate: lastPeriodDate ? lastPeriodDate.toISOString() : null,
          createdAt: new Date().toISOString(),
        });

      Alert.alert('Success', 'Account created successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (error) {
      console.error('Signup Error:', error);
      let message = error.message;

      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }

      Alert.alert('Signup Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      {/* 📸 Profile Picture Upload */}
      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.profileImage} />
        ) : (
          <Icon name="camera-outline" size={50} color="#666" />
        )}
        <Text style={styles.imageText}>
          {photo ? 'Change Photo' : 'Upload Profile Picture'}
        </Text>
      </TouchableOpacity>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Icon
          name="person-outline"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone number"
          placeholderTextColor="#999"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon
          name="lock-closed-outline"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#666"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      {/* Emergency Contact Relation */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>
          {emergencyRelation || 'Select your emergency contact'}
        </Text>
        <Icon
          name={showDropdown ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={18}
          color="#666"
        />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {relations.map(relation => (
            <TouchableOpacity
              key={relation}
              onPress={() => {
                setEmergencyRelation(relation);
                setShowDropdown(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownItemText}>{relation}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Emergency Contact Name */}
      <View style={styles.inputContainer}>
        <Icon
          name="person-circle-outline"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter emergency contact name"
          placeholderTextColor="#999"
          value={emergencyName}
          onChangeText={setEmergencyName}
        />
      </View>

      {/* Emergency Contact Phone */}
      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Emergency contact phone number"
          placeholderTextColor="#999"
          value={emergencyPhone}
          onChangeText={setEmergencyPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Pregnancy Details */}
      <View style={{ marginVertical: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
          Pregnancy Details
        </Text>

        <TouchableOpacity
          onPress={() => setUseLmp(!useLmp)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <Icon
            name={useLmp ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color="#2563eb"
          />
          <Text style={{ marginLeft: 8 }}>
            Use Last Menstrual Period (LMP) to calculate EDD
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Icon name="calendar-outline" size={20} color="#2563eb" />
          <Text style={{ marginLeft: 8 }}>
            {useLmp
              ? lastPeriodDate
                ? `LMP: ${lastPeriodDate.toDateString()}`
                : 'Select Last Period Date'
              : expectedDeliveryDate
              ? `EDD: ${expectedDeliveryDate.toDateString()}`
              : 'Select Expected Delivery Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Already Have Account */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={{ color: '#2563eb', fontWeight: '600' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
