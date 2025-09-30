// src/pages/Home.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SmartRecommendations from '../components/AI/SmartRecommendations';
import PricePrediction from '../components/AI/PricePrediction';
import LiveTracking from '../components/Tracking/LiveTracking';
import VolumeCalculator from '../components/AR/VolumeCalculator';
import '../Home.css';

const Home: React.FC = () => {
  return (
    <>
      {/* Skip link לנגישות */}
      <a href="#main-content" className="skip-link">
        עבור לתוכן הראשי
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
      <Container className="text-overlay" id="main-content">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center text-white bg-transparent border-0" role="main">
              <Card.Body>
                <h1>ברוכים הבאים ל-VIP International Shipping</h1>
                <p>שירותי הובלה בינלאומיים עם אמינות וטיפול אישי מקצועי.</p>
                <Button 
                  variant="light" 
                  aria-label="למד עוד על השירותים שלנו"
                  onClick={() => window.location.href = '/about'}
                >
                  למד עוד
                </Button>
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
