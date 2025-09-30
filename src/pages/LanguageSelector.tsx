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
  };

  return (
    <div>
      <button onClick={() => changeLanguage('he')}>עברית</button>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
};

export default LanguageSelector;
