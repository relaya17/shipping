import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routs/routes';

const CONSENT_KEY = 'vip_cookie_consent';

/**
 * Lightweight cookie/analytics consent banner.
 *
 * The Privacy Policy page displays "GDPR-aware" / "CCPA-aware" badges — this
 * banner is what actually backs that claim up: analytics events
 * (src/utils/analytics.ts) are not recorded or sent to the server until the
 * visitor accepts. "Necessary only" keeps the site functional (auth,
 * language, cart) without any tracking.
 */
const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const choose = (value: 'accepted' | 'necessary-only') => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="position-fixed bottom-0 start-0 end-0 bg-dark text-light p-3 shadow-lg"
      style={{ zIndex: 2000 }}
    >
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <small className="mb-0">
          We use necessary cookies to run this site, and optional analytics cookies to understand
          how it's used. Read our{' '}
          <Link to={ROUTES.PRIVACY_POLICY} className="text-info">
            Privacy Policy
          </Link>
          .
        </small>
        <div className="d-flex gap-2 flex-shrink-0">
          <Button size="sm" variant="outline-light" onClick={() => choose('necessary-only')}>
            Necessary only
          </Button>
          <Button size="sm" variant="light" onClick={() => choose('accepted')}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
