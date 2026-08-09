const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: null },
        refreshTokenHash: { type: String, default: null },
        refreshTokenExpiresAt: { type: Date, default: null },
        // Bumped on logout / password change to invalidate outstanding access tokens.
        tokenVersion: { type: Number, default: 0 },
        
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

        // Streak Tracking
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        lastPracticeDate: { type: Date, default: null },

        //Email Verification
        isEmailVerified: { type: Boolean, default: false },
        emailVerificationToken: { type: String, default: null },
        emailVerificationExpires: { type: Date, default: null },
    },
    { timestamps: true }
);

// Hash password automatically on save, and when there is no update in password then the password remains same and saves precious computation of hasing password

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isValidPassword = async function(candidatePassword) {
  // Compare candidate password with the stored hash
  return await bcrypt.compare(candidatePassword, this.password);
};   

// Never serialize secrets when a User document is sent over the wire (e.g.
// res.json(user) in GET /api/auth/profile). These fields remain readable in
// code where they are explicitly needed (login comparison, refresh rotation),
// but are stripped from every JSON output.
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.refreshTokenHash;
    delete ret.refreshTokenExpiresAt;
    delete ret.emailVerificationToken;
    delete ret.emailVerificationExpires;
    delete ret.tokenVersion;
    return ret;
  },
});

module.exports = mongoose.model("User", UserSchema);
