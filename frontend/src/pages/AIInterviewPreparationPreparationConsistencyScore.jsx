import React, { useState } from "react";
import {
  Brain,
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Clock3,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", planned: 1, completed: 1 },
  { day: "Tue", planned: 1, completed: 1 },
  { day: "Wed", planned: 1, completed: 0 },
  { day: "Thu", planned: 1, completed: 1 },
  { day: "Fri", planned: 1, completed: 0 },
  { day: "Sat", planned: 1, completed: 1 },
  { day: "Sun", planned: 1, completed: 0 },
];

const consistencyFactors = [
  {
    title: "Session Completion",
    score: 71,
    description: "5 of the last 7 planned sessions were completed.",
  },
  {
    title: "Practice Frequency",
    score: 78,
    description: "Practice is occurring regularly but has some gaps.",
  },
  {
    title: "Gap Control",
    score: 62,
    description: "The longest recent gap was 2 days.",
  },
  {
    title: "Topic Consistency",
    score: 84,
    description: "Practice remains aligned with the intended skill priorities.",
  },
];

const recommendations = [
  {
    title: "Reduce Long Gaps",
    priority: "High",
    description:
      "Avoid skipping more than one planned preparation day in a row.",
  },
  {
    title: "Use Short Sessions",
    priority: "Medium",
    description:
      "On busy days, complete a 20-minute revision session instead of skipping entirely.",
  },
  {
    title: "Maintain Topic Balance",
    priority: "Medium",
    description:
      "Continue rotating between coding, system design, and behavioral preparation.",
  },
];

const habits = [
  "Complete planned sessions",
  "Avoid consecutive missed days",
  "Maintain regular practice frequency",
  "Keep preparation aligned with target skills",
  "Review missed sessions",
];

const workflow = [
  {
    title: "Plan",
    description: "Record intended preparation sessions.",
  },
  {
    title: "Track",
    description: "Compare planned and completed activity.",
  },
  {
    title: "Measure",
    description: "Calculate consistency signals.",
  },
  {
    title: "Detect",
    description: "Find irregular preparation patterns.",
  },
  {
    title: "Improve",
    description: "Recommend sustainable adjustments.",
  },
];

export default function AIInterviewPreparationPreparationConsistencyScore() {
  const [showWeekly, setShowWeekly] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showHabits, setShowHabits] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Preparation Consistency Score
          </h1>

          <p className="text-gray-500">
            Measure how consistently your actual interview preparation follows
            your intended routine.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                74%
              </p>

              <p className="text-xs text-gray-500">
                Consistency
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PREPARATION CONSISTENCY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Moderately Consistent
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation routine is generally stable, but missed sessions
              and short gaps are reducing your consistency score.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <CalendarCheck
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Planned
            </p>

            <p className="text-3xl font-black text-indigo-600">
              7
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Completed
            </p>

            <p className="text-3xl font-black text-green-600">
              5
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Missed
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Clock3
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Longest Gap
            </p>

            <p className="text-3xl font-black text-red-600">
              2d
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <TrendingUp
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recent Activity
            </p>

            <p className="text-3xl font-black text-purple-600">
              5/7
            </p>

          </div>

        </div>

      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              Weekly Preparation Activity
            </h2>

            <p className="text-sm text-gray-500">
              Compare planned sessions with actual preparation.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowWeekly(!showWeekly)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWeekly
              ? "Hide Activity"
              : "Show Activity"}
          </button>

        </div>

        {showWeekly && (
          <div className="grid grid-cols-7 gap-3 mt-6">

            {weeklyData.map((day) => (

              <div
                key={day.day}
                className="border rounded-xl p-4 text-center"
              >

                <p className="font-bold">
                  {day.day}
                </p>

                <div className="flex justify-center gap-1 mt-4">

                  <div
                    className={`w-5 h-5 rounded ${
                      day.planned
                        ? "bg-indigo-500"
                        : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`w-5 h-5 rounded ${
                      day.completed
                        ? "bg-green-500"
                        : "bg-red-300"
                    }`}
                  />

                </div>

                <p className="text-xs text-gray-500 mt-3">
                  {day.completed
                    ? "Completed"
                    : "Missed"}
                </p>

              </div>
            ))}

          </div>
        )}

        {showWeekly && (
          <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-500">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-500" />
              Planned
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-green-500" />
              Completed
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-300" />
              Missed
            </div>

          </div>
        )}

      </div>

      {/* Consistency Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Consistency Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals contributing to your overall score.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors
              ? "Hide Factors"
              : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-5 mt-6">

            {consistencyFactors.map((factor) => (

              <div
                key={factor.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold">
                      {factor.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {factor.description}
                    </p>

                  </div>

                  <p className="text-2xl font-black text-indigo-600">
                    {factor.score}%
                  </p>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className={`h-full rounded-full ${
                      factor.score >= 80
                        ? "bg-green-500"
                        : factor.score >= 70
                        ? "bg-indigo-500"
                        : "bg-orange-500"
                    }`}
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Main Issue */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              MAIN CONSISTENCY ISSUE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Two planned sessions were missed this week.
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation is not severely irregular, but repeated gaps
              could reduce long-term momentum if the pattern continues.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                AI RECOMMENDATION
              </p>

              <p className="font-semibold text-orange-700 mt-2">
                If a full session is not possible, complete a short revision
                session instead of skipping preparation completely.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Consistency Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Actions to make preparation more sustainable.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(!showRecommendations)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRecommendations
              ? "Hide Recommendations"
              : "Show Recommendations"}
          </button>

        </div>

        {showRecommendations && (
          <div className="space-y-4 mt-6">

            {recommendations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Sustainable Habits */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-indigo-600"
              size={28}
            />

            <div>

              <h2 className="font-bold text-lg text-indigo-800">
                Sustainable Preparation Habits
              </h2>

              <p className="text-sm text-gray-600">
                Consistency is more than total study hours.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowHabits(!showHabits)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showHabits
              ? "Hide Habits"
              : "Show Habits"}
          </button>

        </div>

        {showHabits && (
          <div className="grid md:grid-cols-2 gap-3 mt-6">

            {habits.map((habit, index) => (

              <div
                key={habit}
                className="bg-white rounded-xl p-4 flex items-center gap-3"
              >

                <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  {habit}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Score Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI SCORE EXPLANATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Consistency is measured by behavior, not hours alone.
            </h2>

            <p className="text-gray-600 mt-2">
              A user who studies for many hours on one day and then stops for
              several days may have fewer sustainable preparation habits than
              someone who consistently completes shorter sessions.
            </p>

            <div className="bg-indigo-50 rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                SCORE MODEL
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Completion + Frequency + Gap Control + Topic Alignment + Recent Activity
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recalculate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Consistency
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Refresh your score after completing or missing new preparation
              sessions.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Score
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Preparation consistency score updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Consistency Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts preparation activity into a consistency
                score.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow
              ? "Hide Workflow"
              : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[155px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <h3 className="font-bold mt-1">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    {step.description}
                  </p>

                </div>

                {index < workflow.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={18}
                  />
                )}

              </React.Fragment>
            ))}

          </div>
        )}

      </div>

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Consistent preparation beats irregular intensity.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not to maximize preparation hours every day. A
              sustainable routine with fewer long gaps helps maintain momentum,
              reinforce learning, and keep preparation aligned with your
              interview goals.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}