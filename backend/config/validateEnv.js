const logger = require('../utils/logger');
const requiredEnvVars = Object.freeze([
  "MONGO_URI",
  "JWT_SECRET",
  "GEMINI_API_KEY",
]);

// Optional integrations — the server boots fine without these, but the
// dependent feature is disabled until they are provided.
// ADZUNA_APP_ID / ADZUNA_API_KEY → "Jobs for You" (see controllers/jobController.js)

const validateEnv = () => {
  const missingVars = [];

  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];

    if (!value || value.trim() === "") {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    logger.error("\n❌ Missing required environment variables:\n");

    missingVars.forEach((envVar) => {
      logger.error(`   • ${envVar}`);
    });

    logger.error(
      "\n⚠️ Please add the missing environment variables to your .env file.\n",
    );

    process.exit(1);
  }

  logger.info("✅ Environment variables validated successfully\n");
};

module.exports = validateEnv;
