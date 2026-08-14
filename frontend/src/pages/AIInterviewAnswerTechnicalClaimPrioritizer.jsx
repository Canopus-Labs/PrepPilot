import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const claims = [
  {
    claim:
      "Redis caching will significantly reduce database load.",
    importance: "Critical",
    score: 94,
    support: 48,
    status: "Unsupported",
    reason:
      "The answer states the benefit but does not explain cache hit rate, invalidation, or which requests are cacheable.",
    evidence:
      "Explain the expected cache hit rate and identify which read-heavy operations benefit from caching.",
    followUp:
      "How would you know whether Redis is actually reducing database load?",
  },
  {
    claim:
      "The system can scale horizontally by adding more application servers.",
    importance: "High",
    score: 86,
    support: 72,
    status: "Partially Supported",
    reason:
      "The scaling direction is reasonable, but the answer does not address shared state or load balancing.",
    evidence:
      "Explain stateless application servers, load balancing, and how shared state is handled.",
    followUp:
      "What changes would you need if application instances cannot share local state?",
  },
  {
    claim:
      "Using PostgreSQL provides reliable persistent storage.",
    importance: "Medium",
    score: 65,
    support: 91,
    status: "Well Supported",
    reason:
      "The claim is connected to persistence and relational data requirements.",
    evidence:
      "Mention transactions, durability, and consistency requirements when relevant.",
    followUp:
      "Why would PostgreSQL be preferable to a NoSQL database for this workload?",
  },
];

const claimCategories = [
  {
    title: "Architecture",
    count: 3,
    description: "Claims about components, services, and system structure.",
  },
  {
    title: "Performance",
    count: 2,
    description: "Claims about latency, throughput, and optimization.",
  },
  {
    title: "Scalability",
    count: 2,
    description: "Claims about handling increased workload.",
  },
  {
    title: "Reliability",
    count: 1,
    description: "Claims about failures, availability, and recovery.",
  },
];

const evidenceTypes = [
  "Measured metrics",
  "Complexity analysis",
  "Architecture reasoning",
  "Trade-off explanation",
  "Concrete examples",
  "Failure scenarios",
];

const recommendations = [
  {
    title: "Defend Critical Claims First",
    reason:
      "Your caching claim has the highest impact but the weakest supporting reasoning.",
    action:
      "Explain why caching helps, what data is cached, and how cache effectiveness would be measured.",
  },
  {
    title: "Connect Claims to Evidence",
    reason:
      "Several claims are technically plausible but lack explicit justification.",
    action:
      "For each major claim, provide a reason, constraint, metric, or example.",
  },
  {
    title: "Prepare for Challenge Questions",
    reason:
      "Interviewers often test the assumptions behind strong technical claims.",
    action:
      "Practice answering follow-ups about failure cases, trade-offs, and measurement.",
  },
];

const workflow = [
  {
    title: "Extract",
    description: "Identify technical claims.",
  },
  {
    title: "Rank",
    description: "Measure importance and impact.",
  },
  {
    title: "Validate",
    description: "Check supporting reasoning.",
  },
  {
    title: "Coach",
    description: "Suggest stronger evidence.",
  },
  {
    title: "Challenge",
    description: "Generate follow-up questions.",
  },
];

export default function AIInterviewAnswerTechnicalClaimPrioritizer() {
  const [selectedClaim, setSelectedClaim] = useState(0);
  const [showClaims, setShowClaims] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const currentClaim = claims[selectedClaim];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Claim Prioritizer
          </h1>

          <p className="text-gray-500">
            Identify the most important technical claims in your answer and
            strengthen the reasoning behind them.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                71%
              </p>

              <p className="text-xs text-gray-500">
                Claim Quality
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TECHNICAL CLAIM ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              1 Critical Claim Needs Stronger Support
            </h2>

            <p className="text-gray-600 mt-2">
              Your answer contains several useful technical claims, but the
              most important claim currently has insufficient supporting
              reasoning.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Claims
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {claims.length}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Unsupported
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Partial
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Supported
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <MessageSquare className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Follow-ups
            </p>

            <p className="text-3xl font-black text-purple-600">
              3
            </p>

          </div>

        </div>

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Technical Answer
            </h2>

            <p className="text-sm text-gray-500">
              AI extracts and evaluates the technical claims from the answer.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "I would use Redis to reduce database load and improve response
            times. The application can scale horizontally by adding more
            servers behind a load balancer. PostgreSQL would provide reliable
            persistent storage for the application data."
          </p>

        </div>

      </div>

      {/* Claims */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Prioritized Technical Claims
            </h2>

            <p className="text-sm text-gray-500">
              Claims are ranked by technical importance and impact.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowClaims(!showClaims)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showClaims
              ? "Hide Claims"
              : "Show Claims"}
          </button>

        </div>

        {showClaims && (
          <div className="space-y-4 mt-6">

            {claims.map((claim, index) => (

              <button
                type="button"
                key={claim.claim}
                onClick={() => setSelectedClaim(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedClaim === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">
                        {claim.claim}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">

                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                          {claim.importance}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            claim.status === "Unsupported"
                              ? "bg-red-100 text-red-700"
                              : claim.status === "Partially Supported"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {claim.status}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-gray-500">
                      Importance
                    </p>

                    <p className="text-2xl font-black text-indigo-600">
                      {claim.score}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Claim Analysis */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              HIGHEST PRIORITY CLAIM
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              {currentClaim.claim}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  IMPORTANCE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-2">
                  {currentClaim.score}/100
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  SUPPORT QUALITY
                </p>

                <p className="text-3xl font-black text-red-600 mt-2">
                  {currentClaim.support}/100
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                WHY THIS MATTERS
              </p>

              <p className="text-sm text-gray-700 mt-2">
                {currentClaim.reason}
              </p>

            </div>

            <div className="bg-indigo-50 rounded-xl p-5 mt-4">

              <p className="text-xs font-bold text-indigo-600">
                SUGGESTED EVIDENCE
              </p>

              <p className="text-sm text-gray-700 mt-2">
                {currentClaim.evidence}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Evidence Types */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Evidence & Reasoning Types
              </h2>

              <p className="text-sm text-gray-500">
                Ways to strengthen important technical claims.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowEvidence(!showEvidence)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvidence
              ? "Hide Evidence"
              : "Show Evidence"}
          </button>

        </div>

        {showEvidence && (
          <div className="flex flex-wrap gap-3 mt-6">

            {evidenceTypes.map((type) => (

              <div
                key={type}
                className="px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm"
              >
                {type}
              </div>

            ))}

          </div>
        )}

      </div>

      {/* Follow-up Question */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <MessageSquare
            className="text-orange-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              TARGETED INTERVIEW FOLLOW-UP
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              How would you prove that your caching strategy is actually
              reducing database load?
            </h2>

            <p className="text-sm text-gray-600 mt-3">
              This question directly tests the highest-impact unsupported
              claim in your answer.
            </p>

          </div>

        </div>

      </div>

      {/* Claim Categories */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Claim Categories
            </h2>

            <p className="text-sm text-gray-500">
              Understand where your technical claims are concentrated.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowCategories(!showCategories)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCategories
              ? "Hide Categories"
              : "Show Categories"}
          </button>

        </div>

        {showCategories && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {claimCategories.map((category) => (

              <div
                key={category.title}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {category.title}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {category.count}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {category.description}
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
                AI Coaching Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve the most important claims first.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(
                !showRecommendations
              )
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

            {recommendations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {item.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Practice Formula */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Defend the claims that matter most
            </h2>

            <p className="text-gray-600 mt-2">
              You do not need to explain every statement with equal depth.
              Focus your strongest reasoning on claims that significantly
              influence architecture, performance, reliability, or correctness.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                PRACTICE FORMULA
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Claim → Importance → Evidence → Reasoning → Follow-up
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Reanalyze Technical Answer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate claim importance and support after improving your
              explanation.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Reanalyze Claims
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Technical claims reanalyzed successfully.
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
                Technical Claim Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI prioritizes and validates technical claims.
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
              Prioritize reasoning, not just information.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong technical answer does not need to defend every sentence
              equally. Identify the claims that drive the most important
              decisions and provide clear reasoning, evidence, and trade-offs
              for those claims.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}