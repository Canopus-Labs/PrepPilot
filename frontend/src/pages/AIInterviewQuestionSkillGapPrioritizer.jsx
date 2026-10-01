import React from "react";
import { Brain, Target, AlertTriangle, TrendingUp } from "lucide-react";

const gaps = [
  {
    skill: "Dynamic Programming",
    proficiency: 48,
    priority: "Critical",
    impact: 92,
  },
  {
    skill: "System Design",
    proficiency: 61,
    priority: "High",
    impact: 84,
  },
  {
    skill: "Communication",
    proficiency: 72,
    priority: "Medium",
    impact: 68,
  },
  {
    skill: "Arrays",
    proficiency: 88,
    priority: "Low",
    impact: 35,
  },
];

const priorityStyle = {
  Critical: "bg-red-100 text-red-600",
  High: "bg-orange-100 text-orange-600",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-600",
};

export default function AIInterviewQuestionSkillGapPrioritizer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Gap Prioritizer
          </h1>

          <p className="text-gray-500">
            Focus on the skill gaps that matter most for your target interview.
          </p>
        </div>

      </div>

      {/* Overall */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">
          <Target className="text-indigo-600" />

          <div>
            <p className="text-gray-500">
              Highest Priority Gap
            </p>

            <p className="text-2xl font-black text-indigo-600">
              Dynamic Programming
            </p>
          </div>
        </div>

        <p className="text-gray-600 mt-3">
          High role relevance and low current proficiency make this the
          highest-impact skill to improve.
        </p>

      </div>

      {/* Skill Gaps */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Prioritized Skill Gaps
        </h2>

        {gaps.map((gap, index) => (
          <div
            key={gap.skill}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  {index + 1}
                </span>

                <span className="font-semibold">
                  {gap.skill}
                </span>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityStyle[gap.priority]}`}
              >
                {gap.priority}
              </span>

            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Current Proficiency
                </span>

                <span className="font-bold">
                  {gap.proficiency}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${gap.proficiency}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Interview impact:{" "}
              <span className="font-semibold text-gray-700">
                {gap.impact}%
              </span>
            </p>

          </div>
        ))}

      </div>

      {/* Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Spend your next preparation sessions on Dynamic Programming.
              Once proficiency improves, shift focus toward System Design.
            </p>
          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Priority Rebalancing
            </h2>

            <p className="text-gray-600 mt-1">
              AI can automatically reorder these skill gaps as your
              performance and interview timeline change.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}