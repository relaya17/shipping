const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity, handleValidationErrors, commonValidations } = require('../middleware/security');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { setAuthCookies, clearAuthCookies } = require('../utils/authCookies');

router.use(rateLimits.auth);
router.use(basicSecurity);

function issueTokens(user) {
  return {
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  };
}

function publicUser(user) {
  return {
    id: user._id,
    email: user.personalInfo.email,
    firstName: user.personalInfo.firstName,
    lastName: user.personalInfo.lastName,
    role: user.permissions.role
  };
}

function respondWithAuth(res, status, user) {
  const tokens = issueTokens(user);
  setAuthCookies(res, tokens);
  // Never return JWTs in JSON — browser auth is httpOnly cookies only.
  return res.status(status).json({ success: true, user: publicUser(user) });
}

router.post('/register', commonValidations.email, handleValidationErrors, async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body || {};

    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters' });
    }

    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, error: 'A user with this email already exists' });
    }

    const user = await User.create({
      personalInfo: {
        firstName: firstName || 'User',
        lastName: lastName || 'Guest',
        email,
        phone: phone || '+1-555-000-0000'
      },
      address: {
        street: 'Not specified', city: 'Not specified', postalCode: '00000', country: 'US'
      },
      authentication: { password }
    });

    return respondWithAuth(res, 201, user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', commonValidations.email, handleValidationErrors, async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    const user = await User.findByEmail(email).select('+authentication.password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        error: 'Account temporarily locked due to failed attempts. Try again later'
      });
    }

    const isMatch = await user.comparePassword(password || '');
    if (!isMatch) {
      await user.incrementLoginAttempts();
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    await user.updateAnalytics({});
    return respondWithAuth(res, 200, user);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.vip_refresh_token || req.body?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ success: false, error: 'refreshToken is required' });
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      clearAuthCookies(res);
      return res.status(401).json({ success: false, error: 'Invalid or expired refresh token' });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      clearAuthCookies(res);
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    const tokens = issueTokens(user);
    setAuthCookies(res, tokens);
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', auth.optionalAuth, async (req, res) => {
  clearAuthCookies(res);
  return res.json({ success: true, message: 'Logged out successfully' });
});

router.get('/me', auth.requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    return res.json({ success: true, user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
