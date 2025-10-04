import React, { useEffect, useState, useRef } from "react";
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
} from "react-native";
import { Dimensions } from "react-native";
import styles from "./DashboardStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

// ✅ Firebase imports
import { auth, db } from "../../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const { width } = Dimensions.get("window");

const Dashboard = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  // ✅ Fetch user info from Firestore using Auth UID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.log("⚠️ No user data found for:", user.uid);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Custom gradient component
  const GradientView = ({ colors, style, children }) => (
    <View style={[style, { overflow: "hidden" }]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors[0], opacity: 0.8 },
        ]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors[1],
          },
        ]}
      />
      {children}
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Animated Header Background */}
      <Animated.View
        style={[styles.headerBackground, { opacity: headerOpacity }]}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>
                Hello, {userData?.name || "name"} 👋
              </Text>
              <Text style={styles.subGreeting}>
                Welcome back! Stay healthy 💕
              </Text>
            </View>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={{
                  uri: userData?.photoURL || "https://i.pravatar.cc/150?img=45",
                }}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pregnancy Progress */}
        <View style={styles.progressCard}>
          <GradientView
            colors={["#667eea", "#764ba2"]}
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

        {/* Quick Actions */}
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {[
            {
              icon: "calendar-month",
              text: "Appointments",
              sub: "3 days left",
              colors: ["#ff9a9e", "#f5a691c9"],
              route: "Appointment",
            },
            {
              icon: "medical-services",
              text: "Doctor",
              sub: "Dr. Aisha",
              colors: ["#a1c4fd", "#1facedad"],
              route: "Doctor",
            },
            {
              icon: "notifications-active",
              text: "Reminders",
              sub: "2 pending",
              colors: ["#ffecd2", "#fcb69f"],
              route: "Reminder",
            },
            {
              icon: "history",
              text: "History",
              sub: "3 records",
              colors: ["#84fab0", "#8fd3f4"],
              route: "History",
            },
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={() => navigation.navigate(action.route)}
            >
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
            <TouchableOpacity onPress={() => navigation.navigate("Health")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.metricsGrid}>
            {[
              { icon: "favorite", value: "78 bpm", label: "Heart Rate" },
              { icon: "water-drop", value: "120/80", label: "Blood Pressure" },
              { icon: "scale", value: "68 kg", label: "Weight" },
              { icon: "local-drink", value: "2.5 L", label: "Water Intake" },
            ].map((metric, i) => (
              <View key={i} style={styles.metricCard}>
                <Icon name={metric.icon} size={26} color="#667eea" />
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
            ))}
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
          <GradientView
            colors={["#ff6b6b", "#ee5a52"]}
            style={styles.emergencyGradient}
          >
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
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => navigation.navigate("Emergency")}
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
            { icon: "home", label: "Home" },
            { icon: "favorite", label: "Health" },
            { icon: "menu-book", label: "Resources" },
            { icon: "person", label: "Profile" },
            { icon: "settings", label: "Settings" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() =>
                navigation.navigate(
                  item.label === "Home" ? "Dashboard" : item.label
                )
              }
            >
              <Icon
                name={item.icon}
                size={24}
                color={index === 0 ? "#667eea" : "#666"}
              />
              <Text
                style={[
                  styles.navLabel,
                  { color: index === 0 ? "#667eea" : "#666" },
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
