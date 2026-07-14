import React, { useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Table, Alert } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import {
  Truck,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  InfoCircle,
  Calculator
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

type ShippingOption = {
  type: string;
  description: string;
  price: string;
  duration: string;
  pros: string[];
  cons: string[];
};

type Destination = {
  country: string;
  port: string;
  duration: string;
  price: string;
};

type ProcessStep = { title: string; description: string };

const InternationalCarShipping: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('international_car_shipping');
  }, []);

  const shippingOptions = useMemo(() => {
    const items = t('pages.carShipping.options', { returnObjects: true });
    return Array.isArray(items) ? (items as ShippingOption[]) : [];
  }, [t, i18n.language]);

  const destinations = useMemo(() => {
    const items = t('pages.carShipping.destinations', { returnObjects: true });
    return Array.isArray(items) ? (items as Destination[]) : [];
  }, [t, i18n.language]);

  const requirements = useMemo(() => {
    const items = t('pages.carShipping.requirements', { returnObjects: true });
    return Array.isArray(items) ? (items as string[]) : [];
  }, [t, i18n.language]);

  const processSteps = useMemo(() => {
    const items = t('pages.carShipping.processSteps', { returnObjects: true });
    return Array.isArray(items) ? (items as ProcessStep[]) : [];
  }, [t, i18n.language]);

  const stepColors = ['primary', 'success', 'info', 'warning', 'success'];

  return (
    <main id="main-content">
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">
              <Truck className="me-3 text-primary" />
              {t('services.vehicle')}
            </h1>
            <p className="lead text-muted mb-4">{t('pages.carShipping.subtitle')}</p>
            <Badge bg="primary" className="me-2">{t('pages.carShipping.badgeVolume')}</Badge>
            <Badge bg="success">{t('pages.carShipping.badgeSafe')}</Badge>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">{t('pages.carShipping.optionsTitle')}</h2>
          </Col>
        </Row>
        <Row>
          {shippingOptions.map((option) => (
            <Col lg={6} key={option.type} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <Truck size={48} className="text-primary" />
                  </div>
                  <h4 className="text-center mb-3">{option.type}</h4>
                  <p className="text-muted text-center mb-3">{option.description}</p>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-center">
                      <h6 className="text-success">{option.price}</h6>
                      <small className="text-muted">{t('pages.carShipping.priceLabel')}</small>
                    </div>
                    <div className="text-center">
                      <h6 className="text-info">{option.duration}</h6>
                      <small className="text-muted">{t('pages.carShipping.durationLabel')}</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-success">{t('pages.carShipping.pros')}</h6>
                    <ul className="list-unstyled">
                      {option.pros.map((pro) => (
                        <li key={pro} className="mb-1">
                          <CheckCircle size={16} className="text-success me-2" />
                          <small>{pro}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-warning">{t('pages.carShipping.cons')}</h6>
                    <ul className="list-unstyled">
                      {option.cons.map((con) => (
                        <li key={con} className="mb-1">
                          <InfoCircle size={16} className="text-warning me-2" />
                          <small>{con}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="primary" className="w-100">
                    {t('cta.get_quote')}
                  </LinkButton>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h3 className="mb-0">
                  <Globe className="me-2" />
                  {t('pages.carShipping.destinationsTitle')}
                </h3>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>{t('pages.carShipping.colCountry')}</th>
                      <th>{t('pages.carShipping.colPort')}</th>
                      <th>{t('pages.carShipping.colDuration')}</th>
                      <th>{t('pages.carShipping.colPrice')}</th>
                      <th>{t('pages.carShipping.colAction')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((dest) => (
                      <tr key={dest.country}>
                        <td><strong>{dest.country}</strong></td>
                        <td>{dest.port}</td>
                        <td><Badge bg="info">{dest.duration}</Badge></td>
                        <td className="text-success fw-bold">{dest.price}</td>
                        <td>
                          <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="outline-primary" size="sm">
                            <Calculator className="me-1" />
                            {t('cta.get_quote')}
                          </LinkButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">
                  <Shield className="me-2 text-success" />
                  {t('pages.carShipping.docsTitle')}
                </h4>
                <ul className="list-unstyled">
                  {requirements.map((req) => (
                    <li key={req} className="mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      {req}
                    </li>
                  ))}
                </ul>
                <Alert variant="warning" className="mt-3">
                  <InfoCircle className="me-2" />
                  <small>
                    <strong>{t('pages.carShipping.docsImportant')}</strong>{' '}
                    {t('pages.carShipping.docsNote')}
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">
                  <Clock className="me-2 text-primary" />
                  {t('pages.carShipping.processTitle')}
                </h4>
                <div className="timeline">
                  {processSteps.map((step, index) => (
                    <div key={step.title} className={`d-flex ${index < processSteps.length - 1 ? 'mb-3' : ''}`}>
                      <div
                        className={`bg-${stepColors[index] || 'primary'} text-white rounded-circle d-flex align-items-center justify-content-center me-3`}
                        style={{ width: '30px', height: '30px', fontSize: '14px' }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h6>{step.title}</h6>
                        <small className="text-muted">{step.description}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <Card className="border-primary bg-light">
              <Card.Body className="p-4">
                <h4 className="mb-3">{t('pages.carShipping.ctaTitle')}</h4>
                <p className="mb-4">{t('pages.carShipping.ctaBody')}</p>
                <LinkButton to={ROUTES.FREE_MOVING_QUOTE} variant="primary" size="lg" className="me-3">
                  <Calculator className="me-2" />
                  {t('cta.get_quote')}
                </LinkButton>
                <LinkButton to={ROUTES.CONTACT} variant="outline-success" size="lg">
                  {t('cta.free_consult')}
                </LinkButton>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default InternationalCarShipping;
