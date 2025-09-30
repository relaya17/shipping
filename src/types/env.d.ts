/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WS_URL: string;
    readonly VITE_API_URL: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Global definitions for Vite
declare const __WS_URL__: string;
declare const __API_URL__: string;
