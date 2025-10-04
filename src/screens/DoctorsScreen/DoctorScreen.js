import React, { useState } from "react";
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
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./DoctorScreenStyle";

const DoctorPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState("rating");

  const doctorsData = [
    {
      id: "1",
      name: "Dr. Aisha Johnson",
      specialty: "Obstetrician & Gynecologist",
      experience: 15,
      rating: 4.9,
      reviews: 284,
      hospital: "City General Hospital",
      education: "MD, Harvard Medical School",
      languages: ["English", "Spanish"],
      nextAvailable: "Tomorrow, 10:00 AM",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      treatmentHistory: [
        "High-risk pregnancy management",
        "Fetal medicine",
        "Minimally invasive surgery",
      ],
      price: 150,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Maternal-Fetal Medicine",
      experience: 12,
      rating: 4.8,
      reviews: 196,
      hospital: "University Medical Center",
      education: "MD, Johns Hopkins University",
      languages: ["English", "Mandarin"],
      nextAvailable: "Today, 2:30 PM",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150",
      treatmentHistory: [
        "Multiple gestation care",
        "Genetic counseling",
        "Ultrasound specialist",
      ],
      price: 180,
    },
    {
      id: "3",
      name: "Dr. Sarah Williams",
      specialty: "OB/GYN Specialist",
      experience: 8,
      rating: 4.7,
      reviews: 132,
      hospital: "Women Health Clinic",
      education: "MD, Stanford University",
      languages: ["English", "French"],
      nextAvailable: "Monday, 9:00 AM",
      image:
        "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150",
      treatmentHistory: [
        "Normal delivery care",
        "Postpartum recovery",
        "Fertility treatments",
      ],
      price: 120,
    },
  ];

  const specialties = [
    "All",
    "OB/GYN",
    "Maternal-Fetal",
    "Perinatology",
    "Fertility",
    "Midwifery",
  ];

  const filteredDoctors = doctorsData
    .filter((doctor) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query);
      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "experience") return b.experience - a.experience;
      if (sortOption === "price") return a.price - b.price;
      return 0;
    });

  const renderDoctorCard = ({ item }) => (
    <TouchableOpacity style={styles.doctorCard}>
      {/* Header */}
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

      {/* Details */}
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
          <Text style={styles.detailText}>{item.languages.join(", ")}</Text>
        </View>
      </View>

      {/* Treatment history */}
      <View style={styles.treatmentSection}>
        <Text style={styles.sectionTitle}>Specializations:</Text>
        {item.treatmentHistory.map((treatment, index) => (
          <Text key={index} style={styles.treatmentItem}>
            • {treatment}
          </Text>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.availableText}>Next Available</Text>
          <Text style={styles.availableDate}>{item.nextAvailable}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.session}>per session</Text>
        </View>
      </View>

      {/* Book Button with Navigation */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("bookingpage", { doctor: item })}
      >
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

      {/* Search + Sort */}
      <View style={styles.searchSortRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortModalVisible(true)}
        >
          <Ionicons name="funnel-outline" size={20} color="#3498db" />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Specialty Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.specialtyContainer}
      >
        {specialties.map((specialty) => (
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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort Doctors By</Text>
            {["rating", "experience", "price"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  sortOption === option && styles.modalOptionActive,
                ]}
                onPress={() => {
                  setSortOption(option);
                  setSortModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    sortOption === option && styles.modalOptionTextActive,
                  ]}
                >
                  {option === "rating"
                    ? "Highest Rated"
                    : option === "experience"
                    ? "Most Experienced"
                    : "Lowest Price"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DoctorPage;
