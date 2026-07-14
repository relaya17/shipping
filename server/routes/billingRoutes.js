const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');
const billingService = require('../services/billingService');
const stripeService = require('../services/stripeService');
const taxService = require('../services/taxService');

router.use(rateLimits.api);
router.use(basicSecurity);

// GET /api/billing - כל החשבוניות של המשתמש המחובר
router.get('/', auth.requireAuth, async (req, res, next) => {
  try {
    const invoices = await billingService.listForUser(req.user.id);
    return res.json({ success: true, invoices });
  } catch (error) {
    next(error);
  }
});

// GET /api/billing/config - האם Stripe / Stripe Tax מוגדרים (ל-UI)
router.get('/config', auth.optionalAuth, async (req, res) => {
  return res.json({
    success: true,
    stripeConfigured: stripeService.isConfigured(),
    stripeTaxEnabled: taxService.isStripeTaxEnabled(),
    nexusStates: taxService.getNexusStates()
  });
});

// GET /api/billing/:id - חשבונית בודדת
router.get('/:id', auth.requireAuth, async (req, res, next) => {
  try {
    const invoice = await billingService.getById(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    billingService.assertInvoiceAccess(invoice, req.user);
    return res.json({ success: true, invoice });
  } catch (error) {
    next(error);
  }
});

// POST /api/billing/:id/tax - עדכון כתובת + חישוב מס ארה״ב/מע״מ
router.post('/:id/tax', auth.requireAuth, async (req, res, next) => {
  try {
    const { country, state, line1, city, postalCode, taxExempt } = req.body || {};
    if (!country) {
      return res.status(400).json({ success: false, error: 'Country is required' });
    }
    if (taxService.normalizeCountry(country) === 'US' && !state) {
      return res.status(400).json({ success: false, error: 'US payments require a state' });
    }

    const { invoice, tax } = await billingService.applyTaxAddress(
      req.params.id,
      { country, state, line1, city, postalCode, taxExempt },
      req.user
    );
    return res.json({ success: true, invoice, tax });
  } catch (error) {
    next(error);
  }
});

// POST /api/billing/:id/checkout - יצירת Stripe Checkout Session
router.post('/:id/checkout', auth.requireAuth, async (req, res, next) => {
  try {
    const result = await billingService.createCheckout(req.params.id, req.user);
    return res.json({
      success: true,
      checkoutUrl: result.checkoutUrl,
      sessionId: result.sessionId,
      invoice: result.invoice
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/billing/:id/pdf - הורדת PDF
router.get('/:id/pdf', auth.requireAuth, async (req, res, next) => {
  try {
    const { invoice, buffer } = await billingService.getPdfBuffer(req.params.id, req.user);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${invoice.invoiceNumber}.pdf"`);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
});

// POST /api/billing/:id/mark-paid - סימון תשלום ידני (admin / גיבוי)
router.post('/:id/mark-paid', auth.requireAuth, auth.requireAdmin, async (req, res, next) => {
  try {
    const { amount, reference } = req.body || {};
    const invoice = await billingService.markPaid(req.params.id, amount, reference, { method: 'other' });
    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    return res.json({ success: true, invoice });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
