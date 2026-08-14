import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  Target,
} from "lucide-react";

const skills = {
  "Problem Solving": [
    ["Coding Questions", "24 activities", 88],
    ["Assessments", "4 assessments", 76],
    ["Mock Interviews", "2 interviews", 62],
  ],
  "Technical Communication": [
    ["Mock Interviews", "5 interviews", 91],
    ["Technical Questions", "18 questions", 82],
    ["Projects", "3 projects", 74],
  ],
  "Concept Knowledge": [
    ["Flashcards", "42 cards", 86],
    ["Revision Questions", "20 questions", 79],
    ["Assessments", "3 assessments", 71],
  ],
};

export default function AIInterviewPreparationActivityImpactMap() {
  const [selectedSkill, setSelectedSkill] =
    useState("Problem Solving");

  const activities = skills[selectedSkill];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Activity Impact Map
          </h1>

          <p className="text-gray-500">
            See which preparation activities contribute to your skills.
          </p>
        </div>

      </div>

      {/* Skill Selection */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <Target className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Select a Skill
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">

          {Object.keys(skills).map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-4 py-2 rounded-xl font-semibold ${
                selectedSkill === skill
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {skill}
            </button>
          ))}

        </div>

      </div>

      {/* Impact Map */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex justify-center mb-6">
          <div className="px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold">
            {selectedSkill}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">

          {activities.map(([activity, count, impact]) => (
            <div
              key={activity}
              className="bg-white border rounded-xl p-4 text-center"
            >

              <Network
                className="mx-auto text-indigo-600"
                size={26}
              />

              <h3 className="font-bold mt-3">
                {activity}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {count}
              </p>

              <p className="text-2xl font-black text-indigo-600 mt-3">
                {impact}%
              </p>

              <p className="text-xs text-gray-500">
                Estimated contribution
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Impact Insight
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedSkill === "Problem Solving"
                ? "Coding questions currently have the strongest contribution to your problem-solving improvement."
                : selectedSkill === "Technical Communication"
                ? "Mock interviews are providing the strongest evidence of improvement in technical communication."
                : "Flashcards and revision questions are contributing most to your concept knowledge."}
            </p>
          </div>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Recommended Activity
        </h2>

        <p className="text-gray-600 mt-2">
          Continue activities with strong skill impact, while adding lower-used
          activity types to build broader evidence of improvement.
        </p>

      </div>

    </div>
  );
}