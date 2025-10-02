import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcfdfeff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
    elevation: 5,
  },
  backButton: {
    marginRight: 12,
    padding: 6,
    backgroundColor: "#5563c1",
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subHeader: {
    fontSize: 15,
    color: "#444",
    marginVertical: 12,
    lineHeight: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#222",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  linkText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#667eea",
    textAlign: "right",
  },
  cardWarning: {
    backgroundColor: "#d32f2f",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 6,
  },
  cardTitleLight: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#fff",
  },
  cardTextLight: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#fff8e1",
    borderRadius: 16,
    padding: 18,
    marginBottom: 30,
    alignItems: "center",
    elevation: 4,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ff9800",
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
