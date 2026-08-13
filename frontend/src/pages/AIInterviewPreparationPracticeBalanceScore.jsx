import React, { useState } from "react";
import {
  Brain,
  Scale,
  BookOpen,
  Code2,
  RotateCcw,
  ClipboardCheck,
  Mic2,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const activities = [
  {
    name: "New Concepts",
    actual: 30,
    recommended: 25,
    icon: BookOpen,
    status: "High",
  },
  {
    name: "Practice Questions",
    actual: 35,
    recommended: 30,
    icon: Code2,
    status: "High",
  },
  {
    name: "Revision",
    actual: 15,
    recommended: 20,
    icon: RotateCcw,
    status: "Low",
  },
  {
    name: "Assessments",
    actual: 10,
    recommended: 15,
    icon: ClipboardCheck,
    status: "Low",
  },
  {
    name: "Mock Interviews",
    actual: 10,
    recommended: 10,
    icon: Mic2,
    status: "Balanced",
  },
];

const recommendations = [
  {
    title: "Increase Revision",
    description:
      "Your revision activity is below the recommended level. Add short spaced-review sessions.",
  },
  {
    title: "Add More Assessments",
    description:
      "Assessments can verify whether concepts learned through practice are actually retained.",
  },
  {
    title: "Maintain Mock Interviews",
    description:
      "Your mock interview frequency is currently well balanced.",
  },
];

export default function AIInterviewPreparationPracticeBalanceScore() {
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Practice Balance Score
          </h1>

          <p className="text-gray-500">
            Measure whether your preparation contains the right mix of
            learning, practice, revision, assessment, and interviews.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Scale className="text-indigo-600" />

          <div>
            <p className="text-sm text-gray-500">
              Analysis Period
            </p>

            <h2 className="text-xl font-bold">
              Last 30 Preparation Days
            </h2>
          </div>

        </div>

        <p className="text-gray-600 mt-4">
          AI analyzes how your preparation time is distributed across
          different activity types and compares it with a balanced preparation
          pattern.
        </p>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Practice Balance
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Scale
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Overall Practice Balance
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  78%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Good Balance — Needs Adjustment
                </span>

                <p className="text-gray-600 mt-3">
                  Your preparation is generally balanced, but revision and
                  assessment activities are receiving less attention than
                  recommended.
                </p>

              </div>

            </div>

          </div>

          {/* Distribution */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Preparation Distribution
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Compare your actual activity distribution with the recommended
              balance.
            </p>

            <div className="space-y-5 mt-6">

              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <button
                    type="button"
                    key={activity.name}
                    onClick={() =>
                      setSelected(
                        selected?.name === activity.name
                          ? null
                          : activity
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex items-center gap-3">

                      <div className="p-2 rounded-lg bg-indigo-50">
                        <Icon
                          className="text-indigo-600"
                          size={22}
                        />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between">

                          <h3 className="font-semibold">
                            {activity.name}
                          </h3>

                          <span className="font-bold text-indigo-600">
                            {activity.actual}%
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-3">

                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{
                              width: `${activity.actual}%`,
                            }}
                          />

                        </div>

                        <div className="flex justify-between mt-2 text-xs">

                          <span className="text-gray-500">
                            Recommended: {activity.recommended}%
                          </span>

                          <span
                            className={
                              activity.status === "Balanced"
                                ? "text-green-600 font-semibold"
                                : activity.actual >
                                  activity.recommended
                                ? "text-orange-600 font-semibold"
                                : "text-yellow-600 font-semibold"
                            }
                          >
                            {activity.status}
                          </span>

                        </div>

                        {selected?.name === activity.name && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-sm text-gray-600">
                              AI recommends approximately{" "}
                              <strong>
                                {activity.recommended}%
                              </strong>{" "}
                              of your preparation time for this activity.
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Balance Chart */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Actual vs Recommended
            </h2>

            <div className="space-y-5 mt-6">

              {activities.map((activity) => (
                <div key={activity.name}>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="font-medium">
                      {activity.name}
                    </span>

                    <span className="text-gray-500">
                      {activity.actual}% / {activity.recommended}%
                    </span>

                  </div>

                  <div className="relative h-4 bg-gray-200 rounded-full">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${activity.actual}%`,
                      }}
                    />

                    <div
                      className="absolute top-[-4px] w-1 h-6 bg-black"
                      style={{
                        left: `${activity.recommended}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

            <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">

              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-indigo-600" />
                Actual
              </span>

              <span className="flex items-center gap-1">
                <span className="w-1 h-4 bg-black" />
                Recommended
              </span>

            </div>

          </div>

          {/* Activity Insights */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-orange-600"
                  size={26}
                />

                <div>

                  <h2 className="font-bold text-orange-700">
                    Overused Activities
                  </h2>

                  <p className="text-gray-600 mt-2">
                    New concepts and practice questions currently consume
                    more preparation time than recommended.
                  </p>

                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>• New Concepts: 30% vs 25%</li>
                    <li>• Practice Questions: 35% vs 30%</li>
                  </ul>

                </div>

              </div>

            </div>

            <div className="bg-yellow-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-yellow-600"
                  size={26}
                />

                <div>

                  <h2 className="font-bold text-yellow-700">
                    Underused Activities
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Revision and assessments are below the recommended
                    distribution.
                  </p>

                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>• Revision: 15% vs 20%</li>
                    <li>• Assessments: 10% vs 15%</li>
                  </ul>

                </div>

              </div>

            </div>

          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Balance Recommendations
                </h2>

                <p className="text-sm text-gray-500">
                  Suggested changes for your next preparation cycle.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-5">

              {recommendations.map((recommendation, index) => (
                <div
                  key={recommendation.title}
                  className="flex gap-4 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {recommendation.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Ideal Schedule */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Recommended Weekly Mix
            </h2>

            <div className="grid md:grid-cols-5 gap-3 mt-5">

              {[
                ["New Concepts", "25%"],
                ["Practice", "30%"],
                ["Revision", "20%"],
                ["Assessment", "15%"],
                ["Mock Interviews", "10%"],
              ].map(([name, percentage]) => (
                <div
                  key={name}
                  className="bg-white rounded-xl p-4 text-center"
                >

                  <p className="text-sm text-gray-500">
                    {name}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {percentage}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Final Status */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Balance Goal
                </h2>

                <p className="text-gray-600 mt-2">
                  Your goal is not to make every activity equal. AI should
                  dynamically adjust the distribution according to your
                  learning stage, weaknesses, interview timeline, and recent
                  performance.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}