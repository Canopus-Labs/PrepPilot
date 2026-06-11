const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Improve authorization header validation
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token is missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    // Handle JWT-specific errors separately
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized, token verification failed",
    });
  }
};

module.exports = { protect };