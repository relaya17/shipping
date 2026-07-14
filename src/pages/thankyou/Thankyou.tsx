import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CheckCircle, Download, House } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../../utils/analytics';

const Thankyou: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('thank_you');
  }, []);

  const handleDownloadQuote = () => {
    const orderDetails = localStorage.getItem('orderDetails');
    if (orderDetails) {
      const blob = new Blob([orderDetails], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quote-details.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow-lg">
            <Card.Body className="p-5">
              <div className="mb-4">
                <CheckCircle size={80} className="text-success mb-3" aria-hidden="true" />
              </div>

              <h1 className="h2 text-success mb-3">{t('thankyou.title')}</h1>
              <h2 className="h5 mb-4">{t('thankyou.subtitle')}</h2>

              <div className="alert alert-success mb-4" role="status">
                <strong>{t('thankyou.whats_next')}</strong>
                <ul className="list-unstyled mt-2 mb-0">
                  <li>{t('thankyou.step1')}</li>
                  <li>{t('thankyou.step2')}</li>
                  <li>{t('thankyou.step3')}</li>
                </ul>
              </div>

              <p className="text-muted mb-4">{t('thankyou.appreciation')}</p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button variant="primary" onClick={() => navigate('/')} aria-label={t('common.go_home')}>
                  <House className="me-2" aria-hidden="true" />
                  {t('common.go_home')}
                </Button>
                <Button variant="outline-success" onClick={handleDownloadQuote} aria-label={t('thankyou.download')}>
                  <Download className="me-2" aria-hidden="true" />
                  {t('thankyou.download')}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Thankyou;
