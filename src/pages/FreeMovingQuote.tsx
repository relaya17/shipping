import React, { useState, useEffect } from 'react';
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
import { trackPageView } from '../utils/analytics';

const FreeMovingQuote: React.FC = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const calculateEstimate = () => {
    // Simple estimation logic based on home size and move type
    const baseCosts: { [key: string]: { local: [number, number]; longDistance: [number, number]; international: [number, number] } } = {
      studio: { local: [400, 800], longDistance: [1500, 2500], international: [3000, 5000] },
      '1bedroom': { local: [600, 1200], longDistance: [2000, 3500], international: [4000, 7000] },
      '2bedroom': { local: [900, 1800], longDistance: [3000, 5000], international: [6000, 10000] },
      '3bedroom': { local: [1200, 2400], longDistance: [4000, 7000], international: [8000, 13000] },
      '4bedroom': { local: [1600, 3200], longDistance: [5500, 9000], international: [10000, 16000] },
      '5+bedroom': { local: [2000, 4000], longDistance: [7000, 12000], international: [13000, 20000] }
    };

    const type = formData.moveType as keyof typeof baseCosts[string];
    const size = formData.homeSize as keyof typeof baseCosts;

    if (baseCosts[size] && baseCosts[size][type]) {
      const [min, max] = baseCosts[size][type];
      
      // Add costs for additional services
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
    if (step === 2) {
      calculateEstimate();
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you! Our team will contact you within 1 hour with a detailed quote.');
  };

  const benefits = [
    { icon: <CurrencyDollar className="text-success" />, title: 'Transparent Pricing', desc: 'No hidden fees or surprise charges' },
    { icon: <Shield className="text-primary" />, title: 'Fully Insured', desc: 'Comprehensive protection for your belongings' },
    { icon: <Clock className="text-warning" />, title: 'Fast Response', desc: 'Quote within 1 hour, 7 days a week' },
    { icon: <Star className="text-info" />, title: 'Best Price Guarantee', desc: "We'll match any competitor's quote" }
  ];

  return (
    <Container className="py-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <CurrencyDollar size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">Get Your Free Moving Quote</h1>
          <p className="lead text-muted mb-4">
            Instant estimate in 3 easy steps | No obligation | Save up to 30%
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Badge bg="success">100% Free</Badge>
            <Badge bg="primary">No Credit Card</Badge>
            <Badge bg="info">1-Hour Response</Badge>
            <Badge bg="warning" text="dark">Price Match Guarantee</Badge>
          </div>
        </Col>
      </Row>

      {/* Benefits */}
      <Row className="mb-5">
        {benefits.map((benefit, index) => (
          <Col md={6} lg={3} key={index} className="mb-3">
            <Card className="text-center border-0 shadow-sm h-100">
              <Card.Body>
                <div className="mb-3" style={{ fontSize: '2rem' }}>
                  {benefit.icon}
                </div>
                <h6 className="mb-2">{benefit.title}</h6>
                <p className="text-muted small mb-0">{benefit.desc}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Progress Bar */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span className="small">Step {step} of 3</span>
                <span className="small">{Math.round((step / 3) * 100)}% Complete</span>
              </div>
              <ProgressBar now={(step / 3) * 100} variant="success" />
              <div className="d-flex justify-content-between mt-2 small text-muted">
                <span>Move Details</span>
                <span>Services</span>
                <span>Contact Info</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Form */}
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                
                {/* Step 1: Move Details */}
                {step === 1 && (
                  <div>
                    <h3 className="mb-4">
                      <Truck className="me-2" />
                      Tell Us About Your Move
                    </h3>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">Type of Move *</Form.Label>
                      <div className="d-grid gap-2">
                        {[
                          { value: 'local', label: 'Local Move (Within 50 miles)', icon: '🏠' },
                          { value: 'longDistance', label: 'Long Distance (Interstate)', icon: '🚛' },
                          { value: 'international', label: 'International Move', icon: '✈️' }
                        ].map(type => (
                          <Button
                            key={type.value}
                            variant={formData.moveType === type.value ? 'primary' : 'outline-primary'}
                            className="text-start p-3"
                            onClick={() => setFormData(prev => ({ ...prev, moveType: type.value }))}
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
                            From Zip Code *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="originZip"
                            placeholder="e.g. 10001"
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
                            To Zip Code *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="destinationZip"
                            placeholder="e.g. 90210"
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
                        Preferred Move Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="moveDate"
                        value={formData.moveDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <Form.Text className="text-muted">
                        Flexible dates? We can offer better pricing!
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">
                        <HouseFill className="me-1" />
                        Home Size *
                      </Form.Label>
                      <Form.Select
                        name="homeSize"
                        value={formData.homeSize}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select home size...</option>
                        <option value="studio">Studio/Efficiency</option>
                        <option value="1bedroom">1 Bedroom</option>
                        <option value="2bedroom">2 Bedrooms</option>
                        <option value="3bedroom">3 Bedrooms</option>
                        <option value="4bedroom">4 Bedrooms</option>
                        <option value="5+bedroom">5+ Bedrooms</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                )}

                {/* Step 2: Services */}
                {step === 2 && (
                  <div>
                    <h3 className="mb-4">
                      <BoxSeam className="me-2" />
                      Select Additional Services
                    </h3>

                    <Alert variant="info" className="mb-4">
                      <CheckCircle className="me-2" />
                      Check all services you're interested in. You can adjust later!
                    </Alert>

                    <ListGroup className="mb-4">
                      {[
                        { id: 'packing', label: 'Professional Packing', desc: 'Full packing service with materials included', cost: '+20%' },
                        { id: 'storage', label: 'Storage (30 days)', desc: 'Climate-controlled storage facility', cost: '+10%' },
                        { id: 'insurance', label: 'Full Value Protection', desc: 'Comprehensive insurance coverage', cost: '+5%' },
                        { id: 'unpacking', label: 'Unpacking Services', desc: 'We unpack and place items in your new home', cost: '+15%' },
                        { id: 'furniture', label: 'Furniture Assembly', desc: 'Disassembly and reassembly of furniture', cost: '+8%' },
                        { id: 'cleaning', label: 'Post-Move Cleaning', desc: 'Professional cleaning of your old home', cost: '+12%' }
                      ].map(service => (
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
                      <Form.Label className="fw-bold">Special Items or Instructions</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="specialItems"
                        placeholder="e.g., Piano, pool table, fragile antiques, tight parking..."
                        value={formData.specialItems}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                )}

                {/* Step 3: Contact & Estimate */}
                {step === 3 && (
                  <div>
                    <h3 className="mb-4">
                      <People className="me-2" />
                      Contact Information
                    </h3>

                    {estimatedCost && (
                      <Alert variant="success" className="mb-4">
                        <Star className="me-2" size={24} />
                        <strong className="fs-5">Your Estimated Cost</strong>
                        <div className="mt-2">
                          <h2 className="mb-0">
                            ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
                          </h2>
                          <small className="text-muted">
                            Final price subject to in-home survey. This estimate includes your selected services.
                          </small>
                        </div>
                      </Alert>
                    )}

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold">Full Name *</Form.Label>
          <Form.Control
            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-bold">Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        We'll call within 1 hour to confirm details
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        id="terms"
                        label={
                          <span className="small">
                            I agree to receive communications and understand the{' '}
                            <a href="/terms-of-service" target="_blank">Terms of Service</a> and{' '}
                            <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                          </span>
                        }
                        required
          />
        </Form.Group>

                    <Alert variant="info">
                      <CheckCircle className="me-2" />
                      <strong>What happens next?</strong>
                      <ul className="mb-0 mt-2 small">
                        <li>Our moving specialist will call you within 1 hour</li>
                        <li>Schedule a free in-home survey (virtual or in-person)</li>
                        <li>Receive your final binding quote</li>
                        <li>Book your move and relax!</li>
                      </ul>
                    </Alert>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <Button
                    variant="outline-secondary"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    ← Back
                  </Button>
                  
                  {step < 3 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={
                        (step === 1 && (!formData.moveType || !formData.originZip || !formData.destinationZip || !formData.moveDate || !formData.homeSize))
                      }
                    >
                      Continue →
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      type="submit"
                      size="lg"
                    >
                      <Star className="me-2" />
                      Get My Free Quote
        </Button>
                  )}
                </div>
      </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Trust Indicators */}
      <Row className="mt-5 text-center">
        <Col>
          <p className="text-muted mb-3">Trusted by 50,000+ happy customers</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Badge bg="light" text="dark" className="p-2">
              <ShieldCheck className="me-1" />
              Licensed & Insured
            </Badge>
            <Badge bg="light" text="dark" className="p-2">
              <Star className="me-1" />
              A+ BBB Rating
            </Badge>
            <Badge bg="light" text="dark" className="p-2">
              <CheckCircle className="me-1" />
              5,000+ 5-Star Reviews
            </Badge>
    </div>
        </Col>
      </Row>

    </Container>
  );
};

export default FreeMovingQuote;
