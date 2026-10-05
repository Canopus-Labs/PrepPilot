import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function AIInterviewAnswerResponseFocusAnalyzer() {
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
            AI Response Focus Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether your answer stays focused on the question.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Main Question Objective
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how you would improve the performance of a slow API.
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
          Analyze Focus
        </button>

      </div>

      {analyzed && (
        <>
          {/* Focus Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Response Focus
            </p>

            <p className="text-6xl font-black text-indigo-600">
              78%
            </p>

            <p className="text-gray-600 mt-2">
              Good focus with some unnecessary secondary information.
            </p>

          </div>

          {/* Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Focus Analysis
            </h2>

            <div className="space-y-4 mt-5">

              <div className="border rounded-xl p-4">

                <div className="flex justify-between">
                  <span className="font-semibold">
                    Main Objective Coverage
                  </span>

                  <span className="font-bold text-green-600">
                    86%
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "86%" }}
                  />
                </div>

              </div>

              <div className="border rounded-xl p-4">

                <div className="flex justify-between">
                  <span className="font-semibold">
                    Secondary Information
                  </span>

                  <span className="font-bold text-orange-600">
                    14%
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "14%" }}
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Tangent */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Unnecessary Tangent Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  Your discussion about frontend styling is not directly
                  related to improving API performance. Consider removing or
                  shortening this section.
                </p>
              </div>
            </div>

          </div>

          {/* Suggested Structure */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Recommended Structure
                </h2>

                <ol className="text-gray-600 mt-3 space-y-2">
                  <li>1. Identify the API bottleneck.</li>
                  <li>2. Explain the optimization approach.</li>
                  <li>3. Discuss caching/database improvements.</li>
                  <li>4. Mention measurable performance impact.</li>
                  <li>5. Add secondary details only if requested.</li>
                </ol>
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}