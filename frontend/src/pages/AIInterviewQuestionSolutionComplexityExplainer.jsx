import React, { useState } from "react";
import {
  Brain,
  Clock,
  Database,
  Code2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const operations = [
  {
    name: "Input traversal",
    count: "n",
    complexity: "O(n)",
    explanation: "The array is scanned once from beginning to end.",
    type: "Loop",
  },
  {
    name: "Hash map lookup",
    count: "n",
    complexity: "O(1) average",
    explanation:
      "Each element performs an average constant-time lookup in the hash map.",
    type: "Data Structure",
  },
  {
    name: "Hash map insertion",
    count: "n",
    complexity: "O(1) average",
    explanation:
      "Each processed value may be inserted into the hash map once.",
    type: "Data Structure",
  },
];

const memoryItems = [
  {
    name: "Hash map",
    complexity: "O(n)",
    explanation:
      "In the worst case, the map can store a value for every input element.",
  },
  {
    name: "Loop variables",
    complexity: "O(1)",
    explanation:
      "Only a constant number of variables are used during traversal.",
  },
];

const complexityComparison = [
  {
    metric: "Time Complexity",
    stated: "O(n)",
    detected: "O(n)",
    status: "Correct",
  },
  {
    metric: "Space Complexity",
    stated: "O(1)",
    detected: "O(n)",
    status: "Needs Correction",
  },
];

export default function AIInterviewQuestionSolutionComplexityExplainer() {
  const [solution, setSolution] = useState("");
  const [statedTime, setStatedTime] = useState("O(n)");
  const [statedSpace, setStatedSpace] = useState("O(1)");
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeSolution = () => {
    if (!solution.trim()) return;
    setAnalyzed(true);
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
            AI Interview Question Solution Complexity Explainer
          </h1>

          <p className="text-gray-500">
            Understand exactly where your time and space complexity comes from.
          </p>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Code2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Given an array of integers and a target, find two values whose
              sum equals the target.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Input Size
            </p>

            <p className="font-bold mt-1">
              n elements
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Expected Time
            </p>

            <p className="font-bold mt-1">
              O(n)
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Expected Space
            </p>

            <p className="font-bold mt-1">
              O(n)
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
              Submit Your Solution
            </h2>

            <p className="text-sm text-gray-500">
              Paste your code and state the complexity you believe it has.
            </p>

          </div>

        </div>

        <textarea
          rows={12}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder={`function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
}`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-5">

          <div>

            <label className="text-sm font-semibold">
              Your Stated Time Complexity
            </label>

            <select
              value={statedTime}
              onChange={(e) => setStatedTime(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option>O(1)</option>
              <option>O(log n)</option>
              <option>O(n)</option>
              <option>O(n log n)</option>
              <option>O(n²)</option>
              <option>O(2ⁿ)</option>
            </select>

          </div>

          <div>

            <label className="text-sm font-semibold">
              Your Stated Space Complexity
            </label>

            <select
              value={statedSpace}
              onChange={(e) => setStatedSpace(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option>O(1)</option>
              <option>O(log n)</option>
              <option>O(n)</option>
              <option>O(n log n)</option>
              <option>O(n²)</option>
            </select>

          </div>

        </div>

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={analyzeSolution}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Explain My Complexity
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Result */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <CheckCircle2
                  className="text-indigo-600"
                  size={42}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  AI Complexity Analysis
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-1">

                  <h2 className="text-4xl font-black text-indigo-700">
                    O(n) Time
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                    Space Needs Correction
                  </span>

                </div>

                <p className="text-gray-600 mt-3">
                  The solution performs one linear traversal and uses a hash
                  map that can grow with the number of input elements.
                </p>

              </div>

            </div>

          </div>

          {/* Complexity Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Stated vs Detected Complexity
                </h2>

                <p className="text-sm text-gray-500">
                  Compare your complexity claim with the AI analysis.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              {complexityComparison.map((item) => (

                <div
                  key={item.metric}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between">

                    <h3 className="font-bold">
                      {item.metric}
                    </h3>

                    {item.status === "Correct" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={21}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600"
                        size={21}
                      />
                    )}

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Your Answer
                      </p>

                      <p className="text-xl font-black mt-1">
                        {item.stated}
                      </p>

                    </div>

                    <div className="bg-indigo-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        AI Detected
                      </p>

                      <p className="text-xl font-black text-indigo-600 mt-1">
                        {item.detected}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Correct"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Operation Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Clock className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Time Complexity Breakdown
                </h2>

                <p className="text-sm text-gray-500">
                  AI breaks the solution into individual operations.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {operations.map((operation) => (

                <div
                  key={operation.name}
                  className="border rounded-xl p-5"
                >

                  <div className="flex items-start gap-4">

                    <div className="p-3 bg-indigo-50 rounded-xl">

                      {operation.type === "Loop" ? (
                        <Clock
                          className="text-indigo-600"
                          size={22}
                        />
                      ) : (
                        <Database
                          className="text-indigo-600"
                          size={22}
                        />
                      )}

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap justify-between gap-3">

                        <h3 className="font-bold">
                          {operation.name}
                        </h3>

                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                          {operation.complexity}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {operation.explanation}
                      </p>

                      <div className="mt-3 bg-gray-50 rounded-lg p-3">

                        <p className="text-xs text-gray-500">
                          Number of operations
                        </p>

                        <p className="font-bold mt-1">
                          {operation.count}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            <div className="mt-5 bg-indigo-50 rounded-xl p-5">

              <p className="font-bold text-indigo-700">
                Why the final complexity is O(n)
              </p>

              <p className="text-sm text-gray-600 mt-2">
                The loop processes each of the n elements once. Hash map
                lookups and insertions are O(1) on average, so the total work
                grows linearly with the input size.
              </p>

            </div>

          </div>

          {/* Space Complexity */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Database className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Space Complexity Breakdown
                </h2>

                <p className="text-sm text-gray-500">
                  Understand where additional memory is being consumed.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {memoryItems.map((item) => (

                <div
                  key={item.name}
                  className="border rounded-xl p-5"
                >

                  <div className="flex justify-between">

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                      {item.complexity}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {item.explanation}
                  </p>

                </div>
              ))}

            </div>

            <div className="mt-5 bg-orange-50 rounded-xl p-5">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-orange-600"
                  size={22}
                />

                <div>

                  <p className="font-bold text-orange-700">
                    Why your O(1) space answer is incorrect
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    The hash map stores information for potentially every
                    element in the input. Therefore, its memory usage can grow
                    linearly with n, resulting in O(n) auxiliary space.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Loop and Recursion Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Code2 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Control Flow Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  AI identifies loops, recursion, and repeated operations.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Clock className="text-indigo-600" />

                <p className="text-sm text-gray-500 mt-3">
                  Loops Detected
                </p>

                <p className="text-3xl font-black mt-1">
                  1
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Linear traversal
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <TrendingUp className="text-purple-600" />

                <p className="text-sm text-gray-500 mt-3">
                  Recursive Calls
                </p>

                <p className="text-3xl font-black mt-1">
                  0
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  No recursion detected
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Database className="text-green-600" />

                <p className="text-sm text-gray-500 mt-3">
                  Auxiliary Structures
                </p>

                <p className="text-3xl font-black mt-1">
                  1
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Hash map
                </p>

              </div>

            </div>

          </div>

          {/* Big O Explanation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Step-by-Step Complexity Explanation
                </h2>

                <div className="space-y-3 mt-4">

                  <p className="text-gray-600">
                    <strong>1.</strong> The algorithm iterates through n input
                    elements, creating n loop iterations.
                  </p>

                  <p className="text-gray-600">
                    <strong>2.</strong> Each iteration performs a constant-time
                    average hash map lookup.
                  </p>

                  <p className="text-gray-600">
                    <strong>3.</strong> Each iteration may perform one constant
                    average-time insertion.
                  </p>

                  <p className="text-gray-600">
                    <strong>4.</strong> Constant work repeated n times results
                    in O(n) time complexity.
                  </p>

                  <p className="text-gray-600">
                    <strong>5.</strong> The hash map can contain up to n
                    entries, producing O(n) auxiliary space.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Complexity Improvement */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Interview Explanation Tip
                </h2>

                <p className="text-sm text-gray-500">
                  Use reasoning instead of only stating Big-O notation.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="bg-red-50 rounded-xl p-5">

                <p className="text-xs font-bold text-red-700">
                  Weak Explanation
                </p>

                <p className="text-gray-600 mt-2">
                  "The time complexity is O(n) and the space complexity is
                  O(1)."
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-xs font-bold text-green-700">
                  Strong Explanation
                </p>

                <p className="text-gray-600 mt-2">
                  "We traverse the array once, giving O(n) time. The hash map
                  can store up to n elements, so the auxiliary space is O(n)."
                </p>

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
                  AI Complexity Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your time-complexity reasoning is correct, but your space
                  complexity should be updated from{" "}
                  <strong>{statedSpace}</strong> to{" "}
                  <strong>O(n)</strong>. During an interview, explain the
                  source of each complexity rather than giving only the final
                  Big-O notation.
                </p>

              </div>

            </div>

          </div>

          {/* Next Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Try a problem containing nested loops or recursion and
                  explain how each operation contributes to the final time
                  and space complexity.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Complexity Challenge
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