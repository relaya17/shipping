const Shipment = require('../models/Shipment');

/**
 * שכבת לוגיקה עסקית למשלוחים.
 * גם ה-REST routes וגם כלי ה-AI Agent קוראים לכאן, כדי לא לשכפל לוגיקה.
 */

// מיפוי קטגוריית פריט מ-Quote (יש לה 'machinery') לקטגוריות הנתמכות ב-Shipment
const CATEGORY_MAP = {
  furniture: 'furniture',
  electronics: 'electronics',
  clothing: 'clothing',
  documents: 'documents',
  artwork: 'artwork',
  vehicle: 'vehicle',
  machinery: 'other',
  other: 'other'
};

// מיפוי עדיפות Quote (low/medium/high/urgent) לעדיפות Shipment (standard/express/premium/urgent)
const PRIORITY_MAP = {
  low: 'standard',
  medium: 'standard',
  high: 'express',
  urgent: 'urgent'
};

function mapAddress(quoteAddress) {
  return {
    address: quoteAddress.address || 'Not specified',
    city: quoteAddress.city,
    state: quoteAddress.state,
    postalCode: quoteAddress.postalCode || '00000',
    country: quoteAddress.country,
    coordinates: quoteAddress.coordinates && quoteAddress.coordinates.latitude != null
      ? { latitude: quoteAddress.coordinates.latitude, longitude: quoteAddress.coordinates.longitude }
      : undefined
  };
}

function mapItems(quoteItems) {
  return (quoteItems || []).map((item) => ({
    name: item.description || item.category,
    description: item.description,
    category: CATEGORY_MAP[item.category] || 'other',
    dimensions: item.dimensions,
    weight: item.weight,
    value: item.value,
    isFragile: !!item.specialRequirements?.isFragile,
    isHazardous: !!item.specialRequirements?.isHazardous,
    specialInstructions: item.packingInstructions
  }));
}

/**
 * בונה payload תקין ל-Shipment מתוך Quote מאושרת.
 * userId - מגיע מהמשתמש המחובר שמבצע את האישור (Quote יכולה להיות ללא userId אם נוצרה כאורח).
 */
function buildShipmentPayloadFromQuote(quote, userId) {
  return {
    shipmentInfo: {
      serviceType: quote.shipmentRequest.serviceType,
      priority: PRIORITY_MAP[quote.quoteInfo.priority] || 'standard',
      status: 'booked'
    },
    customer: {
      userId: quote.customer.userId || userId,
      contactInfo: {
        name: quote.customer.contactInfo.name,
        email: quote.customer.contactInfo.email,
        phone: quote.customer.contactInfo.phone
      }
    },
    addresses: {
      origin: mapAddress(quote.shipmentRequest.origin),
      destination: mapAddress(quote.shipmentRequest.destination)
    },
    shipmentDetails: {
      items: mapItems(quote.items),
      packingType: 'self_packed'
    },
    timeline: {
      requestedPickupDate: quote.shipmentRequest.preferredPickupDate
        || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    pricing: {
      basePrice: quote.pricing.summary.subtotal,
      totalPrice: quote.pricing.summary.totalPrice,
      currency: quote.pricing.summary.currency,
      vatAmount: quote.pricing.summary.taxAmount
    },
    metadata: {
      source: 'website',
      internalNotes: `נוצר אוטומטית מהצעת מחיר ${quote.quoteInfo.quoteNumber}`
    }
  };
}

async function createFromQuote(quote, userId) {
  const payload = buildShipmentPayloadFromQuote(quote, userId);
  const shipment = await Shipment.create(payload);
  const gpsService = require('./gpsService');
  await gpsService.seedOriginGps(shipment);
  return shipment;
}

function getByTrackingNumber(trackingNumber) {
  return Shipment.findByTrackingNumber(trackingNumber);
}

function getById(id) {
  return Shipment.findById(id);
}

function create(payload) {
  return Shipment.create(payload).then(async (shipment) => {
    const gpsService = require('./gpsService');
    await gpsService.seedOriginGps(shipment);
    return shipment;
  });
}

module.exports = {
  buildShipmentPayloadFromQuote,
  createFromQuote,
  getByTrackingNumber,
  getById,
  create
};
