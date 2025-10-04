import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import { auth, firestore, storage } from "../../api/firebaseConfig"; // ✅ React Native Firebase
import styles from "./EditProfileScreenStyle";

export default function EditProfileScreen({ navigation }) {
  const user = auth().currentUser;
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;
        const doc = await firestore().collection("users").doc(user.uid).get();
        if (doc.exists) {
          const data = doc.data();
          setName(data.name || "");
          setEmail(data.email || user.email);
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setBio(data.bio || "");
          setProfileImage(data.avatar || null);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        Alert.alert("Error", "Could not load your profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Pick image from gallery
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 1 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) Alert.alert("Error", response.errorMessage);
        else setProfileImage(response.assets[0].uri);
      }
    );
  };

  // ✅ Upload image to Firebase Storage
  const uploadImage = async () => {
    if (!profileImage) return null;
    const fileName = `${user.uid}_avatar.jpg`;
    const reference = storage().ref(`avatars/${fileName}`);
    await reference.putFile(profileImage);
    const url = await reference.getDownloadURL();
    return url;
  };

  // ✅ Save changes to Firestore
  const handleSave = async () => {
    try {
      setLoading(true);
      const avatarUrl = await uploadImage();

      await firestore().collection("users").doc(user.uid).set(
        {
          name,
          email,
          phone,
          address,
          bio,
          avatar: avatarUrl || profileImage,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true } // merge keeps old data
      );

      Alert.alert("✅ Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert("❌ Error", "Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Image */}
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

      {/* Form Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          editable={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput value={address} onChangeText={setAddress} style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          style={[styles.input, { height: 80 }]}
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
