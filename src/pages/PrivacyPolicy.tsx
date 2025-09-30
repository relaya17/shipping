import React from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Eye, Lock, Globe, Database, PersonCheck } from 'react-bootstrap-icons';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="border-0 shadow-lg">
            <Card.Header className="bg-success text-white text-center py-4">
              <ShieldCheck size={40} className="mb-3" />
              <h1 className="mb-0">Privacy Policy</h1>
              <p className="mb-0 opacity-75">Your Privacy is Our Priority</p>
            </Card.Header>

            <Card.Body className="p-5">
              <Alert variant="info" className="mb-4">
                <strong>GDPR & CCPA Compliant:</strong> We are fully compliant with international 
                data protection regulations including GDPR, CCPA, and other privacy laws.
                <Badge bg="success" className="ms-2">Verified Compliance</Badge>
              </Alert>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">
                  <Eye size={20} className="me-2" />
                  1. Information We Collect
                </h2>
                
                <Row>
                  <Col md={6}>
                    <Card className="border-primary h-100 mb-3">
                      <Card.Header className="bg-primary text-white">
                        <h6 className="mb-0">Personal Information</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Full name and contact details</li>
                          <li>Pickup and delivery addresses</li>
                          <li>Phone numbers and email addresses</li>
                          <li>Payment and billing information</li>
                          <li>Emergency contact information</li>
                          <li>Government-issued ID for customs</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-info h-100 mb-3">
                      <Card.Header className="bg-info text-white">
                        <h6 className="mb-0">Shipment Information</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Inventory lists and item descriptions</li>
                          <li>Photos of items for insurance</li>
                          <li>Shipment tracking and status data</li>
                          <li>Customs declarations and valuations</li>
                          <li>Delivery confirmations and signatures</li>
                          <li>Insurance claims and damage reports</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="border-warning mb-3">
                  <Card.Header className="bg-warning">
                    <h6 className="mb-0">
                      <Globe size={16} className="me-1" />
                      Website and Technical Data
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <ul className="small mb-0">
                          <li>IP address and location data</li>
                          <li>Browser type and version</li>
                          <li>Device information and screen resolution</li>
                          <li>Pages visited and time spent</li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <ul className="small mb-0">
                          <li>Cookies and session data</li>
                          <li>Search queries and preferences</li>
                          <li>Chat transcripts with customer service</li>
                          <li>Feedback and survey responses</li>
                        </ul>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">
                  <Database size={20} className="me-2" />
                  2. How We Use Your Information
                </h2>
                
                <div className="mb-4">
                  <h5 className="text-primary mb-2">Primary Uses (Service Delivery):</h5>
                  <ul className="ms-3">
                    <li><strong>Shipping Services:</strong> Coordinate pickup, transit, and delivery of your items</li>
                    <li><strong>Customs Clearance:</strong> Complete required documentation for international shipping</li>
                    <li><strong>Insurance Processing:</strong> Provide coverage and handle claims if needed</li>
                    <li><strong>Customer Communication:</strong> Send updates, confirmations, and important notices</li>
                    <li><strong>Payment Processing:</strong> Secure handling of financial transactions</li>
                    <li><strong>Compliance:</strong> Meet legal and regulatory requirements in all countries</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-info mb-2">Secondary Uses (Service Improvement):</h5>
                  <ul className="ms-3">
                    <li>Improve our website functionality and user experience</li>
                    <li>Analyze shipping patterns to optimize routes and timing</li>
                    <li>Develop new services based on customer needs</li>
                    <li>Prevent fraud and enhance security measures</li>
                    <li>Provide personalized customer support</li>
                    <li>Send service updates and promotional offers (with consent)</li>
                  </ul>
                </div>

                <Alert variant="success">
                  <strong>Your Control:</strong> You can opt out of marketing communications at any time 
                  and request that we only use your data for essential shipping services.
                </Alert>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">
                  <Lock size={20} className="me-2" />
                  3. Data Security and Protection
                </h2>
                
                <Row>
                  <Col md={6}>
                    <Card className="border-success h-100">
                      <Card.Header className="bg-success text-white">
                        <h6 className="mb-0">Technical Safeguards</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>256-bit SSL encryption for all data transmission</li>
                          <li>End-to-end encryption for sensitive documents</li>
                          <li>Multi-factor authentication for staff access</li>
                          <li>Regular security audits and penetration testing</li>
                          <li>Automated backup systems with versioning</li>
                          <li>24/7 network monitoring and intrusion detection</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-primary h-100">
                      <Card.Header className="bg-primary text-white">
                        <h6 className="mb-0">Operational Safeguards</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Employee background checks and privacy training</li>
                          <li>Role-based access controls (least privilege)</li>
                          <li>Data retention policies and secure deletion</li>
                          <li>Physical security at all office locations</li>
                          <li>Vendor security agreements and audits</li>
                          <li>Incident response and breach notification procedures</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">
                  <PersonCheck size={20} className="me-2" />
                  4. Data Sharing and Third Parties
                </h2>
                
                <div className="mb-4">
                  <h5 className="text-warning mb-2">When We Share Information:</h5>
                  <Card className="bg-light border-0 p-3">
                    <ul className="mb-0">
                      <li><strong>Shipping Partners:</strong> International carriers and local delivery agents (minimal data required for delivery)</li>
                      <li><strong>Customs Authorities:</strong> Government agencies requiring customs documentation (mandatory by law)</li>
                      <li><strong>Insurance Providers:</strong> Coverage and claims processing (only when claims are filed)</li>
                      <li><strong>Payment Processors:</strong> Secure financial transaction processing (encrypted payment data only)</li>
                      <li><strong>Legal Requirements:</strong> Court orders, law enforcement requests, or regulatory compliance</li>
                    </ul>
                  </Card>
                </div>

                <Alert variant="danger">
                  <strong>What We Never Do:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Sell your personal information to third parties</li>
                    <li>Share data for marketing purposes without consent</li>
                    <li>Provide access to competitors or non-essential parties</li>
                    <li>Store data in unsecured or non-compliant systems</li>
                  </ul>
                </Alert>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">5. Your Privacy Rights</h2>
                
                <Row>
                  <Col md={6}>
                    <h6 className="text-primary mb-2">Access and Control:</h6>
                    <ul className="small">
                      <li><strong>Data Access:</strong> Request a copy of all data we have about you</li>
                      <li><strong>Data Correction:</strong> Update or correct any inaccurate information</li>
                      <li><strong>Data Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                      <li><strong>Data Portability:</strong> Receive your data in a machine-readable format</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-primary mb-2">Communication Preferences:</h6>
                    <ul className="small">
                      <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                      <li><strong>Consent Withdrawal:</strong> Revoke consent for data processing</li>
                      <li><strong>Complaints:</strong> File complaints with data protection authorities</li>
                      <li><strong>Response Time:</strong> We respond to all requests within 30 days</li>
                    </ul>
                  </Col>
                </Row>

                <Card className="border-info">
                  <Card.Body>
                    <h6 className="text-info mb-2">How to Exercise Your Rights:</h6>
                    <p className="mb-2">Contact our Data Protection Officer:</p>
                    <ul className="small mb-0">
                      <li><strong>Email:</strong> privacy@vipshipping.com</li>
                      <li><strong>Phone:</strong> +1-800-VIP-PRIVACY</li>
                      <li><strong>Mail:</strong> VIP Shipping, Data Protection Office, 123 Privacy Lane, PC 12345</li>
                      <li><strong>Online:</strong> Submit a request through our privacy portal</li>
                    </ul>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">6. Data Retention</h2>
                <Card className="bg-primary text-white">
                  <Card.Body>
                    <h6 className="mb-2">Retention Periods:</h6>
                    <Row>
                      <Col md={6}>
                        <ul className="small mb-0">
                          <li><strong>Active Shipments:</strong> Duration of service + 1 year</li>
                          <li><strong>Financial Records:</strong> 7 years (tax compliance)</li>
                          <li><strong>Insurance Claims:</strong> 10 years (legal requirement)</li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <ul className="small mb-0">
                          <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                          <li><strong>Website Analytics:</strong> 26 months maximum</li>
                          <li><strong>Customer Support:</strong> 3 years for service quality</li>
                        </ul>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">7. International Data Transfers</h2>
                <p>
                  As an international shipping company, we may transfer your data across borders. 
                  We ensure all transfers are protected by:
                </p>
                <ul className="ms-3">
                  <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection levels</li>
                  <li><strong>Standard Contractual Clauses:</strong> EU-approved data transfer agreements</li>
                  <li><strong>Binding Corporate Rules:</strong> Internal policies ensuring consistent protection</li>
                  <li><strong>Certification Programs:</strong> Third-party validated security frameworks</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-success mb-3">8. Cookies and Tracking</h2>
                <Row>
                  <Col md={4}>
                    <Card className="border-success h-100">
                      <Card.Header className="bg-success text-white text-center">
                        <h6 className="mb-0">Essential Cookies</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Login sessions</li>
                          <li>Shopping cart contents</li>
                          <li>Security tokens</li>
                          <li>Language preferences</li>
                        </ul>
                        <Badge bg="success" className="mt-2">Always Active</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="border-warning h-100">
                      <Card.Header className="bg-warning text-center">
                        <h6 className="mb-0">Analytics Cookies</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Page views and navigation</li>
                          <li>User engagement metrics</li>
                          <li>Performance monitoring</li>
                          <li>Error tracking</li>
                        </ul>
                        <Badge bg="warning" className="mt-2">Opt-in Required</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="border-info h-100">
                      <Card.Header className="bg-info text-white text-center">
                        <h6 className="mb-0">Marketing Cookies</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Personalized content</li>
                          <li>Ad targeting</li>
                          <li>Social media integration</li>
                          <li>Conversion tracking</li>
                        </ul>
                        <Badge bg="info" className="mt-2">Consent Required</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>

              <section className="mb-4">
                <h2 className="h4 text-success mb-3">9. Updates and Changes</h2>
                <Alert variant="info">
                  <strong>Policy Updates:</strong> We may update this privacy policy to reflect 
                  changes in our practices or legal requirements. We will notify you of any 
                  material changes via email and prominent website notices 30 days before 
                  implementation.
                </Alert>
                
                <p>
                  <strong>Version History:</strong> You can always access previous versions 
                  of our privacy policy in our transparency archive.
                </p>
              </section>

              <div className="text-center border-top pt-4">
                <h6 className="text-success mb-3">Contact Our Privacy Team</h6>
                <Row>
                  <Col md={6}>
                    <p className="small mb-2">
                      <strong>Data Protection Officer:</strong><br />
                      privacy@vipshipping.com<br />
                      +1-800-VIP-PRIVACY
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="small mb-2">
                      <strong>Privacy Portal:</strong><br />
                      manage.vipshipping.com/privacy<br />
                      24/7 Automated Request Processing
                    </p>
                  </Col>
                </Row>
                <Badge bg="success" className="mt-2">
                  Last Updated: {new Date().toLocaleDateString()}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
