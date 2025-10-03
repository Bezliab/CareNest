// screens/FaqScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./FaqScreenStyle";

const faqs = [
  {
    question: "What is maternal healthcare?",
    answer:
      "Maternal healthcare involves the health services provided to women during pregnancy, childbirth, and postnatal care to ensure the best outcomes for mother and baby.",
  },
  {
    question: "How often should I visit the hospital during pregnancy?",
    answer:
      "It is recommended to have at least 4 antenatal visits, but more regular visits are encouraged depending on your health and your doctor’s advice.",
  },
  {
    question: "What foods should I avoid during pregnancy?",
    answer:
      "Avoid unpasteurized milk, raw or undercooked meat, excessive caffeine, and alcohol. Focus on a balanced diet rich in fruits, vegetables, and proteins.",
  },
  {
    question: "Can I exercise while pregnant?",
    answer:
      "Yes, moderate exercise like walking, swimming, or yoga is safe. However, consult your healthcare provider before starting any new routine.",
  },
];

export default function FaqScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleExpand = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>❓ Frequently Asked Questions</Text>

      {faqs.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity
            style={styles.questionRow}
            onPress={() => toggleExpand(index)}
          >
            <Text style={styles.questionText}>{item.question}</Text>
            <Icon
              name={activeIndex === index ? "chevron-up" : "chevron-down"}
              size={20}
              color="#1976d2"
            />
          </TouchableOpacity>

          {activeIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
