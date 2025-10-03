// Middleware אימות בסיסי ודמו לתפקידי משתמש

const requireAuth = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'נדרש אימות' });
  }
  const token = authHeader.slice('Bearer '.length);
  // בדמו, נצמיד משתמש דמה
  req.user = { id: 'demo', email: token.replace('demo-token-for-', ''), role: 'user' };
  next();
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length);
    req.user = { id: 'demo', email: token.replace('demo-token-for-', ''), role: 'user' };
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, error: 'נדרש אימות' });
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ success: false, error: 'אין הרשאה' });
  }
  next();
};

module.exports = { requireAuth, optionalAuth, requireAdmin };


