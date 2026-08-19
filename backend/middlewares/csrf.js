const { doubleCsrf } = require("csrf-csrf");

const isProduction = process.env.NODE_ENV === "production";

const {
    generateCsrfToken,
    validateRequest,
} = doubleCsrf({
    getSecret: () => {
        const secret = process.env.CSRF_SECRET || process.env.JWT_SECRET || "preppilot_csrf_default_secret_key_32bytes";
        return secret;
    },

    // PrepPilot authenticates API requests with JWTs and uses
    // the refresh-token cookie for the refresh flow.
    getSessionIdentifier: (req) => {
        return req.cookies?.refreshToken || "anonymous";
    },

    cookieName: "csrfToken",

    cookieOptions: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/api/auth",
    },

    getCsrfTokenFromRequest: (req) => {
        return req.headers["x-csrf-token"];
    },
});

const csrfProtection = (req, res, next) => {
    try {
        if (!validateRequest(req)) {
            return res.status(403).json({
                success: false,
                message: "CSRF token missing or invalid.",
            });
        }

        next();
    } catch (error) {
        console.error("CSRF validation error:", error);

        return res.status(403).json({
            success: false,
            message: "CSRF token missing or invalid.",
        });
    }
};

module.exports = {
    generateCsrfToken,
    csrfProtection,
};
