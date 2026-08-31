import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ArrowUp,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

const gaps = [
  {
    rank: 1,
    topic: "System Design",
    proficiency: 58,
    roleImportance: 95,
    frequency: 90,
    timeNeeded: "4 hrs",
    impact: 94,
    urgency: "Critical",
    action: "Practice core system-design patterns and scalability questions.",
  },
  {
    rank: 2,
    topic: "Dynamic Programming",
    proficiency: 64,
    roleImportance: 88,
    frequency: 82,
    timeNeeded: "3 hrs",
    impact: 87,
    urgency: "High",
    action: "Practice common DP patterns and medium-level problems.",
  },
  {
    rank: 3,
    topic: "Technical Communication",
    proficiency: 72,
    roleImportance: 85,
    frequency: 78,
    timeNeeded: "2 hrs",
    impact: 81,
    urgency: "High",
    action: "Complete structured explanation and mock-answer practice.",
  },
  {
    rank: 4,
    topic: "SQL Optimization",
    proficiency: 79,
    roleImportance: 75,
    frequency: 65,
    timeNeeded: "90 min",
    impact: 68,
    urgency: "Medium",
    action: "Review indexing, joins, query plans, and optimization.",
  },
  {
    rank: 5,
    topic: "Behavioral Questions",
    proficiency: 84,
    roleImportance: 70,
    frequency: 60,
    timeNeeded: "60 min",
    impact: 54,
    urgency: "Low",
    action: "Review STAR-format answers and project examples.",
  },
];

const finalPlan = [
  {
    time: "Day 1",
    task: "System Design",
    duration: "90 min",
  },
  {
    time: "Day 2",
    task: "Dynamic Programming",
    duration: "75 min",
  },
  {
    time: "Day 3",
    task: "System Design",
    duration: "60 min",
  },
  {
    time: "Day 4",
    task: "Technical Communication",
    duration: "60 min",
  },
  {
    time: "Day 5",
    task: "SQL Optimization",
    duration: "45 min",
  },
  {
    time: "Day 6",
    task: "Mock Interview",
    duration: "60 min",
  },
];

export default function AIInterviewPreparationReadinessGapPrioritizer() {
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
            AI Readiness Gap Prioritizer
          </h1>

          <p className="text-gray-500">
            Find the preparation gaps that will have the greatest impact on
            your interview readiness.
          </p>
        </div>

      </div>

      {/* Time Constraint */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock3 className="text-indigo-600" />

          <div>

            <p className="text-sm text-gray-500">
              Remaining Preparation Time
            </p>

            <h2 className="text-2xl font-bold">
              6 Days
            </h2>

          </div>

        </div>

        <p className="text-gray-600 mt-4">
          AI will prioritize unfinished preparation based on expected
          readiness impact instead of simply sorting tasks by completion date.
        </p>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Prioritize My Gaps
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <Target
                className="text-indigo-600"
                size={36}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Current Interview Readiness
                </p>

                <p className="text-5xl font-black text-indigo-600">
                  76%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold">
                  High-Impact Gaps Remaining
                </span>

                <p className="text-gray-600 mt-3">
                  You have several unfinished areas, but only a few are likely
                  to significantly affect your interview performance.
                </p>

              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <ListOrdered className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Remaining Gaps
              </p>

              <p className="text-3xl font-black text-indigo-600">
                12
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <TrendingUp className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                High-Impact Gaps
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Clock3 className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Recommended Time
              </p>

              <p className="text-3xl font-black text-indigo-600">
                10.5 hrs
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Potential Gain
              </p>

              <p className="text-3xl font-black text-green-600">
                +15%
              </p>

            </div>

          </div>

          {/* Priority Ranking */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Readiness Gap Ranking
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Ranked by expected impact rather than task completion order.
            </p>

            <div className="space-y-4 mt-6">

              {gaps.map((gap) => (
                <button
                  type="button"
                  key={gap.topic}
                  onClick={() =>
                    setSelected(
                      selected?.topic === gap.topic
                        ? null
                        : gap
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                      {gap.rank}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {gap.topic}
                          </h3>

                          <div className="flex flex-wrap gap-2 mt-2">

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                              Proficiency: {gap.proficiency}%
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                              Role Importance: {gap.roleImportance}%
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                              Frequency: {gap.frequency}%
                            </span>

                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-black text-indigo-600">
                            {gap.impact}
                          </p>

                          <p className="text-xs text-gray-500">
                            Impact Score
                          </p>

                        </div>

                      </div>

                      <div className="mt-4">

                        <div className="flex justify-between text-sm">

                          <span className="font-medium">
                            Expected Readiness Impact
                          </span>

                          <span className="font-bold">
                            {gap.impact}%
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-2">

                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{
                              width: `${gap.impact}%`,
                            }}
                          />

                        </div>

                      </div>

                      <div className="flex justify-between mt-3">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            gap.urgency === "Critical"
                              ? "bg-red-100 text-red-700"
                              : gap.urgency === "High"
                              ? "bg-orange-100 text-orange-700"
                              : gap.urgency === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {gap.urgency}
                        </span>

                        <span className="text-sm text-gray-500">
                          Estimated: {gap.timeNeeded}
                        </span>

                      </div>

                      {selected?.topic === gap.topic && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            <strong>Recommended Action:</strong>{" "}
                            {gap.action}
                          </p>

                          <p className="text-sm text-gray-600 mt-2">
                            AI prioritized this gap because its role
                            importance, current weakness, interview frequency,
                            and expected performance impact outweigh lower
                            priority tasks.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Prioritization Formula */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              How AI Calculates Priority
            </h2>

            <div className="grid md:grid-cols-5 gap-3 mt-5">

              {[
                ["Role Importance", "25%"],
                ["Current Gap", "25%"],
                ["Interview Frequency", "20%"],
                ["Time Remaining", "15%"],
                ["Performance Impact", "15%"],
              ].map(([name, weight]) => (
                <div
                  key={name}
                  className="border rounded-xl p-4 text-center"
                >

                  <p className="text-sm text-gray-500">
                    {name}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {weight}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Don't Do List */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Deprioritized Activities
                </h2>

                <p className="text-gray-600 mt-2">
                  Some unfinished tasks should not consume your limited
                  preparation time right now.
                </p>

                <ul className="mt-3 space-y-2 text-gray-600">
                  <li>• Repeating already-mastered beginner questions</li>
                  <li>• Completing low-impact optional resources</li>
                  <li>• Revisiting topics with stable high performance</li>
                  <li>• Starting large new courses close to the interview</li>
                </ul>

              </div>

            </div>

          </div>

          {/* Final Action Plan */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ListOrdered className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Final Action Plan
                </h2>

                <p className="text-sm text-gray-500">
                  AI-generated high-impact preparation sequence.
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-5">

              {finalPlan.map((item, index) => (
                <div
                  key={`${item.time}-${item.task}`}
                  className="flex items-center gap-4 border rounded-xl p-4"
                >

                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="w-24 font-semibold">
                    {item.time}
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold">
                      {item.task}
                    </p>

                  </div>

                  <span className="text-sm text-gray-500">
                    {item.duration}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  With limited preparation time, focus first on{" "}
                  <strong>System Design</strong> and{" "}
                  <strong>Dynamic Programming</strong>. These gaps have the
                  highest expected impact on your target-role readiness.
                  Defer low-impact activities until the critical gaps are
                  addressed.
                </p>

              </div>

            </div>

          </div>

          {/* Start Priority Plan */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Start Highest-Impact Task
            </h2>

            <p className="text-gray-600 mt-2">
              Begin with a 90-minute System Design session focused on
              scalability, architecture decisions, and trade-offs.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Priority Session
            </button>

          </div>

        </>
      )}

    </div>
  );
}