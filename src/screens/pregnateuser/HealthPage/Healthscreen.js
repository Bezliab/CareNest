import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./HealthScreenstyle";

// --- 1. STATIC HEALTH RESOURCE DATA ---
=======
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

// Get screen dimensions for basic responsive layout calculation
const { width: windowWidth } = Dimensions.get('window');

// --- 1. STATIC HEALTH RESOURCE DATA (Using Emojis for native icons) ---
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
const HEALTH_RESOURCES = [
  {
    id: 1,
    title: "Baby's Fetal Development",
<<<<<<< HEAD
    icon: "👶",
    primaryColor: "#5b77ee",
    summary:
      "Track your baby's weekly development, organ formation, and sensory milestones from conception to birth. Helps with bonding and trimester preparation.",
=======
    icon: "👶", // Baby icon
    primaryColor: "#5b77ee", 
    summary: "Track your baby's weekly development, organ formation, and sensory milestones from conception to birth. Helps with bonding and trimester preparation.",
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    contentPage: "fetaldeve",
  },
  {
    id: 2,
    title: "Maternal Nutritional Health",
<<<<<<< HEAD
    icon: "🥗",
    primaryColor: "#4caf50",
    summary:
      "Guide to essential prenatal nutrition, including key vitamins, safe foods, and managing issues like morning sickness and gestational diabetes through diet.",
=======
    icon: "🥗", // Salad icon
    primaryColor: "#4caf50", 
    summary: "Guide to essential prenatal nutrition, including key vitamins, safe foods, and managing issues like morning sickness and gestational diabetes through diet.",
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    contentPage: "MotherHealth",
  },
  {
    id: 3,
    title: "Safe Prenatal Exercises",
<<<<<<< HEAD
    icon: "🏋‍♀",
    primaryColor: "#9c27b0",
    summary:
      "Safe and effective workout routines for every trimester. Includes gentle yoga, walking, pelvic floor exercises, and when to seek medical advice.",
    contentPage: "Pertanal",
=======
    icon: "🏋‍♀", // Dumbbell icon
    primaryColor: "#9c27b0", 
    summary: "Safe and effective workout routines for every trimester. Includes gentle yoga, walking, pelvic floor exercises, and when to seek medical advice.",
    contentPage: "/Pertanal",
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
  },
  {
    id: 4,
    title: "Mental Wellness & Sleep",
<<<<<<< HEAD
    icon: "🌙",
    primaryColor: "#ffc107",
    summary:
      "Strategies for managing stress, anxiety, and mood swings. Includes tips for improving sleep quality and recognizing signs of prenatal/postnatal depression.",
=======
    icon: "🌙", // Moon icon
    primaryColor: "#ffc107", 
    summary: "Strategies for managing stress, anxiety, and mood swings. Includes tips for improving sleep quality and recognizing signs of prenatal/postnatal depression.",
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    contentPage: "mentalwell",
  },
  {
    id: 5,
    title: "Labor and Delivery Preparation",
<<<<<<< HEAD
    icon: "🚑",
    primaryColor: "#f44336",
    summary:
      "Detailed information on birth plans, signs of labor, pain management options, and stages of delivery. Includes a helpful hospital bag checklist.",
=======
    icon: "🚑", // Ambulance/Emergency icon
    primaryColor: "#f44336", 
    summary: "Detailed information on birth plans, signs of labor, pain management options, and stages of delivery. Includes a helpful hospital bag checklist.",
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
    contentPage: "delivery",
  },
  {
    id: 6,
    title: "Postpartum Recovery Guide",
<<<<<<< HEAD
    icon: "📋",
    primaryColor: "#e91e63",
    summary:
      "Essential guide for physical and emotional recovery post-childbirth. Covers healing, bleeding, breastfeeding basics, hormonal changes, and mother's self-care.",
    contentPage: "Recovery",
  },
];

// --- 2. MAIN COMPONENT ---
export default function HealthScreen() {
  const navigation = useNavigation();

  const handleReadMore = (title, contentPage) => {
    // ✅ Navigate to the corresponding screen
    navigation.navigate(contentPage, { title });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>General Mother & Baby Health Resources</Text>
          <Text style={styles.subheader}>
            Explore quick guides on fetal development, nutrition, exercise, and mental wellness to
            support your entire journey.
=======
    icon: "📋", // Clipboard icon
    primaryColor: "#e91e63", 
    summary: "Essential guide for physical and emotional recovery post-childbirth. Covers healing, bleeding, breastfeeding basics, hormonal changes, and mother's self-care.",
    contentPage: "recovery",
  },
];

// --- 2. MAIN APP COMPONENT ---
export default function App() {
  
  const handleReadMore = (title, contentPage) => {
    // In a real React Native app, this function would handle screen navigation.
    console.log(`[RN Navigation Mock] Navigating to: "${title}" at path: ${contentPage}`);
  };

  return (
    // ScrollView allows the content to scroll on smaller screens
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            General Mother & Baby Health Resources
          </Text>
          <Text style={styles.subheader}>
            Explore quick guides on fetal development, nutrition, exercise, and mental wellness to support your entire journey.
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
          </Text>
        </View>

        {/* Resource Grid */}
        <View style={styles.cardGrid}>
          {HEALTH_RESOURCES.map(resource => (
            <View key={resource.id} style={styles.cardWrapper}>
<<<<<<< HEAD
              <View style={styles.card}>
                {/* Icon */}
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: resource.primaryColor + '20' },
                  ]}
                >
                  <Text style={styles.iconText}>{resource.icon}</Text>
                </View>

                {/* Title */}
                <Text style={styles.cardTitle}>{resource.title}</Text>

                {/* Summary */}
                <Text style={styles.cardSummary}>{resource.summary}</Text>

                {/* Read More Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleReadMore(resource.title, resource.contentPage)}
=======
              
              {/* Card Container */}
              <View style={styles.card}>
                
                {/* Icon Container */}
                <View style={[styles.iconContainer, { backgroundColor: resource.primaryColor + '20' }]}>
                  <Text style={styles.iconText}>{resource.icon}</Text>
                </View>
                
                {/* Title */}
                <Text style={styles.cardTitle}>{resource.title}</Text>
                
                {/* Summary */}
                <Text style={styles.cardSummary}>
                  {resource.summary}
                </Text>

                {/* Read More Button */}
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => handleReadMore(resource.title, resource.contentPage)} 
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
                  style={[styles.readMoreButton, { backgroundColor: resource.primaryColor }]}
                >
                  <Text style={styles.readMoreText}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
