import React, { useState } from "react";
import {
  Brain,
  Bug,
  Search,
  Target,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Code2,
} from "lucide-react";

const debuggingSteps = [
  {
    step: 1,
    title: "Reproduce the Failure",
    status: "Current",
    icon: Bug,
    description:
      "Run the solution against the failing input and confirm that the incorrect behavior is reproducible.",
    action:
      "Execute the failing test case without changing the implementation.",
  },
  {
    step: 2,
    title: "Identify the Failing Case",
    status: "Next",
    icon: Search,
    description:
      "Determine exactly which input or condition causes the unexpected result.",
    action:
      "Compare the expected output with the actual output.",
  },
  {
    step: 3,
    title: "Check Assumptions",
    status: "Pending",
    icon: Target,
    description:
      "Review assumptions about input values, boundaries, data structures, and algorithm behavior.",
    action:
      "List the assumptions your solution depends on and validate them.",
  },
  {
    step: 4,
    title: "Isolate the Component",
    status: "Pending",
    icon: Code2,
    description:
      "Narrow the problem to the operation, function, loop, or condition responsible for the failure.",
    action:
      "Test individual components instead of debugging the entire solution at once.",
  },
  {
    step: 5,
    title: "Test a Correction",
    status: "Pending",
    icon: FlaskConical,
    description:
      "Make a focused change and verify whether it addresses the identified cause.",
    action:
      "Change one relevant part of the implementation and rerun the failing case.",
  },
  {
    step: 6,
    title: "Verify the Fix",
    status: "Pending",
    icon: CheckCircle2,
    description:
      "Confirm that the correction solves the original failure without introducing regressions.",
    action:
      "Run the original case, edge cases, and previously passing tests.",
  },
];

const failureSignals = [
  {
    name: "Incorrect Boundary Handling",
    score: 82,
    severity: "High",
    description:
      "The failing input appears close to a boundary condition that the implementation may not handle correctly.",
  },
  {
    name: "State Update Order",
    score: 67,
    severity: "Medium",
    description:
      "A variable may be updated before another operation reads its previous state.",
  },
  {
    name: "Input Assumption",
    score: 54,
    severity: "Medium",
    description:
      "The implementation appears to assume a property that may not be guaranteed by the problem.",
  },
  {
    name: "Algorithm Selection",
    score: 31,
    severity: "Low",
    description:
      "The overall algorithm appears suitable, so changing the algorithm should not be the first debugging action.",
  },
];

const debuggingQuestions = [
  "Can you reproduce the failure consistently?",
  "What is the smallest input that still produces the wrong result?",
  "What is the first point where actual behavior differs from expected behavior?",
  "Which assumption about the input might be incorrect?",
  "Which variable or component first contains an unexpected value?",
  "Can you change one thing and test whether the behavior changes?",
  "Does the correction still pass the previously working test cases?",
];

const recommendations = [
  {
    title: "Start With the Smallest Failing Case",
    reason:
      "Large inputs can hide the actual source of the problem.",
    action:
      "Reduce the failing example until the incorrect behavior is easy to trace.",
  },
  {
    title: "Avoid Changing Multiple Things",
    reason:
      "Changing several parts simultaneously makes it difficult to identify the actual cause.",
    action:
      "Make one controlled correction at a time.",
  },
  {
    title: "Verify Against Previous Tests",
    reason:
      "A fix can solve one failure while creating a regression elsewhere.",
    action:
      "Re-run both the failing case and previously successful cases.",
  },
];

const workflow = [
  {
    title: "Reproduce",
    description: "Confirm the failure.",
  },
  {
    title: "Observe",
    description: "Compare expected and actual behavior.",
  },
  {
    title: "Isolate",
    description: "Find the problematic component.",
  },
  {
    title: "Correct",
    description: "Test a focused change.",
  },
  {
    title: "Verify",
    description: "Check the complete solution.",
  },
];

export default function AIInterviewQuestionDebuggingPathGenerator() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState(
    failureSignals[0]
  );
  const [showSignals, setShowSignals] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [generated, setGenerated] = useState(false);

  const completedSteps = activeStep;
  const progress = Math.round(
    (completedSteps / debuggingSteps.length) * 100
  );

  const currentStep = debuggingSteps[activeStep];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Debugging Path Generator
          </h1>

          <p className="text-gray-500">
            Follow a structured debugging process instead of immediately
            receiving the corrected implementation.
          </p>
        </div>

      </div>

      {/* Debugging Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-xs font-bold text-indigo-600">
              DEBUGGING SESSION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {currentStep.title}
            </h2>

            <p className="text-gray-600 mt-2">
              Step {currentStep.step} of {debuggingSteps.length}
            </p>

          </div>

          <div className="w-28 h-28 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-2xl font-black text-indigo-700">
                {progress}%
              </p>

              <p className="text-xs text-gray-500">
                progress
              </p>

            </div>

          </div>

        </div>

        <div className="h-3 bg-white rounded-full mt-6">

          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Bug className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Debugging Steps
            </p>

            <p className="text-3xl font-black text-indigo-600">
              6
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Likely Risk
            </p>

            <p className="text-xl font-black text-orange-600">
              Boundary
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Current Step
            </p>

            <p className="text-3xl font-black text-purple-600">
              {activeStep + 1}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Completed
            </p>

            <p className="text-3xl font-black text-green-600">
              {completedSteps}
            </p>

          </div>

        </div>

      </div>

      {/* Debugging Path */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Bug className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Structured Debugging Path
            </h2>

            <p className="text-sm text-gray-500">
              Complete each debugging stage before moving to the next.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {debuggingSteps.map((step, index) => {

            const Icon = step.icon;

            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            return (
              <button
                type="button"
                key={step.step}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  isActive
                    ? "border-indigo-500 bg-indigo-50"
                    : isCompleted
                    ? "border-green-300 bg-green-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      <Icon size={22} />
                    )}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {step.step}. {step.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {step.description}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          isCompleted
                            ? "bg-green-100 text-green-700"
                            : isActive
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isCompleted
                          ? "Completed"
                          : isActive
                          ? "Current"
                          : step.status}
                      </span>

                    </div>

                    <p className="text-sm font-semibold text-indigo-700 mt-3">
                      Action: {step.action}
                    </p>

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Current Step */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              CURRENT DEBUGGING OBJECTIVE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {currentStep.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {currentStep.description}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                YOUR NEXT ACTION
              </p>

              <p className="font-bold text-indigo-700 mt-1">
                {currentStep.action}
              </p>

            </div>

            <div className="flex justify-end gap-3 mt-5">

              {activeStep > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((value) => value - 1)
                  }
                  className="px-4 py-2 rounded-xl border bg-white text-gray-700 font-semibold"
                >
                  Previous
                </button>
              )}

              {activeStep < debuggingSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((value) => value + 1)
                  }
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Complete Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setGenerated(true)}
                  className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  Verify Fix
                  <CheckCircle2 size={18} />
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Failure Signals */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Potential Failure Signals
              </h2>

              <p className="text-sm text-gray-500">
                Possible causes ranked by the AI without immediately revealing
                the correction.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSignals(!showSignals)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSignals ? "Hide Signals" : "Show Signals"}
          </button>

        </div>

        {showSignals && (
          <div className="space-y-4 mt-6">

            {failureSignals.map((signal) => (

              <button
                type="button"
                key={signal.name}
                onClick={() => setSelectedSignal(signal)}
                className={`w-full text-left border rounded-xl p-5 transition ${
                  selectedSignal.name === signal.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {signal.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {signal.description}
                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        signal.severity === "High"
                          ? "bg-orange-100 text-orange-700"
                          : signal.severity === "Medium"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {signal.severity}
                    </span>

                    <p className="font-black text-indigo-600 mt-2">
                      {signal.score}%
                    </p>

                  </div>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${signal.score}%`,
                    }}
                  />

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Signal */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              CURRENT LEADING SIGNAL
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedSignal.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedSignal.description}
            </p>

            <p className="text-sm font-semibold text-orange-700 mt-3">
              Estimated relevance: {selectedSignal.score}%
            </p>

          </div>

        </div>

      </div>

      {/* Debugging Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Debugging Questions
              </h2>

              <p className="text-sm text-gray-500">
                Guided questions encourage independent debugging.
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

            {debuggingQuestions.map((question, index) => (

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
                AI Debugging Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Practical habits for systematic debugging.
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
                Debugging Workflow
              </h2>

              <p className="text-sm text-gray-500">
                A repeatable engineering-style debugging process.
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Debugging Path
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                DEBUGGING PATH GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Follow the path before changing the implementation.
              </h2>

              <p className="text-gray-600 mt-2">
                Start by reproducing the failure, isolate the smallest failing
                case, validate assumptions, locate the faulty component, test
                one correction, and finally verify the fix against regression
                cases.
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
              AI DEBUGGING PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Find the cause before changing the code.
            </h2>

            <p className="text-gray-600 mt-2">
              Effective debugging is not about guessing fixes. It is about
              reproducing the failure, collecting evidence, isolating the
              cause, making a controlled correction, and verifying that the
              correction does not introduce new failures.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}