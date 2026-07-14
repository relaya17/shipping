import React, { useMemo } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Clock, Shield, Truck, Globe } from 'react-bootstrap-icons';
import { ROUTES } from '../../routs/routes';

type Priority = 'high' | 'medium' | 'low';

/**
 * Home recommendations — all copy from i18n so language switches update immediately.
 */
const SmartRecommendations: React.FC = () => {
  const { t, i18n } = useTranslation();

  const recommendations = useMemo(() => {
    // i18n.language in deps so cards rebuild on language change
    void i18n.language;
    return [
      {
        id: '1',
        title: t('services.household'),
        description: t('home.rec_household_desc'),
        icon: <Globe size={24} />,
        priority: 'high' as Priority,
        estimatedTime: t('home.rec_household_time'),
        price: t('home.rec_household_price'),
        to: ROUTES.INTERNATIONAL_HOUSEHOLD_MOVERS,
      },
      {
        id: '2',
        title: t('services.insurance'),
        description: t('home.rec_insurance_desc'),
        icon: <Shield size={24} />,
        priority: 'high' as Priority,
        price: t('home.rec_insurance_price'),
        to: ROUTES.MOVING_INSURANCE,
      },
      {
        id: '3',
        title: t('services.packing'),
        description: t('home.rec_packing_desc'),
        icon: <Truck size={24} />,
        priority: 'medium' as Priority,
        estimatedTime: t('home.rec_packing_time'),
        price: t('home.rec_packing_price'),
        to: ROUTES.PACKING_SERVICE,
      },
      {
        id: '4',
        title: t('services.storage'),
        description: t('home.rec_storage_desc'),
        icon: <Clock size={24} />,
        priority: 'low' as Priority,
        price: t('home.rec_storage_price'),
        to: ROUTES.MOVING_SERVICES,
      }
    ];
  }, [t, i18n.language]);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case 'high': return t('home.priority_high');
      case 'medium': return t('home.priority_medium');
      case 'low': return t('home.priority_low');
      default: return '';
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h2 className="h5 mb-0">
          <Star className="me-2" aria-hidden="true" />
          {t('ai.recommendations')}
          <Badge bg="primary" className="ms-2">{t('ai.powered_by_ai')}</Badge>
        </h2>
        <small className="text-muted">{t('ai.smart_suggestions')}</small>
      </Card.Header>
      <Card.Body>
        <Row>
          {recommendations.map((rec) => (
            <Col md={6} lg={4} key={rec.id} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3 text-primary" aria-hidden="true">{rec.icon}</div>
                    <div className="flex-grow-1">
                      <h3 className="h6 card-title mb-1">{rec.title}</h3>
                      <Badge bg={getPriorityColor(rec.priority)} className="mb-2">
                        {getPriorityText(rec.priority)}
                      </Badge>
                    </div>
                  </div>

                  <p className="card-text text-muted small mb-3">{rec.description}</p>

                  <div className="mb-3">
                    {rec.estimatedTime && (
                      <div className="d-flex align-items-center mb-1">
                        <Clock size={14} className="me-2 text-muted" aria-hidden="true" />
                        <small className="text-muted">{rec.estimatedTime}</small>
                      </div>
                    )}
                    {rec.price && (
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success me-2">{t('home.price_label')}</span>
                        <small className="fw-bold text-success">{rec.price}</small>
                      </div>
                    )}
                  </div>

                  <Button
                    as={Link as never}
                    to={rec.to}
                    variant="outline-primary"
                    size="sm"
                    className="w-100"
                    aria-label={`${t('common.view')}: ${rec.title}`}
                  >
                    {t('common.view')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-3">
          <small className="text-muted">
            <Star className="me-1" aria-hidden="true" />
            {t('ai.powered_by_ai')}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SmartRecommendations;
