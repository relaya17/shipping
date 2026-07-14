import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FileText } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';

type TermSection = { title: string; paragraphs: string[] };

const TermsOfService: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('terms_of_service');
    window.scrollTo(0, 0);
  }, []);

  const sections = t('pages.terms.sections', { returnObjects: true }) as TermSection[];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="text-center mb-4">
            <FileText size={48} className="text-primary mb-3" />
            <h1 className="display-5 fw-bold">{t('pages.terms.title')}</h1>
            <p className="text-muted">
              {t('pages.terms.lastUpdated')}:{' '}
              {new Date().toLocaleDateString(i18n.language || 'en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <Alert variant="info" className="mb-4">
            {t('pages.terms.intro')}
          </Alert>

          {(Array.isArray(sections) ? sections : []).map((section) => (
            <Card key={section.title} className="shadow-sm mb-3">
              <Card.Body className="p-4">
                <h2 className="h5 mb-3">{section.title}</h2>
                {(section.paragraphs || []).map((p) => (
                  <p key={p} className="mb-2 text-muted">
                    {p}
                  </p>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;
