import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// Replace the import below with the icon component your project uses.
// Common option: react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './HistoryScreen.styles';

const HistoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data for history records
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
      {
        id: 4,
        type: 'milestone',
        title: 'Second Trimester',
        date: 'Oct 20, 2025',
        description: 'Entered second trimester smoothly',
        icon: 'flag',
        achievement: 'Progress Achievement',
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

  const renderAppointmentCard = item => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Ionicons name="calendar" size={20} color="#6B73A3" />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <View style={[styles.statusBadge, styles.completedBadge]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.infoText}>{item.doctor}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.infoText}>
            {item.date} • {item.time}
          </Text>
        </View>
        <Text style={styles.notes}>{item.notes}</Text>

        {item.achievements && (
          <View style={styles.achievementsContainer}>
            <Text style={styles.achievementsTitle}>Achievements:</Text>
            {item.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementBadge}>
                <Ionicons name="trophy" size={14} color="#FFD700" />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const renderMilestoneCard = item => (
    <View style={[styles.card, styles.milestoneCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Ionicons name={item.icon} size={20} color="#FF6B6B" />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <View style={[styles.statusBadge, styles.milestoneBadge]}>
          <Text style={styles.statusText}>{item.achievement}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.celebration}>
          <Ionicons name="sparkles" size={16} color="#FFD700" />
          <Text style={styles.celebrationText}>Special Moment!</Text>
        </View>
      </View>
    </View>
  );

  const renderTestCard = item => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Ionicons name="flask" size={20} color="#4ECDC4" />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <View style={[styles.statusBadge, styles.completedBadge]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.infoText}>{item.doctor}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsLabel}>Results:</Text>
          <Text style={styles.resultsText}>{item.results}</Text>
        </View>

        {item.achievements && (
          <View style={styles.achievementsContainer}>
            <Text style={styles.achievementsTitle}>Excellent Results:</Text>
            {item.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#4ECDC4" />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const renderItem = item => {
    switch (item.type) {
      case 'appointment':
        return renderAppointmentCard(item);
      case 'milestone':
        return renderMilestoneCard(item);
      case 'test':
        return renderTestCard(item);
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Decorative background shapes */}
      <View style={styles.decorationTopRight} />
      <View style={styles.decorationBottomLeft} />

      {/* Main content */}
      <View style={styles.inner}>
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

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Total Visits</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Doctors</Text>
          </View>
        </View>

        {/* History List */}
        <ScrollView
          style={styles.historyList}
          contentContainerStyle={styles.historyListContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            {selectedFilter === 'all'
              ? 'All Records'
              : `${
                  selectedFilter.charAt(0).toUpperCase() +
                  selectedFilter.slice(1)
                }`}
          </Text>

          {getFilteredData().map(item => (
            <View key={item.id} style={styles.historyItem}>
              {renderItem(item)}
            </View>
          ))}

          {/* Empty State */}
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
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
