const Quote = require('../models/Quote');
const shipmentService = require('./shipmentService');
const billingService = require('./billingService');

/**
 * שכבת לוגיקה עסקית להצעות מחיר, כולל האורקסטרציה של Quote→Shipment→Billing.
 * גם REST routes וגם כלי ה-AI Agent קוראים לכאן.
 */

async function create(payload) {
  const quote = await Quote.create(payload || {});
  await quote.calculatePricing();
  return quote;
}

function getById(id) {
  return Quote.findById(id);
}

/**
 * הופך הצעת מחיר מאושרת למשלוח + חשבונית פנימית.
 * זו נקודת החיבור המרכזית של Phase 1 (B): Quote → Shipment → Billing.
 */
async function accept(quoteId, userId) {
  const quote = await Quote.findById(quoteId);
  if (!quote) {
    const err = new Error('Quote not found');
    err.status = 404;
    throw err;
  }

  if (quote.metadata.convertedToShipment) {
    const err = new Error('Quote already converted to a shipment');
    err.status = 409;
    throw err;
  }

  if (quote.isExpired) {
    const err = new Error('Quote expired — request a new quote');
    err.status = 410;
    throw err;
  }

  const shipment = await shipmentService.createFromQuote(quote, userId);
  const invoice = await billingService.createInvoiceForShipment(shipment);

  quote.quoteInfo.status = 'accepted';
  quote.metadata.convertedToShipment = shipment._id;
  await quote.save();

  return { quote, shipment, invoice };
}

module.exports = { create, getById, accept };
