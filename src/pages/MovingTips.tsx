import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Badge, Accordion, Button, Alert } from 'react-bootstrap';
import {
  Lightbulb,
  ExclamationTriangle,
  InfoCircle,
  Star,
  Clock,
  Box,
  FileText,
  Shield,
  Phone
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';
import { ROUTES } from '../routs/routes';

interface TipData {
  category: string;
  title: string;
  content: string;
  importance: 'high' | 'medium' | 'low';
  timeFrame: string;
}

const MovingTips: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackPageView('moving_tips');
  }, []);

  const tipIcons = [
    <Clock key="clock" size={24} className="text-primary" />,
    <Box key="box1" size={24} className="text-success" />,
    <FileText key="file1" size={24} className="text-warning" />,
    <Shield key="shield" size={24} className="text-danger" />,
    <InfoCircle key="info" size={24} className="text-info" />,
    <Box key="box2" size={24} className="text-primary" />,
    <FileText key="file2" size={24} className="text-warning" />,
    <Star key="star" size={24} className="text-success" />
  ];

  const tipData = t('pages.movingTips.tips', { returnObjects: true }) as TipData[];

  const tips = tipData.map((tip, index) => ({
    id: String(index + 1),
    ...tip,
    icon: tipIcons[index]
  }));

  const categories = useMemo(() => {
    const unique = Array.from(new Set(tipData.map((tip) => tip.category)));
    return ['all', ...unique];
  }, [tipData]);

  useEffect(() => {
    setSelectedCategory('all');
  }, [i18n.language]);

  const filteredTips = selectedCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === selectedCategory);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getImportanceText = (importance: string) => {
    switch (importance) {
      case 'high': return t('pages.movingTips.importanceHigh');
      case 'medium': return t('pages.movingTips.importanceMedium');
      case 'low': return t('pages.movingTips.importanceLow');
      default: return '';
    }
  };

  return (
    <main id="main-content">
      <Container className="my-5">
        {/* Hero */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 mb-3">
              <Lightbulb className="me-3 text-warning" />
              {t('pages.movingTips.title')}
            </h1>
            <p className="lead text-muted mb-4">
              {t('pages.movingTips.subtitle')}
            </p>
            <Badge bg="warning" className="me-2">Expert tips</Badge>
            <Badge bg="success">From industry professionals</Badge>
          </Col>
        </Row>

        {/* Filter */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  aria-label={`${t('common.filter')}: ${category === 'all' ? t('pages.movingTips.allCategories') : category}`}
                >
                  {category === 'all' ? t('pages.movingTips.allCategories') : category}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Tips */}
        <Row>
          <Col>
            <Accordion defaultActiveKey="0">
              {filteredTips.map((tip, index) => (
                <Accordion.Item key={tip.id} eventKey={index.toString()}>
                  <Accordion.Header>
                    <div className="d-flex align-items-center w-100">
                      <div className="me-3">
                        {tip.icon}
                      </div>
                      <div className="flex-grow-1">
                        <strong>{tip.title}</strong>
                        <div className="d-flex gap-2 mt-1">
                          <Badge bg={getImportanceColor(tip.importance)}>
                            {getImportanceText(tip.importance)}
                          </Badge>
                          <Badge bg="light" text="dark">
                            {tip.timeFrame}
                          </Badge>
                          <Badge bg="secondary">
                            {tip.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">{tip.content}</p>
                    <div className="bg-light p-3 rounded">
                      <small className="text-muted">
                        <InfoCircle className="me-2" />
                        <strong>{t('pages.movingTips.timeframe')}</strong> {tip.timeFrame}
                      </small>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>

        {/* Emergency Tips */}
        <Row className="mt-5">
          <Col>
            <Alert variant="warning">
              <ExclamationTriangle className="me-2" />
              <strong>Emergency tips:</strong>
              <ul className="mt-2 mb-0">
                <li>Save important phone numbers for quick access</li>
                <li>Pack a carry-on bag with essential documents</li>
                <li>Make sure you have temporary health insurance</li>
                <li>Create a contact list of key people in your new country</li>
              </ul>
            </Alert>
          </Col>
        </Row>

        {/* CTA */}
        <Row className="mt-5">
          <Col className="text-center">
            <Card className="border-primary">
              <Card.Body className="p-4">
                <h4 className="mb-3">Need professional advice?</h4>
                <p className="mb-4">
                  Our team is available for advice and support at every stage of your move
                </p>
                <Button as={Link as never} to={ROUTES.CONTACT} variant="primary" size="lg" className="me-3">
                  <Phone className="me-2" />
                  {t('cta.call_now')}
                </Button>
                <Button as={Link as never} to={ROUTES.FREE_MOVING_QUOTE} variant="outline-success" size="lg">
                  {t('cta.get_quote')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MovingTips;
