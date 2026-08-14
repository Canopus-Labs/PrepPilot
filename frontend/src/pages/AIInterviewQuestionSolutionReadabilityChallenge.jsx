import React, { useState } from "react";
import {
  Brain,
  Code2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  GitCompare,
  RefreshCw,
} from "lucide-react";

const readabilityFactors = [
  {
    name: "Variable Naming",
    score: 62,
    status: "Needs Improvement",
    description:
      "Several variables use short or generic names that hide their purpose.",
  },
  {
    name: "Function Structure",
    score: 68,
    status: "Needs Improvement",
    description:
      "The main function performs multiple responsibilities and can be divided.",
  },
  {
    name: "Control Flow",
    score: 74,
    status: "Good",
    description:
      "The control flow is understandable but contains avoidable nesting.",
  },
  {
    name: "Comments",
    score: 81,
    status: "Strong",
    description:
      "Important logic is documented without excessive comments.",
  },
  {
    name: "Organization",
    score: 70,
    status: "Good",
    description:
      "The implementation is logically organized but could improve separation of concerns.",
  },
  {
    name: "Overall Clarity",
    score: 66,
    status: "Needs Improvement",
    description:
      "The solution is correct but requires additional effort to understand quickly.",
  },
];

const readabilityIssues = [
  {
    title: "Generic Variable Names",
    severity: "High",
    before: "x, y, z, res",
    after: "left, right, currentResult",
    explanation:
      "Descriptive names communicate intent without requiring the reader to inspect surrounding logic.",
  },
  {
    title: "Multiple Responsibilities",
    severity: "Medium",
    before: "processData() handles validation, calculation, and formatting",
    after: "validateInput() → calculateResult() → formatResult()",
    explanation:
      "Separating responsibilities makes the implementation easier to understand and modify.",
  },
  {
    title: "Nested Control Flow",
    severity: "Medium",
    before: "Multiple nested if statements",
    after: "Early returns and guard conditions",
    explanation:
      "Reducing nesting makes the main execution path easier to follow.",
  },
];

const codeComparison = {
  before: `function f(a) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] > 0) {
      x += a[i];

      if (a[i] % 2 === 0) {
        y++;
      }
    }
  }

  return [x, y];
}`,
  after: `function calculatePositiveValues(numbers) {
  let positiveSum = 0;
  let positiveEvenCount = 0;

  for (const number of numbers) {
    if (number <= 0) continue;

    positiveSum += number;

    if (number % 2 === 0) {
      positiveEvenCount++;
    }
  }

  return [positiveSum, positiveEvenCount];
}`,
};

const challengeSteps = [
  {
    title: "Review",
    description: "Understand the working implementation.",
  },
  {
    title: "Identify",
    description: "Find readability problems.",
  },
  {
    title: "Refactor",
    description: "Improve names and structure.",
  },
  {
    title: "Compare",
    description: "Review original versus improved code.",
  },
  {
    title: "Explain",
    description: "Justify each readability change.",
  },
];

const recommendations = [
  {
    title: "Use Domain-Specific Names",
    reason:
      "Generic identifiers make otherwise simple logic harder to understand.",
    action:
      "Rename variables based on their actual meaning and role in the algorithm.",
  },
  {
    title: "Reduce Function Responsibilities",
    reason:
      "Large functions require readers to understand too many operations at once.",
    action:
      "Separate independent responsibilities into focused helper functions.",
  },
  {
    title: "Prefer Clear Control Flow",
    reason:
      "Deep nesting increases the mental effort needed to follow execution.",
    action:
      "Use guard clauses and early returns when they make the happy path clearer.",
  },
];

export default function AIInterviewQuestionSolutionReadabilityChallenge() {
  const [selectedFactor, setSelectedFactor] = useState(
    readabilityFactors[0]
  );
  const [showIssues, setShowIssues] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [challenged, setChallenged] = useState(false);

  const overallScore = Math.round(
    readabilityFactors.reduce(
      (sum, factor) => sum + factor.score,
      0
    ) / readabilityFactors.length
  );

  const improvementAreas = readabilityFactors.filter(
    (factor) => factor.score < 70
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
            AI Solution Readability Challenge
          </h1>

          <p className="text-gray-500">
            Improve a technically correct solution so another engineer can
            understand it quickly and confidently.
          </p>

        </div>

      </div>

      {/* Overall Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              READABILITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {overallScore >= 80
                ? "Highly Readable"
                : overallScore >= 65
                ? "Moderately Readable"
                : "Needs Improvement"}
            </h2>

            <p className="text-gray-600 mt-2">
              The solution is evaluated for naming, function structure,
              control flow, comments, organization, and overall clarity.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Eye className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Readability
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Improvement Areas
            </p>

            <p className="text-3xl font-black text-orange-600">
              {improvementAreas}
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
              100%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Code2
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Challenge Type
            </p>

            <p className="text-xl font-black text-purple-600">
              Refactoring
            </p>

          </div>

        </div>

      </div>

      {/* Original Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Code2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Working Solution
            </h2>

            <p className="text-sm text-gray-500">
              The implementation is functionally correct. Your task is to
              improve readability without changing its behavior.
            </p>

          </div>

        </div>

        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 mt-5 overflow-x-auto text-sm">
          <code>{codeComparison.before}</code>
        </pre>

        <div className="bg-indigo-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-indigo-600">
            YOUR TASK
          </p>

          <p className="text-gray-700 mt-2">
            Improve the variable names, function structure, and control flow
            while preserving the exact behavior of the solution.
          </p>

        </div>

      </div>

      {/* Readability Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Readability Factors
            </h2>

            <p className="text-sm text-gray-500">
              Select a factor to inspect the AI evaluation.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {readabilityFactors.map((factor, index) => (

            <button
              type="button"
              key={factor.name}
              onClick={() => setSelectedFactor(factor)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedFactor.name === factor.name
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
                        {factor.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {factor.status}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        factor.score >= 80
                          ? "bg-green-100 text-green-700"
                          : factor.score >= 70
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {factor.score}/100
                    </span>

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

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Factor */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              READABILITY FACTOR ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedFactor.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedFactor.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedFactor.score}/100
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedFactor.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <GitCompare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Original vs Improved Solution
              </h2>

              <p className="text-sm text-gray-500">
                Compare readability changes while preserving functionality.
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
              : "Show Comparison"}
          </button>

        </div>

        {showComparison && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            <div>

              <p className="text-xs font-bold text-red-600 mb-2">
                ORIGINAL
              </p>

              <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto text-sm min-h-[320px]">
                <code>{codeComparison.before}</code>
              </pre>

            </div>

            <div>

              <p className="text-xs font-bold text-green-600 mb-2">
                IMPROVED
              </p>

              <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto text-sm min-h-[320px]">
                <code>{codeComparison.after}</code>
              </pre>

            </div>

          </div>
        )}

      </div>

      {/* Issues */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Detected Readability Issues
              </h2>

              <p className="text-sm text-gray-500">
                Problems the candidate should address during the challenge.
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

            {readabilityIssues.map((issue, index) => (

              <div
                key={issue.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {issue.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          issue.severity === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {issue.severity}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">

                      <div className="bg-red-50 rounded-lg p-4">

                        <p className="text-xs font-bold text-red-600">
                          BEFORE
                        </p>

                        <p className="text-sm mt-1">
                          {issue.before}
                        </p>

                      </div>

                      <div className="bg-green-50 rounded-lg p-4">

                        <p className="text-xs font-bold text-green-600">
                          IMPROVE TO
                        </p>

                        <p className="text-sm mt-1">
                          {issue.after}
                        </p>

                      </div>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {issue.explanation}
                    </p>

                  </div>

                </div>

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
                AI Readability Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Suggestions for making technically correct code easier to
                understand.
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

      {/* Challenge Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Readability Challenge Flow
              </h2>

              <p className="text-sm text-gray-500">
                Improve code quality without changing the underlying behavior.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSteps(!showSteps)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSteps ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showSteps && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {challengeSteps.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[150px]">

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

                {index < challengeSteps.length - 1 && (
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

      {/* Start Challenge */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setChallenged(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Start Readability Challenge
          <ArrowRight size={18} />
        </button>

      </div>

      {challenged && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                CHALLENGE STARTED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Your readability refactoring task is ready.
              </h2>

              <p className="text-gray-600 mt-2">
                Refactor the working solution, then compare your version with
                the AI analysis. The production implementation can evaluate
                semantic naming, function boundaries, control-flow complexity,
                comments, and code organization.
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
              Correct code should also be easy to understand.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong engineers do not optimize only for correctness. They
              write code that another developer can quickly read, review,
              debug, and maintain.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}