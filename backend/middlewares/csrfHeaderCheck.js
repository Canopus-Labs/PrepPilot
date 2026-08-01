const csrfTokenCheck = (req, res, next) => {
  const cookieToken = req.cookies?.csrfToken;
  const headerToken = req.headers["x-csrf-token"];
 
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ success: false, message: "CSRF token missing or invalid." });
  }
 
  next();
};
 
module.exports = csrfTokenCheck;