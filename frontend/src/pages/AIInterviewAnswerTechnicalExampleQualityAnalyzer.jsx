import React from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

const metrics = [
  { name: "Example Relevance", score: 90 },
  { name: "Technical Correctness", score: 86 },
  { name: "Practical Applicability", score: 78 },
  { name: "Level of Detail", score: 68 },
  { name: "Concept Connection", score: 84 },
];

export default function AIInterviewAnswerTechnicalExampleQualityAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Example Quality Analyzer
          </h1>

          <p className="text-gray-500">
            Evaluate how effectively your technical examples support your
            explanation.
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <Target className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          Example Quality Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          81%
        </p>

        <p className="text-gray-600 mt-2">
          Your example strongly supports the main technical concept.
        </p>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Example Analysis
        </h2>

        {metrics.map((metric) => (
          <div key={metric.name} className="border rounded-xl p-4">

            <div className="flex justify-between">
              <span className="font-semibold">
                {metric.name}
              </span>

              <span className="font-bold text-indigo-600">
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

      {/* Strength */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Strong Point
            </h2>

            <p className="text-gray-600 mt-2">
              The example is relevant and technically accurate. It clearly
              demonstrates how the concept can be applied in practice.
            </p>
          </div>
        </div>

      </div>

      {/* Improvement */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Improvement
            </h2>

            <p className="text-gray-600 mt-2">
              Add specific implementation details and explain the practical
              outcome of using this approach.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}