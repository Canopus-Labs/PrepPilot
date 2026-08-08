// Determine backend base URL: prefer explicit env var, fallback to localhost:8000 for dev
export const BASE_URL =
    import.meta.env.VITE_BACKEND_URL?.trim() || "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    VERIFY_EMAIL: "/api/auth/verify-email",
    RESEND_VERIFICATION: "/api/auth/resend-verification",
    GET_PROFILE: "/api/auth/profile",

    UPDATE_PROFILE: "/api/auth/profile",
    CHANGE_PASSWORD: "/api/auth/change-password",
    DELETE_ACCOUNT: "/api/auth/delete-account",
    LOGOUT: "/api/auth/logout",
},
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate interview questions and answers using Gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Generate concept explanation using Gemini
        DIFFICULTY_ESTIMATE: "/api/ai/difficulty", // Estimate interview question difficulty
    },
    SESSION: {
        CREATE: "/api/sessions/create", // Create a new interview session with questions
        GET_ALL: "/api/sessions/my-sessions", // Get all user sessions
        GET_ONE: (id) => `/api/sessions/${id}`, // Get session details with questions
        DELETE: (id) => `/api/sessions/${id}`, // Delete a session
    },
    QUESTION: {
        ADD_TO_SESSION: "/api/question/add", // Add more questions to a session (fixed to match backend)
        PIN: (id) => `/api/question/${id}/pin`, // Pin or Unpin a question (fixed to match backend)
        UPDATE_NOTE: (id) => `/api/question/${id}/note`, // Update/Add a note to a question (fixed to match backend)
    },
    GOOGLE_CALENDAR: {
        CONNECT: "/api/google-calendar/connect",
        CALLBACK: "/api/google-calendar/callback",
        STATUS: "/api/google-calendar/status",
        EVENTS: "/api/google-calendar/events",
    },
    APTITUDE: {
        GENERATE: "/api/questions", // Generate aptitude questions
    },
    RESUME: {
        COMPILE: "/api/resume/compile", // Compile resume via texlive
        ANALYZE: "/api/resume/analyze", // AI Resume Analyzer via Gemini
        SAVE: "/api/resume/save", // Save resume to backend
        GET_ALL: "/api/resume/my-resumes", // Get all user's saved resumes
    },
    NOTES_SUMMARY: {
        SUMMARIZE: "/api/notes-summary/summarize", // AI PDF notes summarizer via Gemini
        SAVE: "/api/notes-summary/save", // Save a generated summary
        GET_ALL: "/api/notes-summary/my-summaries", // Get all user's saved summaries
        DELETE: (id) => `/api/notes-summary/${id}`, // Delete a saved summary
    },
    JOBS: {
        GET: "/api/jobs",  // GET /api/jobs?role=...&country=...
    },
    COURSES: {
        GET_ALL: "/api/courses", // GET all free courses
    },
    BEHAVIORAL: {
    ANALYZE: "/api/behavioral/analyze",
    },
    FLASHCARD: {
        CREATE: "/api/flashcards",
        GET_ALL: "/api/flashcards",
        GET_STATS: "/api/flashcards/stats",
        REVIEW: (id) => `/api/flashcards/${id}/review`,
        DELETE: (id) => `/api/flashcards/${id}`,
    },
    ROADMAP: {
        CREATE: "/api/roadmaps",
        GET_ALL: "/api/roadmaps",
        GET_ONE: (id) => `/api/roadmaps/${id}`,
        UPDATE: (id) => `/api/roadmaps/${id}`,
        TOGGLE_TASK: (id) => `/api/roadmaps/${id}/tasks`,
        DELETE: (id) => `/api/roadmaps/${id}`,
    },
};