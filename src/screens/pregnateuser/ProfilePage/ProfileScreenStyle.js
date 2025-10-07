import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },

  // 🔹 HEADER
  headerGradient: {
    height: 230,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  bio: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 2,
  },

  // 🔹 CARD
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976d2',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#444',
  },

  // 🔹 STATS
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingHorizontal: 10,
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    width: '30%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
  },

  // 🔹 ACTIONS
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 4,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 14,
  },

  // 🔹 SETTINGS
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
