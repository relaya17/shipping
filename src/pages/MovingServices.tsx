import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import {
  Box,
  Truck,
  Globe,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Tools
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

interface MovingServiceItem {
  title: string;
  description: string;
  features: string[];
  price: string;
}

const MovingServices: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('moving_services');
  }, []);

  const mainServices = t('pages.movingServices.services', { returnObjects: true }) as MovingServiceItem[];
  const additionalServices = t('pages.movingServices.additional', { returnObjects: true }) as string[];

  const serviceIcons = [
    <Box key="box" size={48} className="text-primary" />,
    <Truck key="truck" size={48} className="text-success" />,
    <Globe key="globe" size={48} className="text-info" />,
    <Shield key="shield" size={48} className="text-warning" />,
    <Tools key="tools" size={48} className="text-danger" />,
    <Clock key="clock" size={48} className="text-dark" />
  ];

  const popularIndexes = new Set([1, 2]);

  return (
    <main id="main-content">
      <Container className="my-5">
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">{t('pages.movingServices.title')}</h1>
            <p className="lead text-muted mb-4">
              {t('pages.movingServices.subtitle')}
            </p>
            <Badge bg="primary" className="me-2">{t('pages.movingServices.badge1')}</Badge>
            <Badge bg="success">{t('pages.movingServices.badge2')}</Badge>
          </Col>
        </Row>

        {/* Main Services */}
        <Row className="mb-5">
          {mainServices.map((service, index) => {
            const popular = popularIndexes.has(index);
            return (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Card className={`h-100 border-0 shadow-sm ${popular ? 'border-primary' : ''}`}>
                  {popular && (
                    <div className="text-center">
                      <Badge bg="primary" className="position-absolute top-0 start-50 translate-middle px-3">
                        {t('pages.movingServices.popular')}
                      </Badge>
                    </div>
                  )}

                  <Card.Body className="p-4 text-center">
                    <div className="mb-3">
                      {serviceIcons[index]}
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

                    <LinkButton
                      to={ROUTES.FREE_MOVING_QUOTE}
                      variant={popular ? 'primary' : 'outline-primary'}
                      className="w-100"
                      aria-label={`${t('common.view')}: ${service.title}`}
                    >
                      {t('common.view')}
                    </LinkButton>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Additional Services */}
        <Row className="mb-5">
          <Col>
            <Card className="bg-light border-0">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4">{t('pages.movingServices.additionalTitle')}</h3>
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
            <h2 className="text-center mb-5">How our service works</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="text-center mb-4">
            <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <span className="fw-bold">1</span>
            </div>
            <h6>Initial planning</h6>
            <p className="text-muted small">Needs assessment and a personalized plan</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <span className="fw-bold">2</span>
            </div>
            <h6>Packing & pickup</h6>
            <p className="text-muted small">Professional packing and pickup from origin</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="bg-info text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <span className="fw-bold">3</span>
            </div>
            <h6>Transport & tracking</h6>
            <p className="text-muted small">Secure transport with real-time tracking</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="bg-warning text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <span className="fw-bold">4</span>
            </div>
            <h6>Delivery & unloading</h6>
            <p className="text-muted small">Destination delivery and professional unloading</p>
          </Col>
        </Row>

        {/* CTA */}
        <Row>
          <Col className="text-center">
            <Card className="border-success">
              <Card.Body className="p-4">
                <h4 className="mb-3">{t('pages.movingServices.ctaTitle')}</h4>
                <p className="mb-4">
                  Get a free consultation from our moving experts and learn how we can help
                </p>
                <LinkButton to={ROUTES.CONTACT} variant="success" size="lg" className="me-3">
                  {t('cta.free_consult')}
                </LinkButton>
                <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="outline-primary" size="lg">
                  {t('cta.get_quote')}
                </LinkButton>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MovingServices;
