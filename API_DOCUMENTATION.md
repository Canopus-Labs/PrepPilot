# PrepPilot Backend API Documentation

## Overview
This guide documents the backend API endpoints for PrepPilot. It includes endpoint paths, request and response examples, authentication requirements, and error cases.

> **Ground truth:** Route registration in `backend/server.js` is the authoritative source for all paths and prefixes. Run `node scripts/check-routes.js` to verify this document stays in sync.

---

## Authentication
Most protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Content types
- JSON body: `application/json`
- File upload: `multipart/form-data`

### Rate limits
| Limiter | Applied to | Window | Max requests |
|---|---|---|---|
| `authLimiter` | `/api/auth/register`, `/api/auth/login` | 15 min | 50 |
| `aiLimiter` | `/api/generate`, `/api/ai/generate`, `/api/resume/compile`, `/api/resume/analyze` | 1 hour | 20 |
| `generalLimiter` | All other routes | 15 min | 100 |

---

## Auth Routes

### Register User
- `POST /api/auth/register`
- Public (rate-limited: 50 req / 15 min per IP)

Password requirements: minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character from `@$!%*?&`.

Request Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass1@",
  "profileImageUrl": "https://example.com/avatar.png"
}
```
Response `201`:
```json
{
  "_id": "6426c5a5...",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "profileImageUrl": "https://example.com/avatar.png",
  "firstName": "Jane",
  "lastName": "Doe",
  "prepPilotId": "jane1234",
  "token": "eyJhb..."
}
```
Errors:
- `400` password does not meet requirements
- `400` user already exists
- `500` server error

---

### Login User
- `POST /api/auth/login`
- Public (rate-limited: 50 req / 15 min per IP)

Request Body:
```json
{
  "email": "jane@example.com",
  "password": "SecurePass1@"
}
```
Response `200`:
```json
{
  "_id": "6426c5a5...",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "profileImageUrl": "https://example.com/avatar.png",
  "token": "eyJhb..."
}
```
Errors:
- `401` invalid email or password
- `500` server error

---

### Get Profile
- `GET /api/auth/profile`
- Private

Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
Response `200`: Full user object (password excluded).

Errors:
- `401` not authorized / token failed
- `404` user not found
- `500` server error

---

### Update Profile
- `PUT /api/auth/profile`
- Private

All fields are optional — only supplied fields are updated.

Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
Request Body:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "bio": "Software Engineer",
  "country": "India",
  "profileImageUrl": "https://example.com/new-avatar.png",
  "visibility": "Public",
  "prepPilotId": "jane_dev",
  "educationDetails": {
    "school": "IIT Delhi",
    "degree": "B.Tech",
    "branch": "Computer Science",
    "graduationYear": "2024"
  },
  "profileDetails": {
    "aboutMe": "Passionate about open source.",
    "education": "B.Tech CSE",
    "achievements": "GSSoC contributor",
    "workExperience": "SDE Intern at XYZ",
    "socials": {
      "github": "https://github.com/jane",
      "linkedin": "https://linkedin.com/in/jane",
      "twitter": "https://twitter.com/jane",
      "portfolio": "https://jane.dev"
    }
  },
  "platformPreferences": {
    "theme": "dark",
    "notificationsEnabled": false
  }
}
```
Response `200`: Updated user object (password excluded).

Errors:
- `400` PrepPilot ID already taken
- `401` not authorized / token failed
- `404` user not found
- `500` server error

---

### Change Password
- `PUT /api/auth/change-password`
- Private

Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
Request Body:
```json
{
  "originalPassword": "OldPass1@",
  "newPassword": "NewPass2#"
}
```
Response `200`:
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```
Errors:
- `400` missing fields
- `400` incorrect original password
- `401` not authorized / token failed
- `404` user not found
- `500` server error

---

### Delete Account
- `DELETE /api/auth/delete-account`
- Private

Permanently deletes the authenticated user's account. This action is irreversible.

Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
Response `200`:
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```
Errors:
- `401` not authorized / token failed
- `404` user not found
- `500` server error

---

### Upload Profile Image
- `POST /api/auth/upload-image`
- Public — no authentication or rate limiter applied

> ⚠️ **Note for contributors:** This endpoint has no `protect` guard and no rate limiter. See [issue #128](https://github.com/Canopus-Labs/PrepPilot/issues/128) for the tracked remediation. Do not add features that depend on `req.user` in this handler until auth is added.

Form field:
- `image`: image file (multipart/form-data)

Response `200`:
```json
{
  "imageUrl": "http://localhost:5000/uploads/abc123.png"
}
```
Errors:
- `400` no file uploaded

---

## AI Routes

### Generate AI Text
- `POST /api/ai/generate`
- Public (rate-limited: 20 req / hour per IP)

> ⚠️ **Note:** The path is `/api/ai/generate`. An alias `/api/generate` also exists (same handler, same rate limit). Both are registered via `app.use("/api", aiRoutes)` in `server.js`. Prefer `/api/ai/generate` for clarity.

Request Body:
```json
{
  "prompt": "Explain event delegation in JavaScript."
}
```
Response `200`:
```json
{
  "text": "Event delegation is...",
  "model": "models/gemini-2.5-flash"
}
```
Errors:
- `400` missing prompt
- `500` generation failed

---

### List Available Models
- `GET /api/models`
- Public

> ⚠️ **Note:** Registered via `app.use("/api", aiRoutes)` — the effective path is `/api/models`. Availability depends on the `GEMINI_API_KEY` in use and the caller's region.

Response `200`:
```json
{
  "availableModels": ["gemini-2.5-flash", "gemini-flash-latest"],
  "configured": "models/gemini-2.5-flash",
  "note": "Actual availability depends on your API key & region. Set GEMINI_MODEL in .env to force a specific one."
}
```
Errors:
- `500` failed to list models

---

### Generate Interview Questions
- `POST /api/ai/generate-questions`
- Private

Request Body:
```json
{
  "role": "Frontend Engineer",
  "experience": "2 years",
  "topicsToFocus": ["React", "JavaScript"],
  "numberOfQuestions": 5
}
```
Response `200`:
```json
{
  "model": "models/gemini-2.5-flash",
  "question": [
    {"question": "Explain the virtual DOM.", "answer": "..."}
  ]
}
```
Errors:
- `400` missing required fields
- `500` Gemini generation failed

---

### Generate Concept Explanation
- `POST /api/ai/generate-explanation`
- Private

Request Body:
```json
{
  "question": "What is a closure in JavaScript?"
}
```
Response `200`:
```json
{
  "model": "models/gemini-2.5-flash",
  "explanation": "..."
}
```
Errors:
- `400` missing question
- `500` Gemini generation failed

---

## Session Routes

### Create Session
- `POST /api/sessions/create`
- Private

Request Body:
```json
{
  "role": "Backend Engineer",
  "experience": "3 years",
  "topicsToFocus": ["Node.js", "Databases"],
  "description": "Prepare for backend interview",
  "question": [{"question": "Explain ACID properties", "answer": "..."}]
}
```
Response `201`:
```json
{
  "success": true,
  "session": {
    "_id": "6426c5a5...",
    "role": "Backend Engineer",
    "experience": "3 years",
    "description": "Prepare for backend interview",
    "questions": ["..."]
  }
}
```
Errors:
- `403` session limit reached (default max: 50)
- `500` server error

---

### Get My Sessions
- `GET /api/sessions/my-sessions`
- Private

Response `200`:
```json
[
  {"_id": "...", "role": "...", "questions": [...]}
]
```
Errors:
- `500` server error

---

### Get Session By ID
- `GET /api/sessions/:id`
- Private

Response `200`:
```json
{
  "success": true,
  "session": {
    "_id": "6426c5a5...",
    "questions": []
  }
}
```
Errors:
- `404` session not found
- `500` server error

---

### Delete Session
- `DELETE /api/sessions/:id`
- Private

Response `200`:
```json
{
  "message": "Session delete sucessfully"
}
```
Errors:
- `401` not authorized to delete this session
- `404` session not found
- `500` server error

---

## Question Routes

### Add Question to Session
- `POST /api/question/add`
- Private

Request Body:
```json
{
  "sessionId": "6426c5a5...",
  "questions": [
    {"question": "What is polymorphism?", "answer": "..."}
  ]
}
```
Response `200`:
```json
[
  {"_id": "...", "session": "...", "question": "...", "answer": "..."}
]
```
Errors:
- `400` invalid input data
- `404` session not found
- `500` server error

---

### Pin/Unpin Question
- `POST /api/question/:id/pin`
- Private

Response `200`:
```json
{
  "success": true,
  "question": {"_id": "...", "isPinned": true}
}
```
Errors:
- `404` question not found
- `500` server error

---

### Update Question Note
- `POST /api/question/:id/note`
- Private

Request Body:
```json
{
  "note": "Add more detail about the answer flow."
}
```
Response `200`:
```json
{
  "success": true,
  "question": {"_id": "...", "note": "..."}
}
```
Errors:
- `404` question not found
- `500` server error

---

## Resume Routes

### Compile Resume
- `POST /api/resume/compile`
- Private (rate-limited: 20 req / hour per IP)

> ⚠️ **External dependency:** This endpoint proxies to [texlive.net](https://texlive.net), a public LaTeX compilation service. Network failures or texlive.net downtime will surface as 500 errors. Authentication and rate limiting are applied to prevent billing abuse.

Request Body:
```json
{
  "code": "\\documentclass{article}..."
}
```
Response `200`: PDF binary (`Content-Type: application/pdf`)

Errors:
- `400` no LaTeX code provided
- `400` LaTeX syntax error (includes partial compiler log)
- `500` compilation failed

---

### Analyze Resume
- `POST /api/resume/analyze`
- Private (rate-limited: 20 req / hour per IP)

> ⚠️ **External dependency:** This endpoint sends the uploaded PDF to the **Gemini API** (paid quota). Authentication and rate limiting are applied to prevent quota exhaustion.

Form fields (multipart/form-data):
- `resume`: PDF file (required)
- `targetRole`: string (optional, default: `"General Professional"`)

Response `200`:
```json
{
  "resumeScore": 85,
  "roleMatch": 90,
  "missingSkills": ["Docker"],
  "missingProjects": ["Open Source Contributions"],
  "atsCompatibility": {"status": "Good", "remarks": "Document structure is parseable."},
  "suggestions": ["Add a summary section."]
}
```
Errors:
- `400` no resume file uploaded
- `500` AI analysis failed

---

### Save Resume
- `POST /api/resume/save`
- Private

Request Body:
```json
{
  "title": "Senior Engineer Resume",
  "latexCode": "\\documentclass{article}...",
  "resumeId": "6426c5a5..."
}
```
> `resumeId` is optional. If provided, the matching resume is updated. If omitted, a new resume is created.

Response `200`:
```json
{
  "success": true,
  "resume": {"_id": "...", "title": "...", "latexCode": "..."}
}
```
Errors:
- `400` title or LaTeX code missing
- `500` server error

---

### Get My Resumes
- `GET /api/resume/my-resumes`
- Private

Response `200`:
```json
{
  "success": true,
  "resumes": [
    {"_id": "...", "title": "...", "latexCode": "..."}
  ]
}
```
Errors:
- `500` server error

---

## Books Routes

### List Books
- `GET /api/books/`
- Public

Response `200`:
```json
{
  "categories": [
    {
      "id": "algorithms",
      "title": "Algorithms",
      "count": 10,
      "items": [{"id": "...", "name": "...", "size": 1234, "url": "..."}]
    }
  ],
  "warnings": []
}
```
Errors:
- `500` failed to load books

---

### Download Book File
- `GET /api/books/download?url=<raw_file_url>`
- Public

Response: Redirect to the GitHub raw file URL

Errors:
- `400` url query is required

---

## User Sheet Progress Routes

### Save Progress
- `POST /api/user/sheet-progress`
- Private

Request Body:
```json
{
  "sheetId": "arrays",
  "followed": true,
  "completedTopics": ["Two Pointers", "Sliding Window"],
  "percentage": 60
}
```
Response `200`:
```json
{
  "success": true,
  "progress": {"sheetId": "arrays", "percentage": 60}
}
```
Errors:
- `500` server error

---

### Get Progress by Sheet
- `GET /api/user/sheet-progress/:sheetId`
- Private

Response `200`:
```json
{
  "success": true,
  "progress": {"sheetId": "arrays", "percentage": 60}
}
```
Errors:
- `500` server error

---

### Get All Progress
- `GET /api/user/sheet-progress`
- Private

Response `200`:
```json
{
  "success": true,
  "progressList": [
    {"sheetId": "arrays", "percentage": 60}
  ]
}
```

---

## Achievement Routes

### Get Achievements
- `GET /api/user/achievements`
- Private

Response `200`:
```json
{
  "success": true,
  "unlockedAchievements": ["first_session", "streak_7"]
}
```
Errors:
- `500` server error

---

### Save Achievements
- `POST /api/user/achievements`
- Private

Request Body:
```json
{
  "unlockedAchievements": ["first_session", "streak_7"]
}
```
Response `200`:
```json
{
  "success": true
}
```
Errors:
- `500` server error

---

## Testing Endpoint

### Health Check
- `GET /api/test`
- Public

Response `200`:
```json
{
  "message": "API is working!"
}