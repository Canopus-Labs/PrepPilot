import React, { useState } from "react";
import {
  Brain,
  Award,
  CheckCircle2,
  AlertTriangle,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

const evidenceItems = [
  {
    claim: "Reduced API response time",
    evidence: "Reduced average response time by 42%.",
    score: 91,
    status: "Strong",
    relevance: 94,
    specificity: 90,
    measurable: 96,
    context: 84,
    connection: 91,
    credibility: 90,
    feedback:
      "The metric is measurable and directly connected to a technical outcome, but the optimization method could be explained more clearly.",
    suggestion:
      "Explain which optimization produced the 42% reduction and how the measurement was performed.",
  },
  {
    claim: "Improved database performance",
    evidence: "The database became much faster after optimization.",
    score: 52,
    status: "Weak",
    relevance: 76,
    specificity: 43,
    measurable: 28,
    context: 61,
    connection: 58,
    credibility: 64,
    feedback:
      "The claim is relevant but lacks measurable evidence and technical context.",
    suggestion:
      "Mention the query latency before and after optimization and identify the database changes made.",
  },
  {
    claim: "Built a scalable architecture",
    evidence:
      "Designed the service to handle 10,000 concurrent requests using caching and load balancing.",
    score: 94,
    status: "Strong",
    relevance: 96,
    specificity: 94,
    measurable: 92,
    context: 95,
    connection: 93,
    credibility: 91,
    feedback:
      "The claim includes workload, architectural decisions, and the relationship between the design and expected scale.",
    suggestion:
      "Strengthen it further by explaining how the architecture was tested or validated.",
  },
  {
    claim: "Improved model accuracy",
    evidence: "AI accuracy improved by 15%.",
    score: 68,
    status: "Needs Context",
    relevance: 88,
    specificity: 63,
    measurable: 84,
    context: 42,
    connection: 69,
    credibility: 61,
    feedback:
      "The numerical improvement is useful, but the baseline, dataset, and evaluation method are missing.",
    suggestion:
      "State the baseline accuracy, evaluation dataset, and metric used to calculate the improvement.",
  },
];

const qualityFactors = [
  {
    name: "Relevance",
    score: 88,
    description:
      "Checks whether the evidence directly supports the technical claim.",
  },
  {
    name: "Specificity",
    score: 72,
    description:
      "Measures whether the candidate provides concrete rather than vague evidence.",
  },
  {
    name: "Measurability",
    score: 81,
    description:
      "Checks whether outcomes can be expressed through meaningful metrics.",
  },
  {
    name: "Technical Context",
    score: 67,
    description:
      "Evaluates whether the candidate explains the technical conditions behind the result.",
  },
  {
    name: "Action → Result Connection",
    score: 76,
    description:
      "Checks whether the candidate clearly connects their action to the reported outcome.",
  },
  {
    name: "Credibility",
    score: 73,
    description:
      "Evaluates whether the evidence contains enough context to make the claim convincing.",
  },
];

const coachingQuestions = [
  "What exactly did you change to produce this result?",
  "What was the baseline before your change?",
  "How did you measure the improvement?",
  "What technical conditions produced the result?",
  "Which part of the outcome can be directly attributed to your work?",
  "Can another engineer understand how you obtained this metric?",
  "What evidence would make this claim more credible?",
];

const recommendations = [
  {
    title: "Add a Baseline",
    reason:
      "A percentage improvement is difficult to interpret without knowing the starting point.",
    action:
      "State both the original and improved value whenever possible.",
  },
  {
    title: "Connect Action to Outcome",
    reason:
      "Interviewers need to understand what you personally did to produce the result.",
    action:
      "Use a clear structure: action → technical change → measured result.",
  },
  {
    title: "Add Technical Context",
    reason:
      "A metric without its measurement conditions can be difficult to evaluate.",
    action:
      "Mention the dataset, workload, environment, metric, or evaluation method when relevant.",
  },
];

const workflow = [
  {
    title: "Extract Claims",
    description: "Identify technical achievements and claims.",
  },
  {
    title: "Find Evidence",
    description: "Locate metrics and supporting details.",
  },
  {
    title: "Evaluate Quality",
    description: "Score evidence across multiple dimensions.",
  },
  {
    title: "Detect Gaps",
    description: "Find unsupported or vague claims.",
  },
  {
    title: "Strengthen",
    description: "Suggest stronger evidence.",
  },
];

export default function AIInterviewAnswerTechnicalEvidenceQualityAnalyzer() {
  const [selectedEvidence, setSelectedEvidence] =
    useState(evidenceItems[0]);

  const [showEvidence, setShowEvidence] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = 76;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Evidence Quality Analyzer
          </h1>

          <p className="text-gray-500">
            Evaluate whether technical claims are supported by convincing,
            measurable, and well-contextualized evidence.
          </p>

        </div>

      </div>

      {/* Main Score */}
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
              EVIDENCE QUALITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Good Evidence With Context Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              Several claims contain useful metrics, but some achievements
              need stronger baselines, technical context, and clearer
              action-to-result connections.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Award className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Claims Analyzed
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Strong Evidence
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Needs Context
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Weak Evidence
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

        </div>

      </div>

      {/* Evidence Claims */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Evidence Quality Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Review how strongly each technical claim is supported.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowEvidence(!showEvidence)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvidence ? "Hide Evidence" : "Show Evidence"}
          </button>

        </div>

        {showEvidence && (
          <div className="space-y-4 mt-6">

            {evidenceItems.map((item) => (

              <button
                type="button"
                key={item.claim}
                onClick={() => setSelectedEvidence(item)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedEvidence.claim === item.claim
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {item.claim}
                        </h3>

                        <p className="text-sm text-gray-600 mt-2">
                          "{item.evidence}"
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          item.status === "Strong"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Weak"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${
                          item.score >= 85
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

                    <p className="text-xs text-gray-500 mt-2">
                      Evidence quality: {item.score}/100
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Evidence */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED CLAIM
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedEvidence.claim}
            </h2>

            <p className="text-gray-600 mt-2">
              "{selectedEvidence.evidence}"
            </p>

            <p className="text-sm text-gray-600 mt-3">
              {selectedEvidence.feedback}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                HOW TO STRENGTHEN IT
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedEvidence.suggestion}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Evidence Dimensions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Evidence Quality Dimensions
              </h2>

              <p className="text-sm text-gray-500">
                A numerical metric alone does not guarantee strong evidence.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Dimensions" : "Show Dimensions"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {qualityFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}/100
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${factor.score}%`,
                    }}
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

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Evidence Coaching Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help candidates strengthen weak evidence.
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

            {coachingQuestions.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700 pt-1">
                  {question}
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
                AI Evidence Improvement Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Practical ways to make technical achievements more convincing.
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

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Evidence Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates technical claims.
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Evidence Quality
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
                Technical evidence quality analyzed successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                Your evidence quality score is{" "}
                <strong>{overallScore}/100</strong>. The largest improvement
                opportunity is adding technical context and clearer
                action-to-result connections to weaker claims.
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
              AI COMMUNICATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              A metric is stronger when the interviewer understands how it was achieved.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong technical evidence connects the candidate's action to a
              measurable outcome while providing enough context to understand
              the significance and credibility of that result.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}