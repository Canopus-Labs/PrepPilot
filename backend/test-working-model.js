const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testWorkingModel() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test the most promising models
    const testModels = [
      "models/gemini-2.5-flash",
      "models/gemini-flash-latest",
      "models/gemini-2.0-flash",
      "models/gemini-pro-latest",
    ];

    for (const modelName of testModels) {
      try {
        console.log(`\n🧪 Testing: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(
          "Say hello in a friendly way!",
        );
        console.log(`✅ ${modelName} WORKS!`);
        console.log("Response:", result.response.text());
        return modelName; // Return first working model
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}`);
      }
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testWorkingModel();
