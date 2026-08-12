import React from "react";
import {
  Brain,
  Scale,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const tradeoffs = [
  {
    name: "Performance",
    score: 88,
    status: "Good",
  },
  {
    name: "Scalability",
    score: 72,
    status: "Needs Detail",
  },
  {
    name: "Complexity",
    score: 84,
    status: "Good",
  },
  {
    name: "Maintainability",
    score: 68,
    status: "Needs Improvement",
  },
];

export default function AIInterviewAnswerTechnicalTradeOffCoach() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Trade-Off Coach
          </h1>

          <p className="text-gray-500">
            Explain the reasoning behind your technical decisions.
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="bg-purple-50 rounded-2xl p-6 text-center">
        <Scale className="mx-auto text-purple-600" size={30} />

        <p className="text-gray-500 mt-3">
          Trade-Off Explanation Score
        </p>

        <p className="text-6xl font-black text-purple-600">
          78%
        </p>

        <p className="text-gray-600 mt-2">
          Your technical choices are strong, but some alternatives need
          clearer comparison.
        </p>
      </div>

      {/* Analysis */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          AI Trade-Off Analysis
        </h2>

        {tradeoffs.map((item) => (
          <div
            key={item.name}
            className="border rounded-xl p-4"
          >
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">
                {item.score >= 80 ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <AlertTriangle className="text-orange-600" />
                )}

                <span className="font-semibold">
                  {item.name}
                </span>
              </div>

              <span className="font-bold">
                {item.score}%
              </span>

            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-2">
              {item.status}
            </p>
          </div>
        ))}

      </div>

      {/* Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Explain at least one alternative approach and why your selected
              solution provides a better balance of scalability, complexity,
              and maintainability for the given requirements.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}