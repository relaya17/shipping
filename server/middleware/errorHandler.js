module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Unexpected server error';
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // לוג מפורט בפיתוח
    console.error('Error:', err);
  }

  res.status(status).json({
    success: false,
    error: message,
    code: err.code || 'SERVER_ERROR'
  });
};


