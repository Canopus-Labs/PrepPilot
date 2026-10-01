import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

const goals = [
  {
    name: "Solve 30 Algorithm Questions",
    planned: 30,
    actual: 18,
    progress: 60,
    status: "Falling Behind",
    recommendation: "Extend the deadline by 5 days and target 3 questions per day.",
    reason: "Current completion pace is below the original target.",
  },
  {
    name: "Master Binary Search",
    planned: 80,
    actual: 94,
    progress: 118,
    status: "Mastered",
    recommendation: "Reduce basic revision and move to advanced variations.",
    reason: "Recent performance consistently exceeds the mastery threshold.",
  },
  {
    name: "Complete SQL Revision",
    planned: 100,
    actual: 72,
    progress: 72,
    status: "On Track",
    recommendation: "Continue with the current schedule.",
    reason: "Current progress is aligned with the preparation timeline.",
  },
];

function statusStyle(status) {
  if (status === "Falling Behind") {
    return "bg-orange-100 text-orange-700";
  }

  if (status === "Mastered") {
    return "bg-green-100 text-green-700";
  }

  return "bg-indigo-100 text-indigo-700";
}

export default function AIInterviewPreparationGoalAdjustmentAssistant() {
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [applied, setApplied] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Goal Adjustment Assistant
          </h1>

          <p className="text-gray-500">
            Keep preparation goals aligned with your actual progress.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Goal Alignment Analysis
            </h2>

            <p className="text-gray-600 mt-2">
              AI compares your original targets with current performance and
              recommends adjustments when your preparation changes.
            </p>
          </div>

        </div>

      </div>

      {/* Goal Cards */}
      <div className="grid md:grid-cols-3 gap-4">

        {goals.map((goal) => (
          <button
            type="button"
            key={goal.name}
            onClick={() => {
              setSelectedGoal(goal);
              setApplied(false);
            }}
            className={`text-left bg-white rounded-2xl shadow p-5 border-2 transition ${
              selectedGoal.name === goal.name
                ? "border-indigo-500"
                : "border-transparent"
            }`}
          >

            <div className="flex justify-between items-start gap-2">

              <h3 className="font-bold">
                {goal.name}
              </h3>

              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyle(
                  goal.status
                )}`}
              >
                {goal.status}
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Planned: {goal.planned}
            </p>

            <p className="text-sm text-gray-500">
              Actual: {goal.actual}
            </p>

            <div className="h-2 bg-gray-200 rounded-full mt-4">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${Math.min(goal.progress, 100)}%`,
                }}
              />
            </div>

          </button>
        ))}

      </div>

      {/* Selected Goal */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-start gap-4">

          <div>

            <p className="text-sm text-gray-500">
              Selected Goal
            </p>

            <h2 className="text-xl font-bold mt-1">
              {selectedGoal.name}
            </h2>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle(
              selectedGoal.status
            )}`}
          >
            {selectedGoal.status}
          </span>

        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Planned Progress
            </p>
            <p className="text-2xl font-black mt-1">
              {selectedGoal.planned}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Actual Progress
            </p>
            <p className="text-2xl font-black mt-1">
              {selectedGoal.actual}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Progress Rate
            </p>
            <p className="text-2xl font-black mt-1">
              {selectedGoal.progress}%
            </p>
          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div
        className={`rounded-2xl p-5 ${
          selectedGoal.status === "Mastered"
            ? "bg-green-50"
            : selectedGoal.status === "Falling Behind"
            ? "bg-orange-50"
            : "bg-indigo-50"
        }`}
      >

        <div className="flex gap-3">

          {selectedGoal.status === "Mastered" ? (
            <CheckCircle2 className="text-green-600" />
          ) : selectedGoal.status === "Falling Behind" ? (
            <AlertTriangle className="text-orange-600" />
          ) : (
            <TrendingUp className="text-indigo-600" />
          )}

          <div className="flex-1">

            <h2 className="font-bold">
              AI Recommended Adjustment
            </h2>

            <p className="text-gray-700 mt-2">
              {selectedGoal.recommendation}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-white/70">

              <p className="text-sm font-semibold">
                Why this adjustment?
              </p>

              <p className="text-gray-600 text-sm mt-1">
                {selectedGoal.reason}
              </p>

            </div>

            <button
              type="button"
              onClick={() => setApplied(true)}
              className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              <RefreshCw size={18} />
              Apply Adjustment
            </button>

          </div>

        </div>

      </div>

      {/* Applied */}
      {applied && (
        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex gap-3">

            <CheckCircle2 className="text-green-600" />

            <div>

              <h2 className="font-bold text-green-700">
                Goal Updated
              </h2>

              <p className="text-gray-600 mt-2">
                The recommended adjustment has been applied to your
                preparation plan. Future progress will be compared against
                the updated target.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}