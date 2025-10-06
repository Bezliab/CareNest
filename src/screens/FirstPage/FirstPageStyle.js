import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f7fb' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 100, height: 100, borderRadius: 20, marginBottom: 10 },
  appName: { fontSize: 22, fontWeight: '700', color: '#0b1226' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#0a0a0a',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  roleText: { fontSize: 16, fontWeight: '600', color: '#0b1226', marginLeft: 10 },
  footer: { marginTop: 40 },
  footerText: { fontSize: 13, color: '#94a3b8' },
});