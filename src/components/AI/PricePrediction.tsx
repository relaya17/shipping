import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Calculator, GraphUp, Cpu, CheckCircle } from 'react-bootstrap-icons';

interface PredictionData {
  location: string;
  weight: number;
  serviceType: string;
  urgency: string;
}

interface PricePredictionResult {
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
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<PredictionData>({
    location: '',
    weight: 0,
    serviceType: 'household',
    urgency: 'standard'
  });

  const [prediction, setPrediction] = useState<PricePredictionResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Recalculate translated labels when language changes
  useEffect(() => {
    if (prediction && formData.location) {
      setPrediction(calculateAIPrediction(formData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const calculateAIPrediction = (data: PredictionData): PricePredictionResult => {
    const basePrice = 1000;
    let finalPrice = basePrice;
    const factors: PricePredictionResult['factors'] = [];

    const locationMultipliers: Record<string, number> = {
      europe: 1.2,
      asia: 1.8,
      australia: 2.2,
      africa: 1.9,
      'south-america': 2.0
    };

    const locationKey = Object.keys(locationMultipliers).find((key) =>
      data.location.toLowerCase().includes(key)
    );

    if (locationKey) {
      const multiplier = locationMultipliers[locationKey];
      finalPrice *= multiplier;
      factors.push({
        name: t('prediction.factor_geo'),
        impact: (multiplier - 1) * 100,
        description: t('prediction.factor_geo_desc', { location: data.location })
      });
    }

    if (data.weight > 500) {
      const weightFactor = 1 + (data.weight - 500) / 1000;
      finalPrice *= weightFactor;
      factors.push({
        name: t('prediction.factor_weight'),
        impact: (weightFactor - 1) * 100,
        description: t('prediction.factor_weight_desc', { weight: data.weight })
      });
    }

    const serviceMultipliers: Record<string, number> = {
      household: 1.0,
      commercial: 1.3,
      vehicle: 1.5,
      artwork: 1.8,
      piano: 2.0
    };

    const serviceMultiplier = serviceMultipliers[data.serviceType] || 1.0;
    finalPrice *= serviceMultiplier;

    if (serviceMultiplier !== 1.0) {
      factors.push({
        name: t('prediction.factor_service'),
        impact: (serviceMultiplier - 1) * 100,
        description: t('prediction.factor_service_desc', {
          service: t(`services.${data.serviceType}`)
        })
      });
    }

    const urgencyMultipliers: Record<string, number> = {
      standard: 1.0,
      express: 1.4,
      urgent: 1.8
    };

    const urgencyMultiplier = urgencyMultipliers[data.urgency] || 1.0;
    finalPrice *= urgencyMultiplier;

    if (urgencyMultiplier !== 1.0) {
      factors.push({
        name: t('prediction.factor_urgency'),
        impact: (urgencyMultiplier - 1) * 100,
        description: t('prediction.factor_urgency_desc', {
          urgency: t(`prediction.urgency_${data.urgency}`)
        })
      });
    }

    const confidence = Math.min(95, 70 + factors.length * 5);

    const alternatives = [
      {
        option: t('prediction.alt_standard'),
        price: finalPrice * 0.8,
        savings: finalPrice * 0.2
      },
      {
        option: t('prediction.alt_group'),
        price: finalPrice * 0.85,
        savings: finalPrice * 0.15
      },
      {
        option: t('prediction.alt_self_pack'),
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
      alert(t('prediction.enter_destination'));
      return;
    }

    setIsCalculating(true);

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
    <Card className="shadow-lg">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          <Cpu className="me-2" />
          {t('ai.price_prediction')}
          <Badge bg="warning" className="ms-2">
            {t('prediction.beta')}
          </Badge>
        </h5>
        <small>{t('ai.analyzing')}</small>
      </Card.Header>

      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t('forms.to_location')}</Form.Label>
            <Form.Select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              aria-label={t('forms.to_location')}
            >
              <option value="">{t('prediction.select_destination')}</option>
              <option value="europe">{t('prediction.europe')}</option>
              <option value="asia">{t('prediction.asia')}</option>
              <option value="australia">{t('prediction.australia')}</option>
              <option value="africa">{t('prediction.africa')}</option>
              <option value="south-america">{t('prediction.south_america')}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('prediction.weight')}</Form.Label>
            <Form.Range
              min={50}
              max={2000}
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
              aria-label={t('prediction.weight')}
            />
            <div className="d-flex justify-content-between text-muted small">
              <span>50 kg</span>
              <span className="fw-bold">{formData.weight} kg</span>
              <span>2000 kg</span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('forms.service_type')}</Form.Label>
            <Form.Select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              aria-label={t('forms.service_type')}
            >
              <option value="household">{t('services.household')}</option>
              <option value="commercial">{t('services.commercial')}</option>
              <option value="vehicle">{t('services.vehicle')}</option>
              <option value="artwork">{t('services.artwork')}</option>
              <option value="piano">{t('services.piano')}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>{t('forms.urgency')}</Form.Label>
            <Form.Select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              aria-label={t('forms.urgency')}
            >
              <option value="standard">{t('prediction.urgency_standard')}</option>
              <option value="express">{t('prediction.urgency_express')}</option>
              <option value="urgent">{t('prediction.urgency_urgent')}</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            size="lg"
            className="w-100 mb-3"
            onClick={handleCalculate}
            disabled={isCalculating || !formData.location}
            aria-label={t('ai.calculating')}
          >
            {isCalculating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                {t('ai.calculating')}
              </>
            ) : (
              <>
                <Calculator className="me-2" />
                {t('ai.price_prediction')}
              </>
            )}
          </Button>
        </Form>

        {isCalculating && (
          <div className="text-center mb-3">
            <ProgressBar animated now={100} className="mb-2" />
            <small className="text-muted">{t('ai.analyzing')}</small>
          </div>
        )}

        {prediction && (
          <Alert variant="success" className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">
                <GraphUp className="me-2" />
                {t('ai.price_prediction')}
              </h6>
              <Badge bg={getConfidenceColor(prediction.confidence)}>
                {t('prediction.accuracy', { percent: prediction.confidence })}
              </Badge>
            </div>

            <div className="text-center mb-3">
              <h3 className="text-success mb-1">${prediction.estimatedPrice.toLocaleString()}</h3>
              <small className="text-muted">{t('prediction.estimated_total')}</small>
            </div>

            {prediction.factors.length > 0 && (
              <div className="mb-3">
                <h6>{t('prediction.price_factors')}</h6>
                {prediction.factors.map((factor, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center py-1">
                    <div>
                      <small className="fw-bold">{factor.name}</small>
                      <br />
                      <small className="text-muted">{factor.description}</small>
                    </div>
                    <Badge bg={factor.impact > 0 ? 'warning' : 'success'}>
                      {factor.impact > 0 ? '+' : ''}
                      {factor.impact.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            <div className="border-top pt-3">
              <h6>
                <CheckCircle className="me-2 text-success" />
                {t('ai.smart_suggestions')}:
              </h6>
              {prediction.alternatives.map((alt, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center py-1">
                  <small>{alt.option}</small>
                  <div>
                    <span className="text-success fw-bold me-2">${alt.price.toLocaleString()}</span>
                    <Badge bg="success">
                      {t('prediction.save', { amount: Math.round(alt.savings).toLocaleString() })}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3">
              <Button variant="outline-primary" size="sm">
                {t('cta.get_quote')}
              </Button>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default PricePrediction;
