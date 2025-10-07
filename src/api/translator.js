// src/js/translator.js (or your path)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// initialize i18n
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

// switch language
export const changeLanguage = async langCode => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, langCode);
    await i18n.changeLanguage(langCode);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// --- NEW: call HelpMum translation ---
/**
 * Translate dynamic text (English input) into targetLang using HelpMumHQ API
 * @param {string} text English text to translate
 * @param {string} targetLang 'yo' | 'ha' | 'ig'
 * @returns {Promise<string>} translated text or fallback to input
 */
export const helpMumTranslate = async (text, targetLang) => {
  if (!text) return text;
  try {
    const response = await fetch('https://your-api.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        target: targetLang,
      }),
    });
    const json = await response.json();
    if (json.translated) {
      return json.translated;
    } else {
      console.warn('HelpMum translation missing field', json);
      return text;
    }
  } catch (error) {
    console.warn('HelpMum translation error:', error);
    return text;
  }
};

export default i18n;
