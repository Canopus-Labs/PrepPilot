import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const preparationAreas = [
  {
    name: "Algorithms",
    planned: 30,
    actual: 18,
    priority: "High",
    drift: 12,
    status: "Under-practiced",
  },
  {
    name: "System Design",
    planned: 20,
    actual: 8,
    priority: "High",
    drift: 12,
    status: "Under-practiced",
  },
  {
    name: "Communication",
    planned: 15,
    actual: 25,
    priority: "Medium",
    drift: 10,
    status: "Over-practiced",
  },
  {
    name: "Behavioral",
    planned: 15,
    actual: 22,
    priority: "Medium",
    drift: 7,
    status: "Over-practiced",
  },
  {
    name: "SQL",
    planned: 20,
    actual: 27,
    priority: "High",
    drift: 7,
    status: "Over-practiced",
  },
];

const deviations = [
  {
    title: "System Design receives less time than planned",
    severity: "High",
    explanation:
      "System design was planned as a high-priority skill but received substantially less preparation time.",
    action:
      "Restore system-design practice before increasing lower-priority activities.",
  },
  {
    title: "Communication practice exceeds its planned allocation",
    severity: "Medium",
    explanation:
      "Communication practice has increased beyond the original allocation.",
    action:
      "Keep communication practice but rebalance some time toward technical gaps.",
  },
  {
    title: "SQL practice has increased significantly",
    severity: "Medium",
    explanation:
      "SQL currently receives more preparation time than originally planned.",
    action:
      "Confirm whether this reflects a new interview requirement before changing the plan.",
  },
];

const driftFactors = [
  {
    name: "Activity Alignment",
    score: 72,
    description:
      "Measures how closely completed activities match planned activities.",
  },
  {
    name: "Time Allocation",
    score: 64,
    description:
      "Compares planned preparation time with actual time spent.",
  },
  {
    name: "Skill Priority Alignment",
    score: 68,
    description:
      "Checks whether high-priority skills receive appropriate attention.",
  },
  {
    name: "Target Role Alignment",
    score: 81,
    description:
      "Measures whether actual preparation still supports target-role requirements.",
  },
  {
    name: "Overall Strategy Stability",
    score: 71,
    description:
      "Summarizes how much the preparation strategy has changed.",
  },
];

const coachingQuestions = [
  "Was the change in preparation time intentional?",
  "Did your target role or interview timeline change?",
  "Which planned activity was skipped most often?",
  "Are you spending more time on topics because they are easier?",
  "Which high-priority skill is currently receiving less attention?",
  "Should the original plan be updated to reflect your new priorities?",
];

const recommendations = [
  {
    title: "Restore System Design Time",
    reason:
      "It is a high-priority area receiving significantly less time than planned.",
    action:
      "Reserve the next preparation session for a system-design exercise.",
  },
  {
    title: "Review the Communication Allocation",
    reason:
      "Communication practice has exceeded the planned distribution.",
    action:
      "Maintain the skill but reduce its share temporarily if technical gaps remain.",
  },
  {
    title: "Validate SQL Priority",
    reason:
      "Actual SQL practice is higher than planned.",
    action:
      "Keep the increased allocation only if the target role requires stronger SQL preparation.",
  },
];

const workflow = [
  {
    title: "Load Plan",
    description: "Read planned activities and priorities.",
  },
  {
    title: "Track Reality",
    description: "Measure completed activities and time.",
  },
  {
    title: "Compare",
    description: "Identify meaningful differences.",
  },
  {
    title: "Explain",
    description: "Determine why preparation drifted.",
  },
  {
    title: "Adapt",
    description: "Recommend plan changes.",
  },
];

export default function AIInterviewPreparationPreparationDriftAnalyzer() {
  const [selectedArea, setSelectedArea] = useState(
    preparationAreas[1]
  );

  const [showAreas, setShowAreas] = useState(false);
  const [showDeviations, setShowDeviations] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const alignmentScore = 71;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Preparation Drift Analyzer
          </h1>

          <p className="text-gray-500">
            Compare your planned preparation strategy with what you actually
            practiced.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-orange-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-orange-600">
                {alignmentScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PREPARATION ALIGNMENT
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Moderate Preparation Drift
            </h2>

            <p className="text-gray-600 mt-2">
              Your actual preparation differs meaningfully from the original
              plan. System design is receiving less attention while
              communication and SQL receive more.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Plan Alignment
            </p>

            <p className="text-3xl font-black text-indigo-600">
              71%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingDown className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Major Deviations
            </p>

            <p className="text-3xl font-black text-red-600">
              3
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Clock3 className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Time Drift
            </p>

            <p className="text-3xl font-black text-orange-600">
              29%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Role Alignment
            </p>

            <p className="text-3xl font-black text-green-600">
              81%
            </p>

          </div>

        </div>

      </div>

      {/* Planned vs Actual */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Planned vs Actual Preparation
              </h2>

              <p className="text-sm text-gray-500">
                Compare the percentage of planned and actual preparation time.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAreas(!showAreas)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAreas ? "Hide Areas" : "Show Areas"}
          </button>

        </div>

        {showAreas && (
          <div className="space-y-5 mt-6">

            {preparationAreas.map((area) => (

              <button
                type="button"
                key={area.name}
                onClick={() => setSelectedArea(area)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedArea.name === area.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {area.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {area.priority} priority
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                      area.status === "Under-practiced"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {area.status}
                  </span>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-4">

                  <div>

                    <div className="flex justify-between text-xs">
                      <span>Planned</span>
                      <span className="font-bold">
                        {area.planned}%
                      </span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-2">

                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${area.planned}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between text-xs">
                      <span>Actual</span>
                      <span className="font-bold">
                        {area.actual}%
                      </span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-2">

                      <div
                        className={`h-full rounded-full ${
                          area.status === "Under-practiced"
                            ? "bg-red-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: `${area.actual}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Absolute allocation difference: {area.drift}%
                </p>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Area */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED PREPARATION AREA
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedArea.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedArea.status === "Under-practiced"
                ? `This skill was planned for ${selectedArea.planned}% of preparation but currently receives only ${selectedArea.actual}%.`
                : `This skill currently receives ${selectedArea.actual}% of preparation compared with ${selectedArea.planned}% planned.`}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  PLANNED
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedArea.planned}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  ACTUAL
                </p>

                <p className="text-3xl font-black text-orange-600">
                  {selectedArea.actual}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DRIFT
                </p>

                <p className="text-3xl font-black text-red-600">
                  {selectedArea.drift}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Deviations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Major Preparation Deviations
              </h2>

              <p className="text-sm text-gray-500">
                Important differences between the original strategy and actual
                behavior.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowDeviations(!showDeviations)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showDeviations ? "Hide Deviations" : "Show Deviations"}
          </button>

        </div>

        {showDeviations && (
          <div className="space-y-4 mt-6">

            {deviations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          item.severity === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.severity}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.explanation}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Recommendation: {item.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Drift Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Preparation Drift Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to evaluate strategy alignment.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {driftFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}/100
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {factor.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Drift Reflection Questions
              </h2>

              <p className="text-sm text-gray-500">
                Determine whether preparation changes were intentional or
                accidental.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
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

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Plan Adjustment Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Actions to bring preparation back in line with current goals.
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

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Preparation Drift Detection Flow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI compares planning with actual preparation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Flow" : "Show Flow"}
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Preparation Drift
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {analyzed && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Preparation strategy drift detected.
              </h2>

              <p className="text-gray-600 mt-2">
                Your preparation alignment is{" "}
                <strong>{alignmentScore}/100</strong>. The biggest concern is
                reduced system-design practice. Review whether the changes are
                intentional before updating the preparation plan.
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
              Preparation drift is not always bad—unintentional drift is.
            </h2>

            <p className="text-gray-600 mt-2">
              Preparation should adapt when goals, weaknesses, or interview
              requirements change. The important part is recognizing the
              difference between an intentional strategy update and gradually
              losing focus on high-impact skills.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}