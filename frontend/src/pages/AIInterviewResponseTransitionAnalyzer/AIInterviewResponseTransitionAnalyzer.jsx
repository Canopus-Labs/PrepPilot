import React, { useState } from "react";
import {
  GitBranch,
  ArrowRight,
  FlowTriangle,
  RefreshCw,
  Brain,
  TrendingUp,
  Target,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AIInterviewResponseTransitionAnalyzer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = { flowScore: 68, transitionsUsed: 4, abruptSwitches: 2, smoothConnectors: 5 };

  const questions = [
    { title: "Walk me through your resume and background.", category: "Behavioral" },
    { title: "How do you approach debugging a complex production issue?", category: "Technical" },
    { title: "Where do you see yourself in the next three years?", category: "HR" },
  ];

  const segments = [
    { topic: "Introduction", content: "I have five years of experience in software development, primarily working with React and Node.js applications.", quality: "smooth" },
    { topic: "Project Experience", content: "Moving on to my most recent role, I led the frontend team and rebuilt our entire application architecture using modern tooling.", quality: "smooth" },
    { topic: "Technical Skills", content: "I also have strong backend experience with microservices and cloud infrastructure.", quality: "smooth" },
    { topic: "Personal Traits", content: "I am a good communicator and enjoy collaborating with cross-functional teams.", quality: "abrupt" },
    { topic: "Closing", content: "I am excited about this opportunity and believe my background aligns well with what you are looking for.", quality: "abrupt" },
  ];

  const transitionPhrases = [
    { phrase: "Building on that experience...", type: "Sequential", quality: "Positive", useCase: "Adds to a previous point smoothly" },
    { phrase: "Shifting to the technical side...", type: "Pivot", quality: "Positive", useCase: "Transitions between major topics" },
    { phrase: "What really drives me is...", type: "Emphasis", quality: "Positive", useCase: "Highlights a key motivation or skill" },
    { phrase: "To give you a concrete example...", type: "Illustration", quality: "Positive", useCase: "Introduces a specific story or case" },
  ];

  const sessionTrend = [
    { session: "Session 1", score: 45 },
    { session: "Session 2", score: 52 },
    { session: "Session 3", score: 58 },
    { session: "Session 4", score: 64 },
    { session: "Current", score: 68 },
  ];

  const getQualityBadge = (quality) => {
    if (quality === "smooth") return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
            <GitBranch size={34} className="text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Interview Response Transition Analyzer</h1>
            <p className="text-gray-500 mt-2">Analyze how smoothly your interview answer transitions between topics and learn how to structure longer responses with better flow and coherence.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FlowTriangle className="mx-auto text-orange-600" size={30} />, label: "Flow Score", value: `${stats.flowScore}%` },
            { icon: <GitBranch className="mx-auto text-blue-600" size={30} />, label: "Transitions Used", value: stats.transitionsUsed },
            { icon: <XCircle className="mx-auto text-red-500" size={30} />, label: "Abrupt Switches", value: stats.abruptSwitches },
            { icon: <CheckCircle2 className="mx-auto text-green-600" size={30} />, label: "Smooth Connectors", value: stats.smoothConnectors },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
              {item.icon}
              <h3 className="mt-4 text-gray-500">{item.label}</h3>
              <p className="text-5xl font-black mt-3">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-5"><Brain size={32} /><h2 className="text-3xl font-bold">AI Transition Analysis</h2></div>
          <p className="leading-8 text-white/90">The AI analyzes the flow and coherence of your interview responses, identifying how smoothly you transition between topics and whether your answer feels like a connected narrative or a collection of disconnected points.</p>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><GitBranch className="text-orange-600" /><h2 className="text-2xl font-bold">Select Interview Question</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {questions.map((q, i) => (
              <button key={i} onClick={() => setSelectedQuestion(i)}
                className={`text-left rounded-2xl border p-6 transition ${selectedQuestion === i ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-sm">{q.category}</span>
                <h3 className="font-bold text-lg mt-4">{q.title}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><FlowTriangle className="text-blue-600" /><h2 className="text-2xl font-bold">Answer Breakdown with Transition Analysis</h2></div>
          <div className="space-y-5">
            {segments.map((seg, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-2">
                  <ArrowRight className="text-gray-400" size={16} />
                  <span className="font-bold text-lg">{seg.topic}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getQualityBadge(seg.quality)}`}>{seg.quality === "smooth" ? "Smooth transition" : "Abrupt switch"}</span>
                </div>
                <div className="ml-6 rounded-xl border border-gray-200 dark:border-white/10 p-5">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">"{seg.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Target className="text-green-600" /><h2 className="text-2xl font-bold">Flow and Coherence Rating</h2></div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Topic Coherence", score: 72 },
              { label: "Transition Smoothness", score: 65 },
              { label: "Overall Flow", score: 68 },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">
                <p className="text-gray-500">{item.label}</p>
                <p className={`text-4xl font-black mt-3 ${getScoreColor(item.score)}`}>{item.score}%</p>
                <div className="mt-4 w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-gray-500 mb-2">Overall Flow Score</p>
            <div className="w-full h-6 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500" style={{ width: `${stats.flowScore}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><RefreshCw className="text-violet-600" /><h2 className="text-2xl font-bold">Suggested Transition Phrases</h2></div>
          <div className="space-y-4">
            {transitionPhrases.map((item, i) => (
              <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-bold text-indigo-600">"{item.phrase}"</p>
                    <p className="text-gray-500 text-sm mt-1">{item.useCase}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 text-sm">{item.type}</span>
                    <p className="text-green-600 font-semibold text-sm mt-1">{item.quality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><TrendingUp className="text-green-600" /><h2 className="text-2xl font-bold">Flow Score Improvement Trend</h2></div>
          <div className="grid md:grid-cols-5 gap-5">
            {sessionTrend.map((s, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${i === 4 ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" : "border-gray-200 dark:border-white/10"}`}>
                <p className="text-sm text-gray-500">{s.session}</p>
                <p className={`text-3xl font-black mt-4 ${getScoreColor(s.score)}`}>{s.score}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-6"><Brain size={30} /><h2 className="text-3xl font-bold">AI Transition Improvement Tips</h2></div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Use bridge phrases like 'Building on that...' to connect related ideas.",
              "Signal topic changes explicitly: 'Shifting to the technical side...'",
              "Replace abrupt jumps with narrative connectors that explain the link.",
              "Practice the STAR method to structure answers with natural transitions.",
              "Record yourself and identify where your answer feels choppy.",
              "Use emphasis phrases to highlight key points while maintaining flow.",
            ].map((tip, i) => (
              <div key={i} className="rounded-xl bg-white/10 p-5">
                <span className="font-semibold">{i + 1}. {tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewResponseTransitionAnalyzer;
