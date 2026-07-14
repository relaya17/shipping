import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Alert, ProgressBar, Badge, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    // Check AR support
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

  // Simulation of AR scanning
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

      // Simulation of object detection
      setTimeout(() => {
        const mockResult: VolumeResult = {
          totalVolume: 2.5,
          estimatedWeight: 450,
          recommendedContainer: '20ft Container',
          estimatedPrice: 2800,
          items: [
            {
              id: '1',
              name: 'Sofa',
              dimensions: { length: 200, width: 90, height: 80 },
              volume: 1.44,
              confidence: 92
            },
            {
              id: '2',
              name: 'Table',
              dimensions: { length: 150, width: 80, height: 75 },
              volume: 0.9,
              confidence: 88
            },
            {
              id: '3',
              name: 'Wardrobe',
              dimensions: { length: 120, width: 60, height: 200 },
              volume: 1.44,
              confidence: 95
            }
          ]
        };

        setResult(mockResult);
        setIsScanning(false);
        
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
      }, 5000);

    } catch (error) {
      console.error('Camera access error:', error);
      setManualMode(true);
      setIsScanning(false);
    }
  };

  const calculateManualVolume = () => {
    const length = parseFloat(manualDimensions.length);
    const width = parseFloat(manualDimensions.width);
    const height = parseFloat(manualDimensions.height);

    if (!length || !width || !height) {
      alert('Please fill in all dimensions');
      return;
    }

    const volume = (length * width * height) / 1000000; // Convert to cubic meters
    const weight = volume * 200; // Weight estimate
    const price = volume * 1200; // Price estimate

    const mockResult: VolumeResult = {
      totalVolume: volume,
      estimatedWeight: weight,
      recommendedContainer: volume > 2 ? '20ft Container' : '10ft Container',
      estimatedPrice: price,
      items: [
        {
          id: '1',
          name: 'Custom Item',
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
          {t('volume.title')}
          <Badge bg="success" className="ms-2">{t('volume.new_badge')}</Badge>
        </h5>
        <small>{t('volume.use_camera')}</small>
      </Card.Header>
      
      <Card.Body>
        {!manualMode && isARSupported && (
          <div className="text-center mb-4">
            <div className="mb-3">
              <Camera size={48} className="text-info mb-2" />
              <p>{t('volume.use_camera')}</p>
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
                <p className="text-muted">{t('volume.scanning')}</p>
              </div>
            ) : (
              <Button
                variant="info"
                size="lg"
                onClick={startARScan}
                className="mb-3"
              >
                <Camera className="me-2" />
                {t('volume.start_scan')}
              </Button>
            )}
          </div>
        )}

        {(!isARSupported || manualMode) && (
          <div className="mb-4">
            <h6>{t('volume.manual_entry')}:</h6>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>{t('forms.length')} (cm)</Form.Label>
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
                  <Form.Label>{t('forms.width')} (cm)</Form.Label>
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
                  <Form.Label>{t('forms.height')} (cm)</Form.Label>
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
              {t('volume.calculate')}
            </Button>
          </div>
        )}

        {!isARSupported && (
          <Alert variant="warning" className="mb-3">
            <ExclamationTriangle className="me-2" />
            {t('volume.ar_not_supported')}
          </Alert>
        )}

        <div className="d-flex justify-content-center mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setManualMode(!manualMode)}
          >
            {manualMode ? t('volume.switch_to_camera') : t('volume.switch_to_manual')}
          </Button>
        </div>

        {result && (
          <Alert variant="success">
            <div className="text-center mb-3">
              <CheckCircle size={32} className="text-success mb-2" />
              <h5>{t('volume.calculation_complete')}</h5>
            </div>

            <Row className="text-center mb-3">
              <Col xs={6} md={3}>
                <h6>{result.totalVolume.toFixed(2)}</h6>
                <small className="text-muted">{t('volume.total_volume')}</small>
              </Col>
              <Col xs={6} md={3}>
                <h6>{result.estimatedWeight.toFixed(0)}</h6>
                <small className="text-muted">{t('volume.estimated_weight')}</small>
              </Col>
              <Col xs={6} md={3}>
                <h6>{result.recommendedContainer}</h6>
                <small className="text-muted">{t('volume.recommended_container')}</small>
              </Col>
              <Col xs={6} md={3}>
                <h6>${result.estimatedPrice.toLocaleString()}</h6>
                <small className="text-muted">{t('volume.estimated_price')}</small>
              </Col>
            </Row>

            <div className="mb-3">
              <h6>{t('volume.scanned_items')}:</h6>
              {result.items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    <small className="text-muted">
                      {item.dimensions.length}×{item.dimensions.width}×{item.dimensions.height} cm
                    </small>
                  </div>
                  <div className="text-end">
                    <div>{item.volume.toFixed(2)} m³</div>
                    <Badge bg="success">{item.confidence}% accuracy</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="primary" className="me-2">
                {t('cta.get_quote')}
              </Button>
              <Button variant="outline-success">
                <Phone className="me-2" />
                {t('cta.call_now')}
              </Button>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default VolumeCalculator;
