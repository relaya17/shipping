import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert, Modal, Spinner, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  ExclamationTriangle,
  Eye,
  EyeSlash,
  Bank,
  Paypal,
  Apple,
  Google
} from 'react-bootstrap-icons';
import { useSystemNotifications } from '../Notifications/FloatingNotifications';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'paypal' | 'apple' | 'google' | 'bank';
  icon: React.ReactNode;
  fees: number;
  processingTime: string;
  security: 'standard' | 'enhanced' | 'premium';
}

interface PaymentFormData {
  method: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  saveCard: boolean;
  agree3DS: boolean;
  agreeTerms: boolean;
}

interface SecurePaymentProps {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  onSuccess: (paymentData: {
    orderId: string;
    amount: number;
    currency: string;
    method: string;
    timestamp: string;
    transactionId: string;
    status: string;
  }) => void;
  onError: (error: string) => void;
}

const SecurePayment: React.FC<SecurePaymentProps> = ({
  amount,
  currency,
  orderId,
  description,
  onSuccess,
  onError
}) => {
  const { t } = useTranslation();
  const { showPaymentSuccess, showError } = useSystemNotifications();
  
  const [formData, setFormData] = useState<PaymentFormData>({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    saveCard: false,
    agree3DS: false,
    agreeTerms: false
  });

  const [showCvv, setShowCvv] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [show3DSModal, setShow3DSModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [securityScore, setSecurityScore] = useState(0);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      type: 'card',
      icon: <CreditCard size={20} />,
      fees: 0,
      processingTime: 'Instant',
      security: 'premium'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'paypal',
      icon: <Paypal size={20} />,
      fees: 2.9,
      processingTime: 'Instant',
      security: 'enhanced'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      type: 'apple',
      icon: <Apple size={20} />,
      fees: 0,
      processingTime: 'Instant',
      security: 'premium'
    },
    {
      id: 'google',
      name: 'Google Pay',
      type: 'google',
      icon: <Google size={20} />,
      fees: 0,
      processingTime: 'Instant',
      security: 'premium'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      type: 'bank',
      icon: <Bank size={20} />,
      fees: 0,
      processingTime: '1-3 business days',
      security: 'standard'
    }
  ];

  // Calculate security score
  useEffect(() => {
    let score = 0;
    if (formData.cardNumber.length >= 16) score += 20;
    if (formData.expiryDate.length === 5) score += 20;
    if (formData.cvv.length >= 3) score += 20;
    if (formData.cardName.length >= 3) score += 20;
    if (formData.agree3DS) score += 10;
    if (formData.agreeTerms) score += 10;
    setSecurityScore(score);
  }, [formData]);

  const validateCard = (cardNumber: string) => {
    // Luhn algorithm
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (formData.method === 'card') {
      if (!formData.cardNumber || !validateCard(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Invalid card number';
      }
      
      if (!formData.expiryDate || formData.expiryDate.length !== 5) {
        errors.expiryDate = 'Invalid expiry date (MM/YY)';
      }
      
      if (!formData.cvv || formData.cvv.length < 3) {
        errors.cvv = 'Invalid CVV';
      }
      
      if (!formData.cardName || formData.cardName.length < 3) {
        errors.cardName = 'Cardholder name required';
      }
    }
    
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Validation Error', 'Please correct the errors in the form');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate 3D Secure for card payments
      if (formData.method === 'card' && formData.agree3DS) {
        setShow3DSModal(true);
        
        // Simulate 3DS verification
        setTimeout(() => {
          setShow3DSModal(false);
          completePayment();
        }, 3000);
      } else {
        await completePayment();
      }
    } catch (error) {
      setIsProcessing(false);
      showError('Payment Error', 'An error occurred while processing your payment');
      onError('Payment processing failed');
    }
  };

  const completePayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const paymentData = {
      orderId,
      amount,
      currency,
      method: formData.method,
      timestamp: new Date().toISOString(),
      transactionId: `TXN-${Date.now()}`,
      status: 'success'
    };
    
    setIsProcessing(false);
    showPaymentSuccess(`${currency} ${amount.toFixed(2)}`, orderId);
    onSuccess(paymentData);
  };

  const getSecurityBadge = (security: string) => {
    const badges = {
      standard: <Badge bg="secondary">Standard Security</Badge>,
      enhanced: <Badge bg="warning">Enhanced Security</Badge>,
      premium: <Badge bg="success">Premium Security</Badge>
    };
    return badges[security as keyof typeof badges];
  };

  const selectedMethod = paymentMethods.find(method => method.id === formData.method);

  return (
    <div className="secure-payment">
      <Card className="border-0 shadow-lg">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <Shield size={20} />
              <h5 className="mb-0">Secure Payment</h5>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Lock size={16} />
              <small>256-bit SSL Encrypted</small>
            </div>
          </div>
        </Card.Header>

        <Card.Body className="p-4">
          {/* Security Score */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted">Security Score</small>
              <small className="fw-bold">{securityScore}/100</small>
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div 
                className={`progress-bar ${securityScore >= 80 ? 'bg-success' : securityScore >= 50 ? 'bg-warning' : 'bg-danger'}`}
                style={{ width: `${securityScore}%` }}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-4 p-3 bg-light rounded">
            <div className="d-flex justify-content-between">
              <span>{description}</span>
              <strong>{currency} {amount.toFixed(2)}</strong>
            </div>
            <small className="text-muted">Order ID: {orderId}</small>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Payment Methods */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Payment Method</h6>
              <Row>
                {paymentMethods.map((method) => (
                  <Col lg={6} className="mb-2" key={method.id}>
                    <div 
                      className={`payment-method-card p-3 border rounded cursor-pointer ${
                        formData.method === method.id ? 'border-primary bg-primary-subtle' : ''
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, method: method.id }))}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          {method.icon}
                          <div>
                            <div className="fw-medium">{method.name}</div>
                            <small className="text-muted">{method.processingTime}</small>
                          </div>
                        </div>
                        <div className="text-end">
                          {getSecurityBadge(method.security)}
                          {method.fees > 0 && (
                            <div><small className="text-muted">{method.fees}% fee</small></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Card Payment Form */}
            {formData.method === 'card' && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Card Information</h6>
                
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        cardNumber: formatCardNumber(e.target.value) 
                      }))}
                      maxLength={19}
                      isInvalid={!!validationErrors.cardNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.cardNumber}
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        expiryDate: formatExpiry(e.target.value) 
                      }))}
                      maxLength={5}
                      isInvalid={!!validationErrors.expiryDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.expiryDate}
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showCvv ? "text" : "password"}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
                        }))}
                        isInvalid={!!validationErrors.cvv}
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y p-2"
                        onClick={() => setShowCvv(!showCvv)}
                      >
                        {showCvv ? <EyeSlash size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.cvv}
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col md={12} className="mb-3">
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        cardName: e.target.value 
                      }))}
                      isInvalid={!!validationErrors.cardName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.cardName}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                {/* Security Options */}
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="agree-3ds"
                    label="Enable 3D Secure authentication for enhanced security"
                    checked={formData.agree3DS}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      agree3DS: e.target.checked 
                    }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="save-card"
                    label="Save this card for future payments (encrypted storage)"
                    checked={formData.saveCard}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      saveCard: e.target.checked 
                    }))}
                  />
                </div>
              </div>
            )}

            {/* Terms Agreement */}
            <div className="mb-4">
              <Form.Check
                type="checkbox"
                id="agree-terms"
                label={
                  <span>
                    I agree to the{' '}
                    <a href="/terms" target="_blank">Terms & Conditions</a>{' '}
                    and{' '}
                    <a href="/privacy" target="_blank">Privacy Policy</a>
                  </span>
                }
                checked={formData.agreeTerms}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  agreeTerms: e.target.checked 
                }))}
                isInvalid={!!validationErrors.agreeTerms}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.agreeTerms}
              </Form.Control.Feedback>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-100"
              disabled={isProcessing || securityScore < 50}
            >
              {isProcessing ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="me-2" size={16} />
                  Pay {currency} {amount.toFixed(2)}
                </>
              )}
            </Button>

            {/* Security Badges */}
            <div className="text-center mt-3">
              <small className="text-muted">
                <Shield className="me-1" size={14} />
                Protected by 256-bit SSL encryption
                <br />
                <CheckCircle className="me-1" size={14} />
                PCI DSS Level 1 compliant
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* 3D Secure Modal */}
      <Modal show={show3DSModal} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>
            <Shield className="me-2" />
            3D Secure Authentication
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Spinner className="mb-3" />
          <p>Please wait while we verify your payment with your bank...</p>
          <small className="text-muted">
            This additional security step helps protect your payment.
          </small>
        </Modal.Body>
      </Modal>

      <style>{`
        .payment-method-card {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .payment-method-card:hover {
          border-color: var(--bs-primary) !important;
          background-color: var(--bs-primary-bg-subtle) !important;
        }
        
        .secure-payment .form-control:focus {
          border-color: var(--bs-success);
          box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SecurePayment;
