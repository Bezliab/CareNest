<<<<<<< HEAD
=======
//FacilitesResources style

>>>>>>> 5127c4afb24ee62764005d63ff9586aebf229fea
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  requestBtn: { backgroundColor: '#ef4444', padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center' },
  resourceCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  resourceTitle: { fontSize: 15, fontWeight: '700' },
  resourceMeta: { fontSize: 12, color: '#64748b', marginTop: 6 },
  resourceCount: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  smallBtn: { backgroundColor: '#0f766e', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
});