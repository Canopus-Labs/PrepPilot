import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const decisions = [
  {
    title: "Use Redis for caching",
    confidence: 86,
    reasoning: 90,
    alternatives: 78,
    uncertainty: "Low",
    status: "Strong",
    explanation:
      "The candidate clearly connected caching to read-heavy traffic and latency reduction.",
    improvement:
      "Mention when caching may become unnecessary or introduce consistency issues.",
  },
  {
    title: "Use PostgreSQL as the primary database",
    confidence: 72,
    reasoning: 75,
    alternatives: 58,
    uncertainty: "Medium",
    status: "Good",
    explanation:
      "The decision is reasonable, but the comparison with NoSQL alternatives was limited.",
    improvement:
      "Explain why relational guarantees are more important for this workload.",
  },
  {
    title: "Use horizontal scaling",
    confidence: 61,
    reasoning: 64,
    alternatives: 48,
    uncertainty: "High",
    status: "Needs Work",
    explanation:
      "The candidate selected horizontal scaling but sounded uncertain about its operational trade-offs.",
    improvement:
      "Explain statelessness, load balancing, and when vertical scaling could be preferable.",
  },
];

export default function AIInterviewAnswerTechnicalDecisionConfidenceAnalyzer() {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showFramework, setShowFramework] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallConfidence = Math.round(
    decisions.reduce((sum, item) => sum + item.confidence, 0) /
      decisions.length
  );

  const strongDecisions = decisions.filter(
    (item) => item.confidence >= 80
  ).length;

  const uncertainDecisions = decisions.filter(
    (item) => item.uncertainty === "High"
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
            AI Technical Decision Confidence Analyzer
          </h1>

          <p className="text-gray-500">
            Analyze how confidently and convincingly technical decisions are
            presented during interviews.
          </p>
        </div>

      </div>

      {/* Objective */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              DECISION CONFIDENCE ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Confidence should come from reasoning, not just certainty.
            </h2>

            <p className="text-gray-600 mt-2">
              AI evaluates your technical decisions, supporting evidence,
              alternatives, and uncertainty to determine how convincingly
              each decision is communicated.
            </p>

          </div>

        </div>

      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Overall Confidence
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              {overallConfidence}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Strong Decisions
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              {strongDecisions}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Decisions Analyzed
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {decisions.length}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              High Uncertainty
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              {uncertainDecisions}
            </p>

          </div>

        </div>

      </div>

      {/* Decision Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Technical Decisions
            </h2>

            <p className="text-sm text-gray-500">
              Select a decision to inspect its confidence analysis.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {decisions.map((decision) => (

            <button
              type="button"
              key={decision.title}
              onClick={() => setSelectedDecision(decision)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedDecision?.title === decision.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div
                  className={`p-3 rounded-xl ${
                    decision.confidence >= 80
                      ? "bg-green-100 text-green-600"
                      : decision.confidence >= 65
                      ? "bg-orange-100 text-orange-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {decision.confidence >= 80 ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <AlertTriangle size={24} />
                  )}
                </div>

                <div className="flex-1">

                  <h3 className="font-bold">
                    {decision.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {decision.explanation}
                  </p>

                </div>

                <div className="text-right">

                  <p
                    className={`text-2xl font-black ${
                      decision.confidence >= 80
                        ? "text-green-600"
                        : decision.confidence >= 65
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {decision.confidence}%
                  </p>

                  <p className="text-xs text-gray-500">
                    confidence
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Decision */}
      {selectedDecision && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <ShieldCheck
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-indigo-600">
                DECISION DEBRIEF
              </p>

              <h2 className="text-2xl font-black text-indigo-800 mt-1">
                {selectedDecision.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedDecision.explanation}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs text-gray-500">
                    DECISION CONFIDENCE
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-1">
                    {selectedDecision.confidence}%
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs text-gray-500">
                    REASONING QUALITY
                  </p>

                  <p className="text-2xl font-black text-green-600 mt-1">
                    {selectedDecision.reasoning}%
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs text-gray-500">
                    ALTERNATIVES
                  </p>

                  <p className="text-2xl font-black text-orange-600 mt-1">
                    {selectedDecision.alternatives}%
                  </p>

                </div>

              </div>

              <div className="mt-5 bg-white rounded-xl p-5">

                <div className="flex gap-3">

                  <Lightbulb
                    className="text-indigo-600"
                    size={22}
                  />

                  <div>

                    <p className="text-xs font-bold text-indigo-600">
                      IMPROVEMENT SUGGESTION
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {selectedDecision.improvement}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Reasoning Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Supporting Reasoning Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Strong technical decisions should be supported by clear,
              constraint-driven reasoning.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {[
            {
              title: "Problem Constraints",
              score: 86,
              description:
                "Decision is connected to the requirements of the problem.",
            },
            {
              title: "Technical Evidence",
              score: 78,
              description:
                "Reasoning includes relevant performance and architecture factors.",
            },
            {
              title: "Alternative Consideration",
              score: 61,
              description:
                "Alternative approaches are not consistently discussed.",
            },
            {
              title: "Trade-Off Awareness",
              score: 69,
              description:
                "Some benefits are explained more clearly than drawbacks.",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="border rounded-xl p-5"
            >

              <div className="flex items-center gap-4">

                <div className="flex-1">

                  <h3 className="font-bold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                </div>

                <p
                  className={`text-xl font-black ${
                    item.score >= 80
                      ? "text-green-600"
                      : item.score >= 65
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {item.score}%
                </p>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-4">

                <div
                  className={`h-full rounded-full ${
                    item.score >= 80
                      ? "bg-green-500"
                      : item.score >= 65
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${item.score}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Uncertainty Detection */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              UNCERTAINTY DETECTION
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Some decisions sound less certain than the reasoning supports.
            </h2>

            <p className="text-gray-600 mt-2">
              AI detected language patterns such as "maybe", "I think",
              "probably", and incomplete justification around some technical
              choices.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  UNCERTAINTY LEVEL
                </p>

                <p className="text-xl font-black text-orange-600 mt-1">
                  Medium
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  AFFECTED DECISIONS
                </p>

                <p className="text-xl font-black text-orange-600 mt-1">
                  1
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  MAIN AREA
                </p>

                <p className="text-xl font-black text-orange-600 mt-1">
                  Scalability
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Alternative Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Alternative Consideration
            </h2>

            <p className="text-sm text-gray-500">
              Confidence improves when candidates can explain why alternatives
              were rejected.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <CheckCircle2 className="text-green-600" />

            <h3 className="font-bold mt-3">
              Selected Approach
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Clearly explain what the chosen approach provides.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <MessageSquare className="text-indigo-600" />

            <h3 className="font-bold mt-3">
              Alternative
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Identify at least one reasonable alternative.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Lightbulb className="text-orange-600" />

            <h3 className="font-bold mt-3">
              Trade-Off
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Explain why the selected option fits the current constraints.
            </p>

          </div>

        </div>

      </div>

      {/* Follow-up Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Follow-Up Challenges
            </h2>

            <p className="text-sm text-gray-500">
              Practice defending the decisions that received lower confidence
              scores.
            </p>

          </div>

        </div>

        <div className="space-y-3 mt-6">

          {[
            "Why did you choose horizontal scaling instead of vertical scaling?",
            "What would make you replace PostgreSQL with a NoSQL database?",
            "What trade-off does Redis introduce?",
            "Under what conditions would your selected architecture stop being effective?",
          ].map((question, index) => (

            <div
              key={question}
              className="flex gap-4 border rounded-xl p-4"
            >

              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <p className="font-semibold">
                {question}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Coaching Framework */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Decision Framework
              </h2>

              <p className="text-sm text-gray-500">
                Use this structure to present technical decisions confidently.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFramework(!showFramework)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFramework
              ? "Hide Framework"
              : "Show Framework"}
          </button>

        </div>

        {showFramework && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {[
              "State Decision",
              "Explain Why",
              "Connect to Constraints",
              "Compare Alternative",
              "Discuss Trade-Off",
              "State Confidence",
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
        )}

      </div>

      {/* AI Recommendation */}
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
              Avoid trying to sound confident by simply speaking more
              assertively. Build confidence through evidence: connect the
              decision to constraints, compare alternatives, explain trade-offs,
              and state when the decision would need to change.
            </p>

          </div>

        </div>

      </div>

      {/* Practice Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Decision Confidence
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
              Technical decision confidence analysis completed successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}