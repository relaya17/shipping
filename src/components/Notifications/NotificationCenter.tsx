import React, { useState, useEffect } from 'react';
import { Dropdown, Badge, ListGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  BellFill,
  Check2All,
  Trash,
  Circle,
  CheckCircle,
  ExclamationTriangle,
  InfoCircle,
  Truck,
  Globe,
  Clock
} from 'react-bootstrap-icons';
import IconWrapper from '../UI/IconWrapper';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  icon?: React.ReactNode;
}

const NotificationCenter = () => {
  const { i18n } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sample notifications - in real app, these would come from API/WebSocket
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: 'Shipment Update',
        message: 'Your package #SH-2024-001 has arrived at customs',
        type: 'info',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        read: false,
        actionUrl: '/tracking/SH-2024-001',
        icon: <IconWrapper icon={Truck} size={16} />
      },
      {
        id: '2',
        title: 'Quote Ready',
        message: 'Your international shipping quote is ready for review',
        type: 'success',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
        actionUrl: '/quotes',
        icon: <IconWrapper icon={Globe} size={16} />
      },
      {
        id: '3',
        title: 'Delivery Scheduled',
        message: 'Your package will be delivered tomorrow between 9 AM - 5 PM',
        type: 'success',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        read: true,
        actionUrl: '/tracking',
        icon: <IconWrapper icon={Clock} size={16} />
      },
      {
        id: '4',
        title: 'Action Required',
        message: 'Additional documentation needed for customs clearance',
        type: 'warning',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionUrl: '/documents',
        icon: <IconWrapper icon={ExclamationTriangle} size={16} />
      },
      {
        id: '5',
        title: 'Welcome!',
        message: 'Thank you for choosing VIP International Shipping. Your account is now active.',
        type: 'info',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        icon: <IconWrapper icon={InfoCircle} size={16} />
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'success':
        return <IconWrapper icon={CheckCircle} className="text-success" size={16} />;
      case 'warning':
        return <IconWrapper icon={ExclamationTriangle} className="text-warning" size={16} />;
      case 'error':
        return <IconWrapper icon={ExclamationTriangle} className="text-danger" size={16} />;
      default:
        return <IconWrapper icon={InfoCircle} className="text-info" size={16} />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Dropdown 
      show={isOpen} 
      onToggle={setIsOpen}
      align={i18n.language === 'he' ? 'start' : 'end'}
      className="notification-center"
    >
      <Dropdown.Toggle
        variant="outline-light"
        id="notifications-dropdown"
        className="position-relative border-0 p-2"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        {unreadCount > 0 ? (
          <IconWrapper icon={BellFill} size={20} className="text-warning" />
        ) : (
          <IconWrapper icon={Bell} size={20} />
        )}
        
        {unreadCount > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle rounded-pill"
            style={{ fontSize: '0.65rem', minWidth: '1.2rem', height: '1.2rem' }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu 
        className="shadow-lg border-0 p-0"
        style={{ width: '380px', maxHeight: '500px' }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
          <h6 className="mb-0 fw-bold">Notifications</h6>
          <div className="d-flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-decoration-none"
                onClick={markAllAsRead}
                title="Mark all as read"
              >
                <IconWrapper icon={Check2All} size={16} />
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-decoration-none text-danger"
                onClick={clearAll}
                title="Clear all"
              >
                <IconWrapper icon={Trash} size={16} />
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="notification-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div className="text-center p-4 text-muted">
              <IconWrapper icon={Bell} size={32} className="mb-2 opacity-50" />
              <div>No notifications</div>
              <small>You're all caught up!</small>
            </div>
          ) : (
            <ListGroup variant="flush">
              {notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={`notification-item border-0 ${!notification.read ? 'bg-light' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="d-flex align-items-start gap-3">
                    {/* Status Indicator */}
                    <div className="pt-1">
                      {!notification.read ? (
                        <IconWrapper icon={Circle} className="text-primary" size={8} />
                      ) : (
                        <div style={{ width: '8px', height: '8px' }}></div>
                      )}
                    </div>

                    {/* Icon */}
                    <div className="pt-1">
                      {notification.icon as JSX.Element || getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-grow-1 min-width-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className={`mb-1 ${!notification.read ? 'fw-bold' : 'fw-normal'}`}>
                          {notification.title}
                        </h6>
                        <small className="text-muted text-nowrap ms-2">
                          {formatTimestamp(notification.timestamp)}
                        </small>
                      </div>
                      <p className="mb-1 text-muted small">{notification.message}</p>
                      
                      {/* Action Buttons */}
                      <div className="d-flex gap-2 mt-2">
                        {notification.actionUrl && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="rounded-pill px-3"
                            style={{ fontSize: '0.75rem' }}
                          >
                            View Details
                          </Button>
                        )}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-decoration-none text-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          style={{ fontSize: '0.75rem' }}
                        >
                          <IconWrapper icon={Trash} size={12} className="me-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-top p-2">
            <Button
              variant="link"
              className="w-100 text-decoration-none text-center small"
              onClick={() => setIsOpen(false)}
            >
              View All Notifications
            </Button>
          </div>
        )}
      </Dropdown.Menu>

      {/* Custom Styles */}
      <style>{`
        .notification-center .dropdown-toggle::after {
          display: none;
        }
        
        .notification-center .dropdown-toggle:hover,
        .notification-center .dropdown-toggle:focus {
          background: rgba(255,255,255,0.2) !important;
          border-color: rgba(255,255,255,0.3) !important;
        }
        
        .notification-item {
          transition: all 0.2s ease;
          padding: 1rem !important;
        }
        
        .notification-item:hover {
          background-color: #f8f9fa !important;
        }
        
        .notification-list {
          scrollbar-width: thin;
          scrollbar-color: #6c757d transparent;
        }
        
        .notification-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .notification-list::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .notification-list::-webkit-scrollbar-thumb {
          background-color: #6c757d;
          border-radius: 3px;
        }
        
        .notification-list::-webkit-scrollbar-thumb:hover {
          background-color: #495057;
        }
        
        @media (max-width: 576px) {
          .notification-center .dropdown-menu {
            width: 300px !important;
          }
        }
      `}</style>
    </Dropdown>
  );
};

export default NotificationCenter;
