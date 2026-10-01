import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const dependencies = [
  {
    from: "API Gateway",
    to: "Authentication Service",
    relation: "Validates incoming requests",
    status: "Connected",
  },
  {
    from: "API Gateway",
    to: "Database",
    relation: "Direct dependency not explained",
    status: "Missing",
  },
  {
    from: "Caching",
    to: "Database",
    relation: "Reduces repeated database queries",
    status: "Connected",
  },
];

export default function AIInterviewAnswerTechnicalDependencyAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Dependency Analyzer
          </h1>

          <p className="text-gray-500">
            Understand how the technical concepts in your answer depend on
            each other.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain the architecture of a scalable web application.
        </h2>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste your technical architecture explanation..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Dependencies
        </button>

      </div>

      {analyzed && (
        <>
          {/* Dependency Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Network
              className="mx-auto text-indigo-600"
              size={34}
            />

            <p className="text-gray-500 mt-3">
              Technical Dependency Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              76%
            </p>

            <p className="text-gray-600 mt-2">
              Most technologies are connected logically, but one important
              dependency needs clarification.
            </p>

          </div>

          {/* Dependency Map */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Technical Relationships
            </h2>

            <div className="space-y-4 mt-5">

              {dependencies.map((dependency) => (
                <div
                  key={`${dependency.from}-${dependency.to}`}
                  className="border rounded-xl p-4"
                >

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
                      {dependency.from}
                    </span>

                    <ArrowRight
                      className="text-gray-400"
                      size={20}
                    />

                    <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                      {dependency.to}
                    </span>

                    {dependency.status === "Connected" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={20}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600"
                        size={20}
                      />
                    )}

                  </div>

                  <p className="text-gray-600 text-sm mt-3">
                    {dependency.relation}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Missing Dependency */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Dependency Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  You mention the API Gateway and Database, but do not explain
                  how requests reach the database. Clarify whether the API
                  communicates directly with it or through a service layer.
                </p>

              </div>

            </div>

          </div>

          {/* Dependency Explanation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Dependency Explanation
                </h2>

                <p className="text-gray-600 mt-2">
                  A clear architecture explanation could follow the flow:
                  client → API Gateway → application service → cache/database.
                  The authentication service validates requests before the
                  application processes them, while caching reduces repeated
                  database access.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}