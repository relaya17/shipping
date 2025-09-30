import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  Globe, 
  Award, 
  ShieldCheck, 
  People, 
  Truck, 
  Clock,
  Star,
  CheckCircle
} from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';
import './About.css';

const About: React.FC = () => {
  useEffect(() => {
    trackPageView('about');
  }, []);

  const stats = [
    { number: '15+', label: 'שנות ניסיון', icon: <Clock size={32} />, color: 'primary' },
    { number: '120+', label: 'מדינות שירות', icon: <Globe size={32} />, color: 'success' },
    { number: '50,000+', label: 'משלוחים מוצלחים', icon: <Truck size={32} />, color: 'info' },
    { number: '99.8%', label: 'דירוג שביעות רצון', icon: <Award size={32} />, color: 'warning' }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'ניהול איכות בינלאומי', year: '2018' },
    { name: 'TAPA FSR', desc: 'אבטחת מטענים ברמה עליונה', year: '2020' },
    { name: 'IATA DGR', desc: 'הובלת חומרים מסוכנים', year: '2019' },
    { name: 'AEO Certificate', desc: 'מפעל כלכלי מורשה', year: '2021' }
  ];

  const timeline = [
    { year: '2009', event: 'הקמת החברה בתל אביב', milestone: 'התחלה' },
    { year: '2012', event: 'הרחבה לאירופה - 10,000 משלוחים', milestone: 'גדילה' },
    { year: '2016', event: 'פתיחת קווי אסיה ואמריקה', milestone: 'התרחבות' },
    { year: '2020', event: 'מעבר דיגיטלי מלא + AI', milestone: 'חדשנות' },
    { year: '2023', event: 'השקת AR ו-Machine Learning', milestone: 'מובילות' },
    { year: '2025', event: 'פלטפורמה חכמה מתקדמת ביותר', milestone: 'עתיד' }
  ];

  const features = [
    {
      icon: <ShieldCheck size={48} className="text-success" />,
      title: 'אמינות מוכחת',
      description: 'רישיון Federal Maritime Commission ו-15 שנות ניסיון בהובלות בינלאומיות'
    },
    {
      icon: <Globe size={48} className="text-primary" />,
      title: 'כיסוי עולמי',
      description: 'שירות לכל יבשות העולם עם שותפים מקומיים בכל מדינה'
    },
    {
      icon: <Truck size={48} className="text-info" />,
      title: 'שירות מקצה לקצה',
      description: 'מאיסוף בבית ועד הנחתה ביעד - אנחנו דואגים לכל הפרטים'
    },
    {
      icon: <Star size={48} className="text-warning" />,
      title: 'שירות אישי',
      description: 'כל לקוח מקבל נציג אישי המלווה אותו לאורך כל התהליך'
    }
  ];

  const team = [
    {
      name: 'דני כהן',
      position: 'מנכ"ל ומייסד',
      experience: '20 שנה',
      specialty: 'הובלות בינלאומיות',
      image: '/images/team/danny.jpg'
    },
    {
      name: 'שרה לוי',
      position: 'מנהלת תפעול',
      experience: '12 שנה',
      specialty: 'לוגיסטיקה ותכנון',
      image: '/images/team/sarah.jpg'
    },
    {
      name: 'מיכל אברהם',
      position: 'מנהלת שירות לקוחות',
      experience: '8 שנים',
      specialty: 'יחסי לקוחות ותמיכה',
      image: '/images/team/michal.jpg'
    }
  ];

  return (
    <>
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">אודות VIP International Shipping</h1>
          <p className="lead text-muted mb-4">
            מובילים בתחום ההובלות הבינלאומיות עם מעלה מ-15 שנות ניסיון וטכנולוגיה מתקדמת
          </p>
          <Badge bg="primary" className="me-2">ISO 9001 מוסמך</Badge>
          <Badge bg="success" className="me-2">FMC רישוי</Badge>
          <Badge bg="info">AI Powered</Badge>
        </Col>
      </Row>

      {/* Stats */}
      <Row className="mb-5">
        {stats.map((stat, index) => (
          <Col md={6} lg={3} key={index} className="mb-3">
            <Card className={`text-center border-${stat.color} shadow-sm h-100 hover-lift`}>
              <Card.Body className="p-4">
                <div className={`text-${stat.color} mb-3`}>
                  {stat.icon}
                </div>
                <h3 className={`text-${stat.color} mb-2 counter-animation`}>{stat.number}</h3>
                <p className="text-muted mb-0 fw-semibold">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Timeline */}
      <section className="mb-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="mb-3">המסע שלנו להצלחה</h2>
            <p className="text-muted lead">קו הזמן של החדשנות והצמיחה</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} className="mx-auto">
            <div className="timeline-container">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item mb-4">
                  <Card className="border-0 shadow-sm position-relative">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Badge bg="primary" className="fs-6 px-3 py-2">{item.year}</Badge>
                        <Badge bg="outline-secondary">{item.milestone}</Badge>
                      </div>
                      <p className="mb-0 fw-semibold">{item.event}</p>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>

      {/* Certifications */}
      <section className="bg-light rounded-3 p-4 mb-5">
        <Row className="text-center mb-4">
          <Col>
            <h3 className="mb-3">
              <ShieldCheck className="me-2 text-success" />
              תעודות והסמכות בינלאומיות
            </h3>
            <p className="text-muted">האישורים שמעידים על איכותנו ומקצועיותנו</p>
          </Col>
        </Row>
        <Row>
          {certifications.map((cert, index) => (
            <Col md={6} lg={3} key={index} className="mb-3">
              <Card className="h-100 border-success shadow-sm">
                <Card.Body className="text-center p-3">
                  <CheckCircle className="text-success mb-2" size={24} />
                  <h6 className="text-success fw-bold">{cert.name}</h6>
                  <p className="small text-muted mb-1">{cert.desc}</p>
                  <Badge bg="light" text="success">מאז {cert.year}</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Story */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <h2 className="mb-4">הסיפור שלנו</h2>
          <p className="mb-3">
            VIP International Shipping נוסדה בשנת 2008 על ידי דני כהן, יוצא חיל הים הישראלי 
            עם ניסיון רב בתחום הלוגיסטיקה הבינלאומית. המטרה הייתה ליצור שירות הובלה 
            בינלאומי שישלב מקצועיות גבוהה עם יחס אישי וחם.
          </p>
          <p className="mb-3">
            במהלך השנים פיתחנו רשת בינלאומית של שותפים אמינים ויצרנו מערכת טכנולוגית 
            מתקדמת המאפשרת מעקב בזמן אמת ושירות ברמה הגבוהה ביותר.
          </p>
          <p className="mb-4">
            היום אנחנו גאים להיות אחת מחברות ההובלה הבינלאומית המובילות, עם מעלה מ-10,000 
            לקוחות מרוצים ושיעור הצלחה של 99.8%.
          </p>
        </Col>
        <Col lg={6}>
          <img 
            src="/images/company-story.jpg" 
            alt="סיפור החברה - VIP International Shipping"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Features */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-5">למה לבחור בנו?</h2>
        </Col>
      </Row>
      <Row>
        {features.map((feature, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="text-center border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="mb-3">
                  {feature.icon}
                </div>
                <h5 className="mb-3">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Team */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-5">הצוות המקצועי שלנו</h2>
        </Col>
      </Row>
      <Row>
        {team.map((member, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="text-center border-0 shadow-sm">
              <div className="p-4">
                <div 
                  className="rounded-circle mx-auto mb-3 bg-light d-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px' }}
                >
                  <People size={40} className="text-primary" />
                </div>
                <h5 className="mb-1">{member.name}</h5>
                <p className="text-primary mb-2">{member.position}</p>
                <Badge bg="light" text="dark" className="mb-2">{member.experience}</Badge>
                <p className="text-muted small">{member.specialty}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Certifications */}
      <Row className="mb-5">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="p-5">
              <h3 className="text-center mb-4">הסמכות ורישיונות</h3>
              <Row className="text-center">
                <Col md={4} className="mb-3">
                  <ShieldCheck size={48} className="text-success mb-3" />
                  <h6>Federal Maritime Commission</h6>
                  <p className="text-muted small">רישיון רשמי למשלוחי ים בינלאומיים</p>
                </Col>
                <Col md={4} className="mb-3">
                  <Award size={48} className="text-warning mb-3" />
                  <h6>ISO 9001:2015</h6>
                  <p className="text-muted small">תקן איכות בינלאומי מוסמך</p>
                </Col>
                <Col md={4} className="mb-3">
                  <CheckCircle size={48} className="text-info mb-3" />
                  <h6>IATA Certified</h6>
                  <p className="text-muted small">הסמכה למשלוחי אוויר בטוחים</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA */}
      <section className="bg-gradient-primary text-white rounded-3 p-5 mb-5">
        <Row className="text-center">
          <Col lg={8} className="mx-auto">
            <Star className="mb-3" size={48} />
            <h3 className="mb-3">מוכנים לחוויית הובלה בלתי נשכחת?</h3>
            <p className="lead mb-4">
              הצטרפו ל-50,000+ לקוחות מרוצים שבחרו ב-VIP International Shipping 
              עבור ההובלה הבינלאומית שלהם. קבלו הצעת מחיר מותאמת אישית תוך דקות!
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button variant="light" size="lg" className="px-4">
                <Star className="me-2" />
                קבל הצעת מחיר AI
              </Button>
              <Button variant="outline-light" size="lg" className="px-4">
                📞 יעוץ חינם עכשיו
              </Button>
            </div>
            <p className="mt-3 mb-0">
              <small>🔒 מידע מוגן באבטחה בנקאית | 💬 תמיכה 24/7 בעברית</small>
            </p>
          </Col>
        </Row>
      </section>

      
    </Container>
    </>
  );
};

export default About;
