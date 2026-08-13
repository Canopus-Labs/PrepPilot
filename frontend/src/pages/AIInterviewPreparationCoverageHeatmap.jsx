import React from "react";
import { Brain, Target, AlertTriangle } from "lucide-react";

const topics = [
  { name: "Arrays", score: 92 },
  { name: "Linked Lists", score: 78 },
  { name: "Trees", score: 64 },
  { name: "Graphs", score: 42 },
  { name: "Dynamic Programming", score: 31 },
  { name: "System Design", score: 55 },
  { name: "Databases", score: 84 },
  { name: "Operating Systems", score: 70 },
];

const getLevel = (score) => {
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  if (score >= 40) return "Low";
  return "Very Low";
};

const getStyle = (score) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-400";
  if (score >= 40) return "bg-orange-400";
  return "bg-red-400";
};

export default function AIInterviewPreparationCoverageHeatmap() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Preparation Coverage Heatmap
          </h1>

          <p className="text-gray-500">
            Visualize your interview preparation coverage across topics.
          </p>
        </div>

      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-lg font-bold">
            Topic Coverage
          </h2>

          <div className="text-sm text-gray-500">
            Low → High
          </div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          {topics.map((topic) => (
            <div
              key={topic.name}
              className={`${getStyle(topic.score)} text-white rounded-xl p-5 min-h-[120px] flex flex-col justify-between`}
            >

              <p className="font-semibold">
                {topic.name}
              </p>

              <div>
                <p className="text-3xl font-black">
                  {topic.score}%
                </p>

                <p className="text-sm opacity-90">
                  {getLevel(topic.score)} Coverage
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-2xl p-5">

        <h2 className="font-bold mb-4">
          Coverage Legend
        </h2>

        <div className="flex flex-wrap gap-4 text-sm">

          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-red-400" />
            Very Low
          </span>

          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-orange-400" />
            Low
          </span>

          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-yellow-400" />
            Medium
          </span>

          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-green-500" />
            High
          </span>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Priority Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Dynamic Programming and Graphs have the lowest coverage.
              Prioritize these topics before spending additional time on
              already well-covered areas such as Arrays and Databases.
            </p>
          </div>

        </div>

      </div>

      {/* Next Action */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Suggested Next Step
            </h2>

            <p className="text-gray-600 mt-1">
              Start a targeted Dynamic Programming revision session with
              medium-difficulty questions.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}