import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { Search, GeoAlt, Truck, Water, Airplane, CheckCircle } from 'react-bootstrap-icons';

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
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentData, setShipmentData] = useState<ShipmentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // סימולציה של מעקב בזמן אמת
  const mockTrackingData: ShipmentStatus = {
    trackingNumber: 'VIP123456789',
    currentStatus: 'בדרך',
    currentLocation: 'נמל המבורג, גרמניה',
    estimatedDelivery: '2024-02-15',
    progress: 65,
    events: [
      {
        id: '1',
        date: '2024-01-20',
        time: '09:00',
        location: 'ניו יורק, ארה"ב',
        status: 'נאסף',
        description: 'המשלוח נאסף מהמקור',
        icon: <CheckCircle className="text-success" />,
        completed: true
      },
      {
        id: '2',
        date: '2024-01-22',
        time: '14:30',
        location: 'נמל ניו יורק',
        status: 'נטען לאוניה',
        description: 'המשלוח נטען לאוניית המשא',
        icon: <Water className="text-info" />,
        completed: true
      },
      {
        id: '3',
        date: '2024-02-05',
        time: '08:15',
        location: 'נמל המבורג, גרמניה',
        status: 'הגיע ליעד',
        description: 'המשלוח הגיע לנמל היעד',
        icon: <GeoAlt className="text-warning" />,
        completed: true
      },
      {
        id: '4',
        date: '2024-02-06',
        time: '10:00',
        location: 'מחסן המבורג',
        status: 'בבדיקת מכס',
        description: 'המשלוח עובר בדיקת מכס',
        icon: <Truck className="text-primary" />,
        completed: false
      },
      {
        id: '5',
        date: '2024-02-15',
        time: 'משוער',
        location: 'כתובת היעד',
        status: 'משלוח סופי',
        description: 'משלוח לכתובת הסופית',
        icon: <CheckCircle className="text-muted" />,
        completed: false
      }
    ]
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('אנא הזן מספר מעקב');
      return;
    }

    setIsLoading(true);
    setError('');

    // סימולציה של קריאה לשרת
    setTimeout(() => {
      if (trackingNumber.includes('VIP') || trackingNumber === 'demo') {
        setShipmentData(mockTrackingData);
        setError('');
      } else {
        setError('מספר מעקב לא נמצא. נסה: VIP123456789 או demo');
        setShipmentData(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'נאסף': return 'success';
      case 'נטען לאוניה': return 'info';
      case 'הגיע ליעד': return 'warning';
      case 'בבדיקת מכס': return 'primary';
      case 'משלוח סופי': return 'secondary';
      default: return 'secondary';
    }
  };

  // עדכון אוטומטי כל 30 שניות (בפרודקשן)
  useEffect(() => {
    if (shipmentData) {
      const interval = setInterval(() => {
        // כאן תהיה קריאה אמיתית לשרת
        console.log('מעדכן מעקב בזמן אמת...');
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [shipmentData]);

  return (
    <Card className="shadow">
      <Card.Header>
        <h5 className="mb-0">
          <Search className="me-2" />
          מעקב בזמן אמת
        </h5>
        <small className="text-muted">
          עקוב אחר המשלוח שלך בכל רגע עם עדכונים אוטומטיים
        </small>
      </Card.Header>
      
      <Card.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleTrack(); }}>
          <Form.Group className="mb-3">
            <Form.Label>מספר מעקב</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="הזן מספר מעקב (נסה: demo)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                aria-label="מספר מעקב למשלוח"
              />
              <Button 
                variant="primary" 
                onClick={handleTrack}
                disabled={isLoading}
                aria-label="חפש משלוח"
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
            <p className="text-muted">מחפש את המשלוח שלך...</p>
          </div>
        )}

        {shipmentData && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="mb-1">מספר מעקב: {shipmentData.trackingNumber}</h6>
                <Badge bg={getStatusColor(shipmentData.currentStatus)} className="me-2">
                  {shipmentData.currentStatus}
                </Badge>
                <small className="text-muted">{shipmentData.currentLocation}</small>
              </div>
              <div className="text-end">
                <small className="text-muted">הגעה משוערת:</small>
                <br />
                <strong>{new Date(shipmentData.estimatedDelivery).toLocaleDateString('he-IL')}</strong>
              </div>
            </div>

            <ProgressBar 
              now={shipmentData.progress} 
              label={`${shipmentData.progress}%`}
              className="mb-4"
              variant="success"
            />

            <div className="timeline">
              <h6 className="mb-3">מסלול המשלוח:</h6>
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
              <h6>מידע נוסף:</h6>
              <ul className="list-unstyled mb-0">
                <li>🚛 <strong>חברת הובלה:</strong> VIP International Shipping</li>
                <li>📧 <strong>עדכונים:</strong> נשלחים אוטומטית למייל</li>
                <li>📱 <strong>SMS:</strong> עדכונים בשלבים חשובים</li>
                <li>🔄 <strong>רענון:</strong> אוטומטי כל 30 שניות</li>
              </ul>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default LiveTracking;
