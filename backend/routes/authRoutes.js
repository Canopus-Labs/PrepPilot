const express = require("express");
const lusca = require("lusca");
const { registerUser, loginUser, verifyEmail, resendVerificationEmail, getUserProfile, updateUserProfile, changePassword, deleteUserAccount, refreshToken, logoutUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");
const { validateUserLogin, validateUserSignup, validateRefreshToken, validateResendEmail } = require("../Input_validators/ValidateAuth");
const csrfHeaderCheck = require("../middlewares/csrfHeaderCheck");
const router = express.Router();

const {
  loginLimiter,
  authLimiter,
  generalLimiter,
  sensitiveAuthLimiter,
} = require("../middlewares/rateLimiter");

// CSRF protection (double-submit token) for the two routes that authenticate
// purely off the ambient refreshToken cookie: /refresh and /logout.
// Requires cookie-session to be mounted in server.js so lusca has req.session
// to store the secret in.
const csrfProtection = lusca.csrf({
  cookie: {
    name: "XSRF-TOKEN",
    options: {
      httpOnly: false, // must be readable by frontend JS to echo back in the header
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/auth",
    },
  },
  header: "x-csrf-token",
});

// Auth Routes
router.post("/register", authLimiter, validateUserSignup, registerUser);
router.post("/login", authLimiter, validateUserLogin, loginUser);

// Frontend should GET this once on app load to prime the XSRF-TOKEN cookie
// before it ever needs to call /refresh or /logout.
router.get("/csrf-token", generalLimiter, csrfProtection, (req, res) => {
  res.json({ success: true });
});

router.post("/refresh", authLimiter, csrfHeaderCheck, csrfProtection, validateRefreshToken, refreshToken);
router.post("/logout", authLimiter, csrfHeaderCheck, csrfProtection, validateRefreshToken, logoutUser);
router.get("/profile", protect, generalLimiter, getUserProfile);
router.put("/profile", protect, generalLimiter, updateUserProfile);
router.put("/change-password", protect, sensitiveAuthLimiter, changePassword);
router.delete("/delete-account", protect, sensitiveAuthLimiter, deleteUserAccount);
router.post("/resend-verification", authLimiter,  validateResendEmail, resendVerificationEmail);
router.get("/verify-email", verifyEmail);

/**
 * Upload a user profile image.
 * @route POST /api/auth/upload-image
 */
router.post("/upload-image", protect, generalLimiter, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;