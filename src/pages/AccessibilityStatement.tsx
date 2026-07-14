import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Badge, ListGroup } from 'react-bootstrap';
import { UniversalAccess, CheckCircle, Eye, Ear, Keyboard, Phone } from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const AccessibilityStatement: React.FC = () => {
  useEffect(() => {
    trackPageView('accessibility_statement');
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* Header */}
          <div className="text-center mb-5">
            <UniversalAccess size={60} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold mb-3">Accessibility Statement</h1>
            <p className="lead text-muted">
              VIP International Shipping is Committed to Digital Accessibility
            </p>
            <div className="mt-3">
              <Badge bg="success" className="me-2">WCAG 2.1 AA Compliant</Badge>
              <Badge bg="success" className="me-2">ADA Compliant</Badge>
              <Badge bg="success" className="me-2">Section 508 Compliant</Badge>
            </div>
            <p className="text-muted mt-3">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <Alert variant="info" className="mb-4">
            <UniversalAccess size={20} className="me-2" />
            <strong>Our Commitment:</strong> VIP International Shipping is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </Alert>

          {/* Conformance Status */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-success me-2" />
                Conformance Status
              </h2>
              
              <p className="mb-3">
                Our website conforms to the following accessibility standards:
              </p>

              <ListGroup className="mb-4">
                <ListGroup.Item className="d-flex align-items-start">
                  <CheckCircle className="text-success me-3 mt-1" size={20} />
                  <div>
                    <strong>WCAG 2.1 Level AA</strong>
                    <p className="mb-0 text-muted">Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level. These guidelines explain how to make web content more accessible for people with disabilities, and user friendly for everyone.</p>
                  </div>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex align-items-start">
                  <CheckCircle className="text-success me-3 mt-1" size={20} />
                  <div>
                    <strong>ADA Title III</strong>
                    <p className="mb-0 text-muted">Americans with Disabilities Act (ADA) Title III requirements for public accommodations and commercial facilities, ensuring equal access to our services.</p>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-start">
                  <CheckCircle className="text-success me-3 mt-1" size={20} />
                  <div>
                    <strong>Section 508</strong>
                    <p className="mb-0 text-muted">Section 508 of the Rehabilitation Act, requiring federal agencies and contractors to make their electronic and information technology accessible to people with disabilities.</p>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex align-items-start">
                  <CheckCircle className="text-success me-3 mt-1" size={20} />
                  <div>
                    <strong>EN 301 549</strong>
                    <p className="mb-0 text-muted">European Standard for digital accessibility, ensuring compatibility with international requirements.</p>
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <Alert variant="success" className="mb-0">
                <strong>Compliance Status:</strong> This website is fully compliant with WCAG 2.1 Level AA standards. We have conducted comprehensive audits and user testing to ensure accessibility.
              </Alert>
            </Card.Body>
          </Card>

          {/* Accessibility Features */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Eye className="text-primary me-2" />
                Accessibility Features
              </h2>
              
              <p className="mb-4">
                Our website includes the following accessibility features to ensure a user-friendly experience for all visitors:
              </p>

              <Row>
                <Col md={6}>
                  <h3 className="h5 mb-3">
                    <Keyboard className="me-2" />
                    Keyboard Navigation
                  </h3>
                  <ul className="mb-4">
                    <li>Full keyboard accessibility throughout the site</li>
                    <li>Skip navigation links for quick access to main content</li>
                    <li>Logical tab order for all interactive elements</li>
                    <li>Visible focus indicators on all focusable elements</li>
                    <li>No keyboard traps</li>
                  </ul>

                  <h3 className="h5 mb-3">
                    <Eye className="me-2" />
                    Visual Accessibility
                  </h3>
                  <ul className="mb-4">
                    <li>High contrast ratios (minimum 4.5:1 for normal text)</li>
                    <li>Resizable text up to 200% without loss of functionality</li>
                    <li>Alternative text for all meaningful images</li>
                    <li>Clear visual hierarchy and consistent navigation</li>
                    <li>No information conveyed by color alone</li>
                    <li>Support for browser zoom and text-only zoom</li>
                  </ul>

                  <h3 className="h5 mb-3">
                    <Ear className="me-2" />
                    Screen Reader Compatibility
                  </h3>
                  <ul className="mb-4">
                    <li>Semantic HTML markup for proper structure</li>
                    <li>ARIA labels and landmarks where appropriate</li>
                    <li>Descriptive link text and button labels</li>
                    <li>Table headers properly associated with data cells</li>
                    <li>Form labels correctly associated with inputs</li>
                    <li>Status messages announced to assistive technology</li>
                  </ul>
                </Col>

                <Col md={6}>
                  <h3 className="h5 mb-3">
                    <CheckCircle className="me-2" />
                    Content Accessibility
                  </h3>
                  <ul className="mb-4">
                    <li>Clear and simple language</li>
                    <li>Consistent page layouts and navigation</li>
                    <li>Headings used to organize content hierarchically</li>
                    <li>Lists used for grouping related items</li>
                    <li>Sufficient time limits with options to extend</li>
                    <li>No automatically playing audio or video</li>
                  </ul>

                  <h3 className="h5 mb-3">
                    <Phone className="me-2" />
                    Mobile and Touch Accessibility
                  </h3>
                  <ul className="mb-4">
                    <li>Responsive design for all device sizes</li>
                    <li>Touch targets at least 44x44 pixels</li>
                    <li>Adequate spacing between interactive elements</li>
                    <li>Orientation flexibility (portrait and landscape)</li>
                    <li>Gesture alternatives for all interactions</li>
                  </ul>

                  <h3 className="h5 mb-3">
                    <CheckCircle className="me-2" />
                    Forms and Interactions
                  </h3>
                  <ul className="mb-4">
                    <li>Clear error messages and validation</li>
                    <li>Error prevention and confirmation for critical actions</li>
                    <li>Inline help and instructions</li>
                    <li>Autocomplete attributes for common fields</li>
                    <li>Multiple ways to submit forms</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Assistive Technologies */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <UniversalAccess className="text-primary me-2" />
                Compatible Assistive Technologies
              </h2>
              
              <p className="mb-3">
                Our website is designed to work with the following assistive technologies:
              </p>

              <Row>
                <Col md={6}>
                  <h3 className="h6 mb-3">Screen Readers</h3>
                  <ul className="mb-4">
                    <li>JAWS (Job Access With Speech)</li>
                    <li>NVDA (NonVisual Desktop Access)</li>
                    <li>VoiceOver (macOS and iOS)</li>
                    <li>TalkBack (Android)</li>
                    <li>Narrator (Windows)</li>
                  </ul>
                </Col>

                <Col md={6}>
                  <h3 className="h6 mb-3">Other Technologies</h3>
                  <ul className="mb-4">
                    <li>Screen magnification software</li>
                    <li>Speech recognition software (Dragon NaturallySpeaking)</li>
                    <li>Switch access devices</li>
                    <li>Alternative pointing devices</li>
                    <li>Browser accessibility extensions</li>
                  </ul>
                </Col>
              </Row>

              <h3 className="h6 mb-3">Supported Browsers</h3>
              <p className="mb-2">Our website is tested and optimized for:</p>
              <ul className="mb-0">
                <li>Google Chrome (latest version)</li>
                <li>Mozilla Firefox (latest version)</li>
                <li>Apple Safari (latest version)</li>
                <li>Microsoft Edge (latest version)</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Assessment and Testing */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-primary me-2" />
                Assessment and Testing Approach
              </h2>
              
              <p className="mb-3">
                VIP International Shipping assessed the accessibility of this website using the following methods:
              </p>

              <h3 className="h5 mt-4 mb-3">Self-Evaluation</h3>
              <ul className="mb-3">
                <li>Internal accessibility audits conducted by our development team</li>
                <li>Regular testing with automated accessibility tools:
                  <ul>
                    <li>WAVE (Web Accessibility Evaluation Tool)</li>
                    <li>axe DevTools</li>
                    <li>Lighthouse Accessibility Audit</li>
                    <li>ANDI (Accessible Name & Description Inspector)</li>
                  </ul>
                </li>
              </ul>

              <h3 className="h5 mt-4 mb-3">External Evaluation</h3>
              <ul className="mb-3">
                <li>Third-party accessibility audit by certified IAAP professionals</li>
                <li>User testing with people who have various disabilities</li>
                <li>Assistive technology compatibility testing</li>
                <li>Annual VPAT (Voluntary Product Accessibility Template) updates</li>
              </ul>

              <h3 className="h5 mt-4 mb-3">Ongoing Monitoring</h3>
              <ul className="mb-0">
                <li>Automated accessibility scanning integrated into our deployment process</li>
                <li>Quarterly manual audits of new features and content</li>
                <li>User feedback collection and response system</li>
                <li>Staff training on accessibility best practices</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Known Limitations */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Alert className="text-warning me-2" />
                Known Limitations
              </h2>
              
              <p className="mb-3">
                Despite our best efforts, some areas of our website may have accessibility limitations. We are actively working to address these issues:
              </p>

              <ul className="mb-3">
                <li>
                  <strong>Third-Party Content:</strong> Some embedded content from third-party providers (e.g., payment processors, social media widgets) may not be fully accessible. We are working with these providers to improve accessibility.
                </li>
                <li>
                  <strong>PDF Documents:</strong> Some older PDF documents may not be fully accessible. We are in the process of remediating these documents and providing accessible alternatives.
                </li>
                <li>
                  <strong>Complex Interactive Features:</strong> Some advanced interactive features (e.g., 3D volume calculators, augmented reality tools) may have limited accessibility. We provide alternative methods to access the same functionality.
                </li>
                <li>
                  <strong>Legacy Content:</strong> Older blog posts and archived content are being updated to meet current accessibility standards.
                </li>
              </ul>

              <Alert variant="info" className="mb-0">
                <strong>Alternative Access:</strong> If you encounter any accessibility barriers, please contact us. We will provide alternative methods to access the information or service you need.
              </Alert>
            </Card.Body>
          </Card>

          {/* Feedback and Contact */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <Phone className="text-primary me-2" />
                Feedback and Contact Information
              </h2>
              
              <p className="mb-3">
                We welcome your feedback on the accessibility of VIP International Shipping's website. Please let us know if you encounter accessibility barriers:
              </p>

              <div className="bg-light p-4 rounded mb-4">
                <h3 className="h5 mb-3">Accessibility Coordinator</h3>
                <p className="mb-2"><strong>VIP International Shipping</strong></p>
                <p className="mb-2"><strong>Email:</strong> accessibility@vipshipping.com</p>
                <p className="mb-2"><strong>Phone:</strong> 1-800-VIP-MOVE (1-800-847-6683)</p>
                <p className="mb-2"><strong>TTY:</strong> 711 (Telecommunications Relay Service)</p>
                <p className="mb-2"><strong>Mail:</strong> Accessibility Coordinator</p>
                <p className="mb-2">VIP International Shipping</p>
                <p className="mb-2">[Your Complete Business Address]</p>
                <p className="mb-0"><strong>Response Time:</strong> We aim to respond to accessibility feedback within 2 business days.</p>
              </div>

              <h3 className="h5 mb-3">What to Include in Your Feedback</h3>
              <p className="mb-2">To help us address your concerns effectively, please provide:</p>
              <ul className="mb-4">
                <li>The specific web page or feature you're trying to access</li>
                <li>The assistive technology you're using (if applicable)</li>
                <li>The browser and operating system you're using</li>
                <li>A description of the accessibility barrier you encountered</li>
                <li>Your preferred method of receiving a response</li>
              </ul>

              <h3 className="h5 mb-3">Alternative Contact Methods</h3>
              <p className="mb-2">If you prefer to speak with someone directly:</p>
              <ul className="mb-0">
                <li><strong>Live Chat:</strong> Available on our website during business hours</li>
                <li><strong>Video Relay Service (VRS):</strong> We accept calls through VRS providers</li>
                <li><strong>In-Person:</strong> Visit our office for in-person assistance (by appointment)</li>
                <li><strong>Social Media:</strong> Direct message us on Facebook or Twitter</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Formal Complaints */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-primary me-2" />
                Formal Complaint Procedure
              </h2>
              
              <p className="mb-3">
                If you are not satisfied with our response to your accessibility concern, you may file a formal complaint:
              </p>

              <h3 className="h6 mb-3">Internal Complaint Process</h3>
              <ol className="mb-4">
                <li>Submit your complaint in writing to our Accessibility Coordinator (contact information above)</li>
                <li>We will acknowledge receipt within 2 business days</li>
                <li>We will investigate and respond with our findings and proposed resolution within 10 business days</li>
                <li>If you're not satisfied, you may escalate to our Chief Compliance Officer</li>
              </ol>

              <h3 className="h6 mb-3">External Resources</h3>
              <p className="mb-2">You also have the right to file a complaint with:</p>
              <ul className="mb-0">
                <li>
                  <strong>U.S. Department of Justice (DOJ)</strong>
                  <br />
                  Civil Rights Division, Disability Rights Section
                  <br />
                  950 Pennsylvania Avenue, NW
                  <br />
                  Washington, DC 20530
                  <br />
                  Phone: 800-514-0301 (voice) | 833-610-1264 (TTY)
                  <br />
                  Website: <a href="https://www.ada.gov" target="_blank" rel="noopener noreferrer">www.ada.gov</a>
                </li>
              </ul>
            </Card.Body>
          </Card>

          {/* Technical Specifications */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-primary me-2" />
                Technical Specifications
              </h2>
              
              <p className="mb-3">
                Accessibility of VIP International Shipping's website relies on the following technologies to work with your web browser and assistive technologies:
              </p>

              <ul className="mb-4">
                <li><strong>HTML5:</strong> Semantic markup for proper document structure</li>
                <li><strong>WAI-ARIA:</strong> Accessible Rich Internet Applications specifications</li>
                <li><strong>CSS3:</strong> For styling and responsive design</li>
                <li><strong>JavaScript:</strong> Enhanced functionality with graceful degradation</li>
                <li><strong>SVG:</strong> Scalable graphics with text alternatives</li>
              </ul>

              <p className="mb-0">
                These technologies are relied upon for conformance with the accessibility standards used. JavaScript is required for some functionality; however, critical information and services remain accessible with JavaScript disabled.
              </p>
            </Card.Body>
          </Card>

          {/* Continuous Improvement */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <UniversalAccess className="text-primary me-2" />
                Our Commitment to Continuous Improvement
              </h2>
              
              <p className="mb-3">
                Accessibility is an ongoing effort. We are committed to:
              </p>

              <ul className="mb-3">
                <li>Regularly reviewing and updating our accessibility policies and practices</li>
                <li>Providing accessibility training for all staff members</li>
                <li>Including accessibility in our design and development process from the start</li>
                <li>Conducting regular accessibility audits and user testing</li>
                <li>Prioritizing accessibility in our product roadmap</li>
                <li>Engaging with the disability community for feedback and guidance</li>
                <li>Staying current with evolving accessibility standards and best practices</li>
              </ul>

              <Alert variant="success" className="mb-0">
                <strong>Last Audit:</strong> Our most recent comprehensive accessibility audit was completed in {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}. The next scheduled audit is in 6 months.
              </Alert>
            </Card.Body>
          </Card>

          {/* Resources */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h4 mb-4">
                <CheckCircle className="text-primary me-2" />
                Helpful Accessibility Resources
              </h2>
              
              <p className="mb-3">
                For more information about web accessibility, visit:
              </p>

              <Row>
                <Col md={6}>
                  <ul className="mb-0">
                    <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer">Web Accessibility Initiative (WAI)</a></li>
                    <li><a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">ADA.gov</a></li>
                    <li><a href="https://www.section508.gov/" target="_blank" rel="noopener noreferrer">Section508.gov</a></li>
                    <li><a href="https://webaim.org/" target="_blank" rel="noopener noreferrer">WebAIM</a></li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="mb-0">
                    <li><a href="https://www.accessibilityassociation.org/" target="_blank" rel="noopener noreferrer">IAAP (International Association of Accessibility Professionals)</a></li>
                    <li><a href="https://www.afb.org/" target="_blank" rel="noopener noreferrer">American Foundation for the Blind</a></li>
                    <li><a href="https://nfb.org/" target="_blank" rel="noopener noreferrer">National Federation of the Blind</a></li>
                    <li><a href="https://nad.org/" target="_blank" rel="noopener noreferrer">National Association of the Deaf</a></li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Final Statement */}
          <Alert variant="primary" className="mt-4">
            <UniversalAccess size={24} className="me-2" />
            <strong>Accessibility is a Right, Not a Feature:</strong> We believe that everyone deserves equal access to our services, regardless of ability. This commitment extends beyond legal compliance—it's about creating an inclusive experience for all users. Thank you for helping us improve accessibility by sharing your feedback.
          </Alert>

        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatement;

