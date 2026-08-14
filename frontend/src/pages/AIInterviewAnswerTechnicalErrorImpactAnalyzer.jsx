import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  ShieldAlert,
  Bug,
} from "lucide-react";

const errors = [
  {
    title: "Incorrect Time Complexity",
    category: "Algorithmic Reasoning",
    severity: "Critical",
    impact: 96,
    confidence: 94,
    explanation:
      "The stated complexity does not match the actual nested operations, which can lead to an incorrect performance claim.",
    correction:
      "Break down each major operation and calculate the combined complexity before stating the final Big-O.",
  },
  {
    title: "Missing Edge Case",
    category: "Correctness",
    severity: "High",
    impact: 84,
    confidence: 91,
    explanation:
      "The solution does not explicitly handle an empty input case, which could cause incorrect behavior.",
    correction:
      "Add an early validation or define the expected behavior for empty input.",
  },
  {
    title: "Unclear Variable Terminology",
    category: "Communication",
    severity: "Low",
    impact: 32,
    confidence: 89,
    explanation:
      "A generic variable description makes the explanation slightly harder to follow but does not affect correctness.",
    correction:
      "Use precise technical terminology and meaningful names when explaining the solution.",
  },
  {
    title: "Weak Trade-Off Explanation",
    category: "Technical Communication",
    severity: "Medium",
    impact: 58,
    confidence: 86,
    explanation:
      "The selected approach is reasonable, but the answer does not clearly explain why it was preferred over alternatives.",
    correction:
      "Mention the most relevant trade-off and connect it to the problem constraints.",
  },
  {
    title: "Unsupported Scalability Claim",
    category: "System Design",
    severity: "High",
    impact: 79,
    confidence: 88,
    explanation:
      "The answer claims the architecture is scalable without explaining resource growth or the scaling mechanism.",
    correction:
      "Explain expected workload, bottlenecks, resource growth, and the selected scaling strategy.",
  },
];

const severityFactors = [
  {
    name: "Correctness Impact",
    score: 94,
    description:
      "Measures how strongly the mistake can cause the proposed solution to become incorrect.",
  },
  {
    name: "Performance Impact",
    score: 82,
    description:
      "Measures whether the error can cause significant time, memory, or scalability problems.",
  },
  {
    name: "Reasoning Impact",
    score: 88,
    description:
      "Evaluates how much the mistake weakens the candidate's technical reasoning.",
  },
  {
    name: "Interview Impact",
    score: 79,
    description:
      "Estimates how likely the mistake is to affect the interviewer's assessment.",
  },
  {
    name: "Recoverability",
    score: 63,
    description:
      "Considers how easily the candidate can correct the mistake during the interview.",
  },
];

const coachingQuestions = [
  "Does this mistake affect the correctness of your solution?",
  "Could this error cause a performance or scalability problem?",
  "Is the mistake fundamental or mainly a communication issue?",
  "Can you correct the mistake without changing the overall approach?",
  "What assumption caused this error?",
  "Would an interviewer likely ask a follow-up question about this mistake?",
  "Which mistake should you fix first and why?",
];

const recommendations = [
  {
    title: "Fix Fundamental Errors First",
    reason:
      "Incorrect algorithms or complexity analysis can invalidate otherwise strong answers.",
    action:
      "Resolve correctness and algorithmic reasoning errors before communication-level issues.",
  },
  {
    title: "Separate Critical From Minor Feedback",
    reason:
      "Treating every mistake equally can overwhelm candidates and slow improvement.",
    action:
      "Prioritize errors based on their effect on correctness, performance, and reasoning.",
  },
  {
    title: "Practice Recovery",
    reason:
      "Real interviews often give candidates an opportunity to recognize and correct mistakes.",
    action:
      "Practice identifying the error, explaining the cause, and correcting the approach aloud.",
  },
];

const workflow = [
  {
    title: "Detect",
    description: "Identify technical mistakes.",
  },
  {
    title: "Categorize",
    description: "Classify each error.",
  },
  {
    title: "Score",
    description: "Estimate its impact.",
  },
  {
    title: "Prioritize",
    description: "Rank critical errors first.",
  },
  {
    title: "Correct",
    description: "Provide targeted improvements.",
  },
];

export default function AIInterviewAnswerTechnicalErrorImpactAnalyzer() {
  const [selectedError, setSelectedError] = useState(errors[0]);

  const [showErrors, setShowErrors] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = 82;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Error Impact Analyzer
          </h1>

          <p className="text-gray-500">
            Identify which technical mistakes matter most and focus on the
            corrections with the greatest impact.
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
              ERROR IMPACT ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Error Prioritization
            </h2>

            <p className="text-gray-600 mt-2">
              The analysis separates fundamental correctness issues from
              lower-impact communication mistakes so preparation can focus on
              the most important corrections.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Bug className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Errors Detected
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <ShieldAlert className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical
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
              High Impact
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Low Impact
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>
          </div>

        </div>

      </div>

      {/* Error Ranking */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Error Impact Ranking
              </h2>

              <p className="text-sm text-gray-500">
                Errors are ranked by their effect on correctness, reasoning,
                performance, and interview quality.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowErrors(!showErrors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showErrors ? "Hide Errors" : "Show Errors"}
          </button>

        </div>

        {showErrors && (
          <div className="space-y-4 mt-6">

            {errors.map((error, index) => (

              <button
                type="button"
                key={error.title}
                onClick={() => setSelectedError(error)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedError.title === error.title
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
                          {error.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {error.category}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          error.severity === "Critical"
                            ? "bg-red-100 text-red-700"
                            : error.severity === "High"
                            ? "bg-orange-100 text-orange-700"
                            : error.severity === "Medium"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {error.severity}
                      </span>

                    </div>

                    <div className="flex items-center gap-4 mt-4">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            error.impact >= 90
                              ? "bg-red-500"
                              : error.impact >= 70
                              ? "bg-orange-500"
                              : error.impact >= 50
                              ? "bg-indigo-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${error.impact}%`,
                          }}
                        />

                      </div>

                      <span className="font-black text-indigo-700">
                        {error.impact}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {error.explanation}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Error */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              HIGHEST PRIORITY ERROR
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedError.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedError.explanation}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SEVERITY
                </p>

                <p className="font-black text-red-600 mt-1">
                  {selectedError.severity}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT
                </p>

                <p className="text-3xl font-black text-orange-600">
                  {selectedError.impact}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CONFIDENCE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedError.confidence}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                RECOMMENDED CORRECTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedError.correction}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Severity Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Error Severity Factors
              </h2>

              <p className="text-sm text-gray-500">
                Factors used to determine how much each mistake matters.
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
          <div className="space-y-4 mt-6">

            {severityFactors.map((factor) => (

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
                AI Error Reflection Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help candidates understand the importance of
                each mistake.
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
                AI Correction Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Focus your improvement effort on the errors with the greatest
                impact.
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
                Error Impact Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts detected mistakes into prioritized
                corrections.
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
          Analyze Error Impact
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
                Technical errors prioritized successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The most important correction is{" "}
                <strong>{errors[0].title}</strong>. Resolve high-impact
                correctness and reasoning issues before spending time on
                lower-impact communication improvements.
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
              AI FEEDBACK PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Fix the mistakes that change the outcome first.
            </h2>

            <p className="text-gray-600 mt-2">
              A fundamental algorithmic or correctness error should receive
              more attention than a minor terminology issue. Impact-based
              feedback helps candidates improve faster without being
              overwhelmed by every small imperfection.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}