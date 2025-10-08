// screens/ArticleScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './ArticleScreenStyle';
import { useTheme } from '../../utils/themeContext';

const ArticleScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const dynamicStyles = {
    backgroundColor: isDark ? '#121212' : '#fff',
    color: isDark ? '#fff' : '#000',
    inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
    borderColor: isDark ? '#333' : '#ddd',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article</Text>
        <TouchableOpacity>
          <Icon name="share-social" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Article Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Cover Image */}
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/pregnant-woman_1098-14738.jpg',
          }}
          style={styles.coverImage}
        />

        {/* Article Title */}
        <Text style={styles.title}>
          Healthy Pregnancy Tips: Staying Strong for You and Your Baby
        </Text>

        {/* Author & Date */}
        <Text style={styles.meta}>By Dr. Aisha Bello • Sept 28, 2025</Text>

        {/* Article Body */}
        <Text style={styles.body}>
          Pregnancy is a beautiful journey, but it requires proper care and
          attention. Maintaining a balanced diet, getting enough rest, and
          attending regular checkups are essential to ensure the safety of both
          mother and baby.{'\n\n'}
          Staying hydrated and avoiding harmful substances like alcohol and
          smoking play a vital role in your health. Gentle exercises such as
          walking and prenatal yoga can also help reduce stress and improve
          circulation.{'\n\n'}
          Always listen to your body. If you notice unusual symptoms like heavy
          bleeding, dizziness, or severe headaches, consult your healthcare
          provider immediately. Remember, every pregnancy is unique, so never
          hesitate to ask for support.{'\n\n'}
          With the right knowledge and lifestyle choices, you can enjoy a safe,
          happy, and healthy pregnancy.
        </Text>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn}>
          <Icon name="heart-outline" size={22} color="#1976d2" />
          <Text style={styles.footerText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <Icon name="bookmark-outline" size={22} color="#1976d2" />
          <Text style={styles.footerText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <Icon name="chatbubble-outline" size={22} color="#1976d2" />
          <Text style={styles.footerText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArticleScreen;
