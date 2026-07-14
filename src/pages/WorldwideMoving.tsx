import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Alert, Table } from 'react-bootstrap';
import { 
  Globe, 
  Airplane, 
  BoxSeam,
  ShieldCheck,
  CheckCircle,
  FileText,
  CurrencyDollar,
  People,
  Star,
  Truck,
  Water
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

const WorldwideMoving: React.FC = () => {
  useEffect(() => {
    trackPageView('worldwide_moving');
    window.scrollTo(0, 0);
  }, []);

  const shippingMethods = [
    {
      icon: <Water size={48} className="text-primary" />,
      method: 'Sea Freight (FCL)',
      time: '30-60 days',
      cost: 'Most economical',
      bestFor: 'Full household moves',
      description: 'Exclusive use of a 20 or 40-foot container. Ideal for large moves with flexibility on timing.',
      features: ['Door-to-door service', 'Most cost-effective', 'Secure container', 'Best for large volumes']
    },
    {
      icon: <Water size={48} className="text-info" />,
      method: 'Sea Freight (LCL)',
      time: '35-70 days',
      cost: 'Budget-friendly',
      bestFor: 'Smaller shipments',
      description: 'Share container space with other shipments. Perfect for 1-2 bedroom apartments.',
      features: ['Pay for space used', 'Flexible volume', 'Consolidated shipping', 'Cost-efficient']
    },
    {
      icon: <Airplane size={48} className="text-warning" />,
      method: 'Air Freight',
      time: '5-10 days',
      cost: 'Premium pricing',
      bestFor: 'Urgent/valuable items',
      description: 'Fastest international shipping option. Recommended for time-sensitive or high-value shipments.',
      features: ['Express delivery', 'Climate controlled', 'Maximum security', 'Priority handling']
    }
  ];

  const popularDestinations = [
    { continent: 'Europe', countries: ['UK', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands'], time: '35-50 days', flag: '🇪🇺' },
    { continent: 'Asia', countries: ['Israel', 'Japan', 'Singapore', 'South Korea', 'Hong Kong', 'UAE'], time: '25-45 days', flag: '🌏' },
    { continent: 'Australia & Oceania', countries: ['Australia', 'New Zealand'], time: '40-60 days', flag: '🇦🇺' },
    { continent: 'South America', countries: ['Brazil', 'Argentina', 'Chile'], time: '35-55 days', flag: '🌎' },
    { continent: 'Africa', countries: ['South Africa', 'Kenya', 'Egypt'], time: '30-50 days', flag: '🌍' },
    { continent: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'], time: '25-40 days', flag: '🕌' }
  ];

  const services = [
    {
      icon: <BoxSeam className="text-primary" />,
      title: 'Professional Packing',
      description: 'Expert packing with international-grade materials',
      included: ['Custom crating', 'Bubble wrap & padding', 'Labeled inventory', 'Fragile item handling']
    },
    {
      icon: <FileText className="text-success" />,
      title: 'Customs Clearance',
      description: 'Full documentation and customs brokerage services',
      included: ['Customs forms', 'Import permits', 'Duty calculations', 'Broker coordination']
    },
    {
      icon: <Truck className="text-warning" />,
      title: 'Door-to-Door Service',
      description: 'Complete pickup and delivery to your new address',
      included: ['Home pickup', 'Port handling', 'Destination delivery', 'Unpacking options']
    },
    {
      icon: <ShieldCheck className="text-info" />,
      title: 'Comprehensive Insurance',
      description: 'Full value protection for international moves',
      included: ['All-risk coverage', 'Marine insurance', 'Claims assistance', 'Peace of mind']
    }
  ];

  const processSteps = [
    { step: 1, title: 'Free Consultation', description: 'Discuss your needs with our international move specialist', icon: <People /> },
    { step: 2, title: 'Survey & Quote', description: 'Virtual or in-home survey to assess volume and provide accurate quote', icon: <FileText /> },
    { step: 3, title: 'Documentation', description: 'Prepare all necessary paperwork, customs forms, and permits', icon: <FileText /> },
    { step: 4, title: 'Professional Packing', description: 'Expert team packs and labels all items with care', icon: <BoxSeam /> },
    { step: 5, title: 'Export & Shipping', description: 'Container loaded, sealed, and shipped to destination port', icon: <Water /> },
    { step: 6, title: 'Customs Clearance', description: 'Our agents handle all customs procedures at destination', icon: <CheckCircle /> },
    { step: 7, title: 'Final Delivery', description: 'Delivery to your new home with unpacking if requested', icon: <Truck /> }
  ];

  const prohibitedItems = [
    'Flammable materials', 'Explosives', 'Weapons & ammunition', 'Hazardous chemicals',
    'Perishable food', 'Plants & seeds', 'Illegal drugs', 'Counterfeit goods',
    'Live animals', 'Currency/negotiable instruments'
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <Globe size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">Worldwide International Moving</h1>
          <p className="lead text-muted mb-4">
            Seamless International Relocation to 120+ Countries | Door-to-Door Service
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <Badge bg="success">150K+ Successful Moves</Badge>
            <Badge bg="primary">120+ Countries</Badge>
            <Badge bg="info">FMC Licensed</Badge>
            <Badge bg="warning" text="dark">ISO 9001 Certified</Badge>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to={ROUTES.FREE_MOVING_QUOTE}>
              <Button variant="primary" size="lg">
                <CurrencyDollar className="me-2" />
                Get International Quote
              </Button>
            </Link>
            <Button variant="outline-primary" size="lg" href="tel:1-800-847-6683">
              📞 1-800-VIP-MOVE
            </Button>
          </div>
        </Col>
      </Row>

      {/* Alert */}
      <Alert variant="info" className="mb-5">
        <Globe size={20} className="me-2" />
        <strong>Planning an International Move?</strong> Book early! International moves require 6-12 weeks lead time for documentation, permits, and scheduling.
      </Alert>

      {/* Shipping Methods */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Choose Your Shipping Method</h2>
        <p className="text-center text-muted mb-4">
          We offer flexible shipping options to match your timeline and budget
        </p>
        <Row>
          {shippingMethods.map((method, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    {method.icon}
                  </div>
                  <h4 className="mb-2">{method.method}</h4>
                  <Badge bg="secondary" className="mb-3">{method.time}</Badge>
                  <p className="text-muted mb-3">{method.description}</p>
                  <div className="mb-3">
                    <Badge bg="success" className="me-2">{method.cost}</Badge>
                    <Badge bg="info">{method.bestFor}</Badge>
                  </div>
                  <hr />
                  <ListGroup variant="flush" className="text-start">
                    {method.features.map((feature, idx) => (
                      <ListGroup.Item key={idx} className="border-0 ps-0 py-1">
                        <CheckCircle size={14} className="text-success me-2" />
                        <small>{feature}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Popular Destinations */}
      <section className="mb-5 bg-light rounded-3 p-4">
        <h2 className="text-center mb-4">We Ship to 120+ Countries</h2>
        <Row>
          {popularDestinations.map((dest, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="h-100 border-primary">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">
                        <span className="me-2" style={{ fontSize: '1.5rem' }}>{dest.flag}</span>
                        {dest.continent}
                      </h5>
                      <Badge bg="primary">{dest.time}</Badge>
                    </div>
                    <Water size={24} className="text-primary" />
                  </div>
                  <div className="d-flex flex-wrap gap-1">
                    {dest.countries.map((country, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="small">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <p className="text-muted">Don't see your destination? We ship worldwide!</p>
          <Link to={ROUTES.CONTACT}>
            <Button variant="primary">Contact Us for Your Destination</Button>
          </Link>
        </div>
      </section>

      {/* Services Included */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Comprehensive International Moving Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex">
                  <div className="me-3 mt-1">
                    {service.icon}
                  </div>
                  <div>
                    <h5 className="mb-2">{service.title}</h5>
                    <p className="text-muted mb-3">{service.description}</p>
                    <h6 className="small text-uppercase text-muted mb-2">Includes:</h6>
                    <ul className="list-unstyled small">
                      {service.included.map((item, idx) => (
                        <li key={idx} className="mb-1">
                          <CheckCircle size={14} className="text-success me-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Process */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Your International Move Process</h2>
        <Row>
          {processSteps.map((step, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex align-items-start">
                    <div className="bg-primary text-white rounded-circle me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <strong>{step.step}</strong>
                    </div>
                    <div>
                      <h6 className="mb-2">{step.title}</h6>
                      <p className="text-muted small mb-0">{step.description}</p>
      </div>
    </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Pricing Info */}
      <section className="mb-5 bg-primary text-white rounded-3 p-5">
        <h2 className="text-center mb-4">International Moving Costs</h2>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="bg-white text-dark mb-4">
              <Card.Body>
                <h5 className="mb-3">What Affects Your Price?</h5>
                <Table striped responsive className="mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Volume/Weight</strong></td>
                      <td>Charged per cubic meter (CBM) or pound</td>
                    </tr>
                    <tr>
                      <td><strong>Distance</strong></td>
                      <td>Origin and destination countries</td>
                    </tr>
                    <tr>
                      <td><strong>Shipping Method</strong></td>
                      <td>Sea (FCL/LCL) vs. Air freight</td>
                    </tr>
                    <tr>
                      <td><strong>Services</strong></td>
                      <td>Packing, insurance, storage</td>
                    </tr>
                    <tr>
                      <td><strong>Customs & Duties</strong></td>
                      <td>Destination country fees (paid separately)</td>
                    </tr>
                    <tr>
                      <td><strong>Season</strong></td>
                      <td>Summer moves cost 15-20% more</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <div className="text-center">
              <p className="mb-3"><strong>Average International Move Cost:</strong></p>
              <Row>
                <Col md={4} className="mb-2">
                  <div className="bg-white text-dark rounded p-3">
                    <Water size={24} className="mb-2" />
                    <div className="small text-muted">Sea (FCL)</div>
                    <strong className="fs-5">$5K-$12K</strong>
                  </div>
                </Col>
                <Col md={4} className="mb-2">
                  <div className="bg-white text-dark rounded p-3">
                    <BoxSeam size={24} className="mb-2" />
                    <div className="small text-muted">Sea (LCL)</div>
                    <strong className="fs-5">$2K-$6K</strong>
                  </div>
                </Col>
                <Col md={4} className="mb-2">
                  <div className="bg-white text-dark rounded p-3">
                    <Airplane size={24} className="mb-2" />
                    <div className="small text-muted">Air Freight</div>
                    <strong className="fs-5">$8K-$20K</strong>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>

      {/* Prohibited Items */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Items Prohibited for International Shipping</h2>
        <Alert variant="danger">
          <strong>Important:</strong> The following items cannot be shipped internationally due to safety regulations and customs restrictions:
        </Alert>
        <Card className="border-danger">
          <Card.Body>
            <Row>
              {prohibitedItems.map((item, index) => (
                <Col md={6} lg={4} key={index} className="mb-2">
                  <div className="d-flex align-items-center">
                    <span className="text-danger me-2">⚠️</span>
                    <span>{item}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
        <p className="text-center text-muted mt-3">
          <small>Additional restrictions may apply based on destination country. Contact us for specific requirements.</small>
        </p>
      </section>

      {/* Testimonial */}
      <section className="mb-5">
        <Card className="border-0 shadow-lg bg-light">
          <Card.Body className="p-5 text-center">
            <Star size={48} className="text-warning mb-3" />
            <blockquote className="mb-4">
              <p className="lead fst-italic mb-3">
                "VIP International Shipping made our move from New York to London seamless. They handled everything from packing to customs clearance. Our belongings arrived safely and on time. Highly recommended!"
              </p>
              <footer className="blockquote-footer">
                Sarah & John M. <cite title="London, UK">London, UK</cite>
              </footer>
            </blockquote>
            <div className="d-flex justify-content-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-warning" fill="currentColor" />
              ))}
            </div>
          </Card.Body>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Card className="border-success shadow-lg">
          <Card.Body className="p-5">
            <Globe size={48} className="text-success mb-3" />
            <h3 className="mb-3">Ready for Your International Move?</h3>
            <p className="lead text-muted mb-4">
              Get a detailed international moving quote customized to your destination and needs. Our experts are available 24/7!
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to={ROUTES.FREE_MOVING_QUOTE}>
                <Button variant="success" size="lg">
                  <Star className="me-2" />
                  Get Free International Quote
                </Button>
              </Link>
              <Link to={ROUTES.CONTACT}>
                <Button variant="outline-success" size="lg">
                  <People className="me-2" />
                  Speak with International Specialist
                </Button>
              </Link>
            </div>
            <p className="text-muted small mt-3 mb-0">
              🌍 Available 24/7 | 📧 Response within 2 hours | 🔒 Free consultation
            </p>
          </Card.Body>
        </Card>
      </section>

    </Container>
  );
};

export default WorldwideMoving;
