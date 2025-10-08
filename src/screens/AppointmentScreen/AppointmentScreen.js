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
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './AppointmentScreenstyle';

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

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
            .filter(a => a.createdAt)
            .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

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

    // Filter by status
    if (statusFilter !== 'All') {
      data = data.filter(a => a.status === statusFilter.toLowerCase());
    }

    // Search by doctor name
    if (searchText.trim() !== '') {
      data = data.filter(a =>
        a.doctorName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sort by date
    data.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return sortOrder === 'asc'
        ? a.createdAt.toDate() - b.createdAt.toDate()
        : b.createdAt.toDate() - a.createdAt.toDate();
    });

    setFilteredAppointments(data);
  }, [appointments, searchText, statusFilter, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

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
              item.status === 'complete'
                ? styles.statusTextComplete
                : styles.statusTextPending,
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
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Appointments</Text>

        {/* Sort Button */}
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
          <Icon
            name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
            size={18}
            color="#fff"
          />
          <Text style={styles.sortText}>
            {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
          </Text>
        </TouchableOpacity>
      </View>

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


export default AppointmentScreen;
