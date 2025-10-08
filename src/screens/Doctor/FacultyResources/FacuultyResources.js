//Facilities resources page


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< HEAD
import styles from './FacuultyResourcesStyles';
=======
import styles from './FacilityResourcesStyle';
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../../api/firebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const ResourceCard = ({ r, onManage }) => (
  <View style={styles.resourceCard}>
    <View>
      <Text style={styles.resourceTitle}>{r.name}</Text>
      <Text style={styles.resourceMeta}>{r.type ?? 'Equipment'} • {r.status ?? 'available'}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.resourceCount}>{r.count ?? 0}</Text>
      <TouchableOpacity style={styles.smallBtn} onPress={() => onManage(r)}><Text style={{ color: '#fff' }}>Manage</Text></TouchableOpacity>
    </View>
  </View>
);

const FacilityResources = ({ navigation }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'resources');
    const unsub = onSnapshot(ref, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setResources(arr);
      setLoading(false);
    }, err => {
      console.error(err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleManage = async (r) => {
    // sample quick action: toggle status available/maintenance
    try {
      await updateDoc(doc(db, 'resources', r.id), { status: r.status === 'available' ? 'maintenance' : 'available' });
<<<<<<< HEAD
    Alert.alert('Updated', 'Resource status toggled.');

=======
      Alert.alert('Updated', Resource status toggled.);
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not update resource');
    }
  };

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#0f766e" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Facility Resources</Text>
        <TouchableOpacity style={styles.requestBtn} onPress={() => navigation.navigate('ResourceRequests')}>
          <Icon name="report-problem" size={18} color="#fff" />
          <Text style={{ color: '#fff', marginLeft: 8 }}>Request Maintenance</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={resources} keyExtractor={i => i.id} renderItem={({ item }) => <ResourceCard r={item} onManage={handleManage} />} contentContainerStyle={{ padding: 16 }} />
    </SafeAreaView>
  );
};

export default FacilityResources;
