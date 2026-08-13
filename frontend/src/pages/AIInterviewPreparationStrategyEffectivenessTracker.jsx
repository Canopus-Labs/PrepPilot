import React from "react";
import {
  Brain,
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
} from "lucide-react";

const activities = [
  {
    name: "Practice Questions",
    improvement: 18,
    time: "4.5 hrs",
    skill: "Algorithms",
    effectiveness: "High",
  },
  {
    name: "Flashcards",
    improvement: 11,
    time: "2 hrs",
    skill: "Concept Recall",
    effectiveness: "Medium",
  },
  {
    name: "Mock Interviews",
    improvement: 22,
    time: "3 hrs",
    skill: "Communication",
    effectiveness: "High",
  },
  {
    name: "Projects",
    improvement: 7,
    time: "8 hrs",
    skill: "System Design",
    effectiveness: "Low",
  },
];

export default function AIInterviewPreparationStrategyEffectivenessTracker() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Strategy Effectiveness Tracker
          </h1>

          <p className="text-gray-500">
            Discover which preparation activities produce the strongest
            improvement for you.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Personalized Learning Strategy
            </h2>

            <p className="text-gray-600 mt-1">
              Activity effectiveness is calculated from time invested,
              subsequent performance improvement, and the skills affected.
            </p>
          </div>

        </div>

      </div>

      {/* Best Strategy */}
      <div className="bg-green-50 rounded-2xl p-6 text-center">

        <TrendingUp
          className="mx-auto text-green-600"
          size={32}
        />

        <p className="text-gray-500 mt-3">
          Most Effective Activity
        </p>

        <p className="text-3xl font-black text-green-600">
          Mock Interviews
        </p>

        <p className="text-gray-600 mt-2">
          Average improvement: <strong>+22%</strong>
        </p>

      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

        <h2 className="font-bold text-lg">
          Strategy Performance
        </h2>

        <table className="w-full min-w-[750px] mt-5 border-collapse">

          <thead>
            <tr className="bg-gray-50">

              <th className="text-left p-4 border">
                Activity
              </th>

              <th className="p-4 border">
                Improvement
              </th>

              <th className="p-4 border">
                Time Invested
              </th>

              <th className="p-4 border">
                Skill Improved
              </th>

              <th className="p-4 border">
                Effectiveness
              </th>

            </tr>
          </thead>

          <tbody>

            {activities.map((activity) => (
              <tr key={activity.name}>

                <td className="p-4 border font-semibold">
                  {activity.name}
                </td>

                <td className="p-4 border text-center text-green-600 font-bold">
                  +{activity.improvement}%
                </td>

                <td className="p-4 border text-center">
                  {activity.time}
                </td>

                <td className="p-4 border text-center">
                  {activity.skill}
                </td>

                <td className="p-4 border text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      activity.effectiveness === "High"
                        ? "bg-green-100 text-green-700"
                        : activity.effectiveness === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {activity.effectiveness}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Activity Cards */}
      <div className="grid sm:grid-cols-2 gap-4">

        {activities.map((activity) => (
          <div
            key={activity.name}
            className="bg-white rounded-2xl shadow p-5"
          >

            <div className="flex justify-between">

              <h3 className="font-bold">
                {activity.name}
              </h3>

              <CheckCircle2
                className="text-indigo-600"
                size={20}
              />

            </div>

            <div className="mt-4">

              <div className="flex justify-between text-sm">
                <span>Performance Change</span>
                <strong className="text-green-600">
                  +{activity.improvement}%
                </strong>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${Math.min(
                      activity.improvement * 4,
                      100
                    )}%`,
                  }}
                />
              </div>

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <Clock size={16} />
              {activity.time} invested
            </div>

          </div>
        ))}

      </div>

      {/* AI Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingUp className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              AI Strategy Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Your data shows that mock interviews and practice questions
              produce the strongest measurable improvement. Prioritize these
              activities when preparing for your target interview, while using
              flashcards for targeted concept reinforcement.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}