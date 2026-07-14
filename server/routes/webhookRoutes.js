const express = require('express');
const router = express.Router();
const stripeService = require('../services/stripeService');
const billingService = require('../services/billingService');

/**
 * Stripe webhooks — Phase 2.
 * חשוב: חייב לקבל raw body (מוגדר ב-app.js דרך req.rawBody).
 */
router.post('/stripe', async (req, res) => {
  try {
    if (!stripeService.isConfigured()) {
      return res.status(503).json({ success: false, error: 'Stripe not configured' });
    }

    const signature = req.headers['stripe-signature'];
    if (!signature) {
      return res.status(400).json({ success: false, error: 'Missing stripe-signature' });
    }

    const rawBody = req.rawBody;
    if (!rawBody) {
      return res.status(400).json({ success: false, error: 'Missing raw body for webhook verification' });
    }

    const event = stripeService.constructWebhookEvent(rawBody, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.payment_status === 'paid' || session.status === 'complete') {
          await billingService.handleStripeCheckoutCompleted(session);
        }
        break;
      }
      case 'checkout.session.async_payment_succeeded': {
        await billingService.handleStripeCheckoutCompleted(event.data.object);
        break;
      }
      default:
        break;
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
