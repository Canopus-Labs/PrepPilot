import React, { useState } from "react";
import {
  Brain,
  Code2,
  Boxes,
  GitBranch,
  Puzzle,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

const maintainabilityFactors = [
  {
    name: "Implementation Complexity",
    score: 72,
    status: "Good",
    description:
      "The solution has moderate complexity but contains a few areas that could be simplified.",
  },
  {
    name: "Modularity",
    score: 88,
    status: "Strong",
    description:
      "Responsibilities are reasonably separated into independent components.",
  },
  {
    name: "Naming & Organization",
    score: 64,
    status: "Needs Improvement",
    description:
      "Some names do not clearly communicate intent and related logic could be organized better.",
  },
  {
    name: "Coupling",
    score: 58,
    status: "Needs Improvement",
    description:
      "Several components depend directly on implementation details of other components.",
  },
  {
    name: "Extensibility",
    score: 81,
    status: "Strong",
    description:
      "The design can support additional functionality with limited structural changes.",
  },
  {
    name: "Future Changes",
    score: 76,
    status: "Good",
    description:
      "Most expected changes can be handled without rewriting the complete solution.",
  },
];

const codeIssues = [
  {
    title: "Tightly Coupled Service Logic",
    severity: "High",
    description:
      "Business logic directly depends on a concrete database implementation.",
    suggestion:
      "Introduce an interface or repository abstraction between the business layer and database.",
  },
  {
    title: "Large Processing Function",
    severity: "Medium",
    description:
      "One function handles validation, transformation, persistence, and response formatting.",
    suggestion:
      "Split the function into smaller responsibilities with clear interfaces.",
  },
  {
    title: "Generic Variable Names",
    severity: "Low",
    description:
      "Names such as data, result, and temp make the implementation harder to understand.",
    suggestion:
      "Use names that describe the domain meaning and intended purpose.",
  },
];

const maintainabilityFlow = [
  {
    title: "Analyze Solution",
    description: "Inspect architecture, code organization, and dependencies.",
  },
  {
    title: "Measure Factors",
    description: "Score complexity, modularity, coupling, and extensibility.",
  },
  {
    title: "Find Risks",
    description: "Identify areas likely to make future changes difficult.",
  },
  {
    title: "Suggest Improvements",
    description: "Recommend practical maintainability improvements.",
  },
  {
    title: "Re-evaluate",
    description: "Compare maintainability before and after changes.",
  },
];

const futureChanges = [
  {
    change: "Add a new database",
    difficulty: "Medium",
    impact:
      "Current direct database dependency would require changes in the service layer.",
  },
  {
    change: "Add a new API response format",
    difficulty: "Low",
    impact:
      "Response formatting can be isolated without changing core business logic.",
  },
  {
    change: "Add another validation rule",
    difficulty: "Low",
    impact:
      "Validation is already separated and can be extended independently.",
  },
  {
    change: "Replace external service",
    difficulty: "High",
    impact:
      "Direct dependency on the external implementation increases replacement cost.",
  },
];

export default function AIInterviewQuestionSolutionMaintainabilityAnalyzer() {
  const [selectedFactor, setSelectedFactor] = useState(
    maintainabilityFactors[0]
  );
  const [showIssues, setShowIssues] = useState(false);
  const [showFutureChanges, setShowFutureChanges] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = Math.round(
    maintainabilityFactors.reduce(
      (sum, factor) => sum + factor.score,
      0
    ) / maintainabilityFactors.length
  );

  const strongFactors = maintainabilityFactors.filter(
    (factor) => factor.score >= 80
  ).length;

  const weakFactors = maintainabilityFactors.filter(
    (factor) => factor.score < 70
  ).length;

  const highIssues = codeIssues.filter(
    (issue) => issue.severity === "High"
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
            AI Solution Maintainability Analyzer
          </h1>

          <p className="text-gray-500">
            Evaluate whether a technical solution can remain understandable,
            modifiable, and extensible as requirements evolve.
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
              MAINTAINABILITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {overallScore >= 80
                ? "Highly Maintainable"
                : overallScore >= 65
                ? "Moderately Maintainable"
                : "Needs Improvement"}
            </h2>

            <p className="text-gray-600 mt-2">
              The analyzer evaluates more than correctness and performance by
              considering how easily the solution can evolve over time.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Wrench
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overall Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Strong Factors
            </p>

            <p className="text-3xl font-black text-green-600">
              {strongFactors}
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
              {weakFactors}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Code2
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical Issues
            </p>

            <p className="text-3xl font-black text-red-600">
              {highIssues}
            </p>

          </div>

        </div>

      </div>

      {/* Maintainability Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Maintainability Factors
            </h2>

            <p className="text-sm text-gray-500">
              Select a factor to inspect the AI's reasoning.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {maintainabilityFactors.map((factor, index) => (

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

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              FACTOR ANALYSIS
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

      {/* Maintainability Issues */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Maintainability Issues
              </h2>

              <p className="text-sm text-gray-500">
                Potential design and implementation problems that could make
                future changes harder.
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

            {codeIssues.map((issue, index) => (

              <div
                key={issue.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      issue.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : issue.severity === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
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
                            : issue.severity === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {issue.severity}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {issue.description}
                    </p>

                    <div className="bg-indigo-50 rounded-lg p-4 mt-3">

                      <p className="text-xs font-bold text-indigo-600">
                        SUGGESTED IMPROVEMENT
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {issue.suggestion}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Future Changes */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Future Change Simulation
              </h2>

              <p className="text-sm text-gray-500">
                Test how difficult common future requirements would be to
                implement.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowFutureChanges(!showFutureChanges)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFutureChanges
              ? "Hide Simulation"
              : "Show Simulation"}
          </button>

        </div>

        {showFutureChanges && (
          <div className="space-y-4 mt-6">

            {futureChanges.map((change) => (

              <div
                key={change.change}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {change.change}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      change.difficulty === "High"
                        ? "bg-red-100 text-red-700"
                        : change.difficulty === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {change.difficulty} Difficulty
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {change.impact}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Maintainability Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Boxes className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Maintainability Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate the solution and predict how difficult future
                modifications will be.
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

            {maintainabilityFlow.map((step, index) => (

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

                {index < maintainabilityFlow.length - 1 && (
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

      {/* Analyze Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Maintainability
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
                Maintainability analysis generated successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can analyze candidate
                solutions for complexity, modularity, naming, coupling,
                extensibility, and future-change cost.
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
              A good solution should survive future changes.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong engineering answers consider not only whether a solution
              works today, but also whether another engineer can understand,
              modify, test, and extend it without unnecessary risk.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}