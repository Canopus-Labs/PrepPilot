/**
 * OWASP-recommended special-character set.
 * Covers all printable non-alphanumeric ASCII characters that are
 * unambiguous in most encoding contexts.
 */
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;

const PASSWORD_RULES = [
    {
        test: (pw) => typeof pw === 'string' && pw.length >= 8,
        message: 'Password must be at least 8 characters long.',
    },
    {
        test: (pw) => /[A-Z]/.test(pw),
        message: 'Password must contain at least one uppercase letter.',
    },
    {
        test: (pw) => /[a-z]/.test(pw),
        message: 'Password must contain at least one lowercase letter.',
    },
    {
        test: (pw) => /[0-9]/.test(pw),
        message: 'Password must contain at least one number.',
    },
    {
        test: (pw) => SPECIAL_CHAR_REGEX.test(pw),
        message:
            'Password must contain at least one special character (e.g. !@#$%^&*()_+-=[]{};\':"|,.<>/?`~).',
    },
];

/**
 * Validate a password against all rules.
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validatePassword(password) {
    const errors = PASSWORD_RULES.filter((r) => !r.test(password)).map((r) => r.message);
    return { valid: errors.length === 0, errors };
}

module.exports = { validatePassword, SPECIAL_CHAR_REGEX, PASSWORD_RULES };