import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  GitCompare,
} from "lucide-react";

export default function AIInterviewAnswerTechnicalConsistencyCoach() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Consistency Coach
          </h1>

          <p className="text-gray-500">
            Check whether your technical explanation remains consistent.
          </p>
        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste your technical project explanation..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Check Consistency
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <GitCompare
              className="mx-auto text-indigo-600"
              size={30}
            />

            <p className="text-gray-500 mt-3">
              Technical Consistency Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              82%
            </p>

            <p className="text-gray-600 mt-2">
              Most technical details remain consistent.
            </p>

          </div>

          {/* Entities */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Technical Entity Tracking
            </h2>

            <div className="space-y-3 mt-4">

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  Database
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PostgreSQL → PostgreSQL
                </p>
                <span className="text-green-600 text-sm font-semibold">
                  Consistent
                </span>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  Backend
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Node.js → Python
                </p>
                <span className="text-orange-600 text-sm font-semibold">
                  Potential Conflict
                </span>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  API Architecture
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  REST API → REST API
                </p>
                <span className="text-green-600 text-sm font-semibold">
                  Consistent
                </span>
              </div>

            </div>

          </div>

          {/* Conflict */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Potential Inconsistency
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer mentions Node.js as the backend in one section
                  and Python in another. Clarify whether both technologies are
                  used or whether one statement should be corrected.
                </p>
              </div>
            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Define your architecture and technology stack clearly before
                  explaining implementation details. Use the same terminology
                  throughout your answer.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}