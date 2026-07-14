import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LinkButton from '../components/LinkButton';
import { ROUTES } from '../routs/routes';

const ShippingMotorcycleToEurope: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main id="main-content">
      <Container className="my-5">
        <h1 className="mb-3">{t('pages.stubs.motorcycle.title')}</h1>
        <p className="lead text-muted mb-4">{t('pages.stubs.motorcycle.body')}</p>
        <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="primary">
          {t('cta.get_quote')}
        </LinkButton>
      </Container>
    </main>
  );
};

export default ShippingMotorcycleToEurope;
