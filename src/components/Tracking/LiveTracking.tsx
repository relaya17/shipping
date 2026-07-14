import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Search, GeoAlt, Truck, CheckCircle } from 'react-bootstrap-icons';
import api from '../../service/api';

type GpsPoint = {
  lat: number;
  lon: number;
  address?: string;
  timestamp?: string;
  speed?: number;
};

type TrackingView = {
  trackingNumber: string;
  status: string;
  serviceType?: string;
  currentLocation: {
    address?: string;
    city?: string;
    country?: string;
    lat?: number;
    lon?: number;
    lastUpdated?: string;
  };
  origin?: { city?: string; state?: string; country?: string };
  destination?: { city?: string; state?: string; country?: string };
  estimatedDelivery?: string;
  distanceRemainingKm?: number;
  route: GpsPoint[];
  milestones: Array<{
    id: string;
    event: string;
    location: string;
    description?: string;
    status?: string;
    timestamp?: string;
  }>;
  progress: number;
  map?: { embedUrl: string; openUrl: string } | null;
};

const LiveTracking: React.FC = () => {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentData, setShipmentData] = useState<TrackingView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTracking = useCallback(async (number: string, silent = false) => {
    if (!silent) {
      setIsLoading(true);
      setError('');
    }
    try {
      const { data } = await api.get<{ success: boolean; tracking: TrackingView }>(
        `/shipments/${encodeURIComponent(number.trim().toUpperCase())}/track`
      );
      setShipmentData(data.tracking);
      setError('');
    } catch {
      if (!silent) {
        setError(t('tracking.not_found'));
        setShipmentData(null);
      }
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [t]);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError(t('tracking.enter_number'));
      return;
    }
    await fetchTracking(trackingNumber);
  };

  useEffect(() => {
    if (!shipmentData?.trackingNumber) return undefined;
    const interval = setInterval(() => {
      fetchTracking(shipmentData.trackingNumber, true);
    }, 15000);
    return () => clearInterval(interval);
  }, [shipmentData?.trackingNumber, fetchTracking]);

  const statusColor = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s.includes('deliver')) return 'success';
    if (s.includes('transit') || s.includes('picked')) return 'info';
    if (s.includes('customs')) return 'warning';
    if (s.includes('cancel')) return 'danger';
    return 'secondary';
  };

  const locationLabel = shipmentData?.currentLocation
    ? [
        shipmentData.currentLocation.address,
        shipmentData.currentLocation.city,
        shipmentData.currentLocation.country
      ].filter(Boolean).join(', ') ||
      (shipmentData.currentLocation.lat != null
        ? `${shipmentData.currentLocation.lat.toFixed(4)}, ${shipmentData.currentLocation.lon?.toFixed(4)}`
        : 'Location pending')
    : '';

  return (
    <Card className="shadow">
      <Card.Header>
        <h5 className="mb-0">
          <Search className="me-2" />
          {t('tracking.title')}
        </h5>
        <small className="text-muted">{t('tracking.live_gps')}</small>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleTrack(); }}>
          <Form.Group className="mb-3">
            <Form.Label>{t('tracking.tracking_number')}</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="VIP1234567890"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                aria-label={t('tracking.tracking_number')}
              />
              <Button variant="primary" onClick={handleTrack} disabled={isLoading} aria-label={t('tracking.track')}>
                {isLoading ? <span className="spinner-border spinner-border-sm" /> : <Search />}
              </Button>
            </div>
          </Form.Group>
        </Form>

        {error && <Alert variant="warning" className="mb-3">{error}</Alert>}

        {isLoading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary mb-3" />
            <p className="text-muted">{t('tracking.locating')}</p>
          </div>
        )}

        {shipmentData && (
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h6 className="mb-1">Tracking #: {shipmentData.trackingNumber}</h6>
                <Badge bg={statusColor(shipmentData.status)} className="me-2">{shipmentData.status}</Badge>
                <small className="text-muted">
                  <GeoAlt className="me-1" />
                  {locationLabel}
                </small>
              </div>
              <div className="text-end">
                <small className="text-muted">Estimated arrival</small>
                <br />
                <strong>
                  {shipmentData.estimatedDelivery
                    ? new Date(shipmentData.estimatedDelivery).toLocaleDateString('en-US')
                    : 'TBD'}
                </strong>
              </div>
            </div>

            <ProgressBar
              now={shipmentData.progress}
              label={`${shipmentData.progress}%`}
              className="mb-3"
              variant="success"
            />

            {shipmentData.map?.embedUrl && (
              <div className="mb-3 rounded overflow-hidden border">
                <iframe
                  title="Shipment GPS map"
                  src={shipmentData.map.embedUrl}
                  style={{ border: 0, width: '100%', height: 280 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-2 bg-light small">
                  <a href={shipmentData.map.openUrl} target="_blank" rel="noreferrer">
                    Open full map
                  </a>
                  {shipmentData.currentLocation.lastUpdated && (
                    <span className="text-muted ms-2">
                      Updated {new Date(shipmentData.currentLocation.lastUpdated).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            )}

            {!shipmentData.map?.embedUrl && (
              <Alert variant="info">GPS coordinates not yet available for this shipment.</Alert>
            )}

            <div className="mb-3">
              <h6>
                <Truck className="me-2" />
                Route
              </h6>
              <p className="mb-1 small text-muted">
                {shipmentData.origin?.city || '?'}
                {shipmentData.origin?.state ? `, ${shipmentData.origin.state}` : ''}
                {' → '}
                {shipmentData.destination?.city || '?'}
                {shipmentData.destination?.state ? `, ${shipmentData.destination.state}` : ''}
              </p>
              {shipmentData.route?.length > 0 ? (
                <ul className="list-unstyled small mb-0">
                  {shipmentData.route.slice(-8).reverse().map((point, idx) => (
                    <li key={`${point.lat}-${point.lon}-${idx}`} className="mb-1">
                      <GeoAlt className="me-1 text-primary" />
                      {point.address || `${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}`}
                      {point.timestamp && (
                        <span className="text-muted"> · {new Date(point.timestamp).toLocaleString()}</span>
                      )}
                      {point.speed != null && <span className="text-muted"> · {point.speed} km/h</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <small className="text-muted">No GPS trail yet.</small>
              )}
            </div>

            {shipmentData.milestones?.length > 0 && (
              <div className="timeline">
                <h6 className="mb-3">Milestones</h6>
                {shipmentData.milestones.map((event) => (
                  <div key={event.id} className="d-flex align-items-start mb-2">
                    <CheckCircle className="text-success me-2 mt-1" />
                    <div>
                      <strong>{event.event}</strong>
                      <div className="small text-muted">{event.description || event.location}</div>
                      {event.timestamp && (
                        <div className="small text-muted">{new Date(event.timestamp).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 p-3 bg-light rounded small">
              Auto-refresh every 15 seconds · Powered by VIP GPS tracking
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default LiveTracking;
