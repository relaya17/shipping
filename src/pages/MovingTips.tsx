import React, { useEffect, useState } from 'react';
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
import { trackPageView } from '../utils/analytics';

interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
  importance: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  timeFrame: string;
}

const MovingTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackPageView('moving_tips');
  }, []);

  const tips: Tip[] = [
    {
      id: '1',
      category: 'תכנון',
      title: 'התחל לתכנן מוקדם',
      content: 'התחל לתכנן את ההובלה לפחות 8 שבועות לפני המועד המתוכנן. זה יאפשר לך לקבל הצעות מחיר טובות יותר ולהיערך כראוי.',
      importance: 'high',
      icon: <Clock size={24} className="text-primary" />,
      timeFrame: '8 שבועות לפני'
    },
    {
      id: '2',
      category: 'אריזה',
      title: 'אריזה מקצועית',
      content: 'השתמש בחומרי אריזה איכותיים. עטוף פריטים שבירים בנייר בועות ומלא חללים ריקים בקרטון.',
      importance: 'high',
      icon: <Box size={24} className="text-success" />,
      timeFrame: '4 שבועות לפני'
    },
    {
      id: '3',
      category: 'ניירת',
      title: 'ציינים וניירות',
      content: 'הכן רשימה מפורטת של כל הפריטים, צלם חפצים יקרים לביטוח, והכן העתקים של מסמכים חשובים.',
      importance: 'high',
      icon: <FileText size={24} className="text-warning" />,
      timeFrame: '6 שבועות לפני'
    },
    {
      id: '4',
      category: 'ביטוח',
      title: 'ביטוח מקיף',
      content: 'השקיע בביטוח מקיף למשלוח. זה יכסה נזקים או אובדן של חפצים יקרי ערך במהלך ההובלה.',
      importance: 'high',
      icon: <Shield size={24} className="text-danger" />,
      timeFrame: '2 שבועות לפני'
    },
    {
      id: '5',
      category: 'תכנון',
      title: 'חקור את המדינה החדשה',
      content: 'למד על חוקי המכס, מזג האוויר, ותרבות המקום. זה יעזור לך להיערך טוב יותר לחיים החדשים.',
      importance: 'medium',
      icon: <InfoCircle size={24} className="text-info" />,
      timeFrame: '12 שבועות לפני'
    },
    {
      id: '6',
      category: 'אריזה',
      title: 'תייג קופסאות בבירור',
      content: 'כתב על כל קופסה את התוכן והחדר של היעד. השתמש בצבעים שונים לחדרים שונים.',
      importance: 'medium',
      icon: <Box size={24} className="text-primary" />,
      timeFrame: '3 שבועות לפני'
    },
    {
      id: '7',
      category: 'ניירת',
      title: 'שמור מסמכים חשובים איתך',
      content: 'דרכון, ויזה, מסמכי רפואה ופיננסיים - שמור בתיק נפרד שנוסע איתך ולא במשלוח.',
      importance: 'high',
      icon: <FileText size={24} className="text-warning" />,
      timeFrame: 'יום ההובלה'
    },
    {
      id: '8',
      category: 'תכנון',
      title: 'תכנן את היום הראשון',
      content: 'הכן תוכנית לימים הראשונים במקום החדש: מקום לינה, מזון בסיסי, ואמצעי תחבורה.',
      importance: 'medium',
      icon: <Star size={24} className="text-success" />,
      timeFrame: '1 שבוע לפני'
    }
  ];

  const categories = ['all', 'תכנון', 'אריזה', 'ניירת', 'ביטוח'];
  
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
      case 'high': return 'חשוב מאוד';
      case 'medium': return 'חשוב';
      case 'low': return 'רצוי';
      default: return '';
    }
  };

  return (
    <Container className="my-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">
            <Lightbulb className="me-3 text-warning" />
            טיפים להובלה בינלאומית
          </h1>
          <p className="lead text-muted mb-4">
            כל מה שאתם צריכים לדעת להובלה בינלאומית מוצלחת וחלקה
          </p>
          <Badge bg="warning" className="me-2">טיפים מקצועיים</Badge>
          <Badge bg="success">ממומחים בתחום</Badge>
        </Col>
      </Row>

      {/* Filter */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                aria-label={`סנן לפי ${category}`}
              >
                {category === 'all' ? 'הכל' : category}
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
                      <strong>מתי לבצע:</strong> {tip.timeFrame}
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
            <strong>טיפים חירום:</strong>
            <ul className="mt-2 mb-0">
              <li>שמור מספרי טלפון חשובים בקישור מהיר</li>
              <li>הכן תיק עם מסמכים חיוניים בנשיאה</li>
              <li>ודא שיש לך ביטוח בריאות זמני</li>
              <li>צור רשימת קשר של אנשי מפתח במדינה החדשה</li>
            </ul>
          </Alert>
        </Col>
      </Row>

      {/* CTA */}
      <Row className="mt-5">
        <Col className="text-center">
          <Card className="border-primary">
            <Card.Body className="p-4">
              <h4 className="mb-3">זקוק לייעוץ מקצועי?</h4>
              <p className="mb-4">
                הצוות המקצועי שלנו זמין לייעוץ ותמיכה בכל שלב של ההובלה
              </p>
              <Button variant="primary" size="lg" className="me-3">
                <Phone className="me-2" />
                התקשר למומחה
              </Button>
              <Button variant="outline-success" size="lg">
                📝 קבל מדריך PDF
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovingTips;
