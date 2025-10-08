import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './HealthTipsStyle';
import { useTheme } from '../../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

const healthTips = [
  {
    id: 1,
    title: 'Stay Active',
    content:
      'Engage in light exercises such as walking or yoga to keep your body healthy.',
  },
  {
    id: 2,
    title: 'Get Enough Rest',
    content:
      'Adequate sleep is important for both you and your baby’s development.',
  },
  {
    id: 3,
    title: 'Take Supplements',
    content:
      'Take your prescribed vitamins such as folic acid to support healthy growth.',
  },
  {
    id: 4,
    title: 'Practice Hygiene',
    content:
      'Wash your hands often and maintain good hygiene to avoid infections.',
  },
  {
    id: 5,
    title: 'Manage Stress',
    content:
      'Practice relaxation techniques like deep breathing and meditation.',
  },
];

export default function HealthTipsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Health Tips</Text>

      {healthTips.map(tip => (
        <View key={tip.id} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.content}>{tip.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
