import React, { useState } from "react";
import {
  Brain,
  Network,
  AlertTriangle,
  ShieldCheck,
  Server,
  Database,
  Cloud,
  Package,
  Target,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const dependencies = [
  {
    name: "PostgreSQL",
    type: "Database",
    risk: "Medium",
    description:
      "The application depends on the database for persistent storage and request processing.",
    issue: "Database outage can make core operations unavailable.",
    mitigation: "Use replication, backups, health checks, and failover.",
    icon: Database,
  },
  {
    name: "Redis",
    type: "Cache",
    risk: "Medium",
    description:
      "The application relies on Redis to reduce repeated database reads.",
    issue:
      "Cache unavailability can increase database load and response latency.",
    mitigation:
      "Design the cache as an optional dependency and fall back to the database.",
    icon: Server,
  },
  {
    name: "External Payment API",
    type: "External Service",
    risk: "High",
    description:
      "Payment processing depends on an external third-party service.",
    issue:
      "Provider downtime or API changes can interrupt payment operations.",
    mitigation:
      "Use retries, timeouts, circuit breakers, and provider abstraction.",
    icon: Cloud,
  },
  {
    name: "Authentication Library",
    type: "Library",
    risk: "Low",
    description:
      "Authentication functionality depends on a third-party library.",
    issue:
      "Breaking updates or security vulnerabilities may affect the system.",
    mitigation:
      "Pin versions, monitor vulnerabilities, and maintain upgrade procedures.",
    icon: Package,
  },
];

const followUps = [
  "What happens if the external payment service becomes unavailable?",
  "Which dependency is the biggest single point of failure?",
  "Can the system continue operating if Redis goes down?",
  "How would you detect a dependency failure?",
  "What happens if an external API changes its contract?",
  "How would you reduce dependence on a single provider?",
];

export default function AIInterviewAnswerTechnicalDependencyRiskAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedDependency, setSelectedDependency] = useState(null);

  const highRisk = dependencies.filter(
    (dependency) => dependency.risk === "High"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Network size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Dependency Risk Analyzer
          </h1>

          <p className="text-gray-500">
            Identify dependency risks, single points of failure, and
            reliability concerns in your technical solution.
          </p>
        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Design a reliable e-commerce backend that handles payments,
          authentication, and product data.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "System Design",
            "Reliability",
            "Dependencies",
            "Scalability",
            "Failure Handling",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Candidate Technical Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Describe your architecture. AI will identify dependencies and
          evaluate the risks they introduce.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Describe your proposed architecture, services, databases, libraries, APIs, and other dependencies..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Dependency Risks
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Risk */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <AlertTriangle
                  className="text-orange-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Dependency Risk Level
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-5xl font-black text-orange-600">
                    Medium
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Review Recommended
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Several important dependencies were identified. One
                  external service represents a significant availability risk.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "68%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Network className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Dependencies
              </p>

              <p className="text-3xl font-black text-indigo-600">
                {dependencies.length}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                High-Risk Dependencies
              </p>

              <p className="text-3xl font-black text-red-600">
                {highRisk}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Risk Areas
              </p>

              <p className="text-3xl font-black text-orange-600">
                4
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <ShieldCheck className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Mitigations Suggested
              </p>

              <p className="text-3xl font-black text-green-600">
                6
              </p>

            </div>

          </div>

          {/* Dependency Map */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Network className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Dependency Map
                </h2>

                <p className="text-sm text-gray-500">
                  Components that your proposed system relies on.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              {dependencies.map((dependency) => {
                const Icon = dependency.icon;

                return (
                  <button
                    type="button"
                    key={dependency.name}
                    onClick={() =>
                      setSelectedDependency(
                        selectedDependency === dependency.name
                          ? null
                          : dependency.name
                      )
                    }
                    className="border rounded-2xl p-5 text-left hover:border-indigo-400 transition"
                  >

                    <div className="flex justify-between">

                      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                        <Icon size={22} />
                      </div>

                      <span
                        className={`px-2 py-1 h-fit rounded-full text-xs font-semibold ${
                          dependency.risk === "High"
                            ? "bg-red-100 text-red-700"
                            : dependency.risk === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {dependency.risk}
                      </span>

                    </div>

                    <h3 className="font-bold mt-4">
                      {dependency.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {dependency.type}
                    </p>

                    {selectedDependency === dependency.name && (
                      <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                        <p className="text-xs text-indigo-700 font-semibold">
                          Risk
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {dependency.issue}
                        </p>

                      </div>
                    )}

                  </button>
                );
              })}

            </div>

          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Dependency Risk Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI has evaluated the reliability risks associated with each
              dependency.
            </p>

            <div className="space-y-4 mt-6">

              {dependencies.map((dependency) => (
                <div
                  key={dependency.name}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex flex-col md:flex-row md:justify-between gap-3">

                    <div>

                      <h3 className="font-bold text-lg">
                        {dependency.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {dependency.type}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        dependency.risk === "High"
                          ? "bg-red-100 text-red-700"
                          : dependency.risk === "Medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {dependency.risk} Risk
                    </span>

                  </div>

                  <p className="text-sm text-gray-600 mt-4">
                    {dependency.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <div className="bg-red-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-red-700">
                        Potential Failure
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {dependency.issue}
                      </p>

                    </div>

                    <div className="bg-green-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-green-700">
                        Suggested Mitigation
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {dependency.mitigation}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Single Point of Failure */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-red-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-red-700">
                  Single Point of Failure Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  The External Payment API is currently a critical dependency.
                  If it becomes unavailable, payment operations may stop.
                </p>

                <div className="mt-5 bg-white rounded-xl p-5">

                  <div className="flex items-center gap-3">

                    <Cloud className="text-red-600" />

                    <div>

                      <p className="font-bold">
                        External Payment API
                      </p>

                      <p className="text-sm text-gray-500">
                        Critical external dependency
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">

                    {[
                      "Timeouts",
                      "Retries",
                      "Circuit Breaker",
                      "Fallback",
                      "Provider Abstraction",
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Follow-up Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Dependency-Based Interview Follow-Ups
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              These questions simulate the deeper architecture questions an
              interviewer may ask.
            </p>

            <div className="space-y-3 mt-6">

              {followUps.map((question, index) => (
                <div
                  key={question}
                  className="border rounded-xl p-4 flex gap-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    {question}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Mitigation Strategy */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-green-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Mitigation Strategy
                </h2>

                <p className="text-sm text-gray-500">
                  Strengthen your answer by explaining how the architecture
                  behaves when dependencies fail.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              {[
                ["Detect", "Health checks and timeout monitoring."],
                ["Protect", "Circuit breakers and rate limits."],
                ["Recover", "Retries, fallback, and failover."],
                ["Reduce", "Avoid unnecessary dependency coupling."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="border rounded-xl p-5"
                >

                  <div className="w-9 h-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    {title[0]}
                  </div>

                  <h3 className="font-bold mt-3">
                    {title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Dependency Flow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Dependency Failure Flow
            </h2>

            <div className="flex flex-col items-center mt-7">

              {[
                "Dependency Failure",
                "Detect Failure",
                "Stop Cascading Failure",
                "Fallback / Retry",
                "Recover Service",
              ].map((step, index, array) => (
                <React.Fragment key={step}>

                  <div
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      index === 0
                        ? "bg-red-100 text-red-700"
                        : index === array.length - 1
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-50 text-indigo-700"
                    }`}
                  >
                    {step}
                  </div>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="rotate-90 text-indigo-400 my-2"
                      size={20}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* AI Coach */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Architecture Coaching
                </h2>

                <p className="text-gray-600 mt-2">
                  When discussing dependencies in an interview, do not only
                  mention what service you use. Explain why you need it, what
                  happens when it fails, whether the system can operate without
                  it, and how you would prevent the failure from cascading
                  through the architecture.
                </p>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  AI Final Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your architecture is reasonable, but strengthen the answer
                  by explicitly addressing the External Payment API as a
                  critical dependency. Explain timeouts, retries, circuit
                  breakers, fallback behavior, and how you would prevent a
                  third-party outage from taking down the entire system.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  Practice Dependency Follow-Ups
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}