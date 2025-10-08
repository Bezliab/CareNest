//PATIENT MANGAGEMENT PAGE

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './PatientManagementStyle';
import { auth, db } from '../../../api/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const PatientRow = ({ p, onPress }) => (
  <TouchableOpacity style={styles.patientCard} onPress={() => onPress(p)}>
    <View>
      <Text style={styles.patientName}>{p.name}
        
      </Text>
      <Text style={styles.patientMeta}>
      <Text style={styles.patientMeta}>
        {p.age ? `${p.age} yrs` : '—'} • {p.lastVisit && p.lastVisit.toMillis ? new Date(p.lastVisit.toMillis()).toLocaleDateString() : 'No visits'}
      </Text>     
       </Text>
    </View>
    <Icon name="chevron-right" size={24} color="#94a3b8" />
  </TouchableOpacity>
);

const PatientManagement = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qText, setQText] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Listen to patients assigned to this doctor. Adjust field 'doctorId' if your schema differs.
    const patientsRef = collection(db, 'patients');
    const q = query(patientsRef, where('doctorId', '==', user.uid));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setPatients(arr);
      setLoading(false);
    }, err => {
      console.error('patients listen error', err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filtered = patients.filter(p => p.name?.toLowerCase().includes(qText.toLowerCase()));

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Patients</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddPatient')}>
          <Icon name="person-add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <Icon name="search" size={20} color="#94a3b8" />
        <TextInput
          placeholder="Search patients..."
          value={qText}
          onChangeText={setQText}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) =>
          <PatientRow p={item} onPress={(p) => navigation.navigate('PatientDetails', { patientId: p.id })} />
        }
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default PatientManagement;
