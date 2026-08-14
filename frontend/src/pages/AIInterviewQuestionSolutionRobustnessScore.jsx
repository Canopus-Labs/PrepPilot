import React, { useState } from "react";
import {
  Brain,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Target,
  GitBranch,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const robustnessFactors = [
  {
    name: "Edge-Case Handling",
    score: 82,
    status: "Strong",
    description:
      "The solution considers empty input, boundary values, and duplicate data.",
  },
  {
    name: "Constraint Changes",
    score: 64,
    status: "Needs Review",
    description:
      "The approach may require modification when input size increases significantly.",
  },
  {
    name: "Failure Scenarios",
    score: 58,
    status: "Needs Improvement",
    description:
      "Recovery behavior for service or component failures is not clearly defined.",
  },
  {
    name: "Invalid Inputs",
    score: 76,
    status: "Good",
    description:
      "Most invalid-input cases are handled, but validation rules could be clearer.",
  },
  {
    name: "Dependency Failures",
    score: 51,
    status: "Weak",
    description:
      "The solution relies on external dependencies without a complete fallback strategy.",
  },
  {
    name: "Scalability",
    score: 69,
    status: "Needs Review",
    description:
      "The design works at the current scale but has potential bottlenecks at higher load.",
  },
];

const scenarios = [
  {
    title: "Empty Input",
    category: "Edge Case",
    result: "Handled",
    explanation:
      "The solution returns an appropriate empty result without performing unnecessary processing.",
  },
  {
    title: "Input Size Increases 100x",
    category: "Constraint Change",
    result: "Needs Review",
    explanation:
      "The current approach may become inefficient because its processing cost grows with the input size.",
  },
  {
    title: "External Service Unavailable",
    category: "Dependency Failure",
    result: "Weak",
    explanation:
      "No explicit fallback or retry strategy was identified.",
  },
  {
    title: "Malformed Input",
    category: "Invalid Input",
    result: "Handled",
    explanation:
      "Input validation prevents malformed data from reaching the main processing stage.",
  },
  {
    title: "Traffic Spikes",
    category: "Scalability",
    result: "Needs Review",
    explanation:
      "The solution needs stronger load-management and scaling considerations.",
  },
];

const recommendations = [
  "Define explicit fallback behavior when external dependencies fail.",
  "Explain how the solution changes when input size increases substantially.",
  "Add validation for malformed and unexpected input.",
  "Identify the main scalability bottleneck and propose an optimization.",
];

export default function AIInterviewQuestionSolutionRobustnessScore() {
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const robustnessScore = Math.round(
    robustnessFactors.reduce(
      (sum, factor) => sum + factor.score,
      0
    ) / robustnessFactors.length
  );

  const strongFactors = robustnessFactors.filter(
    (factor) => factor.score >= 75
  ).length;

  const weakFactors = robustnessFactors.filter(
    (factor) => factor.score < 60
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
            AI Solution Robustness Score
          </h1>

          <p className="text-gray-500">
            Evaluate how well your technical solution survives unexpected
            inputs, failures, requirement changes, and scale.
          </p>
        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-8 border-indigo-500">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {robustnessScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              OVERALL ROBUSTNESS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {robustnessScore >= 75
                ? "Strong Solution"
                : robustnessScore >= 60
                ? "Moderately Robust"
                : "Needs Improvement"}
            </h2>

            <p className="text-gray-600 mt-2">
              Your solution performs well under normal conditions but has
              several areas that need stronger failure and scalability
              reasoning.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <ShieldCheck className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Robustness Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {robustnessScore}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Strong Factors
            </p>

            <p className="text-3xl font-black text-green-600">
              {strongFactors}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Weak Factors
            </p>

            <p className="text-3xl font-black text-red-600">
              {weakFactors}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <TrendingUp className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Scenarios Tested
            </p>

            <p className="text-3xl font-black text-orange-600">
              {scenarios.length}
            </p>

          </div>

        </div>

      </div>

      {/* Robustness Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Robustness Factor Analysis
            </h2>

            <p className="text-sm text-gray-500">
              AI evaluates multiple dimensions instead of checking only normal
              test cases.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {robustnessFactors.map((factor) => (

            <button
              type="button"
              key={factor.name}
              onClick={() => setSelectedFactor(factor)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedFactor?.name === factor.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {factor.score >= 75 ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />
                ) : factor.score < 60 ? (
                  <AlertTriangle
                    className="text-red-600"
                    size={24}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={24}
                  />
                )}

                <div className="flex-1">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {factor.description}
                  </p>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className={`h-full rounded-full ${
                        factor.score >= 75
                          ? "bg-green-500"
                          : factor.score >= 60
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${factor.score}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-black">
                    {factor.score}
                  </p>

                  <p className="text-xs text-gray-500">
                    {factor.status}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Factor */}
      {selectedFactor && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Lightbulb
              className="text-indigo-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-indigo-600">
                FACTOR ANALYSIS
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedFactor.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedFactor.description}
              </p>

              <div className="mt-5 bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-indigo-600">
                  AI GUIDANCE
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {selectedFactor.score >= 75
                    ? "This is currently a strong part of your solution. Continue explaining the reasoning behind it during follow-up questions."
                    : "This area is a potential robustness risk. Explain how your solution would behave under unexpected conditions and identify a concrete mitigation strategy."}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Scenario Testing */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Robustness Scenario Testing
            </h2>

            <p className="text-sm text-gray-500">
              AI challenges the solution beyond the original happy path.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {scenarios.map((scenario) => (

            <button
              type="button"
              key={scenario.title}
              onClick={() => setSelectedScenario(scenario)}
              className={`w-full text-left border rounded-xl p-5 transition ${
                selectedScenario?.title === scenario.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="flex-1">

                  <p className="text-xs text-gray-500">
                    {scenario.category}
                  </p>

                  <h3 className="font-bold mt-1">
                    {scenario.title}
                  </h3>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    scenario.result === "Handled"
                      ? "bg-green-100 text-green-700"
                      : scenario.result === "Weak"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {scenario.result}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Scenario Detail */}
      {selectedScenario && (
        <div className="bg-orange-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <AlertTriangle
              className="text-orange-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-orange-600">
                SCENARIO ANALYSIS
              </p>

              <h2 className="text-xl font-bold text-orange-800 mt-1">
                {selectedScenario.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedScenario.explanation}
              </p>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-orange-600">
                  INTERVIEWER FOLLOW-UP
                </p>

                <p className="font-semibold mt-2">
                  What changes would you make to your solution to handle this
                  scenario safely?
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Robustness Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Robustness Evaluation Flow
            </h2>

            <p className="text-sm text-gray-500">
              The score is based on how the solution behaves under changing
              conditions.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Analyze Solution",
            "Test Edge Cases",
            "Change Constraints",
            "Simulate Failures",
            "Check Dependencies",
            "Evaluate Scalability",
            "Robustness Score",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {step}
              </span>

              {index < array.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Improvement Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Focus on the weakest robustness dimensions first.
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

      {/* Candidate Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              ROBUSTNESS CHALLENGE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Your interviewer changes the conditions.
            </h2>

            <p className="text-gray-600 mt-2">
              The system now receives 100× more traffic and the external
              dependency becomes temporarily unavailable. Explain how your
              solution should adapt.
            </p>

            <textarea
              placeholder="Explain how you would modify your solution..."
              className="w-full mt-5 min-h-[130px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            />

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
            >
              Evaluate My Response
            </button>

          </div>

        </div>

      </div>

      {/* Final Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              A strong interview solution should not only work for the expected
              input. Explain what happens when inputs are invalid, dependencies
              fail, constraints change, traffic increases, or individual
              components become unavailable.
            </p>

          </div>

        </div>

      </div>

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Solution Robustness
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
              Solution robustness analysis completed successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}