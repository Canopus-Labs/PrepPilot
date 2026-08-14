import React, { useState } from "react";
import {
  Brain,
  Network,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Target,
  GitBranch,
} from "lucide-react";

const components = [
  {
    name: "API Gateway",
    type: "Entry Point",
    impact: "Low",
    status: "Unaffected",
    reason: "The changed requirement does not directly alter request routing.",
  },
  {
    name: "Order Service",
    type: "Core Service",
    impact: "High",
    status: "Directly Affected",
    reason: "Business logic must support the new requirement.",
  },
  {
    name: "PostgreSQL",
    type: "Database",
    impact: "High",
    status: "Redesign Needed",
    reason: "The data model requires additional fields and indexing.",
  },
  {
    name: "Redis Cache",
    type: "Cache",
    impact: "Medium",
    status: "Review Required",
    reason: "Cached representations may become stale after the data-model change.",
  },
  {
    name: "Notification Service",
    type: "Dependent Service",
    impact: "Medium",
    status: "Cascading Impact",
    reason: "Notification payloads depend on updated order information.",
  },
];

const dependencies = [
  {
    from: "Order Service",
    to: "PostgreSQL",
    impact: "Direct",
  },
  {
    from: "Order Service",
    to: "Redis Cache",
    impact: "Cascading",
  },
  {
    from: "Order Service",
    to: "Notification Service",
    impact: "Cascading",
  },
  {
    from: "API Gateway",
    to: "Order Service",
    impact: "Indirect",
  },
];

const redesignAreas = [
  {
    title: "Data Model",
    priority: "Critical",
    description:
      "Update the database schema and indexes to represent the new requirement.",
  },
  {
    title: "Business Logic",
    priority: "High",
    description:
      "Modify order-processing rules to support the changed requirement.",
  },
  {
    title: "Cache Strategy",
    priority: "Medium",
    description:
      "Review cache keys, invalidation, and stored representations.",
  },
  {
    title: "Notifications",
    priority: "Medium",
    description:
      "Verify that downstream notification payloads remain correct.",
  },
];

const workflow = [
  {
    title: "Map",
    description: "Identify solution components.",
  },
  {
    title: "Link",
    description: "Build dependency relationships.",
  },
  {
    title: "Change",
    description: "Apply the new requirement.",
  },
  {
    title: "Trace",
    description: "Follow cascading effects.",
  },
  {
    title: "Redesign",
    description: "Identify required modifications.",
  },
];

export default function AIInterviewQuestionSolutionModificationImpactMap() {
  const [showMap, setShowMap] = useState(true);
  const [showDependencies, setShowDependencies] = useState(false);
  const [showRedesign, setShowRedesign] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const highImpact = components.filter(
    (component) => component.impact === "High"
  ).length;

  const affected = components.filter(
    (component) => component.status !== "Unaffected"
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
            AI Solution Modification Impact Map
          </h1>

          <p className="text-gray-500">
            Visualize how a requirement change propagates through your
            technical solution.
          </p>

        </div>

      </div>

      {/* Main Alert */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <GitBranch
              className="text-orange-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              REQUIREMENT CHANGE DETECTED
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              4 Components Require Review
            </h2>

            <p className="text-gray-600 mt-2">
              The new requirement directly affects the Order Service and
              PostgreSQL, with additional cascading effects on dependent
              components.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Network
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Components
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {components.length}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Impact
            </p>

            <p className="text-3xl font-black text-red-600">
              {highImpact}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <GitBranch
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Affected
            </p>

            <p className="text-3xl font-black text-orange-600">
              {affected}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Dependencies
            </p>

            <p className="text-3xl font-black text-purple-600">
              {dependencies.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Unaffected
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

        </div>

      </div>

      {/* Requirement Change */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>

            <h2 className="font-bold text-lg">
              Requirement Modification
            </h2>

            <p className="text-sm text-gray-500">
              The AI compares the original requirement with the changed one.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs font-bold text-gray-500">
              ORIGINAL REQUIREMENT
            </p>

            <p className="text-gray-700 mt-2">
              Orders only need to store a basic customer ID and product list.
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs font-bold text-orange-600">
              NEW REQUIREMENT
            </p>

            <p className="text-gray-700 mt-2 font-semibold">
              Orders must now support multiple delivery addresses and
              address-specific delivery status.
            </p>

          </div>

        </div>

      </div>

      {/* Impact Map */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Network className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Solution Impact Map
              </h2>

              <p className="text-sm text-gray-500">
                Follow the requirement change through the system.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowMap(!showMap)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMap
              ? "Hide Map"
              : "Show Map"}
          </button>

        </div>

        {showMap && (
          <div className="mt-6">

            <div className="bg-gray-50 rounded-2xl p-6 overflow-x-auto">

              <div className="min-w-[750px]">

                <div className="flex items-center justify-center gap-4">

                  <div className="border-2 border-gray-300 bg-white rounded-2xl p-5 w-44 text-center">

                    <Network
                      className="mx-auto text-gray-500"
                      size={28}
                    />

                    <p className="font-bold mt-3">
                      API Gateway
                    </p>

                    <span className="text-xs text-green-600 font-semibold">
                      Unaffected
                    </span>

                  </div>

                  <ArrowRight className="text-gray-400" />

                  <div className="border-2 border-red-400 bg-red-50 rounded-2xl p-5 w-48 text-center">

                    <Target
                      className="mx-auto text-red-600"
                      size={28}
                    />

                    <p className="font-bold mt-3">
                      Order Service
                    </p>

                    <span className="text-xs text-red-600 font-semibold">
                      Direct Impact
                    </span>

                  </div>

                  <ArrowRight className="text-gray-400" />

                  <div className="border-2 border-red-400 bg-red-50 rounded-2xl p-5 w-48 text-center">

                    <Network
                      className="mx-auto text-red-600"
                      size={28}
                    />

                    <p className="font-bold mt-3">
                      PostgreSQL
                    </p>

                    <span className="text-xs text-red-600 font-semibold">
                      Redesign Needed
                    </span>

                  </div>

                </div>

                <div className="flex justify-center mt-5">

                  <ArrowRight
                    className="text-orange-500 rotate-90"
                    size={28}
                  />

                </div>

                <div className="flex justify-center gap-10">

                  <div className="border-2 border-orange-400 bg-orange-50 rounded-2xl p-5 w-48 text-center">

                    <RefreshCw
                      className="mx-auto text-orange-600"
                      size={28}
                    />

                    <p className="font-bold mt-3">
                      Redis Cache
                    </p>

                    <span className="text-xs text-orange-600 font-semibold">
                      Review Required
                    </span>

                  </div>

                  <div className="border-2 border-orange-400 bg-orange-50 rounded-2xl p-5 w-48 text-center">

                    <Target
                      className="mx-auto text-orange-600"
                      size={28}
                    />

                    <p className="font-bold mt-3">
                      Notifications
                    </p>

                    <span className="text-xs text-orange-600 font-semibold">
                      Cascading Impact
                    </span>

                  </div>

                </div>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-red-50 rounded-xl p-4">

                <p className="text-xs font-bold text-red-600">
                  DIRECT IMPACT
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Components directly responsible for implementing the new
                  requirement.
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-4">

                <p className="text-xs font-bold text-orange-600">
                  CASCADING IMPACT
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Components affected because they depend on changed data or
                  behavior.
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-4">

                <p className="text-xs font-bold text-green-600">
                  UNAFFECTED
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Components whose responsibilities remain unchanged.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Component Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Component Impact Analysis
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Detailed impact detected across the proposed architecture.
        </p>

        <div className="space-y-4 mt-6">

          {components.map((component) => (

            <div
              key={component.name}
              className="border rounded-2xl p-5"
            >

              <div className="flex justify-between gap-4">

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="font-bold">
                      {component.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                      {component.type}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {component.reason}
                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      component.impact === "High"
                        ? "bg-red-100 text-red-700"
                        : component.impact === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {component.impact}
                  </span>

                  <p className="text-xs text-gray-500 mt-2">
                    {component.status}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Dependencies */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Dependency Relationships
            </h2>

            <p className="text-sm text-gray-500">
              Understand how impact propagates between components.
            </p>

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

            {dependencies.map((dependency) => (

              <div
                key={`${dependency.from}-${dependency.to}`}
                className="border rounded-xl p-4 flex items-center gap-4"
              >

                <span className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold">
                  {dependency.from}
                </span>

                <ArrowRight className="text-gray-400" />

                <span className="px-3 py-2 rounded-xl bg-purple-100 text-purple-700 text-sm font-semibold">
                  {dependency.to}
                </span>

                <span
                  className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${
                    dependency.impact === "Direct"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {dependency.impact}
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Redesign Areas */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Areas Requiring Redesign
              </h2>

              <p className="text-sm text-gray-500">
                AI identifies where the architecture may need modification.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRedesign(!showRedesign)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRedesign
              ? "Hide Areas"
              : "Show Areas"}
          </button>

        </div>

        {showRedesign && (
          <div className="space-y-4 mt-6">

            {redesignAreas.map((area, index) => (

              <div
                key={area.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {area.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          area.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : area.priority === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {area.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {area.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Explanation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI CASCADING EFFECT ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              One requirement change can propagate through the architecture.
            </h2>

            <p className="text-gray-600 mt-2">
              The changed delivery-address requirement directly modifies order
              processing and database storage. Because other components depend
              on order data, cache entries and notification payloads must also
              be reviewed.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                IMPACT CHAIN
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Requirement → Order Service → Database → Cache → Notifications
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Practice Challenge */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              INTERVIEW PRACTICE
            </p>

            <h2 className="text-xl font-bold mt-1">
              Which component would you modify first?
            </h2>

            <p className="text-gray-500 mt-2">
              Explain your reasoning before looking at the AI recommendation.
            </p>

            <div className="grid md:grid-cols-3 gap-3 mt-5">

              {[
                "API Gateway",
                "Order Service",
                "Notification Service",
              ].map((option) => (

                <button
                  type="button"
                  key={option}
                  className="border rounded-xl p-4 text-left hover:border-indigo-500 hover:bg-indigo-50"
                >
                  <p className="font-semibold">
                    {option}
                  </p>
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Reanalyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Impact Map
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Rebuild the dependency analysis after modifying your proposed
              architecture.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Recalculate Impact
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Impact map recalculated successfully.
              </div>
            )}

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
                Modification Impact Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI traces requirement changes through the solution.
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
              Trace the change, don't just react to it.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong system-design reasoning means understanding how a changed
              requirement propagates through components, dependencies, data
              models, and downstream services. Identify the direct impact first,
              then follow the dependency chain.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}