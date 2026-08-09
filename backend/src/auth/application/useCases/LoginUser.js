const bcrypt = require("bcryptjs");
const { ValidationError } = require("../../../shared/domain/BaseError");

class LoginUser {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    async execute({ email, password }) {
        if (!email || !password) {
            throw new ValidationError("Email and password are required.");
        }

        const cleanEmail = email.trim().toLowerCase();
        const user = await this.userRepository.findByEmail(cleanEmail);

        if (!user) {
            return { success: false, reason: "invalid_credentials" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, reason: "invalid_credentials" };
        }

        if (!user.isEmailVerified) {
            return { success: false, reason: "email_not_verified" };
        }

        // Generate tokens
        const accessToken = this.tokenService.generateAccessToken(user.id, user.tokenVersion);
        const refreshToken = this.tokenService.generateRefreshToken(user.id);

        user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        await this.userRepository.save(user);

        return { success: true, user, accessToken, refreshToken };
    }
}

module.exports = LoginUser;
