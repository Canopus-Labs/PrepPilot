import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  Settings,
  Lightbulb,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const risks = [
  {
    category: "Scalability",
    severity: "High",
    title: "Single Database Bottleneck",
    impact:
      "A single database instance may become a bottleneck as request volume and stored data increase.",
    mitigation:
      "Consider read replicas, caching, partitioning, or horizontal scaling when traffic grows.",
  },
  {
    category: "Reliability",
    severity: "High",
    title: "Single Point of Failure",
    impact:
      "Failure of the primary service could make the entire application unavailable.",
    mitigation:
      "Introduce redundancy, health checks, failover, and appropriate recovery mechanisms.",
  },
  {
    category: "Performance",
    severity: "Medium",
    title: "Repeated Database Reads",
    impact:
      "Frequently requested data may create unnecessary database load and increase response latency.",
    mitigation:
      "Use caching for suitable read-heavy workloads and define an appropriate invalidation strategy.",
  },
  {
    category: "Maintainability",
    severity: "Medium",
    title: "Tightly Coupled Components",
    impact:
      "Changes to one component may require modifications across multiple parts of the system.",
    mitigation:
      "Define clear service boundaries and interfaces between major components.",
  },
];

const followUps = [
  "What happens if the primary database becomes unavailable?",
  "How would your design behave if traffic increased by 10x?",
  "Where would you introduce caching and what consistency issues could it create?",
  "How would you monitor the system for performance degradation?",
];

export default function AIInterviewAnswerTechnicalRiskAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState(null);

  const severityCount = {
    High: risks.filter((risk) => risk.severity === "High").length,
    Medium: risks.filter((risk) => risk.severity === "Medium").length,
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
            AI Technical Risk Analyzer
          </h1>

          <p className="text-gray-500">
            Identify technical risks in your proposed interview solution
            before the interviewer does.
          </p>
        </div>
      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Scenario
        </p>

        <h2 className="text-xl font-bold mt-2">
          Design a URL shortening service that can handle high traffic.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {[
            "Scalability",
            "Reliability",
            "Performance",
            "Maintainability",
          ].map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Proposed Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Describe your architecture or technical solution. AI will analyze
          it for risks beyond basic correctness.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Example: I would use one application server connected to a relational database..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Technical Risks
        </button>
      </div>

      {analyzed && (
        <>
          {/* Overall Result */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <ShieldAlert
                  className="text-orange-600"
                  size={42}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Risk Assessment
                </p>

                <h2 className="text-3xl font-black text-orange-700">
                  Moderate Technical Risk
                </h2>

                <p className="text-gray-600 mt-2">
                  The proposed design may work under normal conditions, but
                  several risks should be addressed before considering the
                  solution production-ready.
                </p>
              </div>

            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-5 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Total Risks
              </p>

              <p className="text-3xl font-black text-orange-600">
                {risks.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <TrendingUp className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                High Risk
              </p>

              <p className="text-3xl font-black text-red-600">
                {severityCount.High}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <Settings className="text-yellow-600" />

              <p className="text-sm text-gray-500 mt-4">
                Medium Risk
              </p>

              <p className="text-3xl font-black text-yellow-600">
                {severityCount.Medium}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <ShieldAlert className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Risk Coverage
              </p>

              <p className="text-3xl font-black text-indigo-600">
                86%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Mitigations
              </p>

              <p className="text-3xl font-black text-green-600">
                4
              </p>
            </div>

          </div>

          {/* Risk Categories */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Risk Categories
            </h2>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              {[
                ["Scalability", 1, "High"],
                ["Reliability", 1, "High"],
                ["Performance", 1, "Medium"],
                ["Maintainability", 1, "Medium"],
              ].map(([category, count, level]) => (
                <div
                  key={category}
                  className="border rounded-xl p-4"
                >
                  <p className="font-bold">
                    {category}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {count}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      level === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {level} Priority
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* Risk List */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Technical Risks
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a risk to see its impact and possible mitigation.
            </p>

            <div className="space-y-4 mt-6">

              {risks.map((risk, index) => (
                <button
                  type="button"
                  key={risk.title}
                  onClick={() =>
                    setSelectedRisk(
                      selectedRisk?.title === risk.title
                        ? null
                        : risk
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${
                        risk.severity === "High"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>
                          <p className="text-xs text-gray-500">
                            {risk.category}
                          </p>

                          <h3 className="font-bold mt-1">
                            {risk.title}
                          </h3>
                        </div>

                        <span
                          className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${
                            risk.severity === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {risk.severity}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        {risk.impact}
                      </p>

                      {selectedRisk?.title === risk.title && (
                        <div className="mt-4 space-y-3">

                          <div className="bg-red-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-red-700">
                              Potential Impact
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {risk.impact}
                            </p>
                          </div>

                          <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-green-700">
                              Suggested Mitigation
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {risk.mitigation}
                            </p>
                          </div>

                        </div>
                      )}

                    </div>
                  </div>

                </button>
              ))}

            </div>
          </div>

          {/* Risk Matrix */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Technical Risk Matrix
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Risks are evaluated by potential impact and likelihood.
            </p>

            <div className="grid grid-cols-4 gap-2 mt-6 text-sm">

              <div />
              <div className="text-center font-semibold">
                Low Impact
              </div>
              <div className="text-center font-semibold">
                Medium Impact
              </div>
              <div className="text-center font-semibold">
                High Impact
              </div>

              <div className="font-semibold flex items-center">
                High Likelihood
              </div>

              <div className="bg-yellow-100 rounded-xl p-4">
                Monitor
              </div>

              <div className="bg-orange-100 rounded-xl p-4 font-semibold">
                Mitigate
              </div>

              <div className="bg-red-100 rounded-xl p-4 font-bold">
                Immediate Attention
              </div>

              <div className="font-semibold flex items-center">
                Medium Likelihood
              </div>

              <div className="bg-gray-100 rounded-xl p-4">
                Accept
              </div>

              <div className="bg-yellow-100 rounded-xl p-4">
                Monitor
              </div>

              <div className="bg-orange-100 rounded-xl p-4 font-semibold">
                Mitigate
              </div>

              <div className="font-semibold flex items-center">
                Low Likelihood
              </div>

              <div className="bg-gray-100 rounded-xl p-4">
                Accept
              </div>

              <div className="bg-gray-100 rounded-xl p-4">
                Monitor
              </div>

              <div className="bg-yellow-100 rounded-xl p-4">
                Review
              </div>

            </div>
          </div>

          {/* Mitigation Plan */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Suggested Risk Mitigation Plan
                </h2>

                <div className="space-y-3 mt-4">

                  {[
                    "Add redundancy for critical components.",
                    "Introduce caching for frequently requested data.",
                    "Define a scaling strategy for increased traffic.",
                    "Add monitoring, health checks, and failure alerts.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>

                      <p className="text-sm text-gray-600">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>

          {/* Follow-up Questions */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <MessageSquare
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  AI Interviewer Follow-Up Questions
                </h2>

                <p className="text-gray-600 mt-2">
                  These questions target the major risks detected in your
                  solution.
                </p>

                <div className="space-y-3 mt-4">

                  {followUps.map((question, index) => (
                    <div
                      key={question}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >
                      <span className="font-bold text-indigo-600">
                        Q{index + 1}
                      </span>

                      <p className="text-sm text-gray-700">
                        {question}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Engineering Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution addresses the basic functional requirements,
                  but a stronger interview response should explicitly discuss
                  what happens when components fail, traffic increases, or
                  dependencies become bottlenecks.
                </p>

              </div>

            </div>
          </div>

        </>
      )}

    </div>
  );
}