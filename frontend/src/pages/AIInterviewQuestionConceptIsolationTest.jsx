import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

const questions = [
  {
    question:
      "Given an array of integers, find two values whose sum equals a target value. Return their positions.",
    expected: "Hashing",
    alternatives: ["Hashing", "Sorting + Two Pointers", "Binary Search", "Dynamic Programming"],
  },
  {
    question:
      "Given a graph, determine whether every vertex can be reached from a chosen starting vertex.",
    expected: "Graph Traversal",
    alternatives: ["Graph Traversal", "Dynamic Programming", "Sliding Window", "Binary Search"],
  },
];

export default function AIInterviewQuestionConceptIsolationTest() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const item = questions[current];

  const submitAnswer = () => {
    if (!selected) return;

    if (selected === item.expected) {
      setScore((value) => value + 1);
    }

    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
      setSelected("");
      setSubmitted(false);
    }
  };

  const finished =
    current === questions.length - 1 && submitted;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Isolation Test
          </h1>

          <p className="text-gray-500">
            Identify the underlying concept before the question tells you
            what technique to use.
          </p>
        </div>

      </div>

      {/* Mode Explanation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target className="text-indigo-600" size={27} />

          <div>

            <h2 className="font-bold text-indigo-700">
              Unlabeled Practice Mode
            </h2>

            <p className="text-gray-600 mt-2">
              No algorithm or topic label is provided. First identify the
              concept you believe is most appropriate, then explain or solve
              the problem.
            </p>

          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex justify-between text-sm">

          <span className="font-semibold">
            Question {current + 1} of {questions.length}
          </span>

          <span className="text-gray-500">
            Recognition Score: {score}/{current + (submitted ? 1 : 0)}
          </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full mt-3">

          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{
              width: `${((current + (submitted ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />

        </div>

      </div>

      {/* Question */}
      {!finished && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex items-center justify-between">

            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
              Concept Hidden
            </span>

            <span className="text-sm text-gray-500">
              Do not search for the algorithm first
            </span>

          </div>

          <h2 className="text-xl font-bold leading-8 mt-6">
            {item.question}
          </h2>

          <div className="mt-6">

            <label className="font-semibold">
              Which concept or technique do you think is most appropriate?
            </label>

            <p className="text-sm text-gray-500 mt-1">
              Choose based on the problem characteristics, not its title.
            </p>

            <div className="grid md:grid-cols-2 gap-3 mt-4">

              {item.alternatives.map((option) => (
                <button
                  type="button"
                  key={option}
                  disabled={submitted}
                  onClick={() => setSelected(option)}
                  className={`text-left border rounded-xl p-4 transition ${
                    selected === option
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selected === option
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-gray-300"
                      }`}
                    />

                    <span className="font-medium">
                      {option}
                    </span>

                  </div>
                </button>
              ))}

            </div>

          </div>

          {!submitted ? (
            <button
              type="button"
              disabled={!selected}
              onClick={submitAnswer}
              className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Submit Concept
            </button>
          ) : (
            <div className="mt-6">

              {selected === item.expected ? (
                <div className="bg-green-50 rounded-xl p-5">

                  <div className="flex gap-3">

                    <CheckCircle2
                      className="text-green-600"
                      size={25}
                    />

                    <div>

                      <h3 className="font-bold text-green-700">
                        Correct Recognition
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        You correctly identified the underlying technique:
                        <strong> {item.expected}</strong>.
                      </p>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-orange-50 rounded-xl p-5">

                  <div className="flex gap-3">

                    <AlertTriangle
                      className="text-orange-600"
                      size={25}
                    />

                    <div>

                      <h3 className="font-bold text-orange-700">
                        Concept Recognition Gap
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        You selected <strong>{selected}</strong>. The expected
                        technique is <strong>{item.expected}</strong>.
                      </p>

                    </div>

                  </div>

                </div>
              )}

              <div className="bg-indigo-50 rounded-xl p-5 mt-4">

                <div className="flex gap-3">

                  <Lightbulb
                    className="text-indigo-600"
                    size={24}
                  />

                  <div>

                    <h3 className="font-bold text-indigo-700">
                      Recognition Hint
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Look at the relationship between the required lookup,
                      the input size, and whether previously seen values can
                      help avoid repeated work.
                    </p>

                  </div>

                </div>

              </div>

              {current < questions.length - 1 && (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Next Question
                </button>
              )}

            </div>
          )}

        </div>
      )}

      {/* Completion */}
      {finished && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="text-center">

            <div className="inline-flex p-4 rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={42} />
            </div>

            <h2 className="text-3xl font-black mt-4">
              Concept Isolation Complete
            </h2>

            <p className="text-gray-500 mt-2">
              You completed all unlabeled recognition questions.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="bg-indigo-50 rounded-xl p-5 text-center">
              <TrendingUp className="mx-auto text-indigo-600" />

              <p className="text-sm text-gray-500 mt-3">
                Recognition Accuracy
              </p>

              <p className="text-3xl font-black text-indigo-600">
                {Math.round((score / questions.length) * 100)}%
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 text-center">
              <CheckCircle2 className="mx-auto text-green-600" />

              <p className="text-sm text-gray-500 mt-3">
                Correct Concepts
              </p>

              <p className="text-3xl font-black text-green-600">
                {score}
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-5 text-center">
              <HelpCircle className="mx-auto text-orange-600" />

              <p className="text-sm text-gray-500 mt-3">
                Recognition Gaps
              </p>

              <p className="text-3xl font-black text-orange-600">
                {questions.length - score}
              </p>
            </div>

          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 mt-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h3 className="font-bold text-indigo-700">
                  AI Learning Insight
                </h3>

                <p className="text-gray-600 mt-2">
                  Your concept-recognition ability is based on how accurately
                  you identify the underlying technique without relying on
                  question labels. Continue practicing unlabeled problems to
                  improve independent pattern recognition.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Why This Matters */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-3">

          <Brain className="text-indigo-600" size={27} />

          <div>

            <h2 className="font-bold text-lg">
              Why Concept Isolation Matters
            </h2>

            <p className="text-gray-600 mt-2">
              Real interview questions usually do not tell candidates which
              algorithm to use. This mode separates memorization from genuine
              problem-pattern recognition and helps measure whether you can
              independently choose an appropriate technique.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}