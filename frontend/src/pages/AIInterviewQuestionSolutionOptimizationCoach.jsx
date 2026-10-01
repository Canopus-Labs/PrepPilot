import React, { useState } from "react";
import {
  Brain,
  Zap,
  Target,
  Code2,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

const optimizationSteps = [
  {
    title: "Identify the Bottleneck",
    description:
      "Find the operation or section responsible for most of the execution cost.",
    status: "Completed",
  },
  {
    title: "Question the Bottleneck",
    description:
      "Consider whether the repeated operation can be reduced or avoided.",
    status: "Current",
  },
  {
    title: "Explore Alternatives",
    description:
      "Look for a data structure, algorithm, or preprocessing technique that reduces the cost.",
    status: "Next",
  },
  {
    title: "Compare Complexity",
    description:
      "Compare the original and optimized time and space complexity.",
    status: "Next",
  },
];

const hints = [
  "Which operation is repeated for every element?",
  "Can you avoid scanning the same information multiple times?",
  "Would a different data structure make lookups faster?",
  "Can some information be precomputed?",
];

export default function AIInterviewQuestionSolutionOptimizationCoach() {
  const [solution, setSolution] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const analyzeSolution = () => {
    if (!solution.trim()) return;
    setAnalyzed(true);
  };

  const nextHint = () => {
    setHintIndex((previous) =>
      Math.min(previous + 1, hints.length - 1)
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Solution Optimization Coach
          </h1>

          <p className="text-gray-500">
            Improve a working solution through guided optimization instead of
            receiving the final implementation immediately.
          </p>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Given an array of integers, find whether any two elements add up
              to a given target value.
            </p>

          </div>

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Code2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Working Solution
            </h2>

            <p className="text-sm text-gray-500">
              Submit the approach or code you would initially use.
            </p>

          </div>

        </div>

        <textarea
          rows={10}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder={`Example:

for each i:
    for each j after i:
        if nums[i] + nums[j] == target:
            return true

return false`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={analyzeSolution}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Solution
        </button>

      </div>

      {analyzed && (
        <>
          {/* Bottleneck */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl">

                <AlertTriangle
                  className="text-orange-600"
                  size={30}
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Main Bottleneck
                </p>

                <h2 className="text-2xl font-black text-orange-700 mt-1">
                  Repeated Pair Comparisons
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach checks many pairs of elements. As the input
                  grows, the number of comparisons increases quadratically.
                </p>

                <div className="inline-flex mt-4 px-3 py-2 rounded-lg bg-white font-mono text-sm">
                  Current Complexity: O(n²)
                </div>

              </div>

            </div>

          </div>

          {/* Optimization Progress */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Optimization Roadmap
                </h2>

                <p className="text-sm text-gray-500">
                  Follow the reasoning process instead of jumping directly to
                  the optimized implementation.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {optimizationSteps.map((step, index) => (

                <div
                  key={step.title}
                  className="flex gap-4"
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                        step.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : step.status === "Current"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {index < optimizationSteps.length - 1 && (
                      <div className="w-px h-12 bg-gray-200 mt-1" />
                    )}

                  </div>

                  <div className="pb-5">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="font-bold">
                        {step.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          step.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : step.status === "Current"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {step.status}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {step.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Optimization Question */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  AI OPTIMIZATION QUESTION
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-2">
                  Can you determine a way to remember information about
                  previously seen elements so you don't have to compare every
                  possible pair?
                </h2>

                <p className="text-gray-600 mt-3">
                  Think about what operation needs to be fast while processing
                  each element.
                </p>

                <button
                  type="button"
                  onClick={nextHint}
                  className="mt-4 px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold"
                >
                  Show Next Hint
                </button>

                <div className="mt-4 bg-white rounded-xl p-4">

                  <p className="text-xs font-bold text-gray-500">
                    Current Hint
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    {hints[hintIndex]}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Candidate Reasoning */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Explain Your Optimization
                </h2>

                <p className="text-sm text-gray-500">
                  Explain what you would change and why, without writing the
                  complete optimized code.
                </p>

              </div>

            </div>

            <textarea
              rows={7}
              placeholder="Example: I would use a data structure that provides fast lookup for values already encountered..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowComparison(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Evaluate Optimization Reasoning
            </button>

          </div>

          {/* Comparison */}
          {showComparison && (
            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3">

                <TrendingUp className="text-green-600" />

                <div>

                  <h2 className="font-bold text-lg">
                    Complexity Comparison
                  </h2>

                  <p className="text-sm text-gray-500">
                    Compare the current approach with the expected optimized
                    direction.
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5 mt-6">

                <div className="border rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Original Approach
                  </p>

                  <p className="text-3xl font-black text-orange-600 mt-2">
                    O(n²)
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Nested comparisons can become expensive as the input grows.
                  </p>

                </div>

                <div className="border rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Optimized Direction
                  </p>

                  <p className="text-3xl font-black text-green-600 mt-2">
                    O(n)
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Fast lookup can reduce repeated comparisons while processing
                    the input once.
                  </p>

                </div>

              </div>

              <div className="mt-5 bg-green-50 rounded-xl p-5">

                <div className="flex gap-3">

                  <CheckCircle2
                    className="text-green-600"
                    size={22}
                  />

                  <div>

                    <p className="font-bold text-green-700">
                      Optimization Direction Identified
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      The key improvement is replacing repeated pair scanning
                      with efficient lookup. The implementation is intentionally
                      not revealed so you can derive it independently.
                    </p>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Bottleneck Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Zap className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Bottleneck Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Understand exactly why the current solution becomes
                  inefficient.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Code2 className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Repeated Work
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  The same collection is repeatedly scanned to find matching
                  pairs.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <TrendingUp className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Growth Problem
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  The number of comparisons grows rapidly as input size
                  increases.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Lightbulb className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Optimization Direction
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Replace repeated searching with a faster lookup strategy.
                </p>

              </div>

            </div>

          </div>

          {/* Coach Principles */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Optimization Coaching Principles
                </h2>

                <div className="space-y-2 mt-3 text-gray-600">

                  <p>
                    • Identify the bottleneck before changing the algorithm.
                  </p>

                  <p>
                    • Ask questions that lead toward the optimization.
                  </p>

                  <p>
                    • Prefer hints over revealing the complete solution.
                  </p>

                  <p>
                    • Compare time and space trade-offs.
                  </p>

                  <p>
                    • Make the candidate explain why the optimization works.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Final Verdict */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Coach Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your initial solution is functionally valid, but its
                  quadratic complexity creates the main performance bottleneck.
                  The next step is to replace repeated searches with a faster
                  lookup strategy while considering the additional space cost.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  Try optimizing a solution with O(n²) time complexity while
                  keeping additional memory as low as possible. Explain the
                  trade-off before implementing the change.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Optimization Challenge
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}