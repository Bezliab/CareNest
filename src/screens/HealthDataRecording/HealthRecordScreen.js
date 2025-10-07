import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { styles } from './HealthDataRecording.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HealthDataRecording = ({ route }) => {
  const { patientId, patientName } = route.params || {};

  const [vitalSigns, setVitalSigns] = useState({
    systolicBP: '',
    diastolicBP: '',
    weight: '',
    bloodSugar: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [labResults, setLabResults] = useState({
    testName: '',
    result: '',
    normalRange: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('vitals');

  const handleVitalSignsChange = (field, value) => {
    setVitalSigns(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLabResultsChange = (field, value) => {
    setLabResults(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveVitalSigns = () => {
    if (
      !vitalSigns.systolicBP ||
      !vitalSigns.diastolicBP ||
      !vitalSigns.weight
    ) {
      Alert.alert('Error', 'Please fill in all required vital signs');
      return;
    }

    Alert.alert('Success', 'Vital signs recorded successfully');

    setVitalSigns({
      systolicBP: '',
      diastolicBP: '',
      weight: '',
      bloodSugar: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const saveLabResults = () => {
    if (!labResults.testName || !labResults.result) {
      Alert.alert('Error', 'Please fill in test name and result');
      return;
    }

    Alert.alert('Success', 'Lab results recorded successfully');

    setLabResults({
      testName: '',
      result: '',
      normalRange: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const uploadReport = () => {
    // Simulate report upload
    const newReport = {
      id: Date.now().toString(),
      name: `Medical_Report_${Date.now()}`,
      type: 'ultrasound',
      date: new Date().toLocaleDateString(),
    };
    setReports(prev => [...prev, newReport]);
    Alert.alert('Success', 'Report uploaded successfully');
  };

  const viewReport = report => {
    Alert.alert(
      'Report Details',
      `Name: ${report.name}\nType: ${report.type}\nDate: ${report.date}\n\nThis would open the full report in a detailed view.`,
    );
  };

  const deleteReport = reportId => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this report?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setReports(prev => prev.filter(report => report.id !== reportId));
            Alert.alert('Success', 'Report deleted successfully');
          },
        },
      ],
    );
  };

  const generateReport = () => {
    const reportData = {
      patientId,
      patientName: patientName || 'Current Patient',
      date: new Date().toLocaleDateString(),
      vitalSigns,
      labResults: labResults.testName ? [labResults] : [],
      totalReports: reports.length,
    };

    Alert.alert(
      'Patient Report Generated',
      `Patient: ${reportData.patientName}\nDate: ${
        reportData.date
      }\nVital Signs Recorded: ${
        vitalSigns.systolicBP ? 'Yes' : 'No'
      }\nLab Results: ${labResults.testName ? 'Yes' : 'No'}\nTotal Reports: ${
        reports.length
      }`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Share Report', onPress: () => shareReport(reportData) },
      ],
    );
  };

  const shareReport = reportData => {
    console.log('Sharing report:', reportData);
    Alert.alert(
      'Info',
      'Report sharing functionality would be implemented here',
    );
  };

  const renderVitalSignsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Ionicons name="pulse" size={24} color="#e91e63" />
        <Text style={styles.sectionTitle}>Record Vital Signs</Text>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="water" size={16} color="#2c3e50" />
          <Text style={styles.label}>Blood Pressure (mmHg)</Text>
        </View>
        <View style={styles.bpContainer}>
          <View style={styles.bpInputWrapper}>
            <TextInput
              style={styles.bpInput}
              placeholder="Systolic"
              value={vitalSigns.systolicBP}
              onChangeText={value =>
                handleVitalSignsChange('systolicBP', value)
              }
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.bpSeparator}>/</Text>
          <View style={styles.bpInputWrapper}>
            <TextInput
              style={styles.bpInput}
              placeholder="Diastolic"
              value={vitalSigns.diastolicBP}
              onChangeText={value =>
                handleVitalSignsChange('diastolicBP', value)
              }
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="scale" size={16} color="#2c3e50" />
          <Text style={styles.label}>Weight (kg)</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={vitalSigns.weight}
          onChangeText={value => handleVitalSignsChange('weight', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="fitness" size={16} color="#2c3e50" />
          <Text style={styles.label}>Blood Sugar (mg/dL)</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter blood sugar level"
          value={vitalSigns.bloodSugar}
          onChangeText={value => handleVitalSignsChange('bloodSugar', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="calendar" size={16} color="#2c3e50" />
          <Text style={styles.label}>Date</Text>
        </View>
        <TextInput
          style={styles.input}
          value={vitalSigns.date}
          onChangeText={value => handleVitalSignsChange('date', value)}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveVitalSigns}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Vital Signs</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLabResultsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Ionicons name="flask" size={24} color="#3498db" />
        <Text style={styles.sectionTitle}>Lab Test Results</Text>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="document-text" size={16} color="#2c3e50" />
          <Text style={styles.label}>Test Name</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="e.g., HbA1c, Glucose, etc."
          value={labResults.testName}
          onChangeText={value => handleLabResultsChange('testName', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="analytics" size={16} color="#2c3e50" />
          <Text style={styles.label}>Result</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter test result"
          value={labResults.result}
          onChangeText={value => handleLabResultsChange('result', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="speedometer" size={16} color="#2c3e50" />
          <Text style={styles.label}>Normal Range</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="e.g., 70-100 mg/dL"
          value={labResults.normalRange}
          onChangeText={value => handleLabResultsChange('normalRange', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Ionicons name="calendar" size={16} color="#2c3e50" />
          <Text style={styles.label}>Date</Text>
        </View>
        <TextInput
          style={styles.input}
          value={labResults.date}
          onChangeText={value => handleLabResultsChange('date', value)}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, styles.labButton]}
        onPress={saveLabResults}
      >
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Lab Results</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReportsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Ionicons name="folder-open" size={24} color="#27ae60" />
        <Text style={styles.sectionTitle}>Medical Reports</Text>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={uploadReport}>
        <Ionicons name="cloud-upload" size={20} color="#fff" />
        <Text style={styles.uploadButtonText}>Upload Report</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Ionicons name="list" size={20} color="#34495e" />
        <Text style={styles.subSectionTitle}>
          Uploaded Reports ({reports.length})
        </Text>
      </View>

      {reports.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Ionicons name="document" size={50} color="#bdc3c7" />
          <Text style={styles.noDataText}>No reports uploaded yet</Text>
        </View>
      ) : (
        reports.map(report => (
          <View key={report.id} style={styles.reportItem}>
            <View style={styles.reportInfo}>
              <Ionicons name="document-text" size={24} color="#3498db" />
              <View style={styles.reportTextContainer}>
                <Text style={styles.reportName}>{report.name}</Text>
                <Text style={styles.reportDetails}>
                  Type: {report.type} | Date: {report.date}
                </Text>
              </View>
            </View>
            <View style={styles.reportActions}>
              <TouchableOpacity
                style={styles.reportActionButton}
                onPress={() => viewReport(report)}
              >
                <Ionicons name="eye" size={20} color="#3498db" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reportActionButton}
                onPress={() => deleteReport(report.id)}
              >
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Data Recording</Text>
        {patientName && (
          <Text style={styles.patientName}>
            <Ionicons name="person" size={16} color="#7f8c8d" />
            Patient: {patientName}
          </Text>
        )}
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vitals' && styles.activeTab]}
          onPress={() => setActiveTab('vitals')}
        >
          <Ionicons
            name="pulse"
            size={20}
            color={activeTab === 'vitals' ? '#e91e63' : '#7f8c8d'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'vitals' && styles.activeTabText,
            ]}
          >
            Vital Signs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'labs' && styles.activeTab]}
          onPress={() => setActiveTab('labs')}
        >
          <Ionicons
            name="flask"
            size={20}
            color={activeTab === 'labs' ? '#3498db' : '#7f8c8d'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'labs' && styles.activeTabText,
            ]}
          >
            Lab Results
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'reports' && styles.activeTab]}
          onPress={() => setActiveTab('reports')}
        >
          <Ionicons
            name="document"
            size={20}
            color={activeTab === 'reports' ? '#27ae60' : '#7f8c8d'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'reports' && styles.activeTabText,
            ]}
          >
            Reports
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'vitals' && renderVitalSignsTab()}
        {activeTab === 'labs' && renderLabResultsTab()}
        {activeTab === 'reports' && renderReportsTab()}

        <TouchableOpacity
          style={styles.generateReportButton}
          onPress={generateReport}
        >
          <Ionicons name="document-text" size={20} color="#fff" />
          <Text style={styles.generateReportButtonText}>
            Generate Patient Report
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HealthDataRecording;
