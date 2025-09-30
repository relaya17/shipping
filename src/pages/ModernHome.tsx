import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Badge, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Truck,
  Globe,
  Shield,
  Clock,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Airplane,
  Truck as Ship,
  BoxSeam,
  Headset
} from 'react-bootstrap-icons';
import LanguageSelector from '../components/LanguageSelector';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import ThemeToggle from '../components/UI/ThemeToggle';
import ChatBot from '../components/AI/ChatBot';
import { InteractiveButton, FloatingCard, PulseIcon, MagneticButton } from '../components/UI/MicroInteractions';
import { useSystemNotifications } from '../components/Notifications/FloatingNotifications';

const ModernHome: React.FC = () => {
  const { t } = useTranslation();
  const [animateStats, setAnimateStats] = useState(false);
  const { showSuccess, showInfo, showPaymentSuccess } = useSystemNotifications();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: <Ship size={40} className="text-primary" />,
      title: t('services.ocean.title'),
      description: t('services.ocean.description'),
      color: 'primary'
    },
    {
      icon: <Airplane size={40} className="text-info" />,
      title: t('services.air.title'),
      description: t('services.air.description'),
      color: 'info'
    },
    {
      icon: <Truck size={40} className="text-success" />,
      title: t('services.express.title'),
      description: t('services.express.description'),
      color: 'success'
    },
    {
      icon: <BoxSeam size={40} className="text-warning" />,
      title: t('services.customs.title'),
      description: t('services.customs.description'),
      color: 'warning'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Global Tech Corp",
      rating: 5,
      comment: "Outstanding service! VIP handled our urgent shipment to 15 countries flawlessly."
    },
    {
      name: "Chen Wei",
      company: "Asia Manufacturing Ltd",
      rating: 5,
      comment: "Reliable, fast, and professional. They've been our logistics partner for 3 years."
    },
    {
      name: "Marco Rossi",
      company: "European Exports",
      rating: 5,
      comment: "Best shipping rates and excellent customer support. Highly recommended!"
    }
  ];

  return (
    <div className="modern-home">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark glass-navbar position-fixed w-100" style={{ zIndex: 1000 }}>
        <Container>
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/images/favicon.ico"
              alt="VIP International Shipping"
              width="40"
              height="40"
              className="rounded-circle me-2"
            />
            <span className="fw-bold text-white d-none d-md-inline">VIP Shipping</span>
          </Link>
          
          <div className="d-flex align-items-center gap-2">
            <ThemeToggle />
            <NotificationCenter />
            <LanguageSelector />
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          {/* Background image instead of video for now */}
          <div 
            className="hero-image"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,123,255,0.8) 0%, rgba(0,77,153,0.9) 100%), url('/images/shippingVip.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        </div>
        
        <Container className="position-relative h-100 d-flex align-items-center">
          <Row className="w-100">
            <Col lg={8} xl={7}>
              <div className="hero-content text-white">
                <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">
                  <Globe className="me-2" size={16} />
                  {t('hero.features.worldwide')}
                </Badge>
                
                <h1 className="display-3 fw-bold mb-4 hero-title">
                  {t('hero.title')}
                </h1>
                
                <h2 className="h3 mb-4 text-light hero-subtitle">
                  {t('hero.subtitle')}
                </h2>
                
                <p className="lead mb-5 text-light opacity-90">
                  {t('hero.description')}
                </p>
                
                <div className="hero-features mb-5">
                  <Row>
                    <Col md={4} className="mb-3">
                      <div className="d-flex align-items-center text-white">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>{t('hero.features.worldwide')}</span>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="d-flex align-items-center text-white">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>{t('hero.features.tracking')}</span>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="d-flex align-items-center text-white">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>{t('hero.features.support')}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                
                <div className="hero-cta d-flex flex-wrap gap-3">
                  <InteractiveButton 
                    size="lg" 
                    className="px-4 py-3 rounded-pill"
                    onClick={() => {
                      showSuccess(
                        'Quote Request Started!',
                        'We\'ll gather your shipping details and provide a comprehensive quote within minutes.',
                        [
                          {
                            label: 'Continue',
                            onClick: () => window.location.href = '/free-moving-quote',
                            variant: 'primary'
                          }
                        ]
                      );
                    }}
                  >
                    <Truck className="me-2" size={20} />
                    {t('hero.ctaMain')}
                    <ArrowRight className="ms-2" size={16} />
                  </InteractiveButton>
                  
                  <MagneticButton 
                    className="btn-outline-light px-4 py-3 rounded-pill"
                    onClick={() => {
                      showInfo(
                        'Watch Our Service Demo',
                        'See how VIP International Shipping handles your precious items with care and professionalism.',
                        [
                          {
                            label: 'Play Video',
                            onClick: () => showInfo('Video Coming Soon!', 'Our interactive demo video will be available shortly.'),
                            variant: 'info'
                          }
                        ]
                      );
                    }}
                  >
                    <Play className="me-2" size={16} />
                    {t('hero.ctaSecondary')}
                  </MagneticButton>
                </div>
              </div>
            </Col>
            
            <Col lg={4} xl={5} className="d-none d-lg-block">
              <div className="hero-stats">
                <Row>
                  <Col sm={6} className="mb-4">
                    <Card className="bg-white bg-opacity-10 border-0 text-white text-center h-100">
                      <Card.Body>
                        <Clock size={32} className="text-warning mb-2" />
                        <h4 className="fw-bold mb-1">15+</h4>
                        <small>Years Experience</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-4">
                    <Card className="bg-white bg-opacity-10 border-0 text-white text-center h-100">
                      <Card.Body>
                        <Globe size={32} className="text-info mb-2" />
                        <h4 className="fw-bold mb-1">120+</h4>
                        <small>Countries</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-4">
                    <Card className="bg-white bg-opacity-10 border-0 text-white text-center h-100">
                      <Card.Body>
                        <Truck size={32} className="text-success mb-2" />
                        <h4 className="fw-bold mb-1">50K+</h4>
                        <small>Shipments</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-4">
                    <Card className="bg-white bg-opacity-10 border-0 text-white text-center h-100">
                      <Card.Body>
                        <Star size={32} className="text-warning mb-2" />
                        <h4 className="fw-bold mb-1">99.8%</h4>
                        <small>Satisfaction</small>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-light">
        <Container>
          <Row className="text-center">
            {[
              { icon: Clock, number: '15+', label: t('stats.experience'), color: 'primary' },
              { icon: Globe, number: '120+', label: t('stats.countries'), color: 'success' },
              { icon: Truck, number: '50,000+', label: t('stats.shipments'), color: 'info' },
              { icon: Award, number: '99.8%', label: t('stats.satisfaction'), color: 'warning' }
            ].map((stat, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <div className={`stat-item ${animateStats ? 'animate' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
                  <stat.icon size={48} className={`text-${stat.color} mb-3`} />
                  <h3 className="display-6 fw-bold mb-2">{stat.number}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">{t('services.title')}</h2>
              <p className="lead text-muted">{t('services.subtitle')}</p>
            </Col>
          </Row>
          
          <Row>
            {services.map((service, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <FloatingCard className="glass-card h-100 border-0 shadow-sm hover-lift perspective-card" delay={index * 200}>
                  <Card.Body className="text-center p-4 card-inner">
                    <div className="service-icon mb-3">
                      <PulseIcon color={`var(--color-${service.color})`}>
                        {service.icon}
                      </PulseIcon>
                    </div>
                    <h5 className="fw-bold mb-3">{service.title}</h5>
                    <p className="text-muted mb-4">{service.description}</p>
                    <InteractiveButton 
                      variant={`outline-${service.color}`}
                      size="sm"
                      className="rounded-pill"
                      onClick={() => {
                        if (service.title.includes('Express')) {
                          showPaymentSuccess('$299.99', 'ORD-' + Date.now());
                        } else {
                          showInfo(
                            `${service.title} Service`,
                            `Learn more about our ${service.title.toLowerCase()} shipping options and get a personalized quote.`,
                            [
                              {
                                label: 'Get Quote',
                                onClick: () => window.location.href = '/free-moving-quote',
                                variant: 'primary'
                              },
                              {
                                label: 'More Info',
                                onClick: () => showInfo('Service Details', 'Detailed information about this service will be shown here.'),
                                variant: 'outline-primary'
                              }
                            ]
                          );
                        }
                      }}
                    >
                      Learn More
                      <ArrowRight className="ms-2" size={14} />
                    </InteractiveButton>
                  </Card.Body>
                </FloatingCard>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">{t('testimonials.title')}</h2>
              <p className="lead text-muted">{t('testimonials.subtitle')}</p>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <Carousel indicators={false} className="testimonials-carousel">
                {testimonials.map((testimonial, index) => (
                  <Carousel.Item key={index}>
                    <Card className="border-0 shadow-lg">
                      <Card.Body className="p-5 text-center">
                        <div className="mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="text-warning" size={20} />
                          ))}
                        </div>
                        <blockquote className="h5 mb-4 text-muted fst-italic">
                          "{testimonial.comment}"
                        </blockquote>
                        <div className="d-flex align-items-center justify-content-center">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=007bff&color=fff&size=60`}
                            alt={testimonial.name}
                            className="rounded-circle me-3"
                            width="60"
                            height="60"
                          />
                          <div className="text-start">
                            <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                            <small className="text-muted">{testimonial.company}</small>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-gradient-primary text-white">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">{t('cta.title')}</h2>
              <p className="lead mb-4">{t('cta.subtitle')}</p>
              <Button 
                size="lg" 
                variant="light"
                className="px-5 py-3 rounded-pill fw-bold"
              >
                <Truck className="me-2" size={20} />
                {t('cta.button')}
                <ArrowRight className="ms-2" size={16} />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* AI ChatBot */}
      <ChatBot />

      {/* Custom Styles */}
      <style>{`
        .modern-home {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .hero-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
        }
        
        .hero-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,123,255,0.8) 0%, rgba(0,77,153,0.9) 100%);
          z-index: -1;
        }
        
        .hero-title {
          background: linear-gradient(135deg, #fff 0%, #e3f2fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 1s ease-out;
        }
        
        .hero-subtitle {
          animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        .hero-content p {
          animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        .hero-features {
          animation: fadeInUp 1s ease-out 0.6s both;
        }
        
        .hero-cta {
          animation: fadeInUp 1s ease-out 0.8s both;
        }
        
        .hero-stats {
          animation: fadeInRight 1s ease-out 1s both;
        }
        
        .btn-gradient {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          border: none;
          transition: all 0.3s ease;
        }
        
        .btn-gradient:hover {
          background: linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(238, 90, 36, 0.3);
        }
        
        .service-card {
          transition: all 0.3s ease;
          border-radius: 15px;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        
        .service-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 50%;
        }
        
        .stat-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .stat-item.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .testimonials-carousel .carousel-control-prev,
        .testimonials-carousel .carousel-control-next {
          width: 50px;
          height: 50px;
          background: rgba(0,123,255,0.1);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
        
        .hero-scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        
        .scroll-arrow {
          width: 2px;
          height: 40px;
          background: rgba(255,255,255,0.5);
          position: relative;
          animation: scrollBounce 2s infinite;
        }
        
        .scroll-arrow::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -3px;
          width: 8px;
          height: 8px;
          border-right: 2px solid rgba(255,255,255,0.5);
          border-bottom: 2px solid rgba(255,255,255,0.5);
          transform: rotate(45deg);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scrollBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            min-height: 80vh;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernHome;
