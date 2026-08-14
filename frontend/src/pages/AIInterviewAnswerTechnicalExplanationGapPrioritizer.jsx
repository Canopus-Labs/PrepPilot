import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
  CircleAlert,
} from "lucide-react";

const gaps = [
  {
    title: "Complexity Justification",
    priority: "Critical",
    score: 92,
    status: "Missing",
    description:
      "The answer states that the solution is efficient but does not explain why.",
    recommendation:
      "Explain the major operations and derive the time and space complexity.",
  },
  {
    title: "Edge Case Handling",
    priority: "High",
    score: 84,
    status: "Partial",
    description:
      "Some edge cases are mentioned, but boundary conditions are not fully explained.",
    recommendation:
      "Discuss empty input, boundary values, duplicates, and other important edge cases.",
  },
  {
    title: "Correctness Reasoning",
    priority: "High",
    score: 79,
    status: "Partial",
    description:
      "The answer describes the algorithm but provides limited reasoning for why it works.",
    recommendation:
      "Explain the invariant or reasoning that guarantees correctness.",
  },
  {
    title: "Implementation Detail",
    priority: "Medium",
    score: 61,
    status: "Optional",
    description:
      "Some implementation details could make the answer clearer.",
    recommendation:
      "Add concise implementation details only after the core reasoning is complete.",
  },
  {
    title: "Alternative Approach",
    priority: "Low",
    score: 38,
    status: "Optional",
    description:
      "An alternative solution was not discussed.",
    recommendation:
      "Mention an alternative only if it provides a meaningful trade-off.",
  },
];

const evaluationFactors = [
  {
    name: "Requirement Coverage",
    score: 78,
    description:
      "How well the explanation addresses the requirements of the question.",
  },
  {
    name: "Technical Reasoning",
    score: 69,
    description:
      "How clearly the candidate explains why the proposed approach works.",
  },
  {
    name: "Completeness",
    score: 64,
    description:
      "Coverage of important explanation elements without unnecessary detail.",
  },
  {
    name: "Prioritization",
    score: 88,
    description:
      "Ability to identify which missing information matters most.",
  },
  {
    name: "Communication Clarity",
    score: 82,
    description:
      "How clearly the explanation communicates the important technical ideas.",
  },
];

const coachingQuestions = [
  "What is the most important missing part of your explanation?",
  "Why does your algorithm work?",
  "What is the time and space complexity, and why?",
  "Which edge case could invalidate your current reasoning?",
  "Which missing detail would an interviewer most likely ask about?",
  "Which details can safely be omitted to keep the answer concise?",
];

const recommendations = [
  {
    title: "Explain Complexity First",
    reason:
      "The answer makes a performance claim without supporting reasoning.",
    action:
      "Identify the dominant operations and explain how their cost produces the stated complexity.",
  },
  {
    title: "Strengthen Correctness Reasoning",
    reason:
      "The approach is described, but the connection between the steps and the correct result is incomplete.",
    action:
      "Explain the key invariant or logical property that makes the algorithm correct.",
  },
  {
    title: "Cover Critical Edge Cases",
    reason:
      "Some boundary conditions are not addressed.",
    action:
      "Add the highest-impact edge cases before discussing optional implementation details.",
  },
];

const workflow = [
  {
    title: "Analyze",
    description: "Understand the candidate's explanation.",
  },
  {
    title: "Extract",
    description: "Identify expected explanation elements.",
  },
  {
    title: "Compare",
    description: "Find missing or partial elements.",
  },
  {
    title: "Rank",
    description: "Prioritize gaps by impact.",
  },
  {
    title: "Improve",
    description: "Recommend the next best addition.",
  },
];

export default function AIInterviewAnswerTechnicalExplanationGapPrioritizer() {
  const [selectedGap, setSelectedGap] = useState(gaps[0]);

  const [showGaps, setShowGaps] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const completenessScore = 71;

  const priorityStyles = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-gray-100 text-gray-600",
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
            AI Technical Explanation Gap Prioritizer
          </h1>

          <p className="text-gray-500">
            Identify and prioritize the missing parts of a technical interview
            explanation.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {completenessScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              EXPLANATION COMPLETENESS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Needs Critical Improvements
            </h2>

            <p className="text-gray-600 mt-2">
              The core approach is present, but important reasoning is missing.
              Complexity justification should be addressed before optional
              details.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <CircleAlert
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical Gaps
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Priority
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>

          </div>

          <div className="bg-yellow-50 rounded-xl p-5">

            <Target
              className="text-yellow-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Optional Gaps
            </p>

            <p className="text-3xl font-black text-yellow-600">
              2
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <CheckCircle2
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Completeness
            </p>

            <p className="text-3xl font-black text-indigo-600">
              71%
            </p>

          </div>

        </div>

      </div>

      {/* Explanation Gaps */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Prioritized Explanation Gaps
              </h2>

              <p className="text-sm text-gray-500">
                Critical gaps appear before optional improvements.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowGaps(!showGaps)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showGaps ? "Hide Gaps" : "Show Gaps"}
          </button>

        </div>

        {showGaps && (
          <div className="space-y-4 mt-6">

            {gaps.map((gap, index) => (

              <button
                type="button"
                key={gap.title}
                onClick={() => setSelectedGap(gap)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedGap.title === gap.title
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {gap.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {gap.status}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          priorityStyles[gap.priority]
                        }`}
                      >
                        {gap.priority}
                      </span>

                    </div>

                    <div className="flex items-center gap-4 mt-4">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            gap.score >= 85
                              ? "bg-red-500"
                              : gap.score >= 70
                              ? "bg-orange-500"
                              : "bg-gray-400"
                          }`}
                          style={{
                            width: `${gap.score}%`,
                          }}
                        />

                      </div>

                      <span className="font-black text-indigo-700">
                        {gap.score}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {gap.description}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Gap */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              HIGHEST-IMPACT GAP
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedGap.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedGap.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  PRIORITY
                </p>

                <p className="font-black text-red-600 mt-1">
                  {selectedGap.priority}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedGap.score}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p className="font-black text-orange-600 mt-1">
                  {selectedGap.status}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                AI RECOMMENDATION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedGap.recommendation}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Evaluation Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Explanation Evaluation
              </h2>

              <p className="text-sm text-gray-500">
                Factors used to determine explanation completeness.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {evaluationFactors.map((factor) => (

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

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Explanation Coaching Questions
              </h2>

              <p className="text-sm text-gray-500">
                Focus on the most important missing reasoning first.
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
                AI Improvement Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve the answer by addressing the highest-impact gaps first.
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
                Explanation Gap Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI identifies and prioritizes missing explanation
                elements.
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
          Analyze Explanation Gaps
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
                Explanation gaps prioritized successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                Your explanation completeness score is{" "}
                <strong>{completenessScore}/100</strong>. Focus first on
                complexity justification, followed by correctness reasoning
                and critical edge cases.
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
              Fix the most important gap before adding more detail.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong technical answers are not necessarily the longest. The
              goal is to cover the reasoning elements that have the greatest
              impact on correctness, performance, and interviewer confidence.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}