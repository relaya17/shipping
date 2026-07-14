import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Alert } from 'react-bootstrap';
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  CurrencyDollar, 
  BoxSeam,
  Calendar,
  CheckCircle,
  GeoAlt,
  People,
  Tools,
  Star
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

const InterstateMoving: React.FC = () => {
  useEffect(() => {
    trackPageView('interstate_moving');
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Truck size={40} className="text-primary" />,
      title: 'Full-Service Moving',
      description: 'Complete door-to-door service with professional packing, loading, transport, and unpacking',
      features: ['Professional packing', 'Loading & unloading', 'Furniture disassembly/assembly', 'Unpacking services']
    },
    {
      icon: <BoxSeam size={40} className="text-success" />,
      title: 'Partial/Shared Moving',
      description: 'Cost-effective solution for smaller moves, sharing truck space with other shipments',
      features: ['Lower cost option', 'Flexible scheduling', 'Same care and protection', 'Ideal for 1-2 bedroom moves']
    },
    {
      icon: <Clock size={40} className="text-warning" />,
      title: 'Express Moving',
      description: 'Priority service with dedicated truck and expedited delivery for time-sensitive moves',
      features: ['Dedicated truck', '3-5 day delivery', 'Priority scheduling', 'Real-time tracking']
    },
    {
      icon: <ShieldCheck size={40} className="text-info" />,
      title: 'White Glove Service',
      description: 'Premium moving experience with specialized handling for high-value and delicate items',
      features: ['Custom crating', 'Climate-controlled transport', 'Installation services', 'Concierge support']
    }
  ];

  const popularRoutes = [
    { from: 'New York, NY', to: 'Florida', duration: '3-5 days', distance: '1,200 mi' },
    { from: 'California', to: 'Texas', duration: '4-6 days', distance: '1,500 mi' },
    { from: 'Illinois', to: 'Arizona', duration: '4-5 days', distance: '1,700 mi' },
    { from: 'Massachusetts', to: 'North Carolina', duration: '3-4 days', distance: '800 mi' },
    { from: 'Washington', to: 'Colorado', duration: '3-4 days', distance: '1,300 mi' },
    { from: 'Michigan', to: 'Georgia', duration: '4-5 days', distance: '1,000 mi' }
  ];

  const movingTips = [
    {
      icon: <Calendar className="text-primary" />,
      title: 'Book Early',
      tip: 'Reserve your moving date 4-8 weeks in advance, especially during peak season (May-September)'
    },
    {
      icon: <BoxSeam className="text-success" />,
      title: 'Declutter First',
      tip: 'Reduce moving costs by selling or donating items you no longer need before packing'
    },
    {
      icon: <CurrencyDollar className="text-warning" />,
      title: 'Get Multiple Quotes',
      tip: 'Compare at least 3 estimates to ensure competitive pricing and understand what\'s included'
    },
    {
      icon: <CheckCircle className="text-info" />,
      title: 'Read Reviews',
      tip: 'Check BBB ratings, Google reviews, and FMCSA records before choosing a moving company'
    }
  ];

  const pricingFactors = [
    { factor: 'Distance', impact: 'Primary cost driver', description: 'Longer distances = higher costs' },
    { factor: 'Weight/Volume', impact: 'Direct correlation', description: 'Charged per pound or cubic foot' },
    { factor: 'Season', impact: 'Moderate effect', description: 'Summer (peak) costs 20-30% more' },
    { factor: 'Access', impact: 'Additional fees', description: 'Stairs, long carry, shuttle service' },
    { factor: 'Packing Services', impact: 'Optional add-on', description: 'Professional packing adds 15-25%' },
    { factor: 'Insurance', impact: 'Recommended', description: 'Full value protection for peace of mind' }
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <Truck size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">Interstate Moving Services</h1>
          <p className="lead text-muted mb-4">
            Professional Long-Distance Moving Across All 50 States
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <Badge bg="success">Licensed & Insured</Badge>
            <Badge bg="primary">DOT Certified</Badge>
            <Badge bg="info">Real-Time Tracking</Badge>
            <Badge bg="warning" text="dark">A+ BBB Rating</Badge>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to={ROUTES.FREE_MOVING_QUOTE}>
              <Button variant="primary" size="lg">
                <CurrencyDollar className="me-2" />
                Get Free Quote
              </Button>
            </Link>
            <Link to={ROUTES.CONTACT}>
              <Button variant="outline-primary" size="lg">
                <People className="me-2" />
                Speak with Expert
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Alert */}
      <Alert variant="info" className="mb-5">
        <CheckCircle size={20} className="me-2" />
        <strong>Moving Soon?</strong> Book now and save up to 20% on interstate moves scheduled 6+ weeks in advance. Limited availability during peak season!
      </Alert>

      {/* Why Choose Us */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Why Choose VIP for Interstate Moving?</h2>
        <Row>
          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <ShieldCheck size={48} className="text-success mb-3" />
                <h5>Fully Licensed</h5>
                <p className="text-muted small mb-0">
                  DOT & FMCSA registered with comprehensive insurance coverage
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <Star size={48} className="text-warning mb-3" />
                <h5>5-Star Service</h5>
                <p className="text-muted small mb-0">
                  99.8% customer satisfaction rate with thousands of positive reviews
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <GeoAlt size={48} className="text-info mb-3" />
                <h5>Real-Time Tracking</h5>
                <p className="text-muted small mb-0">
                  Track your shipment 24/7 with GPS-enabled trucks and mobile app
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <CurrencyDollar size={48} className="text-primary mb-3" />
                <h5>No Hidden Fees</h5>
                <p className="text-muted small mb-0">
                  Transparent pricing with binding estimates and price-match guarantee
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Services */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Our Interstate Moving Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    {service.icon}
                  </div>
                  <h4 className="mb-3">{service.title}</h4>
                  <p className="text-muted mb-3">{service.description}</p>
                  <h6 className="mb-2">Includes:</h6>
                  <ListGroup variant="flush">
                    {service.features.map((feature, idx) => (
                      <ListGroup.Item key={idx} className="border-0 ps-0 py-1">
                        <CheckCircle size={16} className="text-success me-2" />
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Popular Routes */}
      <section className="mb-5 bg-light rounded-3 p-4">
        <h2 className="text-center mb-4">Popular Interstate Routes</h2>
        <Row>
          {popularRoutes.map((route, index) => (
            <Col md={6} lg={4} key={index} className="mb-3">
              <Card className="border-primary h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <GeoAlt className="text-primary me-2" size={24} />
                    <Badge bg="primary">{route.duration}</Badge>
                  </div>
                  <h6 className="mb-1">{route.from}</h6>
                  <p className="text-muted small mb-2">↓</p>
                  <h6 className="text-primary mb-2">{route.to}</h6>
                  <p className="text-muted small mb-0">
                    <Truck size={14} className="me-1" />
                    {route.distance}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <p className="text-muted mb-2">Don't see your route? We cover all 50 states!</p>
          <Link to={ROUTES.FREE_MOVING_QUOTE}>
            <Button variant="primary">Get Custom Quote</Button>
          </Link>
        </div>
      </section>

      {/* Pricing Factors */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Understanding Interstate Moving Costs</h2>
        <p className="text-center text-muted mb-4">
          Interstate moving costs vary based on several factors. Here's what affects your price:
        </p>
        <Row>
          {pricingFactors.map((item, index) => (
            <Col md={6} lg={4} key={index} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">{item.factor}</h6>
                    <Badge bg="secondary" className="text-wrap">{item.impact}</Badge>
                  </div>
                  <p className="text-muted small mb-0">{item.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Alert variant="success" className="mt-4">
          <CurrencyDollar size={20} className="me-2" />
          <strong>Average Cost:</strong> Interstate moves typically range from $2,500 to $6,500 depending on distance and volume. Get an accurate estimate with our free online quote tool!
        </Alert>
      </section>

      {/* Moving Tips */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Expert Moving Tips</h2>
        <Row>
          {movingTips.map((tip, index) => (
            <Col md={6} key={index} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="d-flex align-items-start">
                  <div className="me-3 mt-1">
                    {tip.icon}
                  </div>
                  <div>
                    <h5 className="mb-2">{tip.title}</h5>
                    <p className="text-muted mb-0">{tip.tip}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Link to={ROUTES.MOVING_TIPS}>
            <Button variant="outline-primary">
              View All Moving Tips
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-5 bg-primary text-white rounded-3 p-5">
        <h2 className="text-center mb-4">How Interstate Moving Works</h2>
        <Row>
          <Col md={3} className="mb-4 text-center">
            <div className="bg-white text-primary rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <strong className="fs-4">1</strong>
            </div>
            <h5>Get Quote</h5>
            <p className="small mb-0">Fill out our form or call for instant estimate</p>
          </Col>
          <Col md={3} className="mb-4 text-center">
            <div className="bg-white text-primary rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <strong className="fs-4">2</strong>
            </div>
            <h5>Schedule</h5>
            <p className="small mb-0">Choose your moving date and services</p>
          </Col>
          <Col md={3} className="mb-4 text-center">
            <div className="bg-white text-primary rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <strong className="fs-4">3</strong>
            </div>
            <h5>We Move</h5>
            <p className="small mb-0">Professional team handles everything</p>
          </Col>
          <Col md={3} className="mb-4 text-center">
            <div className="bg-white text-primary rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <strong className="fs-4">4</strong>
            </div>
            <h5>Delivered</h5>
            <p className="small mb-0">Arrive at your new home stress-free</p>
          </Col>
        </Row>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Card className="border-success shadow-lg">
          <Card.Body className="p-5">
            <Tools size={48} className="text-success mb-3" />
            <h3 className="mb-3">Ready to Start Your Interstate Move?</h3>
            <p className="lead text-muted mb-4">
              Get a free, no-obligation quote in minutes. Our moving experts are standing by to help!
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to={ROUTES.FREE_MOVING_QUOTE}>
                <Button variant="success" size="lg">
                  <Star className="me-2" />
                  Get Free Quote Now
                </Button>
              </Link>
              <Button variant="outline-success" size="lg" href="tel:1-800-847-6683">
                📞 Call: 1-800-VIP-MOVE
              </Button>
    </div>
            <p className="text-muted small mt-3 mb-0">
              Available 7 days a week | Response within 1 hour | No credit card required
            </p>
          </Card.Body>
        </Card>
      </section>

    </Container>
  );
};

export default InterstateMoving;
