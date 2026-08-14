import React, { useState } from "react";
import {
  Brain,
  Target,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Search,
  ArrowRight,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const tradeoffs = [
  {
    claim: "Approach A is more scalable.",
    factor: "Scalability",
    evidence: "Missing",
    severity: "High",
    question: "Why is Approach A more scalable as the workload increases?",
    suggestion:
      "Explain how time complexity, throughput, resource usage, or architecture affects scaling.",
  },
  {
    claim: "HashMap is better for this solution.",
    factor: "Lookup Performance",
    evidence: "Partial",
    severity: "Medium",
    question: "Better in which measurable dimension?",
    suggestion:
      "Compare expected lookup complexity, memory usage, and workload characteristics.",
  },
  {
    claim: "The database approach is easier to maintain.",
    factor: "Maintainability",
    evidence: "Provided",
    severity: "Low",
    question: "What makes the maintenance burden lower?",
    suggestion:
      "Mention centralized data management, schema consistency, tooling, or operational complexity.",
  },
];

const evidenceFactors = [
  "Time Complexity",
  "Space Complexity",
  "Scalability",
  "Latency",
  "Memory Usage",
  "Reliability",
  "Maintainability",
  "Implementation Complexity",
];

export default function AIInterviewAnswerTechnicalTradeOffEvidence() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedTradeoff, setSelectedTradeoff] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);

  const analyzeAnswer = () => {
    if (!answer.trim()) return;
    setAnalyzed(true);
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
            AI Technical Trade-Off Evidence Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether technical trade-off claims are supported by clear
            reasoning and evidence.
          </p>

        </div>

      </div>

      {/* Problem Context */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Context
            </h2>

            <p className="text-sm text-gray-500">
              Compare two possible approaches for handling a large number of
              user requests.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">

          <div className="border rounded-xl p-5">

            <h3 className="font-bold">
              Approach A
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Use a distributed caching layer to reduce repeated database
              queries.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <h3 className="font-bold">
              Approach B
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Query the primary database directly for every request.
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
              Your Technical Explanation
            </h2>

            <p className="text-sm text-gray-500">
              Enter the explanation you would give to an interviewer.
            </p>

          </div>

        </div>

        <textarea
          rows={9}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={`Example:

I would choose Approach A because it is more scalable.
It reduces database load and should perform better when
the number of users increases.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Trade-Off Evidence
        </button>

      </div>

      {analyzed && (
        <>
          {/* Main Verdict */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl">

                <AlertTriangle
                  className="text-orange-600"
                  size={30}
                />

              </div>

              <div>

                <p className="text-xs font-bold text-orange-600">
                  TRADE-OFF EVIDENCE REVIEW
                </p>

                <h2 className="text-2xl font-black text-orange-700 mt-1">
                  Supporting Evidence Is Incomplete
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer contains valid comparison claims, but some of
                  them are not supported by enough technical reasoning.
                </p>

              </div>

            </div>

          </div>

          {/* Trade-Off Claims */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Scale className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Detected Trade-Off Claims
                </h2>

                <p className="text-sm text-gray-500">
                  Select a claim to inspect its evidence quality.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {tradeoffs.map((tradeoff) => (

                <button
                  type="button"
                  key={tradeoff.claim}
                  onClick={() =>
                    setSelectedTradeoff(tradeoff)
                  }
                  className={`w-full text-left border rounded-2xl p-5 transition ${
                    selectedTradeoff?.claim === tradeoff.claim
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex flex-wrap justify-between gap-3">

                    <div className="flex gap-3">

                      <Scale
                        className={
                          tradeoff.severity === "High"
                            ? "text-red-600"
                            : tradeoff.severity === "Medium"
                            ? "text-orange-600"
                            : "text-green-600"
                        }
                        size={22}
                      />

                      <div>

                        <h3 className="font-bold">
                          {tradeoff.claim}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Comparison factor: {tradeoff.factor}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-2 h-fit">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tradeoff.evidence === "Provided"
                            ? "bg-green-100 text-green-700"
                            : tradeoff.evidence === "Partial"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tradeoff.evidence}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tradeoff.severity === "High"
                            ? "bg-red-100 text-red-700"
                            : tradeoff.severity === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {tradeoff.severity}
                      </span>

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Selected Trade-Off */}
          {selectedTradeoff && (
            <div className="bg-red-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <Scale
                  className="text-red-600"
                  size={30}
                />

                <div className="flex-1">

                  <p className="text-xs font-bold text-red-600">
                    SELECTED TRADE-OFF
                  </p>

                  <h2 className="text-2xl font-black text-red-700 mt-1">
                    {selectedTradeoff.claim}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    The comparison focuses on{" "}
                    <strong>{selectedTradeoff.factor}</strong>, but the
                    supporting evidence is{" "}
                    <strong>{selectedTradeoff.evidence.toLowerCase()}</strong>
                    .
                  </p>

                  <div className="mt-5 bg-white rounded-xl p-5">

                    <div className="flex gap-3">

                      <MessageSquare
                        className="text-indigo-600"
                        size={22}
                      />

                      <div>

                        <p className="text-xs font-bold text-gray-500">
                          TARGETED FOLLOW-UP
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                          {selectedTradeoff.question}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="mt-4 bg-white rounded-xl p-5">

                    <div className="flex gap-3">

                      <Lightbulb
                        className="text-orange-600"
                        size={22}
                      />

                      <div>

                        <p className="text-xs font-bold text-gray-500">
                          EVIDENCE TO ADD
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                          {selectedTradeoff.suggestion}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Evidence Factors */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <BarChart3 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Trade-Off Evidence Factors
                </h2>

                <p className="text-sm text-gray-500">
                  Strong technical comparisons should explain which factors
                  make one option preferable.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              {evidenceFactors.map((factor) => (

                <div
                  key={factor}
                  className="border rounded-xl p-4"
                >

                  <CheckCircle2
                    className="text-indigo-600"
                    size={20}
                  />

                  <p className="font-semibold text-sm mt-3">
                    {factor}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Evidence Quality */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Evidence Quality
                </h2>

                <p className="text-sm text-gray-500">
                  Understand what makes a technical trade-off defensible.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

              <div className="border rounded-xl p-5">

                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Claim Only
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  "This solution is better" without explaining why.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Scale className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Partial Evidence
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Identifies a comparison factor but does not fully explain its
                  impact.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <CheckCircle2 className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Evidence-Based
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Connects the decision to measurable technical factors and
                  requirements.
                </p>

              </div>

            </div>

          </div>

          {/* Follow-Up Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  INTERVIEWER CHALLENGE
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-2">
                  What specific evidence makes your selected approach better
                  under the given constraints?
                </h2>

                <p className="text-gray-600 mt-3">
                  Avoid repeating the original claim. Explain the technical
                  factor, its impact, and why that impact matters for this
                  particular problem.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowQuestions(!showQuestions)
                  }
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  {showQuestions
                    ? "Hide Follow-Ups"
                    : "Show Follow-Up Questions"}
                </button>

              </div>

            </div>

          </div>

          {showQuestions && (
            <div className="bg-white rounded-2xl shadow p-6">

              <div className="space-y-3">

                {[
                  "Which requirement influenced your decision?",
                  "What happens to performance as traffic increases?",
                  "What is the memory cost of your chosen approach?",
                  "What are you giving up by choosing this approach?",
                  "Under what conditions would the alternative become better?",
                ].map((question, index) => (

                  <div
                    key={question}
                    className="flex gap-4 border rounded-xl p-4"
                  >

                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <p className="text-sm text-gray-700 pt-1">
                      {question}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* Recommended Framework */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Trade-Off Explanation
                </h2>

                <p className="text-sm text-gray-500">
                  Use this structure when defending technical decisions.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "State Decision",
                "Identify Factor",
                "Provide Evidence",
                "Explain Impact",
                "Acknowledge Trade-Off",
                "State When Alternative Wins",
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

          {/* Example */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Stronger Technical Explanation
                </h2>

                <p className="text-gray-600 mt-2">
                  "I would choose the caching approach because it reduces
                  repeated database reads. Under high read traffic, this can
                  lower database load and improve response latency. The trade-off
                  is additional memory usage and cache invalidation complexity,
                  so I would prefer the direct database approach if the workload
                  has low repetition or requires strongly consistent reads."
                </p>

              </div>

            </div>

          </div>

          {/* Score */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <BarChart3 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Technical Trade-Off Evidence Score
                </h2>

                <p className="text-sm text-gray-500">
                  Measures how well your technical comparisons are supported.
                </p>

              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Evidence Strength
                </span>

                <span className="font-black text-orange-600">
                  64 / 100
                </span>

              </div>

              <div className="h-5 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "64%" }}
                />

              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-5">

                <div className="bg-green-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Claims Detected
                  </p>

                  <p className="text-2xl font-black text-green-600">
                    3
                  </p>

                </div>

                <div className="bg-orange-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Evidence Gaps
                  </p>

                  <p className="text-2xl font-black text-orange-600">
                    2
                  </p>

                </div>

                <div className="bg-red-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Follow-Ups
                  </p>

                  <p className="text-2xl font-black text-red-600">
                    4
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  When you claim that one technical approach is better, always
                  connect the claim to a specific factor, explain the impact,
                  and acknowledge the trade-off. This makes your decision
                  defensible instead of opinion-based.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Next Practice
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Compare two technical approaches and provide evidence for
                  every major trade-off.
                </p>

              </div>

              <button
                type="button"
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
              >
                Start Trade-Off Challenge
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </>
      )}

    </div>
  );
}