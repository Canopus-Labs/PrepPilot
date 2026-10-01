import React, { useState } from "react";
import {
  Brain,
  Target,
  Lightbulb,
  Clock3,
  Database,
  AlertTriangle,
  Code2,
  TrendingUp,
} from "lucide-react";

const AIInterviewQuestionApproachEvaluator = () => {
  const [stats] = useState({
    approachScore: 87,
    efficiencyScore: 82,
    edgeCaseCoverage: 76,
    optimizationScore: 84,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const questions = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      score: 92,
    },
    {
      title: "Merge Intervals",
      difficulty: "Medium",
      score: 85,
    },
    {
      title: "LRU Cache",
      difficulty: "Hard",
      score: 79,
    },
  ];

  const approachCriteria = [
    {
      title: "Approach Correctness",
      score: 87,
      description:
        "Evaluates whether the proposed strategy can correctly solve the given problem.",
      icon: Target,
    },
    {
      title: "Problem Decomposition",
      score: 90,
      description:
        "Measures how effectively the problem is divided into smaller, manageable steps.",
      icon: Brain,
    },
    {
      title: "Efficiency",
      score: 82,
      description:
        "Checks whether the selected approach uses appropriate time and space resources.",
      icon: TrendingUp,
    },
    {
      title: "Edge Case Awareness",
      score: 76,
      description:
        "Identifies whether important boundary conditions and unusual inputs were considered.",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

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
              AI Interview Question Approach Evaluator
            </h1>

            <p className="text-gray-500 mt-2">
              Evaluate your problem-solving approach before submitting
              your final answer and learn how to make your reasoning more
              efficient.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Approach Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.approachScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Efficiency Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.efficiencyScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Edge Case Coverage
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.edgeCaseCoverage}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Lightbulb
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Optimization Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.optimizationScore}%
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Approach Analysis
          </h2>

          <p className="leading-8 text-white/90">
            The AI evaluates your proposed approach before the final
            answer is submitted. It checks correctness, efficiency,
            complexity, edge cases, and opportunities for optimization.
            This helps you improve the reasoning process instead of
            focusing only on the final result.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <h3 className="font-bold text-lg">
                  {question.title}
                </h3>

                <div className="flex justify-between items-center mt-5">

                  <span className="text-gray-500">
                    {question.difficulty}
                  </span>

                  <span className="font-bold text-violet-600">
                    {question.score}%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <p className="text-sm text-gray-500">
            Selected Question
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {questions[selectedQuestion].title}
          </h2>

          <div className="flex flex-wrap gap-4 mt-6">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {questions[selectedQuestion].difficulty}
            </span>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
              Approach Quality: {questions[selectedQuestion].score}%
            </span>

          </div>

        </div>

        {/* User Approach */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Your Current Approach
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

            <p className="leading-8">
              Use a hash map to store each number and its index while
              iterating through the array. For every current value,
              calculate the required complement and check whether that
              complement already exists in the map. If it exists, return
              the stored index and the current index.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Approach Type
              </p>

              <p className="font-bold text-lg mt-2">
                Hash Map
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Estimated Time
              </p>

              <p className="font-bold text-lg mt-2">
                O(n)
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Estimated Space
              </p>

              <p className="font-bold text-lg mt-2">
                O(n)
              </p>

            </div>

          </div>

        </div>

        {/* Approach Evaluation Criteria */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Approach Evaluation
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {approachCriteria.map((criterion, index) => {

              const Icon = criterion.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Icon
                          size={22}
                          className="text-violet-600"
                        />

                      </div>

                      <h3 className="font-bold">
                        {criterion.title}
                      </h3>

                    </div>

                    <span className="text-xl font-black">
                      {criterion.score}%
                    </span>

                  </div>

                  <p className="text-gray-500 mt-5 leading-7">
                    {criterion.description}
                  </p>

                  <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{
                        width: `${criterion.score}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Complexity Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Complexity Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Time Complexity
              </p>

              <p className="text-4xl font-black mt-3">
                O(n)
              </p>

              <p className="text-gray-500 mt-4 leading-7">
                The array is traversed once and each hash map lookup
                takes constant average time.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Space Complexity
              </p>

              <p className="text-4xl font-black mt-3">
                O(n)
              </p>

              <p className="text-gray-500 mt-4 leading-7">
                The hash map can store up to n elements in the worst case.
              </p>

            </div>

          </div>

        </div>
                {/* Missing Edge Cases */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Missing Edge Cases
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Empty input array",
              "Array containing duplicate values",
              "Negative numbers",
              "Input containing only one element",
              "No valid pair exists",
            ].map((edgeCase, index) => (

              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-orange-200 dark:border-orange-900/20 p-5"
              >

                <AlertTriangle
                  size={22}
                  className="text-orange-500 shrink-0"
                />

                <span className="font-semibold">
                  {edgeCase}
                </span>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-6">

            <h3 className="font-bold text-lg">
              AI Edge-Case Feedback
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
              Your primary approach is correct, but you should explicitly
              consider duplicate values and cases where no valid solution
              exists. Mentioning these cases during an interview
              demonstrates stronger problem understanding.
            </p>

          </div>

        </div>

        {/* Alternative Approaches */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Alternative Approaches
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "Brute Force",
                complexity: "O(n²) Time • O(1) Space",
                description:
                  "Check every possible pair using two nested loops. Simple to explain but inefficient for large inputs.",
                rating: 62,
              },
              {
                title: "Sorting + Two Pointers",
                complexity: "O(n log n) Time • O(n) Space",
                description:
                  "Sort the values and use two pointers. Efficient, but preserving original indices requires additional handling.",
                rating: 78,
              },
              {
                title: "Hash Map",
                complexity: "O(n) Time • O(n) Space",
                description:
                  "Store previously visited values and look up the required complement during a single traversal.",
                rating: 94,
              },
              {
                title: "Hybrid Lookup Strategy",
                complexity: "O(n) Average Time • O(n) Space",
                description:
                  "Use a lookup structure while carefully handling duplicates and previously visited values.",
                rating: 89,
              },
            ].map((approach, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="text-xl font-bold">
                    {approach.title}
                  </h3>

                  <span className="font-bold text-violet-600">
                    {approach.rating}%
                  </span>

                </div>

                <p className="text-sm text-violet-600 mt-3">
                  {approach.complexity}
                </p>

                <p className="text-gray-500 mt-4 leading-7">
                  {approach.description}
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${approach.rating}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Optimal Approach Comparison */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp size={30} />

            <h2 className="text-3xl font-bold">
              Your Approach vs Optimal Approach
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-2xl bg-white/10 p-7">

              <p className="text-white/70">
                Your Approach
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Hash Map Lookup
              </h3>

              <div className="space-y-3 mt-6">

                <p>✓ Single-pass traversal</p>
                <p>✓ Fast complement lookup</p>
                <p>✓ O(n) average time</p>
                <p>✓ Suitable for large inputs</p>

              </div>

            </div>

            <div className="rounded-2xl bg-white/10 p-7">

              <p className="text-white/70">
                AI Recommended Approach
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Hash Map With Edge-Case Handling
              </h3>

              <div className="space-y-3 mt-6">

                <p>✓ Same optimal complexity</p>
                <p>✓ Handles duplicate values</p>
                <p>✓ Handles missing solutions</p>
                <p>✓ Clearer interview explanation</p>

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-white/10 p-6">

            <p className="leading-7">
              <strong>AI Verdict:</strong> Your core approach is already
              optimal. The main improvement is not changing the algorithm,
              but explaining edge cases and why the hash map provides
              better performance than the brute-force alternative.
            </p>

          </div>

        </div>

        {/* Optimization Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Optimization Suggestions
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Explain why hash-map lookup is preferable to nested loops.",
              "Mention average O(1) lookup complexity explicitly.",
              "Discuss the trade-off between additional memory and faster execution.",
              "Explain how duplicate values are handled.",
              "Clarify what happens when no valid pair exists.",
              "State the expected input constraints before selecting the approach.",
            ].map((suggestion, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {suggestion}

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            AI Problem-Solving Recommendations
          </h2>

          <div className="space-y-5">

            {[
              "Start every technical question by clarifying the input, output, and constraints.",
              "Describe a simple solution first before explaining the optimized approach.",
              "Compare complexity when choosing between multiple approaches.",
              "Think through edge cases before writing implementation code.",
              "Explain why your selected data structure fits the problem.",
              "Practice verbalizing your reasoning instead of silently solving the problem.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl bg-violet-50 dark:bg-violet-900/10 p-5"
              >

                <span className="font-semibold">
                  🧠 {recommendation}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Approach Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Approach Performance Analytics
          </h2>

          {[
            ["Approach Correctness", stats.approachScore],
            ["Problem Decomposition", 90],
            ["Approach Efficiency", stats.efficiencyScore],
            ["Edge Case Coverage", stats.edgeCaseCoverage],
            ["Optimization Awareness", stats.optimizationScore],
            ["Overall Reasoning Quality", 88],
          ].map(([label, value], index) => (

            <div key={index} className="mb-7">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Interview Readiness */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Technical Interview Approach Readiness
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your approach is strong and generally efficient. Before
                submitting your final answer, focus on explicitly
                discussing constraints, edge cases, and the trade-offs
                behind your chosen solution.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                87%
              </p>

              <p className="text-gray-500 mt-2">
                Interview Ready
              </p>

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Think Before You Code 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Strong technical interview performance comes from
                explaining why your solution works, not just producing
                the correct output. Practice comparing approaches,
                analyzing trade-offs, and identifying edge cases before
                you start coding.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Approach Score
              </h3>

              <p className="text-5xl font-black">
                {stats.approachScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionApproachEvaluator;