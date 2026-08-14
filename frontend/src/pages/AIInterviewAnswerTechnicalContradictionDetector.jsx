import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Search,
  GitBranch,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const claims = [
  {
    id: 1,
    claim: "The API is stateless, so any server can handle any request.",
    type: "Architecture",
    status: "Consistent",
  },
  {
    id: 2,
    claim: "Each user session is stored locally on the application server.",
    type: "Architecture",
    status: "Contradiction",
  },
  {
    id: 3,
    claim: "Redis is used to store shared session information.",
    type: "Storage",
    status: "Needs Context",
  },
  {
    id: 4,
    claim: "The cache is optional because the database can handle all requests.",
    type: "Performance",
    status: "Contradiction",
  },
];

const contradictions = [
  {
    first: "The API is stateless, so any server can handle any request.",
    second: "Each user session is stored locally on the application server.",
    reason:
      "Local session state can require requests from the same user to reach the same server, which conflicts with the stated stateless behavior.",
    severity: "High",
    question:
      "Are user sessions actually stored locally, or are they stored in shared storage such as Redis?",
  },
  {
    first: "The cache is optional because the database can handle all requests.",
    second: "The system must support millions of users with very low latency.",
    reason:
      "The claim that caching is unnecessary may conflict with the stated high-scale and low-latency requirements.",
    severity: "Medium",
    question:
      "Under peak traffic, how would the database maintain the required latency without caching?",
  },
];

const clarificationQuestions = [
  "Is the application truly stateless if session data is stored locally?",
  "Which component is the source of truth for session information?",
  "Is Redis required for scalability or only used as an optimization?",
  "What happens when a request reaches a different application server?",
];

export default function AIInterviewAnswerTechnicalContradictionDetector() {
  const [selectedContradiction, setSelectedContradiction] =
    useState(null);
  const [showClaims, setShowClaims] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const contradictionCount = contradictions.length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Contradiction Detector
          </h1>

          <p className="text-gray-500">
            Detect conflicting technical claims and maintain consistent
            reasoning throughout your interview answer.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Search
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TECHNICAL CONSISTENCY ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              AI found {contradictionCount} potential contradictions.
            </h2>

            <p className="text-gray-600 mt-2">
              The system compares related technical claims instead of
              evaluating each sentence independently.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Claims Analyzed
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              {claims.length}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Contradictions
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              {contradictionCount}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              High Severity
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {contradictions.filter(
                (item) => item.severity === "High"
              ).length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Consistent Claims
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              {claims.filter(
                (item) => item.status === "Consistent"
              ).length}
            </p>

          </div>

        </div>

      </div>

      {/* Claims */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Search className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Claims
              </h2>

              <p className="text-sm text-gray-500">
                Important claims extracted from the candidate's answer.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowClaims(!showClaims)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showClaims ? "Hide Claims" : "Show Claims"}
          </button>

        </div>

        {showClaims && (
          <div className="space-y-4 mt-6">

            {claims.map((item) => (

              <div
                key={item.id}
                className="border rounded-xl p-5"
              >

                <div className="flex items-start gap-4">

                  {item.status === "Consistent" ? (
                    <CheckCircle2
                      className="text-green-600 mt-1"
                      size={22}
                    />
                  ) : item.status === "Contradiction" ? (
                    <AlertTriangle
                      className="text-red-600 mt-1"
                      size={22}
                    />
                  ) : (
                    <Search
                      className="text-orange-600 mt-1"
                      size={22}
                    />
                  )}

                  <div className="flex-1">

                    <p className="font-semibold">
                      {item.claim}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      Category: {item.type}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Consistent"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Contradiction"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Contradictions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-red-600" />

          <div>

            <h2 className="font-bold text-lg">
              Detected Contradictions
            </h2>

            <p className="text-sm text-gray-500">
              Related claims that may conflict with each other.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {contradictions.map((item, index) => (

            <button
              type="button"
              key={item.first}
              onClick={() => setSelectedContradiction(item)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedContradiction?.first === item.first
                  ? "border-red-500 bg-red-50"
                  : "hover:border-red-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                      Claim A
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-gray-400"
                    />

                    <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold">
                      Conflicts With
                    </span>

                  </div>

                  <p className="font-semibold mt-3">
                    {item.first}
                  </p>

                  <p className="font-semibold text-gray-600 mt-2">
                    {item.second}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.severity === "High"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.severity}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Contradiction */}
      {selectedContradiction && (
        <div className="bg-red-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <GitBranch
              className="text-red-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-red-600">
                CONTRADICTION ANALYSIS
              </p>

              <h2 className="text-xl font-bold text-red-800 mt-1">
                Why these statements conflict
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs font-bold text-gray-500">
                    CLAIM A
                  </p>

                  <p className="font-semibold mt-2">
                    {selectedContradiction.first}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs font-bold text-gray-500">
                    CLAIM B
                  </p>

                  <p className="font-semibold mt-2">
                    {selectedContradiction.second}
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-red-600">
                  AI EXPLANATION
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {selectedContradiction.reason}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5 mt-4">

                <div className="flex gap-3">

                  <MessageSquare
                    className="text-indigo-600"
                    size={22}
                  />

                  <div>

                    <p className="text-xs font-bold text-indigo-600">
                      CLARIFICATION QUESTION
                    </p>

                    <p className="font-semibold mt-1">
                      {selectedContradiction.question}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Consistency Map */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Technical Consistency Map
            </h2>

            <p className="text-sm text-gray-500">
              AI connects related claims to identify inconsistent reasoning.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Extract Claims",
            "Group Related Claims",
            "Compare Statements",
            "Detect Conflicts",
            "Explain Contradiction",
            "Ask Clarification",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
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

      {/* Clarification Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Clarification Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help resolve inconsistent technical claims.
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
          <div className="space-y-3 mt-6">

            {clarificationQuestions.map((question, index) => (

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
        )}

      </div>

      {/* Root Cause */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI ROOT-CAUSE INSIGHT
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Most inconsistencies come from changing assumptions mid-answer.
            </h2>

            <p className="text-gray-600 mt-2">
              Before making a technical claim, clearly define the assumptions
              and constraints that support it. When those conditions change,
              explicitly explain how the design changes.
            </p>

          </div>

        </div>

      </div>

      {/* Prevention Checklist */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Contradiction Prevention Checklist
            </h2>

            <p className="text-sm text-gray-500">
              Use this checklist before finalizing a technical explanation.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {[
            "Are all major assumptions clearly stated?",
            "Does the architecture match the stated requirements?",
            "Are storage and caching claims consistent?",
            "Do scalability claims match the selected design?",
            "Are failure-handling statements compatible with the architecture?",
            "Have changes in requirements been explicitly addressed?",
          ].map((item) => (

            <div
              key={item}
              className="flex gap-3 border rounded-xl p-4"
            >

              <CheckCircle2
                className="text-green-600 flex-shrink-0"
                size={20}
              />

              <p className="text-sm font-semibold">
                {item}
              </p>

            </div>
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
              Keep a consistent mental model throughout your answer. When you
              introduce a new technical decision, verify that it does not
              conflict with earlier assumptions, architecture choices, or
              performance claims.
            </p>

          </div>

        </div>

      </div>

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Technical Consistency
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
              Technical contradiction analysis completed successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}