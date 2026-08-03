import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Send,
  BookOpen,
} from "lucide-react";

const DifficultyEstimator = () => {
  const [question, setQuestion] = useState("");

  const [result, setResult] = useState(null);

  const analyzeQuestion = () => {
    if (!question.trim()) return;

    // Demo AI Result
    setResult({
      difficulty: "Hard",
      confidence: 94,
      estimatedTime: "35 Minutes",
      prerequisites: [
        "Binary Trees",
        "Depth First Search",
        "Recursion",
        "Dynamic Programming",
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Brain
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Difficulty Estimator
            </h1>

            <p className="text-gray-500 mt-2">

              Analyze interview questions and estimate
              their difficulty, solving time,
              confidence score, and prerequisite topics.

            </p>

          </div>

        </div>

        {/* Input */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <div className="flex items-center gap-3 mb-6">

            <BookOpen
              size={22}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Interview Question
            </h2>

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
            className="mt-6 flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >

            <Send size={18} />

            Analyze Question

          </button>

        </div>
        {result && (
          <>
            <div className="space-y-8">

            {/* Main Analysis */}

            <div className="grid md:grid-cols-3 gap-6">

              {/* Difficulty */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center">

                <Sparkles
                  size={32}
                  className="mx-auto text-violet-600 mb-5"
                />

                <h3 className="text-gray-500 mb-3">
                  Difficulty Level
                </h3>

                <span className="inline-flex px-6 py-3 rounded-full bg-red-100 text-red-700 text-xl font-bold">

                  {result.difficulty}

                </span>

              </div>

              {/* Confidence */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center">

                <Brain
                  size={32}
                  className="mx-auto text-blue-600 mb-5"
                />

                <h3 className="text-gray-500 mb-3">
                  AI Confidence
                </h3>

                <div className="text-5xl font-black text-blue-600">

                  {result.confidence}%

                </div>

              </div>

              {/* Estimated Time */}

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center">

                <BookOpen
                  size={32}
                  className="mx-auto text-green-600 mb-5"
                />

                <h3 className="text-gray-500 mb-3">
                  Estimated Solving Time
                </h3>

                <div className="text-3xl font-bold text-green-600">

                  {result.estimatedTime}

                </div>

              </div>

            </div>

            {/* Difficulty Overview */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-6">
                AI Analysis
              </h2>

              <p className="leading-8 text-gray-600 dark:text-gray-300">

                This interview question has been classified as
                <span className="font-bold text-red-600">
                  {" "}Hard{" "}
                </span>

                because it requires multiple algorithmic concepts,
                efficient optimization techniques,
                and strong problem-solving skills.

                Candidates should have a solid understanding of
                data structures and algorithm design before
                attempting this question.

              </p>

            </div>
                        {/* Recommended Topics */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-6">
                Recommended Prerequisite Topics
              </h2>

              <div className="flex flex-wrap gap-4">

                {result.prerequisites.map((topic, index) => (

                  <span
                    key={index}
                    className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
                  >
                    {topic}
                  </span>

                ))}

              </div>

            </div>

            {/* Difficulty Distribution */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-8">
                Difficulty Distribution
              </h2>

              <div className="space-y-6">

                {[
                  {
                    level: "Easy",
                    value: 20,
                    color: "bg-green-500",
                  },
                  {
                    level: "Medium",
                    value: 35,
                    color: "bg-yellow-500",
                  },
                  {
                    level: "Hard",
                    value: 75,
                    color: "bg-red-500",
                  },
                  {
                    level: "Expert",
                    value: 45,
                    color: "bg-purple-600",
                  },
                ].map((item, index) => (

                  <div key={index}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {item.level}
                      </span>

                      <span className="font-bold">
                        {item.value}%
                      </span>

                    </div>

                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{
                          width: `${item.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Difficulty Filter */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-6">
                Filter by Difficulty
              </h2>

              <div className="flex flex-wrap gap-4">

                <button className="px-5 py-3 rounded-xl bg-green-100 text-green-700 font-semibold">
                  Easy
                </button>

                <button className="px-5 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-semibold">
                  Medium
                </button>

                <button className="px-5 py-3 rounded-xl bg-red-100 text-red-700 font-semibold">
                  Hard
                </button>

                <button className="px-5 py-3 rounded-xl bg-purple-100 text-purple-700 font-semibold">
                  Expert
                </button>

              </div>

              <p className="mt-6 text-gray-600 dark:text-gray-300 leading-7">

                Use these filters to quickly browse interview
                questions according to your preparation level.
                Beginners can start with Easy questions,
                while experienced candidates can challenge
                themselves with Expert-level problems.

              </p>

            </div>

          </div>
                      {/* AI Recommendation */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-6">
                AI Recommendation
              </h2>

              <p className="leading-8 text-gray-600 dark:text-gray-300">

                Before attempting this question, strengthen your
                understanding of Trees, DFS, Recursion, and Dynamic
                Programming. Practice a few Medium-level questions
                first, then return to this problem to improve your
                confidence and problem-solving speed.

              </p>

            </div>

            {/* Motivation */}

            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

                <div>

                  <h2 className="text-3xl font-bold mb-4">
                    Keep Challenging Yourself 🚀
                  </h2>

                  <p className="leading-8 text-white/90">

                    Great interview preparation comes from solving
                    questions of increasing difficulty. Build a strong
                    foundation, stay consistent, and gradually move
                    from Easy to Expert-level interview questions.

                  </p>

                </div>

                <div className="text-center">

                  <div className="text-6xl">
                    🧠
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    AI Ready
                  </h3>

                  <p className="text-4xl font-black">
                    94%
                  </p>

                </div>

              </div>

            </div>
          </div>
        </>
        )}

      </div>

    </div>
  );
};

export default DifficultyEstimator;
          
        