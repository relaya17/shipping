const mongoose = require('mongoose');
const colors = require('colors');

// הגדרות Mongoose גלובליות - תיקון עבור Mongoose 8
mongoose.set('strictQuery', false);

/**
 * מנהל חיבור MongoDB עם טיפול מלא בשגיאות ותמיכה ב-Render / Atlas
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
      // אופציות חיבור מעודכנות ל-Mongoose 8
      const options = {
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 30000,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        retryReads: true,
        tls: process.env.NODE_ENV === 'production', // שימוש ב-TLS רק בפרודקשן
        autoIndex: true, // מאפשר יצירת אינדקסים בעת הפעלה
        // הסרת bufferCommands - לא נדרש ב-Mongoose 8
        // bufferMaxEntries הוסר ב-Mongoose 6+ ולא נתמך ב-8
      };

      const connectionString = this.getConnectionString();
      console.log(colors.yellow('🔄 מתחבר למסד הנתונים...'));

      this.connection = await mongoose.connect(connectionString, options);
      this.isConnected = true;
      this.connectionAttempts = 0;

      console.log(colors.green('✅ חיבור מוצלח למסד הנתונים MongoDB!'));
      console.log(colors.cyan(`📊 שרת: ${this.connection.connection.host}`));
      console.log(colors.cyan(`📁 מסד נתונים: ${this.connection.connection.name}`));

      this.setupEventListeners();
      return this.connection;
    } catch (error) {
      console.error(colors.red('❌ שגיאה בחיבור למסד הנתונים:'), error.message);

      this.connectionAttempts++;
      if (this.connectionAttempts < this.maxRetries) {
        console.log(colors.yellow(`🔄 ניסיון ${this.connectionAttempts}/${this.maxRetries} - ניסיון חוזר בעוד ${this.retryDelay / 1000} שניות...`));
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        return this.connect();
      } else {
        console.error(colors.red('💥 נכשל בחיבור למסד הנתונים לאחר מספר ניסיונות'));
        process.exit(1);
      }
    }
  }

  getConnectionString() {
    // בדיקה אם יש MONGODB_URI מוגדר (Render/Atlas/Production)
    if (process.env.MONGODB_URI) {
      console.log(colors.cyan('🔗 משתמש ב-MONGODB_URI מהסביבה'));
      return process.env.MONGODB_URI;
    }
    
    if (process.env.MONGODB_ATLAS_URI) {
      console.log(colors.cyan('🔗 משתמש ב-MONGODB_ATLAS_URI מהסביבה'));
      return process.env.MONGODB_ATLAS_URI;
    }

    // אם אין, בודק את הסביבה
    const env = process.env.NODE_ENV || 'development';
    console.log(colors.yellow(`🌍 סביבה: ${env}`));
    
    switch (env) {
      case 'production':
        console.warn(colors.red('⚠️ אזהרה: אין MONGODB_URI בפרודקשן! משתמש ב-localhost'));
        return 'mongodb://localhost:27017/vip_shipping_prod';
      case 'test':
        return process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/vip_shipping_test';
      default:
        return process.env.MONGODB_DEV_URI || 'mongodb://localhost:27017/vip_shipping_dev';
    }
  }

  setupEventListeners() {
    mongoose.connection.on('connected', () => {
      console.log(colors.green('🟢 MongoDB מחובר'));
    });

    mongoose.connection.on('error', (err) => {
      console.error(colors.red('🔴 שגיאת MongoDB:'), err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(colors.yellow('🟡 MongoDB התנתק'));
      this.isConnected = false;
    });

    process.on('SIGINT', this.gracefulShutdown.bind(this));
    process.on('SIGTERM', this.gracefulShutdown.bind(this));
    process.on('SIGUSR2', this.gracefulShutdown.bind(this));
  }

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

  async healthCheck() {
    try {
      if (!this.isConnected) throw new Error('אין חיבור למסד הנתונים');
      await mongoose.connection.db.admin().ping();
      const stats = await mongoose.connection.db.stats();
      return {
        status: 'healthy',
        connected: true,
        database: mongoose.connection.name,
        collections: stats.collections,
        dataSize: this.formatBytes(stats.dataSize),
        indexSize: this.formatBytes(stats.indexSize),
      };
    } catch (error) {
      return { status: 'unhealthy', connected: false, error: error.message };
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async resetDatabase() {
    if (process.env.NODE_ENV === 'production') throw new Error('איפוס מסד נתונים אסור בפרודקשן!');
    console.log(colors.yellow('⚠️ מאפס מסד נתונים...'));
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(colors.gray(`🗑️ נוקה collection: ${collection.collectionName}`));
    }
    console.log(colors.green('✅ מסד הנתונים אופס בהצלחה'));
  }
}

const dbManager = new DatabaseManager();

module.exports = {
  connect: () => dbManager.connect(),
  healthCheck: () => dbManager.healthCheck(),
  resetDatabase: () => dbManager.resetDatabase(),
  isConnected: () => dbManager.isConnected,
};
