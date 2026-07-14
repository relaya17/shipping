// src/pages/Home.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SmartRecommendations from '../components/AI/SmartRecommendations';
import PricePrediction from '../components/AI/PricePrediction';
import LiveTracking from '../components/Tracking/LiveTracking';
import VolumeCalculator from '../components/AR/VolumeCalculator';
import '../Home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Skip link לנגישות */}
      <a href="#main-content" className="skip-link">
        {t('common.back')}
      </a>
      
      <div className="image-background" role="banner" aria-label="תמונת רקע של שירותי הובלה בינלאומיים">
     {/* <video autoPlay loop muted>
        <source
          src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_VIDEO.mp4"
          type="video/mp4"
          onError={(e) => {
            const videoElement = e.currentTarget.parentElement as HTMLVideoElement;
            videoElement.src = process.env.PUBLIC_URL + '/videos/local-video.mp4';
            videoElement.play();
          }}
        />
        Your browser does not support the video tag.
      </video> */}
      <Container className="text-overlay" id="main-content" fluid>
        <Row className="justify-content-center align-items-center h-100 m-0">
          <Col xs={12} md={10} lg={8} xl={7} className="d-flex justify-content-center">
            <Card className="text-center text-white bg-transparent border-0 w-100" role="main" style={{ maxWidth: '600px' }}>
              <Card.Body>
                <h1>🌍 VIP International Shipping</h1>
                <p className="lead fw-bold">{t('hero.title')}</p>
                <p className="mb-3">{t('hero.subtitle')}</p>
                <div className="d-flex gap-2 justify-content-center flex-wrap mt-2">
                  <Button
                    variant="light"
                    aria-label={t('cta.get_quote')}
                    onClick={() => window.location.href = '/free-moving-quote'}
                  >
                    💼 {t('cta.free_consult')}
                  </Button>
                  <Button
                    variant="outline-light"
                    aria-label={t('cta.get_quote')}
                    onClick={() => window.location.href = '/about'}
                  >
                    📖 {t('hero.cta_secondary')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      </div>
      
      {/* תכונות AI מתקדמות */}
      <Container className="mt-5">
        <Row>
          <Col lg={8} className="mb-4">
            <SmartRecommendations />
          </Col>
          <Col lg={4} className="mb-4">
            <LiveTracking />
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col lg={6} className="mb-4">
            <PricePrediction />
          </Col>
          <Col lg={6} className="mb-4">
            <VolumeCalculator />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
