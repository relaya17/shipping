import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LinkButton from '../components/LinkButton';
import { ROUTES } from '../routs/routes';

const CustomsInspection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main id="main-content">
      <Container className="my-5">
        <h1 className="mb-3">{t('pages.stubs.customs.title')}</h1>
        <p className="lead text-muted mb-4">{t('pages.stubs.customs.body')}</p>
        <LinkButton to={ROUTES.CONTACT} variant="primary">
          {t('cta.free_consult')}
        </LinkButton>
      </Container>
    </main>
  );
};

export default CustomsInspection;
