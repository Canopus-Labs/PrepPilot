import React, { useState } from "react";
import {
  Brain,
  Bug,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const counterexamples = [
  {
    input: "[2, 2, 3, 4]",
    expected: "2",
    actual: "3",
    reason:
      "The approach does not correctly handle duplicate values.",
    category: "Duplicate Handling",
  },
  {
    input: "[]",
    expected: "0",
    actual: "Error",
    reason:
      "The solution assumes at least one element exists.",
    category: "Empty Input",
  },
  {
    input: "[1, -1, 2, -2]",
    expected: "2",
    actual: "4",
    reason:
      "Negative values break an assumption in the current approach.",
    category: "Negative Values",
  },
];

export default function AIInterviewQuestionCounterexampleGenerator() {
  const [solution, setSolution] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [fixed, setFixed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Counterexample Generator
          </h1>

          <p className="text-gray-500">
            Challenge your solution with cases designed to reveal hidden
            weaknesses.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find the smallest missing positive integer from an unsorted array.
        </h2>

        <p className="text-gray-600 mt-3">
          Explain your approach and submit your solution. AI will search for
          inputs that could break your assumptions.
        </p>

      </div>

      {/* Solution */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Proposed Solution
        </h2>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={8}
          placeholder="Explain your algorithm and implementation..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Generate Counterexamples
        </button>

      </div>

      {analyzed && (
        <>
          {/* Result */}
          <div
            className={`rounded-2xl p-6 ${
              fixed ? "bg-green-50" : "bg-orange-50"
            }`}
          >

            <div className="flex gap-3">

              {fixed ? (
                <CheckCircle2
                  className="text-green-600"
                  size={30}
                />
              ) : (
                <Bug
                  className="text-orange-600"
                  size={30}
                />
              )}

              <div>

                <h2
                  className={`font-bold ${
                    fixed
                      ? "text-green-700"
                      : "text-orange-700"
                  }`}
                >
                  {fixed
                    ? "Counterexample Successfully Resolved"
                    : "Potential Failure Cases Found"}
                </h2>

                <p className="text-gray-600 mt-2">
                  {fixed
                    ? "Your revised approach now addresses the identified failure pattern."
                    : "AI discovered cases that may cause your current approach to produce an incorrect result."}
                </p>

              </div>

            </div>

          </div>

          {/* Counterexamples */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Generated Counterexamples
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a case to understand why your approach may fail.
            </p>

            <div className="space-y-4 mt-5">

              {counterexamples.map((example) => (
                <button
                  type="button"
                  key={example.input}
                  onClick={() =>
                    setSelected(
                      selected?.input === example.input
                        ? null
                        : example
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Counterexample Input
                      </p>

                      <p className="font-mono font-semibold mt-1">
                        {example.input}
                      </p>

                    </div>

                    <AlertTriangle
                      className="text-orange-600"
                      size={22}
                    />

                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mt-4">

                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">
                        Expected
                      </p>
                      <p className="font-bold text-green-700">
                        {example.expected}
                      </p>
                    </div>

                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">
                        Your Output
                      </p>
                      <p className="font-bold text-red-700">
                        {example.actual}
                      </p>
                    </div>

                  </div>

                  {selected?.input === example.input && (
                    <div className="mt-4 bg-orange-50 rounded-xl p-4">

                      <p className="text-sm font-semibold text-orange-700">
                        Why it fails
                      </p>

                      <p className="text-sm text-gray-600 mt-2">
                        {example.reason}
                      </p>

                      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                        {example.category}
                      </span>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Fix Challenge */}
          {!fixed && (
            <div className="bg-indigo-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <RefreshCw className="text-indigo-600" />

                <div className="flex-1">

                  <h2 className="font-bold text-indigo-700">
                    Fix Your Approach
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Modify your solution so that it handles the counterexamples
                    above. Explain what assumption caused the failure.
                  </p>

                  <textarea
                    rows={5}
                    placeholder="Describe your correction..."
                    className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() => setFixed(true)}
                    className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                  >
                    Submit Fix
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* Failure Pattern */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Recurring Failure Pattern
                </h2>

                <p className="text-gray-600 mt-2">
                  Your recent solutions show a tendency to focus on standard
                  inputs while overlooking duplicate, empty, and negative-value
                  cases. Add explicit boundary-case testing before finalizing
                  an interview solution.
                </p>

              </div>

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Problem-Solving Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  A solution that works on normal examples is not necessarily
                  robust. Before concluding, actively ask: "What assumption am
                  I making, and what input would violate it?"
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}