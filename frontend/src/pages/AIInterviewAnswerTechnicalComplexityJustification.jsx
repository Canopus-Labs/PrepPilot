import React, { useState } from "react";
import {
  Brain,
  Code2,
  Clock3,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
  Target,
} from "lucide-react";

const complexityFactors = [
  {
    name: "Major Operations",
    score: 88,
    status: "Strong",
    description:
      "The candidate correctly identifies the dominant operations performed by the algorithm.",
  },
  {
    name: "Loop Analysis",
    score: 82,
    status: "Strong",
    description:
      "Loop execution is mostly explained correctly, including nested iterations.",
  },
  {
    name: "Recursion Analysis",
    score: 64,
    status: "Needs Improvement",
    description:
      "The recursion depth and number of recursive calls require stronger justification.",
  },
  {
    name: "Auxiliary Space",
    score: 71,
    status: "Good",
    description:
      "Additional memory is identified, but temporary allocations need clearer explanation.",
  },
  {
    name: "Complexity Justification",
    score: 67,
    status: "Needs Improvement",
    description:
      "The final Big-O is close to correct, but the reasoning behind it is incomplete.",
  },
];

const operationBreakdown = [
  {
    operation: "Input Traversal",
    cost: "O(n)",
    explanation:
      "The input array is scanned once, so the traversal contributes linear time.",
  },
  {
    operation: "Nested Comparison",
    cost: "O(n²)",
    explanation:
      "For each element, the algorithm may compare against many other elements.",
  },
  {
    operation: "Result Construction",
    cost: "O(n)",
    explanation:
      "The result structure grows proportionally with the input.",
  },
  {
    operation: "Auxiliary Storage",
    cost: "O(n)",
    explanation:
      "Additional memory is allocated for the result and temporary state.",
  },
];

const followUpQuestions = [
  {
    title: "Dominant Operation",
    question:
      "Which operation determines the overall time complexity and why?",
  },
  {
    title: "Nested Loops",
    question:
      "Why do these two nested loops result in O(n²) rather than O(2n)?",
  },
  {
    title: "Space Complexity",
    question:
      "Does the output array count toward auxiliary space? Explain your assumption.",
  },
  {
    title: "Best vs Worst Case",
    question:
      "Does the algorithm have different best-case and worst-case complexities?",
  },
  {
    title: "Recursion",
    question:
      "How does the recursion depth affect the auxiliary space complexity?",
  },
];

const recommendations = [
  {
    title: "Explain Before Stating Big-O",
    reason:
      "A final complexity value without reasoning does not demonstrate understanding.",
    action:
      "Walk through the dominant operations first and derive the complexity step by step.",
  },
  {
    title: "Separate Time and Space",
    reason:
      "Time complexity and auxiliary space come from different sources.",
    action:
      "Explain computational work and additional memory independently.",
  },
  {
    title: "Justify Nested Operations",
    reason:
      "Nested loops and recursive calls are common sources of complexity mistakes.",
    action:
      "Count how many times each operation can execute as input size grows.",
  },
];

const analysisFlow = [
  {
    title: "Read Solution",
    description: "Inspect the candidate's algorithm.",
  },
  {
    title: "Extract Operations",
    description: "Identify loops, calls, and allocations.",
  },
  {
    title: "Calculate Cost",
    description: "Estimate each operation's growth.",
  },
  {
    title: "Compare",
    description: "Compare stated and analyzed complexity.",
  },
  {
    title: "Coach",
    description: "Ask targeted follow-up questions.",
  },
];

export default function AIInterviewAnswerTechnicalComplexityJustification() {
  const [selectedFactor, setSelectedFactor] = useState(
    complexityFactors[0]
  );
  const [showOperations, setShowOperations] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = Math.round(
    complexityFactors.reduce(
      (sum, factor) => sum + factor.score,
      0
    ) / complexityFactors.length
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
            AI Technical Complexity Justification
          </h1>

          <p className="text-gray-500">
            Explain where your time and space complexity comes from instead
            of only stating the final Big-O notation.
          </p>
        </div>

      </div>

      {/* Overall Score */}
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
              COMPLEXITY JUSTIFICATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {overallScore >= 80
                ? "Strong Complexity Reasoning"
                : overallScore >= 65
                ? "Good With Reasoning Gaps"
                : "Needs Complexity Practice"}
            </h2>

            <p className="text-gray-600 mt-2">
              The AI evaluates whether the candidate can derive the stated
              complexity from the actual operations performed by the solution.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <BarChart3 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Overall Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <Clock3 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Stated Time
            </p>

            <p className="text-3xl font-black text-green-600">
              O(n²)
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <HardDrive className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Analyzed Space
            </p>

            <p className="text-3xl font-black text-purple-600">
              O(n)
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Reasoning Gap
            </p>

            <p className="text-3xl font-black text-orange-600">
              Medium
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Complexity */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">
          <Code2 className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Candidate Complexity Statement
            </h2>

            <p className="text-sm text-gray-500">
              The AI compares the stated complexity with the actual solution.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              CANDIDATE STATED
            </p>

            <p className="text-3xl font-black text-indigo-700 mt-2">
              Time: O(n²)
            </p>

            <p className="text-lg font-bold text-indigo-700">
              Space: O(n)
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs font-bold text-green-600">
              AI ANALYSIS
            </p>

            <p className="text-3xl font-black text-green-700 mt-2">
              Time: O(n²)
            </p>

            <p className="text-lg font-bold text-green-700">
              Space: O(n)
            </p>

          </div>

        </div>

        <div className="bg-orange-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-orange-600">
            JUSTIFICATION GAP
          </p>

          <p className="text-sm text-gray-700 mt-2">
            The final complexity is correct, but the candidate has not clearly
            explained why the nested operations dominate the linear operations.
          </p>

        </div>

      </div>

      {/* Complexity Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Complexity Reasoning Factors
            </h2>

            <p className="text-sm text-gray-500">
              Select a factor to inspect the AI evaluation.
            </p>
          </div>

        </div>

        <div className="space-y-4 mt-6">

          {complexityFactors.map((factor, index) => (

            <button
              type="button"
              key={factor.name}
              onClick={() => setSelectedFactor(factor)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedFactor.name === factor.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>
                      <h3 className="font-bold">
                        {factor.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {factor.status}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        factor.score >= 80
                          ? "bg-green-100 text-green-700"
                          : factor.score >= 70
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {factor.score}/100
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        factor.score >= 80
                          ? "bg-green-500"
                          : factor.score >= 70
                          ? "bg-indigo-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${factor.score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Factor */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED FACTOR
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedFactor.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedFactor.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedFactor.score}/100
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedFactor.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Operation Breakdown */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Clock3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Operation Cost Breakdown
              </h2>

              <p className="text-sm text-gray-500">
                See how individual operations contribute to the final
                complexity.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowOperations(!showOperations)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showOperations
              ? "Hide Breakdown"
              : "Show Breakdown"}
          </button>

        </div>

        {showOperations && (
          <div className="space-y-4 mt-6">

            {operationBreakdown.map((item) => (

              <div
                key={item.operation}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {item.operation}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {item.cost}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {item.explanation}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Follow-up Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                AI Follow-Up Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions designed to test whether the candidate actually
                understands the complexity.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-4 mt-6">

            {followUpQuestions.map((item, index) => (

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

                    <p className="text-sm text-gray-600 mt-2">
                      {item.question}
                    </p>

                  </div>

                </div>

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
                AI Complexity Reasoning Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve how you explain complexity during technical interviews.
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

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Complexity Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                From candidate explanation to targeted coaching.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFlow(!showFlow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFlow ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showFlow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {analysisFlow.map((step, index) => (

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

                {index < analysisFlow.length - 1 && (
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
          Analyze Complexity Justification
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
                Complexity analysis generated successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can inspect candidate code,
                derive time and auxiliary-space complexity, compare it with
                the candidate's explanation, and generate targeted follow-up
                questions.
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
              Do not just state Big-O — derive it.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong candidate can identify the important operations,
              explain how often they execute, account for recursion and
              additional memory, and logically arrive at the final complexity.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}