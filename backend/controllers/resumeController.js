const axios = require("axios");
const FormData = require("form-data");
const Groq = require("groq-sdk");
const pdf = require("pdf-parse");

const compileResume = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "No LaTeX code provided" });
    }

    // Normalize line endings to UNIX format, as texlive.net is highly sensitive to Windows \r\n
    const cleanCode = code.replace(/\r\n/g, "\n");

    const form = new FormData();
    form.append("filecontents[]", Buffer.from(cleanCode, "utf-8"), {
      filename: "document.tex",
      contentType: "text/plain",
    });
    form.append("filename[]", "document.tex");
    form.append("engine", "pdflatex");
    form.append("return", "pdf");

    const response = await axios.post(
      "https://texlive.net/cgi-bin/latexcgi",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
      },
    );

    const contentType = response.headers["content-type"];
    if (
      contentType &&
      (contentType.includes("text") || contentType.includes("html"))
    ) {
      const text = Buffer.from(response.data).toString("utf-8");

      // Extract the actual LaTeX error which is usually at the bottom of the log or prefixed with "!"
      const lines = text.split("\n");
      const errorLineIndex = lines.findIndex((line) => line.startsWith("! "));
      let relevantLog = text;
      if (errorLineIndex !== -1) {
        // Return context around the error
        relevantLog = lines
          .slice(Math.max(0, errorLineIndex - 5), errorLineIndex + 15)
          .join("\n");
      } else if (text.length > 2000) {
        relevantLog = "..." + text.substring(text.length - 2000);
      }

      return res.status(400).json({
        message: "LaTeX syntax error. Please check your code.",
        log: relevantLog,
      });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": response.data.byteLength,
    });

    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Resume Compilation Error:", error?.message);
    res
      .status(500)
      .json({ message: "Failed to compile resume", error: error.message });
  }
};

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      console.error(
        "Analysis Error: No file in request. Check multer configuration.",
      );
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    console.log("Analyzing file:", {
      name: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      hasBuffer: !!req.file.buffer,
    });

    const targetRole = req.body.targetRole || "General Professional";

    // 1. Extract text from PDF
    let resumeText = "";
    try {
      if (!req.file.buffer || req.file.buffer.length === 0) {
        throw new Error("File buffer is empty");
      }

      // Validate PDF Header (%PDF-)
      const header = req.file.buffer.slice(0, 5).toString();
      if (header !== "%PDF-") {
        console.error("Invalid PDF header detected:", header);
        return res.status(400).json({
          message:
            "The uploaded file is not a valid PDF document. Please check the file format.",
          details: `Expected %PDF- header, but found: ${header}`,
        });
      }

      // Use Buffer explicitly
      const buffer = Buffer.from(req.file.buffer);
      const pdfData = await pdf(buffer);
      resumeText = pdfData.text;

      if (!resumeText || resumeText.trim().length === 0) {
        console.warn(
          "PDF parsed but no text extracted. Content length:",
          buffer.length,
        );
        return res.status(400).json({
          message:
            "Could not extract text from the PDF. It might be an image-only (scanned) PDF or encrypted.",
        });
      }
    } catch (pdfError) {
      console.error("PDF Parsing Error Detail:", pdfError);
      return res.status(400).json({
        message:
          "Failed to parse PDF file. The file might be corrupted, password-protected, or in an unsupported format.",
        error: pdfError.message,
      });
    }

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        message:
          "Could not extract text from resume. Please ensure it's not an image-only PDF.",
      });
    }

    // 2. Setup Groq
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // 3. Prompt Engineering
    const prompt = `You are an expert ATS Resume Analyzer and Career Coach.

Your task is to:
1. Read and understand the uploaded resume content completely.
2. Extract important resume information in structured format.
3. Analyze the resume against the target role: "${targetRole}".
4. Provide ATS score, strengths, weaknesses, keyword gaps, and improvement suggestions.
5. Return the response ONLY in valid JSON format.

Analysis Rules:
- Carefully parse work experience, projects, skills, education, certifications, and achievements.
- Detect missing keywords for the target role.
- Evaluate ATS friendliness.
- Suggest measurable improvements.
- Give role-specific recommendations.
- Be accurate and concise.
- If resume text is unclear or unreadable, return an error message in JSON.

ATS Scoring Criteria:
- Skills Match
- Experience Relevance
- Project Quality
- Keyword Optimization
- Resume Structure
- Impact Metrics
- Education Match

The output MUST be a valid JSON object with the following structure:
{
  "resumeScore": (number between 0 and 100),
  "roleMatch": (number between 0 and 100),
  "atsScore": (number between 0 and 100),
  "strengths": [array of strings],
  "weaknesses": [array of strings],
  "keywordGaps": [array of strings],
  "missingSkills": [array of strings],
  "missingProjects": [array of strings],
  "improvementSuggestions": [array of strings],
  "suggestions": [array of strings],
  "atsCompatibility": {
    "status": "Good" | "Average" | "Poor",
    "remarks": "short sentence explaining ATS parsing issues"
  },
  "structuredInfo": {
     "workExperience": [array of objects],
     "projects": [array of objects],
     "skills": [array of strings],
     "education": [array of objects],
     "certifications": [array of strings],
     "achievements": [array of strings]
  }
}

Resume Content:
${resumeText}

Return ONLY the raw JSON object.`;

    // 4. Call Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      stream: false,
      response_format: { type: "json_object" },
    });

    let aiResponse = chatCompletion.choices[0].message.content;

    let jsonResult;
    try {
      jsonResult = JSON.parse(aiResponse);
    } catch (e) {
      console.error("Failed to parse Groq JSON:", aiResponse);
      return res
        .status(500)
        .json({ message: "AI response parsing failed.", raw: aiResponse });
    }

    // Map suggestions to improvementSuggestions if one is missing but other is present
    if (!jsonResult.suggestions && jsonResult.improvementSuggestions) {
      jsonResult.suggestions = jsonResult.improvementSuggestions;
    } else if (jsonResult.suggestions && !jsonResult.improvementSuggestions) {
      jsonResult.improvementSuggestions = jsonResult.suggestions;
    }

    res.status(200).json(jsonResult);
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    res
      .status(500)
      .json({ message: "Failed to analyze resume", error: error.message });
  }
};

const Resume = require("../models/Resume");

const saveResume = async (req, res) => {
  try {
    const { title, latexCode, resumeId } = req.body;
    const userId = req.user._id || req.user.id;

    if (!title || !latexCode) {
      return res.status(400).json({
        success: false,
        message: "Title and LaTeX code are required.",
      });
    }

    let resume;
    if (resumeId) {
      resume = await Resume.findOneAndUpdate(
        { _id: resumeId, user: userId },
        { title, latexCode },
        { new: true },
      );
    } else {
      resume = await Resume.create({
        user: userId,
        title,
        latexCode,
      });
    }

    res.status(200).json({ success: true, resume });
  } catch (error) {
    console.error("Save Resume Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const getMyResumes = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, resumes });
  } catch (error) {
    console.error("Get Resumes Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { compileResume, analyzeResume, saveResume, getMyResumes };
