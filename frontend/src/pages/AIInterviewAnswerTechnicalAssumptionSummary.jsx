import React, { useState } from "react";
import {
  Brain,
  Search,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const assumptions = [
  {
    assumption: "Traffic will remain relatively predictable",
    category: "Traffic",
    status: "Supported",
    impact: "Supports the initial capacity-planning strategy.",
    question: "What happens if traffic suddenly increases by 10x?",
  },
  {
    assumption: "Frequently requested data can fit in cache",
    category: "Resources",
    status: "Partial",
    impact: "Cache effectiveness depends on available memory and data size.",
    question: "How would you handle a dataset larger than available cache memory?",
  },
  {
    assumption: "Database remains available",
    category: "Dependency",
    status: "Unsupported",
    impact: "A database outage could affect the entire request path.",
    question: "What happens when the primary database becomes unavailable?",
  },
  {
    assumption: "Requests can be distributed across service instances",
    category: "Architecture",
    status: "Supported",
    impact: "Enables horizontal scaling and load distribution.",
    question: "How would you handle uneven traffic distribution?",
  },
];

const categories = [
  "Traffic",
  "Resources",
  "Dependency",
  "Architecture",
];

export default function AIInterviewAnswerTechnicalAssumptionSummary() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedAssumption, setSelectedAssumption] =
    useState(null);
  const [showQuestions, setShowQuestions] = useState(false);

  const analyzeAnswer = () => {
    if (!answer.trim()) return;
    setAnalyzed(true);
  };

  const supported = assumptions.filter(
    (item) => item.status === "Supported"
  ).length;

  const partial = assumptions.filter(
    (item) => item.status === "Partial"
  ).length;

  const unsupported = assumptions.filter(
    (item) => item.status === "Unsupported"
  ).length;

  const confidence = Math.round(
    ((supported + partial * 0.5) /
      assumptions.length) *
      100
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
            AI Technical Assumption Summary
          </h1>

          <p className="text-gray-500">
            Identify, classify, and validate assumptions hidden inside
            technical interview answers.
          </p>
        </div>

      </div>

      {/* Objective */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PRACTICE OBJECTIVE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Make hidden assumptions visible
            </h2>

            <p className="text-gray-600 mt-2">
              AI extracts assumptions from your technical explanation,
              evaluates whether they are supported by the problem context,
              and identifies assumptions that could affect your solution.
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
              Technical Answer
            </h2>

            <p className="text-sm text-gray-500">
              Paste or write the technical explanation you want AI to analyze.
            </p>

          </div>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder={`Example:

I would use a cache because most requests will probably access
the same data. I assume the database will always be available.
We can run multiple service instances because traffic should be
fairly predictable.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Assumptions
        </button>

      </div>

      {analyzed && (
        <>
          {/* Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <GitBranch
                className="text-indigo-600"
                size={30}
              />

              <div>

                <p className="text-xs font-bold text-indigo-600">
                  ASSUMPTION ANALYSIS
                </p>

                <h2 className="text-2xl font-black text-indigo-800 mt-1">
                  {assumptions.length} Assumptions Identified
                </h2>

                <p className="text-gray-600 mt-2">
                  AI found assumptions related to traffic, resources,
                  dependencies, and architecture.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Total
                </p>
                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {assumptions.length}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Supported
                </p>
                <p className="text-3xl font-black text-green-600 mt-1">
                  {supported}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Partial
                </p>
                <p className="text-3xl font-black text-orange-600 mt-1">
                  {partial}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Unsupported
                </p>
                <p className="text-3xl font-black text-red-600 mt-1">
                  {unsupported}
                </p>
              </div>

            </div>

          </div>

          {/* Assumption List */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Search className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Extracted Assumptions
                </h2>

                <p className="text-sm text-gray-500">
                  Select an assumption to inspect its potential impact.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {assumptions.map((item) => (

                <button
                  type="button"
                  key={item.assumption}
                  onClick={() =>
                    setSelectedAssumption(item)
                  }
                  className={`w-full text-left border rounded-2xl p-5 transition ${
                    selectedAssumption?.assumption ===
                    item.assumption
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex items-start gap-4">

                    {item.status === "Supported" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={24}
                      />
                    ) : item.status === "Partial" ? (
                      <AlertTriangle
                        className="text-orange-600"
                        size={24}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-red-600"
                        size={24}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex items-center gap-3">

                        <h3 className="font-bold">
                          {item.assumption}
                        </h3>

                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                          {item.category}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {item.impact}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Supported"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Partial"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Selected Assumption */}
          {selectedAssumption && (
            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <AlertTriangle
                  className="text-orange-600"
                  size={30}
                />

                <div>

                  <p className="text-xs font-bold text-orange-600">
                    ASSUMPTION IMPACT REVIEW
                  </p>

                  <h2 className="text-xl font-bold text-orange-800 mt-1">
                    {selectedAssumption.assumption}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {selectedAssumption.impact}
                  </p>

                  <div className="mt-4 bg-white rounded-xl p-4">

                    <div className="flex gap-3">

                      <HelpCircle
                        className="text-indigo-600"
                        size={21}
                      />

                      <div>

                        <p className="text-xs font-bold text-indigo-600">
                          SUGGESTED CLARIFICATION
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {selectedAssumption.question}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Confidence */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Assumption Confidence
                </h2>

                <p className="text-sm text-gray-500">
                  Measures how well the assumptions in your answer are
                  supported or qualified.
                </p>

              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Supported Assumption Score
                </span>

                <span className="font-black text-indigo-600">
                  {confidence}%
                </span>

              </div>

              <div className="h-4 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${confidence}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitBranch className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Assumption Categories
                </h2>

                <p className="text-sm text-gray-500">
                  AI groups assumptions to make hidden dependencies easier to
                  identify.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              {categories.map((category) => {

                const count = assumptions.filter(
                  (item) => item.category === category
                ).length;

                return (
                  <div
                    key={category}
                    className="border rounded-xl p-5"
                  >

                    <p className="text-sm text-gray-500">
                      {category}
                    </p>

                    <p className="text-3xl font-black text-indigo-600 mt-1">
                      {count}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      assumption{count !== 1 ? "s" : ""}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Clarification Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <HelpCircle className="text-indigo-600" />

                <div>

                  <h2 className="font-bold text-lg">
                    AI Clarification Questions
                  </h2>

                  <p className="text-sm text-gray-500">
                    Questions an interviewer could ask about your assumptions.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowQuestions(!showQuestions)
                }
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
              >
                {showQuestions
                  ? "Hide Questions"
                  : "Show Questions"}
              </button>

            </div>

            {showQuestions && (
              <div className="space-y-3 mt-6">

                {assumptions.map((item, index) => (

                  <div
                    key={item.question}
                    className="flex gap-4 border rounded-xl p-4"
                  >

                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div>

                      <p className="font-semibold">
                        {item.question}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Related assumption: {item.assumption}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* Impact Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Potential Impact of Hidden Assumptions
                </h2>

                <p className="text-sm text-gray-500">
                  Unsupported assumptions can change whether a solution remains
                  valid.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Reliability Risk
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Assuming dependencies are always available can hide single
                  points of failure.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Brain className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Scalability Risk
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Assuming predictable traffic may make the architecture fail
                  under sudden demand.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <ShieldCheck className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Resource Risk
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Assuming unlimited memory, compute, or storage can produce
                  unrealistic designs.
                </p>

              </div>

            </div>

          </div>

          {/* AI Coaching */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Sparkles
                className="text-indigo-600"
                size={28}
              />

              <div>

                <p className="text-xs font-bold text-indigo-600">
                  AI COACHING
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-1">
                  State important assumptions explicitly.
                </h2>

                <p className="text-gray-600 mt-2">
                  A strong technical answer does not avoid assumptions. It
                  identifies them, explains why they are reasonable, and
                  describes how the design would change if they become false.
                </p>

              </div>

            </div>

          </div>

          {/* Framework */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitBranch className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Assumption Validation Framework
                </h2>

                <p className="text-sm text-gray-500">
                  Use this framework when presenting technical solutions.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Identify",
                "Categorize",
                "Validate",
                "Assess Impact",
                "Clarify",
                "Prepare Alternative",
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
                  Your strongest answers should make important assumptions
                  explicit, explain their impact, and show how your design
                  changes when those assumptions no longer hold.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}