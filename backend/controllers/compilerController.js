const axios = require("axios");

const JUDGE0_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const runCode = async (req, res) => {
  const rapidApiKey = process.env.JUDGE0_RAPIDAPI_KEY || process.env.RAPIDAPI_KEY;
  const rapidApiHost = process.env.JUDGE0_RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com";

  if (!rapidApiKey) {
    return res.status(500).json({ message: "Judge0 API key is not configured" });
  }

  try {
    const { data } = await axios.post(
      JUDGE0_URL,
      {
        language_id: req.body.language_id,
        source_code: req.body.source_code,
        stdin: req.body.stdin || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": rapidApiHost,
        },
        timeout: 30000,
      }
    );

    return res.json({
      stdout: data.stdout || "",
      stderr: data.stderr || "",
      compile_output: data.compile_output || "",
      status: data.status || null,
      time: data.time || null,
      memory: data.memory || null,
    });
  } catch (error) {
    console.error("Judge0 execution failed:", error.response?.data || error.message);
    return res.status(502).json({ message: "Failed to run code" });
  }
};

module.exports = { runCode };
