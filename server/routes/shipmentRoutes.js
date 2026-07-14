const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity, handleValidationErrors, commonValidations } = require('../middleware/security');
const auth = require('../middleware/auth');
const shipmentService = require('../services/shipmentService');
const billingService = require('../services/billingService');
const gpsService = require('../services/gpsService');

router.use(rateLimits.api);
router.use(basicSecurity);

const OPS_ROLES = new Set(['admin', 'super_admin', 'driver', 'agent']);

function toPublicShipment(shipment) {
  return {
    trackingNumber: shipment.shipmentInfo?.trackingNumber,
    status: shipment.shipmentInfo?.status,
    serviceType: shipment.shipmentInfo?.serviceType,
    timeline: {
      estimatedDeliveryDate: shipment.timeline?.estimatedDeliveryDate,
      milestones: (shipment.timeline?.milestones || []).map((m) => ({
        event: m.event,
        location: m.location,
        description: m.description,
        status: m.status,
        timestamp: m.timestamp
      }))
    },
    tracking: {
      currentLocation: shipment.tracking?.currentLocation,
      route: shipment.tracking?.route,
      distanceRemaining: shipment.tracking?.distanceRemaining
    },
    addresses: {
      origin: {
        city: shipment.addresses?.origin?.city,
        state: shipment.addresses?.origin?.state,
        country: shipment.addresses?.origin?.country
      },
      destination: {
        city: shipment.addresses?.destination?.city,
        state: shipment.addresses?.destination?.state,
        country: shipment.addresses?.destination?.country
      }
    }
  };
}

// GET /api/shipments/:trackingNumber/track — public GPS view (no PII)
router.get('/:trackingNumber/track', commonValidations.trackingNumber, handleValidationErrors, auth.optionalAuth, async (req, res, next) => {
  try {
    const view = await gpsService.getTrackingView(req.params.trackingNumber);
    if (!view) return res.status(404).json({ success: false, error: 'Shipment not found' });
    return res.json({ success: true, tracking: view });
  } catch (error) {
    next(error);
  }
});

// POST /api/shipments/:trackingNumber/gps — ops roles only
router.post('/:trackingNumber/gps', commonValidations.trackingNumber, handleValidationErrors, auth.requireAuth, async (req, res, next) => {
  try {
    if (!OPS_ROLES.has(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions to update GPS' });
    }
    const view = await gpsService.updateGps(req.params.trackingNumber, req.body || {}, {
      note: req.body?.note || `GPS update by ${req.user.email || req.user.id}`
    });
    return res.json({ success: true, tracking: view });
  } catch (error) {
    next(error);
  }
});

// GET /api/shipments/:trackingNumber — public redacted view (no customer PII)
router.get('/:trackingNumber', commonValidations.trackingNumber, handleValidationErrors, auth.optionalAuth, async (req, res, next) => {
  try {
    const shipment = await shipmentService.getByTrackingNumber(req.params.trackingNumber);
    if (!shipment) return res.status(404).json({ success: false, error: 'Shipment not found' });

    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'super_admin');
    const isOwner = req.user && shipment.customer?.userId && String(shipment.customer.userId) === String(req.user.id);

    if (isAdmin || isOwner) {
      return res.json({ success: true, shipment });
    }

    return res.json({ success: true, shipment: toPublicShipment(shipment) });
  } catch (error) {
    next(error);
  }
});

router.get('/:trackingNumber/invoice', commonValidations.trackingNumber, handleValidationErrors, auth.requireAuth, async (req, res, next) => {
  try {
    const shipment = await shipmentService.getByTrackingNumber(req.params.trackingNumber);
    if (!shipment) return res.status(404).json({ success: false, error: 'Shipment not found' });
    const invoice = await billingService.getForShipment(shipment._id);
    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found for this shipment' });
    billingService.assertInvoiceAccess(invoice, req.user);
    return res.json({ success: true, invoice });
  } catch (error) {
    next(error);
  }
});

router.post('/', auth.requireAuth, async (req, res, next) => {
  try {
    const created = await shipmentService.create(req.body || {});
    return res.status(201).json({
      success: true,
      shipmentId: created._id,
      trackingNumber: created.shipmentInfo.trackingNumber
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
