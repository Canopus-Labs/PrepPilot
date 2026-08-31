import React from "react";
import {
  Brain,
  Clock,
  AlertTriangle,
  RotateCcw,
  TrendingDown,
} from "lucide-react";

export default function AIInterviewPreparationPracticeGapDetector() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Practice Gap Detector
          </h1>

          <p className="text-gray-500">
            Detect practice gaps and understand their impact on preparation.
          </p>
        </div>

      </div>

      {/* Gap Summary */}
      <div className="bg-orange-50 rounded-2xl p-6 text-center">

        <Clock
          className="mx-auto text-orange-600"
          size={32}
        />

        <p className="text-gray-500 mt-3">
          Longest Recent Practice Gap
        </p>

        <p className="text-6xl font-black text-orange-600">
          6 Days
        </p>

        <p className="text-gray-600 mt-2">
          Your last significant practice gap occurred recently.
        </p>

      </div>

      {/* Performance Comparison */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Performance Before vs After Gap
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">

          <div className="border rounded-xl p-5">

            <p className="text-gray-500">
              Before Gap
            </p>

            <p className="text-4xl font-black text-green-600 mt-2">
              84%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Average accuracy
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-gray-500">
              After Gap
            </p>

            <p className="text-4xl font-black text-orange-600 mt-2">
              72%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Average accuracy
            </p>

          </div>

        </div>

      </div>

      {/* Affected Topics */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Affected Topics
        </h2>

        <div className="space-y-3 mt-4">

          <div className="border rounded-xl p-4 flex justify-between">
            <span className="font-semibold">
              Dynamic Programming
            </span>

            <span className="text-orange-600 font-bold">
              -18%
            </span>
          </div>

          <div className="border rounded-xl p-4 flex justify-between">
            <span className="font-semibold">
              Graph Algorithms
            </span>

            <span className="text-orange-600 font-bold">
              -12%
            </span>
          </div>

          <div className="border rounded-xl p-4 flex justify-between">
            <span className="font-semibold">
              SQL
            </span>

            <span className="text-green-600 font-bold">
              Stable
            </span>
          </div>

        </div>

      </div>

      {/* AI Analysis */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingDown className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Gap Analysis
            </h2>

            <p className="text-gray-600 mt-2">
              Your performance dropped after the six-day inactivity period,
              particularly in topics that require frequent recall. A short
              recovery session can help restore previous performance.
            </p>
          </div>

        </div>

      </div>

      {/* Recovery */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <RotateCcw className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Recommended Recovery Session
            </h2>

            <p className="text-gray-600 mt-2">
              Complete 2 revision questions, 2 Easy practice problems, and
              one Medium problem from Dynamic Programming.
            </p>

            <button className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold">
              Start Recovery Session
            </button>
          </div>

        </div>

      </div>

      {/* Consistency Tip */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex gap-3">
          <AlertTriangle className="text-indigo-600" />

          <div>
            <h2 className="font-bold">
              Consistency Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Short, regular practice sessions may help maintain retention
              better than long sessions separated by extended gaps.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}