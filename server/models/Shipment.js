const mongoose = require('mongoose');

/**
 * סכמת משלוח מתקדמת עם מעקב בזמן אמת ו-AI
 */
const shipmentSchema = new mongoose.Schema({
  // פרטי משלוח בסיסיים
  shipmentInfo: {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: [/^VIP[0-9]{10}$/, 'מספר מעקב חייב להיות בפורמט VIP + 10 ספרות']
    },
    status: {
      type: String,
      enum: [
        'quote_requested', 'quote_provided', 'booked', 'pickup_scheduled',
        'picked_up', 'in_transit', 'customs_clearance', 'out_for_delivery',
        'delivered', 'exception', 'cancelled', 'returned'
      ],
      default: 'quote_requested',
      required: true
    },
    priority: {
      type: String,
      enum: ['standard', 'express', 'premium', 'urgent'],
      default: 'standard'
    },
    serviceType: {
      type: String,
      enum: ['air_freight', 'sea_freight', 'land_transport', 'multimodal'],
      required: true
    }
  },

  // פרטי לקוח
  customer: {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    contactInfo: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
      alternativePhone: String,
      preferredContactMethod: {
        type: String,
        enum: ['email', 'phone', 'sms', 'whatsapp'],
        default: 'email'
      }
    }
  },

  // כתובות מוצא ויעד
  addresses: {
    origin: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: String,
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      contactPerson: {
        name: String,
        phone: String,
        availableHours: String
      }
    },
    destination: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: String,
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      contactPerson: {
        name: String,
        phone: String,
        availableHours: String
      }
    }
  },

  // פרטי משלוח
  shipmentDetails: {
    items: [{
      name: { type: String, required: true },
      description: String,
      category: {
        type: String,
        enum: ['furniture', 'electronics', 'clothing', 'documents', 'artwork', 'vehicle', 'other']
      },
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
      volume: {
        value: { type: Number, min: 0 },
        unit: { type: String, enum: ['m3', 'ft3'], default: 'm3' }
      },
      value: {
        amount: { type: Number, min: 0 },
        currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' }
      },
      isFragile: { type: Boolean, default: false },
      isHazardous: { type: Boolean, default: false },
      specialInstructions: String
    }],
    totalWeight: { type: Number, required: true, min: 0 },
    totalVolume: { type: Number, required: true, min: 0 },
    totalValue: { type: Number, min: 0 },
    packingType: {
      type: String,
      enum: ['self_packed', 'professional_packing', 'partial_packing'],
      default: 'self_packed'
    }
  },

  // תאריכים ולוח זמנים
  timeline: {
    requestedPickupDate: { type: Date, required: true },
    actualPickupDate: Date,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    transitDays: Number,
    milestones: [{
      event: String,
      location: String,
      timestamp: { type: Date, default: Date.now },
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      description: String,
      status: {
        type: String,
        enum: ['completed', 'in_progress', 'delayed', 'failed']
      }
    }]
  },

  // מעקב בזמן אמת
  tracking: {
    currentLocation: {
      address: String,
      city: String,
      country: String,
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
      },
      lastUpdated: { type: Date, default: Date.now }
    },
    route: [{
      location: {
        coordinates: {
          latitude: Number,
          longitude: Number
        },
        address: String
      },
      timestamp: { type: Date, default: Date.now },
      speed: Number, // km/h
      direction: Number, // degrees
      altitude: Number // meters
    }],
    carrier: {
      name: String,
      vehicleType: String,
      vehicleId: String,
      driverName: String,
      driverPhone: String
    },
    estimatedArrival: Date,
    distanceRemaining: Number // קילומטרים
  },

  // מחירים ותשלומים
  pricing: {
    basePrice: { type: Number, required: true, min: 0 },
    additionalServices: [{
      name: String,
      price: Number,
      description: String
    }],
    discounts: [{
      type: String,
      amount: Number,
      percentage: Number,
      reason: String
    }],
    totalPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' },
    vatAmount: Number,
    vatRate: { type: Number, default: 17 }, // % מע"מ
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'refunded', 'disputed'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'bank_transfer', 'paypal', 'crypto', 'cash']
    },
    invoiceNumber: String,
    paidAmount: { type: Number, default: 0 }
  },

  // ביטוח
  insurance: {
    isInsured: { type: Boolean, default: false },
    coverage: {
      amount: Number,
      currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' }
    },
    premium: Number,
    provider: String,
    policyNumber: String,
    terms: String
  },

  // מסמכים
  documents: [{
    type: {
      type: String,
      enum: ['invoice', 'packing_list', 'certificate', 'permit', 'customs_declaration', 'insurance_policy', 'photo'],
      required: true
    },
    fileName: String,
    fileUrl: String,
    uploadDate: { type: Date, default: Date.now },
    size: Number, // bytes
    verified: { type: Boolean, default: false }
  }],

  // AI ותובנות
  aiInsights: {
    riskScore: { type: Number, min: 0, max: 100 }, // סיכון לעיכובים/בעיות
    priceConfidence: { type: Number, min: 0, max: 100 }, // ביטחון בחיזוי מחיר
    deliveryPrediction: {
      estimatedDays: Number,
      confidence: { type: Number, min: 0, max: 100 }
    },
    recommendations: [String],
    similarShipments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' }]
  },

  // הערות ותקשורת
  communication: {
    notes: [{
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      type: { type: String, enum: ['info', 'warning', 'error', 'success'], default: 'info' },
      isCustomerVisible: { type: Boolean, default: true }
    }],
    lastCustomerContact: Date,
    customerSatisfaction: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      timestamp: Date
    }
  },

  // מטא-דאטה
  metadata: {
    source: { type: String, enum: ['website', 'mobile_app', 'api', 'admin'], default: 'website' },
    referrer: String,
    campaign: String,
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internalNotes: String,
    tags: [String],
    isArchived: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  collection: 'shipments'
});

// אינדקסים מתקדמים
// הערה: trackingNumber כבר מוגדר כ-unique בסכמה, לכן לא צריך אינדקס נוסף
shipmentSchema.index({ 'customer.userId': 1, 'timeline.requestedPickupDate': -1 });
shipmentSchema.index({ 'addresses.origin.coordinates': '2dsphere' });
shipmentSchema.index({ 'addresses.destination.coordinates': '2dsphere' });
shipmentSchema.index({ 'shipmentInfo.status': 1, updatedAt: -1 });
shipmentSchema.index({ 'pricing.totalPrice': 1, 'shipmentInfo.serviceType': 1 });

// Virtual fields
shipmentSchema.virtual('totalDistance').get(function() {
  if (this.addresses.origin.coordinates && this.addresses.destination.coordinates) {
    // חישוב מרחק בין נקודות (Haversine formula)
    const lat1 = this.addresses.origin.coordinates.latitude;
    const lon1 = this.addresses.origin.coordinates.longitude;
    const lat2 = this.addresses.destination.coordinates.latitude;
    const lon2 = this.addresses.destination.coordinates.longitude;
    
    const R = 6371; // רדיוס כדור הארץ בק"מ
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  return 0;
});

shipmentSchema.virtual('isDelayed').get(function() {
  if (this.timeline.estimatedDeliveryDate) {
    return new Date() > this.timeline.estimatedDeliveryDate && 
           this.shipmentInfo.status !== 'delivered';
  }
  return false;
});

// מתודות instance
shipmentSchema.methods.updateLocation = function(latitude, longitude, address) {
  this.tracking.currentLocation = {
    coordinates: { latitude, longitude },
    address,
    lastUpdated: new Date()
  };
  
  this.tracking.route.push({
    location: { coordinates: { latitude, longitude }, address },
    timestamp: new Date()
  });
  
  return this.save();
};

shipmentSchema.methods.addMilestone = function(event, location, description, status = 'completed') {
  this.timeline.milestones.push({
    event,
    location,
    description,
    status,
    timestamp: new Date()
  });
  
  return this.save();
};

shipmentSchema.methods.calculateAIInsights = function() {
  // חישוב AI insights (פשטות לדוגמה)
  let riskScore = 0;
  
  // גורמי סיכון
  if (this.shipmentDetails.totalValue > 10000) riskScore += 20;
  if (this.shipmentDetails.items.some(item => item.isFragile)) riskScore += 15;
  if (this.shipmentDetails.items.some(item => item.isHazardous)) riskScore += 30;
  if (this.addresses.destination.country !== this.addresses.origin.country) riskScore += 10;
  
  // בדיקת עיכובים קודמים
  const timeSincePickup = this.timeline.actualPickupDate ? 
    (Date.now() - this.timeline.actualPickupDate.getTime()) / (1000 * 60 * 60 * 24) : 0;
  if (timeSincePickup > 7) riskScore += 25;
  
  this.aiInsights.riskScore = Math.min(100, riskScore);
  
  // המלצות
  const recommendations = [];
  if (this.aiInsights.riskScore > 50) {
    recommendations.push('מומלץ ביטוח מקיף למשלוח זה');
  }
  if (this.shipmentDetails.items.some(item => item.isFragile)) {
    recommendations.push('השתמש באריזה מקצועית לפריטים שבירים');
  }
  if (this.isDelayed) {
    recommendations.push('עדכן את הלקוח על העיכוב ותן פיצוי');
  }
  
  this.aiInsights.recommendations = recommendations;
  return this.save();
};

// מתודות static
shipmentSchema.statics.findByTrackingNumber = function(trackingNumber) {
  return this.findOne({ 'shipmentInfo.trackingNumber': trackingNumber.toUpperCase() })
    .populate('customer.userId', 'personalInfo.firstName personalInfo.lastName')
    .populate('metadata.assignedAgent', 'personalInfo.firstName personalInfo.lastName');
};

shipmentSchema.statics.getActiveShipments = function() {
  return this.find({
    'shipmentInfo.status': { 
      $in: ['booked', 'pickup_scheduled', 'picked_up', 'in_transit', 'customs_clearance', 'out_for_delivery'] 
    }
  }).populate('customer.userId');
};

shipmentSchema.statics.getDelayedShipments = function() {
  return this.find({
    'timeline.estimatedDeliveryDate': { $lt: new Date() },
    'shipmentInfo.status': { $ne: 'delivered' }
  });
};

shipmentSchema.statics.generateTrackingNumber = async function() {
  let trackingNumber;
  let exists = true;
  
  while (exists) {
    // יצירת מספר מעקב VIP + 10 ספרות
    const randomNum = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    trackingNumber = `VIP${randomNum}`;
    
    exists = await this.findOne({ 'shipmentInfo.trackingNumber': trackingNumber });
  }
  
  return trackingNumber;
};

// Middleware
shipmentSchema.pre('save', async function(next) {
  // יצירת מספר מעקב אוטומטי
  if (this.isNew && !this.shipmentInfo.trackingNumber) {
    this.shipmentInfo.trackingNumber = await this.constructor.generateTrackingNumber();
  }
  
  // חישוב נפח כולל
  this.shipmentDetails.totalVolume = this.shipmentDetails.items.reduce((total, item) => {
    const itemVolume = (item.dimensions.length * item.dimensions.width * item.dimensions.height) / 1000000;
    return total + itemVolume;
  }, 0);
  
  // חישוב משקל כולל
  this.shipmentDetails.totalWeight = this.shipmentDetails.items.reduce((total, item) => {
    return total + item.weight.value;
  }, 0);
  
  // חישוב ערך כולל
  this.shipmentDetails.totalValue = this.shipmentDetails.items.reduce((total, item) => {
    return total + (item.value?.amount || 0);
  }, 0);
  
  next();
});

// Middleware לעדכון timestamps במעקב
shipmentSchema.pre('save', function(next) {
  if (this.isModified('tracking.currentLocation')) {
    this.tracking.currentLocation.lastUpdated = new Date();
  }
  next();
});

module.exports = mongoose.model('Shipment', shipmentSchema);
