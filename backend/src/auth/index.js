const UserRepositoryMongoImpl = require("./infrastructure/database/UserRepositoryMongoImpl");
const EmailServiceImpl = require("./infrastructure/services/EmailServiceImpl");
const TokenServiceImpl = require("./infrastructure/services/TokenServiceImpl");

const RegisterUser = require("./application/useCases/RegisterUser");
const LoginUser = require("./application/useCases/LoginUser");

const AuthController = require("./presentation/controllers/AuthController");
const createAuthRoutes = require("./presentation/routes/authRoutesHex");

// Instantiate adapters
const userRepository = new UserRepositoryMongoImpl();
const emailService = new EmailServiceImpl();
const tokenService = new TokenServiceImpl();

// Instantiate Use Cases
const registerUserUseCase = new RegisterUser(userRepository, emailService);
const loginUserUseCase = new LoginUser(userRepository, tokenService);

// Instantiate Controller
const authController = new AuthController(registerUserUseCase, loginUserUseCase);

// Export router
const authRouter = createAuthRoutes(authController);

module.exports = {
    authRouter,
    authController, // exported for testing if needed
};
