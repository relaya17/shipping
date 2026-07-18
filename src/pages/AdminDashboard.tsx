import React, { useState, useEffect, useCallback } from 'react';
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
  Eye,
  Download
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import api from '../service/api';

interface DashboardMetrics {
  totalRevenue: number;
  activeShipments: number;
  totalCustomers: number;
  totalQuotes: number;
  avgDeliveryTime: number | null;
  customerSatisfaction: number | null;
  aiInteractions: number | null;
}

interface RecentOrder {
  id: string;
  customer: string;
  destination: string;
  value: number;
  status: string;
  aiRecommendations: string[];
}

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<{
        success: boolean;
        metrics: DashboardMetrics;
        recentOrders: RecentOrder[];
      }>('/analytics/dashboard', { params: { period: selectedPeriod } });

      setMetrics(data.metrics);
      setRecentOrders(Array.isArray(data.recentOrders) ? data.recentOrders : []);
    } catch {
      setMetrics(null);
      setRecentOrders([]);
      setError(t('admin.load_error', { defaultValue: 'Could not load dashboard data.' }));
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod, t]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

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
      case 'pending': return t('admin.status_pending', { defaultValue: 'Pending' });
      case 'approved': return t('admin.status_approved', { defaultValue: 'Approved' });
      case 'in_transit': return t('admin.status_in_transit', { defaultValue: 'In transit' });
      case 'delivered': return t('admin.status_delivered', { defaultValue: 'Delivered' });
      default: return status;
    }
  };

  const exportData = () => {
    const payload = {
      period: selectedPeriod,
      metrics,
      recentOrders,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vip-shipping-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading && !metrics) {
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
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h2>{t('admin.title')}</h2>
              <div className="d-flex gap-2">
                <Form.Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{ width: 'auto' }}
                  aria-label={t('admin.period', { defaultValue: 'Select time period' })}
                >
                  <option value="7days">{t('admin.period_7', { defaultValue: 'Last 7 days' })}</option>
                  <option value="30days">{t('admin.period_30', { defaultValue: 'Last 30 days' })}</option>
                  <option value="90days">{t('admin.period_90', { defaultValue: 'Last 90 days' })}</option>
                </Form.Select>
                <Button variant="outline-primary" onClick={exportData} disabled={!metrics}>
                  <Download className="me-2" />
                  {t('admin.export', { defaultValue: 'Export data' })}
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
            <Button variant="link" className="p-0 ms-2" onClick={() => void loadDashboard()}>
              {t('common.retry', { defaultValue: 'Retry' })}
            </Button>
          </Alert>
        )}

        {metrics && (
          <>
            <Row className="mb-4">
              <Col md={6} lg={3} className="mb-3">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">{t('admin.revenue', { defaultValue: 'Total revenue' })}</h6>
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
                        <h6 className="text-muted mb-1">{t('admin.active_shipments', { defaultValue: 'Active shipments' })}</h6>
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
                        <h6 className="text-muted mb-1">{t('admin.customers', { defaultValue: 'Registered customers' })}</h6>
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
                        <h6 className="text-muted mb-1">{t('admin.avg_delivery', { defaultValue: 'Avg. delivery time' })}</h6>
                        <h3 className="text-warning mb-0">
                          {metrics.avgDeliveryTime != null
                            ? `${metrics.avgDeliveryTime} ${t('admin.days', { defaultValue: 'days' })}`
                            : '—'}
                        </h3>
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
                      {t('admin.ops_snapshot', { defaultValue: 'Operations snapshot' })}
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>{t('admin.quotes_period', { defaultValue: 'Quotes in period' })}</span>
                        <span className="fw-bold">{metrics.totalQuotes}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>{t('admin.satisfaction', { defaultValue: 'Customer satisfaction' })}</span>
                        <span className="fw-bold">
                          {metrics.customerSatisfaction != null
                            ? `${metrics.customerSatisfaction}/5.0`
                            : '—'}
                        </span>
                      </div>
                      {metrics.customerSatisfaction != null && (
                        <ProgressBar
                          now={(metrics.customerSatisfaction / 5) * 100}
                          variant="success"
                        />
                      )}
                    </div>
                    <Alert variant="secondary" className="mb-0 small">
                      {t('admin.live_note', {
                        defaultValue: 'Metrics are loaded from live Quote, Shipment, Invoice, and User data.'
                      })}
                    </Alert>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={6} className="mb-3">
                <Card className="border-0 shadow-sm">
                  <Card.Header>
                    <h6 className="mb-0">{t('admin.recent_orders', { defaultValue: 'Recent orders' })}</h6>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {recentOrders.length === 0 ? (
                      <p className="text-muted p-3 mb-0">
                        {t('admin.no_orders', { defaultValue: 'No shipments yet.' })}
                      </p>
                    ) : (
                      <Table responsive className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>{t('admin.col_order', { defaultValue: 'Order' })}</th>
                            <th>{t('admin.col_customer', { defaultValue: 'Customer' })}</th>
                            <th>{t('admin.col_destination', { defaultValue: 'Destination' })}</th>
                            <th>{t('admin.col_value', { defaultValue: 'Value' })}</th>
                            <th>{t('admin.col_status', { defaultValue: 'Status' })}</th>
                            <th>{t('admin.col_actions', { defaultValue: 'Actions' })}</th>
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
                                <strong>${Number(order.value || 0).toLocaleString()}</strong>
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
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </main>
  );
};

export default AdminDashboard;
