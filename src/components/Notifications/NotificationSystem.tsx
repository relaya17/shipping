import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer, Button, Badge, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  CheckCircle,
  ExclamationTriangle,
  InfoCircle,
  XCircle
} from 'react-bootstrap-icons';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationSystem: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToasts, setShowToasts] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Add new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Maximum 20 notifications
    setUnreadCount(prev => prev + 1);

    // Auto-remove notification after 6 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 6000);
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === id);
      if (notification && !notification.read) {
        setUnreadCount(prevCount => Math.max(0, prevCount - 1));
      }
      return prev.filter(notif => notif.id !== id);
    });
  };

  // Mark as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id && !notif.read 
          ? { ...notif, read: true }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Real-time notification simulation - currently disabled
  // Can be enabled by adding ?demo=true to the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isDemoMode = urlParams.get('demo') === 'true';
    
    if (!isDemoMode) return;

    const demoNotifications = [
      {
        type: 'success' as const,
        title: 'Shipment Started!',
        message: 'Your shipment VIP123456 departed from New York Port',
        action: {
          label: 'Track',
          onClick: () => console.log('Navigate to tracking')
        }
      },
      {
        type: 'info' as const,
        title: 'Price Update',
        message: 'Shipping prices to Europe updated - save up to 15%',
        action: {
          label: 'View Prices',
          onClick: () => console.log('Navigate to prices')
        }
      },
      {
        type: 'warning' as const,
        title: 'Customs Inspection',
        message: 'Your shipment is under customs inspection - may be delayed by 24 hours',
      }
    ];

    // Add demo notifications every 10 seconds
    let index = 0;
    const interval = setInterval(() => {
      if (index < demoNotifications.length) {
        addNotification(demoNotifications[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-success" />;
      case 'warning': return <ExclamationTriangle className="text-warning" />;
      case 'info': return <InfoCircle className="text-info" />;
      case 'error': return <XCircle className="text-danger" />;
      default: return <Bell />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'error': return 'danger';
      default: return 'light';
    }
  };

  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

  return (
    <>
      {/* Notifications button */}
      <div 
        style={{
          position: 'fixed',
          bottom: '90px',
          [isRTL ? 'left' : 'right']: '30px',
          zIndex: 1000
        }}
      >
        <Button
          variant="primary"
          className="position-relative shadow-lg"
          onClick={() => setShowToasts(!showToasts)}
          aria-label={t('notifications.title')}
          style={{ 
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0d6efd',
            border: '2px solid white'
          }}
        >
          <Bell size={26} color="white" />
          {unreadCount > 0 && (
            <Badge 
              bg="danger" 
              pill 
              className="position-absolute"
              style={{ 
                top: '-5px', 
                right: '-5px',
                fontSize: '0.75rem',
                minWidth: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Toast notifications */}
      <ToastContainer 
        position={isRTL ? "bottom-start" : "bottom-end"}
        className="mb-5"
        style={{ 
          zIndex: 1050,
          bottom: '160px',
          [isRTL ? 'left' : 'right']: '20px',
          maxWidth: '400px'
        }}
      >
        {notifications.slice(0, 5).map((notification) => (
          <Toast
            key={notification.id}
            show={showToasts && !notification.read}
            onClose={() => removeNotification(notification.id)}
            delay={5000}
            autohide
            className="mb-2"
          >
            <Toast.Header>
              <div className="me-2">
                {getIcon(notification.type)}
              </div>
              <strong className="me-auto">{notification.title}</strong>
              <small className="text-muted">
                {notification.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </small>
            </Toast.Header>
            <Toast.Body>
              <div className="mb-2">{notification.message}</div>
              {notification.action && (
                <Button 
                  size="sm" 
                  variant={getVariant(notification.type)}
                  onClick={notification.action.onClick}
                >
                  {notification.action.label}
                </Button>
              )}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>

      {/* Expanded notification panel */}
      {showToasts && notifications.length > 0 && (
        <Card
          style={{
            position: 'fixed',
            top: '100px',
            [isRTL ? 'left' : 'right']: '20px',
            width: '350px',
            maxHeight: '500px',
            zIndex: 1040,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            borderRadius: '12px'
          }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
            <h6 className="mb-0">
              <Bell size={18} className="me-2" />
              {t('notifications.title')}
            </h6>
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                setUnreadCount(0);
              }}
            >
              {t('notifications.mark_all_read')}
            </Button>
          </Card.Header>
          
          <Card.Body className="p-0" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-bottom ${!notification.read ? 'bg-light' : ''}`}
                onClick={() => markAsRead(notification.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-start">
                  <div className="me-2 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 small">{notification.title}</h6>
                    <p className="mb-1 small text-muted">{notification.message}</p>
                    <small className="text-muted">
                      {notification.timestamp.toLocaleString('en-US')}
                    </small>
                  </div>
                  {!notification.read && (
                    <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
                  )}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* CSS for animations */}
      <style>{`
        .toast {
          animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .toast-header {
          background: linear-gradient(45deg, #f8f9fa, #e9ecef);
        }
        
        .notification-panel {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </>
  );
};

export default NotificationSystem;
