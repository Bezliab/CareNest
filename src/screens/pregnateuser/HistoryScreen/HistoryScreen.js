import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './HistoryScreen.styles';

const HistoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const historyData = {
    appointments: [
      {
        id: 1,
        type: 'appointment',
        title: 'Routine Checkup',
        doctor: 'Dr. Aisha',
        date: 'Dec 10, 2025',
        time: '10:00 AM',
        status: 'completed',
        notes: 'Baby heartbeat strong, all vitals normal',
        achievements: ['Perfect weight gain', 'Blood pressure optimal'],
      },
      {
        id: 2,
        type: 'appointment',
        title: 'Ultrasound Scan',
        doctor: 'Dr. Chen',
        date: 'Nov 28, 2025',
        time: '2:30 PM',
        status: 'completed',
        notes: '20-week anatomy scan completed successfully',
        achievements: ['Clear scan results', 'Baby developing perfectly'],
      },
    ],
    milestones: [
      {
        id: 3,
        type: 'milestone',
        title: 'First Baby Kick',
        date: 'Nov 15, 2025',
        description: 'Felt the first strong kicks!',
        icon: 'heart',
        achievement: 'Milestone Reached',
      },
    ],
    tests: [
      {
        id: 5,
        type: 'test',
        title: 'Blood Work',
        doctor: 'Dr. Rodriguez',
        date: 'Nov 5, 2025',
        results: 'All levels normal',
        status: 'completed',
        achievements: ['Excellent iron levels', 'Perfect glucose reading'],
      },
    ],
  };

  const filters = [
    { id: 'all', label: 'All History' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'tests', label: 'Tests' },
  ];

  const getFilteredData = () => {
    if (selectedFilter === 'all') {
      return [
        ...historyData.appointments,
        ...historyData.milestones,
        ...historyData.tests,
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return historyData[selectedFilter];
  };

  const renderItem = item => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons
            name={
              item.type === 'appointment'
                ? 'calendar'
                : item.type === 'milestone'
                ? item.icon
                : 'flask'
            }
            size={20}
            color={
              item.type === 'appointment'
                ? '#6B73A3'
                : item.type === 'milestone'
                ? '#FF6B6B'
                : '#4ECDC4'
            }
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.infoText}>{item.date}</Text>
          {item.doctor && (
            <Text style={styles.infoText}>Doctor: {item.doctor}</Text>
          )}
          {item.time && <Text style={styles.infoText}>Time: {item.time}</Text>}
          {item.results && (
            <Text style={styles.infoText}>Results: {item.results}</Text>
          )}
          {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History & Achievements</Text>
        <Text style={styles.headerSubtitle}>Your pregnancy journey</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter.id && styles.filterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* History List */}
      <ScrollView
        style={styles.historyList}
        contentContainerStyle={styles.historyListContent}
        showsVerticalScrollIndicator={false}
      >
        {getFilteredData().map(item => (
          <View key={item.id} style={styles.historyItem}>
            {renderItem(item)}
          </View>
        ))}

        {getFilteredData().length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#CCC" />
            <Text style={styles.emptyStateText}>No records found</Text>
            <Text style={styles.emptyStateSubtext}>
              Your {selectedFilter} history will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryPage;
