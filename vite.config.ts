import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            bootstrap: ['react-bootstrap', 'bootstrap'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            utils: ['axios', 'i18next', 'react-i18next']
          }
        }
      }
    },
    server: {
      port: 3001,
      host: true,
      strictPort: false,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          ws: true // Support WebSocket proxying
        },
        '/ws': {
          target: env.VITE_WS_URL || 'ws://localhost:3001',
          changeOrigin: true,
          secure: false,
          ws: true
        }
      }
    },
    preview: {
      port: 10000,
      host: '0.0.0.0'
    },
    define: {
      global: 'globalThis',
      __WS_URL__: JSON.stringify(env.VITE_WS_URL || 'ws://localhost:3001'),
      __API_URL__: JSON.stringify(env.VITE_API_URL || 'http://localhost:3001/api')
    }
  };
});
