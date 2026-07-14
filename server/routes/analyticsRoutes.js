const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');

router.use(rateLimits.api);
// Skip heavy security stack for fire-and-forget analytics beacons
// (helmet/CORS already applied globally in app.js)

// POST /api/analytics — accept client events (best-effort, never 500 to the browser)
router.post('/', auth.optionalAuth, async (req, res) => {
  try {
    const event = req.body || {};
    if (process.env.NODE_ENV !== 'production') {
      console.log('POST /api/analytics', event?.action || event?.type || 'event');
    }
    return res.status(201).json({ success: true, received: true });
  } catch (error) {
    console.warn('analytics ingest failed:', error?.message || error);
    return res.status(201).json({ success: true, received: false });
  }
});

// GET /api/analytics/dashboard - דשבורד בסיסי
router.get('/dashboard', auth.requireAuth, auth.requireAdmin, async (req, res, next) => {
  try {
    // נתוני דוגמה
    return res.json({
      success: true,
      metrics: {
        totalQuotes: 0,
        activeShipments: 0,
        customerSatisfaction: 4.8
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


