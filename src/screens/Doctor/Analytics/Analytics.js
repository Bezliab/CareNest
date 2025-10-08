//Analytics and report

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './AnalyticsStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../../api/firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const AnalyticsReports = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Example: fetch last 50 reports and compute a tiny summary.
        const q = query(collection(db, 'appointments'), orderBy('when', 'desc'), limit(50));
        const snaps = await getDocs(q);
        const total = snaps.size;
        // For demo, avg satisfaction mocked
        setSummary({ totalAppointments: total, avgSatisfaction: 4.6, growth: 6 });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleExport = () => {
    // stub: you can use rn-fs / share / cloud functions to export real data
    Alert.alert('Export', 'Export started (implement export logic using RN FS or cloud functions).');
  };

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#0f766e" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Analytics & Reports</Text>
          <TouchableOpacity style={styles.exportBtn} onPress={handleExport}>
            <Icon name="file-download" size={18} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 8 }}>Export</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}><Text style={styles.kpiNum}>{summary.totalAppointments}</Text><Text style={styles.kpiLabel}>Appointments</Text></View>
          <View style={styles.kpiCard}><Text style={styles.kpiNum}>{summary.avgSatisfaction}</Text><Text style={styles.kpiLabel}>Avg Satisfaction</Text></View>
          <View style={styles.kpiCard}><Text style={styles.kpiNum}>{summary.growth}%</Text><Text style={styles.kpiLabel}>Growth</Text></View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Trends</Text>
          <Text style={{ color: '#94a3b8', marginTop: 6 }}>Chart placeholder — tell me which chart lib you'd like (I can integrate).</Text>
          <View style={styles.placeholderChart}><Text style={{ color: '#94a3b8' }}>Chart placeholder</Text></View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Top Reports</Text>
          <View style={styles.reportCard}><Text style={{ fontWeight: '700' }}>Monthly Appointments</Text><Text style={{ color: '#64748b', marginTop: 6 }}>Download or send via email</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsReports;
