const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * סכמת משתמש מתקדמת עם תכונות אבטחה וניתוח התנהגות
 */
const userSchema = new mongoose.Schema({
  // פרטים אישיים
  personalInfo: {
    firstName: {
      type: String,
      required: [true, 'שם פרטי הוא שדה חובה'],
      trim: true,
      minlength: [2, 'שם פרטי חייב להכיל לפחות 2 תווים'],
      maxlength: [50, 'שם פרטי לא יכול להכיל יותר מ-50 תווים']
    },
    lastName: {
      type: String,
      required: [true, 'שם משפחה הוא שדה חובה'],
      trim: true,
      minlength: [2, 'שם משפחה חייב להכיל לפחות 2 תווים'],
      maxlength: [50, 'שם משפחה לא יכול להכיל יותר מ-50 תווים']
    },
    email: {
      type: String,
      required: [true, 'כתובת אימייל היא שדה חובה'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'כתובת אימייל לא תקינה']
    },
    phone: {
      type: String,
      required: [true, 'מספר טלפון הוא שדה חובה'],
      trim: true,
      match: [/^[0-9+\-\s()]+$/, 'מספר טלפון לא תקין']
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function(date) {
          return date < new Date() && date > new Date('1900-01-01');
        },
        message: 'תאריך לידה לא תקין'
      }
    }
  },

  // כתובת
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: 'Israel' },
    coordinates: {
      latitude: { type: Number, min: -90, max: 90 },
      longitude: { type: Number, min: -180, max: 180 }
    }
  },

  // פרטי התחברות ואבטחה
  authentication: {
    password: {
      type: String,
      required: [true, 'סיסמה היא שדה חובה'],
      minlength: [8, 'סיסמה חייבת להכיל לפחות 8 תווים'],
      select: false // לא יוחזר בשאילתות רגילות
    },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    lastPasswordChange: { type: Date, default: Date.now },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false }
  },

  // הרשאות ותפקידים
  permissions: {
    role: {
      type: String,
      enum: ['user', 'premium', 'admin', 'super_admin'],
      default: 'user'
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    isActive: { type: Boolean, default: true },
    subscriptionType: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    subscriptionExpiry: Date
  },

  // העדפות משתמש
  preferences: {
    language: { type: String, enum: ['he', 'en', 'ar'], default: 'he' },
    currency: { type: String, enum: ['ILS', 'USD', 'EUR'], default: 'ILS' },
    timezone: { type: String, default: 'Asia/Jerusalem' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false }
    },
    accessibility: {
      highContrast: { type: Boolean, default: false },
      reducedMotion: { type: Boolean, default: false },
      screenReader: { type: Boolean, default: false },
      fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' }
    }
  },

  // נתוני התנהגות ואנליטיקה
  analytics: {
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
    averageSessionDuration: { type: Number, default: 0 }, // בשניות
    favoriteServices: [{ type: String }],
    searchHistory: [{
      query: String,
      timestamp: { type: Date, default: Date.now },
      resultsFound: Number
    }],
    aiInteractions: [{
      type: { type: String, enum: ['chatbot', 'price_prediction', 'recommendations'] },
      query: String,
      response: String,
      satisfaction: { type: Number, min: 1, max: 5 },
      timestamp: { type: Date, default: Date.now }
    }],
    pageViews: [{
      page: String,
      duration: Number, // בשניות
      timestamp: { type: Date, default: Date.now }
    }]
  },

  // נתונים מקצועיים
  businessInfo: {
    companyName: String,
    vatNumber: String,
    businessType: {
      type: String,
      enum: ['individual', 'small_business', 'corporation', 'non_profit']
    },
    averageShipmentValue: Number,
    monthlyShipmentVolume: Number
  }
}, {
  timestamps: true, // createdAt, updatedAt אוטומטי
  collection: 'users',
  versionKey: '__v'
});

// אינדקסים לביצועים מהירים
userSchema.index({ 'personalInfo.email': 1 }, { unique: true });
userSchema.index({ 'authentication.lastPasswordChange': 1 });
userSchema.index({ 'analytics.lastLogin': -1 });
userSchema.index({ 'address.coordinates': '2dsphere' }); // לחיפוש גיאוגרפי

// Virtual fields - שדות מחושבים
userSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

userSchema.virtual('isLocked').get(function() {
  return !!(this.authentication.lockUntil && this.authentication.lockUntil > Date.now());
});

// מתודות instance
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.authentication.password);
};

userSchema.methods.incrementLoginAttempts = function() {
  if (this.authentication.lockUntil && this.authentication.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { 'authentication.lockUntil': 1, 'authentication.loginAttempts': 1 }
    });
  }
  
  const updates = { $inc: { 'authentication.loginAttempts': 1 } };
  const maxAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 שעות
  
  if (this.authentication.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates['$set'] = { 'authentication.lockUntil': Date.now() + lockTime };
  }
  
  return this.updateOne(updates);
};

userSchema.methods.updateAnalytics = function(data) {
  this.analytics.lastLogin = new Date();
  this.analytics.loginCount += 1;
  
  if (data.sessionDuration) {
    this.analytics.averageSessionDuration = 
      (this.analytics.averageSessionDuration * (this.analytics.loginCount - 1) + data.sessionDuration) / 
      this.analytics.loginCount;
  }
  
  return this.save();
};

// מתודות static
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ 'personalInfo.email': email.toLowerCase() });
};

userSchema.statics.getActiveUsers = function() {
  return this.find({ 
    'permissions.isActive': true,
    'analytics.lastLogin': { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // 30 יום אחרונים
  });
};

// Middleware - לפני שמירה
userSchema.pre('save', async function(next) {
  // הצפנת סיסמה אם שונתה
  if (this.isModified('authentication.password')) {
    this.authentication.password = await bcrypt.hash(this.authentication.password, 12);
    this.authentication.lastPasswordChange = new Date();
  }
  
  // ולידציה נוספת
  if (this.isNew) {
    this.analytics.loginCount = 0;
    this.authentication.loginAttempts = 0;
  }
  
  next();
});

// Middleware - לאחר חיפוש
userSchema.post(/^find/, function(result) {
  if (Array.isArray(result)) {
    result.forEach(doc => {
      if (doc && doc.authentication) {
        delete doc.authentication.password;
      }
    });
  } else if (result && result.authentication) {
    delete result.authentication.password;
  }
});

module.exports = mongoose.model('User', userSchema);
