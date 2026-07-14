const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity, handleValidationErrors, commonValidations } = require('../middleware/security');
const auth = require('../middleware/auth');
const User = require('../models/User');

// אבטחה וקצבי הגבלה כלליים לראוטר
router.use(rateLimits.api);
router.use(basicSecurity);

// GET /api/users/me - פרטי המשתמש המחובר
router.get('/me', auth.requireAuth, async (req, res, next) => {
  try {
    return res.json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register - רישום משתמש חדש (פשטות לדוגמה)
router.post('/register', commonValidations.email, handleValidationErrors, async (req, res, next) => {
  try {
    const { email, password, name } = req.body || {};
    // דוגמה בלבד: יצירת משתמש בסיסית
    const created = await User.create({
      personalInfo: {
        firstName: (name || 'משתמש').toString().split(' ')[0] || 'משתמש',
        lastName: (name || 'חדש').toString().split(' ').slice(1).join(' ') || 'חדש',
        email,
        phone: '+972-50-0000000'
      },
      address: {
        street: 'לא צויין', city: 'לא צויין', postalCode: '00000', country: 'Israel'
      },
      authentication: { password }
    });

    return res.status(201).json({ success: true, userId: created._id });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login - התחברות (דוגמה בלבד)
router.post('/login', commonValidations.email, handleValidationErrors, async (req, res, next) => {
  try {
    const { email } = req.body || {};
    // בדוגמה זו נחזיר token דמה; במערכת אמת יש להחזיר JWT אמיתי
    return res.json({ success: true, token: 'demo-token-for-' + email });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


