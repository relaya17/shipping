const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity, handleValidationErrors, commonValidations } = require('../middleware/security');
const auth = require('../middleware/auth');
const Shipment = require('../models/Shipment');

router.use(rateLimits.api);
router.use(basicSecurity);

// GET /api/shipments/:trackingNumber - שליפת משלוח לפי מספר מעקב
router.get('/:trackingNumber', commonValidations.trackingNumber, handleValidationErrors, auth.optionalAuth, async (req, res, next) => {
  try {
    const { trackingNumber } = req.params;
    const shipment = await Shipment.findByTrackingNumber(trackingNumber);
    if (!shipment) return res.status(404).json({ success: false, error: 'משלוח לא נמצא' });
    return res.json({ success: true, shipment });
  } catch (error) {
    next(error);
  }
});

// POST /api/shipments - יצירת משלוח בסיסי
router.post('/', auth.requireAuth, async (req, res, next) => {
  try {
    const payload = req.body || {};
    const created = await Shipment.create(payload);
    return res.status(201).json({ success: true, shipmentId: created._id, trackingNumber: created.shipmentInfo.trackingNumber });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


