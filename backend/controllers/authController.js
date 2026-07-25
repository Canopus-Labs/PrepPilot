const logger = require("../utils/logger");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Session = require("../models/Session");
const Resume = require("../models/Resume");
const Question = require("../models/Question");
const UserSheetProgress = require("../models/UserSheetProgress");
const { sendVerificationEmail } = require("../utils/sendEmail");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/sendEmail");
const { validatePassword } = require('../utils/passwordPolicy');

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";
const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_SALT_ROUNDS = 10;
const getRefreshCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    path: "/api/auth",
});

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId, tokenType: "access" }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId, tokenType: "refresh" }, process.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

const registerUser = async (req, res) => {
/**
 * Register a new user account.
 * @route POST /api/auth/register
 */
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
           return res.status(400).json({
           success: false,
           message: "Please enter a valid email address.",
        });
        }

        const { valid, errors } = validatePassword(password);
        if (!valid) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "A user with this email already exists." });
        }

        const nameParts = name.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const defaultPrepPilotId = email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

        // Generate email verification token
        const emailVerificationToken = crypto.randomBytes(32).toString("hex");
        const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const user = await User.create({
            name,
            email,
            password: password,
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
            isEmailVerified: true,
            isEmailVerified: false,
            emailVerificationToken,
            emailVerificationExpires
        });

        // Send Verification Email
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
        await sendVerificationEmail(user.email, verificationUrl);

        return res.status(201).json({
            success: true,
            message: "Registration successful. Please check your email to verify your account.",
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const loginUser = async (req, res) => {
        logger.error("Register error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
        next(error);
    }
};

/**
 * Authenticate a user and return a JWT token.
 * @route POST /api/auth/login
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password provided." });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password provided." });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in. Check your inbox for the verification link.",
            });
        }

        const accessToken = generateAccessToken(user._id);
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
        logger.info(error)
        res.status(500).json({ success: false, message: "Internal server error occurred", error });
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
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

        const accessToken = generateAccessToken(user._id);
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
        next(error);
    }
};

const logoutUser = async (req, res, next) => {
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
        await user.save();

        res.clearCookie("refreshToken", { path: "/api/auth" });
        res.json({ success: true, message: "User logged out successfully." });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const verifyEmail = async (req, res) => {
        next(error);
    }
};

/**
 * Verify a user's email address via the token link sent to their inbox.
 * @route GET /api/auth/verify-email
 */
const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ success: false, message: "Verification token is missing." });
        }

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

const resendVerificationEmail = async (req, res) => {
        next(error);
    }
};

/**
 * Resend verification email to an unverified user.
 * @route POST /api/auth/resend-verification
 */
const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: true, message: "If this email is registered, a verification link has been sent." });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, message: "This email is already verified. Please log in." });
        }

        user.emailVerificationToken = crypto.randomBytes(32).toString("hex");
        user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();

        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}`;
        await sendVerificationEmail(user.email, verificationUrl);

        res.json({ success: true, message: "Verification email resent. Please check your inbox." });
    } catch (error) {
        console.error("Resend verification error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const getUserProfile = async (req, res) => {
        next(error);
    }
};

/**
 * Get the profile of the currently authenticated user.
 * @route GET /api/auth/profile
 */
const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(404).json({ success: false, message: "Requested user profile not found" });
        }
        res.json(user);
    }catch(error){
        console.error("Get profile error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const updateUserProfile = async (req, res) => {
    } catch (error) {
        next(error);
    }
};

/**
 * Update the user profile settings.
 * @route PUT /api/auth/profile
 */
const updateUserProfile = async (req, res, next) => {
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

        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (bio !== undefined) user.bio = bio;
        if (country !== undefined) user.country = country;
        if (profileImageUrl !== undefined) user.profileImageUrl = profileImageUrl;
        if (visibility !== undefined) user.visibility = visibility;

        if (firstName !== undefined || lastName !== undefined) {
            const fName = firstName !== undefined ? firstName : user.firstName;
            const lName = lastName !== undefined ? lastName : user.lastName;
            user.name = `${fName} ${lName}`.trim() || user.name;
        }

        if (prepPilotId !== undefined && prepPilotId !== user.prepPilotId) {
            if (prepPilotId.trim() !== "") {
                const existingUser = await User.findOne({ prepPilotId: prepPilotId.trim() });
                if (existingUser && existingUser._id.toString() !== userId.toString()) {
                    return res.status(400).json({ success: false, message: "PrepPilot ID is already taken" });
                }
                user.prepPilotId = prepPilotId.trim();
            } else {
                user.prepPilotId = undefined;
            }
        }

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

        const updatedUser = await User.findById(userId).select("-password");
        res.json(updatedUser);
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const changePassword = async (req, res) => {
        next(error);
    }
};

/**
 * Update user password.
 * @route PUT /api/auth/change-password
 */
const changePassword = async (req, res, next) => {
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

        const isMatch = await user.isValidPassword(originalPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect original password" });
        }

        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
};

const deleteUserAccount = async (req, res) => {
    const mongoSession = await mongoose.startSession();
        next(error);
    }
};

/**
 * Permanently delete user account.
 * @route DELETE /api/auth/delete-account
 */
const deleteUserAccount = async (req, res, next) => {
    try {
        await mongoSession.withTransaction(async () => {
            const userId = req.user._id;

            const user = await User.findById(userId).session(mongoSession);
            if (!user) {
                throw new Error("User not found");
            }

            const sessions = await Session.find({ user: userId }).session(mongoSession);
            const sessionIds = sessions.map(s => s._id);
            await Question.deleteMany({ session: { $in: sessionIds } }).session(mongoSession);
            await Session.deleteMany({ user: userId }).session(mongoSession);
            await Resume.deleteMany({ user: userId }).session(mongoSession);
            await UserSheetProgress.deleteMany({ userId }).session(mongoSession);
            await User.findByIdAndDelete(userId).session(mongoSession);
        });

        res.clearCookie("refreshToken", { path: "/api/auth" });
        res.json({ success: true, message: "Account and all associated data deleted successfully" });
    } catch (error) {
        if (error.message === "User not found") {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.error("Delete account error:", error);
        res.status(500).json({ success: false, message: "Failed to delete account" });
    } finally {
        await mongoSession.endSession();
        next(error);
    }
};

/**
 * Handle forgot password request.
 * @route POST /api/auth/forgot-password
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await User.findOne({ email });
        
        // Always return success to prevent email enumeration attacks
        if (!user) {
            return res.json({ success: true, message: "If this email is registered, a password reset link has been sent." });
        }

        // Generate reset token and set expiry to 1 hour
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(user.email, resetUrl);

        res.json({ success: true, message: "If this email is registered, a password reset link has been sent." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
    }
};

module.exports = { registerUser, loginUser, refreshToken, logoutUser, verifyEmail, resendVerificationEmail, getUserProfile, updateUserProfile, changePassword, deleteUserAccount, forgotPassword };