
const csrfHeaderCheck = (req, res, next) => {
  if (req.headers["x-requested-with"] !== "XMLHttpRequest") {
    return res.status(403).json({ message: "Missing CSRF protection header" });
  }
  next();
};
module.exports = csrfHeaderCheck;