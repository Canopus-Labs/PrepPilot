import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  Clock,
  Lightbulb,
  Activity,
} from "lucide-react";

const weaknesses = [
  {
    id: 1,
    name: "Dynamic Programming",
    initial: 48,
    current: 72,
    target: 85,
    practice: 18,
    recommended: "Practice pattern-based DP problems and recurrence reasoning.",
    action: "18 practice questions completed",
    status: "Improving",
  },
  {
    id: 2,
    name: "System Design",
    initial: 42,
    current: 61,
    target: 80,
    practice: 7,
    recommended: "Practice scalability, caching, and failure-handling scenarios.",
    action: "7 design exercises completed",
    status: "Improving",
  },
  {
    id: 3,
    name: "Technical Communication",
    initial: 55,
    current: 68,
    target: 85,
    practice: 9,
    recommended: "Practice structured technical explanations and follow-ups.",
    action: "9 explanation sessions completed",
    status: "Improving",
  },
  {
    id: 4,
    name: "Edge-Case Reasoning",
    initial: 63,
    current: 66,
    target: 82,
    practice: 4,
    recommended: "Practice counterexamples and boundary-condition challenges.",
    action: "4 challenges completed",
    status: "Needs Attention",
  },
];

const activities = [
  {
    date: "Aug 12",
    weakness: "Dynamic Programming",
    activity: "Completed 5 medium DP problems",
    impact: "+6%",
  },
  {
    date: "Aug 10",
    weakness: "System Design",
    activity: "Completed scalability design exercise",
    impact: "+5%",
  },
  {
    date: "Aug 09",
    weakness: "Technical Communication",
    activity: "Completed technical explanation practice",
    impact: "+4%",
  },
  {
    date: "Aug 07",
    weakness: "Dynamic Programming",
    activity: "Completed recurrence practice",
    impact: "+7%",
  },
];

export default function AIInterviewPreparationWeaknessImprovementTracker() {
  const [selectedWeakness, setSelectedWeakness] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredWeaknesses =
    filter === "All"
      ? weaknesses
      : weaknesses.filter((item) => item.status === filter);

  const averageInitial = Math.round(
    weaknesses.reduce((sum, item) => sum + item.initial, 0) /
      weaknesses.length
  );

  const averageCurrent = Math.round(
    weaknesses.reduce((sum, item) => sum + item.current, 0) /
      weaknesses.length
  );

  const totalImprovement = averageCurrent - averageInitial;

  const calculateImprovement = (initial, current) =>
    Math.round(((current - initial) / initial) * 100);

  const calculateRemainingGap = (current, target) =>
    Math.max(target - current, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <TrendingUp size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Preparation Weakness Improvement Tracker
          </h1>

          <p className="text-gray-500">
            Track how each identified weakness changes from detection to
            improvement.
          </p>

        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="p-4 bg-white rounded-2xl">

            <Activity
              className="text-indigo-600"
              size={40}
            />

          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Overall Weakness Improvement
            </p>

            <div className="flex items-end gap-3">

              <p className="text-5xl font-black text-indigo-600">
                +{totalImprovement}%
              </p>

              <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                Positive Progress
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              Your average performance across tracked weaknesses has improved
              since the weaknesses were first detected.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <AlertTriangle className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-4">
            Weaknesses Tracked
          </p>

          <p className="text-3xl font-black text-orange-600">
            {weaknesses.length}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <TrendingUp className="text-green-600" />

          <p className="text-sm text-gray-500 mt-4">
            Average Initial
          </p>

          <p className="text-3xl font-black text-green-600">
            {averageInitial}%
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Target className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Current Average
          </p>

          <p className="text-3xl font-black text-indigo-600">
            {averageCurrent}%
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <BookOpen className="text-purple-600" />

          <p className="text-sm text-gray-500 mt-4">
            Practice Activities
          </p>

          <p className="text-3xl font-black text-purple-600">
            38
          </p>

        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex flex-wrap gap-2">

          {["All", "Improving", "Needs Attention"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                filter === item
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Weakness Cards */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Weakness Recovery Overview
            </h2>

            <p className="text-sm text-gray-500">
              Compare where each weakness started with its current performance.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {filteredWeaknesses.map((weakness) => {

            const improvement = calculateImprovement(
              weakness.initial,
              weakness.current
            );

            const remainingGap = calculateRemainingGap(
              weakness.current,
              weakness.target
            );

            return (
              <button
                type="button"
                key={weakness.id}
                onClick={() =>
                  setSelectedWeakness(
                    selectedWeakness === weakness.id
                      ? null
                      : weakness.id
                  )
                }
                className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
              >

                <div className="flex flex-col md:flex-row gap-5">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="font-bold text-lg">
                        {weakness.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          weakness.status === "Improving"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {weakness.status}
                      </span>

                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-5">

                      <div>

                        <p className="text-xs text-gray-500">
                          Initial
                        </p>

                        <p className="text-xl font-black text-red-600">
                          {weakness.initial}%
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-gray-500">
                          Current
                        </p>

                        <p className="text-xl font-black text-indigo-600">
                          {weakness.current}%
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-gray-500">
                          Target
                        </p>

                        <p className="text-xl font-black text-green-600">
                          {weakness.target}%
                        </p>

                      </div>

                    </div>

                    <div className="mt-5">

                      <div className="flex justify-between text-xs mb-2">

                        <span className="text-red-600">
                          Initial
                        </span>

                        <span className="text-green-600">
                          Target
                        </span>

                      </div>

                      <div className="relative h-3 bg-gray-200 rounded-full">

                        <div
                          className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${weakness.current}%`,
                          }}
                        />

                        <div
                          className="absolute top-0 h-full w-1 bg-green-600"
                          style={{
                            left: `${weakness.target}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                  <div className="md:w-40 flex flex-col justify-center">

                    <p className="text-xs text-gray-500">
                      Improvement
                    </p>

                    <p className="text-3xl font-black text-green-600">
                      +{improvement}%
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {remainingGap}% remaining gap
                    </p>

                  </div>

                </div>

                {selectedWeakness === weakness.id && (
                  <div className="mt-5 bg-indigo-50 rounded-xl p-5">

                    <div className="grid md:grid-cols-3 gap-4">

                      <div>

                        <p className="text-xs font-semibold text-indigo-700">
                          Recommended Action
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {weakness.recommended}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs font-semibold text-indigo-700">
                          Practice Completed
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {weakness.action}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs font-semibold text-indigo-700">
                          Remaining Gap
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {remainingGap}% to target proficiency.
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* Improvement Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-green-600" />

          <div>

            <h2 className="font-bold text-lg">
              Initial vs Current Performance
            </h2>

            <p className="text-sm text-gray-500">
              See how much each weakness has improved since detection.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {weaknesses.map((weakness) => {

            const improvement =
              weakness.current - weakness.initial;

            return (
              <div key={weakness.id}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    {weakness.name}
                  </span>

                  <span className="font-bold text-green-600">
                    +{improvement} points
                  </span>

                </div>

                <div className="h-4 bg-gray-200 rounded-full">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${weakness.current}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Practice Effectiveness */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-indigo-700">
              Recommended Actions Effectiveness
            </h2>

            <p className="text-gray-600 mt-2">
              AI compares completed corrective activities with subsequent
              performance to determine whether the recommended strategy is
              working.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <CheckCircle2 className="text-green-600" />

                <p className="font-bold mt-3">
                  Effective
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Dynamic Programming
                </p>

                <p className="text-green-600 font-bold mt-3">
                  +24 points
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <TrendingUp className="text-indigo-600" />

                <p className="font-bold mt-3">
                  Moderately Effective
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  System Design
                </p>

                <p className="text-indigo-600 font-bold mt-3">
                  +19 points
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <AlertTriangle className="text-orange-600" />

                <p className="font-bold mt-3">
                  Needs Adjustment
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Edge-Case Reasoning
                </p>

                <p className="text-orange-600 font-bold mt-3">
                  +3 points
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Weakness Improvement Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Track the activities that contributed to improvement.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-7">

          {activities.map((activity) => (
            <div
              key={`${activity.date}-${activity.activity}`}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>

                <div className="w-px h-full bg-gray-200 mt-2" />

              </div>

              <div className="border rounded-xl p-4 flex-1">

                <div className="flex justify-between gap-3">

                  <div>

                    <p className="text-xs text-gray-500">
                      {activity.date}
                    </p>

                    <h3 className="font-bold mt-1">
                      {activity.weakness}
                    </h3>

                  </div>

                  <span className="px-3 py-1 h-fit rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    {activity.impact}
                  </span>

                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {activity.activity}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Remaining Gaps */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              Remaining Improvement Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              These areas still require targeted practice before they reach
              the desired proficiency level.
            </p>

            <div className="space-y-4 mt-5">

              {weaknesses
                .map((weakness) => ({
                  ...weakness,
                  remaining: weakness.target - weakness.current,
                }))
                .filter((weakness) => weakness.remaining > 0)
                .sort((a, b) => b.remaining - a.remaining)
                .map((weakness) => (
                  <div
                    key={weakness.id}
                    className="bg-white rounded-xl p-5"
                  >

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {weakness.name}
                      </h3>

                      <span className="text-orange-600 font-black">
                        {weakness.remaining}% gap
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {weakness.recommended}
                    </p>

                  </div>
                ))}

            </div>

          </div>

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
              AI Improvement Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your corrective practice is producing the strongest results in
              Dynamic Programming and System Design. Edge-Case Reasoning has
              improved only slightly, suggesting that the current practice
              method may need to be changed from repetition toward
              counterexample and boundary-condition exercises.
            </p>

          </div>

        </div>

      </div>

      {/* Final Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-green-700">
              AI Final Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Continue the strategies that are producing measurable
              improvement, but change the approach for weaknesses showing
              limited progress. Prioritize the remaining gaps based on their
              size and importance to your target interview role.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              Start Targeted Weakness Practice
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}