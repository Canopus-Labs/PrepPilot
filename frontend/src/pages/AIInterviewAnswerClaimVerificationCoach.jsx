import React, { useState } from "react";
import {
  Brain,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";

const claims = [
  {
    claim: "Improved API performance significantly.",
    status: "Needs Evidence",
    detail: "Add before/after latency or throughput measurements.",
  },
  {
    claim: "Reduced database load using caching.",
    status: "Supported",
    detail: "Technical reasoning is clearly explained.",
  },
  {
    claim: "The system can handle millions of users.",
    status: "Needs Context",
    detail: "Mention traffic assumptions, capacity, or test results.",
  },
];

export default function AIInterviewAnswerClaimVerificationCoach() {
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
            AI Claim Verification Coach
          </h1>

          <p className="text-gray-500">
            Strengthen technical and professional claims with supporting
            evidence.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Tell me about a project where you made a significant performance
          improvement.
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
          placeholder="Paste your interview response..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Verify Claims
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <ShieldCheck
              className="mx-auto text-indigo-600"
              size={34}
            />

            <p className="text-gray-500 mt-3">
              Claim Evidence Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              71%
            </p>

            <p className="text-gray-600 mt-2">
              Several claims are useful but need stronger supporting evidence.
            </p>

          </div>

          {/* Claims */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Claims
            </h2>

            <div className="space-y-4 mt-5">

              {claims.map((item) => (
                <div
                  key={item.claim}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between gap-4">

                    <p className="font-semibold">
                      "{item.claim}"
                    </p>

                    {item.status === "Supported" ? (
                      <span className="whitespace-nowrap flex items-center gap-1 text-green-600 font-semibold">
                        <CheckCircle2 size={17} />
                        Supported
                      </span>
                    ) : (
                      <span className="whitespace-nowrap flex items-center gap-1 text-orange-600 font-semibold">
                        <AlertTriangle size={17} />
                        {item.status}
                      </span>
                    )}

                  </div>

                  <p className="text-gray-600 text-sm mt-3">
                    {item.detail}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Evidence Prompt */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  AI Evidence Prompt
                </h2>

                <p className="text-gray-600 mt-2">
                  You said the API became significantly faster. What was the
                  response time before and after your change? If exact numbers
                  are unavailable, explain how you measured the improvement.
                </p>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Replace broad claims with measurable evidence whenever
                  possible. Explain the baseline, your action, the measured
                  result, and the context in which the result was achieved.
                </p>
              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}