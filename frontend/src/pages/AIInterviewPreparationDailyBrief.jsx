import React from "react";
import {
  Brain,
  Target,
  BookOpen,
  Clock,
  AlertTriangle,
  Trophy,
} from "lucide-react";

export default function AIInterviewPreparationDailyBrief() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Daily Preparation Brief
          </h1>

          <p className="text-gray-500">
            Your personalized interview preparation plan for today.
          </p>
        </div>
      </div>

      {/* Priority */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">
          <Target className="text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">
              Today's Priority Topic
            </p>

            <h2 className="text-2xl font-bold">
              Dynamic Programming
            </h2>
          </div>
        </div>

        <p className="text-gray-600 mt-4">
          Recent performance shows that this topic needs additional practice
          before progressing to harder questions.
        </p>

      </div>

      {/* Daily Tasks */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">
          <BookOpen className="text-indigo-600" />

          <h2 className="font-bold mt-3">
            Recommended Questions
          </h2>

          <ul className="text-gray-600 mt-3 space-y-2">
            <li>• 2 Easy DP questions</li>
            <li>• 2 Medium DP questions</li>
            <li>• 1 pattern-recognition question</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <Clock className="text-indigo-600" />

          <h2 className="font-bold mt-3">
            Suggested Practice
          </h2>

          <p className="text-3xl font-black text-indigo-600 mt-3">
            60 min
          </p>

          <p className="text-gray-500">
            Recommended preparation duration
          </p>
        </div>

      </div>

      {/* Revision */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Revision Items
        </h2>

        <div className="space-y-3 mt-4">

          <div className="border rounded-xl p-4">
            <p className="font-semibold">
              Memoization vs Tabulation
            </p>
            <p className="text-sm text-gray-500">
              Due for revision
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="font-semibold">
              Longest Common Subsequence
            </p>
            <p className="text-sm text-gray-500">
              Previous mistakes detected
            </p>
          </div>

        </div>

      </div>

      {/* Weakness */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              Recent Weakness
            </h2>

            <p className="text-gray-600 mt-2">
              You have recently struggled with identifying the correct DP
              state. Review state definition before attempting today's
              Medium-level questions.
            </p>
          </div>
        </div>

      </div>

      {/* Optional Challenge */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Trophy className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Optional Challenge
            </h2>

            <p className="text-gray-600 mt-2">
              Try one Hard-level Dynamic Programming problem without using
              hints.
            </p>
          </div>
        </div>

      </div>

      {/* Goal */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Today's Goal
        </h2>

        <p className="text-gray-600 mt-2">
          Complete the recommended questions, revise the two weak concepts,
          and improve DP accuracy above 75%.
        </p>

      </div>

    </div>
  );
}