import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  Gauge,
  Database,
  Server,
  Network,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Target,
} from "lucide-react";

const bottlenecks = [
  {
    name: "Primary Database",
    type: "Database",
    severity: "Critical",
    impact: 91,
    description:
      "The primary database receives every read and write request, making it the main throughput and latency constraint as traffic increases.",
    evidence:
      "Most application requests depend directly on database operations.",
    optimization: [
      "Introduce read replicas.",
      "Add a caching layer for frequent reads.",
      "Review database indexing.",
      "Separate analytics workloads.",
    ],
  },
  {
    name: "Application Processing",
    type: "Compute",
    severity: "Medium",
    impact: 62,
    description:
      "Application processing consumes CPU for request validation and transformation, but it is not currently the dominant constraint.",
    evidence:
      "Application instances can be horizontally scaled.",
    optimization: [
      "Profile expensive operations.",
      "Use horizontal scaling.",
      "Optimize repeated computation.",
    ],
  },
  {
    name: "Network Requests",
    type: "Network",
    severity: "Low",
    impact: 37,
    description:
      "Network communication adds some latency but does not currently limit overall throughput.",
    evidence:
      "Requests are relatively small and services are located within the same region.",
    optimization: [
      "Use connection pooling.",
      "Reduce unnecessary service calls.",
      "Compress larger responses.",
    ],
  },
];

const architecture = [
  {
    name: "Client",
    icon: Server,
    description: "Sends requests to the API.",
  },
  {
    name: "API Gateway",
    icon: Network,
    description: "Routes incoming requests.",
  },
  {
    name: "Application",
    icon: Server,
    description: "Processes business logic.",
  },
  {
    name: "Database",
    icon: Database,
    description: "Stores and retrieves application data.",
  },
];

const followUps = [
  "What happens when database traffic becomes 10× higher?",
  "Why is the database the bottleneck instead of the application layer?",
  "Would caching reduce the bottleneck? What data would you cache?",
  "When would read replicas stop being sufficient?",
];

export default function AIInterviewAnswerTechnicalBottleneckIdentifier() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(
    bottlenecks[0]
  );
  const [showOptimization, setShowOptimization] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const criticalCount = bottlenecks.filter(
    (item) => item.severity === "Critical"
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
            AI Technical Bottleneck Identifier
          </h1>

          <p className="text-gray-500">
            Find the most important performance bottleneck in your proposed
            technical solution instead of treating every issue equally.
          </p>

        </div>

      </div>

      {/* Main Bottleneck */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="w-20 h-20 rounded-full bg-white border-8 border-red-500 flex items-center justify-center">

            <AlertTriangle
              className="text-red-600"
              size={34}
            />

          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              PRIMARY BOTTLENECK
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              {selectedBottleneck.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedBottleneck.description}
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Primary Impact
            </p>

            <p className="text-3xl font-black text-red-600">
              {selectedBottleneck.impact}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical Issues
            </p>

            <p className="text-3xl font-black text-orange-600">
              {criticalCount}
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Gauge
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Issues Compared
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {bottlenecks.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Prioritized
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

        </div>

      </div>

      {/* Architecture */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Network className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Proposed Architecture
            </h2>

            <p className="text-sm text-gray-500">
              AI traces requests through the major components to identify
              where performance is most constrained.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {architecture.map((component, index) => {

            const Icon = component.icon;

            return (
              <React.Fragment key={component.name}>

                <div
                  className={`border rounded-xl p-4 min-w-[150px] ${
                    component.name === selectedBottleneck.name
                      ? "border-red-500 bg-red-50"
                      : ""
                  }`}
                >

                  <Icon
                    className={
                      component.name === selectedBottleneck.name
                        ? "text-red-600"
                        : "text-indigo-600"
                    }
                    size={24}
                  />

                  <h3 className="font-bold mt-2">
                    {component.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {component.description}
                  </p>

                </div>

                {index < architecture.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={20}
                  />
                )}

              </React.Fragment>
            );
          })}

        </div>

      </div>

      {/* Bottleneck Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Performance Concern Comparison
            </h2>

            <p className="text-sm text-gray-500">
              AI ranks possible performance issues by their estimated impact.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {bottlenecks.map((bottleneck) => (

            <button
              type="button"
              key={bottleneck.name}
              onClick={() => setSelectedBottleneck(bottleneck)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedBottleneck.name === bottleneck.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="flex-1">

                  <h3 className="font-bold">
                    {bottleneck.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {bottleneck.type}
                  </p>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className={`h-full rounded-full ${
                        bottleneck.severity === "Critical"
                          ? "bg-red-500"
                          : bottleneck.severity === "Medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${bottleneck.impact}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="text-center">

                  <p className="text-xs text-gray-500">
                    Impact
                  </p>

                  <p className="text-2xl font-black">
                    {bottleneck.impact}%
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    bottleneck.severity === "Critical"
                      ? "bg-red-100 text-red-700"
                      : bottleneck.severity === "Medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {bottleneck.severity}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Bottleneck */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              HIGHEST-IMPACT BOTTLENECK
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {selectedBottleneck.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedBottleneck.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-indigo-600">
                  EVIDENCE
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {selectedBottleneck.evidence}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-indigo-600">
                  ESTIMATED IMPACT
                </p>

                <p className="text-3xl font-black text-red-600 mt-1">
                  {selectedBottleneck.impact}%
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Relative performance impact
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Optimization Directions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Optimization Directions
              </h2>

              <p className="text-sm text-gray-500">
                Focus optimization effort on the highest-impact bottleneck.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowOptimization(!showOptimization)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showOptimization
              ? "Hide Directions"
              : "Show Directions"}
          </button>

        </div>

        {showOptimization && (
          <div className="space-y-3 mt-6">

            {selectedBottleneck.optimization.map(
              (item, index) => (

                <div
                  key={item}
                  className="flex items-center gap-4 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="font-semibold">
                    {item}
                  </p>

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* Interview Follow-ups */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare
              className="text-orange-600"
              size={24}
            />

            <div>

              <h2 className="font-bold text-lg">
                Bottleneck Follow-Up Questions
              </h2>

              <p className="text-sm text-gray-500">
                Practice defending your bottleneck analysis.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFollowUps(!showFollowUps)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showFollowUps
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showFollowUps && (
          <div className="space-y-3 mt-6">

            {followUps.map((question, index) => (

              <div
                key={question}
                className="bg-white rounded-xl p-4 flex gap-4"
              >

                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold">
                  {question}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Reasoning */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI PRIORITIZATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Focus on the primary bottleneck first.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong technical explanation does not need to list every
              possible performance concern. Identify the constraint that most
              limits throughput or latency, explain why it is the bottleneck,
              and then propose targeted optimizations.
            </p>

          </div>

        </div>

      </div>

      {/* Analyze Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Technical Solution
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
              Technical bottleneck analysis completed successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}