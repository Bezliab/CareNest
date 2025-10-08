import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useHealth } from '../../../utils/HealthContext'; // Adjust import path to your context file

const HealthMetricsScreen = () => {
  const { latestHealthData, healthHistory, loading, refreshHealthData } =
    useHealth();

  const onRefresh = () => {
    refreshHealthData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading health data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Health Metrics</Text>

      {latestHealthData ? (
        <View style={styles.currentData}>
          <Text style={styles.sectionTitle}>Latest Reading</Text>

          {/* Display your health metrics - adjust based on your data structure */}
          {latestHealthData.heartRate && (
            <Text style={styles.metric}>
              Heart Rate: {latestHealthData.heartRate} BPM
            </Text>
          )}

          {latestHealthData.bloodPressure && (
            <Text style={styles.metric}>
              Blood Pressure: {latestHealthData.bloodPressure}
            </Text>
          )}

          {latestHealthData.weight && (
            <Text style={styles.metric}>
              Weight: {latestHealthData.weight} kg
            </Text>
          )}

          {latestHealthData.temperature && (
            <Text style={styles.metric}>
              Temperature: {latestHealthData.temperature} °C
            </Text>
          )}

          {latestHealthData.timestamp && (
            <Text style={styles.timestamp}>
              Last updated:{' '}
              {new Date(latestHealthData.timestamp?.toDate()).toLocaleString()}
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.noData}>
          <Text>No health data available</Text>
          <Text>Pull down to refresh or add some health metrics</Text>
        </View>
      )}

      {/* Health History Section */}
      {healthHistory.length > 1 && (
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Recent History</Text>
          {healthHistory.slice(1, 6).map((entry, index) => (
            <View key={entry.id} style={styles.historyItem}>
              <Text style={styles.historyText}>
                {entry.timestamp &&
                  new Date(entry.timestamp.toDate()).toLocaleDateString()}
                {entry.heartRate && ` - Heart Rate: ${entry.heartRate} BPM`}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  currentData: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  metric: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    fontStyle: 'italic',
  },
  noData: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  historySection: {
    marginTop: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyText: {
    fontSize: 14,
    color: '#666',
  },
});

export default HealthMetricsScreen;
