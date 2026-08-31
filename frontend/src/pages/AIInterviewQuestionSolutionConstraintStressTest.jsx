import React, { useState } from "react";
import {
  Brain,
  Gauge,
  MemoryStick,
  Server,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Target,
} from "lucide-react";

const stressTests = [
  {
    name: "Input Size",
    original: "n ≤ 1,000",
    stressed: "n ≤ 1,000,000",
    result: "Slow",
    score: 54,
    explanation:
      "The current O(n²) approach becomes too expensive at one million elements.",
  },
  {
    name: "Memory Constraint",
    original: "512 MB",
    stressed: "64 MB",
    result: "Risk",
    score: 61,
    explanation:
      "The auxiliary data structure may consume more memory than the new limit allows.",
  },
  {
    name: "Request Volume",
    original: "100 requests/min",
    stressed: "10,000 requests/min",
    result: "Needs Optimization",
    score: 68,
    explanation:
      "The current design may struggle to maintain response times under higher traffic.",
  },
];

export default function AIInterviewQuestionSolutionConstraintStressTest() {
  const [solution, setSolution] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [optimization, setOptimization] = useState("");
  const [optimized, setOptimized] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Constraint Stress Test
          </h1>

          <p className="text-gray-500">
            Discover how your solution behaves when real-world constraints
            become significantly more demanding.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find the pair of numbers in an array that adds up to a target.
        </h2>

        <div className="grid md:grid-cols-3 gap-3 mt-5">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Input
            </p>
            <p className="font-bold mt-1">
              n ≤ 1,000
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Memory
            </p>
            <p className="font-bold mt-1">
              512 MB
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Expected
            </p>
            <p className="font-bold mt-1">
              O(n)
            </p>
          </div>

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Proposed Solution
        </h2>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={7}
          placeholder="Explain your algorithm, complexity, and implementation..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Run Stress Test
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Result */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <AlertTriangle
                className="text-orange-600"
                size={32}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Scalability Assessment
                </p>

                <p className="text-5xl font-black text-orange-600 mt-1">
                  63%
                </p>

                <h2 className="font-bold text-orange-700 mt-2">
                  Optimization Recommended
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution works under the original constraints but
                  becomes inefficient when the input size and workload
                  increase.
                </p>

              </div>

            </div>

          </div>

          {/* Stress Test Cards */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Constraint Stress Tests
            </h2>

            <div className="space-y-4 mt-5">

              {stressTests.map((test) => (
                <button
                  type="button"
                  key={test.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === test.name ? null : test
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">

                      {test.name === "Input Size" ? (
                        <Gauge className="text-indigo-600" />
                      ) : test.name === "Memory Constraint" ? (
                        <MemoryStick className="text-indigo-600" />
                      ) : (
                        <Server className="text-indigo-600" />
                      )}

                      <div>

                        <h3 className="font-semibold">
                          {test.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {test.original} →{" "}
                          <strong>{test.stressed}</strong>
                        </p>

                      </div>

                    </div>

                    <span className="font-bold text-orange-600">
                      {test.score}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${test.score}%`,
                      }}
                    />

                  </div>

                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    {test.result}
                  </span>

                  {selected?.name === test.name && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-sm text-gray-600">
                        {test.explanation}
                      </p>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Complexity */}
          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Current Complexity
              </p>

              <p className="text-3xl font-black text-orange-600 mt-2">
                O(n²)
              </p>

              <p className="text-gray-600 mt-2">
                Performance degrades rapidly as input size increases.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Recommended Complexity
              </p>

              <p className="text-3xl font-black text-green-600 mt-2">
                O(n)
              </p>

              <p className="text-gray-600 mt-2">
                A hash-based approach can provide linear-time processing.
              </p>

            </div>

          </div>

          {/* Optimization Challenge */}
          {!optimized && (
            <div className="bg-indigo-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <Zap className="text-indigo-600" />

                <div className="flex-1">

                  <h2 className="font-bold text-indigo-700">
                    Optimization Challenge
                  </h2>

                  <p className="text-gray-600 mt-2">
                    The input size has increased from 1,000 to 1,000,000.
                    How would you modify your solution to maintain acceptable
                    performance?
                  </p>

                  <textarea
                    value={optimization}
                    onChange={(e) => setOptimization(e.target.value)}
                    rows={5}
                    placeholder="Explain your optimized approach..."
                    className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    disabled={!optimization.trim()}
                    onClick={() => setOptimized(true)}
                    className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
                  >
                    Submit Optimization
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* Success */}
          {optimized && (
            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2 className="text-green-600" />

                <div>

                  <h2 className="font-bold text-green-700">
                    Optimization Response Recorded
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Your revised approach has been submitted for evaluation.
                    AI will compare its complexity, memory usage, and
                    scalability against the stressed constraints.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* AI Insight */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Scalability Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  A solution should not only satisfy the original constraints.
                  Strong interview candidates also consider what happens when
                  input size, memory limits, traffic, or workload increases.
                  Always connect complexity to the expected scale.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}