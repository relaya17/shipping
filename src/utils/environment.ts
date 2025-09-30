// Environment Configuration Helper
export const isDevelopment = (): boolean => {
    return import.meta.env.MODE === 'development' || import.meta.env.DEV;
};

export const isProduction = (): boolean => {
    return import.meta.env.MODE === 'production' || import.meta.env.PROD;
};

export const getEnvironment = (): 'development' | 'production' | 'test' => {
    if (isProduction()) return 'production';
    if (isDevelopment()) return 'development';
    return 'test';
};

// Configuration based on environment
export const config = {
    websocket: {
        url: isDevelopment()
            ? (import.meta.env.VITE_WS_URL || 'ws://localhost:3001')
            : (import.meta.env.VITE_WS_URL || 'wss://archtrack.onrender.com'),
        reconnectInterval: 5000,
        maxReconnectAttempts: 5
    },
    api: {
        baseUrl: isDevelopment()
            ? (import.meta.env.VITE_API_URL || 'http://localhost:3001/api')
            : (import.meta.env.VITE_API_URL || 'https://archtrack.onrender.com/api'),
        timeout: 10000
    },
    app: {
        name: 'VIP International Shipping',
        version: '2.0.0',
        environment: getEnvironment()
    }
};

// Debug logging in development only
export const debugLog = (message: string, ...args: unknown[]): void => {
    if (isDevelopment()) {
        console.log(`🔧 [${config.app.name}]`, message, ...args);
    }
};

export const errorLog = (message: string, error?: Error): void => {
    console.error(`❌ [${config.app.name}]`, message, error);
};
