import React, { useState } from "react";
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

const sections = [
  ["Opening", 88],
  ["Problem Understanding", 92],
  ["Main Explanation", 84],
  ["Supporting Example", 76],
  ["Technical Details", 81],
  ["Conclusion", 70],
];

export default function AIInterviewAnswerOpeningToConclusionFlowAnalyzer() {
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
            AI Answer Flow Analyzer
          </h1>

          <p className="text-gray-500">
            Analyze your answer from opening statement to conclusion.
          </p>
        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Paste your complete interview response..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Answer Flow
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
              Overall Flow Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              82%
            </p>

            <p className="text-gray-600 mt-2">
              Your answer has a clear structure with some transition gaps.
            </p>

          </div>

          {/* Flow */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Answer Flow
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-5">

              {sections.map(([section], index) => (
                <React.Fragment key={section}>

                  <div className="px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                    {section}
                  </div>

                  {index < sections.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="text-gray-400"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Section Scores */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Section Analysis
            </h2>

            <div className="space-y-4 mt-5">

              {sections.map(([name, score]) => (
                <div key={name}>

                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {name}
                    </span>

                    <span className="font-bold text-indigo-600">
                      {score}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Transition Feedback */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Weak Transition Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  Your transition from the supporting example to the technical
                  details is abrupt. Briefly explain how the example connects
                  to the technical decision before moving forward.
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
                  AI Flow Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Start with the main idea, explain your reasoning, support it
                  with one relevant example, then summarize the technical
                  decision and outcome in the conclusion.
                </p>
              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}