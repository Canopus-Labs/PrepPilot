import React from "react";
import {
  Brain,
  TrendingUp,
  Target,
  ArrowRight,
} from "lucide-react";

const levels = [
  { name: "Easy", score: 92, status: "Mastered" },
  { name: "Medium", score: 78, status: "Current" },
  { name: "Hard", score: 54, status: "Not Ready" },
];

export default function AIInterviewQuestionDifficultyTransitionCoach() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Difficulty Transition Coach
          </h1>

          <p className="text-gray-500">
            Move between difficulty levels at the right pace.
          </p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Target className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            AI Recommendation
          </h2>
        </div>

        <p className="text-gray-600 mt-3">
          You are ready to progress through Medium questions. Complete a few
          more intermediate challenges before attempting Hard questions.
        </p>
      </div>

      {/* Difficulty Levels */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Difficulty Progression
        </h2>

        {levels.map((level, index) => (
          <div
            key={level.name}
            className="flex items-center gap-4 border rounded-xl p-4"
          >

            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              {index + 1}
            </div>

            <div className="flex-1">

              <div className="flex justify-between">
                <span className="font-semibold">
                  {level.name}
                </span>

                <span className="font-bold">
                  {level.score}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${level.score}%` }}
                />

              </div>

              <p className="text-sm text-gray-500 mt-2">
                {level.status}
              </p>

            </div>

            {index < levels.length - 1 && (
              <ArrowRight className="text-gray-400" />
            )}

          </div>
        ))}

      </div>

      {/* Progress */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Smooth Progression
            </h2>

            <p className="text-gray-600 mt-1">
              Your performance is improving. AI will increase difficulty
              gradually instead of jumping directly from Medium to Hard.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}