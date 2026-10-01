import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const proofSteps = [
  {
    title: "Explain the Core Idea",
    description: "Why does your overall algorithm solve the problem?",
    status: "Completed",
    score: 90,
  },
  {
    title: "Justify Each Major Step",
    description: "Explain why every important operation is necessary.",
    status: "Needs Review",
    score: 72,
  },
  {
    title: "Prove the Result",
    description: "Explain why the final result must be correct.",
    status: "Needs Review",
    score: 68,
  },
  {
    title: "Identify Assumptions",
    description: "State the assumptions required for your reasoning.",
    status: "Completed",
    score: 84,
  },
  {
    title: "Test Counterexamples",
    description: "Find cases that could invalidate your reasoning.",
    status: "Not Started",
    score: 0,
  },
];

const proofQuestions = [
  "Why does your algorithm always find the required element when one exists?",
  "What invariant remains true after each iteration?",
  "Why can this element safely be ignored?",
  "What happens when the input contains the smallest valid case?",
  "Which assumption is your proof relying on?",
  "Can you construct an input where your reasoning would fail?",
];

export default function AIInterviewQuestionSolutionProofCoach() {
  const [solution, setSolution] = useState("");
  const [proof, setProof] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <ShieldCheck size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Question Solution Proof Coach
          </h1>

          <p className="text-gray-500">
            Practice proving why your algorithm works instead of relying only
            on successful test cases.
          </p>

        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Given a sorted array, determine whether two numbers add up to a
          target value.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Arrays",
            "Two Pointers",
            "Correctness",
            "Proof",
            "Edge Cases",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Proposed Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Describe your algorithm before attempting to prove why it works.
        </p>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={7}
          placeholder="Example: I would use two pointers, one at the beginning and one at the end..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!solution.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Start Proof Analysis
        </button>

      </div>

      {analyzed && (
        <>
          {/* Proof Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Solution Proof Strength
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    76%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Needs Improvement
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your algorithm appears valid, but the correctness reasoning
                  needs stronger justification around invariants and discarded
                  search space.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "76%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Proof Steps
              </p>

              <p className="text-3xl font-black text-green-600">
                2/5
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Correctness
              </p>

              <p className="text-3xl font-black text-indigo-600">
                82%
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Reasoning Gaps
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <GitBranch className="text-purple-600" />

              <p className="text-sm text-gray-500 mt-4">
                Counterexamples
              </p>

              <p className="text-3xl font-black text-purple-600">
                4
              </p>

            </div>

          </div>

          {/* Proof Checklist */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Correctness Proof Checklist
                </h2>

                <p className="text-sm text-gray-500">
                  AI evaluates the reasoning required to establish correctness.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {proofSteps.map((step, index) => (
                <button
                  type="button"
                  key={step.title}
                  onClick={() =>
                    setActiveStep(activeStep === index ? null : index)
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        step.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : step.status === "Needs Review"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {step.status === "Completed" ? (
                        <CheckCircle2 size={22} />
                      ) : (
                        <span className="font-bold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {step.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {step.description}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            step.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : step.status === "Needs Review"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {step.status}
                        </span>

                      </div>

                      {step.score > 0 && (
                        <div className="mt-4">

                          <div className="flex justify-between text-xs">

                            <span className="text-gray-500">
                              Proof strength
                            </span>

                            <span className="font-bold">
                              {step.score}%
                            </span>

                          </div>

                          <div className="h-2 bg-gray-200 rounded-full mt-2">

                            <div
                              className="h-full bg-indigo-500 rounded-full"
                              style={{
                                width: `${step.score}%`,
                              }}
                            />

                          </div>

                        </div>
                      )}

                      {activeStep === index && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-indigo-700">
                            AI Guidance
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {index === 0 &&
                              "State the key property that makes the algorithm valid and connect it directly to the problem requirements."}

                            {index === 1 &&
                              "Explain why moving a pointer cannot discard a potentially valid answer."}

                            {index === 2 &&
                              "Show why the remaining search space contains every possible valid pair."}

                            {index === 3 &&
                              "Explicitly state assumptions such as the input being sorted."}

                            {index === 4 &&
                              "Try constructing an input that would make your reasoning incorrect."}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Proof Input */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <BookOpen className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Explain Why Your Solution Works
                </h2>

                <p className="text-sm text-gray-500">
                  Answer the proof questions as if the interviewer challenged
                  your solution.
                </p>

              </div>

            </div>

            <textarea
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              rows={8}
              placeholder="Explain why your algorithm is correct..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!proof.trim()}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Evaluate My Proof
            </button>

          </div>

          {/* Interviewer Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-lg">
                  AI Interviewer Proof Questions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Use these questions to practice defending the correctness of
                  your solution.
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-6">

              {proofQuestions.map((question, index) => (
                <div
                  key={question}
                  className="border rounded-xl p-4 flex gap-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    {question}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Invariant Explanation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <ShieldCheck
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Key Invariant
                </h2>

                <p className="text-gray-600 mt-2">
                  At every step, the two-pointer positions define a remaining
                  search space that contains every pair that could still
                  satisfy the target. When a pointer moves, the ordering of
                  the array guarantees that the discarded possibilities cannot
                  form the required sum.
                </p>

              </div>

            </div>

          </div>

          {/* Reasoning Gap */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Main Reasoning Gap
                </h2>

                <p className="text-gray-600 mt-2">
                  Your explanation says that the pointer should move when the
                  current sum is too large or too small, but it does not prove
                  why doing so cannot eliminate a valid pair. This is the most
                  important part of the correctness argument to strengthen.
                </p>

              </div>

            </div>

          </div>

          {/* Counterexample Challenge */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3">

              <GitBranch
                className="text-purple-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-lg">
                  Counterexample Challenge
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Try to find a valid input that breaks your reasoning.
                </p>

                <div className="bg-purple-50 rounded-xl p-5 mt-5">

                  <p className="font-semibold">
                    Challenge:
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Can you construct a sorted array where moving the left
                    pointer after a sum smaller than the target causes the
                    algorithm to miss a valid pair?
                  </p>

                </div>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold"
                >
                  Attempt Counterexample
                </button>

              </div>

            </div>

          </div>

          {/* Proof Flow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Correctness Proof Flow
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              A strong interview proof should connect these reasoning steps.
            </p>

            <div className="flex flex-col items-center mt-7">

              {[
                "State the Algorithm",
                "Define the Invariant",
                "Justify Each Step",
                "Handle All Cases",
                "Prove Termination",
                "Establish Correctness",
              ].map((step, index, array) => (
                <React.Fragment key={step}>

                  <div
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      index === 0
                        ? "bg-indigo-100 text-indigo-700"
                        : index === array.length - 1
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {step}
                  </div>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="rotate-90 text-indigo-400 my-2"
                      size={20}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* AI Coach */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Proof Coaching
                </h2>

                <p className="text-gray-600 mt-2">
                  Passing test cases demonstrates that your implementation
                  works for those inputs. A correctness explanation should go
                  further: identify the property that makes the algorithm
                  correct for every valid input and explain why each operation
                  preserves that property.
                </p>

              </div>

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  AI Final Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution appears correct, but focus on proving why
                  discarded possibilities cannot contain a valid answer. In a
                  real interview, clearly stating the invariant and connecting
                  it to every pointer movement will make your explanation much
                  stronger.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}