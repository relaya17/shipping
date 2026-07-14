const Stripe = require('stripe');
const colors = require('colors');
const { isStripeTaxEnabled } = require('./taxService');

let stripeClient = null;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    const err = new Error('STRIPE_SECRET_KEY is not set');
    err.status = 503;
    err.code = 'STRIPE_NOT_CONFIGURED';
    throw err;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

function isConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

function toStripeAmount(amount, currency) {
  // מטבעות ללא סנט (אין כאן) — ILS/USD/EUR כולן ב־cents/agorot
  return Math.round(Number(amount) * 100);
}

/**
 * יוצר Stripe Checkout Session לתשלום חשבונית.
 * כש-STRIPE_TAX_ENABLED=true — Stripe Tax מחשב מס ארה״ב אוטומטית לפי כתובת הלקוח.
 */
async function createInvoiceCheckoutSession(invoice, options = {}) {
  const stripe = getStripe();
  const currency = (invoice.amounts.currency || 'USD').toLowerCase();
  const frontend = process.env.FRONTEND_URL || 'http://localhost:3639';
  const useStripeTax = isStripeTaxEnabled() && options.useStripeTax !== false;

  // אם Stripe Tax פעיל — שולחים מחיר לפני מס; אחרת כוללים את המס שחושב פנימית
  const unitAmount = useStripeTax
    ? toStripeAmount(invoice.amounts.subtotal, currency)
    : toStripeAmount(invoice.amounts.totalAmount, currency);

  const lineItems = [{
    quantity: 1,
    price_data: {
      currency,
      unit_amount: unitAmount,
      product_data: {
        name: `Invoice ${invoice.invoiceNumber}`,
        description: invoice.lineItems?.map((li) => li.description).join('; ').slice(0, 400) || 'Shipping services'
      },
      tax_behavior: useStripeTax ? 'exclusive' : 'inclusive'
    }
  }];

  const sessionParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: invoice.customer.email,
    client_reference_id: String(invoice._id),
    metadata: {
      invoiceId: String(invoice._id),
      invoiceNumber: invoice.invoiceNumber,
      shipmentId: invoice.shipment ? String(invoice.shipment) : ''
    },
    success_url: `${frontend}/checkout?status=success&invoiceId=${invoice._id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${frontend}/checkout?status=cancel&invoiceId=${invoice._id}`,
    billing_address_collection: 'required'
  };

  if (useStripeTax) {
    sessionParams.automatic_tax = { enabled: true };
    sessionParams.tax_id_collection = { enabled: true };
  }

  if (options.customerAddress?.country) {
    sessionParams.customer_update = { address: 'auto' };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session;
}

function constructWebhookEvent(rawBody, signature) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    const err = new Error('STRIPE_WEBHOOK_SECRET is not set');
    err.status = 503;
    throw err;
  }
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}

async function retrieveCheckoutSession(sessionId) {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['total_details.breakdown.taxes', 'payment_intent']
  });
}

function warnIfMissing() {
  if (!isConfigured()) {
    console.warn(colors.yellow('⚠️ STRIPE_SECRET_KEY לא מוגדר — תשלומים לא יהיו זמינים'));
  }
}

module.exports = {
  getStripe,
  isConfigured,
  createInvoiceCheckoutSession,
  constructWebhookEvent,
  retrieveCheckoutSession,
  warnIfMissing,
  toStripeAmount
};
