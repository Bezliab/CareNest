import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fd",
  },

  // 🔹 HEADER
  headerGradient: {
    height: 230,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  headerContent: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  bio: {
    fontSize: 14,
    color: "#f0f0f0",
  },

  // 🔹 CARD
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#555",
  },

  // 🔹 STATS
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  statBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 4,
    width: "30%",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#555",
  },

  // 🔹 ACTIONS
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1976d2",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
  },
  actionText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  // 🔹 SETTINGS
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
