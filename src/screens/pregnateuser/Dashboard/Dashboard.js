import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Dimensions } from 'react-native';
import styles from './DashboardStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase (your existing firebaseConfig)
import { auth, db } from '../../../api/firebaseConfig';
import { doc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';

import { useTheme } from '../../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

const { width } = Dimensions.get('window');

const msPerDay = 1000 * 60 * 60 * 24;

const Dashboard = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pregnancyProgress, setPregnancyProgress] = useState(null);
  const [latestHealthData, setLatestHealthData] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  // Subscribe to user document so dashboard updates live
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      setHealthLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
        } else {
          setUserData(null);
        }
        setLoading(false);
      },
      error => {
        console.error('Error listening to user doc:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Load health metrics from Firebase or fallback to AsyncStorage
  useEffect(() => {
    const loadHealthMetrics = async () => {
      const user = auth.currentUser;
      
      if (user) {
        // Try Firebase first
        try {
          const healthMetricsRef = collection(db, 'users', user.uid, 'healthMetrics');
          const healthQuery = query(healthMetricsRef, orderBy('timestamp', 'desc'), limit(1));
          
          const unsubscribe = onSnapshot(healthQuery, (querySnapshot) => {
            if (!querySnapshot.empty) {
              const latestHealthDoc = querySnapshot.docs[0];
              setLatestHealthData(latestHealthDoc.data());
            } else {
              // Fallback to AsyncStorage if no Firebase data
              loadFromAsyncStorage();
            }
            setHealthLoading(false);
          }, (error) => {
            console.warn('Firebase health metrics error, falling back to local storage:', error);
            loadFromAsyncStorage();
          });
          
          return unsubscribe;
        } catch (error) {
          console.warn('Firebase health metrics setup failed:', error);
          loadFromAsyncStorage();
        }
      } else {
        // No user logged in, use AsyncStorage only
        loadFromAsyncStorage();
      }
    };

    const loadFromAsyncStorage = async () => {
      try {
        const raw = await AsyncStorage.getItem('@health_entries_v1');
        if (raw) {
          const entries = JSON.parse(raw);
          if (entries.length > 0) {
            setLatestHealthData(entries[0]);
          }
        }
      } catch (err) {
        console.warn('Failed to load health data from storage', err);
      } finally {
        setHealthLoading(false);
      }
    };

    loadHealthMetrics();
  }, []);

  // Compute pregnancy progress from expectedDeliveryDate (EDD)
  const computeProgressFromEdd = eddInput => {
    if (!eddInput) return null;
    const edd = eddInput instanceof Date ? eddInput : new Date(eddInput);
    if (isNaN(edd.getTime())) return null;

    // Conception ~ 280 days before EDD
    const conception = new Date(edd);
    conception.setDate(edd.getDate() - 280);

    const today = new Date();
    // elapsed days since conception (clamped between 0 and 280)
    let elapsedDays = Math.floor((today - conception) / msPerDay);
    if (elapsedDays < 0) elapsedDays = 0;
    if (elapsedDays > 280) elapsedDays = 280;

    const weeks = Math.floor(elapsedDays / 7);
    const days = elapsedDays % 7;

    // remaining days until EDD
    const remainingRaw = Math.ceil((edd - today) / msPerDay);
    const remainingDays = remainingRaw > 0 ? remainingRaw : 0;

    // progress percent of 40 weeks
    const progressPercent = Math.round((elapsedDays / 280) * 100);

    // trimester label
    let trimester = 'First Trimester';
    if (weeks >= 13 && weeks < 27) trimester = 'Second Trimester';
    else if (weeks >= 27) trimester = 'Third Trimester';

    // baby size simple mapping (optional)
    const babySize = (() => {
      if (weeks < 8) return 'Seed to bean';
      if (weeks < 13) return 'Plum-sized';
      if (weeks < 20) return 'Avocado-sized';
      if (weeks < 27) return 'Papaya-sized';
      if (weeks < 34) return 'Butternut squash';
      return 'Pumpkin-sized';
    })();

    return {
      weeks,
      days,
      elapsedDays,
      remainingDays,
      progressPercent: Math.min(Math.max(progressPercent, 0), 100),
      trimester,
      edd: edd.toISOString(),
      eddDate: edd,
      conceptionDate: conception.toISOString(),
      babySize,
    };
  };

  // Whenever userData changes, compute progress
  useEffect(() => {
    if (userData?.expectedDeliveryDate || userData?.dueDate || userData?.edd) {
      const eddRaw =
        userData.expectedDeliveryDate || userData.dueDate || userData.edd;
      const progress = computeProgressFromEdd(eddRaw);
      setPregnancyProgress(progress);
    } else {
      setPregnancyProgress(null);
    }
  }, [userData]);

  // Recalculate periodically (every minute) so dashboard updates automatically
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        userData?.expectedDeliveryDate ||
        userData?.dueDate ||
        userData?.edd
      ) {
        const eddRaw =
          userData.expectedDeliveryDate || userData.dueDate || userData.edd;
        const progress = computeProgressFromEdd(eddRaw);
        setPregnancyProgress(progress);
      }
    }, 60 * 1000); // every minute

    return () => clearInterval(interval);
  }, [userData]);

  // Helper: format doctor field into display string (or fallback)
  const formatDoctor = doctorField => {
    if (!doctorField) return 'No doctor picked';
    let name = '';
    if (typeof doctorField === 'string') {
      name = doctorField.trim();
    } else if (doctorField.name) {
      name = doctorField.name.trim();
    } else {
      // Fallback - stringify whatever was stored
      name = String(doctorField);
    }

    // Add "Dr." prefix if it doesn't already start with Dr or Dr.
    if (!/^\s*dr\.?\s+/i.test(name)) name = `Dr. ${name}`;
    return name;
  };

  const doctorDisplay = formatDoctor(userData?.doctor);

  // Custom gradient view (same as before)
  const GradientView = ({ colors, style, children }) => (
    <View style={[style, { overflow: 'hidden' }]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors[0], opacity: 0.8 },
        ]}
      />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors[1] }]} />
      {children}
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  // UI variables for progress card
  const weeks = pregnancyProgress?.weeks ?? null;
  const days = pregnancyProgress?.days ?? null;
  const progressPercent = pregnancyProgress?.progressPercent ?? 0;
  const remainingDays = pregnancyProgress?.remainingDays ?? null;
  const trimester = pregnancyProgress?.trimester ?? '';
  const eddDate = pregnancyProgress?.eddDate
    ? pregnancyProgress.eddDate.toDateString()
    : userData?.expectedDeliveryDate
    ? new Date(userData.expectedDeliveryDate).toDateString()
    : userData?.dueDate
    ? new Date(userData.dueDate).toDateString()
    : 'Not set';
  const babySize = pregnancyProgress?.babySize ?? userData?.babySize ?? '—';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <Animated.View
        style={[styles.headerBackground, { opacity: headerOpacity }]}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>
                {userData?.name
                  ? `Hello, ${userData.name.split(' ')[0]} 👋`
                  : 'Hello there 👋'}
              </Text>

              <Text style={styles.subGreeting}>
                 {
                  userData?.role === 'mother'
                    ? doctorDisplay === 'No doctor picked'
                      ? "You haven't selected a doctor yet."
                      : `Your doctor: ${doctorDisplay}`
                    : 'You are logged in as a health worker'
                }

              </Text>
            </View>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={{
                  uri: userData?.avatar || 'https://i.pravatar.cc/150?img=45',
                }}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pregnancy Progress card */}
        <View style={styles.progressCard}>
          <GradientView
            colors={['#667eea', '#764ba2']}
            style={styles.progressGradient}
          >
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Pregnancy Progress</Text>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText}>
                  {weeks !== null ? `${weeks}/40` : '—/40'}
                </Text>
              </View>
            </View>

            <View style={styles.progressInfo}>
              <Text style={styles.progressWeek}>
                {weeks !== null ? `Week ${weeks}` : 'Week —'}
                {days !== null ? ` • ${days} day${days === 1 ? '' : 's'}` : ''}
              </Text>
              <Text style={styles.progressSubtitle}>{trimester || '—'}</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>
              <Text
                style={styles.progressPercentage}
              >{`${progressPercent}%`}</Text>
            </View>

            <View style={styles.progressFooter}>
              <View style={styles.dueDateContainer}>
                <Icon name="event" size={16} color="#fff" />
                <Text style={styles.dueDate}>{eddDate}</Text>
              </View>
              <Text style={styles.babyInfo}>{babySize}</Text>
            </View>

            {/* Countdown display */}
            {remainingDays !== null && (
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>
                  {remainingDays > 0
                    ? `${remainingDays} day${
                        remainingDays === 1 ? '' : 's'
                      } until due`
                    : 'Due date passed — congratulations!'}
                </Text>
              </View>
            )}
          </GradientView>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {[
            {
              icon: 'calendar-month',
              text: 'Appointments',
              sub: '3 days left',
              colors: ['#ff9a9e', '#f5a691c9'],
              route: 'Appointment',
            },
            {
              icon: 'medical-services',
              text: 'Doctor',
              sub: doctorDisplay,
              colors: ['#a1c4fd', '#1facedad'],
              route: 'Doctor',
            },
            {
              icon: 'notifications-active',
              text: 'Reminders',
              sub: '2 pending',
              colors: ['#ffecd2', '#fcb69f'],
              route: 'Reminder',
            },
            {
              icon: 'history',
              text: 'History',
              sub: '3 records',
              colors: ['#84fab0', '#8fd3f4'],
              route: 'History',
            },
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={() => navigation.navigate(action.route)}
            >
              <GradientView
                colors={action.colors}
                style={styles.actionGradient}
              >
                <Icon name={action.icon} size={32} color="#fff" />
                <Text style={styles.actionText}>{action.text}</Text>
                <Text style={styles.actionSub}>{action.sub}</Text>
              </GradientView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Metrics - UPDATED WITH REAL DATA */}
        <View style={styles.healthSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Health Metrics</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('healthmetrics')}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.metricsGrid}>
            {[
              { 
                icon: 'favorite', 
                value: '78 bpm', 
                label: 'Heart Rate',
                subLabel: 'bpm'
              },
              { 
                icon: 'water-drop', 
                value: latestHealthData?.bp ? `${latestHealthData.bp.systolic}/${latestHealthData.bp.diastolic}` : '--/--', 
                label: 'Blood Pressure',
                subLabel: 'mmHg'
              },
              { 
                icon: 'scale', 
                value: latestHealthData?.weight ? `${latestHealthData.weight}` : '--', 
                label: 'Weight',
                subLabel: 'kg'
              },
              { 
                icon: 'local-drink', 
                value: latestHealthData?.bloodSugar ? `${latestHealthData.bloodSugar}` : '--', 
                label: 'Blood Sugar',
                subLabel: 'mg/dL'
              },
            ].map((metric, i) => (
              <View key={i} style={styles.metricCard}>
                <Icon name={metric.icon} size={26} color="#667eea" />
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricSubLabel}>{metric.subLabel}</Text>
              </View>
            ))}
          </View>
          
          {/* Additional sleep metric if available */}
          {latestHealthData?.sleepHours && (
            <View style={styles.additionalMetric}>
              <Icon name="hotel" size={20} color="#667eea" />
              <Text style={styles.additionalMetricText}>
                Sleep: {latestHealthData.sleepHours} hours
              </Text>
            </View>
          )}
        </View>

        {/* Rest of Dashboard (tips, emergency, etc.) unchanged */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <View style={styles.tipIcon}>
              <Icon name="lightbulb" size={24} color="#FFC107" />
            </View>
            <Text style={styles.tipTitle}>Daily Health Tip</Text>
          </View>
          <Text style={styles.tipText}>
            Take short walks daily to improve circulation and ease back pain.
            Remember to stay hydrated and listen to your body's signals.
          </Text>
          <TouchableOpacity
            style={styles.tipAction}
            onPress={() => navigation.navigate('healthTips')}
          >
            <Text style={styles.tipActionText}>Learn More</Text>
            <Icon name="arrow-forward" size={16} color="#667eea" />
          </TouchableOpacity>
        </View>

        <View style={styles.emergencySection}>
          <GradientView
            colors={['#ff6b6b', '#ee5a52']}
            style={styles.emergencyGradient}
          >
            <View style={styles.emergencyContent}>
              <View style={styles.emergencyInfo}>
                <View style={styles.emergencyIcon}>
                  <Icon name="call" size={28} color="#fff" />
                </View>
                <View>
                  <Text style={styles.emergencyText}>Emergency Contact</Text>
                  <Text style={styles.emergencySub}>
                    {userData?.emergencyName || 'No contact'}
                  </Text>
                  <Text style={styles.emergencyNumber}>
                    {userData?.emergencyPhone || '—'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => navigation.navigate('Emergency')}
              >
                <Icon name="call" size={20} color="#ff6b6b" />
                <Text style={styles.callText}>Call</Text>
              </TouchableOpacity>
            </View>
          </GradientView>
        </View>
      </Animated.ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.navBackground}>
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'favorite', label: 'Health' },
            { icon: 'menu-book', label: 'AntenatalTracker' },
            { icon: 'person', label: 'Profile' },
            { icon: 'settings', label: 'Settings' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() =>
                navigation.navigate(
                  item.label === 'Home' ? 'Dashboard' : item.label,
                )
              }
            >
              <Icon
                name={item.icon}
                size={24}
                color={index === 0 ? '#667eea' : '#666'}
              />
              <Text
                style={[
                  styles.navLabel,
                  { color: index === 0 ? '#667eea' : '#666' },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;