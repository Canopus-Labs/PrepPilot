import React, { useState } from "react";
import {
  Brain,
  SlidersHorizontal,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Gauge,
} from "lucide-react";

const scenarios = [
  {
    title: "Original Constraints",
    type: "Original",
    inputSize: "100,000",
    memory: "512 MB",
    latency: "200 ms",
    reliability: "99.9%",
    status: "Baseline",
    color: "indigo",
  },
  {
    title: "Relaxed Input Constraint",
    type: "Relaxed",
    inputSize: "10,000",
    memory: "512 MB",
    latency: "500 ms",
    reliability: "99.9%",
    status: "Simpler approach possible",
    color: "green",
  },
  {
    title: "Tightened Input Constraint",
    type: "Tightened",
    inputSize: "10,000,000",
    memory: "512 MB",
    latency: "100 ms",
    reliability: "99.99%",
    status: "Optimization required",
    color: "red",
  },
  {
    title: "Relaxed Memory Constraint",
    type: "Relaxed",
    inputSize: "100,000",
    memory: "4 GB",
    latency: "200 ms",
    reliability: "99.9%",
    status: "More memory available",
    color: "green",
  },
  {
    title: "Tightened Latency Constraint",
    type: "Tightened",
    inputSize: "100,000",
    memory: "512 MB",
    latency: "20 ms",
    reliability: "99.9%",
    status: "Lower-latency design needed",
    color: "red",
  },
];

const decisions = [
  {
    decision: "Data Structure",
    original: "Hash Map",
    relaxed: "Array / simpler structure",
    tightened: "Optimized indexed structure",
    impact: "Medium",
  },
  {
    decision: "Algorithm",
    original: "O(n) traversal",
    relaxed: "O(n) acceptable",
    tightened: "O(log n) or O(1) preferred",
    impact: "High",
  },
  {
    decision: "Caching",
    original: "Optional",
    relaxed: "Probably unnecessary",
    tightened: "Strongly recommended",
    impact: "High",
  },
  {
    decision: "Architecture",
    original: "Single service",
    relaxed: "Single service remains suitable",
    tightened: "May require distributed components",
    impact: "High",
  },
];

const reasoningSteps = [
  {
    title: "Read Constraint",
    description: "Identify what changed from the original problem.",
  },
  {
    title: "Test Current Solution",
    description: "Determine whether the existing approach still satisfies it.",
  },
  {
    title: "Measure Impact",
    description: "Estimate how performance or complexity changes.",
  },
  {
    title: "Adapt Decision",
    description: "Choose whether to retain or replace the approach.",
  },
  {
    title: "Justify",
    description: "Explain why the new choice fits the constraint.",
  },
];

const insights = [
  {
    title: "Relaxed Input Size",
    message:
      "The smaller input size makes the original optimization less important. A simpler implementation may now be preferable.",
    type: "Relaxation",
  },
  {
    title: "Tightened Latency",
    message:
      "The stricter latency requirement makes an O(n) operation potentially unsuitable. Faster lookup or caching should be considered.",
    type: "Tightening",
  },
  {
    title: "Relaxed Memory",
    message:
      "Additional memory allows more aggressive caching or auxiliary data structures.",
    type: "Relaxation",
  },
];

export default function AIInterviewQuestionSolutionConstraintRelaxationSimulator() {
  const [selectedScenario, setSelectedScenario] = useState(
    scenarios[0]
  );
  const [candidateReasoning, setCandidateReasoning] = useState("");
  const [showInsights, setShowInsights] = useState(false);
  const [showDecisions, setShowDecisions] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const relaxedCount = scenarios.filter(
    (scenario) => scenario.type === "Relaxed"
  ).length;

  const tightenedCount = scenarios.filter(
    (scenario) => scenario.type === "Tightened"
  ).length;

  const isTightened =
    selectedScenario.type === "Tightened";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Constraint Relaxation Simulator
          </h1>

          <p className="text-gray-500">
            Practice adapting technical solutions when interview constraints
            become stricter or more relaxed.
          </p>

        </div>

      </div>

      {/* Main Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <SlidersHorizontal
                className="mx-auto text-indigo-600"
                size={32}
              />

              <p className="text-xs font-bold text-indigo-700 mt-1">
                ADAPT
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CONSTRAINT SIMULATION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {selectedScenario.title}
            </h2>

            <p className="text-gray-600 mt-2">
              Decide whether your current solution remains appropriate under
              the selected constraint changes.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Gauge
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Scenarios
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {scenarios.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <ArrowDown
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Relaxed
            </p>

            <p className="text-3xl font-black text-green-600">
              {relaxedCount}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <ArrowUp
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Tightened
            </p>

            <p className="text-3xl font-black text-red-600">
              {tightenedCount}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Decision Impact
            </p>

            <p className="text-3xl font-black text-purple-600">
              High
            </p>

          </div>

        </div>

      </div>

      {/* Original Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Original Problem Constraints
            </h2>

            <p className="text-sm text-gray-500">
              Start with the baseline before changing individual constraints.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              INPUT SIZE
            </p>

            <p className="text-xl font-black mt-1">
              100,000
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              MEMORY
            </p>

            <p className="text-xl font-black mt-1">
              512 MB
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              LATENCY
            </p>

            <p className="text-xl font-black mt-1">
              200 ms
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              RELIABILITY
            </p>

            <p className="text-xl font-black mt-1">
              99.9%
            </p>

          </div>

        </div>

      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <SlidersHorizontal className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Constraint Scenarios
            </h2>

            <p className="text-sm text-gray-500">
              Select a relaxed or tightened constraint and evaluate your
              solution.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {scenarios.map((scenario) => (

            <button
              type="button"
              key={scenario.title}
              onClick={() => setSelectedScenario(scenario)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedScenario.title === scenario.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    scenario.type === "Relaxed"
                      ? "bg-green-100 text-green-700"
                      : scenario.type === "Tightened"
                      ? "bg-red-100 text-red-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >

                  {scenario.type === "Relaxed" ? (
                    <ArrowDown size={23} />
                  ) : scenario.type === "Tightened" ? (
                    <ArrowUp size={23} />
                  ) : (
                    <Target size={23} />
                  )}

                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {scenario.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {scenario.status}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        scenario.type === "Relaxed"
                          ? "bg-green-100 text-green-700"
                          : scenario.type === "Tightened"
                          ? "bg-red-100 text-red-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {scenario.type}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-4 gap-3 mt-4">

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Input
                      </p>

                      <p className="font-bold">
                        {scenario.inputSize}
                      </p>

                    </div>

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Memory
                      </p>

                      <p className="font-bold">
                        {scenario.memory}
                      </p>

                    </div>

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Latency
                      </p>

                      <p className="font-bold">
                        {scenario.latency}
                      </p>

                    </div>

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Reliability
                      </p>

                      <p className="font-bold">
                        {scenario.reliability}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Scenario Analysis */}
      <div
        className={`rounded-2xl p-6 ${
          isTightened
            ? "bg-red-50"
            : selectedScenario.type === "Relaxed"
            ? "bg-green-50"
            : "bg-indigo-50"
        }`}
      >

        <div className="flex gap-4">

          {isTightened ? (
            <AlertTriangle
              className="text-red-600"
              size={30}
            />
          ) : (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          )}

          <div className="flex-1">

            <p className="text-xs font-bold">
              SELECTED SCENARIO
            </p>

            <h2 className="text-xl font-bold mt-1">
              {selectedScenario.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {isTightened
                ? "The constraints are stricter. Determine which parts of your solution may no longer satisfy the requirements."
                : selectedScenario.type === "Relaxed"
                ? "The constraints are more relaxed. Determine whether a simpler or less expensive approach is now sufficient."
                : "Use this as the baseline for evaluating how constraint changes affect your decisions."}
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  INPUT
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedScenario.inputSize}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  MEMORY
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedScenario.memory}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  LATENCY
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedScenario.latency}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p
                  className={`text-xl font-black mt-1 ${
                    isTightened
                      ? "text-red-600"
                      : selectedScenario.type === "Relaxed"
                      ? "text-green-600"
                      : "text-indigo-600"
                  }`}
                >
                  {selectedScenario.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Decision Impact */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Decision Impact
              </h2>

              <p className="text-sm text-gray-500">
                See which decisions can change when constraints change.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowDecisions(!showDecisions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showDecisions
              ? "Hide Decisions"
              : "Show Decisions"}
          </button>

        </div>

        {showDecisions && (
          <div className="space-y-4 mt-6">

            {decisions.map((decision) => (

              <div
                key={decision.decision}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {decision.decision}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    {decision.impact} Impact
                  </span>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">

                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      ORIGINAL
                    </p>

                    <p className="font-semibold mt-1">
                      {decision.original}
                    </p>

                  </div>

                  <div className="bg-green-50 rounded-lg p-4">

                    <p className="text-xs text-green-600">
                      RELAXED
                    </p>

                    <p className="font-semibold mt-1">
                      {decision.relaxed}
                    </p>

                  </div>

                  <div className="bg-red-50 rounded-lg p-4">

                    <p className="text-xs text-red-600">
                      TIGHTENED
                    </p>

                    <p className="font-semibold mt-1">
                      {decision.tightened}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Candidate Reasoning */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Reasoning
            </h2>

            <p className="text-sm text-gray-500">
              Explain whether your original solution remains appropriate.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            AI PROMPT
          </p>

          <h3 className="font-bold mt-2">
            {selectedScenario.type === "Tightened"
              ? "The constraints have become stricter. Which part of your solution would you change first, and why?"
              : selectedScenario.type === "Relaxed"
              ? "The constraints have become more relaxed. Could you simplify your solution while still meeting the requirements?"
              : "Explain why your original approach fits the baseline constraints."}
          </h3>

        </div>

        <textarea
          value={candidateReasoning}
          onChange={(e) =>
            setCandidateReasoning(e.target.value)
          }
          placeholder="Explain how the changed constraints affect your algorithm, data structures, architecture, or trade-offs..."
          className="w-full mt-5 min-h-[170px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setEvaluated(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Evaluate Reasoning
          <ArrowRight size={18} />
        </button>

      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Constraint Insights
              </h2>

              <p className="text-sm text-gray-500">
                Understand how constraint changes affect engineering choices.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowInsights(!showInsights)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showInsights ? "Hide Insights" : "Show Insights"}
          </button>

        </div>

        {showInsights && (
          <div className="space-y-4 mt-6">

            {insights.map((insight, index) => (

              <div
                key={insight.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="font-bold">
                        {insight.title}
                      </h3>

                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          insight.type === "Tightening"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {insight.type}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {insight.message}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Reasoning Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Constraint Reasoning Flow
              </h2>

              <p className="text-sm text-gray-500">
                A structured process for adapting solutions to changing
                constraints.
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

            {reasoningSteps.map((step, index) => (

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

                {index < reasoningSteps.length - 1 && (
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

      {/* Evaluation Result */}
      {evaluated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                REASONING EVALUATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Constraint adaptation analysis complete.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can evaluate whether the
                candidate correctly identifies the impact of relaxed and
                tightened constraints and justifies any resulting design
                changes.
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
              Constraints should drive technical decisions.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong candidate should understand not only how a solution
              works, but also why it is appropriate for the current
              constraints—and when changing those constraints makes a
              different approach preferable.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}