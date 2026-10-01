import React, { useState } from "react";
import {
  Brain,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  Activity,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    name: "Array Practice",
    type: "Practice Questions",
    time: 24,
    accuracy: 82,
    mistakes: 3,
    difficulty: "Medium",
    improvement: 12,
    outcome: "Effective",
  },
  {
    name: "System Design Revision",
    type: "Concept Revision",
    time: 31,
    accuracy: 68,
    mistakes: 5,
    difficulty: "Hard",
    improvement: 7,
    outcome: "Needs Improvement",
  },
  {
    name: "Mock Interview",
    type: "Mock Interview",
    time: 28,
    accuracy: 79,
    mistakes: 4,
    difficulty: "Hard",
    improvement: 15,
    outcome: "Highly Effective",
  },
  {
    name: "Complexity Quiz",
    type: "Assessment",
    time: 17,
    accuracy: 91,
    mistakes: 1,
    difficulty: "Easy",
    improvement: 4,
    outcome: "Effective",
  },
];

const recommendations = [
  "Continue using mock interviews because they produced the highest improvement.",
  "Spend more time reviewing System Design fundamentals before attempting advanced questions.",
  "Use targeted practice after repeated mistakes instead of repeating the entire topic.",
  "Keep short assessments at the end of sessions to measure retention.",
];

export default function AIInterviewPreparationLearningSessionAnalyzer() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const totalTime = activities.reduce(
    (sum, activity) => sum + activity.time,
    0
  );

  const averageAccuracy = Math.round(
    activities.reduce(
      (sum, activity) => sum + activity.accuracy,
      0
    ) / activities.length
  );

  const totalMistakes = activities.reduce(
    (sum, activity) => sum + activity.mistakes,
    0
  );

  const totalImprovement = activities.reduce(
    (sum, activity) => sum + activity.improvement,
    0
  );

  const bestActivity = [...activities].sort(
    (a, b) => b.improvement - a.improvement
  )[0];

  const weakestActivity = [...activities].sort(
    (a, b) => a.accuracy - b.accuracy
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Learning Session Analyzer
          </h1>

          <p className="text-gray-500">
            Understand what made your interview preparation session effective
            and what should change next time.
          </p>
        </div>

      </div>

      {/* Session Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Activity
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              SESSION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Your session produced measurable improvement.
            </h2>

            <p className="text-gray-600 mt-2">
              AI analyzed {activities.length} activities, {totalTime} minutes
              of preparation, {totalMistakes} mistakes, and the improvement
              observed throughout the session.
            </p>

          </div>

        </div>

      </div>

      {/* Session Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Clock className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Session Time
            </p>

            <p className="text-2xl font-black text-indigo-600">
              {totalTime} min
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Target className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Avg Accuracy
            </p>

            <p className="text-2xl font-black text-green-600">
              {averageAccuracy}%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Mistakes
            </p>

            <p className="text-2xl font-black text-red-600">
              {totalMistakes}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <TrendingUp
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Improvement
            </p>

            <p className="text-2xl font-black text-orange-600">
              +{totalImprovement}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Activities
            </p>

            <p className="text-2xl font-black text-green-600">
              {activities.length}
            </p>

          </div>

        </div>

      </div>

      {/* Activity Breakdown */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Activity Breakdown
            </h2>

            <p className="text-sm text-gray-500">
              AI evaluates each activity based on effort, accuracy, mistakes,
              difficulty, and improvement.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {activities.map((activity) => (

            <button
              type="button"
              key={activity.name}
              onClick={() => setSelectedActivity(activity)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedActivity?.name === activity.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Activity size={22} />
                </div>

                <div className="flex-1">

                  <h3 className="font-bold">
                    {activity.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {activity.type} • {activity.difficulty}
                  </p>

                </div>

                <div className="text-center">

                  <p className="text-xs text-gray-500">
                    Time
                  </p>

                  <p className="font-black">
                    {activity.time}m
                  </p>

                </div>

                <div className="text-center">

                  <p className="text-xs text-gray-500">
                    Accuracy
                  </p>

                  <p className="font-black">
                    {activity.accuracy}%
                  </p>

                </div>

                <div className="text-center">

                  <p className="text-xs text-gray-500">
                    Improvement
                  </p>

                  <p className="font-black text-green-600">
                    +{activity.improvement}%
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activity.outcome === "Highly Effective"
                      ? "bg-green-100 text-green-700"
                      : activity.outcome === "Effective"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {activity.outcome}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Activity */}
      {selectedActivity && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Target
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-indigo-600">
                ACTIVITY ANALYSIS
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedActivity.name}
              </h2>

              <div className="grid md:grid-cols-4 gap-4 mt-5">

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    TIME SPENT
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-1">
                    {selectedActivity.time}m
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    ACCURACY
                  </p>

                  <p className="text-2xl font-black text-green-600 mt-1">
                    {selectedActivity.accuracy}%
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    MISTAKES
                  </p>

                  <p className="text-2xl font-black text-red-600 mt-1">
                    {selectedActivity.mistakes}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    IMPROVEMENT
                  </p>

                  <p className="text-2xl font-black text-orange-600 mt-1">
                    +{selectedActivity.improvement}%
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-indigo-600">
                  AI INTERPRETATION
                </p>

                <p className="text-sm text-gray-600 mt-2">

                  {selectedActivity.improvement >= 12
                    ? "This activity produced strong improvement relative to the time invested. It should remain part of future preparation sessions."
                    : selectedActivity.accuracy < 75
                    ? "This activity revealed a meaningful knowledge or application gap. Follow it with targeted revision rather than immediately repeating the same activity."
                    : "This activity was productive but produced moderate improvement. Consider combining it with a different practice mode."}

                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Effectiveness Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Session Effectiveness
            </h2>

            <p className="text-sm text-gray-500">
              Compare activities by improvement relative to effort.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="border rounded-2xl p-5">

            <div className="flex items-center gap-3">

              <CheckCircle2
                className="text-green-600"
                size={24}
              />

              <div>

                <p className="text-xs text-gray-500">
                  MOST EFFECTIVE
                </p>

                <h3 className="font-bold">
                  {bestActivity.name}
                </h3>

              </div>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Produced the highest improvement of{" "}
              <strong>+{bestActivity.improvement}%</strong> during this
              session.
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <div className="flex items-center gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={24}
              />

              <div>

                <p className="text-xs text-gray-500">
                  NEEDS ATTENTION
                </p>

                <h3 className="font-bold">
                  {weakestActivity.name}
                </h3>

              </div>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Had the lowest accuracy at{" "}
              <strong>{weakestActivity.accuracy}%</strong> and may require a
              different learning strategy.
            </p>

          </div>

        </div>

      </div>

      {/* Session Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Session Timeline
            </h2>

            <p className="text-sm text-gray-500">
              See how preparation activities contributed to the overall
              session.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {activities.map((activity, index) => (

            <React.Fragment key={activity.name}>

              <div className="px-4 py-3 rounded-xl bg-indigo-50">

                <p className="font-bold text-indigo-700">
                  {activity.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {activity.time} min
                </p>

              </div>

              {index < activities.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Improvement Analysis */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <TrendingUp
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              SESSION IMPROVEMENT
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Your strongest gains came from active practice.
            </h2>

            <p className="text-gray-600 mt-2">
              The session data suggests that activities requiring active
              problem solving and interview simulation produced greater
              improvement than passive revision.
            </p>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Suggestions for making future preparation sessions more
                effective.
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
          <div className="space-y-3 mt-6">

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation}
                className="flex gap-4 border rounded-xl p-4"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold">
                  {recommendation}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Future Session Plan */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              NEXT SESSION PLAN
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Prioritize active practice and targeted revision.
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  1. WARM-UP
                </p>

                <p className="font-bold mt-1">
                  Short complexity quiz
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  2. FOCUS
                </p>

                <p className="font-bold mt-1">
                  System Design practice
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  3. VALIDATE
                </p>

                <p className="font-bold mt-1">
                  Mock interview
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Final Insight */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Session Summary
            </h2>

            <p className="text-gray-600 mt-2">
              This was a productive preparation session. Active practice and
              mock-interview activities generated the strongest improvement.
              Future sessions should reduce passive revision time and use
              targeted exercises when repeated mistakes appear.
            </p>

          </div>

        </div>

      </div>

      {/* Analyze Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Complete Session
          <ArrowRight size={18} />
        </button>

      </div>

      {analyzed && (
        <div className="bg-green-50 rounded-xl p-4">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-green-700">
              Complete learning session analysis generated successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}