import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },

  headerBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 220,
    backgroundColor: '#ecfeff',
  },

  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  greeting: { fontSize: 22, fontWeight: '700', color: '#064e3b' },
  subGreeting: { fontSize: 14, color: '#0f766e', marginTop: 4 },
  clinicText: { fontSize: 12, color: '#6b7280', marginTop: 4 },

  avatarContainer: { position: 'relative' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff' },
  onlineIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },

  // KPI row
  kpiRow: {
    marginHorizontal: 14,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  kpiValue: { fontSize: 20, fontWeight: '800', color: '#064e3b' },
  kpiLabel: { fontSize: 12, color: '#6b7280', marginTop: 6 },

  // Performance
  performanceContainer: { marginHorizontal: 16, marginTop: 14 },
  performanceCard: {
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  performanceTitle: { fontSize: 16, fontWeight: '700', color: '#064e3b' },
  performanceSubtitle: { fontSize: 13, color: '#6b7280', marginTop: 6, maxWidth: 220 },
  performanceBtn: {
    backgroundColor: '#0f766e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceBtnText: { color: '#fff', marginLeft: 8, fontWeight: '600' },

  // Quick Actions list
  sectionHeader: { marginLeft: 16, marginTop: 20, fontSize: 18, fontWeight: '700', color: '#064e3b' },
  quickActions: {
    paddingHorizontal: 12,
    marginTop: 10,
    flexDirection: 'column',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  actionIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: { fontSize: 15, fontWeight: '700', color: '#064e3b' },
  actionSub: { fontSize: 12, color: '#6b7280', marginTop: 4 },

  // Recent activity
  activitySection: { marginHorizontal: 16, marginTop: 16 },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  activityTitle: { fontSize: 16, fontWeight: '700', color: '#064e3b' },
  seeAllText: { color: '#0f766e', fontWeight: '600' },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  activityText: { fontSize: 14, color: '#0f172a', fontWeight: '600' },
  activityTime: { fontSize: 11, color: '#94a3b8', marginTop: 6 },

  emptyRow: { padding: 12, alignItems: 'center' },
  emptyText: { color: '#94a3b8' },

<<<<<<< HEAD

=======
  // Floating action button
>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 24,
    backgroundColor: '#0f766e',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#0f766e',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
});
