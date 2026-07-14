import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import {
  Globe,
  Award,
  ShieldCheck,
  People,
  Truck,
  Clock,
  Star,
  CheckCircle
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';
import '../About.css';

interface AboutFeature {
  title: string;
  description: string;
}

interface AboutTimelineItem {
  year: string;
  event: string;
  milestone: string;
}

interface AboutTeamMember {
  name: string;
  position: string;
  experience: string;
  specialty: string;
}

interface AboutStats {
  experience: string;
  countries: string;
  shipments: string;
  satisfaction: string;
}

const About: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('about');
  }, []);

  const statsLabels = t('pages.about.stats', { returnObjects: true }) as AboutStats;
  const features = t('pages.about.features', { returnObjects: true }) as AboutFeature[];
  const timeline = t('pages.about.timeline', { returnObjects: true }) as AboutTimelineItem[];
  const team = t('pages.about.team', { returnObjects: true }) as AboutTeamMember[];

  const featureIcons = [
    <ShieldCheck key="shield" size={48} className="text-success" />,
    <Globe key="globe" size={48} className="text-primary" />,
    <Truck key="truck" size={48} className="text-info" />,
    <Star key="star" size={48} className="text-warning" />
  ];

  const stats = [
    { number: '15+', label: statsLabels.experience, icon: <Clock size={32} />, color: 'primary' },
    { number: '120+', label: statsLabels.countries, icon: <Globe size={32} />, color: 'success' },
    { number: '50,000+', label: statsLabels.shipments, icon: <Truck size={32} />, color: 'info' },
    { number: '99.8%', label: statsLabels.satisfaction, icon: <Award size={32} />, color: 'warning' }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'International quality management', year: '2018' },
    { name: 'TAPA FSR', desc: 'High-level cargo security', year: '2020' },
    { name: 'IATA DGR', desc: 'Dangerous goods air transport', year: '2019' },
    { name: 'AEO Certificate', desc: 'Authorized Economic Operator', year: '2021' }
  ];

  return (
    <main id="main-content">
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">{t('about.title')}</h1>
            <p className="lead text-muted mb-4">{t('about.description')}</p>
            <Badge bg="primary" className="me-2">ISO 9001</Badge>
            <Badge bg="success" className="me-2">FMC licensed</Badge>
            <Badge bg="info">AI powered</Badge>
          </Col>
        </Row>

        <Row className="mb-5">
          {stats.map((stat) => (
            <Col md={6} lg={3} key={stat.label} className="mb-3">
              <Card className={`text-center border-${stat.color} shadow-sm h-100`}>
                <Card.Body className="p-4">
                  <div className={`text-${stat.color} mb-3`}>{stat.icon}</div>
                  <h2 className={`h3 text-${stat.color} mb-2`}>{stat.number}</h2>
                  <p className="text-muted mb-0 fw-semibold">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <section className="mb-5" aria-labelledby="journey-heading">
          <Row className="text-center mb-4">
            <Col>
              <h2 id="journey-heading" className="mb-3">{t('pages.about.journeyTitle')}</h2>
              <p className="text-muted lead">{t('pages.about.journeySubtitle')}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={10} className="mx-auto">
              {timeline.map((item) => (
                <Card key={item.year} className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge bg="primary" className="fs-6 px-3 py-2">{item.year}</Badge>
                      <Badge bg="secondary">{item.milestone}</Badge>
                    </div>
                    <p className="mb-0 fw-semibold">{item.event}</p>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </section>

        <section className="bg-light rounded-3 p-4 mb-5" aria-labelledby="certs-heading">
          <Row className="text-center mb-4">
            <Col>
              <h2 id="certs-heading" className="h3 mb-3">
                <ShieldCheck className="me-2 text-success" aria-hidden="true" />
                International certifications
              </h2>
              <p className="text-muted">Credentials that reflect our quality standards</p>
            </Col>
          </Row>
          <Row>
            {certifications.map((cert) => (
              <Col md={6} lg={3} key={cert.name} className="mb-3">
                <Card className="h-100 border-success shadow-sm">
                  <Card.Body className="text-center p-3">
                    <CheckCircle className="text-success mb-2" size={24} aria-hidden="true" />
                    <h3 className="h6 text-success fw-bold">{cert.name}</h3>
                    <p className="small text-muted mb-1">{cert.desc}</p>
                    <Badge bg="light" text="success">Since {cert.year}</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <h2 className="mb-4">{t('pages.about.storyTitle')}</h2>
            <p className="mb-3">{t('pages.about.storyP1')}</p>
            <p className="mb-3">{t('pages.about.storyP2')}</p>
            <p className="mb-4">{t('pages.about.storyP3')}</p>
          </Col>
          <Col lg={6}>
            <img
              src="/images/company-story.jpg"
              alt="VIP International Shipping team and operations"
              className="img-fluid rounded"
            />
          </Col>
        </Row>

        <h2 className="text-center mb-5">{t('pages.about.whyTitle')}</h2>
        <Row className="mb-5">
          {features.map((feature, index) => (
            <Col md={6} lg={3} key={feature.title} className="mb-4">
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">{featureIcons[index]}</div>
                  <h3 className="h5 mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="text-center mb-5">{t('pages.about.teamTitle')}</h2>
        <Row className="mb-5">
          {team.map((member) => (
            <Col md={4} key={member.name} className="mb-4">
              <Card className="text-center border-0 shadow-sm">
                <div className="p-4">
                  <div
                    className="rounded-circle mx-auto mb-3 bg-light d-flex align-items-center justify-content-center"
                    style={{ width: 100, height: 100 }}
                  >
                    <People size={40} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="h5 mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.position}</p>
                  <Badge bg="light" text="dark" className="mb-2">{member.experience}</Badge>
                  <p className="text-muted small">{member.specialty}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <section className="bg-primary text-white rounded-3 p-5 mb-5">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="h3 mb-3">{t('pages.about.ctaTitle')}</h2>
              <p className="lead mb-4">{t('pages.about.ctaBody')}</p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="light" size="lg">
                  {t('cta.get_quote')}
                </Button>
                <Button as={Link as never} to={ROUTES.CONTACT} variant="outline-light" size="lg">
                  {t('cta.free_consult')}
                </Button>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default About;
