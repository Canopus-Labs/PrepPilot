const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
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
        
        unlockedAchievements: { type: [String], default: [] },
        sessionCount: { type: Number, default: 0, min: 0 }

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
