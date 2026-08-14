import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  TestTube2,
  ArrowRight,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const testCases = [
  {
    type: "Minimum Input",
    input: "n = 1",
    purpose: "Verify the smallest valid input.",
    expected: "Single element should be processed correctly.",
    risk: "Low",
  },
  {
    type: "Maximum Input",
    input: "n = 100000",
    purpose: "Test the maximum allowed constraint.",
    expected: "Solution should remain within time and memory limits.",
    risk: "High",
  },
  {
    type: "Empty Input",
    input: "[]",
    purpose: "Check behavior when no data is provided.",
    expected: "Solution should handle empty input safely.",
    risk: "High",
  },
  {
    type: "Boundary Input",
    input: "n = 100",
    purpose: "Test the exact constraint boundary.",
    expected: "Behavior should remain valid at the limit.",
    risk: "Medium",
  },
  {
    type: "Near-Limit Input",
    input: "n = 99999",
    purpose: "Check behavior immediately below the maximum.",
    expected: "Performance should remain acceptable.",
    risk: "High",
  },
];

const coachingQuestions = [
  "What is the smallest valid input for this problem?",
  "What happens when the input reaches the maximum constraint?",
  "What should your solution return for an empty input?",
  "Which condition changes exactly at the boundary?",
  "What could fail when the input is just below the maximum?",
];

const workflow = [
  {
    title: "Extract",
    description: "Identify problem constraints.",
  },
  {
    title: "Generate",
    description: "Create boundary-focused tests.",
  },
  {
    title: "Predict",
    description: "Predict expected behavior.",
  },
  {
    title: "Execute",
    description: "Run the solution.",
  },
  {
    title: "Compare",
    description: "Find mismatches.",
  },
];

const recommendations = [
  {
    title: "Test the Limits First",
    reason:
      "Boundary values often expose assumptions that normal inputs do not reveal.",
    action:
      "Always identify minimum and maximum valid constraints before submitting.",
  },
  {
    title: "Predict Before Running",
    reason:
      "Prediction forces you to reason about the algorithm instead of relying only on execution.",
    action:
      "Write the expected output before running each important boundary case.",
  },
  {
    title: "Check Near-Limit Inputs",
    reason:
      "Off-by-one errors frequently occur immediately around constraint boundaries.",
    action:
      "Test values just below and just above important thresholds.",
  },
];

export default function AIInterviewQuestionSolutionBoundaryTest() {
  const [selectedCase, setSelectedCase] = useState(testCases[0]);
  const [prediction, setPrediction] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [generated, setGenerated] = useState(false);

  const submitPrediction = () => {
    setSubmitted(true);
  };

  const resetPrediction = () => {
    setPrediction("");
    setSubmitted(false);
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
            AI Solution Boundary Test
          </h1>

          <p className="text-gray-500">
            Test your solution at minimum, maximum, empty, and near-limit
            conditions before execution.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                82%
              </p>

              <p className="text-xs text-gray-500">
                Coverage
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              BOUNDARY TEST COVERAGE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Constraint-Aware Testing
            </h2>

            <p className="text-gray-600 mt-2">
              The AI focuses on inputs most likely to expose hidden assumptions,
              off-by-one errors, and constraint-related failures.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <TestTube2
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Boundary Tests
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Safe Cases
            </p>

            <p className="text-3xl font-black text-green-600">
              3
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High-Risk Cases
            </p>

            <p className="text-3xl font-black text-red-600">
              3
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Prediction Accuracy
            </p>

            <p className="text-3xl font-black text-orange-600">
              88%
            </p>

          </div>

        </div>

      </div>

      {/* Problem Constraints */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Problem Constraints
            </h2>

            <p className="text-sm text-gray-500">
              The AI extracts these limits before generating tests.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              MINIMUM
            </p>

            <p className="text-2xl font-black text-indigo-600 mt-1">
              1
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              MAXIMUM
            </p>

            <p className="text-2xl font-black text-indigo-600 mt-1">
              100000
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              EMPTY
            </p>

            <p className="text-2xl font-black text-indigo-600 mt-1">
              Allowed
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              TYPE
            </p>

            <p className="text-2xl font-black text-indigo-600 mt-1">
              Integer
            </p>

          </div>

        </div>

      </div>

      {/* Test Cases */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TestTube2 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI-Generated Boundary Tests
              </h2>

              <p className="text-sm text-gray-500">
                Select a case and predict the behavior before execution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTests(!showTests)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTests ? "Hide Tests" : "Show Tests"}
          </button>

        </div>

        {showTests && (
          <div className="space-y-4 mt-6">

            {testCases.map((test) => (

              <button
                type="button"
                key={test.type}
                onClick={() => {
                  setSelectedCase(test);
                  resetPrediction();
                }}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedCase.type === test.type
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {test.type.charAt(0)}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {test.type}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          test.risk === "High"
                            ? "bg-red-100 text-red-700"
                            : test.risk === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {test.risk} Risk
                      </span>

                    </div>

                    <p className="font-mono text-sm text-indigo-700 mt-2">
                      {test.input}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {test.purpose}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Prediction Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              PREDICT BEFORE EXECUTION
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedCase.type}
            </h2>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs text-gray-500">
                TEST INPUT
              </p>

              <p className="font-mono text-lg font-bold text-indigo-700 mt-2">
                {selectedCase.input}
              </p>

            </div>

            <div className="mt-5">

              <label className="text-sm font-semibold text-gray-700">
                What do you predict will happen?
              </label>

              <textarea
                value={prediction}
                onChange={(event) =>
                  setPrediction(event.target.value)
                }
                placeholder="Explain the expected output, behavior, or possible failure..."
                rows={4}
                className="w-full mt-2 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

            <div className="flex flex-wrap gap-3 mt-4">

              <button
                type="button"
                onClick={submitPrediction}
                disabled={!prediction.trim()}
                className="px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                Submit Prediction
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={resetPrediction}
                className="px-5 py-3 rounded-xl bg-white border font-semibold flex items-center gap-2"
              >
                Reset
                <RefreshCw size={18} />
              </button>

            </div>

            {submitted && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4">

                <p className="font-bold">
                  Prediction recorded.
                </p>

                <p className="text-sm mt-1">
                  Expected behavior: {selectedCase.expected}
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Boundary Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-red-600" />

          <div>

            <h2 className="font-bold text-lg">
              Boundary Risk Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Potential weaknesses identified by the AI.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-xs text-gray-500">
              OFF-BY-ONE RISK
            </p>

            <p className="text-2xl font-black text-red-600 mt-2">
              High
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Check conditions around minimum and maximum indexes.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs text-gray-500">
              EMPTY INPUT RISK
            </p>

            <p className="text-2xl font-black text-orange-600 mt-2">
              Medium
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Verify that empty collections do not cause invalid access.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs text-gray-500">
              PERFORMANCE RISK
            </p>

            <p className="text-2xl font-black text-red-600 mt-2">
              High
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Maximum inputs should remain within the expected time limit.
            </p>

          </div>

        </div>

      </div>

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Boundary Testing Coach
              </h2>

              <p className="text-sm text-gray-500">
                Questions that develop boundary-case thinking.
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
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve boundary-focused testing habits.
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
                Boundary Testing Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI generates and evaluates boundary tests.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow
              ? "Hide Workflow"
              : "Show Workflow"}
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Boundary Tests
          <ArrowRight size={18} />
        </button>

      </div>

      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                BOUNDARY TESTS GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Five constraint-focused test cases are ready.
              </h2>

              <p className="text-gray-600 mt-2">
                Predict the expected behavior of each case before execution,
                then compare your reasoning with the actual result.
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
              Test the limits, not just the typical case.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates think about what happens at the edges of the
              problem. Minimum, maximum, empty, and near-limit inputs can reveal
              bugs that normal test cases completely miss.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}