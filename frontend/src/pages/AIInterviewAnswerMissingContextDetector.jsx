import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const contextItems = [
  ["Requirements", "Covered"],
  ["Constraints", "Missing"],
  ["Environment", "Partial"],
  ["Assumptions", "Missing"],
  ["Use Case", "Covered"],
];

export default function AIInterviewAnswerMissingContextDetector() {
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
            AI Missing Context Detector
          </h1>

          <p className="text-gray-500">
            Find important context missing from your interview answer.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you design a system to handle millions of API requests?
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
          Analyze Context
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Context Completeness
            </p>

            <p className="text-6xl font-black text-indigo-600">
              72%
            </p>

            <p className="text-gray-600 mt-2">
              Your answer is technically relevant but missing important
              contextual details.
            </p>

          </div>

          {/* Context Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Context Analysis
            </h2>

            <div className="space-y-3 mt-4">

              {contextItems.map(([name, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border rounded-xl p-4"
                >

                  <span className="font-semibold">
                    {name}
                  </span>

                  {status === "Covered" ? (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle2 size={18} />
                      Covered
                    </span>
                  ) : status === "Partial" ? (
                    <span className="text-yellow-600 font-semibold">
                      Partial
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-orange-600 font-semibold">
                      <AlertTriangle size={18} />
                      Missing
                    </span>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* Missing Context */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Missing Context
                </h2>

                <ul className="text-gray-600 mt-2 space-y-2">
                  <li>• Expected request rate and traffic pattern.</li>
                  <li>• Latency or availability requirements.</li>
                  <li>• Whether requests are read-heavy or write-heavy.</li>
                  <li>• Data consistency expectations.</li>
                </ul>

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
                  Before presenting the architecture, clarify scale,
                  performance targets, consistency requirements, and workload
                  characteristics. This will make your solution more precise
                  and easier for an interviewer to evaluate.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}