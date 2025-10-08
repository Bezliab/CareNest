import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  sortText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '600',
  },

  searchInput: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDEDED',
  },
  filterButtonSelected: { backgroundColor: '#007AFF' },
  filterText: { fontSize: 14, color: '#666' },
  filterTextSelected: { color: '#fff', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  info: { fontSize: 14, color: '#666', marginBottom: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusPending: { backgroundColor: '#FFF5E5' },
  statusComplete: { backgroundColor: '#E6F9F1' },
  statusText: { fontSize: 12, fontWeight: '600' },
  statusTextPending: { color: '#FFA800' },
  statusTextComplete: { color: '#00C853' },
});

