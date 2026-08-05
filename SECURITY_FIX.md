# Security Fix: Sanitize AI Prompt Inputs

## Summary
This PR adds input sanitization for AI prompts to prevent prompt injection attacks.

## Problem
User inputs are passed directly to the Gemini AI without sanitization, risking prompt injection attacks.

## Solution
Implement input sanitization before including user inputs in prompts.

## Changes Required

### 1. Add Sanitization Utility
Create `backend/utils/sanitizeInput.js`:

```javascript
/**
 * Sanitizes user input before including in AI prompts
 * Prevents prompt injection attacks
 */
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  
  return input
    .slice(0, 500) // Limit length
    .replace(/[<>]/g, "") // Remove potential HTML
    .replace(/[{}\[\]]/g, "") // Remove template syntax
    .replace(/\\n|\\r/g, " ") // Normalize whitespace
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .trim();
};

module.exports = { sanitizeInput };
```

### 2. Update AI Controller
In `backend/controllers/aiController.js`:

```javascript
const { sanitizeInput } = require("../utils/sanitizeInput");

// In generateInterviewQuestions function:
const prompt = questionAnswerPrompt({
  role: sanitizeInput(role),
  experience: sanitizeInput(experience),
  topicsToFocus: topicsToFocus?.map(sanitizeInput),
  numberOfQuestions: Math.min(numberOfQuestions || 5, 20),
  seenQuestions,
});
```

### 3. Add Rate Limiting (if not present)
In `backend/middlewares/rateLimiter.js`:

```javascript
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 AI requests per user per 15 minutes
  keyGenerator: (req) => req.user?._id || req.ip,
  message: "Too many AI requests, please try again later"
});

module.exports = { aiLimiter };
```

### 4. Apply to Routes
```javascript
const { aiLimiter } = require("./middlewares/rateLimiter");

app.post("/api/ai/generate-questions", aiLimiter, protect, generateInterviewQuestions);
```

## References
- Fixes #1258
- Reported by automated bug hunter
