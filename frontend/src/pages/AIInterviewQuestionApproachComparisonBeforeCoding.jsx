import React, { useState } from "react";
import {
  Brain,
  GitCompare,
  Clock3,
  Database,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  ArrowRight,
} from "lucide-react";

const approaches = [
  {
    id: 1,
    name: "Brute Force",
    time: "O(n²)",
    space: "O(1)",
    scalability: 45,
    score: 62,
    pros: [
      "Simple to implement",
      "Easy to reason about",
    ],
    cons: [
      "Slow for large inputs",
      "Does not scale well",
    ],
    suitable: "Small constraints",
  },
  {
    id: 2,
    name: "Hash Map",
    time: "O(n)",
    space: "O(n)",
    scalability: 88,
    score: 91,
    pros: [
      "Linear time",
      "Easy to implement",
      "Good for large inputs",
    ],
    cons: [
      "Requires additional memory",
    ],
    suitable: "Most practical constraints",
  },
  {
    id: 3,
    name: "Sorting + Two Pointer",
    time: "O(n log n)",
    space: "O(1)",
    scalability: 76,
    score: 79,
    pros: [
      "Lower extra memory",
      "Useful when ordering is acceptable",
    ],
    cons: [
      "Sorting adds overhead",
      "May modify the input",
    ],
    suitable: "Memory-sensitive cases",
  },
];

export default function AIInterviewQuestionApproachComparisonBeforeCoding() {
  const [approachText, setApproachText] = useState("");
  const [approaches, setApproaches] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(2);

  const addApproach = () => {
    if (!approachText.trim()) return;

    setApproaches((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: approachText.trim(),
        time: "AI Analysis Pending",
        space: "AI Analysis Pending",
        scalability: 0,
        score: 0,
        pros: ["Submitted for AI comparison"],
        cons: ["Analysis will be generated after evaluation"],
        suitable: "Pending",
      },
    ]);

    setApproachText("");
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
            AI Approach Comparison Before Coding
          </h1>

          <p className="text-gray-500">
            Compare solution strategies before committing to an
            implementation.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find two numbers in an array whose sum equals a target value.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Input
            </p>

            <p className="font-bold">
              Integer Array
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Expected Scale
            </p>

            <p className="font-bold">
              Up to 100,000 elements
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Coding Status
            </p>

            <p className="font-bold text-indigo-600">
              Not Started
            </p>

          </div>

        </div>

      </div>

      {/* Add Approach */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Add Your Approaches
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Describe how you could solve the problem without writing code yet.
        </p>

        <div className="flex gap-3 mt-4">

          <input
            value={approachText}
            onChange={(e) => setApproachText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addApproach();
            }}
            placeholder="Example: Use a hash map to store previously seen values..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={addApproach}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Add Approach
          </button>

        </div>

        {approaches.length > 0 && (
          <div className="space-y-2 mt-4">

            {approaches.map((approach, index) => (
              <div
                key={approach.id}
                className="border rounded-xl p-3 flex items-center gap-3"
              >

                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  {index + 1}
                </span>

                <p className="text-gray-700">
                  {approach.name}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Comparison */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <GitCompare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare the candidate approaches before implementation.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Compare Approaches
        </button>

      </div>

      {analyzed && (
        <>
          {/* Recommended Approach */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <CheckCircle2
                className="text-green-600"
                size={32}
              />

              <div>

                <p className="text-sm text-gray-500">
                  AI Recommended Approach
                </p>

                <h2 className="text-2xl font-bold text-green-700 mt-1">
                  Hash Map
                </h2>

                <p className="text-gray-600 mt-2">
                  The hash-map approach provides linear time complexity and is
                  the best fit for the expected input size.
                </p>

              </div>

            </div>

          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

            <h2 className="font-bold text-lg">
              Approach Comparison
            </h2>

            <table className="w-full mt-5 text-left">

              <thead>

                <tr className="border-b">

                  <th className="p-3">
                    Approach
                  </th>

                  <th className="p-3">
                    Time
                  </th>

                  <th className="p-3">
                    Space
                  </th>

                  <th className="p-3">
                    Scalability
                  </th>

                  <th className="p-3">
                    AI Score
                  </th>

                </tr>

              </thead>

              <tbody>

                {approaches.length > 0 &&
                  approaches.map((approach) => (
                    <tr key={approach.id} className="border-b">

                      <td className="p-3 font-semibold">
                        {approach.name}
                      </td>

                      <td className="p-3">
                        {approach.time}
                      </td>

                      <td className="p-3">
                        {approach.space}
                      </td>

                      <td className="p-3">
                        Pending
                      </td>

                      <td className="p-3">
                        Pending
                      </td>

                    </tr>
                  ))}

                {approaches.length === 0 &&
                  approaches.length !== 0 &&
                  null}

                {[
                  {
                    name: "Brute Force",
                    time: "O(n²)",
                    space: "O(1)",
                    scalability: "45%",
                    score: "62",
                  },
                  {
                    name: "Hash Map",
                    time: "O(n)",
                    space: "O(n)",
                    scalability: "88%",
                    score: "91",
                  },
                  {
                    name: "Sorting + Two Pointer",
                    time: "O(n log n)",
                    space: "O(1)",
                    scalability: "76%",
                    score: "79",
                  },
                ].map((row) => (
                  <tr key={row.name} className="border-b">

                    <td className="p-3 font-semibold">
                      {row.name}
                    </td>

                    <td className="p-3">
                      {row.time}
                    </td>

                    <td className="p-3">
                      {row.space}
                    </td>

                    <td className="p-3">
                      {row.scalability}
                    </td>

                    <td className="p-3 font-bold text-indigo-600">
                      {row.score}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Detailed Cards */}
          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                name: "Brute Force",
                time: "O(n²)",
                space: "O(1)",
                score: 62,
                scalability: 45,
                pros: [
                  "Simple implementation",
                  "Constant extra space",
                ],
                cons: [
                  "Poor scalability",
                  "Too slow for large inputs",
                ],
              },
              {
                name: "Hash Map",
                time: "O(n)",
                space: "O(n)",
                score: 91,
                scalability: 88,
                pros: [
                  "Linear time",
                  "Excellent scalability",
                  "Simple implementation",
                ],
                cons: [
                  "Uses additional memory",
                ],
              },
              {
                name: "Sorting + Two Pointer",
                time: "O(n log n)",
                space: "O(1)",
                score: 79,
                scalability: 76,
                pros: [
                  "Lower extra memory",
                  "Useful for ordered data",
                ],
                cons: [
                  "Sorting overhead",
                  "May alter input order",
                ],
              },
            ].map((approach) => (
              <button
                type="button"
                key={approach.name}
                onClick={() =>
                  setSelected(
                    selected === approach.name
                      ? null
                      : approach.name
                  )
                }
                className={`text-left border rounded-2xl p-5 transition ${
                  selected === approach.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-400"
                }`}
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {approach.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {approach.score}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-gray-50 rounded-xl p-3">

                    <Clock3 size={18} className="text-indigo-600" />

                    <p className="text-xs text-gray-500 mt-2">
                      Time
                    </p>

                    <p className="font-bold">
                      {approach.time}
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">

                    <Database size={18} className="text-indigo-600" />

                    <p className="text-xs text-gray-500 mt-2">
                      Space
                    </p>

                    <p className="font-bold">
                      {approach.space}
                    </p>

                  </div>

                </div>

                <div className="mt-4">

                  <div className="flex justify-between text-sm">

                    <span>
                      Scalability
                    </span>

                    <strong>
                      {approach.scalability}%
                    </strong>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${approach.scalability}%`,
                      }}
                    />

                  </div>

                </div>

                {selected === approach.name && (
                  <div className="mt-5 space-y-4">

                    <div>

                      <p className="font-semibold text-green-700">
                        Advantages
                      </p>

                      {approach.pros.map((pro) => (
                        <p
                          key={pro}
                          className="text-sm text-gray-600 mt-1"
                        >
                          • {pro}
                        </p>
                      ))}

                    </div>

                    <div>

                      <p className="font-semibold text-orange-700">
                        Limitations
                      </p>

                      {approach.cons.map((con) => (
                        <p
                          key={con}
                          className="text-sm text-gray-600 mt-1"
                        >
                          • {con}
                        </p>
                      ))}

                    </div>

                  </div>
                )}

              </button>
            ))}

          </div>

          {/* Trade-offs */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Trade-off Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Understand what you gain and sacrifice with each approach.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-4">

                <h3 className="font-semibold">
                  Brute Force
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Saves memory but sacrifices performance.
                </p>

              </div>

              <div className="border border-indigo-400 rounded-xl p-4 bg-indigo-50">

                <h3 className="font-semibold text-indigo-700">
                  Hash Map
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Uses extra memory to achieve better runtime performance.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <h3 className="font-semibold">
                  Sorting + Two Pointer
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Reduces extra memory but introduces sorting overhead.
                </p>

              </div>

            </div>

          </div>

          {/* Selection */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Selected Approach
                </h2>

                <p className="text-xl font-bold mt-2">
                  Hash Map
                </p>

                <p className="text-gray-600 mt-2">
                  Best balance of runtime, scalability, and implementation
                  simplicity for the given constraints.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Continue to Coding
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Before coding, briefly compare at least two approaches.
                  Choose based on{" "}
                  <strong>constraints, complexity, scalability, and
                  trade-offs</strong> rather than selecting the first working
                  idea.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}