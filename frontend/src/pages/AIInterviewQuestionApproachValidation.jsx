import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
  Clock3,
  ShieldCheck,
  Lightbulb,
  Code2,
} from "lucide-react";

const validations = [
  {
    name: "Approach Correctness",
    score: 88,
    status: "Good",
    feedback:
      "Your approach can solve the core problem and matches the required output.",
  },
  {
    name: "Complexity",
    score: 72,
    status: "Review",
    feedback:
      "The approach is correct, but its time complexity may become expensive for larger inputs.",
  },
  {
    name: "Constraint Compatibility",
    score: 81,
    status: "Good",
    feedback:
      "The approach works within the stated constraints, but memory usage should be monitored.",
  },
  {
    name: "Edge-Case Handling",
    score: 63,
    status: "Needs Attention",
    feedback:
      "Consider empty input, duplicate values, and cases where no valid result exists.",
  },
  {
    name: "Potential Limitations",
    score: 68,
    status: "Review",
    feedback:
      "The approach may require optimization if the input size increases significantly.",
  },
];

const checklist = [
  "Does the approach solve the main requirement?",
  "Does the complexity fit the constraints?",
  "What happens with empty or minimal input?",
  "What happens with duplicate or extreme values?",
  "Can the approach scale to the largest input?",
];

export default function AIInterviewQuestionApproachValidation() {
  const [approach, setApproach] = useState("");
  const [validated, setValidated] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Approach Validation
          </h1>

          <p className="text-gray-500">
            Validate your solution strategy before investing time in
            implementation.
          </p>
        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <Code2
            className="text-indigo-600"
            size={20}
          />

          <p className="text-sm text-gray-500">
            Interview Problem
          </p>

        </div>

        <h2 className="text-xl font-bold mt-3">
          Given an array of integers, find the length of the longest
          consecutive sequence.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Input Size
            </p>

            <p className="font-bold">
              Up to 100,000
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Expected Goal
            </p>

            <p className="font-bold">
              Efficient solution
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Mode
            </p>

            <p className="font-bold">
              Approach First
            </p>

          </div>

        </div>

      </div>

      {/* Approach Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Submit Your Approach
            </h2>

            <p className="text-sm text-gray-500">
              Explain your planned solution before writing code.
            </p>

          </div>

        </div>

        <textarea
          value={approach}
          onChange={(e) => setApproach(e.target.value)}
          rows={8}
          placeholder="Explain your approach, data structures, algorithm, expected complexity, and how you will handle edge cases..."
          className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!approach.trim()}
          onClick={() => setValidated(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Validate Approach
        </button>

      </div>

      {validated && (
        <>
          {/* Overall Result */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <ShieldCheck
                className="text-indigo-600"
                size={38}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Approach Readiness
                </p>

                <p className="text-5xl font-black text-indigo-600">
                  76%
                </p>

                <span className="inline-block mt-3 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Validate Before Coding
                </span>

                <p className="text-gray-600 mt-3">
                  Your core approach is promising, but edge cases and
                  complexity should be reviewed before implementation.
                </p>

              </div>

            </div>

          </div>

          {/* Validation Cards */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Approach Validation Breakdown
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Click a criterion to see detailed feedback.
            </p>

            <div className="space-y-4 mt-5">

              {validations.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === item.name
                        ? null
                        : item
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {item.score >= 80 ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={21}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={21}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <div>

                          <h3 className="font-semibold">
                            {item.name}
                          </h3>

                          <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              item.score >= 80
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <span className="font-bold text-indigo-600">
                          {item.score}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full mt-4">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      {selected?.name === item.name && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            {item.feedback}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Complexity */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3">

                <Clock3 className="text-indigo-600" />

                <h2 className="font-bold">
                  Complexity Check
                </h2>

              </div>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Estimated Time
                  </span>

                  <strong>
                    O(n)
                  </strong>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Estimated Space
                  </span>

                  <strong>
                    O(n)
                  </strong>

                </div>

                <div className="bg-green-50 rounded-xl p-4">

                  <p className="text-sm text-green-700">
                    The estimated complexity is compatible with the given
                    input size.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3">

                <AlertTriangle className="text-orange-600" />

                <h2 className="font-bold">
                  Edge-Case Risk
                </h2>

              </div>

              <div className="space-y-3 mt-5">

                {[
                  "Empty array",
                  "Duplicate values",
                  "No consecutive sequence",
                  "All values already consecutive",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <AlertTriangle
                      size={17}
                      className="text-orange-500"
                    />
                    {item}
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Validation Checklist */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Pre-Implementation Checklist
            </h2>

            <div className="space-y-3 mt-5">

              {checklist.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-3 items-center border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="text-gray-700">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* AI Hint */}
          <div className="bg-yellow-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-yellow-600"
                size={26}
              />

              <div className="flex-1">

                <h2 className="font-bold text-yellow-700">
                  Guided Hint
                </h2>

                <p className="text-gray-600 mt-2">
                  Think about whether sorting is necessary. Consider whether
                  you can identify the beginning of a consecutive sequence
                  without repeatedly scanning values.
                </p>

                {!showHint && (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="mt-4 px-4 py-2 rounded-lg bg-yellow-600 text-white font-semibold"
                  >
                    Reveal Deeper Hint
                  </button>
                )}

                {showHint && (
                  <div className="mt-4 bg-white rounded-xl p-4">

                    <p className="text-sm text-gray-600">
                      Try thinking about constant-time membership checks and
                      only beginning a sequence when its predecessor is not
                      present. This gives you direction without revealing the
                      complete implementation.
                    </p>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your approach is viable, but explicitly address duplicate
                  values and empty input before coding. Your complexity
                  estimate should also be verified against the largest input
                  constraint.
                </p>

              </div>

            </div>

          </div>

          {/* Next Step */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Ready to Implement?
            </h2>

            <p className="text-gray-600 mt-2">
              Once the approach passes validation, continue to implementation.
              AI will not reveal the complete solution unless you explicitly
              request additional help.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Implementation
            </button>

          </div>

        </>
      )}

    </div>
  );
}