import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../routs/routes';
import LanguageSelector from '../components/LanguageSelector';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import '../components/UI/Navigation.css';

// Type-safe Link wrapper
const Link: React.ComponentType<{ to: string; className?: string; children?: React.ReactNode; onClick?: () => void }> = (props) => {
  return <RouterLink {...props} />;
};

interface NavLinkItem {
  to: string;
  label: string;
  className?: string;
}

const NavigationBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks: NavLinkItem[] = [
    { to: ROUTES.HOME, label: t('nav.home'), className: 'btn-outline-primary order-1' },
    { to: ROUTES.INTERSTATE_MOVING, label: 'Interstate Moving' },
    { to: ROUTES.MOVING_SERVICES, label: 'Moving Services' },
    { to: ROUTES.WORLDWIDE_MOVING, label: 'Worldwide Moving' },
    { to: ROUTES.FREE_MOVING_QUOTE, label: 'Free Moving Quote' },
    { to: ROUTES.MOVING_TIPS, label: 'Moving Tips' },
    { to: ROUTES.PODCAST, label: 'Podcast' },
    { to: ROUTES.CONTACT, label: t('nav.contact'), className: 'btn-outline-success' },
    { to: ROUTES.ABOUT, label: t('nav.about') },
  ];

  return (
    <div className="container navmenger border rounded-3 shadow-sm position-relative mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          {/* Left side - Toggle */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-controls="navbarNav"
            aria-label="פתח/סגור תפריט ניווט"
          >
            <span className="navbar-toggler-icon" aria-hidden="true"></span>
          </button>

          {/* Center - Logo */}
          <div className="mx-auto">
            <Link to={ROUTES.HOME} className="navbar-brand d-flex align-items-center">
              <img
                src="/images/favicon.ico"
                alt="VIP International Shipping Logo - שירותי הובלה בינלאומיים"
                className="logo1"
              />
              <span className="fw-bold ms-2 d-none d-md-inline text-primary">
                VIP Shipping
              </span>
            </Link>
          </div>

          {/* Right side - Notifications & Language */}
          <div className="d-flex align-items-center gap-2">
            <NotificationCenter />
            <LanguageSelector />
          </div>

          {/* Collapse menu */}
          <div
            className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
            id="navbarNav"
            role="navigation"
            aria-label="תפריט ניווט ראשי"
          >
            <div className="d-flex flex-column flex-lg-row w-100 justify-content-start gap-3">
              {navLinks.map(({ to, label, className }) => (
                <Link
                  key={to}
                  to={to}
                  className={`navbar-link btn w-100 w-lg-auto p-3 border-3 shadow-sm ${className || 'btn-outline-secondary'}`}
                  onClick={() => setIsNavOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
