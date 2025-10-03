import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },

  dateText: { fontSize: 16, color: "#666", textAlign: "center", marginVertical: 10 },

  scrollContainer: { padding: 16, paddingBottom: 100 },

  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderTitle: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  reminderDesc: { fontSize: 14, color: "#666" },
  reminderTime: { fontSize: 14, fontWeight: "bold", color: "#667eea" },

  addBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#667eea",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 6 },
});