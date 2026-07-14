import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetFormData } from '../redux/contactSlice';
import { RootState } from '../redux/store';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import {
  Envelope,
  Telephone,
  GeoAlt,
  Clock,
  Whatsapp,
  Send,
  CheckCircle
} from 'react-bootstrap-icons';
import PhoneInput from 'react-phone-input-2';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    trackPageView('contact');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    if (value && value.length > 0) {
      dispatch(setFormData({ ...formData, phone: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.question) {
      alert(t('contact.fill_all'));
      return;
    }

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_form',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          question: formData.question,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert(t('contact.thanks', { name: formData.name }));
        dispatch(resetFormData());
      } else {
        alert(t('contact.send_error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('contact.network_error'));
    }
  };

  const contactInfo = [
    {
      icon: <Telephone size={24} className="text-primary" />,
      title: t('contact.phone'),
      details: ['+1 (555) 123-4567', '+972 3-123-4567', '+44 20 7123-4567'],
      available: t('contact.support_247'),
      urgent: true
    },
    {
      icon: <Envelope size={24} className="text-success" />,
      title: t('contact.email'),
      details: ['info@vipshipping.com', 'quotes@vipshipping.com', 'support@vipshipping.com'],
      available: 'Guaranteed response within 2 hours',
      urgent: false
    },
    {
      icon: <GeoAlt size={24} className="text-info" />,
      title: 'Global offices',
      details: [
        'New York: 123 Shipping Ave, NY 10001',
        'Tel Aviv: 15 Moving Street, Tel Aviv 6512',
        'London: 45 Logistics St, London EC1'
      ],
      available: 'Visits by appointment',
      urgent: false
    },
    {
      icon: <Whatsapp size={24} className="text-success" />,
      title: 'WhatsApp Business',
      details: ['+972 50-123-4567', 'Instant chat support'],
      available: 'Available 24/7 — response within minutes',
      urgent: true
    }
  ];

  const officeHours = [
    { location: 'Israel', hours: 'Sun–Thu: 8:00–18:00, Fri: 8:00–14:00', timezone: 'GMT+2' },
    { location: 'United States', hours: 'Monday–Friday: 9:00–17:00 EST', timezone: 'GMT-5' },
    { location: 'United Kingdom', hours: 'Monday–Friday: 9:00–17:00 GMT', timezone: 'GMT+0' }
  ];

  const emergencyContacts = [
    { type: 'Shipment emergency', number: '+972 50-911-1234', available: '24/7' },
    { type: 'Technical support', number: '+1 555-TECH-911', available: '24/7' },
    { type: 'VIP customer service', number: '+972 3-VIP-1234', available: 'Sun–Fri' }
  ];

  return (
    <main id="main-content">
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">{t('contact.title')}</h1>
            <p className="lead text-muted mb-4">
              {t('contact.subtitle')}
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">Contact details</h4>

                {contactInfo.map((info, index) => (
                  <div key={index} className={`mb-4 p-3 rounded ${info.urgent ? 'bg-light border-start border-3 border-primary' : ''}`}>
                    <div className="d-flex align-items-center mb-2">
                      {info.icon}
                      <h6 className="mb-0 ms-2">{info.title}</h6>
                      {info.urgent && <Badge bg="danger" className="ms-2">Urgent</Badge>}
                    </div>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="mb-1 text-muted small">
                        {detail}
                      </p>
                    ))}
                    <small className="text-primary fw-semibold">{info.available}</small>
                  </div>
                ))}

                <Alert variant="danger" className="mt-4">
                  <h6 className="mb-3">
                    <strong>Emergency contacts</strong>
                  </h6>
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">{contact.type}:</span>
                      <div className="text-end">
                        <div className="fw-bold">{contact.number}</div>
                        <small>{contact.available}</small>
                      </div>
                    </div>
                  ))}
                </Alert>

                <Card className="mt-4 border-info">
                  <Card.Header className="bg-info text-white">
                    <Clock className="me-2" />
                    <strong>Global office hours</strong>
                  </Card.Header>
                  <Card.Body className="p-3">
                    {officeHours.map((office, index) => (
                      <div key={index} className="mb-2">
                        <div className="fw-semibold">{office.location}</div>
                        <div className="text-muted small">{office.hours}</div>
                        <Badge bg="light" text="dark" className="me-2">{office.timezone}</Badge>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4">{t('contact.form_title')}</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>{t('forms.name')}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>{t('forms.email')}</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>{t('forms.phone')}</Form.Label>
                    <PhoneInput
                      country="us"
                      value={formData.phone ? String(formData.phone) : ''}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '5px',
                        border: '1px solid #ced4da'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>{t('forms.subject')}</Form.Label>
                    <Form.Select
                      name="subject"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject...</option>
                      <option value="quote">Quote request</option>
                      <option value="tracking">Shipment tracking</option>
                      <option value="insurance">Insurance questions</option>
                      <option value="complaint">Complaint</option>
                      <option value="general">General</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formQuestion">
                    <Form.Label>{t('forms.message')}</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="question"
                      value={formData.question || ''}
                      onChange={handleChange}
                      placeholder="Write your question or message here..."
                      required
                      rows={5}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConsent">
                    <Form.Check
                      type="checkbox"
                      label="I agree to receive updates and promotional emails"
                      required
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                      <Send className="me-2" />
                      {t('forms.send')}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-4">
                  <hr />
                  <p className="text-muted mb-3">Or contact us directly:</p>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="success" href="https://wa.me/15551234567">
                      <Whatsapp className="me-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline-primary" href="tel:+15551234567">
                      <Telephone className="me-2" />
                      {t('cta.call_now')}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-primary text-white text-center">
                <h4 className="mb-0">Frequently asked questions</h4>
                <small>The information you need most</small>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">How long does international shipping take?</h6>
                        <p className="text-muted mb-1">
                          <strong>Ocean freight:</strong> 14–35 days (economical)<br />
                          <strong>Air freight:</strong> 3–7 days (fast)<br />
                          <strong>Ground:</strong> 5–14 days (Europe)<br />
                          <strong>Express service:</strong> 24–48 hours (urgent)
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">What insurance is included?</h6>
                        <p className="text-muted mb-1">
                          <strong>Basic insurance:</strong> Included free (up to $1,000)<br />
                          <strong>Comprehensive:</strong> 2–3% of value ($10,000+)<br />
                          <strong>Premium:</strong> Full coverage + replacement<br />
                          <strong>Specialty:</strong> Fine art and luxury items
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">What does your price include?</h6>
                        <p className="text-muted mb-1">
                          Door / office pickup<br />
                          Professional packing (optional)<br />
                          Full international shipping<br />
                          Basic insurance and customs handling<br />
                          Real-time GPS tracking<br />
                          Delivery to final destination
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">How do I track my shipment?</h6>
                        <p className="text-muted mb-1">
                          <strong>Advanced tracking:</strong><br />
                          Real-time GPS with map<br />
                          Automatic SMS and email updates<br />
                          Dedicated mobile app<br />
                          Smart ChatBot for instant info<br />
                          Push notifications at every stage
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">What items can I ship?</h6>
                        <p className="text-muted mb-1">
                          Furniture and household goods<br />
                          Electronics and computers<br />
                          Fine art and valuables<br />
                          Vehicles and motorcycles<br />
                          Machinery and industrial equipment<br />
                          Hazardous materials (special conditions only)
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">What payment methods do you accept?</h6>
                        <p className="text-muted mb-1">
                          Credit cards (Visa, MasterCard, AMEX)<br />
                          International bank transfer<br />
                          Secure PayPal and Stripe<br />
                          Apple Pay and Google Pay<br />
                          Corporate invoicing (on credit)<br />
                          Digital currencies (Bitcoin, USDC)
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">Which countries do you ship to?</h6>
                        <p className="text-muted mb-1">
                          <strong>120+ countries worldwide:</strong><br />
                          All of Europe (fast service)<br />
                          USA and Canada (regular lanes)<br />
                          Asia and Australia (local partners)<br />
                          Latin America and Africa<br />
                          Islands and remote regions
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6} className="mb-4">
                    <div className="d-flex align-items-start">
                      <CheckCircle className="text-success me-3 mt-1" size={20} />
                      <div>
                        <h6 className="text-primary">What are your AI services?</h6>
                        <p className="text-muted mb-1">
                          <strong>Smart technologies:</strong><br />
                          ChatBot with advanced NLP<br />
                          Machine-learning price prediction<br />
                          Automatic route optimization<br />
                          Personalized recommendations<br />
                          Risk analysis and delay forecasts
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="bg-light rounded-3 p-4 mt-4">
                  <h6 className="mb-3 text-center">Useful links</h6>
                  <Row className="text-center">
                    <Col md={3} className="mb-2">
                      <Button variant="outline-primary" size="sm" className="w-100">
                        Packing guide
                      </Button>
                    </Col>
                    <Col md={3} className="mb-2">
                      <Button variant="outline-success" size="sm" className="w-100">
                        Customs calculator
                      </Button>
                    </Col>
                    <Col md={3} className="mb-2">
                      <Button variant="outline-info" size="sm" className="w-100">
                        Service map
                      </Button>
                    </Col>
                    <Col md={3} className="mb-2">
                      <Button variant="outline-warning" size="sm" className="w-100">
                        Book a call
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">
                  <GeoAlt className="me-2" />
                  Our office locations
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                  <div className="text-center text-white">
                    <GeoAlt size={48} className="mb-3" />
                    <h5>Interactive map</h5>
                    <p>Coming soon: Google Maps with office locations</p>
                    <Button variant="light" size="sm">
                      Show directions
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Contact;
