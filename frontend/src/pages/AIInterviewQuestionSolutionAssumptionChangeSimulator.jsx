import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Target,
} from "lucide-react";

const assumptions = [
  {
    title: "Input Is Sorted",
    original: "The input array is sorted in ascending order.",
    changed: "The input array is no longer guaranteed to be sorted.",
    impact: "High",
    affected: "Binary search strategy",
    result: "Current solution becomes invalid.",
    adaptation:
      "Replace binary search with an approach that does not depend on ordering.",
  },
  {
    title: "Input Fits in Memory",
    original: "The complete dataset can fit in memory.",
    changed: "The dataset is too large to fit into memory.",
    impact: "High",
    affected: "Data loading and processing",
    result: "Current solution needs modification.",
    adaptation:
      "Use streaming, chunking, external storage, or distributed processing.",
  },
  {
    title: "Values Are Unique",
    original: "Every input value is unique.",
    changed: "Duplicate values are now allowed.",
    impact: "Medium",
    affected: "Lookup and result handling",
    result: "Solution may require additional handling.",
    adaptation:
      "Define duplicate behavior and update the data structure or iteration logic.",
  },
];

const decisions = [
  {
    title: "Algorithm Selection",
    description:
      "The selected algorithm may depend directly on assumptions about the input.",
  },
  {
    title: "Data Structures",
    description:
      "A data structure may become inefficient or invalid after an assumption changes.",
  },
  {
    title: "Input Processing",
    description:
      "Input constraints can determine whether in-memory or streaming processing is appropriate.",
  },
  {
    title: "Output Behavior",
    description:
      "Changed assumptions can affect duplicate handling, ordering, or failure behavior.",
  },
];

const recommendations = [
  {
    title: "Identify Hidden Dependencies",
    reason:
      "Your current approach relies heavily on the input being sorted.",
    action:
      "Before selecting an algorithm, explicitly list assumptions that make the approach valid.",
  },
  {
    title: "Test One Assumption at a Time",
    reason:
      "Changing multiple requirements simultaneously makes it difficult to understand causality.",
    action:
      "Modify a single assumption and evaluate exactly which part of the solution changes.",
  },
  {
    title: "Explain the Adaptation",
    reason:
      "Recognizing that a solution fails is only the first step.",
    action:
      "Describe which component must change and why the replacement approach satisfies the new condition.",
  },
];

const workflow = [
  {
    title: "Extract",
    description: "Identify assumptions behind the solution.",
  },
  {
    title: "Change",
    description: "Modify one assumption.",
  },
  {
    title: "Evaluate",
    description: "Check whether the solution remains valid.",
  },
  {
    title: "Adapt",
    description: "Modify affected components.",
  },
  {
    title: "Explain",
    description: "Justify the revised solution.",
  },
];

export default function AIInterviewQuestionSolutionAssumptionChangeSimulator() {
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showDecisions, setShowDecisions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const current = assumptions[selected];

  const evaluateAnswer = () => {
    setEvaluated(true);
  };

  const nextScenario = () => {
    setSelected((value) => (value + 1) % assumptions.length);
    setAnswer("");
    setEvaluated(false);
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
            AI Assumption Change Simulator
          </h1>

          <p className="text-gray-500">
            Test whether your interview solution remains valid when one of its
            underlying assumptions changes.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {evaluated ? "82%" : "—"}
              </p>

              <p className="text-xs text-gray-500">
                Adaptability
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ASSUMPTION ADAPTABILITY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Can Your Solution Survive a Changed Requirement?
            </h2>

            <p className="text-gray-600 mt-2">
              The AI changes one assumption at a time and evaluates whether you
              can identify the impact and adapt your original approach.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Scenarios
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {assumptions.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              High Impact
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Current Scenario
            </p>

            <p className="text-3xl font-black text-green-600">
              {selected + 1}/3
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <GitBranch className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Adaptation Required
            </p>

            <p className="text-3xl font-black text-purple-600">
              Yes
            </p>

          </div>

        </div>

      </div>

      {/* Original Assumption */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <GitBranch className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Original Assumptions
              </h2>

              <p className="text-sm text-gray-500">
                Assumptions detected from the original problem and solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowAssumptions(!showAssumptions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAssumptions
              ? "Hide Assumptions"
              : "Show Assumptions"}
          </button>

        </div>

        {showAssumptions && (
          <div className="space-y-4 mt-6">

            {assumptions.map((item, index) => (

              <button
                type="button"
                key={item.title}
                onClick={() => {
                  setSelected(index);
                  setEvaluated(false);
                  setAnswer("");
                }}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selected === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.original}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-bold ${
                      item.impact === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.impact}
                  </span>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Changed Assumption Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              ASSUMPTION CHANGED
            </p>

            <h2 className="text-xl font-bold text-orange-800">
              {current.title}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-gray-500">
            ORIGINAL
          </p>

          <p className="text-gray-700 mt-2">
            {current.original}
          </p>

        </div>

        <div className="flex justify-center my-4">

          <ArrowDown
            className="text-orange-600"
            size={26}
          />

        </div>

        <div className="bg-red-50 rounded-xl p-5">

          <p className="text-xs font-bold text-red-600">
            NEW CONDITION
          </p>

          <p className="text-gray-700 mt-2 font-semibold">
            {current.changed}
          </p>

        </div>

      </div>

      {/* Candidate Challenge */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Challenge
            </h2>

            <p className="text-sm text-gray-500">
              Think through the changed assumption before viewing the AI
              analysis.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              STEP 1
            </p>

            <h3 className="font-bold mt-2">
              Does it still work?
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Decide whether the original solution remains valid.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              STEP 2
            </p>

            <h3 className="font-bold mt-2">
              What is affected?
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Identify the algorithm, data structure, or component affected.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              STEP 3
            </p>

            <h3 className="font-bold mt-2">
              How would you adapt?
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Explain the smallest change needed to satisfy the new condition.
            </p>

          </div>

        </div>

        <textarea
          value={answer}
          onChange={(event) =>
            setAnswer(event.target.value)
          }
          placeholder="Explain whether your original solution still works and how you would adapt it..."
          className="w-full min-h-40 border rounded-2xl p-5 mt-6 resize-y outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap gap-3 mt-4">

          <button
            type="button"
            onClick={evaluateAnswer}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            Evaluate My Reasoning
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={nextScenario}
            className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold"
          >
            Next Scenario
          </button>

        </div>

        {evaluated && (
          <div className="bg-green-50 rounded-xl p-5 mt-5">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600 shrink-0"
                size={24}
              />

              <div>

                <p className="font-bold text-green-800">
                  AI Evaluation: Strong Adaptation Reasoning
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  You correctly identified that the changed assumption affects
                  the original approach and recognized the need to modify the
                  affected component.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Impact Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          AI Impact Analysis
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          See exactly what changes when the assumption is modified.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-gray-500">
              AFFECTED COMPONENT
            </p>

            <p className="font-bold text-indigo-700 mt-2">
              {current.affected}
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-gray-500">
              SOLUTION STATUS
            </p>

            <p className="font-bold text-red-600 mt-2">
              {current.result}
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs font-bold text-gray-500">
              REQUIRED ADAPTATION
            </p>

            <p className="font-bold text-green-700 mt-2">
              Modify approach
            </p>

          </div>

        </div>

        <div className="bg-indigo-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-indigo-600">
            AI ADAPTATION GUIDANCE
          </p>

          <p className="text-gray-700 mt-2">
            {current.adaptation}
          </p>

        </div>

      </div>

      {/* Decision Impact */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Potentially Affected Decisions
            </h2>

            <p className="text-sm text-gray-500">
              Assumption changes can propagate through multiple solution
              decisions.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowDecisions(!showDecisions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showDecisions
              ? "Hide Decisions"
              : "Show Decisions"}
          </button>

        </div>

        {showDecisions && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {decisions.map((decision, index) => (

              <div
                key={decision.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {decision.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {decision.description}
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
                AI Adaptation Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve your reasoning when interview requirements change.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(
                !showRecommendations
              )
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

      {/* Practice Principle */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW COACH
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Make your assumptions explicit
            </h2>

            <p className="text-gray-600 mt-2">
              When presenting a solution, state the assumptions that your
              approach depends on. This makes it easier to reason about what
              happens when an interviewer changes a requirement.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                PRACTICE FORMULA
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Assumption → Dependency → Impact → Adaptation
              </p>

            </div>

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
              Generate New Assumption Scenario
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Try another assumption change to test whether your reasoning
              generalizes.
            </p>

            <button
              type="button"
              onClick={nextScenario}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Scenario
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4">
                New assumption scenario generated.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Assumption Change Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates solution adaptability.
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
              Know why your solution works, not just that it works.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates understand the assumptions behind their
              decisions. When an interviewer changes one assumption, they can
              identify the affected component, explain the impact, and adapt
              their solution instead of starting from scratch.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}