/**
 * CSRF Header Validation Middleware
 * Protects state-changing requests against Cross-Site Request Forgery.
 */

const crypto = require("crypto");

const csrfTokenCheck = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.csrfToken;
    const headerToken = req.get("x-csrf-token");

    // Reject missing or invalid tokens.
    if (
      typeof cookieToken !== "string" ||
      typeof headerToken !== "string" ||
      !cookieToken ||
      !headerToken
    ) {
      return res.status(403).json({
        success: false,
        message: "CSRF token missing or invalid.",
      });
    }

    // Compare tokens safely without timing-based string comparison.
    const cookieBuffer = Buffer.from(cookieToken, "utf8");
    const headerBuffer = Buffer.from(headerToken, "utf8");

    if (
      cookieBuffer.length !== headerBuffer.length ||
      !crypto.timingSafeEqual(cookieBuffer, headerBuffer)
    ) {
      return res.status(403).json({
        success: false,
        message: "CSRF token missing or invalid.",
      });
    }

    return next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "CSRF token validation failed.",
    });
  }
};

module.exports = csrfTokenCheck;
