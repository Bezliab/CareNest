import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  SafeAreaView,
} from "react-native";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Star, 
  ChevronRight,
  Bell,
  Search,
  Filter
} from "react-native-feather";
import LinearGradient from "react-native-linear-gradient";
import styles from "./DoctorDashBoardStyle";

const DoctorDashboard = ({ navigation }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    completed: 0
  });

  // Demo doctor data
  const demoDoctor = {
    name: "Dr. Jane Doe",
    specialty: "Cardiology",
    email: "jane.doe@hospital.com"
  };

  // Demo appointments
  const demoAppointments = [
    {
      id: "1",
      patientName: "John Smith",
      date: new Date().toISOString().split('T')[0],
      time: "10:00 AM",
      status: "confirmed",
      location: "Room 101"
    },
    {
      id: "2",
      patientName: "Mary Johnson",
      date: new Date().toISOString().split('T')[0],
      time: "11:30 AM",
      status: "pending",
      location: "Room 102"
    },
    {
      id: "3",
      patientName: "Alex Lee",
      date: "2025-10-07",
      time: "2:00 PM",
      status: "confirmed",
      location: "Room 103"
    },
    {
      id: "4",
      patientName: "Sara Kim",
      date: "2025-10-08",
      time: "9:00 AM",
      status: "completed",
      location: "Room 104"
    }
  ];

  const fetchData = async () => {
    // Simulate loading
    setTimeout(() => {
      setDoctorData(demoDoctor);
      setAppointments(demoAppointments);
      calculateStats(demoAppointments);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const calculateStats = (appointments) => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    const upcomingAppointments = appointments.filter(apt => apt.date > today);
    const completedAppointments = appointments.filter(apt => apt.status === 'completed');

    setStats({
      today: todayAppointments.length,
      upcoming: upcomingAppointments.length,
      completed: completedAppointments.length
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAppointmentStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date >= today).slice(0, 5);
  };

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() => navigation.navigate("AppointmentDetails", { appointmentId: item.id })}
    >
      <View style={styles.appointmentHeader}>
        <View style={styles.patientInfo}>
          <User width={16} height={16} color="#4B5563" />
          <Text style={styles.patientName}>{item.patientName}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getAppointmentStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getAppointmentStatusColor(item.status) }]}>
            {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Calendar width={14} height={14} color="#6B7280" />
          <Text style={styles.detailText}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock width={14} height={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        {item.location && (
          <View style={styles.detailRow}>
            <MapPin width={14} height={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        )}
      </View>

      <View style={styles.appointmentFooter}>
        <TouchableOpacity style={styles.contactButton}>
          <Phone width={14} height={14} color="#2563EB" />
          <Text style={styles.contactText}>Call</Text>
        </TouchableOpacity>
        <View style={styles.chevron}>
          <ChevronRight width={16} height={16} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStatsCard = () => (
    <LinearGradient
      colors={['#2563EB', '#1D4ED8']}
      style={styles.statsCard}
    >
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.today}</Text>
        <Text style={styles.statLabel}>Today</Text>
      </View>
      <View style={styles.statSeparator} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.upcoming}</Text>
        <Text style={styles.statLabel}>Upcoming</Text>
      </View>
      <View style={styles.statSeparator} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.completed}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
    </LinearGradient>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.doctorName}>{doctorData?.name || "Doctor"}</Text>
            <Text style={styles.specialty}>{doctorData?.specialty}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell width={24} height={24} color="#374151" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        {renderStatsCard()}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Calendar width={20} height={20} color="#2563EB" />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <User width={20} height={20} color="#10B981" />
              <Text style={styles.actionText}>Patients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Mail width={20} height={20} color="#F59E0B" />
              <Text style={styles.actionText}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Star width={20} height={20} color="#8B5CF6" />
              <Text style={styles.actionText}>Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {getUpcomingAppointments().length > 0 ? (
            <FlatList
              data={getUpcomingAppointments()}
              keyExtractor={item => item.id}
              renderItem={renderAppointmentItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Calendar width={48} height={48} color="#9CA3AF" />
              <Text style={styles.emptyStateTitle}>No Appointments</Text>
              <Text style={styles.emptyStateText}>
                You don't have any upcoming appointments scheduled.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default DoctorDashboard;
