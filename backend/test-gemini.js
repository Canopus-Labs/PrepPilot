const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testGeminiAPI() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    console.log("Testing API key...");
    console.log(
      "API Key (first 10 chars):",
      process.env.GEMINI_API_KEY?.substring(0, 10) + "...",
    );

    // List available models
    console.log("\n🔍 Fetching available models...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("\n✅ Available models:");

    if (data.models) {
      data.models.forEach((model) => {
        console.log(`- ${model.name}`);
      });
    }

    // Test basic model
    console.log("\n🧪 Testing basic model generation...");
    const testModels = [
      "gemini-1.5-flash-8b",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
      "models/gemini-1.5-flash-latest",
      "models/gemini-1.5-flash",
      "models/gemini-pro",
    ];

    for (const modelName of testModels) {
      try {
        console.log(`\nTrying: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello");
        console.log(`✅ ${modelName} WORKS!`);
        console.log("Response:", result.response.text());
        break; // Stop after first working model
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}`);
      }
    }
  } catch (error) {
    console.error("❌ API Test failed:", error.message);

    // Check if it's an API key issue
    if (
      error.message.includes("API_KEY_INVALID") ||
      error.message.includes("403")
    ) {
      console.log("\n💡 Possible solutions:");
      console.log("1. Verify your Gemini API key is valid");
      console.log("2. Check if the API key has the correct permissions");
      console.log("3. Ensure billing is enabled for your Google Cloud project");
    }
  }
}

testGeminiAPI();
