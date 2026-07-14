import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Alert, ProgressBar, ListGroup } from 'react-bootstrap';
import {
  CurrencyDollar,
  BoxSeam,
  Calendar,
  GeoAlt,
  People,
  HouseFill,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Truck,
  ShieldCheck
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';

type AddonService = { id: string; label: string; desc: string; cost: string };

const FreeMovingQuote: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('free_moving_quote');
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    moveType: '',
    originZip: '',
    destinationZip: '',
    moveDate: '',
    homeSize: '',
    name: '',
    email: '',
    phone: '',
    additionalServices: [] as string[],
    specialItems: ''
  });

  const [estimatedCost, setEstimatedCost] = useState<{ min: number; max: number } | null>(null);

  const benefits = useMemo(
    () => [
      { icon: <CurrencyDollar className="text-success" />, title: t('pages.freeMovingQuote.benefits.pricing.title'), desc: t('pages.freeMovingQuote.benefits.pricing.desc') },
      { icon: <Shield className="text-primary" />, title: t('pages.freeMovingQuote.benefits.insured.title'), desc: t('pages.freeMovingQuote.benefits.insured.desc') },
      { icon: <Clock className="text-warning" />, title: t('pages.freeMovingQuote.benefits.fast.title'), desc: t('pages.freeMovingQuote.benefits.fast.desc') },
      { icon: <Star className="text-info" />, title: t('pages.freeMovingQuote.benefits.guarantee.title'), desc: t('pages.freeMovingQuote.benefits.guarantee.desc') }
    ],
    [t, i18n.language]
  );

  const moveTypes = useMemo(
    () => [
      { value: 'local', label: t('pages.freeMovingQuote.moveTypes.local'), icon: '🏠' },
      { value: 'longDistance', label: t('pages.freeMovingQuote.moveTypes.longDistance'), icon: '🚛' },
      { value: 'international', label: t('pages.freeMovingQuote.moveTypes.international'), icon: '✈️' }
    ],
    [t, i18n.language]
  );

  const addonServices = useMemo(
    () => t('pages.freeMovingQuote.addonServices', { returnObjects: true }) as AddonService[],
    [t, i18n.language]
  );

  const nextSteps = useMemo(
    () => t('pages.freeMovingQuote.nextSteps', { returnObjects: true }) as string[],
    [t, i18n.language]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const calculateEstimate = () => {
    const baseCosts: Record<string, Record<string, [number, number]>> = {
      studio: { local: [400, 800], longDistance: [1500, 2500], international: [3000, 5000] },
      '1bedroom': { local: [600, 1200], longDistance: [2000, 3500], international: [4000, 7000] },
      '2bedroom': { local: [900, 1800], longDistance: [3000, 5000], international: [6000, 10000] },
      '3bedroom': { local: [1200, 2400], longDistance: [4000, 7000], international: [8000, 13000] },
      '4bedroom': { local: [1600, 3200], longDistance: [5500, 9000], international: [10000, 16000] },
      '5+bedroom': { local: [2000, 4000], longDistance: [7000, 12000], international: [13000, 20000] }
    };

    const size = formData.homeSize;
    const type = formData.moveType;
    if (baseCosts[size]?.[type]) {
      const [min, max] = baseCosts[size][type];
      let serviceMultiplier = 1;
      if (formData.additionalServices.includes('packing')) serviceMultiplier += 0.2;
      if (formData.additionalServices.includes('storage')) serviceMultiplier += 0.1;
      if (formData.additionalServices.includes('insurance')) serviceMultiplier += 0.05;
      setEstimatedCost({
        min: Math.round(min * serviceMultiplier),
        max: Math.round(max * serviceMultiplier)
      });
    }
  };

  const handleNext = () => {
    if (step === 2) calculateEstimate();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('pages.freeMovingQuote.submitSuccess'));
  };

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <CurrencyDollar size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">{t('pages.freeMovingQuote.title')}</h1>
          <p className="lead text-muted mb-4">{t('pages.freeMovingQuote.subtitle')}</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Badge bg="success">{t('pages.freeMovingQuote.badges.free')}</Badge>
            <Badge bg="primary">{t('pages.freeMovingQuote.badges.noCard')}</Badge>
            <Badge bg="info">{t('pages.freeMovingQuote.badges.response')}</Badge>
            <Badge bg="warning" text="dark">{t('pages.freeMovingQuote.badges.priceMatch')}</Badge>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        {benefits.map((benefit, index) => (
          <Col md={6} lg={3} key={index} className="mb-3">
            <Card className="text-center border-0 shadow-sm h-100">
              <Card.Body>
                <div className="mb-3" style={{ fontSize: '2rem' }}>{benefit.icon}</div>
                <h6 className="mb-2">{benefit.title}</h6>
                <p className="text-muted small mb-0">{benefit.desc}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span className="small">{t('pages.freeMovingQuote.stepOf', { step, total: 3 })}</span>
                <span className="small">{t('pages.freeMovingQuote.percentComplete', { percent: Math.round((step / 3) * 100) })}</span>
              </div>
              <ProgressBar now={(step / 3) * 100} variant="success" />
              <div className="d-flex justify-content-between mt-2 small text-muted">
                <span>{t('pages.freeMovingQuote.steps.moveDetails')}</span>
                <span>{t('pages.freeMovingQuote.steps.services')}</span>
                <span>{t('pages.freeMovingQuote.steps.contact')}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <h3 className="mb-4">
                      <Truck className="me-2" />
                      {t('pages.freeMovingQuote.step1Title')}
                    </h3>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">{t('pages.freeMovingQuote.moveTypeLabel')}</Form.Label>
                      <div className="d-grid gap-2">
                        {moveTypes.map((type) => (
                          <Button
                            key={type.value}
                            variant={formData.moveType === type.value ? 'primary' : 'outline-primary'}
                            className="text-start p-3"
                            onClick={() => setFormData((prev) => ({ ...prev, moveType: type.value }))}
                          >
                            <span className="me-2" style={{ fontSize: '1.5rem' }}>{type.icon}</span>
                            {type.label}
                          </Button>
                        ))}
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold">
                            <GeoAlt className="me-1" />
                            {t('pages.freeMovingQuote.fromZip')}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="originZip"
                            placeholder={t('pages.freeMovingQuote.zipPlaceholderFrom')}
                            value={formData.originZip}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold">
                            <GeoAlt className="me-1" />
                            {t('pages.freeMovingQuote.toZip')}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="destinationZip"
                            placeholder={t('pages.freeMovingQuote.zipPlaceholderTo')}
                            value={formData.destinationZip}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">
                        <Calendar className="me-1" />
                        {t('pages.freeMovingQuote.moveDate')}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="moveDate"
                        value={formData.moveDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <Form.Text className="text-muted">{t('pages.freeMovingQuote.flexibleDates')}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">
                        <HouseFill className="me-1" />
                        {t('pages.freeMovingQuote.homeSize')}
                      </Form.Label>
                      <Form.Select name="homeSize" value={formData.homeSize} onChange={handleInputChange} required>
                        <option value="">{t('pages.freeMovingQuote.homeSizeSelect')}</option>
                        <option value="studio">{t('pages.freeMovingQuote.sizes.studio')}</option>
                        <option value="1bedroom">{t('pages.freeMovingQuote.sizes.one')}</option>
                        <option value="2bedroom">{t('pages.freeMovingQuote.sizes.two')}</option>
                        <option value="3bedroom">{t('pages.freeMovingQuote.sizes.three')}</option>
                        <option value="4bedroom">{t('pages.freeMovingQuote.sizes.four')}</option>
                        <option value="5+bedroom">{t('pages.freeMovingQuote.sizes.fivePlus')}</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="mb-4">
                      <BoxSeam className="me-2" />
                      {t('pages.freeMovingQuote.step2Title')}
                    </h3>

                    <Alert variant="info" className="mb-4">
                      <CheckCircle className="me-2" />
                      {t('pages.freeMovingQuote.servicesHint')}
                    </Alert>

                    <ListGroup className="mb-4">
                      {(Array.isArray(addonServices) ? addonServices : []).map((service) => (
                        <ListGroup.Item
                          key={service.id}
                          action
                          active={formData.additionalServices.includes(service.id)}
                          onClick={() => handleCheckboxChange(service.id)}
                          className="d-flex justify-content-between align-items-start cursor-pointer"
                        >
                          <div className="me-3">
                            <Form.Check
                              type="checkbox"
                              id={service.id}
                              checked={formData.additionalServices.includes(service.id)}
                              onChange={() => {}}
                              label={<strong>{service.label}</strong>}
                            />
                            <small className="text-muted d-block ms-4">{service.desc}</small>
                          </div>
                          <Badge bg="secondary">{service.cost}</Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">{t('pages.freeMovingQuote.specialItems')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="specialItems"
                        placeholder={t('pages.freeMovingQuote.specialItemsPlaceholder')}
                        value={formData.specialItems}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="mb-4">
                      <People className="me-2" />
                      {t('pages.freeMovingQuote.step3Title')}
                    </h3>

                    {estimatedCost && (
                      <Alert variant="success" className="mb-4">
                        <Star className="me-2" size={24} />
                        <strong className="fs-5">{t('pages.freeMovingQuote.estimatedCost')}</strong>
                        <div className="mt-2">
                          <h2 className="mb-0">
                            ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
                          </h2>
                          <small className="text-muted">{t('pages.freeMovingQuote.estimateNote')}</small>
                        </div>
                      </Alert>
                    )}

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold">{t('forms.name')} *</Form.Label>
                          <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold">{t('forms.email')} *</Form.Label>
                          <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">{t('forms.phone')} *</Form.Label>
                      <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                      <Form.Text className="text-muted">{t('pages.freeMovingQuote.phoneHint')}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        id="terms"
                        label={
                          <span className="small">
                            {t('pages.freeMovingQuote.consentPrefix')}{' '}
                            <a href="/terms-of-service" target="_blank" rel="noreferrer">{t('footer.terms')}</a>
                            {' '}{t('pages.freeMovingQuote.consentAnd')}{' '}
                            <a href="/privacy-policy" target="_blank" rel="noreferrer">{t('footer.privacy')}</a>
                          </span>
                        }
                        required
                      />
                    </Form.Group>

                    <Alert variant="info">
                      <CheckCircle className="me-2" />
                      <strong>{t('pages.freeMovingQuote.whatNext')}</strong>
                      <ul className="mb-0 mt-2 small">
                        {(Array.isArray(nextSteps) ? nextSteps : []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Alert>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-secondary" onClick={handleBack} disabled={step === 1}>
                    {t('pages.freeMovingQuote.back')}
                  </Button>

                  {step < 3 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={
                        step === 1 &&
                        (!formData.moveType ||
                          !formData.originZip ||
                          !formData.destinationZip ||
                          !formData.moveDate ||
                          !formData.homeSize)
                      }
                    >
                      {t('pages.freeMovingQuote.continue')}
                    </Button>
                  ) : (
                    <Button variant="success" type="submit" size="lg">
                      <Star className="me-2" />
                      {t('pages.freeMovingQuote.submit')}
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col>
          <p className="text-muted mb-3">{t('pages.freeMovingQuote.trustedBy')}</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Badge bg="light" text="dark" className="p-2">
              <ShieldCheck className="me-1" />
              {t('pages.freeMovingQuote.trust.licensed')}
            </Badge>
            <Badge bg="light" text="dark" className="p-2">
              <Star className="me-1" />
              {t('pages.freeMovingQuote.trust.bbb')}
            </Badge>
            <Badge bg="light" text="dark" className="p-2">
              <CheckCircle className="me-1" />
              {t('pages.freeMovingQuote.trust.reviews')}
            </Badge>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FreeMovingQuote;
