import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { styles } from './EmergencyAlertsDashboard.styles';

const EmergencyAlertsDashboard = () => {
  const [emergencyAlerts, setEmergencyAlerts] = useState([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      message: 'I need help! Severe abdominal pain',
      timestamp: '2025-01-15T10:30:00Z',
      location: '123 Main St, New York, NY',
      status: 'pending',
      phoneNumber: '+1234567890',
      severity: 'high',
    },
    {
      id: '2',
      patientName: 'Maria Garcia',
      message: 'Bleeding and dizziness',
      timestamp: '2025-01-15T09:15:00Z',
      location: '456 Oak Ave, Brooklyn, NY',
      status: 'help_sent',
      phoneNumber: '+1234567891',
      severity: 'critical',
    },
    {
      id: '3',
      patientName: 'Lisa Chen',
      message: 'Contractions every 5 minutes',
      timestamp: '2025-01-15T08:45:00Z',
      location: '789 Pine St, Queens, NY',
      status: 'arrived',
      phoneNumber: '+1234567892',
      severity: 'high',
    },
  ]);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: '#FF6B6B' },
    { value: 'help_sent', label: 'Help Sent', color: '#FFA726' },
    { value: 'arrived', label: 'Arrived at Facility', color: '#4CAF50' },
    { value: 'resolved', label: 'Resolved', color: '#2196F3' },
  ];

  const getStatusInfo = status => {
    return (
      statusOptions.find(option => option.value === status) || statusOptions[0]
    );
  };

  const getSeverityColor = severity => {
    switch (severity) {
      case 'critical':
        return '#FF0000';
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFA726';
      default:
        return '#FFA726';
    }
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleCallPatient = (phoneNumber, patientName) => {
    Alert.alert(`Call ${patientName}`, `Do you want to call ${phoneNumber}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Call',
        onPress: () => {
          const phoneUrl = `tel:${phoneNumber}`;
          Linking.openURL(phoneUrl).catch(err =>
            Alert.alert('Error', 'Could not make call'),
          );
        },
      },
    ]);
  };

  const handleUpdateStatus = (alertId, currentStatus) => {
    const currentIndex = statusOptions.findIndex(
      option => option.value === currentStatus,
    );
    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];

    setEmergencyAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: nextStatus.value } : alert,
      ),
    );
  };

  const handleViewLocation = (location, patientName) => {
    const encodedLocation = encodeURIComponent(location);
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const url = Platform.select({
      ios: `${scheme}${encodedLocation}`,
      android: `${scheme}${encodedLocation}`,
    });

    Linking.openURL(url).catch(err =>
      Alert.alert('Error', 'Could not open maps app'),
    );
  };

  const handleReferToHospital = (patientName, location) => {
    Alert.alert(
      `Refer ${patientName} to Hospital`,
      `Find nearby hospitals for patient at ${location}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Find Hospitals',
          onPress: () => {
            // In a real app, this would integrate with hospital APIs
            const hospitalSearchUrl = `https://www.google.com/maps/search/hospitals+near+${encodeURIComponent(
              location,
            )}`;
            Linking.openURL(hospitalSearchUrl).catch(err =>
              Alert.alert('Error', 'Could not search for hospitals'),
            );
          },
        },
      ],
    );
  };

  const getAlertsByStatus = status => {
    return emergencyAlerts.filter(alert => alert.status === status);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Alerts</Text>
        <Text style={styles.headerSubtitle}>
          {emergencyAlerts.filter(alert => alert.status === 'pending').length}{' '}
          pending alerts
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Critical Alerts Section */}
        {getAlertsByStatus('pending').length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Critical - Immediate Attention
            </Text>
            {getAlertsByStatus('pending').map(alert => (
              <View
                key={alert.id}
                style={[
                  styles.alertCard,
                  { borderLeftColor: getSeverityColor(alert.severity) },
                ]}
              >
                <View style={styles.alertHeader}>
                  <Text style={styles.patientName}>{alert.patientName}</Text>
                  <View
                    style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(alert.severity) },
                    ]}
                  >
                    <Text style={styles.severityText}>
                      {alert.severity.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.alertMessage}>🚨 {alert.message}</Text>

                <View style={styles.alertInfo}>
                  <Text style={styles.timestamp}>
                    {formatTime(alert.timestamp)} •{' '}
                    {formatDate(alert.timestamp)}
                  </Text>
                </View>

                {alert.location && (
                  <TouchableOpacity
                    style={styles.locationButton}
                    onPress={() =>
                      handleViewLocation(alert.location, alert.patientName)
                    }
                  >
                    <Text style={styles.locationText}>📍 {alert.location}</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() =>
                      handleCallPatient(alert.phoneNumber, alert.patientName)
                    }
                  >
                    <Text style={styles.actionButtonText}>📞 Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.hospitalButton]}
                    onPress={() =>
                      handleReferToHospital(alert.patientName, alert.location)
                    }
                  >
                    <Text style={styles.actionButtonText}>
                      🏥 Refer Hospital
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.updateButton]}
                    onPress={() => handleUpdateStatus(alert.id, alert.status)}
                  >
                    <Text style={styles.actionButtonText}>Update Status</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.statusContainer}>
                  <Text style={styles.statusLabel}>Current Status:</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusInfo(alert.status).color },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getStatusInfo(alert.status).label}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Other Alerts Section */}
        {emergencyAlerts.filter(alert => alert.status !== 'pending').length >
          0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Other Alerts</Text>
            {emergencyAlerts
              .filter(alert => alert.status !== 'pending')
              .map(alert => (
                <View
                  key={alert.id}
                  style={[styles.alertCard, styles.nonCriticalCard]}
                >
                  <View style={styles.alertHeader}>
                    <Text style={styles.patientName}>{alert.patientName}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusInfo(alert.status).color },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {getStatusInfo(alert.status).label}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.alertMessage}>{alert.message}</Text>

                  <View style={styles.alertInfo}>
                    <Text style={styles.timestamp}>
                      {formatTime(alert.timestamp)} •{' '}
                      {formatDate(alert.timestamp)}
                    </Text>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.callButton]}
                      onPress={() =>
                        handleCallPatient(alert.phoneNumber, alert.patientName)
                      }
                    >
                      <Text style={styles.actionButtonText}>📞 Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, styles.updateButton]}
                      onPress={() => handleUpdateStatus(alert.id, alert.status)}
                    >
                      <Text style={styles.actionButtonText}>Update Status</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        )}

        {emergencyAlerts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No emergency alerts</Text>
            <Text style={styles.emptyStateSubtext}>
              All emergency requests are currently handled
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EmergencyAlertsDashboard;
