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
});
