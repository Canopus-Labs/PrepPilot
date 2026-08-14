import React, { useState } from "react";
import {
  Brain,
  Clock,
  Target,
  TrendingUp,
  CalendarDays,
  Lightbulb,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const skills = [
  {
    name: "Data Structures & Algorithms",
    importance: 95,
    proficiency: 62,
    improvement: 88,
    allocation: 30,
    color: "bg-indigo-600",
  },
  {
    name: "System Design",
    importance: 90,
    proficiency: 58,
    improvement: 82,
    allocation: 25,
    color: "bg-purple-600",
  },
  {
    name: "Technical Communication",
    importance: 82,
    proficiency: 71,
    improvement: 76,
    allocation: 15,
    color: "bg-green-600",
  },
  {
    name: "Database & SQL",
    importance: 75,
    proficiency: 68,
    improvement: 70,
    allocation: 12,
    color: "bg-orange-500",
  },
  {
    name: "Behavioral Interviews",
    importance: 70,
    proficiency: 64,
    improvement: 65,
    allocation: 10,
    color: "bg-pink-500",
  },
  {
    name: "Computer Networks",
    importance: 55,
    proficiency: 78,
    improvement: 48,
    allocation: 8,
    color: "bg-cyan-600",
  },
];

export default function AIInterviewPreparationSkillInvestmentPlanner() {
  const [hours, setHours] = useState(20);
  const [daysLeft, setDaysLeft] = useState(7);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const totalAllocation = skills.reduce(
    (sum, skill) => sum + skill.allocation,
    0
  );

  const dailyHours = (hours / daysLeft).toFixed(1);

  const getHours = (percentage) =>
    ((hours * percentage) / 100).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Preparation Skill Investment Planner
          </h1>

          <p className="text-gray-500">
            Allocate your preparation time toward the skills with the highest
            expected interview impact.
          </p>
        </div>

      </div>

      {/* Planning Inputs */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Preparation Planning
            </h2>

            <p className="text-sm text-gray-500">
              Tell AI how much time you have before the interview.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div>

            <label className="text-sm font-semibold">
              Available Preparation Hours
            </label>

            <input
              type="number"
              min="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full border rounded-xl p-3 mt-2"
            />

          </div>

          <div>

            <label className="text-sm font-semibold">
              Days Until Interview
            </label>

            <input
              type="number"
              min="1"
              value={daysLeft}
              onChange={(e) => setDaysLeft(Number(e.target.value))}
              className="w-full border rounded-xl p-3 mt-2"
            />

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Clock className="text-indigo-600" />
            <p className="text-sm text-gray-500 mt-3">
              Total Time
            </p>
            <p className="text-3xl font-black text-indigo-600">
              {hours}h
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CalendarDays className="text-green-600" />
            <p className="text-sm text-gray-500 mt-3">
              Daily Target
            </p>
            <p className="text-3xl font-black text-green-600">
              {dailyHours}h
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Target className="text-purple-600" />
            <p className="text-sm text-gray-500 mt-3">
              Allocation
            </p>
            <p className="text-3xl font-black text-purple-600">
              {totalAllocation}%
            </p>
          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <div className="p-3 bg-white rounded-xl h-fit">
            <Brain className="text-indigo-600" size={28} />
          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              AI Investment Strategy
            </p>

            <h2 className="text-3xl font-black text-indigo-700 mt-1">
              Prioritize High Impact + High Gap Skills
            </h2>

            <p className="text-gray-600 mt-3">
              Your available preparation time should be concentrated on skills
              that are highly important for the target role while still having
              significant room for improvement.
            </p>

            <div className="mt-5 bg-white rounded-xl p-5">

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Recommended daily preparation
                </span>

                <strong className="text-indigo-600">
                  {dailyHours} hours/day
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Skill Allocation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recommended Skill Investment
            </h2>

            <p className="text-sm text-gray-500">
              Suggested percentage of your total preparation time.
            </p>

          </div>

        </div>

        <div className="space-y-6 mt-6">

          {skills.map((skill) => {

            const isSelected = selectedSkill === skill.name;

            return (
              <button
                type="button"
                key={skill.name}
                onClick={() =>
                  setSelectedSkill(
                    isSelected ? null : skill.name
                  )
                }
                className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-gray-100 rounded-xl">
                    <Target
                      size={22}
                      className="text-indigo-600"
                    />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap justify-between gap-3">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <div className="flex gap-3">

                        <span className="text-indigo-600 font-black">
                          {skill.allocation}%
                        </span>

                        <span className="text-gray-500 text-sm">
                          {getHours(skill.allocation)}h
                        </span>

                      </div>

                    </div>

                    <div className="h-4 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${skill.color}`}
                        style={{
                          width: `${skill.allocation}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                {isSelected && (
                  <div className="grid md:grid-cols-3 gap-4 mt-5">

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500">
                        Role Importance
                      </p>
                      <p className="text-2xl font-black mt-1">
                        {skill.importance}%
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500">
                        Current Proficiency
                      </p>
                      <p className="text-2xl font-black mt-1">
                        {skill.proficiency}%
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500">
                        Expected Improvement
                      </p>
                      <p className="text-2xl font-black text-green-600 mt-1">
                        {skill.improvement}%
                      </p>
                    </div>

                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* Investment Matrix */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Skill Investment Matrix
            </h2>

            <p className="text-sm text-gray-500">
              AI balances importance, proficiency, and expected improvement.
            </p>

          </div>

        </div>

        <div className="overflow-x-auto mt-6">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Skill
                </th>

                <th className="text-left p-3">
                  Importance
                </th>

                <th className="text-left p-3">
                  Proficiency
                </th>

                <th className="text-left p-3">
                  Improvement Potential
                </th>

                <th className="text-left p-3">
                  Time
                </th>

                <th className="text-left p-3">
                  Priority
                </th>

              </tr>

            </thead>

            <tbody>

              {skills.map((skill) => {

                const priority =
                  skill.importance >= 85 &&
                  skill.proficiency < 70
                    ? "Critical"
                    : skill.importance >= 70
                    ? "High"
                    : "Maintenance";

                return (
                  <tr
                    key={skill.name}
                    className="border-b"
                  >

                    <td className="p-3 font-semibold">
                      {skill.name}
                    </td>

                    <td className="p-3">
                      {skill.importance}%
                    </td>

                    <td className="p-3">
                      {skill.proficiency}%
                    </td>

                    <td className="p-3 text-green-600 font-semibold">
                      {skill.improvement}%
                    </td>

                    <td className="p-3 font-semibold">
                      {getHours(skill.allocation)}h
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : priority === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {priority}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

      {/* Daily Plan */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Suggested Daily Investment
            </h2>

            <p className="text-sm text-gray-500">
              Example distribution based on your current preparation window.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {skills.slice(0, 4).map((skill) => (

            <div
              key={skill.name}
              className="border rounded-xl p-5"
            >

              <div className="flex justify-between">

                <h3 className="font-bold">
                  {skill.name}
                </h3>

                <span className="text-indigo-600 font-bold">
                  {getHours(skill.allocation)}h
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2">
                Approximately{" "}
                {(
                  (Number(getHours(skill.allocation)) / daysLeft) *
                  60
                ).toFixed(0)}{" "}
                minutes per day.
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* AI Reasoning */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-green-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-green-700">
              Why AI Recommended This Allocation
            </h2>

            <p className="text-gray-600 mt-2">
              Data Structures & Algorithms and System Design receive the
              largest allocation because they have high role importance and
              significant improvement potential. Stronger skills such as
              Computer Networks receive maintenance-level preparation instead
              of consuming time needed by higher-impact gaps.
            </p>

          </div>

        </div>

      </div>

      {/* Time Saving */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Clock
            className="text-orange-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-orange-700">
              Time Optimization
            </h2>

            <p className="text-gray-600 mt-2">
              Avoid spending equal time on every skill. Your current plan
              concentrates preparation on the areas most likely to improve
              interview readiness before the deadline.
            </p>

          </div>

        </div>

      </div>

      {/* Action */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-indigo-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-indigo-700">
              Recommended Next Step
            </h2>

            <p className="text-gray-600 mt-2">
              Start with your highest-impact skills and follow the suggested
              time allocation. AI can recalculate the plan as your proficiency
              changes.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Start Personalized Plan
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}