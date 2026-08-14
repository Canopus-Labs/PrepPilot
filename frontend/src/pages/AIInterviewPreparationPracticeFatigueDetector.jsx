import React, { useState } from "react";
import {
  Brain,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Coffee,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  Clock3,
} from "lucide-react";

const signals = [
  {
    name: "Recent Accuracy",
    value: 61,
    status: "Declining",
    description: "Accuracy has dropped during recent questions.",
  },
  {
    name: "Repeated Mistakes",
    value: 4,
    status: "Warning",
    description: "The same concept has caused multiple errors.",
  },
  {
    name: "Response Time",
    value: 148,
    status: "Increasing",
    description: "Average response time is increasing.",
  },
  {
    name: "Hint Usage",
    value: 3,
    status: "Increasing",
    description: "More hints are being requested recently.",
  },
];

const recommendations = [
  {
    title: "Switch Activity",
    reason:
      "Repeated practice on the same concept may no longer be productive.",
    action:
      "Move to a different question type for the next activity.",
  },
  {
    title: "Take a Short Break",
    reason:
      "Declining accuracy combined with slower responses can indicate reduced session effectiveness.",
    action:
      "Pause the current session and return with a fresh attempt.",
  },
  {
    title: "Revise the Concept",
    reason:
      "Repeated mistakes may indicate a knowledge gap rather than simple carelessness.",
    action:
      "Review the underlying concept before attempting another similar question.",
  },
];

const coachingQuestions = [
  "What mistake have you repeated most frequently?",
  "Can you explain the concept behind your recent error?",
  "Would a different question type help you reset your approach?",
  "Are you using hints because the concept is unclear or because you are rushing?",
  "Would a short break improve your ability to reason through the next problem?",
];

const workflow = [
  {
    title: "Monitor",
    description: "Track recent session signals.",
  },
  {
    title: "Detect",
    description: "Identify declining patterns.",
  },
  {
    title: "Analyze",
    description: "Determine likely causes.",
  },
  {
    title: "Recommend",
    description: "Suggest the next action.",
  },
  {
    title: "Recheck",
    description: "Measure recovery.",
  },
];

export default function AIInterviewPreparationPracticeFatigueDetector() {
  const [showSignals, setShowSignals] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [rechecked, setRechecked] = useState(false);

  const handleAction = (title) => {
    setSelectedAction(title);
    setRechecked(false);
  };

  const recheckSession = () => {
    setRechecked(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Practice Fatigue Detector
          </h1>

          <p className="text-gray-500">
            Detect when interview preparation may be becoming less productive
            and recommend a better next activity.
          </p>

        </div>

      </div>

      {/* Main Fatigue Score */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-orange-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-orange-700">
                67%
              </p>

              <p className="text-xs text-gray-500">
                Fatigue Risk
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              SESSION PRODUCTIVITY STATUS
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Moderate Fatigue Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Recent accuracy is declining while response time, repeated
              mistakes, and hint usage are increasing.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Session Accuracy
            </p>

            <p className="text-3xl font-black text-green-600">
              78%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Repeated Errors
            </p>

            <p className="text-3xl font-black text-orange-600">
              4
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Clock3
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Avg. Response
            </p>

            <p className="text-3xl font-black text-red-600">
              148s
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Activity
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Productivity
            </p>

            <p className="text-3xl font-black text-indigo-600">
              64%
            </p>

          </div>

        </div>

      </div>

      {/* Detection Signals */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Activity className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Fatigue Detection Signals
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to estimate whether the session is becoming less
                productive.
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
          <div className="space-y-4 mt-6">

            {signals.map((signal) => (

              <div
                key={signal.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {signal.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {signal.description}
                    </p>

                  </div>

                  <span className="px-3 py-1 h-fit rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                    {signal.status}
                  </span>

                </div>

                <div className="mt-4">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-gray-500">
                      Current signal
                    </span>

                    <span className="font-bold">
                      {signal.value}
                      {signal.name === "Recent Accuracy"
                        ? "%"
                        : signal.name === "Response Time"
                        ? "s"
                        : ""}
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${
                          signal.name === "Repeated Mistakes"
                            ? signal.value * 15
                            : signal.name === "Response Time"
                            ? 74
                            : signal.value
                        }%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Activity Trend */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Activity className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recent Session Trend
            </h2>

            <p className="text-sm text-gray-500">
              Performance changes across recent activities.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-5 gap-4 mt-6">

          {[91, 88, 84, 73, 61].map((accuracy, index) => (

            <div
              key={index}
              className="border rounded-xl p-4"
            >

              <p className="text-xs text-gray-500">
                Activity {index + 1}
              </p>

              <p
                className={`text-2xl font-black mt-2 ${
                  accuracy >= 80
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {accuracy}%
              </p>

              <div className="h-2 bg-gray-200 rounded-full mt-3">

                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${accuracy}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* AI Diagnosis */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI SESSION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Continued repetition may have diminishing value
            </h2>

            <p className="text-gray-600 mt-2">
              The recent drop in accuracy combined with slower responses and
              repeated mistakes suggests that continuing the same activity may
              be less effective than changing the learning activity.
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
                AI Recommended Actions
              </h2>

              <p className="text-sm text-gray-500">
                Choose the next action based on the detected session pattern.
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

            {recommendations.map((item) => (

              <button
                type="button"
                key={item.title}
                onClick={() => handleAction(item.title)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedAction === item.title
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    {item.title === "Take a Short Break" ? (
                      <Coffee size={20} />
                    ) : (
                      <RefreshCw size={20} />
                    )}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {item.action}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Action */}
      {selectedAction && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ACTION SELECTED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                {selectedAction}
              </h2>

              <p className="text-gray-600 mt-2">
                The selected action has been recorded as the next preparation
                step. Session performance can be re-evaluated afterward.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Self-Reflection Coach
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help distinguish fatigue from knowledge gaps.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-3 mt-6">

            {coachingQuestions.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700 pt-1">
                  {question}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Recheck */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              POST-ACTION RECHECK
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Measure whether productivity recovers
            </h2>

            <p className="text-gray-600 mt-2">
              After changing activities, revising a concept, or taking a
              break, the AI can compare new performance with the previous
              session pattern.
            </p>

            <button
              type="button"
              onClick={recheckSession}
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Recheck Session
              <ArrowRight size={18} />
            </button>

            {rechecked && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Session rechecked. Recent performance is improving, suggesting
                that the selected intervention was useful.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Fatigue Detection Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI identifies declining session productivity.
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
              Productive practice matters more than session length.
            </h2>

            <p className="text-gray-600 mt-2">
              The detector should help candidates recognize when repeating the
              same activity is no longer producing useful learning and guide
              them toward a more effective next step.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}