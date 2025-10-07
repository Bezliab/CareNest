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
    fontSize: 25,
    paddingVertical: 14,
    gap: 6,
    lineHeight: 30,
    fontWeight: "600",
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
  alignSelf: "flex-start",
  marginTop: 12,
  backgroundColor: "#667eea", // soft indigo/purple
  color: "#fff",
  fontSize: 14,
  fontWeight: "600",
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 25, // pill button
  overflow: "hidden",
  elevation: 3, // shadow for Android
  shadowColor: "#000", // shadow for iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
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
    navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    paddingBottom: 8,
  },
  navBackground: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  }
});
