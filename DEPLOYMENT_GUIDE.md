# 🚀 VIP International Shipping - Deployment Guide

## 📋 Quick Setup

### 1. Environment Configuration

Create environment files:

**For Development (`environment.development`):**

```env
VITE_WS_URL=ws://localhost:3001
VITE_API_URL=http://localhost:3001/api
NODE_ENV=development
```

**For Production (`environment.production`):**

```env
VITE_WS_URL=wss://archtrack.onrender.com
VITE_API_URL=https://archtrack.onrender.com/api
NODE_ENV=production
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Development

```bash
# Start both client and server
pnpm run dev:full

# Or separately:
pnpm run dev        # Client only (port 3001)
pnpm run server:dev # Server only
```

### 4. Production Build

```bash
pnpm run build:prod
pnpm run preview
```

## 🔧 Fixed Issues

### ✅ WebSocket Configuration

- **Problem**: WebSocket connections failing with CSP errors
- **Solution**: Environment-based URL configuration with auto-detection
- **Files**: `src/utils/websocket.ts`, `vite.config.ts`, `index.html`

### ✅ Safari Compatibility

- **Problem**: `backdrop-filter` not supported in Safari
- **Solution**: Added `-webkit-backdrop-filter` prefixes
- **Files**: `src/index.css`

### ✅ PWA Icons

- **Problem**: Missing manifest icons causing errors
- **Solution**: Created proper icon structure and updated manifest
- **Files**: `public/manifest.json`, `public/icons/`

### ✅ TypeScript Any Types

- **Problem**: Using `any` types throughout the codebase
- **Solution**: Replaced with proper TypeScript interfaces
- **Files**: Multiple components with strict typing

### ✅ React Bootstrap Icons

- **Problem**: `Minimize` icon doesn't exist
- **Solution**: Replaced with `Dash` icon
- **Files**: `src/components/AI/ChatBot.tsx`

## 🌐 WebSocket Usage

```typescript
import {
  createWebSocketConnection,
  ReconnectingWebSocket,
} from "./utils/websocket";

// Simple connection
const ws = createWebSocketConnection("your-token");

// Advanced with auto-reconnect
const reconnectingWs = new ReconnectingWebSocket("your-token");
reconnectingWs.addEventListener("message", (event) => {
  console.log("Received:", event.data);
});
```

## 🎨 New Features

### 🔔 Advanced Notifications

- Floating notifications with actions
- Auto-dismiss and pinning options
- Payment success notifications
- Shipping status updates

### 💳 Secure Payment System

- Multi-payment method support
- 3D Secure authentication
- Real-time validation
- Security score indicator

### ♿ Accessibility Widget

- Font size controls
- Color blind support
- Screen reader compatibility
- Keyboard navigation

### 📱 PWA Support

- Service worker registration
- Offline capabilities
- App manifest
- Install prompts

## 🚀 Deployment

### Render.com Deployment

1. Connect your GitHub repository
2. Set environment variables:
   ```
   VITE_WS_URL=wss://your-app.onrender.com
   VITE_API_URL=https://your-app.onrender.com/api
   NODE_ENV=production
   ```
3. Build command: `pnpm run build:prod`
4. Start command: `pnpm run preview`

### Vercel Deployment

```bash
vercel --prod
```

### Netlify Deployment

```bash
netlify deploy --prod --dir=dist
```

## 🔐 Security Features

- Content Security Policy (CSP)
- XSS Protection
- HTTPS/WSS enforcement
- CORS configuration
- Input validation
- Secure headers

## 📊 Performance

- Code splitting by vendor/features
- Lazy loading components
- Optimized bundle sizes
- Service worker caching
- Image optimization

## 🧪 Testing

```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Build verification
pnpm run build
```

## 📞 Support

For deployment issues:

- Email: tech@vipshipping.com
- Discord: VIP Shipping Dev
- Documentation: /docs/API.md

---

**Status: ✅ Production Ready**  
**Last Updated**: September 2025  
**Version**: 2.0.0
