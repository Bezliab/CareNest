import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './HistoryScreen.styles';

const HistoryPage = ({ navigation }) => {
  // Sample history data - replace with actual data from your backend
  const [historyData, setHistoryData] = useState([
    {
      id: '1',
      date: 'Dec 10, 2025',
      doctorName: 'Dr. Sarah Johnson',
      hospital: 'City General Hospital',
      type: 'Regular Checkup',
      status: 'Completed',
      notes: 'Everything looks normal. Baby heartbeat strong.',
      medications: ['Prenatal Vitamins', 'Folic Acid'],
      nextAppointment: 'Dec 24, 2025',
    },
    {
      id: '2',
      date: 'Dec 3, 2025',
      doctorName: 'Dr. Sarah Johnson',
      hospital: 'City General Hospital',
      type: 'Ultrasound Scan',
      status: 'Completed',
      notes: '20-week anatomy scan completed. All organs developing properly.',
      medications: ['Prenatal Vitamins'],
      nextAppointment: 'Dec 10, 2025',
    },
    {
      id: '3',
      date: 'Nov 26, 2025',
      doctorName: 'Dr. Michael Chen',
      hospital: 'Women Health Clinic',
      type: 'Consultation',
      status: 'Completed',
      notes: 'Initial consultation. Discussed pregnancy care plan.',
      medications: ['Prenatal Vitamins', 'Iron Supplement'],
      nextAppointment: 'Dec 3, 2025',
    },
    {
      id: '4',
      date: 'Nov 19, 2025',
      doctorName: 'Dr. Sarah Johnson',
      hospital: 'City General Hospital',
      type: 'Blood Test',
      status: 'Completed',
      notes: 'Routine blood work. All levels within normal range.',
      medications: [],
      nextAppointment: 'Nov 26, 2025',
    },
  ]);

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Completed'
              ? styles.completedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.doctorInfo}>
        <Ionicons name="person-circle-outline" size={20} color="#4A90E2" />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.hospitalText}>{item.hospital}</Text>
        </View>
      </View>

      <View style={styles.typeContainer}>
        <Ionicons name="medical-outline" size={16} color="#666" />
        <Text style={styles.typeText}>{item.type}</Text>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      {item.medications.length > 0 && (
        <View style={styles.medicationsContainer}>
          <Text style={styles.medicationsLabel}>Medications:</Text>
          <View style={styles.medicationsList}>
            {item.medications.map((med, index) => (
              <View key={index} style={styles.medicationItem}>
                <Ionicons name="medkit-outline" size={14} color="#4CAF50" />
                <Text style={styles.medicationText}>{med}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {item.nextAppointment && (
        <View style={styles.nextAppointment}>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={16}
            color="#FF6B6B"
          />
          <Text style={styles.nextAppointmentText}>
            Next: {item.nextAppointment}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{historyData.length}</Text>
          <Text style={styles.statLabel}>Total Visits</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {historyData.filter(item => item.status === 'Completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {
              historyData.filter(
                item => item.doctorName === 'Dr. Sarah Johnson',
              ).length
            }
          </Text>
          <Text style={styles.statLabel}>With Dr. Sarah</Text>
        </View>
      </View>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterButton, styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Checkups</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Scans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Tests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Consultations</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* History List */}
      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HistoryPage;
