import React, { useState } from "react";
import {
  Brain,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  GitCompare,
  Zap,
  Database,
} from "lucide-react";

const alternatives = [
  {
    name: "Hash Map",
    time: "O(n)",
    space: "O(n)",
    bestFor: "Fast lookups and duplicate detection",
    limitation: "Requires additional memory",
    score: 92,
    recommended: true,
  },
  {
    name: "Sorting + Two Pointers",
    time: "O(n log n)",
    space: "O(1) / O(log n)",
    bestFor: "Memory-constrained environments",
    limitation: "Sorting increases execution time",
    score: 81,
    recommended: false,
  },
  {
    name: "Brute Force",
    time: "O(n²)",
    space: "O(1)",
    bestFor: "Very small inputs or simple implementations",
    limitation: "Poor scalability for large inputs",
    score: 54,
    recommended: false,
  },
];

const limitations = [
  {
    title: "Memory Usage",
    severity: "Medium",
    description:
      "The proposed hash-based solution requires additional memory proportional to the input size.",
  },
  {
    title: "Input Constraints",
    severity: "High",
    description:
      "If the input becomes extremely large, the additional data structure may become expensive.",
  },
  {
    title: "Ordering Requirements",
    severity: "Low",
    description:
      "If the problem requires ordered output, an additional ordering strategy may be needed.",
  },
];

export default function AIInterviewAnswerTechnicalAlternativeRecommender() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <GitCompare size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Alternative Recommender
          </h1>

          <p className="text-gray-500">
            Discover alternative approaches and learn when each solution is
            preferable under different constraints.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find whether an array contains two elements whose sum equals a
          target value.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Arrays",
            "Hashing",
            "Two Pointers",
            "Complexity",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Candidate Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Proposed Approach
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Submit your approach. AI will identify limitations and recommend
          alternative solutions without simply replacing your answer.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain your proposed technical approach..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Alternatives
        </button>

      </div>

      {analyzed && (
        <>
          {/* Current Solution */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Brain
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Current Approach
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Hash Map Lookup
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach provides fast average-case lookup and is a
                  strong choice for the original problem constraints.
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  <span className="px-3 py-1 rounded-lg bg-white text-sm font-semibold">
                    Time: O(n)
                  </span>

                  <span className="px-3 py-1 rounded-lg bg-white text-sm font-semibold">
                    Space: O(n)
                  </span>

                  <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
                    Valid Solution
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Limitations */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Limitations Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution is valid, but these conditions may make an
                  alternative approach more suitable.
                </p>

                <div className="space-y-4 mt-5">

                  {limitations.map((item) => (
                    <div
                      key={item.title}
                      className="bg-white rounded-xl p-5"
                    >

                      <div className="flex justify-between gap-4">

                        <h3 className="font-bold">
                          {item.title}
                        </h3>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            item.severity === "High"
                              ? "bg-red-100 text-red-700"
                              : item.severity === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.severity}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {item.description}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Alternatives */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Recommended Alternative Approaches
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI ranks alternatives according to the constraints and
              limitations detected in your solution.
            </p>

            <div className="space-y-4 mt-6">

              {alternatives.map((alternative, index) => (
                <button
                  type="button"
                  key={alternative.name}
                  onClick={() =>
                    setSelectedAlternative(
                      selectedAlternative === index ? null : index
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div
                      className={`p-3 rounded-xl h-fit ${
                        alternative.recommended
                          ? "bg-green-100 text-green-600"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {alternative.name === "Hash Map" ? (
                        <Database size={23} />
                      ) : (
                        <GitCompare size={23} />
                      )}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="text-xs text-gray-500">
                            Option {index + 1}
                          </p>

                          <h3 className="font-bold text-lg mt-1">
                            {alternative.name}
                          </h3>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-black text-indigo-600">
                            {alternative.score}%
                          </p>

                          {alternative.recommended && (
                            <span className="text-xs text-green-600 font-semibold">
                              Best Match
                            </span>
                          )}

                        </div>

                      </div>

                      <div className="flex flex-wrap gap-3 mt-4">

                        <span className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-semibold">
                          Time: {alternative.time}
                        </span>

                        <span className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-semibold">
                          Space: {alternative.space}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        <strong>Best for:</strong>{" "}
                        {alternative.bestFor}
                      </p>

                      {selectedAlternative === index && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-indigo-700">
                            AI Recommendation
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            This approach is preferable when{" "}
                            {alternative.bestFor.toLowerCase()}.
                            Its main limitation is{" "}
                            {alternative.limitation.toLowerCase()}.
                          </p>

                          <button
                            type="button"
                            className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
                          >
                            Practice This Approach
                          </button>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitCompare className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Approach Comparison
                </h2>

                <p className="text-sm text-gray-500">
                  Compare solutions before deciding which approach best fits
                  the interview constraints.
                </p>

              </div>

            </div>

            <div className="overflow-x-auto mt-6">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3">
                      Approach
                    </th>

                    <th className="text-left p-3">
                      Time
                    </th>

                    <th className="text-left p-3">
                      Space
                    </th>

                    <th className="text-left p-3">
                      Best Use
                    </th>

                    <th className="text-left p-3">
                      Recommendation
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {alternatives.map((item) => (
                    <tr
                      key={item.name}
                      className="border-b"
                    >

                      <td className="p-3 font-semibold">
                        {item.name}
                      </td>

                      <td className="p-3">
                        {item.time}
                      </td>

                      <td className="p-3">
                        {item.space}
                      </td>

                      <td className="p-3 text-gray-600">
                        {item.bestFor}
                      </td>

                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.recommended
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.recommended
                            ? "Recommended"
                            : "Alternative"}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Changing Requirements */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              What If Requirements Change?
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              See how the preferred solution changes when interview
              constraints change.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Zap className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Very Large Input
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Prefer the O(n) hash-based approach when additional memory is
                  acceptable.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Database className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Memory Restricted
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Consider sorting and two pointers when minimizing extra
                  memory is more important.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Target className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Tiny Input
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  A simple brute-force implementation may be acceptable when
                  input size is very small.
                </p>

              </div>

            </div>

          </div>

          {/* Learning Insight */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Learning Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Your original solution is valid, but strong interview
                  performance also requires knowing when not to use it. Being
                  able to compare memory, speed, scalability, and simplicity
                  demonstrates stronger engineering judgment.
                </p>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Keep your current approach for the original constraints,
                  but practice explaining the sorting + two-pointer alternative.
                  An interviewer may change the memory constraint specifically
                  to test whether you can adapt your technical decision.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Compare Approaches
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}