import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import landingStyles from "./LandingScreenStyle";

export default function LandingPage({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://www.jamaicaobserver.com/jamaicaobserver/news/wp-content/uploads/sites/4/2024/10/d307e05ae83330339e5fdd711014e06a-1024x574.jpg",
      }}
      style={landingStyles.background}
      imageStyle={{ opacity: 0.25 }}
    >
      <ScrollView contentContainerStyle={landingStyles.container}>
        <Text style={landingStyles.logo}>CareNest</Text>

        <Text style={landingStyles.title}>
          Maternal Healthcare at Your Fingertips
        </Text>
        <Text style={landingStyles.subtitle}>
          Track your pregnancy, access expert resources, and connect with
          healthcare providers.
        </Text>

        <View style={landingStyles.features}>
          <View style={landingStyles.card}>
            <Text style={landingStyles.cardTitle}>📅 Pregnancy Tracker</Text>
            <Text style={landingStyles.cardText}>
              Monitor each stage of your journey.
            </Text>
          </View>

          <View style={landingStyles.card}>
            <Text style={landingStyles.cardTitle}>🩺 Expert Advice</Text>
            <Text style={landingStyles.cardText}>
              Get reliable health tips and resources.
            </Text>
          </View>

          <View style={landingStyles.card}>
            <Text style={landingStyles.cardTitle}>🤝 Community Support</Text>
            <Text style={landingStyles.cardText}>
              Connect with mothers and caregivers.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={landingStyles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={landingStyles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[landingStyles.button, { backgroundColor: "#555" }]}
         onPress={() => navigation.navigate("SignUp")}>
        
          <Text style={landingStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
