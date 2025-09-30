import React, { useEffect, useState } from 'react';
import { Card, Button, Badge, Alert } from 'react-bootstrap';
import { createWebSocketConnection, getWebSocketURL } from '../../utils/websocket';
import { useSystemNotifications } from '../Notifications/FloatingNotifications';

interface WebSocketExampleProps {
  token?: string;
}

const WebSocketExample: React.FC<WebSocketExampleProps> = ({ token }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [messages, setMessages] = useState<string[]>([]);
  const { showSuccess, showError, showInfo } = useSystemNotifications();

  const connect = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      showInfo('Already Connected', 'WebSocket is already connected.');
      return;
    }

    setStatus('connecting');
    showInfo('Connecting...', `Connecting to ${getWebSocketURL()}`);

    try {
      const newWs = createWebSocketConnection(token);
      
      newWs.addEventListener('open', () => {
        setStatus('connected');
        showSuccess('Connected!', 'WebSocket connection established successfully.');
      });
      
      newWs.addEventListener('close', () => {
        setStatus('disconnected');
        showInfo('Disconnected', 'WebSocket connection closed.');
      });
      
      newWs.addEventListener('error', () => {
        setStatus('error');
        showError('Connection Error', 'Failed to connect to WebSocket server.');
      });
      
      newWs.addEventListener('message', (event) => {
        setMessages(prev => [...prev, `Received: ${event.data}`]);
        showInfo('Message Received', event.data);
      });
      
      setWs(newWs);
    } catch (error) {
      setStatus('error');
      showError('Connection Failed', `Error: ${error}`);
    }
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      setWs(null);
      setStatus('disconnected');
    }
  };

  const sendMessage = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessages(prev => [...prev, `Sent: ${message}`]);
      showSuccess('Message Sent', message);
    } else {
      showError('Cannot Send', 'WebSocket is not connected.');
    }
  };

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge bg="success">Connected</Badge>;
      case 'connecting':
        return <Badge bg="warning">Connecting...</Badge>;
      case 'error':
        return <Badge bg="danger">Error</Badge>;
      default:
        return <Badge bg="secondary">Disconnected</Badge>;
    }
  };

  return (
    <Card className="websocket-demo">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">WebSocket Demo</h5>
          {getStatusBadge()}
        </div>
      </Card.Header>
      
      <Card.Body>
        <Alert variant="info" className="mb-3">
          <strong>WebSocket URL:</strong> {getWebSocketURL()}
        </Alert>
        
        <div className="d-flex gap-2 mb-3">
          <Button 
            variant="success" 
            onClick={connect}
            disabled={status === 'connecting' || status === 'connected'}
          >
            Connect
          </Button>
          <Button 
            variant="danger" 
            onClick={disconnect}
            disabled={status === 'disconnected'}
          >
            Disconnect
          </Button>
          <Button 
            variant="primary" 
            onClick={() => sendMessage(`Hello from ${new Date().toLocaleTimeString()}`)}
            disabled={status !== 'connected'}
          >
            Send Test Message
          </Button>
        </div>

        {messages.length > 0 && (
          <div>
            <h6>Messages:</h6>
            <div className="bg-light p-2 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {messages.slice(-10).map((msg, index) => (
                <div key={index} className="small text-muted">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WebSocketExample;
