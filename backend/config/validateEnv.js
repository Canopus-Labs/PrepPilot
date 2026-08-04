// Ensure .env variables are loaded into memory before validation runs
require("dotenv").config();

const requiredEnvVars = Object.freeze([
  "MONGO_URI",
  "JWT_SECRET",
  "GEMINI_API_KEY",
  "CSRF_SESSION_SECRET",
]);

// Optional integrations mapping missing keys to dependent features
const optionalEnvGroups = Object.freeze([
  {
    feature: "Jobs for You",
    keys: ["ADZUNA_APP_ID", "ADZUNA_API_KEY"],
  },
]);

// Helper function to safely check if an env variable value is empty or missing
const isEmptyValue = (val) => {
  if (val === undefined || val === null) return true;
  return String(val).trim() === "";
};

const validateEnv = () => {
  // Guarantee dotenv is loaded in case validateEnv is called standalone
  require("dotenv").config();

  const missingVars = [];
// Documented placeholder values that must never pass validation — copying
// .env.example straight to .env would otherwise ship weak, guessable secrets.
// Values are compared case-insensitively after trimming.
const placeholderValues = Object.freeze({
  JWT_SECRET: ["your_jwt_secret_key_here_change_me", "change_me", "changeme", "secret"],
  GEMINI_API_KEY: ["your_gemini_api_key_here", "your_api_key_here"],
});

const isPlaceholder = (envVar, value) => {
  const normalized = String(value).trim().toLowerCase();
  const list = placeholderValues[envVar] || [];
  return list.includes(normalized);
};

// Pure check — reads process.env, returns a report. The server entrypoint
// turns an invalid report into process.exit(1) via validateEnv().
const checkEnv = () => {
  const missing = [];
  const placeholders = [];

  // 1. Check required environment variables safely
  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];

    if (isEmptyValue(value)) {
      missingVars.push(envVar);
    if (!value || value.trim() === "") {
      missing.push(envVar);
    } else if (isPlaceholder(envVar, value)) {
      placeholders.push(envVar);
    }
  });

  return {
    valid: missing.length === 0 && placeholders.length === 0,
    missing,
    placeholders,
  };
};

const validateEnv = () => {
  const { valid, missing, placeholders } = checkEnv();

  if (valid) {
    console.log("✅ Environment variables validated successfully\n");
    return;
  }

  if (missing.length > 0) {
    console.error("\n❌ Missing required environment variables:\n");

    missing.forEach((envVar) => {
      console.error(`   • ${envVar}`);
    });

    console.error(
      "\n⚠️ Please add the missing environment variables to your .env file.\n",
    );
  }

  if (placeholders.length > 0) {
    console.error("\n❌ Placeholder (weak/guessable) environment values:\n");

    placeholders.forEach((envVar) => {
      console.error(`   • ${envVar} must be replaced with a real value`);
    });

    console.error(
      "\n⚠️ The .env.example defaults are not secrets — replace them with strong, unique values.\n",
    );
  }

  // 2. Check optional environment variables and warn if missing
  optionalEnvGroups.forEach(({ feature, keys }) => {
    const missingKeys = keys.filter((key) => {
      const val = process.env[key];
      return isEmptyValue(val);
    });

    if (missingKeys.length > 0) {
      console.warn(
        `⚠️  [Optional Config] Missing: ${missingKeys.join(", ")} -> "${feature}" feature will be disabled.`
      );
    }
  });

  console.log("✅ Environment variables validated successfully\n");
};

module.exports = validateEnv;
  process.exit(1);
};

module.exports = validateEnv;
module.exports.checkEnv = checkEnv;
module.exports.placeholderValues = placeholderValues;
