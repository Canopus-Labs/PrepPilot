const axios = require('axios');
const FormData = require('form-data');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Compile LaTeX resume code to a PDF document.
 * @route POST /api/resume/compile
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When no LaTeX code is provided or compilation fails.
 * @example
 * POST /api/resume/compile
 * {
 *   "code": "\\documentclass{article}..."
 * }
 * @example
 * 200 <PDF binary response>
 */
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

/**
 * Analyze an uploaded PDF resume using Gemini and return structured feedback.
 * @route POST /api/resume/analyze
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When no file is uploaded or AI analysis fails.
 * @example
 * POST /api/resume/analyze
 * Content-Type: multipart/form-data
 * resume: <file.pdf>
 * targetRole: "Software Engineer"
 * @example
 * 200 {
 *   "resumeScore": 85,
 *   "roleMatch": 90,
 *   "missingSkills": ["Docker"],
 *   "missingProjects": ["Open Source Contributions"],
 *   "atsCompatibility": {"status":"Good","remarks":"Document structure is parseable."},
 *   "suggestions": ["Add a summary section."]
 * }
 */
const { aiQueue } = require("../config/queue");

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No resume file uploaded" });
        }

        const targetRole = req.body.targetRole || "General Professional";
        
        const job = await aiQueue.add("analyze-resume", {
            targetRole,
            fileBuffer: req.file.buffer.toString("base64")
        });

        res.status(202).json({
            message: "Resume analysis job accepted",
            jobId: job.id,
        });

    } catch (error) {
        console.error("Resume Analysis Queue Error:", error);
        res.status(500).json({ message: "Failed to enqueue resume analysis", error: error.message });
    }
}

const Resume = require("../models/Resume");

/**
 * Save or update a user's resume record.
 * @route POST /api/resume/save
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When required fields are missing or save fails.
 * @example
 * POST /api/resume/save
 * Authorization: Bearer eyJhb...
 * {
 *   "title": "Senior Engineer Resume",
 *   "latexCode": "\\documentclass{article}...",
 *   "resumeId": "6426c5a5..." // optional for update
 * }
 * @example
 * 200 {"success": true, "resume": {"_id":"...","title":"..."}}
 */
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

/**
 * Retrieve saved resumes for the authenticated user.
 * @route GET /api/resume/my-resumes
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When retrieval fails.
 * @example
 * GET /api/resume/my-resumes
 * Authorization: Bearer eyJhb...
 * @example
 * 200 {"success": true, "resumes": [{"_id":"...","title":"...","latexCode":"..."}]}
 */
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
