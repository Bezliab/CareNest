// DoctorSignUpStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f7fb" },
  container: { flexGrow: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#0b1226", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#6b7280", marginBottom: 20, textAlign: "center" },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: "#111" },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0fe",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  uploadText: { marginLeft: 10, color: "#0b72ff", fontWeight: "600" },
  submitBtn: {
    backgroundColor: "#0b72ff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  loginRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  loginText: { color: "#6b7280" },
  loginLink: { color: "#0b72ff", fontWeight: "600" },
});
