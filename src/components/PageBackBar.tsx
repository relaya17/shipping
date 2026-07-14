import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../routs/routes';

/**
 * Clear back control under the nav on every page except home.
 * Uses browser history when available; otherwise returns home.
 */
const PageBackBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === ROUTES.HOME) {
    return null;
  }

  const isRtl = i18n.dir() === 'rtl';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(ROUTES.HOME);
  };

  return (
    <div className="border-bottom bg-light">
      <Container className="py-2">
        <Button
          variant="link"
          className="text-decoration-none text-dark fw-semibold px-0 d-inline-flex align-items-center gap-2"
          onClick={handleBack}
          aria-label={t('common.go_back')}
        >
          <ArrowIcon size={20} aria-hidden="true" />
          <span>{t('common.go_back')}</span>
        </Button>
      </Container>
    </div>
  );
};

export default PageBackBar;
