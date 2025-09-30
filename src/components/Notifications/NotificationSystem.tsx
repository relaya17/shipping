import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer, Button, Badge, Card } from 'react-bootstrap';
import { 
  Bell, 
  CheckCircle, 
  ExclamationTriangle, 
  InfoCircle, 
  XCircle,
  Truck,
  Clock
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showToasts, setShowToasts] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // הוספת התראה חדשה
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // מקסימום 20 התראות
    setUnreadCount(prev => prev + 1);

    // הצגת toast
    if (showToasts) {
      setTimeout(() => {
        markAsRead(newNotification.id);
      }, 5000);
    }
  };

  // סימון כנקרא
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

  // סימולציה של התראות בזמן אמת
  useEffect(() => {
    const demoNotifications = [
      {
        type: 'success' as const,
        title: 'משלוח החל!',
        message: 'המשלוח שלך VIP123456 יצא מנמל ניו יורק',
        action: {
          label: 'עקוב',
          onClick: () => console.log('מעבר למעקב')
        }
      },
      {
        type: 'info' as const,
        title: 'עדכון מחיר',
        message: 'מחירי ההובלה לאירופה עודכנו - חסכון של עד 15%',
        action: {
          label: 'צפה במחירים',
          onClick: () => console.log('מעבר למחירים')
        }
      },
      {
        type: 'warning' as const,
        title: 'בדיקת מכס',
        message: 'המשלוח שלך בבדיקת מכס - עלול להתעכב ב-24 שעות',
      }
    ];

    // הוספת התראות דמו כל 10 שניות
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

  return (
    <>
      {/* כפתור התראות */}
      <div 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000
        }}
      >
        <Button
          variant="outline-primary"
          className="position-relative"
          onClick={() => setShowToasts(!showToasts)}
          aria-label="התראות"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              bg="danger" 
              pill 
              className="position-absolute top-0 start-100 translate-middle"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* התראות Toast */}
      <ToastContainer 
        position="top-start" 
        className="mt-5"
        style={{ zIndex: 1050 }}
      >
        {notifications.slice(0, 5).map((notification) => (
          <Toast
            key={notification.id}
            show={showToasts && !notification.read}
            onClose={() => markAsRead(notification.id)}
            delay={8000}
            autohide
            className="mb-2"
          >
            <Toast.Header>
              <div className="me-2">
                {getIcon(notification.type)}
              </div>
              <strong className="me-auto">{notification.title}</strong>
              <small className="text-muted">
                {notification.timestamp.toLocaleTimeString('he-IL', {
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

      {/* פאנל התראות מורחב */}
      {showToasts && notifications.length > 0 && (
        <Card
          style={{
            position: 'fixed',
            top: '80px',
            left: '20px',
            width: '350px',
            maxHeight: '400px',
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">התראות אחרונות</h6>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                setUnreadCount(0);
              }}
            >
              סמן הכל כנקרא
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
                      {notification.timestamp.toLocaleString('he-IL')}
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

      {/* CSS לאנימציות */}
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
