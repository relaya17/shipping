# 📡 API Documentation - VIP International Shipping

## 🎯 סקירה כללית

ה-API של VIP International Shipping מספק גישה לכל שירותי ההובלה, מעקב משלוחים, וניהול הזמנות.

## 🔐 אימות

```typescript
// הוספת token ב-headers
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};
```

## 📚 Endpoints עיקריים

### 🏠 Home & General

#### GET `/api/health`
בדיקת זמינות השרת
```typescript
// Response
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "version": "1.0.0"
}
```

### 💰 Quote Management

#### POST `/api/quotes`
יצירת הצעת מחיר חדשה
```typescript
// Request
{
  "movingFrom": "New York, USA",
  "movingTo": "London, UK",
  "movingDate": "2024-06-15",
  "serviceType": "household",
  "items": [
    {
      "name": "Sofa",
      "weight": 50,
      "dimensions": "200x90x80"
    }
  ],
  "contact": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}

// Response
{
  "quoteId": "Q12345",
  "estimatedPrice": 2500,
  "currency": "USD",
  "estimatedDuration": "14-21 days",
  "services": ["packing", "shipping", "customs"],
  "status": "pending"
}
```

#### GET `/api/quotes/:id`
קבלת פרטי הצעת מחיר
```typescript
// Response
{
  "quote": {
    "id": "Q12345",
    "status": "approved",
    "price": 2500,
    "timeline": "14-21 days",
    "services": ["packing", "shipping", "customs", "insurance"]
  }
}
```

### 📦 Tracking

#### GET `/api/tracking/:trackingNumber`
מעקב אחר משלוח
```typescript
// Response
{
  "trackingNumber": "VIP123456789",
  "status": "in_transit",
  "currentLocation": "Port of Hamburg, Germany",
  "estimatedDelivery": "2024-06-20",
  "timeline": [
    {
      "date": "2024-06-01",
      "location": "New York Port",
      "status": "shipped",
      "description": "Departed from origin port"
    },
    {
      "date": "2024-06-15",
      "location": "Hamburg Port",
      "status": "in_transit",
      "description": "Arrived at destination port"
    }
  ]
}
```

### 🤖 AI Services

#### POST `/api/ai/chat`
ChatBot AI conversation
```typescript
// Request
{
  "message": "כמה עולה הובלה לאירופה?",
  "sessionId": "session_123",
  "language": "he"
}

// Response
{
  "response": "עלות הובלה לאירופה תלויה במיקום המדויק ובכמות הפריטים. בממוצע, הובלת דירה רגילה עולה בין $1,500-$4,000. האם תרצה הצעת מחיר מדויקת?",
  "confidence": 0.95,
  "suggestedActions": [
    {
      "type": "get_quote",
      "label": "קבל הצעת מחיר",
      "url": "/quote"
    }
  ]
}
```

#### GET `/api/ai/recommendations`
המלצות חכמות
```typescript
// Response
{
  "recommendations": [
    {
      "id": "rec_1",
      "type": "service",
      "title": "ביטוח מקיף",
      "description": "מומלץ למשלוחים יקרי ערך",
      "priority": "high",
      "price": "$200-500"
    }
  ],
  "insights": [
    "המשתמש מעוניין בהובלה לאירופה",
    "שקול להציע ביטוח נוסף"
  ]
}
```

### 📊 Analytics

#### POST `/api/analytics`
שליחת אירוע analytics
```typescript
// Request
{
  "event": "quote_request",
  "category": "conversion", 
  "action": "form_submit",
  "label": "europe_household",
  "value": 2500,
  "custom_parameters": {
    "service_type": "household",
    "destination": "europe"
  }
}
```

#### GET `/api/analytics/dashboard`
נתוני dashboard
```typescript
// Response
{
  "metrics": {
    "totalQuotes": 1250,
    "activeShipments": 45,
    "customerSatisfaction": 4.8,
    "popularDestinations": [
      {"country": "Germany", "count": 230},
      {"country": "France", "count": 180}
    ]
  },
  "aiInsights": [
    "עלייה של 15% בבקשות לאירופה החודש",
    "ChatBot משפר conversion rate ב-23%"
  ]
}
```

## 🔒 Security

### Rate Limiting
```
- 100 requests/minute per IP
- 1000 requests/hour per user
- 10 quote requests/day per IP
```

### Authentication
```typescript
// JWT Token structure
{
  "user_id": "12345",
  "email": "user@example.com",
  "role": "customer",
  "exp": 1640995200
}
```

## 🧪 Testing

### Test API Endpoints:

```bash
# Health check
curl https://your-api.onrender.com/api/health

# Get quote
curl -X POST https://your-api.onrender.com/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"movingFrom": "NYC", "movingTo": "London"}'

# AI Chat
curl -X POST https://your-api.onrender.com/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "שלום", "language": "he"}'
```

## 📈 Performance Metrics

### Target Benchmarks:
- **Response Time:** < 200ms
- **Availability:** 99.9%
- **Error Rate:** < 0.1%
- **Throughput:** 1000 req/min

### Monitoring:
```javascript
// Built-in performance tracking
analytics.trackPerformance();

// Custom metrics
trackApiResponse('/api/quotes', responseTime);
```

---

**API מוכן ומתועד במלואו! 🚀**
