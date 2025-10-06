// /src/services/translatorService.js
import axios from 'axios';

export const translateText = async (text, targetLang) => {
  try {
    const res = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text',
    });
    return res.data.translatedText;
  } catch (err) {
    console.error('Translation error:', err.message);
    return text; // fallback
  }
};
