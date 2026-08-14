import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Code2,
  MessageSquare,
  Target,
  Clock3,
} from "lucide-react";

const explanationChecks = [
  {
    title: "Why the Approach Works",
    score: 88,
    status: "Strong",
    feedback:
      "You explain the main reasoning behind the approach, but one step could be justified more clearly.",
  },
  {
    title: "Constraint Satisfaction",
    score: 82,
    status: "Strong",
    feedback:
      "Your explanation connects the approach to the input constraints appropriately.",
  },
  {
    title: "Complexity Justification",
    score: 69,
    status: "Needs Improvement",
    feedback:
      "You mention the complexity but do not fully explain why it is acceptable for the given constraints.",
  },
  {
    title: "Edge-Case Handling",
    score: 61,
    status: "Needs Improvement",
    feedback:
      "Explain how the solution behaves with empty input, duplicate values, and boundary cases.",
  },
];

const practicePrompts = [
  "Why does your approach always produce the correct result?",
  "Why is your time complexity acceptable for the given constraints?",
  "What happens when the input is empty or contains duplicate values?",
  "What assumption does your solution rely on?",
];

export default function AIInterviewQuestionSolutionExplanationChallenge() {
  const [explanation, setExplanation] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Explanation Challenge
          </h1>

          <p className="text-gray-500">
            Explain why your solution works without relying on the code itself.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <Code2
            className="text-indigo-600"
            size={20}
          />

          <p className="text-sm text-gray-500">
            Completed Interview Problem
          </p>

        </div>

        <h2 className="text-xl font-bold mt-3">
          Find the length of the longest consecutive sequence in an array.
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Your Solution
            </p>

            <p className="font-bold">
              Accepted
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Time Complexity
            </p>

            <p className="font-bold">
              O(n)
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Explanation Mode
            </p>

            <p className="font-bold">
              Code Hidden
            </p>

          </div>

        </div>

      </div>

      {/* Code Hidden Notice */}
      <div className="bg-yellow-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <MessageSquare
            className="text-yellow-600"
            size={26}
          />

          <div>

            <h2 className="font-bold text-yellow-700">
              Explain Without Code
            </h2>

            <p className="text-gray-600 mt-2">
              Your submitted implementation is intentionally hidden. Explain
              the reasoning as if an interviewer asked you to justify your
              solution verbally.
            </p>

          </div>

        </div>

      </div>

      {/* Explanation Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Explain Your Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Cover correctness, constraints, complexity, and edge cases.
        </p>

        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={9}
          placeholder="Explain why your approach works, why its complexity is acceptable, and how it handles important edge cases..."
          className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!explanation.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Evaluate Explanation
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">
                <Target
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Independent Explanation Score
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  78%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Good Understanding
                </span>

                <p className="text-gray-600 mt-3">
                  Your explanation demonstrates understanding of the approach,
                  but complexity and edge-case reasoning need stronger
                  justification.
                </p>

              </div>

            </div>

          </div>

          {/* Explanation Breakdown */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Explanation Breakdown
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI scores your explanation independently from the submitted
              implementation.
            </p>

            <div className="space-y-4 mt-5">

              {explanationChecks.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() =>
                    setSelected(
                      selected?.title === item.title
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
                        size={22}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={22}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            {item.title}
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

                      {selected?.title === item.title && (
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

          {/* Code vs Explanation */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2
                  className="text-green-600"
                  size={25}
                />

                <div>

                  <h2 className="font-bold text-green-700">
                    Implementation Performance
                  </h2>

                  <p className="text-4xl font-black text-green-600 mt-3">
                    94%
                  </p>

                  <p className="text-gray-600 mt-2">
                    The submitted solution passed the implementation
                    evaluation.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-orange-600"
                  size={25}
                />

                <div>

                  <h2 className="font-bold text-orange-700">
                    Explanation Performance
                  </h2>

                  <p className="text-4xl font-black text-orange-600 mt-3">
                    78%
                  </p>

                  <p className="text-gray-600 mt-2">
                    Your reasoning is weaker than your implementation
                    performance.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Interviewer Follow-ups */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Clock3 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Likely Interviewer Follow-ups
                </h2>

                <p className="text-sm text-gray-500">
                  Questions you should be able to answer after explaining
                  your solution.
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-5">

              {practicePrompts.map((prompt, index) => (
                <div
                  key={prompt}
                  className="flex gap-3 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="text-gray-700">
                    {prompt}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Weak Areas */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Explanation Gaps
                </h2>

                <ul className="mt-3 space-y-2 text-gray-600">

                  <li>
                    • Explain why O(n) complexity is suitable for the
                    constraint.
                  </li>

                  <li>
                    • Explain why duplicate values do not break the approach.
                  </li>

                  <li>
                    • Describe what happens when the input array is empty.
                  </li>

                  <li>
                    • Clearly justify why the algorithm finds every valid
                    sequence.
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your implementation is stronger than your verbal
                  justification. Practice explaining{" "}
                  <strong>why the algorithm works</strong> and{" "}
                  <strong>why its complexity fits the constraints</strong>{" "}
                  without referring to individual lines of code.
                </p>

              </div>

            </div>

          </div>

          {/* Practice Again */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Explanation Challenge
            </h2>

            <p className="text-gray-600 mt-2">
              Try explaining the solution again in under two minutes. Focus
              only on reasoning, correctness, complexity, and edge cases.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Retry Explanation
            </button>

          </div>

        </>
      )}

    </div>
  );
}