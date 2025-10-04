const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('express-validator');

/**
 * Middleware אבטחה מתקדם לVIP International Shipping
 */

// Rate Limiting מתקדם - עדכון לגרסה 7 של express-rate-limit
const createRateLimit = (windowMs, limit, message, skipSuccessfulRequests = false) => {
  return rateLimit({
    windowMs,
    limit, // שם הפרמטר החדש בגרסה 7 (לא max)
    message: message, // הודעה פשוטה - לא אובייקט מורכב
    standardHeaders: 'draft-7', // RateLimit-* headers
    legacyHeaders: false, // X-RateLimit-* headers מושבתים
    skipSuccessfulRequests,
    // handler מותאם אישית במקום message object מורכב
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: message,
        retryAfter: Math.ceil(windowMs / 1000 / 60) + ' minutes'
      });
    },
    keyGenerator: (req) => {
      // שילוב IP עם User-Agent לזיהוי מדויק יותר
      return req.ip + ':' + (req.get('User-Agent') || 'unknown').slice(0, 50);
    },
  });
};

// Rate limits שונים לendpoints שונים
const rateLimits = {
  // כללי - 100 בקשות ל-15 דקות
  general: createRateLimit(15 * 60 * 1000, 100, 'יותר מדי בקשות, נסה שוב מאוחר יותר'),
  
  // Authentication - 5 בקשות ל-15 דקות
  auth: createRateLimit(15 * 60 * 1000, 5, 'יותר מדי ניסיונות התחברות, חכה 15 דקות'),
  
  // Password reset - 3 בקשות לשעה
  passwordReset: createRateLimit(60 * 60 * 1000, 3, 'יותר מדי בקשות לאיפוס סיסמה'),
  
  // Quote requests - 10 בקשות לשעה
  quotes: createRateLimit(60 * 60 * 1000, 10, 'יותר מדי בקשות הצעות מחיר'),
  
  // Contact form - 5 הודעות לשעה
  contact: createRateLimit(60 * 60 * 1000, 5, 'יותר מדי הודעות יצירת קשר'),
  
  // API calls - 200 בקשות ל-15 דקות
  api: createRateLimit(15 * 60 * 1000, 200, 'יותר מדי קריאות API')
};

// Input Validation מתקדמת
const sanitizeInput = (req, res, next) => {
  // ניקוי HTML tags מסוכנים
  const cleanInput = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // הסרת HTML tags מסוכנים
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=\s*["\'][^"\']*["\']/gi, '')
          .trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        cleanInput(obj[key]);
      }
    }
  };

  if (req.body) cleanInput(req.body);
  if (req.query) cleanInput(req.query);
  if (req.params) cleanInput(req.params);

  next();
};

// בדיקת User Agent חשוד
const checkSuspiciousActivity = (req, res, next) => {
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /postman/i
  ];

  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));
  
  if (isSuspicious && !req.path.startsWith('/api/health')) {
    console.warn(`Suspicious user agent: ${userAgent} from IP: ${req.ip}`);
    // ניתן להוסיף לוגיקה נוספת כמו captcha או חסימה
  }

  req.isSuspicious = isSuspicious;
  next();
};

// הגנה מפני SQL Injection ו-NoSQL Injection
const preventInjection = (req, res, next) => {
  const checkForInjection = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // בדיקת patterns מסוכנים
        const sqlPatterns = [
          /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
          /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
          /('|(\')|;|--|\/\*|\*\/)/,
        ];
        
        const nosqlPatterns = [
          /\$where/, /\$ne/, /\$gt/, /\$lt/, /\$regex/, /\$exists/
        ];

        const hasSQL = sqlPatterns.some(pattern => pattern.test(obj[key]));
        const hasNoSQL = nosqlPatterns.some(pattern => pattern.test(obj[key]));

        if (hasSQL || hasNoSQL) {
          return res.status(400).json({
            success: false,
            error: 'קלט לא תקין זוהה',
            code: 'INVALID_INPUT'
          });
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        checkForInjection(obj[key]);
      }
    }
  };

  if (req.body) checkForInjection(req.body);
  if (req.query) checkForInjection(req.query);
  
  next();
};

// Helmet מותאם לVIP Shipping
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
        "https://stackpath.bootstrapcdn.com"
      ],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://maps.googleapis.com"
      ],
      fontSrc: [
        "'self'", 
        "https://fonts.gstatic.com",
        "https://cdn.jsdelivr.net"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "https:", 
        "blob:",
        "https://maps.googleapis.com",
        "https://maps.gstatic.com"
      ],
      connectSrc: [
        "'self'", 
        "https://api.vipshipping.com",
        "https://www.google-analytics.com",
        "wss://socket.vipshipping.com"
      ],
      mediaSrc: ["'self'", "blob:"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false, // לתמיכה ב-AR ו-WebRTC
  hsts: {
    maxAge: 31536000, // שנה
    includeSubDomains: true,
    preload: true
  }
});

// Middleware לזיהוי מדינה וחסימת מדינות מסוכנות
const geoBlocker = (req, res, next) => {
  // ניתן להוסיף GeoIP library
  const blockedCountries = ['XX']; // הוסף קודי מדינות לחסימה
  const clientIP = req.ip;
  
  // לעת עתה נעביר הכל, בפרודקשן ניתן להוסיף GeoIP
  req.clientCountry = 'Unknown';
  next();
};

// בדיקת בריאות הבקשה
const requestHealthCheck = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // לוג בקשות איטיות
    if (duration > 5000) { // יותר מ-5 שניות
      console.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
    }
    
    // לוג שגיאות
    if (res.statusCode >= 400) {
      console.error(`Error response: ${res.statusCode} for ${req.method} ${req.path}`);
    }
  });
  
  req.startTime = start;
  next();
};

// Validation schemas
const commonValidations = {
  email: validator.body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('כתובת אימייל לא תקינה'),
    
  phone: validator.body('phone')
    .isMobilePhone('any')
    .withMessage('מספר טלפון לא תקין'),
    
  name: validator.body('name')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Zא-ת\s]+$/)
    .withMessage('שם חייב להכיל 2-50 תווים (אותיות ורווחים בלבד)'),
    
  trackingNumber: validator.param('trackingNumber')
    .matches(/^VIP\d{10}$/)
    .withMessage('מספר מעקב לא תקין - חייב להיות VIP + 10 ספרות')
};

// Export הfunctions
module.exports = {
  rateLimits,
  sanitizeInput,
  checkSuspiciousActivity,
  preventInjection,
  securityHeaders,
  geoBlocker,
  requestHealthCheck,
  commonValidations,
  
  // Middleware מקובץ לשימוש קל
  basicSecurity: [
    securityHeaders,
    sanitizeInput,
    checkSuspiciousActivity,
    preventInjection,
    requestHealthCheck,
    geoBlocker
  ],
  
  // בדיקת שגיאות validation
  handleValidationErrors: (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'נתונים לא תקינים',
        details: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
          value: err.value
        }))
      });
    }
    next();
  }
};
