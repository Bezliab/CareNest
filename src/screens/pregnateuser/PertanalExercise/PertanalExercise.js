//Prenatal exercises
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './PertanalExerciseStyle';
// --- 1. STATIC CONTENT DATA ---
const EXERCISE_GUIDELINES = {
  header: "Safe Prenatal Exercises: Stay Active, Stay Healthy",
  subheader: "A comprehensive guide to beneficial exercises and important safety precautions during all trimesters of pregnancy.",
  safeExercises: [
    {
      title: "Walking",
      icon: "🚶‍♀",
      color: "#20b2aa", // Light Sea Green
      details: "An excellent cardiovascular workout that is low-impact and easily adaptable. Aim for a brisk pace that still allows you to hold a conversation. Ensure you wear supportive footwear.",
    },
    {
      title: "Swimming & Water Aerobics",
      icon: "🏊‍♀",
      color: "#4682b4", // Steel Blue
      details: "The buoyancy of water supports your weight, relieving pressure on joints and ligaments. It's fantastic for reducing swelling and preventing overheating. Avoid diving or strenuous underwater exertion.",
    },
    {
      title: "Prenatal Yoga & Pilates",
      icon: "🧘‍♀",
      color: "#b8860b", // Dark Goldenrod
      details: "Focuses on breathing, flexibility, balance, and strengthening core muscles crucial for labor and recovery. Avoid positions that involve lying flat on your back after the first trimester.",
    },
    {
      title: "Strength Training (Light)",
      icon: "💪",
      color: "#800080", // Purple
      details: "Using light weights or resistance bands helps maintain muscle tone and prepare for lifting the baby. Focus on high repetitions with low weight. Always prioritize proper form over intensity.",
    },
  ],
  safetyWarnings: [
    "Always consult your healthcare provider before starting any new exercise regimen.",
    "Stop immediately if you feel dizzy, short of breath, experience chest pain, fluid leakage, or vaginal bleeding.",
    "Avoid activities with a risk of falling or abdominal trauma (e.g., skiing, contact sports, or horseback riding).",
    "Do not lie flat on your back for extended periods after the first trimester (use wedges/pillows to prop up your upper body).",
    "Monitor your body temperature; avoid exercising in extreme heat or humidity to prevent overheating.",
  ],
};

// --- 2. MAIN COMPONENT (React Native) ---
export default function PrenatalExercises() {
  
  // Dummy function for navigating back or to a menu
  const handleGoBack = () => {
    console.log('[RN Navigation Mock] Going back to the main resource hub.');
    // In a real RN app, this would be: navigation.goBack()
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
          {EXERCISE_GUIDELINES.header}
        </Text>
        <Text style={styles.subheader}>
          {EXERCISE_GUIDELINES.subheader}
        </Text>
        
        {/* Safe Exercises Section */}
        <Text style={styles.sectionHeader}>Recommended Safe Exercises</Text>
        {EXERCISE_GUIDELINES.safeExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={[styles.titleBar, { backgroundColor: exercise.color }]}>
              <Text style={styles.icon}>{exercise.icon}</Text>
              <Text style={styles.titleText}>{exercise.title}</Text>
            </View>
            <View style={styles.detailsBox}>
              <Text style={styles.detailText}>{exercise.details}</Text>
            </View>
          </View>
        ))}

        {/* Safety Warnings Section */}
        <Text style={styles.sectionHeader}>⚠ Safety First Warnings</Text>
        <View style={styles.warningsContainer}>
          {EXERCISE_GUIDELINES.safetyWarnings.map((warning, index) => (
            <View key={index} style={styles.warningItem}>
              <Text style={styles.warningBullet}>•</Text>
              <Text style={styles.warningText}>{warning}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
}

