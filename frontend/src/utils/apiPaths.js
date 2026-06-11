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
},
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate interview questions and answers using Gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Generate concept explanation using Gemini
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
    APTITUDE: {
        GENERATE: "/api/questions", // Generate aptitude questions
    },
    RESUME: {
        COMPILE: "/api/resume/compile", // Compile resume via texlive
        ANALYZE: "/api/resume/analyze", // AI Resume Analyzer via Gemini
        SAVE: "/api/resume/save", // Save resume to backend
        GET_ALL: "/api/resume/my-resumes", // Get all user's saved resumes
        GET_ONE: (id) => `/api/resume/${id}`, // Get one saved resume
        UPDATE: (id) => `/api/resume/${id}`, // Update a saved resume
        DELETE: (id) => `/api/resume/${id}`, // Delete a saved resume
    }
};
