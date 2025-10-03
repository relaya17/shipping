const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');

router.use(rateLimits.api);
router.use(basicSecurity);

// POST /api/ai/chat - מענה צ׳אט דמו
router.post('/chat', auth.optionalAuth, async (req, res, next) => {
  try {
    const { message = '', language = 'he' } = req.body || {};
    const response = message ? 'קיבלתי: ' + message : 'שלום! איך אפשר לעזור?';
    return res.json({ success: true, response, confidence: 0.9 });
  } catch (error) {
    next(error);
  }
});

// GET /api/ai/recommendations - המלצות דמו
router.get('/recommendations', auth.optionalAuth, async (req, res, next) => {
  try {
    return res.json({
      success: true,
      recommendations: [
        { id: 'rec_demo', type: 'service', title: 'ביטוח מקיף', description: 'מומלץ למשלוחים יקרי ערך' }
      ]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


