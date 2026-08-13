import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  BookOpen,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const activities = [
  {
    title: "Dynamic Programming Practice",
    type: "Practice",
    objective: "Apply DP concepts to unfamiliar problems.",
    result: "Partially Achieved",
    performance: 68,
    understanding: 74,
    followUp: 61,
    evidence:
      "The user solved familiar patterns correctly but struggled with a new state definition.",
    action:
      "Complete two short application exercises focused on identifying DP states.",
  },
  {
    title: "Graph Revision",
    type: "Revision",
    objective: "Recall BFS and DFS differences.",
    result: "Objective Achieved",
    performance: 91,
    understanding: 94,
    followUp: 88,
    evidence:
      "Recall accuracy remained strong during the delayed follow-up test.",
    action:
      "Maintain the topic with occasional spaced-recall questions.",
  },
  {
    title: "System Design Tutorial",
    type: "Learning",
    objective: "Understand horizontal scaling.",
    result: "Needs Reinforcement",
    performance: 55,
    understanding: 59,
    followUp: 48,
    evidence:
      "The concept was understood during the tutorial but could not be applied independently.",
    action:
      "Practice a short scaling scenario before returning to advanced system design.",
  },
];

export default function AIInterviewPreparationPracticeOutcomeAnalyzer() {
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);

  const activity = activities[selectedActivity];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Practice Outcome Analyzer
          </h1>

          <p className="text-gray-500">
            Measure what you actually learned from each preparation activity,
            not just whether you completed it.
          </p>
        </div>
      </div>

      {/* Activity Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Preparation Activity
        </p>

        <div className="grid md:grid-cols-3 gap-3 mt-4">

          {activities.map((item, index) => (
            <button
              type="button"
              key={item.title}
              onClick={() => {
                setSelectedActivity(index);
                setAnalyzed(false);
              }}
              className={`text-left border rounded-xl p-4 transition ${
                selectedActivity === index
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >
              <p className="font-bold">
                {item.title}
              </p>

              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                {item.type}
              </span>
            </button>
          ))}

        </div>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Practice Outcome
        </button>

      </div>

      {analyzed && (
        <>
          {/* Outcome */}
          <div
            className={`rounded-2xl p-6 ${
              activity.result === "Objective Achieved"
                ? "bg-green-50"
                : activity.result === "Partially Achieved"
                ? "bg-orange-50"
                : "bg-red-50"
            }`}
          >
            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                {activity.result === "Objective Achieved" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={42}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={42}
                  />
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Learning Outcome
                </p>

                <h2 className="text-3xl font-black">
                  {activity.result}
                </h2>

                <p className="text-gray-600 mt-2">
                  Completion alone does not determine success. AI evaluates
                  whether the intended objective was actually demonstrated.
                </p>
              </div>

            </div>
          </div>

          {/* Objective */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3">
              <Target
                className="text-indigo-600"
                size={27}
              />

              <div>
                <h2 className="font-bold text-lg">
                  Intended Learning Objective
                </h2>

                <p className="text-gray-600 mt-2">
                  {activity.objective}
                </p>
              </div>
            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <BookOpen className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Activity Performance
              </p>

              <p className="text-3xl font-black text-indigo-600">
                {activity.performance}%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <Brain className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Concept Understanding
              </p>

              <p className="text-3xl font-black text-green-600">
                {activity.understanding}%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <TrendingUp className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Follow-Up Performance
              </p>

              <p className="text-3xl font-black text-orange-600">
                {activity.followUp}%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Outcome Score
              </p>

              <p className="text-3xl font-black text-indigo-600">
                {Math.round(
                  (activity.performance +
                    activity.understanding +
                    activity.followUp) /
                    3
                )}
                %
              </p>
            </div>

          </div>

          {/* Outcome Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Objective Achievement Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI compares the intended objective with evidence from the
              activity and subsequent performance.
            </p>

            <div className="space-y-5 mt-6">

              {[
                [
                  "Objective",
                  "What you intended to learn",
                  100,
                  "indigo",
                ],
                [
                  "Activity Completed",
                  "Whether the planned activity was completed",
                  100,
                  "green",
                ],
                [
                  "Performance Result",
                  "How well you performed during the activity",
                  activity.performance,
                  "orange",
                ],
                [
                  "Concept Understanding",
                  "Evidence of conceptual understanding",
                  activity.understanding,
                  "indigo",
                ],
                [
                  "Follow-Up Performance",
                  "Whether the learning transferred after the activity",
                  activity.followUp,
                  "red",
                ],
              ].map(([title, description, value, color]) => (
                <div key={title}>

                  <div className="flex justify-between">

                    <div>
                      <p className="font-semibold">
                        {title}
                      </p>

                      <p className="text-xs text-gray-500">
                        {description}
                      </p>
                    </div>

                    <span className="font-bold">
                      {value}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-2">

                    <div
                      className={`h-full rounded-full ${
                        color === "green"
                          ? "bg-green-500"
                          : color === "orange"
                          ? "bg-orange-500"
                          : color === "red"
                          ? "bg-red-500"
                          : "bg-indigo-600"
                      }`}
                      style={{
                        width: `${value}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Evidence */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  AI Outcome Evidence
                </h2>

                <p className="text-gray-600 mt-2">
                  {activity.evidence}
                </p>

              </div>

            </div>

          </div>

          {/* Corrective Action */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Recommended Next Action
                </h2>

                <p className="text-gray-600 mt-2">
                  {activity.action}
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  <Target size={18} />
                  Start Recommended Activity
                </button>

              </div>

            </div>

          </div>

          {/* Outcome Types */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Outcome Classification
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-5 bg-green-50">
                <CheckCircle2 className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Objective Achieved
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Performance and follow-up evidence demonstrate that the
                  intended learning objective was achieved.
                </p>
              </div>

              <div className="border rounded-xl p-5 bg-orange-50">
                <RefreshCw className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Partially Achieved
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Some parts of the objective were demonstrated, but additional
                  practice is required.
                </p>
              </div>

              <div className="border rounded-xl p-5 bg-red-50">
                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Needs Reinforcement
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Completion occurred, but performance evidence does not yet
                  support the intended learning outcome.
                </p>
              </div>

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Learning Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Completing an activity is only the first signal. Stronger
                  evidence comes from whether you can recall the concept,
                  perform successfully, and apply it during a later follow-up
                  task.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}