const colors = require('colors');

/**
 * ולידציית משתני סביבה בעליית השרת.
 * מטרה: כישלון ברור וממוקד בעליה, לא קריסה שקטה באמצע בקשה.
 */

const REQUIRED_ALWAYS = ['JWT_SECRET', 'JWT_REFRESH_SECRET'];

// נדרש רק אם רוצים סוכן AI פעיל (אפשר להריץ בלי AI בפיתוח מוקדם)
const AI_PROVIDER = (process.env.AI_PROVIDER || 'anthropic').toLowerCase();
const AI_KEY_BY_PROVIDER = {
  anthropic: 'ANTHROPIC_API_KEY',
  openai: 'OPENAI_API_KEY'
};

function validateEnv() {
  const missing = [];

  for (const key of REQUIRED_ALWAYS) {
    if (!process.env[key]) missing.push(key);
  }

  const env = process.env.NODE_ENV || 'development';

  if (env === 'production') {
    if (!process.env.MONGODB_URI) missing.push('MONGODB_URI');
    const aiKey = AI_KEY_BY_PROVIDER[AI_PROVIDER];
    if (aiKey && !process.env[aiKey]) missing.push(aiKey + ' (AI_PROVIDER=' + AI_PROVIDER + ')');
  }

  if (missing.length > 0) {
    console.error(colors.red('\n💥 חסרים משתני סביבה חובה:'));
    missing.forEach((key) => console.error(colors.red(`   - ${key}`)));
    console.error(colors.yellow('\nראה environment.example לרשימת המשתנים הנדרשים.\n'));
    process.exit(1);
  }

  // אזהרות רכות (לא חוסמות) - שימושי בפיתוח
  const aiKey = AI_KEY_BY_PROVIDER[AI_PROVIDER];
  if (env !== 'production' && aiKey && !process.env[aiKey]) {
    console.warn(colors.yellow(`⚠️ ${aiKey} לא מוגדר — /api/ai/chat יחזיר שגיאה עד שיוגדר מפתח`));
  }
  if (env !== 'production' && !process.env.STRIPE_SECRET_KEY) {
    console.warn(colors.yellow('⚠️ STRIPE_SECRET_KEY לא מוגדר — תשלומי Stripe לא יהיו זמינים'));
  }
}

module.exports = {
  validateEnv,
  aiProvider: AI_PROVIDER,
  jwt: {
    accessSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  }
};
