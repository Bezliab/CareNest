import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // wrapper so background decorations don't shift content
  inner: {
    flex: 1,
    paddingBottom: 12,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#718096',
  },
  filterContainer: {
    marginVertical: 6,
    paddingLeft: 12,
  },
  filterContent: {
    paddingRight: 12,
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 72,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#6B73A3',
    borderColor: '#6B73A3',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#718096',
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    marginHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B73A3',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
  historyList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  historyListContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  milestoneCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedBadge: {
    backgroundColor: '#C6F6D5',
  },
  milestoneBadge: {
    backgroundColor: '#FED7D7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
  },
  cardContent: {
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  notes: {
    fontSize: 13,
    color: '#4A5568',
    fontStyle: 'italic',
    marginTop: 6,
  },
  description: {
    fontSize: 13,
    color: '#4A5568',
    marginTop: 6,
  },
  resultsContainer: {
    marginTop: 6,
  },
  resultsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  resultsText: {
    fontSize: 13,
    color: '#4A5568',
  },
  achievementsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
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
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  achievementText: {
    fontSize: 12,
    color: '#2D3748',
    marginLeft: 6,
    fontWeight: '500',
  },
  celebration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  celebrationText: {
    fontSize: 13,
    color: '#D69E2E',
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#718096',
    marginTop: 12,
    marginBottom: 6,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: '#A0AEC0',
    textAlign: 'center',
  },

  // Decorative background shapes (subtle, non-intrusive)
  decorationTopRight: {
    position: 'absolute',
    right: -60,
    top: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(107,115,163,0.06)',
    transform: [{ rotate: '15deg' }],
  },
  decorationBottomLeft: {
    position: 'absolute',
    left: -50,
    bottom: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(78,204,196,0.05)',
  },
});
