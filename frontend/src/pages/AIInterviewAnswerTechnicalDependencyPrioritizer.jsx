import React, { useState } from "react";
import {
  Brain,
  Network,
  AlertTriangle,
  CheckCircle2,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

const dependencies = [
  {
    name: "Primary Database",
    type: "Data Layer",
    importance: 96,
    failureImpact: 94,
    risk: "Critical",
    description:
      "Stores the application's primary data and is required by most core operations.",
    failure:
      "A database outage could make core read and write operations unavailable.",
    alternative:
      "Use database replication, failover, backups, and carefully designed read replicas.",
  },
  {
    name: "Authentication Service",
    type: "Security",
    importance: 91,
    failureImpact: 88,
    risk: "Critical",
    description:
      "Controls user authentication and access to protected resources.",
    failure:
      "Users may be unable to authenticate or access protected functionality.",
    alternative:
      "Introduce redundant authentication infrastructure and carefully designed session handling.",
  },
  {
    name: "Cache Layer",
    type: "Performance",
    importance: 73,
    failureImpact: 54,
    risk: "Medium",
    description:
      "Reduces repeated database reads and improves response latency.",
    failure:
      "The system may remain functional but experience increased database load and latency.",
    alternative:
      "Design the application to gracefully fall back to the primary data store.",
  },
  {
    name: "External Payment API",
    type: "External Service",
    importance: 84,
    failureImpact: 81,
    risk: "High",
    description:
      "Processes payment transactions through an external provider.",
    failure:
      "Payment operations may fail even when the rest of the application remains available.",
    alternative:
      "Use provider failover where appropriate and implement retry, timeout, and idempotency strategies.",
  },
  {
    name: "Logging Service",
    type: "Observability",
    importance: 52,
    failureImpact: 31,
    risk: "Low",
    description:
      "Collects logs used for debugging and operational visibility.",
    failure:
      "Debugging and monitoring quality may decrease, but core application functionality can continue.",
    alternative:
      "Buffer logs locally and support an independent fallback logging mechanism.",
  },
];

const dependencyFactors = [
  {
    name: "Business Criticality",
    score: 91,
    description:
      "Measures how essential the dependency is to core functionality.",
  },
  {
    name: "Failure Impact",
    score: 83,
    description:
      "Measures the consequences if the dependency becomes unavailable.",
  },
  {
    name: "Coupling",
    score: 78,
    description:
      "Estimates how many components depend directly on the dependency.",
  },
  {
    name: "Recovery Difficulty",
    score: 69,
    description:
      "Considers how difficult it would be to recover from dependency failure.",
  },
  {
    name: "Availability Risk",
    score: 62,
    description:
      "Estimates the likelihood that the dependency could become unavailable.",
  },
];

const coachingQuestions = [
  "Which dependency would cause the largest portion of the system to fail?",
  "Can the system continue operating if this dependency becomes unavailable?",
  "How many components directly depend on this service?",
  "What is the expected recovery strategy if the dependency fails?",
  "Is there a fallback or alternative implementation?",
  "Could this dependency become a single point of failure?",
  "What trade-off would an alternative dependency introduce?",
];

const recommendations = [
  {
    title: "Protect Critical Dependencies",
    reason:
      "The primary database and authentication service have high failure impact.",
    action:
      "Discuss redundancy, failover, recovery, and graceful degradation strategies.",
  },
  {
    title: "Reduce Single Points of Failure",
    reason:
      "Highly coupled dependencies can affect many components simultaneously.",
    action:
      "Identify whether critical dependencies can be replicated or isolated.",
  },
  {
    title: "Design Explicit Fallbacks",
    reason:
      "Not every dependency needs complete redundancy, but important failures should have a defined response.",
    action:
      "Explain what the system does when each high-risk dependency becomes unavailable.",
  },
];

const workflow = [
  {
    title: "Extract",
    description: "Identify technical dependencies.",
  },
  {
    title: "Map",
    description: "Connect dependencies to system components.",
  },
  {
    title: "Rank",
    description: "Score importance and failure impact.",
  },
  {
    title: "Analyze",
    description: "Evaluate dependency failure scenarios.",
  },
  {
    title: "Mitigate",
    description: "Suggest alternatives and safeguards.",
  },
];

export default function AIInterviewAnswerTechnicalDependencyPrioritizer() {
  const [selectedDependency, setSelectedDependency] =
    useState(dependencies[0]);

  const [showDependencies, setShowDependencies] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const dependencyScore = 88;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Dependency Prioritizer
          </h1>

          <p className="text-gray-500">
            Identify and rank the dependencies that have the greatest impact
            on your technical solution.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {dependencyScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              DEPENDENCY ANALYSIS SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Dependency Awareness
            </h2>

            <p className="text-gray-600 mt-2">
              The solution identifies its major dependencies and recognizes
              the database and authentication service as critical components.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Network className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Dependencies
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <ShieldAlert className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical
            </p>

            <p className="text-3xl font-black text-red-600">
              2
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Risk
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Low Risk
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

        </div>

      </div>

      {/* Dependency Ranking */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Network className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Dependency Risk Ranking
              </h2>

              <p className="text-sm text-gray-500">
                Dependencies are ranked by importance and potential failure
                impact.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowDependencies(!showDependencies)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showDependencies
              ? "Hide Dependencies"
              : "Show Dependencies"}
          </button>

        </div>

        {showDependencies && (
          <div className="space-y-4 mt-6">

            {dependencies.map((dependency, index) => (

              <button
                type="button"
                key={dependency.name}
                onClick={() =>
                  setSelectedDependency(dependency)
                }
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedDependency.name === dependency.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {dependency.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {dependency.type}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          dependency.risk === "Critical"
                            ? "bg-red-100 text-red-700"
                            : dependency.risk === "High"
                            ? "bg-orange-100 text-orange-700"
                            : dependency.risk === "Medium"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {dependency.risk}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-4">

                      <div>

                        <div className="flex justify-between text-xs">

                          <span>
                            Importance
                          </span>

                          <span className="font-bold">
                            {dependency.importance}%
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-2">

                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{
                              width: `${dependency.importance}%`,
                            }}
                          />

                        </div>

                      </div>

                      <div>

                        <div className="flex justify-between text-xs">

                          <span>
                            Failure Impact
                          </span>

                          <span className="font-bold">
                            {dependency.failureImpact}%
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-2">

                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{
                              width: `${dependency.failureImpact}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Dependency */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <ShieldAlert
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED DEPENDENCY
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedDependency.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedDependency.description}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                IF THIS DEPENDENCY FAILS
              </p>

              <p className="font-semibold text-red-700 mt-2">
                {selectedDependency.failure}
              </p>

            </div>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs text-gray-500">
                POSSIBLE MITIGATION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedDependency.alternative}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Dependency Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Dependency Risk Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to determine dependency importance and risk.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowFactors(!showFactors)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {dependencyFactors.map((factor) => (

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
                AI Dependency Reasoning Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help candidates identify critical dependencies.
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
                AI Dependency Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve reliability by addressing high-impact dependencies.
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
                How the AI identifies and prioritizes technical dependencies.
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Dependencies
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
                Technical dependencies prioritized successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The highest-impact dependencies should be discussed first,
                especially those that can become single points of failure.
                Explain both the dependency's role and your mitigation strategy.
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
              Not every dependency deserves the same level of attention.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong system-design reasoning identifies which dependencies are
              critical, explains what happens when they fail, and provides
              appropriate mitigation strategies for the highest-risk
              components.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}