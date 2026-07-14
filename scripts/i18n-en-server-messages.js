const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const map = [
  ["error: 'נדרשת הודעה'", "error: 'Message is required'"],
  ["error: 'חשבונית לא נמצאה'", "error: 'Invoice not found'"],
  ["error: 'נדרשת מדינה (country)'", "error: 'Country is required'"],
  ["error: 'לתשלום בארה״ב נדרשת מדינה (state)'", "error: 'US payments require a state'"],
  ["error: 'משתמש לא נמצא'", "error: 'User not found'"],
  ["error: 'סיסמה חייבת להכיל לפחות 8 תווים'", "error: 'Password must be at least 8 characters'"],
  ["error: 'משתמש עם אימייל זה כבר קיים'", "error: 'A user with this email already exists'"],
  ["error: 'אימייל או סיסמה שגויים'", "error: 'Invalid email or password'"],
  ["error: 'החשבון נעול זמנית עקב ניסיונות כושלים, נסה שוב מאוחר יותר'", "error: 'Account temporarily locked due to failed attempts. Try again later'"],
  ["error: 'נדרש refreshToken'", "error: 'refreshToken is required'"],
  ["error: 'refresh token לא תקין או שפג תוקפו'", "error: 'Invalid or expired refresh token'"],
  ["new Error('לא מורשה על ידי CORS policy')", "new Error('Not allowed by CORS policy')"],
  ["error: 'יותר מדי בקשות, נסה שוב מאוחר יותר'", "error: 'Too many requests, please try again later'"],
  ["message: { error: 'יותר מדי ניסיונות התחברות' }", "message: { error: 'Too many login attempts' }"],
  ["message: 'נתיב לא נמצא'", "message: 'Route not found'"],
  ["new Error('משלוח לא נמצא')", "new Error('Shipment not found')"],
  ["new Error('נדרשים latitude ו-longitude (או state בארה״ב)')", "new Error('latitude and longitude are required (or a US state)')"],
  ["new Error('נדרש אימות')", "new Error('Authentication required')"],
  ["new Error('אין הרשאה לחשבונית זו')", "new Error('Not allowed to access this invoice')"],
  ["new Error('חשבונית לא נמצאה')", "new Error('Invoice not found')"],
  ["new Error('לא ניתן לשנות מס על חשבונית ששולמה')", "new Error('Cannot change tax on a paid invoice')"],
  ["new Error('החשבונית כבר שולמה')", "new Error('Invoice is already paid')"],
  ["new Error('Stripe לא מוגדר — הגדר STRIPE_SECRET_KEY')", "new Error('Stripe is not configured — set STRIPE_SECRET_KEY')"],
  ["new Error('STRIPE_SECRET_KEY לא מוגדר')", "new Error('STRIPE_SECRET_KEY is not set')"],
  ["new Error('STRIPE_WEBHOOK_SECRET לא מוגדר')", "new Error('STRIPE_WEBHOOK_SECRET is not set')"],
  ["|| 'שגיאה בלתי צפויה'", "|| 'Unexpected server error'"],
  ["new Error('הצעת מחיר לא נמצאה')", "new Error('Quote not found')"],
  ["new Error('הצעת המחיר כבר הומרה למשלוח')", "new Error('Quote already converted to a shipment')"],
  ["new Error('הצעת המחיר פגה, יש לבקש הצעה חדשה')", "new Error('Quote expired — request a new quote')"],
  ["|| 'לא צויין'", "|| 'Not specified'"],
  ["'מספר הצעה חייב להיות בפורמט QUO + 8 ספרות'", "'Quote number must be QUO + 8 digits'"],
  ["'מספר חשבונית חייב להיות בפורמט INV + 8 ספרות'", "'Invoice number must be INV + 8 digits'"],
  ["'מספר מעקב חייב להיות בפורמט VIP + 10 ספרות'", "'Tracking number must be VIP + 10 digits'"],
  ["'קלט לא תקין זוהה'", "'Invalid input detected'"],
  ["'נתונים לא תקינים'", "'Invalid data'"]
];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
      let s = fs.readFileSync(p, 'utf8');
      const orig = s;
      for (const [a, b] of map) s = s.split(a).join(b);
      if (s !== orig) {
        fs.writeFileSync(p, s);
        console.log('updated', path.relative(root, p));
      }
    }
  }
}

walk(path.join(root, 'server'));
console.log('done');
