import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const skills = [
  {
    name: "Algorithms",
    previous: 91,
    current: 78,
    decline: 13,
    status: "Regression Detected",
  },
  {
    name: "Data Structures",
    previous: 88,
    current: 86,
    decline: 2,
    status: "Stable",
  },
  {
    name: "Problem Solving",
    previous: 84,
    current: 76,
    decline: 8,
    status: "Needs Attention",
  },
];

export default function AIInterviewPreparationSkillRegressionAlert() {
  const [selectedSkill, setSelectedSkill] = useState("Algorithms");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Regression Alert
          </h1>

          <p className="text-gray-500">
            Detect meaningful declines in previously strong interview skills.
          </p>
        </div>

      </div>

      {/* Alert */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              Skill Regression Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Your Algorithms performance decreased from 91% to 78%.
              A targeted revision session is recommended.
            </p>

          </div>

        </div>

      </div>

      {/* Skill Selector */}
      <div className="bg-white rounded-2xl shadow p-5">

        <label className="text-sm text-gray-500">
          Select Skill
        </label>

        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {skills.map((skill) => (
            <option key={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>

      </div>

      {/* Skill Cards */}
      <div className="space-y-4">

        {skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-white rounded-2xl shadow p-5"
          >

            <div className="flex justify-between items-center">

              <div>
                <h2 className="font-bold text-lg">
                  {skill.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Historical: {skill.previous}% → Current:{" "}
                  {skill.current}%
                </p>
              </div>

              {skill.decline <= 2 ? (
                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle2 size={18} />
                  Stable
                </span>
              ) : (
                <span className="flex items-center gap-2 text-orange-600 font-semibold">
                  <TrendingDown size={18} />
                  {skill.status}
                </span>
              )}

            </div>

            <div className="mt-5">

              <div className="flex justify-between text-sm">
                <span>Current Performance</span>
                <span className="font-bold">
                  {skill.current}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${skill.current}%`,
                  }}
                />
              </div>

            </div>

            {skill.decline > 2 && (
              <div className="mt-4 bg-orange-50 rounded-xl p-3 text-sm text-orange-700">
                Performance declined by{" "}
                <strong>{skill.decline} percentage points</strong>.
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Recovery Plan */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <RefreshCw className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Targeted Recovery Plan
            </h2>

            <p className="text-gray-600 mt-2">
              Complete 5 algorithm recall questions, review your most common
              mistakes, and attempt 3 medium-difficulty problems. Your skill
              score will be reassessed afterward.
            </p>

            <button className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold">
              Start Revision
            </button>
          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Recovery Tracking
            </h2>

            <p className="text-gray-600 mt-2">
              After revision, the system will compare your new performance
              against the historical baseline and determine whether the
              regression has been recovered.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}