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
import styles from './DoctorScreenStyle';

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


export default SpecialistListScreen;
