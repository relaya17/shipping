const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');

router.use(rateLimits.api);
router.use(basicSecurity);

// POST /api/analytics - קבלת אירוע אנליטיקס
router.post('/', auth.optionalAuth, async (req, res, next) => {
  try {
    const event = req.body || {};
    // כאן ניתן לשלוח ל-winston/DB/3rd-party
    return res.status(201).json({ success: true, received: true });
  } catch (error) {
    next(error);
  }
});

// GET /api/analytics/dashboard - דשבורד בסיסי
router.get('/dashboard', auth.requireAdmin, async (req, res, next) => {
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


