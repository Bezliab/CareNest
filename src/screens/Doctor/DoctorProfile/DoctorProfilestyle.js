import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    color: '#222',
  },
  specialty: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});