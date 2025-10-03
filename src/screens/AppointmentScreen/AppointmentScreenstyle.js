import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  // --- Header ---
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },

  // --- Next Appointment Card ---
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    color: "#444",
  },
  date: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
    color: "#222",
  },
  time: {
    fontSize: 16,
    marginBottom: 14,
    color: "#667eea",
    fontWeight: "500",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  detail: {
    fontSize: 15,
    marginLeft: 8,
    color: "#555",
  },
  reminderButton: {
    backgroundColor: "#667eea",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 20,
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  reminderText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // --- Upcoming Appointments Timeline ---
  subHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444",
    marginBottom: 14,
    marginLeft: 5,
  },
  timelineCard: {
    flexDirection: "row",
    marginBottom: 22,
    alignItems: "flex-start",
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#667eea",
    marginTop: 6,
    marginRight: 14,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  timelineDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  timelineTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667eea",
    marginBottom: 4,
  },
  timelineType: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  timelineDoctor: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  timelineLocation: {
    fontSize: 13,
    color: "#777",
  },

  // --- Tips Section ---
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
    flex: 1,
    lineHeight: 20,
  },
});
