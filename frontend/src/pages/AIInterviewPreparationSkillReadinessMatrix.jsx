import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  BookOpen,
} from "lucide-react";

const skills = [
  {
    skill: "Data Structures",
    required: 90,
    current: 88,
    evidence: 91,
    coverage: 94,
    recent: 86,
    gap: 2,
    status: "Interview Ready",
  },
  {
    skill: "Algorithms",
    required: 92,
    current: 81,
    evidence: 84,
    coverage: 86,
    recent: 79,
    gap: 11,
    status: "Practice Ready",
  },
  {
    skill: "System Design",
    required: 85,
    current: 68,
    evidence: 61,
    coverage: 64,
    recent: 70,
    gap: 17,
    status: "Developing",
  },
  {
    skill: "Database / SQL",
    required: 80,
    current: 84,
    evidence: 86,
    coverage: 89,
    recent: 82,
    gap: 0,
    status: "Strong",
  },
  {
    skill: "Communication",
    required: 88,
    current: 76,
    evidence: 73,
    coverage: 78,
    recent: 74,
    gap: 12,
    status: "Practice Ready",
  },
];

const statusStyles = {
  "Not Started": "bg-gray-100 text-gray-700",
  Developing: "bg-orange-100 text-orange-700",
  "Practice Ready": "bg-yellow-100 text-yellow-700",
  "Interview Ready": "bg-blue-100 text-blue-700",
  Strong: "bg-green-100 text-green-700",
};

export default function AIInterviewPreparationSkillReadinessMatrix() {
  const [selected, setSelected] = useState(null);

  const readySkills = skills.filter(
    (skill) =>
      skill.status === "Interview Ready" ||
      skill.status === "Strong"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Readiness Matrix
          </h1>

          <p className="text-gray-500">
            See which skills are ready for your target role and where
            preparation is still needed.
          </p>
        </div>

      </div>

      {/* Target Role */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Briefcase className="text-indigo-600" />

          <div>
            <p className="text-sm text-gray-500">
              Target Role
            </p>

            <h2 className="text-xl font-bold">
              Software Engineer
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Overall Readiness
            </p>

            <p className="text-3xl font-black text-indigo-600">
              80%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Interview-Ready Skills
            </p>

            <p className="text-3xl font-black text-green-600">
              {readySkills}/{skills.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Priority Gaps
            </p>

            <p className="text-3xl font-black text-orange-600">
              3
            </p>

          </div>

        </div>

      </div>

      {/* Matrix */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Role Skill Readiness Matrix
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Click a skill to view the evidence and gap analysis.
        </p>

        <div className="overflow-x-auto mt-5">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b text-left">

                <th className="p-3">
                  Skill
                </th>

                <th className="p-3">
                  Required
                </th>

                <th className="p-3">
                  Current
                </th>

                <th className="p-3">
                  Evidence
                </th>

                <th className="p-3">
                  Coverage
                </th>

                <th className="p-3">
                  Recent
                </th>

                <th className="p-3">
                  Gap
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {skills.map((skill) => (
                <tr
                  key={skill.skill}
                  onClick={() =>
                    setSelected(
                      selected?.skill === skill.skill
                        ? null
                        : skill
                    )
                  }
                  className="border-b hover:bg-indigo-50 cursor-pointer"
                >

                  <td className="p-3 font-semibold">
                    {skill.skill}
                  </td>

                  <td className="p-3">
                    {skill.required}%
                  </td>

                  <td className="p-3 font-bold">
                    {skill.current}%
                  </td>

                  <td className="p-3">
                    {skill.evidence}%
                  </td>

                  <td className="p-3">
                    {skill.coverage}%
                  </td>

                  <td className="p-3">
                    {skill.recent}%
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        skill.gap === 0
                          ? "text-green-600 font-bold"
                          : "text-orange-600 font-bold"
                      }
                    >
                      {skill.gap}%
                    </span>

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[skill.status]
                      }`}
                    >
                      {skill.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Selected Skill */}
      {selected && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Selected Skill
              </p>

              <h2 className="text-2xl font-bold">
                {selected.skill}
              </h2>

            </div>

            <span
              className={`px-4 py-2 h-fit rounded-full text-sm font-semibold ${
                statusStyles[selected.status]
              }`}
            >
              {selected.status}
            </span>

          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-6">

            <div className="bg-white rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Current Level
              </p>

              <p className="text-2xl font-bold text-indigo-600">
                {selected.current}%
              </p>

            </div>

            <div className="bg-white rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Evidence Strength
              </p>

              <p className="text-2xl font-bold text-indigo-600">
                {selected.evidence}%
              </p>

            </div>

            <div className="bg-white rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Practice Coverage
              </p>

              <p className="text-2xl font-bold text-indigo-600">
                {selected.coverage}%
              </p>

            </div>

            <div className="bg-white rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Remaining Gap
              </p>

              <p className="text-2xl font-bold text-orange-600">
                {selected.gap}%
              </p>

            </div>

          </div>

          <div className="mt-5 bg-white rounded-xl p-5">

            <h3 className="font-bold">
              AI Evidence Summary
            </h3>

            <p className="text-gray-600 mt-2">
              Your recent practice and assessment performance provide{" "}
              <strong>{selected.evidence}%</strong> evidence of proficiency
              in {selected.skill}. The target role expects approximately{" "}
              <strong>{selected.required}%</strong>. Continue targeted practice
              until your recent performance consistently reaches the role
              requirement.
            </p>

          </div>

        </div>
      )}

      {/* Status Guide */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Readiness Levels
        </h2>

        <div className="grid md:grid-cols-5 gap-3 mt-5">

          {[
            ["Not Started", "No meaningful evidence yet."],
            ["Developing", "Foundational understanding is forming."],
            ["Practice Ready", "Ready for focused practice."],
            ["Interview Ready", "Performance meets role expectations."],
            ["Strong", "Performance consistently exceeds expectations."],
          ].map(([status, description]) => (
            <div
              key={status}
              className="border rounded-xl p-4"
            >

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusStyles[status]
                }`}
              >
                {status}
              </span>

              <p className="text-sm text-gray-600 mt-3">
                {description}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Priority Gaps */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={25}
          />

          <div>

            <h2 className="font-bold text-orange-700">
              Highest-Priority Skill Gaps
            </h2>

            <div className="space-y-3 mt-3">

              <p className="text-gray-600">
                <strong>1. System Design</strong> — 17% below the target
                requirement. Increase architecture and trade-off practice.
              </p>

              <p className="text-gray-600">
                <strong>2. Communication</strong> — 12% below target. Practice
                structured technical and behavioral responses.
              </p>

              <p className="text-gray-600">
                <strong>3. Algorithms</strong> — 11% below target. Focus on
                medium and hard algorithmic problems.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target
            className="text-green-600"
            size={25}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Preparation Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Prioritize <strong>System Design</strong> first because it has
              the largest gap between your current proficiency and the target
              role requirement. After that, work on Communication and
              Algorithms while maintaining your already strong SQL and Data
              Structures skills.
            </p>

          </div>

        </div>

      </div>

      {/* Evidence */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-3">

          <BookOpen className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Evidence-Based Readiness
            </h2>

            <p className="text-gray-600 mt-2">
              Readiness is not calculated from one score. The system combines
              demonstrated proficiency, supporting evidence, practice
              coverage, and recent performance to determine whether each skill
              is genuinely interview ready.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}