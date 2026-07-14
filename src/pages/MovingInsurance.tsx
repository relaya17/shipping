import React, { useState, useEffect } from 'react';
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

const MovingInsurance: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [itemValue, setItemValue] = useState<number>(0);
  const [calculatedPremium, setCalculatedPremium] = useState<number>(0);

  useEffect(() => {
    trackPageView('moving_insurance');
  }, []);

  const insurancePlans = [
    {
      id: 'basic',
      name: 'Basic insurance',
      coverage: 'Up to $10,000',
      premium: '1.5% of value',
      features: [
        'Coverage for physical damage',
        'Basic loss protection',
        'Claims up to $10,000',
        'Processing within 30 days'
      ],
      color: 'primary',
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard insurance',
      coverage: 'Up to $50,000',
      premium: '2.5% of value',
      features: [
        'Everything in Basic',
        'Coverage for luxury items',
        'Claims up to $50,000',
        'Processing within 14 days',
        'Priority customer service'
      ],
      color: 'success',
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium insurance',
      coverage: 'Up to $100,000',
      premium: '3.5% of value',
      features: [
        'Everything in Standard',
        'Coverage for all damage types',
        'Claims up to $100,000',
        'Processing within 7 days',
        'Dedicated claims representative',
        'Delay coverage'
      ],
      color: 'warning',
      recommended: false
    }
  ];

  const claimProcess = [
    {
      step: 1,
      title: 'Report immediately',
      description: 'Report the damage within 48 hours',
      icon: <ExclamationTriangle className="text-warning" />
    },
    {
      step: 2,
      title: 'Document the damage',
      description: 'Photograph the damage and complete a claim form',
      icon: <FileText className="text-info" />
    },
    {
      step: 3,
      title: 'Adjuster review',
      description: 'A licensed adjuster inspects the damage',
      icon: <Calculator className="text-primary" />
    },
    {
      step: 4,
      title: 'Compensation',
      description: 'Receive full, fast compensation',
      icon: <CurrencyDollar className="text-success" />
    }
  ];

  const calculatePremium = () => {
    if (!selectedPlan || !itemValue) return;

    const plan = insurancePlans.find(p => p.id === selectedPlan);
    if (!plan) return;

    const percentage = parseFloat(plan.premium) / 100;
    setCalculatedPremium(itemValue * percentage);
  };

  useEffect(() => {
    calculatePremium();
  }, [selectedPlan, itemValue]);

  return (
    <main id="main-content">
      <Container className="my-5">
        {/* Hero */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">
              <Shield className="me-3 text-success" />
              {t('services.insurance')}
            </h1>
            <p className="lead text-muted mb-4">
              Full protection for your valuables with personalized insurance coverage
            </p>
            <Badge bg="success" className="me-2">Lloyd&apos;s of London licensed</Badge>
            <Badge bg="primary">Coverage up to $100,000</Badge>
          </Col>
        </Row>

        {/* Insurance Plans */}
        <Row className="mb-5">
          {insurancePlans.map((plan) => (
            <Col lg={4} key={plan.id} className="mb-4">
              <Card className={`h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
                {plan.recommended && (
                  <div className="text-center">
                    <Badge bg="success" className="position-absolute top-0 start-50 translate-middle px-3">
                      Recommended
                    </Badge>
                  </div>
                )}

                <Card.Body className="p-4 text-center">
                  <Shield size={48} className={`text-${plan.color} mb-3`} />
                  <h4 className="mb-3">{plan.name}</h4>
                  <h5 className={`text-${plan.color} mb-3`}>{plan.coverage}</h5>
                  <p className="text-muted mb-3">{plan.premium}</p>

                  <ul className="list-unstyled text-start mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mb-2">
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
                    {selectedPlan === plan.id ? t('common.confirm') : 'Select plan'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Calculator */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h4 className="mb-0">
                  <Calculator className="me-2" />
                  Insurance calculator
                </h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Item value (USD)</Form.Label>
                    <Form.Control
                      type="number"
                      value={itemValue}
                      onChange={(e) => setItemValue(parseFloat(e.target.value) || 0)}
                      placeholder="25000"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Select insurance plan</Form.Label>
                    <Form.Select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    >
                      <option value="">Select a plan...</option>
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
                        <h5 className="mb-2">Calculated premium:</h5>
                        <h3 className="text-success">${calculatedPremium.toFixed(2)}</h3>
                        <small className="text-muted">
                          For coverage of ${itemValue.toLocaleString()}
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
                  Claims process
                </h4>
              </Card.Header>
              <Card.Body>
                {claimProcess.map((step) => (
                  <div key={step.step} className="d-flex align-items-start mb-3">
                    <div className="me-3 mt-1">
                      {step.icon}
                    </div>
                    <div>
                      <h6 className="mb-1">Step {step.step}: {step.title}</h6>
                      <p className="text-muted small mb-0">{step.description}</p>
                    </div>
                  </div>
                ))}

                <Alert variant="info" className="mt-3">
                  <CheckCircle className="me-2" />
                  <small>
                    <strong>Average processing time:</strong> 7–14 business days for most claims
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Coverage Details */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h4 className="mb-0">What does insurance cover?</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <h6 className="text-success">Covered:</h6>
                    <ul className="list-unstyled">
                      <li><CheckCircle size={16} className="text-success me-2" />Physical damage during transport</li>
                      <li><CheckCircle size={16} className="text-success me-2" />Theft or loss</li>
                      <li><CheckCircle size={16} className="text-success me-2" />Water and fire damage</li>
                      <li><CheckCircle size={16} className="text-success me-2" />Transport accidents</li>
                      <li><CheckCircle size={16} className="text-success me-2" />Damage during loading/unloading</li>
                    </ul>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h6 className="text-danger">Not covered:</h6>
                    <ul className="list-unstyled">
                      <li><ExclamationTriangle size={16} className="text-warning me-2" />Normal wear and tear</li>
                      <li><ExclamationTriangle size={16} className="text-warning me-2" />Pre-existing damage</li>
                      <li><ExclamationTriangle size={16} className="text-warning me-2" />Improper packing</li>
                      <li><ExclamationTriangle size={16} className="text-warning me-2" />Insect or rodent damage</li>
                      <li><ExclamationTriangle size={16} className="text-warning me-2" />Prohibited shipping items</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        <Row>
          <Col className="text-center">
            <Card className="border-success bg-light">
              <Card.Body className="p-4">
                <h4 className="mb-3">Ready to protect your move?</h4>
                <p className="mb-4">
                  Get professional advice and choose the insurance plan that fits your needs
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

export default MovingInsurance;
