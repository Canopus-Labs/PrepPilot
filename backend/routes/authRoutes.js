const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();
const { authLimiter } = require("../middlewares/rateLimiter");

// Auth Routes
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/profile", protect, getUserProfile);



/**
 * Upload a user profile image.
 * @route POST /api/auth/upload-image
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 * @throws {Error} When no file is uploaded.
 * @example
 * POST /api/auth/upload-image
 * Content-Type: multipart/form-data
 * image: <file>
 * @example
 * 200 {"imageUrl": "http://localhost:5000/uploads/abc123.png"}
 */
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

router.post("/upload-image", authenticateUser, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;