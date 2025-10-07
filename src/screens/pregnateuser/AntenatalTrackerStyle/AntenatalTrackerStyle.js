import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginVertical: 10,
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    borderLeftWidth: 4,
    borderColor: "#2563eb",
  },
  cardDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  cardText: {
    fontSize: 14,
    color: "#4b5563",
  },
  cardStatus: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  completeBtn: {
    marginTop: 8,
    backgroundColor: "#16a34a",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  completeText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    elevation: 6,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelBtn: {
    alignItems: "center",
    marginTop: 6,
  },
  cancelText: {
    color: "#6b7280",
    fontWeight: "500",
  },
});
