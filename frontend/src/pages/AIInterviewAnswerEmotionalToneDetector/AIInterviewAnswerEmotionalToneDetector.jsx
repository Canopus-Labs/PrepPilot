""import React, { useState } from "react";
import {
  Brain,
  MessageSquareText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  Heart,
  Zap,
  Shield,
} from "lucide-react";

const AIInterviewAnswerEmotionalToneDetector = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = {
    toneScore: 76,
    detectedEmotions: 4,
    dominantTone: "Confident",
    toneConsistency: 82,
  };

  const questions = [
    { title: "Describe a time you handled a difficult coworker.", category: "Behavioral" },
    { title: "How would you design a scalable API system?", category: "Technical" },
    { title: "What are your greatest strengths and weaknesses?", category: "HR" },
  ];

  const emotions = [
    { type: "Confident", count: 12, percentage: 48, severity: "High", color: "green" },
    { type: "Enthusiastic", count: 6, percentage: 24, severity: "Medium", color: "blue" },
    { type: "Hesitant", count: 4, percentage: 16, severity: "Medium", color: "orange" },
    { type: "Nervous", count: 3, percentage: 12, severity: "Low", color: "red" },
  ];

  const transcript = [
    { text: "I", emotion: "neutral" }, { text: "definitely", emotion: "confident" },
    { text: "handled", emotion: "neutral" }, { text: "the", emotion: "neutral" },
    { text: "situation", emotion: "neutral" }, { text: "by", emotion: "neutral" },
    { text: "communicating", emotion: "confident" }, { text: "openly", emotion: "neutral" },
    { text: "and", emotion: "neutral" }, { text: "I", emotion: "neutral" },
    { text: "think", emotion: "hesitant" }, { text: "we", emotion: "neutral" },
    { text: "reached", emotion: "confident" }, { text: "a", emotion: "neutral" },
    { text: "great", emotion: "enthusiastic" }, { text: "outcome", emotion: "neutral" },
    { text: "for", emotion: "neutral" }, { text: "the", emotion: "neutral" },
    { text: "team.", emotion: "neutral" }, { text: "It", emotion: "neutral" },
    { text: "was", emotion: "neutral" }, { text: "a", emotion: "neutral" },
    { text: "bit", emotion: "nervous" }, { text: "challenging", emotion: "neutral" },
    { text: "at", emotion: "neutral" }, { text: "times.", emotion: "neutral" },
  ];

  const getEmotionClasses = (emotion) => {
    if (emotion === "confident") return "text-green-600 font-semibold";
    if (emotion === "enthusiastic") return "text-blue-600 font-semibold";
    if (emotion === "hesitant") return "text-orange-500 font-semibold";
    if (emotion === "nervous") return "text-red-500 font-semibold";
    return "";
  };

  const getSeverityClasses = (severity) => {
    if (severity === "High") return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    if (severity === "Medium") return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const getBarColor = (color) => {
    if (color === "green") return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (color === "blue") return "bg-gradient-to-r from-blue-500 to-indigo-600";
    if (color === "orange") return "bg-gradient-to-r from-orange-500 to-amber-500";
    return "bg-gradient-to-r from-red-500 to-rose-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center">
            <Heart size={34} className="text-rose-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Interview Answer Emotional Tone Detector</h1>
            <p className="text-gray-500 mt-2">Analyze the emotional tone of your interview responses and understand how your delivery impacts the impression you make.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target className="mx-auto text-rose-600" size={30} />, label: "Tone Score", value: `${stats.toneScore}%` },
            { icon: <AlertTriangle className="mx-auto text-amber-500" size={30} />, label: "Detected Emotions", value: stats.detectedEmotions },
            { icon: <Zap className="mx-auto text-blue-600" size={30} />, label: "Dominant Tone", value: stats.dominantTone },
            { icon: <Shield className="mx-auto text-green-600" size={30} />, label: "Tone Consistency", value: `${stats.toneConsistency}%` },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
              {item.icon}
              <h3 className="mt-4 text-gray-500">{item.label}</h3>
              <p className="text-5xl font-black mt-3">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-5">
            <Brain size={32} />
            <h2 className="text-3xl font-bold">AI Emotional Tone Analysis</h2>
          </div>
          <p className="leading-8 text-white/90">The AI analyzes your interview responses to detect emotional undertones such as confidence, enthusiasm, hesitation, or nervousness. Understanding your delivery tone helps you project the right image during interviews.</p>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquareText className="text-rose-600" />
            <h2 className="text-2xl font-bold">Select Interview Question</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {questions.map((q, i) => (
              <button key={i} onClick={() => setSelectedQuestion(i)}
                className={`text-left rounded-2xl border p-6 transition ${selectedQuestion === i ? "border-rose-500 bg-rose-50 dark:bg-rose-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 text-sm">{q.category}</span>
                <h3 className="font-bold text-lg mt-4">{q.title}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-600" />
            <h2 className="text-2xl font-bold">Answer Transcript with Tone Analysis</h2>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">
            <p className="text-lg leading-10">
              {transcript.map((item, i) => (
                <span key={i} className={`mx-1 ${getEmotionClasses(item.emotion)}`}>{item.text}</span>
              ))}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 mt-6">
            {[
              { label: "Confident", color: "bg-green-500" },
              { label: "Enthusiastic", color: "bg-blue-500" },
              { label: "Hesitant", color: "bg-orange-500" },
              { label: "Nervous", color: "bg-red-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${item.color}`} />
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-rose-600" />
            <h2 className="text-2xl font-bold">Emotion Breakdown</h2>
          </div>
          <div className="space-y-6">
            {emotions.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{item.type}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getSeverityClasses(item.severity)}`}>{item.severity}</span>
                  </div>
                  <span className="font-bold">{item.count} instances</span>
                </div>
                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full ${getBarColor(item.color)}`} style={{ width: `${item.percentage}%` }} />
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.percentage}% of analyzed segments</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-blue-600" />
            <h2 className="text-2xl font-bold">Tone Improvement Trend</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { session: "Session 1", score: 58, tone: "Nervous" },
              { session: "Session 2", score: 63, tone: "Hesitant" },
              { session: "Session 3", score: 68, tone: "Mixed" },
              { session: "Session 4", score: 73, tone: "Confident" },
              { session: "Current", score: 76, tone: "Confident" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${i === 4 ? "border-rose-500 bg-rose-50 dark:bg-rose-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <p className="text-sm text-gray-500">{s.session}</p>
                <p className="text-3xl font-black mt-4">{s.score}%</p>
                <p className="text-sm text-gray-500 mt-1">{s.tone}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3">
                <Shield className="text-rose-600" />
                <h2 className="text-2xl font-bold">Interview Tone Readiness</h2>
              </div>
              <p className="text-gray-500 mt-4 leading-7 max-w-2xl">Your responses show a strong confident tone with occasional moments of hesitation. Focusing on eliminating hesitant language will improve your overall tone score significantly.</p>
            </div>
            <div className="text-center">
              <p className="text-7xl font-black text-rose-600">{stats.toneScore}%</p>
              <p className="text-gray-500 mt-2">Good Tone</p>
            </div>
          </div>
          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-500 to-purple-600" style={{ width: `${stats.toneScore}%` }} />
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <h2 className="text-2xl font-bold mb-8">Tone Improvement Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Zap className="text-amber-500" size={24} />, title: "Reduce Hesitant Language", description: "Replace phrases like 'I think' and 'maybe' with direct statements when you are confident in your answer." },
              { icon: <TrendingUp className="text-green-500" size={24} />, title: "Project More Enthusiasm", description: "Show genuine interest by varying your tone and emphasizing key achievements with positive energy." },
              { icon: <Shield className="text-blue-500" size={24} />, title: "Maintain Steady Confidence", description: "Avoid sudden tone shifts. Keep a consistent confident tone throughout your answer." },
              { icon: <Sparkles className="text-rose-500" size={24} />, title: "Practice Positive Self-talk", description: "Build genuine confidence through practice and preparation so your positive tone feels natural." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">{item.icon}<h3 className="font-bold text-lg">{item.title}</h3></div>
                <p className="text-gray-500 leading-6">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4"><Brain size={30} /><h2 className="text-3xl font-bold">AI Final Insight</h2></div>
              <p className="leading-8 text-white/90 max-w-3xl">Your interview tone is generally positive with strong confident markers. Work on reducing hesitant language and maintaining consistent energy throughout your answers. The dominant confident tone leaves a strong impression.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto"><Heart size={40} /></div>
              <h3 className="mt-4 text-2xl font-bold">Tone Growth</h3>
              <p className="text-5xl font-black">+31%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewAnswerEmotionalToneDetector;
