const requiredEnvVars = Object.freeze([
  "MONGO_URI",
  "JWT_SECRET",
  "GEMINI_API_KEY",
]);

// Optional integrations mapping missing keys to dependent features
const optionalEnvGroups = Object.freeze([
  {
    feature: "Jobs for You",
    keys: ["ADZUNA_APP_ID", "ADZUNA_API_KEY"],
  },
  {
    feature: "Google Calendar sync",
    keys: [
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
      "GOOGLE_CALENDAR_ENCRYPTION_KEY",
    ],
  },
]);

const validateEnv = () => {
  const missingVars = [];

  // 1. Check required environment variables
  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];

    if (!value || value.trim() === "") {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    console.error("\n❌ Missing required environment variables:\n");

    missingVars.forEach((envVar) => {
      console.error(`   • ${envVar}`);
    });

    console.error(
      "\n Please add the missing environment variables to your .env file.\n",
    );

    process.exit(1);
  }

  // 2. Check optional environment variables and warn if missing
  optionalEnvGroups.forEach(({ feature, keys }) => {
    const missingKeys = keys.filter((key) => {
      const val = process.env[key];
      return !val || val.trim() === "";
    });

    if (missingKeys.length > 0) {
      console.warn(
        `⚠️  [Optional Config] Missing: ${missingKeys.join(", ")} -> "${feature}" feature will be disabled.`
      );
    }
  });

  console.log(" Environment variables validated successfully\n");
};

module.exports = validateEnv;