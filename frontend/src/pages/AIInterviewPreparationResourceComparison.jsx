import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";

const resources = [
  {
    name: "DSA Crash Course",
    difficulty: "Medium",
    coverage: "High",
    time: "12 hrs",
    match: 88,
  },
  {
    name: "Advanced Algorithms",
    difficulty: "Hard",
    coverage: "Very High",
    time: "25 hrs",
    match: 72,
  },
  {
    name: "Interview Practice Set",
    difficulty: "Medium",
    coverage: "Medium",
    time: "8 hrs",
    match: 94,
  },
];

export default function AIInterviewPreparationResourceComparison() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Resource Comparison
          </h1>

          <p className="text-gray-500">
            Compare preparation resources and choose the best match.
          </p>
        </div>

      </div>

      {/* User Goal */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Current Preparation Goal
            </h2>

            <p className="text-gray-600 mt-1">
              Improve DSA performance for a technical interview within
              limited preparation time.
            </p>
          </div>
        </div>

      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

        <h2 className="font-bold text-lg">
          Compare Resources
        </h2>

        <table className="w-full min-w-[700px] mt-5 border-collapse">

          <thead>
            <tr className="bg-gray-50">

              <th className="text-left p-4 border">
                Resource
              </th>

              <th className="p-4 border">
                Difficulty
              </th>

              <th className="p-4 border">
                Coverage
              </th>

              <th className="p-4 border">
                Time
              </th>

              <th className="p-4 border">
                AI Match
              </th>

            </tr>
          </thead>

          <tbody>

            {resources.map((resource, index) => (
              <tr
                key={resource.name}
                onClick={() => setSelected(index)}
                className={`cursor-pointer ${
                  selected === index
                    ? "bg-indigo-50"
                    : ""
                }`}
              >

                <td className="p-4 border font-semibold">
                  {resource.name}
                </td>

                <td className="p-4 border text-center">
                  {resource.difficulty}
                </td>

                <td className="p-4 border text-center">
                  {resource.coverage}
                </td>

                <td className="p-4 border text-center">
                  {resource.time}
                </td>

                <td className="p-4 border text-center">
                  <span className="font-bold text-indigo-600">
                    {resource.match}%
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Selected Resource */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Selected Resource
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Resource
            </p>
            <p className="font-bold mt-1">
              {resources[selected].name}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <Clock className="text-indigo-600" size={20} />
            <p className="text-gray-500 mt-2">
              Completion Time
            </p>
            <p className="font-bold">
              {resources[selected].time}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <Target className="text-indigo-600" size={20} />
            <p className="text-gray-500 mt-2">
              Goal Match
            </p>
            <p className="font-bold text-indigo-600">
              {resources[selected].match}%
            </p>
          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              The Interview Practice Set is the strongest match because it
              provides relevant DSA practice, fits your available preparation
              time, and aligns closely with your current interview goal.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}