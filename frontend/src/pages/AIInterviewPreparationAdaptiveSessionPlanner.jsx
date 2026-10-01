import React, { useState } from "react";
import {
  Brain,
  CalendarDays,
  Target,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Zap,
} from "lucide-react";

const sessionActivities = [
  {
    title: "Time Complexity Challenge",
    category: "Problem Solving",
    duration: 20,
    difficulty: "Medium",
    priority: "High",
    reason: "Recent complexity mistakes increased.",
    status: "Recommended",
  },
  {
    title: "Binary Search Revision",
    category: "Algorithms",
    duration: 15,
    difficulty: "Medium",
    priority: "High",
    reason: "Topic is due for revision.",
    status: "Recommended",
  },
  {
    title: "System Design Trade-off Practice",
    category: "System Design",
    duration: 20,
    difficulty: "Medium",
    priority: "Medium",
    reason: "Target role requires stronger architecture reasoning.",
    status: "Recommended",
  },
  {
    title: "Technical Communication Drill",
    category: "Communication",
    duration: 10,
    difficulty: "Easy",
    priority: "Medium",
    reason: "Recent answers were technically correct but unclear.",
    status: "Recommended",
  },
];

const performanceSignals = [
  {
    title: "Recent Performance",
    value: "74%",
    change: "+8%",
    type: "positive",
  },
  {
    title: "Weak Areas",
    value: "3",
    change: "2 critical",
    type: "warning",
  },
  {
    title: "Revision Due",
    value: "5 topics",
    change: "2 high priority",
    type: "warning",
  },
  {
    title: "Current Difficulty",
    value: "Medium",
    change: "Adaptive",
    type: "positive",
  },
];

const plannerFlow = [
  {
    title: "Collect Signals",
    description: "Analyze recent preparation activity.",
  },
  {
    title: "Find Gaps",
    description: "Identify weaknesses and revision needs.",
  },
  {
    title: "Check Role",
    description: "Compare skills with target-role requirements.",
  },
  {
    title: "Allocate Time",
    description: "Fit activities into available preparation time.",
  },
  {
    title: "Build Session",
    description: "Generate the highest-impact activities.",
  },
];

const recommendations = [
  {
    title: "Prioritize Complexity",
    reason:
      "Recent attempts show repeated time-complexity mistakes.",
    action:
      "Start the session with targeted complexity challenges while attention is highest.",
  },
  {
    title: "Revise Binary Search",
    reason:
      "The topic has not been practiced recently.",
    action:
      "Complete a short revision followed by a medium-level application problem.",
  },
  {
    title: "Practice System Design",
    reason:
      "The selected target role places high importance on architecture decisions.",
    action:
      "Practice one requirement-to-design scenario with explicit trade-offs.",
  },
];

export default function AIInterviewPreparationAdaptiveSessionPlanner() {
  const [selectedActivity, setSelectedActivity] = useState(
    sessionActivities[0]
  );
  const [availableTime, setAvailableTime] = useState(65);
  const [generated, setGenerated] = useState(false);
  const [showSignals, setShowSignals] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);

  const totalDuration = sessionActivities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );

  const highPriority = sessionActivities.filter(
    (activity) => activity.priority === "High"
  ).length;

  const fitPercentage = Math.min(
    100,
    Math.round((availableTime / totalDuration) * 100)
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
            AI Adaptive Session Planner
          </h1>

          <p className="text-gray-500">
            Generate each preparation session dynamically from the candidate's
            latest performance and preparation needs.
          </p>

        </div>

      </div>

      {/* Main Planner Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <Zap
                className="mx-auto text-indigo-600"
                size={30}
              />

              <p className="text-xs font-bold text-indigo-700 mt-1">
                ADAPTIVE
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              NEXT SESSION STATUS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Personalized Session Ready
            </h2>

            <p className="text-gray-600 mt-2">
              The AI has prioritized activities using your recent performance,
              weak areas, revision schedule, target-role requirements, and
              available preparation time.
            </p>

          </div>

        </div>

      </div>

      {/* Performance Signals */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Latest Performance Signals
              </h2>

              <p className="text-sm text-gray-500">
                These signals influence what appears in the next session.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSignals(!showSignals)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSignals ? "Hide Signals" : "Show Signals"}
          </button>

        </div>

        {showSignals && (
          <div className="grid md:grid-cols-4 gap-4 mt-6">

            {performanceSignals.map((signal) => (

              <div
                key={signal.title}
                className={`rounded-xl p-5 ${
                  signal.type === "warning"
                    ? "bg-orange-50"
                    : "bg-indigo-50"
                }`}
              >

                {signal.type === "warning" ? (
                  <AlertTriangle
                    className="text-orange-600"
                    size={22}
                  />
                ) : (
                  <TrendingUp
                    className="text-indigo-600"
                    size={22}
                  />
                )}

                <p className="text-sm text-gray-500 mt-3">
                  {signal.title}
                </p>

                <p className="text-3xl font-black">
                  {signal.value}
                </p>

                <p
                  className={`text-xs font-semibold mt-1 ${
                    signal.type === "warning"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {signal.change}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Session Configuration */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Session Configuration
            </h2>

            <p className="text-sm text-gray-500">
              Tell the planner how much time is available for this session.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div>

            <label className="text-sm font-semibold">
              Available Time
            </label>

            <div className="flex items-center gap-3 mt-3">

              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={availableTime}
                onChange={(e) =>
                  setAvailableTime(Number(e.target.value))
                }
                className="flex-1"
              />

              <span className="font-bold">
                {availableTime} min
              </span>

            </div>

          </div>

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              TARGET ROLE
            </p>

            <p className="font-bold mt-1">
              Software Engineer
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              SESSION FIT
            </p>

            <p className="font-bold mt-1">
              {fitPercentage}%
            </p>

          </div>

        </div>

      </div>

      {/* Generated Session */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI-Generated Session
              </h2>

              <p className="text-sm text-gray-500">
                Activities are ordered according to current preparation
                priorities.
              </p>

            </div>

          </div>

          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
            {highPriority} High Priority
          </span>

        </div>

        <div className="space-y-4 mt-6">

          {sessionActivities.map((activity, index) => (

            <button
              type="button"
              key={activity.title}
              onClick={() => setSelectedActivity(activity)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedActivity.title === activity.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {activity.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {activity.category}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        activity.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {activity.priority}
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">

                    <span className="px-3 py-1 bg-white rounded-full text-xs">
                      {activity.duration} min
                    </span>

                    <span className="px-3 py-1 bg-white rounded-full text-xs">
                      {activity.difficulty}
                    </span>

                    <span className="px-3 py-1 bg-white rounded-full text-xs">
                      {activity.status}
                    </span>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Activity */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              ACTIVITY PRIORITY ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedActivity.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedActivity.reason}
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  CATEGORY
                </p>

                <p className="font-bold mt-1">
                  {selectedActivity.category}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  DURATION
                </p>

                <p className="font-bold mt-1">
                  {selectedActivity.duration} min
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>

                <p className="font-bold mt-1">
                  {selectedActivity.difficulty}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  PRIORITY
                </p>

                <p className="font-bold text-indigo-600 mt-1">
                  {selectedActivity.priority}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Time Allocation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Adaptive Time Allocation
            </h2>

            <p className="text-sm text-gray-500">
              The planner adjusts activity duration according to available
              preparation time.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {sessionActivities.map((activity) => {

            const percentage =
              Math.round(
                (activity.duration / totalDuration) * 100
              );

            return (
              <div key={activity.title}>

                <div className="flex justify-between text-sm">

                  <span className="font-semibold">
                    {activity.title}
                  </span>

                  <span>
                    {activity.duration} min · {percentage}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-2">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Planning Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Reasons behind the activities selected for the next session.
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

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Adaptive Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Adaptive Planning Flow
              </h2>

              <p className="text-sm text-gray-500">
                The session changes whenever new performance evidence becomes
                available.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFlow(!showFlow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFlow ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showFlow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {plannerFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[160px]">

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

                {index < plannerFlow.length - 1 && (
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Adaptive Session
          <ArrowRight size={18} />
        </button>

      </div>

      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                SESSION GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Your adaptive preparation session is ready.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can replace the sample activity
                data with the user's latest performance, revision history,
                target-role requirements, and available time.
              </p>

            </div>

          </div>

        </div>
      )}

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
              The next session should reflect the latest evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              Instead of following a fixed weekly schedule, the planner should
              continuously rebalance preparation around recent performance,
              weaknesses, revision needs, target-role requirements, and the
              time remaining before the interview.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}