import React from "react";
import {
  Brain,
  TrendingUp,
  Target,
  CheckCircle2,
} from "lucide-react";

const metrics = [
  { name: "Accuracy", before: 62, after: 84 },
  { name: "Recall", before: 58, after: 81 },
  { name: "Topic Mastery", before: 65, after: 86 },
  { name: "Solving Speed", before: 70, after: 82 },
  { name: "Error Frequency", before: 38, after: 18 },
];

export default function AIInterviewPreparationRevisionEffectivenessAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Revision Effectiveness Analyzer
          </h1>

          <p className="text-gray-500">
            Measure whether your revision is actually improving performance.
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <Target className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          Revision Effectiveness Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          86%
        </p>

        <p className="text-gray-600 mt-2">
          Your recent revision produced strong measurable improvement.
        </p>
      </div>

      {/* Comparison */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Before vs After Revision
        </h2>

        {metrics.map((metric) => (
          <div key={metric.name} className="border rounded-xl p-4">

            <div className="flex justify-between">
              <span className="font-semibold">
                {metric.name}
              </span>

              <span className="font-bold text-green-600">
                {metric.before}% → {metric.after}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">

              <div>
                <p className="text-xs text-gray-500">Before</p>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${metric.before}%` }}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">After</p>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${metric.after}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Learning Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Accuracy and recall improved significantly after revision,
              while error frequency decreased. This indicates that the
              revision strategy is effectively strengthening topic mastery.
            </p>
          </div>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Continue using active recall and reattempt questions after
              revision. Schedule another recall session later to confirm
              long-term retention.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}