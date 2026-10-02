const express = require("express");
const { registerUser, loginUser, verifyEmail, resendVerificationEmail, getUserProfile, updateUserProfile, changePassword, deleteUserAccount, refreshToken, logoutUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload, validateImageUpload } = require("../middlewares/uploadMiddleware");
const { validateUserLogin, validateUserSignup, validateRefreshToken, validateResendEmail } = require("../Input_validators/ValidateAuth");
const csrfHeaderCheck = require("../middlewares/csrfHeaderCheck");
const { issueCsrfToken } = require("../middlewares/csrfHeaderCheck");
const router = express.Router();

const {
  loginLimiter,
  authLimiter,
  generalLimiter,
  sensitiveAuthLimiter,
} = require("../middlewares/rateLimiter");

// CSRF protection (double-submit cookie, see middlewares/csrfHeaderCheck.js) is
// enforced on /refresh and /logout, the two routes that authenticate off the
// ambient refreshToken cookie. Every other protected route uses a Bearer token.

// Auth Routes
router.post("/register", authLimiter, validateUserSignup, registerUser);
router.post("/login", loginLimiter, validateUserLogin, loginUser);

// Issues the CSRF token: sets the httpOnly `csrfToken` cookie and returns the same
// value in the body so the frontend can echo it in the X-CSRF-Token header when it
// calls /refresh or /logout.
router.get("/csrf-token", generalLimiter, issueCsrfToken);

router.post("/refresh", authLimiter, csrfHeaderCheck, validateRefreshToken, refreshToken);
router.post("/logout", authLimiter, csrfHeaderCheck, validateRefreshToken, logoutUser);
router.get("/profile", protect, generalLimiter, getUserProfile);
router.put("/profile", protect, generalLimiter, updateUserProfile);
router.put("/change-password", protect, sensitiveAuthLimiter, changePassword);
router.delete("/delete-account", protect, sensitiveAuthLimiter, deleteUserAccount);
router.post("/resend-verification", authLimiter,  validateResendEmail, resendVerificationEmail);
router.get("/verify-email", authLimiter, verifyEmail);

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