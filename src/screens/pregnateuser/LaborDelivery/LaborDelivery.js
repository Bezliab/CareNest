//labor and delivery prep
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LaborDeliveryStyle';
// --- 1. STATIC CONTENT DATA ---
const PREP_GUIDELINES = {
  header: "Labor & Delivery Preparation",
  subheader: "Knowledge and planning reduce anxiety. Prepare for the big day with these essential steps.",
  preparationSteps: [
    {
      title: "Create a Birth Plan",
      icon: "📋",
      color: "#f08080", // Light Coral
      details: "Document your preferences for pain management, medical interventions, feeding choices, and who you want in the room. Share it with your medical team early.",
    },
    {
      title: "Attend Classes",
      icon: "📚",
      color: "#dda0dd", // Plum
      details: "Enroll in prenatal classes covering Lamaze, Bradley method, C-section recovery, and infant CPR. Practice breathing and coping techniques with your partner.",
    },
    {
      title: "Pack the Hospital Bag",
      icon: "💼",
      color: "#ffd700", // Gold
      details: "Have your bags ready for mom, partner, and baby by the 36th week. Include essentials like comfortable clothes, toiletries, snacks, and important documents.",
    },
    {
      title: "Know the Signs of Labor",
      icon: "🕰",
      color: "#98fb98", // Pale Green
      details: "Be aware of early signs like the water breaking, regular contractions, and bloody show. Know when to call your doctor or midwife.",
    },
  ],
  laborStages: [
    "First Stage (Early & Active Labor): Contractions begin, and the cervix dilates. Focus on relaxation, movement, and pain management techniques.",
    "Second Stage (Pushing & Birth): The cervix is fully dilated (10cm). This is the stage where you actively push the baby through the birth canal.",
    "Third Stage (Placenta Delivery): After the baby is born, you will deliver the placenta. This is usually the shortest stage.",
  ],
};

// --- 2. MAIN COMPONENT (React Native) ---
export default function LaborAndDeliveryPrep() {
  
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
          {PREP_GUIDELINES.header}
        </Text>
        <Text style={styles.subheader}>
          {PREP_GUIDELINES.subheader}
        </Text>
        
        {/* Preparation Steps Section */}
        <Text style={styles.sectionHeader}>Essential Preparation Steps</Text>
        {PREP_GUIDELINES.preparationSteps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={[styles.titleBar, { backgroundColor: step.color }]}>
              <Text style={styles.icon}>{step.icon}</Text>
              <Text style={styles.titleText}>{step.title}</Text>
            </View>
            <View style={styles.detailsBox}>
              <Text style={styles.detailText}>{step.details}</Text>
            </View>
          </View>
        ))}

        {/* Labor Stages Section */}
        <Text style={styles.sectionHeader}>Stages of Labor</Text>
        <View style={styles.stagesContainer}>
          {PREP_GUIDELINES.laborStages.map((stage, index) => (
            <View key={index} style={styles.stageItem}>
              <Text style={styles.sleepBullet}>{index + 1}.</Text>
              <Text style={styles.stageText}>{stage}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
}

