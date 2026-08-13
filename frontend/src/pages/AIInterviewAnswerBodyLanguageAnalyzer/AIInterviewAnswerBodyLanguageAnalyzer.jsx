import React, { useState } from "react";
import {
  Eye,
  Hand,
  Smile,
  Camera,
  Shield,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Brain,
  Target,
} from "lucide-react";

const AIInterviewAnswerBodyLanguageAnalyzer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [postureChecks, setPostureChecks] = useState({ straight: false, shoulders: false, hands: false, lean: false });

  const stats = { eyeContactScore: 72, postureScore: 65, gestureScore: 58, overallScore: 65 };

  const questions = [
    { title: "Tell me about your most significant technical achievement.", category: "Technical" },
    { title: "Where do you see yourself in five years?", category: "HR" },
    { title: "Describe a conflict you faced at work.", category: "Behavioral" },
  ];

  const togglePostureItem = (key) => setPostureChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  const postureItems = [
    { key: "straight", label: "Back straight, spine aligned" },
    { key: "shoulders", label: "Shoulders relaxed, not tense" },
    { key: "hands", label: "Hands visible, not hidden" },
    { key: "lean", label: "Slight forward lean showing engagement" },
  ];

  const facialExpressions = [
    { type: "Engaged", score: 78, description: "Natural smiling, appropriate eye contact", color: "green" },
    { type: "Neutral", score: 65, description: "Relaxed face, no visible tension", color: "blue" },
    { type: "Tense", score: 40, description: "Jaw tightness or forced expressions", color: "red" },
  ];

  const handGestures = [
    { gesture: "Open palms", frequency: "Frequently", quality: "Positive", description: "Shows openness and honesty" },
    { gesture: "Steeple hands", frequency: "Occasionally", quality: "Positive", description: "Indicates confidence and authority" },
    { gesture: "Fidgeting", frequency: "Sometimes", quality: "Negative", description: "Signals nervousness or lack of confidence" },
    { gesture: "Crossed arms", frequency: "Rarely", quality: "Negative", description: "Creates a defensive barrier with interviewer" },
  ];

  const improvementTips = [
    "Practice maintaining eye contact for 3-5 seconds per person in a panel interview.",
    "Keep your hands visible above the table to appear open and engaged.",
    "Avoid crossing your arms or fidgeting with objects during answers.",
    "Use purposeful hand gestures to emphasize key points.",
    "Record yourself practicing to identify unconscious nervous habits.",
  ];

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getQualityBadge = (quality) => {
    if (quality === "Positive") return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
            <Camera size={34} className="text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Interview Body Language Analyzer</h1>
            <p className="text-gray-500 mt-2">Assess and improve your non-verbal communication during interviews. Self-evaluate posture, eye contact, gestures, and facial expressions.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Eye className="mx-auto text-teal-600" size={30} />, label: "Eye Contact Score", value: `${stats.eyeContactScore}%` },
            { icon: <Target className="mx-auto text-blue-600" size={30} />, label: "Posture Score", value: `${stats.postureScore}%` },
            { icon: <Hand className="mx-auto text-amber-500" size={30} />, label: "Gesture Score", value: `${stats.gestureScore}%` },
            { icon: <Shield className="mx-auto text-teal-600" size={30} />, label: "Overall Score", value: `${stats.overallScore}%` },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
              {item.icon}
              <h3 className="mt-4 text-gray-500">{item.label}</h3>
              <p className={`text-5xl font-black mt-3 ${getScoreColor(parseInt(item.value))}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-5"><Brain size={32} /><h2 className="text-3xl font-bold">AI Body Language Analysis</h2></div>
          <p className="leading-8 text-white/90">Non-verbal communication accounts for over 55% of the impression you make in an interview. This tool helps you self-assess and improve posture, eye contact, hand gestures, and facial expressions during your interview preparation.</p>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Camera className="text-teal-600" /><h2 className="text-2xl font-bold">Select Interview Question</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {questions.map((q, i) => (
              <button key={i} onClick={() => setSelectedQuestion(i)}
                className={`text-left rounded-2xl border p-6 transition ${selectedQuestion === i ? "border-teal-500 bg-teal-50 dark:bg-teal-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <span className="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-sm">{q.category}</span>
                <h3 className="font-bold text-lg mt-4">{q.title}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Target className="text-blue-600" /><h2 className="text-2xl font-bold">Posture Self-Assessment</h2></div>
          <p className="text-gray-500 mb-6">Check the posture elements you maintained during your practice answer:</p>
          <div className="space-y-4">
            {postureItems.map((item) => (
              <button key={item.key} onClick={() => togglePostureItem(item.key)}
                className={`w-full flex items-center justify-between rounded-xl border p-5 transition ${postureChecks[item.key] ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <div className="flex items-center gap-4">
                  {postureChecks[item.key] ? <CheckCircle2 className="text-green-600" size={24} /> : <XCircle className="text-gray-400" size={24} />}
                  <span className="font-semibold">{item.label}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${postureChecks[item.key] ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>{postureChecks[item.key] ? "Maintained" : "Not checked"}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4">
            <p className="text-sm text-gray-500">Posture Score</p>
            <p className={`text-2xl font-black mt-1 ${getScoreColor(stats.postureScore)}`}>{stats.postureScore}%</p>
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Eye className="text-teal-600" /><h2 className="text-2xl font-bold">Eye Contact Analysis</h2></div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Duration per gaze", value: "4-5 seconds", rating: "Good" },
              { label: "Panel awareness", value: "All members", rating: "Good" },
              { label: "Break pattern", value: "Natural", rating: "Good" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <p className="text-gray-500">{item.label}</p>
                <p className="text-xl font-bold mt-2">{item.value}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm">{item.rating}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-gray-500 mb-2">Eye Contact Score</p>
            <div className="w-full h-6 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-blue-600" style={{ width: `${stats.eyeContactScore}%` }} />
            </div>
            <p className={`text-right font-bold mt-2 ${getScoreColor(stats.eyeContactScore)}`}>{stats.eyeContactScore}%</p>
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Smile className="text-amber-500" /><h2 className="text-2xl font-bold">Facial Expression Analysis</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {facialExpressions.map((item, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${item.color === "green" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : item.color === "blue" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" : "border-red-500 bg-red-50 dark:bg-red-900/10"}`}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{item.type}</h3>
                  <span className={`text-2xl font-black ${getScoreColor(item.score)}`}>{item.score}%</span>
                </div>
                <p className="text-gray-500 mt-3 leading-6">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Hand className="text-amber-500" /><h2 className="text-2xl font-bold">Hand Gesture Feedback</h2></div>
          <div className="space-y-4">
            {handGestures.map((item, i) => (
              <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{item.gesture}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.frequency} - {item.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getQualityBadge(item.quality)}`}>{item.quality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-6"><Brain size={30} /><h2 className="text-3xl font-bold">AI Body Language Improvement Tips</h2></div>
          <div className="grid md:grid-cols-2 gap-5">
            {improvementTips.map((tip, i) => (
              <div key={i} className="rounded-xl bg-white/10 p-5">
                <span className="font-semibold">{i + 1}. {tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3"><Shield className="text-teal-600" /><h2 className="text-2xl font-bold">Interview Non-verbal Readiness</h2></div>
              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">Your body language shows good fundamentals with room for improvement in gesture control and posture consistency. Regular practice will help build natural, confident non-verbal habits.</p>
            </div>
            <div className="text-center">
              <p className={`text-7xl font-black ${getScoreColor(stats.overallScore)}`}>{stats.overallScore}%</p>
              <p className="text-gray-500 mt-2">Non-verbal Readiness</p>
            </div>
          </div>
          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-blue-600" style={{ width: `${stats.overallScore}%` }} />
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><TrendingUp className="text-green-600" /><h2 className="text-2xl font-bold">Body Language Improvement Trend</h2></div>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { session: "Session 1", score: 48 },
              { session: "Session 2", score: 54 },
              { session: "Session 3", score: 59 },
              { session: "Session 4", score: 63 },
              { session: "Current", score: 65 },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${i === 4 ? "border-teal-500 bg-teal-50 dark:bg-teal-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <p className="text-sm text-gray-500">{s.session}</p>
                <p className={`text-3xl font-black mt-4 ${getScoreColor(s.score)}`}>{s.score}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewAnswerBodyLanguageAnalyzer;
