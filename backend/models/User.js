const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        profileImageUrl: {
            type: String,
            default: null,
            match: [
                /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i,
                "Please provide a valid image URL",
            ],
        },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: null },
        
        // Basic Info
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        bio: { type: String, default: "" },
        country: { type: String, default: "" },
        
        // Educational Details
        educationDetails: {
            school: { type: String, default: "" },
            degree: { type: String, default: "" },
            branch: { type: String, default: "" },
            graduationYear: { type: String, default: "" }
        },
        
        // Profile Details (tabs: About Me, Education, Achievements, Work Experience, Socials)
        profileDetails: {
            aboutMe: { type: String, default: "" },
            education: { type: String, default: "" },
            achievements: { type: String, default: "" },
            workExperience: { type: String, default: "" },
            socials: {
                github: { type: String, default: "" },
                linkedin: { type: String, default: "" },
                twitter: { type: String, default: "" },
                portfolio: { type: String, default: "" }
            }
        },
        
        // Visibility
        visibility: { type: String, enum: ["Public", "Private"], default: "Public" },
        
        // PrepPilot ID (unique, sparse username)
        prepPilotId: { type: String, unique: true, sparse: true },
        
        // Platform Settings
        platformPreferences: {
            theme: { type: String, default: "light" },
            notificationsEnabled: { type: Boolean, default: true }
        },
        
        unlockedAchievements: { type: [String], default: [] }
    },
    { timestamps: true }
);

// Index for frequently queried field
UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
