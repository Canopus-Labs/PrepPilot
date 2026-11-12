/**
 * Password policy validation utility.
 * Checks password strength against defined security rules.
 */

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;

const PASSWORD_RULES = Object.freeze([
    {
        test: (password) => password.length >= 8,
        message: "Password must be at least 8 characters long.",
    },
    {
        test: (password) => /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter.",
    },
    {
        test: (password) => /[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter.",
    },
    {
        test: (password) => /[0-9]/.test(password),
        message: "Password must contain at least one number.",
    },
    {
        test: (password) => SPECIAL_CHAR_REGEX.test(password),
        message:
            "Password must contain at least one special character (e.g. !@#$%^&*()_+-=[]{};':\"|,.<>/?`~).",
    },
]);

/**
 * Validate a password against all security rules.
 *
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validatePassword(password) {
    if (typeof password !== "string" || password.length === 0) {
        return {
            valid: false,
            errors: ["Password is required and must be a valid string."],
        };
    }

    const errors = PASSWORD_RULES
        .filter((rule) => !rule.test(password))
        .map((rule) => rule.message);

    return {
        valid: errors.length === 0,
        errors,
    };
}

module.exports = {
    validatePassword,
    SPECIAL_CHAR_REGEX,
    PASSWORD_RULES,
};
``
