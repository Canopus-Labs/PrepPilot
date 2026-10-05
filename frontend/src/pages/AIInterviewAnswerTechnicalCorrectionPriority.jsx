import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  Target,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const corrections = [
  {
    title: "Incorrect Time Complexity",
    priority: "Critical",
    score: 96,
    issue:
      "The stated O(n) complexity does not account for the nested operation.",
    correction:
      "Recalculate the complexity by analyzing the cost of each major operation.",
  },
  {
    title: "Missing Edge Case",
    priority: "High Impact",
    score: 87,
    issue:
      "The solution does not explain how an empty input should be handled.",
    correction:
      "Explicitly define the expected behavior for empty or minimum-size input.",
  },
  {
    title: "Unclear Variable Explanation",
    priority: "Useful",
    score: 64,
    issue:
      "One variable is introduced without explaining its purpose.",
    correction:
      "Briefly explain what the variable represents and why it is required.",
  },
  {
    title: "Additional Example",
    priority: "Optional",
    score: 31,
    issue:
      "An extra example could make the explanation slightly easier to follow.",
    correction:
      "Add an example only if enough interview time remains.",
  },
];

const priorityStyles = {
  Critical: "bg-red-100 text-red-700",
  "High Impact": "bg-orange-100 text-orange-700",
  Useful: "bg-blue-100 text-blue-700",
  Optional: "bg-gray-100 text-gray-700",
};

const recommendations = [
  {
    title: "Fix the Complexity Explanation First",
    reason:
      "A fundamental complexity error can undermine the credibility of an otherwise correct solution.",
    action:
      "Recalculate the complexity and explain the cost of the dominant operations.",
  },
  {
    title: "Handle Missing Edge Cases",
    reason:
      "Important edge cases can cause a technically correct-looking solution to fail.",
    action:
      "Add boundary and empty-input behavior after correcting the core reasoning.",
  },
  {
    title: "Improve Clarity Last",
    reason:
      "Naming and explanation improvements matter, but they are less important than correctness.",
    action:
      "Address readability after critical technical issues are resolved.",
  },
];

const workflow = [
  {
    title: "Detect",
    description: "Find technical issues in the answer.",
  },
  {
    title: "Evaluate",
    description: "Estimate the impact of each issue.",
  },
  {
    title: "Rank",
    description: "Assign correction priorities.",
  },
  {
    title: "Sequence",
    description: "Order improvements by importance.",
  },
  {
    title: "Improve",
    description: "Guide the candidate through corrections.",
  },
];

export default function AIInterviewAnswerTechnicalCorrectionPriority() {
  const [showCorrections, setShowCorrections] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [filter, setFilter] = useState("All");

  const filters = [
    "All",
    "Critical",
    "High Impact",
    "Useful",
    "Optional",
  ];

  const filteredCorrections =
    filter === "All"
      ? corrections
      : corrections.filter(
          (item) => item.priority === filter
        );

  const completeCorrection = (title) => {
    setCompleted((current) =>
      current.includes(title)
        ? current
        : [...current, title]
    );
  };

  const criticalCount = corrections.filter(
    (item) => item.priority === "Critical"
  ).length;

  const highImpactCount = corrections.filter(
    (item) => item.priority === "High Impact"
  ).length;

  const progress = Math.round(
    (completed.length / corrections.length) * 100
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
            AI Technical Correction Priority
          </h1>

          <p className="text-gray-500">
            Prioritize interview-answer corrections by their potential impact
            so candidates know what to fix first.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {progress}%
              </p>

              <p className="text-xs text-gray-500">
                Corrections
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CORRECTION PRIORITY ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Fix High-Impact Issues First
            </h2>

            <p className="text-gray-600 mt-2">
              The AI identified {corrections.length} improvement areas and
              ranked them according to their potential effect on answer
              quality.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical
            </p>

            <p className="text-3xl font-black text-red-600">
              {criticalCount}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              High Impact
            </p>

            <p className="text-3xl font-black text-orange-600">
              {highImpactCount}
            </p>

          </div>

          <div className="bg-blue-50 rounded-xl p-5">

            <Lightbulb className="text-blue-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Total Corrections
            </p>

            <p className="text-3xl font-black text-blue-600">
              {corrections.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Completed
            </p>

            <p className="text-3xl font-black text-green-600">
              {completed.length}
            </p>

          </div>

        </div>

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Answer
            </h2>

            <p className="text-sm text-gray-500">
              The AI reviews the answer and identifies improvements.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            TECHNICAL RESPONSE
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "I would use a hash map to store the values and then iterate
            through the array. This should take O(n) time and O(n) space.
            After finding the required value, we return the result."
          </p>

        </div>

        <div className="bg-orange-50 rounded-xl p-4 mt-4">

          <p className="text-sm font-semibold text-orange-800">
            AI observation:
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Several technical improvements are possible, but they do not all
            have the same impact. The complexity explanation should be checked
            before addressing communication details.
          </p>

        </div>

      </div>

      {/* Priority Framework */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Correction Priority Framework
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Feedback is grouped into four actionable priority levels.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          {Object.keys(priorityStyles).map((priority) => (

            <div
              key={priority}
              className="border rounded-2xl p-5"
            >

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${priorityStyles[priority]}`}
              >
                {priority}
              </span>

              <p className="text-sm text-gray-600 mt-4">

                {priority === "Critical" &&
                  "Fix immediately because it can fundamentally affect correctness or technical credibility."}

                {priority === "High Impact" &&
                  "Address next because it can significantly improve answer quality."}

                {priority === "Useful" &&
                  "Improve after important technical issues are resolved."}

                {priority === "Optional" &&
                  "Consider only when time and core quality allow."}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Corrections */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Prioritized Corrections
            </h2>

            <p className="text-sm text-gray-500">
              Work through the most important improvements first.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowCorrections(!showCorrections)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCorrections
              ? "Hide Corrections"
              : "Show Corrections"}
          </button>

        </div>

        {showCorrections && (
          <>

            <div className="flex flex-wrap gap-2 mt-6">

              {filters.map((item) => (

                <button
                  type="button"
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    filter === item
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            <div className="space-y-4 mt-6">

              {filteredCorrections.map((item, index) => {

                const isCompleted =
                  completed.includes(item.title);

                return (
                  <div
                    key={item.title}
                    className={`border rounded-2xl p-5 ${
                      isCompleted
                        ? "bg-green-50"
                        : ""
                    }`}
                  >

                    <div className="flex gap-4">

                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center justify-between gap-3">

                          <h3 className="font-bold">
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-2">

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${priorityStyles[item.priority]}`}
                            >
                              {item.priority}
                            </span>

                            <span className="text-sm font-black text-indigo-600">
                              {item.score}
                            </span>

                          </div>

                        </div>

                        <p className="text-sm text-gray-500 mt-3">
                          {item.issue}
                        </p>

                        <div className="bg-gray-50 rounded-xl p-4 mt-4">

                          <p className="text-xs font-bold text-gray-500">
                            RECOMMENDED CORRECTION
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
                            {item.correction}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            completeCorrection(item.title)
                          }
                          disabled={isCompleted}
                          className={`mt-4 px-4 py-2 rounded-xl text-sm font-semibold ${
                            isCompleted
                              ? "bg-green-200 text-green-800"
                              : "bg-indigo-600 text-white"
                          }`}
                        >
                          {isCompleted
                            ? "Correction Completed"
                            : "Mark as Corrected"}
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </>
        )}

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
              AI PRIORITY DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Correctness should come before presentation
            </h2>

            <p className="text-gray-600 mt-2">
              The incorrect complexity explanation is the most important issue.
              Fixing it has a greater effect on the technical credibility of
              the answer than improving variable explanations or adding
              optional examples.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                RECOMMENDED ORDER
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Correctness → Edge Cases → Reasoning → Clarity → Optional Details
              </p>

            </div>

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
                AI Correction Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Follow a correction sequence based on technical impact.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(
                !showRecommendations
              )
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

      {/* Correction Coach */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI CORRECTION COACH
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Focus on one high-impact correction at a time
            </h2>

            <p className="text-gray-600 mt-2">
              Instead of trying to fix every issue simultaneously, complete
              critical corrections first and then move toward lower-priority
              improvements.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                NEXT RECOMMENDED ACTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Recalculate and justify the solution's time complexity.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Correction Progress
            </h2>

            <p className="text-sm text-gray-500">
              Complete high-impact corrections before optional improvements.
            </p>

          </div>

          <span className="font-black text-indigo-600">
            {completed.length}/{corrections.length}
          </span>

        </div>

        <div className="h-4 bg-gray-200 rounded-full mt-5">

          <div
            className="h-full bg-indigo-500 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-2">

          <span>
            Start
          </span>

          <span>
            {progress}% complete
          </span>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Reanalyze Answer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate correction priorities after making improvements.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Reanalyze Priorities
              <ArrowRight size={18} />
            </button>

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
                Correction Priority Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI turns large amounts of feedback into an actionable
                correction sequence.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWorkflow(!showWorkflow)
            }
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
              Fix the most important problem first.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong interview preparation is not about correcting everything
              at once. Prioritize correctness and high-impact reasoning first,
              then improve clarity and optional details when the core answer
              is strong.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}