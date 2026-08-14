import React, { useState } from "react";
import {
  Brain,
  Clock3,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const concepts = [
  {
    name: "Binary Search",
    learned: "18 days ago",
    performance: 91,
    recall: 68,
    revisions: 1,
    difficulty: "Medium",
    risk: "High",
    retention: 58,
    recommendation: "Revise within 24 hours.",
  },
  {
    name: "SQL Joins",
    learned: "9 days ago",
    performance: 88,
    recall: 79,
    revisions: 2,
    difficulty: "Medium",
    risk: "Medium",
    retention: 74,
    recommendation: "Revise within 3 days.",
  },
  {
    name: "Hash Maps",
    learned: "4 days ago",
    performance: 94,
    recall: 91,
    revisions: 3,
    difficulty: "Easy",
    risk: "Low",
    retention: 91,
    recommendation: "No immediate revision required.",
  },
  {
    name: "Dynamic Programming",
    learned: "15 days ago",
    performance: 82,
    recall: 61,
    revisions: 1,
    difficulty: "Hard",
    risk: "High",
    retention: 52,
    recommendation: "Schedule focused revision soon.",
  },
];

const revisionPlan = [
  {
    concept: "Binary Search",
    reason: "Recall has dropped 23 percentage points.",
    duration: "15 min",
    priority: "High",
  },
  {
    concept: "Dynamic Programming",
    reason: "High difficulty combined with limited revision.",
    duration: "25 min",
    priority: "High",
  },
  {
    concept: "SQL Joins",
    reason: "Recall is stable but beginning to decline.",
    duration: "15 min",
    priority: "Medium",
  },
];

const retentionFactors = [
  "Previous performance",
  "Time since learning",
  "Revision frequency",
  "Recall accuracy",
  "Concept difficulty",
];

const workflow = [
  {
    title: "Track",
    description: "Record learning and revision history.",
  },
  {
    title: "Measure",
    description: "Evaluate recall and performance.",
  },
  {
    title: "Predict",
    description: "Estimate future retention risk.",
  },
  {
    title: "Prioritize",
    description: "Rank concepts by revision urgency.",
  },
  {
    title: "Revise",
    description: "Schedule targeted practice.",
  },
];

export default function AIInterviewPreparationLearningRetentionPredictor() {
  const [showConcepts, setShowConcepts] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const highRisk = concepts.filter(
    (concept) => concept.risk === "High"
  ).length;

  const mediumRisk = concepts.filter(
    (concept) => concept.risk === "Medium"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Learning Retention Predictor
          </h1>

          <p className="text-gray-500">
            Predict which interview concepts are most likely to be forgotten
            and schedule revision before recall declines.
          </p>

        </div>

      </div>

      {/* Main Prediction */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <TrendingDown
              className="text-orange-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              RETENTION FORECAST
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              2 Concepts Need Upcoming Revision
            </h2>

            <p className="text-gray-600 mt-2">
              Binary Search and Dynamic Programming show the highest predicted
              retention risk based on recall, difficulty, and revision history.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <BookOpen
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Concepts Tracked
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {concepts.length}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Risk
            </p>

            <p className="text-3xl font-black text-red-600">
              {highRisk}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Clock3
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Medium Risk
            </p>

            <p className="text-3xl font-black text-orange-600">
              {mediumRisk}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Low Risk
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Planned Revision
            </p>

            <p className="text-3xl font-black text-purple-600">
              {revisionPlan.length}
            </p>

          </div>

        </div>

      </div>

      {/* Retention Prediction */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingDown className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Concept Retention Forecast
              </h2>

              <p className="text-sm text-gray-500">
                Predicted retention based on learning and recall history.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowConcepts(!showConcepts)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showConcepts
              ? "Hide Forecast"
              : "Show Forecast"}
          </button>

        </div>

        {showConcepts && (
          <div className="space-y-5 mt-6">

            {concepts.map((concept) => (

              <div
                key={concept.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {concept.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          concept.risk === "High"
                            ? "bg-red-100 text-red-700"
                            : concept.risk === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {concept.risk} Risk
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Learned {concept.learned} • Difficulty:{" "}
                      {concept.difficulty}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-gray-500">
                      Predicted Retention
                    </p>

                    <p
                      className={`text-2xl font-black ${
                        concept.retention < 60
                          ? "text-red-600"
                          : concept.retention < 80
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {concept.retention}%
                    </p>

                  </div>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">

                  <div>

                    <p className="text-xs text-gray-500">
                      Previous Performance
                    </p>

                    <p className="font-bold mt-1">
                      {concept.performance}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Current Recall
                    </p>

                    <p className="font-bold mt-1">
                      {concept.recall}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Revisions
                    </p>

                    <p className="font-bold mt-1">
                      {concept.revisions}
                    </p>

                  </div>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between text-xs mb-2">

                    <span className="text-gray-500">
                      Retention Forecast
                    </span>

                    <span className="font-bold">
                      {concept.retention}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full">

                    <div
                      className={`h-full rounded-full ${
                        concept.retention < 60
                          ? "bg-red-500"
                          : concept.retention < 80
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${concept.retention}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-5">

                  <p className="text-xs font-bold text-gray-500">
                    AI RECOMMENDATION
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {concept.recommendation}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Highest Risk */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              HIGHEST RETENTION RISK
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Dynamic Programming — 52% Predicted Retention
            </h2>

            <p className="text-gray-600 mt-2">
              This concept combines high difficulty, limited revision, and
              declining recall. A focused revision session is recommended
              before attempting more advanced problems.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                WHY THE RISK IS HIGH
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                <span className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
                  Hard Concept
                </span>

                <span className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
                  Low Recall
                </span>

                <span className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
                  Only 1 Revision
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Revision Plan */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Personalized Revision Plan
              </h2>

              <p className="text-sm text-gray-500">
                Revision is prioritized according to predicted forgetting risk.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowPlan(!showPlan)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showPlan
              ? "Hide Plan"
              : "Show Plan"}
          </button>

        </div>

        {showPlan && (
          <div className="space-y-4 mt-6">

            {revisionPlan.map((item, index) => (

              <div
                key={item.concept}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.concept}
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
                      {item.reason}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-sm font-semibold text-indigo-700">
                      <Clock3 size={16} />
                      Recommended duration: {item.duration}
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Retention Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Retention Prediction Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to estimate future recall.
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
          <div className="flex flex-wrap gap-3 mt-6">

            {retentionFactors.map((factor) => (

              <div
                key={factor}
                className="px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm"
              >
                {factor}
              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Revise before recall drops further
            </h2>

            <p className="text-gray-600 mt-2">
              Instead of revising every concept on the same schedule, focus
              first on concepts where time, difficulty, and declining recall
              indicate higher forgetting risk.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                NEXT BEST ACTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Complete a 15-minute Binary Search review followed by a short
                recall test.
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
              Recalculate Retention Forecast
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Refresh predictions after completing new practice or revision.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Forecast
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Retention forecast updated successfully.
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
                Retention Prediction Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts learning history into revision priorities.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Revision should follow forgetting risk.
            </h2>

            <p className="text-gray-600 mt-2">
              Not every concept needs the same revision frequency. Concepts
              that are difficult, rarely reviewed, or showing weaker recall
              should receive attention earlier than concepts that remain
              consistently strong.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}