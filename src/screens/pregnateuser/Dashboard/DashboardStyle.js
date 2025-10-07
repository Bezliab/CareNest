import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  // Header
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  subGreeting: {
    fontSize: 14,
    color: '#667',
    marginTop: 4,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Pregnancy Progress
  progressCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
  },
  progressGradient: {
    padding: 20,
    borderRadius: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  weekBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  weekBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressInfo: {
    marginTop: 14,
  },
  progressWeek: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#eee',
    marginTop: 2,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  progressPercentage: {
    color: '#fff',
    fontWeight: '600',
  },
  progressFooter: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueDate: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  babyInfo: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  // Quick Actions
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: '#222',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  quickActionCard: {
    width: '47%',
    marginBottom: 14,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  actionGradient: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'flex-start',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 12,
  },
  actionSub: {
    fontSize: 13,
    color: '#000',
    marginTop: 4,
  },

  // Health Metrics
  healthSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  seeAllText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  metricIcon: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  metricLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  statusIndicator: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  metricStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },

  // Tip Card
  tipCard: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff3cd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 14,
  },
  tipAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },

  // Emergency Section
  emergencySection: {
    margin: 16,
    marginBottom: 100,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
  },
  emergencyGradient: {
    padding: 20,
    borderRadius: 18,
  },
  emergencyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 12,
  },
  emergencyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  emergencySub: {
    fontSize: 13,
    color: '#fdd',
  },
  emergencyNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  callText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff6b6b',
  },

  // Bottom Navigation
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navBackground: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
