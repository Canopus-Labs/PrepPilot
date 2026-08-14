import React, { useState } from "react";
import {
  Brain,
  History,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
  ArrowUpRight,
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    activity: "Practice Dynamic Programming",
    reason: "Your DP accuracy was below the target threshold.",
    status: "Completed",
    result: "18 problems completed",
    before: 48,
    after: 72,
    change: 24,
    date: "Aug 12, 2026",
  },
  {
    id: 2,
    activity: "Complete System Design Exercise",
    reason: "Your scalability reasoning showed a recurring weakness.",
    status: "Completed",
    result: "2 design exercises completed",
    before: 49,
    after: 61,
    change: 12,
    date: "Aug 09, 2026",
  },
  {
    id: 3,
    activity: "Practice Technical Follow-ups",
    reason: "Follow-up handling was your lowest communication dimension.",
    status: "Skipped",
    result: "No activity recorded",
    before: 61,
    after: 61,
    change: 0,
    date: "Aug 06, 2026",
  },
  {
    id: 4,
    activity: "Revise Database Indexing",
    reason: "Recent SQL assessments showed indexing-related mistakes.",
    status: "In Progress",
    result: "3 of 5 revision activities completed",
    before: 70,
    after: 76,
    change: 6,
    date: "Aug 04, 2026",
  },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Skipped: "bg-red-100 text-red-700",
  "In Progress": "bg-orange-100 text-orange-700",
};

export default function AIInterviewPreparationActivityRecommendationHistory() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "All"
      ? recommendations
      : recommendations.filter((item) => item.status === filter);

  const completed = recommendations.filter(
    (item) => item.status === "Completed"
  ).length;

  const followed = recommendations.filter(
    (item) => item.status !== "Skipped"
  ).length;

  const completedItems = recommendations.filter(
    (item) => item.status === "Completed"
  );

  const averageImpact =
    completedItems.length > 0
      ? Math.round(
          completedItems.reduce((sum, item) => sum + item.change, 0) /
            completedItems.length
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <History size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Preparation Activity Recommendation History
          </h1>

          <p className="text-gray-500">
            Track AI recommendations, your actions, and the results that
            followed.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="p-4 bg-white rounded-2xl">
            <Brain className="text-indigo-600" size={40} />
          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Recommendation Effectiveness
            </p>

            <div className="flex items-end gap-3">

              <p className="text-5xl font-black text-indigo-600">
                {averageImpact > 0 ? `+${averageImpact}` : "0"}%
              </p>

              <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                Average Improvement
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              Completed recommendations are compared with performance after
              the recommended activity.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">
          <Target className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Recommendations
          </p>

          <p className="text-3xl font-black text-indigo-600">
            {recommendations.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <CheckCircle2 className="text-green-600" />

          <p className="text-sm text-gray-500 mt-4">
            Completed
          </p>

          <p className="text-3xl font-black text-green-600">
            {completed}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <TrendingUp className="text-purple-600" />

          <p className="text-sm text-gray-500 mt-4">
            Followed
          </p>

          <p className="text-3xl font-black text-purple-600">
            {followed}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <Clock className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-4">
            Avg. Improvement
          </p>

          <p className="text-3xl font-black text-orange-600">
            +{averageImpact}%
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex flex-wrap gap-2">

          {["All", "Completed", "In Progress", "Skipped"].map((item) => (
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

      {/* Recommendation History */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <History className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Recommendation History
            </h2>

            <p className="text-sm text-gray-500">
              Review what AI recommended and what happened afterward.
            </p>
          </div>

        </div>

        <div className="space-y-5 mt-6">

          {filtered.map((item) => (

            <button
              type="button"
              key={item.id}
              onClick={() =>
                setSelected(selected === item.id ? null : item.id)
              }
              className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
            >

              <div className="flex flex-col md:flex-row gap-5">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="font-bold text-lg">
                      {item.activity}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[item.status]
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {item.date}
                  </p>

                  <div className="bg-indigo-50 rounded-xl p-4 mt-4">

                    <p className="text-xs font-semibold text-indigo-700">
                      AI Recommendation Reason
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.reason}
                    </p>

                  </div>

                </div>

                <div className="md:w-40">

                  <p className="text-xs text-gray-500">
                    Performance Change
                  </p>

                  <p
                    className={`text-3xl font-black mt-2 ${
                      item.change > 0
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.result}
                  </p>

                </div>

              </div>

              {selected === item.id && (
                <div className="mt-5 bg-gray-50 rounded-xl p-5">

                  <div className="grid md:grid-cols-3 gap-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Before Recommendation
                      </p>

                      <p className="text-2xl font-black text-red-600 mt-1">
                        {item.before}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        After Activity
                      </p>

                      <p className="text-2xl font-black text-green-600 mt-1">
                        {item.after}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Recorded Result
                      </p>

                      <p className="text-sm font-semibold text-gray-700 mt-2">
                        {item.result}
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </button>

          ))}

        </div>

      </div>

      {/* Recommendation Outcome */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-green-700">
              Most Effective Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              <strong>Dynamic Programming Practice</strong> produced the
              largest measured improvement, increasing performance from
              48% to 72%.
            </p>

            <div className="mt-5 bg-white rounded-xl p-5">

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Performance improvement
                </span>

                <span className="text-green-600 font-black">
                  +24 points
                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-3">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "80%" }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Skipped Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              Skipped Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              You skipped the recommendation to practice technical
              follow-up questions. Because no corrective activity was
              completed, AI cannot determine whether the recommendation
              would have improved your performance.
            </p>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-sm font-semibold">
                Current Status
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Follow-up handling remains one of your weaker communication
                areas.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendation Effectiveness */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recommendation Effectiveness
            </h2>

            <p className="text-sm text-gray-500">
              AI uses historical outcomes to understand which activities
              produce measurable improvement.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Highly Effective
            </p>

            <p className="text-3xl font-black text-green-600 mt-2">
              2
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Recommendations with strong improvement
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Moderate Impact
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-2">
              1
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Recommendations with measurable improvement
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              No Evidence
            </p>

            <p className="text-3xl font-black text-orange-600 mt-2">
              1
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Recommendations not followed
            </p>

          </div>

        </div>

      </div>

      {/* AI Learning */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              How This Improves Future Recommendations
            </h2>

            <p className="text-gray-600 mt-2">
              AI can use your recommendation history to identify which
              preparation activities consistently produce improvement for you.
              For example, if structured practice repeatedly improves your
              performance more than passive revision, future recommendations
              can prioritize structured practice.
            </p>

          </div>

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Preparation Recommendation Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Follow the history of recommendations and their outcomes.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-7">

          {recommendations.map((item) => (

            <div
              key={item.id}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Skipped"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.status === "Completed" ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>

                <div className="w-px h-full bg-gray-200 mt-2" />

              </div>

              <div className="border rounded-xl p-4 flex-1">

                <div className="flex justify-between gap-3">

                  <div>

                    <p className="text-xs text-gray-500">
                      {item.date}
                    </p>

                    <h3 className="font-bold mt-1">
                      {item.activity}
                    </h3>

                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                      statusStyles[item.status]
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {item.reason}
                </p>

              </div>

            </div>

          ))}

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
              AI Recommendation Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your completed recommendations are producing measurable
              improvements, particularly when they involve targeted practice.
              Future recommendations should continue prioritizing activities
              with demonstrated impact while revisiting skipped activities
              only when the related weakness remains significant.
            </p>

          </div>

        </div>

      </div>

      {/* Next Action */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-green-700">
              Recommended Next Action
            </h2>

            <p className="text-gray-600 mt-2">
              Complete a technical follow-up practice session to address the
              recommendation that has not yet been tested. Its outcome can then
              be recorded and compared with your future performance.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              Start Recommended Activity
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}