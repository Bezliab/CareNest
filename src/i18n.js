// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fallback translations (English only for safety)
import en from '../translations/en.json';

// HelpMumHQ Translator API base URL
const HELPMUM_API_URL = 'https://helpmumhq.ai/api/translate';

const resources = {
  en: { translation: en },
};

// 🔹 Load stored language
const getStoredLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem('appLanguage');
    return lang || 'en';
  } catch (err) {
    console.log('Error getting stored language:', err);
    return 'en';
  }
};

// 🔹 Fetch dynamic translation from HelpMumHQ
const fetchRemoteTranslation = async lang => {
  try {
    const response = await fetch(`${HELPMUM_API_URL}?lang=${lang}`);
    if (!response.ok) throw new Error('Failed to fetch translation');
    const data = await response.json();
    return data.translations || {};
  } catch (error) {
    console.log('Error fetching remote translation:', error);
    return {};
  }
};

const initI18n = async () => {
  const lang = await getStoredLanguage();

  // Fetch translation dynamically
  const remoteTranslations = await fetchRemoteTranslation(lang);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      ...resources,
      [lang]: { translation: { ...remoteTranslations } },
    },
    lng: lang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};

initI18n();

// 🔹 Allow changing language dynamically
export const changeLanguage = async langCode => {
  try {
    await AsyncStorage.setItem('appLanguage', langCode);
    const remoteTranslations = await fetchRemoteTranslation(langCode);

    i18n.addResources(langCode, 'translation', remoteTranslations);
    await i18n.changeLanguage(langCode);
  } catch (err) {
    console.log('Error changing language:', err);
  }
};

export default i18n;
