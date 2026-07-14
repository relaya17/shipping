import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './locales/he/translation.json';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import ru from './locales/ru/translation.json';
import ar from './locales/ar/translation.json';
import zh from './locales/zh/translation.json';

const resources = {
  he: { translation: he },
  en: { translation: en },
  es: { translation: es },
  ru: { translation: ru },
  ar: { translation: ar },
  zh: { translation: zh },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// הגדרת כיוון ברירת המחדל ל-LTR לאנגלית
document.documentElement.setAttribute('dir', 'ltr');

// האזנה לשינוי שפה והגדרת כיוון בהתאם
i18n.on('languageChanged', (lng) => {
  if (lng === 'he' || lng === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
});

export default i18n;



