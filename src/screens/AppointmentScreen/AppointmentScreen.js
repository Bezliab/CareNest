import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // All / Pending / Complete

  const currentUser = auth().currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('appointments')
      .where('patientId', '==', currentUser.uid)
      .onSnapshot(
        snapshot => {
          const data = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => {
              if (!a.createdAt) return 1;
              if (!b.createdAt) return -1;
              return b.createdAt.toDate() - a.createdAt.toDate();
            });

          setAppointments(data);
          setLoading(false);
        },
        error => {
          console.log('Firestore error:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let data = [...appointments];

    if (statusFilter !== 'All') {
      data = data.filter(a => a.status === statusFilter.toLowerCase());
    }

    if (searchText.trim() !== '') {
      data = data.filter(a =>
        a.doctorName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredAppointments(data);
  }, [appointments, searchText, statusFilter]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (filteredAppointments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No appointments found.</Text>
      </View>
    );
  }

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>{item.doctorName}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'complete' ? styles.statusComplete : styles.statusPending,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'complete' ? styles.statusTextComplete : styles.statusTextPending,
            ]}
          >
            {item.status ? item.status.toUpperCase() : 'PENDING'}
          </Text>
        </View>
      </View>
      <Text style={styles.info}>Specialty: {item.specialty}</Text>
      <Text style={styles.info}>Date: {item.date}</Text>
      <Text style={styles.info}>Time: {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>My Appointments</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by doctor name..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Status Filter */}
      <View style={styles.filterContainer}>
        {['All', 'Pending', 'Complete'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              statusFilter === status && styles.filterButtonSelected,
            ]}
            onPress={() => setStatusFilter(status)}
          >
            <Text
              style={[
                styles.filterText,
                statusFilter === status && styles.filterTextSelected,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointments List */}
      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
  searchInput: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDEDED',
  },
  filterButtonSelected: { backgroundColor: '#007AFF' },
  filterText: { fontSize: 14, color: '#666' },
  filterTextSelected: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  doctorName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  info: { fontSize: 14, color: '#666', marginBottom: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusPending: { backgroundColor: '#FFF5E5' },
  statusComplete: { backgroundColor: '#E6F9F1' },
  statusText: { fontSize: 12, fontWeight: '600' },
  statusTextPending: { color: '#FFA800' },
  statusTextComplete: { color: '#00C853' },
});

export default AppointmentScreen;
