import React, { useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Alert, Badge, ListGroup } from 'react-bootstrap';
import { UniversalAccess, CheckCircle, Eye, Ear, Keyboard, Phone } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';

type AccessibilityGoal = { title: string; body: string };
type FeatureGroup = { title: string; items: string[] };

const FEATURE_GROUP_ICONS = [
  <Keyboard key="keyboard" className="me-2" />,
  <Eye key="eye" className="me-2" />,
  <Ear key="ear" className="me-2" />,
  <CheckCircle key="content" className="me-2" />,
  <Phone key="phone" className="me-2" />,
  <CheckCircle key="forms" className="me-2" />
];

const AccessibilityStatement: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('accessibility_statement');
    window.scrollTo(0, 0);
  }, []);

  const goals = useMemo(() => {
    const items = t('pages.accessibilityStatement.goals', { returnObjects: true });
    return Array.isArray(items) ? (items as AccessibilityGoal[]) : [];
  }, [t, i18n.language]);

  const featureGroups = useMemo(() => {
    const items = t('pages.accessibilityStatement.featureGroups', { returnObjects: true });
    return Array.isArray(items) ? (items as FeatureGroup[]) : [];
  }, [t, i18n.language]);

  const limitations = useMemo(() => {
    const items = t('pages.accessibilityStatement.limitations', { returnObjects: true });
    return Array.isArray(items) ? (items as string[]) : [];
  }, [t, i18n.language]);

  const ongoing = useMemo(() => {
    const items = t('pages.accessibilityStatement.ongoing', { returnObjects: true });
    return Array.isArray(items) ? (items as string[]) : [];
  }, [t, i18n.language]);

  const lastUpdated = new Date().toLocaleDateString(i18n.language || 'en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="text-center mb-5">
            <UniversalAccess size={60} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold mb-3">{t('pages.accessibilityStatement.title')}</h1>
            <p className="lead text-muted">{t('pages.accessibilityStatement.subtitle')}</p>
            <div className="mt-3">
              <Badge bg="warning" text="dark" className="me-2">{t('accessibility.goal_wcag')}</Badge>
              <Badge bg="secondary" className="me-2">{t('accessibility.goal_ada')}</Badge>
              <Badge bg="secondary" className="me-2">{t('accessibility.goal_508')}</Badge>
            </div>
            <p className="text-muted mt-3 small">{t('pages.accessibilityStatement.badgesNote')}</p>
            <p className="text-muted mt-3">
              {t('pages.accessibilityStatement.lastUpdated')}: {lastUpdated}
            </p>
          </div>

          <Alert variant="info" className="mb-4">
            <UniversalAccess size={20} className="me-2" />
            <strong>{t('pages.accessibilityStatement.commitmentTitle')}:</strong>{' '}
            {t('pages.accessibilityStatement.commitmentBody')}
          </Alert>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <UniversalAccess className="text-primary me-2" />
                {t('pages.accessibilityStatement.goalsTitle')}
              </h2>

              <p className="mb-3">{t('pages.accessibilityStatement.goalsIntro')}</p>

              <ListGroup className="mb-4">
                {goals.map((goal) => (
                  <ListGroup.Item key={goal.title} className="d-flex align-items-start">
                    <UniversalAccess className="text-primary me-3 mt-1" size={20} />
                    <div>
                      <strong>{goal.title}</strong>
                      <p className="mb-0 text-muted">{goal.body}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Alert variant="info" className="mb-0">
                {t('pages.accessibilityStatement.goalsStatus')}
              </Alert>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Eye className="text-primary me-2" />
                {t('pages.accessibilityStatement.featuresTitle')}
              </h2>

              <Row>
                {featureGroups.map((group, index) => (
                  <Col key={group.title} md={6}>
                    <h3 className="h5 mb-3">
                      {FEATURE_GROUP_ICONS[index] ?? <CheckCircle className="me-2" />}
                      {group.title}
                    </h3>
                    <ul className="mb-4">
                      {(group.items || []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Phone className="text-primary me-2" />
                {t('pages.accessibilityStatement.feedbackTitle')}
              </h2>

              <p className="mb-3">{t('pages.accessibilityStatement.feedbackBody')}</p>

              <div className="bg-light p-4 rounded mb-0">
                <p className="mb-2">
                  <strong>{t('contact.email')}:</strong>{' '}
                  <a href={`mailto:${t('pages.accessibilityStatement.feedbackEmail')}`}>
                    {t('pages.accessibilityStatement.feedbackEmail')}
                  </a>
                </p>
                <p className="mb-0">{t('pages.accessibilityStatement.responseTime')}</p>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">{t('pages.accessibilityStatement.limitationsTitle')}</h2>

              <ul className="mb-3">
                {limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>

              <Alert variant="info" className="mb-0">
                {t('pages.accessibilityStatement.limitationsNote')}
              </Alert>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <UniversalAccess className="text-primary me-2" />
                {t('pages.accessibilityStatement.ongoingTitle')}
              </h2>

              <ul className="mb-3">
                {ongoing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <Alert variant="warning" className="mb-0">
                {t('pages.accessibilityStatement.ongoingNote')}
              </Alert>
            </Card.Body>
          </Card>

          <Alert variant="primary" className="mt-4">
            <UniversalAccess size={24} className="me-2" />
            <strong>{t('pages.accessibilityStatement.contactTitle')}:</strong>{' '}
            {t('pages.accessibilityStatement.contactBody')}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatement;
