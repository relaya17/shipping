import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from "react-bootstrap";
import { 
  Shield, 
  CheckCircle, 
  ExclamationTriangle, 
  Calculator,
  FileText,
  CurrencyDollar,
  Clock
} from "react-bootstrap-icons";
import IconWrapper from '../components/UI/IconWrapper';
import { trackPageView } from '../utils/analytics';

const MovingInsurance: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [itemValue, setItemValue] = useState<number>(0);
  const [calculatedPremium, setCalculatedPremium] = useState<number>(0);

  useEffect(() => {
    trackPageView('moving_insurance');
  }, []);

  const insurancePlans = useMemo(() => [
    {
      id: 'basic',
      name: 'ביטוח בסיסי',
      coverage: 'עד $10,000',
      premium: '1.5% מהערך',
      features: [
        'כיסוי לנזקים פיזיים',
        'הגנה בסיסית מאובדן',
        'תביעות עד $10,000',
        'טיפול תוך 30 יום'
      ],
      color: 'primary',
      recommended: false
    },
    {
      id: 'standard',
      name: 'ביטוח סטנדרטי',
      coverage: 'עד $50,000',
      premium: '2.5% מהערך',
      features: [
        'כל מה שכלול בבסיסי',
        'כיסוי לפריטי יוקרה',
        'תביעות עד $50,000',
        'טיפול תוך 14 יום',
        'שירות לקוחות מועדף'
      ],
      color: 'success',
      recommended: true
    },
    {
      id: 'premium',
      name: 'ביטוח פרימיום',
      coverage: 'עד $100,000',
      premium: '3.5% מהערך',
      features: [
        'כל מה שכלול בסטנדרטי',
        'ביטוח לכל סוגי הנזקים',
        'תביעות עד $100,000',
        'טיפול תוך 7 ימים',
        'נציג אישי לתביעות',
        'כיסוי לעיכובים'
      ],
      color: 'warning',
      recommended: false
    }
  ], []);

  const claimProcess = [
    {
      step: 1,
      title: 'דיווח מיידי',
      description: 'דווח על הנזק תוך 48 שעות',
      icon: <IconWrapper icon={ExclamationTriangle} className="text-warning" />
    },
    {
      step: 2,
      title: 'תיעוד הנזק',
      description: 'צלם את הנזק ומלא טופס תביעה',
      icon: <IconWrapper icon={FileText} className="text-info" />
    },
    {
      step: 3,
      title: 'בדיקת שמאי',
      description: 'שמאי מוסמך בודק את הנזק',
      icon: <IconWrapper icon={Calculator} className="text-primary" />
    },
    {
      step: 4,
      title: 'פיצוי',
      description: 'קבלת פיצוי מלא ומהיר',
      icon: <IconWrapper icon={CurrencyDollar} className="text-success" />
    }
  ];

  useEffect(() => {
    const calculatePremium = () => {
      if (!selectedPlan || !itemValue) return;
      
      const plan = insurancePlans.find(p => p.id === selectedPlan);
      if (!plan) return;
      
      const percentage = parseFloat(plan.premium) / 100;
      setCalculatedPremium(itemValue * percentage);
    };

    calculatePremium();
  }, [selectedPlan, itemValue, insurancePlans]);

  return (
    <Container className="my-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">
            <IconWrapper icon={Shield} className="me-3 text-success" />
            ביטוח הובלה בינלאומי
          </h1>
          <p className="lead text-muted mb-4">
            הגנה מלאה על החפצים היקרים לכם עם ביטוח מותאם אישית
          </p>
          <Badge bg="success" className="me-2" title="Licensed by Lloyd's of London">רישיון Lloyd's of London</Badge>
          <Badge bg="primary" title="Coverage up to $100,000">כיסוי עד $100,000</Badge>
        </Col>
      </Row>

      {/* Insurance Plans */}
      <Row className="mb-5">
        {insurancePlans.map((plan) => (
          <Col lg={4} key={plan.id} className="mb-4">
            <Card className={`h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
              {plan.recommended && (
                <div className="text-center">
                  <Badge bg="success" className="position-absolute top-0 start-50 translate-middle px-3" title="Recommended plan">
                    מומלץ
                  </Badge>
                </div>
              )}
              
              <Card.Body className="p-4 text-center">
                <IconWrapper icon={Shield} size={48} className={`text-${plan.color} mb-3`} />
                <h4 className="mb-3">{plan.name}</h4>
                <h5 className={`text-${plan.color} mb-3`}>{plan.coverage}</h5>
                <p className="text-muted mb-3">{plan.premium}</p>
                
                <ul className="list-unstyled text-start mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <IconWrapper icon={CheckCircle} size={16} className="text-success me-2" />
                      <small>{feature}</small>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.recommended ? plan.color : `outline-${plan.color}`}
                  className="w-100"
                  onClick={() => setSelectedPlan(plan.id)}
                  title={`Select ${plan.name} plan`}
                >
                  {selectedPlan === plan.id ? 'נבחר' : 'בחר תוכנית'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Calculator */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm" title="Insurance calculator">
            <Card.Header>
              <h4 className="mb-0">
                <IconWrapper icon={Calculator} className="me-2" />
                מחשבון ביטוח
              </h4>
            </Card.Header>
            <Card.Body>
              <Form title="Insurance form">
                <Form.Group className="mb-3" title="Item value input">
                  <Form.Label htmlFor="itemValue" title="Item value label">ערך החפצים (USD)</Form.Label>
                  <Form.Control
                    id="itemValue"
                    type="number"
                    value={itemValue}
                    onChange={(e) => setItemValue(parseFloat(e.target.value) || 0)}
                    placeholder="25000"
                    title="Enter item value"
                    aria-label="Enter item value"
                  />
                </Form.Group>

                <Form.Group className="mb-3" title="Insurance plan selection">
                  <Form.Label htmlFor="insurancePlan" title="Insurance plan label">בחר תוכנית ביטוח</Form.Label>
                  <Form.Select
                    id="insurancePlan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    title="Select insurance plan"
                    aria-label="Select insurance plan"
                  >
                    <option value="">בחר תוכנית...</option>
                    {insurancePlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.premium}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {calculatedPremium > 0 && (
                  <Alert variant="success" title="Calculated premium">
                    <div className="text-center">
                      <h5 className="mb-2">דמי הביטוח המחושבים:</h5>
                      <h3 className="text-success">${calculatedPremium.toFixed(2)}</h3>
                      <small className="text-muted">
                        לביטוח על סכום של ${itemValue.toLocaleString()}
                      </small>
                    </div>
                  </Alert>
                )}

                <Button variant="primary" className="w-100" disabled={!selectedPlan || !itemValue} title="Get insurance quote">
                  קבל הצעת ביטוח
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header>
              <h4 className="mb-0">
                <IconWrapper icon={Clock} className="me-2" />
                תהליך תביעות
              </h4>
            </Card.Header>
            <Card.Body>
              {claimProcess.map((step) => (
                <div key={step.step} className="d-flex align-items-start mb-3">
                  <div className="me-3 mt-1">
                    {step.icon}
                  </div>
                  <div>
                    <h6 className="mb-1">שלב {step.step}: {step.title}</h6>
                    <p className="text-muted small mb-0">{step.description}</p>
                  </div>
                </div>
              ))}
              
              <Alert variant="info" className="mt-3" title="Average processing time">
                <IconWrapper icon={CheckCircle} className="me-2" />
                <small>
                  <strong>זמן טיפול ממוצע:</strong> 7-14 ימים עבודה לרוב התביעות
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
              <h4 className="mb-0">מה מכוסה בביטוח?</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <h6 className="text-success">מכוסה:</h6>
                  <ul className="list-unstyled">
                    <li><IconWrapper icon={CheckCircle} size={16} className="text-success me-2" />נזקים פיזיים במהלך ההובלה</li>
                    <li><IconWrapper icon={CheckCircle} size={16} className="text-success me-2" />גניבה או אובדן</li>
                    <li><IconWrapper icon={CheckCircle} size={16} className="text-success me-2" />נזקי מים ואש</li>
                    <li><IconWrapper icon={CheckCircle} size={16} className="text-success me-2" />תאונות תחבורה</li>
                    <li><IconWrapper icon={CheckCircle} size={16} className="text-success me-2" />נזקים בזמן טעינה/פריקה</li>
                  </ul>
                </Col>
                <Col md={6} className="mb-3">
                  <h6 className="text-danger">לא מכוסה:</h6>
                  <ul className="list-unstyled">
                    <li><IconWrapper icon={ExclamationTriangle} size={16} className="text-warning me-2" />בלאי טבעי</li>
                    <li><IconWrapper icon={ExclamationTriangle} size={16} className="text-warning me-2" />נזקים קיימים</li>
                    <li><IconWrapper icon={ExclamationTriangle} size={16} className="text-warning me-2" />אריזה לא נאותה</li>
                    <li><IconWrapper icon={ExclamationTriangle} size={16} className="text-warning me-2" />נזקי חרקים או מכרסמים</li>
                    <li><IconWrapper icon={ExclamationTriangle} size={16} className="text-warning me-2" />פריטים אסורים לשילוח</li>
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
              <h4 className="mb-3">מוכנים להגן על ההובלה שלכם?</h4>
              <p className="mb-4">
                קבלו ייעוץ מקצועי ובחרו את תוכנית הביטוח המתאימה לכם
              </p>
              <Button variant="success" size="lg" className="me-3" title="Insurance consultation">
                📞 ייעוץ ביטוח
              </Button>
              <Button variant="outline-primary" size="lg" title="Get price quote">
                📋 קבל הצעת מחיר
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovingInsurance;
