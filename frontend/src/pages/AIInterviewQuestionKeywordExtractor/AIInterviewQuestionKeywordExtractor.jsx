import React, { useState } from "react";
import {
  Tag,
  Search,
  Brain,
  Layers,
  Zap,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Target,
} from "lucide-react";

const AIInterviewQuestionKeywordExtractor = () => {
  const [inputQuestion, setInputQuestion] = useState("How would you design a scalable microservices architecture using Kubernetes and handle service discovery in a distributed system?");

  const stats = { totalKeywords: 8, technicalDepth: 82, breadthScore: 65 };

  const keywords = [
    { term: "scalable", category: "Concept", score: 95, color: "violet" },
    { term: "microservices", category: "Technical", score: 90, color: "blue" },
    { term: "Kubernetes", category: "Tool", score: 88, color: "blue" },
    { term: "architecture", category: "Domain", score: 85, color: "green" },
    { term: "service discovery", category: "Technical", score: 82, color: "blue" },
    { term: "distributed system", category: "Technical", score: 80, color: "blue" },
    { term: "scalability", category: "Concept", score: 78, color: "violet" },
    { term: "containerization", category: "Concept", score: 65, color: "violet" },
  ];

  const questionIntent = { primary: "System Design", secondary: "Infrastructure", complexity: "Advanced", assessmentType: "Problem Solving & Architecture" };

  const followUpQuestions = [
    "How would you handle network partitions and eventual consistency?",
    "What monitoring and observability tools would you use at this scale?",
    "How would you approach database selection for each microservice?",
    "Describe your strategy for API versioning and backward compatibility.",
  ];

  const getCategoryBadge = (category) => {
    if (category === "Technical") return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    if (category === "Tool") return "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400";
    if (category === "Concept") return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400";
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getBarColor = (color) => {
    if (color === "violet") return "bg-gradient-to-r from-violet-500 to-purple-600";
    if (color === "blue") return "bg-gradient-to-r from-blue-500 to-indigo-600";
    if (color === "green") return "bg-gradient-to-r from-green-500 to-emerald-600";
    return "bg-gradient-to-r from-amber-500 to-orange-500";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
            <Tag size={34} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Interview Question Keyword Extractor</h1>
            <p className="text-gray-500 mt-2">Paste any interview question to extract key technical terms, understand the question intent, and identify what skills are being assessed.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Layers className="mx-auto text-indigo-600" size={30} />, label: "Total Keywords", value: stats.totalKeywords },
            { icon: <Zap className="mx-auto text-amber-500" size={30} />, label: "Technical Depth", value: `${stats.technicalDepth}%` },
            { icon: <TrendingUp className="mx-auto text-blue-600" size={30} />, label: "Breadth Score", value: `${stats.breadthScore}%` },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
              {item.icon}
              <h3 className="mt-4 text-gray-500">{item.label}</h3>
              <p className={`text-5xl font-black mt-3 ${getScoreColor(typeof item.value == int and item.value or (item.value))}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-5"><Brain size={32} /><h2 className="text-3xl font-bold">AI Keyword Extraction Analysis</h2></div>
          <p className="leading-8 text-white/90">The AI extracts and categorizes technical keywords, domain terms, and important concepts from interview questions. Understanding the keywords helps you prepare targeted, specific answers that demonstrate deep knowledge of each topic.</p>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Search className="text-indigo-600" /><h2 className="text-2xl font-bold">Enter Interview Question</h2></div>
          <textarea
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 text-lg leading-relaxed min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste your interview question here..."
          />
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Tag className="text-violet-600" /><h2 className="text-2xl font-bold">Extracted Keywords</h2></div>
          <div className="space-y-5">
            {keywords.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{item.term}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getCategoryBadge(item.category)}`}>{item.category}</span>
                  </div>
                  <span className="font-bold">{item.score}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full ${getBarColor(item.color)}`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><Target className="text-amber-500" /><h2 className="text-2xl font-bold">Question Intent Analysis</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Primary Assessment Area", value: questionIntent.primary },
              { label: "Secondary Area", value: questionIntent.secondary },
              { label: "Complexity Level", value: questionIntent.complexity },
              { label: "Assessment Type", value: questionIntent.assessmentType },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <p className="text-gray-500">{item.label}</p>
                <p className="text-xl font-black mt-2 text-indigo-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <div className="flex items-center gap-3 mb-8"><BookOpen className="text-blue-600" /><h2 className="text-2xl font-bold">Related Follow-up Questions</h2></div>
          <div className="space-y-4">
            {followUpQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-white/10 p-5">
                <ChevronRight className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">
          <h2 className="text-2xl font-bold mb-8">Keyword Category Breakdown</h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { category: "Technical", count: 4, color: "bg-blue-500" },
              { category: "Tool", count: 1, color: "bg-violet-500" },
              { category: "Concept", count: 2, color: "bg-green-500" },
              { category: "Domain", count: 1, color: "bg-amber-500" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 text-center">
                <div className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-3`} />
                <p className="text-gray-500 text-sm">{item.category}</p>
                <p className="text-3xl font-black mt-2">{item.count}</p>
                <p className="text-gray-500 text-sm">keywords</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewQuestionKeywordExtractor;
