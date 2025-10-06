import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#1976d2",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f4f9",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#1976d2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 12,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  roleSelected: {
    backgroundColor: "#1976d2",
  },
  roleText: {
    color: "#1976d2",
    fontWeight: "600",
  },
  roleTextSelected: {
    color: "#fff",
  },
});
