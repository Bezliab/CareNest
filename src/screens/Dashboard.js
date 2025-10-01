// src/screens/Dashboard.js
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  // Custom gradient component since we're not using Expo
  const GradientView = ({ colors, style, children }) => (
    <View style={[style, { overflow: 'hidden' }]}>
      <View style={[StyleSheet.absoluteFill, { 
        backgroundColor: colors[0],
        opacity: 0.8 
      }]} />
      <View style={[StyleSheet.absoluteFill, { 
        backgroundColor: colors[1] 
      }]} />
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Animated Header Background */}
      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >

        {/* Enhanced Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, Grace 👋</Text>
              <Text style={styles.subGreeting}>Week 24 • Baby kicking strong 💕</Text>
            </View>
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=45" }}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pregnancy Progress with Custom Gradient */}
        <View style={styles.progressCard}>
          <GradientView 
            colors={['#667eea', '#764ba2']} 
            style={styles.progressGradient}
          >
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Pregnancy Progress</Text>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText}>24/40</Text>
              </View>
            </View>
            
            <View style={styles.progressInfo}>
              <Text style={styles.progressWeek}>Week 24</Text>
              <Text style={styles.progressSubtitle}>Second Trimester</Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "60%" }]} />
              </View>
              <Text style={styles.progressPercentage}>60%</Text>
            </View>
            
            <View style={styles.progressFooter}>
              <View style={styles.dueDateContainer}>
                <Icon name="event" size={16} color="#fff" />
                <Text style={styles.dueDate}>Dec 15, 2025</Text>
              </View>
              <Text style={styles.babyInfo}>👶 Papaya-sized baby</Text>
            </View>
          </GradientView>
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {[
            {
              icon: 'calendar-month',
              text: 'Appointments',
              sub: '3 days left',
              colors: ['#ff9a9e', '#fad0c4']
            },
            {
              icon: 'medical-services',
              text: 'Doctor',
              sub: 'Dr. Aisha',
              colors: ['#a1c4fd', '#c2e9fb']
            },
            {
              icon: 'notifications-active',
              text: 'Reminders',
              sub: '2 pending',
              colors: ['#ffecd2', '#fcb69f']
            },
            {
              icon: 'history',
              text: 'History',
              sub: '3 records',
              colors: ['#84fab0', '#8fd3f4']
            }
          ].map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard}>
              <GradientView colors={action.colors} style={styles.actionGradient}>
                <Icon name={action.icon} size={32} color="#fff" />
                <Text style={styles.actionText}>{action.text}</Text>
                <Text style={styles.actionSub}>{action.sub}</Text>
              </GradientView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Metrics */}
        <View style={styles.healthSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Health Metrics</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#ffebee' }]}>
                <Icon name="favorite" size={24} color="#e91e63" />
              </View>
              <Text style={styles.metricValue}>120/80</Text>
              <Text style={styles.metricLabel}>BP</Text>
              <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.metricStatus}>Normal</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#e8f5e8' }]}>
                <Icon name="monitor-weight" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.metricValue}>62 kg</Text>
              <Text style={styles.metricLabel}>Weight</Text>
              <View style={[styles.statusIndicator, { backgroundColor: '#FF9800' }]}>
                <Text style={styles.metricStatus}>+2kg</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#e3f2fd' }]}>
                <Icon name="water-drop" size={24} color="#2196F3" />
              </View>
              <Text style={styles.metricValue}>2.5L</Text>
              <Text style={styles.metricLabel}>Water</Text>
              <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.metricStatus}>Good</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: '#fff3e0' }]}>
                <Icon name="nightlight" size={24} color="#FF9800" />
              </View>
              <Text style={styles.metricValue}>7.5h</Text>
              <Text style={styles.metricLabel}>Sleep</Text>
              <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.metricStatus}>Adequate</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Tip */}
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
          <TouchableOpacity style={styles.tipAction}>
            <Text style={styles.tipActionText}>Learn More</Text>
            <Icon name="arrow-forward" size={16} color="#667eea" />
          </TouchableOpacity>
        </View>

        {/* Emergency Section */}
        <View style={styles.emergencySection}>
          <GradientView colors={['#ff6b6b', '#ee5a52']} style={styles.emergencyGradient}>
            <View style={styles.emergencyContent}>
              <View style={styles.emergencyInfo}>
                <View style={styles.emergencyIcon}>
                  <Icon name="call" size={28} color="#fff" />
                </View>
                <View>
                  <Text style={styles.emergencyText}>Emergency Contact</Text>
                  <Text style={styles.emergencySub}>Dr. Aisha Kareem</Text>
                  <Text style={styles.emergencyNumber}>+234 802 123 4567</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.callBtn}>
                <Icon name="call" size={20} color="#ff6b6b" />
                <Text style={styles.callText}>Call</Text>
              </TouchableOpacity>
            </View>
          </GradientView>
        </View>

      </Animated.ScrollView>

      {/* Enhanced Bottom Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.navBackground}>
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'favorite', label: 'Health' },
            { icon: 'menu-book', label: 'Resources' },
            { icon: 'person', label: 'Profile' },
            { icon: 'settings', label: 'Settings' }
          ].map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.navItem}
              onPress={() => navigation.navigate(item.label === 'Home' ? 'Dashboard' : item.label)}
            >
              <Icon 
                name={item.icon} 
                size={24} 
                color={index === 0 ? "#667eea" : "#666"} 
              />
              <Text style={[
                styles.navLabel,
                { color: index === 0 ? "#667eea" : "#666" }
              ]}>
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f8fafc" 
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { 
    fontSize: 28, 
    fontWeight: "800", 
    color: "#1e293b",
    marginBottom: 4 
  },
  subGreeting: { 
    fontSize: 16, 
    color: "#64748b", 
    fontWeight: "500" 
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 7,
  },
  progressCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  progressGradient: {
    borderRadius: 20,
    padding: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#fff" 
  },
  weekBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  weekBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  progressInfo: {
    marginBottom: 20,
  },
  progressWeek: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  progressPercentage: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: { 
    fontSize: 14, 
    color: "#fff", 
    marginLeft: 6,
    fontWeight: '600',
  },
  babyInfo: { 
    fontSize: 14, 
    color: "rgba(255,255,255,0.9)", 
    fontStyle: "italic",
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    height: 120,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  actionGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  actionSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  healthSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
  },
  seeAllText: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 72) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  metricStatus: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  tipCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fffbf0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  tipText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  tipAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  tipActionText: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 4,
  },
  emergencySection: {
    marginHorizontal: 24,
    marginBottom: 100,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  emergencyGradient: {
    borderRadius: 20,
  },
  emergencyContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emergencyIcon: {
    marginRight: 16,
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  emergencySub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  emergencyNumber: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  callText: {
    color: '#ff6b6b',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 4,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    paddingBottom: 8,
  },
  navBackground: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});