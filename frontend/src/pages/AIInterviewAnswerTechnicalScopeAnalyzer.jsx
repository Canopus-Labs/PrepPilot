import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const findings = [
  {
    detail: "Introducing Kubernetes for a simple single-service application.",
    type: "Potential Over-Engineering",
    impact: "High",
    suggestion:
      "Start with a simple deployment approach unless scaling or orchestration requirements justify Kubernetes.",
  },
  {
    detail: "Adding microservices without a stated scalability requirement.",
    type: "Unnecessary Architecture",
    impact: "Medium",
    suggestion:
      "Explain the simplest architecture that satisfies the stated requirements.",
  },
  {
    detail: "Explaining database indexing and query optimization.",
    type: "Relevant Detail",
    impact: "Low",
    suggestion:
      "Keep this detail because it directly supports the performance discussion.",
  },
];

export default function AIInterviewAnswerTechnicalScopeAnalyzer() {
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
            AI Technical Scope Analyzer
          </h1>

          <p className="text-gray-500">
            Keep technical interview answers aligned with the actual scope of
            the question.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you store user information for a small web application?
        </h2>

        <p className="text-gray-600 mt-3">
          The goal is to evaluate whether your technical decisions match the
          requirements rather than how many technologies you can mention.
        </p>

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
          placeholder="Paste your interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Scope
        </button>

      </div>

      {analyzed && (
        <>
          {/* Scope Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={34}
            />

            <p className="text-gray-500 mt-3">
              Scope Alignment Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              72%
            </p>

            <p className="text-gray-600 mt-2">
              Your answer contains relevant technical information but also
              introduces unnecessary architecture for the stated requirements.
            </p>

          </div>

          {/* Findings */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Scope Analysis
            </h2>

            <div className="space-y-4 mt-5">

              {findings.map((finding) => (
                <div
                  key={finding.detail}
                  className="border rounded-xl p-4"
                >

                  <div className="flex gap-3">

                    {finding.type === "Relevant Detail" ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={20}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={20}
                      />
                    )}

                    <div className="flex-1">

                      <p className="font-semibold">
                        {finding.detail}
                      </p>

                      <div className="flex gap-2 mt-2">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            finding.type === "Relevant Detail"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {finding.type}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                          Impact: {finding.impact}
                        </span>

                      </div>

                      <p className="text-gray-600 text-sm mt-3">
                        {finding.suggestion}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Simplification */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Simplification Suggestion
                </h2>

                <p className="text-gray-600 mt-2">
                  For this question, begin with a relational or document
                  database based on the application's data model. Discuss
                  replication, microservices, or Kubernetes only if the
                  requirements introduce scale, availability, or deployment
                  constraints.
                </p>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Interview Scope Tip
                </h2>

                <p className="text-gray-600 mt-2">
                  More technical detail does not automatically mean a better
                  answer. Start with the simplest solution that satisfies the
                  requirements, then introduce complexity only when a clear
                  requirement justifies it.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}