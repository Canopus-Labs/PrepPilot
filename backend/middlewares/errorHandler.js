const logger = require('../utils/logger');
/**
 * Global Express error handling middleware.
 * Catches any error passed via next(err) and sends a unified JSON response.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error occurred";

  // Avoid leaking stack traces in production
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };

  logger.error('[Error] %s %s → %s', req.method, req.url, err.message);
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
