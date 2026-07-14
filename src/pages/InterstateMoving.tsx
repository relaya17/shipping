import React, { useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Alert } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import {
  Truck,
  ShieldCheck,
  Clock,
  CurrencyDollar,
  BoxSeam,
  Calendar,
  CheckCircle,
  GeoAlt,
  Star
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

type Service = { title: string; description: string; features: string[] };
type Route = { from: string; to: string; duration: string; distance: string };
type Tip = { title: string; tip: string };
type Factor = { factor: string; impact: string; description: string };

const InterstateMoving: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('interstate_moving');
    window.scrollTo(0, 0);
  }, []);

  const services = useMemo(
    () => t('pages.interstateMoving.services', { returnObjects: true }) as Service[],
    [t, i18n.language]
  );
  const routes = useMemo(
    () => t('pages.interstateMoving.popularRoutes', { returnObjects: true }) as Route[],
    [t, i18n.language]
  );
  const tips = useMemo(
    () => t('pages.interstateMoving.movingTips', { returnObjects: true }) as Tip[],
    [t, i18n.language]
  );
  const factors = useMemo(
    () => t('pages.interstateMoving.pricingFactors', { returnObjects: true }) as Factor[],
    [t, i18n.language]
  );

  const serviceIcons = [
    <Truck key="full" size={40} className="text-primary" />,
    <BoxSeam key="shared" size={40} className="text-success" />,
    <Clock key="express" size={40} className="text-warning" />,
    <ShieldCheck key="glove" size={40} className="text-info" />
  ];
  const tipIcons = [
    <Calendar key="book" className="text-primary" />,
    <BoxSeam key="declutter" className="text-success" />,
    <CurrencyDollar key="quotes" className="text-warning" />,
    <CheckCircle key="reviews" className="text-info" />
  ];

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <Truck size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">{t('pages.interstateMoving.title')}</h1>
          <p className="lead text-muted mb-4">{t('pages.interstateMoving.subtitle')}</p>
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="primary">
              {t('pages.interstateMoving.ctaQuote')}
            </LinkButton>
            <Button href="tel:+18005550199" variant="outline-primary">
              {t('pages.interstateMoving.ctaCall')}
            </Button>
          </div>
        </Col>
      </Row>

      <Alert variant="info" className="mb-5">
        <strong>{t('pages.interstateMoving.promoTitle')}</strong>
        <div>{t('pages.interstateMoving.promoBody')}</div>
      </Alert>

      <h2 className="h3 mb-4">{t('pages.interstateMoving.servicesTitle')}</h2>
      <Row className="mb-5">
        {(Array.isArray(services) ? services : []).map((service, index) => (
          <Col md={6} key={service.title} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <div className="mb-3">{serviceIcons[index]}</div>
                <h3 className="h5">{service.title}</h3>
                <p className="text-muted small">{service.description}</p>
                <p className="small fw-bold mb-1">{t('pages.interstateMoving.includes')}</p>
                <ul className="small mb-0">
                  {(service.features || []).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="h3 mb-4">{t('pages.interstateMoving.routesTitle')}</h2>
      <Row className="mb-5">
        {(Array.isArray(routes) ? routes : []).map((route) => (
          <Col md={4} key={`${route.from}-${route.to}`} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <GeoAlt className="text-primary mb-2" />
                <div className="fw-bold">{route.from} → {route.to}</div>
                <Badge bg="light" text="dark" className="me-1">{route.duration}</Badge>
                <Badge bg="secondary">{route.distance}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="h3 mb-4">{t('pages.interstateMoving.pricingTitle')}</h2>
      <ListGroup className="mb-5">
        {(Array.isArray(factors) ? factors : []).map((factor) => (
          <ListGroup.Item key={factor.factor}>
            <strong>{factor.factor}</strong> — {factor.impact}
            <div className="small text-muted">{factor.description}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h2 className="h3 mb-4">{t('pages.interstateMoving.tipsTitle')}</h2>
      <Row className="mb-5">
        {(Array.isArray(tips) ? tips : []).map((tip, index) => (
          <Col md={6} key={tip.title} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="mb-2">{tipIcons[index]}</div>
                <h3 className="h6">{tip.title}</h3>
                <p className="small text-muted mb-0">{tip.tip}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="bg-primary text-white border-0">
        <Card.Body className="text-center p-4">
          <Star size={36} className="mb-2" />
          <h2 className="h4">{t('pages.interstateMoving.finalCta')}</h2>
          <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="light" className="mt-2">
            {t('pages.interstateMoving.ctaQuote')}
          </LinkButton>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InterstateMoving;
