//Mental wellness and sleep
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './MentalwellBeingStyle';
// --- 1. STATIC CONTENT DATA ---
const WELLNESS_GUIDELINES = {
  header: "Mental Wellness & Sleep During Pregnancy",
  subheader: "Prioritizing your emotional health and restful sleep is essential for a healthy pregnancy journey.",
  wellnessTips: [
    {
      title: "Mindfulness and Relaxation",
      icon: "🧘",
      color: "#87ceeb", // Sky Blue
      details: "Dedicate 10-15 minutes daily to deep breathing or guided meditation. This can significantly reduce stress hormones and promote a sense of calm.",
    },
    {
      title: "Connect and Communicate",
      icon: "🗣",
      color: "#ffb6c1", // Light Pink
      details: "Talk openly with your partner, family, or friends about your feelings. Don't hesitate to reach out to a professional therapist or counselor if anxiety or sadness persists.",
    },
    {
      title: "Journaling",
      icon: "✍",
      color: "#afeeee", // Pale Turquoise
      details: "Writing down your thoughts, fears, and joys can be a powerful emotional release. It helps process mood swings and track what contributes to your well-being.",
    },
  ],
  sleepTips: [
    "Sleep Position: After the first trimester, always sleep on your side (preferably the left side) to maximize blood flow to the baby.",
    "Pillow Support: Use pregnancy pillows or regular pillows to support your abdomen and tuck between your knees to align your spine.",
    "Routine: Maintain a consistent sleep schedule, going to bed and waking up around the same time, even on weekends.",
    "Limit Liquids: Reduce fluid intake a few hours before bedtime to minimize nighttime bathroom trips.",
  ],
};

// --- 2. MAIN COMPONENT (React Native) ---
export default function MentalWellnessAndSleep() {
  
  // Dummy function for navigation
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
          {WELLNESS_GUIDELINES.header}
        </Text>
        <Text style={styles.subheader}>
          {WELLNESS_GUIDELINES.subheader}
        </Text>
        
        {/* Wellness Section */}
        <Text style={styles.sectionHeader}>Emotional Wellness Tips</Text>
        {WELLNESS_GUIDELINES.wellnessTips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <View style={[styles.titleBar, { backgroundColor: tip.color }]}>
              <Text style={styles.icon}>{tip.icon}</Text>
              <Text style={styles.titleText}>{tip.title}</Text>
            </View>
            <View style={styles.detailsBox}>
              <Text style={styles.detailText}>{tip.details}</Text>
            </View>
          </View>
        ))}

        {/* Sleep Section */}
        <Text style={styles.sectionHeader}>🛌 Strategies for Better Sleep</Text>
        <View style={styles.sleepContainer}>
          {WELLNESS_GUIDELINES.sleepTips.map((tip, index) => (
            <View key={index} style={styles.sleepItem}>
              <Text style={styles.sleepBullet}>{index + 1}.</Text>
              <Text style={styles.sleepText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
}

