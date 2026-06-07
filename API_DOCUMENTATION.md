# PrepPilot Backend API Documentation

## Overview
This guide documents the backend API endpoints for PrepPilot. It includes endpoint paths, request and response examples, authentication requirements, and error cases.

---

## Authentication
Most protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Content types
- JSON body: `application/json`
- File upload: `multipart/form-data`

---

## Auth Routes

### Register User
- `POST /api/auth/register`
- Public

Request Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePass123",
  "profileImageUrl": "https://example.com/avatar.png"
}
```
Response:
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
- `400` user already exists
- `500` server error

### Login User
- `POST /api/auth/login`
- Public

Request Body:
```json
{
  "email": "jane@example.com",
  "password": "securePass123"
}
```
Response:
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
- `400` invalid credentials
- `500` server error

### Get Profile
- `GET /api/auth/profile`
- Private

Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
Response:
```json
{
  "_id": "6426c5a5...",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "profileImageUrl": "https://example.com/avatar.png"
}
```
Errors:
- `404` user not found
- `500` server error

### Upload Profile Image
- `POST /api/auth/upload-image`
- Public
- Multipart form upload

Form field:
- `image`: image file

Response:
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
- `POST /api/generate`
- `POST /api/ai/generate`
- Public

Request Body:
```json
{
  "prompt": "Explain event delegation in JavaScript."
}
```
Response:
```json
{
  "text": "Event delegation is...",
  "model": "models/gemini-2.5-flash"
}
```
Errors:
- `400` missing prompt
- `500` generation failed

### List Available Models
- `GET /api/models`
- Public

Response:
```json
{
  "availableModels": ["gemini-2.5-flash", "gemini-flash-latest"],
  "configured": "models/gemini-2.5-flash",
  "note": "Actual availability depends on your API key & region. Set GEMINI_MODEL in .env to force a specific one."
}
```
Errors:
- `500` failed to list models

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
Response:
```json
{
  "model": "models/gemini-2.5-flash",
  "question": [
    {"question": "Explain the virtual DOM.", "answer": "..."},
    ...
  ]
}
```
Errors:
- `400` missing required fields
- `500` Gemini generation failed

### Generate Concept Explanation
- `POST /api/ai/generate-explanation`
- Private

Request Body:
```json
{
  "question": "What is a closure in JavaScript?"
}
```
Response:
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
  "question": [{"question":"Explain ACID properties","answer":"..."}]
}
```
Response:
```json
{
  "success": true,
  "session": {
    "_id": "6426c5a5...",
    "role": "Backend Engineer",
    "experience": "3 years",
    "description": "Prepare for backend interview",
    "questions": ["..."],
    ...
  }
}
```
Errors:
- `403` session limit reached
- `500` server error

### Get My Sessions
- `GET /api/sessions/my-sessions`
- Private

Response:
```json
[
  {"_id":"...","role":"...","questions":[...]},
  ...
]
```
Errors:
- `500` server error

### Get Session By ID
- `GET /api/sessions/:id`
- Private

Response:
```json
{
  "success": true,
  "session": {
    "_id": "6426c5a5...",
    "questions": [ ... ]
  }
}
```
Errors:
- `404` session not found
- `500` server error

### Delete Session
- `DELETE /api/sessions/:id`
- Private

Response:
```json
{
  "message": "Session delete sucessfully"
}
```
Errors:
- `401` not authorized
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
Response:
```json
[
  {"_id":"...","session":"...","question":"...","answer":"..."}
]
```
Errors:
- `400` invalid input data
- `404` session not found
- `500` server error

### Pin/Unpin Question
- `POST /api/question/:id/pin`
- Private

Response:
```json
{
  "success": true,
  "question": {"_id":"...","isPinned": true, ...}
}
```
Errors:
- `404` question not found
- `500` server error

### Update Question Note
- `POST /api/question/:id/note`
- Private

Request Body:
```json
{
  "note": "Add more detail about the answer flow."
}
```
Response:
```json
{
  "success": true,
  "question": {"_id":"...","note":"..."}
}
```
Errors:
- `404` question not found
- `500` server error

---

## Resume Routes

### Compile Resume
- `POST /api/resume/compile`
- Public

Request Body:
```json
{
  "code": "\\documentclass{article}..."
}
```
Response:
- PDF binary

Errors:
- `400` no LaTeX code provided
- `500` compilation failed

### Analyze Resume
- `POST /api/resume/analyze`
- Public
- Multipart form upload

Form fields:
- `resume`: PDF file
- `targetRole`: optional string

Response:
```json
{
  "resumeScore": 85,
  "roleMatch": 90,
  "missingSkills": ["Docker"],
  "missingProjects": ["Open Source Contributions"],
  "atsCompatibility": {"status":"Good","remarks":"Document structure is parseable."},
  "suggestions": ["Add a summary section."]
}
```
Errors:
- `400` no resume file uploaded
- `500` AI analysis failed

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
Response:
```json
{
  "success": true,
  "resume": {"_id":"...","title":"...","latexCode":"..."}
}
```
Errors:
- `400` title or LaTeX code missing
- `500` server error

### Get My Resumes
- `GET /api/resume/my-resumes`
- Private

Response:
```json
{
  "success": true,
  "resumes": [
    {"_id":"...","title":"...","latexCode":"..."}
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

Response:
```json
{
  "categories": [
    {
      "id": "algorithms",
      "title": "Algorithms",
      "count": 10,
      "items": [
        {"id":"...","name":"...","size":1234,"url":"..."}
      ]
    }
  ],
  "warnings": []
}
```
Errors:
- `500` failed to load books

### Download Book File
- `GET /api/books/download?url=<raw_file_url>`
- Public

Response:
- Redirect to the GitHub raw file URL

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
  "completedTopics": ["Two Pointers","Sliding Window"],
  "percentage": 60
}
```
Response:
```json
{
  "success": true,
  "progress": {"sheetId":"arrays","percentage":60}
}
```
Errors:
- `500` server error

### Get Progress by Sheet
- `GET /api/user/sheet-progress/:sheetId`
- Private

Response:
```json
{
  "success": true,
  "progress": {"sheetId":"arrays","percentage":60}
}
```
Errors:
- `500` server error

### Get All Progress
- `GET /api/user/sheet-progress`
- Private

Response:
```json
{
  "success": true,
  "progressList": [
    {"sheetId":"arrays","percentage":60},
    ...
  ]
}
```

---

## Testing Endpoint

### Health Check
- `GET /api/test`
- Public

Response:
```json
{
  "message": "API is working!"
}
```

---

## Bookmarks Routes

### Create Bookmark
- `POST /api/bookmarks`
- Private

Request Body:
```json
{
  "resourceId": "exp-1",
  "resourceType": "INTERVIEW_EXPERIENCE",
  "title": "Google SWE Interview",
  "description": "5-round process spanning 3 weeks",
  "metadata": {
    "company": "Google",
    "difficulty": "Hard",
    "offerReceived": true
  }
}
```

Supported resource types:
- `AI_QUESTION`
- `DSA`
- `APTITUDE`
- `BOOK`
- `PROJECT`
- `INTERVIEW_EXPERIENCE`

Response:
```json
{
  "success": true,
  "bookmark": {
    "_id": "6426c5a5...",
    "user": "6426c5a5...",
    "resourceId": "exp-1",
    "resourceType": "INTERVIEW_EXPERIENCE",
    "title": "Google SWE Interview",
    "description": "5-round process spanning 3 weeks",
    "metadata": { "company": "Google", "difficulty": "Hard" },
    "createdAt": "2026-06-06T...",
    "updatedAt": "2026-06-06T..."
  }
}
```
Errors:
- `400` missing required fields or invalid resourceType
- `409` resource already bookmarked (duplicate)
- `401` not authorized
- `500` server error

### Get Bookmarks
- `GET /api/bookmarks`
- Private

Query Parameters:
| Parameter | Type   | Default | Description |
|-----------|--------|---------|-------------|
| type      | string | -       | Filter by resourceType (e.g., `BOOK`) |
| search    | string | -       | Search in title and description |
| page      | number | 1       | Page number |
| limit     | number | 20      | Items per page (max 100) |

Examples:
```
GET /api/bookmarks
GET /api/bookmarks?type=BOOK
GET /api/bookmarks?search=algorithm&page=1&limit=10
```

Response:
```json
{
  "success": true,
  "bookmarks": [
    { "_id": "...", "resourceId": "...", "resourceType": "BOOK", "title": "...", ... }
  ],
  "total": 42,
  "page": 1,
  "totalPages": 3
}
```
Errors:
- `401` not authorized
- `500` server error

### Remove Bookmark
- `DELETE /api/bookmarks/:id`
- Private

Response:
```json
{
  "success": true,
  "message": "Bookmark removed"
}
```
Errors:
- `401` not authorized
- `403` not the bookmark owner
- `404` bookmark not found
- `500` server error

