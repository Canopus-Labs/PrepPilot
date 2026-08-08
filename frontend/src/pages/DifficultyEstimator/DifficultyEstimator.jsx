import React, { useState } from "react";
import { Brain, Sparkles, Send, BookOpen } from "lucide-react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const DIFFICULTY_COLORS = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
  Expert: "bg-purple-100 text-purple-700",
};

const DifficultyEstimator = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axiosInstance.post(API_PATHS.AI.DIFFICULTY_ESTIMATE, {
        question: question.trim(),
      });
      setResult(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to estimate difficulty. Please try again.");
      setResult({
        difficulty: "Medium",
        confidence: 50,
        estimatedTime: "20 Minutes",
        prerequisites: ["Data Structures", "Algorithms"],
        analysis: "Difficulty estimation is temporarily unavailable.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <Brain size={34} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Interview Question Difficulty Estimator</h1>
            <p className="text-gray-500 mt-2">
              Analyze interview questions and estimate their difficulty, solving time, confidence score, and prerequisite topics.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={22} className="text-violet-600" />
            <h2 className="text-2xl font-bold">Interview Question</h2>
          </div>
          <textarea
            rows={8}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Paste an interview question here..."
            className="w-full rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] p-5 outline-none"
          />
          <button
            onClick={analyzeQuestion}
            disabled={loading}
            className="mt-6 flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <Send size={18} />
            {loading ? "Analyzing..." : "Analyze Question"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8">

            {/* Main Analysis */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center">
                <Sparkles size={32} className="mx-auto text-violet-600 mb-5" />
                <h3 className="text-gray-500 mb-3">Difficulty Level</h3>
                <span className={`inline-flex px-6 py-3 rounded-full text-xl font-bold ${DIFFICULTY_COLORS[result.difficulty] || "bg-gray-100 text-gray-700"}`}>
                  {result.difficulty}
                </span>
              </div>
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center">
                <Brain size={32} className="mx-auto text-blue-600 mb-5" />
                <h3 className="text-gray-500 mb-3">AI Confidence</h3>
                <div className="text-5xl font-black text-blue-600">{result.confidence}%</div>
              </div>
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center">
                <BookOpen size={32} className="mx-auto text-green-600 mb-5" />
                <h3 className="text-gray-500 mb-3">Estimated Solving Time</h3>
                <div className="text-3xl font-bold text-green-600">{result.estimatedTime}</div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">AI Analysis</h2>
              <p className="leading-8 text-gray-600 dark:text-gray-300">
                {result.analysis || `This interview question has been classified as ${result.difficulty}.`}
              </p>
            </div>

            {/* Recommended Topics */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Recommended Prerequisite Topics</h2>
              <div className="flex flex-wrap gap-4">
                {(result.prerequisites || []).map((topic, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default DifficultyEstimator;
