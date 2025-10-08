import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FetalDevelopmentStyle';
import { useTheme } from '../../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

const DEVELOPMENT_STAGES = [
  {
    trimester: 'First Trimester (Weeks 1-13)',
    emoji: '🥚',
    color: '#ff6347', // Tomato Red
    milestones: [
      {
        week: 'Week 5-8',
        detail:
          'The heart begins to beat, and major organs start to form (organogenesis). The neural tube closes, which will become the spinal cord and brain.',
      },
      {
        week: 'Week 9-12',
        detail:
          'Fingers and toes are fully formed. The fetus begins to make small movements, though they are usually too subtle for the mother to feel yet. Genitals begin to differentiate.',
      },
    ],
  },
  {
    trimester: 'Second Trimester (Weeks 14-26)',
    emoji: '⭐',
    color: '#3cb371', // Medium Sea Green
    milestones: [
      {
        week: 'Week 16-20',
        detail:
          'The mother often feels the first movements (quickening). The baby is covered in a fine hair (lanugo) and a waxy coating (vernix caseosa). Hearing develops.',
      },
      {
        week: 'Week 21-26',
        detail:
          'The fetus grows rapidly in length and weight. Eyelids begin to separate. Lungs are forming air sacs, but are still immature. Sense of touch develops.',
      },
    ],
  },
  {
    trimester: 'Third Trimester (Weeks 27-40)',
    emoji: '🚀',
    color: '#4169e1', // Royal Blue
    milestones: [
      {
        week: 'Week 27-34',
        detail:
          'The baby can open and close its eyes and is sensitive to light. Brain development is rapid. Bones harden, but the skull remains pliable for birth.',
      },
      {
        week: 'Week 35-40',
        detail:
          'The baby gains weight quickly, usually about half a pound per week. Organs are fully mature, and the baby settles into a head-down position in preparation for birth.',
      },
    ],
  },
];

// --- 2. MAIN COMPONENT ---
export default function FetalDevelopmentDetail({ navigation }) {
  // Dummy function for navigating back or to a menu
  const handleGoBack = () => {
    // This console log will be visible in your RN debugger
    console.log('[RN Navigation Mock] Going back to the main resource hub.');
    // In a real app, you would use the navigation prop, e.g.:
    // navigation.goBack()
    // or navigation.navigate('Home');
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Back Button (Simulation) */}
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back to Resources'}</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.header}>Baby's Fetal Development</Text>
        <Text style={styles.subheader}>
          A week-by-week guide to your baby’s incredible journey from zygote to
          newborn.
        </Text>

        {/* Trimester Sections */}
        {DEVELOPMENT_STAGES.map((stage, index) => (
          <View key={index} style={styles.sectionContainer}>
            {/* Trimester Header */}
            <View style={[styles.titleBar, { backgroundColor: stage.color }]}>
              <Text style={styles.titleText}>
                {stage.emoji} {stage.trimester}
              </Text>
            </View>

            {/* Milestone List */}
            {stage.milestones.map((milestone, mIndex) => (
              <View key={mIndex} style={styles.milestoneBox}>
                <Text style={styles.milestoneWeek}>{milestone.week}</Text>
                <Text style={styles.milestoneDetail}>{milestone.detail}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
}
