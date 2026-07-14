import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './locales/he/translation.json';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import ru from './locales/ru/translation.json';
import ar from './locales/ar/translation.json';
import zh from './locales/zh/translation.json';
import tr from './locales/tr/translation.json';
import sv from './locales/sv/translation.json';
import el from './locales/el/translation.json';

const RTL_LANGS = new Set(['he', 'ar']);

const resources = {
  en: { translation: en },
  he: { translation: he },
  ar: { translation: ar },
  es: { translation: es },
  ru: { translation: ru },
  zh: { translation: zh },
  tr: { translation: tr },
  sv: { translation: sv },
  el: { translation: el }
};

const STORAGE_KEY = 'vip-lang';
const SUPPORTED = new Set(Object.keys(resources));

function resolveInitialLanguage(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const code = saved.split('-')[0];
      if (SUPPORTED.has(code)) return code;
    }
  } catch {
    /* ignore */
  }
  return 'en';
}

function applyDocumentLanguage(lng: string) {
  const language = (lng || 'en').split('-')[0];
  document.documentElement.setAttribute('lang', language);
  document.documentElement.setAttribute('dir', RTL_LANGS.has(language) ? 'rtl' : 'ltr');
}

i18n.use(initReactI18next).init({
  resources,
  lng: resolveInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

applyDocumentLanguage(i18n.language || 'en');

i18n.on('languageChanged', (lng) => {
  const code = (lng || 'en').split('-')[0];
  applyDocumentLanguage(code);
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
});

export default i18n;
