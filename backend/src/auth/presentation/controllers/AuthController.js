const { DomainError, ValidationError } = require("../../../shared/domain/BaseError");

class AuthController {
    constructor(registerUserUseCase, loginUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    }

    /**
     * Map domain errors to HTTP responses
     */
    _handleError(res, error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ success: false, message: error.message });
        }
        if (error instanceof DomainError) {
            return res.status(400).json({ success: false, message: error.message });
        }
        
        console.error("Internal Server Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error occurred" });
    }

    registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            
            await this.registerUserUseCase.execute({
                name,
                email,
                password,
                frontendUrl: this.frontendUrl
            });

            // Even if the user was already registered, we return the same success message
            // to prevent email enumeration, as per previous business requirements.
            return res.status(201).json({
                success: true,
                message: "If this email is not already registered, your account has been created. Please check your email to verify your account before logging in.",
            });
        } catch (error) {
            this._handleError(res, error);
        }
    };

    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            const result = await this.loginUserUseCase.execute({ email, password });

            if (!result.success) {
                if (result.reason === "email_not_verified") {
                    return res.status(403).json({
                        success: false,
                        message: "Please verify your email before logging in. Check your inbox for the verification link.",
                    });
                }
                // Invalid credentials or not found
                return res.status(401).json({ success: false, message: "Invalid email or password provided." });
            }

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/api/auth"
            });

            res.json({
                success: true,
                user: result.user.toPublicDTO(),
                accessToken: result.accessToken,
            });
            
        } catch (error) {
            this._handleError(res, error);
        }
    };
}

module.exports = AuthController;
