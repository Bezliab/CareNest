import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { styles } from './HealthEducationManagementStyles';

const HealthEducationManagement = () => {
  const [selectedTab, setSelectedTab] = useState('weeklyTips');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [uploadedMaterials, setUploadedMaterials] = useState([]);

  // Sample data
  const weeklyTips = [
    {
      id: '1',
      title: 'Week 24: Baby Development',
      content:
        'Your baby is now the size of a papaya! Their lungs are developing and they can hear sounds from outside.',
      week: 24,
    },
    {
      id: '2',
      title: 'Healthy Sleep Positions',
      content:
        'Sleep on your side, preferably left side, to improve blood flow to your baby.',
      week: 24,
    },
    {
      id: '3',
      title: 'Exercise Tips',
      content:
        'Light walking and prenatal yoga are great for maintaining fitness during pregnancy.',
      week: 24,
    },
  ];

  const nutritionInfo = [
    {
      id: '1',
      title: 'Essential Nutrients',
      content:
        'Focus on iron-rich foods, folic acid, calcium, and protein for healthy baby development.',
    },
    {
      id: '2',
      title: 'Foods to Avoid',
      content:
        'Avoid raw seafood, unpasteurized dairy, and limit caffeine intake.',
    },
    {
      id: '3',
      title: 'Healthy Snacking',
      content:
        'Choose fruits, nuts, yogurt, and whole grains for nutritious snacks.',
    },
  ];

  const healthCampaigns = [
    {
      id: '1',
      title: 'Malaria Prevention',
      content:
        'Use insecticide-treated nets and wear protective clothing during evening hours.',
      active: true,
    },
    {
      id: '2',
      title: 'Antenatal Care Checkups',
      content:
        "Regular checkups are essential for monitoring your and your baby's health.",
      active: true,
    },
    {
      id: '3',
      title: 'Vaccination Awareness',
      content:
        'Ensure you receive all recommended vaccinations during pregnancy.',
      active: false,
    },
  ];

  const handleUploadMaterial = () => {
    // In a real app, this would open file picker
    Alert.alert('Upload', 'Select educational material to upload');
  };

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    Alert.alert(
      'Send Broadcast',
      'Are you sure you want to send this message to all mothers in your area?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            setShowBroadcastModal(false);
            setBroadcastMessage('');
            Alert.alert('Success', 'Message sent to all mothers in your area');
          },
        },
      ],
    );
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'weeklyTips':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Weekly Pregnancy Tips</Text>
            {weeklyTips.map(tip => (
              <View key={tip.id} style={styles.tipCard}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipContent}>{tip.content}</Text>
                <Text style={styles.weekTag}>Week {tip.week}</Text>
              </View>
            ))}
          </View>
        );

      case 'nutrition':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Nutrition Information</Text>
            {nutritionInfo.map(info => (
              <View key={info.id} style={styles.infoCard}>
                <Text style={styles.infoTitle}>{info.title}</Text>
                <Text style={styles.infoContent}>{info.content}</Text>
              </View>
            ))}
          </View>
        );

      case 'campaigns':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Local Health Campaigns</Text>
            {healthCampaigns.map(campaign => (
              <View
                key={campaign.id}
                style={[
                  styles.campaignCard,
                  campaign.active && styles.activeCampaign,
                ]}
              >
                <View style={styles.campaignHeader}>
                  <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      campaign.active
                        ? styles.activeBadge
                        : styles.inactiveBadge,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {campaign.active ? 'Active' : 'Ended'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.campaignContent}>{campaign.content}</Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Education Management</Text>
        <Text style={styles.headerSubtitle}>
          Educational materials and campaigns
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Upload Educational Materials</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadMaterial}
          >
            <Text style={styles.uploadButtonText}>+ Upload File</Text>
          </TouchableOpacity>
          <Text style={styles.uploadHint}>
            Supported formats: PDF, DOC, Images, Videos
          </Text>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'weeklyTips' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('weeklyTips')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'weeklyTips' && styles.activeTabText,
              ]}
            >
              Weekly Tips
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'nutrition' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('nutrition')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'nutrition' && styles.activeTabText,
              ]}
            >
              Nutrition
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'campaigns' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('campaigns')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'campaigns' && styles.activeTabText,
              ]}
            >
              Campaigns
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        {renderContent()}

        {/* Broadcast Message Section */}
        <View style={styles.broadcastSection}>
          <Text style={styles.broadcastTitle}>Broadcast Messages</Text>
          <Text style={styles.broadcastSubtitle}>
            Send important updates to all mothers in your area
          </Text>
          <TouchableOpacity
            style={styles.broadcastButton}
            onPress={() => setShowBroadcastModal(true)}
          >
            <Text style={styles.broadcastButtonText}>
              Send Broadcast Message
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Broadcast Message Modal */}
      <Modal
        visible={showBroadcastModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send Broadcast Message</Text>

            <TextInput
              style={styles.messageInput}
              multiline
              numberOfLines={6}
              placeholder="Type your message here..."
              value={broadcastMessage}
              onChangeText={setBroadcastMessage}
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowBroadcastModal(false);
                  setBroadcastMessage('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleSendBroadcast}
              >
                <Text style={styles.sendButtonText}>Send to All Mothers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HealthEducationManagement;
