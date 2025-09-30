import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { 
  Box, 
  Truck, 
  Globe, 
  Shield, 
  Clock, 
  Star,
  CheckCircle,
  Award,
  Tools
} from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const MovingServices: React.FC = () => {
  useEffect(() => {
    trackPageView('moving_services');
  }, []);

  const mainServices = [
    {
      icon: <Box size={48} className="text-primary" />,
      title: 'שירותי אריזה מקצועיים',
      description: 'אריזה מקצועית עם חומרים איכותיים ומתקדמים',
      features: ['חומרי אריזה מקצועיים', 'אריזת פריטים שבירים', 'תיוג מפורט', 'ביטוח כלול'],
      price: 'מ-$200',
      popular: false
    },
    {
      icon: <Truck size={48} className="text-success" />,
      title: 'הובלה יבשתית',
      description: 'הובלה יבשתית מהירה ובטוחה לכל יעד',
      features: ['משאיות מאובזרות', 'מעקב GPS', 'ביטוח מלא', 'צוות מקצועי'],
      price: 'מ-$500',
      popular: true
    },
    {
      icon: <Globe size={48} className="text-info" />,
      title: 'הובלה בינלאומית',
      description: 'הובלה לכל העולם עם שותפים אמינים',
      features: ['כל יבשות העולם', 'טיפול במכס', 'מעקב בזמן אמת', 'ביטוח בינלאומי'],
      price: 'מ-$1,200',
      popular: true
    },
    {
      icon: <Shield size={48} className="text-warning" />,
      title: 'ביטוח ואבטחה',
      description: 'ביטוח מקיף וטיפול מאובטח',
      features: ['ביטוח מלא', 'מתקנים מאובטחים', 'מעקב 24/7', 'פיצוי מהיר'],
      price: '3% מהערך',
      popular: false
    },
    {
      icon: <Tools size={48} className="text-danger" />,
      title: 'שירותי התקנה',
      description: 'פירוק והתקנה של ריהוט ומכשירים',
      features: ['פירוק מקצועי', 'התקנה ביעד', 'כלי עבודה מקצועיים', 'אחריות על עבודה'],
      price: 'מ-$150',
      popular: false
    },
    {
      icon: <Clock size={48} className="text-dark" />,
      title: 'אחסון זמני',
      description: 'פתרונות אחסון גמישים ובטוחים',
      features: ['מתקנים מאובטחים', 'בקרת אקלים', 'גישה 24/7', 'תעריפים גמישים'],
      price: 'מ-$50/חודש',
      popular: false
    }
  ];

  const additionalServices = [
    'טיפול בניירות מכס',
    'ביטוח פרימיום',
    'איסוף ממקומות מרוחקים',
    'הובלת חפצי יוקרה',
    'שירותי ייעוץ לוגיסטי',
    'אחסון ארוך טווח',
    'שירותי ניקיון לאחר הובלה',
    'הובלת חיות מחמד'
  ];

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">השירותים שלנו</h1>
          <p className="lead text-muted mb-4">
            מגוון רחב של שירותי הובלה מקצועיים המותאמים לכל צורך
          </p>
          <Badge bg="primary" className="me-2">מעלה מ-20 שירותים</Badge>
          <Badge bg="success">כיסוי עולמי</Badge>
        </Col>
      </Row>

      {/* Main Services */}
      <Row className="mb-5">
        {mainServices.map((service, index) => (
          <Col lg={4} md={6} key={index} className="mb-4">
            <Card className={`h-100 border-0 shadow-sm ${service.popular ? 'border-primary' : ''}`}>
              {service.popular && (
                <div className="text-center">
                  <Badge bg="primary" className="position-absolute top-0 start-50 translate-middle px-3">
                    פופולרי
                  </Badge>
                </div>
              )}
              
              <Card.Body className="p-4 text-center">
                <div className="mb-3">
                  {service.icon}
                </div>
                <h5 className="mb-3">{service.title}</h5>
                <p className="text-muted mb-3">{service.description}</p>
                
                <div className="mb-3">
                  <h6 className="text-primary">{service.price}</h6>
                </div>

                <ListGroup className="list-group-flush mb-3">
                  {service.features.map((feature, featureIndex) => (
                    <ListGroup.Item key={featureIndex} className="border-0 px-0 py-1">
                      <CheckCircle size={16} className="text-success me-2" />
                      <small>{feature}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <Button 
                  variant={service.popular ? "primary" : "outline-primary"} 
                  className="w-100"
                  aria-label={`למד עוד על ${service.title}`}
                >
                  למד עוד
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Services */}
      <Row className="mb-5">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">שירותים נוספים</h3>
              <Row>
                {additionalServices.map((service, index) => (
                  <Col md={6} lg={3} key={index} className="mb-3">
                    <div className="d-flex align-items-center">
                      <Star size={16} className="text-warning me-2" />
                      <span>{service}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Process */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-5">תהליך השירות שלנו</h2>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="text-center mb-4">
          <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
            <span className="fw-bold">1</span>
          </div>
          <h6>תכנון ראשוני</h6>
          <p className="text-muted small">סקר צרכים והכנת תוכנית מותאמת אישית</p>
        </Col>
        <Col md={3} className="text-center mb-4">
          <div className="bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
            <span className="fw-bold">2</span>
          </div>
          <h6>אריזה ואיסוף</h6>
          <p className="text-muted small">אריזה מקצועית ואיסוף מהמקור</p>
        </Col>
        <Col md={3} className="text-center mb-4">
          <div className="bg-info text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
            <span className="fw-bold">3</span>
          </div>
          <h6>הובלה ומעקב</h6>
          <p className="text-muted small">הובלה בטוחה עם מעקב בזמן אמת</p>
        </Col>
        <Col md={3} className="text-center mb-4">
          <div className="bg-warning text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
            <span className="fw-bold">4</span>
          </div>
          <h6>משלוח ופריקה</h6>
          <p className="text-muted small">משלוח ליעד ופריקה מקצועית</p>
        </Col>
      </Row>

      {/* CTA */}
      <Row>
        <Col className="text-center">
          <Card className="border-success">
            <Card.Body className="p-4">
              <h4 className="mb-3">מעוניינים בשירותים שלנו?</h4>
              <p className="mb-4">
                קבלו ייעוץ חינם ממומחי ההובלה שלנו ותגלו איך אנחנו יכולים לעזור לכם
              </p>
              <Button variant="success" size="lg" className="me-3">
                📞 ייעוץ חינם
              </Button>
              <Button variant="outline-primary" size="lg">
                💬 צ'אט עם נציג
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovingServices;
