import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./HealthScreenstyle";

export default function HealthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Maternal Health</Text>
      </View>

      {/* Hero Image Section */}
      <ImageBackground
        source={require("../../Assets/health-image.jpg")}
        style={{ width: "100%", height: 180, marginBottom: 15,  overflow: "hidden",marginTop:2 }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
            Your Health Journey
          </Text>
        </View>
      </ImageBackground>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.subHeader}>
          Explore essential tips for you and your baby 👩‍🍼
        </Text>

        {/* Mother’s Health */}
        <View style={[styles.card, { backgroundColor: "#e8f5e9" }]}>
          <Ionicons name="heart-outline" size={28} color="#388e3c" />
          <Text style={styles.cardTitle}>Mother’s Health</Text>
          <Text style={styles.cardText}>
            Learn how to stay strong and healthy throughout pregnancy.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("MotherHealthDetails")}>
            <Text style={styles.linkText}>See More →</Text>
          </TouchableOpacity>
        </View>

        {/* Baby’s Development */}
        <View style={[styles.card, { backgroundColor: "#e3f2fd" }]}>
          <Ionicons name="baby-outline" size={28} color="#1976d2" />
          <Text style={styles.cardTitle}>Baby’s Development</Text>
          <Text style={styles.cardText}>
            Track your baby’s growth week by week.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("BabyDevDetails")}>
            <Text style={styles.linkText}>See More →</Text>
          </TouchableOpacity>
        </View>

        {/* Nutrition */}
        <View style={[styles.card, { backgroundColor: "#fff3e0" }]}>
          <Ionicons name="restaurant-outline" size={28} color="#ef6c00" />
          <Text style={styles.cardTitle}>Nutrition</Text>
          <Text style={styles.cardText}>
            Foods and habits for a nourishing pregnancy.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("NutritionDetails")}>
            <Text style={styles.linkText}>See More →</Text>
          </TouchableOpacity>
        </View>

        {/* Exercise */}
        <View style={[styles.card, { backgroundColor: "#f3e5f5" }]}>
          <Ionicons name="walk-outline" size={28} color="#8e24aa" />
          <Text style={styles.cardTitle}>Exercise & Wellness</Text>
          <Text style={styles.cardText}>
            Gentle activities for energy and wellness.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ExerciseDetails")}>
            <Text style={styles.linkText}>See More →</Text>
          </TouchableOpacity>
        </View>

        {/* Mental Health */}
        <View style={[styles.card, { backgroundColor: "#e1f5fe" }]}>
          <Ionicons name="happy-outline" size={28} color="#0288d1" />
          <Text style={styles.cardTitle}>Mental Health</Text>
          <Text style={styles.cardText}>
            Stay emotionally balanced and supported.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("MentalHealthDetails")}>
            <Text style={styles.linkText}>See More →</Text>
          </TouchableOpacity>
        </View>

        {/* Warning Signs */}
        <View style={styles.cardWarning}>
          <Ionicons name="alert-circle-outline" size={34} color="#fff" />
          <Text style={styles.cardTitleLight}>⚠️ Warning Signs</Text>
          <Text style={styles.cardTextLight}>
            Seek medical help immediately if you notice{"\n"}
            - Heavy bleeding{"\n"}
            - Severe abdominal pain{"\n"}
            - Blurred vision or severe headache{"\n"}
            - Baby stops moving
          </Text>
        </View>

        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={30} color="#ffa000" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.tipTitle}>🌟 Daily Health Tip</Text>
            <Text style={styles.tipText}>
              Eat colorful meals: A plate full of fruits & vegetables gives both you and your baby essential vitamins!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
