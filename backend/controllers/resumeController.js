const axios = require('axios');
const FormData = require('form-data');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const compileResume = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ message: "No LaTeX code provided" });
        }
        
        // Normalize line endings to UNIX format, as texlive.net is highly sensitive to Windows \r\n
        const cleanCode = code.replace(/\r\n/g, '\n');

        const form = new FormData();
        form.append('filecontents[]', Buffer.from(cleanCode, 'utf-8'), {
            filename: 'document.tex',
            contentType: 'text/plain'
        });
        form.append('filename[]', 'document.tex');
        form.append('engine', 'pdflatex');
        form.append('return', 'pdf');

        const response = await axios.post('https://texlive.net/cgi-bin/latexcgi', form, {
            headers: {
                ...form.getHeaders()
            },
            responseType: 'arraybuffer'
        });

        const contentType = response.headers['content-type'];
        if (contentType && (contentType.includes('text') || contentType.includes('html'))) {
            const text = Buffer.from(response.data).toString('utf-8');
            
            // Extract the actual LaTeX error which is usually at the bottom of the log or prefixed with "!"
            const lines = text.split('\n');
            const errorLineIndex = lines.findIndex(line => line.startsWith('! '));
            let relevantLog = text;
            if (errorLineIndex !== -1) {
                // Return context around the error
                relevantLog = lines.slice(Math.max(0, errorLineIndex - 5), errorLineIndex + 15).join('\n');
            } else if (text.length > 2000) {
                relevantLog = "..." + text.substring(text.length - 2000);
            }

            return res.status(400).json({ message: "LaTeX syntax error. Please check your code.", log: relevantLog });
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': response.data.byteLength
        });

        res.send(Buffer.from(response.data));

    } catch (error) {
        console.error("Resume Compilation Error:", error?.message);
        res.status(500).json({ message: "Failed to compile resume", error: error.message });
    }
}

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No resume file uploaded" });
        }

        const targetRole = req.body.targetRole || "General Professional";

        // 1. Setup Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());

        // 2. Prompt Engineering
        const prompt = `You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
Analyze the attached PDF resume against the target role: "${targetRole}".

Return the analysis STRICTLY as a JSON object with the following exact keys and structure:
{
  "resumeScore": (number between 0 and 100),
  "roleMatch": (number between 0 and 100),
  "missingSkills": [array of short strings, max 5],
  "missingProjects": [array of short strings, max 3],
  "atsCompatibility": {
    "status": "Good" | "Average" | "Poor",
    "remarks": "short sentence explaining ATS parsing issues visually observed"
  },
  "suggestions": [array of short actionable sentences, max 5]
}

DO NOT wrap the response in markdown blocks like \`\`\`json. Return ONLY the raw JSON object.`;

        // 3. Fallback Engine (Mirroring aiController robustness)
        const candidateModels = [
            process.env.GEMINI_MODEL,
            "models/gemini-2.5-flash",
            "models/gemini-flash-latest",
            "models/gemini-2.0-flash",
            "gemini-1.5-flash"
        ].filter(Boolean);

        let lastErr = null;
        let result = null;

        for (const m of candidateModels) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                result = await model.generateContent([
                    prompt,
                    {
                        inlineData: {
                            data: req.file.buffer.toString("base64"),
                            mimeType: "application/pdf"
                        }
                    }
                ]);
                break; // Stop on first success
            } catch (e) {
                lastErr = e;
                continue;
            }
        }

        if (!result) throw lastErr || new Error("All Gemini models failed to process PDF");
        
        let aiResponse = result.response.text();
        
        // Robustly clean: remove all leading/trailing code block markers
        aiResponse = aiResponse
          .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
          .replace(/(\s*```\s*)+$/i, "")
          .trim();

        let jsonResult;
        try {
            jsonResult = JSON.parse(aiResponse);
        } catch (e) {
            console.error("Failed to parse Gemini JSON:", aiResponse);
            return res.status(500).json({ message: "AI response parsing failed.", raw: aiResponse });
        }

        res.status(200).json(jsonResult);

    } catch (error) {
        console.error("Resume Analysis Error:", error);
        res.status(500).json({ message: "Failed to analyze resume", error: error.message });
    }
}

const Resume = require("../models/Resume");

const saveResume = async (req, res) => {
    try {
        const { title, latexCode, resumeId } = req.body;
        const userId = req.user._id || req.user.id;

        if (!title || !latexCode) {
            return res.status(400).json({ success: false, message: "Title and LaTeX code are required." });
        }

        let resume;
        if (resumeId) {
            resume = await Resume.findOneAndUpdate(
                { _id: resumeId, user: userId },
                { title, latexCode },
                { new: true }
            );
        } else {
            resume = await Resume.create({
                user: userId,
                title,
                latexCode
            });
        }

        res.status(200).json({ success: true, resume });
    } catch (error) {
        console.error("Save Resume Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const getMyResumes = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, resumes });
    } catch (error) {
        console.error("Get Resumes Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = { compileResume, analyzeResume, saveResume, getMyResumes };
