import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowDown,
  Target,
  Clock3,
} from "lucide-react";

const decisions = [
  {
    step: 1,
    title: "Choose API Architecture",
    category: "Architecture",
    decision: "Use REST APIs for client-server communication.",
    reason: "The system requires simple resource-based communication.",
    dependency: "Initial requirement analysis",
    alternative: "GraphQL",
    status: "Strong",
  },
  {
    step: 2,
    title: "Select Database",
    category: "Data",
    decision: "Use PostgreSQL for persistent application data.",
    reason: "The system requires structured data and transactional consistency.",
    dependency: "API data requirements",
    alternative: "MongoDB",
    status: "Strong",
  },
  {
    step: 3,
    title: "Add Caching",
    category: "Performance",
    decision: "Introduce Redis for frequently requested data.",
    reason: "Repeated reads could increase database load.",
    dependency: "Database access pattern",
    alternative: "Database query optimization",
    status: "Needs Reasoning",
  },
  {
    step: 4,
    title: "Introduce Load Balancing",
    category: "Scalability",
    decision: "Place a load balancer in front of application servers.",
    reason: "Multiple instances are required as traffic increases.",
    dependency: "Expected traffic growth",
    alternative: "Single-server scaling",
    status: "Strong",
  },
  {
    step: 5,
    title: "Define Failure Handling",
    category: "Reliability",
    decision: "Use retries and fallback behavior for temporary failures.",
    reason: "External services may become temporarily unavailable.",
    dependency: "Service dependency analysis",
    alternative: "Manual recovery",
    status: "Missing Reasoning",
  },
];

const alternatives = [
  {
    decision: "Database",
    selected: "PostgreSQL",
    alternative: "MongoDB",
    reason:
      "A document database could be preferable if the data structure changes frequently and strong relational constraints are less important.",
  },
  {
    decision: "Caching",
    selected: "Redis",
    alternative: "Query Optimization",
    reason:
      "Query optimization may be preferable when the database query itself is inefficient rather than repeatedly accessed.",
  },
  {
    decision: "Scaling",
    selected: "Load Balancer",
    alternative: "Single Server",
    reason:
      "A single server may be sufficient for small workloads and reduces operational complexity.",
  },
];

export default function AIInterviewAnswerTechnicalDecisionTimeline() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <GitBranch size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Decision Timeline
          </h1>

          <p className="text-gray-500">
            Reconstruct the reasoning sequence behind your technical decisions
            and understand how each choice connects to the next.
          </p>
        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Design a scalable backend system for a high-traffic application.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "System Design",
            "Architecture",
            "Database",
            "Caching",
            "Scalability",
            "Reliability",
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
          Candidate Technical Answer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste your answer. AI will identify technical decisions and
          reconstruct their logical relationships.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Explain your technical solution and the decisions you would make..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Reconstruct Decision Timeline
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Decision Flow Quality
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    81%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Strong
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Most technical decisions follow a logical progression, but
                  some decisions need stronger justification and dependency
                  explanations.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "81%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <GitBranch className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Decisions Identified
              </p>

              <p className="text-3xl font-black text-indigo-600">
                5
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Strong Decisions
              </p>

              <p className="text-3xl font-black text-green-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Reasoning Gaps
              </p>

              <p className="text-3xl font-black text-orange-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Clock3 className="text-purple-600" />

              <p className="text-sm text-gray-500 mt-4">
                Decision Stages
              </p>

              <p className="text-3xl font-black text-purple-600">
                5
              </p>

            </div>

          </div>

          {/* Decision Timeline */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Clock3 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Technical Decision Timeline
                </h2>

                <p className="text-sm text-gray-500">
                  Decisions are arranged in the logical order in which they
                  influence the architecture.
                </p>

              </div>

            </div>

            <div className="relative mt-8">

              <div className="absolute left-6 top-5 bottom-5 w-0.5 bg-indigo-100" />

              <div className="space-y-6">

                {decisions.map((decision, index) => (
                  <button
                    type="button"
                    key={decision.step}
                    onClick={() =>
                      setSelectedDecision(
                        selectedDecision === index ? null : index
                      )
                    }
                    className="relative w-full text-left"
                  >

                    <div className="flex gap-5">

                      <div
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black ${
                          decision.status === "Strong"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {decision.step}
                      </div>

                      <div className="flex-1 border rounded-2xl p-5 hover:border-indigo-400 transition">

                        <div className="flex justify-between gap-4">

                          <div>

                            <p className="text-xs text-gray-500">
                              {decision.category}
                            </p>

                            <h3 className="font-bold text-lg mt-1">
                              {decision.title}
                            </h3>

                          </div>

                          <span
                            className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                              decision.status === "Strong"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {decision.status}
                          </span>

                        </div>

                        <p className="text-gray-700 mt-3">
                          {decision.decision}
                        </p>

                        <div className="mt-4 grid md:grid-cols-2 gap-3">

                          <div className="bg-gray-50 rounded-xl p-3">

                            <p className="text-xs text-gray-500">
                              Depends On
                            </p>

                            <p className="text-sm font-semibold mt-1">
                              {decision.dependency}
                            </p>

                          </div>

                          <div className="bg-gray-50 rounded-xl p-3">

                            <p className="text-xs text-gray-500">
                              Reasoning
                            </p>

                            <p className="text-sm font-semibold mt-1">
                              {decision.reason}
                            </p>

                          </div>

                        </div>

                        {selectedDecision === index && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-indigo-700">
                              Alternative Decision Point
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              Instead of <strong>{decision.decision}</strong>,
                              you could consider{" "}
                              <strong>{decision.alternative}</strong>.
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* Decision Flow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Decision Flow Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              The reconstructed flow shows how the major decisions influence
              each other.
            </p>

            <div className="flex flex-col items-center mt-7">

              {[
                "Requirements",
                "API Architecture",
                "Database Selection",
                "Caching Strategy",
                "Load Balancing",
                "Failure Handling",
              ].map((item, index, array) => (
                <React.Fragment key={item}>

                  <div
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      index === 0
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item}
                  </div>

                  {index < array.length - 1 && (
                    <ArrowDown
                      size={21}
                      className="text-indigo-400 my-2"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Missing Reasoning */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Missing Reasoning Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  Some decisions are technically reasonable but the answer
                  does not clearly explain why they were made at that point in
                  the design process.
                </p>

                <div className="space-y-4 mt-5">

                  <div className="bg-white rounded-xl p-5">

                    <h3 className="font-bold">
                      Caching Decision
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      Explain how you determined that database load was high
                      enough to justify adding Redis instead of first optimizing
                      the database queries.
                    </p>

                  </div>

                  <div className="bg-white rounded-xl p-5">

                    <h3 className="font-bold">
                      Failure Handling
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      Explain which dependencies can fail and how the system
                      should behave when each failure occurs.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Alternative Decision Points */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitBranch className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Alternative Decision Points
                </h2>

                <p className="text-sm text-gray-500">
                  Understand where another technical decision could have
                  produced a different architecture.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {alternatives.map((item) => (
                <div
                  key={item.decision}
                  className="border rounded-xl p-5"
                >

                  <p className="text-xs text-gray-500">
                    {item.decision} Decision
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 mt-3">

                    <div className="flex-1 bg-green-50 rounded-xl p-4">

                      <p className="text-xs text-green-700 font-semibold">
                        Selected
                      </p>

                      <p className="font-bold mt-1">
                        {item.selected}
                      </p>

                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowDown
                        className="md:-rotate-90 text-indigo-400"
                        size={22}
                      />
                    </div>

                    <div className="flex-1 bg-indigo-50 rounded-xl p-4">

                      <p className="text-xs text-indigo-700 font-semibold">
                        Alternative
                      </p>

                      <p className="font-bold mt-1">
                        {item.alternative}
                      </p>

                    </div>

                  </div>

                  <p className="text-sm text-gray-600 mt-4">
                    {item.reason}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Dependency Map */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Decision Dependency Map
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Brain className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Requirements
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Define traffic, consistency, availability, and latency
                  requirements.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Target className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Architecture Decisions
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Translate requirements into API, database, caching, and
                  scaling choices.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <CheckCircle2 className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Reliability Decisions
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Add failure handling based on identified dependencies and
                  reliability requirements.
                </p>

              </div>

            </div>

          </div>

          {/* AI Coaching */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Decision Communication Coach
                </h2>

                <p className="text-gray-600 mt-2">
                  When explaining a technical design, connect every major
                  decision to a requirement or previous decision. Instead of
                  simply saying "I would use Redis," explain the requirement
                  that led to Redis and why it was preferable to the
                  alternatives you considered.
                </p>

              </div>

            </div>

          </div>

          {/* Final Summary */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Decision-Flow Summary
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer contains a coherent sequence of architecture,
                  database, performance, scalability, and reliability
                  decisions. The main improvement area is explaining why each
                  decision became necessary and what alternative you rejected
                  at that point.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}