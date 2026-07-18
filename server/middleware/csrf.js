const crypto = require('crypto');

const CSRF_COOKIE = 'vip_csrf';
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function isProd() {
  return process.env.NODE_ENV === 'production';
}

function cookieOptions() {
  return {
    httpOnly: false, // readable by JS for double-submit header
    secure: isProd(),
    sameSite: isProd() ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

function ensureCsrfCookie(req, res) {
  let token = req.cookies?.[CSRF_COOKIE];
  if (!token || typeof token !== 'string' || token.length < 16) {
    token = crypto.randomBytes(32).toString('hex');
    res.cookie(CSRF_COOKIE, token, cookieOptions());
  }
  return token;
}

/**
 * Issue/refresh CSRF cookie on every response; enforce double-submit on mutations.
 */
function csrfProtection(req, res, next) {
  // Stripe webhooks use signature verification — skip CSRF
  if (req.path.startsWith('/api/webhooks')) {
    return next();
  }

  const token = ensureCsrfCookie(req, res);

  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  // Analytics beacon: best-effort, no CSRF gate (optionalAuth fire-and-forget)
  if (req.method === 'POST' && (req.path === '/api/analytics' || req.path === '/api/analytics/')) {
    return next();
  }

  const header = req.get('X-CSRF-Token') || req.get('x-csrf-token');
  if (!header || header !== token) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or missing CSRF token'
    });
  }

  return next();
}

module.exports = {
  csrfProtection,
  CSRF_COOKIE,
  ensureCsrfCookie
};
