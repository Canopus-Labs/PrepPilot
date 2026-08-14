import React from "react";
import {
  Brain,
  TrendingUp,
  Target,
  Trophy,
} from "lucide-react";

const levels = [
  { level: "Easy", accuracy: 92, time: "1m 10s", attempts: 18 },
  { level: "Medium", accuracy: 81, time: "2m 35s", attempts: 15 },
  { level: "Hard", accuracy: 64, time: "4m 20s", attempts: 10 },
];

export default function AIInterviewQuestionLearningCurveTracker() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Learning Curve Tracker
          </h1>

          <p className="text-gray-500">
            Visualize your progress across increasing question difficulty.
          </p>
        </div>

      </div>

      {/* Overall Progress */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <TrendingUp
          className="mx-auto text-indigo-600"
          size={30}
        />

        <p className="text-gray-500 mt-3">
          Learning Progress
        </p>

        <p className="text-5xl font-black text-indigo-600">
          78%
        </p>

        <p className="text-gray-600 mt-2">
          Your performance is improving as difficulty increases.
        </p>

      </div>

      {/* Difficulty Levels */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="text-lg font-bold mb-5">
          Difficulty Progression
        </h2>

        <div className="space-y-5">

          {levels.map((item, index) => (
            <div key={item.level}>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  {index + 1}. {item.level}
                </span>

                <span className="font-bold text-indigo-600">
                  {item.accuracy}%
                </span>
              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${item.accuracy}%` }}
                />
              </div>

              <div className="flex gap-5 text-sm text-gray-500 mt-2">
                <span>Time: {item.time}</span>
                <span>Attempts: {item.attempts}</span>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Milestone */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Trophy className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Milestone Achieved
            </h2>

            <p className="text-gray-600 mt-2">
              You successfully progressed from Easy to Medium questions with
              over 80% accuracy.
            </p>
          </div>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Target className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Hard questions currently have the lowest accuracy. Practice more
              Hard-level problems before progressing to advanced challenges.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}