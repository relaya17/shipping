import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Error404Page: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main id="main-content" className="container-fluid">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center shadow">
              <Card.Body className="p-5">
                <h1 className="display-1 text-primary mb-3">404</h1>
                <h2 className="h4 mb-3">{t('errors.not_found_title')}</h2>
                <p className="text-muted mb-4">{t('errors.not_found_body')}</p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Button variant="primary" onClick={() => navigate('/')} aria-label={t('common.go_home')}>
                    {t('common.go_home')}
                  </Button>
                  <Button variant="outline-secondary" onClick={() => navigate(-1)} aria-label={t('common.go_back')}>
                    {t('common.go_back')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Error404Page;
