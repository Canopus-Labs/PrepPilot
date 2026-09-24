import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdaptiveInterview = () => {
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Setup Form State
  const [form, setForm] = useState({
    role: "Software Engineer",
    experienceLevel: "Mid-level",
    topics: "Data Structures, React, System Design",
  });
  
  // Interview State
  const [answer, setAnswer] = useState("");
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [latestFeedback, setLatestFeedback] = useState(null);
  
  const getAuthHeader = () => {
    return {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
  };

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const topicArray = form.topics.split(",").map(t => t.trim()).filter(Boolean);
      const res = await axios.post(`${API_URL}/adaptive-interview/start`, {
        role: form.role,
        experienceLevel: form.experienceLevel,
        topics: topicArray,
        maxQuestions: 5
      }, getAuthHeader());
      setSession(res.data.session);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_URL}/adaptive-interview/${session._id}/answer`, 
        { answer }, 
        getAuthHeader()
      );
      setSession(res.data.session);
      setLatestFeedback(res.data.evaluation);
      setFeedbackMode(true);
      setAnswer("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit answer");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setFeedbackMode(false);
    setLatestFeedback(null);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Please log in to use the Adaptive Interview feature.</p>
      </div>
    );
  }

  // 1. Start Form
  if (!session) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Adaptive AI Interview</h2>
        <p className="text-gray-600 mb-6">
          Experience a dynamic interview that adjusts question difficulty based on your performance.
        </p>
        
        {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
        
        <form onSubmit={handleStart} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={form.experienceLevel}
              onChange={e => setForm({...form, experienceLevel: e.target.value})}
            >
              <option value="Intern/Entry-level">Intern/Entry-level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topics (comma separated)</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={form.topics}
              onChange={e => setForm({...form, topics: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </form>
      </div>
    );
  }

  // 3. Final Report
  if (session.status === "completed") {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Interview Complete</h2>
        <p className="text-gray-600 mb-8">Here is your performance summary for the {session.role} role.</p>
        
        <div className="flex items-center justify-between p-6 bg-blue-50 rounded-lg mb-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Overall Score</h3>
            <p className="text-sm text-blue-700">Based on correctness, explanation, and approach</p>
          </div>
          <div className="text-4xl font-bold text-blue-600">
            {session.finalReport?.totalScore}%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Topic Performance</h3>
            <ul className="space-y-3">
              {Object.entries(session.finalReport?.topicPerformance || {}).map(([topic, score]) => (
                <li key={topic} className="flex justify-between items-center">
                  <span className="font-medium">{topic}</span>
                  <span className={`px-2 py-1 rounded text-sm ${score >= 80 ? 'bg-green-100 text-green-800' : score >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {score}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Areas for Improvement</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {session.finalReport?.improvementAreas?.map((area, i) => (
                <li key={i}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => { setSession(null); setFeedbackMode(false); }}
            className="py-2 px-6 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  // 2. Interview Q/A & Feedback Loop
  const currentQIndex = session.questions.findIndex(q => !q.isAnswered);
  const isLastQuestion = session.questions.length >= session.maxQuestions && currentQIndex === -1;
  const currentQ = feedbackMode ? session.questions[session.questions.length - 1] : session.questions[currentQIndex];

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Question {session.questions.length} / {session.maxQuestions}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(currentQ?.difficulty)}`}>
          {currentQ?.difficulty}
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <span className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2 block">
          Topic: {currentQ?.topic}
        </span>
        <p className="text-lg text-gray-800 font-medium whitespace-pre-wrap">{currentQ?.questionText}</p>
      </div>

      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

      {!feedbackMode ? (
        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-48"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !answer.trim()}
              className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Evaluating..." : "Submit Answer"}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">AI Evaluation</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-3 rounded shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">{latestFeedback?.overallScore}%</div>
                <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Overall</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">{latestFeedback?.correctnessScore}%</div>
                <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Correctness</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">{latestFeedback?.explanationScore}%</div>
                <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Explanation</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">Approach Feedback</h4>
                <p className="text-gray-700 text-sm mt-1">{latestFeedback?.approachFeedback}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">General Feedback</h4>
                <p className="text-gray-700 text-sm mt-1">{latestFeedback?.generalFeedback}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600 font-medium">
              Next question difficulty: <strong className={getDifficultyColor(session.currentDifficulty).split(' ')[1]}>{session.currentDifficulty}</strong>
            </span>
            <button
              onClick={handleNextQuestion}
              className="py-2 px-6 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
              {isLastQuestion ? "View Final Report" : "Continue to Next Question"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdaptiveInterview;
