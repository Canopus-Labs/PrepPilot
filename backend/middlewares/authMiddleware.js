const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes

// Secure JWT Middleware for production
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
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

      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

module.exports = { protect };
