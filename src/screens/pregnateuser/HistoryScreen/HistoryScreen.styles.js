import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /* ========== Layout ========== */
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // clean light background
  },

  /* ========== Header ========== */
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C', // dark slate
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096', // muted gray
  },

  /* ========== Filters (Pill-style Tabs) ========== */
  filterContainer: {
    marginVertical: 10,
    paddingLeft: 16,
  },
  filterContent: {
    paddingRight: 16,
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#4C51BF', // deep indigo
    borderColor: '#4C51BF',
    shadowColor: '#4C51BF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },

  /* ========== History List ========== */
  historyList: {
    flex: 1,
    paddingHorizontal: 18,
  },
  historyListContent: {
    paddingBottom: 30,
  },
  historyItem: {
    marginBottom: 14,
  },

  /* ========== Cards ========== */
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginLeft: 8,
  },
  cardContent: {
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#4A5568',
    marginTop: 2,
  },
  notes: {
    fontSize: 13,
    color: '#2D3748',
    fontStyle: 'italic',
    marginTop: 6,
  },

  /* ========== Status Badges ========== */
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    backgroundColor: '#C6F6D5',
  },
  milestoneBadge: {
    backgroundColor: '#FED7D7',
  },
  testBadge: {
    backgroundColor: '#B2F5EA',
  },

  /* ========== Achievements ========== */
  achievementsContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  achievementsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  achievementText: {
    fontSize: 12,
    color: '#2D3748',
    marginLeft: 6,
    fontWeight: '500',
  },

  /* ========== Empty State ========== */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginTop: 12,
    marginBottom: 6,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: '#A0AEC0',
    textAlign: 'center',
  },
});
