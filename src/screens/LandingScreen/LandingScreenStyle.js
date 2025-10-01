import { StyleSheet } from "react-native";

const landingStyles = StyleSheet.create({
  // Full background
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  container: {
    position:"fixed ",
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    // marginTop: -57,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d63384",
    marginTop: 40,
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#222",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  features: {
    width: "100%",
    marginVertical: 15,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // semi-transparent for readability
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d63384",
  },

  cardText: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#d63384",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default landingStyles;
