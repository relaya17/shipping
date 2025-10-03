import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
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
    port: 3639,
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5044',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 23355,
    host: '0.0.0.0'
  },
  define: {
    global: 'globalThis',
  }
});
