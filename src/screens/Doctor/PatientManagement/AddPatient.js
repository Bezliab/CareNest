import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './PatientManagementStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, db } from '../../../api/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddPatient = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert('Validation', 'Please enter patient name');
    setSaving(true);
    try {
      const user = auth.currentUser;
      const docRef = await addDoc(collection(db, 'patients'), {
        name: name.trim(),
        age: age ? Number(age) : null,
        phone: phone || null,
        doctorId: user?.uid ?? null,
        createdAt: serverTimestamp(),
      });
      setSaving(false);
      navigation.goBack();
    } catch (e) {
      console.error(e);
      setSaving(false);
      Alert.alert('Error', 'Could not add patient.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 16 }]}>
      <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Add Patient</Text>

      <View style={{ marginBottom: 12 }}>
        <Text style={{ marginBottom: 6 }}>Full name</Text>
        <TextInput placeholder="Jane Doe" value={name} onChangeText={setName} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text style={{ marginBottom: 6 }}>Age</Text>
        <TextInput keyboardType="numeric" placeholder="30" value={age} onChangeText={setAge} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text style={{ marginBottom: 6 }}>Phone</Text>
        <TextInput keyboardType="phone-pad" placeholder="+234..." value={phone} onChangeText={setPhone} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
      </View>

      <TouchableOpacity style={{ backgroundColor: '#0f766e', padding: 14, borderRadius: 10, alignItems: 'center' }} onPress={handleSave} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>Save Patient</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddPatient;
