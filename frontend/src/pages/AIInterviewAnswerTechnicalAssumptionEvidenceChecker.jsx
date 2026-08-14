import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Search,
  ArrowRight,
} from "lucide-react";

const assumptions = [
  {
    assumption: "The input will always be sorted.",
    status: "Unsupported",
    evidence: "The problem statement does not specify sorted input.",
    risk: "High",
  },
  {
    assumption: "The input size fits comfortably in memory.",
    status: "Unverified",
    evidence: "No memory constraint is provided.",
    risk: "Medium",
  },
  {
    assumption: "Duplicate values are allowed.",
    status: "Supported",
    evidence: "The statement does not restrict duplicate values.",
    risk: "Low",
  },
];

const clarificationQuestions = [
  "Is the input guaranteed to be sorted?",
  "What is the maximum input size?",
  "Can duplicate values occur?",
  "Are there memory or latency constraints?",
];

export default function AIInterviewAnswerTechnicalAssumptionEvidenceChecker() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const analyzeAnswer = () => {
    if (!answer.trim()) return;
    setAnalyzed(true);
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
            AI Technical Assumption Evidence Checker
          </h1>

          <p className="text-gray-500">
            Detect hidden assumptions and verify whether they are supported by
            the interview problem.
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
              Given an array of integers, determine whether two elements add up
              to a target value.
            </p>
          </div>
        </div>

        <div className="mt-5 bg-gray-50 rounded-xl p-5">

          <p className="text-sm font-semibold text-gray-600">
            Explicit Requirements
          </p>

          <div className="space-y-2 mt-3 text-sm text-gray-600">
            <p>• Return whether a valid pair exists.</p>
            <p>• The input is an integer array.</p>
            <p>• A target value is provided.</p>
          </div>

          <div className="mt-4 bg-orange-50 rounded-xl p-4">

            <div className="flex gap-2">
              <AlertTriangle
                className="text-orange-600"
                size={19}
              />

              <p className="text-sm text-gray-600">
                The problem does <strong>not</strong> explicitly state that
                the array is sorted.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Your Technical Answer
            </h2>

            <p className="text-sm text-gray-500">
              Enter the solution explanation you would give during an
              interview.
            </p>
          </div>

        </div>

        <textarea
          rows={10}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={`Example:

Since the array is sorted, I can use two pointers.
I will keep one pointer at the beginning and another at the end.
If the sum is too small, I move the left pointer.
If the sum is too large, I move the right pointer.

This gives O(n) time complexity and O(1) extra space.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Assumptions
        </button>

      </div>

      {analyzed && (
        <>
          {/* Main Verdict */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl h-fit">
                <AlertTriangle
                  className="text-orange-600"
                  size={30}
                />
              </div>

              <div>

                <p className="text-xs font-bold text-orange-600">
                  ASSUMPTION CHECK
                </p>

                <h2 className="text-2xl font-black text-orange-700 mt-1">
                  2 Assumptions Need Clarification
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer relies on conditions that are not completely
                  established by the problem statement.
                </p>

              </div>

            </div>

          </div>

          {/* Assumption Summary */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Assumption Evidence Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Each assumption is compared against the available problem
                  evidence.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {assumptions.map((item) => (

                <div
                  key={item.assumption}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex flex-wrap justify-between gap-3">

                    <div className="flex gap-3">

                      {item.status === "Supported" ? (
                        <CheckCircle2
                          className="text-green-600"
                          size={22}
                        />
                      ) : (
                        <AlertTriangle
                          className="text-orange-600"
                          size={22}
                        />
                      )}

                      <div>

                        <h3 className="font-bold">
                          {item.assumption}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.evidence}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-2 h-fit">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Supported"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Unsupported"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.risk === "High"
                            ? "bg-red-100 text-red-700"
                            : item.risk === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.risk} Risk
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Unsupported Assumption */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-red-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-red-700">
                  Critical Unsupported Assumption
                </h2>

                <p className="text-gray-700 mt-2">
                  Your two-pointer approach assumes that the input array is
                  sorted. However, the problem statement does not guarantee
                  this condition.
                </p>

                <div className="mt-4 bg-white rounded-xl p-4">

                  <p className="text-xs font-bold text-gray-500">
                    WHY THIS MATTERS
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    If the array is unsorted, moving the left or right pointer
                    based on the current sum does not reliably eliminate
                    possible answers.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Candidate Reflection */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  AI COACH QUESTION
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-2">
                  Can you identify which assumption must be verified before
                  your two-pointer approach can be used?
                </h2>

                <p className="text-gray-600 mt-3">
                  During an interview, explicitly state important assumptions
                  instead of silently relying on them.
                </p>

              </div>

            </div>

          </div>

          {/* Clarification Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <HelpCircle className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Suggested Clarification Questions
                </h2>

                <p className="text-sm text-gray-500">
                  Questions you could ask the interviewer before committing to
                  an approach.
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-6">

              {clarificationQuestions.map((question, index) => (

                <div
                  key={question}
                  className="flex gap-4 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="text-sm text-gray-700 pt-1">
                    {question}
                  </p>

                </div>
              ))}

            </div>

            <button
              type="button"
              onClick={() =>
                setShowQuestions(!showQuestions)
              }
              className="mt-5 px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold"
            >
              {showQuestions
                ? "Hide Questions"
                : "Practice Clarification"}
            </button>

          </div>

          {/* Evidence Classification */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Assumption Classification
                </h2>

                <p className="text-sm text-gray-500">
                  Understand the difference between evidence and assumptions.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

              <div className="border rounded-xl p-5">

                <CheckCircle2 className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Supported
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Directly stated or reasonably established by the problem
                  requirements.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <AlertTriangle className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Unverified
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Not confirmed by the problem and should be clarified before
                  relying on it.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Unsupported
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Conflicts with the available requirements or has no valid
                  evidence behind it.
                </p>

              </div>

            </div>

          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Technical Risk Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Hidden assumptions can create incorrect technical decisions.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

              <div className="bg-red-50 rounded-xl p-5">

                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Correctness Risk
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  The algorithm may fail when an assumed condition is not true.
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-5">

                <Target className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Requirement Risk
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  The proposed solution may not satisfy unstated but important
                  constraints.
                </p>

              </div>

              <div className="bg-purple-50 rounded-xl p-5">

                <Brain className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Reasoning Risk
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Interviewers may challenge the candidate to justify the
                  assumption.
                </p>

              </div>

            </div>

          </div>

          {/* Recommended Framework */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Assumption Framework
                </h2>

                <p className="text-gray-600 mt-2">
                  Before implementing a solution, explicitly identify the
                  conditions your approach depends on.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-5">

                  {[
                    "Extract Assumption",
                    "Find Evidence",
                    "Verify With Interviewer",
                    "Assess Risk",
                    "Proceed With Solution",
                  ].map((step, index, array) => (

                    <React.Fragment key={step}>

                      <span className="px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold text-sm">
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
                  AI Assumption Review
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer contains a potentially critical hidden
                  assumption. Before committing to the solution, confirm
                  whether the input is sorted. If it is not, reconsider the
                  algorithm rather than silently relying on that condition.
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
                  Recommended Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Try another ambiguous interview problem and identify at
                  least three assumptions before choosing an algorithm.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Assumption Challenge
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