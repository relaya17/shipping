// src/components/LanguageSelector.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    console.log(`Changing language to: ${lang}`);
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);

    // הכיוון נשמר אוטומטית ב-i18n.ts
  };

  const languages = [
    { code: 'he', name: 'HE', flag: '🇮🇱' },
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'ar', name: 'AR', flag: '🇸🇦' },
    { code: 'es', name: 'ES', flag: '🇪🇸' },
    { code: 'ru', name: 'RU', flag: '🇷🇺' },
    { code: 'zh', name: 'ZH', flag: '🇨🇳' }
  ];

  return (
    <div className="d-flex gap-1 align-items-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`btn btn-sm ${
            i18n.language === lang.code ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          style={{
            transition: 'all 0.2s',
            padding: '0.25rem 0.5rem',
            fontSize: '1.2rem',
            lineHeight: 1,
            minWidth: '45px'
          }}
          title={lang.name}
          aria-label={`החלף שפה ל-${lang.name}`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
