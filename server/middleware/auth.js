// JWT auth — Bearer header or httpOnly cookies

const { verifyAccessToken } = require('../utils/jwt');

function extractAccessToken(req) {
  const authHeader = req.get('Authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length);
  }
  return req.cookies?.vip_access_token || null;
}

const requireAuth = (req, res, next) => {
  const token = extractAccessToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};

const optionalAuth = (req, res, next) => {
  const token = extractAccessToken(req);
  if (token) {
    try {
      const payload = verifyAccessToken(token);
      req.user = { id: payload.sub, email: payload.email, role: payload.role };
    } catch {
      // invalid token in optionalAuth — continue as guest
    }
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, error: 'Authentication required' });
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ success: false, error: 'Insufficient permissions' });
  }
  next();
};

module.exports = { requireAuth, optionalAuth, requireAdmin, extractAccessToken };
