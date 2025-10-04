import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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

  // Load cached translations
  useEffect(() => {
    const loadCached = async () => {
      const cache = await AsyncStorage.getItem(`tips_${language}`);
      if (cache) setTranslatedTips(JSON.parse(cache));
      else setTranslatedTips(tipsData);
    };
    loadCached();
  }, [language]);

  const translateTips = async () => {
    try {
      setLoading(true);
      const translations = await Promise.all(
        tipsData.map(async (tip) => {
          const res = await axios.post("https://api.helpmumhq.org/translate", {
            text: tip.content,
            targetLang: language,
          });
          return { ...tip, content: res.data.translation };
        })
      );

      setTranslatedTips(translations);
      await AsyncStorage.setItem(`tips_${language}`, JSON.stringify(translations));
    } catch (err) {
      console.log("Translation error:", err);
      alert("Failed to translate. Showing default English tips.");
      setTranslatedTips(tipsData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Maternal Health Tips</Text>

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

      <TouchableOpacity onPress={translateTips} style={styles.translateBtn}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.translateText}>Translate Tips</Text>
        )}
      </TouchableOpacity>

      {translatedTips.map((tip) => (
        <View key={tip.id} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.content}>{tip.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
