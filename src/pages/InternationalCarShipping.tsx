import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Alert } from 'react-bootstrap';
import {
  Truck,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  InfoCircle,
  Calculator
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

const InternationalCarShipping: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('international_car_shipping');
  }, []);

  const shippingOptions = [
    {
      type: 'RoRo (Roll-on/Roll-off)',
      description: 'Your vehicle drives onto the ship deck',
      price: '$800 – $1,500',
      duration: '2–4 weeks',
      pros: ['More affordable', 'Faster', 'Less handling'],
      cons: ['Exposed to weather', 'Higher risk']
    },
    {
      type: 'Container Shipping',
      description: 'Your vehicle ships in a sealed container',
      price: '$1,200 – $2,500',
      duration: '3–6 weeks',
      pros: ['Full protection', 'More secure', 'Room for extra belongings'],
      cons: ['More expensive', 'Takes longer']
    }
  ];

  const destinations = [
    { country: 'Germany', port: 'Hamburg', duration: '3–4 weeks', price: '$1,200' },
    { country: 'United Kingdom', port: 'Southampton', duration: '2–3 weeks', price: '$1,100' },
    { country: 'Australia', port: 'Sydney', duration: '4–6 weeks', price: '$1,800' },
    { country: 'Japan', port: 'Yokohama', duration: '3–5 weeks', price: '$1,600' }
  ];

  const requirements = [
    'Valid driver\'s license',
    'Vehicle title / registration',
    'Valid insurance',
    'Passport copy',
    'Original vehicle invoice',
    'Vehicle value declaration'
  ];

  return (
    <main id="main-content">
      <Container className="my-5">
        {/* Hero */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">
              <Truck className="me-3 text-primary" />
              {t('services.vehicle')}
            </h1>
            <p className="lead text-muted mb-4">
              Professional vehicle shipping worldwide with full insurance and personal care
            </p>
            <Badge bg="primary" className="me-2">Over 5,000 vehicles per year</Badge>
            <Badge bg="success">99.5% damage-free arrival</Badge>
          </Col>
        </Row>

        {/* Shipping Options */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Shipping options</h2>
          </Col>
        </Row>
        <Row>
          {shippingOptions.map((option, index) => (
            <Col lg={6} key={index} className="mb-4">
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
                      <small className="text-muted">Price</small>
                    </div>
                    <div className="text-center">
                      <h6 className="text-info">{option.duration}</h6>
                      <small className="text-muted">Duration</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-success">Pros:</h6>
                    <ul className="list-unstyled">
                      {option.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="mb-1">
                          <CheckCircle size={16} className="text-success me-2" />
                          <small>{pro}</small>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-warning">Cons:</h6>
                    <ul className="list-unstyled">
                      {option.cons.map((con, conIndex) => (
                        <li key={conIndex} className="mb-1">
                          <InfoCircle size={16} className="text-warning me-2" />
                          <small>{con}</small>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="primary" className="w-100">
                    {t('cta.get_quote')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Destinations */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h3 className="mb-0">
                  <Globe className="me-2" />
                  Popular destinations
                </h3>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Country</th>
                      <th>Destination port</th>
                      <th>Duration</th>
                      <th>Price from</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((dest, index) => (
                      <tr key={index}>
                        <td><strong>{dest.country}</strong></td>
                        <td>{dest.port}</td>
                        <td>
                          <Badge bg="info">{dest.duration}</Badge>
                        </td>
                        <td className="text-success fw-bold">{dest.price}</td>
                        <td>
                          <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="outline-primary" size="sm">
                            <Calculator className="me-1" />
                            {t('cta.get_quote')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Requirements */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">
                  <Shield className="me-2 text-success" />
                  Required documents
                </h4>
                <ul className="list-unstyled">
                  {requirements.map((req, index) => (
                    <li key={index} className="mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      {req}
                    </li>
                  ))}
                </ul>
                <Alert variant="warning" className="mt-3">
                  <InfoCircle className="me-2" />
                  <small>
                    <strong>Important:</strong> All documents must be in English or officially translated
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
                  Shipping process
                </h4>
                <div className="timeline">
                  <div className="d-flex mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>1</div>
                    <div>
                      <h6>Booking & payment</h6>
                      <small className="text-muted">Book the service and pay a deposit</small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>2</div>
                    <div>
                      <h6>Vehicle pickup</h6>
                      <small className="text-muted">Pickup from a location you choose</small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>3</div>
                    <div>
                      <h6>Prepare for shipping</h6>
                      <small className="text-muted">Inspect and document vehicle condition</small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>4</div>
                    <div>
                      <h6>International shipping</h6>
                      <small className="text-muted">Transport with real-time tracking</small>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>5</div>
                    <div>
                      <h6>Delivery at destination</h6>
                      <small className="text-muted">Arrival and handover at the final destination</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        <Row>
          <Col className="text-center">
            <Card className="border-primary bg-light">
              <Card.Body className="p-4">
                <h4 className="mb-3">Ready to ship your vehicle?</h4>
                <p className="mb-4">
                  Get a personalized quote and start the process today
                </p>
                <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="primary" size="lg" className="me-3">
                  <Calculator className="me-2" />
                  {t('cta.get_quote')}
                </Button>
                <Button as={Link as never} to={ROUTES.CONTACT} variant="outline-success" size="lg">
                  {t('cta.free_consult')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default InternationalCarShipping;
