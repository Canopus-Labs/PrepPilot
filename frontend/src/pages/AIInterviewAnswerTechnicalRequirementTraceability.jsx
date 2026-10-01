import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  GitBranch,
  Code2,
  Layers,
  Lightbulb,
} from "lucide-react";

const requirements = [
  {
    requirement: "Low response latency",
    decision: "Use in-memory caching",
    implementation: "Cache frequently requested data",
    result: "Reduce repeated database reads",
    status: "Covered",
  },
  {
    requirement: "High scalability",
    decision: "Use horizontal scaling",
    implementation: "Run multiple service instances",
    result: "Handle increasing request volume",
    status: "Covered",
  },
  {
    requirement: "Reliable operation",
    decision: "Add service redundancy",
    implementation: "Use multiple service replicas",
    result: "Reduce impact of instance failures",
    status: "Partial",
  },
  {
    requirement: "Controlled infrastructure cost",
    decision: "Not clearly addressed",
    implementation: "No cost-control mechanism identified",
    result: "Potentially higher infrastructure cost",
    status: "Missing",
  },
];

const answerSections = [
  {
    title: "Problem Understanding",
    content:
      "The system needs to handle high traffic while maintaining low latency.",
  },
  {
    title: "Architecture Decision",
    content:
      "I would use caching and multiple service instances to improve performance and scalability.",
  },
  {
    title: "Implementation",
    content:
      "Frequently accessed data can be stored in memory and requests can be distributed across instances.",
  },
  {
    title: "Expected Result",
    content:
      "This should reduce database load and allow the service to handle more concurrent users.",
  },
];

export default function AIInterviewAnswerTechnicalRequirementTraceability() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [showSections, setShowSections] = useState(false);

  const analyzeAnswer = () => {
    if (!answer.trim()) return;
    setAnalyzed(true);
  };

  const covered = requirements.filter(
    (item) => item.status === "Covered"
  ).length;

  const partial = requirements.filter(
    (item) => item.status === "Partial"
  ).length;

  const missing = requirements.filter(
    (item) => item.status === "Missing"
  ).length;

  const coverageScore = Math.round(
    ((covered + partial * 0.5) / requirements.length) * 100
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Requirement Traceability
          </h1>

          <p className="text-gray-500">
            Connect every major technical decision to the requirement it is
            intended to satisfy.
          </p>
        </div>

      </div>

      {/* Interview Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Design a service capable of handling high traffic while
              maintaining low latency, reliability, and controlled cost.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Performance
            </p>
            <p className="font-bold mt-1">
              Low Latency
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Scalability
            </p>
            <p className="font-bold mt-1">
              High Traffic
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Reliability
            </p>
            <p className="font-bold mt-1">
              Fault Tolerance
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Cost
            </p>
            <p className="font-bold mt-1">
              Controlled Resources
            </p>
          </div>

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Candidate Technical Answer
            </h2>

            <p className="text-sm text-gray-500">
              Enter the solution you would explain during the interview.
            </p>
          </div>

        </div>

        <textarea
          rows={9}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={`Example:

I would use caching to reduce database queries and improve
latency. I would also run multiple service instances so the
system can handle more traffic. This should make the system
more scalable and faster.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Generate Traceability Map
        </button>

      </div>

      {analyzed && (
        <>
          {/* Coverage Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl">
                <GitBranch
                  className="text-indigo-600"
                  size={30}
                />
              </div>

              <div>

                <p className="text-xs font-bold text-indigo-600">
                  REQUIREMENT TRACEABILITY ANALYSIS
                </p>

                <h2 className="text-2xl font-black text-indigo-800 mt-1">
                  {coverageScore}% Requirement Coverage
                </h2>

                <p className="text-gray-600 mt-2">
                  AI mapped the major technical decisions in your answer to the
                  requirements identified in the problem.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Covered
                </p>
                <p className="text-3xl font-black text-green-600 mt-1">
                  {covered}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Partially Covered
                </p>
                <p className="text-3xl font-black text-orange-600 mt-1">
                  {partial}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Missing
                </p>
                <p className="text-3xl font-black text-red-600 mt-1">
                  {missing}
                </p>
              </div>

            </div>

          </div>

          {/* Traceability Map */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitBranch className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Requirement Traceability Map
                </h2>

                <p className="text-sm text-gray-500">
                  Requirement → Decision → Implementation → Expected Result
                </p>
              </div>

            </div>

            <div className="space-y-5 mt-6">

              {requirements.map((item) => (

                <button
                  type="button"
                  key={item.requirement}
                  onClick={() =>
                    setSelectedRequirement(item)
                  }
                  className={`w-full text-left border rounded-2xl p-5 transition ${
                    selectedRequirement?.requirement ===
                    item.requirement
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    {item.status === "Covered" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={23}
                      />
                    ) : item.status === "Partial" ? (
                      <AlertTriangle
                        className="text-orange-600"
                        size={23}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-red-600"
                        size={23}
                      />
                    )}

                    <h3 className="font-bold">
                      {item.requirement}
                    </h3>

                    <span
                      className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Covered"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Partial"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-4 gap-3 mt-5">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs font-bold text-gray-500">
                        REQUIREMENT
                      </p>

                      <p className="text-sm font-semibold mt-2">
                        {item.requirement}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs font-bold text-gray-500">
                        DECISION
                      </p>

                      <p className="text-sm font-semibold mt-2">
                        {item.decision}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs font-bold text-gray-500">
                        IMPLEMENTATION
                      </p>

                      <p className="text-sm font-semibold mt-2">
                        {item.implementation}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs font-bold text-gray-500">
                        EXPECTED RESULT
                      </p>

                      <p className="text-sm font-semibold mt-2">
                        {item.result}
                      </p>

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Selected Requirement */}
          {selectedRequirement && (
            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <AlertTriangle
                  className="text-orange-600"
                  size={30}
                />

                <div>

                  <p className="text-xs font-bold text-orange-600">
                    TRACEABILITY REVIEW
                  </p>

                  <h2 className="text-2xl font-black text-orange-700 mt-1">
                    {selectedRequirement.requirement}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Status:{" "}
                    <strong>
                      {selectedRequirement.status}
                    </strong>
                  </p>

                  {selectedRequirement.status !== "Covered" && (
                    <p className="text-gray-600 mt-3">
                      This requirement needs stronger evidence connecting the
                      technical decision to the expected outcome.
                    </p>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* Answer Structure */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Layers className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Answer Traceability Structure
                </h2>

                <p className="text-sm text-gray-500">
                  AI separates the response into reasoning stages before
                  mapping them to requirements.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowSections(!showSections)
              }
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              {showSections
                ? "Hide Answer Sections"
                : "Show Answer Sections"}
            </button>

            {showSections && (
              <div className="space-y-4 mt-6">

                {answerSections.map((section, index) => (

                  <div
                    key={section.title}
                    className="flex gap-4 border rounded-xl p-5"
                  >

                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div>

                      <h3 className="font-bold">
                        {section.title}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2">
                        {section.content}
                      </p>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </div>

          {/* Missing Requirements */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-red-600"
                size={28}
              />

              <div>

                <p className="text-xs font-bold text-red-600">
                  MISSING REQUIREMENT
                </p>

                <h2 className="text-xl font-bold text-red-800 mt-1">
                  Infrastructure Cost Is Not Adequately Addressed
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer discusses performance and scalability but does
                  not explain how the design controls infrastructure cost.
                </p>

                <div className="mt-4 bg-white rounded-xl p-4">

                  <div className="flex gap-3">

                    <Lightbulb
                      className="text-orange-600"
                      size={21}
                    />

                    <p className="text-sm text-gray-600">
                      Add a decision such as cache sizing, autoscaling
                      policies, resource limits, or cost-aware capacity
                      planning.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Traceability Workflow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitBranch className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Recommended Traceability Workflow
                </h2>

                <p className="text-sm text-gray-500">
                  Use this framework when explaining technical solutions.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Extract Requirements",
                "Choose Decision",
                "Explain Implementation",
                "Predict Result",
                "Validate Coverage",
              ].map((step, index, array) => (

                <React.Fragment key={step}>

                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
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

          {/* Requirement Types */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Requirement Categories
                </h2>

                <p className="text-sm text-gray-500">
                  AI can trace both explicit and implicit technical
                  requirements.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Code2 className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Functional
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  What the system must do.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Zap className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Performance
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Latency, throughput, and processing constraints.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <ShieldCheck className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Reliability
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Availability and failure-handling requirements.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Layers className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Scalability
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Expected growth in users, data, or requests.
                </p>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not explain technical decisions in isolation. For every
                  major decision, explicitly state which requirement it
                  addresses, how it is implemented, and what result you expect.
                  This makes your solution easier to evaluate and defend.
                </p>

              </div>

            </div>

          </div>

          {/* Next Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  RECOMMENDED PRACTICE
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-1">
                  Trace every decision back to a requirement
                </h2>

                <p className="text-gray-600 mt-2">
                  Take a system-design problem and create a
                  Requirement → Decision → Implementation → Result map before
                  presenting your final architecture.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Traceability Challenge
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