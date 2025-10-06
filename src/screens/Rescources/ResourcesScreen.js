import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ResourcesScreenStyle";

const tipsData = [
  {
    id: 1,
    title: "Eat Balanced Meals",
    content:
      "Pregnant women should eat a balanced diet rich in fruits, vegetables, and proteins.",
  },
  {
    id: 2,
    title: "Attend Antenatal Visits",
    content:
      "Regular antenatal visits help monitor the baby’s development and the mother’s health.",
  },
  {
    id: 3,
    title: "Stay Hydrated",
    content:
      "Drink plenty of water daily to stay hydrated and support healthy pregnancy.",
  },
];

export default function ResourcesScreen() {
  const [language, setLanguage] = useState("en");
  const [translatedTips, setTranslatedTips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cached translations from AsyncStorage
  useEffect(() => {
    const loadCachedTranslations = async () => {
      try {
        const cached = await AsyncStorage.getItem(`tips_${language}`);
        if (cached) {
          setTranslatedTips(JSON.parse(cached));
        } else {
          setTranslatedTips(tipsData);
        }
      } catch (error) {
        console.log("Cache load error:", error);
        setTranslatedTips(tipsData);
      }
    };
    loadCachedTranslations();
  }, [language]);

  const translateTips = async () => {
    try {
      setLoading(true);

      const translations = await Promise.all(
        tipsData.map(async (tip) => {
          const response = await fetch("https://api.helpmumhq.org/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: tip.content,
              targetLang: language,
            }),
          });

          if (!response.ok) throw new Error("Network response was not ok");

          const data = await response.json();
          return { ...tip, content: data.translation };
        })
      );

      setTranslatedTips(translations);
      await AsyncStorage.setItem(
        `tips_${language}`,
        JSON.stringify(translations)
      );
    } catch (error) {
      console.log("Translation error:", error);
      Alert.alert("Translation Failed", "Showing default English tips instead.");
      setTranslatedTips(tipsData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Maternal Health Tips</Text>

      {/* Language Selection */}
      <View style={styles.langRow}>
        {["en", "yo", "ha", "ig"].map((lang) => (
          <TouchableOpacity
            key={lang}
            onPress={() => setLanguage(lang)}
            style={[
              styles.langButton,
              language === lang && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.langText,
                language === lang && styles.activeText,
              ]}
            >
              {lang.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Translate Button */}
      <TouchableOpacity onPress={translateTips} style={styles.translateBtn}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.translateText}>Translate Tips</Text>
        )}
      </TouchableOpacity>

      {/* Tips Cards */}
      {translatedTips.map((tip) => (
        <View key={tip.id} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.content}>{tip.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
