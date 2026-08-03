const express = require("express");
const { registerUser, loginUser, verifyEmail, resendVerificationEmail, getUserProfile, updateUserProfile, changePassword, deleteUserAccount, refreshToken, logoutUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload, validateImageUpload } = require("../middlewares/uploadMiddleware");
const { validateUserLogin, validateUserSignup, validateRefreshToken, validateResendEmail } = require("../Input_validators/ValidateAuth");
const csrfHeaderCheck = require("../middlewares/csrfHeaderCheck");
const router = express.Router();

const {
  loginLimiter,
  authLimiter,
  generalLimiter,
  sensitiveAuthLimiter,
} = require("../middlewares/rateLimiter");

// CSRF protection is applied globally in server.js via lusca.csrf(), with a
// blocklist exempting every JWT-bearer-only route. Only /refresh and /logout
// (below) are actually enforced at runtime, since they're the two routes
// that authenticate off the ambient refreshToken cookie.

// Auth Routes
router.post("/register", authLimiter, validateUserSignup, registerUser);
router.post("/login", loginLimiter, validateUserLogin, loginUser);

// Frontend should GET this once on app load to prime the XSRF-TOKEN cookie
// before it ever needs to call /refresh or /logout.
router.get("/csrf-token", generalLimiter, (req, res) => {
  res.json({ success: true });
});

router.post("/refresh", authLimiter, csrfHeaderCheck, validateRefreshToken, refreshToken);
router.post("/logout", authLimiter, csrfHeaderCheck, validateRefreshToken, logoutUser);
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
router.post("/upload-image", protect, generalLimiter, upload.single("image"), validateImageUpload, (req, res) => {
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;