import { StyleSheet } from "react-native";

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  image: {
    width: 600,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // custom dot style for onboarding-swiper
  dot: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: "#4CAF50",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default onboardingStyles;
