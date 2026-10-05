import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const signals = [
  {
    title: "Technical Decision",
    description: "Explains why caching was selected.",
    score: 92,
    status: "Strong",
  },
  {
    title: "Performance Awareness",
    description: "Connects caching with reduced database load.",
    score: 86,
    status: "Strong",
  },
  {
    title: "Scalability Evidence",
    description: "Does not clearly explain how the solution scales.",
    score: 54,
    status: "Weak",
  },
  {
    title: "Trade-off Explanation",
    description: "Mentions consistency concerns but lacks depth.",
    score: 61,
    status: "Needs Improvement",
  },
];

export default function AIInterviewAnswerTechnicalSignalAnalyzer() {
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
            AI Technical Signal Analyzer
          </h1>

          <p className="text-gray-500">
            Identify the technical signals your answer communicates to an
            interviewer.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you improve the performance of a high-traffic API?
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
          Analyze Technical Signals
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Technical Signal Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              78%
            </p>

            <p className="text-gray-600 mt-2">
              Good technical evidence with opportunities to strengthen
              scalability and trade-off explanations.
            </p>

          </div>

          {/* Signals */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Technical Signals
            </h2>

            <div className="space-y-4 mt-5">

              {signals.map((signal) => (
                <div
                  key={signal.title}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="font-bold">
                        {signal.title}
                      </h3>

                      <p className="text-gray-600 text-sm mt-1">
                        {signal.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        signal.status === "Strong"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {signal.status}
                    </span>

                  </div>

                  <div className="mt-4">

                    <div className="flex justify-between text-sm">
                      <span>Signal Strength</span>
                      <span className="font-bold">
                        {signal.score}%
                      </span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{
                          width: `${signal.score}%`,
                        }}
                      />
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Weak Signal */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Missing Technical Signal
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer does not provide enough evidence about
                  scalability. Explain how the solution behaves as traffic
                  increases and mention relevant bottlenecks or trade-offs.
                </p>
              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <TrendingUp className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Strengthening Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Keep your strong performance and caching explanation, then
                  add one concrete scalability decision and explain its
                  trade-off. This will make your technical expertise more
                  visible to the interviewer.
                </p>
              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}