import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", // soft background
    padding: 16,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginVertical: 10,
  },

  // 🌸 Next Appointment Card
  nextCard: {
    backgroundColor: "#e0f2fe", // soft blue
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#bae6fd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  nextTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 6,
  },

  nextDate: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
  },

  nextDetail: {
    fontSize: 15,
    color: "#475569",
    marginTop: 4,
  },

  noNextCard: {
    backgroundColor: "#fef9c3",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fde68a",
    alignItems: "center",
    marginBottom: 15,
  },

  noNextText: {
    color: "#854d0e",
    fontWeight: "500",
  },

  // 🩺 Appointment Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  cardDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: 4,
  },

  cardText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 2,
  },

  cardStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },

  completeBtn: {
    backgroundColor: "#16a34a",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 8,
    alignItems: "center",
  },

  completeText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 20,
    fontSize: 15,
  },

  // 💬 Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 16,
    elevation: 6,
  },

  modalHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 15,
    color: "#475569",
    marginVertical: 3,
  },

  modalStatus: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 15,
  },

  saveBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },

  cancelBtn: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  cancelText: {
    color: "#475569",
    fontWeight: "600",
  },
});
