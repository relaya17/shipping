import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FileText, Shield, ExclamationCircle, CheckCircle } from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    trackPageView('terms_of_service');
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* Header */}
          <div className="text-center mb-5">
            <FileText size={60} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold mb-3">Terms of Service</h1>
            <p className="lead text-muted">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Alert */}
          <Alert variant="info" className="mb-4">
            <ExclamationCircle size={20} className="me-2" />
            <strong>Important:</strong> Please read these terms carefully before using our services. By accessing or using VIP International Shipping services, you agree to be bound by these Terms of Service.
          </Alert>

          {/* Content */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the services provided by VIP International Shipping ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our services.
              </p>
              <p>
                These Terms of Service govern your use of our website, mobile applications, and all related services (collectively, the "Services").
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                2. Services Provided
              </h2>
              <p>
                VIP International Shipping provides international moving and shipping services, including but not limited to:
              </p>
              <ul className="mb-3">
                <li>International household moving</li>
                <li>Vehicle shipping (cars, motorcycles)</li>
                <li>Specialty item shipping (pianos, artwork, antiques)</li>
                <li>Packing and crating services</li>
                <li>Storage solutions</li>
                <li>Customs clearance assistance</li>
                <li>Insurance coverage</li>
              </ul>
              <p>
                All services are subject to availability and may vary based on origin and destination countries, as well as specific item requirements.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                3. Quotes and Pricing
              </h2>
              <p>
                <strong>3.1 Quote Validity:</strong> All quotes provided are estimates based on the information you provide. Final pricing may vary based on actual shipment details, weight, volume, and additional services required.
              </p>
              <p>
                <strong>3.2 Quote Duration:</strong> Quotes are typically valid for 30 days from the date of issue. Prices are subject to change due to fuel surcharges, exchange rate fluctuations, or changes in carrier rates.
              </p>
              <p>
                <strong>3.3 Additional Charges:</strong> Additional fees may apply for services such as:
              </p>
              <ul className="mb-3">
                <li>Long carry (distance from truck to door)</li>
                <li>Stair carry</li>
                <li>Waiting time</li>
                <li>Storage</li>
                <li>Customs duties and taxes</li>
                <li>Weekend or holiday delivery</li>
                <li>Expedited services</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                4. Payment Terms
              </h2>
              <p>
                <strong>4.1 Deposit:</strong> A deposit of 25-50% of the total estimated cost is required to confirm your booking and secure shipping space.
              </p>
              <p>
                <strong>4.2 Final Payment:</strong> The balance is due before or upon delivery, unless otherwise agreed in writing.
              </p>
              <p>
                <strong>4.3 Payment Methods:</strong> We accept major credit cards, wire transfers, and certified checks. Payment plans may be available for qualifying customers.
              </p>
              <p>
                <strong>4.4 Late Payment:</strong> Late payments may incur storage fees and interest charges of 1.5% per month or the maximum allowed by law.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                5. Customer Responsibilities
              </h2>
              <p>
                <strong>5.1 Accurate Information:</strong> You must provide accurate and complete information regarding your shipment, including a detailed inventory, declared value, and special handling requirements.
              </p>
              <p>
                <strong>5.2 Prohibited Items:</strong> You agree not to ship any prohibited or restricted items, including but not limited to:
              </p>
              <ul className="mb-3">
                <li>Hazardous materials (flammable, explosive, toxic substances)</li>
                <li>Illegal drugs or contraband</li>
                <li>Weapons and ammunition</li>
                <li>Perishable goods</li>
                <li>Live animals or plants</li>
                <li>Irreplaceable items (original documents, currency)</li>
                <li>Items prohibited by destination country regulations</li>
              </ul>
              <p>
                <strong>5.3 Proper Packing:</strong> If you choose to pack your own items, you are responsible for proper packing and crating. We are not liable for damage to customer-packed items unless you purchase our professional packing services.
              </p>
              <p>
                <strong>5.4 Access and Preparation:</strong> You must ensure proper access for loading and unloading, including adequate parking, elevator reservations, and building permits if required.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                6. Liability and Insurance
              </h2>
              <p>
                <strong>6.1 Basic Coverage:</strong> Our basic liability coverage is $0.60 per pound per article, as mandated by federal regulations for international shipments.
              </p>
              <p>
                <strong>6.2 Full Value Protection:</strong> We strongly recommend purchasing full value protection insurance for comprehensive coverage. This covers the actual value of your items up to your declared amount.
              </p>
              <p>
                <strong>6.3 Claims:</strong> All damage or loss claims must be filed within 9 months of delivery date. Claims must be submitted in writing with supporting documentation, including photos, original receipts, and appraisals where applicable.
              </p>
              <p>
                <strong>6.4 Limitations:</strong> We are not liable for:
              </p>
              <ul className="mb-3">
                <li>Acts of God, natural disasters, or force majeure events</li>
                <li>Damage resulting from improper packing (customer-packed items)</li>
                <li>Items not listed on the inventory</li>
                <li>Normal wear and tear during transit</li>
                <li>Indirect or consequential damages</li>
                <li>Delays due to customs, strikes, or government actions</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                7. Cancellation and Refunds
              </h2>
              <p>
                <strong>7.1 Customer Cancellation:</strong> If you cancel your shipment:
              </p>
              <ul className="mb-3">
                <li>More than 14 days before scheduled pickup: Full refund minus $250 administrative fee</li>
                <li>7-14 days before pickup: 50% refund of deposit</li>
                <li>Less than 7 days before pickup: No refund</li>
                <li>After pickup: No refund; storage fees apply</li>
              </ul>
              <p>
                <strong>7.2 Company Cancellation:</strong> We reserve the right to cancel services if payment is not received, if you provide false information, or if shipping the items would violate any laws or regulations. In such cases, deposits will be refunded minus any costs incurred.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                8. Delivery and Storage
              </h2>
              <p>
                <strong>8.1 Delivery Windows:</strong> Delivery dates are estimates and not guaranteed. International shipping timelines can vary due to customs clearance, weather, port congestion, and other factors beyond our control.
              </p>
              <p>
                <strong>8.2 Failed Delivery:</strong> If delivery cannot be completed due to recipient unavailability, improper address, or access issues, items will be placed in storage at your expense.
              </p>
              <p>
                <strong>8.3 Storage Fees:</strong> Storage fees begin accruing after the first 7 days of free storage. Current rates are $25 per cubic meter per week or fraction thereof.
              </p>
              <p>
                <strong>8.4 Abandoned Property:</strong> Items left in storage for more than 90 days without payment or communication may be considered abandoned and sold to offset storage and shipping costs.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                9. Customs and Import Regulations
              </h2>
              <p>
                <strong>9.1 Customer Responsibility:</strong> You are responsible for complying with all customs regulations, import/export laws, and paying all duties, taxes, and fees in both origin and destination countries.
              </p>
              <p>
                <strong>9.2 Documentation:</strong> You must provide all required documentation, including but not limited to: passport copies, visas, work permits, inventory lists, and any special permits required for restricted items.
              </p>
              <p>
                <strong>9.3 Customs Delays:</strong> We are not responsible for delays caused by customs inspections, missing documentation, or regulatory issues.
              </p>
              <p>
                <strong>9.4 Restricted Items:</strong> Some countries prohibit or restrict certain items. It is your responsibility to research and comply with destination country regulations.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                10. Intellectual Property
              </h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of VIP International Shipping or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works of our content without express written permission.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                11. Privacy and Data Protection
              </h2>
              <p>
                Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.
              </p>
              <p>
                We comply with applicable data protection laws, including GDPR for European customers and CCPA for California residents.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                12. Dispute Resolution
              </h2>
              <p>
                <strong>12.1 Governing Law:</strong> These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.
              </p>
              <p>
                <strong>12.2 Arbitration:</strong> Any disputes arising from these Terms or our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, rather than in court.
              </p>
              <p>
                <strong>12.3 Class Action Waiver:</strong> You agree to resolve disputes on an individual basis and waive any right to participate in class action lawsuits.
              </p>
              <p>
                <strong>12.4 Mediation:</strong> Before initiating arbitration, parties agree to attempt resolution through mediation.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                13. Limitation of Liability
              </h2>
              <p>
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
              </p>
              <ul className="mb-3">
                <li>Our total liability shall not exceed the declared value of your shipment or $5,000, whichever is less</li>
                <li>We are not liable for indirect, incidental, special, consequential, or punitive damages</li>
                <li>We are not liable for delays, losses, or damages caused by events beyond our reasonable control</li>
                <li>We are not liable for loss of business, profits, data, or opportunity costs</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                14. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless VIP International Shipping, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from:
              </p>
              <ul className="mb-3">
                <li>Your violation of these Terms</li>
                <li>Your violation of any law or regulation</li>
                <li>Your shipment of prohibited or restricted items</li>
                <li>Inaccurate or incomplete information you provide</li>
                <li>Your negligence or willful misconduct</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                15. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
              </p>
              <p>
                We will notify you of material changes via email or prominent notice on our website.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                16. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                17. Contact Information
              </h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-light p-3 rounded mt-3">
                <p className="mb-2"><strong>VIP International Shipping</strong></p>
                <p className="mb-2">Email: legal@vipshipping.com</p>
                <p className="mb-2">Phone: 1-800-VIP-MOVE (1-800-847-6683)</p>
                <p className="mb-2">Address: [Your Business Address]</p>
                <p className="mb-0">Hours: Monday-Friday, 8:00 AM - 6:00 PM EST</p>
              </div>
            </Card.Body>
          </Card>

          {/* Footer Note */}
          <Alert variant="warning" className="mt-4">
            <Shield size={20} className="me-2" />
            <strong>Important Notice:</strong> These Terms of Service constitute a legally binding agreement. Please print or save a copy for your records. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </Alert>

        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;

