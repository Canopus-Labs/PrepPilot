import React, { useState } from "react";
import {
  Brain,
  Server,
  Users,
  Database,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  GitBranch,
} from "lucide-react";

const stages = [
  {
    title: "Stage 1 — Small Application",
    requirement:
      "Build a basic application for 1,000 users with low traffic.",
    challenge:
      "Start with the simplest architecture that satisfies the requirements.",
    pressure: "Low",
    expected: ["Application Server", "Database"],
  },
  {
    title: "Stage 2 — More Users",
    requirement:
      "The application now needs to support 100,000 users.",
    challenge:
      "Explain how the architecture should evolve to handle more concurrent users.",
    pressure: "Medium",
    expected: ["Load Balancer", "Multiple App Servers"],
  },
  {
    title: "Stage 3 — Higher Traffic",
    requirement:
      "Traffic increases to 10,000 requests per second.",
    challenge:
      "Identify the bottlenecks and introduce appropriate scaling strategies.",
    pressure: "High",
    expected: ["Caching", "Horizontal Scaling"],
  },
  {
    title: "Stage 4 — Larger Dataset",
    requirement:
      "The database now contains several terabytes of data.",
    challenge:
      "Modify the data layer to handle storage and query scalability.",
    pressure: "High",
    expected: ["Read Replicas", "Database Partitioning"],
  },
  {
    title: "Stage 5 — Reliability",
    requirement:
      "The system must remain available even if one server or database node fails.",
    challenge:
      "Introduce redundancy and failure-recovery mechanisms.",
    pressure: "Critical",
    expected: ["Replication", "Failover"],
  },
];

const architectureStages = [
  {
    name: "Application Server",
    description: "Handles application requests.",
    stage: 1,
  },
  {
    name: "Load Balancer",
    description: "Distributes traffic across application servers.",
    stage: 2,
  },
  {
    name: "Redis Cache",
    description: "Reduces repeated database reads.",
    stage: 3,
  },
  {
    name: "Read Replicas",
    description: "Distributes database read workloads.",
    stage: 4,
  },
  {
    name: "Replication & Failover",
    description: "Improves availability during failures.",
    stage: 5,
  },
];

const metrics = [
  {
    title: "Users",
    value: "1K → 100K",
    icon: Users,
  },
  {
    title: "Traffic",
    value: "Low → 10K RPS",
    icon: Zap,
  },
  {
    title: "Dataset",
    value: "GB → TB",
    icon: Database,
  },
  {
    title: "Reliability",
    value: "Basic → HA",
    icon: ShieldCheck,
  },
];

const tradeoffs = [
  {
    decision: "Horizontal Scaling",
    benefit: "Handles increased concurrent traffic.",
    cost: "More infrastructure and operational complexity.",
  },
  {
    decision: "Caching",
    benefit: "Reduces database load and latency.",
    cost: "Introduces invalidation and stale-data concerns.",
  },
  {
    decision: "Read Replicas",
    benefit: "Scales read-heavy workloads.",
    cost: "Replication lag can affect consistency.",
  },
  {
    decision: "Database Partitioning",
    benefit: "Improves large-dataset scalability.",
    cost: "Adds query and operational complexity.",
  },
];

const workflow = [
  {
    title: "Start",
    description: "Design the simplest viable architecture.",
  },
  {
    title: "Scale",
    description: "Increase users and traffic.",
  },
  {
    title: "Optimize",
    description: "Address performance bottlenecks.",
  },
  {
    title: "Expand",
    description: "Handle larger datasets.",
  },
  {
    title: "Harden",
    description: "Introduce reliability mechanisms.",
  },
];

export default function AIInterviewQuestionSolutionArchitectureEvolutionPractice() {
  const [stage, setStage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showTradeoffs, setShowTradeoffs] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const currentStage = stages[stage];

  const availableOptions = [
    "Application Server",
    "Load Balancer",
    "Redis Cache",
    "Read Replicas",
    "Database Partitioning",
    "Replication",
    "Message Queue",
    "CDN",
  ];

  const toggleOption = (option) => {
    setSelectedOptions((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const submitStage = () => {
    setSubmitted(true);
  };

  const nextStage = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
      setSelectedOptions([]);
      setSubmitted(false);
    }
  };

  const resetPractice = () => {
    setStage(0);
    setSelectedOptions([]);
    setSubmitted(false);
    setRefreshed(false);
  };

  const score = currentStage.expected.filter((item) =>
    selectedOptions.includes(item)
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
            AI Architecture Evolution Practice
          </h1>

          <p className="text-gray-500">
            Progressively evolve a system as scale, traffic, data, performance,
            and reliability requirements increase.
          </p>

        </div>

      </div>

      {/* Main Challenge */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <GitBranch
              className="text-indigo-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ARCHITECTURE EVOLUTION CHALLENGE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {currentStage.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {currentStage.requirement}
            </p>

          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between text-sm font-semibold">

          <span>
            Architecture Evolution
          </span>

          <span>
            Stage {stage + 1} of {stages.length}
          </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full mt-4">

          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{
              width: `${((stage + 1) / stages.length) * 100}%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-4">

          {stages.map((item, index) => (

            <button
              type="button"
              key={item.title}
              onClick={() => {
                setStage(index);
                setSelectedOptions([]);
                setSubmitted(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                index === stage
                  ? "bg-indigo-600 text-white"
                  : index < stage
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}
            </button>

          ))}

        </div>

      </div>

      {/* Growth Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              System Growth
            </h2>

            <p className="text-sm text-gray-500">
              Requirements become progressively more demanding.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowMetrics(!showMetrics)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMetrics ? "Hide Metrics" : "Show Metrics"}
          </button>

        </div>

        {showMetrics && (
          <div className="grid md:grid-cols-4 gap-4 mt-6">

            {metrics.map((metric) => {

              const Icon = metric.icon;

              return (
                <div
                  key={metric.title}
                  className="bg-gray-50 rounded-xl p-5"
                >

                  <Icon
                    className="text-indigo-600"
                    size={22}
                  />

                  <p className="text-sm text-gray-500 mt-3">
                    {metric.title}
                  </p>

                  <p className="text-xl font-black text-indigo-700 mt-1">
                    {metric.value}
                  </p>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Current Challenge */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TargetIcon />

          <div>

            <h2 className="font-bold text-lg">
              Evolve Your Architecture
            </h2>

            <p className="text-sm text-gray-500">
              Select the components you would introduce at this stage.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="text-sm text-gray-600">
            <strong>Challenge:</strong>{" "}
            {currentStage.challenge}
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-3 mt-6">

          {availableOptions.map((option) => {

            const selected = selectedOptions.includes(option);
            const expected = currentStage.expected.includes(option);

            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleOption(option)}
                className={`border rounded-xl p-4 text-left transition ${
                  selected
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center justify-between">

                  <p className="font-semibold">
                    {option}
                  </p>

                  {submitted && expected && (
                    <CheckCircle2
                      className="text-green-600"
                      size={18}
                    />
                  )}

                </div>

              </button>
            );
          })}

        </div>

        <div className="flex flex-wrap gap-3 mt-6">

          <button
            type="button"
            onClick={submitStage}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            Evaluate Architecture
            <ArrowRight size={18} />
          </button>

          {stage < stages.length - 1 && (
            <button
              type="button"
              onClick={nextStage}
              disabled={!submitted}
              className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold disabled:opacity-50"
            >
              Continue to Next Stage
            </button>
          )}

          <button
            type="button"
            onClick={resetPractice}
            className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold"
          >
            Reset Practice
          </button>

        </div>

        {submitted && (
          <div
            className={`rounded-xl p-5 mt-5 ${
              score === currentStage.expected.length
                ? "bg-green-50"
                : "bg-orange-50"
            }`}
          >

            <div className="flex gap-3">

              {score === currentStage.expected.length ? (
                <CheckCircle2
                  className="text-green-600"
                  size={24}
                />
              ) : (
                <AlertTriangle
                  className="text-orange-600"
                  size={24}
                />
              )}

              <div>

                <p
                  className={`font-bold ${
                    score === currentStage.expected.length
                      ? "text-green-800"
                      : "text-orange-800"
                  }`}
                >
                  Architecture Score:{" "}
                  {score}/{currentStage.expected.length}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {score === currentStage.expected.length
                    ? "Good decision. Your architecture addresses the current requirement without unnecessary complexity."
                    : `Consider adding: ${currentStage.expected
                        .filter(
                          (item) =>
                            !selectedOptions.includes(item)
                        )
                        .join(", ")}`}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Architecture Evolution Map */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Server className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Architecture Evolution Map
              </h2>

              <p className="text-sm text-gray-500">
                See how components are introduced as requirements grow.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowArchitecture(!showArchitecture)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showArchitecture
              ? "Hide Map"
              : "Show Map"}
          </button>

        </div>

        {showArchitecture && (
          <div className="mt-6 overflow-x-auto">

            <div className="min-w-[800px]">

              <div className="flex items-center justify-center gap-4">

                {architectureStages.map((item, index) => (

                  <React.Fragment key={item.name}>

                    <div
                      className={`w-40 border-2 rounded-2xl p-4 text-center ${
                        item.stage <= stage + 1
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >

                      <Server
                        className={`mx-auto ${
                          item.stage <= stage + 1
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                        size={26}
                      />

                      <p className="font-bold text-sm mt-3">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-2">
                        {item.description}
                      </p>

                      <span className="inline-block mt-3 text-xs font-bold text-indigo-600">
                        Stage {item.stage}
                      </span>

                    </div>

                    {index <
                      architectureStages.length - 1 && (
                      <ArrowRight
                        className="text-gray-400"
                        size={20}
                      />
                    )}

                  </React.Fragment>
                ))}

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Architecture Principle */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI ARCHITECTURE PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Don't over-engineer before the requirement demands it.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong system-design answer evolves with the workload. Start
              simple, identify the new bottleneck when requirements increase,
              and introduce only the architecture needed to solve that
              bottleneck.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                EVOLUTION PATTERN
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Simple Architecture → Scale → Optimize → Partition → Harden
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Trade-offs */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              Architecture Trade-Offs
            </h2>

            <p className="text-sm text-gray-500">
              Every architecture improvement introduces new costs or
              complexity.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowTradeoffs(!showTradeoffs)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTradeoffs
              ? "Hide Trade-Offs"
              : "Show Trade-Offs"}
          </button>

        </div>

        {showTradeoffs && (
          <div className="space-y-4 mt-6">

            {tradeoffs.map((tradeoff) => (

              <div
                key={tradeoff.decision}
                className="border rounded-xl p-5"
              >

                <h3 className="font-bold">
                  {tradeoff.decision}
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mt-3">

                  <div className="bg-green-50 rounded-xl p-4">

                    <p className="text-xs font-bold text-green-600">
                      BENEFIT
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {tradeoff.benefit}
                    </p>

                  </div>

                  <div className="bg-orange-50 rounded-xl p-4">

                    <p className="text-xs font-bold text-orange-600">
                      COST / TRADE-OFF
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {tradeoff.cost}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Interview Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              INTERVIEWER CHALLENGE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              What would you change if traffic suddenly increased 10×?
            </h2>

            <p className="text-gray-600 mt-2">
              Do not redesign the entire system immediately. Identify the
              likely bottleneck first and explain why your proposed change
              addresses it.
            </p>

          </div>

        </div>

      </div>

      {/* Recalculate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Architecture
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate your architecture after introducing new requirements.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Reanalyze Architecture
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Architecture evolution analysis updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Architecture Evolution Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI progressively increases system requirements.
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
              Good architecture evolves with the problem.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not to build the largest architecture from the
              beginning. The goal is to recognize when scale, performance,
              data, or reliability requirements create a new bottleneck and
              evolve the system accordingly.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function TargetIcon() {
  return (
    <div className="p-2 rounded-lg bg-indigo-100">
      <Target className="text-indigo-600" size={22} />
    </div>
  );
}