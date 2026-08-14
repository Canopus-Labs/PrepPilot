import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

export default function AIInterviewQuestionMisconceptionChallengeMode() {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Misconception Challenge Mode
          </h1>

          <p className="text-gray-500">
            Identify and correct common technical misconceptions.
          </p>
        </div>
      </div>

      {/* Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <AlertTriangle className="text-orange-600" />
          <h2 className="font-bold text-lg">
            Technical Challenge
          </h2>
        </div>

        <p className="text-gray-700 text-lg font-semibold mt-4">
          "Binary Search always runs in O(log n) time, regardless of the
          input or implementation."
        </p>

        <p className="text-gray-600 mt-3">
          Is this statement correct? Explain why or why not.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Explanation
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Explain the misconception..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setChecked(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Check My Answer
        </button>

      </div>

      {/* Feedback */}
      {checked && (
        <>
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Correct Concept
                </h2>

                <p className="text-gray-600 mt-2">
                  The statement is incomplete. Binary Search is O(log n) when
                  the search space is reduced by half at each step, but the
                  actual complexity can depend on the implementation and data
                  structure.
                </p>

                <p className="font-bold text-green-700 mt-3">
                  Challenge Score: 86%
                </p>
              </div>
            </div>

          </div>

          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <Lightbulb className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  Related Practice
                </h2>

                <ul className="text-gray-600 mt-2 space-y-2">
                  <li>• Binary Search on Rotated Arrays</li>
                  <li>• Binary Search Complexity Analysis</li>
                  <li>• Search Space Reduction Problems</li>
                </ul>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}