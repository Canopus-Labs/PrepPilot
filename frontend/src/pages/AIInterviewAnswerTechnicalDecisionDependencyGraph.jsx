import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Network,
  Zap,
} from "lucide-react";

const decisions = [
  {
    id: "cache",
    title: "Use Redis Cache",
    category: "Caching",
    score: 91,
    description:
      "Cache frequently accessed data to reduce database latency.",
    dependsOn: ["database"],
    affects: ["database", "scaling"],
  },
  {
    id: "database",
    title: "Use PostgreSQL",
    category: "Database",
    score: 88,
    description:
      "Use a relational database for transactional consistency.",
    dependsOn: [],
    affects: ["cache", "scaling"],
  },
  {
    id: "scaling",
    title: "Horizontal Scaling",
    category: "Infrastructure",
    score: 84,
    description:
      "Run multiple application instances behind a load balancer.",
    dependsOn: ["database", "cache"],
    affects: ["consistency"],
  },
  {
    id: "consistency",
    title: "Eventual Consistency",
    category: "Reliability",
    score: 76,
    description:
      "Allow non-critical updates to propagate asynchronously.",
    dependsOn: ["scaling"],
    affects: [],
  },
];

const impactData = [
  {
    decision: "Use Redis Cache",
    impact: "High",
    affected: 2,
    explanation:
      "Changing the cache strategy affects database load and may change scaling requirements.",
  },
  {
    decision: "Use PostgreSQL",
    impact: "High",
    affected: 2,
    explanation:
      "Changing the database can affect caching strategy and infrastructure scaling.",
  },
  {
    decision: "Horizontal Scaling",
    impact: "Medium",
    affected: 1,
    explanation:
      "Changing the scaling model can affect consistency requirements.",
  },
  {
    decision: "Eventual Consistency",
    impact: "Low",
    affected: 0,
    explanation:
      "This decision has fewer downstream dependencies in the current architecture.",
  },
];

const coachingQuestions = [
  "Which technical decision is the foundation for the others?",
  "What decisions depend directly on your database choice?",
  "What happens if the caching strategy changes?",
  "Which decision would require the most architectural changes if removed?",
  "Which decisions can change independently?",
  "What downstream effects would a scaling strategy change create?",
  "Can you explain the dependency chain from one decision to another?",
];

const recommendations = [
  {
    title: "Explain Foundational Decisions First",
    reason:
      "Some decisions influence multiple downstream architectural choices.",
    action:
      "Start with decisions such as database and storage selection before explaining dependent components.",
  },
  {
    title: "Practice Change-Impact Reasoning",
    reason:
      "Changing one architectural decision can invalidate assumptions elsewhere.",
    action:
      "Choose one decision and explain which dependent components must be reconsidered.",
  },
  {
    title: "Identify High-Impact Dependencies",
    reason:
      "Not every relationship has equal importance.",
    action:
      "Prioritize decisions that affect multiple components or system properties.",
  },
];

const workflow = [
  {
    title: "Extract",
    description: "Identify major technical decisions.",
  },
  {
    title: "Connect",
    description: "Map relationships between decisions.",
  },
  {
    title: "Rank",
    description: "Find high-impact dependencies.",
  },
  {
    title: "Simulate",
    description: "Change one decision.",
  },
  {
    title: "Explain",
    description: "Show downstream effects.",
  },
];

export default function AIInterviewAnswerTechnicalDecisionDependencyGraph() {
  const [selectedDecision, setSelectedDecision] =
    useState(decisions[0]);

  const [showGraph, setShowGraph] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [simulated, setSimulated] = useState(false);

  const impactLevel = selectedDecision.affects.length >= 2
    ? "High"
    : selectedDecision.affects.length === 1
    ? "Medium"
    : "Low";

  const impactStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Decision Dependency Graph
          </h1>

          <p className="text-gray-500">
            Visualize how one technical decision influences the rest of an
            interview solution.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                86
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              DECISION DEPENDENCY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Architectural Reasoning
            </h2>

            <p className="text-gray-600 mt-2">
              Major technical decisions have been connected and their
              downstream dependencies can be evaluated.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <GitBranch className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Decisions
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Network className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Dependencies
            </p>

            <p className="text-3xl font-black text-orange-600">
              5
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <Zap className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              High Impact
            </p>

            <p className="text-3xl font-black text-red-600">
              2
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Mapped
            </p>

            <p className="text-3xl font-black text-green-600">
              100%
            </p>
          </div>

        </div>

      </div>

      {/* Dependency Graph */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Network className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Decision Graph
              </h2>

              <p className="text-sm text-gray-500">
                Select a decision to inspect its dependencies and downstream
                effects.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowGraph(!showGraph)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showGraph ? "Hide Graph" : "Show Graph"}
          </button>

        </div>

        {showGraph && (
          <div className="mt-6">

            <div className="grid md:grid-cols-4 gap-4">

              {decisions.map((decision, index) => (

                <React.Fragment key={decision.id}>

                  <button
                    type="button"
                    onClick={() => setSelectedDecision(decision)}
                    className={`text-left border-2 rounded-2xl p-5 transition ${
                      selectedDecision.id === decision.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >

                    <div className="flex justify-between gap-2">

                      <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <GitBranch size={18} />
                      </div>

                      <span
                        className={`px-2 py-1 h-fit rounded-full text-xs font-semibold ${
                          impactStyles[
                            decision.affects.length >= 2
                              ? "High"
                              : decision.affects.length === 1
                              ? "Medium"
                              : "Low"
                          ]
                        }`}
                      >
                        {decision.affects.length >= 2
                          ? "High Impact"
                          : decision.affects.length === 1
                          ? "Medium Impact"
                          : "Low Impact"}
                      </span>

                    </div>

                    <h3 className="font-bold mt-4">
                      {decision.title}
                    </h3>

                    <p className="text-xs text-indigo-600 font-semibold mt-1">
                      {decision.category}
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      {decision.description}
                    </p>

                    <div className="mt-4">

                      <p className="text-xs text-gray-500">
                        Affects
                      </p>

                      <p className="font-bold text-indigo-700">
                        {decision.affects.length} decision
                        {decision.affects.length !== 1 ? "s" : ""}
                      </p>

                    </div>

                  </button>

                  {index < decisions.length - 1 && (
                    <div className="hidden md:flex items-center justify-center absolute" />
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="mt-6 bg-gray-50 rounded-2xl p-5">

              <p className="text-xs font-bold text-gray-500">
                DEPENDENCY FLOW
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">

                <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                  PostgreSQL
                </span>

                <ArrowRight className="text-gray-400" />

                <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                  Redis Cache
                </span>

                <ArrowRight className="text-gray-400" />

                <span className="px-4 py-2 rounded-xl bg-orange-100 text-orange-700 font-semibold">
                  Horizontal Scaling
                </span>

                <ArrowRight className="text-gray-400" />

                <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
                  Consistency Model
                </span>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Selected Decision */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED DECISION
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedDecision.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedDecision.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DECISION SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedDecision.score}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DIRECT DEPENDENCIES
                </p>

                <p className="text-3xl font-black text-orange-600">
                  {selectedDecision.dependsOn.length}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DOWNSTREAM IMPACT
                </p>

                <p
                  className={`text-3xl font-black ${
                    impactLevel === "High"
                      ? "text-red-600"
                      : impactLevel === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {impactLevel}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Impact Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Zap className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Decision Impact Analysis
              </h2>

              <p className="text-sm text-gray-500">
                See how strongly each decision affects the rest of the solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowImpact(!showImpact)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showImpact ? "Hide Impact" : "Show Impact"}
          </button>

        </div>

        {showImpact && (
          <div className="space-y-4 mt-6">

            {impactData.map((item) => (

              <div
                key={item.decision}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {item.decision}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      impactStyles[item.impact]
                    }`}
                  >
                    {item.impact} Impact
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Affects {item.affected} downstream decision
                  {item.affected !== 1 ? "s" : ""}
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  {item.explanation}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Simulation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              WHAT-IF SIMULATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              What happens if PostgreSQL is replaced?
            </h2>

            <p className="text-gray-600 mt-2">
              The AI can simulate changing a foundational decision and identify
              which downstream decisions may need to be reconsidered.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CHANGED DECISION
                </p>

                <p className="font-bold text-red-600 mt-1">
                  Database
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  AFFECTED AREAS
                </p>

                <p className="text-3xl font-black text-orange-600">
                  2
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RISK
                </p>

                <p className="font-bold text-red-600 mt-1">
                  High
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                AI IMPACT EXPLANATION
              </p>

              <p className="text-sm font-semibold text-indigo-700 mt-2">
                Changing the database may require reconsidering the caching
                strategy and horizontal scaling approach because data access,
                consistency, and workload characteristics can change.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Dependency Reasoning Questions
              </h2>

              <p className="text-sm text-gray-500">
                Practice understanding how architectural decisions interact.
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
                AI Architecture Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve reasoning about technical decision dependencies.
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
                Dependency Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI builds and tests the technical decision graph.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
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

      {/* Simulate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setSimulated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Simulate Decision Change
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {simulated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                SIMULATION COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Downstream decision impact identified.
              </h2>

              <p className="text-gray-600 mt-2">
                Changing the selected foundational decision can affect caching,
                scaling, and consistency assumptions. Candidates should
                reconsider each dependent decision rather than replacing the
                entire solution automatically.
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
              AI SYSTEM-DESIGN PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Technical decisions rarely exist in isolation.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates understand not only why a decision works, but
              also which other decisions depend on it and what must change when
              its assumptions are no longer valid.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}