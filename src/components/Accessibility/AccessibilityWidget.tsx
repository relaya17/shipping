import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { 
  UniversalAccess,
  EyeFill,
  Type,
  Palette,
  Pause,
  Play,
  Plus,
  Dash,
  Keyboard,
  X
} from 'react-bootstrap-icons';
import IconWrapper from '../UI/IconWrapper';

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'inverted';
  colorBlind: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  textToSpeech: boolean;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  largerClickTargets: boolean;
  readingGuide: boolean;
}

const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    contrast: 'normal',
    colorBlind: 'none',
    textToSpeech: false,
    reducedMotion: false,
    keyboardNavigation: true,
    focusIndicators: true,
    largerClickTargets: false,
    readingGuide: false
  });
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  const applySettings = useCallback((newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--accessibility-font-scale', `${newSettings.fontSize / 100}`);
    
    // Contrast
    root.setAttribute('data-contrast', newSettings.contrast);
    
    // Color blind filters
    root.setAttribute('data-colorblind', newSettings.colorBlind);
    
    // Reduced motion
    if (newSettings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }
    
    // Focus indicators
    root.setAttribute('data-focus-indicators', newSettings.focusIndicators.toString());
    
    // Larger click targets
    root.setAttribute('data-large-targets', newSettings.largerClickTargets.toString());
    
    // Reading guide
    if (newSettings.readingGuide) {
      addReadingGuide();
    } else {
      removeReadingGuide();
    }

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
  }, []);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    // Keyboard shortcut to open accessibility widget (Alt + A)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, applySettings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 100,
      contrast: 'normal',
      colorBlind: 'none',
      textToSpeech: false,
      reducedMotion: false,
      keyboardNavigation: true,
      focusIndicators: true,
      largerClickTargets: false,
      readingGuide: false
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
  };

  const readPageContent = () => {
    if (!speechSynthesis) return;

    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const content = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const addReadingGuide = () => {
    let guide = document.getElementById('reading-guide');
    if (!guide) {
      guide = document.createElement('div');
      guide.id = 'reading-guide';
      guide.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #007bff;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(0,123,255,0.5);
      `;
      document.body.appendChild(guide);

      const updateGuide = (e: MouseEvent) => {
        guide!.style.top = `${e.clientY}px`;
      };

      document.addEventListener('mousemove', updateGuide);
      guide.setAttribute('data-mousemove-listener', 'true');
    }
  };

  const removeReadingGuide = () => {
    const guide = document.getElementById('reading-guide');
    if (guide) {
      guide.remove();
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="accessibility-fab"
        onClick={() => setIsOpen(true)}
        title="Accessibility Options (Alt + A)"
        aria-label="Open accessibility menu"
      >
        <IconWrapper icon={UniversalAccess} size={24} />
        <div className="pulse-ring"></div>
      </Button>
    );
  }

  return (
    <Card 
      className="accessibility-widget shadow-lg"
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        width: '350px',
        maxHeight: '80vh',
        zIndex: 10000,
        overflowY: 'auto'
      }}
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
        <div className="d-flex align-items-center gap-2">
          <IconWrapper icon={UniversalAccess} size={20} />
          <h6 className="mb-0">Accessibility</h6>
        </div>
        <Button
          variant="link"
          size="sm"
          className="text-white p-0"
          onClick={() => setIsOpen(false)}
        >
          <IconWrapper icon={X} size={16} />
        </Button>
      </Card.Header>

      <Card.Body className="p-3">
        {/* Quick Actions */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3">Quick Actions</h6>
          <Row className="g-2">
            <Col xs={6}>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-100"
                onClick={readPageContent}
              >
                {isReading ? <IconWrapper icon={Pause} size={14} /> : <IconWrapper icon={Play} size={14} />}
                <span className="ms-1">{isReading ? 'Stop' : 'Read Page'}</span>
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant="outline-secondary"
                size="sm"
                className="w-100"
                onClick={resetSettings}
              >
                Reset All
              </Button>
            </Col>
          </Row>
        </div>

        {/* Font Size */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2">
            <IconWrapper icon={Type} className="me-2" size={16} />
            Font Size
          </h6>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => updateSetting('fontSize', Math.max(75, settings.fontSize - 25))}
              disabled={settings.fontSize <= 75}
            >
              <IconWrapper icon={Dash} size={14} />
            </Button>
            <span className="text-center" style={{ minWidth: '60px' }}>
              {settings.fontSize}%
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => updateSetting('fontSize', Math.min(200, settings.fontSize + 25))}
              disabled={settings.fontSize >= 200}
            >
              <IconWrapper icon={Plus} size={14} />
            </Button>
          </div>
        </div>

        {/* Contrast */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2">
            <IconWrapper icon={Palette} className="me-2" size={16} />
            Contrast
          </h6>
          <Form.Select
            size="sm"
            value={settings.contrast}
            onChange={(e) => updateSetting('contrast', e.target.value as AccessibilitySettings['contrast'])}
            title="Select contrast level"
            aria-label="Select contrast level"
          >
            <option value="normal">Normal</option>
            <option value="high">High Contrast</option>
            <option value="inverted">Inverted</option>
          </Form.Select>
        </div>

        {/* Color Blind Support */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2">
            <IconWrapper icon={EyeFill} className="me-2" size={16} />
            Color Blind Support
          </h6>
          <Form.Select
            size="sm"
            value={settings.colorBlind}
            onChange={(e) => updateSetting('colorBlind', e.target.value as AccessibilitySettings['colorBlind'])}
            title="Select color blind support"
            aria-label="Select color blind support"
          >
            <option value="none">None</option>
            <option value="protanopia">Protanopia (Red-blind)</option>
            <option value="deuteranopia">Deuteranopia (Green-blind)</option>
            <option value="tritanopia">Tritanopia (Blue-blind)</option>
          </Form.Select>
        </div>

        {/* Motion & Animation */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2">Motion & Animation</h6>
          <Form.Check
            type="switch"
            id="reduced-motion"
            label="Reduce motion"
            checked={settings.reducedMotion}
            onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
          />
        </div>

        {/* Navigation */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2">
            <IconWrapper icon={Keyboard} className="me-2" size={16} />
            Navigation
          </h6>
          <Form.Check
            type="switch"
            id="focus-indicators"
            label="Enhanced focus indicators"
            checked={settings.focusIndicators}
            onChange={(e) => updateSetting('focusIndicators', e.target.checked)}
            className="mb-2"
          />
          <Form.Check
            type="switch"
            id="large-targets"
            label="Larger click targets"
            checked={settings.largerClickTargets}
            onChange={(e) => updateSetting('largerClickTargets', e.target.checked)}
            className="mb-2"
          />
          <Form.Check
            type="switch"
            id="reading-guide"
            label="Reading guide"
            checked={settings.readingGuide}
            onChange={(e) => updateSetting('readingGuide', e.target.checked)}
          />
        </div>

        {/* Keyboard Shortcuts */}
        <div>
          <h6 className="fw-bold mb-2">Keyboard Shortcuts</h6>
          <small className="text-muted">
            <div><Badge bg="secondary">Alt + A</Badge> Open accessibility menu</div>
            <div><Badge bg="secondary">Tab</Badge> Navigate elements</div>
            <div><Badge bg="secondary">Enter/Space</Badge> Activate buttons</div>
            <div><Badge bg="secondary">Esc</Badge> Close modals</div>
          </small>
        </div>
      </Card.Body>

      <style>{`
        .accessibility-fab {
          position: fixed;
          bottom: 90px;
          left: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
          z-index: 9999;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .accessibility-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.6);
        }
        
        .accessibility-fab .pulse-ring {
          position: absolute;
          border: 3px solid #28a745;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          animation: pulse-ring 2s infinite;
          opacity: 0;
        }
        
        .accessibility-widget {
          border: none;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }
        
        .accessibility-widget .card-body {
          scrollbar-width: thin;
        }
        
        .accessibility-widget .card-body::-webkit-scrollbar {
          width: 4px;
        }
        
        .accessibility-widget .card-body::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .accessibility-widget .card-body::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        /* Accessibility enhancements */
        [data-focus-indicators="true"] *:focus {
          outline: 3px solid #007bff !important;
          outline-offset: 2px !important;
        }
        
        [data-large-targets="true"] button,
        [data-large-targets="true"] a,
        [data-large-targets="true"] input {
          min-height: 44px !important;
          min-width: 44px !important;
        }
        
        [data-contrast="high"] {
          filter: contrast(150%);
        }
        
        [data-contrast="inverted"] {
          filter: invert(1) hue-rotate(180deg);
        }
        
        [data-colorblind="protanopia"] {
          filter: url(#protanopia);
        }
        
        [data-colorblind="deuteranopia"] {
          filter: url(#deuteranopia);
        }
        
        [data-colorblind="tritanopia"] {
          filter: url(#tritanopia);
        }
        
        /* Font scaling */
        body {
          font-size: calc(1rem * var(--accessibility-font-scale, 1));
        }
        
        @media (max-width: 768px) {
          .accessibility-widget {
            left: 10px;
            right: 10px;
            width: auto;
          }
          
          .accessibility-fab {
            left: 10px;
            bottom: 80px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .accessibility-fab .pulse-ring {
            animation: none;
          }
        }
      `}</style>

      {/* SVG Filters for Color Blind Support */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
          </filter>
          <filter id="tritanopia">
            <feColorMatrix values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
          </filter>
        </defs>
      </svg>
    </Card>
  );
};

export default AccessibilityWidget;
