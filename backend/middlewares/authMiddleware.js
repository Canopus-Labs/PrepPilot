const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes

// Secure JWT Middleware for production
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.toLowerCase().startsWith("bearer")) {
      // Extract token from "Bearer <token>"
      token = token.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.tokenType && decoded.tokenType !== "access") {
        return res.status(401).json({ message: "Invalid token type" });
      }

      // Find user by ID (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      // Check if user exists
      if (!req.user) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      // Check if email is verified
      if (!req.user.isEmailVerified) {
        return res.status(403).json({
          message: "Please verify your email to access this resource"
        });
      }

      // Reject tokens issued before the user's current version (logout / password change).
      if ((decoded.tokenVersion ?? 0) !== (req.user.tokenVersion ?? 0)) {
        return res.status(401).json({ message: "Session expired, please log in again" });
      }

      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token failed" });
  }
};

// Middleware to restrict a route to administrators (must run after protect).
// Admins are allow-listed by email via the ADMIN_EMAILS env var
// (comma-separated). With no allow-list configured, admin routes are closed.
const requireAdmin = (req, res, next) => {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    return res.status(403).json({ message: "Forbidden: no admins configured" });
  }

  if (!req.user || !adminEmails.includes(req.user.email.toLowerCase())) {
    return res.status(403).json({ message: "Forbidden: admin access required" });
  }

  next();
};

module.exports = { protect, requireAdmin };
