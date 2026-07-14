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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const { getData } = useAnalytics();

  useEffect(() => {
    // Simulate server data
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
          customer: 'John Cohen',
          destination: 'London, UK',
          value: 3200,
          status: 'in_transit',
          aiRecommendations: ['Full insurance', 'Premium tracking']
        },
        {
          id: 'ORD002',
          customer: 'Sarah Levy',
          destination: 'Paris, France',
          value: 2800,
          status: 'pending',
          aiRecommendations: ['Professional packing', 'Express service']
        },
        {
          id: 'ORD003',
          customer: 'David Moses',
          destination: 'Tokyo, Japan',
          value: 4500,
          status: 'approved',
          aiRecommendations: ['Premium insurance', 'GPS tracking']
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
      case 'pending': return 'Pending approval';
      case 'approved': return 'Approved';
      case 'in_transit': return 'In transit';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const exportData = () => {
    const analyticsData = getData();
    const payload = {
      metrics,
      recentOrders,
      analytics: analyticsData,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
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
      <main id="main-content">
        <Container className="mt-5">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" />
            <p>{t('common.loading')}</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main id="main-content">
      <Container fluid className="mt-3">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h2>Admin Dashboard</h2>
              <div className="d-flex gap-2">
                <Form.Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{ width: 'auto' }}
                  aria-label="Select time period"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                </Form.Select>
                <Button variant="outline-primary" onClick={exportData}>
                  <Download className="me-2" />
                  Export data
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} lg={3} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total revenue</h6>
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
                    <h6 className="text-muted mb-1">Active shipments</h6>
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
                    <h6 className="text-muted mb-1">Registered customers</h6>
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
                    <h6 className="text-muted mb-1">Avg. delivery time</h6>
                    <h3 className="text-warning mb-0">{metrics.avgDeliveryTime} days</h3>
                  </div>
                  <Clock size={32} className="text-warning" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h6 className="mb-0">
                  <GraphUp className="me-2" />
                  AI performance
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Customer satisfaction</span>
                    <span className="fw-bold">{metrics.customerSatisfaction}/5.0</span>
                  </div>
                  <ProgressBar
                    now={(metrics.customerSatisfaction / 5) * 100}
                    variant="success"
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>AI interactions</span>
                    <span className="fw-bold">{metrics.aiInteractions}</span>
                  </div>
                  <ProgressBar now={85} variant="info" />
                </div>

                <Alert variant="info" className="mb-0">
                  <small>
                    <strong>AI insight:</strong> ChatBot improves conversion rate by 23%
                    and saves 40% of support time.
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-3">
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h6 className="mb-0">Recent orders</h6>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Destination</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Actions</th>
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
                          <Button variant="outline-primary" size="sm" aria-label={t('common.view')}>
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

        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h6 className="mb-0">
                  AI recommendations for managers
                  <Badge bg="success" className="ms-2">Live</Badge>
                </h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4} className="mb-3">
                    <Alert variant="success">
                      <CheckCircle className="me-2" />
                      <strong>Optimization:</strong>
                      <br />
                      <small>
                        Grouping 3 shipments to Germany will save $450 in costs.
                      </small>
                    </Alert>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Alert variant="warning">
                      <ExclamationTriangle className="me-2" />
                      <strong>Alert:</strong>
                      <br />
                      <small>
                        High load to Asia — consider adding capacity.
                      </small>
                    </Alert>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Alert variant="info">
                      <GraphUp className="me-2" />
                      <strong>Opportunity:</strong>
                      <br />
                      <small>
                        25% increase in demand for premium services.
                      </small>
                    </Alert>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminDashboard;
