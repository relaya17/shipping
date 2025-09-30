import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from '../locales/en.json';
import he from '../locales/he.json';
import es from '../locales/es.json';
import zh from '../locales/zh.json';
import it from '../locales/it.json';
import ru from '../locales/ru.json';

export const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' }
];

const resources = {
    en: { translation: en },
    he: { translation: he },
    es: { translation: es },
    zh: { translation: zh },
    it: { translation: it },
    ru: { translation: ru }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en',
        debug: false,

        interpolation: {
            escapeValue: false
        },

        react: {
            useSuspense: false
        }
    });

export default i18n;
