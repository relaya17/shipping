import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import LinkButton from '../components/LinkButton';
import {
  Shield,
  CheckCircle,
  ExclamationTriangle,
  Calculator,
  FileText,
  CurrencyDollar,
  Clock
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

type Plan = {
  id: string;
  rate: number;
  name: string;
  coverage: string;
  premium: string;
  features: string[];
  color: string;
  recommended?: boolean;
};

type ClaimStep = { title: string; description: string };

const MovingInsurance: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [itemValue, setItemValue] = useState<number>(0);
  const [calculatedPremium, setCalculatedPremium] = useState<number>(0);

  useEffect(() => {
    trackPageView('moving_insurance');
  }, []);

  const insurancePlans = useMemo(() => {
    const plans = t('pages.movingInsurance.plans', { returnObjects: true });
    return Array.isArray(plans) ? (plans as Plan[]) : [];
  }, [t, i18n.language]);

  const claimProcess = useMemo(() => {
    const steps = t('pages.movingInsurance.claimSteps', { returnObjects: true });
    const icons = [
      <ExclamationTriangle key="1" className="text-warning" />,
      <FileText key="2" className="text-info" />,
      <Calculator key="3" className="text-primary" />,
      <CurrencyDollar key="4" className="text-success" />
    ];
    const list = Array.isArray(steps) ? (steps as ClaimStep[]) : [];
    return list.map((step, i) => ({ ...step, step: i + 1, icon: icons[i] }));
  }, [t, i18n.language]);

  const covered = useMemo(() => {
    const items = t('pages.movingInsurance.covered', { returnObjects: true });
    return Array.isArray(items) ? (items as string[]) : [];
  }, [t, i18n.language]);

  const notCovered = useMemo(() => {
    const items = t('pages.movingInsurance.notCovered', { returnObjects: true });
    return Array.isArray(items) ? (items as string[]) : [];
  }, [t, i18n.language]);

  useEffect(() => {
    if (!selectedPlan || !itemValue) {
      setCalculatedPremium(0);
      return;
    }
    const plan = insurancePlans.find((p) => p.id === selectedPlan);
    if (!plan) return;
    setCalculatedPremium(itemValue * (Number(plan.rate) / 100));
  }, [selectedPlan, itemValue, insurancePlans]);

  return (
    <main id="main-content">
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">
              <Shield className="me-3 text-success" />
              {t('services.insurance')}
            </h1>
            <p className="lead text-muted mb-4">{t('pages.movingInsurance.subtitle')}</p>
            <Badge bg="success" className="me-2">{t('pages.movingInsurance.badgeLloyd')}</Badge>
            <Badge bg="primary">{t('pages.movingInsurance.badgeCoverage')}</Badge>
          </Col>
        </Row>

        <Row className="mb-5">
          {insurancePlans.map((plan) => (
            <Col lg={4} key={plan.id} className="mb-4">
              <Card className={`h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
                {plan.recommended && (
                  <div className="text-center">
                    <Badge bg="success" className="position-absolute top-0 start-50 translate-middle px-3">
                      {t('pages.movingInsurance.recommended')}
                    </Badge>
                  </div>
                )}
                <Card.Body className="p-4 text-center">
                  <Shield size={48} className={`text-${plan.color} mb-3`} />
                  <h4 className="mb-3">{plan.name}</h4>
                  <h5 className={`text-${plan.color} mb-3`}>{plan.coverage}</h5>
                  <p className="text-muted mb-3">{plan.premium}</p>
                  <ul className="list-unstyled text-start mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="mb-2">
                        <CheckCircle size={16} className="text-success me-2" />
                        <small>{feature}</small>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.recommended ? plan.color : `outline-${plan.color}`}
                    className="w-100"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? t('common.confirm') : t('pages.movingInsurance.selectPlan')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h4 className="mb-0">
                  <Calculator className="me-2" />
                  {t('pages.movingInsurance.calculatorTitle')}
                </h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('pages.movingInsurance.itemValue')}</Form.Label>
                    <Form.Control
                      type="number"
                      value={itemValue}
                      onChange={(e) => setItemValue(parseFloat(e.target.value) || 0)}
                      placeholder="25000"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('pages.movingInsurance.selectPlanLabel')}</Form.Label>
                    <Form.Select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    >
                      <option value="">{t('pages.movingInsurance.selectPlanPlaceholder')}</option>
                      {insurancePlans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} - {plan.premium}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {calculatedPremium > 0 && (
                    <Alert variant="success">
                      <div className="text-center">
                        <h5 className="mb-2">{t('pages.movingInsurance.calculatedPremium')}</h5>
                        <h3 className="text-success">${calculatedPremium.toFixed(2)}</h3>
                        <small className="text-muted">
                          {t('pages.movingInsurance.forCoverage', {
                            value: itemValue.toLocaleString(i18n.language)
                          })}
                        </small>
                      </div>
                    </Alert>
                  )}
                  <LinkButton
                    to={ROUTES.FREE_MOVING_QUOTE}
                    variant="primary"
                    className="w-100"
                    disabled={!selectedPlan || !itemValue}
                  >
                    {t('cta.get_quote')}
                  </LinkButton>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header>
                <h4 className="mb-0">
                  <Clock className="me-2" />
                  {t('pages.movingInsurance.claimsTitle')}
                </h4>
              </Card.Header>
              <Card.Body>
                {claimProcess.map((step) => (
                  <div key={step.step} className="d-flex align-items-start mb-3">
                    <div className="me-3 mt-1">{step.icon}</div>
                    <div>
                      <h6 className="mb-1">
                        {t('pages.movingInsurance.stepLabel', { n: step.step })} {step.title}
                      </h6>
                      <p className="text-muted small mb-0">{step.description}</p>
                    </div>
                  </div>
                ))}
                <Alert variant="info" className="mt-3">
                  <CheckCircle className="me-2" />
                  <small>
                    <strong>{t('pages.movingInsurance.avgProcessing')}</strong>{' '}
                    {t('pages.movingInsurance.avgProcessingBody')}
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h4 className="mb-0">{t('pages.movingInsurance.coverageTitle')}</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <h6 className="text-success">{t('pages.movingInsurance.coveredTitle')}</h6>
                    <ul className="list-unstyled">
                      {covered.map((item) => (
                        <li key={item}>
                          <CheckCircle size={16} className="text-success me-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h6 className="text-danger">{t('pages.movingInsurance.notCoveredTitle')}</h6>
                    <ul className="list-unstyled">
                      {notCovered.map((item) => (
                        <li key={item}>
                          <ExclamationTriangle size={16} className="text-warning me-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <Card className="border-success bg-light">
              <Card.Body className="p-4">
                <h4 className="mb-3">{t('pages.movingInsurance.ctaTitle')}</h4>
                <p className="mb-4">{t('pages.movingInsurance.ctaBody')}</p>
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

export default MovingInsurance;
