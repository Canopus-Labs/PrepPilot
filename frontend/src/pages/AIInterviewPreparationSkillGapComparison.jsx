import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Briefcase,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

const skills = [
  {
    name: "Data Structures",
    current: 82,
    expected: 90,
    importance: "Critical",
    evidence: "42 practice questions",
    gap: 8,
    recommendation: "Practice advanced tree and graph problems.",
  },
  {
    name: "Algorithms",
    current: 74,
    expected: 88,
    importance: "Critical",
    evidence: "31 practice questions",
    gap: 14,
    recommendation: "Focus on dynamic programming and greedy problems.",
  },
  {
    name: "System Design",
    current: 61,
    expected: 80,
    importance: "High",
    evidence: "4 design exercises",
    gap: 19,
    recommendation: "Practice scalability, caching, and reliability scenarios.",
  },
  {
    name: "Database",
    current: 78,
    expected: 82,
    importance: "High",
    evidence: "18 SQL exercises",
    gap: 4,
    recommendation: "Review indexing and query optimization.",
  },
  {
    name: "Communication",
    current: 69,
    expected: 85,
    importance: "High",
    evidence: "3 mock interviews",
    gap: 16,
    recommendation: "Practice structured technical explanations.",
  },
  {
    name: "Behavioral",
    current: 76,
    expected: 80,
    importance: "Medium",
    evidence: "12 behavioral questions",
    gap: 4,
    recommendation: "Prepare stronger STAR-based examples.",
  },
];

const importanceStyles = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
};

export default function AIInterviewPreparationSkillGapComparison() {
  const [role, setRole] = useState("Software Engineer");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const averageCurrent = Math.round(
    skills.reduce((sum, skill) => sum + skill.current, 0) / skills.length
  );

  const averageExpected = Math.round(
    skills.reduce((sum, skill) => sum + skill.expected, 0) / skills.length
  );

  const averageGap = averageExpected - averageCurrent;

  const criticalGaps = skills.filter(
    (skill) => skill.importance === "Critical" && skill.gap >= 10
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Target size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Preparation Skill Gap Comparison
          </h1>

          <p className="text-gray-500">
            Compare your current skills with the proficiency expected for your
            target interview role.
          </p>

        </div>

      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:items-end gap-5">

          <div className="flex-1">

            <label className="text-sm font-semibold text-gray-700">
              Target Interview Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Software Engineer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Scientist</option>
              <option>Machine Learning Engineer</option>
              <option>Data Analyst</option>
            </select>

          </div>

          <button
            type="button"
            onClick={() => setAnalyzed(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Compare Skill Gap
          </button>

        </div>

      </div>

      {analyzed && (
        <>
          {/* Role Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">
                <Briefcase
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Target Role
                </p>

                <h2 className="text-2xl font-black">
                  {role}
                </h2>

                <p className="text-gray-600 mt-1">
                  AI compared your preparation evidence against the expected
                  proficiency for this role.
                </p>

              </div>

              <div className="text-center">

                <p className="text-sm text-gray-500">
                  Readiness Gap
                </p>

                <p className="text-4xl font-black text-orange-600">
                  {averageGap}%
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <TrendingUp className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Current Skill Level
              </p>

              <p className="text-3xl font-black text-indigo-600">
                {averageCurrent}%
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Role Expectation
              </p>

              <p className="text-3xl font-black text-green-600">
                {averageExpected}%
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Critical Gaps
              </p>

              <p className="text-3xl font-black text-red-600">
                {criticalGaps}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-purple-600" />

              <p className="text-sm text-gray-500 mt-4">
                Skills Compared
              </p>

              <p className="text-3xl font-black text-purple-600">
                {skills.length}
              </p>

            </div>

          </div>

          {/* Comparison Overview */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Role-Specific Skill Comparison
                </h2>

                <p className="text-sm text-gray-500">
                  Compare current proficiency with the expected level for the
                  selected role.
                </p>

              </div>

            </div>

            <div className="space-y-6 mt-7">

              {skills.map((skill, index) => (
                <button
                  type="button"
                  key={skill.name}
                  onClick={() =>
                    setSelectedSkill(
                      selectedSkill === index ? null : index
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center gap-5">

                    <div className="w-48">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                          importanceStyles[skill.importance]
                        }`}
                      >
                        {skill.importance}
                      </span>

                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between text-xs mb-2">

                        <span className="text-indigo-600 font-semibold">
                          Current: {skill.current}%
                        </span>

                        <span className="text-green-600 font-semibold">
                          Expected: {skill.expected}%
                        </span>

                      </div>

                      <div className="relative h-4 bg-gray-200 rounded-full">

                        <div
                          className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${skill.current}%`,
                          }}
                        />

                        <div
                          className="absolute top-0 h-full w-1 bg-green-600"
                          style={{
                            left: `${skill.expected}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="text-center min-w-20">

                      <p className="text-xs text-gray-500">
                        Gap
                      </p>

                      <p
                        className={`text-2xl font-black ${
                          skill.gap >= 15
                            ? "text-red-600"
                            : skill.gap >= 8
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {skill.gap}%
                      </p>

                    </div>

                  </div>

                  {selectedSkill === index && (
                    <div className="mt-5 bg-indigo-50 rounded-xl p-4">

                      <div className="grid md:grid-cols-2 gap-4">

                        <div>

                          <p className="text-xs font-semibold text-indigo-700">
                            Practice Evidence
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {skill.evidence}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs font-semibold text-indigo-700">
                            AI Recommendation
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {skill.recommendation}
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Gap Priority */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-red-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-red-700">
                  Highest-Priority Skill Gaps
                </h2>

                <p className="text-gray-600 mt-2">
                  These skills combine high role importance with a significant
                  difference between your current and expected proficiency.
                </p>

                <div className="space-y-4 mt-5">

                  {skills
                    .filter((skill) => skill.gap >= 14)
                    .sort((a, b) => b.gap - a.gap)
                    .map((skill, index) => (
                      <div
                        key={skill.name}
                        className="bg-white rounded-xl p-5"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                            {index + 1}
                          </div>

                          <div className="flex-1">

                            <div className="flex justify-between gap-3">

                              <h3 className="font-bold">
                                {skill.name}
                              </h3>

                              <span className="text-red-600 font-black">
                                -{skill.gap}%
                              </span>

                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                              {skill.recommendation}
                            </p>

                          </div>

                        </div>

                      </div>
                    ))}

                </div>

              </div>

            </div>

          </div>

          {/* Evidence */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <BookOpen className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Skill Evidence
                </h2>

                <p className="text-sm text-gray-500">
                  Current proficiency is supported by actual preparation
                  activity rather than a score alone.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              {[
                ["Practice Questions", "91", "Questions completed"],
                ["Assessments", "8", "Technical assessments"],
                ["Mock Interviews", "3", "Interview simulations"],
              ].map(([title, value, description]) => (
                <div
                  key={title}
                  className="border rounded-xl p-5"
                >

                  <p className="text-sm text-gray-500">
                    {title}
                  </p>

                  <p className="text-3xl font-black text-indigo-600 mt-2">
                    {value}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Skill Gap Matrix */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Skill Gap Matrix
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              A quick overview of current level, target level, importance,
              and remaining gap.
            </p>

            <div className="overflow-x-auto mt-6">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3">
                      Skill
                    </th>

                    <th className="text-left p-3">
                      Current
                    </th>

                    <th className="text-left p-3">
                      Expected
                    </th>

                    <th className="text-left p-3">
                      Importance
                    </th>

                    <th className="text-left p-3">
                      Gap
                    </th>

                    <th className="text-left p-3">
                      Evidence
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {skills.map((skill) => (
                    <tr
                      key={skill.name}
                      className="border-b"
                    >

                      <td className="p-3 font-semibold">
                        {skill.name}
                      </td>

                      <td className="p-3 text-indigo-600 font-bold">
                        {skill.current}%
                      </td>

                      <td className="p-3 text-green-600 font-bold">
                        {skill.expected}%
                      </td>

                      <td className="p-3">

                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            importanceStyles[skill.importance]
                          }`}
                        >
                          {skill.importance}
                        </span>

                      </td>

                      <td className="p-3">

                        <span
                          className={`font-bold ${
                            skill.gap >= 14
                              ? "text-red-600"
                              : skill.gap >= 8
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}
                        >
                          {skill.gap}%
                        </span>

                      </td>

                      <td className="p-3 text-gray-500">
                        {skill.evidence}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Preparation Plan */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <TrendingUp className="text-green-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Gap-Closing Plan
                </h2>

                <p className="text-sm text-gray-500">
                  Prioritized actions to move your skills toward role
                  expectations.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {[
                {
                  skill: "System Design",
                  action: "Complete 3 scalability-focused design exercises.",
                  impact: "High",
                },
                {
                  skill: "Algorithms",
                  action: "Practice 10 dynamic programming and greedy problems.",
                  impact: "High",
                },
                {
                  skill: "Communication",
                  action: "Complete 2 technical explanation mock sessions.",
                  impact: "Medium",
                },
              ].map((item, index) => (
                <div
                  key={item.skill}
                  className="border rounded-xl p-5 flex gap-4"
                >

                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-3">

                      <h3 className="font-bold">
                        {item.skill}
                      </h3>

                      <span className="px-3 py-1 h-fit rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {item.impact} Impact
                      </span>

                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      {item.action}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Skill Gap Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Your strongest areas are Database and Behavioral skills,
                  which are already close to the expected role level. The
                  largest opportunities are System Design, Algorithms, and
                  Communication. Prioritizing these gaps will likely provide
                  more interview-readiness improvement than spending additional
                  time on already strong areas.
                </p>

              </div>

            </div>

          </div>

          {/* Final Readiness */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  AI Readiness Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  You are progressing toward the expected skill profile for
                  {` ${role}`}. Focus your remaining preparation time on the
                  highest-impact gaps rather than treating every skill equally.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Gap-Focused Practice
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}