import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  BookOpen,
  Code2,
  RotateCcw,
  Mic2,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Revise Dynamic Programming Fundamentals",
    type: "Concept Revision",
    priority: "High",
    reason:
      "Recent attempts show repeated mistakes in state definition and recurrence construction.",
    outcome:
      "Improve DP concept accuracy and reduce repeated reasoning errors.",
    duration: "25 min",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Complete 3 Targeted DP Problems",
    type: "Targeted Practice",
    priority: "High",
    reason:
      "Additional application practice is needed after the concept revision.",
    outcome:
      "Improve independent application of DP patterns.",
    duration: "40 min",
    icon: Code2,
  },
  {
    id: 3,
    title: "Reattempt Previously Missed Questions",
    type: "Weakness Recovery",
    priority: "Medium",
    reason:
      "Previously incorrect questions provide high-value evidence of unresolved gaps.",
    outcome:
      "Verify whether earlier mistakes have been corrected.",
    duration: "20 min",
    icon: RotateCcw,
  },
  {
    id: 4,
    title: "Complete a Technical Mock Interview",
    type: "Mock Interview",
    priority: "Medium",
    reason:
      "Technical knowledge is stronger than the current explanation quality.",
    outcome:
      "Improve structured technical communication and follow-up handling.",
    duration: "30 min",
    icon: Mic2,
  },
];

const gaps = [
  {
    name: "Dynamic Programming",
    score: 58,
    target: 80,
    gap: 22,
  },
  {
    name: "Technical Communication",
    score: 67,
    target: 85,
    gap: 18,
  },
  {
    name: "Coding Speed",
    score: 74,
    target: 85,
    gap: 11,
  },
];

export default function AIInterviewPreparationInterviewReadinessActionPlan() {
  const [completed, setCompleted] = useState([]);
  const [showPlan, setShowPlan] = useState(false);

  const toggleComplete = (id) => {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const completedCount = completed.length;
  const progress = Math.round(
    (completedCount / actions.length) * 100
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Readiness Action Plan
          </h1>

          <p className="text-gray-500">
            Turn preparation gaps into prioritized actions that move you
            closer to interview readiness.
          </p>

        </div>

      </div>

      {/* Readiness Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Current Readiness
            </h2>

            <p className="text-sm text-gray-500">
              AI-generated action plans are based on the largest remaining
              preparation gaps.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Readiness Score
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              72%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Critical Gaps
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              2
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Recommended Actions
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {actions.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Action Progress
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              {progress}%
            </p>

          </div>

        </div>

      </div>

      {/* Preparation Gaps */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Highest-Impact Preparation Gaps
            </h2>

            <p className="text-sm text-gray-500">
              AI uses these gaps to decide what you should work on next.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {gaps.map((gap) => (

            <div
              key={gap.name}
              className="border rounded-xl p-5"
            >

              <div className="flex justify-between gap-4">

                <div>

                  <h3 className="font-bold">
                    {gap.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Current: {gap.score}% · Target: {gap.target}%
                  </p>

                </div>

                <span
                  className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                    gap.gap >= 20
                      ? "bg-red-100 text-red-700"
                      : gap.gap >= 15
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {gap.gap}% Gap
                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-4">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${gap.score}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Generate Plan */}
      {!showPlan && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex items-center gap-4">

            <Sparkles
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <h2 className="font-bold text-indigo-700">
                Generate Your Action Plan
              </h2>

              <p className="text-gray-600 mt-1">
                AI will convert your readiness gaps into a prioritized list of
                concrete preparation tasks.
              </p>

            </div>

            <button
              type="button"
              onClick={() => setShowPlan(true)}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Generate Plan
            </button>

          </div>

        </div>
      )}

      {showPlan && (
        <>
          {/* Plan Header */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl">

                <CheckCircle2
                  className="text-green-600"
                  size={30}
                />

              </div>

              <div>

                <p className="text-xs font-bold text-green-600">
                  AI PLAN GENERATED
                </p>

                <h2 className="text-2xl font-black text-green-700 mt-1">
                  {actions.length} Actions Prioritized
                </h2>

                <p className="text-gray-600 mt-2">
                  Start with the highest-impact actions before moving to
                  lower-priority preparation.
                </p>

              </div>

            </div>

          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between">

              <div>

                <h2 className="font-bold">
                  Action Plan Progress
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {completedCount} of {actions.length} actions completed
                </p>

              </div>

              <p className="font-black text-indigo-600">
                {progress}%
              </p>

            </div>

            <div className="h-4 bg-gray-200 rounded-full mt-4">

              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

          {/* Action List */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Prioritized Action List
                </h2>

                <p className="text-sm text-gray-500">
                  Each action explains why it matters and what improvement it
                  should produce.
                </p>

              </div>

            </div>

            <div className="space-y-5 mt-6">

              {actions.map((action, index) => {

                const Icon = action.icon;
                const isCompleted =
                  completed.includes(action.id);

                return (
                  <div
                    key={action.id}
                    className={`border rounded-2xl p-5 transition ${
                      isCompleted
                        ? "bg-green-50 border-green-200"
                        : index === 0
                        ? "border-indigo-400 bg-indigo-50"
                        : ""
                    }`}
                  >

                    <div className="flex gap-4">

                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 font-black">
                        {index + 1}
                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                          <Icon
                            className="text-indigo-600"
                            size={21}
                          />

                          <h3 className="font-bold">
                            {action.title}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              action.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {action.priority}
                          </span>

                          {isCompleted && (
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                              Completed
                            </span>
                          )}

                        </div>

                        <p className="text-xs text-indigo-600 font-semibold mt-3">
                          {action.type}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">

                          <div className="bg-white rounded-xl p-4">

                            <p className="text-xs font-bold text-gray-500">
                              WHY THIS ACTION?
                            </p>

                            <p className="text-sm text-gray-600 mt-2">
                              {action.reason}
                            </p>

                          </div>

                          <div className="bg-white rounded-xl p-4">

                            <p className="text-xs font-bold text-gray-500">
                              EXPECTED OUTCOME
                            </p>

                            <p className="text-sm text-gray-600 mt-2">
                              {action.outcome}
                            </p>

                          </div>

                        </div>

                        <div className="flex items-center justify-between mt-5">

                          <div className="flex items-center gap-2 text-sm text-gray-500">

                            <Clock3 size={16} />

                            {action.duration}

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              toggleComplete(action.id)
                            }
                            className={`px-4 py-2 rounded-xl font-semibold ${
                              isCompleted
                                ? "bg-green-600 text-white"
                                : "bg-indigo-600 text-white"
                            }`}
                          >
                            {isCompleted
                              ? "Mark Incomplete"
                              : "Complete Action"}
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Why Prioritized */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Prioritization Logic
                </h2>

                <p className="text-sm text-gray-500">
                  Actions are ranked according to expected impact on
                  interview readiness.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Gap Severity
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Larger weaknesses receive higher priority.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Target className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Role Importance
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Role-critical skills receive additional weight.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <TrendingUp className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Expected Impact
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Actions with greater expected improvement are prioritized.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Clock3 className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Time Required
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Quick high-impact actions can be prioritized when time is
                  limited.
                </p>

              </div>

            </div>

          </div>

          {/* Action Categories */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <BookOpen className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Available Action Types
                </h2>

                <p className="text-sm text-gray-500">
                  AI can select different actions depending on the detected
                  preparation gap.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-5 gap-4 mt-6">

              <div className="border rounded-xl p-4 text-center">

                <BookOpen
                  className="mx-auto text-indigo-600"
                  size={24}
                />

                <p className="font-semibold mt-3">
                  Revise
                </p>

              </div>

              <div className="border rounded-xl p-4 text-center">

                <Code2
                  className="mx-auto text-indigo-600"
                  size={24}
                />

                <p className="font-semibold mt-3">
                  Practice
                </p>

              </div>

              <div className="border rounded-xl p-4 text-center">

                <RotateCcw
                  className="mx-auto text-indigo-600"
                  size={24}
                />

                <p className="font-semibold mt-3">
                  Reattempt
                </p>

              </div>

              <div className="border rounded-xl p-4 text-center">

                <Mic2
                  className="mx-auto text-indigo-600"
                  size={24}
                />

                <p className="font-semibold mt-3">
                  Mock Interview
                </p>

              </div>

              <div className="border rounded-xl p-4 text-center">

                <Target
                  className="mx-auto text-indigo-600"
                  size={24}
                />

                <p className="font-semibold mt-3">
                  Assessment
                </p>

              </div>

            </div>

          </div>

          {/* Daily Focus */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Sparkles
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  TODAY'S HIGHEST-IMPACT ACTION
                </p>

                <h2 className="text-2xl font-black text-indigo-800 mt-1">
                  Revise Dynamic Programming Fundamentals
                </h2>

                <p className="text-gray-600 mt-2">
                  This action addresses your largest skill gap and is expected
                  to improve your performance more than the remaining available
                  activities.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Today's Action
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

          {/* Final Readiness Projection */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Expected Readiness Improvement
                </h2>

                <p className="text-gray-600 mt-2">
                  Completing the highest-priority actions is projected to move
                  your readiness from <strong>72%</strong> toward approximately{" "}
                  <strong>84%</strong>, assuming the targeted activities
                  produce the expected improvement.
                </p>

              </div>

            </div>

          </div>

          {/* Next Step */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="font-bold text-lg">
                  Continue Your Preparation
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Complete actions in priority order and let AI update the plan
                  as your performance changes.
                </p>

              </div>

              <button
                type="button"
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
              >
                View Next Action
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </>
      )}

    </div>
  );
}