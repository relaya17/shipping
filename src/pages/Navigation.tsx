import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Globe } from 'react-bootstrap-icons';
import { setLanguage } from '../redux/languageSlice';
import { ROUTES } from '../routs/routes';
import ChatBot from '../components/AI/ChatBot';
import '../Navigation.css';

const NavigationBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
    void i18n.changeLanguage(lang);
  };

  const closeMobileMenu = () => {
    setIsNavOpen(false);
    // סגור גם את ה-collapse של Bootstrap
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse && navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show');
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-toggle')) {
        // Close all dropdowns
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('show');
          const menu = dropdown.nextElementSibling as HTMLElement;
          if (menu) {
            menu.classList.remove('show');
          }
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' },
    { code: 'ar', label: 'العربية' },
    { code: 'es', label: 'Español' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh', label: '中文' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'sv', label: 'Svenska' },
    { code: 'el', label: 'Ελληνικά' }
  ];

  const activeLang = (i18n.language || 'en').split('-')[0].toUpperCase();

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm">
      <div className="container-fluid px-3 px-lg-4">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to={ROUTES.HOME}>
          <img
            src="/images/favicon.ico"
            alt={t('nav.logo_alt')}
            className="logo1 me-2 me-lg-3"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span className="d-none d-sm-inline">VIP Shipping</span>
          <span className="d-inline d-sm-none">VIP</span>
        </Link>

        {/* Language + hamburger — always visible beside each other */}
        <div className="d-flex align-items-center gap-2 order-lg-3 ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-primary"
              id="languageDropdown"
              className="language-toggle d-flex align-items-center gap-1"
              aria-label={t('nav.language')}
              style={{
                borderRadius: '999px',
                padding: '0.35rem 0.7rem',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <Globe size={16} aria-hidden="true" />
              <span>{activeLang}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="language-menu shadow">
              {LANGUAGES.map((lang) => (
                <Dropdown.Item
                  key={lang.code}
                  active={(i18n.language || 'en').startsWith(lang.code)}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-controls="navbarNav"
            aria-expanded={isNavOpen ? 'true' : 'false'}
            aria-label={t('nav.toggle')}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ border: '1px solid #0d6efd' }}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className={`navbar-collapse order-lg-2 ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-lg-auto me-lg-2 align-items-lg-center">
            {/* Home */}
            <li className="nav-item">
              <Link to={ROUTES.HOME} className="nav-link btn btn-outline-primary btn-sm" onClick={closeMobileMenu}>
                {t('nav.home')}
              </Link>
            </li>

            {/* Moving Services */}
            <li className="nav-item dropdown">
              <NavDropdown title={t('nav.services')} id="moving-services-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.INTERSTATE_MOVING} onClick={closeMobileMenu}>
                  {t('services.interstate')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.WORLDWIDE_MOVING} onClick={closeMobileMenu}>
                  {t('services.worldwide')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.MOVING_SERVICES} onClick={closeMobileMenu}>
                  {t('services.moving_services')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.PACKING_SERVICE} onClick={closeMobileMenu}>
                  {t('services.packing')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.INTERNATIONAL_HOUSEHOLD_MOVERS} onClick={closeMobileMenu}>
                  {t('services.international')}
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* Specialty Moving */}
            <li className="nav-item dropdown">
              <NavDropdown title={t('nav.specialty')} id="special-moving-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.INTERNATIONAL_CAR_SHIPPING} onClick={closeMobileMenu}>
                  {t('nav.car_shipping')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.MOTORCYCLE_TO_EUROPE} onClick={closeMobileMenu}>
                  {t('nav.motorcycle_europe')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.INTERNATIONAL_PIANO_MOVERS} onClick={closeMobileMenu}>
                  {t('nav.piano_moving')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.OVERSEAS_ARTWORK_SHIPPING} onClick={closeMobileMenu}>
                  {t('nav.artwork_shipping')}
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* Insurance & Quotes */}
            <li className="nav-item dropdown">
              <NavDropdown title={t('nav.quote')} id="insurance-quotes-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.FREE_MOVING_QUOTE} onClick={closeMobileMenu}>
                  {t('cta.free_consult')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.COMPARING_QUOTES} onClick={closeMobileMenu}>
                  {t('cta.get_quote')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.MOVING_INSURANCE} onClick={closeMobileMenu}>
                  {t('services.insurance')}
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* Resources */}
            <li className="nav-item dropdown">
              <NavDropdown title={t('nav.resources')} id="resources-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.MOVING_TIPS} onClick={closeMobileMenu}>
                  {t('nav.moving_tips')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.PODCAST} onClick={closeMobileMenu}>
                  {t('nav.podcast')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.WHY_TRUST_VIP} onClick={closeMobileMenu}>
                  {t('nav.why_vip')}
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link to={ROUTES.ABOUT} className="nav-link btn btn-outline-info btn-sm" onClick={closeMobileMenu}>
                {t('nav.about')}
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link to={ROUTES.CONTACT} className="nav-link btn btn-outline-success btn-sm" onClick={closeMobileMenu}>
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Spacer for fixed navbar */}
    <div style={{ height: '70px', width: '100%' }} />

    <ChatBot />
    </>
  );
};

export default NavigationBar;
