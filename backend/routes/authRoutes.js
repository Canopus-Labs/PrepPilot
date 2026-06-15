const express = require("express");
const { registerUser, loginUser,verifyEmail, resendVerificationEmail, getUserProfile, updateUserProfile, changePassword, deleteUserAccount } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");
const router = express.Router();
const {
  authLimiter,
  generalLimiter,
  sensitiveAuthLimiter,
} = require("../middlewares/rateLimiter");

// Auth Routes
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/profile", protect, generalLimiter, getUserProfile);
router.put("/profile", protect, generalLimiter, updateUserProfile);
router.put("/change-password", protect, sensitiveAuthLimiter, changePassword);
router.delete("/delete-account", protect, sensitiveAuthLimiter, deleteUserAccount);
router.post("/resend-verification", authLimiter, resendVerificationEmail);
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
