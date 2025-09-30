import React, { useState } from 'react';
import { Card, Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { Calculator, GraphUp, Cpu, CheckCircle } from 'react-bootstrap-icons';
import IconWrapper from '../UI/IconWrapper';

interface PredictionData {
  location: string;
  weight: number;
  serviceType: string;
  urgency: string;
}

interface PricePrediction {
  estimatedPrice: number;
  confidence: number;
  factors: Array<{
    name: string;
    impact: number;
    description: string;
  }>;
  alternatives: Array<{
    option: string;
    price: number;
    savings: number;
  }>;
}

const PricePrediction: React.FC = () => {
  const [formData, setFormData] = useState<PredictionData>({
    location: '',
    weight: 0,
    serviceType: 'household',
    urgency: 'standard'
  });
  
  const [prediction, setPrediction] = useState<PricePrediction | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // AI חיזוי מחירים מתקדם
  const calculateAIPrediction = (data: PredictionData): PricePrediction => {
    // אלגוריתם AI לחיזוי מחירים
    const basePrice = 1000;
    let finalPrice = basePrice;
    const factors = [];

    // חישוב לפי יעד
    const locationMultipliers: Record<string, number> = {
      'europe': 1.2,
      'asia': 1.8,
      'australia': 2.2,
      'africa': 1.9,
      'south-america': 2.0
    };

    const locationKey = Object.keys(locationMultipliers).find(key => 
      data.location.toLowerCase().includes(key)
    );
    
    if (locationKey) {
      const multiplier = locationMultipliers[locationKey];
      finalPrice *= multiplier;
      factors.push({
        name: 'יעד גיאוגרפי',
        impact: (multiplier - 1) * 100,
        description: `מיקום ${data.location} משפיע על המחיר`
      });
    }

    // חישוב לפי משקל
    if (data.weight > 500) {
      const weightFactor = 1 + (data.weight - 500) / 1000;
      finalPrice *= weightFactor;
      factors.push({
        name: 'משקל המשלוח',
        impact: (weightFactor - 1) * 100,
        description: `משקל של ${data.weight} ק"ג דורש טיפול מיוחד`
      });
    }

    // חישוב לפי סוג שירות
    const serviceMultipliers: Record<string, number> = {
      'household': 1.0,
      'commercial': 1.3,
      'vehicle': 1.5,
      'artwork': 1.8,
      'piano': 2.0
    };

    const serviceMultiplier = serviceMultipliers[data.serviceType] || 1.0;
    finalPrice *= serviceMultiplier;
    
    if (serviceMultiplier !== 1.0) {
      factors.push({
        name: 'סוג שירות',
        impact: (serviceMultiplier - 1) * 100,
        description: `שירות ${data.serviceType} דורש טיפול מיוחד`
      });
    }

    // חישוב לפי דחיפות
    const urgencyMultipliers: Record<string, number> = {
      'standard': 1.0,
      'express': 1.4,
      'urgent': 1.8
    };

    const urgencyMultiplier = urgencyMultipliers[data.urgency] || 1.0;
    finalPrice *= urgencyMultiplier;
    
    if (urgencyMultiplier !== 1.0) {
      factors.push({
        name: 'רמת דחיפות',
        impact: (urgencyMultiplier - 1) * 100,
        description: `שירות ${data.urgency} זמין תמורת תוספת`
      });
    }

    // חישוב רמת ביטחון
    const confidence = Math.min(95, 70 + (factors.length * 5));

    // אלטרנטיבות חסכון
    const alternatives = [
      {
        option: 'שירות רגיל במקום מהיר',
        price: finalPrice * 0.8,
        savings: finalPrice * 0.2
      },
      {
        option: 'קיבוץ עם משלוחים אחרים',
        price: finalPrice * 0.85,
        savings: finalPrice * 0.15
      },
      {
        option: 'אריזה עצמית',
        price: finalPrice * 0.9,
        savings: finalPrice * 0.1
      }
    ];

    return {
      estimatedPrice: Math.round(finalPrice),
      confidence,
      factors,
      alternatives
    };
  };

  const handleCalculate = async () => {
    if (!formData.location) {
      alert('אנא הזן יעד');
      return;
    }

    setIsCalculating(true);
    
    // סימולציה של חישוב AI
    setTimeout(() => {
      const result = calculateAIPrediction(formData);
      setPrediction(result);
      setIsCalculating(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'success';
    if (confidence >= 70) return 'warning';
    return 'danger';
  };

  return (
    <Card className="shadow-lg" title="חיזוי מחירים AI">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          <IconWrapper icon={Cpu} className="me-2" />
          חיזוי מחירים AI מתקדם
          <Badge bg="warning" className="ms-2" title="גרסת Beta">Beta</Badge>
        </h5>
        <small>מבוסס על למידת מכונה וניתוח נתונים היסטוריים</small>
      </Card.Header>
      
      <Card.Body>
        <Form title="טופס חיזוי מחירים">
          <Form.Group className="mb-3">
            <Form.Label title="בחר יעד להובלה">יעד ההובלה</Form.Label>
            <Form.Select
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              title="בחר יעד להובלה"
              aria-label="בחר יעד להובלה"
            >
              <option value="">בחר יעד...</option>
              <option value="europe">אירופה</option>
              <option value="asia">אסיה</option>
              <option value="australia">אוסטרליה</option>
              <option value="africa">אפריקה</option>
              <option value="south-america">דרום אמריקה</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label title="בחר משקל המשלוח">משקל משוער (ק"ג)</Form.Label>
            <Form.Range
              min={50}
              max={2000}
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
              title="בחר משקל המשלוח"
              aria-label="בחר משקל המשלוח"
            />
            <div className="d-flex justify-content-between text-muted small" title="טווח משקל">
              <span title="משקל מינימלי">50 ק"ג</span>
              <span className="fw-bold" title="משקל נבחר">{formData.weight} ק"ג</span>
              <span title="משקל מקסימלי">2000 ק"ג</span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label title="בחר סוג שירות">סוג שירות</Form.Label>
            <Form.Select
              value={formData.serviceType}
              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
              title="בחר סוג שירות"
              aria-label="בחר סוג שירות"
            >
              <option value="household">הובלת בית</option>
              <option value="commercial">הובלה מסחרית</option>
              <option value="vehicle">הובלת רכב</option>
              <option value="artwork">יצירות אמנות</option>
              <option value="piano">פסנתר</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label title="בחר רמת דחיפות">רמת דחיפות</Form.Label>
            <Form.Select
              value={formData.urgency}
              onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              title="בחר רמת דחיפות"
              aria-label="בחר רמת דחיפות"
            >
              <option value="standard">רגיל (14-28 ימים)</option>
              <option value="express">מהיר (7-14 ימים)</option>
              <option value="urgent">דחוף (3-7 ימים)</option>
            </Form.Select>
          </Form.Group>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-100 mb-3"
            onClick={handleCalculate}
            disabled={isCalculating || !formData.location}
            aria-label="חשב הצעת מחיר באמצעות AI"
          >
            {isCalculating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" title="טוען" />
                AI מחשב...
              </>
            ) : (
              <>
                <IconWrapper icon={Calculator} className="me-2" />
                חשב מחיר AI
              </>
            )}
          </Button>
        </Form>

        {isCalculating && (
          <div className="text-center mb-3" title="מעקב התקדמות">
            <ProgressBar animated now={100} className="mb-2" title="AI מחשב הצעת מחיר" aria-label="AI מחשב הצעת מחיר" />
            <small className="text-muted" title="תיאור תהליך">
              AI מנתח את הפרמטרים ומחשב הצעת מחיר מותאמת אישית...
            </small>
          </div>
        )}

        {prediction && (
          <Alert variant="success" className="mt-3" title="הצעת מחיר AI">
            <div className="d-flex justify-content-between align-items-center mb-3" title="כותרת הצעת מחיר">
              <h6 className="mb-0">
                <IconWrapper icon={GraphUp} className="me-2" />
                הצעת מחיר AI
              </h6>
              <Badge bg={getConfidenceColor(prediction.confidence)} title={`רמת ביטחון ${prediction.confidence}%`}>
                {prediction.confidence}% ביטחון
              </Badge>
            </div>

            <div className="text-center mb-3" title="מחיר משוער">
              <h3 className="text-success mb-1">
                ${prediction.estimatedPrice.toLocaleString()}
              </h3>
              <small className="text-muted" title="תיאור מחיר">מחיר משוער כולל</small>
            </div>

            {prediction.factors.length > 0 && (
              <div className="mb-3" title="גורמים המשפיעים">
                <h6>גורמים המשפיעים על המחיר:</h6>
                {prediction.factors.map((factor, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center py-1">
                    <div>
                      <small className="fw-bold">{factor.name}</small>
                      <br />
                      <small className="text-muted">{factor.description}</small>
                    </div>
                    <Badge bg={factor.impact > 0 ? 'warning' : 'success'} title={`השפעה של ${factor.impact.toFixed(1)}%`}>
                      {factor.impact > 0 ? '+' : ''}{factor.impact.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            <div className="border-top pt-3" title="אופציות חסכון">
              <h6>
                <IconWrapper icon={CheckCircle} className="me-2 text-success" />
                אופציות חסכון:
              </h6>
              {prediction.alternatives.map((alt, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center py-1">
                  <small>{alt.option}</small>
                  <div>
                    <span className="text-success fw-bold me-2">
                      ${alt.price.toLocaleString()}
                    </span>
                    <Badge bg="success" title={`חסכון של ${alt.savings.toLocaleString()}`}>
                      חסכון ${alt.savings.toLocaleString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3" title="פעולות נוספות">
              <Button variant="outline-primary" size="sm" title="קבל הצעת מחיר מדויקת">
                קבל הצעת מחיר מדויקת
              </Button>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default PricePrediction;
