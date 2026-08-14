import React, { useState } from "react";
import {
  Brain,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Zap,
  Database,
  ShieldCheck,
  Wrench,
  Network,
} from "lucide-react";

const tradeOffs = [
  {
    name: "Speed",
    icon: Zap,
    score: 92,
    sacrifice: "Higher memory usage",
    relevance: "High",
  },
  {
    name: "Memory",
    icon: Database,
    score: 68,
    sacrifice: "Additional data structures required",
    relevance: "Medium",
  },
  {
    name: "Scalability",
    icon: Network,
    score: 88,
    sacrifice: "More infrastructure complexity",
    relevance: "High",
  },
  {
    name: "Reliability",
    icon: ShieldCheck,
    score: 74,
    sacrifice: "More components to monitor",
    relevance: "Medium",
  },
  {
    name: "Maintainability",
    icon: Wrench,
    score: 81,
    sacrifice: "Caching invalidation complexity",
    relevance: "High",
  },
];

const workflow = [
  {
    title: "Solve",
    description: "Submit your proposed technical solution.",
  },
  {
    title: "Discover",
    description: "Identify what your solution gains and sacrifices.",
  },
  {
    title: "Evaluate",
    description: "AI checks whether the trade-offs are relevant.",
  },
  {
    title: "Explain",
    description: "Justify why the trade-offs matter.",
  },
  {
    title: "Improve",
    description: "Refine the technical decision.",
  },
];

export default function AIInterviewQuestionSolutionTradeOffDiscoveryChallenge() {
  const [showTradeOffs, setShowTradeOffs] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [selected, setSelected] = useState("Speed");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Trade-Off Discovery Challenge
          </h1>

          <p className="text-gray-500">
            Identify what your technical solution gains and sacrifices.
          </p>
        </div>

      </div>

      {/* Challenge Banner */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Scale className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TRADE-OFF DISCOVERY CHALLENGE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              What are you sacrificing with your solution?
            </h2>

            <p className="text-gray-600 mt-2">
              A strong engineering decision is not only about what works.
              It is also about understanding what the approach gives up.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Scale className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Trade-Offs Identified
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Relevant
            </p>

            <p className="text-3xl font-black text-green-600">
              4
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Needs Review
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Target className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Reasoning Score
            </p>

            <p className="text-3xl font-black text-purple-600">
              86%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <Brain className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Overall
            </p>

            <p className="text-xl font-black text-green-600">
              Strong
            </p>
          </div>

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
              Analyze the trade-offs of the proposed architecture.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            Design a backend service that should handle increasing traffic.
            Your proposed solution uses a load balancer, multiple application
            servers, and Redis caching.
          </p>

        </div>

      </div>

      {/* Proposed Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-lg">
              Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              The AI evaluates the reasoning behind this design.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Architecture
            </p>

            <p className="font-bold mt-1">
              Load Balancer
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Compute
            </p>

            <p className="font-bold mt-1">
              Multiple Servers
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Caching
            </p>

            <p className="font-bold mt-1">
              Redis
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              AI CHALLENGE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Identify the trade-offs yourself.
            </h2>

            <p className="text-gray-600 mt-2">
              Before the AI reveals its analysis, identify what your solution
              gains and what it sacrifices.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-green-600">
                  WHAT DOES IT IMPROVE?
                </p>

                <p className="font-semibold text-gray-700 mt-2">
                  Example: Higher throughput through horizontal scaling.
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-red-600">
                  WHAT DOES IT SACRIFICE?
                </p>

                <p className="font-semibold text-gray-700 mt-2">
                  Example: More infrastructure and operational complexity.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="mt-5 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold flex items-center gap-2"
            >
              Submit Trade-Off Analysis
              <ArrowRight size={18} />
            </button>

            {submitted && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Your trade-off analysis has been submitted for AI evaluation.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Trade-Off Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Scale className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                AI Trade-Off Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate the consequences of the proposed solution.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTradeOffs(!showTradeOffs)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTradeOffs ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showTradeOffs && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {tradeOffs.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => setSelected(item.name)}
                  className={`text-left border rounded-2xl p-5 ${
                    selected === item.name
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="p-2 rounded-lg bg-indigo-100">
                      <Icon
                        className="text-indigo-600"
                        size={20}
                      />
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <h3 className="font-bold">
                          {item.name}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.relevance === "High"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.relevance}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        Relevance score: {item.score}%
                      </p>

                    </div>

                  </div>

                  <div className="bg-white rounded-xl p-4 mt-4">

                    <p className="text-xs text-gray-500">
                      TRADE-OFF
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      {item.sacrifice}
                    </p>

                  </div>

                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Detailed Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between">

          <div className="flex gap-3">

            <Brain className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg text-indigo-800">
                Selected Trade-Off: {selected}
              </h2>

              <p className="text-sm text-gray-600">
                Understand why this trade-off matters.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAnalysis ? "Hide Details" : "View Details"}
          </button>

        </div>

        {showAnalysis && (
          <div className="bg-white rounded-xl p-5 mt-5">

            <p className="text-xs font-bold text-indigo-600">
              AI EXPLANATION
            </p>

            <p className="text-gray-700 leading-7 mt-2">
              The chosen approach improves performance and scalability, but
              introduces additional infrastructure and operational complexity.
              The trade-off becomes worthwhile when workload growth justifies
              the added complexity.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  BENEFIT
                </p>
                <p className="font-bold text-green-700 mt-1">
                  Better scalability
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  COST
                </p>
                <p className="font-bold text-red-700 mt-1">
                  More complexity
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  DECISION
                </p>
                <p className="font-bold text-purple-700 mt-1">
                  Depends on workload
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Interview Follow-Up */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              LIKELY INTERVIEW FOLLOW-UP
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              "Why is the additional complexity worth the scalability benefit?"
            </h2>

            <p className="text-gray-600 mt-2">
              The interviewer is testing whether you understand when the
              trade-off is justified rather than simply knowing that
              horizontal scaling is possible.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                STRONG ANSWER SHOULD INCLUDE
              </p>

              <p className="font-semibold text-red-700 mt-2">
                Expected workload → scalability requirement → operational cost
                → complexity → justification
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Score */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Scale className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Trade-Off Coverage
            </p>
            <p className="text-3xl font-black text-indigo-600">
              92%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Relevance
            </p>
            <p className="text-3xl font-black text-green-600">
              88%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Target className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Engineering Judgment
            </p>
            <p className="text-3xl font-black text-purple-600">
              84%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Lightbulb className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Overall Score
            </p>
            <p className="text-3xl font-black text-orange-600">
              88%
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
              Recalculate Trade-Off Score
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate your reasoning after adding or improving trade-offs.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Score
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Trade-off analysis updated successfully.
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
                Trade-Off Discovery Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates engineering trade-off reasoning.
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
              Every technical decision has a cost.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates do not only explain why their solution works.
              They understand what they sacrifice and can explain why that
              trade-off is acceptable for the given requirements.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}