const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

/**
 * Service to execute raw user code in an isolated Docker container.
 * 
 * In a real production environment, this leverages Dockerode or 
 * direct Docker CLI commands with strict --memory and --cpus limits.
 */
class DockerSandboxService {
  /**
   * Executes code in a sandbox.
   * 
   * @param {string} code - The raw source code to execute.
   * @param {string} language - The programming language (e.g., 'python', 'javascript').
   * @returns {Promise<{stdout: string, stderr: string}>} - The execution results.
   */
  static async executeCode(code, language) {
    const runId = crypto.randomBytes(8).toString("hex");
    let fileName, dockerImage, runCommand;

    // Map language to docker container config
    if (language === "python") {
      fileName = `script_${runId}.py`;
      dockerImage = "python:3.9-alpine";
      runCommand = `python /tmp/${fileName}`;
    } else if (language === "javascript" || language === "js") {
      fileName = `script_${runId}.js`;
      dockerImage = "node:18-alpine";
      runCommand = `node /tmp/${fileName}`;
    } else {
      throw new Error(`Unsupported language: ${language}`);
    }

    const tempFilePath = path.join(__dirname, "..", "tmp", fileName);

    try {
      // 1. Ensure tmp directory exists
      await fs.mkdir(path.join(__dirname, "..", "tmp"), { recursive: true });
      
      // 2. Write the code to a temporary file
      await fs.writeFile(tempFilePath, code);

      // 3. Execute the code inside an ephemeral Docker container.
      // We mount the temp script to /tmp/ in the container with read-only access.
      // --rm removes the container after execution.
      // --network none disables internet access for security.
      // --memory 128m limits RAM.
      
      const dockerCmd = `docker run --rm --network none --memory 128m -v "${tempFilePath}:/tmp/${fileName}:ro" ${dockerImage} sh -c "${runCommand}"`;

      return new Promise((resolve, reject) => {
        // Strict 5-second timeout on the child process to prevent infinite loops
        exec(dockerCmd, { timeout: 5000 }, async (error, stdout, stderr) => {
          // 4. Cleanup temp file
          await fs.unlink(tempFilePath).catch(console.error);

          if (error && error.killed) {
            resolve({ stdout, stderr: "Execution Timeout: Code exceeded the 5-second limit." });
          } else if (error) {
            resolve({ stdout, stderr: stderr || error.message });
          } else {
            resolve({ stdout, stderr });
          }
        });
      });
    } catch (err) {
      // Ensure cleanup on write failure
      await fs.unlink(tempFilePath).catch(() => {});
      throw err;
    }
  }
}

module.exports = DockerSandboxService;
