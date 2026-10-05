import React from "react";
import { Brain, Target, TrendingUp, AlertTriangle } from "lucide-react";

const metrics = [
  { name: "Question Difficulty", score: 85, type: "Hard" },
  { name: "Response Depth", score: 78, type: "Good" },
  { name: "Technical Detail", score: 82, type: "Good" },
  { name: "Answer Calibration", score: 74, type: "Needs Improvement" },
];

export default function AIInterviewAnswerComparisonByDifficulty() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Answer Comparison by Difficulty
          </h1>
          <p className="text-gray-500">
            Check whether your answer depth matches the question difficulty.
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <Target className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          Difficulty-Adjusted Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          81%
        </p>

        <p className="text-gray-600 mt-2">
          Your answer is mostly appropriate for this question.
        </p>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">
        <h2 className="text-lg font-bold">
          AI Analysis
        </h2>

        {metrics.map((metric) => (
          <div key={metric.name} className="border rounded-xl p-4">

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{metric.name}</p>
                <p className="text-sm text-gray-500">
                  {metric.type}
                </p>
              </div>

              <span className="font-bold">
                {metric.score}%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${metric.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">
          <TrendingUp className="text-green-600" />

          <h3 className="font-bold mt-3">
            What You Did Well
          </h3>

          <p className="text-gray-600 mt-2">
            Your technical explanation contains enough detail for the
            difficulty level of the question.
          </p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5">
          <AlertTriangle className="text-orange-600" />

          <h3 className="font-bold mt-3">
            AI Suggestion
          </h3>

          <p className="text-gray-600 mt-2">
            Add deeper reasoning and complexity analysis for this difficult
            question.
          </p>
        </div>

      </div>

    </div>
  );
}