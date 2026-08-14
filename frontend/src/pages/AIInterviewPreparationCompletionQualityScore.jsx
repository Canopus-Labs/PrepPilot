import React from "react";
import { Brain, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";

const factors = [
  { name: "Accuracy", score: 88, trend: "up" },
  { name: "Topic Coverage", score: 76, trend: "up" },
  { name: "Difficulty Progression", score: 70, trend: "up" },
  { name: "Revision Effectiveness", score: 64, trend: "down" },
  { name: "Mock Interview", score: 82, trend: "up" },
  { name: "Weak Area Improvement", score: 73, trend: "up" },
];

export default function AIInterviewPreparationCompletionQualityScore() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Preparation Quality Score
          </h1>
          <p className="text-gray-500">
            Measure preparation quality, not just completed tasks.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <p className="text-gray-500">Overall Quality Score</p>
        <p className="text-6xl font-black text-indigo-600 mt-2">81%</p>
        <p className="text-gray-600 mt-2">
          Your preparation is progressing effectively.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 space-y-4">
        <h2 className="text-lg font-bold">Quality Factors</h2>

        {factors.map((factor) => (
          <div key={factor.name} className="border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{factor.name}</span>

              <div className="flex items-center gap-2">
                <span className="font-bold">{factor.score}%</span>
                {factor.trend === "up" ? (
                  <TrendingUp size={18} className="text-green-600" />
                ) : (
                  <TrendingDown size={18} className="text-red-600" />
                )}
              </div>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${factor.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 rounded-2xl p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />
          <div>
            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>
            <p className="text-gray-600 mt-1">
              Focus more on revision effectiveness while maintaining your
              current mock interview and topic coverage progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}