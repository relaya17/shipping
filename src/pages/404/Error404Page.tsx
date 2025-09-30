import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Error404Page: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow">
            <Card.Body className="p-5">
              <div className="mb-4">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" 
                  alt="תמונת שגיאה 404 - העמוד לא נמצא" 
                  className="img-fluid"
                  style={{ maxHeight: '200px' }}
                />
              </div>
              
              <h1 className="display-1 text-primary mb-3">404</h1>
              <h2 className="h4 mb-3">עמוד לא נמצא</h2>
              <p className="text-muted mb-4">
                מצטערים, העמוד שחיפשת לא קיים או הועבר למקום אחר.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  variant="primary" 
                  onClick={handleGoHome}
                  aria-label="חזור לדף הבית"
                >
                  חזור לדף הבית
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={handleGoBack}
                  aria-label="חזור לעמוד הקודם"
                >
                  חזור אחורה
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404Page;
