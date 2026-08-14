import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Bug,
  ShieldAlert,
  Lightbulb,
  TestTube2,
  Search,
  ArrowRight,
  Activity,
} from "lucide-react";

const risks = [
  {
    title: "Null / Empty Input",
    severity: "High",
    probability: "Likely",
    description:
      "The proposed approach may assume that the input contains at least one element.",
    test: "Test with an empty array and null input.",
  },
  {
    title: "Duplicate Values",
    severity: "Medium",
    probability: "Possible",
    description:
      "The solution may incorrectly handle repeated values if uniqueness is implicitly assumed.",
    test: "Test with multiple identical values.",
  },
  {
    title: "Large Input",
    severity: "High",
    probability: "Likely",
    description:
      "Repeated scanning could become expensive when the input grows.",
    test: "Run the approach against a very large input.",
  },
  {
    title: "Unstated Ordering Assumption",
    severity: "High",
    probability: "Possible",
    description:
      "The approach may depend on the input being sorted even though this is not guaranteed.",
    test: "Provide an unsorted input and verify the result.",
  },
];

const validationQuestions = [
  "What happens if the input is empty?",
  "Does the algorithm still work with duplicate values?",
  "What happens when the input becomes extremely large?",
  "Does your approach depend on the input being sorted?",
];

export default function AIInterviewAnswerTechnicalFailurePreventionCoach() {
  const [solution, setSolution] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [validated, setValidated] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const analyzeSolution = () => {
    if (!solution.trim()) return;
    setAnalyzed(true);
  };

  const validateRisk = () => {
    setValidated(true);
  };

  const nextQuestion = () => {
    setQuestionIndex(
      (previous) =>
        (previous + 1) % validationQuestions.length
    );
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
            AI Technical Failure Prevention Coach
          </h1>

          <p className="text-gray-500">
            Identify likely solution failures before implementation begins.
          </p>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Given an array of integers, determine whether two elements add
              up to a target value.
            </p>

          </div>

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              Enter your approach before writing the complete implementation.
            </p>

          </div>

        </div>

        <textarea
          rows={10}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder={`Example:

I will use two pointers. One pointer starts at the beginning
and another starts at the end. If the sum is smaller than
the target, I move the left pointer. Otherwise, I move the
right pointer.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={analyzeSolution}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Predict Failure Points
        </button>

      </div>

      {analyzed && (
        <>
          {/* Main Verdict */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl h-fit">

                <ShieldAlert
                  className="text-orange-600"
                  size={30}
                />

              </div>

              <div>

                <p className="text-xs font-bold text-orange-600">
                  PRE-IMPLEMENTATION ANALYSIS
                </p>

                <h2 className="text-2xl font-black text-orange-700 mt-1">
                  4 Potential Failure Points Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach may work under normal conditions, but several
                  assumptions should be validated before implementation.
                </p>

              </div>

            </div>

          </div>

          {/* Risk Summary */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Activity className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Predicted Failure Points
                </h2>

                <p className="text-sm text-gray-500">
                  Select a risk to inspect its cause and recommended test.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {risks.map((risk) => (

                <button
                  type="button"
                  key={risk.title}
                  onClick={() => setSelectedRisk(risk)}
                  className={`text-left border rounded-2xl p-5 transition ${
                    selectedRisk?.title === risk.title
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex justify-between gap-3">

                    <div className="flex gap-3">

                      <AlertTriangle
                        className={
                          risk.severity === "High"
                            ? "text-red-600"
                            : "text-orange-600"
                        }
                        size={22}
                      />

                      <h3 className="font-bold">
                        {risk.title}
                      </h3>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        risk.severity === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {risk.severity}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    {risk.description}
                  </p>

                  <div className="mt-4 text-xs text-gray-500">
                    Probability:{" "}
                    <strong>{risk.probability}</strong>
                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Selected Risk */}
          {selectedRisk && (
            <div className="bg-red-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <Bug
                  className="text-red-600"
                  size={30}
                />

                <div className="flex-1">

                  <p className="text-xs font-bold text-red-600">
                    SELECTED RISK
                  </p>

                  <h2 className="text-2xl font-black text-red-700 mt-1">
                    {selectedRisk.title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {selectedRisk.description}
                  </p>

                  <div className="mt-5 bg-white rounded-xl p-5">

                    <div className="flex gap-3">

                      <TestTube2
                        className="text-indigo-600"
                        size={22}
                      />

                      <div>

                        <p className="text-xs font-bold text-gray-500">
                          RECOMMENDED VALIDATION TEST
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                          {selectedRisk.test}
                        </p>

                      </div>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={validateRisk}
                    className="mt-4 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold"
                  >
                    Validate This Risk
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* Validation Result */}
          {validated && (
            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2
                  className="text-green-600"
                  size={28}
                />

                <div>

                  <h2 className="font-bold text-green-700">
                    Risk Validation Recorded
                  </h2>

                  <p className="text-gray-600 mt-2">
                    This risk has been added to the solution validation
                    checklist. Once testing is performed, AI can record whether
                    the predicted failure was confirmed.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Validation Questions */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  TARGETED VALIDATION QUESTION
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-2">
                  {validationQuestions[questionIndex]}
                </h2>

                <p className="text-gray-600 mt-3">
                  Answer this before implementing the solution. The goal is to
                  identify potential failures proactively.
                </p>

                <button
                  type="button"
                  onClick={nextQuestion}
                  className="mt-4 px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold"
                >
                  Ask Another Question
                </button>

              </div>

            </div>

          </div>

          {/* Test Plan */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <TestTube2 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Pre-Implementation Test Plan
                </h2>

                <p className="text-sm text-gray-500">
                  Validate important assumptions before writing the complete
                  solution.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {risks.map((risk, index) => (

                <div
                  key={risk.title}
                  className="flex gap-4 border rounded-xl p-5"
                >

                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {risk.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {risk.test}
                    </p>

                  </div>

                  <span className="px-3 py-1 h-fit rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                    Pending
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Risk Categories */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ShieldAlert className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Failure Risk Categories
                </h2>

                <p className="text-sm text-gray-500">
                  AI checks multiple dimensions before implementation.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Bug className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Logic Failure
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Incorrect assumptions or reasoning can produce wrong results.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Activity className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Performance Failure
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Complexity may become unacceptable at larger input sizes.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <ShieldAlert className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Constraint Failure
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  The solution may violate memory, latency, or resource
                  requirements.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <TestTube2 className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Edge-Case Failure
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Boundary conditions may expose problems not visible in normal
                  examples.
                </p>

              </div>

            </div>

          </div>

          {/* AI Guidance */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Prevention Strategy
                </h2>

                <div className="space-y-2 mt-3 text-gray-600">

                  <p>
                    • Identify assumptions before implementation.
                  </p>

                  <p>
                    • Predict what could make the approach fail.
                  </p>

                  <p>
                    • Create a targeted test for each important risk.
                  </p>

                  <p>
                    • Validate the highest-risk assumptions first.
                  </p>

                  <p>
                    • Record whether predicted failures are actually confirmed.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Risk Tracking */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Activity className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Predicted Risk Tracking
                </h2>

                <p className="text-sm text-gray-500">
                  Compare AI predictions with actual implementation results.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="bg-indigo-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Risks Predicted
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  4
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Risks Validated
                </p>

                <p className="text-3xl font-black text-orange-600 mt-1">
                  1
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Prevention Success
                </p>

                <p className="text-3xl font-black text-green-600 mt-1">
                  75%
                </p>

              </div>

            </div>

          </div>

          {/* Recommended Workflow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Validation Workflow
                </h2>

                <p className="text-sm text-gray-500">
                  Use this process before committing to an implementation.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Propose Solution",
                "Predict Risks",
                "Ask Validation Questions",
                "Create Tests",
                "Implement",
                "Compare Results",
              ].map((step, index, array) => (

                <React.Fragment key={step}>

                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
                    {step}
                  </span>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="text-gray-400"
                      size={18}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Final Verdict */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Prevention Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach should be validated against the predicted
                  failure points before full implementation. Proactively
                  testing assumptions can prevent unnecessary debugging and
                  reveal weaknesses while the solution is still easy to change.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  Submit another solution and try to predict at least three
                  possible failure points before seeing AI's analysis.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Failure Prevention Challenge
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}