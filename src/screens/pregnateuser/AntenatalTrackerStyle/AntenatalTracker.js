import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Reusable Components ---

const ShortcutButton = ({ icon, label }) => (
  <View style={styles.shortcutItem}>
    <View style={styles.shortcutIconContainer}>
      {icon}
    </View>
  </View>
);

const StatCard = ({ title, value, children }) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
    <View style={styles.statGraph}>{children}</View>
  </View>
);

// --- Main Screen Component ---

export default function AntenatalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Elena Patricia</Text>
          <Image
            source={{ uri: 'https://placehold.co/40x40/FFC0CB/333333?text=EP' }}
            style={styles.profileImage}
          />
        </View>

        {/* --- Fetus Info Card --- */}
        <View style={styles.fetusCard}>
          <View style={styles.fetusCardHeader}>
            <View style={styles.dayInfo}>
              <Feather name="sun" size={20} color="#fff" />
              <Text style={styles.dayText}>34</Text>
            </View>
          </View>

          <Image
            source={{ uri: 'https://i.imgur.com/k4dY41Y.png' }}
            style={styles.fetusImage}
            resizeMode="contain"
          />

          <View style={styles.fetusMeasurements}>
            <View style={styles.measurement}>
              <View style={styles.measurementIcon}>
                <Ionicons name="rose-outline" size={20} color="#D97596" />
              </View>
              <Text style={styles.measurementValue}>8.5 g</Text>
              <Text style={styles.measurementLabel}>WEIGHT</Text>
            </View>

            <View style={styles.measurement}>
              <Text style={styles.measurementValue}>18.5 cm</Text>
              <Text style={styles.measurementLabel}>LENGTH</Text>
            </View>
          </View>
        </View>

        {/* --- Due Date Card --- */}
        <View style={styles.dueDateCard}>
          <View style={styles.dueDateIcon}>
            <MaterialCommunityIcons name="pulse" size={24} color="#D97596" />
          </View>
          <View>
            <Text style={styles.dueDateLabel}>Due Date</Text>
            <Text style={styles.dueDateText}>18 January 2025</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#D97596" />
        </View>

        {/* --- Stats Section --- */}
        <View style={styles.statsContainer}>
          <StatCard title="KICKS TODAY" value="30">
            <View style={styles.barChart}>
              {[...Array(12)].map((_, i) => (
                <View
                  key={i}
                  style={[styles.bar, { height: Math.random() * 30 + 10 }]}
                />
              ))}
            </View>
          </StatCard>

          <StatCard title="CONTRACTIONS" value="5/h">
            <View style={styles.lineChart}>
              <View style={styles.line} />
            </View>
          </StatCard>
        </View>

        {/* --- Shortcuts --- */}
        <Text style={styles.sectionTitle}>Shortcut</Text>
        <View style={styles.shortcutContainer}>
          <ShortcutButton
            icon={<MaterialCommunityIcons name="food-apple-outline" size={24} color="#D97596" />}
          />
          <ShortcutButton
            icon={<Ionicons name="walk-outline" size={24} color="#D97596" />}
          />
          <ShortcutButton
            icon={<MaterialCommunityIcons name="baby-bottle-outline" size={24} color="#D97596" />}
          />
          <ShortcutButton
            icon={<Feather name="plus" size={24} color="#D97596" />}
          />
        </View>

      </ScrollView>

      {/* --- Bottom Navigation --- */}
      <View style={styles.navBar}>
        <Ionicons
          name="home-outline"
          size={26}
          color="#D97596"
          style={styles.navIconActive}
        />
        <Feather name="calendar" size={26} color="#BDBDBD" />
        <Feather name="bell" size={26} color="#BDBDBD" />
        <Feather name="heart" size={26} color="#BDBDBD" />
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fetusCard: {
    backgroundColor: '#FFDBC9',
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 20,
    alignItems: 'center',
  },
  fetusCardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dayText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  fetusImage: {
    width: 200,
    height: 250,
    marginVertical: 10,
  },
  fetusMeasurements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 15,
    width: '100%',
  },
  measurement: {
    alignItems: 'center',
    flex: 1,
  },
  measurementIcon: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  measurementLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  dueDateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    elevation: 2,
  },
  dueDateIcon: {
    backgroundColor: '#FFEFF4',
    padding: 12,
    borderRadius: 15,
  },
  dueDateLabel: {
    color: '#888',
    fontSize: 14,
  },
  dueDateText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    width: '48%',
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTitle: {
    color: '#888',
    fontSize: 12,
  },
  statValue: {
    color: '#D97596',
    fontWeight: 'bold',
  },
  statGraph: {
    height: 40,
    marginTop: 10,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  bar: {
    width: 4,
    backgroundColor: '#FFEFF4',
    borderRadius: 2,
  },
  lineChart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#D97596',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 10,
    transform: [{ rotate: '-5deg' }],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  shortcutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  shortcutItem: {
    alignItems: 'center',
  },
  shortcutIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },
  navIconActive: {
    color: '#D97596',
    backgroundColor: '#FFEFF4',
    padding: 10,
    borderRadius: 15,
  },
});
