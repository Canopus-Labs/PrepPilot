const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/sendEmail");
const { validatePassword } = require('../utils/passwordPolicy');

// Models for cascade deletion on account delete
const Session = require("../models/Session");
const Question = require("../models/Question");
const Flashcard = require("../models/Flashcard");
const Resume = require("../models/Resume");
const NotesSummary = require("../models/NotesSummary");
const RoadmapProject = require("../models/RoadmapProject");
const UserSheetProgress = require("../models/UserSheetProgress");

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "30d";
const REFRESH_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_SALT_ROUNDS = 10;
const PASSWORD_SALT_ROUNDS = 10;

// Single generic message used by BOTH registration branches so the response
// body can never reveal whether an email is already registered.
const REGISTRATION_GENERIC_MESSAGE = "If this email is not already registered, your account has been created.";
const getRefreshCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    path: "/api/auth",
});

/**
 * Generate an access token for the authenticated user.
 * @param {string} userId - MongoDB user ID.
 * @param {number} [tokenVersion=0] - User's current token version; embedded so
 *   logout / password change can invalidate outstanding access tokens.
 * @returns {string} JWT access token valid for 15 minutes.
 */
const generateAccessToken = (userId, tokenVersion = 0) => {
    return jwt.sign({ id: userId, tokenType: "access", tokenVersion }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

/**
 * Generate a refresh token for the authenticated user.
 * @param {string} userId - MongoDB user ID.
 * @returns {string} JWT refresh token valid for 30 days.
 */
const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId, tokenType: "refresh" }, process.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

/**
 * Register a new user account.
 * @route POST /api/auth/register
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        // Early payload presence & type validation to prevent unhandled TypeErrors (#758)
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required and must be a non-empty string.",
            });
        }

        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required and must be a valid string.",
            });
        }

        if (!password || typeof password !== "string") {
            return res.status(400).json({
                success: false,
                message: "Password is required.",
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        const { valid, errors } = validatePassword(password);
        if (!valid) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const userExists = await User.findOne({ email: cleanEmail });
        if (userExists) {
            // Do not reveal whether the email is already registered. Respond
            // with the same generic success shape (no tokens, no user data)
            // so the endpoint cannot be used for account enumeration.
            return res.status(201).json({
                success: true,
                message: REGISTRATION_GENERIC_MESSAGE,
            });
        }

        // Hash raw password with bcrypt before DB creation (#757)
        // Hash raw user password before saving to database
        const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

        // Split name into first and last names for defaults
        const nameParts = cleanName.split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        // Generate default unique PrepPilot ID
        const defaultPrepPilotId = cleanEmail.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

        // Auto-verify user — email verification temporarily disabled
        const user = await User.create({
            name: cleanName,
            email: cleanEmail,
            password: password,
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            firstName,
            lastName,
            prepPilotId: defaultPrepPilotId,
            educationDetails: { school: "", degree: "", branch: "", graduationYear: "" },
            profileDetails: {
                aboutMe: "",
                education: "",
                achievements: "",
                workExperience: "",
                socials: { github: "", linkedin: "", twitter: "", portfolio: "" }
            },
            platformPreferences: { theme: "light", notificationsEnabled: true },
            isEmailVerified: true, // skip email verification until SMTP is configured
        });

        const refreshToken = generateRefreshToken(user._id);

        user.refreshTokenHash = await bcrypt.hash(refreshToken, REFRESH_TOKEN_SALT_ROUNDS);
        user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);
        await user.save();

        // Identical generic shape for fresh and already-registered emails (no
        // accessToken, no user fields, no auth cookie) so the response cannot
        // be used to enumerate accounts. Tokens are issued at login/refresh.
        return res.status(201).json({
            success: true,
            message: "Account created successfully. You can now log in.",
            accessToken,
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            message: REGISTRATION_GENERIC_MESSAGE,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Authenticate a user and return a JWT token.
 * @route POST /api/auth/login
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password provided." });
        }

        // Verify password against stored hash
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password provided." });
        }

        // Block login until email is verified
        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in. Check your inbox for the verification link.",
            });
        }

        const accessToken = generateAccessToken(user._id, user.tokenVersion);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshTokenHash = await bcrypt.hash(refreshToken, REFRESH_TOKEN_SALT_ROUNDS);
        user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);
        await user.save();
        res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());
        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            accessToken,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const refreshToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({ success: false, message: "Refresh token is missing." });
        }

        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ success: false, message: "Refresh token is invalid or expired." });
        }

        if (decoded.tokenType !== "refresh") {
            return res.status(401).json({ success: false, message: "Refresh token is invalid." });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found." });
        }

        if (!user.refreshTokenHash || !user.refreshTokenExpiresAt || new Date(user.refreshTokenExpiresAt) < new Date()) {
            user.refreshTokenHash = null;
            user.refreshTokenExpiresAt = null;
            await user.save();
            return res.status(401).json({ success: false, message: "Refresh token has expired. Please log in again." });
        }

        const refreshIsValid = await bcrypt.compare(incomingRefreshToken, user.refreshTokenHash);
        if (!refreshIsValid) {
            user.refreshTokenHash = null;
            user.refreshTokenExpiresAt = null;
            await user.save();
            return res.status(401).json({ success: false, message: "Refresh token has been revoked. Please log in again." });
        }

        const accessToken = generateAccessToken(user._id, user.tokenVersion);
        const rotatedRefreshToken = generateRefreshToken(user._id);

        user.refreshTokenHash = await bcrypt.hash(rotatedRefreshToken, REFRESH_TOKEN_SALT_ROUNDS);
        user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);
        await user.save();

        res.cookie("refreshToken", rotatedRefreshToken, getRefreshCookieOptions());
        res.json({
            success: true,
            message: "Token refreshed successfully.",
            accessToken,
        });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const logoutUser = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(400).json({ success: false, message: "Refresh token is required." });
        }

        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ success: false, message: "Refresh token is invalid or expired." });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found." });
        }

        if (user.refreshTokenHash) {
            const refreshIsValid = await bcrypt.compare(incomingRefreshToken, user.refreshTokenHash);
            if (!refreshIsValid) {
                user.refreshTokenHash = null;
                user.refreshTokenExpiresAt = null;
                await user.save();
                return res.status(401).json({ success: false, message: "Refresh token has already been revoked." });
            }
        }

        user.refreshTokenHash = null;
        user.refreshTokenExpiresAt = null;
        // Invalidate any access tokens already issued to this user.
        user.tokenVersion = (user.tokenVersion || 0) + 1;
        await user.save();

        res.clearCookie("refreshToken", { path: "/api/auth" });
        res.json({ success: true, message: "User logged out successfully." });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Verify a user's email address via the token link sent to their inbox.
 * @route GET /api/auth/verify-email
 */
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ success: false, message: "Verification token is missing." });
        }

        // Find user with matching token that hasn't expired yet
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "This verification link is invalid or has expired. Please register again.",
            });
        }

        // Mark email as verified and clear the token fields
        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationExpires = null;
        await user.save();

        res.json({ success: true, message: "Email verified successfully. You can now log in." });
    } catch (error) {
        console.error("Verify email error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Resend verification email to an unverified user.
 * @route POST /api/auth/resend-verification
 */
const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });

        // Always respond with the same generic success shape regardless of
        // whether the email exists or is already verified, so the endpoint
        // cannot be used to enumerate registered addresses. The email is sent
        // only when a matching unverified user actually exists.
        if (user && !user.isEmailVerified) {
            // Generate a fresh token and reset expiry to 24 hours from now
            user.emailVerificationToken = crypto.randomBytes(32).toString("hex");
            user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await user.save();

            const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}`;
            await sendVerificationEmail(user.email, verificationUrl);
        }

        res.json({ success: true, message: "If this email is registered, a verification link has been sent." });
    } catch (error) {
        console.error("Resend verification error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Get the profile of the currently authenticated user.
 * @route GET /api/auth/profile
 */
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ success: false, message: "Requested user profile not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Update the user profile settings.
 * @route PUT /api/auth/profile
 */
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
            firstName,
            lastName,
            bio,
            country,
            educationDetails,
            profileDetails,
            visibility,
            prepPilotId,
            platformPreferences,
            profileImageUrl
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update fields if they are sent in request
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (bio !== undefined) user.bio = bio;
        if (country !== undefined) user.country = country;
        if (profileImageUrl !== undefined) user.profileImageUrl = profileImageUrl;
        if (visibility !== undefined) user.visibility = visibility;

        // Sync name based on firstName and lastName
        if (firstName !== undefined || lastName !== undefined) {
            const fName = firstName !== undefined ? firstName : user.firstName;
            const lName = lastName !== undefined ? lastName : user.lastName;
            user.name = `${fName} ${lName}`.trim() || user.name;
        }

        // Handle PrepPilot ID uniqueness check if changed
        if (prepPilotId !== undefined && prepPilotId !== user.prepPilotId) {
            if (prepPilotId.trim() !== "") {
                const existingUser = await User.findOne({ prepPilotId: prepPilotId.trim() });
                if (existingUser && existingUser._id.toString() !== userId.toString()) {
                    return res.status(400).json({ success: false, message: "PrepPilot ID is already taken" });
                }
                user.prepPilotId = prepPilotId.trim();
            } else {
                user.prepPilotId = undefined; // sparse allow null
            }
        }

        // Update nested structures if they are provided
        if (educationDetails) {
            user.educationDetails = {
                school: educationDetails.school !== undefined ? educationDetails.school : user.educationDetails.school,
                degree: educationDetails.degree !== undefined ? educationDetails.degree : user.educationDetails.degree,
                branch: educationDetails.branch !== undefined ? educationDetails.branch : user.educationDetails.branch,
                graduationYear: educationDetails.graduationYear !== undefined ? educationDetails.graduationYear : user.educationDetails.graduationYear
            };
        }

        if (profileDetails) {
            user.profileDetails = {
                aboutMe: profileDetails.aboutMe !== undefined ? profileDetails.aboutMe : user.profileDetails.aboutMe,
                education: profileDetails.education !== undefined ? profileDetails.education : user.profileDetails.education,
                achievements: profileDetails.achievements !== undefined ? profileDetails.achievements : user.profileDetails.achievements,
                workExperience: profileDetails.workExperience !== undefined ? profileDetails.workExperience : user.profileDetails.workExperience,
                socials: {
                    github: profileDetails.socials?.github !== undefined ? profileDetails.socials.github : (user.profileDetails?.socials?.github || ""),
                    linkedin: profileDetails.socials?.linkedin !== undefined ? profileDetails.socials.linkedin : (user.profileDetails?.socials?.linkedin || ""),
                    twitter: profileDetails.socials?.twitter !== undefined ? profileDetails.socials.twitter : (user.profileDetails?.socials?.twitter || ""),
                    portfolio: profileDetails.socials?.portfolio !== undefined ? profileDetails.socials.portfolio : (user.profileDetails?.socials?.portfolio || "")
                }
            };
        }

        if (platformPreferences) {
            user.platformPreferences = {
                theme: platformPreferences.theme !== undefined ? platformPreferences.theme : user.platformPreferences.theme,
                notificationsEnabled: platformPreferences.notificationsEnabled !== undefined ? platformPreferences.notificationsEnabled : user.platformPreferences.notificationsEnabled
            };
        }

        await user.save();

        // Return updated user, excluding password
        const updatedUser = await User.findById(userId).select("-password");
        res.json(updatedUser);
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Update user password.
 * @route PUT /api/auth/change-password
 */
const changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { originalPassword, newPassword } = req.body;

        if (!originalPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Original password and new password are required" });
        }

        const { valid, errors } = validatePassword(newPassword);
        if (!valid) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare original password
        const isMatch = await user.isValidPassword(originalPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect original password" });
        }

        // Assign the new password — the User schema's pre('save') hook hashes
        // it exactly once, so bcrypt.compare(newPassword, storedHash) succeeds.
        user.password = newPassword;

        // Fix #759: Revoke active refresh tokens in database & increment tokenVersion for access tokens
        user.refreshTokenHash = null;
        user.refreshTokenExpiresAt = null;
        // Hash new password before assignment
        user.password = await bcrypt.hash(newPassword, PASSWORD_SALT_ROUNDS);

        // Invalidate access tokens issued before the password change.
        user.tokenVersion = (user.tokenVersion || 0) + 1;
        await user.save();

        // Fix #759: Clear refresh cookie on client response
        res.clearCookie("refreshToken", { path: "/api/auth" });
        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Send a password reset link to a user who forgot their password.
 * @route POST /api/auth/forgot-password
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });

        // Return the same generic response whether or not the account exists —
        // prevents account enumeration via this endpoint.
        if (!user) {
            return res.json({ success: true, message: "If this email is registered, a password reset link has been sent." });
        }

        // Generate a short-lived single-use reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(user.email, resetUrl);

        res.json({ success: true, message: "If this email is registered, a password reset link has been sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Reset a forgotten password using the token emailed to the user.
 * @route POST /api/auth/reset-password
 */
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and new password are required." });
        }

        const { valid, errors } = validatePassword(newPassword);
        if (!valid) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        // The reset token is a server-generated 64-character hex string. Reject
        // anything else before it reaches the database so a malicious payload
        // (e.g. a Mongo operator object such as { $ne: ... }) can never be used
        // to build an injection query.
        if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) {
            return res.status(400).json({
                success: false,
                message: "This reset link is invalid or has expired. Please request a new one.",
            });
        }

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "This reset link is invalid or has expired. Please request a new one.",
            });
        }

        // Assign the raw password; the User pre('save') hook hashes it exactly once.
        user.password = newPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        // Revoke all existing sessions so old tokens can no longer be used.
        user.refreshTokenHash = null;
        user.refreshTokenExpiresAt = null;
        user.tokenVersion = (user.tokenVersion || 0) + 1;
        await user.save();

        res.clearCookie("refreshToken", { path: "/api/auth" });
        res.json({ success: true, message: "Password reset successfully. You can now log in." });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

/**
 * Permanently delete user account and all associated data.
 * Implements cascade deletion to clean up orphaned documents.
 * @route DELETE /api/auth/delete-account
 */
const deleteUserAccount = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Cascade delete runs inside a single Mongo transaction so that a failure
    // rolls back every collection: no partial deletions, no orphaned data, and
    // the account is removed only when the whole cascade commits.
    const runCascade = async (session) => {
        const sessions = await Session.find({ user: userId }).session(session);
        const sessionIds = sessions.map(s => s._id);
        if (sessionIds.length > 0) {
            deletePromises.push(
                Question.deleteMany({ session: { $in: sessionIds } })
            );
        }
        deletePromises.push(Session.deleteMany({ user: userId }));

        // Delete user's flashcards
        deletePromises.push(
            Flashcard.deleteMany({ userId: userId })
        );

        // Delete user's resumes
        deletePromises.push(
            Resume.deleteMany({ user: userId })
        );

        // Delete user's notes summaries
        deletePromises.push(
            NotesSummary.deleteMany({ user: userId })
        );

        // Delete user's roadmap projects
        deletePromises.push(
            RoadmapProject.deleteMany({ userId: userId })
        );

        // Delete user's sheet progress
        deletePromises.push(
            UserSheetProgress.deleteMany({ userId: userId })
            await Question.deleteMany({ session: { $in: sessionIds } }).session(session);
        }
        await Session.deleteMany({ user: userId }).session(session);
        await Flashcard.deleteMany({ userId: userId }).session(session);
        await Resume.deleteMany({ user: userId }).session(session);
        await NotesSummary.deleteMany({ user: userId }).session(session);
        await RoadmapProject.deleteMany({ userId: userId }).session(session);
        await UserSheetProgress.deleteMany({ userId: userId }).session(session);
        await User.findByIdAndDelete(userId).session(session);
    };

    // Standalone (non-replica-set) MongoDB rejects transaction usage with an
    // IllegalOperation error; there we fall back to a compensating cleanup pass
    // so account deletion still completes rather than silently failing.
    const isTransactionUnsupportedError = (error) => {
        const message = String((error && error.message) || "");
        return Boolean(
            error && (error.codeName === "IllegalOperation" || error.code === 20) ||
            message.includes("Transaction numbers are only allowed on a replica set") ||
            message.includes("Transactions are not supported")
        );
    };

    const tx = await mongoose.startSession();
    try {
        try {
            await tx.withTransaction(() => runCascade(tx));
        } catch (error) {
            if (!isTransactionUnsupportedError(error)) {
                throw error;
            }
            console.warn("Mongo transactions unavailable; running compensating cleanup for delete account");
            await runCascade(null);
        }

        // Clear auth cookies
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            path: "/api/auth"
        });

        res.json({ success: true, message: "Account and all associated data deleted successfully" });
    } catch (error) {
        console.error("Delete account error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    } finally {
        if (tx && typeof tx.endSession === "function") {
            await tx.endSession();
        }
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUserAccount,
};