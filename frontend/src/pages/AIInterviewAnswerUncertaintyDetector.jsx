import React from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";

const findings = [
  {
    concept: "Time Complexity",
    score: 82,
    status: "Uncertain",
    suggestion: "Revise Big-O complexity examples.",
  },
  {
    concept: "Hash Maps",
    score: 91,
    status: "Confident",
    suggestion: "Good understanding.",
  },
  {
    concept: "Collision Handling",
    score: 64,
    status: "Needs Revision",
    suggestion: "Review chaining and open addressing.",
  },
];

export default function AIInterviewAnswerUncertaintyDetector() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Answer Uncertainty Detector
          </h1>

          <p className="text-gray-500">
            Detect uncertainty and identify concepts that need revision.
          </p>
        </div>

      </div>

      {/* Overall Score */}
      <div className="bg-orange-50 rounded-2xl p-6 text-center">

        <Target className="mx-auto text-orange-600" size={30} />

        <p className="text-gray-500 mt-3">
          Technical Confidence Score
        </p>

        <p className="text-6xl font-black text-orange-600">
          79%
        </p>

        <p className="text-gray-600 mt-2">
          Your answer is mostly confident, with a few areas requiring revision.
        </p>

      </div>

      {/* Findings */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          AI Uncertainty Analysis
        </h2>

        {findings.map((item) => (
          <div
            key={item.concept}
            className="border rounded-xl p-4"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                {item.status === "Confident" ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <AlertTriangle className="text-orange-600" />
                )}

                <span className="font-semibold">
                  {item.concept}
                </span>

              </div>

              <span className="font-bold">
                {item.score}%
              </span>

            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">

              <div
                className={`h-full rounded-full ${
                  item.score >= 85
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
                style={{ width: `${item.score}%` }}
              />

            </div>

            <p className="text-sm font-semibold mt-2">
              {item.status}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {item.suggestion}
            </p>

          </div>
        ))}

      </div>

      {/* Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI Revision Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Focus on collision handling first. Your response suggests
              uncertainty rather than a completely incorrect understanding,
              so targeted revision should improve confidence quickly.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}