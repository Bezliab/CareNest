import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 15,
  },

  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginVertical: 10,
  },

  // 🔔 Reminder Cards
  reminderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginVertical: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderLeftWidth: 5,
  },

  reminderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  reminderTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
  },

  reminderDesc: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 3,
  },

  reminderDate: {
    fontSize: 13,
    color: "#2563eb",
    marginTop: 6,
  },

  reminderTime: {
    fontSize: 13,
    color: "#0f766e",
    marginTop: 2,
  },

  // ➕ Add Button
  addBtn: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },

  // ⚙️ Action Row
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#0284c7",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  editBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  // 🧾 Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  modalHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 14,
    color: "#1f2937",
  },

  selectedDateText: {
    textAlign: "center",
    color: "#2563eb",
    fontSize: 13,
    marginVertical: 6,
  },

  saveBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 15,
  },

  cancelBtn: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },

  cancelText: {
    color: "#1f2937",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },
});
