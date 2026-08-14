import React, { useState } from "react";
import {
  Brain,
  Repeat2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  History,
} from "lucide-react";

const weaknesses = [
  {
    name: "Dynamic Programming",
    recurrence: 4,
    currentScore: 58,
    bestScore: 82,
    previousScore: 76,
    status: "Recurring",
    trend: "Declining",
    intervention: "Deep concept revision + varied practice",
  },
  {
    name: "System Design Scalability",
    recurrence: 3,
    currentScore: 65,
    bestScore: 84,
    previousScore: 79,
    status: "Recurring",
    trend: "Declining",
    intervention: "Architecture evolution practice",
  },
  {
    name: "SQL Joins",
    recurrence: 1,
    currentScore: 81,
    bestScore: 86,
    previousScore: 78,
    status: "Improving",
    trend: "Stable",
    intervention: "Light maintenance practice",
  },
];

const history = [
  {
    topic: "Dynamic Programming",
    date: "Today",
    score: 58,
    result: "Weak",
  },
  {
    topic: "Dynamic Programming",
    date: "5 days ago",
    score: 82,
    result: "Strong",
  },
  {
    topic: "Dynamic Programming",
    date: "12 days ago",
    score: 61,
    result: "Weak",
  },
  {
    topic: "Dynamic Programming",
    date: "20 days ago",
    score: 76,
    result: "Strong",
  },
];

const interventions = [
  {
    title: "Deep Concept Revision",
    description:
      "Revisit the underlying concept instead of only solving more questions.",
    priority: "High",
  },
  {
    title: "Use Unseen Variations",
    description:
      "Practice structurally different problems to test genuine understanding.",
    priority: "High",
  },
  {
    title: "Delayed Retesting",
    description:
      "Reassess the topic after several days to verify long-term retention.",
    priority: "Medium",
  },
];

const workflow = [
  {
    title: "Track",
    description: "Store historical weakness and assessment results.",
  },
  {
    title: "Compare",
    description: "Compare previous and current performance.",
  },
  {
    title: "Detect",
    description: "Identify concepts repeatedly returning as weaknesses.",
  },
  {
    title: "Classify",
    description: "Separate temporary dips from persistent gaps.",
  },
  {
    title: "Intervene",
    description: "Recommend deeper targeted preparation.",
  },
];

export default function AIInterviewPreparationWeaknessRecurrenceTracker() {
  const [showWeaknesses, setShowWeaknesses] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showInterventions, setShowInterventions] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selected, setSelected] = useState(0);
  const [refreshed, setRefreshed] = useState(false);
  const [interventionStarted, setInterventionStarted] =
    useState(false);

  const current = weaknesses[selected];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Weakness Recurrence Tracker
          </h1>

          <p className="text-gray-500">
            Detect concepts that repeatedly return as weaknesses after
            temporary improvement.
          </p>

        </div>

      </div>

      {/* Main Banner */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <Repeat2
              className="text-red-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              RECURRENCE DETECTED
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              2 Persistent Weaknesses Identified
            </h2>

            <p className="text-gray-600 mt-2">
              Some topics are improving temporarily but repeatedly declining
              in later assessments.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <Repeat2
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recurring Topics
            </p>

            <p className="text-3xl font-black text-red-600">
              2
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Highest Recurrence
            </p>

            <p className="text-3xl font-black text-orange-600">
              4×
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <TrendingDown
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Current Avg.
            </p>

            <p className="text-3xl font-black text-indigo-600">
              62%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <History
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Assessments
            </p>

            <p className="text-3xl font-black text-purple-600">
              18
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Stable Skills
            </p>

            <p className="text-3xl font-black text-green-600">
              12
            </p>

          </div>

        </div>

      </div>

      {/* Recurring Weaknesses */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Repeat2 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recurring Weaknesses
              </h2>

              <p className="text-sm text-gray-500">
                Topics that repeatedly return after apparent improvement.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWeaknesses(!showWeaknesses)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWeaknesses
              ? "Hide Weaknesses"
              : "Show Weaknesses"}
          </button>

        </div>

        {showWeaknesses && (
          <div className="space-y-4 mt-6">

            {weaknesses.map((weakness, index) => (

              <button
                type="button"
                key={weakness.name}
                onClick={() => setSelected(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selected === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {weakness.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          weakness.status === "Recurring"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {weakness.status}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Recommended: {weakness.intervention}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-gray-500">
                      Recurrence
                    </p>

                    <p className="text-2xl font-black text-red-600">
                      {weakness.recurrence}×
                    </p>

                  </div>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">

                  <div>

                    <p className="text-xs text-gray-500">
                      Current
                    </p>

                    <p className="font-black text-red-600">
                      {weakness.currentScore}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Previous
                    </p>

                    <p className="font-black text-orange-600">
                      {weakness.previousScore}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Best Recorded
                    </p>

                    <p className="font-black text-green-600">
                      {weakness.bestScore}%
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Current Topic */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              HIGHEST RECURRENCE
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              {current.name}
            </h2>

            <p className="text-gray-600 mt-2">
              This concept has returned as a weakness{" "}
              <strong>{current.recurrence} times</strong> despite previous
              strong assessments.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Current Performance
                </p>

                <p className="text-2xl font-black text-red-600">
                  {current.currentScore}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Previous Best
                </p>

                <p className="text-2xl font-black text-green-600">
                  {current.bestScore}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Current Trend
                </p>

                <p className="text-2xl font-black text-red-600">
                  {current.trend}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* History */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <History className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Weakness History
              </h2>

              <p className="text-sm text-gray-500">
                Compare performance across previous assessments.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showHistory
              ? "Hide History"
              : "Show History"}
          </button>

        </div>

        {showHistory && (
          <div className="space-y-3 mt-6">

            {history.map((item) => (

              <div
                key={`${item.date}-${item.score}`}
                className="border rounded-xl p-4 flex items-center justify-between"
              >

                <div>

                  <p className="font-bold">
                    {item.topic}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.date}
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <p className="text-xl font-black">
                    {item.score}%
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.result === "Strong"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.result}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Temporary vs Sustained */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <TrendingUp
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI IMPROVEMENT ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Improvement appears temporary rather than sustained.
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate previously reached a strong performance level, but
              later assessments dropped significantly. This suggests that the
              concept may have been practiced successfully without developing
              durable understanding or retention.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-orange-600">
                  TEMPORARY IMPROVEMENT
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Performance improves immediately after focused practice but
                  declines again during later assessments.
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-green-600">
                  SUSTAINED IMPROVEMENT
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Performance remains strong across delayed and varied
                  assessments.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Intervention */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recommended Deeper Intervention
              </h2>

              <p className="text-sm text-gray-500">
                Repeated weaknesses require more than another identical
                practice session.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowInterventions(!showInterventions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showInterventions
              ? "Hide Intervention"
              : "Show Intervention"}
          </button>

        </div>

        {showInterventions && (
          <div className="space-y-4 mt-6">

            {interventions.map((item, index) => (

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

            <button
              type="button"
              onClick={() => setInterventionStarted(true)}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Start Deeper Intervention
              <ArrowRight size={18} />
            </button>

            {interventionStarted && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 font-semibold">
                Deeper intervention plan created for {current.name}.
              </div>
            )}

          </div>
        )}

      </div>

      {/* False Mastery Warning */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              FALSE MASTERY WARNING
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              One successful assessment should not permanently remove a
              weakness.
            </h2>

            <p className="text-gray-600 mt-2">
              The system should require repeated evidence across different
              questions, difficulty levels, and delayed assessments before
              considering a recurring weakness fully resolved.
            </p>

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
              Recalculate Recurrence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Refresh weakness recurrence after new assessments.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Tracker
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Weakness recurrence analysis updated successfully.
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
                Recurrence Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI identifies persistent knowledge gaps.
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
              Improvement should be durable, not temporary.
            </h2>

            <p className="text-gray-600 mt-2">
              A weakness should only be considered resolved when strong
              performance continues across new problems and later assessments.
              Recurring weaknesses should trigger deeper intervention rather
              than being repeatedly marked as completed.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}