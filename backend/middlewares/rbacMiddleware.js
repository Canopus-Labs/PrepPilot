/**
 * Middleware to check if the user has the required roles.
 * @param {string[]} requiredRoles - Array of roles allowed to access the route.
 * @returns {function} Express middleware function.
 */
const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ success: false, message: "User not authenticated or roles missing" });
      }

      const hasRole = req.user.roles.some((role) => requiredRoles.includes(role));
      
      if (!hasRole) {
        return res.status(403).json({ success: false, message: "Forbidden: You do not have the required role to perform this action" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error in RBAC middleware", error: error.message });
    }
  };
};

module.exports = {
  checkRole
};
