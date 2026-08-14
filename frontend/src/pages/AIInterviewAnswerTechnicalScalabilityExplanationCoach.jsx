import React, { useState } from "react";
import {
  Brain,
  Server,
  TrendingUp,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
  Target,
} from "lucide-react";

const scalabilityFactors = [
  {
    name: "Workload Understanding",
    score: 86,
    status: "Strong",
    description:
      "The candidate identifies expected users, requests, and workload growth reasonably well.",
  },
  {
    name: "Resource Growth",
    score: 72,
    status: "Good",
    description:
      "The explanation recognizes increasing resource consumption but needs more quantitative reasoning.",
  },
  {
    name: "Bottleneck Identification",
    score: 61,
    status: "Needs Improvement",
    description:
      "Potential database and network bottlenecks are mentioned but not prioritized clearly.",
  },
  {
    name: "Scaling Strategy",
    score: 83,
    status: "Strong",
    description:
      "The candidate explains horizontal scaling and load distribution effectively.",
  },
  {
    name: "Performance Limits",
    score: 58,
    status: "Needs Improvement",
    description:
      "The explanation does not clearly identify the point where the proposed architecture stops scaling efficiently.",
  },
];

const scalabilityQuestions = [
  {
    title: "Expected Workload",
    question:
      "What happens to your system if traffic increases from 10,000 to 1 million requests per day?",
    purpose:
      "Tests whether the candidate understands workload growth.",
  },
  {
    title: "Resource Growth",
    question:
      "Which resources grow as traffic increases, and how does their usage change?",
    purpose:
      "Tests whether resource consumption is understood quantitatively.",
  },
  {
    title: "Bottlenecks",
    question:
      "Which component becomes the bottleneck first when the workload increases?",
    purpose:
      "Tests prioritization of scalability limitations.",
  },
  {
    title: "Scaling Strategy",
    question:
      "How would you scale the system when a single instance can no longer handle the workload?",
    purpose:
      "Tests practical scaling decisions.",
  },
  {
    title: "Performance Limits",
    question:
      "At what scale would your current architecture stop meeting the latency requirement?",
    purpose:
      "Tests awareness of architectural limits.",
  },
];

const bottlenecks = [
  {
    component: "Database",
    risk: "High",
    explanation:
      "Read/write throughput may become the primary bottleneck as concurrent requests increase.",
  },
  {
    component: "API Servers",
    risk: "Medium",
    explanation:
      "Compute capacity can become constrained if request processing is CPU intensive.",
  },
  {
    component: "Network",
    risk: "Medium",
    explanation:
      "High request and response volume can increase bandwidth requirements.",
  },
  {
    component: "Cache",
    risk: "Low",
    explanation:
      "Cache capacity may need to grow, but caching can reduce pressure on downstream systems.",
  },
];

const scalabilityFlow = [
  {
    title: "Understand Workload",
    description: "Estimate users, requests, data, and growth.",
  },
  {
    title: "Map Resources",
    description: "Identify compute, storage, network, and database usage.",
  },
  {
    title: "Find Bottlenecks",
    description: "Determine which component limits scaling first.",
  },
  {
    title: "Choose Strategy",
    description: "Explain horizontal, vertical, caching, or partitioning decisions.",
  },
  {
    title: "Validate Limits",
    description: "Explain where the architecture eventually reaches a limit.",
  },
];

const recommendations = [
  {
    title: "Quantify Workload Growth",
    reason:
      "The explanation describes scalability conceptually but does not provide enough numbers.",
    action:
      "Estimate requests per second, concurrent users, data growth, and expected traffic increases.",
  },
  {
    title: "Prioritize Bottlenecks",
    reason:
      "Several possible bottlenecks are mentioned without identifying the most important one.",
    action:
      "Explain which component saturates first and why.",
  },
  {
    title: "Explain the Scaling Boundary",
    reason:
      "A scalable architecture still has practical limits.",
    action:
      "State the expected performance limit and what architectural change would be required beyond it.",
  },
];

export default function AIInterviewAnswerTechnicalScalabilityExplanationCoach() {
  const [selectedFactor, setSelectedFactor] = useState(
    scalabilityFactors[0]
  );
  const [selectedQuestion, setSelectedQuestion] = useState(
    scalabilityQuestions[0]
  );
  const [showQuestions, setShowQuestions] = useState(false);
  const [showBottlenecks, setShowBottlenecks] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = Math.round(
    scalabilityFactors.reduce(
      (sum, factor) => sum + factor.score,
      0
    ) / scalabilityFactors.length
  );

  const strongFactors = scalabilityFactors.filter(
    (factor) => factor.score >= 80
  ).length;

  const weakFactors = scalabilityFactors.filter(
    (factor) => factor.score < 70
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
            AI Technical Scalability Explanation Coach
          </h1>

          <p className="text-gray-500">
            Learn to explain why a solution scales, how resources grow, where
            bottlenecks appear, and when performance limits are reached.
          </p>

        </div>

      </div>

      {/* Overall Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              SCALABILITY EXPLANATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {overallScore >= 80
                ? "Strong Scalability Reasoning"
                : overallScore >= 65
                ? "Good, With Some Gaps"
                : "Needs Scalability Practice"}
            </h2>

            <p className="text-gray-600 mt-2">
              The score measures whether the candidate can justify scalability
              using workload, resources, bottlenecks, scaling strategies, and
              performance limits.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <TrendingUp
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overall Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Strong Factors
            </p>

            <p className="text-3xl font-black text-green-600">
              {strongFactors}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Improvement Areas
            </p>

            <p className="text-3xl font-black text-orange-600">
              {weakFactors}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Server
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Factors Analyzed
            </p>

            <p className="text-3xl font-black text-purple-600">
              {scalabilityFactors.length}
            </p>

          </div>

        </div>

      </div>

      {/* Scalability Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Scalability Reasoning Factors
            </h2>

            <p className="text-sm text-gray-500">
              Select a factor to inspect the AI evaluation.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {scalabilityFactors.map((factor, index) => (

            <button
              type="button"
              key={factor.name}
              onClick={() => setSelectedFactor(factor)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedFactor.name === factor.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {factor.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {factor.status}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        factor.score >= 80
                          ? "bg-green-100 text-green-700"
                          : factor.score >= 70
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {factor.score}/100
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        factor.score >= 80
                          ? "bg-green-500"
                          : factor.score >= 70
                          ? "bg-indigo-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${factor.score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Factor */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SCALABILITY FACTOR ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedFactor.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedFactor.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedFactor.score}/100
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedFactor.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Interview Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Scalability Challenge Questions
              </h2>

              <p className="text-sm text-gray-500">
                AI asks follow-up questions that require the candidate to
                justify scalability.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-4 mt-6">

            {scalabilityQuestions.map((item, index) => (

              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedQuestion(item)}
                className={`w-full text-left border rounded-xl p-5 ${
                  selectedQuestion.title === item.title
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2">
                      {item.question}
                    </p>

                    <p className="text-xs text-indigo-600 mt-2">
                      Purpose: {item.purpose}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Question */}
      <div className="bg-purple-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-purple-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-purple-600">
              CURRENT SCALABILITY CHALLENGE
            </p>

            <h2 className="text-xl font-bold text-purple-800 mt-1">
              {selectedQuestion.title}
            </h2>

            <p className="text-lg font-semibold text-gray-700 mt-3">
              {selectedQuestion.question}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              {selectedQuestion.purpose}
            </p>

          </div>

        </div>

      </div>

      {/* Bottlenecks */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Gauge className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Bottleneck Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Identify which system component is most likely to limit
                scalability.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowBottlenecks(!showBottlenecks)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showBottlenecks
              ? "Hide Bottlenecks"
              : "Show Bottlenecks"}
          </button>

        </div>

        {showBottlenecks && (
          <div className="space-y-4 mt-6">

            {bottlenecks.map((item) => (

              <div
                key={item.component}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {item.component}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.risk === "High"
                        ? "bg-red-100 text-red-700"
                        : item.risk === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.risk} Risk
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {item.explanation}
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
                AI Scalability Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve the reasoning behind scalability claims.
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

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Scalability Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                Move from a simple scalability claim to evidence-based
                reasoning.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFlow(!showFlow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFlow ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showFlow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {scalabilityFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[160px]">

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

                {index < scalabilityFlow.length - 1 && (
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
          Analyze Scalability Explanation
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
                Scalability explanation analysis generated successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can evaluate workload growth,
                resource usage, bottlenecks, scaling strategies, and practical
                performance limits in candidate answers.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Do not just say “it scales” — explain why.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong scalability answer connects workload growth to resource
              consumption, identifies bottlenecks, explains the scaling
              strategy, and acknowledges the limits of the architecture.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}