// src/api/translator.js (or your actual path)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local fallback translations (used if API fails)
import en from '../translations/en.json';
import yo from '../translations/yoruba.json';
import ha from '../translations/hausa.json';
import ig from '../translations/igbo.json';

const resources = {
  en: { translation: en },
  yo: { translation: yo },
  ha: { translation: ha },
  ig: { translation: ig },
};

const LANGUAGE_KEY = 'appLanguage';

// ✅ Replace with your HelpMumHQ Translator API endpoint
const HELPMUM_TRANSLATOR_API = 'https://api.helpmumhq.org/translate';

// 🔹 Initialize i18n
const initI18n = async () => {
  let lang = 'en';
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (stored) lang = stored;
  } catch (err) {
    console.warn('Could not load language from storage', err);
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: lang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};
initI18n();

// 🔹 Function to switch language globally
export const changeLanguage = async langCode => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, langCode);
    await i18n.changeLanguage(langCode);
    console.log(`✅ Language switched to ${langCode}`);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// 🔹 Automatically translate text using HelpMumHQ AI API
export const helpMumTranslate = async (text, targetLang) => {
  if (!text) return text;
  try {
    const response = await fetch(HELPMUM_TRANSLATOR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include your key if your API uses one:
        // 'Authorization': `Bearer ${YOUR_API_KEY}`,
      },
      body: JSON.stringify({ text, targetLang }),
    });

    if (!response.ok) {
      console.warn('HelpMumHQ translation failed:', response.status);
      return text;
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.warn('HelpMumHQ API error:', error);
    return text;
  }
};

export default i18n;
