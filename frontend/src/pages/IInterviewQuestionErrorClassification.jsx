import React from "react";
import {
  Brain,
  AlertTriangle,
  Code2,
  Target,
  TrendingUp,
} from "lucide-react";

const errors = [
  ["Conceptual Error", 3],
  ["Logic Error", 5],
  ["Implementation Error", 2],
  ["Edge-Case Error", 4],
  ["Requirement Error", 1],
  ["Complexity Error", 2],
];

export default function AIInterviewQuestionErrorClassification() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Error Classification
          </h1>

          <p className="text-gray-500">
            Understand why your interview answers go wrong.
          </p>
        </div>

      </div>

      {/* Latest Error */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">
          <AlertTriangle className="text-orange-600" />

          <div>
            <p className="text-sm text-gray-500">
              Latest Question
            </p>

            <h2 className="text-xl font-bold mt-1">
              Find the shortest path between two nodes.
            </h2>

            <p className="text-orange-700 font-semibold mt-3">
              Classified Error: Logic Error
            </p>

          </div>
        </div>

      </div>

      {/* Error Details */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Error Analysis
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-5">

          <div className="border rounded-xl p-4">
            <Code2 className="text-indigo-600" />

            <p className="text-gray-500 mt-3">
              Error Type
            </p>

            <p className="font-bold text-lg">
              Logic Error
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <Target className="text-indigo-600" />

            <p className="text-gray-500 mt-3">
              Confidence
            </p>

            <p className="font-bold text-lg">
              91%
            </p>
          </div>

        </div>

        <div className="bg-orange-50 rounded-xl p-4 mt-4">
          <p className="font-semibold text-orange-700">
            AI Explanation
          </p>

          <p className="text-gray-600 mt-2">
            Your approach correctly identified the graph traversal problem,
            but the algorithm did not preserve the shortest-distance property
            when processing nodes.
          </p>
        </div>

      </div>

      {/* Error History */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Error Pattern History
        </h2>

        <div className="space-y-4 mt-5">

          {errors.map(([name, count]) => (
            <div key={name}>

              <div className="flex justify-between">
                <span className="font-semibold">
                  {name}
                </span>

                <span className="font-bold text-indigo-600">
                  {count} errors
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${Math.min(count * 15, 100)}%`,
                  }}
                />
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Recurring Pattern */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              AI Pattern Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Logic errors are currently your most frequent mistake.
              Practicing step-by-step algorithm tracing may help reduce this
              pattern.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}