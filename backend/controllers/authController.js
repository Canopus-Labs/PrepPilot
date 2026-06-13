const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token for the authenticated user.
 * @param {string} userId - MongoDB user ID.
 * @returns {string} JWT token valid for 7 days.
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/**
 * Register a new user account.
 * @route POST /api/auth/register
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        if (!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long."
            });
        }

        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one uppercase letter."
            });
        }

        if (!/[a-z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one lowercase letter."
            });
        }

        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one number."
            });
        }

        if (!/[@$!%*?&]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one special character (@$!%*?&)."
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "A user with this email already exists" });
        }

        // validate password strength
        const passwordErrors = [];
        if (password.length < 8) {
            passwordErrors.push("Password must be at least 8 characters");
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push("Password must contain at least one uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            passwordErrors.push("Password must contain at least one lowercase letter");
        }
        if (!/\d/.test(password)) {
            passwordErrors.push("Password must contain at least one digit");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordErrors.push("Password must contain at least one special character");
        }
        if (passwordErrors.length > 0) {
            return res.status(400).json({ message: passwordErrors.join(". ") });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Split name into first and last names for defaults
        const nameParts = name.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        
        // Generate default unique PrepPilot ID
        const defaultPrepPilotId = email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

        // create new user
        const user = await User.create({
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
            platformPreferences: { theme: "light", notificationsEnabled: true }
        });

        // Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
            prepPilotId: user.prepPilotId,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
    }
};

/**
 * Authenticate a user and return a JWT token.
 * @route POST /api/auth/login
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ success: false, message: "Invalid email or password provided" })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: "Invalid email or password provided" });
        }

        // return user data with JWT
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
    }
};

/**
 * Get the profile of the currently authenticated user.
 * @route GET /api/auth/profile
 */
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(404).json({ success: false, message: "Requested user profile not found" });
        }
        res.json(user);
    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
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

        // return updated user, excluding password
        const updatedUser = await User.findById(userId).select("-password");
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
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

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare original password
        const isMatch = await bcrypt.compare(originalPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect original password" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
    }
};

/**
 * Permanently delete user account.
 * @route DELETE /api/auth/delete-account
 */
const deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, changePassword, deleteUserAccount };
