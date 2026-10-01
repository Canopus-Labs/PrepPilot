import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";

const checks = [
  "Does your solution handle empty input?",
  "Does it handle duplicate values?",
  "What is the worst-case time complexity?",
  "Does it work for maximum constraints?",
];

export default function AIInterviewQuestionSolutionVerificationCoach() {
  const [solution, setSolution] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Verification Coach
          </h1>

          <p className="text-gray-500">
            Verify your solution before viewing the official answer.
          </p>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Solution
        </h2>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={8}
          placeholder="Paste your solution or explanation..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!solution.trim()}
          onClick={() => setVerified(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          <Search size={18} />
          Verify Solution
        </button>

      </div>

      {verified && (
        <>
          {/* Verification */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-lg">
              Self-Verification Checklist
            </h2>

            <p className="text-gray-600 mt-2">
              Answer these questions before checking the official solution.
            </p>

            <div className="space-y-3 mt-5">

              {checks.map((check) => (
                <div
                  key={check}
                  className="flex items-center gap-3 bg-white rounded-xl p-4"
                >
                  <AlertTriangle className="text-orange-500" size={20} />
                  <span className="font-medium">
                    {check}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* Guidance */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Guidance
                </h2>

                <p className="text-gray-600 mt-2">
                  Don't immediately check the official solution. Test your
                  approach against empty input, duplicates, boundary values,
                  and maximum constraints first.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}