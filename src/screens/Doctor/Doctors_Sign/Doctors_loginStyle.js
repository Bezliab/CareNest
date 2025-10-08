// src/screens/Doctor/Doctors_loginStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f8fc",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0b72ff",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },

  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },

  submitBtn: {
    backgroundColor: "#0b72ff",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
    shadowColor: "#0b72ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  loginText: {
    fontSize: 15,
    color: "#555",
  },

  loginLink: {
    fontSize: 15,
    color: "#0b72ff",
    fontWeight: "600",
  },
});

export default styles;
