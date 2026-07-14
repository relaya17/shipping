const mongoose = require('mongoose');

/**
 * מודל חשבונית — Phase 2: תמיכה ב-Stripe, מס ארה״ב לפי מדינה, ו-PDF.
 */
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: [/^INV[0-9]{8}$/, 'Invoice number must be INV + 8 digits']
  },

  status: {
    type: String,
    enum: ['draft', 'issued', 'paid', 'overdue', 'void'],
    default: 'draft'
  },

  shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  customer: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    company: String
  },

  lineItems: [{
    description: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 }
  }],

  amounts: {
    subtotal: { type: Number, required: true, min: 0 },
    taxAmount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'USD' }
  },

  tax: {
    country: String,
    state: String,
    rate: { type: Number, default: 0 },
    jurisdiction: String,
    engine: { type: String, enum: ['internal', 'stripe_tax', 'manual'], default: 'internal' },
    taxable: { type: Boolean, default: false },
    notes: String,
    billingAddress: {
      line1: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    }
  },

  payment: {
    method: {
      type: String,
      enum: ['pending', 'bank_transfer', 'credit_card', 'stripe', 'cash', 'other'],
      default: 'pending'
    },
    paidAmount: { type: Number, default: 0, min: 0 },
    paidAt: Date,
    reference: String,
    stripe: {
      checkoutSessionId: String,
      paymentIntentId: String,
      customerId: String,
      receiptUrl: String
    }
  },

  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },

  notes: String
}, {
  timestamps: true,
  collection: 'invoices'
});

invoiceSchema.index({ shipment: 1 });
invoiceSchema.index({ 'customer.userId': 1, createdAt: -1 });
invoiceSchema.index({ status: 1, dueDate: 1 });
invoiceSchema.index({ 'payment.stripe.checkoutSessionId': 1 });

invoiceSchema.virtual('isOverdue').get(function () {
  return this.status === 'issued' && new Date() > this.dueDate;
});

invoiceSchema.methods.markPaid = function (amount, reference, extras = {}) {
  this.status = 'paid';
  this.payment.paidAmount = amount ?? this.amounts.totalAmount;
  this.payment.paidAt = new Date();
  if (reference) this.payment.reference = reference;
  if (extras.method) this.payment.method = extras.method;
  if (extras.stripe) {
    this.payment.stripe = { ...(this.payment.stripe?.toObject?.() || this.payment.stripe || {}), ...extras.stripe };
  }
  return this.save();
};

invoiceSchema.statics.generateInvoiceNumber = async function () {
  let invoiceNumber;
  let exists = true;

  while (exists) {
    const randomNum = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    invoiceNumber = `INV${randomNum}`;
    exists = await this.findOne({ invoiceNumber });
  }

  return invoiceNumber;
};

invoiceSchema.pre('save', async function (next) {
  if (this.isNew && !this.invoiceNumber) {
    this.invoiceNumber = await this.constructor.generateInvoiceNumber();
  }
  if (this.isNew && !this.dueDate) {
    this.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
