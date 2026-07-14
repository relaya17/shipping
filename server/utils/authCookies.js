const isProd = () => (process.env.NODE_ENV || 'development') === 'production';

function cookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    secure: isProd(),
    sameSite: isProd() ? 'none' : 'lax',
    path: '/',
    maxAge: maxAgeMs
  };
}

// Access ~15m, refresh ~7d (aligned with JWT defaults)
const ACCESS_MAX_AGE = 15 * 60 * 1000;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function setAuthCookies(res, { accessToken, refreshToken }) {
  res.cookie('vip_access_token', accessToken, cookieOptions(ACCESS_MAX_AGE));
  res.cookie('vip_refresh_token', refreshToken, cookieOptions(REFRESH_MAX_AGE));
}

function clearAuthCookies(res) {
  const base = { httpOnly: true, secure: isProd(), sameSite: isProd() ? 'none' : 'lax', path: '/' };
  res.clearCookie('vip_access_token', base);
  res.clearCookie('vip_refresh_token', base);
}

module.exports = { setAuthCookies, clearAuthCookies, cookieOptions };
