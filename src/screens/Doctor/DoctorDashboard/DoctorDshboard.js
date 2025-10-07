//UPDATED DOCTOR'S DASHBOARD



// src/screens/DoctorDashboard/DoctorDashboard.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, db } from '../../../api/firebaseConfig';
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import styles from './DoctorDashBoardStyle';

const AbsoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };

/**
 * GradientView: lightweight gradient-like background using two overlays.
 * (No extra libs required — keeps the light theme aesthetic.)
 */
const GradientView = ({ colors = ['#e6f7f5', '#dff3f1'], style, children }) => (
  <View style={[style, { overflow: 'hidden' }]}>
    <View style={[AbsoluteFill, { backgroundColor: colors[0], opacity: 1 }]} />
    <View style={[AbsoluteFill, { backgroundColor: colors[1], opacity: 0.9 }]} />
    {children}
  </View>
);

const KPI = ({ label, value }) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={styles.kpiLabel}>{label}</Text>
  </View>
);

const ActivityRow = ({ item }) => (
  <View style={styles.activityCard}>
    <Icon name={item.icon ?? 'notifications'} size={22} color="#0f766e" />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <Text style={styles.activityText}>{item.title ?? item.text ?? 'Activity'}</Text>
      <Text style={styles.activityTime}>
        {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : item._createdAtString ?? ''}
      </Text>
    </View>
  </View>
);

const DoctorDashboard = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [1, 0.88],
    extrapolate: 'clamp',
  });

  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({ patients: 0, appointmentsToday: 0, pendingReports: 0 });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Doctor doc listener (real-time)
    const docRef = doc(db, 'doctors', user.uid);
    const unsubscribeDoctor = onSnapshot(
      docRef,
      snap => {
        if (snap.exists()) {
          const data = snap.data();
          setDoctorData(data);
          // If your doctor doc contains aggregated KPI fields, use them; otherwise these are fallbacks.
          setKpis(prev => ({
            patients: data.patientsCount ?? prev.patients,
            appointmentsToday: data.appointmentsToday ?? prev.appointmentsToday,
            pendingReports: data.pendingReports ?? prev.pendingReports,
          }));
        } else {
          setDoctorData(null);
        }
        setLoading(false);
      },
      err => {
        console.error('doctor listener error', err);
        setLoading(false);
      },
    );

    // Recent activities: one-off fetch (keeps things light). Change to onSnapshot if you want live updates.
    (async () => {
      try {
        const activitiesRef = collection(db, 'activities');
        const q = query(activitiesRef, orderBy('createdAt', 'desc'), limit(8));
        const snaps = await getDocs(q);
        const arr = [];
        snaps.forEach(s => {
          const data = s.data();
          // try to normalize createdAt to a readable string if it's a Firestore Timestamp
          let _createdAtString = '';
          if (data.createdAt?.toDate) _createdAtString = data.createdAt.toDate().toLocaleString();
          arr.push({ id: s.id, ...data, _createdAtString });
        });
        setActivities(arr);
      } catch (e) {
        console.error('activities fetch error', e);
      }
    })();

    return () => {
      unsubscribeDoctor();
    };
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>
                Hello, Dr. {doctorData?.lastName ?? doctorData?.name ?? '—'}
              </Text>
              <Text style={styles.subGreeting}>
                {doctorData?.specialization ?? 'General Practitioner'}
              </Text>
              {doctorData?.clinic && (
                <Text style={styles.clinicText}>{doctorData.clinic}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => navigation.navigate('DoctorProfile')}
            >
              <Image
                source={{
                  uri: doctorData?.avatar || 'https://i.pravatar.cc/150?img=12',
                }}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* KPI Row */}
        <View style={styles.kpiRow}>
          <KPI label="Active Patients" value={kpis.patients} />
          <KPI label="Appointments Today" value={kpis.appointmentsToday} />
          <KPI label="Pending Reports" value={kpis.pendingReports} />
        </View>

        {/* Performance / Quick Summary Card */}
        <View style={styles.performanceContainer}>
          <GradientView colors={['#e6f7f5', '#ffffff']} style={styles.performanceCard}>
            <View>
              <Text style={styles.performanceTitle}>Today — At a glance</Text>
              <Text style={styles.performanceSubtitle}>
                Manage patients, appointments, and resources from one place.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.performanceBtn}
              onPress={() => navigation.navigate('Reports')}
            >
              <Icon name="insert-chart" size={18} color="#fff" />
              <Text style={styles.performanceBtnText}>Open Reports</Text>
            </TouchableOpacity>
          </GradientView>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {[
            {
              icon: 'groups',
              title: 'Patient Management',
              subtitle: 'View & edit patients',
              route: 'PatientManagement',
              colors: ['#dff7f4', '#eafefe'],
            },
            {
              icon: 'local-hospital',
              title: 'Facility Resources',
              subtitle: 'Check equipment & beds',
              route: 'FacilityResources',
              colors: ['#eef7f6', '#f7fbfb'],
            },
            {
              icon: 'analytics',
              title: 'Analytics & Reports',
              subtitle: 'KPIs & exports',
              route: 'Reports',
              colors: ['#f0f7f6', '#fffdfa'],
            },
            {
              icon: 'calendar-month',
              title: 'Appointments',
              subtitle: 'Manage schedule',
              route: 'DoctorAppointments',
              colors: ['#f6fbfa', '#ffffff'],
            },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.actionCard}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}
            >
              <View style={styles.actionLeft}>
                <View style={styles.actionIconWrap}>
                  <Icon name={item.icon} size={22} color="#0f766e" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionSub}>{item.subtitle}</Text>
                </View>
              </View>

              <Icon name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {activities.length === 0 ? (
            <View style={styles.emptyRow}>
              <Text style={styles.emptyText}>No recent activity</Text>
            </View>
          ) : (
            <FlatList
              data={activities}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <ActivityRow item={item} />}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* spacing bottom */}
        <View style={{ height: 140 }} />
      </Animated.ScrollView>

      {/* Floating Add Patient Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPatient')}
      >
        <Icon name="person-add" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoctorDashboard;
