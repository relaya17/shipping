const Invoice = require('../models/Invoice');
const taxService = require('./taxService');
const stripeService = require('./stripeService');
const pdfInvoiceService = require('./pdfInvoiceService');

/**
 * שכבת חיוב — Phase 2: מס ארה״ב / מע״מ, Stripe Checkout, PDF.
 */

function assertInvoiceAccess(invoice, user) {
  if (!invoice) return;
  if (!user) {
    const err = new Error('Authentication required');
    err.status = 401;
    throw err;
  }
  const isOwner = invoice.customer?.userId && String(invoice.customer.userId) === String(user.id);
  const isAdmin = user.role === 'admin' || user.role === 'super_admin';
  if (!isOwner && !isAdmin) {
    const err = new Error('Not allowed to access this invoice');
    err.status = 403;
    throw err;
  }
}

async function createInvoiceForShipment(shipment, options = {}) {
  const lineItems = [
    {
      description: `International shipping - ${shipment.shipmentInfo.serviceType} (${shipment.shipmentInfo.trackingNumber})`,
      quantity: 1,
      unitPrice: shipment.pricing.basePrice,
      total: shipment.pricing.basePrice
    }
  ];

  if (shipment.pricing.additionalServices?.length) {
    shipment.pricing.additionalServices.forEach((service) => {
      lineItems.push({
        description: service.name,
        quantity: 1,
        unitPrice: service.price,
        total: service.price
      });
    });
  }

  const subtotal = roundMoney(
    lineItems.reduce((sum, item) => sum + (Number(item.total) || 0), 0)
  );

  const dest = shipment.addresses?.destination || {};
  const taxInput = {
    subtotal,
    country: options.country || dest.country || 'US',
    state: options.state || dest.state,
    taxExempt: Boolean(options.taxExempt)
  };
  const tax = taxService.calculateTax(taxInput);

  const currency = shipment.pricing.currency === 'ILS' && taxInput.country === 'US'
    ? 'USD'
    : (shipment.pricing.currency || 'USD');

  const invoice = await Invoice.create({
    status: 'issued',
    shipment: shipment._id,
    quote: shipment.sourceQuoteId || shipment.metadata?.sourceQuoteId,
    customer: {
      userId: shipment.customer.userId,
      name: shipment.customer.contactInfo.name,
      email: shipment.customer.contactInfo.email
    },
    lineItems,
    amounts: {
      subtotal,
      taxAmount: tax.taxAmount,
      totalAmount: tax.totalWithTax,
      currency
    },
    tax: {
      country: tax.country,
      state: tax.state,
      rate: tax.rate,
      jurisdiction: tax.jurisdiction,
      engine: tax.engine,
      taxable: tax.taxable,
      notes: tax.notes,
      billingAddress: {
        line1: dest.address,
        city: dest.city,
        state: tax.state || dest.state,
        postalCode: dest.postalCode,
        country: tax.country
      }
    }
  });

  return invoice;
}

function getById(id) {
  return Invoice.findById(id);
}

function getForShipment(shipmentId) {
  return Invoice.findOne({ shipment: shipmentId });
}

function listForUser(userId) {
  return Invoice.find({ 'customer.userId': userId }).sort({ createdAt: -1 });
}

async function markPaid(id, amount, reference, extras) {
  const invoice = await Invoice.findById(id);
  if (!invoice) return null;
  await invoice.markPaid(amount, reference, extras);
  return invoice;
}

/**
 * עדכון כתובת חיוב + חישוב מס מחדש (לפני תשלום).
 */
async function applyTaxAddress(invoiceId, address, user) {
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    const err = new Error('Invoice not found');
    err.status = 404;
    throw err;
  }
  assertInvoiceAccess(invoice, user);

  if (invoice.status === 'paid') {
    const err = new Error('Cannot change tax on a paid invoice');
    err.status = 409;
    throw err;
  }

  const tax = taxService.calculateTax({
    subtotal: invoice.amounts.subtotal,
    country: address.country,
    state: address.state,
    taxExempt: Boolean(address.taxExempt)
  });

  invoice.tax = {
    country: tax.country,
    state: tax.state,
    rate: tax.rate,
    jurisdiction: tax.jurisdiction,
    engine: tax.engine,
    taxable: tax.taxable,
    notes: tax.notes,
    billingAddress: {
      line1: address.line1 || '',
      city: address.city || '',
      state: tax.state || address.state || '',
      postalCode: address.postalCode || '',
      country: tax.country
    }
  };
  invoice.amounts.taxAmount = tax.taxAmount;
  invoice.amounts.totalAmount = tax.totalWithTax;
  if (tax.country === 'US' && invoice.amounts.currency === 'ILS') {
    invoice.amounts.currency = 'USD';
  }

  await invoice.save();
  return { invoice, tax };
}

async function createCheckout(invoiceId, user) {
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    const err = new Error('Invoice not found');
    err.status = 404;
    throw err;
  }
  assertInvoiceAccess(invoice, user);

  if (invoice.status === 'paid') {
    const err = new Error('Invoice is already paid');
    err.status = 409;
    throw err;
  }

  if (!stripeService.isConfigured()) {
    const err = new Error('Stripe is not configured — set STRIPE_SECRET_KEY');
    err.status = 503;
    err.code = 'STRIPE_NOT_CONFIGURED';
    throw err;
  }

  const session = await stripeService.createInvoiceCheckoutSession(invoice, {
    useStripeTax: taxService.isStripeTaxEnabled()
  });

  invoice.payment.method = 'stripe';
  invoice.payment.stripe = {
    ...(invoice.payment.stripe?.toObject?.() || invoice.payment.stripe || {}),
    checkoutSessionId: session.id
  };
  await invoice.save();

  return { invoice, checkoutUrl: session.url, sessionId: session.id };
}

async function handleStripeCheckoutCompleted(session) {
  const invoiceId = session.metadata?.invoiceId || session.client_reference_id;
  if (!invoiceId) return null;

  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) return null;
  if (invoice.status === 'paid') return invoice;

  // אם Stripe Tax חישב מס — סנכרון סכומים מה-session
  if (typeof session.amount_total === 'number') {
    const total = session.amount_total / 100;
    const tax = (session.total_details?.amount_tax || 0) / 100;
    const subtotal = Math.max(0, total - tax);
    invoice.amounts.subtotal = subtotal || invoice.amounts.subtotal;
    invoice.amounts.taxAmount = tax;
    invoice.amounts.totalAmount = total;
    if (tax > 0) {
      invoice.tax.engine = 'stripe_tax';
      invoice.tax.taxable = true;
      invoice.tax.notes = 'Tax finalized by Stripe Tax at checkout';
    }
  }

  await invoice.markPaid(invoice.amounts.totalAmount, session.payment_intent || session.id, {
    method: 'stripe',
    stripe: {
      checkoutSessionId: session.id,
      paymentIntentId: typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id,
      customerId: typeof session.customer === 'string' ? session.customer : undefined
    }
  });

  return invoice;
}

async function getPdfBuffer(invoiceId, user) {
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    const err = new Error('Invoice not found');
    err.status = 404;
    throw err;
  }
  assertInvoiceAccess(invoice, user);
  const buffer = await pdfInvoiceService.generateInvoicePdf(invoice);
  return { invoice, buffer };
}

function roundMoney(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

module.exports = {
  createInvoiceForShipment,
  getById,
  getForShipment,
  listForUser,
  markPaid,
  applyTaxAddress,
  createCheckout,
  handleStripeCheckoutCompleted,
  getPdfBuffer,
  assertInvoiceAccess
};
