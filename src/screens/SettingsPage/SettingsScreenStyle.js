// screens/SettingsScreenStyle.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },

  /* Dropdown container (visible area for Picker). Make sure zIndex/elevation is high
     so it sits above other cards. */
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    zIndex: 1000,
    overflow: "hidden",
  },

  /* Picker style - width 100% and a visible height (override per platform inline if needed) */
  dropdown: {
    width: "100%",
    // default height; overridden inline in component for platform specifics
    height: 48,
  },

  logout: {
    backgroundColor: "#fff5f5",
  },
  logoutText: {
    color: "#d32f2f",
    fontWeight: "600",
  },
  // Dropdown modal styling for language picker
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
},
modalContainer: {
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
  elevation: 5,
},
modalTitle: {
  fontSize: 18,
  fontWeight: "600",
  color: "#222",
  marginBottom: 10,
  textAlign: "center",
},
picker: {
  width: "100%",
  height: Platform.OS === "ios" ? 180 : 50,
},
modalButton: {
  backgroundColor: "#1976d2",
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 15,
},
modalButtonText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 16,
},

});
