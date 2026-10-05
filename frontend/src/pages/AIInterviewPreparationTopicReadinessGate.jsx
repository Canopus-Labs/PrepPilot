import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  Lock,
  TrendingUp,
} from "lucide-react";

const stages = [
  "Needs Foundation",
  "Ready for Practice",
  "Ready for Advanced Practice",
  "Mastered",
];

export default function AIInterviewPreparationTopicReadinessGate() {
  const [topic, setTopic] = useState("Binary Search");

  const metrics = [
    ["Concept Understanding", 88],
    ["Practice Accuracy", 84],
    ["Recall Performance", 79],
    ["Difficulty Progression", 72],
    ["Recent Consistency", 91],
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Readiness Gate
          </h1>

          <p className="text-gray-500">
            Determine when you are ready to progress to the next learning
            stage.
          </p>
        </div>

      </div>

      {/* Topic */}
      <div className="bg-white rounded-2xl shadow p-5">

        <label className="text-sm text-gray-500">
          Select Topic
        </label>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Binary Search</option>
          <option>Hashing</option>
          <option>Dynamic Programming</option>
          <option>System Design</option>
        </select>

      </div>

      {/* Readiness */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Target
          className="mx-auto text-indigo-600"
          size={34}
        />

        <p className="text-gray-500 mt-3">
          Current Readiness
        </p>

        <p className="text-6xl font-black text-indigo-600">
          83%
        </p>

        <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
          Ready for Advanced Practice
        </span>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Readiness Factors
        </h2>

        <div className="space-y-5 mt-5">

          {metrics.map(([name, score]) => (
            <div key={name}>

              <div className="flex justify-between">
                <span className="font-semibold">
                  {name}
                </span>

                <span className="font-bold text-indigo-600">
                  {score}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Readiness Gate */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Learning Progression Gate
        </h2>

        <div className="grid sm:grid-cols-4 gap-3 mt-5">

          {stages.map((stage, index) => {
            const active = index === 2;
            const completed = index < 2;

            return (
              <div
                key={stage}
                className={`rounded-xl p-4 text-center border ${
                  active
                    ? "border-indigo-500 bg-indigo-50"
                    : completed
                    ? "border-green-200 bg-green-50"
                    : "bg-gray-50"
                }`}
              >

                {completed ? (
                  <CheckCircle2
                    className="mx-auto text-green-600"
                    size={22}
                  />
                ) : active ? (
                  <TrendingUp
                    className="mx-auto text-indigo-600"
                    size={22}
                  />
                ) : (
                  <Lock
                    className="mx-auto text-gray-400"
                    size={22}
                  />
                )}

                <p className="font-semibold text-sm mt-2">
                  {stage}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Readiness Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              You have strong conceptual understanding and consistent recent
              performance. Move to advanced Binary Search problems, but
              continue short recall sessions to maintain retention.
            </p>

            <button className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold">
              Start Advanced Practice
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}