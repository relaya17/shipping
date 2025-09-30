import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import { 
  Box, 
  Shield, 
  CheckCircle, 
  Star,
  Clock,
  Tools,
  Award,
  Camera
} from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const PackingService: React.FC = () => {
  useEffect(() => {
    trackPageView('packing_service');
  }, []);

  const packingServices = [
    {
      icon: <Box size={48} className="text-primary" />,
      title: 'אריזה מלאה',
      description: 'אנחנו מארזים הכל - מהספל הקטן ועד הרהיט הגדול',
      price: '$15-25 לקופסה',
      duration: '1-2 ימים',
      includes: ['כל חומרי האריזה', 'תיוג מפורט', 'רשימת מלאי', 'ביטוח בזמן אריזה']
    },
    {
      icon: <Shield size={48} className="text-success" />,
      title: 'אריזת פריטים שבירים',
      description: 'התמחות באריזת חפצים עדינים ויקרי ערך',
      price: '$25-40 לפריט',
      duration: '2-4 שעות לפריט',
      includes: ['חומרי הגנה מיוחדים', 'אריזה כפולה', 'תיוג "שביר"', 'ביטוח מוגבר']
    },
    {
      id: 'partial',
      icon: <Tools size={48} className="text-info" />,
      title: 'אריזה חלקית',
      description: 'אתם מארזים, אנחנו עוזרים עם הפריטים המורכבים',
      price: '$200-400 ליום',
      duration: '4-8 שעות',
      includes: ['חומרי אריזה מקצועיים', 'הדרכה מקצועית', 'עזרה עם פריטים כבדים', 'ייעוץ אריזה']
    }
  ];

  const packingMaterials = [
    { name: 'קופסאות קרטון מחוזקות', icon: '📦', description: 'מגדלי 1-6, איכותיות ועמידות' },
    { name: 'נייר בועות', icon: '🫧', description: 'לפריטים שבירים ורגישים' },
    { name: 'נייר עטיפה', icon: '📰', description: 'לחפצים רגולים ולמילוי חללים' },
    { name: 'ניילון נצמד', icon: '📏', description: 'להגנה מפני לחות ואבק' },
    { name: 'קצף אריזה', icon: '🧽', description: 'לפריטים עדינים במיוחד' },
    { name: 'סרט אריזה', icon: '🎗️', description: 'חזק ועמיד לסגירת קופסאות' },
    { name: 'תוויות ומדבקות', icon: '🏷️', description: 'תיוג ברור וקריא' },
    { name: 'שקיות אריזה', icon: '👜', description: 'לפריטים קטנים ועדינים' }
  ];

  const packingTips = [
    'התחל עם החדרים שמשתמשים בהם הכי פחות',
    'ארוז חפץ אחד כבד עם כמה קלים באותה קופסה',
    'מלא חללים ריקים בנייר או בגדים רכים',
    'שים את הפריטים הכבדים בתחתית הקופסה',
    'אל תעמיס יותר מדי - 15-20 ק״ג לקופסה',
    'צלם פריטים יקרים לפני האריזה',
    'שמור רשימה של מה יש בכל קופסה',
    'ארוז בגדים בשקיות ואקום לחיסכון במקום'
  ];

  return (
    <Container className="my-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">
            <Box className="me-3 text-primary" />
            שירותי אריזה מקצועיים
          </h1>
          <p className="lead text-muted mb-4">
            אריזה מקצועית המבטיחה הגעה בטוחה של כל החפצים שלכם
          </p>
          <Badge bg="primary" className="me-2">מעל 20 שנות ניסיון</Badge>
          <Badge bg="success">0% נזקים באריזה מקצועית</Badge>
        </Col>
      </Row>

      {/* Services */}
      <Row className="mb-5">
        {packingServices.map((service, index) => (
          <Col lg={4} key={index} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="mb-3">
                  {service.icon}
                </div>
                <h4 className="mb-3">{service.title}</h4>
                <p className="text-muted mb-3">{service.description}</p>
                
                <div className="d-flex justify-content-between mb-3">
                  <div className="text-center">
                    <h6 className="text-success">{service.price}</h6>
                    <small className="text-muted">מחיר</small>
                  </div>
                  <div className="text-center">
                    <h6 className="text-info">{service.duration}</h6>
                    <small className="text-muted">משך זמן</small>
                  </div>
                </div>

                <h6 className="mb-3">כלול בשירות:</h6>
                <ListGroup className="list-group-flush mb-3">
                  {service.includes.map((item, itemIndex) => (
                    <ListGroup.Item key={itemIndex} className="border-0 px-0 py-1">
                      <CheckCircle size={16} className="text-success me-2" />
                      <small>{item}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <Button variant="primary" className="w-100">
                  בחר שירות זה
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Materials */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header>
              <h3 className="mb-0">
                <Tools className="me-2" />
                חומרי אריזה מקצועיים
              </h3>
            </Card.Header>
            <Card.Body>
              <Row>
                {packingMaterials.map((material, index) => (
                  <Col md={6} lg={3} key={index} className="mb-3">
                    <div className="d-flex align-items-center p-3 border rounded">
                      <span className="me-3" style={{ fontSize: '24px' }}>{material.icon}</span>
                      <div>
                        <h6 className="mb-1">{material.name}</h6>
                        <small className="text-muted">{material.description}</small>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Process */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header>
              <h4 className="mb-0">
                <Clock className="me-2" />
                תהליך האריזה
              </h4>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                <div className="d-flex mb-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>1</div>
                  <div>
                    <h6>סקר ראשוני</h6>
                    <small className="text-muted">הערכת החפצים ותכנון האריזה</small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>2</div>
                  <div>
                    <h6>הכנת חומרים</h6>
                    <small className="text-muted">הבאת כל חומרי האריזה הנדרשים</small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>3</div>
                  <div>
                    <h6>אריזה מקצועית</h6>
                    <small className="text-muted">אריזה מחדר לחדר עם תיוג</small>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>4</div>
                  <div>
                    <h6>רשימת מלאי</h6>
                    <small className="text-muted">תיעוד מפורט של כל הפריטים</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header>
              <h4 className="mb-0">
                <Star className="me-2" />
                טיפים לאריזה עצמית
              </h4>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {packingTips.map((tip, index) => (
                  <li key={index} className="mb-2">
                    <CheckCircle size={16} className="text-success me-2" />
                    <small>{tip}</small>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA */}
      <Row>
        <Col className="text-center">
          <Card className="border-primary bg-light">
            <Card.Body className="p-4">
              <h4 className="mb-3">מוכנים לשירות אריזה מקצועי?</h4>
              <p className="mb-4">
                חסכו זמן ואנרגיה עם שירות האריזה המקצועי שלנו
              </p>
              <Button variant="primary" size="lg" className="me-3">
                📦 הזמן שירות אריזה
              </Button>
              <Button variant="outline-success" size="lg">
                📞 ייעוץ אריזה חינם
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PackingService;
