import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Shield, Clock, Globe } from 'react-bootstrap-icons';
import IconWrapper from '../components/UI/IconWrapper';

const TermsAndConditions: React.FC = () => {
  // Translation hook available if needed

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="border-0 shadow-lg">
            <Card.Header className="bg-primary text-white text-center py-4">
              <IconWrapper icon={Shield} size={40} className="mb-3" />
              <h1 className="mb-0">Terms and Conditions</h1>
              <p className="mb-0 opacity-75">VIP International Shipping Services</p>
            </Card.Header>

            <Card.Body className="p-5">
              <div className="mb-4">
                <Badge bg="success" className="mb-2">
                  <IconWrapper icon={Clock} size={14} className="me-1" />
                  Last Updated: {new Date().toLocaleDateString()}
                </Badge>
                <p className="text-muted">
                  These Terms and Conditions govern your use of VIP International Shipping services and website.
                </p>
              </div>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">
                  <IconWrapper icon={Shield} size={20} className="me-2" />
                  1. Service Agreement
                </h2>
                <p>
                  By using our shipping services, you agree to be bound by these terms and conditions. 
                  VIP International Shipping provides international moving and shipping services with 
                  professional handling and insurance coverage.
                </p>
                <ul className="ms-3">
                  <li>We provide door-to-door international shipping services</li>
                  <li>All shipments are insured and tracked throughout the journey</li>
                  <li>We comply with international shipping regulations and customs requirements</li>
                  <li>Professional packing and handling services are included</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">
                  <IconWrapper icon={Globe} size={20} className="me-2" />
                  2. Shipping Responsibilities
                </h2>
                
                <h5 className="text-success mb-3">Our Responsibilities:</h5>
                <ul className="ms-3 mb-4">
                  <li><strong>Safe Handling:</strong> Professional packing and secure transportation</li>
                  <li><strong>Insurance Coverage:</strong> Full replacement value insurance on all shipments</li>
                  <li><strong>Customs Clearance:</strong> Complete customs documentation and clearance</li>
                  <li><strong>Real-time Tracking:</strong> 24/7 shipment monitoring and updates</li>
                  <li><strong>Timely Delivery:</strong> Adherence to agreed delivery schedules</li>
                  <li><strong>Customer Support:</strong> Dedicated multilingual customer service</li>
                </ul>

                <h5 className="text-warning mb-3">Customer Responsibilities:</h5>
                <ul className="ms-3">
                  <li>Provide accurate and complete shipping information</li>
                  <li>Declare all items truthfully for customs purposes</li>
                  <li>Ensure items are properly prepared for international shipping</li>
                  <li>Comply with destination country import regulations</li>
                  <li>Be available for delivery at the destination address</li>
                  <li>Pay all applicable fees and charges as agreed</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">3. Prohibited Items</h2>
                <div className="alert alert-warning">
                  <strong>Important:</strong> The following items cannot be shipped through our services:
                </div>
                <Row>
                  <Col md={6}>
                    <h6 className="text-danger">Hazardous Materials:</h6>
                    <ul className="small">
                      <li>Flammable liquids and gases</li>
                      <li>Explosives and fireworks</li>
                      <li>Toxic or corrosive substances</li>
                      <li>Radioactive materials</li>
                      <li>Batteries (lithium-ion restrictions apply)</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-danger">Restricted Items:</h6>
                    <ul className="small">
                      <li>Weapons and ammunition</li>
                      <li>Illegal drugs and substances</li>
                      <li>Perishable food items</li>
                      <li>Live animals or plants</li>
                      <li>Cash, jewelry, or precious metals</li>
                    </ul>
                  </Col>
                </Row>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">4. Pricing and Payment</h2>
                <Card className="bg-light border-0 p-3 mb-3">
                  <h6 className="text-success mb-2">Transparent Pricing Policy:</h6>
                  <ul className="mb-0 small">
                    <li>All quotes include insurance and basic packing materials</li>
                    <li>No hidden fees - what you see is what you pay</li>
                    <li>Customs duties and destination taxes are customer responsibility</li>
                    <li>Payment terms: 50% deposit, 50% upon delivery</li>
                    <li>We accept all major credit cards, bank transfers, and PayPal</li>
                  </ul>
                </Card>
                
                <p>
                  <strong>Cancellation Policy:</strong> Cancellations made 48 hours before pickup 
                  incur no charges. Cancellations within 48 hours may incur a 25% cancellation fee.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">5. Insurance and Liability</h2>
                <Row>
                  <Col md={6}>
                    <Card className="border-success h-100">
                      <Card.Header className="bg-success text-white">
                        <h6 className="mb-0">Full Coverage Insurance</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Replacement value coverage up to $100,000</li>
                          <li>Transit damage protection</li>
                          <li>Theft and loss coverage</li>
                          <li>Weather-related damage protection</li>
                          <li>24-48 hour claim processing</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-warning h-100">
                      <Card.Header className="bg-warning">
                        <h6 className="mb-0">Liability Limitations</h6>
                      </Card.Header>
                      <Card.Body>
                        <ul className="small mb-0">
                          <li>Antiques require special valuation</li>
                          <li>Electronics have specific handling protocols</li>
                          <li>Artwork requires professional crating</li>
                          <li>Vehicles covered under separate policy</li>
                          <li>Maximum liability: $500,000 per shipment</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">6. Delivery and Claims</h2>
                <h6 className="text-info mb-2">Delivery Procedures:</h6>
                <ol>
                  <li>We provide 24-48 hour advance notice of delivery</li>
                  <li>Customer or authorized representative must be present</li>
                  <li>Items must be inspected upon delivery</li>
                  <li>Any damage must be noted on delivery receipt</li>
                  <li>Claims must be filed within 7 days of delivery</li>
                </ol>

                <div className="alert alert-info mt-3">
                  <strong>Claims Process:</strong> All claims are processed within 30 days. 
                  We provide temporary replacement items for essential household goods during claim processing.
                </div>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">7. Privacy and Data Protection</h2>
                <p>
                  We are committed to protecting your personal information and comply with 
                  international data protection regulations including GDPR and CCPA.
                </p>
                <ul className="ms-3">
                  <li><strong>Data Collection:</strong> We only collect necessary information for shipping services</li>
                  <li><strong>Data Usage:</strong> Information is used solely for service delivery and customer support</li>
                  <li><strong>Data Security:</strong> All data is encrypted and stored securely</li>
                  <li><strong>Third Parties:</strong> We never sell or share customer data</li>
                  <li><strong>Customer Rights:</strong> You can request data access, correction, or deletion</li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">8. Dispute Resolution</h2>
                <Card className="bg-primary text-white">
                  <Card.Body>
                    <h6 className="mb-2">Resolution Process:</h6>
                    <ol className="mb-0">
                      <li><strong>Direct Communication:</strong> Contact our customer service team</li>
                      <li><strong>Mediation:</strong> Independent third-party mediation if needed</li>
                      <li><strong>Arbitration:</strong> Binding arbitration for unresolved disputes</li>
                      <li><strong>Legal Action:</strong> Courts of jurisdiction in customer's country</li>
                    </ol>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-5">
                <h2 className="h4 text-primary mb-3">9. Force Majeure</h2>
                <p className="text-muted">
                  VIP International Shipping is not liable for delays or failures due to circumstances 
                  beyond our control, including but not limited to:
                </p>
                <Row>
                  <Col md={6}>
                    <ul className="small">
                      <li>Natural disasters and weather events</li>
                      <li>Government regulations and restrictions</li>
                      <li>Port strikes and labor disputes</li>
                      <li>Customs delays and inspections</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="small">
                      <li>Political instability and conflicts</li>
                      <li>Pandemic-related restrictions</li>
                      <li>Transportation infrastructure failures</li>
                      <li>Currency fluctuations affecting costs</li>
                    </ul>
                  </Col>
                </Row>
              </section>

              <section className="mb-4">
                <h2 className="h4 text-primary mb-3">10. Contact Information</h2>
                <Card className="border-primary">
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <h6 className="text-primary">Customer Service:</h6>
                        <p className="small mb-2">
                          <strong>Phone:</strong> +1-800-VIP-SHIP<br />
                          <strong>Email:</strong> support@vipshipping.com<br />
                          <strong>Hours:</strong> 24/7 Multilingual Support
                        </p>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-primary">Legal Department:</h6>
                        <p className="small mb-2">
                          <strong>Email:</strong> legal@vipshipping.com<br />
                          <strong>Address:</strong> 123 Shipping Lane, Port City, PC 12345<br />
                          <strong>License:</strong> International Freight Forwarder #12345
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </section>

              <div className="text-center border-top pt-4">
                <p className="text-muted small mb-0">
                  These terms are governed by international shipping law and the laws of the customer's jurisdiction.
                  By using our services, you acknowledge that you have read, understood, and agree to these terms.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
