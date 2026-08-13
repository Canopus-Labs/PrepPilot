import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Target,
  Clock3,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

const findings = [
  {
    title: "Complexity Risk",
    severity: "High",
    icon: Clock3,
    description:
      "The proposed nested-loop approach has O(n²) time complexity.",
    hint:
      "Consider whether you can reduce repeated lookups while keeping the same result.",
  },
  {
    title: "Constraint Mismatch",
    severity: "High",
    icon: ShieldAlert,
    description:
      "The expected input can contain up to 100,000 elements, making O(n²) processing risky.",
    hint:
      "Compare your estimated operations with the maximum input size.",
  },
  {
    title: "Logical Assumption",
    severity: "Medium",
    icon: AlertTriangle,
    description:
      "The approach assumes that each required value appears only once.",
    hint:
      "Think about how duplicate values should affect the result.",
  },
];

export default function AIInterviewQuestionApproachMistakeDetector() {
  const [approach, setApproach] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Approach Mistake Detector
          </h1>

          <p className="text-gray-500">
            Detect problems in your approach before spending time coding.
          </p>
        </div>
      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find two numbers in an array whose sum equals a target.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Input Size
            </p>
            <p className="font-bold">
              Up to 100,000 elements
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Expected Goal
            </p>
            <p className="font-bold">
              Efficient solution
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

      {/* Approach Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Describe Your Approach
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Explain your planned solution before writing any code.
        </p>

        <textarea
          value={approach}
          onChange={(e) => setApproach(e.target.value)}
          rows={8}
          placeholder="Example: I will use two nested loops and compare every pair..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!approach.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze My Approach
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Result */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <AlertTriangle
                  className="text-orange-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Approach Status
                </p>

                <h2 className="text-3xl font-black text-orange-700">
                  Needs Revision
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach may work for small inputs, but it has
                  scalability and assumption risks under the given constraints.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Approach Score
              </p>

              <p className="text-3xl font-black text-indigo-600">
                61%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Issues Found
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <Clock3 className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Complexity
              </p>

              <p className="text-3xl font-black text-red-600">
                O(n²)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <ShieldAlert className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Constraint Risk
              </p>

              <p className="text-3xl font-black text-orange-600">
                High
              </p>
            </div>

          </div>

          {/* Findings */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Detected Issues
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Review the problems before committing to implementation.
            </p>

            <div className="space-y-4 mt-5">

              {findings.map((finding) => {
                const Icon = finding.icon;

                return (
                  <button
                    type="button"
                    key={finding.title}
                    onClick={() =>
                      setSelected(
                        selected?.title === finding.title
                          ? null
                          : finding
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 rounded-xl bg-orange-100 text-orange-600 h-fit">
                        <Icon size={23} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <div>
                            <h3 className="font-bold">
                              {finding.title}
                            </h3>

                            <p className="text-gray-600 text-sm mt-1">
                              {finding.description}
                            </p>
                          </div>

                          <span
                            className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${
                              finding.severity === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {finding.severity}
                          </span>

                        </div>

                        {selected?.title === finding.title && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-sm text-gray-600">
                              <strong>Guidance:</strong>{" "}
                              {finding.hint}
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Complexity */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Complexity Analysis
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Your Proposed Approach
                </p>

                <p className="text-3xl font-black text-red-600 mt-2">
                  O(n²)
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Potentially too expensive for 100,000 elements.
                </p>

              </div>

              <div className="border border-green-300 bg-green-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Target Direction
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  O(n)
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Look for a way to avoid repeatedly scanning the array.
                </p>

              </div>

            </div>

            <div className="mt-5 bg-indigo-50 rounded-xl p-4">
              <p className="text-sm text-gray-600">
                AI intentionally does not reveal the complete solution.
                Instead, it points you toward the type of improvement needed.
              </p>
            </div>

          </div>

          {/* Assumption Check */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3">

              <ShieldAlert
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-lg">
                  Assumption Check
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach appears to assume that values are unique.
                  Verify whether the problem actually guarantees uniqueness.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">

                  <div className="border rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Assumption
                    </p>
                    <p className="font-semibold mt-1">
                      Every value appears once
                    </p>
                  </div>

                  <div className="border rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Risk
                    </p>
                    <p className="font-semibold text-orange-600 mt-1">
                      May fail with duplicates
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Hint Ladder */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Progressive Guidance
                </h2>

                <p className="text-gray-600 mt-2">
                  Get enough guidance to correct your approach without seeing
                  the full solution.
                </p>

                <div className="space-y-3 mt-5">

                  {[
                    "Think about repeated work in your current approach.",
                    "Can you remember information from values you have already processed?",
                    "Look for a data structure that provides fast lookup.",
                    "Recalculate the expected complexity after your change.",
                  ].map((hint, index) => (
                    <div
                      key={hint}
                      className="flex gap-3 bg-white rounded-xl p-4"
                    >

                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>

                      <p className="text-sm text-gray-600">
                        {hint}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Decision */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Approach Decision
            </h2>

            <p className="text-gray-600 mt-2">
              Do not start coding yet. Revise the approach to address the
              complexity and assumption risks first.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              <button
                type="button"
                className="px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
              >
                Revise Approach
              </button>

              <button
                type="button"
                className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
              >
                Continue Anyway
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Before implementation, replace the repeated scanning
                  strategy with a faster lookup-based idea. Then verify how
                  duplicates and the maximum input size affect correctness and
                  performance.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}