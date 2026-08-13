import React, { useState } from "react";
import {
  Brain,
  RefreshCw,
  Target,
  CheckCircle2,
} from "lucide-react";

const questions = [
  {
    question: "What is the time complexity of Binary Search?",
    answer: "O(log n)",
  },
  {
    question: "What condition is required for Binary Search?",
    answer: "The data must be sorted.",
  },
  {
    question: "What is the space complexity of iterative Binary Search?",
    answer: "O(1)",
  },
];

export default function AIInterviewPreparationAdaptiveReviewMode() {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const submitAnswer = () => {
    const correct = answer
      .toLowerCase()
      .includes(questions[current].answer.toLowerCase());

    if (correct) setScore((prev) => prev + 1);

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setAnswer("");
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Adaptive Review Mode
          </h1>

          <p className="text-gray-500">
            Revision content adapts to your performance in real time.
          </p>
        </div>
      </div>

      {!completed ? (
        <>
          {/* Progress */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex justify-between">
              <span className="font-semibold">
                Binary Search Revision
              </span>

              <span className="text-gray-500">
                {current + 1} / {questions.length}
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${
                    ((current + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>

          </div>

          {/* Question */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex items-center gap-2">
              <RefreshCw className="text-indigo-600" />

              <span className="font-semibold text-indigo-700">
                Adaptive Question
              </span>
            </div>

            <h2 className="text-xl font-bold mt-4">
              {questions[current].question}
            </h2>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              placeholder="Answer from memory..."
              className="w-full bg-white border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={!answer.trim()}
              onClick={submitAnswer}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Submit Answer
            </button>

          </div>

          {/* AI Strategy */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex gap-3">
              <Target className="text-indigo-600" />

              <div>
                <h2 className="font-bold">
                  AI Review Strategy
                </h2>

                <p className="text-gray-600 mt-2">
                  Difficult concepts will be shown more frequently, while
                  concepts you consistently answer correctly will appear less
                  often.
                </p>
              </div>
            </div>

          </div>
        </>
      ) : (
        <>
          {/* Completion */}
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={40}
            />

            <p className="text-gray-500 mt-3">
              Review Session Complete
            </p>

            <p className="text-5xl font-black text-green-600">
              {Math.round((score / questions.length) * 100)}%
            </p>

            <p className="text-gray-600 mt-2">
              Your review content was adapted according to your responses.
            </p>

          </div>

          {/* Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Continue reviewing concepts you missed and reduce repetition
              for concepts you have already mastered.
            </p>

          </div>
        </>
      )}

    </div>
  );
}