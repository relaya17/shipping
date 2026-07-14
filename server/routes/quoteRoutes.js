const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity, handleValidationErrors } = require('../middleware/security');
const auth = require('../middleware/auth');
const Quote = require('../models/Quote');

router.use(rateLimits.api);
router.use(basicSecurity);

// POST /api/quotes - יצירת הצעת מחיר
router.post('/', async (req, res, next) => {
  try {
    const created = await Quote.create(req.body || {});
    await created.calculatePricing();
    return res.status(201).json({ success: true, quoteId: created._id, quoteNumber: created.quoteInfo.quoteNumber, pricing: created.pricing });
  } catch (error) {
    next(error);
  }
});

// GET /api/quotes/:id - שליפת הצעת מחיר
router.get('/:id', async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ success: false, error: 'הצעה לא נמצאה' });
    return res.json({ success: true, quote });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


