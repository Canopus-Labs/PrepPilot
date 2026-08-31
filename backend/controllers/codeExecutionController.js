const DockerSandboxService = require("../services/dockerSandboxService");

/**
 * Controller to handle code execution requests from the frontend.
 */
const executeCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({
      success: false,
      message: "Both 'code' and 'language' fields are required.",
    });
  }

  try {
    const result = await DockerSandboxService.executeCode(code, language.toLowerCase());

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Code Execution Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while executing the code in the sandbox.",
      error: error.message,
    });
  }
};

module.exports = { executeCode };
