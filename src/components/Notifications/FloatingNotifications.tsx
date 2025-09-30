import React, { useState, useEffect, createContext, useContext } from 'react';
import { Toast, ToastContainer, Alert, Button } from 'react-bootstrap';
import { 
  CheckCircleFill, 
  ExclamationTriangleFill, 
  InfoCircleFill, 
  XCircleFill,
  X,
  Pin,
  PinFill
} from 'react-bootstrap-icons';

interface FloatingNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  duration?: number; // in milliseconds, 0 for persistent
  pinned?: boolean;
  timestamp: Date;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: string;
  }>;
}

interface NotificationContextType {
  addNotification: (notification: Omit<FloatingNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<FloatingNotification[]>([]);

  const addNotification = (notification: Omit<FloatingNotification, 'id' | 'timestamp'>) => {
    const newNotification: FloatingNotification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      duration: notification.duration ?? 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration (if not persistent and not pinned)
    if (newNotification.duration && newNotification.duration > 0 && !newNotification.pinned) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, newNotification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const togglePin = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, pinned: !notification.pinned }
          : notification
      )
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleFill className="text-success" size={20} />;
      case 'warning':
        return <ExclamationTriangleFill className="text-warning" size={20} />;
      case 'error':
        return <XCircleFill className="text-danger" size={20} />;
      default:
        return <InfoCircleFill className="text-info" size={20} />;
    }
  };

  const getBgClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success-subtle border-success';
      case 'warning':
        return 'bg-warning-subtle border-warning';
      case 'error':
        return 'bg-danger-subtle border-danger';
      default:
        return 'bg-info-subtle border-info';
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, clearAll }}>
      {children}
      
      {/* Floating Notifications */}
      <div 
        className="floating-notifications"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          maxWidth: '400px',
          width: '100%'
        }}
      >
        {notifications.map((notification, index) => (
          <Alert
            key={notification.id}
            className={`floating-notification ${getBgClass(notification.type)} shadow-lg mb-2`}
            style={{
              border: '2px solid',
              borderRadius: '15px',
              animation: `slideInRight 0.3s ease-out`,
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
              backdropFilter: 'blur(10px)',
              background: `var(--glass-bg)`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="d-flex align-items-start gap-3">
              <div className="flex-shrink-0 pt-1">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-grow-1 min-width-0">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h6 className="mb-0 fw-bold">{notification.title}</h6>
                  <div className="d-flex gap-1">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-muted"
                      onClick={() => togglePin(notification.id)}
                      title={notification.pinned ? 'Unpin' : 'Pin'}
                    >
                      {notification.pinned ? <PinFill size={14} /> : <Pin size={14} />}
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-muted"
                      onClick={() => removeNotification(notification.id)}
                      title="Close"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
                
                <p className="mb-2 small">{notification.message}</p>
                
                {notification.actions && notification.actions.length > 0 && (
                  <div className="d-flex gap-2 flex-wrap">
                    {notification.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || 'outline-primary'}
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={action.onClick}
                        style={{ fontSize: '0.75rem' }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress bar for timed notifications */}
            {!notification.pinned && notification.duration && notification.duration > 0 && (
              <div 
                className="notification-progress"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  background: `var(--color-${notification.type})`,
                  animation: `shrink ${notification.duration}ms linear`,
                  transformOrigin: 'left'
                }}
              />
            )}
          </Alert>
        ))}
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
        
        .floating-notification {
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .floating-notification:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        
        @media (max-width: 768px) {
          .floating-notifications {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
          }
        }
      `}</style>
    </NotificationContext.Provider>
  );
};

// System-wide notification hooks
export const useSystemNotifications = () => {
  const { addNotification } = useNotifications();

  const showSuccess = (title: string, message: string, actions?: FloatingNotification['actions']) => {
    addNotification({ type: 'success', title, message, actions });
  };

  const showWarning = (title: string, message: string, actions?: FloatingNotification['actions']) => {
    addNotification({ type: 'warning', title, message, actions, duration: 7000 });
  };

  const showError = (title: string, message: string, actions?: FloatingNotification['actions']) => {
    addNotification({ type: 'error', title, message, actions, duration: 0, pinned: true });
  };

  const showInfo = (title: string, message: string, actions?: FloatingNotification['actions']) => {
    addNotification({ type: 'info', title, message, actions });
  };

  const showPaymentSuccess = (amount: string, orderId: string) => {
    showSuccess(
      'Payment Successful!',
      `Your payment of ${amount} has been processed successfully. Order ID: ${orderId}`,
      [
        {
          label: 'View Receipt',
          onClick: () => window.open(`/receipt/${orderId}`, '_blank'),
          variant: 'primary'
        },
        {
          label: 'Track Shipment',
          onClick: () => window.location.href = `/tracking/${orderId}`,
          variant: 'outline-primary'
        }
      ]
    );
  };

  const showShippingUpdate = (trackingId: string, status: string) => {
    showInfo(
      'Shipment Update',
      `Your package ${trackingId} status: ${status}`,
      [
        {
          label: 'View Details',
          onClick: () => window.location.href = `/tracking/${trackingId}`,
          variant: 'primary'
        }
      ]
    );
  };

  return {
    showSuccess,
    showWarning,
    showError,
    showInfo,
    showPaymentSuccess,
    showShippingUpdate
  };
};
