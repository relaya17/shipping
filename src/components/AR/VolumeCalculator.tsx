import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Alert, ProgressBar, Badge, Form, Row, Col } from 'react-bootstrap';
import { 
  Camera, 
  Box, 
  Calculator, 
  CheckCircle, 
  ExclamationTriangle,
  Phone
} from 'react-bootstrap-icons';

interface MeasuredItem {
  id: string;
  name: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  volume: number;
  confidence: number;
}

interface VolumeResult {
  totalVolume: number;
  estimatedWeight: number;
  recommendedContainer: string;
  estimatedPrice: number;
  items: MeasuredItem[];
}

const VolumeCalculator: React.FC = () => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<VolumeResult | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualDimensions, setManualDimensions] = useState({
    length: '',
    width: '', 
    height: ''
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // בדיקת תמיכה ב-AR
    const checkARSupport = async () => {
      try {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
          setIsARSupported(true);
        }
      } catch (error) {
        console.log('AR not supported');
        setIsARSupported(false);
      }
    };

    checkARSupport();
  }, []);

  // סימולציה של סריקת AR
  const startARScan = async () => {
    if (!isARSupported) {
      setManualMode(true);
      return;
    }

    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // סימולציה של זיהוי חפצים
      setTimeout(() => {
        const mockResult: VolumeResult = {
          totalVolume: 2.5,
          estimatedWeight: 450,
          recommendedContainer: '20ft Container',
          estimatedPrice: 2800,
          items: [
            {
              id: '1',
              name: 'ספה',
              dimensions: { length: 200, width: 90, height: 80 },
              volume: 1.44,
              confidence: 92
            },
            {
              id: '2',
              name: 'שולחן',
              dimensions: { length: 150, width: 80, height: 75 },
              volume: 0.9,
              confidence: 88
            },
            {
              id: '3',
              name: 'ארון',
              dimensions: { length: 120, width: 60, height: 200 },
              volume: 1.44,
              confidence: 95
            }
          ]
        };

        setResult(mockResult);
        setIsScanning(false);
        
        // עצירת המצלמה
        stream.getTracks().forEach(track => track.stop());
      }, 5000);

    } catch (error) {
      console.error('שגיאה בגישה למצלמה:', error);
      setManualMode(true);
      setIsScanning(false);
    }
  };

  const calculateManualVolume = () => {
    const length = parseFloat(manualDimensions.length);
    const width = parseFloat(manualDimensions.width);
    const height = parseFloat(manualDimensions.height);

    if (!length || !width || !height) {
      alert('אנא מלא את כל המידות');
      return;
    }

    const volume = (length * width * height) / 1000000; // המרה לקובים
    const weight = volume * 200; // הערכת משקל
    const price = volume * 1200; // הערכת מחיר

    const mockResult: VolumeResult = {
      totalVolume: volume,
      estimatedWeight: weight,
      recommendedContainer: volume > 2 ? '20ft Container' : '10ft Container',
      estimatedPrice: price,
      items: [
        {
          id: '1',
          name: 'פריט מותאם אישית',
          dimensions: { length, width, height },
          volume,
          confidence: 100
        }
      ]
    };

    setResult(mockResult);
  };

  return (
    <Card className="shadow-lg">
      <Card.Header className="bg-info text-white">
        <h5 className="mb-0">
          <Box className="me-2" />
          מחשבון נפח AR
          <Badge bg="success" className="ms-2">New!</Badge>
        </h5>
        <small>חישוב נפח חכם באמצעות מצלמה או הזנה ידנית</small>
      </Card.Header>
      
      <Card.Body>
        {!manualMode && isARSupported && (
          <div className="text-center mb-4">
            <div className="mb-3">
              <Camera size={48} className="text-info mb-2" />
              <p>השתמש במצלמה לחישוב נפח אוטומטי</p>
            </div>
            
            {isScanning ? (
              <div>
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-100 rounded mb-3"
                  style={{ maxHeight: '300px' }}
                />
                <ProgressBar animated now={100} className="mb-3" />
                <p className="text-muted">סורק חפצים באמצעות AI...</p>
              </div>
            ) : (
              <Button 
                variant="info" 
                size="lg"
                onClick={startARScan}
                className="mb-3"
              >
                <Camera className="me-2" />
                התחל סריקת AR
              </Button>
            )}
          </div>
        )}

        {(!isARSupported || manualMode) && (
          <div className="mb-4">
            <h6>הזנת מידות ידנית:</h6>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>אורך (ס"מ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={manualDimensions.length}
                    onChange={(e) => setManualDimensions({
                      ...manualDimensions,
                      length: e.target.value
                    })}
                    placeholder="200"
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>רוחב (ס"מ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={manualDimensions.width}
                    onChange={(e) => setManualDimensions({
                      ...manualDimensions,
                      width: e.target.value
                    })}
                    placeholder="90"
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>גובה (ס"מ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={manualDimensions.height}
                    onChange={(e) => setManualDimensions({
                      ...manualDimensions,
                      height: e.target.value
                    })}
                    placeholder="80"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button 
              variant="primary" 
              onClick={calculateManualVolume}
              className="w-100"
            >
              <Calculator className="me-2" />
              חשב נפח
            </Button>
          </div>
        )}

        {!isARSupported && (
          <Alert variant="warning" className="mb-3">
            <ExclamationTriangle className="me-2" />
            המכשיר שלך לא תומך ב-AR. משתמש במצלמה רגילה או הזנה ידנית.
          </Alert>
        )}

        <div className="d-flex justify-content-center mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setManualMode(!manualMode)}
          >
            {manualMode ? 'עבור למצלמה' : 'הזנה ידנית'}
          </Button>
        </div>

        {result && (
          <Alert variant="success">
            <div className="text-center mb-3">
              <CheckCircle size={32} className="text-success mb-2" />
              <h5>תוצאות החישוב</h5>
            </div>

            <Row className="text-center mb-3">
              <Col xs={6} md={3}>
                <h6>{result.totalVolume.toFixed(2)}</h6>
                <small className="text-muted">מ"ק כולל</small>
              </Col>
              <Col xs={6} md={3}>
                <h6>{result.estimatedWeight.toFixed(0)}</h6>
                <small className="text-muted">ק"ג משוער</small>
              </Col>
              <Col xs={6} md={3}>
                <h6>{result.recommendedContainer}</h6>
                <small className="text-muted">מכולה מומלצת</small>
              </Col>
              <Col xs={6} md={3}>
                <h6>${result.estimatedPrice.toLocaleString()}</h6>
                <small className="text-muted">מחיר משוער</small>
              </Col>
            </Row>

            <div className="mb-3">
              <h6>פריטים שזוהו:</h6>
              {result.items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    <small className="text-muted">
                      {item.dimensions.length}×{item.dimensions.width}×{item.dimensions.height} ס"מ
                    </small>
                  </div>
                  <div className="text-end">
                    <div>{item.volume.toFixed(2)} מ"ק</div>
                    <Badge bg="success">{item.confidence}% דיוק</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="primary" className="me-2">
                קבל הצעת מחיר מדויקת
              </Button>
              <Button variant="outline-success">
                <Phone className="me-2" />
                התקשר לייעוץ
              </Button>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default VolumeCalculator;
