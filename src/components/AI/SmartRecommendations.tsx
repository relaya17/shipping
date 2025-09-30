import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
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
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // סימולציה של AI שמנתח התנהגות משתמש וממליץ
  useEffect(() => {
    // סימולציה של זמן טעינה
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'הובלה לאירופה',
          description: 'תבסס על החיפושים שלך, אנו ממליצים על שירות הובלה מהירה לאירופה עם מעקב בזמן אמת.',
          icon: <Globe size={24} />,
          category: 'מסע',
          priority: 'high',
          estimatedTime: '7-14 ימים',
          price: 'מחל $800'
        },
        {
          id: '2',
          title: 'ביטוח מקיף',
          description: 'למשלוחים יקרי ערך, אנו ממליצים על ביטוח מקיף שיכסה את כל הנזקים האפשריים.',
          icon: <Shield size={24} />,
          category: 'ביטוח',
          priority: 'high',
          price: '3% מערך המשלוח'
        },
        {
          id: '3',
          title: 'שירות אריזה מקצועי',
          description: 'האריזה המקצועית שלנו מבטיחה שמירה מקסימלית על החפצים שלך במהלך המסע.',
          icon: <Truck size={24} />,
          category: 'שירותים',
          priority: 'medium',
          estimatedTime: '1-2 ימים',
          price: 'מחל $200'
        },
        {
          id: '4',
          title: 'אחסון זמני',
          description: 'אם אתה צריך זמן נוסף לפני המעבר, אנו מציעים שירותי אחסון זמני במתקנים מאובטחים.',
          icon: <Clock size={24} />,
          category: 'אחסון',
          priority: 'low',
          price: 'מחל $50/חודש'
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
      case 'high': return 'עדיפות גבוהה';
      case 'medium': return 'עדיפות בינונית';
      case 'low': return 'עדיפות נמוכה';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">
            <Star className="me-2" />
            המלצות חכמות עבורך
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">טוען...</span>
            </div>
            <p className="mt-2">מנתח את הצרכים שלך...</p>
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
          המלצות חכמות עבורך
          <Badge bg="primary" className="ms-2">AI Powered</Badge>
        </h5>
        <small className="text-muted">
          המלצות מותאמות אישית בהתבסס על ההתנהגות והצרכים שלך
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
                        <span className="badge bg-success me-2">מחיר</span>
                        <small className="fw-bold text-success">{rec.price}</small>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="w-100"
                    aria-label={`למד עוד על ${rec.title}`}
                  >
                    למד עוד
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-3">
          <small className="text-muted">
            <Star className="me-1" />
            המלצות אלו מבוססות על ניתוח AI של ההתנהגות והצרכים שלך
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SmartRecommendations;
