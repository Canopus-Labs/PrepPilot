const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// ── Schemas ───────────────────────────────────────────────

const registerUserZod = z.object({
  name: z.string().min(4, "Name must be at least 4 characters").trim(),
  email: z.string().email("Enter a valid email").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/, "Password must contain at least one special character"),
  profileImageUrl: z.string().url("Enter a valid URL").trim().optional().or(z.literal("")),
});

const loginUserZod = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const resendVerificationZod = z.object({
  email: z.string().email("Enter a valid email"),
});

const forgotPasswordZod = z.object({
  email: z.string().email("Enter a valid email").trim(),
});

const resetPasswordZod = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/, "Password must contain at least one special character"),
});

// ── Middleware ────────────────────────────────────────────

const validateUserSignup = (req, res, next) => {
  try {
    registerUserZod.parse(req.body);
    next();
  } catch (err) {
    return handleValidationError(res, err);
  }
};

const validateUserLogin = (req, res, next) => {
  try {
    loginUserZod.parse(req.body);
    next();
  } catch (err) {
    return handleValidationError(res, err); // Bug fix: was "error" (undefined), now "err"
  }
};

const validateRefreshToken = (req, res, next) => {
  // The refresh token arrives as an httpOnly cookie, not in the request body
  if (!req.cookies?.refreshToken) {
    return res.status(400).json({ success: false, message: "Refresh token is required." });
  }
  next();
};

const validateResendEmail = (req, res, next) => {
  try {
    resendVerificationZod.parse(req.body);
    next();
  } catch (err) {
    return handleValidationError(res, err); // Bug fix: was err.errors (v3), now uses handleValidationError with err.issues (v4)
  }
};

const validateForgotPassword = (req, res, next) => {
  try {
    forgotPasswordZod.parse(req.body);
    next();
  } catch (err) {
    return handleValidationError(res, err);
  }
};

const validateResetPassword = (req, res, next) => {
  try {
    resetPasswordZod.parse(req.body);
    next();
  } catch (err) {
    return handleValidationError(res, err);
  }
};

module.exports = {
  validateUserLogin,
  validateUserSignup,
  validateRefreshToken,
  validateResendEmail,
  validateForgotPassword,
  validateResetPassword,
};
