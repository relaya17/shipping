import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LinkButton from '../components/LinkButton';
import { ROUTES } from '../routs/routes';

const InternationalMovingInsurance: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main id="main-content">
      <Container className="my-5">
        <h1 className="mb-3">{t('pages.stubs.intlInsurance.title')}</h1>
        <p className="lead text-muted mb-4">{t('pages.stubs.intlInsurance.body')}</p>
        <LinkButton to={ROUTES.MOVING_INSURANCE} variant="primary" className="me-2">
          {t('services.insurance')}
        </LinkButton>
        <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="outline-primary">
          {t('cta.get_quote')}
        </LinkButton>
      </Container>
    </main>
  );
};

export default InternationalMovingInsurance;
