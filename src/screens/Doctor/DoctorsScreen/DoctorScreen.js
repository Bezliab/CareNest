import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SpecialistListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'pediatrician', 'cardiologist', 'dentist'];

  const specialists = [
    {
      id: '1',
      name: 'Leslie Alexander',
      specialty: 'pediatrician',
      rating: 5.0,
      availableToday: true,
      availableTimes: ['10:30', '11:00', '14:00', '16:00'],
      address: 'Tim Street, Springfield',
    },
    {
      id: '2',
      name: 'Ronald Richards',
      specialty: 'cardiologist',
      rating: 4.9,
      availableToday: false,
      availableTimes: ['06:00', '11:00', '13:00', '14:00'],
      address: 'Tim Street, Springfield',
    },
    {
      id: '3',
      name: 'Annette Black',
      specialty: 'pediatrician',
      rating: 5.0,
      availableToday: true,
      availableTimes: [],
      address: 'Tim Street, Springfield',
    },
  ];

  const filteredSpecialists = specialists.filter((specialist) => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'All' || specialist.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderSpecialistCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookAppointment', { specialist: item })}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>

      <Text style={styles.availableText}>
        Available time: {item.availableToday ? 'Today' : 'Tomorrow'}
      </Text>

      {item.availableTimes.length > 0 && (
        <View style={styles.timeContainer}>
          {item.availableTimes.map((time, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Search Specialists</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.specialtyContainer}>
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              style={[
                styles.specialtyButton,
                selectedSpecialty === specialty && styles.specialtyButtonSelected,
              ]}
              onPress={() => setSelectedSpecialty(specialty)}
            >
              <Text
                style={[
                  styles.specialtyText,
                  selectedSpecialty === specialty && styles.specialtyTextSelected,
                ]}
              >
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Specialists List */}
      <FlatList
        data={filteredSpecialists}
        renderItem={renderSpecialistCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  specialtyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyButtonSelected: {
    backgroundColor: '#007AFF',
  },
  specialtyText: {
    fontSize: 14,
    color: '#666',
  },
  specialtyTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  availableText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  timeSlot: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#333',
  },
  address: {
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SpecialistListScreen;
