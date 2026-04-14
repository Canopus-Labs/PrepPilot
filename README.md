# Interview Prep AI 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

> 🤖 **AI-powered interview preparation platform** that generates role-specific questions, provides detailed explanations, and helps you ace your technical interviews.

Interview Prep AI is a full-stack web application that helps users prepare for interviews with AI-generated, role-specific questions and answers. Users can practice, expand on answers, get detailed explanations, and track their progress—all in a modern, responsive interface.

## ✨ Features

- 🎯 **AI-powered Questions**: Generate role-specific interview questions and answers using Google's Gemini AI
- 📚 **Deep Learning**: Expand answers and dive deep into concepts with detailed explanations
- 💾 **Save & Organize**: Save your favorite questions and revisit them anytime
- 📊 **Progress Tracking**: Monitor your preparation progress with built-in analytics
- 🔐 **User Authentication**: Secure login/signup with JWT authentication
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Real-time AI**: Get instant responses to your interview queries
- 🎨 **Modern UI**: Beautiful, intuitive interface built with Tailwind CSS

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Gemini API** - AI for question generation

### Development Tools

- **ESLint** - Code linting and formatting
- **Git** - Version control

## Quick Start

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud)
- **Google Gemini API key** (free at [AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KaranUnique/Interview-Prep-AI.git
   cd Interview-Prep-AI
   ```

2. **Install dependencies**

   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend/InterviewPrepAI
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend/` directory:

   ```env
   # Database
   MONGO_URI=your_mongodb_connection_string

   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here

   # AI Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-flash

   # Server Configuration
   PORT=8000
   NODE_ENV=development
   FRONTEND_ORIGIN=http://localhost:5173
   ```

4. **Start the development servers**

   Start the backend (in one terminal):

   ```bash
   cd backend
   npm start
   ```

   Start the frontend (in another terminal):

   ```bash
   cd frontend/InterviewPrepAI
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` and start preparing for your interviews!

## 📁 Project Structure

```
Interview-Prep-AI/
├── backend/                    # Express.js API server
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── middlewares/           # Authentication & other middlewares
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   ├── utils/                 # Helper functions
│   └── server.js              # Server entry point
├── frontend/
│   └── InterviewPrepAI/       # React frontend application
│       ├── public/            # Static assets
│       ├── src/
│       │   ├── components/    # Reusable UI components
│       │   ├── context/       # React context providers
│       │   ├── pages/         # Page components
│       │   ├── utils/         # Utility functions
│       │   └── main.jsx       # App entry point
│       └── package.json
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes before submitting
- Update documentation as needed

### Areas for Contribution

- 🐛 **Bug fixes** and improvements
- ✨ **New features** and enhancements
- 📚 **Documentation** improvements
- 🎨 **UI/UX** improvements
- ⚡ **Performance** optimizations

## 🐛 Troubleshooting

| Issue                             | Solution                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------- |
| **401 Unauthorized after deploy** | Ensure JWT secret is consistent; clear localStorage token                    |
| **CORS errors**                   | Verify `FRONTEND_ORIGIN` matches exact protocol + domain (no trailing slash) |
| **404 API calls**                 | Confirm `VITE_BACKEND_URL` has no trailing slash and includes https          |
| **Mixed content warnings**        | Use https for backend URL in production                                      |
| **AI API errors**                 | Check your Gemini API key and model configuration                            |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the interview question generation
- **React & Vite** for the amazing frontend development experience
- **Express.js & MongoDB** for the robust backend infrastructure
- **Tailwind CSS** for the beautiful utility-first styling

---

<div align="center">

**Built with ❤️ by [KaranUnique](https://github.com/KaranUnique)**

[![GitHub followers](https://img.shields.io/github/followers/KaranUnique?style=social)](https://github.com/KaranUnique)
[![GitHub stars](https://img.shields.io/github/stars/KaranUnique/Interview-Prep-AI?style=social)](https://github.com/KaranUnique/Interview-Prep-AI)

⭐ If this project helped you, please give it a star!

</div>
