const crypto = require("crypto");

// Double-submit-cookie CSRF protection for the routes that authenticate off the
// ambient httpOnly refresh-token cookie (/api/auth/refresh and /api/auth/logout).
//
// Flow:
//   1. The client calls GET /api/auth/csrf-token. The server sets an httpOnly
//      `csrfToken` cookie and returns the same value in the JSON body.
//   2. The client keeps the value in memory and sends it back in the
//      `X-CSRF-Token` header on /refresh and /logout.
//   3. csrfTokenCheck accepts the request only if cookie and header match.
// A cross-site attacker can make the browser send the cookie, but cannot read the
// token from the response (CORS) and so cannot set the matching header.
const CSRF_COOKIE_NAME = "csrfToken";
const CSRF_HEADER_NAME = "x-csrf-token";
const CSRF_TOKEN_PATTERN = /^[a-f0-9]{64}$/;
const CSRF_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

const getCsrfCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: CSRF_COOKIE_MAX_AGE_MS,
  path: "/api/auth",
});

// Constant-time comparison; empty or non-string values never match.
const tokensMatch = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string" || a.length === 0) return false;
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
};

// GET /api/auth/csrf-token
// Reuses a valid existing cookie value so a second tab (or a retry) does not
// overwrite the cookie and invalidate the token another tab is holding.
const issueCsrfToken = (req, res) => {
  const existing = req.cookies?.[CSRF_COOKIE_NAME];
  const token =
    typeof existing === "string" && CSRF_TOKEN_PATTERN.test(existing)
      ? existing
      : crypto.randomBytes(32).toString("hex");

  res.cookie(CSRF_COOKIE_NAME, token, getCsrfCookieOptions());
  return res.json({ success: true, csrfToken: token });
};

const csrfTokenCheck = (req, res, next) => {
  const cookieToken = req.cookies?.[CSRF_COOKIE_NAME];
  const headerToken = req.headers[CSRF_HEADER_NAME];

  if (!tokensMatch(cookieToken, headerToken)) {
    return res.status(403).json({ success: false, message: "CSRF token missing or invalid." });
  }

  next();
};

module.exports = csrfTokenCheck;
module.exports.csrfTokenCheck = csrfTokenCheck;
module.exports.issueCsrfToken = issueCsrfToken;
module.exports.tokensMatch = tokensMatch;
