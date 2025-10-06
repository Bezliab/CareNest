import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./DoctorDashBoardStyle";
import { auth, firestore } from "../../../api/firebaseConfig";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

const DashboardScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("Doctor");
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    alerts: 0,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const dashboardItems = [
    { title: "Patient List", icon: "account-group", screen: "PatientListScreen", badge: stats.patients },
    { title: "Schedule", icon: "calendar-check", screen: "ScheduleScreen", badge: stats.appointments },
    { title: "Record Health Data", icon: "stethoscope", screen: "HealthDataScreen" },
    { title: "Reminders", icon: "bell-ring", screen: "RemindersScreen" },
    { title: "Emergency", icon: "alert-circle", screen: "EmergencyScreen", badge: stats.alerts },
    { title: "Education", icon: "book-open-page-variant", screen: "EducationScreen" },
    { title: "Analytics", icon: "chart-line", screen: "AnalyticsScreen" },
    { title: "Chat", icon: "chat", screen: "ChatScreen" },
    { title: "Offline Mode", icon: "wifi-off", screen: "OfflineScreen" },
    { title: "Settings", icon: "cog", screen: "Settings" },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();

    const user = auth().currentUser;
    if (user) {
      firestore().collection("doctors").doc(user.uid).get().then(doc => {
        if (doc.exists) setUserName(doc.data().fullName || "Doctor");
      });

      // Fetch simple stats
      firestore().collection("patients").get().then(snapshot => {
        setStats(prev => ({ ...prev, patients: snapshot.size }));
      });
      firestore().collection("appointments").get().then(snapshot => {
        setStats(prev => ({ ...prev, appointments: snapshot.size }));
      });
      firestore().collection("alerts").get().then(snapshot => {
        setStats(prev => ({ ...prev, alerts: snapshot.size }));
      });
    }
  }, []);

  const recentPatients = [
    { id: 1, name: "Aliyat Adeleke", visit: "Tomorrow" },
    { id: 2, name: "Mary Johnson", visit: "Today" },
    { id: 3, name: "Fatima Bello", visit: "Sep 8" },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
        <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.headerCard}>
          <Image source={require("../../Assets/LOGO.png")} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.headerText}>Welcome Back,</Text>
            <Text style={styles.headerSubText}>{userName}</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Stats Panel */}
      <View style={styles.statsContainer}>
        <LinearGradient colors={["#43e97b", "#38f9d7"]} style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.patients}</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </LinearGradient>
        <LinearGradient colors={["#fa709a", "#fee140"]} style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.appointments}</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </LinearGradient>
        <LinearGradient colors={["#f7971e", "#ffd200"]} style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.alerts}</Text>
          <Text style={styles.statLabel}>Alerts</Text>
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        {/* Dashboard Grid */}
        <View style={styles.grid}>
          {dashboardItems.map((item, index) => {
            const scaleAnim = new Animated.Value(1);
            const handlePressIn = () =>
              Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
            const handlePressOut = () =>
              Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

            return (
              <Animated.View key={index} style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={styles.cardWrapper}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate(item.screen)}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.card}>
                    <Icon name={item.icon} size={38} color="#fff" />
                    <Text style={styles.cardText}>{item.title}</Text>
                    {item.badge ? <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View> : null}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

       {/* Recent Patients */}
<Text style={styles.sectionTitle}>Recent Patients</Text>
<FlatList
  horizontal
  data={recentPatients}
  keyExtractor={(item) => item.id.toString()}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 20 }}
  renderItem={({ item }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();

    const handlePressOut = () => Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }], marginRight: 15 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.recentCardWrapper}
        >
          <LinearGradient
            colors={["#6a11cb", "#2575fc"]}
            style={styles.recentCard}
          >
            <View style={styles.recentHeader}>
              <Image
                source={require("../../Assets/patient.png")} // Add placeholder patient image
                style={styles.patientAvatar}
              />
              <Text style={styles.recentName}>{item.name}</Text>
            </View>
            <View style={styles.visitBadge}>
              <Text style={styles.visitText}>Next Visit: {item.visit}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }}
/>

      </ScrollView>

      {/* Floating Quick Action */}
      <TouchableOpacity style={styles.floatingBtn} onPress={() => navigation.navigate("HealthDataScreen")}>
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
