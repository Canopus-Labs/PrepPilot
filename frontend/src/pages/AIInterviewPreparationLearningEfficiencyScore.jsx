import React from "react";
import {
  Brain,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const metrics = [
  { name: "Accuracy Improvement", score: 86 },
  { name: "Topic Mastery Growth", score: 78 },
  { name: "Revision Effectiveness", score: 82 },
  { name: "Mock Interview Improvement", score: 74 },
  { name: "Solving Speed", score: 80 },
];

export default function AIInterviewPreparationLearningEfficiencyScore() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Learning Efficiency Score
          </h1>

          <p className="text-gray-500">
            Measure improvement achieved from your preparation time.
          </p>
        </div>
      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Clock className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          Overall Learning Efficiency
        </p>

        <p className="text-6xl font-black text-indigo-600">
          82%
        </p>

        <p className="text-gray-600 mt-2">
          Your preparation is becoming more efficient.
        </p>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Efficiency Factors
        </h2>

        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between">
              <span className="font-semibold">
                {metric.name}
              </span>

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

      {/* Trend */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Efficiency Trend
            </h2>

            <p className="text-gray-600 mt-2">
              Your accuracy and topic mastery are improving without a
              proportional increase in study time. This indicates stronger
              preparation efficiency.
            </p>
          </div>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-indigo-600" />

          <div>
            <h2 className="font-bold">
              AI Recommendation
            </h2>

            <p className="text-gray-500 mt-2">
              Continue prioritizing targeted revision and weak-topic practice
              instead of simply increasing total study hours.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}