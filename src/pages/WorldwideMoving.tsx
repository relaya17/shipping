import React, { useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Alert } from 'react-bootstrap';
import {
  Globe,
  Airplane,
  BoxSeam,
  ShieldCheck,
  CheckCircle,
  FileText,
  People,
  Truck,
  Water
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

type Method = {
  method: string;
  time: string;
  cost: string;
  bestFor: string;
  description: string;
  features: string[];
};
type Destination = { continent: string; countries: string[]; time: string };
type Service = { title: string; description: string; included: string[] };
type Step = { title: string; description: string };

const WorldwideMoving: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('worldwide_moving');
    window.scrollTo(0, 0);
  }, []);

  const shippingMethods = useMemo(
    () => t('pages.worldwideMoving.shippingMethods', { returnObjects: true }) as Method[],
    [t, i18n.language]
  );
  const destinations = useMemo(
    () => t('pages.worldwideMoving.popularDestinations', { returnObjects: true }) as Destination[],
    [t, i18n.language]
  );
  const services = useMemo(
    () => t('pages.worldwideMoving.services', { returnObjects: true }) as Service[],
    [t, i18n.language]
  );
  const processSteps = useMemo(
    () => t('pages.worldwideMoving.processSteps', { returnObjects: true }) as Step[],
    [t, i18n.language]
  );
  const prohibited = useMemo(
    () => t('pages.worldwideMoving.prohibitedItems', { returnObjects: true }) as string[],
    [t, i18n.language]
  );

  const methodIcons = [
    <Water key="fcl" size={48} className="text-primary" />,
    <Water key="lcl" size={48} className="text-info" />,
    <Airplane key="air" size={48} className="text-warning" />
  ];
  const serviceIcons = [
    <BoxSeam key="pack" className="text-primary" />,
    <FileText key="customs" className="text-success" />,
    <Truck key="door" className="text-warning" />,
    <ShieldCheck key="ins" className="text-info" />
  ];

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <Globe size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">{t('pages.worldwideMoving.title')}</h1>
          <p className="lead text-muted mb-4">{t('pages.worldwideMoving.subtitle')}</p>
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="primary">
              {t('pages.worldwideMoving.ctaQuote')}
            </Button>
            <Button href="tel:+18005550199" variant="outline-primary">
              {t('pages.worldwideMoving.ctaCall')}
            </Button>
          </div>
        </Col>
      </Row>

      <Alert variant="warning" className="mb-5">
        <strong>{t('pages.worldwideMoving.alertTitle')}</strong>
        <div>{t('pages.worldwideMoving.alertBody')}</div>
      </Alert>

      <h2 className="h3 mb-4">{t('pages.worldwideMoving.methodsTitle')}</h2>
      <Row className="mb-5">
        {(Array.isArray(shippingMethods) ? shippingMethods : []).map((method, index) => (
          <Col md={4} key={method.method} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <div className="mb-3">{methodIcons[index]}</div>
                <h3 className="h5">{method.method}</h3>
                <Badge bg="light" text="dark" className="me-1">{method.time}</Badge>
                <Badge bg="success">{method.cost}</Badge>
                <p className="small text-muted mt-2 mb-1"><strong>{method.bestFor}</strong></p>
                <p className="small">{method.description}</p>
                <ListGroup variant="flush">
                  {(method.features || []).map((f) => (
                    <ListGroup.Item key={f} className="px-0 small">
                      <CheckCircle className="text-success me-2" size={14} />
                      {f}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="h3 mb-4">{t('pages.worldwideMoving.destinationsTitle')}</h2>
      <Row className="mb-5">
        {(Array.isArray(destinations) ? destinations : []).map((d) => (
          <Col md={4} key={d.continent} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h3 className="h6">{d.continent}</h3>
                <p className="small text-muted mb-1">{(d.countries || []).join(', ')}</p>
                <Badge bg="info">{d.time}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="h3 mb-4">{t('pages.worldwideMoving.servicesTitle')}</h2>
      <Row className="mb-5">
        {(Array.isArray(services) ? services : []).map((service, index) => (
          <Col md={6} key={service.title} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="mb-2">{serviceIcons[index]}</div>
                <h3 className="h5">{service.title}</h3>
                <p className="small text-muted">{service.description}</p>
                <ul className="small mb-0">
                  {(service.included || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="h3 mb-4">{t('pages.worldwideMoving.processTitle')}</h2>
      <ListGroup className="mb-5">
        {(Array.isArray(processSteps) ? processSteps : []).map((step, index) => (
          <ListGroup.Item key={step.title} className="d-flex align-items-start">
            <Badge bg="primary" className="me-3">{index + 1}</Badge>
            <div>
              <strong>{step.title}</strong>
              <div className="small text-muted">{step.description}</div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h2 className="h3 mb-3">{t('pages.worldwideMoving.prohibitedTitle')}</h2>
      <ListGroup className="mb-5">
        {(Array.isArray(prohibited) ? prohibited : []).map((item) => (
          <ListGroup.Item key={item}>{item}</ListGroup.Item>
        ))}
      </ListGroup>

      <Card className="bg-primary text-white border-0">
        <Card.Body className="text-center p-4">
          <People size={36} className="mb-2" />
          <h2 className="h4">{t('pages.worldwideMoving.finalCta')}</h2>
          <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="light" className="mt-2">
            {t('pages.worldwideMoving.ctaQuote')}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorldwideMoving;
