// screens/ProfileScreenStyle.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1976d2",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1976d2",
    borderRadius: 6,
  },
  progressText: {
    textAlign: "right",
    fontSize: 12,
    color: "#555",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionBtn: {
    backgroundColor: "#1976d2",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: 100,
    marginRight: 3,
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  linkText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
});
