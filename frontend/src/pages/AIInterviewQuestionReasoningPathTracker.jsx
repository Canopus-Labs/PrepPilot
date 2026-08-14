import React, { useState } from "react";
import {
  Brain,
  Route,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const steps = [
  "Initial Interpretation",
  "Key Observations",
  "Chosen Approach",
  "Rejected Approaches",
  "Optimization Decisions",
  "Final Solution",
];

export default function AIInterviewQuestionReasoningPathTracker() {
  const [path, setPath] = useState({});
  const [analyzed, setAnalyzed] = useState(false);

  const completed = steps.filter((_, i) => path[i]?.trim()).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Reasoning Path Tracker
          </h1>

          <p className="text-gray-500">
            Record and analyze how you reason through an interview problem.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find the first non-repeating character in a string.
        </h2>

      </div>

      {/* Reasoning Path */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2 mb-5">
          <Route className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Your Reasoning Path
          </h2>
        </div>

        <div className="space-y-4">

          {steps.map((step, index) => (
            <div key={step}>

              <label className="font-semibold">
                {index + 1}. {step}
              </label>

              <textarea
                rows={2}
                value={path[index] || ""}
                onChange={(e) =>
                  setPath({
                    ...path,
                    [index]: e.target.value,
                  })
                }
                placeholder={`Describe your ${step.toLowerCase()}...`}
                className="w-full border rounded-xl p-3 mt-2 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>
          ))}

        </div>

        <button
          disabled={completed < steps.length}
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Reasoning Path
        </button>

      </div>

      {/* Analysis */}
      {analyzed && (
        <>
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Reasoning Quality
                </h2>

                <p className="text-gray-600 mt-2">
                  Your reasoning follows a logical progression from problem
                  interpretation to solution selection.
                </p>

                <p className="font-bold text-green-700 mt-3">
                  Reasoning Score: 87%
                </p>
              </div>
            </div>

          </div>

          {/* AI Warning */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Inefficient Step Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  You considered sorting the string before using a frequency
                  map. Sorting is unnecessary for this problem and increases
                  the time complexity.
                </p>

                <p className="text-gray-600 mt-2">
                  Consider identifying the required data structure earlier in
                  your reasoning process.
                </p>
              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Reasoning Summary
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mt-4">

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Logical Steps
                </p>
                <p className="font-bold text-green-600">
                  Strong
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Unnecessary Steps
                </p>
                <p className="font-bold text-orange-600">
                  1
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Approach Selection
                </p>
                <p className="font-bold text-indigo-600">
                  Good
                </p>
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}