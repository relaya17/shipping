import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button, Badge, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Robot,
  Send,
  X,
  Dash,
  ArrowsFullscreen,
  Person,
  Lightbulb,
  QuestionCircle,
  Clock
} from 'react-bootstrap-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  message: string;
  icon: React.ReactNode;
}

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'Get Quote',
      message: 'I need a shipping quote',
      icon: <Lightbulb size={14} />
    },
    {
      id: '2',
      label: 'Track Package',
      message: 'Track my package',
      icon: <QuestionCircle size={14} />
    },
    {
      id: '3',
      label: 'Shipping Times',
      message: 'How long does shipping take?',
      icon: <Clock size={14} />
    }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: 'Hello! I\'m your VIP Shipping assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(undefined);
      }, 1000 + Math.random() * 2000);
    });
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing time
    await simulateTyping();
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
      return 'I\'d be happy to help you get a shipping quote! To provide you with the most accurate quote, I\'ll need some details:\n\n• What are you shipping?\n• Where are you shipping from and to?\n• What are the dimensions and weight?\n\nYou can also use our instant quote calculator on the homepage!';
    }
    
    if (message.includes('track') || message.includes('tracking')) {
      return 'To track your package, please provide your tracking number. It usually starts with "VIP" followed by numbers. You can also track your shipment using our tracking tool on the website.';
    }
    
    if (message.includes('time') || message.includes('how long') || message.includes('delivery')) {
      return 'Shipping times vary by destination and service level:\n\n🚢 Ocean Freight: 15-45 days\n✈️ Air Freight: 3-7 days\n⚡ Express: 1-3 days\n\nWould you like specific information for your destination?';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to VIP International Shipping! I\'m here to help you with quotes, tracking, shipping information, and any questions you might have. What can I assist you with today?';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re very welcome! Is there anything else I can help you with today? I\'m here 24/7 to assist with all your shipping needs! 😊';
    }
    
    // Default response
    return 'I understand you\'re asking about "' + userMessage + '". While I\'m still learning, I can help you with:\n\n• Shipping quotes and pricing\n• Package tracking\n• Delivery times and services\n• General shipping questions\n\nFor complex queries, you can also contact our human support team at support@vipshipping.com or call +1-800-VIP-SHIP.';
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get bot response
    const botResponse = await generateBotResponse(text);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.message);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <Button
        className="chatbot-fab"
        onClick={toggleChat}
        title="Chat with AI Assistant"
      >
        <Robot size={24} />
        <div className="pulse-dot"></div>
      </Button>
    );
  }

  return (
    <Card 
      className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        height: isMinimized ? '60px' : '500px',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Card.Header className="d-flex align-items-center justify-content-between p-3 bg-primary text-white">
        <div className="d-flex align-items-center gap-2">
          <Robot size={20} />
          <div>
            <h6 className="mb-0">VIP Assistant</h6>
            <small className="opacity-75">
              {isTyping ? 'Typing...' : 'Online'}
            </small>
          </div>
        </div>
        <div className="d-flex gap-1">
          <Button
            variant="link"
            size="sm"
            className="text-white p-1"
            onClick={minimizeChat}
          >
            <Dash size={14} />
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white p-1"
            onClick={toggleChat}
          >
            <X size={14} />
          </Button>
        </div>
      </Card.Header>

      {!isMinimized && (
        <>
          {/* Messages */}
          <Card.Body 
            className="p-0"
            style={{ 
              height: '340px', 
              overflowY: 'auto',
              scrollbarWidth: 'thin'
            }}
          >
            <div className="p-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`d-flex mb-3 ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    style={{
                      maxWidth: '80%',
                      padding: '8px 12px',
                      borderRadius: '18px',
                      fontSize: '14px',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {message.sender === 'bot' && (
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Robot size={12} />
                        <small className="text-muted">VIP Bot</small>
                      </div>
                    )}
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="bot-message d-flex align-items-center gap-2 p-2">
                    <Spinner size="sm" />
                    <small>AI is thinking...</small>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </Card.Body>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2">
              <small className="text-muted">Quick actions:</small>
              <div className="d-flex gap-1 mt-1 flex-wrap">
                {quickActions.map((action) => (
                  <Badge
                    key={action.id}
                    bg="light"
                    text="dark"
                    className="cursor-pointer quick-action-badge"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action.icon}
                    <span className="ms-1">{action.label}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <Card.Footer className="p-3 border-top">
            <Form onSubmit={handleSubmit}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{ borderRadius: '20px' }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!inputText.trim() || isTyping}
                  style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Send size={16} />
                </Button>
              </div>
            </Form>
          </Card.Footer>
        </>
      )}

      <style>{`
        .chatbot-fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
          z-index: 1000;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .chatbot-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.6);
        }
        
        .pulse-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 12px;
          height: 12px;
          background: #28a745;
          border-radius: 50%;
          border: 2px solid white;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
        }
        
        .chatbot-container {
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border-radius: 20px;
          overflow: hidden;
        }
        
        .user-message {
          background: #007bff;
          color: white;
          margin-left: auto;
        }
        
        .bot-message {
          background: #f8f9fa;
          color: #333;
          border: 1px solid #e9ecef;
        }
        
        .quick-action-badge {
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #dee2e6;
        }
        
        .quick-action-badge:hover {
          background: #007bff !important;
          color: white !important;
          transform: translateY(-1px);
        }
        
        .chatbot-container .card-body::-webkit-scrollbar {
          width: 4px;
        }
        
        .chatbot-container .card-body::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .chatbot-container .card-body::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        .chatbot-container .card-body::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </Card>
  );
};

export default ChatBot;