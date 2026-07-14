const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/env');

/**
 * הנפקה ואימות של access/refresh tokens אמיתיים (JWT).
 * מחליף את ה-stub הקודם שהחזיר "demo-token-for-<email>".
 */

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.personalInfo?.email,
      role: user.permissions?.role || 'user'
    },
    jwtConfig.accessSecret,
    { expiresIn: jwtConfig.accessExpiresIn }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), type: 'refresh' },
    jwtConfig.refreshSecret,
    { expiresIn: jwtConfig.refreshExpiresIn }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, jwtConfig.accessSecret);
}

function verifyRefreshToken(token) {
  const payload = jwt.verify(token, jwtConfig.refreshSecret);
  if (payload.type !== 'refresh') {
    throw new Error('סוג טוקן שגוי');
  }
  return payload;
}

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
