import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const findings = [
  {
    statement: "The database becomes faster.",
    issue: "Vague technical claim",
    suggestion:
      "Reduce query latency by adding appropriate indexes and optimizing expensive queries.",
  },
  {
    statement: "Caching makes the system more efficient.",
    issue: "Imprecise terminology",
    suggestion:
      "Caching reduces repeated backend or database operations and can improve response latency.",
  },
  {
    statement: "The API can handle many users.",
    issue: "Ambiguous statement",
    suggestion:
      "The API can handle approximately 5,000 requests per second under the tested workload.",
  },
];

export default function AIInterviewAnswerTechnicalPrecisionCoach() {
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
            AI Technical Precision Coach
          </h1>

          <p className="text-gray-500">
            Make technical interview answers more precise and unambiguous.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you improve the performance of a backend application?
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
          placeholder="Paste your technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          <Sparkles size={18} />
          Analyze Precision
        </button>

      </div>

      {analyzed && (
        <>
          {/* Precision Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={34}
            />

            <p className="text-gray-500 mt-3">
              Technical Precision Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              76%
            </p>

            <p className="text-gray-600 mt-2">
              Your answer is technically relevant but contains several broad
              statements that could be made more precise.
            </p>

          </div>

          {/* Findings */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Precision Findings
            </h2>

            <div className="space-y-5 mt-5">

              {findings.map((finding) => (
                <div
                  key={finding.statement}
                  className="border rounded-xl p-4"
                >

                  <div className="flex gap-3">

                    <AlertTriangle
                      className="text-orange-600 mt-1"
                      size={20}
                    />

                    <div className="flex-1">

                      <p className="font-semibold">
                        "{finding.statement}"
                      </p>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                        {finding.issue}
                      </span>

                      <div className="mt-4 bg-green-50 rounded-xl p-4">

                        <p className="text-sm font-semibold text-green-700">
                          More Precise Alternative
                        </p>

                        <p className="text-gray-600 mt-1">
                          {finding.suggestion}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* AI Guidance */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Precision Tip
                </h2>

                <p className="text-gray-600 mt-2">
                  Replace words such as "fast," "efficient," "many," or
                  "better" with measurable or technically specific statements.
                  Explain what changed, how it changed, and under which
                  conditions.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}