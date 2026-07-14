import React, { useEffect, useMemo } from 'react';
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
import { CONTACT } from '../config/companyInfo';

type FaqItem = { q: string; a: string };

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  const contactInfo = useMemo(
    () => [
      {
        icon: <Telephone size={24} className="text-primary" />,
        title: t('contact.phone'),
        details: [CONTACT.phoneDisplay],
        available: t('contact.support_247'),
        urgent: true
      },
      {
        icon: <Envelope size={24} className="text-success" />,
        title: t('contact.email'),
        details: [CONTACT.email, CONTACT.supportEmail],
        available: t('contact.email_response'),
        urgent: false
      },
      {
        icon: <GeoAlt size={24} className="text-info" />,
        title: t('contact.office_address'),
        details: [
          `${CONTACT.address.line1}, ${CONTACT.address.city}, ${CONTACT.address.region} ${CONTACT.address.postalCode}, ${CONTACT.address.country}`
        ],
        available: t('contact.visits_appointment'),
        urgent: false
      },
      {
        icon: <Whatsapp size={24} className="text-success" />,
        title: t('contact.whatsapp_business'),
        details: [CONTACT.whatsappNumber, t('contact.instant_chat')],
        available: t('contact.whatsapp_available'),
        urgent: true
      }
    ],
    [t, i18n.language]
  );

  const faqs = useMemo(() => {
    const items = t('contact.faq', { returnObjects: true });
    return Array.isArray(items) ? (items as FaqItem[]) : [];
  }, [t, i18n.language]);

  const officeHours = [{ location: CONTACT.address.country, hours: CONTACT.hours }];

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
                <h4 className="mb-4">{t('contact.details_title')}</h4>

                {contactInfo.map((info, index) => (
                  <div key={index} className={`mb-4 p-3 rounded ${info.urgent ? 'bg-light border-start border-3 border-primary' : ''}`}>
                    <div className="d-flex align-items-center mb-2">
                      {info.icon}
                      <h6 className="mb-0 ms-2">{info.title}</h6>
                      {info.urgent && <Badge bg="danger" className="ms-2">{t('contact.urgent')}</Badge>}
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
                  <h6 className="mb-2">
                    <strong>{t('contact.emergency_title')}</strong>
                  </h6>
                  <p className="mb-0 small">
                    {t('contact.emergency_body')}
                  </p>
                </Alert>

                <Card className="mt-4 border-info">
                  <Card.Header className="bg-info text-white">
                    <Clock className="me-2" />
                    <strong>{t('contact.office_hours_title')}</strong>
                  </Card.Header>
                  <Card.Body className="p-3">
                    {officeHours.map((office, index) => (
                      <div key={index} className="mb-2">
                        <div className="fw-semibold">{office.location}</div>
                        <div className="text-muted small">{office.hours}</div>
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
                      placeholder={t('contact.placeholder_name')}
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
                      placeholder={t('contact.placeholder_email')}
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
                      <option value="">{t('contact.subject_select')}</option>
                      <option value="quote">{t('contact.subject_quote')}</option>
                      <option value="tracking">{t('contact.subject_tracking')}</option>
                      <option value="insurance">{t('contact.subject_insurance')}</option>
                      <option value="complaint">{t('contact.subject_complaint')}</option>
                      <option value="general">{t('contact.subject_general')}</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formQuestion">
                    <Form.Label>{t('forms.message')}</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="question"
                      value={formData.question || ''}
                      onChange={handleChange}
                      placeholder={t('contact.placeholder_message')}
                      required
                      rows={5}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConsent">
                    <Form.Check
                      type="checkbox"
                      label={t('contact.consent')}
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
                  <p className="text-muted mb-3">{t('contact.or_direct')}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="success" href={`https://wa.me/${CONTACT.whatsappNumber.replace(/\D/g, '')}`}>
                      <Whatsapp className="me-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline-primary" href={`tel:${CONTACT.phoneHref}`}>
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
                <h4 className="mb-0">{t('contact.faq_title')}</h4>
                <small>{t('contact.faq_subtitle')}</small>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  {faqs.map((item) => (
                    <Col md={6} className="mb-4" key={item.q}>
                      <div className="d-flex align-items-start">
                        <CheckCircle className="text-success me-3 mt-1" size={20} />
                        <div>
                          <h6 className="text-primary">{item.q}</h6>
                          <p className="text-muted mb-1" style={{ whiteSpace: 'pre-line' }}>
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                <div className="bg-light rounded-3 p-4 mt-4">
                  <h6 className="mb-3 text-center">{t('contact.useful_links')}</h6>
                  <Row className="text-center">
                    <Col md={3} className="mb-2">
                      <Button variant="outline-primary" size="sm" className="w-100">
                        {t('contact.link_packing')}
                      </Button>
                    </Col>
                    <Col md={3} className="mb-2">
                      <Button variant="outline-success" size="sm" className="w-100">
                        {t('contact.link_customs')}
                      </Button>
                    </Col>
                    <Col md={3} className="mb-2">
                      <Button variant="outline-info" size="sm" className="w-100">
                        {t('contact.link_map')}
                      </Button>
                    </Col>
                    <Col md={3} className="mb-2">
                      <Button variant="outline-warning" size="sm" className="w-100">
                        {t('contact.link_call')}
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
                  {t('contact.offices_title')}
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                  <div className="text-center text-white">
                    <GeoAlt size={48} className="mb-3" />
                    <h5>{t('contact.map_title')}</h5>
                    <p>{t('contact.map_coming')}</p>
                    <Button variant="light" size="sm">
                      {t('contact.show_directions')}
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
