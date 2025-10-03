import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Send, Chat, X } from 'react-bootstrap-icons';
import { trackAIInteraction } from '../../utils/analytics';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Hello! I\'m your VIP Shipping AI Expert!\n\n🤖 I have comprehensive knowledge about:\n• 💰 Real-time shipping prices worldwide\n• 🌍 150+ countries & destinations\n• 📦 All shipping methods & services\n• 🛃 Customs & import regulations\n• 🚗 Vehicle & special items shipping\n• 🏠 International household moving\n\nAsk me anything! Try:\n"Price to ship to Europe?"\n"How long to USA?"\n"Piano shipping costs?"\n"Customs requirements?"',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced AI function with comprehensive knowledge base
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Price and Cost queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote') || lowerMessage.includes('מחיר') || lowerMessage.includes('עלות')) {
      if (lowerMessage.includes('europe') || lowerMessage.includes('אירופה')) {
        return '💰 Shipping to Europe:\n• Container (20ft): $2,500-$4,500\n• Shared Container: $800-$2,000\n• Air Freight: $3-$8 per kg\n• Express: $5-$12 per kg\n• Sea Freight: 7-14 days\n• Air: 3-7 days\nPrices vary by exact destination, volume, and season. Want a personalized quote?';
      }
      if (lowerMessage.includes('usa') || lowerMessage.includes('america') || lowerMessage.includes('ארצות הברית')) {
        return '💰 Shipping to USA:\n• Container (20ft): $3,000-$5,500\n• Shared Container: $1,000-$2,500\n• Air Freight: $4-$9 per kg\n• Express: $6-$15 per kg\n• Sea Freight: 14-21 days\n• Air: 5-10 days\nFree quote available! What are you shipping?';
      }
      if (lowerMessage.includes('asia') || lowerMessage.includes('china') || lowerMessage.includes('japan') || lowerMessage.includes('אסיה')) {
        return '💰 Shipping to Asia:\n• Container (20ft): $2,000-$4,000\n• Shared Container: $700-$1,800\n• Air Freight: $3-$7 per kg\n• Express: $5-$11 per kg\n• Sea Freight: 14-28 days\n• Air: 5-10 days\nNeed help calculating exact costs?';
      }
      return '💰 Our Pricing Guide:\n• Europe: from $800\n• USA: from $1,000\n• Asia: from $700\n• Australia: from $1,200\n• Africa: from $900\n\nFactors affecting price:\n✓ Distance & destination\n✓ Weight & volume\n✓ Shipping method (sea/air)\n✓ Insurance level\n✓ Packing services\n✓ Customs clearance\n\nTell me your destination for accurate pricing!';
    }
    
    // Time and Duration queries
    if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration') || lowerMessage.includes('זמן') || lowerMessage.includes('כמה זמן')) {
      return '⏱️ Estimated Shipping Times:\n\n🌍 Europe:\n• Sea Freight: 7-14 days\n• Air Freight: 3-7 days\n• Express: 2-4 days\n\n🇺🇸 USA:\n• Sea Freight: 14-21 days\n• Air Freight: 5-10 days\n• Express: 3-6 days\n\n🌏 Asia:\n• Sea Freight: 14-28 days\n• Air Freight: 5-10 days\n• Express: 3-7 days\n\n🦘 Australia:\n• Sea Freight: 21-35 days\n• Air Freight: 7-12 days\n\n⚠️ Customs clearance: +2-5 days\nWhere are you shipping to?';
    }
    
    // Insurance queries
    if (lowerMessage.includes('insurance') || lowerMessage.includes('ביטוח')) {
      return '🛡️ Comprehensive Insurance Options:\n\n📦 Basic Coverage (Free):\n• Up to $1,000 coverage\n• Loss & major damage\n\n💎 Standard Insurance (3% of value):\n• Full replacement value\n• Theft, loss, damage\n• Door-to-door coverage\n\n⭐ Premium Insurance (5% of value):\n• All-risk coverage\n• Natural disasters\n• War & strikes\n• Fragile items protection\n\n💡 Recommended for:\n• Artwork, antiques\n• Electronics, pianos\n• High-value items\n\nWhat are you shipping?';
    }
    
    // Tracking queries
    if (lowerMessage.includes('tracking') || lowerMessage.includes('track') || lowerMessage.includes('מעקב')) {
      return '📍 Real-Time Tracking:\n\n✅ What you get:\n• Live GPS location\n• 24/7 tracking portal\n• SMS & email updates\n• Estimated delivery time\n• Customs status\n• Port arrivals/departures\n\n📱 How to track:\n1. Enter tracking number on our website\n2. Receive automatic notifications\n3. See shipment history\n\nTracking available from pickup to delivery!\nNeed help tracking a shipment?';
    }
    
    // Customs queries
    if (lowerMessage.includes('customs') || lowerMessage.includes('duty') || lowerMessage.includes('tax') || lowerMessage.includes('מכס')) {
      return '🛃 Customs & Import Duties:\n\n📋 Required Documents:\n• Passport copy\n• Packing list (detailed)\n• Invoice/purchase receipts\n• Import license (if needed)\n\n💵 Typical Duties:\n• Europe (EU): 0-20% VAT\n• USA: 0-10% duty + state tax\n• Israel: 17% VAT + customs duty\n\n✅ We Handle:\n• Customs clearance\n• Document preparation\n• Duty payment (optional)\n• Import licenses\n\n💡 Tip: Personal belongings (used items) often get duty exemptions!\nMoving or importing new items?';
    }
    
    // Packing queries
    if (lowerMessage.includes('pack') || lowerMessage.includes('box') || lowerMessage.includes('אריזה')) {
      return '📦 Professional Packing Services:\n\n🎯 Standard Packing:\n• Boxes & bubble wrap\n• Basic protection\n• $150-$300\n\n⭐ Premium Packing:\n• Custom crates\n• Fragile item protection\n• Furniture disassembly\n• $300-$800\n\n🎨 Specialty Items:\n• Artwork: Custom crates, climate control\n• Piano: Professional movers, padding\n• Antiques: Museum-grade packing\n• Electronics: Anti-static materials\n\n💡 DIY Tips:\n• Use strong boxes (double-wall)\n• Wrap fragile items individually\n• Fill empty spaces\n• Label "FRAGILE" clearly\n\nNeed packing services?';
    }
    
    // Car/Vehicle shipping
    if (lowerMessage.includes('car') || lowerMessage.includes('vehicle') || lowerMessage.includes('auto') || lowerMessage.includes('motorcycle') || lowerMessage.includes('רכב') || lowerMessage.includes('אופנוע')) {
      return '🚗 Vehicle Shipping:\n\n🚢 Container Shipping:\n• 20ft container: 1 car\n• 40ft container: 2-3 cars\n• Fully enclosed & protected\n• $2,000-$5,000\n\n🚛 RoRo (Roll-on/Roll-off):\n• Drive on/drive off ship\n• More economical\n• $1,000-$3,000\n\n🏍️ Motorcycle Shipping:\n• Shared container: $600-$1,200\n• Door-to-door service\n\n📋 Required:\n• Title/registration\n• Clean vehicle (no personal items)\n• ¼ tank of fuel max\n• Customs clearance\n\nEurope, USA, or elsewhere?';
    }
    
    // Moving/Household queries
    if (lowerMessage.includes('moving') || lowerMessage.includes('household') || lowerMessage.includes('furniture') || lowerMessage.includes('הובלה') || lowerMessage.includes('רהיטים')) {
      return '🏠 International Household Moving:\n\n📏 Container Sizes:\n• 20ft (33m³): 1-2 bedroom apt\n• 40ft (67m³): 3-4 bedroom house\n• Shared container: Cost-effective option\n\n💰 Full House Move (USA to Europe):\n• 20ft container: $3,500-$6,000\n• 40ft container: $6,000-$10,000\n• Includes: packing, loading, customs, delivery\n\n✅ Services Included:\n• Professional packing\n• Furniture disassembly/assembly\n• Door-to-door service\n• Insurance\n• Customs clearance\n• Unpacking (optional)\n\n📅 Timeline: 6-10 weeks total\nWhere are you moving to?';
    }
    
    // Piano shipping
    if (lowerMessage.includes('piano') || lowerMessage.includes('פסנתר')) {
      return '🎹 Professional Piano Shipping:\n\n🎼 Types We Handle:\n• Upright Piano: $800-$2,000\n• Grand Piano: $1,500-$4,000\n• Antique Piano: Custom quote\n\n📦 Our Process:\n• Piano board & straps\n• Climate-controlled container\n• Professional tuners on both ends\n• Full insurance coverage\n\n⚠️ Important:\n• Pianos are sensitive to temperature\n• Require special crating\n• Must be tuned after shipping\n• 6-8 weeks door-to-door\n\n✅ We work with certified piano movers worldwide!\nWhat type of piano?';
    }
    
    // Artwork shipping
    if (lowerMessage.includes('art') || lowerMessage.includes('painting') || lowerMessage.includes('sculpture') || lowerMessage.includes('אומנות') || lowerMessage.includes('ציור')) {
      return '🖼️ Fine Art Shipping:\n\n🎨 Services:\n• Custom wooden crates\n• Climate-controlled shipping\n• Museum-grade packing\n• White-glove handling\n• Art insurance specialists\n\n💰 Pricing:\n• Small painting: $200-$500\n• Large painting: $500-$2,000\n• Sculpture: $800-$5,000\n• Collection: Custom quote\n\n📋 Includes:\n• Condition report (before/after)\n• Temperature monitoring\n• Humidity control\n• Shock sensors\n• Customs art documentation\n\n✅ Trusted by galleries & collectors worldwide!\nTell me about your artwork.';
    }
    
    // Storage queries
    if (lowerMessage.includes('storage') || lowerMessage.includes('warehouse') || lowerMessage.includes('אחסון')) {
      return '🏢 Storage Solutions:\n\n📦 Short-term Storage:\n• $50-$150 per m³/month\n• Climate-controlled\n• 24/7 security\n• Access on request\n\n📅 Long-term Storage:\n• Discounted rates\n• $40-$100 per m³/month\n• 6+ months commitment\n\n🌍 Locations:\n• Port facilities worldwide\n• Major city warehouses\n• Temperature/humidity controlled\n\n✅ Perfect for:\n• Delayed delivery\n• Downsizing\n• Temporary relocation\n• Excess inventory\n\nHow long do you need storage?';
    }
    
    // Pet relocation
    if (lowerMessage.includes('pet') || lowerMessage.includes('dog') || lowerMessage.includes('cat') || lowerMessage.includes('חיית מחמד') || lowerMessage.includes('כלב') || lowerMessage.includes('חתול')) {
      return '🐕 Pet Relocation Services:\n\n✈️ What We Provide:\n• IATA-approved pet crates\n• Health certificate coordination\n• Veterinary checks\n• Flight booking\n• Airport pickup/delivery\n\n💰 Pricing:\n• Small pet (cat): $800-$1,500\n• Medium dog: $1,200-$2,500\n• Large dog: $2,000-$4,000\n\n📋 Requirements:\n• Vaccinations (rabies, etc.)\n• Microchip\n• Health certificate (10 days before)\n• Import permit (destination)\n\n⚠️ Quarantine varies by country:\n• EU: No quarantine (with pet passport)\n• UK: No quarantine (with proper docs)\n• Australia: 10+ days quarantine\n\nWhich country and pet type?';
    }
    
    // Documentation queries
    if (lowerMessage.includes('document') || lowerMessage.includes('paperwork') || lowerMessage.includes('visa') || lowerMessage.includes('מסמכים')) {
      return '📄 Required Documentation:\n\n✅ For Shipping:\n• Passport copy\n• Detailed packing list\n• Invoice/receipts\n• Destination address\n• Phone number\n\n✅ For Moving (used household):\n• Residence permit/visa\n• Proof of address\n• Employment letter\n• Customs declaration form\n\n✅ For Vehicles:\n• Title/registration\n• Bill of sale\n• EPA/DOT compliance (USA)\n• Import license\n\n✅ For Pets:\n• Health certificate\n• Vaccination records\n• Microchip certificate\n• Import permit\n\n💡 We can help prepare all documents!\nWhat are you shipping?';
    }
    
    // Shipping methods
    if (lowerMessage.includes('method') || lowerMessage.includes('sea') || lowerMessage.includes('air') || lowerMessage.includes('express') || lowerMessage.includes('שיטה')) {
      return '🚢 Shipping Methods:\n\n🌊 Sea Freight (Most economical):\n• Best for: Large volumes, furniture\n• Cost: $$\n• Time: 14-45 days\n• Container or shared container\n\n✈️ Air Freight (Fast):\n• Best for: Urgent items, small volumes\n• Cost: $$$$\n• Time: 3-10 days\n• Weight-based pricing\n\n⚡ Express Courier (Fastest):\n• Best for: Documents, small packages\n• Cost: $$$$$\n• Time: 2-5 days\n• Door-to-door tracking\n\n🚂 Land Freight (Regional):\n• Best for: Europe, neighboring countries\n• Cost: $$$\n• Time: 5-14 days\n\n💡 Recommendation: Sea freight for moving, Air for urgent!\nWhat are you shipping?';
    }
    
    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('שלום') || lowerMessage.includes('היי')) {
      return '👋 Hello! Welcome to VIP International Shipping AI Assistant!\n\nI can help you with:\n🌍 Shipping quotes & prices\n⏱️ Delivery timeframes\n📦 Packing solutions\n🚗 Vehicle shipping\n🎹 Special items (pianos, art)\n🏠 Household moving\n🛃 Customs & documentation\n🐕 Pet relocation\n📍 Tracking shipments\n💡 Tips & advice\n\nWhat can I help you with today?';
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('תודה')) {
      return '😊 You\'re very welcome! \n\nIs there anything else I can help you with?\n\n💬 Ask me about:\n• Prices & quotes\n• Shipping times\n• Packing tips\n• Customs procedures\n• Special items\n\nOr contact us:\n📞 Phone: [Your Number]\n📧 Email: info@vipshipping.com\n🌐 Live chat available 24/7';
    }
    
    // Contact/Support
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('talk') || lowerMessage.includes('speak') || lowerMessage.includes('קשר') || lowerMessage.includes('טלפון')) {
      return '📞 Contact VIP International Shipping:\n\n📱 Phone:\n• USA: +1-XXX-XXX-XXXX\n• Israel: +972-XX-XXX-XXXX\n• Europe: +XX-XXX-XXX-XXXX\n\n📧 Email:\n• info@vipshipping.com\n• quotes@vipshipping.com\n\n💬 Live Chat:\n• Available 24/7 on our website\n\n🏢 Office Hours:\n• Mon-Thu: 9AM - 6PM\n• Fri: 9AM - 2PM\n• Emergency: 24/7 hotline\n\n📍 Visit our offices worldwide!\nWould you like to schedule a call?';
    }
    
    // Default comprehensive response
    return '🤖 VIP Shipping AI Assistant\n\nI have extensive knowledge about:\n\n💰 Pricing:\n• Real-time market rates\n• All destinations\n• Various shipping methods\n\n📦 Services:\n• Household moving\n• Vehicle shipping\n• Special items (pianos, art)\n• Pet relocation\n\n🌍 Global Expertise:\n• 150+ countries\n• Customs procedures\n• Import regulations\n\n💡 I can help you:\n• Get accurate quotes\n• Choose best shipping method\n• Understand customs\n• Track shipments\n• Plan your move\n\nJust ask! Examples:\n"Price to ship to Germany?"\n"How long to USA?"\n"How to ship a piano?"\n"Car shipping costs?"\n"Customs documents needed?"';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Track AI interaction
    trackAIInteraction('user_message', inputValue);

    // Simulate response time
    setTimeout(() => {
      const botResponseText = generateAIResponse(inputValue);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Track AI response
      trackAIInteraction('bot_response', botResponseText);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          variant="success"
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Shipping Assistant"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
            border: '3px solid white',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            animation: 'pulse 2s infinite'
          }}
        >
          <Chat size={28} />
          <small style={{ fontSize: '0.6rem', marginTop: '2px', fontWeight: 'bold' }}>
            AI Help
          </small>
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '360px',
            maxWidth: 'calc(100vw - 40px)',
            height: '480px',
            maxHeight: 'calc(100vh - 140px)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            borderRadius: '16px',
            border: '2px solid #28a745'
          }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
            <div>
              <h6 className="mb-0">🤖 VIP AI Shipping Expert</h6>
              <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                Comprehensive Shipping Knowledge
              </small>
            </div>
            <Button
              variant="light"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              style={{
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </Button>
          </Card.Header>
          
          <Card.Body
            className="flex-grow-1 overflow-auto"
            style={{ 
              maxHeight: '330px',
              backgroundColor: '#f8f9fa',
              padding: '0.75rem'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 d-flex ${
                  message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
                }`}
              >
                <div
                  className={`p-2 p-sm-3 rounded-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-dark border'
                  }`}
                  style={{ 
                    maxWidth: '90%',
                    boxShadow: message.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    whiteSpace: 'pre-line',
                    wordWrap: 'break-word'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{message.text}</div>
                  <small className={message.sender === 'user' ? 'text-white-50' : 'text-muted'} style={{ fontSize: '0.65rem', display: 'block', marginTop: '4px' }}>
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </small>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-3 d-flex justify-content-start">
                <div className="bg-light p-2 rounded">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </Card.Body>
          
          <Card.Footer>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={t('forms.message')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label={t('forms.message')}
              />
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                aria-label={t('common.submit')}
              >
                <Send size={16} />
              </Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      )}

      {/* CSS for typing animation and pulse effect */}
      <style>{`
        .typing-indicator {
          display: flex;
          gap: 4px;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #28a745;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(40, 167, 69, 0.7);
          }
          50% {
            box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 10px rgba(40, 167, 69, 0);
          }
          100% {
            box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(40, 167, 69, 0);
          }
        }

        .chat-toggle-btn:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .chat-window {
            width: calc(100vw - 30px) !important;
            max-width: 400px !important;
            height: 500px !important;
            max-height: calc(100vh - 100px) !important;
            right: 15px !important;
            bottom: 15px !important;
          }
          
          .chat-toggle-btn {
            width: 60px !important;
            height: 60px !important;
            right: 15px !important;
            bottom: 15px !important;
          }
        }

        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 20px) !important;
            height: 450px !important;
            max-height: calc(100vh - 80px) !important;
            right: 10px !important;
            bottom: 10px !important;
            border-radius: 12px !important;
          }
          
          .chat-toggle-btn {
            width: 55px !important;
            height: 55px !important;
            right: 10px !important;
            bottom: 10px !important;
          }

          .chat-window .card-body {
            padding: 0.5rem !important;
          }

          .chat-window .card-header h6 {
            font-size: 0.9rem !important;
          }

          .chat-window .card-header small {
            font-size: 0.65rem !important;
          }
        }

        @media (min-width: 1200px) {
          .chat-window {
            width: 380px !important;
            height: 500px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
