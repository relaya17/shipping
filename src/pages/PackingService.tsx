import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import {
  Box,
  Shield,
  CheckCircle,
  Star,
  Clock,
  Tools
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

interface PackingServiceItem {
  title: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
}

interface PackingMaterial {
  name: string;
  description: string;
}

const PackingService: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('packing_service');
  }, []);

  const packingServices = t('pages.packing.services', { returnObjects: true }) as PackingServiceItem[];
  const packingMaterials = t('pages.packing.materials', { returnObjects: true }) as PackingMaterial[];
  const packingTips = t('pages.packing.tips', { returnObjects: true }) as string[];

  const serviceIcons = [
    <Box key="box" size={48} className="text-primary" />,
    <Shield key="shield" size={48} className="text-success" />,
    <Tools key="tools" size={48} className="text-info" />
  ];

  const materialIcons = ['📦', '🫧', '📰', '📏', '🧽', '🎗️', '🏷️', '👜'];

  return (
    <main id="main-content">
      <Container className="my-5">
        {/* Hero */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">
              <Box className="me-3 text-primary" />
              {t('pages.packing.title')}
            </h1>
            <p className="lead text-muted mb-4">
              {t('pages.packing.subtitle')}
            </p>
            <Badge bg="primary" className="me-2">{t('pages.packing.badge1')}</Badge>
            <Badge bg="success">{t('pages.packing.badge2')}</Badge>
          </Col>
        </Row>

        {/* Services */}
        <Row className="mb-5">
          {packingServices.map((service, index) => (
            <Col lg={4} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="mb-3">
                    {serviceIcons[index]}
                  </div>
                  <h4 className="mb-3">{service.title}</h4>
                  <p className="text-muted mb-3">{service.description}</p>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-center">
                      <h6 className="text-success">{service.price}</h6>
                      <small className="text-muted">{t('pages.packing.priceLabel')}</small>
                    </div>
                    <div className="text-center">
                      <h6 className="text-info">{service.duration}</h6>
                      <small className="text-muted">{t('pages.packing.durationLabel')}</small>
                    </div>
                  </div>

                  <h6 className="mb-3">{t('pages.packing.includesLabel')}</h6>
                  <ListGroup className="list-group-flush mb-3">
                    {service.includes.map((item, itemIndex) => (
                      <ListGroup.Item key={itemIndex} className="border-0 px-0 py-1">
                        <CheckCircle size={16} className="text-success me-2" />
                        <small>{item}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="primary" className="w-100">
                    {t('pages.packing.chooseService')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Materials */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h3 className="mb-0">
                  <Tools className="me-2" />
                  {t('pages.packing.materialsTitle')}
                </h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  {packingMaterials.map((material, index) => (
                    <Col md={6} lg={3} key={index} className="mb-3">
                      <div className="d-flex align-items-center p-3 border rounded">
                        <span className="me-3" style={{ fontSize: '24px' }}>{materialIcons[index]}</span>
                        <div>
                          <h6 className="mb-1">{material.name}</h6>
                          <small className="text-muted">{material.description}</small>
                        </div>
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
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header>
                <h4 className="mb-0">
                  <Clock className="me-2" />
                  Packing process
                </h4>
              </Card.Header>
              <Card.Body>
                <div className="timeline">
                  <div className="d-flex mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>1</div>
                    <div>
                      <h6>Initial survey</h6>
                      <small className="text-muted">Assess belongings and plan the packing</small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>2</div>
                    <div>
                      <h6>Prepare materials</h6>
                      <small className="text-muted">Bring all required packing supplies</small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>3</div>
                    <div>
                      <h6>Professional packing</h6>
                      <small className="text-muted">Room-by-room packing with labeling</small>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>4</div>
                    <div>
                      <h6>Inventory list</h6>
                      <small className="text-muted">Detailed documentation of every item</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header>
                <h4 className="mb-0">
                  <Star className="me-2" />
                  {t('pages.packing.tipsTitle')}
                </h4>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  {packingTips.map((tip, index) => (
                    <li key={index} className="mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      <small>{tip}</small>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        <Row>
          <Col className="text-center">
            <Card className="border-primary bg-light">
              <Card.Body className="p-4">
                <h4 className="mb-3">{t('pages.packing.ctaTitle')}</h4>
                <p className="mb-4">
                  {t('pages.packing.ctaBody')}
                </p>
                <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="primary" size="lg" className="me-3">
                  {t('cta.get_quote')}
                </Button>
                <Button as={Link as never} to={ROUTES.CONTACT} variant="outline-success" size="lg">
                  {t('cta.free_consult')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default PackingService;
