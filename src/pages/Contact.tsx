import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetFormData } from '../redux/contactSlice';
import { RootState } from '../redux/store';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { 
  Envelope, 
  Telephone, 
  GeoAlt, 
  Clock, 
  Whatsapp,
  Send,
  CheckCircle
} from 'react-bootstrap-icons';
import IconWrapper from '../components/UI/IconWrapper';
import PhoneInput from 'react-phone-input-2';
import { trackPageView } from '../utils/analytics';
// import 'react-phone-input-2/lib/style.css';

const Contact: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    trackPageView('contact');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`); // בדיקה
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    // ניתן לוודא שהערך הוא מספר תקני ולטפל במקרים לא תקניים
    if (value && value.length > 0) {
      dispatch(setFormData({ ...formData, phone: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.phone || !formData.question) {
      alert('נא למלא את כל השדות');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        alert(`תודה על פנייתך, ${formData.name}`);
        dispatch(resetFormData());
      } else {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        alert('שגיאה בשליחת הטופס.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('אירעה שגיאה בשליחת ההודעה.');
    }
  };
  

  const contactInfo = [
    {
      icon: <IconWrapper icon={Telephone} size={24} className="text-primary" />,
      title: 'טלפון',
      details: ['+1 (555) 123-4567', '+972 3-123-4567', '+44 20 7123-4567'],
      available: '24/7 תמיכה בעברית ואנגלית',
      urgent: true
    },
    {
      icon: <IconWrapper icon={Envelope} size={24} className="text-success" />,
      title: 'אימייל',
      details: ['info@vipshipping.com', 'quotes@vipshipping.com', 'support@vipshipping.com'],
      available: 'תגובה מובטחת תוך שעתיים',
      urgent: false
    },
    {
      icon: <IconWrapper icon={GeoAlt} size={24} className="text-info" />,
      title: 'משרדים עולמיים',
      details: [
        '🇺🇸 ניו יורק: 123 Shipping Ave, NY 10001',
        '🇮🇱 תל אביב: רחוב הובלות 15, ת"א 6512',
        '🇬🇧 לונדון: 45 Logistics St, London EC1'
      ],
      available: 'ביקורים בתיאום מראש',
      urgent: false
    },
    {
      icon: <IconWrapper icon={Whatsapp} size={24} className="text-success" />,
      title: 'WhatsApp Business',
      details: ['+972 50-123-4567', 'תמיכה מיידית בצ\'אט'],
      available: 'זמין 24/7 - תגובה תוך דקות',
      urgent: true
    }
  ];

  const officeHours = [
    { location: '🇮🇱 ישראל', hours: 'ראשון-חמישי: 8:00-18:00, שישי: 8:00-14:00', timezone: 'GMT+2' },
    { location: '🇺🇸 ארה"ב', hours: 'Monday-Friday: 9:00-17:00 EST', timezone: 'GMT-5' },
    { location: '🇬🇧 בריטניה', hours: 'Monday-Friday: 9:00-17:00 GMT', timezone: 'GMT+0' }
  ];

  const emergencyContacts = [
    { type: 'חירום משלוח', number: '+972 50-911-1234', available: '24/7' },
    { type: 'תמיכה טכנית', number: '+1 555-TECH-911', available: '24/7' },
    { type: 'שירות לקוחות VIP', number: '+972 3-VIP-1234', available: 'ראשון-שישי' }
  ];

  return (
    <Container className="my-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">צור קשר</h1>
          <p className="lead text-muted mb-4">
            נשמח לעמוד לשירותכם ולענות על כל שאלה
          </p>
        </Col>
      </Row>

      <Row>
        {/* Contact Info */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h4 className="mb-4">פרטי התקשרות</h4>
              
              {contactInfo.map((info, index) => (
                <div key={index} className={`mb-4 p-3 rounded ${info.urgent ? 'bg-light border-start border-3 border-primary' : ''}`}>
                  <div className="d-flex align-items-center mb-2">
                    {info.icon}
                    <h6 className="mb-0 ms-2">{info.title}</h6>
                    {info.urgent && <Badge bg="danger" className="ms-2">חירום</Badge>}
                  </div>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="mb-1 text-muted small">
                      {detail}
                    </p>
                  ))}
                  <small className="text-primary fw-semibold">{info.available}</small>
                </div>
              ))}

              {/* Emergency Contacts */}
              <Alert variant="danger" className="mt-4">
                <h6 className="mb-3">
                  🚨 <strong>יצירת קשר חירום</strong>
                </h6>
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">{contact.type}:</span>
                    <div className="text-end">
                      <div className="fw-bold">{contact.number}</div>
                      <small>{contact.available}</small>
                    </div>
                  </div>
                ))}
              </Alert>

              {/* Office Hours */}
              <Card className="mt-4 border-info">
                <Card.Header className="bg-info text-white">
                  <IconWrapper icon={Clock} className="me-2" />
                  <strong>שעות פעילות עולמיות</strong>
                </Card.Header>
                <Card.Body className="p-3">
                  {officeHours.map((office, index) => (
                    <div key={index} className="mb-2">
                      <div className="fw-semibold">{office.location}</div>
                      <div className="text-muted small">{office.hours}</div>
                      <Badge bg="light" text="dark" className="me-2">{office.timezone}</Badge>
                    </div>
                  ))}
                </Card.Body>
              </Card>

            </Card.Body>
          </Card>
        </Col>

        {/* Contact Form */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-4">שלח לנו הודעה</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>שם מלא</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="הכנס את שמך המלא"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>כתובת אימייל</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>מספר טלפון</Form.Label>
                  <PhoneInput
                    country="il"
                    value={formData.phone ? String(formData.phone) : ''}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      title: 'Enter phone number',
                      'aria-label': 'Enter phone number'
                    }}
                    inputStyle={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #ced4da'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>נושא</Form.Label>
                  <Form.Select
                    name="subject"
                    onChange={handleChange}
                    required
                    title="Select subject"
                    aria-label="Select subject"
                    aria-describedby="subject-help"
                  >
                    <option value="">בחר נושא...</option>
                    <option value="quote">בקשת הצעת מחיר</option>
                    <option value="tracking">מעקב אחר משלוח</option>
                    <option value="insurance">שאלות ביטוח</option>
                    <option value="complaint">תלונה</option>
                    <option value="general">כללי</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formQuestion">
                  <Form.Label>הודעתך</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="question"
                    value={formData.question || ''}
                    onChange={handleChange}
                    placeholder="כתב כאן את השאלה או ההודעה שלך..."
                    required
                    rows={5}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConsent">
                  <Form.Check
                    type="checkbox"
                    label="אני מסכים לקבלת עדכונים ופרסומות במייל"
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    <IconWrapper icon={Send} className="me-2" />
                    שלח הודעה
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <hr />
                <p className="text-muted mb-3">או צור קשר ישירות:</p>
                <div className="d-flex justify-content-center gap-2">
                  <Button variant="success" href="https://wa.me/15551234567">
                    <IconWrapper icon={Whatsapp} className="me-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline-primary" href="tel:+15551234567">
                    <IconWrapper icon={Telephone} className="me-2" />
                    התקשר עכשיו
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ מורחב */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-lg">
            <Card.Header className="bg-primary text-white text-center">
              <h4 className="mb-0">💬 שאלות נפוצות ותשובות מקצועיות</h4>
              <small>המידע שאתם הכי צריכים לדעת</small>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">⏱️ כמה זמן לוקחת הובלה בינלאומית?</h6>
                      <p className="text-muted mb-1">
                        <strong>הובלה ימית:</strong> 14-35 ימים (חסכונית)<br />
                        <strong>הובלה אווירית:</strong> 3-7 ימים (מהירה)<br />
                        <strong>הובלה יבשתית:</strong> 5-14 ימים (אירופה)<br />
                        <strong>שירות אקספרס:</strong> 24-48 שעות (דחוף)
                      </p>
                    </div>
                  </div>
                </Col>
                
                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">🛡️ איזה ביטוח כלול במחיר?</h6>
                      <p className="text-muted mb-1">
                        <strong>ביטוח בסיסי:</strong> כלול חינם (עד $1,000)<br />
                        <strong>ביטוח מקיף:</strong> 2-3% מהערך ($10,000+)<br />
                        <strong>ביטוח פרימיום:</strong> כיסוי מלא + החלפה<br />
                        <strong>ביטוח מיוחד:</strong> יצירות אמנות ופריטי יוקרה
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">💰 מה כולל המחיר שלכם?</h6>
                      <p className="text-muted mb-1">
                        ✅ איסוף מהבית/משרד<br />
                        ✅ אריזה מקצועית (אופציונלי)<br />
                        ✅ הובלה בינלאומית מלאה<br />
                        ✅ ביטוח בסיסי וטיפול במכס<br />
                        ✅ מעקב GPS בזמן אמת<br />
                        ✅ מסירה ליעד הסופי
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">📍 איך אני עוקב אחר המשלוח?</h6>
                      <p className="text-muted mb-1">
                        🔍 <strong>מעקב מתקדם:</strong><br />
                        • GPS בזמן אמת עם מפה<br />
                        • עדכוני SMS ואימייל אוטומטיים<br />
                        • אפליקציית מובייל מותאמת<br />
                        • ChatBot חכם למידע מיידי<br />
                        • פוש נוטיפיקיישן לכל שלב
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">🚚 איזה פריטים אפשר לשלוח?</h6>
                      <p className="text-muted mb-1">
                        ✅ רהיטים ומוצרי בית<br />
                        ✅ אלקטרוניקה ומחשבים<br />
                        ✅ יצירות אמנות וחפצי ערך<br />
                        ✅ רכבים ואופנועים<br />
                        ✅ מכונות וציוד תעשייתי<br />
                        ❌ חומרים מסוכנים (בתנאים מיוחדים)
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">💳 אילו אמצעי תשלום מקבלים?</h6>
                      <p className="text-muted mb-1">
                        💳 כרטיסי אשראי (Visa, MasterCard, AMEX)<br />
                        🏦 העברה בנקאית בינלאומית<br />
                        💰 PayPal ו-Stripe מאובטחים<br />
                        📱 Apple Pay ו-Google Pay<br />
                        🏢 חשבוניות לחברות (באשראי)<br />
                        ₿ מטבעות דיגיטליים (Bitcoin, USDC)
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">🌍 לאילו מדינות אתם משלחים?</h6>
                      <p className="text-muted mb-1">
                        🌎 <strong>120+ מדינות ברחבי העולם:</strong><br />
                        • כל אירופה (שירות מהיר)<br />
                        • ארה"ב וקנדה (קווים קבועים)<br />
                        • אסיה ואוסטרליה (שותפים מקומיים)<br />
                        • אמריקה הלטינית ואפריקה<br />
                        • איים ויבשות מרוחקות
                      </p>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="mb-4">
                  <div className="d-flex align-items-start">
                    <IconWrapper icon={CheckCircle} className="text-success me-3 mt-1" size={20} />
                    <div>
                      <h6 className="text-primary">🤖 מה זה שירותי AI שלכם?</h6>
                      <p className="text-muted mb-1">
                        🧠 <strong>טכנולוגיות חכמות:</strong><br />
                        • ChatBot עם NLP מתקדם<br />
                        • חיזוי מחירים בלמידת מכונה<br />
                        • אופטימיזציה אוטומטית של מסלולים<br />
                        • המלצות מותאמות אישית<br />
                        • ניתוח סיכונים ותחזיות עיכובים
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* קישורים שימושיים */}
              <div className="bg-light rounded-3 p-4 mt-4">
                <h6 className="mb-3 text-center">🔗 קישורים שימושיים</h6>
                <Row className="text-center">
                  <Col md={3} className="mb-2">
                    <Button variant="outline-primary" size="sm" className="w-100">
                      📋 מדריך אריזה
                    </Button>
                  </Col>
                  <Col md={3} className="mb-2">
                    <Button variant="outline-success" size="sm" className="w-100">
                      📄 מחשבון מכס
                    </Button>
                  </Col>
                  <Col md={3} className="mb-2">
                    <Button variant="outline-info" size="sm" className="w-100">
                      🗺️ מפת שירותים
                    </Button>
                  </Col>
                  <Col md={3} className="mb-2">
                    <Button variant="outline-warning" size="sm" className="w-100">
                      📞 הזמן שיחה
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* מפה אינטראקטיבית */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">
                <IconWrapper icon={GeoAlt} className="me-2" />
                מיקום המשרדים שלנו
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <div className="text-center text-white">
                  <IconWrapper icon={GeoAlt} size={48} className="mb-3" />
                  <h5>מפה אינטראקטיבית</h5>
                  <p>בקרוב: Google Maps עם מיקום המשרדים</p>
                  <Button variant="light" size="sm">
                    📍 הצג הוראות הגעה
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
