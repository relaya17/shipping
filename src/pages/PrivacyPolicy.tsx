import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { ShieldCheck, Eye, Lock, Database, Globe, Bell } from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    trackPageView('privacy_policy');
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* Header */}
          <div className="text-center mb-5">
            <ShieldCheck size={60} className="text-success mb-3" />
            <h1 className="display-4 fw-bold mb-3">Privacy Policy</h1>
            <p className="lead text-muted">
              Your Privacy is Our Priority
            </p>
            <Badge bg="info" className="me-2">GDPR Compliant</Badge>
            <Badge bg="info" className="me-2">CCPA Compliant</Badge>
            <Badge bg="info">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</Badge>
          </div>

          {/* Introduction Alert */}
          <Alert variant="info" className="mb-4">
            <Lock size={20} className="me-2" />
            <strong>Your Trust Matters:</strong> At VIP International Shipping, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
          </Alert>

          {/* Table of Contents */}
          <Card className="shadow-sm mb-4 bg-light">
            <Card.Body>
              <h3 className="h5 mb-3">
                <Database className="me-2" />
                Quick Navigation
              </h3>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">1. Information We Collect</li>
                    <li className="mb-2">2. How We Use Your Information</li>
                    <li className="mb-2">3. Information Sharing</li>
                    <li className="mb-2">4. Data Security</li>
                    <li className="mb-2">5. Your Privacy Rights</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">6. Cookies and Tracking</li>
                    <li className="mb-2">7. International Transfers</li>
                    <li className="mb-2">8. Children's Privacy</li>
                    <li className="mb-2">9. Changes to Policy</li>
                    <li className="mb-2">10. Contact Us</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Section 1 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Eye className="text-primary me-2" />
                1. Information We Collect
              </h2>
              
              <h3 className="h5 mt-4 mb-3">1.1 Personal Information You Provide</h3>
              <p>When you request our services or contact us, we collect:</p>
              <ul className="mb-3">
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
                <li><strong>Shipping Details:</strong> Origin and destination addresses, moving dates, inventory details</li>
                <li><strong>Financial Information:</strong> Credit card details, billing address (processed securely through encrypted payment processors)</li>
                <li><strong>Identification Documents:</strong> Passport copies, visa information (for customs clearance)</li>
                <li><strong>Business Information:</strong> Company name, tax ID (for commercial shipments)</li>
                <li><strong>Communication Records:</strong> Email correspondence, chat transcripts, phone call recordings (with notice)</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">1.2 Information Collected Automatically</h3>
              <p>When you visit our website or use our mobile app, we automatically collect:</p>
              <ul className="mb-3">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent on site, click patterns, search queries</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address (with your consent for precise location)</li>
                <li><strong>Cookies and Similar Technologies:</strong> See Section 6 for details</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">1.3 Information from Third Parties</h3>
              <p>We may receive information from:</p>
              <ul className="mb-3">
                <li>Shipping partners and carriers</li>
                <li>Credit reporting agencies (for credit checks)</li>
                <li>Social media platforms (if you connect your accounts)</li>
                <li>Public databases and government records</li>
                <li>Marketing partners and lead generation services</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Section 2 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Database className="text-primary me-2" />
                2. How We Use Your Information
              </h2>
              
              <h3 className="h5 mt-4 mb-3">2.1 To Provide Our Services</h3>
              <ul className="mb-3">
                <li>Process and fulfill your shipping requests</li>
                <li>Arrange pickup and delivery</li>
                <li>Handle customs clearance and documentation</li>
                <li>Process payments and billing</li>
                <li>Provide customer support</li>
                <li>Send shipment tracking updates and notifications</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">2.2 To Improve Our Services</h3>
              <ul className="mb-3">
                <li>Analyze usage patterns and trends</li>
                <li>Conduct market research and surveys</li>
                <li>Test new features and services</li>
                <li>Troubleshoot technical issues</li>
                <li>Enhance website and app functionality</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">2.3 For Marketing and Communications</h3>
              <ul className="mb-3">
                <li>Send promotional emails about our services (with opt-out option)</li>
                <li>Display personalized advertisements</li>
                <li>Provide moving tips and resources</li>
                <li>Announce special offers and discounts</li>
                <li>Conduct customer satisfaction surveys</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">2.4 For Legal and Security Purposes</h3>
              <ul className="mb-3">
                <li>Comply with legal obligations and regulations</li>
                <li>Prevent fraud and unauthorized access</li>
                <li>Protect our rights and property</li>
                <li>Enforce our Terms of Service</li>
                <li>Respond to legal requests from authorities</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Section 3 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Globe className="text-primary me-2" />
                3. Information Sharing and Disclosure
              </h2>
              
              <p className="mb-3">We do not sell your personal information. We may share your information with:</p>

              <h3 className="h5 mt-4 mb-3">3.1 Service Providers</h3>
              <ul className="mb-3">
                <li><strong>Shipping Partners:</strong> International carriers, freight forwarders, customs brokers</li>
                <li><strong>Payment Processors:</strong> Secure third-party payment gateways</li>
                <li><strong>Technology Providers:</strong> Cloud hosting, email services, analytics platforms</li>
                <li><strong>Insurance Providers:</strong> For cargo insurance coverage</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">3.2 Legal Requirements</h3>
              <p>We may disclose information when required by law or to:</p>
              <ul className="mb-3">
                <li>Comply with court orders, subpoenas, or legal processes</li>
                <li>Cooperate with law enforcement or government agencies</li>
                <li>Protect our legal rights or defend against claims</li>
                <li>Prevent fraud or illegal activities</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">3.3 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change and provide options regarding your data.
              </p>

              <h3 className="h5 mt-4 mb-3">3.4 With Your Consent</h3>
              <p>
                We may share information for other purposes with your explicit consent or at your direction.
              </p>
            </Card.Body>
          </Card>

          {/* Section 4 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Lock className="text-primary me-2" />
                4. Data Security
              </h2>
              
              <p className="mb-3">We implement industry-standard security measures to protect your information:</p>

              <h3 className="h5 mt-4 mb-3">4.1 Technical Safeguards</h3>
              <ul className="mb-3">
                <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit, AES-256 encryption for stored data</li>
                <li><strong>Secure Servers:</strong> Data stored on secure, firewalled servers</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access</li>
                <li><strong>Regular Security Audits:</strong> Penetration testing and vulnerability assessments</li>
                <li><strong>Intrusion Detection:</strong> 24/7 monitoring for suspicious activity</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">4.2 Organizational Safeguards</h3>
              <ul className="mb-3">
                <li>Employee training on data protection and privacy</li>
                <li>Strict confidentiality agreements with staff and contractors</li>
                <li>Background checks for employees with data access</li>
                <li>Incident response and breach notification procedures</li>
              </ul>

              <Alert variant="warning" className="mt-3">
                <strong>Note:</strong> While we employ robust security measures, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but continuously work to improve our protections.
              </Alert>
            </Card.Body>
          </Card>

          {/* Section 5 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <ShieldCheck className="text-primary me-2" />
                5. Your Privacy Rights
              </h2>
              
              <p className="mb-3">Depending on your location, you have the following rights:</p>

              <h3 className="h5 mt-4 mb-3">5.1 General Rights</h3>
              <ul className="mb-3">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">5.2 GDPR Rights (EU Residents)</h3>
              <ul className="mb-3">
                <li>Right to withdraw consent at any time</li>
                <li>Right to restrict processing</li>
                <li>Right to lodge a complaint with supervisory authority</li>
                <li>Right to object to automated decision-making</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">5.3 CCPA Rights (California Residents)</h3>
              <ul className="mb-3">
                <li>Right to know what personal information is collected</li>
                <li>Right to know if personal information is sold or disclosed</li>
                <li>Right to opt-out of sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">5.4 How to Exercise Your Rights</h3>
              <p>To exercise any of these rights, contact us at:</p>
              <ul className="mb-3">
                <li>Email: privacy@vipshipping.com</li>
                <li>Phone: 1-800-VIP-MOVE (1-800-847-6683)</li>
                <li>Mail: Privacy Officer, VIP International Shipping, [Address]</li>
              </ul>
              <p>
                We will respond to your request within 30 days. We may need to verify your identity before processing your request.
              </p>
            </Card.Body>
          </Card>

          {/* Section 6 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Bell className="text-primary me-2" />
                6. Cookies and Tracking Technologies
              </h2>
              
              <p className="mb-3">We use cookies and similar technologies to enhance your experience:</p>

              <h3 className="h5 mt-4 mb-3">6.1 Types of Cookies We Use</h3>
              <ul className="mb-3">
                <li><strong>Essential Cookies:</strong> Required for website functionality (login, shopping cart)</li>
                <li><strong>Performance Cookies:</strong> Analytics to understand how you use our site</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track visits across websites for targeted advertising</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">6.2 Third-Party Cookies</h3>
              <p>We use third-party services that may place cookies:</p>
              <ul className="mb-3">
                <li>Google Analytics (website analytics)</li>
                <li>Facebook Pixel (advertising)</li>
                <li>LinkedIn Insights (marketing)</li>
                <li>Hotjar (user experience)</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">6.3 Cookie Management</h3>
              <p>
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality. Most browsers accept cookies by default, but you can adjust settings to refuse or delete them.
              </p>
            </Card.Body>
          </Card>

          {/* Section 7 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Globe className="text-primary me-2" />
                7. International Data Transfers
              </h2>
              
              <p>
                As an international moving company, we transfer data across borders. We ensure adequate protections:
              </p>
              <ul className="mb-3">
                <li><strong>Standard Contractual Clauses:</strong> Use EU-approved clauses for transfers</li>
                <li><strong>Privacy Shield:</strong> Comply with applicable frameworks (where in effect)</li>
                <li><strong>Adequacy Decisions:</strong> Transfer to countries deemed adequate by regulators</li>
                <li><strong>Your Consent:</strong> Obtain explicit consent where required</li>
              </ul>
              <p>
                Data may be processed in the United States, European Union, and other countries where we or our service providers operate.
              </p>
            </Card.Body>
          </Card>

          {/* Section 8 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <ShieldCheck className="text-primary me-2" />
                8. Children's Privacy
              </h2>
              
              <p>
                Our services are not directed to children under 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately, and we will delete it.
              </p>
              <p>
                Parents or guardians making arrangements for minors should provide consent for data processing.
              </p>
            </Card.Body>
          </Card>

          {/* Section 9 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Database className="text-primary me-2" />
                9. Data Retention
              </h2>
              
              <p>We retain your personal information for as long as necessary to:</p>
              <ul className="mb-3">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations (tax, accounting, reporting)</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records</li>
              </ul>
              <p>
                <strong>Typical Retention Periods:</strong>
              </p>
              <ul className="mb-3">
                <li>Transaction records: 7 years (for tax purposes)</li>
                <li>Customer accounts: Until account closure + 3 years</li>
                <li>Marketing communications: Until opt-out + verification period</li>
                <li>Website cookies: Up to 2 years</li>
              </ul>
              <p>
                After the retention period, we securely delete or anonymize your data.
              </p>
            </Card.Body>
          </Card>

          {/* Section 10 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Bell className="text-primary me-2" />
                10. Changes to This Privacy Policy
              </h2>
              
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by:
              </p>
              <ul className="mb-3">
                <li>Email notification to registered users</li>
                <li>Prominent notice on our website</li>
                <li>In-app notifications</li>
              </ul>
              <p>
                The "Last Updated" date at the top indicates when changes were made. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </Card.Body>
          </Card>

          {/* Section 11 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <ShieldCheck className="text-primary me-2" />
                11. Contact Us
              </h2>
              
              <p className="mb-3">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:
              </p>
              
              <div className="bg-light p-4 rounded">
                <h5>Privacy Officer</h5>
                <p className="mb-2"><strong>VIP International Shipping</strong></p>
                <p className="mb-2"><strong>Email:</strong> privacy@vipshipping.com</p>
                <p className="mb-2"><strong>Phone:</strong> 1-800-VIP-MOVE (1-800-847-6683)</p>
                <p className="mb-2"><strong>Mail:</strong> Privacy Officer, VIP International Shipping</p>
                <p className="mb-2">[Your Complete Business Address]</p>
                <p className="mb-0"><strong>Response Time:</strong> We aim to respond within 48 hours for general inquiries and within 30 days for formal data subject requests.</p>
              </div>

              <Alert variant="info" className="mt-4 mb-0">
                <strong>For EU Residents:</strong> You have the right to lodge a complaint with your local data protection authority if you believe we have violated your privacy rights.
              </Alert>
            </Card.Body>
          </Card>

          {/* Final Notice */}
          <Alert variant="success" className="mt-4">
            <ShieldCheck size={20} className="me-2" />
            <strong>Your Privacy, Our Commitment:</strong> We are dedicated to protecting your personal information and maintaining your trust. This Privacy Policy is part of our commitment to transparency and compliance with global privacy standards.
          </Alert>

        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;

