""import React, { useState } from "react";
import {
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Shield,
  Brain,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";

const AIInterviewAnswerConfidenceScore = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = { overallConfidence: 71, assertivenessScore: 68, wordStrength: 75, hedgingCount: 3 };

  const questions = [
    { title: "Why should we hire you over other candidates?", category: "HR" },
    { title: "Describe a time you failed and how you handled it.", category: "Behavioral" },
    { title: "Walk me through your most complex technical project.", category: "Technical" },
  ];

  const answerWords = [
    { text: "I", confidence: "neutral" }, { text: "believe", confidence: "confident" },
    { text: "my", confidence: "neutral" }, { text: "technical", confidence: "neutral" },
    { text: "skills", confidence: "neutral" }, { text: "are", confidence: "neutral" },
    { text: "very", confidence: "confident" }, { text: "strong", confidence: "confident" },
    { text: "and", confidence: "neutral" }, { text: "I", confidence: "neutral" },
    { text: "think", confidence: "hedging" }, { text: "I", confidence: "neutral" },
    { text: "could", confidence: "hedging" }, { text: "bring", confidence: "neutral" },
    { text: "a", confidence: "neutral" }, { text: "lot", confidence: "confident" },
    { text: "of", confidence: "neutral" }, { text: "value", confidence: "confident" },
    { text: "to", confidence: "neutral" }, { text: "the", confidence: "neutral" },
    { text: "team.", confidence: "neutral" }, { text: "Maybe", confidence: "hedging" },
    { text: "my", confidence: "neutral" }, { text: "experience", confidence: "neutral" },
    { text: "is", confidence: "neutral" }, { text: "exactly", confidence: "confident" },
    { text: "what", confidence: "neutral" }, { text: "you", confidence: "neutral" },
    { text: "need.", confidence: "neutral" },
  ];

  const confidenceBreakdown = [
    { category: "Assertiveness", score: 68, description: "Direct statements vs. qualified language", color: "blue" },
    { category: "Word Strength", score: 75, description: "Use of powerful, action-oriented words", color: "green" },
    { category: "Hedging Language", score: 55, description: "Minimizing uncertain phrases", color: "red" },
    { category: "Tone Consistency", score: 80, description: "Uniform confidence throughout answer", color: "violet" },
  ];

  const suggestions = [
    { icon: <ThumbsDown className="text-red-500" size={20} />, text: "Remove 'I think' and 'maybe' when you are confident in your statement." },
    { icon: <ThumbsUp className="text-green-500" size={20} />, text: "Replace 'I could bring value' with 'I will deliver measurable impact'." },
    { icon: <Shield className="text-blue-500" size={20} />, text: "Lead with your strongest qualification instead of qualifying it." },
    { icon: <Zap className="text-amber-500" size={20} />, text: "Use more action verbs: 'I built', 'I led', 'I delivered'." },
  ];

  const sessionComparison = [
    { session: "Session 1", score: 52 }, { session: "Session 2", score: 58 },
    { session: "Session 3", score: 64 }, { session: "Session 4", score: 68 },
    { session: "Current", score: 71 },
  ];

  const getWordClass = (confidence) => {
    if (confidence === "confident") return "text-green-600 font-semibold bg-green-50 dark:bg-green-900/20 px-1 rounded";
    if (confidence === "hedging") return "text-red-500 font-semibold bg-red-50 dark:bg-red-900/20 px-1 rounded";
    return "";
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getBarColor = (color) => {
    if (color === "green") return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (color === "blue") return "bg-gradient-to-r from-blue-500 to-indigo-600";
    if (color === "violet") return "bg-gradient-to-r from-violet-500 to-purple-600";
    return "bg-gradient-to-r from-red-500 to-orange-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
            <Shield size={34} className="text-cyan-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Interview Answer Confidence Score</h1>
            <p className="text-gray-500 mt-2">Analyze the confidence level of your interview answers by examining word choice, assertiveness, and hedging language.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target className="mx-auto text-cyan-600" size={30} />, label: "Overall Confidence", value: `${stats.overallConfidence}%` },
            { icon: <ThumbsUp className="mx-auto text-green-600" size={30} />, label: "Assertiveness Score", value: `${stats.assertivenessScore}%` },
            { icon: <Zap className="mx-auto text-amber-500" size={30} />, label: "Word Strength", value: `${stats.wordStrength}%` },
            { icon: <ThumbsDown className="mx-auto text-red-500" size={30} />, label: "Hedging Instances", value: stats.hedgingCount },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
              {item.icon}
              <h3 className="mt-4 text-gray-500">{item.label}</h3>
              <p className="text-5xl font-black mt-3">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-5"><Brain size={32} /><h2 className="text-3xl font-bold">AI Confidence Analysis</h2></div>
          <p className="leading-8 text-white/90">The AI analyzes your interview answers for confidence signals, including word strength, hedging language, and assertiveness. Confident answers make a stronger impression on interviewers and demonstrate competence.</p>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Shield className="text-cyan-600" /><h2 className="text-2xl font-bold">Select Interview Question</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {questions.map((q, i) => (
              <button key={i} onClick={() => setSelectedQuestion(i)}
                className={`text-left rounded-2xl border p-6 transition ${selectedQuestion === i ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 text-sm">{q.category}</span>
                <h3 className="font-bold text-lg mt-4">{q.title}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-6"><BarChart3 className="text-blue-600" /><h2 className="text-2xl font-bold">Answer with Confidence Highlights</h2></div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">
            <p className="text-lg leading-10">
              {answerWords.map((item, i) => (
                <span key={i} className={getWordClass(item.confidence)}>{item.text} </span>
              ))}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 mt-6">
            {[
              { label: "Confident", color: "bg-green-500" },
              { label: "Hedging", color: "bg-red-500" },
              { label: "Neutral", color: "bg-gray-300" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${item.color}`} />
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><TrendingUp className="text-green-600" /><h2 className="text-2xl font-bold">Confidence Breakdown</h2></div>
          <div className="space-y-6">
            {confidenceBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold text-lg">{item.category}</span>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                  <span className={`font-black text-2xl ${getScoreColor(item.score)}`}>{item.score}%</span>
                </div>
                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full ${getBarColor(item.color)}`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <h2 className="text-2xl font-bold mb-8">Confidence Improvement Suggestions</h2>
          <div className="space-y-5">
            {suggestions.map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-white/10 p-5">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><BarChart3 className="text-violet-600" /><h2 className="text-2xl font-bold">Confidence Trend Over Sessions</h2></div>
          <div className="grid md:grid-cols-5 gap-5">
            {sessionComparison.map((s, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${i === 4 ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <p className="text-sm text-gray-500">{s.session}</p>
                <p className={`text-3xl font-black mt-4 ${getScoreColor(s.score)}`}>{s.score}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3"><Shield className="text-cyan-600" /><h2 className="text-2xl font-bold">Interview Confidence Readiness</h2></div>
              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">Your answer shows moderate confidence with room for improvement. Focus on eliminating hedging language and using more assertive, action-oriented words to project greater competence.</p>
            </div>
            <div className="text-center">
              <p className={`text-7xl font-black ${getScoreColor(stats.overallConfidence)}`}>{stats.overallConfidence}%</p>
              <p className="text-gray-500 mt-2">Good Confidence</p>
            </div>
          </div>
          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600" style={{ width: `${stats.overallConfidence}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewAnswerConfidenceScore;
