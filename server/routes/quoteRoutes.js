const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');
const quoteService = require('../services/quoteService');

router.use(rateLimits.api);
router.use(basicSecurity);

function canAccessQuote(quote, user) {
  if (!quote) return false;
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'super_admin') return true;
  if (quote.customer?.userId && String(quote.customer.userId) === String(user.id)) return true;
  return false;
}

function toPublicQuote(quote) {
  return {
    quoteNumber: quote.quoteInfo?.quoteNumber,
    status: quote.quoteInfo?.status,
    serviceType: quote.shipmentRequest?.serviceType,
    origin: {
      city: quote.shipmentRequest?.origin?.city,
      state: quote.shipmentRequest?.origin?.state,
      country: quote.shipmentRequest?.origin?.country
    },
    destination: {
      city: quote.shipmentRequest?.destination?.city,
      state: quote.shipmentRequest?.destination?.state,
      country: quote.shipmentRequest?.destination?.country
    },
    pricing: {
      totalPrice: quote.pricing?.summary?.totalPrice,
      currency: quote.pricing?.summary?.currency
    },
    expirationDate: quote.validity?.expirationDate
  };
}

router.post('/', auth.optionalAuth, async (req, res, next) => {
  try {
    const payload = req.body || {};
    if (req.user?.id) {
      payload.customer = payload.customer || {};
      payload.customer.userId = req.user.id;
    }
    const created = await quoteService.create(payload);
    return res.status(201).json({
      success: true,
      quoteId: created._id,
      quoteNumber: created.quoteInfo.quoteNumber,
      pricing: created.pricing
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/quotes/:id — auth required for full quote; public gets redacted summary only with ?public=1
router.get('/:id', auth.optionalAuth, async (req, res, next) => {
  try {
    const quote = await quoteService.getById(req.params.id);
    if (!quote) return res.status(404).json({ success: false, error: 'Quote not found' });

    if (canAccessQuote(quote, req.user)) {
      return res.json({ success: true, quote });
    }

    // Prevent IDOR: unauthenticated / unauthorized users only get a redacted summary
    return res.json({ success: true, quote: toPublicQuote(quote), redacted: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/accept', auth.requireAuth, async (req, res, next) => {
  try {
    const existing = await quoteService.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, error: 'Quote not found' });
    if (!canAccessQuote(existing, req.user)) {
      return res.status(403).json({ success: false, error: 'Not allowed to accept this quote' });
    }

    const { quote, shipment, invoice } = await quoteService.accept(req.params.id, req.user.id);

    try {
      const emailService = require('../services/emailService');
      const to = quote?.customerInfo?.email || req.user?.email;
      if (to) {
        await emailService.sendQuoteConfirmation({
          to,
          name: quote?.customerInfo?.name || quote?.customerInfo?.firstName,
          quoteId: String(quote._id),
          estimateMin: quote?.pricing?.total ?? quote?.pricing?.estimatedTotal,
          estimateMax: quote?.pricing?.total ?? quote?.pricing?.estimatedTotal
        });
      }
    } catch (emailError) {
      console.warn('[quotes] quote confirmation email skipped:', emailError.message);
    }

    return res.json({
      success: true,
      quote: { id: quote._id, status: quote.quoteInfo.status },
      shipment: {
        id: shipment._id,
        trackingNumber: shipment.shipmentInfo.trackingNumber,
        status: shipment.shipmentInfo.status
      },
      invoice: {
        id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        totalAmount: invoice.amounts.totalAmount
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
