import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Globe } from 'react-bootstrap-icons';
import IconWrapper from './UI/IconWrapper';
import { languages } from '../i18n/i18n';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    const selectedLang = languages.find(lang => lang.code === languageCode);
    if (selectedLang) {
      // Update document direction
      document.documentElement.dir = selectedLang.dir;
      document.documentElement.lang = languageCode;
      
      // Save preference
      localStorage.setItem('preferredLanguage', languageCode);
    }
  };

  return (
    <Dropdown align="end" className="language-selector">
      <Dropdown.Toggle
        variant="outline-primary"
        id="language-dropdown"
        className="d-flex align-items-center gap-2 border-0 p-2 language-selector-toggle"
      >
        <IconWrapper icon={Globe} size={16} />
        <span className="d-none d-md-inline">{currentLanguage.flag}</span>
        <span className="d-none d-lg-inline">{currentLanguage.nativeName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-lg border-0 language-selector-menu">
        {languages.map((language) => (
          <Dropdown.Item
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`d-flex align-items-center gap-3 py-2 ${
              i18n.language === language.code ? 'active' : ''
            }`}
          >
            <span className="language-flag">{language.flag}</span>
            <div>
              <div className="fw-medium">{language.nativeName}</div>
              <small className="text-muted">{language.name}</small>
            </div>
            {i18n.language === language.code && (
              <span className="ms-auto text-primary">✓</span>
            )}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
