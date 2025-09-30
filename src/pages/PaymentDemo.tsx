import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CreditCard, Shield, CheckCircle, Clock } from 'react-bootstrap-icons';
import SecurePayment from '../components/Payment/SecurePayment';
import { useSystemNotifications } from '../components/Notifications/FloatingNotifications';
import WebSocketExample from '../components/WebSocket/WebSocketExample';

const PaymentDemo: React.FC = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useSystemNotifications();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const demoOrders = [
    {
      id: 'DEMO-001',
      description: 'Express Shipping: Electronics Package',
      amount: 299.99,
      currency: 'USD',
      items: ['MacBook Pro', 'iPad', 'Accessories'],
      destination: 'Germany'
    },
    {
      id: 'DEMO-002', 
      description: 'Ocean Freight: Household Goods',
      amount: 1299.99,
      currency: 'USD',
      items: ['Furniture', 'Appliances', 'Personal Items'],
      destination: 'Australia'
    },
    {
      id: 'DEMO-003',
      description: 'Air Freight: Business Documents',
      amount: 89.99,
      currency: 'USD',
      items: ['Legal Documents', 'Contracts', 'Certificates'],
      destination: 'Japan'
    }
  ];

  const [selectedOrder, setSelectedOrder] = useState(demoOrders[0]);

  const handlePaymentSuccess = (paymentData: {
    orderId: string;
    amount: number;
    currency: string;
    method: string;
    timestamp: string;
    transactionId: string;
    status: string;
  }) => {
    setPaymentComplete(true);
    setShowPayment(false);
    showSuccess(
      'Payment Completed Successfully!',
      `Your order ${selectedOrder.id} has been paid and will be processed immediately.`,
      [
        {
          label: 'Track Shipment',
          onClick: () => window.location.href = `/tracking/${selectedOrder.id}`,
          variant: 'primary'
        },
        {
          label: 'Download Receipt',
          onClick: () => showSuccess('Receipt Downloaded!', 'Your payment receipt has been saved to Downloads.'),
          variant: 'outline-primary'
        }
      ]
    );
  };

  const handlePaymentError = (error: string) => {
    showError('Payment Failed', error);
  };

  if (showPayment) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="mb-4">
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowPayment(false)}
                className="mb-3"
              >
                ← Back to Demo Selection
              </Button>
              <h2 className="text-primary">Secure Payment Demo</h2>
              <p className="text-muted">
                This is a demonstration of our secure payment system. No real transactions will be processed.
              </p>
            </div>
            
            <SecurePayment
              amount={selectedOrder.amount}
              currency={selectedOrder.currency}
              orderId={selectedOrder.id}
              description={selectedOrder.description}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="text-center mb-5">
            <CreditCard size={60} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold text-primary mb-3">
              Secure Payment System Demo
            </h1>
            <p className="lead text-muted">
              Experience our world-class payment security and user-friendly interface
            </p>
            
            <Alert variant="info" className="mt-4">
              <Shield className="me-2" size={16} />
              <strong>Demo Mode:</strong> This is a safe demonstration environment. 
              No real payments will be processed and no personal information will be stored.
            </Alert>
          </div>

          {paymentComplete && (
            <Alert variant="success" className="mb-4">
              <CheckCircle className="me-2" size={20} />
              <strong>Demo Payment Completed!</strong> You can try another demo payment below.
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setPaymentComplete(false)}
                className="ms-2"
              >
                Reset Demo
              </Button>
            </Alert>
          )}

          <div className="mb-5">
            <h3 className="text-center mb-4">Choose a Demo Order</h3>
            <Row>
              {demoOrders.map((order, index) => (
                <Col lg={4} md={6} className="mb-4" key={order.id}>
                  <Card 
                    className={`h-100 cursor-pointer border-2 ${selectedOrder.id === order.id ? 'border-primary bg-primary-subtle' : 'border-light'}`}
                    onClick={() => setSelectedOrder(order)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Badge bg="primary" className="rounded-pill">
                          {order.id}
                        </Badge>
                        <h4 className="text-primary fw-bold mb-0">
                          {order.currency} {order.amount}
                        </h4>
                      </div>
                      
                      <h6 className="fw-bold mb-3">{order.description}</h6>
                      
                      <div className="mb-3">
                        <strong className="text-muted small">Items:</strong>
                        <ul className="mt-1 mb-0 small">
                          {order.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">
                          Destination: <strong>{order.destination}</strong>
                        </span>
                        {selectedOrder.id === order.id && (
                          <Badge bg="success">Selected</Badge>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              className="px-5 py-3 rounded-pill"
              onClick={() => setShowPayment(true)}
            >
              <Shield className="me-2" size={20} />
              Proceed to Secure Payment Demo
            </Button>
          </div>

          <Row className="mt-5">
            <Col lg={6} className="mb-4">
              <Card className="border-success h-100">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">
                    <Shield className="me-2" size={20} />
                    Security Features
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ul className="mb-0">
                    <li><strong>256-bit SSL Encryption:</strong> All data transmitted securely</li>
                    <li><strong>PCI DSS Compliant:</strong> Meets industry security standards</li>
                    <li><strong>3D Secure Authentication:</strong> Additional fraud protection</li>
                    <li><strong>Tokenization:</strong> Credit card numbers never stored</li>
                    <li><strong>Real-time Fraud Detection:</strong> Advanced security monitoring</li>
                    <li><strong>Multi-factor Authentication:</strong> Enhanced account security</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6}>
              <Card className="border-info h-100">
                <Card.Header className="bg-info text-white">
                  <h5 className="mb-0">
                    <Clock className="me-2" size={20} />
                    Payment Options
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ul className="mb-0">
                    <li><strong>Credit/Debit Cards:</strong> All major cards accepted</li>
                    <li><strong>PayPal:</strong> Secure PayPal integration</li>
                    <li><strong>Apple Pay:</strong> Quick biometric authentication</li>
                    <li><strong>Google Pay:</strong> Fast mobile payments</li>
                    <li><strong>Bank Transfer:</strong> Direct bank-to-bank transfers</li>
                    <li><strong>Cryptocurrency:</strong> Bitcoin and Ethereum (coming soon)</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={8}>
              <div className="text-center">
                <p className="text-muted">
                  <strong>Need Help?</strong> Our customer support team is available 24/7 to assist with any payment questions.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Button variant="outline-primary" size="sm">
                    Live Chat Support
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    Call +1-800-VIP-PAY
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    Email: payments@vipshipping.com
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <WebSocketExample token="demo-token" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentDemo;
