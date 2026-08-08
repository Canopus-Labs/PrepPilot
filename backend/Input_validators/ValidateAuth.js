const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// ── Schemas ───────────────────────────────────────────────

// Profile image URLs must point at a remote http(s) resource. z.string().url()
// alone accepts any scheme (e.g. "javascript:..."), so restrict to http/https
// to avoid stored XSS, tracking pixels, or data: payloads. Empty string and
// null are allowed so callers can leave the field unset or clear the image.
const profileImageUrlSchema = z.union([
  z.literal(""),
  z.null(),
  z
    .string()
    .trim()
    .max(2048, "Profile image URL must be at most 2048 characters")
    .refine(
      (value) => {
        try {
          const parsed = new URL(value);
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      },
      "Profile image URL must be a valid http(s) URL"
    ),
]);

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
  profileImageUrl: profileImageUrlSchema.optional(),
});

// PUT /api/auth/profile accepts many fields; validate only the fields we know
// how to constrain and preserve the rest via passthrough().
const updateProfileZod = z
  .object({
    profileImageUrl: profileImageUrlSchema.optional(),
  })
  .passthrough();

const loginUserZod = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const resendVerificationZod = z.object({
  email: z.string().email("Enter a valid email"),
});

// ── Middleware ────────────────────────────────────────────

const validateUserSignup = (req, res, next) => {
  try {
    req.body = registerUserZod.parse(req.body);
    next();
  } catch (err) {
    return handleValidationError(res, err);
  }
};

const validateUpdateProfile = (req, res, next) => {
  try {
    req.body = updateProfileZod.parse(req.body);
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

module.exports = {
  validateUserLogin,
  validateUserSignup,
  validateRefreshToken,
  validateResendEmail,
  validateUpdateProfile,
};
