import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const relationships = [
  {
    from: "Frontend",
    to: "REST API",
    relation: "Sends HTTP requests",
    status: "Correct",
  },
  {
    from: "REST API",
    to: "Database",
    relation: "Reads and writes application data",
    status: "Correct",
  },
  {
    from: "Cache",
    to: "Database",
    relation: "Directly replaces persistent storage",
    status: "Incorrect",
  },
  {
    from: "Authentication Service",
    to: "REST API",
    relation: "Validates user identity",
    status: "Missing",
  },
];

export default function AIInterviewAnswerTechnicalRelationshipAnalyzer() {
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
            AI Technical Relationship Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether technical concepts in your answer are connected
            correctly.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how the components of your application interact with each
          other.
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
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Relationships
          <ArrowRight size={18} />
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Network
              className="mx-auto text-indigo-600"
              size={34}
            />

            <p className="text-gray-500 mt-3">
              Technical Relationship Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              74%
            </p>

            <p className="text-gray-600 mt-2">
              Most relationships are correctly explained, but some technical
              connections require clarification.
            </p>

          </div>

          {/* Relationships */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Technical Relationships
            </h2>

            <div className="space-y-4 mt-5">

              {relationships.map((item) => (
                <div
                  key={`${item.from}-${item.to}`}
                  className="border rounded-xl p-4"
                >

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
                      {item.from}
                    </span>

                    <ArrowRight
                      size={20}
                      className="text-gray-400"
                    />

                    <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                      {item.to}
                    </span>

                    {item.status === "Correct" ? (
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
                    {item.relation}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Correct"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Incorrect"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Incorrect Relationship */}
          <div className="bg-red-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-red-600" />

              <div>

                <h2 className="font-bold text-red-700">
                  Incorrect Relationship Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  The cache should not be described as a replacement for the
                  database. A cache temporarily stores frequently accessed
                  data to reduce repeated database operations while the
                  database remains the persistent source of truth.
                </p>

              </div>

            </div>

          </div>

          {/* Missing Connection */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Connection
                </h2>

                <p className="text-gray-600 mt-2">
                  Your explanation mentions authentication but does not show
                  how the authentication service interacts with the API.
                  Explain where identity validation occurs before protected
                  requests are processed.
                </p>

              </div>

            </div>

          </div>

          {/* AI Explanation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Suggested Explanation
                </h2>

                <p className="text-gray-600 mt-2">
                  A clearer explanation would describe the request flow:
                  frontend → API → authentication → application logic →
                  cache/database. The API validates access, application logic
                  processes the request, the cache handles frequently accessed
                  data, and the database provides persistent storage.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}