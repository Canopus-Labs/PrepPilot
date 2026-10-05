import React, { useState } from "react";
import {
  Brain,
  Code2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
  Target,
  GitCompare,
} from "lucide-react";

const complexityMetrics = [
  {
    name: "Implementation Complexity",
    score: 64,
    status: "Can Be Simplified",
    description:
      "Several components perform overlapping responsibilities and can be combined.",
  },
  {
    name: "Redundant Operations",
    score: 58,
    status: "Needs Attention",
    description:
      "Some repeated traversals can be removed without changing the result.",
  },
  {
    name: "Readability",
    score: 72,
    status: "Good",
    description:
      "The solution is understandable but contains unnecessary branching.",
  },
  {
    name: "Correctness",
    score: 94,
    status: "Strong",
    description:
      "The current solution produces the expected result for the tested cases.",
  },
  {
    name: "Performance",
    score: 86,
    status: "Meets Requirement",
    description:
      "The current approach satisfies the required performance constraint.",
  },
];

const simplifications = [
  {
    title: "Remove Redundant Traversal",
    impact: "High",
    description:
      "The solution performs a second pass over data that can be processed during the first traversal.",
    benefit: "Less code and fewer operations.",
  },
  {
    title: "Merge Conditional Branches",
    impact: "Medium",
    description:
      "Two branches produce the same intermediate state and can share a common path.",
    benefit: "Simpler control flow.",
  },
  {
    title: "Remove Unnecessary Helper",
    impact: "Medium",
    description:
      "The helper function contains only a small operation that can be expressed directly.",
    benefit: "Lower structural complexity.",
  },
  {
    title: "Simplify Temporary State",
    impact: "High",
    description:
      "A temporary collection is used where a direct variable can maintain the required state.",
    benefit: "Lower memory usage and easier reasoning.",
  },
];

const comparison = [
  {
    metric: "Correctness",
    original: "94%",
    simplified: "94%",
    result: "Preserved",
  },
  {
    metric: "Time Complexity",
    original: "O(n²)",
    simplified: "O(n)",
    result: "Improved",
  },
  {
    metric: "Space Complexity",
    original: "O(n)",
    simplified: "O(1)",
    result: "Improved",
  },
  {
    metric: "Control Flow",
    original: "Complex",
    simplified: "Simple",
    result: "Improved",
  },
  {
    metric: "Maintainability",
    original: "68%",
    simplified: "89%",
    result: "Improved",
  },
];

const coachingQuestions = [
  "Can this operation be performed during an existing traversal?",
  "Do these two conditions actually need separate branches?",
  "Is this helper function adding meaningful abstraction?",
  "Can the temporary data structure be removed?",
  "Does every component of the solution contribute to the required result?",
];

const recommendations = [
  {
    title: "Eliminate Redundant Work",
    reason:
      "The largest simplification opportunity comes from repeated processing.",
    action:
      "Try combining the repeated operations into the existing traversal.",
  },
  {
    title: "Reduce Unnecessary State",
    reason:
      "Extra variables and collections make the solution harder to reason about.",
    action:
      "Keep only state that directly contributes to the required output.",
  },
  {
    title: "Preserve Required Performance",
    reason:
      "Simplification should never sacrifice an important performance constraint.",
    action:
      "Validate time and space complexity after every simplification.",
  },
];

const coachFlow = [
  {
    title: "Analyze",
    description: "Inspect the candidate's solution.",
  },
  {
    title: "Detect",
    description: "Find unnecessary logic and operations.",
  },
  {
    title: "Question",
    description: "Ask guided simplification questions.",
  },
  {
    title: "Compare",
    description: "Evaluate original and simplified approaches.",
  },
  {
    title: "Validate",
    description: "Check correctness and performance.",
  },
];

export default function AIInterviewQuestionSolutionSimplificationCoach() {
  const [selectedMetric, setSelectedMetric] = useState(
    complexityMetrics[0]
  );
  const [showSimplifications, setShowSimplifications] =
    useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const simplificationScore = 78;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Solution Simplification Coach
          </h1>

          <p className="text-gray-500">
            Discover whether a correct solution can be made simpler without
            sacrificing correctness or required performance.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {simplificationScore}
              </p>

              <p className="text-xs text-gray-500">
                simplicity
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              SIMPLIFICATION OPPORTUNITY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Moderate Simplification Possible
            </h2>

            <p className="text-gray-600 mt-2">
              The solution is correct and meets its performance requirement,
              but several operations and implementation details can be removed
              or combined.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Minimize2 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Simplification Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              78%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Correctness
            </p>

            <p className="text-3xl font-black text-green-600">
              94%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Redundancy
            </p>

            <p className="text-3xl font-black text-orange-600">
              Medium
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <BarChart3
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Maintainability
            </p>

            <p className="text-3xl font-black text-purple-600">
              +21%
            </p>

          </div>

        </div>

      </div>

      {/* Current Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Code2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Current Solution Analysis
            </h2>

            <p className="text-sm text-gray-500">
              The AI evaluates correctness, performance, and unnecessary
              complexity separately.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs font-bold text-gray-500">
              CURRENT APPROACH
            </p>

            <pre className="text-sm mt-4 overflow-x-auto">
{`for each item:
    process item

for each item:
    validate item

build temporary result
apply final transformation`}
            </pre>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs font-bold text-green-600">
              AI OBSERVATION
            </p>

            <ul className="space-y-3 mt-4 text-sm text-gray-700">

              <li className="flex gap-2">
                <CheckCircle2
                  size={18}
                  className="text-green-600 shrink-0"
                />
                Correctness requirements are satisfied.
              </li>

              <li className="flex gap-2">
                <AlertTriangle
                  size={18}
                  className="text-orange-600 shrink-0"
                />
                Validation can be merged with the first traversal.
              </li>

              <li className="flex gap-2">
                <AlertTriangle
                  size={18}
                  className="text-orange-600 shrink-0"
                />
                Temporary state appears unnecessary.
              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* Complexity Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Solution Quality Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Select a metric to inspect the AI's reasoning.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {complexityMetrics.map((metric, index) => (

            <button
              type="button"
              key={metric.name}
              onClick={() => setSelectedMetric(metric)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedMetric.name === metric.name
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
                        {metric.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {metric.status}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        metric.score >= 80
                          ? "bg-green-100 text-green-700"
                          : metric.score >= 70
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {metric.score}/100
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        metric.score >= 80
                          ? "bg-green-500"
                          : metric.score >= 70
                          ? "bg-indigo-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${metric.score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Metric */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedMetric.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedMetric.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedMetric.score}/100
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedMetric.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Simplification Opportunities */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Minimize2 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Simplification Opportunities
              </h2>

              <p className="text-sm text-gray-500">
                Potential changes that reduce unnecessary complexity.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowSimplifications(!showSimplifications)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSimplifications
              ? "Hide Opportunities"
              : "Show Opportunities"}
          </button>

        </div>

        {showSimplifications && (
          <div className="space-y-4 mt-6">

            {simplifications.map((item) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {item.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.impact === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {item.impact} Impact
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {item.description}
                </p>

                <p className="text-sm font-semibold text-green-700 mt-3">
                  Benefit: {item.benefit}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Before vs After */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <GitCompare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Original vs Simplified Approach
              </h2>

              <p className="text-sm text-gray-500">
                Simplification should preserve correctness while reducing
                unnecessary complexity.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showComparison
              ? "Hide Comparison"
              : "Compare Solutions"}
          </button>

        </div>

        {showComparison && (
          <div className="overflow-x-auto mt-6">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b text-left">

                  <th className="p-4">
                    Metric
                  </th>

                  <th className="p-4">
                    Original
                  </th>

                  <th className="p-4">
                    Simplified
                  </th>

                  <th className="p-4">
                    Result
                  </th>

                </tr>

              </thead>

              <tbody>

                {comparison.map((item) => (

                  <tr
                    key={item.metric}
                    className="border-b"
                  >

                    <td className="p-4 font-semibold">
                      {item.metric}
                    </td>

                    <td className="p-4 text-gray-500">
                      {item.original}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      {item.simplified}
                    </td>

                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {item.result}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

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
                AI Simplification Questions
              </h2>

              <p className="text-sm text-gray-500">
                The AI guides the candidate instead of immediately providing
                the simplified implementation.
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

                <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
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
                AI Coach Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Focus on simplifying the solution without sacrificing
                important requirements.
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
                Simplification Coaching Flow
              </h2>

              <p className="text-sm text-gray-500">
                Guide the candidate toward a simpler solution step by step.
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

            {coachFlow.map((step, index) => (

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

                {index < coachFlow.length - 1 && (
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
          Analyze Solution
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
                Simplification opportunities identified.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can analyze a candidate's
                solution, identify unnecessary logic, guide them with questions,
                and validate that simplification preserves correctness and
                required performance.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Prefer the simplest solution that satisfies the requirements.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not to remove complexity blindly. A good
              simplification preserves correctness, required performance, and
              important design constraints while reducing unnecessary logic.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}