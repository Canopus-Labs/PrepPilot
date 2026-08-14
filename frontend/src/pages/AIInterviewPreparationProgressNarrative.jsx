import React from "react";
import {
  Brain,
  TrendingUp,
  Trophy,
  Target,
} from "lucide-react";

export default function AIInterviewPreparationProgressNarrative() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Preparation Progress Narrative
          </h1>

          <p className="text-gray-500">
            Understand the story behind your interview preparation progress.
          </p>
        </div>

      </div>

      {/* Progress */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <TrendingUp
          className="mx-auto text-indigo-600"
          size={30}
        />

        <p className="text-gray-500 mt-3">
          Overall Progress
        </p>

        <p className="text-6xl font-black text-indigo-600">
          +24%
        </p>

        <p className="text-gray-600 mt-2">
          Performance improvement over the last 30 days.
        </p>

      </div>

      {/* Narrative */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-lg font-bold">
          Your Preparation Story
        </h2>

        <p className="text-gray-600 leading-7 mt-4">
          Over the past month, your technical interview performance has
          improved steadily. Your strongest progress has been in Data
          Structures, SQL, and problem-solving speed. You have also become
          more consistent in completing revision sessions.
        </p>

        <p className="text-gray-600 leading-7 mt-3">
          Dynamic Programming remains a recurring weakness, although recent
          revision has started to improve your accuracy. Your mock interview
          performance has also improved, particularly in technical explanation
          and answer structure.
        </p>

      </div>

      {/* Improvements */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">
          <h2 className="font-bold text-green-700">
            Major Improvements
          </h2>

          <ul className="text-gray-600 mt-3 space-y-2">
            <li>• DSA accuracy: +18%</li>
            <li>• SQL performance: +14%</li>
            <li>• Solving speed: +11%</li>
          </ul>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5">
          <h2 className="font-bold text-orange-700">
            Persistent Weakness
          </h2>

          <p className="text-gray-600 mt-3">
            Dynamic Programming continues to require focused practice and
            prerequisite revision.
          </p>
        </div>

      </div>

      {/* Milestone */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Trophy className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Recent Milestone
            </h2>

            <p className="text-gray-600 mt-2">
              Successfully reached 80% accuracy on Medium-level DSA questions.
            </p>
          </div>
        </div>

      </div>

      {/* Next Priority */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex gap-3">
          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold">
              Recommended Next Priorities
            </h2>

            <p className="text-gray-600 mt-2">
              Focus on Dynamic Programming fundamentals, continue Medium-level
              practice, and complete one mock interview each week.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}