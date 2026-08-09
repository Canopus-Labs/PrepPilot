class UserEntity {
    constructor({
        id,
        name,
        email,
        password,
        profileImageUrl = null,
        refreshTokenHash = null,
        refreshTokenExpiresAt = null,
        tokenVersion = 0,
        firstName = "",
        lastName = "",
        bio = "",
        country = "",
        educationDetails = {},
        profileDetails = {},
        visibility = "Public",
        prepPilotId,
        platformPreferences = {},
        unlockedAchievements = [],
        currentStreak = 0,
        longestStreak = 0,
        lastPracticeDate = null,
        isEmailVerified = false,
        emailVerificationToken = null,
        emailVerificationExpires = null,
        createdAt,
        updatedAt,
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
        this.refreshTokenHash = refreshTokenHash;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
        this.tokenVersion = tokenVersion;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.country = country;
        this.educationDetails = {
            school: "",
            degree: "",
            branch: "",
            graduationYear: "",
            ...educationDetails,
        };
        this.profileDetails = {
            aboutMe: "",
            education: "",
            achievements: "",
            workExperience: "",
            socials: {
                github: "",
                linkedin: "",
                twitter: "",
                portfolio: "",
                ...(profileDetails.socials || {})
            },
            ...profileDetails,
        };
        this.visibility = visibility;
        this.prepPilotId = prepPilotId;
        this.platformPreferences = {
            theme: "light",
            notificationsEnabled: true,
            ...platformPreferences,
        };
        this.unlockedAchievements = unlockedAchievements;
        this.currentStreak = currentStreak;
        this.longestStreak = longestStreak;
        this.lastPracticeDate = lastPracticeDate;
        this.isEmailVerified = isEmailVerified;
        this.emailVerificationToken = emailVerificationToken;
        this.emailVerificationExpires = emailVerificationExpires;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    verifyEmail() {
        this.isEmailVerified = true;
        this.emailVerificationToken = null;
        this.emailVerificationExpires = null;
    }

    resetStreakIfMissed() {
        if (this.lastPracticeDate && this.currentStreak > 0) {
            const now = new Date();
            const d1 = new Date(this.lastPracticeDate);
            const utc1 = Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
            const utc2 = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                this.currentStreak = 0;
            }
        }
    }

    // Prepare safe format to return to users
    toPublicDTO() {
        const dto = { ...this };
        delete dto.password;
        delete dto.refreshTokenHash;
        delete dto.refreshTokenExpiresAt;
        delete dto.emailVerificationToken;
        delete dto.emailVerificationExpires;
        delete dto.tokenVersion;
        return dto;
    }
}

module.exports = UserEntity;
