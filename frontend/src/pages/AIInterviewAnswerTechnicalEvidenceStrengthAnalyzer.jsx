import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  TrendingUp,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const claims = [
  {
    claim: "Reduced API response time",
    evidence: "Average latency dropped from 420ms to 180ms",
    score: 94,
    strength: "Strong",
  },
  {
    claim: "Improved system scalability",
    evidence: "Handled higher traffic after horizontal scaling",
    score: 76,
    strength: "Moderate",
  },
  {
    claim: "Improved reliability",
    evidence: "No measurable reliability metric provided",
    score: 38,
    strength: "Weak",
  },
];

const factors = [
  {
    name: "Specificity",
    score: 91,
    description: "Evidence contains concrete technical details.",
  },
  {
    name: "Measurability",
    score: 84,
    description: "Claims are supported by measurable results.",
  },
  {
    name: "Relevance",
    score: 89,
    description: "Evidence directly supports the associated claims.",
  },
  {
    name: "Technical Context",
    score: 78,
    description: "Some implementation context is provided.",
  },
];

const workflow = [
  "Extract Claims",
  "Find Evidence",
  "Evaluate Strength",
  "Detect Gaps",
  "Suggest Improvements",
];

export default function AIInterviewAnswerTechnicalEvidenceStrengthAnalyzer() {
  const [showClaims, setShowClaims] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const claim = claims[selectedClaim];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Evidence Strength Analyzer
          </h1>

          <p className="text-gray-500">
            Evaluate how strongly evidence supports technical claims in
            interview answers.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <FileCheck2 className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              EVIDENCE STRENGTH ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Overall Evidence Strength: 78%
            </h2>

            <p className="text-gray-600 mt-2">
              Most technical claims have supporting evidence, but reliability
              claims require stronger measurable proof.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Claims Detected
            </p>
            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Strong Claims
            </p>
            <p className="text-3xl font-black text-green-600">
              1
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <TrendingUp className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Moderate Claims
            </p>
            <p className="text-3xl font-black text-orange-600">
              1
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Weak Claims
            </p>
            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <FileCheck2 className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Evidence Score
            </p>
            <p className="text-3xl font-black text-purple-600">
              78%
            </p>
          </div>

        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Candidate Answer
            </h2>

            <p className="text-sm text-gray-500">
              The AI extracts technical claims and evaluates their evidence.
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "I optimized our API by introducing Redis caching, which reduced
            the average response time significantly. The system also became
            more scalable and reliable because the database received fewer
            requests."
          </p>

        </div>

      </div>

      {/* Claims */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FileCheck2 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Technical Claims & Evidence
              </h2>

              <p className="text-sm text-gray-500">
                Review how strongly each claim is supported.
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

            {claims.map((item, index) => (

              <button
                type="button"
                key={item.claim}
                onClick={() => setSelectedClaim(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedClaim === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-black text-indigo-600">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.claim}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.strength === "Strong"
                            ? "bg-green-100 text-green-700"
                            : item.strength === "Moderate"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.strength}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Evidence: {item.evidence}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>

                      <span className="text-sm font-bold text-indigo-600">
                        {item.score}%
                      </span>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Claim */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Selected Claim: {claim.claim}
            </h2>

            <p className="text-sm text-gray-500">
              Detailed evidence analysis.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              EVIDENCE
            </p>

            <p className="font-bold mt-2">
              {claim.evidence}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              STRENGTH
            </p>

            <p className="text-3xl font-black text-purple-600 mt-1">
              {claim.score}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              CLASSIFICATION
            </p>

            <p className="text-xl font-black text-orange-600 mt-1">
              {claim.strength}
            </p>

          </div>

        </div>

      </div>

      {/* Evidence Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Evidence Quality Factors
              </h2>

              <p className="text-sm text-gray-500">
                Factors used to determine evidence strength.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {factors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${factor.score}%` }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {factor.description}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Weak Evidence Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              WEAK EVIDENCE DETECTED
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              "Improved reliability" needs stronger evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              The claim is plausible, but the answer does not provide a
              reliability metric, failure-rate comparison, uptime measurement,
              or concrete incident reduction.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                STRENGTHEN WITH
              </p>

              <p className="font-semibold text-red-700 mt-2">
                Before/after reliability metric → measurement period →
                technical change → observed result
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Use measurable before-and-after evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              Instead of saying the API became "much faster," explain the
              baseline latency, the result after optimization, the workload
              used for measurement, and what technical change caused the
              improvement.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  BEFORE
                </p>
                <p className="font-bold mt-1">
                  420ms average latency
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  AFTER
                </p>
                <p className="font-bold mt-1">
                  180ms average latency
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  RESULT
                </p>
                <p className="font-bold text-green-700 mt-1">
                  57% reduction
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Analyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Analyze Updated Answer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate evidence after strengthening your technical claims.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Evidence Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Evidence analysis completed successfully.
              </div>
            )}

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
              Refresh Evidence Score
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate evidence strength after improving your answer.
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
                Evidence strength score updated successfully.
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
                Evidence Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates supporting evidence.
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

              <React.Fragment key={step}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {step}
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
              Strong technical claims need strong evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              When describing a project achievement, connect the technical
              action to measurable evidence and the resulting impact. This
              makes the answer more credible and easier for an interviewer to
              evaluate.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}