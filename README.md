<div align="center">

<img src="./frontend/public/PrepPilot-Logo.png" alt="PrepPilot Logo" width="100" height="100" style="margin-bottom: 20px;">

# PrepPilot - AI-Powered Interview Preparation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8F7EE7?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**Your ultimate companion for crushing technical interviews with AI-powered questions, real-time feedback, and comprehensive preparation tools.**

[🌐 Live Demo](https://preppilot-12n6.onrender.com/)

</div>

---

## Table of Contents

- [🚀 About PrepPilot](#-about-preppilot)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#%EF%B8%8F-technology-stack)
- [⚡ Quick Start Guide](#-quick-start-guide)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing Guidelines](#-contributing-guidelines)
- [🔧 Troubleshooting & FAQs](#-troubleshooting--faqs)
- [📖 API Documentation](#-api-documentation)
- [🚀 Deployment Guide](#-deployment-guide)
- [📄 License](#-license)
- [🙌 Acknowledgments & Credits](#-acknowledgments--credits)
- [🎯 Roadmap](#-roadmap)
- [🙌 Thanks to Our Amazing Contributors](#-thanks-to-our-amazing-contributors)
- [💬 Community & Support](#-community--support)

---

## 🚀 About PrepPilot

PrepPilot is a comprehensive full-stack web application designed to transform your interview preparation journey. Leveraging cutting-edge AI technology and an intuitive interface, PrepPilot generates role-specific interview questions, provides detailed explanations, and helps you track your progress in real-time.

Whether you're preparing for your dream job or sharpening your technical skills, PrepPilot provides all the tools you need to succeed.

## ✨ Key Features

| Feature                               | Description                                                                   |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| 🤖 **AI-Powered Question Generation** | Generate unlimited role-specific interview questions using Google's Gemini AI |
| 📚 **Curated Question Banks**         | Access DSA sheets, aptitude questions, and problem-solving challenges         |
| 💻 **Built-in Code Compiler**         | Write, test, and execute code directly in the browser with Monaco Editor      |
| 🎯 **Skill Assessment**               | Evaluate your technical proficiency with interactive skill tests              |
| 📖 **Reference Books Library**        | Access a comprehensive collection of interview preparation books              |
| 📝 **Resume Builder**                 | Create professional resumes with customizable templates                       |
| 🏆 **Interview Experiences**          | Read and share real interview experiences from the community                  |
| 💡 **Project Ideas**                  | Explore curated project ideas to enhance your portfolio                       |
| 🔗 **Open Source Resources**          | Contribute and learn from open-source projects                                |
| 📊 **Progress Dashboard**             | Track your preparation metrics and identify weak areas                        |
| 🔐 **Secure Authentication**          | Two-token authentication with short-lived access tokens, rotating refresh tokens, and secure logout support |
| 📱 **Fully Responsive**               | Seamless experience across desktop, tablet, and mobile devices                |
| 🎨 **Modern Dark Mode**               | Beautiful UI with theme toggle for comfortable viewing                        |
| ⚡ **Real-time Feedback**             | Instant AI-powered explanations and answer evaluations                        |

## 🛠️ Technology Stack

### Frontend Architecture

```
React 18 (Hooks & Functional Components)
├── Vite (Lightning-fast build tool)
├── Tailwind CSS (Utility-first styling)
├── React Router DOM (Client-side routing)
├── Framer Motion (Smooth animations)
├── Monaco Editor (Advanced code editing)
├── React Markdown (Rich content rendering)
└── Axios (HTTP client for API calls)
```

### Backend Architecture

```
Node.js + Express.js
├── MongoDB + Mongoose (Data persistence)
├── JWT & Bcryptjs (Security & authentication)
├── Access/Refresh token rotation for secure session handling
├── Google Gemini API (AI intelligence)
├── Multer (File uploads)
├── PDF-Parse (Document processing)
├── Express Rate Limit (API protection)
└── Joi (Input validation)
```

### Development & DevOps

```
ESLint          Code quality & linting
Git             Version control
Nodemon         Auto-reload during development
```

### 📦 Complete Dependency Stack

**Frontend Dependencies:**
`React 18` • `Vite` • `Tailwind CSS` • `React Router` • `Axios` • `Framer Motion` • `Monaco Editor` • `Lucide React` • `React Icons` • `React Markdown` • `React Syntax Highlighter` • `React Hot Toast` • `React Split` • `Moment.js`

**Backend Dependencies:**
`Express.js` • `MongoDB` • `Mongoose` • `JWT` • `Bcryptjs` • `Google Generative AI` • `Axios` • `Multer` • `PDF-Parse` • `Joi` • `CORS` • `Express Rate Limit` • `Dotenv`

## ⚡ Quick Start Guide

### Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v20.19+ or v22.12+) - [Download](https://nodejs.org/)
- **npm** (included with Node.js)
- **MongoDB** instance (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Free tier available)
- **Google Gemini API Key** - Get it free at [Google AI Studio](https://aistudio.google.com/app/apikey)

### 📥 Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Canopus-Labs/PrepPilot.git
cd PrepPilot
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
echo "VITE_BACKEND_URL=http://localhost:8000" > .env
```

#### 4️⃣ Environment Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/preppilot

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_generate_a_strong_one

# Auth token behavior is handled by the backend using:
# - short-lived access tokens (15 minutes)
# - rotating refresh tokens (7 days)

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_from_ai_studio
GEMINI_MODEL=gemini-2.5-flash

# Server Configuration
PORT=8000
NODE_ENV=development

# Frontend Origin (for CORS)
FRONTEND_ORIGIN=http://localhost:5173

# Rate limits are configured in backend/middlewares/rateLimiter.js.
```

#### 5️⃣ Start Development Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Server runs on http://localhost:8000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

#### 6️⃣ Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

### 🐳 Docker Setup (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📁 Project Structure

```
PrepPilot/
│
├── 📂 backend/                       # Express.js REST API Server
│   ├── 📂 config/                    # Database & environment configuration
│   ├── 📂 controllers/               # Business logic & request handlers
│   │   ├── aiController.js           # AI/Gemini API integration
│   │   ├── authController.js         # Authentication logic
|   |   ├── achievementController.js  # Achievement logic
|   |   ├── jobController.js          # Job Adzuna Logic
│   │   ├── questionController.js     # Question management
│   │   ├── resumeController.js       # Resume operations
│   │   ├── sessionController.js      # Session management
│   │   ├── userSheetProgressController.js # Progress tracking
│   │   ├── adaptiveInterviewController.js
│   │   ├── flashcardController.js
│   │   ├── interviewExperienceController.js
│   │   ├── notesSummaryController.js
│   │   └── roadmapController.js
│   │
│   ├── 📂 Input_validators/           # Request input validation
│   │   ├── ValidateAchievement.js
│   │   ├── ValidateAi.js
│   │   ├── ValidateAuth.js
│   │   ├── ValidateFlashcard.js
│   │   ├── ValidateInterviewExperience.js
│   │   ├── ValidateNotesSummary.js
│   │   ├── ValidateQuestions.js
│   │   ├── ValidateResume.js
│   │   ├── ValidateRoadmap.js
│   │   ├── ValidateSession.js
│   │   └── ValidateUserSheetProgress.js
│   │
│   ├── 📂 middlewares/               # Express middlewares
│   │   ├── authMiddleware.js         # JWT verification
│   │   ├── rateLimiter.js            # API rate limiting
│   │   ├── uploadMiddleware.js       # File upload handling
│   │   ├── sanitizeAiPrompt.js       # Input sanitization
│   │   └── validateAiPrompt.js       # Prompt validation
│   │
│   ├── 📂 models/                    # MongoDB Mongoose schemas
│   │   ├── User.js                   # User profile & credentials
│   │   ├── AdaptiveInterviewSession.js
│   │   ├── Flashcard.js
│   │   ├── InterviewExperience.js
│   │   ├── JobCache.js
│   │   ├── NotesSummary.js
│   │   ├── Question.js               # Interview questions
│   │   ├── Resume.js                 # Resume documents
│   │   ├── RoadmapProject.js
│   │   ├── Session.js                # Practice sessions
│   │   ├── Sheet.js                  # Question sheets (DSA, etc.)
│   │   ├── Book.js                   # Reference books
│   │   └── UserSheetProgress.js      # User progress tracking
│   │
│   ├── 📂 routes/                    # API endpoints
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── aiRoutes.js               # AI generation endpoints
│   │   ├── questionRoutes.js         # Question endpoints
│   │   ├── resumeRoutes.js           # Resume endpoints
│   │   ├── sessionRoutes.js          # Session endpoints
│   │   ├── booksRoutes.js            # Books endpoints
│   │   ├── AptitudeQuestions.js      # Aptitude test endpoints
│   │   ├── adaptiveInterviewRoutes.js
│   │   ├── achievementRoutes.js
│   │   ├── coursesRoutes.js
│   │   ├── flashcardRoutes.js
│   │   ├── googleCalendarRoutes.js
│   │   ├── interviewExperienceRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── notesSummaryRoutes.js
│   │   ├── roadmapRoutes.js
│   │   ├── sheetJsonUpload.js        # Sheet upload
│   │   └── userSheetProgressRoutes.js# Progress endpoints
│   │
│   ├── 📂 utils/                     # Utility functions
│   │   └── prompts.js                # AI prompt templates
│   │
│   ├── 📂 validation/                # Input validation schemas
│   │   └── aiPromptSchema.js         # Joi validation schemas
│   │
│   ├── 📂 scripts/                   # Utility scripts
│   │   ├── importBooks.js            # Import books to DB
│   │   ├── exportBooks.js            # Export books from DB
│   │   └── uploadSheets.js           # Upload question sheets
│   │
│   ├── 📂 sheets/                    # JSON question sheets
│   │   ├── Arrays.json
│   │   ├── gfg-must-know-dsa.json
│   │   ├── neetcode-150.json
│   │   ├── striver-sde-sheet.json
│   │   └── love-babbar-dsa-sheet.json
│   │
│   ├── 📂 uploads/                   # User-uploaded files storage
│   ├── server.js                     # Express server entry point
│   ├── package.json
│   └── .env.example
│
├── 📂 frontend/                       # React + Vite Frontend Application
│   ├── 📂 public/                    # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/            # Reusable UI components
│   │   │   ├── AIHelper.jsx          # AI question generator
│   │   │   ├── Compiler.jsx          # Code editor & executor
│   │   │   ├── SkillAssessment.jsx   # Skill tests
│   │   │   ├── SheetList.jsx         # Question sheets list
│   │   │   ├── SheetDetailsPage.jsx  # Sheet details view
│   │   │   ├── Drawer.jsx            # Navigation drawer
│   │   │   │
│   │   │   ├── 📂 Cards/             # Card components
│   │   │   │   ├── QuestionCard.jsx
│   │   │   │   ├── AptitudeQuestionCard.jsx
│   │   │   │   ├── TopicCard.jsx
│   │   │   │   └── SummaryCard.jsx
│   │   │   │
│   │   │   ├── 📂 Inputs/            # Form input components
│   │   │   │   ├── Input.jsx
│   │   │   │   └── ProfilePhotoSelector.jsx
│   │   │   │
│   │   │   ├── 📂 Layouts/           # Layout components
│   │   │   │
│   │   │   ├── 📂 Loader/            # Loading spinners
│   │   │   │
│   │   │   ├── 📂 animations/        # Animation components
│   │   │   │   └── PageTransition.jsx
│   │   │   │
│   │   │   └── ServicesMarquee.jsx   # Service showcase
│   │   │
│   │   ├── 📂 context/               # React Context API providers
│   │   │   ├── userContext.jsx       # User state management
│   │   │   └── themeContext.jsx      # Theme state management
│   │   │
│   │   ├── 📂 pages/                 # Page components (route-based)
│   │   │   ├── 📂 Auth/              # Login/Signup pages
│   │   │   ├── 📂 Home/              # Home/Dashboard
│   │   │   ├── 📂 InterviewPrep/     # Interview preparation
│   │   │   ├── 📂 InterviewExperiences/ # Shared experiences
│   │   │   ├── 📂 ResumeBuilder/     # Resume builder
│   │   │   ├── 📂 NotesBooks/        # Reference books
│   │   │   ├── 📂 ProjectIdeas/      # Project ideas
│   │   │   └── 📂 OpenSource/        # Open source resources
│   │   │
│   │   ├── 📂 utils/                 # Utility functions
│   │   │   ├── apiPaths.js           # API endpoints
│   │   │   ├── axiosInstance.js      # Axios configuration
│   │   │   ├── animations.js         # Animation utilities
│   │   │   ├── helper.js             # General helpers
│   │   │   ├── uploadimage.js        # Image upload utility
│   │   │   └── data.js               # Static data
│   │   │
│   │   ├── 📂 assets/                # Images, icons, media
│   │   ├── App.jsx                   # Main App component
│   │   ├── main.jsx                  # React entry point
│   │   ├── App.css                   # Global styles
│   │   └── index.css                 # Base styles
│   │
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint rules
│   ├── tailwind.config.js            # Tailwind CSS config
│   ├── package.json
│   └── index.html
│
├── .github/                          # Issue, PR, and workflow templates
├── .gitignore
├── .mavis/                           # Generated run report
├── .prettierrc                       # Formatting configuration
├── API_DOCUMENTATION.md              # Backend API reference
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── docker-compose.yml                # Local development stack
├── LICENSE                           # MIT License
├── m.txt
├── orchestrate.py
├── package-lock.json
├── package.json
├── README.md                         # This file
├── render.yaml                       # Render static-site configuration
└── TROUBLESHOOT.md
```

## 🤝 Contributing Guidelines

We love contributions from the community! PrepPilot is better because of talented developers like you. Here's how you can help:

### 🎯 How to Get Started

1. **Fork the repository** on GitHub

   ```bash
   # Fork via GitHub UI, then:
   git clone https://github.com/Canopus-Labs/PrepPilot.git
   cd PrepPilot
   ```

2. **Create a feature branch** with a descriptive name

   ```bash
   git checkout -b feature/add-amazing-feature
   # or
   git checkout -b fix/resolve-critical-bug
   ```

3. **Make your changes** following our code style
   - Write clean, readable code
   - Add comments for complex logic
   - Keep components modular and reusable
   - Follow existing naming conventions

4. **Test thoroughly**

   ```bash
   # Test your changes locally
   npm run dev    # Frontend
   npm run test   # If tests exist
   ```

5. **Commit with clear messages** using conventional commits

   ```bash
   git commit -m "feat: add new AI model integration"
   git commit -m "fix: resolve authentication timeout issue"
   git commit -m "docs: update API documentation"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/add-amazing-feature
   ```

### 📋 Types of Contributions We Welcome

| Type                 | Examples                                     | Priority |
| -------------------- | -------------------------------------------- | -------- |
| 🐛 **Bug Fixes**     | Fix crashes, errors, or unexpected behaviors | High     |
| ✨ **Features**      | New tools, integrations, or functionality    | Medium   |
| 📚 **Documentation** | README updates, API docs, code comments      | Medium   |
| 🎨 **UI/UX**         | Design improvements, accessibility fixes     | Medium   |
| ⚡ **Performance**   | Optimize queries, reduce load time           | High     |
| 🧪 **Tests**         | Add unit tests, integration tests            | Medium   |

### 📝 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project's style guide
- [ ] You've tested your changes locally
- [ ] You've updated relevant documentation
- [ ] Your PR title clearly describes the change
- [ ] Your PR description explains what and why
- [ ] You've linked any related issues
- [ ] No console errors or warnings
- [ ] You've added/updated tests if applicable

### 🚫 Code Style Guidelines

**Frontend (React/JavaScript):**

```javascript
// Use functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// Use meaningful variable names
const userAuthToken = localStorage.getItem('authToken');

// Add JSDoc comments for complex functions
/**
 * Fetches interview questions for a specific role
 * @param {string} role - The job role
 * @returns {Promise<Array>} Array of questions
 */
const fetchQuestions = async (role) => { ... };
```

**Backend (Node.js/Express):**

```javascript
// Use async/await
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Use meaningful error messages
throw new Error("User not found with the provided email");
```

### 🐛 Found a Bug?

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Step-by-step reproduction instructions
   - Expected vs actual behavior
   - Screenshots/screencasts if applicable
   - Your environment (OS, Browser, Node version)

### 💡 Suggesting Enhancements?

1. **Use the discussion section** or create an issue
2. **Describe the problem** the enhancement solves
3. **Provide examples** of how it would work
4. **Explain the benefits** to users

### 📞 Need Help?

- 💬 Open a discussion for questions
- 🐛 Create an issue for bugs
- 📧 Contact maintainers for sensitive issues
- 🤖 Check our FAQ section (coming soon)

## 🔧 Troubleshooting & FAQs

### Common Issues & Solutions

| Issue                         | Cause                                 | Solution                                       |
| ----------------------------- | ------------------------------------- | ---------------------------------------------- |
| **401 Unauthorized Error**    | Invalid or expired JWT token          | Clear browser localStorage and re-login        |
| **CORS Error**                | Frontend & backend origins mismatch   | Verify `FRONTEND_ORIGIN` matches exactly       |
| **404 API Not Found**         | Incorrect API base URL                | Check `VITE_BACKEND_URL` in env file           |
| **MongoDB Connection Failed** | Invalid connection string             | Verify `MONGO_URI` and IP whitelist            |
| **Gemini API Error**          | Invalid or missing API key            | Check `GEMINI_API_KEY` in .env                 |
| **Port Already in Use**       | Another process using the port        | Change `PORT` in .env or kill existing process |
| **Mixed Content Warning**     | HTTP frontend accessing HTTPS backend | Use HTTPS for both in production               |
| **Nodemon not reloading**     | File watch issue                      | Delete node_modules and reinstall              |

---

## 📖 API Documentation

For complete endpoint paths, request/response examples, authentication, and
rate limits, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

### Flashcard (Spaced Repetition System) Routes

### Create / Add Flashcard
- `POST /api/flashcards`
- Private

Request Body:
```json
{
  "question": "What is the time complexity of quicksort?",
  "answer": "Average: O(N log N), Worst: O(N^2)",
  "category": "DSA",
  "sourceId": "dsa-qs-101"
}
```
Response `201` / `200`:
```json
{
  "success": true,
  "message": "Flashcard added to SRS deck",
  "flashcard": {
    "_id": "660c1...",
    "question": "What is the time complexity of quicksort?",
    "answer": "Average: O(N log N), Worst: O(N^2)",
    "category": "DSA",
    "interval": 0,
    "repetition": 0,
    "efactor": 2.5,
    "dueDate": "2026-07-25T16:30:00.000Z"
  }
}
```
Errors:
- `400` validation error (question or answer missing)
- `500` server error

---

### Get Flashcards
- `GET /api/flashcards`
- Private
- Query Parameters (optional):
  - `due` (`true` for daily revision queue, `dueDate <= now`)
  - `category` (e.g., `"DSA"`, `"Aptitude"`, `"AI"`)

Response `200`:
```json
{
  "success": true,
  "count": 5,
  "flashcards": []
}
```

---

### Review Flashcard (SM-2 Algorithm)
- `PUT /api/flashcards/:id/review`
- Private

Request Body:
```json
{
  "rating": "good"
}
```
> Supported `rating` values: `"again"` (1), `"hard"` (2), `"good"` / `"medium"` (3), `"easy"` (4).

Response `200`:
```json
{
  "success": true,
  "message": "Flashcard review recorded successfully",
  "flashcard": {
    "_id": "660c1...",
    "interval": 6,
    "repetition": 2,
    "efactor": 2.5,
    "dueDate": "2026-07-31T16:30:00.000Z"
  }
}
```
Errors:
- `404` flashcard not found
- `500` server error

---

### Get SRS Deck Stats
- `GET /api/flashcards/stats`
- Private

Response `200`:
```json
{
  "success": true,
  "stats": {
    "totalCards": 24,
    "dueCount": 5,
    "masteredCount": 8,
    "reviewedToday": 3
  }
}
```

---

### Delete Flashcard
- `DELETE /api/flashcards/:id`
- Private

Response `200`:
```json
{
  "success": true,
  "message": "Flashcard deleted successfully"
}
```

---

### Health Check
- `GET /api/test`
- Public

Response `200`:
```json
{
  "message": "API is working!"
}
```

## 🚀 Deployment Guide

The checked-in [Render configuration](./render.yaml) deploys the frontend as a
static site. It does not configure a backend service; deploy the backend
separately and set its environment variables and frontend origin for your
hosting environment.

For local development with MongoDB, the frontend, and backend in containers,
run the repository's [Docker Compose configuration](./docker-compose.yml):

```bash
docker compose up --build
```

The Compose file and per-service Dockerfiles use development servers and are
intended for local development, not as production deployment instructions.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive open-source license that allows you to:

- ✅ Use for personal or commercial purposes
- ✅ Modify the source code
- ✅ Distribute copies
- ✅ Include the license in distributions

**Conditions:**

- Include the license and copyright notice

## 🙌 Acknowledgments & Credits

This project stands on the shoulders of amazing open-source projects and communities:

### 🤖 AI & Technology

- **Google Gemini API** - Powering intelligent question generation and explanations
- **React Team** - For the revolutionary UI library and amazing community
- **Vite Team** - Lightning-fast build tool that transformed frontend development
- **Tailwind Labs** - Beautiful utility-first CSS framework

### 📚 Libraries & Frameworks

- **Express.js** - Elegant web framework for Node.js
- **MongoDB** - Flexible and scalable NoSQL database
- **Mongoose** - Beautiful MongoDB object modeling
- **Monaco Editor** - Incredible code editor from VS Code
- **Framer Motion** - Production-ready animation library

### 👥 Community & Inspiration

- **Community Contributors** - Everyone who reported bugs and suggested features
- **Open Source Community** - For continuous inspiration and support
- **Developers & Educators** - Who shared knowledge and best practices

### 📖 Resources Used

- [DSA Resources](https://takeuforward.org/prep-hub/strivers-180-master-dsa-patterns) - Striver's SDE Sheet
- [NeetCode](https://neetcode.io/) - Curated DSA problems
- [GeeksforGeeks](https://www.geeksforgeeks.org/) - Educational content

## 🎯 Roadmap

### 🔄 In Development

- [ ] Real-time collaboration features
- [ ] Video interview simulation
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Community forums

### 🌟 Planned Features

- [ ] Multi-language support
- [ ] Integration with LeetCode
- [ ] Machine learning-based recommendations
- [ ] Interview experience matching
- [ ] Premium tier with advanced features

### 🚀 Future Vision

- [ ] Mentorship marketplace
- [ ] Career path recommendations
- [ ] Real interview connections
- [ ] Job board integration
- [ ] Company-specific preparation

## 🙌 Thanks to Our Amazing Contributors

We owe a huge thank you to the brilliant individuals who help build, refine, and maintain this Project! Every contribution—whether fixing a layout bug, optimization, or polishing documentation—makes a massive difference. 

<a href="https://github.com/Canopus-Labs/PrepPilot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Canopus-Labs/PrepPilot" alt="Contributors Profile Pictures" />
</a>



## 💬 Community & Support

### Get Connected

- 💻 **GitHub Issues**: [Report a bug or request a feature](https://github.com/Canopus-Labs/PrepPilot/issues)

### Support This Project

If PrepPilot helped you land that dream job or ace your interview, consider:

1. ⭐ **Star this repository** - It helps more people discover PrepPilot
2. 📢 **Share with others** - Tell your friends and colleagues
3. 🐛 **Report bugs** - Help us improve the platform
4. 💡 **Suggest features** - Your ideas shape the future
5. 🤝 **Contribute code** - Help develop new features
6. ☕ **Buy me a coffee** - Support ongoing development

---

<div align="center">

## 💖 Built with passion by developers, for developers

[![GitHub stars](https://img.shields.io/github/stars/Canopus-Labs/PrepPilot?style=social&label=Star)](https://github.com/Canopus-Labs/PrepPilot)

### Made with ❤️ for the tech community

**"Your success is our mission. Every question you solve is one step closer to your dream job."** 🎯

---

### ⭐ If this project helped you, please give it a star! Your support means everything! 🌟

</div>
