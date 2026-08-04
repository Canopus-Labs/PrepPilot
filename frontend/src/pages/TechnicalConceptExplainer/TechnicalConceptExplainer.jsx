import React, { useState } from "react";
import {
  Brain,
  Search,
  BookOpen,
  GraduationCap,
  Layers,
  BarChart3,
  Star,
} from "lucide-react";

const TechnicalConceptExplainer = () => {
  const [concept, setConcept] = useState("Dynamic Programming");
  const [level, setLevel] = useState("Beginner");

  const [stats] = useState({
    conceptsLearned: 84,
    favorites: 19,
    progress: 76,
    aiScore: 94,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Brain size={34} className="text-violet-600" />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Technical Concept Explainer

            </h1>

            <p className="text-gray-500 mt-2">

              Learn interview concepts with AI explanations,
              examples and analogies.

            </p>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8 border border-gray-200 dark:border-white/10">

          <h2 className="text-xl font-bold mb-5">

            Search Technical Concept

          </h2>

          <div className="flex gap-4">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full pl-12 p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
                placeholder="Search..."
              />

            </div>

            <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 rounded-xl">

              Explain

            </button>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen className="mx-auto text-violet-600" size={32} />

            <h3 className="mt-4 text-gray-500">

              Concepts

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.conceptsLearned}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Star className="mx-auto text-yellow-500" size={32} />

            <h3 className="mt-4 text-gray-500">

              Favorites

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.favorites}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3 className="mx-auto text-green-600" size={32} />

            <h3 className="mt-4 text-gray-500">

              Progress

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.progress}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain className="mx-auto text-blue-600" size={32} />

            <h3 className="mt-4 text-gray-500">

              AI Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.aiScore}%

            </p>

          </div>

        </div>

        {/* Explanation Level */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Choose Explanation Level

          </h2>

          <div className="flex flex-wrap gap-4">

            {["Beginner", "Intermediate", "Advanced"].map((item) => (

              <button
                key={item}
                onClick={() => setLevel(item)}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  level === item
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 dark:bg-[#1f2937]"
                }`}
              >

                {item}

              </button>

            ))}

          </div>

        </div>

        {/* Beginner */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <GraduationCap className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Beginner Explanation

            </h2>

          </div>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Dynamic Programming is a technique used to solve
            problems by breaking them into smaller subproblems.
            Instead of solving the same problem again and again,
            we save the result and reuse it later.

          </p>

        </div>

        {/* Intermediate */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Layers className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Intermediate Explanation

            </h2>

          </div>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Dynamic Programming combines recursion with memoization
            or tabulation to avoid repeated computation. It is
            applicable when problems exhibit overlapping
            subproblems and optimal substructure.

          </p>

        </div>

        {/* Advanced */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Brain className="text-red-500" />

            <h2 className="text-2xl font-bold">

              Advanced Explanation

            </h2>

          </div>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Dynamic Programming transforms exponential recursive
            solutions into polynomial-time algorithms by defining
            state transitions, optimizing recurrence relations,
            minimizing state space, and selecting between top-down
            memoization or bottom-up tabulation strategies.

          </p>

        </div>

        {/* Learning Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Learning Progress

          </h2>

          {[
            ["Understanding", 90],
            ["Implementation", 80],
            ["Optimization", 70],
            ["Interview Confidence", 86],
          ].map(([title, value], i) => (

            <div key={i} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{title}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}
        </div>
                {/* Visual Example */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Visual Example

          </h2>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/20 p-8 border border-violet-200 dark:border-violet-800">

            <p className="text-lg leading-8">

              Fibonacci Example

            </p>

            <div className="mt-6 text-center text-xl font-bold">

              F(5)

              <br />

              ↓

              <br />

              F(4) + F(3)

              <br />

              ↓

              <br />

              Store previously calculated values instead of
              recalculating them.

            </div>

          </div>

        </div>

        {/* Real World Analogy */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Real-world Analogy

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Imagine preparing for exams. Instead of solving the
            same difficult question repeatedly, you write the
            solution in your notebook and refer back to it later.
            Dynamic Programming follows the same idea by storing
            previously computed results.

          </p>

        </div>

        {/* Follow-up Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Follow-up Questions

          </h2>

          <div className="space-y-5">

            {[
              "What are overlapping subproblems?",
              "When should memoization be preferred over tabulation?",
              "How do you identify DP states?",
              "Can every recursive solution become DP?",
            ].map((q, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition"
              >

                {q}

              </div>

            ))}

          </div>

        </div>

        {/* Related Concepts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Related Concepts

          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "Recursion",
              "Memoization",
              "Tabulation",
              "Greedy Algorithms",
              "Backtracking",
              "Divide & Conquer",
              "Graphs",
              "Shortest Path",
            ].map((topic) => (

              <span
                key={topic}
                className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
              >

                {topic}

              </span>

            ))}

          </div>

        </div>

        {/* Favorite Concepts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Favorite Concepts

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Binary Search",
              "Dynamic Programming",
              "Graphs",
              "Operating Systems",
            ].map((item) => (

              <div
                key={item}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {item}

                </span>

                <Star className="text-yellow-500 fill-yellow-500" />

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Learning Recommendations

          </h2>

          <p className="leading-8 text-white/90">

            Since you've mastered recursion, AI recommends
            learning Dynamic Programming patterns next,
            followed by Graph Algorithms and Greedy
            Techniques to strengthen your interview skills.

          </p>

        </div>

        {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Concept Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Dynamic Programming is one of the most frequently
            asked interview topics. Understanding state,
            transition, and optimization techniques will help
            solve many difficult coding problems efficiently.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Learn Concepts, Not Just Solutions 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Strong interview performance comes from deep
                conceptual understanding. Keep exploring,
                asking questions, and connecting ideas to
                become a better problem solver.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">🧠</div>

              <h3 className="text-2xl font-bold mt-4">

                Concept Mastery

              </h3>

              <p className="text-5xl font-black">

                94%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default TechnicalConceptExplainer;