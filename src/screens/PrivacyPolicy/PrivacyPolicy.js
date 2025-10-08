//Help centre 
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PrivacyPolicy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    personalizedAds: false,
    analytics: true,
    communityVisibility: true,
    healthDataSharing: false,
    emailNotifications: true,
  });

  const toggleSetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const privacySections = [
    {
      id: '1',
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as your name, email address, pregnancy details, and health information when you use our services. We also automatically collect certain information about your device and usage patterns.',
    },
    {
      id: '2',
      title: 'How We Use Your Information',
      content: 'We use your information to provide personalized pregnancy tracking, connect you with relevant resources, improve our services, and communicate with you about updates and support. Your health data is used solely to enhance your maternal care experience.',
    },
    {
      id: '3',
      title: 'Data Sharing & Disclosure',
      content: 'We do not sell your personal information. We may share data with healthcare providers only with your explicit consent, or when required by law. Anonymous, aggregated data may be used for research to improve maternal healthcare outcomes.',
    },
    {
      id: '4',
      title: 'Data Security',
      content: 'We implement robust security measures including encryption, secure servers, and regular security audits to protect your personal and health information. Your data is stored securely and accessed only by authorized personnel.',
    },
    {
      id: '5',
      title: 'Your Rights & Choices',
      content: 'You have the right to access, correct, or delete your personal information. You can opt-out of data collection, withdraw consents, and export your data at any time through your account settings or by contacting our support team.',
    },
    {
      id: '6',
      title: 'Children\'s Privacy',
      content: 'Our services are designed for expecting mothers and are not intended for children under 13. We do not knowingly collect personal information from children under 13 without parental consent.',
    },
  ];

  const legalLinks = [
    {
      title: 'Terms of Service',
      url: 'https://maternal.app/terms',
      icon: 'document-text-outline',
    },
    {
      title: 'Data Processing Agreement',
      url: 'https://maternal.app/dpa',
      icon: 'shield-checkmark-outline',
    },
    {
      title: 'Cookie Policy',
      url: 'https://maternal.app/cookies',
      icon: 'nutrition-outline',
    },
    {
      title: 'GDPR Compliance',
      url: 'https://maternal.app/gdpr',
      icon: 'business-outline',
    },
  ];

  const handleLinkPress = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const handleDataExport = () => {
    // Implementation for data export would go here
    alert('Data export process started. You will receive an email with your data shortly.');
  };

  const handleAccountDeletion = () => {
    // Implementation for account deletion would go here
    alert('Account deletion requested. Please check your email to confirm this action.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Privacy & Data Protection</Text>
          <Text style={styles.headerSubtitle}>
            Your privacy is our priority. Learn how we protect and handle your information.
          </Text>
        </View>

        {/* Last Updated */}
        <View style={styles.updateBadge}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.updateText}>Last updated: December 2024</Text>
        </View>

        {/* Privacy Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <Text style={styles.sectionDescription}>
            Control how your data is collected and used
          </Text>

          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Data Collection</Text>
                <Text style={styles.settingDescription}>
                  Allow collection of usage data to improve app experience
                </Text>
              </View>
              <Switch
                value={privacySettings.dataCollection}
                onValueChange={() => toggleSetting('dataCollection')}
                trackColor={{ false: '#E0E0E0', true: '#8A2BE2' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Personalized Ads</Text>
                <Text style={styles.settingDescription}>
                  Show personalized advertisements based on your interests
                </Text>
              </View>
              <Switch
                value={privacySettings.personalizedAds}
                onValueChange={() => toggleSetting('personalizedAds')}
                trackColor={{ false: '#E0E0E0', true: '#8A2BE2' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Analytics</Text>
                <Text style={styles.settingDescription}>
                  Share anonymous usage data for analytics purposes
                </Text>
              </View>
              <Switch
                value={privacySettings.analytics}
                onValueChange={() => toggleSetting('analytics')}
                trackColor={{ false: '#E0E0E0', true: '#8A2BE2' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Community Visibility</Text>
                <Text style={styles.settingDescription}>
                  Show your profile in community forums and groups
                </Text>
              </View>
              <Switch
                value={privacySettings.communityVisibility}
                onValueChange={() => toggleSetting('communityVisibility')}
                trackColor={{ false: '#E0E0E0', true: '#8A2BE2' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Health Data Sharing</Text>
                <Text style={styles.settingDescription}>
                  Share anonymized health data for medical research
                </Text>
              </View>
              <Switch
                value={privacySettings.healthDataSharing}
                onValueChange={() => toggleSetting('healthDataSharing')}
                trackColor={{ false: '#E0E0E0', true: '#8A2BE2' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Privacy Policy Content */}
        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          
          {privacySections.map((section) => (
            <View key={section.id} style={styles.policyItem}>
              <Text style={styles.policyTitle}>{section.title}</Text>
              <Text style={styles.policyContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        {/* Legal Documents */}
        <View style={styles.legalSection}>
          <Text style={styles.sectionTitle}>Legal Documents</Text>
          <View style={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.legalLink}
                onPress={() => handleLinkPress(link.url)}
                activeOpacity={0.7}
              >
                <View style={styles.legalLinkLeft}>
                  <Ionicons name={link.icon} size={20} color="#8A2BE2" />
                  <Text style={styles.legalLinkText}>{link.title}</Text>
                </View>
                <Ionicons name="open-outline" size={18} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.dataManagementSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity
            style={[styles.dataAction, styles.exportButton]}
            onPress={handleDataExport}
            activeOpacity={0.7}
          >
            <View style={styles.dataActionLeft}>
              <Ionicons name="download-outline" size={22} color="#8A2BE2" />
              <View>
                <Text style={styles.dataActionTitle}>Export Your Data</Text>
                <Text style={styles.dataActionDescription}>
                  Download a copy of all your personal data
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dataAction, styles.deleteButton]}
            onPress={handleAccountDeletion}
            activeOpacity={0.7}
          >
            <View style={styles.dataActionLeft}>
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
              <View>
                <Text style={[styles.dataActionTitle, styles.deleteTitle]}>
                  Delete Account
                </Text>
                <Text style={styles.dataActionDescription}>
                  Permanently delete your account and all data
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <View style={styles.contactCard}>
            <Ionicons name="shield-checkmark" size={32} color="#8A2BE2" />
            <Text style={styles.contactTitle}>Privacy Questions?</Text>
            <Text style={styles.contactDescription}>
              Our privacy team is here to help you with any questions or concerns about your data protection.
            </Text>
            <View style={styles.contactMethods}>
              <TouchableOpacity style={styles.contactButton} activeOpacity={0.7}>
                <Ionicons name="mail-outline" size={16} color="#FFF" />
                <Text style={styles.contactButtonText}>Email Privacy Team</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButtonOutline} activeOpacity={0.7}>
                <Ionicons name="chatbubble-outline" size={16} color="#8A2BE2" />
                <Text style={styles.contactButtonOutlineText}>Live Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using Maternal, you acknowledge that you have read and understood this Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  updateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  updateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  settingsSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  policySection: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  legalSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dataManagementSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  policyItem: {
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  policyContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  legalLinks: {
    gap: 12,
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  legalLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalLinkText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  dataAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  exportButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  deleteButton: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  dataActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dataActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    marginLeft: 12,
  },
  deleteTitle: {
    color: '#FF3B30',
  },
  dataActionDescription: {
    fontSize: 13,
    color: '#666',
    marginLeft: 12,
  },
  contactCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  contactMethods: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactButtonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    gap: 6,
  },
  contactButtonOutlineText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

export default PrivacyPolicy;
