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

// Attach req.user when a valid token is present; continue anonymously otherwise.
const optionalProtect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.toLowerCase().startsWith("bearer")) {
      return next();
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.tokenType && decoded.tokenType !== "access") {
      return next();
    }

    const user = await User.findById(decoded.id).select("-password");
    if (
      user &&
      (decoded.tokenVersion ?? 0) === (user.tokenVersion ?? 0)
    ) {
      req.user = user;
    }
  } catch (error) {
    // Ignore invalid tokens for optional auth paths.
  }

  return next();
};

const parseModeratorEmails = () =>
  String(process.env.MODERATOR_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

// Restrict moderation endpoints to emails listed in MODERATOR_EMAILS.
const requireModerator = (req, res, next) => {
  const email = req.user?.email?.trim().toLowerCase();
  const moderators = parseModeratorEmails();

  if (!email || moderators.length === 0 || !moderators.includes(email)) {
    return res.status(403).json({
      message: "Not authorized — moderator access required",
    });
  }

  return next();
};

module.exports = { protect, requireAdmin, optionalProtect, requireModerator };
