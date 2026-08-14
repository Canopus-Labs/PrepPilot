import React, { useState } from "react";
import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  GitBranch,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const invariantChecks = [
  {
    name: "Initialization",
    score: 92,
    status: "Valid",
    description:
      "The proposed invariant is true before the algorithm begins processing elements.",
  },
  {
    name: "Maintenance",
    score: 84,
    status: "Valid",
    description:
      "The invariant remains true after each iteration of the main loop.",
  },
  {
    name: "Termination",
    score: 78,
    status: "Good",
    description:
      "When the algorithm terminates, the invariant provides useful information about the final state.",
  },
  {
    name: "Correctness Connection",
    score: 71,
    status: "Needs Detail",
    description:
      "The candidate should explain more clearly how the final invariant implies the required result.",
  },
];

const invariantSteps = [
  {
    title: "Initialization",
    description: "Show that the invariant is true before execution.",
  },
  {
    title: "Maintenance",
    description: "Show that every algorithm step preserves the invariant.",
  },
  {
    title: "Termination",
    description: "Show how the invariant helps prove the final result.",
  },
];

const examples = [
  {
    algorithm: "Binary Search",
    invariant:
      "If the target exists, it remains within the current search interval.",
    explanation:
      "After every midpoint comparison, the algorithm removes only a region that cannot contain the target.",
  },
  {
    algorithm: "Insertion Sort",
    invariant:
      "The processed prefix remains sorted after every iteration.",
    explanation:
      "Each newly selected element is inserted into its correct position within the already sorted prefix.",
  },
  {
    algorithm: "Sliding Window",
    invariant:
      "The current window satisfies the required validity condition.",
    explanation:
      "The window expands or contracts while maintaining the condition required by the algorithm.",
  },
];

export default function AIInterviewQuestionSolutionInvariantChecker() {
  const [invariant, setInvariant] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [selectedExample, setSelectedExample] = useState(
    examples[0]
  );

  const overallScore = Math.round(
    invariantChecks.reduce(
      (sum, item) => sum + item.score,
      0
    ) / invariantChecks.length
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
            AI Solution Invariant Checker
          </h1>

          <p className="text-gray-500">
            Identify, validate, and connect algorithmic invariants to solution
            correctness.
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
              INVARIANT VALIDATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {overallScore >= 80
                ? "Strong Reasoning"
                : overallScore >= 60
                ? "Needs More Explanation"
                : "Invariant Needs Revision"}
            </h2>

            <p className="text-gray-600 mt-2">
              The AI evaluates whether the proposed invariant is true initially,
              preserved during execution, and useful for proving correctness.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <ShieldCheck
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overall Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Valid Checks
            </p>

            <p className="text-3xl font-black text-green-600">
              3
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Needs Detail
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Proof Stages
            </p>

            <p className="text-3xl font-black text-purple-600">
              3
            </p>

          </div>

        </div>

      </div>

      {/* Invariant Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BookOpen className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Define Your Algorithmic Invariant
            </h2>

            <p className="text-sm text-gray-500">
              Explain the condition that should remain true throughout the
              algorithm.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            EXAMPLE PROBLEM
          </p>

          <h3 className="font-bold mt-2">
            Explain why Binary Search correctly finds a target in a sorted
            array.
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Identify an invariant that remains true after every iteration.
          </p>

        </div>

        <textarea
          value={invariant}
          onChange={(e) => setInvariant(e.target.value)}
          placeholder="Example: If the target exists, it always remains inside the current search interval..."
          className="w-full mt-5 min-h-[130px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Validate Invariant
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Validation Stages */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Invariant Validation Stages
            </h2>

            <p className="text-sm text-gray-500">
              A valid invariant must survive all three proof stages.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          {invariantSteps.map((step, index) => (

            <div
              key={step.title}
              className="border rounded-2xl p-5"
            >

              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <h3 className="font-bold mt-4">
                {step.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Detailed Checks */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Invariant Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Select a stage to see how the AI evaluates your reasoning.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {invariantChecks.map((check) => (

            <button
              type="button"
              key={check.name}
              onClick={() => setSelectedCheck(check)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedCheck?.name === check.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {check.score >= 75 ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={24}
                  />
                )}

                <div className="flex-1">

                  <h3 className="font-bold">
                    {check.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {check.description}
                  </p>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className={`h-full rounded-full ${
                        check.score >= 75
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${check.score}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-black">
                    {check.score}
                  </p>

                  <p className="text-xs text-gray-500">
                    {check.status}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Check */}
      {selectedCheck && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Lightbulb
              className="text-indigo-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-indigo-600">
                AI PROOF ANALYSIS
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedCheck.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedCheck.description}
              </p>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-indigo-600">
                  INTERVIEW GUIDANCE
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {selectedCheck.name === "Initialization"
                    ? "Start by explaining why the invariant is true before the first iteration."
                    : selectedCheck.name === "Maintenance"
                    ? "Explain why each operation preserves the invariant instead of simply stating that it does."
                    : selectedCheck.name === "Termination"
                    ? "Connect the final invariant to the required output and explain why it proves correctness."
                    : "Provide a clear logical connection between the invariant and the correctness of the complete algorithm."}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Examples */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BookOpen className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Common Algorithm Invariants
            </h2>

            <p className="text-sm text-gray-500">
              Learn how invariants appear in different algorithm patterns.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {examples.map((example) => (

            <button
              type="button"
              key={example.algorithm}
              onClick={() => setSelectedExample(example)}
              className={`text-left border rounded-xl p-5 ${
                selectedExample.algorithm === example.algorithm
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <h3 className="font-bold">
                {example.algorithm}
              </h3>

              <p className="text-sm text-indigo-700 font-semibold mt-3">
                {example.invariant}
              </p>

              <p className="text-sm text-gray-500 mt-3">
                {example.explanation}
              </p>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Example */}
      <div className="bg-purple-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-purple-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-purple-600">
              INVARIANT EXAMPLE
            </p>

            <h2 className="text-xl font-bold text-purple-800 mt-1">
              {selectedExample.algorithm}
            </h2>

            <p className="font-semibold mt-3">
              {selectedExample.invariant}
            </p>

            <p className="text-gray-600 mt-2">
              {selectedExample.explanation}
            </p>

          </div>

        </div>

      </div>

      {/* AI Coach Questions */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI COACH QUESTIONS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Defend your invariant.
            </h2>

            <div className="space-y-3 mt-4">

              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold">
                  1. Why is your invariant true before the algorithm starts?
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold">
                  2. What happens to the invariant after one iteration?
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold">
                  3. How does the invariant prove that your final result is
                  correct?
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold">
                  4. Can you identify an input where your proposed invariant
                  would not hold?
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Analysis Result */}
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
                Invariant validation completed.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can send the candidate's
                invariant to the AI evaluator for semantic validation,
                maintenance reasoning, and correctness analysis.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Invariant Coaching Flow
            </h2>

            <p className="text-sm text-gray-500">
              The coach focuses on reasoning rather than only checking output.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Understand Algorithm",
            "Identify Invariant",
            "Validate Initialization",
            "Validate Maintenance",
            "Validate Termination",
            "Connect to Correctness",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
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

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Do not stop at "the algorithm works."
            </h2>

            <p className="text-gray-600 mt-2">
              Identify the condition that remains true throughout execution,
              prove that each operation preserves it, and explain how the final
              condition establishes correctness. This creates a much stronger
              technical interview explanation.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}