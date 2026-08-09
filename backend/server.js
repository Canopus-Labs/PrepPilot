require("dotenv").config();
const validateEnv = require("./config/validateEnv.js");
validateEnv();
const express = require("express");

// Global unhandled promise rejection handler
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

const path = require("path");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
  generateInterviewTips,
} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aptitudeQuestionsRoutes = require("./routes/AptitudeQuestions.js");
const jobRoutes = require("./routes/jobRoutes");
const { generalLimiter, aiLimiter } = require("./middlewares/rateLimiter");
const { generalHeaders, sensitiveRouteHeaders } = require("./middlewares/securityHeaders");
const { uploadsStaticHeaders } = require("./middlewares/uploadMiddleware");
const app = express();

// Trust X-Forwarded-For only when it comes from a known reverse proxy. The
// previous blanket `trust proxy: 1` let any client spoof the header and rotate
// their IP on every request, defeating every rate limiter. With no CIDR
// configured the header is ignored entirely and req.ip is the direct socket
// address, so it cannot be reset by the caller.
const reverseProxyCidrs = (process.env.REVERSE_PROXY_CIDR || "")
  .split(",")
  .map((cidr) => cidr.trim())
  .filter(Boolean);
if (reverseProxyCidrs.length > 0) {
  app.set("trust proxy", reverseProxyCidrs);
}
app.use(generalHeaders);
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
  // Exact-origin allowlist only (FRONTEND_ORIGIN / EXTRA_ORIGINS, plus
  // localhost in dev). No regex wildcard matching of third-party-registrable
  // domains like *.onrender.com — anyone can register an attacker subdomain
  // that would otherwise be granted credentialed CORS access.
  const localhostPattern =
    /^http:\/\/(localhost|127\.0\.0\.1):(5\d{3}|3\d{3})$/;
  if (
    origin &&
    (allowedOrigins.has(origin) || localhostPattern.test(origin))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
  } else if (origin) {
    if (!global.__rejectedCors) global.__rejectedCors = new Set();
    if (!global.__rejectedCors.has(origin)) {
      global.__rejectedCors.add(origin);
      console.warn("[CORS] Rejected origin:", origin);
    }
    if (req.method === "OPTIONS") {
      return res.sendStatus(403);
    }
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-requested-with");
    return res.sendStatus(200);
  }
  next();
});

connectDB()
  .then((success) => {
    if (success) {
      console.log("MongoDB connected successfully");
    } else {
      console.warn("⚠️ Failed to connect to MongoDB - server will run without database connection");
    }
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", sensitiveRouteHeaders,authRoutes);
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
const { validateGenerateInterviewQuestions, validateGenerateConceptExplanation, validateGenerateInterviewTips } = require("./Input_validators/ValidateAi.js");
app.use("/api/resume", generalLimiter, resumeRoutes);
const notesSummaryRoutes = require("./routes/notesSummaryRoutes");
app.use("/api/notes-summary", generalLimiter, notesSummaryRoutes);

// AI routes with Zod validation
app.post(
  "/api/ai/generate-questions",
  sensitiveRouteHeaders,
  aiLimiter,
  protect,
  validateGenerateInterviewQuestions, // Zod validator
  generateInterviewQuestions          // Controller
);

app.post(
  "/api/ai/generate-explanation",
  sensitiveRouteHeaders,
  aiLimiter,
  protect,
  validateGenerateConceptExplanation, // Zod validator
  generateConceptExplanation          // Controller
);

app.post(
  "/api/ai/generate-tips",
  sensitiveRouteHeaders,
  aiLimiter,
  protect,
  validateGenerateInterviewTips,      // Zod validator
  generateInterviewTips               // Controller
);


app.use("/api/books", generalLimiter, booksRoutes);
app.use("/api/jobs", generalLimiter, jobRoutes);
const coursesRoutes = require("./routes/coursesRoutes");
app.use("/api/courses", generalLimiter, coursesRoutes);
const flashcardRoutes = require("./routes/flashcardRoutes");
app.use("/api/flashcards", generalLimiter, flashcardRoutes);
const roadmapRoutes = require("./routes/roadmapRoutes");
app.use("/api/roadmaps", roadmapRoutes);
const interviewExperienceRoutes = require("./routes/interviewExperienceRoutes");
app.use("/api/interview-experiences", generalLimiter, interviewExperienceRoutes);
const compilerRoutes = require("./routes/compilerRoutes");
app.use("/api/compiler", compilerRoutes);


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: uploadsStaticHeaders,
  })
);

// Debug route to verify backend is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});


if (process.env.ADZUNA_APP_ID && process.env.ADZUNA_API_KEY) {
  const { refreshJobCache } = require("./controllers/jobController");
  refreshJobCache();
  setInterval(refreshJobCache, 24 * 60 * 60 * 1000);
}

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
