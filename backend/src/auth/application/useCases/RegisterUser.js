const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const UserEntity = require("../../domain/entities/UserEntity");
const { ConflictError, ValidationError } = require("../../../shared/domain/BaseError");

class RegisterUser {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.PASSWORD_SALT_ROUNDS = 10; // Ideally configurable via env
    }

    async execute({ name, email, password, frontendUrl }) {
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(cleanEmail)) {
            throw new ValidationError("Please enter a valid email address.");
        }

        // Check if user exists
        let userExists = await this.userRepository.findByEmail(cleanEmail);
        
        if (userExists) {
            // Existing user handling
            if (!userExists.isEmailVerified) {
                const rawToken = crypto.randomBytes(32).toString("hex");
                userExists.emailVerificationToken = crypto.createHash("sha256").update(rawToken).digest("hex");
                userExists.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                
                await this.userRepository.save(userExists);
                
                try {
                    const verificationUrl = `${frontendUrl}/verify-email?token=${rawToken}`;
                    await this.emailService.sendVerificationEmail(userExists.email, verificationUrl);
                } catch (err) {
                    console.error("Failed to resend verification email on re-registration:", err);
                }
            }
            // Return true indicating process completed but email was already used (to avoid enumeration)
            return { alreadyRegistered: true }; 
        }

        // New user creation
        const hashedPassword = await bcrypt.hash(password, this.PASSWORD_SALT_ROUNDS);

        const nameParts = cleanName.split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        const defaultPrepPilotId = cleanEmail.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

        const rawToken = crypto.randomBytes(32).toString("hex");
        const emailVerificationToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const newUser = new UserEntity({
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword,
            firstName,
            lastName,
            prepPilotId: defaultPrepPilotId,
            isEmailVerified: false,
            emailVerificationToken,
            emailVerificationExpires
        });

        await this.userRepository.save(newUser);

        try {
            const verificationUrl = `${frontendUrl}/verify-email?token=${rawToken}`;
            await this.emailService.sendVerificationEmail(newUser.email, verificationUrl);
        } catch (err) {
            console.error("Failed to send initial verification email:", err);
        }

        return { alreadyRegistered: false };
    }
}

module.exports = RegisterUser;
