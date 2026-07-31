const axios = require("axios");
const crypto = require("crypto");
const { generateWithFallback } = require("../utils/geminiHelper");
const {
  inspectPdfBuffer,
  computeReadingTime,
  PdfIntegrityError,
} = require("../utils/pdfIntegrity");
const { aiOutputSchema } = require("../Input_validators/ValidateNotesSummary");
const { NOTES_MAX_FILE_SIZE } = require("../middlewares/uploadMiddleware");
const NotesSummary = require("../models/NotesSummary");


const ALLOWED_REMOTE_HOSTS = new Set(["raw.githubusercontent.com"]);
const MAX_SAVED_SUMMARIES_PER_USER = 30;

/**
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
async function fetchRemotePdf(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new PdfIntegrityError("The provided URL is not valid.");
  }

  if (parsed.protocol !== "https:") {
    throw new PdfIntegrityError("PDF URLs must use https.");
  }
  if (!ALLOWED_REMOTE_HOSTS.has(parsed.hostname)) {
    throw new PdfIntegrityError("This PDF source is not allowed.");
  }

  try {
    const response = await axios.get(parsed.toString(), {
      responseType: "arraybuffer",
      timeout: 20000,
      maxContentLength: NOTES_MAX_FILE_SIZE,
      maxBodyLength: NOTES_MAX_FILE_SIZE,
      headers: { Accept: "application/pdf" },
    });
    return Buffer.from(response.data);
  } catch (err) {
    if (err.code === "ERR_FR_MAX_CONTENT_LENGTH_EXCEEDED") {
      throw new PdfIntegrityError(
        "That PDF is too large to summarize (limit 15MB)."
      );
    }
    throw new PdfIntegrityError(
      "Could not download that PDF from the platform. It may have moved."
    );
  }
}

/**
 * @param {string} raw
 * @returns {object}
 */
function parseAiJson(raw) {
  let cleaned = raw
    .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
    .replace(/(\s*```\s*)+$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Model response was not valid JSON");
  }
}

/**
 * @route 
 * @access 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @example
 * @example
 * @example
 */
const summarizeNotes = async (req, res) => {
  try {
    let buffer;
    let fileName;
    let sourceType;
    let sourceUrl = null;

    if (req.file) {
      buffer = req.file.buffer;
      fileName = req.file.originalname;
      sourceType = "upload";
    } else {
      sourceUrl = req.body.url;
      fileName = req.body.fileName || sourceUrl.split("/").pop() || "notes.pdf";
      sourceType = "platform";
      try {
        buffer = await fetchRemotePdf(sourceUrl);
      } catch (err) {
        if (err instanceof PdfIntegrityError) {
          return res.status(400).json({ success: false, message: err.message });
        }
        throw err;
      }
    }

    let pdfStats;
    try {
      pdfStats = await inspectPdfBuffer(buffer);
    } catch (err) {
      if (err instanceof PdfIntegrityError) {
        return res.status(400).json({ success: false, message: err.message });
      }
      throw err;
    }

    const readingTime = computeReadingTime(pdfStats);
    const contentHash = crypto.createHash("sha256").update(buffer).digest("hex");

    const prompt = `You are an expert academic tutor helping a student decide whether a set of study notes is useful before they read it.

The attached PDF has ${pdfStats.numPages} page(s) and roughly ${pdfStats.wordCount} extractable word(s)${pdfStats.isLikelyScanned ? " (it appears to be mostly scanned/image content, so rely on what you can visually infer)" : ""}.

Return the analysis STRICTLY as a JSON object with this exact shape and nothing else:
{
  "summary": "2-4 sentence overview of the main topics, key concepts, and purpose of the document",
  "topics": {
    "chapters": [array of up to 6 short major chapter/section names],
    "subtopics": [array of up to 6 short subtopic names],
    "keywords": [array of up to 10 short frequently-occurring keywords/terms]
  },
  "prerequisites": [array of up to 5 short prior-knowledge items a reader should have before studying this],
  "difficulty": {
    "level": "Beginner" | "Intermediate" | "Advanced",
    "explanation": "one sentence justifying the difficulty rating"
  },
  "learningOutcomes": [array of up to 5 short statements describing what a student should be able to do after completing these notes]
}

DO NOT wrap the response in markdown code blocks. Return ONLY the raw JSON object. Do not include a readingTime field — that is calculated separately.`;

    const { result } = await generateWithFallback(
      process.env.GEMINI_API_KEY.trim(),
      [
        prompt,
        {
          inlineData: {
            data: buffer.toString("base64"),
            mimeType: "application/pdf",
          },
        },
      ]
    );

    const rawText = await result.response.text();

    let parsed;
    try {
      parsed = parseAiJson(rawText);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", rawText);
      return res.status(502).json({
        success: false,
        message: "The AI response couldn't be understood. Please try again.",
      });
    }

    const validated = aiOutputSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("AI output failed schema validation:", validated.error.issues);
      return res.status(502).json({
        success: false,
        message: "The AI response was malformed. Please try again.",
      });
    }

    const data = validated.data;

    res.status(200).json({
      success: true,
      fileName,
      fileSize: buffer.length,
      sourceType,
      sourceUrl,
      pageCount: pdfStats.numPages,
      wordCount: pdfStats.wordCount,
      contentHash,
      summary: data.summary,
      topics: data.topics,
      prerequisites: data.prerequisites,
      difficulty: data.difficulty,
      readingTime,
      learningOutcomes: data.learningOutcomes,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Notes Summary Error:", error);
    if (error instanceof PdfIntegrityError) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const geminiStatus = error?.status || error?.code;
    if (geminiStatus === 429) {
      return res.status(429).json({
        success: false,
        message:
          "The AI service has no available quota on this API key right now. Check the Gemini API plan/billing for this key, or try again in a minute.",
      });
    }
    if (geminiStatus === 503) {
      return res.status(503).json({
        success: false,
        message: "The AI service is temporarily unavailable. Please try again shortly.",
      });
    }

    res.status(500).json({ success: false, message: "Failed to summarize notes." });
  }
};

/**
 * @route POST /api/notes-summary/save
 * @access Private
 */
const saveSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const payload = req.body;

    const summary = await NotesSummary.findOneAndUpdate(
      { user: userId, fileName: payload.fileName },
      { user: userId, ...payload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const count = await NotesSummary.countDocuments({ user: userId });
    if (count > MAX_SAVED_SUMMARIES_PER_USER) {
      const excess = await NotesSummary.find({ user: userId })
        .sort({ updatedAt: 1 })
        .limit(count - MAX_SAVED_SUMMARIES_PER_USER)
        .select("_id");
      await NotesSummary.deleteMany({ _id: { $in: excess.map((d) => d._id) } });
    }

    res.status(200).json({ success: true, summary: summary.toSafeObject() });
  } catch (error) {
    console.error("Save Notes Summary Error:", error);
    res.status(500).json({ success: false, message: "Failed to save summary." });
  }
};

/**
 * @route GET /api/notes-summary/my-summaries
 * @access Private
 */
const getMySummaries = async (req, res) => {
  try {
    const summaries = await NotesSummary.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json({
      success: true,
      summaries: summaries.map((s) => s.toSafeObject()),
    });
  } catch (error) {
    console.error("Get Notes Summaries Error:", error);
    res.status(500).json({ success: false, message: "Failed to load saved summaries." });
  }
};

/**
 * @route DELETE /api/notes-summary/:id
 * @access Private
 */
const deleteSummary = async (req, res) => {
  try {
    const summary = await NotesSummary.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!summary) {
      return res.status(404).json({ success: false, message: "Summary not found." });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete Notes Summary Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete summary." });
  }
};

module.exports = { summarizeNotes, saveSummary, getMySummaries, deleteSummary };