import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  styles from './MotherNutritionStyle';
const HEALTH_GUIDELINES = {
  header: "Nourishing Motherhood: Essential Nutritional Health",
  subheader: "A guide to the key vitamins, minerals, and dietary choices necessary for a healthy pregnancy.",
  keyNutrients: [
    {
      title: "Folic Acid (Folate)",
      icon: "🥬",
      color: "#5cb85c", // Green
      details: "Crucial for preventing neural tube defects in the baby, especially during the first trimester. Recommended intake is usually 400-800 mcg daily. Sources include leafy greens, fortified cereals, and citrus fruits.",
    },
    {
      title: "Iron",
      icon: "🥩",
      color: "#d9534f", // Red
      details: "Necessary to support the increased blood volume (up to 50% more!) and prevent anemia. Iron deficiency can cause fatigue and lead to preterm birth. Pair iron-rich foods (lean meats, beans) with Vitamin C for better absorption.",
    },
    {
      title: "Calcium & Vitamin D",
      icon: "🥛",
      color: "#0275d8", // Blue
      details: "Calcium helps build the baby's bones and teeth. If intake is insufficient, the body will draw calcium from the mother's bones. Vitamin D is essential for calcium absorption. Sources: dairy, fortified juices, fatty fish, and sunlight.",
    },
    {
      title: "Omega-3 Fatty Acids (DHA)",
      icon: "🐟",
      color: "#f0ad4e", // Orange
      details: "Vital for the optimal development of the baby's brain, eyes, and nervous system. Consume low-mercury fish (like salmon) or use high-quality prenatal supplements to meet the recommended daily intake.",
    },
  ],
  dietaryTips: [
    "Stay Hydrated: Aim for 8-10 glasses of water daily. Dehydration can cause fatigue and even contractions.",
    "Small, Frequent Meals: Helps manage morning sickness, regulate blood sugar, and maintain energy levels throughout the day.",
    "Food Safety: Avoid raw or undercooked meats, unpasteurized dairy, and high-mercury fish (like shark, swordfish, king mackerel) to prevent foodborne illness.",
  ],
};

// --- 2. MAIN COMPONENT ---
export default function MaternalNutritionalHealth() {
  
  // Dummy function for navigating back or to a menu
  const handleGoBack = () => {
    console.log('[RN Navigation Mock] Going back to the main resource hub.');
    // Use navigation.goBack() in a real RN app
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Back Button (Simulation) */}
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Back to Resources"}</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.header}>
          {HEALTH_GUIDELINES.header}
        </Text>
        <Text style={styles.subheader}>
          {HEALTH_GUIDELINES.subheader}
        </Text>
        
        {/* Key Nutrients Section */}
        {HEALTH_GUIDELINES.keyNutrients.map((nutrient, index) => (
          <View key={index} style={styles.nutrientCard}>
            <View style={[styles.titleBar, { backgroundColor: nutrient.color }]}>
              <Text style={styles.icon}>{nutrient.icon}</Text>
              <Text style={styles.titleText}>{nutrient.title}</Text>
            </View>
            <View style={styles.detailsBox}>
              <Text style={styles.detailText}>{nutrient.details}</Text>
            </View>
          </View>
        ))}

        {/* Dietary Tips Section */}
        <Text style={styles.sectionHeader}>Practical Dietary Tips</Text>
        <View style={styles.tipsContainer}>
          {HEALTH_GUIDELINES.dietaryTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
}

