import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  apptCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  apptPatient: { fontWeight: '700', fontSize: 15 },
  apptMeta: { color: '#64748b', marginTop: 6 },
  status: { fontWeight: '700' },
  acceptBtn: { backgroundColor: '#10b981', padding: 8, borderRadius: 8, marginRight: 8 },
  rejectBtn: { backgroundColor: '#ef4444', padding: 8, borderRadius: 8 },
});