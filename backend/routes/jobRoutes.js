const express = require("express");
const router = express.Router();
const { aiQueue } = require("../config/queue");
const { generalLimiter } = require("../middlewares/rateLimiter");
const { protect } = require("../middlewares/authMiddleware"); // Optional, but usually good

/**
 * Get job status and result.
 * @route GET /api/jobs/:jobId
 */
router.get("/:jobId", generalLimiter, async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await aiQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const state = await job.getState();

    if (state === "completed") {
      return res.status(200).json({
        state,
        result: job.returnvalue,
      });
    }

    if (state === "failed") {
      return res.status(500).json({
        state,
        message: job.failedReason,
      });
    }

    // waiting, active, delayed, etc.
    return res.status(200).json({
      state,
      message: `Job is currently ${state}`,
    });
  } catch (error) {
    console.error("Error fetching job status:", error);
    res.status(500).json({
      message: "Failed to fetch job status",
      error: error.message,
    });
  }
});

module.exports = router;
