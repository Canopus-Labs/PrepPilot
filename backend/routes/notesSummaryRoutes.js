const express = require("express");
const router = express.Router();
const {
  summarizeNotes,
  saveSummary,
  getMySummaries,
  deleteSummary,
} = require("../controllers/notesSummaryController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadNotes } = require("../middlewares/uploadMiddleware");
const { aiLimiter } = require("../middlewares/rateLimiter");
const {
  validateSummarizeNotes,
  validateSaveNotesSummary,
} = require("../Input_validators/ValidateNotesSummary");

const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "PDF is too large. Please upload a file under 15MB.",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || "Failed to process the uploaded file.",
    });
  }
  next();
};

router.use(protect);

router.post(
  "/summarize",
  aiLimiter,
  uploadNotes.single("pdf"),
  handleUploadErrors,
  validateSummarizeNotes,
  summarizeNotes
);

router.post("/save", validateSaveNotesSummary, saveSummary);


router.get("/my-summaries", getMySummaries);

router.delete("/:id", deleteSummary);

module.exports = router;