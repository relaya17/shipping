import React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/languageSlice';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'he', name: 'עברית', short: 'HE' },
  { code: 'ar', name: 'العربية', short: 'AR' },
  { code: 'es', name: 'Español', short: 'ES' },
  { code: 'ru', name: 'Русский', short: 'RU' },
  { code: 'zh', name: '中文', short: 'ZH' },
  { code: 'tr', name: 'Türkçe', short: 'TR' },
  { code: 'sv', name: 'Svenska', short: 'SV' },
  { code: 'el', name: 'Ελληνικά', short: 'EL' }
];

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
    void i18n.changeLanguage(lang);
  };

  const active = (i18n.language || 'en').split('-')[0];

  return (
    <div className="d-flex flex-wrap gap-1 align-items-center" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => changeLanguage(lang.code)}
          className={`btn btn-sm ${active === lang.code ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={{ padding: '0.25rem 0.45rem', fontSize: '0.75rem', minWidth: '2.25rem' }}
          title={lang.name}
          aria-label={`${t('nav.language')}: ${lang.name}`}
          aria-pressed={active === lang.code}
        >
          {lang.short}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
