import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const components = [
  {
    name: "API Gateway",
    original: "Routes incoming requests to application services.",
    impact: "Low",
    status: "Remains Valid",
    reason:
      "The requirement change does not alter the external request-routing responsibility.",
  },
  {
    name: "Application Servers",
    original: "Process URL creation and redirect requests.",
    impact: "Medium",
    status: "Needs Review",
    reason:
      "Additional traffic may require changes to scaling and load-balancing strategy.",
  },
  {
    name: "Redis Cache",
    original: "Caches frequently accessed short URLs.",
    impact: "High",
    status: "Needs Change",
    reason:
      "The increased traffic requirement makes cache capacity, eviction policy, and replication more important.",
  },
  {
    name: "Database",
    original: "Stores URL mappings and analytics data.",
    impact: "High",
    status: "Needs Change",
    reason:
      "Higher write volume may require partitioning, replication, or a separate analytics storage strategy.",
  },
];

const decisions = [
  {
    title: "Use Redis for redirect caching",
    status: "Valid",
    explanation:
      "Caching remains appropriate and becomes more important under the new traffic requirement.",
  },
  {
    title: "Use a single database instance",
    status: "Change Required",
    explanation:
      "A single instance may become a bottleneck and availability risk at the new scale.",
  },
  {
    title: "Use horizontal application scaling",
    status: "Valid",
    explanation:
      "Horizontal scaling remains suitable and should now be combined with appropriate load balancing.",
  },
  {
    title: "Store analytics in the primary database",
    status: "Change Required",
    explanation:
      "Analytics writes may interfere with latency-sensitive redirect operations.",
  },
];

const modificationSteps = [
  "Increase cache capacity and replication.",
  "Introduce database read replicas or partitioning.",
  "Separate analytics workloads from redirect traffic.",
  "Review load-balancer capacity.",
];

export default function AIInterviewQuestionRequirementChangeImpactAnalyzer() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showDecisions, setShowDecisions] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const affectedComponents = components.filter(
    (item) => item.status !== "Remains Valid"
  ).length;

  const unchangedComponents = components.filter(
    (item) => item.status === "Remains Valid"
  ).length;

  const highImpact = components.filter(
    (item) => item.impact === "High"
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
            AI Requirement Change Impact Analyzer
          </h1>

          <p className="text-gray-500">
            Understand exactly how a changed interview requirement affects your
            existing technical solution.
          </p>
        </div>

      </div>

      {/* Main Concept */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              REQUIREMENT CHANGE SIMULATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Your solution does not need to start from zero.
            </h2>

            <p className="text-gray-600 mt-2">
              AI identifies what remains valid, what becomes risky, and which
              technical decisions must change after a requirement is modified.
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
              Original Problem
            </h2>

            <p className="text-sm text-gray-500">
              Design a URL shortening service supporting high traffic, fast
              redirects, and reliable storage.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-xs text-gray-500">
              TRAFFIC
            </p>

            <p className="text-lg font-black mt-1">
              1M requests/day
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs text-gray-500">
              LATENCY
            </p>

            <p className="text-lg font-black mt-1">
              Low redirect latency
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs text-gray-500">
              STORAGE
            </p>

            <p className="text-lg font-black mt-1">
              Reliable persistence
            </p>

          </div>

        </div>

      </div>

      {/* Changed Requirement */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              NEW REQUIREMENT
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Traffic increases from 1M to 100M requests/day.
            </h2>

            <p className="text-gray-600 mt-2">
              The interviewer has changed one requirement. Determine which
              parts of your original architecture are affected.
            </p>

          </div>

        </div>

      </div>

      {/* Impact Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Components Analyzed
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              {components.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Affected Components
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {affectedComponents}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              High Impact
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              {highImpact}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Remain Valid
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              {unchangedComponents}
            </p>

          </div>

        </div>

      </div>

      {/* Component Impact */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Component Impact Analysis
            </h2>

            <p className="text-sm text-gray-500">
              AI traces the changed requirement through the existing
              architecture.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {components.map((component) => (

            <button
              type="button"
              key={component.name}
              onClick={() => setSelectedComponent(component)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedComponent?.name === component.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {component.status === "Remains Valid" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />
                ) : component.impact === "High" ? (
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
                    {component.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {component.original}
                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      component.status === "Remains Valid"
                        ? "bg-green-100 text-green-700"
                        : component.status === "Needs Change"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {component.status}
                  </span>

                  <p className="text-xs text-gray-500 mt-2">
                    Impact: {component.impact}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Component */}
      {selectedComponent && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Lightbulb
              className="text-indigo-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-indigo-600">
                COMPONENT IMPACT DETAIL
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedComponent.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedComponent.reason}
              </p>

              <div className="mt-5 bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-indigo-600">
                  AI GUIDANCE
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {selectedComponent.status === "Remains Valid"
                    ? "Keep this component unchanged unless another dependent component requires an architectural adjustment."
                    : "Review this component and determine the minimum modification required to satisfy the new requirement."}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Decision Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <GitBranch className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Decision Impact
              </h2>

              <p className="text-sm text-gray-500">
                Determine which original decisions survive the requirement
                change.
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
                key={decision.title}
                className="border rounded-xl p-5"
              >

                <div className="flex items-center gap-4">

                  {decision.status === "Valid" ? (
                    <CheckCircle2
                      className="text-green-600"
                      size={24}
                    />
                  ) : (
                    <AlertTriangle
                      className="text-red-600"
                      size={24}
                    />
                  )}

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {decision.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {decision.explanation}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      decision.status === "Valid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {decision.status}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Impact Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Requirement Impact Flow
            </h2>

            <p className="text-sm text-gray-500">
              AI follows the requirement through your existing solution.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Changed Requirement",
            "Affected Components",
            "Dependent Decisions",
            "Valid Decisions",
            "Required Changes",
            "Updated Solution",
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

      {/* Candidate Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <MessageSquare
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              YOUR TURN
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              How would you modify the original solution?
            </h2>

            <p className="text-gray-600 mt-2">
              Do not redesign everything. Identify the smallest set of
              architectural changes required to support 100M requests/day.
            </p>

            <textarea
              placeholder="Explain which components you would change and why..."
              className="w-full mt-5 min-h-[140px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            />

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
            >
              Evaluate My Modification
            </button>

          </div>

        </div>

      </div>

      {/* Recommended Modifications */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Modification Guidance
              </h2>

              <p className="text-sm text-gray-500">
                Hints are provided without immediately giving the complete
                solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSteps(!showSteps)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSteps ? "Hide Hints" : "Show Hints"}
          </button>

        </div>

        {showSteps && (
          <div className="space-y-4 mt-6">

            {modificationSteps.map((step, index) => (

              <div
                key={step}
                className="flex items-center gap-4 border rounded-xl p-4"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold">
                  {step}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* What Remains Valid */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              WHAT REMAINS VALID
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Not every design decision needs to change.
            </h2>

            <p className="text-gray-600 mt-2">
              API routing, the general use of horizontal application scaling,
              and the core redirect flow remain valid. The major changes are
              concentrated around caching, database capacity, and analytics
              workloads.
            </p>

          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              When an interviewer changes a requirement, first trace the
              requirement to affected components. Then preserve decisions that
              still satisfy the new constraint and modify only the decisions
              that no longer fit.
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
          Analyze Requirement Impact
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
              Requirement change impact analysis completed successfully.
            </p>

          </div>

        </div>
      )}

      {/* Reset */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => {
            setSelectedComponent(null);
            setShowDecisions(false);
            setShowSteps(false);
            setAnalyzed(false);
          }}
          className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Reset Analysis
        </button>

      </div>

    </div>
  );
}