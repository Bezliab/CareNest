// screens/EditProfileScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker"; // ✅ no expo
import styles from "./EditProfileScreenStyle";

export default function EditProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("janedoe@example.com");
  const [phone, setPhone] = useState("+2348012345678");
  const [address, setAddress] = useState("Lagos, Nigeria");
  const [bio, setBio] = useState("Pregnant mom-to-be, 28 weeks ❤️");

  // Open image picker
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          Alert.alert("Error", response.errorMessage || "Something went wrong");
        } else {
          const uri = response.assets[0].uri;
          setProfileImage(uri);
        }
      }
    );
  };

  const handleSave = () => {
    Alert.alert("✅ Success", "Profile updated successfully!");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.header}>✏️ Edit Profile</Text>

      {/* Profile Picture */}
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

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          style={[styles.input, { height: 80 }]}
          placeholder="Tell us about yourself..."
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
