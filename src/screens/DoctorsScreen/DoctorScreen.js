import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './DoctorScreenStyle';

const DoctorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // Sample doctor data
  const doctorsData = [
    {
      id: '1',
      name: 'Dr. Aisha Johnson',
      specialty: 'Obstetrician & Gynecologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 284,
      hospital: 'City General Hospital',
      education: 'MD, Harvard Medical School',
      languages: ['English', 'Spanish'],
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
      treatmentHistory: [
        'High-risk pregnancy management',
        'Fetal medicine',
        'Minimally invasive surgery',
      ],
      price: '$150',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Maternal-Fetal Medicine',
      experience: '12 years',
      rating: 4.8,
      reviews: 196,
      hospital: 'University Medical Center',
      education: 'MD, Johns Hopkins University',
      languages: ['English', 'Mandarin'],
      nextAvailable: 'Today, 2:30 PM',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150',
      treatmentHistory: [
        'Multiple gestation care',
        'Genetic counseling',
        'Ultrasound specialist',
      ],
      price: '$180',
    },
    {
      id: '3',
      name: 'Dr. Sarah Williams',
      specialty: 'OB/GYN Specialist',
      experience: '8 years',
      rating: 4.7,
      reviews: 132,
      hospital: 'Women Health Clinic',
      education: 'MD, Stanford University',
      languages: ['English', 'French'],
      nextAvailable: 'Monday, 9:00 AM',
      image:
        'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150',
      treatmentHistory: [
        'Normal delivery care',
        'Postpartum recovery',
        'Fertility treatments',
      ],
      price: '$120',
    },
    {
      id: '4',
      name: 'Dr. Robert Martinez',
      specialty: 'Perinatologist',
      experience: '20 years',
      rating: 4.9,
      reviews: 321,
      hospital: 'Regional Medical Center',
      education: 'MD, Mayo Clinic',
      languages: ['English', 'Spanish'],
      nextAvailable: 'Friday, 11:00 AM',
      image:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150',
      treatmentHistory: [
        'High-risk obstetric care',
        'Fetal surgery',
        'Prenatal diagnosis',
      ],
      price: '$200',
    },
    {
      id: '5',
      name: 'Dr. Emily Parker',
      specialty: 'OB/GYN & Ultrasound',
      experience: '6 years',
      rating: 4.6,
      reviews: 89,
      hospital: 'Community Health Center',
      education: 'MD, UCLA',
      languages: ['English'],
      nextAvailable: 'Tomorrow, 3:00 PM',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150',
      treatmentHistory: [
        'Routine prenatal care',
        '3D/4D ultrasound',
        'Gynecological surgery',
      ],
      price: '$110',
    },
    {
      id: '6',
      name: 'Dr. James Wilson',
      specialty: 'Reproductive Endocrinology',
      experience: '18 years',
      rating: 4.8,
      reviews: 215,
      hospital: 'Fertility Specialists',
      education: 'MD, Cornell University',
      languages: ['English', 'German'],
      nextAvailable: 'Next Week',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150',
      treatmentHistory: [
        'IVF treatments',
        'Hormone therapy',
        'Reproductive surgery',
      ],
      price: '$220',
    },
    {
      id: '7',
      name: 'Dr. Lisa Thompson',
      specialty: 'OB/GYN & Midwifery',
      experience: '10 years',
      rating: 4.7,
      reviews: 167,
      hospital: 'Birth Center',
      education: 'MD, University of Washington',
      languages: ['English', 'Portuguese'],
      nextAvailable: 'Today, 4:00 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
      treatmentHistory: [
        'Natural birth support',
        'Water birth',
        'Lactation consulting',
      ],
      price: '$130',
    },
    {
      id: '8',
      name: 'Dr. David Kim',
      specialty: 'Gynecologic Oncology',
      experience: '14 years',
      rating: 4.9,
      reviews: 189,
      hospital: 'Cancer Care Center',
      education: 'MD, Duke University',
      languages: ['English', 'Korean'],
      nextAvailable: 'Wednesday, 1:30 PM',
      image:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150',
      treatmentHistory: [
        'Cancer screening',
        'Surgical oncology',
        'High-risk pregnancy',
      ],
      price: '$190',
    },
  ];

  const specialties = [
    'All',
    'OB/GYN',
    'Maternal-Fetal',
    'Perinatology',
    'Fertility',
    'Midwifery',
  ];

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  const renderDoctorCard = ({ item }) => (
    <TouchableOpacity style={styles.doctorCard}>
      <View style={styles.doctorHeader}>
        <Image source={{ uri: item.image }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Ionicons name="business" size={16} color="#666" />
          <Text style={styles.detailText}>{item.hospital}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="school" size={16} color="#666" />
          <Text style={styles.detailText}>{item.education}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="language" size={16} color="#666" />
          <Text style={styles.detailText}>{item.languages.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.treatmentSection}>
        <Text style={styles.sectionTitle}>Specializations:</Text>
        {item.treatmentHistory.map((treatment, index) => (
          <Text key={index} style={styles.treatmentItem}>
            • {treatment}
          </Text>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.availableText}>Next Available</Text>
          <Text style={styles.availableDate}>{item.nextAvailable}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.session}>per session</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Doctor</Text>
        <Text style={styles.headerSubtitle}>
          Expert care for your pregnancy journey
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name or specialty..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Specialty Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.specialtyContainer}
      >
        {specialties.map(specialty => (
          <TouchableOpacity
            key={specialty}
            style={[
              styles.specialtyButton,
              selectedSpecialty === specialty && styles.specialtyButtonActive,
            ]}
            onPress={() => setSelectedSpecialty(specialty)}
          >
            <Text
              style={[
                styles.specialtyText,
                selectedSpecialty === specialty && styles.specialtyTextActive,
              ]}
            >
              {specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredDoctors.length} doctors found
        </Text>
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctorCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default DoctorPage;
