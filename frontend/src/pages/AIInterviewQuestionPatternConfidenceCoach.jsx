import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const patterns = [
  "Two Pointers",
  "Sliding Window",
  "Hashing",
  "Binary Search",
  "Dynamic Programming",
];

export default function AIInterviewQuestionPatternConfidenceCoach() {
  const [selectedPattern, setSelectedPattern] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const expectedPattern = "Sliding Window";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Pattern Confidence Coach
          </h1>

          <p className="text-gray-500">
            Practice identifying the right problem-solving pattern before
            writing a solution.
          </p>
        </div>

      </div>

      {/* Challenge */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <Target className="text-indigo-600" />

          <span className="text-sm font-semibold text-indigo-700">
            Pattern Recognition Challenge
          </span>
        </div>

        <h2 className="text-xl font-bold mt-4">
          Given an array of positive integers and a target value, find the
          smallest contiguous subarray whose sum is greater than or equal to
          the target.
        </h2>

        <p className="text-gray-600 mt-3">
          Do not solve the problem yet. First identify the pattern you think
          is most appropriate.
        </p>

      </div>

      {/* Confidence */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <Lightbulb className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Which pattern would you use?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-5">

          {patterns.map((pattern) => (
            <button
              type="button"
              key={pattern}
              onClick={() => setSelectedPattern(pattern)}
              className={`p-4 rounded-xl border text-left font-semibold transition ${
                selectedPattern === pattern
                  ? "border-indigo-600 bg-indigo-100 text-indigo-700"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {pattern}
            </button>
          ))}

        </div>

        <button
          type="button"
          disabled={!selectedPattern}
          onClick={() => setSubmitted(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Submit Pattern
        </button>

      </div>

      {/* Result */}
      {submitted && (
        <>
          <div
            className={`rounded-2xl p-5 ${
              selectedPattern === expectedPattern
                ? "bg-green-50"
                : "bg-orange-50"
            }`}
          >

            <div className="flex gap-3">

              {selectedPattern === expectedPattern ? (
                <CheckCircle2 className="text-green-600" />
              ) : (
                <Target className="text-orange-600" />
              )}

              <div>

                <h2
                  className={`font-bold ${
                    selectedPattern === expectedPattern
                      ? "text-green-700"
                      : "text-orange-700"
                  }`}
                >
                  {selectedPattern === expectedPattern
                    ? "Correct Pattern Recognition"
                    : "Pattern Recognition Needs Improvement"}
                </h2>

                <p className="text-gray-600 mt-2">
                  Your prediction:{" "}
                  <strong>{selectedPattern}</strong>
                </p>

                <p className="text-gray-600">
                  Expected pattern:{" "}
                  <strong>{expectedPattern}</strong>
                </p>

              </div>

            </div>

          </div>

          {/* Score */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-indigo-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Pattern Recognition Accuracy
            </p>

            <p className="text-6xl font-black text-indigo-600">
              78%
            </p>

            <p className="text-gray-600 mt-2">
              Based on your recent pattern-identification attempts.
            </p>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Practice Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Practice unfamiliar problems where the pattern is hidden
                  instead of repeating known examples. Focus especially on
                  distinguishing Sliding Window from brute-force approaches.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Start Pattern Practice
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}