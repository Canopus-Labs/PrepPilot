import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const examples = [
  {
    title: "Example 1",
    text: "We used Redis to cache frequently requested product data.",
    claim: "Caching can reduce repeated database reads.",
    relevance: 94,
    status: "Highly Relevant",
    reason:
      "The example directly demonstrates how caching reduces repeated database access.",
  },
  {
    title: "Example 2",
    text: "Our application had a clean and responsive user interface.",
    claim: "Caching improves backend performance.",
    relevance: 31,
    status: "Low Relevance",
    reason:
      "The example describes frontend quality but does not directly support the caching claim.",
  },
  {
    title: "Example 3",
    text: "After adding caching, database queries decreased significantly.",
    claim: "Caching reduces database workload.",
    relevance: 91,
    status: "Highly Relevant",
    reason:
      "The example provides direct evidence connecting caching with reduced database workload.",
  },
];

const evaluationAreas = [
  {
    title: "Claim Alignment",
    score: 92,
    description: "Examples generally support the technical claims being made.",
  },
  {
    title: "Example Specificity",
    score: 86,
    description: "Most examples contain concrete technical context.",
  },
  {
    title: "Evidence Strength",
    score: 81,
    description: "Several examples demonstrate measurable technical impact.",
  },
  {
    title: "Story Relevance",
    score: 73,
    description: "One example adds context without strongly supporting the main point.",
  },
];

const recommendations = [
  {
    title: "Remove Irrelevant Examples",
    reason:
      "Examples that do not support the main technical claim consume interview time.",
    action:
      "Replace weak examples with evidence directly connected to the explanation.",
  },
  {
    title: "Connect Example to Claim",
    reason:
      "The interviewer should immediately understand why the example matters.",
    action:
      "Explicitly state what the example demonstrates.",
  },
  {
    title: "Prefer Specific Evidence",
    reason:
      "Concrete implementation details make technical explanations more convincing.",
    action:
      "Include the technology, action, and resulting impact when appropriate.",
  },
];

const coachingQuestions = [
  "What exact technical claim does this example support?",
  "Does the example demonstrate the concept or merely provide background?",
  "Can the example be removed without weakening your explanation?",
  "What technical evidence would better support your claim?",
  "Can you explain why this example is relevant in one sentence?",
];

const workflow = [
  {
    title: "Detect",
    description: "Identify examples in the answer.",
  },
  {
    title: "Extract",
    description: "Determine the main technical claims.",
  },
  {
    title: "Map",
    description: "Connect examples to claims.",
  },
  {
    title: "Score",
    description: "Evaluate relevance and effectiveness.",
  },
  {
    title: "Improve",
    description: "Recommend stronger examples.",
  },
];

export default function AIInterviewAnswerTechnicalExampleRelevanceChecker() {
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [showExamples, setShowExamples] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = Math.round(
    evaluationAreas.reduce((sum, item) => sum + item.score, 0) /
      evaluationAreas.length
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
            AI Technical Example Relevance Checker
          </h1>

          <p className="text-gray-500">
            Check whether examples used in technical interview answers
            actually support the main explanation.
          </p>
        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">
              <p className="text-3xl font-black text-indigo-700">
                {overallScore}%
              </p>

              <p className="text-xs text-gray-500">
                Relevance
              </p>
            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              EXAMPLE EFFECTIVENESS SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Mostly Relevant Examples
            </h2>

            <p className="text-gray-600 mt-2">
              Most examples directly support the technical explanation, but
              one example adds little value and could be replaced.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <MessageSquare className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Examples Detected
            </p>

            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Highly Relevant
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Weak Examples
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Target className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Claim Coverage
            </p>

            <p className="text-3xl font-black text-purple-600">
              89%
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
              AI identifies the claims and examples contained in the response.
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CANDIDATE RESPONSE
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "Caching can reduce database workload because frequently requested
            data can be stored closer to the application. For example, we used
            Redis to cache product data and reduced repeated database reads.
            Our application also had a clean and responsive user interface,
            which made the overall product easier to use."
          </p>

        </div>

      </div>

      {/* Examples */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Example-to-Claim Mapping
              </h2>

              <p className="text-sm text-gray-500">
                See exactly which technical claim each example supports.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showExamples ? "Hide Examples" : "Show Examples"}
          </button>

        </div>

        {showExamples && (
          <div className="space-y-4 mt-6">

            {examples.map((example) => (

              <button
                type="button"
                key={example.title}
                onClick={() => setSelectedExample(example)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedExample.title === example.title
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {example.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          example.relevance >= 80
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {example.status}
                      </span>

                    </div>

                    <p className="text-sm text-gray-600 mt-3">
                      {example.text}
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      Supports: {example.claim}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black text-indigo-600">
                      {example.relevance}%
                    </p>

                    <p className="text-xs text-gray-500">
                      Relevance
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Example Analysis */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb className="text-orange-600" size={30} />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED EXAMPLE ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedExample.title}
            </h2>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-sm text-gray-700">
                {selectedExample.text}
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RELEVANCE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedExample.relevance}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SUPPORTS
                </p>

                <p className="font-bold text-gray-700 mt-2">
                  {selectedExample.claim}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  AI FINDING
                </p>

                <p className="text-sm font-semibold text-orange-700 mt-2">
                  {selectedExample.reason}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Evaluation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>
            <h2 className="font-bold text-lg">
              Example Effectiveness Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Evaluate whether examples strengthen the overall explanation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowEvaluation(!showEvaluation)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvaluation ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showEvaluation && (
          <div className="space-y-4 mt-6">

            {evaluationAreas.map((item) => (

              <div
                key={item.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>

                  </div>

                  <span className="font-black text-indigo-600">
                    {item.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Diagnosis */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle className="text-red-600" size={30} />

          <div>

            <p className="text-xs font-bold text-red-600">
              AI DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              One example is distracting from the main technical point
            </h2>

            <p className="text-gray-600 mt-2">
              The Redis example directly supports the caching explanation.
              However, the user-interface example does not demonstrate how
              caching reduces database workload and can be removed.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                SUGGESTED IMPROVEMENT
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Replace the UI example with measurable evidence such as reduced
                database queries, lower response latency, or improved cache-hit
                rate.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve example selection and technical explanation quality.
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

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                AI Example Selection Coach
              </h2>

              <p className="text-sm text-gray-500">
                Practice selecting examples that directly support technical
                claims.
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Examples
          <ArrowRight size={18} />
        </button>

      </div>

      {analyzed && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2 className="text-green-600" size={30} />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                2 of 3 examples strongly support the technical explanation.
              </h2>

              <p className="text-gray-600 mt-2">
                Replace the weak example with direct technical evidence to
                make the answer more focused and convincing.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Example Relevance Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates examples inside technical answers.
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

          <CheckCircle2 className="text-green-600" size={30} />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Every example should earn its place in the answer.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong technical answers use examples that directly demonstrate
              the point being explained. Relevant, specific examples make
              explanations more convincing while avoiding unnecessary
              storytelling.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}