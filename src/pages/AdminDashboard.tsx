import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Badge, 
  Button,
  Form,
  ProgressBar,
  Alert
} from 'react-bootstrap';
import {
  GraphUp,
  People,
  Truck,
  CurrencyDollar,
  Clock,
  CheckCircle,
  ExclamationTriangle,
  Eye,
  Download
} from 'react-bootstrap-icons';
import { useAnalytics } from '../utils/analytics';

interface DashboardMetrics {
  totalRevenue: number;
  activeShipments: number;
  totalCustomers: number;
  avgDeliveryTime: number;
  customerSatisfaction: number;
  aiInteractions: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  destination: string;
  value: number;
  status: 'pending' | 'approved' | 'in_transit' | 'delivered';
  aiRecommendations: string[];
}

const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const { getData } = useAnalytics();

  useEffect(() => {
    // סימולציה של נתונים מהשרת
    setTimeout(() => {
      setMetrics({
        totalRevenue: 125000,
        activeShipments: 34,
        totalCustomers: 456,
        avgDeliveryTime: 16,
        customerSatisfaction: 4.8,
        aiInteractions: 1230
      });

      setRecentOrders([
        {
          id: 'ORD001',
          customer: 'יוחנן כהן',
          destination: 'לונדון, בריטניה',
          value: 3200,
          status: 'in_transit',
          aiRecommendations: ['ביטוח מקיף', 'מעקב פרימיום']
        },
        {
          id: 'ORD002',
          customer: 'שרה לוי',
          destination: 'פריז, צרפת',
          value: 2800,
          status: 'pending',
          aiRecommendations: ['אריזה מקצועית', 'שירות מהיר']
        },
        {
          id: 'ORD003',
          customer: 'דוד משה',
          destination: 'טוקיו, יפן',
          value: 4500,
          status: 'approved',
          aiRecommendations: ['ביטוח פרימיום', 'מעקב GPS']
        }
      ]);
    }, 1000);
  }, [selectedPeriod]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'info';
      case 'in_transit': return 'primary';
      case 'delivered': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'ממתין לאישור';
      case 'approved': return 'אושר';
      case 'in_transit': return 'בדרך';
      case 'delivered': return 'נמסר';
      default: return status;
    }
  };

  const exportData = () => {
    const analyticsData = getData();
    const exportData = {
      metrics,
      recentOrders,
      analytics: analyticsData,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vip-shipping-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!metrics) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" />
          <p>טוען נתוני Dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-3">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Dashboard מנהלים</h2>
            <div className="d-flex gap-2">
              <Form.Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="7days">7 ימים אחרונים</option>
                <option value="30days">30 ימים אחרונים</option>
                <option value="90days">90 ימים אחרונים</option>
              </Form.Select>
              <Button variant="outline-primary" onClick={exportData}>
                <Download className="me-2" />
                ייצא נתונים
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* מטריקות ראשיות */}
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">הכנסות כוללות</h6>
                  <h3 className="text-success mb-0">
                    ${metrics.totalRevenue.toLocaleString()}
                  </h3>
                </div>
                <CurrencyDollar size={32} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">משלוחים פעילים</h6>
                  <h3 className="text-primary mb-0">{metrics.activeShipments}</h3>
                </div>
                <Truck size={32} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">לקוחות רשומים</h6>
                  <h3 className="text-info mb-0">{metrics.totalCustomers}</h3>
                </div>
                <People size={32} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">ממוצע משלוח</h6>
                  <h3 className="text-warning mb-0">{metrics.avgDeliveryTime} ימים</h3>
                </div>
                <Clock size={32} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* נתוני AI */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Header>
              <h6 className="mb-0">
                <GraphUp className="me-2" />
                ביצועי AI
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>שביעות רצון לקוחות</span>
                  <span className="fw-bold">{metrics.customerSatisfaction}/5.0</span>
                </div>
                <ProgressBar 
                  now={(metrics.customerSatisfaction / 5) * 100} 
                  variant="success"
                />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>אינטראקציות AI</span>
                  <span className="fw-bold">{metrics.aiInteractions}</span>
                </div>
                <ProgressBar now={85} variant="info" />
              </div>

              <Alert variant="info" className="mb-0">
                <small>
                  <strong>תובנת AI:</strong> ChatBot משפר conversion rate ב-23% 
                  וחוסך 40% מזמן התמיכה.
                </small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Header>
              <h6 className="mb-0">הזמנות אחרונות</h6>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>הזמנה</th>
                    <th>לקוח</th>
                    <th>יעד</th>
                    <th>ערך</th>
                    <th>סטטוס</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <small className="font-monospace">{order.id}</small>
                      </td>
                      <td>{order.customer}</td>
                      <td>
                        <small>{order.destination}</small>
                      </td>
                      <td>
                        <strong>${order.value.toLocaleString()}</strong>
                      </td>
                      <td>
                        <Badge bg={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm">
                          <Eye size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* AI Recommendations */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header>
              <h6 className="mb-0">
                המלצות AI למנהלים
                <Badge bg="success" className="ms-2">Live</Badge>
              </h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <Alert variant="success">
                    <CheckCircle className="me-2" />
                    <strong>אופטימיזציה:</strong>
                    <br />
                    <small>
                      קיבוץ 3 משלוחים לגרמניה יחסוך $450 בעלויות.
                    </small>
                  </Alert>
                </Col>
                <Col md={4} className="mb-3">
                  <Alert variant="warning">
                    <ExclamationTriangle className="me-2" />
                    <strong>התראה:</strong>
                    <br />
                    <small>
                      עומס גבוה לאסיה - שקול להוסיף קיבולת.
                    </small>
                  </Alert>
                </Col>
                <Col md={4} className="mb-3">
                  <Alert variant="info">
                    <GraphUp className="me-2" />
                    <strong>הזדמנות:</strong>
                    <br />
                    <small>
                      עלייה של 25% בביקוש לשירותי פרימיום.
                    </small>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
