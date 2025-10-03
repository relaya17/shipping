const mongoose = require('mongoose');
const colors = require('colors');

/**
 * הגדרת חיבור MongoDB מתקדמת עם אופטימיזציה וניטור
 */

class DatabaseManager {
  constructor() {
    this.connection = null;
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000; // 5 שניות
  }

  /**
   * חיבור למסד הנתונים עם retry logic
   */
  async connect() {
    try {
      // הגדרות חיבור מתקדמות
      const options = {
        // Connection pooling
        maxPoolSize: 10, // מספר חיבורים מקסימלי בבריכה
        minPoolSize: 2,  // מספר חיבורים מינימלי
        maxIdleTimeMS: 30000, // זמן מקסימלי לחיבור לא פעיל
        
        // Timeouts
        serverSelectionTimeoutMS: 5000, // זמן המתנה לבחירת שרת
        socketTimeoutMS: 45000, // זמן המתנה לתגובה
        connectTimeoutMS: 10000, // זמן המתנה לחיבור
        
        // Monitoring
        heartbeatFrequencyMS: 10000, // בדיקת חיות השרת
        
        // Behavior
        retryWrites: true, // ניסיון חוזר לכתיבות
        retryReads: true,  // ניסיון חוזר לקריאות
        
        // Security
        ssl: process.env.NODE_ENV === 'production',
        
        // Buffer settings
        bufferMaxEntries: 0, // אל תשמור פעולות בזיכרון אם אין חיבור
        bufferCommands: false
      };

      // בחירת connection string לפי סביבה
      const connectionString = this.getConnectionString();
      
      console.log(colors.yellow('🔄 מתחבר למסד הנתונים...'));
      
      // חיבור עם mongoose
      this.connection = await mongoose.connect(connectionString, options);
      this.isConnected = true;
      this.connectionAttempts = 0;
      
      console.log(colors.green('✅ חיבור מוצלח למסד הנתונים MongoDB!'));
      console.log(colors.cyan(`📊 מחובר לשרת: ${this.connection.connection.host}:${this.connection.connection.port}`));
      console.log(colors.cyan(`📁 מסד נתונים: ${this.connection.connection.name}`));
      
      // הגדרת event listeners
      this.setupEventListeners();
      
      return this.connection;
      
    } catch (error) {
      console.error(colors.red('❌ שגיאה בחיבור למסד הנתונים:'), error.message);
      
      this.connectionAttempts++;
      
      if (this.connectionAttempts < this.maxRetries) {
        console.log(colors.yellow(`🔄 ניסיון ${this.connectionAttempts}/${this.maxRetries} - ניסיון חוזר בעוד ${this.retryDelay/1000} שניות...`));
        
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.connect(); // ניסיון חוזר
      } else {
        console.error(colors.red('💥 נכשל בחיבור למסד הנתונים לאחר מספר ניסיונות'));
        process.exit(1);
      }
    }
  }

  /**
   * קבלת connection string לפי סביבה
   */
  getConnectionString() {
    const env = process.env.NODE_ENV || 'development';
    
    switch (env) {
      case 'production':
        return process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI;
      
      case 'test':
        return process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/vip_shipping_test';
      
      case 'development':
      default:
        return process.env.MONGODB_DEV_URI || 'mongodb://localhost:27017/vip_shipping_dev';
    }
  }

  /**
   * הגדרת מאזינים לאירועי חיבור
   */
  setupEventListeners() {
    // חיבור מוצלח
    mongoose.connection.on('connected', () => {
      console.log(colors.green('🟢 MongoDB מחובר'));
    });

    // שגיאה בחיבור
    mongoose.connection.on('error', (err) => {
      console.error(colors.red('🔴 שגיאת MongoDB:'), err);
    });

    // התנתקות
    mongoose.connection.on('disconnected', () => {
      console.log(colors.yellow('🟡 MongoDB התנתק'));
      this.isConnected = false;
    });

    // התנתקות אלגנטית בסגירת אפליקציה
    process.on('SIGINT', this.gracefulShutdown.bind(this));
    process.on('SIGTERM', this.gracefulShutdown.bind(this));
    process.on('SIGUSR2', this.gracefulShutdown.bind(this)); // nodemon restart
  }

  /**
   * התנתקות אלגנטית
   */
  async gracefulShutdown(signal) {
    console.log(colors.yellow(`\n🔄 קיבלתי אות ${signal}, מתנתק מהמסד...`));
    
    try {
      await mongoose.connection.close();
      console.log(colors.green('✅ התנתקות מוצלחת ממסד הנתונים'));
      process.exit(0);
    } catch (error) {
      console.error(colors.red('❌ שגיאה בהתנתקות:'), error);
      process.exit(1);
    }
  }

  /**
   * בדיקת בריאות החיבור
   */
  async healthCheck() {
    try {
      if (!this.isConnected) {
        throw new Error('אין חיבור למסד הנתונים');
      }
      
      // בדיקה פשוטה
      await mongoose.connection.db.admin().ping();
      
      const stats = await mongoose.connection.db.stats();
      
      return {
        status: 'healthy',
        connected: true,
        database: mongoose.connection.name,
        collections: stats.collections,
        dataSize: this.formatBytes(stats.dataSize),
        indexSize: this.formatBytes(stats.indexSize),
        storageSize: this.formatBytes(stats.storageSize)
      };
      
    } catch (error) {
      return {
        status: 'unhealthy',
        connected: false,
        error: error.message
      };
    }
  }

  /**
   * עיצוב גודל קבצים
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * איפוס מסד הנתונים (רק לפיתוח!)
   */
  async resetDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('איפוס מסד נתונים אסור בפרודקשן!');
    }
    
    console.log(colors.yellow('⚠️ מאפס מסד נתונים...'));
    
    const collections = await mongoose.connection.db.collections();
    
    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(colors.gray(`🗑️ נוקה collection: ${collection.collectionName}`));
    }
    
    console.log(colors.green('✅ מסד הנתונים אופס בהצלחה'));
  }

  /**
   * יצירת אינדקסים
   */
  async createIndexes() {
    try {
      console.log(colors.yellow('🔍 יוצר אינדקסים...'));
      
      // אינדקסים עבור User
      await mongoose.model('User').createIndexes();
      
      // אינדקסים עבור Shipment
      await mongoose.model('Shipment').createIndexes();
      
      // אינדקסים עבור Quote
      await mongoose.model('Quote').createIndexes();
      
      console.log(colors.green('✅ כל האינדקסים נוצרו בהצלחה'));
      
    } catch (error) {
      console.error(colors.red('❌ שגיאה ביצירת אינדקסים:'), error);
    }
  }

  /**
   * סיד נתונים לפיתוח
   */
  async seedData() {
    if (process.env.NODE_ENV === 'production') {
      console.log(colors.yellow('⚠️ Seeding מושבת בפרודקשן'));
      return;
    }
    
    try {
      console.log(colors.yellow('🌱 זורע נתוני דוגמה...'));
      
      // ייבוא מודלים
      const User = require('../models/User');
      const Quote = require('../models/Quote');
      const Shipment = require('../models/Shipment');
      
      // יצירת משתמש admin
      const adminExists = await User.findOne({ 'personalInfo.email': 'admin@vipshipping.com' });
      
      if (!adminExists) {
        await User.create({
          personalInfo: {
            firstName: 'מנהל',
            lastName: 'מערכת',
            email: 'admin@vipshipping.com',
            phone: '+972-50-1234567'
          },
          address: {
            street: 'רחוב הטכנולוגיה 1',
            city: 'תל אביב',
            postalCode: '12345',
            country: 'Israel'
          },
          authentication: {
            password: 'Admin123!'
          },
          permissions: {
            role: 'super_admin',
            isVerified: true,
            subscriptionType: 'enterprise'
          }
        });
        
        console.log(colors.green('👤 משתמש מנהל נוצר'));
      }
      
      console.log(colors.green('✅ נתוני דוגמה נזרעו בהצלחה'));
      
    } catch (error) {
      console.error(colors.red('❌ שגיאה בזריעת נתונים:'), error);
    }
  }
}

// יצירת instance יחיד
const dbManager = new DatabaseManager();

module.exports = {
  connect: () => dbManager.connect(),
  healthCheck: () => dbManager.healthCheck(),
  resetDatabase: () => dbManager.resetDatabase(),
  createIndexes: () => dbManager.createIndexes(),
  seedData: () => dbManager.seedData(),
  isConnected: () => dbManager.isConnected
};
