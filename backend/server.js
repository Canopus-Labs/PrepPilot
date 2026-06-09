require("dotenv").config();
const validateEnv = require("./config/validateEnv.js");
validateEnv();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");
// const Question = require("./models/Question");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aptitudeQuestionsRoutes = require("./routes/AptitudeQuestions.js");
const { generalLimiter, aiLimiter } = require("./middlewares/rateLimiter");
// Remove ES Module import for cors. Use CommonJS require below.
const app = express();

app.set("trust proxy", 1);
// CORS settings: derive from env
// FRONTEND_ORIGIN=primary production frontend
// EXTRA_ORIGINS=comma separated additional origins (staging, preview, etc.)
const isDev = process.env.NODE_ENV !== "production";
const originEnvList = [
  process.env.FRONTEND_ORIGIN,
  ...(process.env.EXTRA_ORIGINS ? process.env.EXTRA_ORIGINS.split(",") : []),
  ...(isDev ? ["http://localhost:5173", "http://localhost:5174"] : []),
]
  .filter(Boolean)
  .map((o) => o.trim());

const allowedOrigins = new Set(originEnvList);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const renderPattern =
    /^https:\/\/(?:interview-prep(?:aration)?-ai|preppilot-backend)-[a-z0-9-]+\.onrender\.com$/;
  const localhostPattern =
    /^http:\/\/(localhost|127\.0\.0\.1):(5\d{3}|3\d{3})$/;
  if (
    origin &&
    (allowedOrigins.has(origin) ||
      renderPattern.test(origin) ||
      localhostPattern.test(origin))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
  } else if (origin) {
    // Debug log for rejected origins (only once per process for each origin)
    if (!global.__rejectedCors) global.__rejectedCors = new Set();
    if (!global.__rejectedCors.has(origin)) {
      global.__rejectedCors.add(origin);
      console.warn("[CORS] Rejected origin:", origin);
    }
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

connectDB()
  .then((success) => {
    if (success) {
      console.log("MongoDB connected successfully");
    } else {
      console.warn(
        "⚠️ Failed to connect to MongoDB - server will run without database connection",
      );
    }
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", generalLimiter, sessionRoutes);
app.use("/api/question", generalLimiter, questionRoutes);
app.use("/api", aiRoutes);
app.use("/api/questions", generalLimiter, aptitudeQuestionsRoutes);
const sheetJsonUpload = require("./routes/sheetJsonUpload");
app.use("/api/sheets", generalLimiter, sheetJsonUpload);
const userSheetProgressRoutes = require("./routes/userSheetProgressRoutes");
app.use("/api/user", generalLimiter, userSheetProgressRoutes);
const achievementRoutes = require("./routes/achievementRoutes");
app.use("/api/user", generalLimiter, achievementRoutes);
const booksRoutes = require("./routes/booksRoutes");
const { required } = require("joi");
app.use("/api/resume", generalLimiter, resumeRoutes);
app.use(
  "/api/ai/generate-questions",
  aiLimiter,
  protect,
  generateInterviewQuestions,
);
app.use(
  "/api/ai/generate-explanation",
  aiLimiter,
  protect,
  generateConceptExplanation,
);
const bookmarkRoutes = require("./routes/bookmarkRoutes");
app.use("/api/bookmarks", generalLimiter, bookmarkRoutes);
app.use("/api/books", generalLimiter, booksRoutes);

//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Debug route to verify backend is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Remove duplicate CORS middleware (already set above)

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server connected and running on port ${PORT}`);
  if (process.env.NODE_ENV === "production") {
    console.log("Allowed CORS origins (production):");
  } else {
    console.log("Allowed CORS origins (development):");
  }
  for (const o of allowedOrigins) {
    console.log("  -", o);
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Please free the port or use a different one.`,
    );
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
