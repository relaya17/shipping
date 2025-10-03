import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Star, Clock, Shield, Truck, Globe } from 'react-bootstrap-icons';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  price?: string;
}

const SmartRecommendations: React.FC = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation of AI analyzing user behavior and recommendations
  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: t('services.household'),
          description: t('ai.recommendations') + ' - ' + t('services.household'),
          icon: <Globe size={24} />,
          category: 'Travel',
          priority: 'high',
          estimatedTime: '7-14 days',
          price: 'From $800'
        },
        {
          id: '2',
          title: t('services.insurance'),
          description: t('ai.recommendations') + ' - ' + t('services.insurance'),
          icon: <Shield size={24} />,
          category: 'Insurance',
          priority: 'high',
          price: '3% of shipment value'
        },
        {
          id: '3',
          title: t('services.packing'),
          description: t('ai.recommendations') + ' - ' + t('services.packing'),
          icon: <Truck size={24} />,
          category: 'Services',
          priority: 'medium',
          estimatedTime: '1-2 days',
          price: 'From $200'
        },
        {
          id: '4',
          title: t('services.storage'),
          description: t('ai.recommendations') + ' - ' + t('services.storage'),
          icon: <Clock size={24} />,
          category: 'Storage',
          priority: 'low',
          price: 'From $50/month'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">
            <Star className="me-2" />
            Smart Recommendations For You
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Analyzing your needs...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">
            <Star className="me-2" />
            {t('ai.recommendations')}
            <Badge bg="primary" className="ms-2">{t('ai.powered_by_ai')}</Badge>
          </h5>
          <small className="text-muted">
            {t('ai.smart_suggestions')}
          </small>
        </Card.Header>
      <Card.Body>
        <Row>
          {recommendations.map((rec) => (
            <Col md={6} lg={4} key={rec.id} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3 text-primary">
                      {rec.icon}
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="card-title mb-1">{rec.title}</h6>
                      <Badge 
                        bg={getPriorityColor(rec.priority)} 
                        className="mb-2"
                      >
                        {getPriorityText(rec.priority)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="card-text text-muted small mb-3">
                    {rec.description}
                  </p>
                  
                  <div className="mb-3">
                    {rec.estimatedTime && (
                      <div className="d-flex align-items-center mb-1">
                        <Clock size={14} className="me-2 text-muted" />
                        <small className="text-muted">{rec.estimatedTime}</small>
                      </div>
                    )}
                    {rec.price && (
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success me-2">Price</span>
                        <small className="fw-bold text-success">{rec.price}</small>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="w-100"
                    aria-label={t('common.view')}
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
            <Star className="me-1" />
            {t('ai.powered_by_ai')}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SmartRecommendations;
