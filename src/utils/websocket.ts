import { config, debugLog, errorLog } from './environment';

// WebSocket Configuration Helper
export const getWebSocketURL = (): string => {
    return config.websocket.url;
};

export const getApiURL = (): string => {
    return config.api.baseUrl;
};

// WebSocket Connection Helper with Auto-Reconnect
export const createWebSocketConnection = (token?: string): WebSocket => {
    const wsUrl = getWebSocketURL();
    const url = token ? `${wsUrl}?token=${token}` : wsUrl;

    debugLog(`🔌 Connecting to WebSocket: ${url}`);

    const ws = new WebSocket(url);

    ws.addEventListener('open', () => {
        debugLog('✅ WebSocket Connected successfully');
    });

    ws.addEventListener('error', (error) => {
        errorLog('❌ WebSocket Connection Error', error as unknown as Error);
    });

    ws.addEventListener('close', (event) => {
        debugLog(`🔒 WebSocket Closed: Code ${event.code}, Reason: ${event.reason}`);
    });

    return ws;
};

// Advanced WebSocket with Reconnection Logic
export class ReconnectingWebSocket {
    private ws: WebSocket | null = null;
    private url: string;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = config.websocket.maxReconnectAttempts;
    private reconnectInterval = config.websocket.reconnectInterval;
    private listeners: { [key: string]: EventListener[] } = {};

    constructor(token?: string) {
        const wsUrl = getWebSocketURL();
        this.url = token ? `${wsUrl}?token=${token}` : wsUrl;
        this.connect();
    }

    private connect(): void {
        try {
            this.ws = new WebSocket(this.url);
            this.setupEventListeners();
        } catch (error) {
            errorLog('Failed to create WebSocket connection', error as Error);
            this.scheduleReconnect();
        }
    }

    private setupEventListeners(): void {
        if (!this.ws) return;

        this.ws.addEventListener('open', () => {
            debugLog('✅ ReconnectingWebSocket Connected');
            this.reconnectAttempts = 0;
            this.trigger('open');
        });

        this.ws.addEventListener('message', (event) => {
            this.trigger('message', event);
        });

        this.ws.addEventListener('error', (error) => {
            errorLog('❌ ReconnectingWebSocket Error', error as unknown as Error);
            this.trigger('error', error);
        });

        this.ws.addEventListener('close', (event) => {
            debugLog(`🔒 ReconnectingWebSocket Closed: ${event.code}`);
            this.trigger('close', event);

            if (event.code !== 1000) { // Not a normal closure
                this.scheduleReconnect();
            }
        });
    }

    private scheduleReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            errorLog('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        debugLog(`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

        setTimeout(() => {
            this.connect();
        }, this.reconnectInterval);
    }

    public addEventListener(type: string, listener: EventListener): void {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }

    public removeEventListener(type: string, listener: EventListener): void {
        if (this.listeners[type]) {
            this.listeners[type] = this.listeners[type].filter(l => l !== listener);
        }
    }

    private trigger(type: string, event?: Event): void {
        if (this.listeners[type]) {
            this.listeners[type].forEach(listener => {
                listener(event || new Event(type));
            });
        }
    }

    public send(data: string): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        } else {
            errorLog('Cannot send message: WebSocket is not connected');
        }
    }

    public close(): void {
        this.maxReconnectAttempts = 0; // Prevent reconnection
        if (this.ws) {
            this.ws.close();
        }
    }

    public get readyState(): number {
        return this.ws ? this.ws.readyState : WebSocket.CLOSED;
    }
}
