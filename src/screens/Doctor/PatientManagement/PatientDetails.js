//This is PatientDetails.js


import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './PatientManagementStyle';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../api/firebaseConfig';

const PatientDetails = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const d = await getDoc(doc(db, 'patients', patientId));
        if (d.exists()) setPatient({ id: d.id, ...d.data() });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [patientId]);

  const markVisited = async () => {
    try {
      await updateDoc(doc(db, 'patients', patientId), { lastVisit: new Date() });
      Alert.alert('Success', 'Marked last visit');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not update patient');
    }
  };

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#0f766e" /></View>;

  if (!patient) return <View style={styles.loader}><Text>No patient found</Text></View>;

  return (
    <SafeAreaView style={[styles.container, { padding: 16 }]}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{patient.name}</Text>
      <Text style={{ color: '#64748b', marginTop: 8 }}>{patient.age ? ${patient.age} yrs : 'Age not set'}</Text>
      <Text style={{ color: '#64748b', marginTop: 4 }}>{patient.phone ?? 'Phone not set'}</Text>

      <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#0f766e', padding: 12, borderRadius: 8 }} onPress={markVisited}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Mark Visit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PatientDetails;