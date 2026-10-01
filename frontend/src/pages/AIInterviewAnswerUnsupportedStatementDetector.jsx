import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Target,
  ShieldCheck,
} from "lucide-react";

const statements = [
  {
    text: "This approach is faster.",
    status: "Unsupported",
    score: 42,
    reason: "No complexity or performance comparison was provided.",
    prompt: "Why is this approach faster? Compare its complexity with an alternative.",
  },
  {
    text: "Caching reduces database load.",
    status: "Supported",
    score: 88,
    reason: "The statement has a clear technical explanation.",
    prompt: "Explain what data is cached and when the cache is invalidated.",
  },
  {
    text: "The system is scalable.",
    status: "Needs Evidence",
    score: 51,
    reason: "No traffic, capacity, or scaling strategy was mentioned.",
    prompt: "What evidence shows that the system can scale under increased traffic?",
  },
];

export default function AIInterviewAnswerUnsupportedStatementDetector() {
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
            AI Unsupported Statement Detector
          </h1>

          <p className="text-gray-500">
            Strengthen claims by supporting them with reasoning and evidence.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Why did you choose this approach for your project?
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
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Statements
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
              Evidence Support Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              68%
            </p>

            <p className="text-gray-600 mt-2">
              Some statements need stronger reasoning or measurable evidence.
            </p>

          </div>

          {/* Statements */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Statements
            </h2>

            <div className="space-y-5 mt-5">

              {statements.map((statement) => (
                <div
                  key={statement.text}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">

                      {statement.status === "Supported" ? (
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

                      <div>

                        <p className="font-semibold">
                          "{statement.text}"
                        </p>

                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            statement.status === "Supported"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {statement.status}
                        </span>

                      </div>

                    </div>

                    <span className="font-bold text-indigo-600">
                      {statement.score}%
                    </span>

                  </div>

                  <p className="text-gray-600 text-sm mt-4">
                    {statement.reason}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Justification Prompt */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  AI Justification Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  {statements[0].prompt}
                </p>

                <textarea
                  rows={4}
                  placeholder="Explain why your claim is valid..."
                  className="w-full border rounded-xl p-3 mt-4 bg-white outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  type="button"
                  className="mt-3 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
                >
                  Submit Justification
                </button>

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
                  Avoid unsupported words such as "faster," "better," and
                  "scalable" unless you explain the reason or provide evidence.
                  Connect each important claim to complexity, measurements,
                  trade-offs, or concrete examples.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}