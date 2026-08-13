import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const skills = [
  {
    name: "System Design",
    importance: 95,
    proficiency: 58,
    roleNeed: 94,
    recent: 62,
    priority: "Critical",
    action: "Practice architecture and scalability problems.",
  },
  {
    name: "Algorithms",
    importance: 90,
    proficiency: 72,
    roleNeed: 88,
    recent: 76,
    priority: "High",
    action: "Complete medium and hard algorithm questions.",
  },
  {
    name: "SQL",
    importance: 78,
    proficiency: 84,
    roleNeed: 82,
    recent: 86,
    priority: "Medium",
    action: "Maintain with short weekly revision sessions.",
  },
  {
    name: "Communication",
    importance: 82,
    proficiency: 91,
    roleNeed: 85,
    recent: 90,
    priority: "Low",
    action: "Continue mock interview practice.",
  },
];

function getPriorityStyle(priority) {
  if (priority === "Critical") {
    return "bg-red-100 text-red-700";
  }

  if (priority === "High") {
    return "bg-orange-100 text-orange-700";
  }

  if (priority === "Medium") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-green-100 text-green-700";
}

export default function AIInterviewPreparationSkillPriorityHeatmap() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Priority Heatmap
          </h1>

          <p className="text-gray-500">
            Identify the skills that deserve the most preparation attention.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Preparation Priority
            </h2>

            <p className="text-gray-600 mt-1">
              Priority is based on role importance, current proficiency,
              recent performance, and preparation needs.
            </p>
          </div>

        </div>

      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

        <h2 className="font-bold text-lg">
          Skill Priority Heatmap
        </h2>

        <table className="w-full min-w-[750px] mt-5 border-collapse">

          <thead>
            <tr className="bg-gray-50">

              <th className="text-left p-4 border">
                Skill
              </th>

              <th className="p-4 border">
                Importance
              </th>

              <th className="p-4 border">
                Proficiency
              </th>

              <th className="p-4 border">
                Role Need
              </th>

              <th className="p-4 border">
                Recent
              </th>

              <th className="p-4 border">
                Priority
              </th>

            </tr>
          </thead>

          <tbody>

            {skills.map((skill) => (
              <tr
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className="cursor-pointer hover:bg-gray-50"
              >

                <td className="p-4 border font-semibold">
                  {skill.name}
                </td>

                <td className="p-4 border text-center">
                  {skill.importance}%
                </td>

                <td className="p-4 border text-center">
                  {skill.proficiency}%
                </td>

                <td className="p-4 border text-center">
                  {skill.roleNeed}%
                </td>

                <td className="p-4 border text-center">
                  {skill.recent}%
                </td>

                <td className="p-4 border text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityStyle(
                      skill.priority
                    )}`}
                  >
                    {skill.priority}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Priority Cards */}
      <div className="grid sm:grid-cols-2 gap-4">

        {skills.map((skill) => (
          <button
            key={skill.name}
            type="button"
            onClick={() => setSelectedSkill(skill)}
            className="text-left bg-white rounded-2xl shadow p-5 hover:bg-gray-50"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-bold">
                {skill.name}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                  skill.priority
                )}`}
              >
                {skill.priority}
              </span>

            </div>

            <div className="mt-4">

              <div className="flex justify-between text-sm">
                <span>Current Proficiency</span>
                <span className="font-bold">
                  {skill.proficiency}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${skill.proficiency}%`,
                  }}
                />
              </div>

            </div>

          </button>
        ))}

      </div>

      {/* Selected Skill */}
      {selectedSkill && (
        <div className="bg-orange-50 rounded-2xl p-5">

          <div className="flex gap-3">

            {selectedSkill.priority === "Critical" ||
            selectedSkill.priority === "High" ? (
              <AlertTriangle className="text-orange-600" />
            ) : (
              <CheckCircle2 className="text-green-600" />
            )}

            <div>

              <h2 className="font-bold text-orange-700">
                {selectedSkill.name} — Recommended Action
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedSkill.action}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm">

                <span>
                  Skill Importance:{" "}
                  <strong>{selectedSkill.importance}%</strong>
                </span>

                <span>
                  Current Proficiency:{" "}
                  <strong>{selectedSkill.proficiency}%</strong>
                </span>

                <span>
                  Role Requirement:{" "}
                  <strong>{selectedSkill.roleNeed}%</strong>
                </span>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Timeline Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Clock className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              AI Preparation Insight
            </h2>

            <p className="text-gray-600 mt-2">
              System Design should receive the highest priority because it has
              high importance for the target role while current proficiency is
              comparatively low. Allocate more preparation time to this skill
              before maintaining already-strong areas.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}