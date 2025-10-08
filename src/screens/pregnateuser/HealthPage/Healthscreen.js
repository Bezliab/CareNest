import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './HealthScreenstyle';
import { useTheme } from '../../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

// --- 1. STATIC HEALTH RESOURCE DATA ---
const HEALTH_RESOURCES = [
  {
    id: 1,
    title: "Baby's Fetal Development",
    icon: '👶',
    primaryColor: '#5b77ee',
    summary:
      "Track your baby's weekly development, organ formation, and sensory milestones from conception to birth. Helps with bonding and trimester preparation.",
    contentPage: 'fetaldeve',
  },
  {
    id: 2,
    title: 'Maternal Nutritional Health',
    icon: '🥗',
    primaryColor: '#4caf50',
    summary:
      'Guide to essential prenatal nutrition, including key vitamins, safe foods, and managing issues like morning sickness and gestational diabetes through diet.',
    contentPage: 'MotherHealth',
  },
  {
    id: 3,
    title: 'Safe Prenatal Exercises',
    icon: '🏋‍♀',
    primaryColor: '#9c27b0',
    summary:
      'Safe and effective workout routines for every trimester. Includes gentle yoga, walking, pelvic floor exercises, and when to seek medical advice.',
    contentPage: 'Pertanal',
  },
  {
    id: 4,
    title: 'Mental Wellness & Sleep',
    icon: '🌙',
    primaryColor: '#ffc107',
    summary:
      'Strategies for managing stress, anxiety, and mood swings. Includes tips for improving sleep quality and recognizing signs of prenatal/postnatal depression.',
    contentPage: 'mentalwell',
  },
  {
    id: 5,
    title: 'Labor and Delivery Preparation',
    icon: '🚑',
    primaryColor: '#f44336',
    summary:
      'Detailed information on birth plans, signs of labor, pain management options, and stages of delivery. Includes a helpful hospital bag checklist.',
    contentPage: 'delivery',
  },
  {
    id: 6,
    title: 'Postpartum Recovery Guide',
    icon: '📋',
    primaryColor: '#e91e63',
    summary:
      "Essential guide for physical and emotional recovery post-childbirth. Covers healing, bleeding, breastfeeding basics, hormonal changes, and mother's self-care.",
    contentPage: 'Recovery',
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
          <Text style={styles.header}>
            General Mother & Baby Health Resources
          </Text>
          <Text style={styles.subheader}>
            Explore quick guides on fetal development, nutrition, exercise, and
            mental wellness to support your entire journey.
          </Text>
        </View>

        {/* Resource Grid */}
        <View style={styles.cardGrid}>
          {HEALTH_RESOURCES.map(resource => (
            <View key={resource.id} style={styles.cardWrapper}>
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
                  onPress={() =>
                    handleReadMore(resource.title, resource.contentPage)
                  }
                  style={[
                    styles.readMoreButton,
                    { backgroundColor: resource.primaryColor },
                  ]}
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
