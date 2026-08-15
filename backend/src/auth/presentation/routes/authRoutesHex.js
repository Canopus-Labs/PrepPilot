const express = require("express");
const { validateUserSignup, validateUserLogin } = require("../../../../Input_validators/ValidateAuth");

module.exports = function createAuthRoutes(authController) {
    const router = express.Router();
    
    router.post("/register", validateUserSignup, authController.registerUser);
    router.post("/login", validateUserLogin, authController.loginUser);
    
    // Remaining routes (verify-email, etc.) can be migrated incrementally
    // or mounted here as well, pointing to the old controller for now
    
    return router;
};
