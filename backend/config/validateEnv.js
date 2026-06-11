const requiredEnvVars = Object.freeze([
  "MONGO_URI",
  "JWT_SECRET",
  "GEMINI_API_KEY",
]);

const validateEnv = () => {
  const missingVars = [];

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
      "\n⚠️ Please add the missing environment variables to your .env file.\n",
    );

    process.exit(1);
  }

  console.log("✅ Environment variables validated successfully\n");
};

module.exports = validateEnv;
