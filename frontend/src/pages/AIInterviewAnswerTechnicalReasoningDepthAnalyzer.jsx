import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  Layers,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const reasoningSteps = [
  {
    title: "Identify the Problem",
    status: "Complete",
    score: 95,
  },
  {
    title: "Choose the Approach",
    status: "Complete",
    score: 91,
  },
  {
    title: "Explain Why It Works",
    status: "Partial",
    score: 68,
  },
  {
    title: "Explain Cause and Effect",
    status: "Missing",
    score: 42,
  },
  {
    title: "Justify Trade-Offs",
    status: "Partial",
    score: 61,
  },
];

const depthFactors = [
  {
    name: "Reasoning Steps",
    score: 82,
    description: "Most major decisions are explained.",
  },
  {
    name: "Cause & Effect",
    score: 64,
    description: "Some connections between decisions and outcomes are missing.",
  },
  {
    name: "Justification",
    score: 71,
    description: "The main approach has reasonable justification.",
  },
  {
    name: "Technical Depth",
    score: 76,
    description: "The answer demonstrates useful technical understanding.",
  },
];

const workflow = [
  "Analyze Answer",
  "Extract Reasoning",
  "Find Missing Steps",
  "Measure Depth",
  "Generate Coaching",
];

export default function AIInterviewAnswerTechnicalReasoningDepthAnalyzer() {
  const [showSteps, setShowSteps] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const step = reasoningSteps[selectedStep];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Reasoning Depth Analyzer
          </h1>

          <p className="text-gray-500">
            Measure how deeply a candidate explains the reasoning behind a
            technical answer.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Layers className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              REASONING DEPTH ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Overall Reasoning Depth: 76%
            </h2>

            <p className="text-gray-600 mt-2">
              The answer reaches a correct solution, but the cause-and-effect
              reasoning behind several decisions needs more explanation.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <GitBranch className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Reasoning Steps
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Complete
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Partial
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Missing
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Target className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Depth Score
            </p>

            <p className="text-3xl font-black text-purple-600">
              76%
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Candidate Answer
            </h2>

            <p className="text-sm text-gray-500">
              The AI evaluates the reasoning behind the response.
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "I would use a hash map because it provides constant-time lookup.
            This makes the solution faster than searching through the entire
            array. Therefore, the overall solution would be O(n)."
          </p>

        </div>

      </div>

      {/* Reasoning Steps */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <GitBranch className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Reasoning Step Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Identify how much reasoning is actually explained.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSteps(!showSteps)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSteps ? "Hide Steps" : "Show Steps"}
          </button>

        </div>

        {showSteps && (
          <div className="space-y-4 mt-6">

            {reasoningSteps.map((item, index) => (

              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedStep(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedStep === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">

                    {item.status === "Complete" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={20}
                      />
                    ) : item.status === "Partial" ? (
                      <AlertTriangle
                        className="text-orange-600"
                        size={20}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-red-600"
                        size={20}
                      />
                    )}

                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Complete"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Partial"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="flex-1 h-2 bg-gray-200 rounded-full">

                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${item.score}%`,
                          }}
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

      {/* Selected Reasoning Step */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Selected Step: {step.title}
            </h2>

            <p className="text-sm text-gray-500">
              Detailed reasoning assessment.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              STATUS
            </p>

            <p className="text-xl font-black text-indigo-600 mt-1">
              {step.status}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              REASONING SCORE
            </p>

            <p className="text-3xl font-black text-purple-600 mt-1">
              {step.score}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              PRIORITY
            </p>

            <p className="text-xl font-black text-orange-600 mt-1">
              {step.status === "Missing" ? "Critical" : "Review"}
            </p>

          </div>

        </div>

      </div>

      {/* Missing Reasoning */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              REASONING GAP DETECTED
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Explain why hash-map lookup leads to the stated complexity.
            </h2>

            <p className="text-gray-600 mt-2">
              The answer states that a hash map provides constant-time lookup,
              but it does not explain how the lookup is used during iteration
              or why the combined operations result in O(n).
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                ADD THIS REASONING
              </p>

              <p className="font-semibold text-red-700 mt-2">
                Iterate through the input once → perform average O(1) lookup
                for each element → n iterations × O(1) lookup = O(n)
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Cause & Effect */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <GitBranch
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CAUSE & EFFECT ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Connect technical decisions to their consequences.
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  CAUSE
                </p>

                <p className="font-bold mt-1">
                  Use a hash map
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  MECHANISM
                </p>

                <p className="font-bold mt-1">
                  Average O(1) lookup
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  EFFECT
                </p>

                <p className="font-bold text-green-700 mt-1">
                  O(n) overall approach
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Depth Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Layers className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Reasoning Depth Factors
              </h2>

              <p className="text-sm text-gray-500">
                Dimensions used to evaluate technical reasoning depth.
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

            {depthFactors.map((factor) => (

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

      {/* AI Coaching */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI REASONING COACH
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Explain the "why" behind every major decision.
            </h2>

            <p className="text-gray-600 mt-2">
              A technically correct answer becomes stronger when you explain
              how you reached the decision, why the approach works, and what
              consequences follow from that choice.
            </p>

            <div className="grid md:grid-cols-4 gap-3 mt-5">

              {[
                "What?",
                "Why?",
                "How?",
                "What happens next?",
              ].map((question) => (

                <div
                  key={question}
                  className="bg-white rounded-xl p-4 text-center"
                >
                  <p className="font-bold text-orange-700">
                    {question}
                  </p>
                </div>

              ))}

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
              Recalculate reasoning depth after adding missing explanations.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Reasoning Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Reasoning depth analysis completed successfully.
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
              Refresh Reasoning Score
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate your reasoning depth after improving the answer.
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
                Reasoning depth score updated successfully.
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
                Reasoning Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates the depth behind an answer.
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
              A correct answer is stronger when the reasoning is visible.
            </h2>

            <p className="text-gray-600 mt-2">
              Instead of only stating the final solution, explain the decisions,
              mechanisms, cause-and-effect relationships, and trade-offs that
              led you there. This demonstrates genuine understanding and makes
              you better prepared for technical follow-up questions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}