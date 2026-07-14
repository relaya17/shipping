import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Globe } from 'react-bootstrap-icons';
import { ROUTES } from '../routs/routes';
import ChatBot from '../components/AI/ChatBot';
import '../Navigation.css';

const NavigationBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    console.log(`Changing language to: ${lang}`);
    i18n.changeLanguage(lang);

    // שינוי כיוון הדף לפי השפה
    if (lang === 'he' || lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
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

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm">
      <div className="container-fluid px-4">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to={ROUTES.HOME}>
          <img
            src="/public/images/favicon.ico"
            alt="VIP International Shipping Logo"
            className="logo1 me-3"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          VIP Shipping
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{
            border: '1px solid #0d6efd'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Home */}
            <li className="nav-item">
              <Link to={ROUTES.HOME} className="nav-link btn btn-outline-primary btn-sm" onClick={closeMobileMenu}>
                🏠 {t('nav.home')}
              </Link>
            </li>

            {/* Moving Services */}
            <li className="nav-item dropdown">
              <NavDropdown title={`🚛 ${t('nav.services')}`} id="moving-services-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.INTERSTATE_MOVING} onClick={closeMobileMenu}>
                  🚚 {t('services.interstate')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.WORLDWIDE_MOVING} onClick={closeMobileMenu}>
                  🌍 {t('services.worldwide')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.MOVING_SERVICES} onClick={closeMobileMenu}>
                  📦 {t('services.moving_services')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.PACKING_SERVICE} onClick={closeMobileMenu}>
                  📦 {t('services.packing')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.INTERNATIONAL_HOUSEHOLD_MOVERS} onClick={closeMobileMenu}>
                  🏠 {t('services.international')}
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* Specialty Moving */}
            <li className="nav-item dropdown">
              <NavDropdown title="🎯 Specialty" id="special-moving-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.INTERNATIONAL_CAR_SHIPPING} onClick={closeMobileMenu}>
                  🚗 Car Shipping
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.MOTORCYCLE_TO_EUROPE} onClick={closeMobileMenu}>
                  🏍️ Motorcycle to Europe
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.INTERNATIONAL_PIANO_MOVERS} onClick={closeMobileMenu}>
                  🎹 Piano Moving
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.OVERSEAS_ARTWORK_SHIPPING} onClick={closeMobileMenu}>
                  🖼️ Artwork Shipping
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* Insurance & Quotes */}
            <li className="nav-item dropdown">
              <NavDropdown title={`💼 ${t('nav.quote')}`} id="insurance-quotes-dropdown" className="nav-dropdown">
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
              <NavDropdown title="📚 Resources" id="resources-dropdown" className="nav-dropdown">
                <NavDropdown.Item as={Link} to={ROUTES.MOVING_TIPS} onClick={closeMobileMenu}>
                  💡 Moving Tips
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.PODCAST} onClick={closeMobileMenu}>
                  🎙️ Podcast
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={ROUTES.WHY_TRUST_VIP} onClick={closeMobileMenu}>
                  ⭐ Why Choose VIP
                </NavDropdown.Item>
              </NavDropdown>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link to={ROUTES.ABOUT} className="nav-link btn btn-outline-info btn-sm" onClick={closeMobileMenu}>
                ℹ️ {t('nav.about')}
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link to={ROUTES.CONTACT} className="nav-link btn btn-outline-success btn-sm" onClick={closeMobileMenu}>
                📞 {t('nav.contact')}
              </Link>
            </li>

            {/* Language Selector */}
            <li className="nav-item mx-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-light"
                  id="languageDropdown"
                  className="language-toggle"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    color: 'white'
                  }}
                >
                  <Globe size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="language-menu">
                  <Dropdown.Item onClick={() => changeLanguage('he')}>
                    <span className="flag">🇮🇱</span>
                    <span className="ms-2">עברית</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('en')}>
                    <span className="flag">🇺🇸</span>
                    <span className="ms-2">English</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('es')}>
                    <span className="flag">🇪🇸</span>
                    <span className="ms-2">Español</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ru')}>
                    <span className="flag">🇷🇺</span>
                    <span className="ms-2">Русский</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ar')}>
                    <span className="flag">🇸🇦</span>
                    <span className="ms-2">العربية</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('zh')}>
                    <span className="flag">🇨🇳</span>
                    <span className="ms-2">中文</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Spacer for fixed navbar */}
    <div style={{ height: '70px', width: '100%' }}></div>

    <ChatBot />
    </>
  );
};

export default NavigationBar;
