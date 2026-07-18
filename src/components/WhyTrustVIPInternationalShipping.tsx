import React, { useMemo } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type Section = { title: string; body: string };

const WhyTrustVIPInternationalShipping: React.FC = () => {
  const { t, i18n } = useTranslation();

  const sections = useMemo(() => {
    const items = t('pages.whyTrust.sections', { returnObjects: true });
    return Array.isArray(items) ? (items as Section[]) : [];
  }, [t, i18n.language]);

  return (
    <main id="main-content">
      <Container className="mt-5 mb-5">
        <h1 className="text-center mb-4">{t('pages.whyTrust.title')}</h1>
        <Card>
          <Card.Body>
            <Card.Title>{t('pages.whyTrust.title')}</Card.Title>
            <Card.Text>{t('pages.whyTrust.intro1')}</Card.Text>
            <Card.Text>{t('pages.whyTrust.intro2')}</Card.Text>
            <Card.Text>{t('pages.whyTrust.intro3')}</Card.Text>
            {sections.map((section) => (
              <React.Fragment key={section.title}>
                <Card.Subtitle className="mb-3 mt-4">{section.title}</Card.Subtitle>
                <Card.Text>{section.body}</Card.Text>
              </React.Fragment>
            ))}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default WhyTrustVIPInternationalShipping;
