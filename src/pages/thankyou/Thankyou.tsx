import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CheckCircle, Download, House } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';

const Thankyou: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('thank_you');
  }, []);

  const handleDownloadQuote = () => {
    // לוגיקה להורדת הצעת מחיר
    const orderDetails = localStorage.getItem('orderDetails');
    if (orderDetails) {
      const blob = new Blob([orderDetails], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quote-details.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow-lg">
            <Card.Body className="p-5">
              <div className="mb-4">
                <CheckCircle 
                  size={80} 
                  className="text-success mb-3"
                  aria-hidden="true"
                />
              </div>
              
              <h1 className="h2 text-success mb-3">תודה רבה!</h1>
              <h2 className="h5 mb-4">הבקשה שלך נשלחה בהצלחה</h2>
              
              <div className="alert alert-success mb-4" role="alert">
                <strong>מה הלאה?</strong>
                <ul className="list-unstyled mt-2 mb-0">
                  <li>✓ נציג שלנו יצור איתך קשר תוך 24 שעות</li>
                  <li>✓ תקבל הצעת מחיר מפורטת ומותאמת אישית</li>
                  <li>✓ נסייע לך בכל השאלות והספקות</li>
                </ul>
              </div>
              
              <p className="text-muted mb-4">
                אנחנו מעריכים את האמון שלך ב-VIP International Shipping.
                הצוות המקצועי שלנו מתכונן לספק לך שירות מעולה.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/')}
                  aria-label="חזור לדף הבית"
                >
                  <House className="me-2" />
                  חזור לדף הבית
                </Button>
                <Button 
                  variant="outline-success" 
                  onClick={handleDownloadQuote}
                  aria-label="הורד פרטי הצעת המחיר"
                >
                  <Download className="me-2" />
                  הורד פרטים
                </Button>
              </div>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <h6 className="text-muted mb-2">צריך עזרה מיידית?</h6>
                <p className="mb-0">
                  <a href="tel:+1234567890" className="text-decoration-none">
                    📞 1-234-567-890
                  </a>
                  {' | '}
                  <a href="mailto:info@vipshipping.com" className="text-decoration-none">
                    ✉️ info@vipshipping.com
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Thankyou;
