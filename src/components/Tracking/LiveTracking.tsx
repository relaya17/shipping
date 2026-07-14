import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Search, GeoAlt, Truck, Water, CheckCircle } from 'react-bootstrap-icons';

interface TrackingEvent {
  id: string;
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface ShipmentStatus {
  trackingNumber: string;
  currentStatus: string;
  currentLocation: string;
  estimatedDelivery: string;
  progress: number;
  events: TrackingEvent[];
}

const LiveTracking: React.FC = () => {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentData, setShipmentData] = useState<ShipmentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulation of real-time tracking
  const mockTrackingData: ShipmentStatus = {
    trackingNumber: 'VIP123456789',
    currentStatus: 'In Transit',
    currentLocation: 'Hamburg Port, Germany',
    estimatedDelivery: '2024-02-15',
    progress: 65,
    events: [
      {
        id: '1',
        date: '2024-01-20',
        time: '09:00',
        location: 'New York, USA',
        status: 'Picked Up',
        description: 'Shipment picked up from origin',
        icon: <CheckCircle className="text-success" />,
        completed: true
      },
      {
        id: '2',
        date: '2024-01-22',
        time: '14:30',
        location: 'New York Port',
        status: 'Loaded on Ship',
        description: 'Shipment loaded onto cargo ship',
        icon: <Water className="text-info" />,
        completed: true
      },
      {
        id: '3',
        date: '2024-02-05',
        time: '08:15',
        location: 'Hamburg Port, Germany',
        status: 'Arrived at Destination',
        description: 'Shipment arrived at destination port',
        icon: <GeoAlt className="text-warning" />,
        completed: true
      },
      {
        id: '4',
        date: '2024-02-06',
        time: '10:00',
        location: 'Hamburg Warehouse',
        status: 'Customs Clearance',
        description: 'Shipment undergoing customs inspection',
        icon: <Truck className="text-primary" />,
        completed: false
      },
      {
        id: '5',
        date: '2024-02-15',
        time: 'Estimated',
        location: 'Final Address',
        status: 'Final Delivery',
        description: 'Delivery to final address',
        icon: <CheckCircle className="text-muted" />,
        completed: false
      }
    ]
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation of server call
    setTimeout(() => {
      if (trackingNumber.includes('VIP') || trackingNumber === 'demo') {
        setShipmentData(mockTrackingData);
        setError('');
      } else {
        setError('Tracking number not found. Try: VIP123456789 or demo');
        setShipmentData(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'picked up': return 'success';
      case 'loaded on ship': return 'info';
      case 'arrived at destination': return 'warning';
      case 'customs clearance': return 'primary';
      case 'final delivery': return 'secondary';
      default: return 'secondary';
    }
  };

  // Auto-refresh every 30 seconds (in production)
  useEffect(() => {
    if (shipmentData) {
      const interval = setInterval(() => {
        // Real server call would go here
        console.log('Refreshing real-time tracking...');
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [shipmentData]);

  return (
    <Card className="shadow">
      <Card.Header>
        <h5 className="mb-0">
          <Search className="me-2" />
          {t('tracking.title')}
        </h5>
        <small className="text-muted">
          {t('tracking.progress')}
        </small>
      </Card.Header>
      
      <Card.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleTrack(); }}>
          <Form.Group className="mb-3">
            <Form.Label>{t('tracking.tracking_number')}</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder={t('tracking.tracking_number')}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                aria-label={t('tracking.tracking_number')}
              />
              <Button 
                variant="primary" 
                onClick={handleTrack}
                disabled={isLoading}
                aria-label="Search shipment"
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <Search />
                )}
              </Button>
            </div>
          </Form.Group>
        </Form>

        {error && (
          <Alert variant="warning" className="mb-3">
            {error}
          </Alert>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary mb-3" />
            <p className="text-muted">Searching for your shipment...</p>
          </div>
        )}

        {shipmentData && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="mb-1">Tracking #: {shipmentData.trackingNumber}</h6>
                <Badge bg={getStatusColor(shipmentData.currentStatus)} className="me-2">
                  {shipmentData.currentStatus}
                </Badge>
                <small className="text-muted">{shipmentData.currentLocation}</small>
              </div>
              <div className="text-end">
                <small className="text-muted">Estimated arrival:</small>
                <br />
                <strong>{new Date(shipmentData.estimatedDelivery).toLocaleDateString('en-US')}</strong>
              </div>
            </div>

            <ProgressBar 
              now={shipmentData.progress} 
              label={`${shipmentData.progress}%`}
              className="mb-4"
              variant="success"
            />

            <div className="timeline">
              <h6 className="mb-3">Shipment Journey:</h6>
              {shipmentData.events.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`d-flex align-items-start mb-3 ${event.completed ? '' : 'opacity-50'}`}
                >
                  <div className="me-3 mt-1">
                    {event.icon}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{event.status}</h6>
                        <p className="mb-1 text-muted">{event.description}</p>
                        <small className="text-muted">
                          📍 {event.location} • 🕐 {event.date} {event.time}
                        </small>
                      </div>
                      {event.completed && (
                        <CheckCircle className="text-success ms-2" />
                      )}
                    </div>
                    {index < shipmentData.events.length - 1 && (
                      <hr className="my-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-light rounded">
              <h6>Additional Information:</h6>
              <ul className="list-unstyled mb-0">
                <li>🚛 <strong>Carrier:</strong> VIP International Shipping</li>
                <li>📧 <strong>Updates:</strong> Sent automatically to email</li>
                <li>📱 <strong>SMS:</strong> Updates at important milestones</li>
                <li>🔄 <strong>Refresh:</strong> Automatic every 30 seconds</li>
              </ul>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default LiveTracking;
