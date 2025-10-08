import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#064e3b' },
  addBtn: { backgroundColor: '#0f766e', padding: 10, borderRadius: 10 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, padding: 12, borderRadius: 10, elevation: 1 },
  searchInput: { marginLeft: 10, flex: 1 },
  patientCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  patientName: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  patientMeta: { color: '#64748b', marginTop: 6, fontSize: 13 },
});