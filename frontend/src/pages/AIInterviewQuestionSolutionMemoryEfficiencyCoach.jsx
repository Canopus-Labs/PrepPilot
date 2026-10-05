import React, { useState } from "react";
import {
  Brain,
  MemoryStick,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  TrendingDown,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const memoryIssues = [
  {
    title: "Redundant Array Copy",
    usage: "O(n)",
    impact: "High",
    description:
      "The solution creates a second array containing the same values.",
    suggestion:
      "Process the original array in place when mutation is acceptable.",
  },
  {
    title: "Temporary Result Storage",
    usage: "O(n)",
    impact: "Medium",
    description:
      "Intermediate results are stored even though they can be processed incrementally.",
    suggestion:
      "Use streaming or incremental processing to avoid storing all results.",
  },
  {
    title: "Hash Map",
    usage: "O(n)",
    impact: "Expected",
    description:
      "The hash map is required to achieve the target lookup complexity.",
    suggestion:
      "Keep the structure unless the problem allows a slower time-complexity trade-off.",
  },
];

const comparison = [
  {
    metric: "Input Storage",
    before: "O(n)",
    after: "O(n)",
    improvement: "No change",
  },
  {
    metric: "Temporary Copy",
    before: "O(n)",
    after: "O(1)",
    improvement: "Reduced",
  },
  {
    metric: "Hash Map",
    before: "O(n)",
    after: "O(n)",
    improvement: "Required",
  },
  {
    metric: "Auxiliary Space",
    before: "O(2n)",
    after: "O(n)",
    improvement: "Lower",
  },
];

const evaluationAreas = [
  {
    title: "Memory Awareness",
    score: 84,
    description:
      "Candidate recognizes the major memory-consuming components.",
  },
  {
    title: "Allocation Efficiency",
    score: 76,
    description:
      "Some unnecessary allocations can be removed.",
  },
  {
    title: "Space Complexity",
    score: 88,
    description:
      "The overall auxiliary-space reasoning is mostly accurate.",
  },
  {
    title: "Optimization Quality",
    score: 82,
    description:
      "The proposed optimization reduces memory without changing required behavior.",
  },
];

const recommendations = [
  {
    title: "Avoid Unnecessary Copies",
    reason:
      "Creating duplicate collections can significantly increase peak memory usage.",
    action:
      "Prefer in-place processing or references when mutation and ownership rules allow it.",
  },
  {
    title: "Review Temporary Structures",
    reason:
      "Intermediate storage may be unnecessary when values can be processed incrementally.",
    action:
      "Replace temporary collections with streaming or incremental processing where appropriate.",
  },
  {
    title: "Explain the Memory Trade-Off",
    reason:
      "A memory optimization can sometimes increase execution time or implementation complexity.",
    action:
      "State the space improvement and any trade-off introduced by the optimization.",
  },
];

const coachingQuestions = [
  "Which data structures consume the most additional memory?",
  "Can any intermediate values be processed without storing them?",
  "Are you creating copies that are not required?",
  "Can the solution operate in place?",
  "What time-complexity trade-off would a lower-memory solution introduce?",
];

const workflow = [
  {
    title: "Analyze",
    description: "Inspect allocations and data structures.",
  },
  {
    title: "Detect",
    description: "Find redundant storage and copies.",
  },
  {
    title: "Optimize",
    description: "Suggest lower-memory alternatives.",
  },
  {
    title: "Compare",
    description: "Measure before and after usage.",
  },
  {
    title: "Explain",
    description: "Teach the memory trade-off.",
  },
];

export default function AIInterviewQuestionSolutionMemoryEfficiencyCoach() {
  const [showIssues, setShowIssues] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const beforeScore = 58;
  const afterScore = 82;
  const improvement = afterScore - beforeScore;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <MemoryStick size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Memory Efficiency Coach
          </h1>

          <p className="text-gray-500">
            Identify unnecessary memory usage and learn how to optimize space
            without sacrificing required correctness or performance.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {optimized ? afterScore : beforeScore}%
              </p>

              <p className="text-xs text-gray-500">
                Memory Score
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              MEMORY EFFICIENCY ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {optimized
                ? "Memory Usage Improved"
                : "Optimization Opportunities Found"}
            </h2>

            <p className="text-gray-600 mt-2">
              The AI detected unnecessary storage that can be reduced while
              preserving the required solution behavior.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-orange-50 rounded-xl p-5">

            <MemoryStick className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Current Space
            </p>

            <p className="text-3xl font-black text-orange-600">
              O(2n)
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <TrendingDown className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Optimized Space
            </p>

            <p className="text-3xl font-black text-green-600">
              O(n)
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Issues Found
            </p>

            <p className="text-3xl font-black text-red-600">
              2
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <CheckCircle2 className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Potential Improvement
            </p>

            <p className="text-3xl font-black text-purple-600">
              +{improvement}%
            </p>

          </div>

        </div>

      </div>

      {/* Candidate Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Solution
            </h2>

            <p className="text-sm text-gray-500">
              The AI inspects memory allocations in the proposed approach.
            </p>

          </div>

        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mt-6 overflow-x-auto">

          <pre className="text-sm text-gray-100">
{`function processItems(items) {
  const copiedItems = [...items];

  const frequency = new Map();

  for (const item of copiedItems) {
    frequency.set(
      item,
      (frequency.get(item) || 0) + 1
    );
  }

  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}`}
          </pre>

        </div>

        <div className="bg-orange-50 rounded-xl p-4 mt-4">

          <p className="text-sm font-semibold text-orange-800">
            AI observation:
          </p>

          <p className="text-sm text-gray-600 mt-1">
            The copied array duplicates the input and increases peak memory
            usage unnecessarily.
          </p>

        </div>

      </div>

      {/* Memory Issues */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Memory Issues Detected
              </h2>

              <p className="text-sm text-gray-500">
                Identify where unnecessary memory is being consumed.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowIssues(!showIssues)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showIssues ? "Hide Issues" : "Show Issues"}
          </button>

        </div>

        {showIssues && (
          <div className="space-y-4 mt-6">

            {memoryIssues.map((issue) => (

              <div
                key={issue.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {issue.title}
                      </h3>

                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                        {issue.impact} Impact
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {issue.description}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-3">
                      Suggestion: {issue.suggestion}
                    </p>

                  </div>

                  <span className="font-black text-indigo-600">
                    {issue.usage}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Optimized Solution */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-green-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              AI OPTIMIZATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Remove the unnecessary input copy
            </h2>

            <div className="bg-gray-900 rounded-xl p-5 mt-5 overflow-x-auto">

              <pre className="text-sm text-gray-100">
{`function processItems(items) {
  const frequency = new Map();

  for (const item of items) {
    frequency.set(
      item,
      (frequency.get(item) || 0) + 1
    );
  }

  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}`}
              </pre>

            </div>

            <p className="text-sm text-gray-600 mt-4">
              The optimized version processes the input directly and removes
              the redundant O(n) copy.
            </p>

          </div>

        </div>

      </div>

      {/* Before / After */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Memory Usage Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare the original and optimized solutions.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowComparison(!showComparison)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showComparison
              ? "Hide Comparison"
              : "Show Comparison"}
          </button>

        </div>

        {showComparison && (
          <div className="overflow-x-auto mt-6">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="p-4">
                    Metric
                  </th>

                  <th className="p-4">
                    Before
                  </th>

                  <th className="p-4">
                    After
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

                    <td className="p-4 text-orange-600 font-bold">
                      {item.before}
                    </td>

                    <td className="p-4 text-green-600 font-bold">
                      {item.after}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.improvement}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Evaluation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Memory Optimization Evaluation
            </h2>

            <p className="text-sm text-gray-500">
              Evaluate the candidate's awareness of space usage and trade-offs.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowEvaluation(!showEvaluation)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvaluation
              ? "Hide Evaluation"
              : "Show Evaluation"}
          </button>

        </div>

        {showEvaluation && (
          <div className="space-y-4 mt-6">

            {evaluationAreas.map((item) => (

              <div
                key={item.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>

                  </div>

                  <span className="font-black text-indigo-600">
                    {item.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
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
              AI MEMORY DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Redundant input storage is the primary issue
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate's hash map is justified by the required lookup
              behavior, but the copied input array is unnecessary. Removing
              the copy reduces auxiliary memory while preserving the intended
              algorithm.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                KEY TRADE-OFF
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                The optimization improves memory usage without changing the
                required time complexity.
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
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve memory efficiency without blindly optimizing every
                allocation.
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

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Memory Efficiency Coach
              </h2>

              <p className="text-sm text-gray-500">
                Practice identifying memory-saving opportunities yourself.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowQuestions(!showQuestions)
            }
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

      {/* Optimize */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setOptimized(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Apply Memory Optimization
          <ArrowRight size={18} />
        </button>

      </div>

      {optimized && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                OPTIMIZATION COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Auxiliary memory reduced from O(2n) to O(n)
              </h2>

              <p className="text-gray-600 mt-2">
                The unnecessary input copy was removed while preserving the
                required algorithm behavior and lookup performance.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Memory Optimization Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI analyzes and improves memory efficiency.
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
              Optimize memory only where it matters.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates should understand which allocations are
              necessary, which are redundant, and what trade-offs are involved
              before attempting memory optimization.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}