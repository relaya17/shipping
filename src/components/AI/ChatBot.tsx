import React, { useEffect, useRef } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Send, Chat, X } from 'react-bootstrap-icons';
import { useChat } from '@ai-sdk/react';
import { trackAIInteraction } from '../../utils/analytics';

/**
 * ChatBot connected to real AI agent (streaming + tools).
 * Auth via httpOnly cookies (credentials: include) — no JWT in JS.
 */
const ChatBot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRtl = i18n.dir() === 'rtl';
  const side = isRtl ? 'left' : 'right';

  const csrfMatch = typeof document !== 'undefined'
    ? document.cookie.match(/(?:^|; )vip_csrf=([^;]*)/)
    : null;
  const csrfToken = csrfMatch ? decodeURIComponent(csrfMatch[1]) : '';

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat({
    api: '/api/ai/chat',
    credentials: 'include',
    initialMessages: [
      { id: 'welcome', role: 'assistant', content: t('ai.welcome') }
    ],
    headers: {
      'Accept-Language': (i18n.language || 'en').split('-')[0],
      'X-App-Language': (i18n.language || 'en').split('-')[0],
      ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
    },
    body: {
      language: (i18n.language || 'en').split('-')[0],
    },
    onFinish: (message) => {
      trackAIInteraction('bot_response', message.content);
    }
  });

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', role: 'assistant', content: t('ai.welcome') }];
      }
      return prev;
    });
  }, [t, setMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    trackAIInteraction('user_message', input);
    handleSubmit(e);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        trackAIInteraction('user_message', input);
        append({ role: 'user', content: input });
        handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      }
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
          aria-label={t('ai.open_assistant')}
          style={{
            position: 'fixed',
            bottom: '20px',
            [side]: '20px',
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
            {t('ai.help')}
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
            [side]: '20px',
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
              <h6 className="mb-0">{t('ai.expert_title')}</h6>
              <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                {t('ai.live_agent')}
              </small>
            </div>
            <Button
              variant="light"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label={t('common.close')}
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
                  message.role === 'user' ? 'justify-content-end' : 'justify-content-start'
                }`}
              >
                <div
                  className={`p-2 p-sm-3 rounded-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-dark border'
                  }`}
                  style={{
                    maxWidth: '90%',
                    boxShadow: message.role !== 'user' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    whiteSpace: 'pre-line',
                    wordWrap: 'break-word'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{message.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
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
            <Form onSubmit={onSubmit}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={t('forms.message')}
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  aria-label={t('forms.message')}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!input.trim() || isLoading}
                  aria-label={t('common.submit')}
                >
                  <Send size={16} />
                </Button>
              </InputGroup>
            </Form>
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
