import React from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const matrix = [
  {
    skill: "Problem Solving",
    levels: ["Strong", "Developing", "Weak"],
  },
  {
    skill: "Algorithms",
    levels: ["Strong", "Strong", "Developing"],
  },
  {
    skill: "System Design",
    levels: ["Developing", "Weak", "Weak"],
  },
];

const getStyle = (level) => {
  if (level === "Strong")
    return "bg-green-100 text-green-700";

  if (level === "Developing")
    return "bg-yellow-100 text-yellow-700";

  return "bg-red-100 text-red-700";
};

export default function AIInterviewQuestionSkillDifficultyMatrix() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Difficulty Matrix
          </h1>

          <p className="text-gray-500">
            See how your skills perform across different difficulty levels.
          </p>
        </div>

      </div>

      {/* Matrix */}
      <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

        <div className="flex items-center gap-2 mb-5">
          <Target className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Skill Performance Matrix
          </h2>
        </div>

        <table className="w-full min-w-[600px] border-collapse">

          <thead>
            <tr className="bg-gray-50">

              <th className="text-left p-4 border">
                Skill
              </th>

              <th className="p-4 border">
                Easy
              </th>

              <th className="p-4 border">
                Medium
              </th>

              <th className="p-4 border">
                Hard
              </th>

            </tr>
          </thead>

          <tbody>

            {matrix.map((row) => (
              <tr key={row.skill}>

                <td className="p-4 border font-bold">
                  {row.skill}
                </td>

                {row.levels.map((level) => (
                  <td
                    key={level + row.skill}
                    className="p-4 border text-center"
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStyle(
                        level
                      )}`}
                    >
                      {level}
                    </span>
                  </td>
                ))}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Performance Legend
        </h2>

        <div className="flex flex-wrap gap-4 mt-4">

          <span className="px-3 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
            Strong
          </span>

          <span className="px-3 py-2 rounded-xl bg-yellow-100 text-yellow-700 font-semibold">
            Developing
          </span>

          <span className="px-3 py-2 rounded-xl bg-red-100 text-red-700 font-semibold">
            Weak
          </span>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Difficulty Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your Problem Solving skill is strong at Easy difficulty but
              becomes weak at Hard difficulty. Focus on advanced problems
              before increasing your overall difficulty level.
            </p>
          </div>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Recommended Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Complete 3 Hard Problem Solving questions and 2 Medium System
              Design questions to strengthen your difficulty progression.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}