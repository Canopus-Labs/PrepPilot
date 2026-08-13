import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

const checks = [
  ["Caching", "Appropriate", 92],
  ["Concurrency", "Needs Review", 64],
  ["Load Balancing", "Appropriate", 88],
];

export default function AIInterviewAnswerTechnicalContextChecker() {
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
            AI Technical Context Checker
          </h1>

          <p className="text-gray-500">
            Check whether technical terms are appropriate for their context.
          </p>
        </div>
      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={7}
          placeholder="Paste your technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Check Technical Context
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">
            <Target
              className="mx-auto text-indigo-600"
              size={30}
            />

            <p className="text-gray-500 mt-3">
              Context Accuracy Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              82%
            </p>
          </div>

          {/* Term Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Technical Context Analysis
            </h2>

            <div className="space-y-3 mt-4">

              {checks.map(([term, status, score]) => (
                <div
                  key={term}
                  className="border rounded-xl p-4"
                >
                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">
                      {status === "Appropriate" ? (
                        <CheckCircle2 className="text-green-600" />
                      ) : (
                        <AlertTriangle className="text-orange-600" />
                      )}

                      <span className="font-semibold">
                        {term}
                      </span>
                    </div>

                    <span className="font-bold text-indigo-600">
                      {score}%
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {status}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* Feedback */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  AI Context Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  The term "concurrency" may be technically valid, but explain
                  whether you mean overlapping task execution or actual
                  parallel execution. The distinction matters in this context.
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
                  Don't use technical keywords in isolation. Explain how the
                  concept applies to the specific system, problem, or scenario
                  being discussed.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}