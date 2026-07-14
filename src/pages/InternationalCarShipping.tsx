import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Alert } from 'react-bootstrap';
import { 
  Truck, 
  Globe, 
  Shield, 
  Clock, 
  CheckCircle,
  InfoCircle,
  Calculator
} from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const InternationalCarShipping: React.FC = () => {
  useEffect(() => {
    trackPageView('international_car_shipping');
  }, []);

  const shippingOptions = [
    {
      type: 'RoRo (Roll-on/Roll-off)',
      description: 'הרכב נוסע על הסיפון של האוניה',
      price: '$800 - $1,500',
      duration: '2-4 שבועות',
      pros: ['זול יותר', 'מהיר יותר', 'פחות טיפול'],
      cons: ['חשוף למזג אוויר', 'יותר סיכונים']
    },
    {
      type: 'Container Shipping',
      description: 'הרכב נשלח במכולה סגורה',
      price: '$1,200 - $2,500',
      duration: '3-6 שבועות',
      pros: ['הגנה מלאה', 'בטוח יותר', 'מקום לחפצים נוספים'],
      cons: ['יקר יותר', 'לוקח יותר זמן']
    }
  ];

  const destinations = [
    { country: 'גרמניה', port: 'המבורג', duration: '3-4 שבועות', price: '$1,200' },
    { country: 'בריטניה', port: 'סאות\'המפטון', duration: '2-3 שבועות', price: '$1,100' },
    { country: 'אוסטרליה', port: 'סידני', duration: '4-6 שבועות', price: '$1,800' },
    { country: 'יפן', port: 'יוקוהמה', duration: '3-5 שבועות', price: '$1,600' }
  ];

  const requirements = [
    'רישיון נהיגה בתוקף',
    'רישום הרכב (Title)',
    'ביטוח בתוקף',
    'העתק דרכון',
    'חשבונית מקורית של הרכב',
    'הצהרה על ערך הרכב'
  ];

  return (
    <Container className="my-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">
            <Truck className="me-3 text-primary" />
            הובלת רכבים בינלאומית
          </h1>
          <p className="lead text-muted mb-4">
            שירותי הובלת רכבים מקצועיים לכל העולם עם ביטוח מלא וטיפול אישי
          </p>
          <Badge bg="primary" className="me-2">מעל 5,000 רכבים בשנה</Badge>
          <Badge bg="success">99.5% הגעה ללא נזק</Badge>
        </Col>
      </Row>

      {/* Shipping Options */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">אפשרויות משלוח</h2>
        </Col>
      </Row>
      <Row>
        {shippingOptions.map((option, index) => (
          <Col lg={6} key={index} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-3">
                  <Truck size={48} className="text-primary" />
                </div>
                <h4 className="text-center mb-3">{option.type}</h4>
                <p className="text-muted text-center mb-3">{option.description}</p>
                
                <div className="d-flex justify-content-between mb-3">
                  <div className="text-center">
                    <h6 className="text-success">{option.price}</h6>
                    <small className="text-muted">מחיר</small>
                  </div>
                  <div className="text-center">
                    <h6 className="text-info">{option.duration}</h6>
                    <small className="text-muted">משך זמן</small>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-success">יתרונות:</h6>
                  <ul className="list-unstyled">
                    {option.pros.map((pro, proIndex) => (
                      <li key={proIndex} className="mb-1">
                        <CheckCircle size={16} className="text-success me-2" />
                        <small>{pro}</small>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h6 className="text-warning">חסרונות:</h6>
                  <ul className="list-unstyled">
                    {option.cons.map((con, conIndex) => (
                      <li key={conIndex} className="mb-1">
                        <InfoCircle size={16} className="text-warning me-2" />
                        <small>{con}</small>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="primary" className="w-100">
                  בחר אפשרות זו
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Destinations */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header>
              <h3 className="mb-0">
                <Globe className="me-2" />
                יעדים פופולריים
              </h3>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>מדינה</th>
                    <th>נמל יעד</th>
                    <th>משך זמן</th>
                    <th>מחיר החל מ-</th>
                    <th>פעולה</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((dest, index) => (
                    <tr key={index}>
                      <td><strong>{dest.country}</strong></td>
                      <td>{dest.port}</td>
                      <td>
                        <Badge bg="info">{dest.duration}</Badge>
                      </td>
                      <td className="text-success fw-bold">{dest.price}</td>
                      <td>
                        <Button variant="outline-primary" size="sm">
                          <Calculator className="me-1" />
                          חשב מחיר
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Requirements */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h4 className="mb-4">
                <Shield className="me-2 text-success" />
                מסמכים נדרשים
              </h4>
              <ul className="list-unstyled">
                {requirements.map((req, index) => (
                  <li key={index} className="mb-2">
                    <CheckCircle size={16} className="text-success me-2" />
                    {req}
                  </li>
                ))}
              </ul>
              <Alert variant="warning" className="mt-3">
                <InfoCircle className="me-2" />
                <small>
                  <strong>חשוב:</strong> כל המסמכים חייבים להיות באנגלית או מתורגמים רשמית
                </small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h4 className="mb-4">
                <Clock className="me-2 text-primary" />
                תהליך ההובלה
              </h4>
              <div className="timeline">
                <div className="d-flex mb-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>1</div>
                  <div>
                    <h6>הזמנה ותשלום</h6>
                    <small className="text-muted">הזמנת השירות ותשלום מקדמה</small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>2</div>
                  <div>
                    <h6>איסוף הרכב</h6>
                    <small className="text-muted">איסוף מהמקום שתבחר</small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>3</div>
                  <div>
                    <h6>הכנה למשלוח</h6>
                    <small className="text-muted">בדיקה ותיעוד מצב הרכב</small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>4</div>
                  <div>
                    <h6>משלוח בינלאומי</h6>
                    <small className="text-muted">הובלה עם מעקב בזמן אמת</small>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>5</div>
                  <div>
                    <h6>משלוח ליעד</h6>
                    <small className="text-muted">הגעה ומסירה ליעד הסופי</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA */}
      <Row>
        <Col className="text-center">
          <Card className="border-primary bg-light">
            <Card.Body className="p-4">
              <h4 className="mb-3">מוכנים לשלוח את הרכב שלכם?</h4>
              <p className="mb-4">
                קבלו הצעת מחיר מותאמת אישית ותתחילו את התהליך עוד היום
              </p>
              <Button variant="primary" size="lg" className="me-3">
                <Calculator className="me-2" />
                חשב מחיר רכב
              </Button>
              <Button variant="outline-success" size="lg">
                📞 ייעוץ מקצועי
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InternationalCarShipping;