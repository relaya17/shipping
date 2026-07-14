const { z } = require('zod');
const quoteService = require('../../services/quoteService');
const usKnowledge = require('../knowledge/usShippingLaw');

/**
 * כלי AI לשליפת הצעת מחיר קיימת.
 */
const getQuoteTool = {
  description: 'Fetch details of an existing quote by ID (quoteId)',
  parameters: z.object({
    quoteId: z.string().describe('Quote ID (Mongo ObjectId)')
  }),
  execute: async ({ quoteId }) => {
    const quote = await quoteService.getById(quoteId);
    if (!quote) return { found: false };
    return {
      found: true,
      quoteId: quote._id.toString(),
      quoteNumber: quote.quoteInfo.quoteNumber,
      status: quote.quoteInfo.status,
      totalPrice: quote.pricing.summary.totalPrice,
      currency: quote.pricing.summary.currency,
      expirationDate: quote.validity.expirationDate,
      origin: quote.shipmentRequest.origin,
      destination: quote.shipmentRequest.destination
    };
  }
};

/**
 * יצירת הצעת מחיר חדשה במערכת (כולל state ארה״ב).
 */
const createQuoteTool = {
  description:
    'Create a real quote in the system with price calculation. Required when origin, destination, service type, customer details, and items are available. ' +
    'For US shipments also pass originState/destinationState (2-letter code).',
  parameters: z.object({
    originCountry: z.string(),
    originCity: z.string(),
    originState: z.string().optional(),
    destinationCountry: z.string(),
    destinationCity: z.string(),
    destinationState: z.string().optional(),
    serviceType: z.enum(['air_freight', 'sea_freight', 'land_transport', 'multimodal']),
    customerName: z.string(),
    customerEmail: z.string().email(),
    customerPhone: z.string(),
    items: z.array(z.object({
      category: z.enum(['furniture', 'electronics', 'clothing', 'documents', 'artwork', 'vehicle', 'machinery', 'other']),
      description: z.string(),
      quantity: z.number().min(1),
      weightKg: z.number().min(0),
      lengthCm: z.number().min(0),
      widthCm: z.number().min(0),
      heightCm: z.number().min(0)
    })).min(1)
  }),
  execute: async (args) => {
    const payload = {
      customer: {
        contactInfo: { name: args.customerName, email: args.customerEmail, phone: args.customerPhone }
      },
      shipmentRequest: {
        origin: {
          country: args.originCountry,
          city: args.originCity,
          state: args.originState
        },
        destination: {
          country: args.destinationCountry,
          city: args.destinationCity,
          state: args.destinationState
        },
        serviceType: args.serviceType
      },
      items: args.items.map((item) => ({
        category: item.category,
        description: item.description,
        quantity: item.quantity,
        weight: { value: item.weightKg, unit: 'kg' },
        dimensions: { length: item.lengthCm, width: item.widthCm, height: item.heightCm, unit: 'cm' }
      }))
    };

    const quote = await quoteService.create(payload);
    return {
      quoteId: quote._id.toString(),
      quoteNumber: quote.quoteInfo.quoteNumber,
      totalPrice: quote.pricing.summary.totalPrice,
      currency: quote.pricing.summary.currency,
      expirationDate: quote.validity.expirationDate
    };
  }
};

/**
 * כתיבת מכתב הצעת מחיר מקצועי ללקוח (טקסט מוכן לשליחה).
 */
const writeQuoteProposalTool = {
  description:
    'Writes a formal professional quote proposal for the customer (Hebrew or English) based on an existing quote in the system. ' +
    'Includes route details, price, validity, and US regulatory notes when relevant. Use after createQuote or when a quoteId is available.',
  parameters: z.object({
    quoteId: z.string(),
    language: z.enum(['he', 'en']).default('he'),
    tone: z.enum(['formal', 'friendly']).default('formal'),
    includeUsComplianceNotes: z.boolean().default(true)
  }),
  execute: async ({ quoteId, language, tone, includeUsComplianceNotes }) => {
    const quote = await quoteService.getById(quoteId);
    if (!quote) return { found: false };

    const origin = quote.shipmentRequest.origin || {};
    const dest = quote.shipmentRequest.destination || {};
    const price = quote.pricing.summary.totalPrice;
    const currency = quote.pricing.summary.currency;
    const qn = quote.quoteInfo.quoteNumber;
    const exp = quote.validity.expirationDate
      ? new Date(quote.validity.expirationDate).toISOString().slice(0, 10)
      : 'N/A';

    const destState = usKnowledge.normalizeStateCode(dest.state);
    let compliance = [];
    if (includeUsComplianceNotes && (String(dest.country || '').toUpperCase().includes('US') || destState)) {
      const law = usKnowledge.lookup('interstate_vs_intrastate', destState || origin.state);
      compliance = law.federalGuidance.slice(0, 3);
      if (law.state) compliance.push(`Destination operational notes (${law.state.code}): ${law.state.operationalNotes}`);
    }

    const he = [
      `שלום ${quote.customer.contactInfo.name},`,
      '',
      tone === 'friendly' ? 'שמחים לתת לך הצעה מסודרת למשלוח שלך:' : 'להלן הצעת המחיר הרשמית למשלוח:',
      '',
      `מספר הצעה: ${qn}`,
      `מסלול: ${origin.city}${origin.state ? `, ${origin.state}` : ''}, ${origin.country} → ${dest.city}${dest.state ? `, ${dest.state}` : ''}, ${dest.country}`,
      `סוג שירות: ${quote.shipmentRequest.serviceType}`,
      `מחיר כולל משוער: ${price} ${currency}`,
      `תוקף ההצעה: עד ${exp}`,
      '',
      'פריטים:'
    ];
    (quote.items || []).forEach((item, i) => {
      he.push(`${i + 1}. ${item.description || item.category} × ${item.quantity}`);
    });
    if (compliance.length) {
      he.push('', 'הערות רגולציה (ארה״ב) — כלליות ואינן ייעוץ משפטי:');
      compliance.forEach((c) => he.push(`• ${c}`));
    }
    he.push(
      '',
      'לאישור ההצעה והמשך לתשלום/משלוח — השיבו להודעה זו או היכנסו לפורטל VIP.',
      '',
      'בברכה,',
      'VIP International Shipping'
    );

    const en = [
      `Dear ${quote.customer.contactInfo.name},`,
      '',
      tone === 'friendly' ? 'Happy to share a clear quote for your move:' : 'Please find our formal shipping quotation below:',
      '',
      `Quote #: ${qn}`,
      `Route: ${origin.city}${origin.state ? `, ${origin.state}` : ''}, ${origin.country} → ${dest.city}${dest.state ? `, ${dest.state}` : ''}, ${dest.country}`,
      `Service: ${quote.shipmentRequest.serviceType}`,
      `Estimated total: ${price} ${currency}`,
      `Valid until: ${exp}`,
      '',
      'Items:'
    ];
    (quote.items || []).forEach((item, i) => {
      en.push(`${i + 1}. ${item.description || item.category} × ${item.quantity}`);
    });
    if (compliance.length) {
      en.push('', 'US compliance notes (general; not legal advice):');
      compliance.forEach((c) => en.push(`• ${c}`));
    }
    en.push(
      '',
      'To accept this quote and proceed to booking/payment, reply to this message or use the VIP portal.',
      '',
      'Sincerely,',
      'VIP International Shipping'
    );

    return {
      found: true,
      quoteId,
      quoteNumber: qn,
      language,
      proposalText: language === 'en' ? en.join('\n') : he.join('\n')
    };
  }
};

module.exports = { getQuoteTool, createQuoteTool, writeQuoteProposalTool };
