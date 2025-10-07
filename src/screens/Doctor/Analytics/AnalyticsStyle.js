//Analytics style

import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  exportBtn: { backgroundColor: '#0ea5a4', padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center' },

  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  kpiCard: { flex: 1, backgroundColor: '#fff', padding: 14, marginHorizontal: 6, borderRadius: 12, alignItems: 'center', elevation: 1 },
  kpiNum: { fontSize: 20, fontWeight: '700' },
  kpiLabel: { color: '#64748b', marginTop: 6 },

  placeholderChart: { backgroundColor: '#fff', padding: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 1, marginTop: 12 },
  reportCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, elevation: 1, marginTop: 10 },
});
