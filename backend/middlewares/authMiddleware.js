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

module.exports = { protect, optionalProtect };
