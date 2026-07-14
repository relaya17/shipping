const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');
const User = require('../models/User');

// אבטחה וקצבי הגבלה כלליים לראוטר
router.use(rateLimits.api);
router.use(basicSecurity);

// GET /api/users/me - פרטי המשתמש המחובר
// הערה: register/login עברו ל-/api/auth (server/routes/authRoutes.js) עם JWT אמיתי
router.get('/me', auth.requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    return res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
