const mongoose = require('mongoose');

/**
 * סכמת הצעת מחיר מתקדמת עם AI ואלגוריתמים חכמים
 */
const quoteSchema = new mongoose.Schema({
  // פרטי הצעת מחיר
  quoteInfo: {
    quoteNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: [/^QUO[0-9]{8}$/, 'מספר הצעה חייב להיות בפורמט QUO + 8 ספרות']
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'negotiating'],
      default: 'draft'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    type: {
      type: String,
      enum: ['standard', 'express', 'premium', 'custom'],
      default: 'standard'
    }
  },

  // פרטי לקוח
  customer: {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    contactInfo: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
      company: String,
      preferredLanguage: { type: String, enum: ['he', 'en', 'ar'], default: 'he' }
    },
    // פרטי חברה (אם רלוונטי)
    businessInfo: {
      companyName: String,
      vatNumber: String,
      businessType: String,
      shippingVolume: { type: String, enum: ['low', 'medium', 'high', 'enterprise'] }
    }
  },

  // פרטי משלוח מבוקש
  shipmentRequest: {
    origin: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: String,
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    destination: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: String,
      address: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    serviceType: {
      type: String,
      enum: ['air_freight', 'sea_freight', 'land_transport', 'multimodal'],
      required: true
    },
    preferredPickupDate: Date,
    preferredDeliveryDate: Date,
    isFlexible: { type: Boolean, default: true }
  },

  // פריטים מפורטים
  items: [{
    category: {
      type: String,
      enum: ['furniture', 'electronics', 'clothing', 'documents', 'artwork', 'vehicle', 'machinery', 'other'],
      required: true
    },
    subcategory: String,
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    dimensions: {
      length: { type: Number, required: true, min: 0 },
      width: { type: Number, required: true, min: 0 },
      height: { type: Number, required: true, min: 0 },
      unit: { type: String, enum: ['cm', 'inch'], default: 'cm' }
    },
    weight: {
      value: { type: Number, required: true, min: 0 },
      unit: { type: String, enum: ['kg', 'lb'], default: 'kg' }
    },
    value: {
      amount: { type: Number, min: 0 },
      currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' }
    },
    specialRequirements: {
      isFragile: { type: Boolean, default: false },
      isHazardous: { type: Boolean, default: false },
      temperatureControlled: { type: Boolean, default: false },
      requiresInsurance: { type: Boolean, default: false },
      customsDeclaration: { type: Boolean, default: false }
    },
    packingInstructions: String,
    photos: [String] // URLs לתמונות
  }],

  // חישובי מחיר מפורטים
  pricing: {
    // מחירי בסיס
    basePricing: {
      weightCharge: { type: Number, default: 0 },
      volumeCharge: { type: Number, default: 0 },
      distanceCharge: { type: Number, default: 0 },
      handlingFee: { type: Number, default: 0 }
    },
    
    // שירותים נוספים
    additionalServices: [{
      name: { type: String, required: true },
      description: String,
      price: { type: Number, required: true },
      currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' },
      isOptional: { type: Boolean, default: true },
      category: { type: String, enum: ['packing', 'insurance', 'express', 'handling', 'customs'] }
    }],
    
    // הנחות
    discounts: [{
      type: { type: String, enum: ['percentage', 'fixed_amount', 'bulk', 'loyalty', 'seasonal'] },
      value: { type: Number, required: true },
      description: String,
      conditions: String,
      validUntil: Date
    }],
    
    // מחירים סופיים
    summary: {
      subtotal: { type: Number, required: true, min: 0 },
      discountAmount: { type: Number, default: 0 },
      taxAmount: { type: Number, default: 0 },
      totalPrice: { type: Number, required: true, min: 0 },
      currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' }
    }
  },

  // תוקף ותנאים
  validity: {
    expirationDate: {
      type: Date,
      required: true,
      default: function() {
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 יום מהיום
      }
    },
    isValid: { type: Boolean, default: true },
    termsAndConditions: String,
    cancellationPolicy: String,
    paymentTerms: {
      method: [{ type: String, enum: ['credit_card', 'bank_transfer', 'paypal', 'cash'] }],
      dueDate: String,
      earlyPaymentDiscount: Number
    }
  },

  // AI ואלגוריתמים
  aiCalculations: {
    algorithmVersion: { type: String, default: 'v2.1' },
    confidenceScore: { type: Number, min: 0, max: 100 },
    factorsConsidered: [{
      factor: String,
      weight: Number,
      impact: String
    }],
    marketAnalysis: {
      averageMarketPrice: Number,
      competitorPrices: [{
        competitor: String,
        price: Number,
        source: String
      }],
      pricePosition: { type: String, enum: ['below_market', 'at_market', 'above_market'] }
    },
    optimization: {
      suggestedRoute: String,
      fuelEfficiency: Number,
      carbonFootprint: Number, // טונות CO2
      alternativeOptions: [{
        serviceType: String,
        price: Number,
        duration: Number,
        pros: [String],
        cons: [String]
      }]
    }
  },

  // הסטוריה ותקשורת
  communication: {
    presentationsSent: [{
      method: { type: String, enum: ['email', 'pdf', 'link', 'phone'] },
      timestamp: { type: Date, default: Date.now },
      opened: { type: Boolean, default: false },
      downloadedAt: Date
    }],
    customerQuestions: [{
      question: String,
      answer: String,
      answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      timestamp: { type: Date, default: Date.now }
    }],
    negotiationHistory: [{
      type: { type: String, enum: ['price_request', 'service_modification', 'terms_change'] },
      originalValue: mongoose.Schema.Types.Mixed,
      requestedValue: mongoose.Schema.Types.Mixed,
      finalValue: mongoose.Schema.Types.Mixed,
      status: { type: String, enum: ['pending', 'approved', 'rejected'] },
      timestamp: { type: Date, default: Date.now }
    }]
  },

  // מטא-דאטה
  metadata: {
    source: { type: String, enum: ['website', 'mobile_app', 'phone', 'email', 'referral'], default: 'website' },
    referrer: String,
    userAgent: String,
    ipAddress: String,
    sessionId: String,
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    department: { type: String, enum: ['sales', 'operations', 'customer_service'] },
    tags: [String],
    internalNotes: String,
    followUpDate: Date,
    convertedToShipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' }
  }
}, {
  timestamps: true,
  collection: 'quotes'
});

// אינדקסים לביצועים
// הערה: quoteNumber כבר מוגדר כ-unique בסכמה, לכן לא צריך אינדקס נוסף
quoteSchema.index({ 'customer.userId': 1, createdAt: -1 });
quoteSchema.index({ 'customer.contactInfo.email': 1 });
quoteSchema.index({ 'quoteInfo.status': 1, 'validity.expirationDate': 1 });
quoteSchema.index({ 'shipmentRequest.origin.country': 1, 'shipmentRequest.destination.country': 1 });
quoteSchema.index({ 'pricing.summary.totalPrice': 1 });

// Virtual fields
quoteSchema.virtual('isExpired').get(function() {
  return new Date() > this.validity.expirationDate;
});

quoteSchema.virtual('daysUntilExpiration').get(function() {
  const diffTime = this.validity.expirationDate.getTime() - Date.now();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

quoteSchema.virtual('totalWeight').get(function() {
  return this.items.reduce((total, item) => total + (item.weight.value * item.quantity), 0);
});

quoteSchema.virtual('totalVolume').get(function() {
  return this.items.reduce((total, item) => {
    const itemVolume = (item.dimensions.length * item.dimensions.width * item.dimensions.height) / 1000000;
    return total + (itemVolume * item.quantity);
  }, 0);
});

// מתודות instance
quoteSchema.methods.calculatePricing = async function() {
  // אלגוריתם חישוב מחיר מתקדם
  let subtotal = 0;
  
  // מחיר בסיס לפי משקל ונפח
  const totalWeight = this.totalWeight;
  const totalVolume = this.totalVolume;
  
  // תעריפי בסיס (לדוגמה)
  const baseRates = {
    air_freight: { perKg: 8, perM3: 150 },
    sea_freight: { perKg: 2, perM3: 50 },
    land_transport: { perKg: 4, perM3: 80 },
    multimodal: { perKg: 5, perM3: 100 }
  };
  
  const rates = baseRates[this.shipmentRequest.serviceType];
  const weightCharge = totalWeight * rates.perKg;
  const volumeCharge = totalVolume * rates.perM3;
  
  // בחירת המחיר הגבוה יותר (משקל או נפח)
  const baseCharge = Math.max(weightCharge, volumeCharge);
  
  // תוספות לפי מרחק
  const distance = this.calculateDistance();
  const distanceCharge = distance * 0.5; // $0.5 per km
  
  // תוספות מיוחדות
  let specialCharges = 0;
  this.items.forEach(item => {
    if (item.specialRequirements.isFragile) specialCharges += 50;
    if (item.specialRequirements.isHazardous) specialCharges += 200;
    if (item.specialRequirements.temperatureControlled) specialCharges += 100;
  });
  
  subtotal = baseCharge + distanceCharge + specialCharges;
  
  // החלת הנחות
  let discountAmount = 0;
  this.pricing.discounts.forEach(discount => {
    if (discount.type === 'percentage') {
      discountAmount += (subtotal * discount.value / 100);
    } else if (discount.type === 'fixed_amount') {
      discountAmount += discount.value;
    }
  });
  
  // חישוב מס
  const taxRate = 0.17; // 17% מע"מ
  const taxAmount = (subtotal - discountAmount) * taxRate;
  
  // עדכון מחירים
  this.pricing.basePricing = {
    weightCharge,
    volumeCharge,
    distanceCharge,
    handlingFee: specialCharges
  };
  
  this.pricing.summary = {
    subtotal,
    discountAmount,
    taxAmount,
    totalPrice: subtotal - discountAmount + taxAmount,
    currency: 'ILS'
  };
  
  return this.save();
};

quoteSchema.methods.calculateDistance = function() {
  if (!this.shipmentRequest.origin.coordinates || !this.shipmentRequest.destination.coordinates) {
    return 0;
  }
  
  const lat1 = this.shipmentRequest.origin.coordinates.latitude;
  const lon1 = this.shipmentRequest.origin.coordinates.longitude;
  const lat2 = this.shipmentRequest.destination.coordinates.latitude;
  const lon2 = this.shipmentRequest.destination.coordinates.longitude;
  
  const R = 6371; // רדיוס כדור הארץ בק"מ
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

quoteSchema.methods.generateAIRecommendations = function() {
  const recommendations = [];
  
  // המלצות בהתבסס על נתונים
  if (this.totalWeight > 1000) {
    recommendations.push('מומלץ לשקול הובלה ימית לחיסכון בעלויות');
  }
  
  if (this.items.some(item => item.specialRequirements.isFragile)) {
    recommendations.push('אריזה מקצועית מומלצת בחום לפריטים שבירים');
  }
  
  if (this.shipmentRequest.destination.country !== this.shipmentRequest.origin.country) {
    recommendations.push('וודא שיש לך את כל המסמכים הנדרשים למכס');
  }
  
  if (this.pricing.summary.totalPrice > 5000) {
    recommendations.push('שקול ביטוח מקיף למשלוח בעל ערך גבוה');
  }
  
  this.aiCalculations.recommendations = recommendations;
  return this.save();
};

quoteSchema.methods.sendToCustomer = async function(method = 'email') {
  this.communication.presentationsSent.push({
    method,
    timestamp: new Date()
  });
  
  this.quoteInfo.status = 'sent';
  await this.save();
  
  // כאן תהיה לוגיקה לשליחת אימייל/SMS
  console.log(`הצעת מחיר ${this.quoteInfo.quoteNumber} נשלחה ללקוח`);
  
  return true;
};

// מתודות static
quoteSchema.statics.generateQuoteNumber = async function() {
  let quoteNumber;
  let exists = true;
  
  while (exists) {
    const randomNum = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    quoteNumber = `QUO${randomNum}`;
    exists = await this.findOne({ 'quoteInfo.quoteNumber': quoteNumber });
  }
  
  return quoteNumber;
};

quoteSchema.statics.getExpiringSoon = function(days = 7) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  
  return this.find({
    'validity.expirationDate': { $lte: expirationDate },
    'quoteInfo.status': { $in: ['sent', 'viewed', 'negotiating'] }
  });
};

quoteSchema.statics.getConversionRate = async function(period = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  
  const totalQuotes = await this.countDocuments({
    createdAt: { $gte: startDate }
  });
  
  const acceptedQuotes = await this.countDocuments({
    createdAt: { $gte: startDate },
    'quoteInfo.status': 'accepted'
  });
  
  return totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;
};

// Middleware
quoteSchema.pre('save', async function(next) {
  // יצירת מספר הצעה אוטומטי
  if (this.isNew && !this.quoteInfo.quoteNumber) {
    this.quoteInfo.quoteNumber = await this.constructor.generateQuoteNumber();
  }
  
  // עדכון סטטוס לפי תוקף
  if (this.validity.expirationDate < new Date() && this.quoteInfo.status !== 'expired') {
    this.quoteInfo.status = 'expired';
    this.validity.isValid = false;
  }
  
  next();
});

quoteSchema.pre('save', function(next) {
  // חישוב אוטומטי של AI insights
  if (this.isModified('items') || this.isModified('shipmentRequest')) {
    this.generateAIRecommendations();
  }
  next();
});

module.exports = mongoose.model('Quote', quoteSchema);
