import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
  Server,
  Clock,
  Cpu,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const constraints = [
  "10 million requests per day",
  "p95 latency below 200ms",
  "Limited infrastructure budget",
  "99.9% availability requirement",
  "Small engineering team",
];

const feasibilityAreas = [
  {
    name: "Resource Requirements",
    score: 82,
    icon: Cpu,
    status: "Feasible",
  },
  {
    name: "Infrastructure",
    score: 74,
    icon: Server,
    status: "Mostly Feasible",
  },
  {
    name: "Latency",
    score: 68,
    icon: Clock,
    status: "Needs Review",
  },
  {
    name: "Implementation Complexity",
    score: 79,
    icon: Target,
    status: "Feasible",
  },
];

const risks = [
  {
    title: "Infrastructure assumption",
    description:
      "The proposed architecture assumes multiple high-capacity services despite the limited infrastructure budget.",
    severity: "High",
  },
  {
    title: "Latency risk",
    description:
      "Multiple synchronous service calls could make the p95 latency target difficult to maintain.",
    severity: "Medium",
  },
  {
    title: "Operational complexity",
    description:
      "The design introduces several independently managed components for a small engineering team.",
    severity: "Medium",
  },
];

const alternatives = [
  {
    title: "Use asynchronous processing",
    reason:
      "Moves non-critical work away from the synchronous request path and reduces latency pressure.",
  },
  {
    title: "Start with a modular monolith",
    reason:
      "Reduces operational overhead while keeping components logically separated.",
  },
  {
    title: "Introduce caching",
    reason:
      "Reduces repeated database or service calls for frequently requested data.",
  },
];

export default function AIInterviewAnswerTechnicalFeasibilityChecker() {
  const [solution, setSolution] = useState("");
  const [checked, setChecked] = useState(false);
  const [expandedRisk, setExpandedRisk] = useState(null);

  const overallScore = Math.round(
    feasibilityAreas.reduce((sum, item) => sum + item.score, 0) /
      feasibilityAreas.length
  );

  const runFeasibilityCheck = () => {
    if (!solution.trim()) return;
    setChecked(true);
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
            AI Technical Feasibility Checker
          </h1>

          <p className="text-gray-500">
            Evaluate whether your technical solution is realistic under the
            actual interview constraints.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Design a service that processes large-scale user requests while
              maintaining low latency and high availability.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Required Resources
            </p>

            <p className="font-semibold mt-2">
              Compute, database, caching, networking, monitoring, and storage.
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Engineering Context
            </p>

            <p className="font-semibold mt-2">
              Small team with limited infrastructure budget.
            </p>

          </div>

        </div>

      </div>

      {/* Constraints */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Given Constraints
            </h2>

            <p className="text-sm text-gray-500">
              Your solution must be practical within these conditions.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3 mt-5">

          {constraints.map((constraint) => (
            <span
              key={constraint}
              className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-700"
            >
              {constraint}
            </span>
          ))}

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Your Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              Describe your architecture, resources, assumptions, and major
              technical decisions.
            </p>
          </div>

        </div>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={9}
          placeholder="Example: I would use multiple microservices behind a load balancer, a distributed database, Redis caching, and multiple replicas..."
          className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={runFeasibilityCheck}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Run Feasibility Check
        </button>

      </div>

      {/* Results */}
      {checked && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <CheckCircle2
                  className="text-indigo-600"
                  size={42}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Overall Technical Feasibility
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    {overallScore}%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Mostly Feasible
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your solution is technically viable, but several practical
                  assumptions should be addressed before implementation.
                </p>

                <div className="h-4 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${overallScore}%` }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Feasibility Areas */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Feasibility Breakdown
                </h2>

                <p className="text-sm text-gray-500">
                  Evaluate different dimensions of practical feasibility.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              {feasibilityAreas.map((area) => {

                const Icon = area.icon;

                return (
                  <div
                    key={area.name}
                    className="border rounded-2xl p-5"
                  >

                    <div className="flex items-center gap-3">

                      <div className="p-3 bg-indigo-50 rounded-xl">
                        <Icon className="text-indigo-600" size={22} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <h3 className="font-bold">
                            {area.name}
                          </h3>

                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              area.score >= 80
                                ? "bg-green-100 text-green-700"
                                : area.score >= 70
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {area.status}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-3 mt-5">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            area.score >= 80
                              ? "bg-green-500"
                              : area.score >= 70
                              ? "bg-indigo-500"
                              : "bg-orange-500"
                          }`}
                          style={{ width: `${area.score}%` }}
                        />

                      </div>

                      <strong>
                        {area.score}%
                      </strong>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Unrealistic Assumptions */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Unrealistic Assumptions & Risks
                </h2>

                <p className="text-gray-600 mt-2">
                  AI identified assumptions that could make the proposed
                  solution difficult to operate in the given environment.
                </p>

                <div className="space-y-4 mt-5">

                  {risks.map((risk, index) => {

                    const isExpanded = expandedRisk === index;

                    return (
                      <button
                        type="button"
                        key={risk.title}
                        onClick={() =>
                          setExpandedRisk(
                            isExpanded ? null : index
                          )
                        }
                        className="w-full text-left bg-white rounded-xl p-5"
                      >

                        <div className="flex items-center gap-3">

                          <AlertTriangle
                            className={
                              risk.severity === "High"
                                ? "text-red-600"
                                : "text-orange-600"
                            }
                          />

                          <div className="flex-1">

                            <div className="flex justify-between gap-3">

                              <h3 className="font-bold">
                                {risk.title}
                              </h3>

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  risk.severity === "High"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {risk.severity}
                              </span>

                            </div>

                          </div>

                        </div>

                        {isExpanded && (
                          <p className="text-sm text-gray-600 mt-4">
                            {risk.description}
                          </p>
                        )}

                      </button>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

          {/* Resource Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Server className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Resource Feasibility Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Check whether the solution's required resources match the
                  problem context.
                </p>

              </div>

            </div>

            <div className="overflow-x-auto mt-6">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3">
                      Resource
                    </th>

                    <th className="text-left p-3">
                      Requirement
                    </th>

                    <th className="text-left p-3">
                      Feasibility
                    </th>

                    <th className="text-left p-3">
                      AI Observation
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="p-3 font-semibold">
                      Compute
                    </td>

                    <td className="p-3">
                      Multiple application replicas
                    </td>

                    <td className="p-3 text-green-600 font-semibold">
                      Feasible
                    </td>

                    <td className="p-3 text-gray-500">
                      Reasonable for expected traffic.
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-3 font-semibold">
                      Database
                    </td>

                    <td className="p-3">
                      Distributed database
                    </td>

                    <td className="p-3 text-orange-600 font-semibold">
                      Review
                    </td>

                    <td className="p-3 text-gray-500">
                      May introduce unnecessary operational complexity.
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-3 font-semibold">
                      Caching
                    </td>

                    <td className="p-3">
                      Distributed cache
                    </td>

                    <td className="p-3 text-green-600 font-semibold">
                      Feasible
                    </td>

                    <td className="p-3 text-gray-500">
                      Helps reduce database load.
                    </td>

                  </tr>

                  <tr>

                    <td className="p-3 font-semibold">
                      Infrastructure
                    </td>

                    <td className="p-3">
                      Multi-region deployment
                    </td>

                    <td className="p-3 text-red-600 font-semibold">
                      Risky
                    </td>

                    <td className="p-3 text-gray-500">
                      Potentially excessive for the current team and budget.
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Alternatives */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Practical Alternatives
                </h2>

                <p className="text-sm text-gray-500">
                  AI-suggested alternatives that improve feasibility without
                  changing the core objective.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {alternatives.map((alternative) => (

                <div
                  key={alternative.title}
                  className="border rounded-xl p-5"
                >

                  <h3 className="font-bold">
                    {alternative.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {alternative.reason}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Interview Follow-up */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Simulated Interviewer Follow-up
                </h2>

                <p className="font-semibold text-gray-700 mt-3">
                  "Your design requires several distributed services, but the
                  team has limited operational resources. Why is this
                  architecture justified?"
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Explain the trade-off between architectural complexity,
                  scalability, cost, and team capacity.
                </p>

              </div>

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Feasibility Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution is theoretically sound and mostly practical.
                  The biggest concern is operational complexity relative to the
                  available team and infrastructure budget. A simpler
                  architecture with caching and asynchronous processing would
                  provide a more realistic starting point.
                </p>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Practice explaining why a technically valid design is
                  practical within real-world constraints. Focus on cost,
                  infrastructure, team capability, latency, and operational
                  complexity.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Feasibility Challenge
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}