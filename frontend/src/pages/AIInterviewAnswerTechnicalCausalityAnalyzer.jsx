import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Target,
  Search,
} from "lucide-react";

const causalClaims = [
  {
    statement:
      "Adding a database index reduces query time because the database scans fewer rows.",
    cause: "Adding a database index",
    effect: "Reduced query time",
    relationship: "Supported",
    score: 92,
    explanation:
      "An appropriate index can reduce the amount of data the database must scan for selective queries.",
  },
  {
    statement:
      "Adding more application servers always makes the database faster.",
    cause: "Adding application servers",
    effect: "Faster database performance",
    relationship: "Unsupported",
    score: 38,
    explanation:
      "More application servers can increase concurrent database traffic and may actually increase database load.",
  },
  {
    statement:
      "A cache can reduce latency because repeated requests may avoid a database round trip.",
    cause: "Using a cache",
    effect: "Reduced request latency",
    relationship: "Supported",
    score: 88,
    explanation:
      "A cache can serve frequently accessed data without requiring every request to reach the database.",
  },
  {
    statement:
      "Increasing memory automatically improves application throughput.",
    cause: "Increasing memory",
    effect: "Higher throughput",
    relationship: "Needs Context",
    score: 61,
    explanation:
      "Additional memory can help in some workloads, but throughput depends on the actual bottleneck.",
  },
];

const causalFlow = [
  {
    title: "Cause",
    description: "Identify the technical event or decision.",
  },
  {
    title: "Mechanism",
    description: "Explain how the cause produces an effect.",
  },
  {
    title: "Effect",
    description: "Identify the resulting system behavior.",
  },
  {
    title: "Evidence",
    description: "Support the relationship with technical reasoning.",
  },
];

const followUps = [
  "Why does adding application servers affect database load?",
  "Under what conditions does an index actually improve query performance?",
  "What mechanism connects caching to lower latency?",
  "Can you identify a situation where your claimed cause would not produce the effect?",
];

export default function AIInterviewAnswerTechnicalCausalityAnalyzer() {
  const [selectedClaim, setSelectedClaim] = useState(
    causalClaims[0]
  );
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  const supported = causalClaims.filter(
    (claim) => claim.relationship === "Supported"
  ).length;

  const unsupported = causalClaims.filter(
    (claim) => claim.relationship === "Unsupported"
  ).length;

  const averageScore = Math.round(
    causalClaims.reduce(
      (sum, claim) => sum + claim.score,
      0
    ) / causalClaims.length
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
            AI Technical Causality Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether cause-and-effect relationships in your technical
            explanations are logically supported.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {averageScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CAUSAL REASONING SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {averageScore >= 80
                ? "Strong Causal Reasoning"
                : averageScore >= 60
                ? "Needs More Evidence"
                : "Causal Reasoning Needs Work"}
            </h2>

            <p className="text-gray-600 mt-2">
              The AI evaluates whether technical causes actually explain the
              effects claimed in your answer.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <GitBranch
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Causal Claims
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {causalClaims.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Supported
            </p>

            <p className="text-3xl font-black text-green-600">
              {supported}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <XCircle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Unsupported
            </p>

            <p className="text-3xl font-black text-red-600">
              {unsupported}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Average Score
            </p>

            <p className="text-3xl font-black text-orange-600">
              {averageScore}%
            </p>

          </div>

        </div>

      </div>

      {/* Causal Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Causal Reasoning Framework
            </h2>

            <p className="text-sm text-gray-500">
              A strong causal explanation connects the cause to the effect
              through a clear technical mechanism.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {causalFlow.map((step, index) => (

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

              {index < causalFlow.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={20}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Causal Claims */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Detected Causal Statements
            </h2>

            <p className="text-sm text-gray-500">
              AI identifies relationships rather than evaluating each sentence
              independently.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {causalClaims.map((claim) => (

            <button
              type="button"
              key={claim.statement}
              onClick={() => setSelectedClaim(claim)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedClaim.statement === claim.statement
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-start gap-4">

                {claim.relationship === "Supported" ? (
                  <CheckCircle2
                    className="text-green-600 mt-1"
                    size={24}
                  />
                ) : claim.relationship === "Unsupported" ? (
                  <XCircle
                    className="text-red-600 mt-1"
                    size={24}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600 mt-1"
                    size={24}
                  />
                )}

                <div className="flex-1">

                  <p className="font-semibold">
                    "{claim.statement}"
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                      Cause: {claim.cause}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                      Effect: {claim.effect}
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-black">
                    {claim.score}
                  </p>

                  <p className="text-xs text-gray-500">
                    {claim.relationship}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Claim */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              CAUSAL RELATIONSHIP ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedClaim.cause}
              {" → "}
              {selectedClaim.effect}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedClaim.explanation}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  CAUSE
                </p>

                <p className="font-semibold mt-2">
                  {selectedClaim.cause}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  EFFECT
                </p>

                <p className="font-semibold mt-2">
                  {selectedClaim.effect}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  CONFIDENCE
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-1">
                  {selectedClaim.score}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Incorrect Causality Warning */}
      {selectedClaim.relationship === "Unsupported" && (
        <div className="bg-red-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <AlertTriangle
              className="text-red-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-red-600">
                UNSUPPORTED CAUSAL CLAIM
              </p>

              <h2 className="text-xl font-bold text-red-800 mt-1">
                The claimed cause does not directly explain the effect.
              </h2>

              <p className="text-gray-600 mt-2">
                Adding application servers can improve application-layer
                throughput, but it does not automatically make the database
                faster. In fact, additional application instances can increase
                concurrent database requests.
              </p>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-green-600">
                  MORE ACCURATE EXPLANATION
                </p>

                <p className="font-semibold mt-2">
                  "Adding application servers can increase application
                  throughput, but the database may become the bottleneck if
                  additional instances generate more concurrent database
                  requests."
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* AI Follow Ups */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target
              className="text-orange-600"
              size={24}
            />

            <div>

              <h2 className="font-bold text-lg">
                Causality Follow-Up Questions
              </h2>

              <p className="text-sm text-gray-500">
                Practice defending the relationships in your explanation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFollowUps(!showFollowUps)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showFollowUps
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showFollowUps && (
          <div className="space-y-3 mt-6">

            {followUps.map((question, index) => (

              <div
                key={question}
                className="bg-white rounded-xl p-4 flex gap-4"
              >

                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
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

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Analyze Your Technical Explanation
            </h2>

            <p className="text-sm text-gray-500">
              Write an answer containing cause-and-effect relationships.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            EXAMPLE QUESTION
          </p>

          <h3 className="font-bold mt-2">
            Why does adding a caching layer improve the performance of a
            high-traffic application?
          </h3>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Explain the cause-and-effect relationship..."
          className="w-full mt-5 min-h-[150px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Causality
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Coaching Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Causality Analysis Flow
            </h2>

            <p className="text-sm text-gray-500">
              The system evaluates relationships between technical events.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Analyze Answer",
            "Detect Causal Claims",
            "Extract Cause",
            "Extract Effect",
            "Validate Relationship",
            "Request Evidence",
            "Suggest Correction",
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

      {/* Analysis Complete */}
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
                Causal reasoning analysis completed.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can send the candidate's answer
                to the AI evaluator to extract causal claims, validate their
                relationships, and generate targeted corrections.
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
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Explain the mechanism, not just the outcome.
            </h2>

            <p className="text-gray-600 mt-2">
              When claiming that one technical event causes another, explain
              the mechanism connecting them. This makes your reasoning more
              convincing and helps prevent incorrect assumptions during
              debugging and architecture discussions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}