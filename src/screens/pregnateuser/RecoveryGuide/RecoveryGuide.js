//postpartum recovery guide
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './RecoveryGuideStyle';
import { useTheme } from '../../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

// --- 1. STATIC CONTENT DATA ---
const RECOVERY_GUIDE = {
  header: 'Postpartum Recovery Guide',
  subheader:
    'A gentle guide to physical healing, emotional health, and adjusting to new life.',
  recoveryTopics: [
    {
      title: 'Physical Healing (First 6 Weeks)',
      icon: '🩹',
      color: '#add8e6', // Light Blue
      points: [
        'Perineal Care: Use sitz baths, witch hazel pads, and pain relief sprays. Keep the area clean and dry.',
        'Uterine Contractions: Expect mild cramping (afterpains), especially while breastfeeding, as the uterus shrinks back down.',
        'Vaginal Bleeding (Lochia): Expect heavy, red bleeding initially, lightening over several weeks. Use pads, not tampons.',
        'C-Section Recovery: Focus on incision care, gentle movement, and avoiding heavy lifting. Monitor for signs of infection.',
      ],
    },
    {
      title: 'Emotional Wellness & Mental Health',
      icon: '🧠',
      color: '#fdfd96', // Pale Yellow
      points: [
        'Baby Blues: Common and typically resolve within two weeks (mood swings, anxiety, weepiness).',
        'Postpartum Depression (PPD): If intense sadness, lack of interest, or persistent anxiety lasts longer than two weeks, seek professional help.',
        "Sleep Priority: Sleep when the baby sleeps, and don't worry about non-essential chores. Prioritizing rest aids emotional stability.",
        "Support System: Rely on your partner, family, and friends. Don't isolate yourself; accept help with meals and childcare.",
      ],
    },
    {
      title: 'Nutrition & Hydration',
      icon: '🍎',
      color: '#90ee90', // Light Green
      points: [
        'Fluid Intake: Drink plenty of water (especially if breastfeeding) to aid healing and maintain energy levels.',
        'Nutrient-Rich Diet: Continue consuming iron, fiber, and protein. Focus on whole foods to support energy and recovery.',
        'Vitamins: Continue taking prenatal vitamins or a specific postpartum supplement as recommended by your doctor.',
      ],
    },
    {
      title: 'Safe Return to Exercise',
      icon: '🤸‍♀',
      color: '#ffb6c1', // Light Pink
      points: [
        'Pelvic Floor: Start gentle Kegel exercises immediately to restore muscle tone.',
        'Diastasis Recti Check: Check for abdominal separation (diastasis recti) before beginning core exercises.',
        "Listen to Your Body: Wait for your doctor's 6-week clearance before resuming vigorous exercise. Start with short walks.",
      ],
    },
  ],
};

// --- 2. MAIN COMPONENT (React Native) ---
export default function PostpartumRecoveryGuide() {
  // Dummy function for navigation (will navigate back in a real RN app)
  const handleGoBack = () => {
    console.log('[RN Navigation Mock] Going back to the main resource hub.');
    // In a real RN app, this would be: navigation.goBack() or similar
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Back Button (Simulation) */}
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back to Resources'}</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.header}>{RECOVERY_GUIDE.header}</Text>
        <Text style={styles.subheader}>{RECOVERY_GUIDE.subheader}</Text>

        {/* Recovery Topics Section */}
        {RECOVERY_GUIDE.recoveryTopics.map((topic, index) => (
          <View key={index} style={styles.topicSection}>
            <View style={[styles.titleBar, { backgroundColor: topic.color }]}>
              <Text style={styles.icon}>{topic.icon}</Text>
              <Text style={styles.titleText}>{topic.title}</Text>
            </View>
            <View style={styles.detailsBox}>
              {topic.points.map((point, pIndex) => (
                <View key={pIndex} style={styles.pointItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
}
