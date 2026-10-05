import React, { useState } from "react";
import {
  Brain,
  Gauge,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";

const questions = [
  {
    title: "Two Sum Variation",
    difficulty: "Medium",
    load: 45,
    steps: 3,
    type: "Reinforcement",
  },
  {
    title: "Graph Shortest Path",
    difficulty: "Hard",
    load: 88,
    steps: 7,
    type: "Challenge",
  },
  {
    title: "Binary Search Application",
    difficulty: "Medium",
    load: 52,
    steps: 4,
    type: "Reinforcement",
  },
  {
    title: "Dynamic Programming Optimization",
    difficulty: "Hard",
    load: 82,
    steps: 8,
    type: "Challenge",
  },
];

export default function AIInterviewQuestionCognitiveLoadBalancer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState([]);

  const current = questions[currentIndex];

  const nextQuestion = () => {
    setCompleted([...completed, current.title]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Cognitive Load Balancer
          </h1>

          <p className="text-gray-500">
            Balance challenging questions with reinforcement to create a
            sustainable practice session.
          </p>
        </div>

      </div>

      {/* Session Progress */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Current Session
            </p>

            <h2 className="text-xl font-bold">
              Adaptive Interview Practice
            </h2>
          </div>

          <span className="font-bold text-indigo-600">
            {completed.length}/{questions.length}
          </span>

        </div>

        <div className="h-2 bg-gray-200 rounded-full mt-4">

          <div
            className="h-full bg-indigo-600 rounded-full"
            style={{
              width: `${(completed.length / questions.length) * 100}%`,
            }}
          />

        </div>

      </div>

      {currentIndex < questions.length ? (
        <>
          {/* Current Question */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-start gap-4">

              <div>

                <p className="text-sm text-gray-500">
                  Question {currentIndex + 1}
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {current.title}
                </h2>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  current.type === "Challenge"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {current.type}
              </span>

            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-6">

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Difficulty
                </p>

                <p className="font-bold mt-1">
                  {current.difficulty}
                </p>

              </div>

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Reasoning Steps
                </p>

                <p className="font-bold mt-1">
                  {current.steps}
                </p>

              </div>

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Cognitive Load
                </p>

                <p className="font-bold text-indigo-600 mt-1">
                  {current.load}%
                </p>

              </div>

            </div>

            <div className="mt-6">

              <p className="text-sm text-gray-500">
                Cognitive Load
              </p>

              <div className="h-3 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${current.load}%`,
                  }}
                />

              </div>

            </div>

            <button
              type="button"
              onClick={nextQuestion}
              className="mt-6 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Complete Question
              <ArrowRight size={18} />
            </button>

          </div>

          {/* AI Reason */}
          <div
            className={`rounded-2xl p-5 ${
              current.type === "Challenge"
                ? "bg-orange-50"
                : "bg-green-50"
            }`}
          >

            <div className="flex gap-3">

              <Gauge
                className={
                  current.type === "Challenge"
                    ? "text-orange-600"
                    : "text-green-600"
                }
              />

              <div>

                <h2
                  className={`font-bold ${
                    current.type === "Challenge"
                      ? "text-orange-700"
                      : "text-green-700"
                  }`}
                >
                  AI Session Decision
                </h2>

                <p className="text-gray-600 mt-2">

                  {current.type === "Challenge"
                    ? "This challenge is scheduled after reinforcement so you can apply the skills without having several high-load questions consecutively."
                    : "This reinforcement question helps reduce cognitive load after a demanding problem while continuing to practice the relevant skills."}

                </p>

              </div>

            </div>

          </div>

          {/* Load Strategy */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Zap className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Adaptive Strategy
                </h2>

                <p className="text-gray-600 mt-2">
                  AI considers the previous question, your recent performance,
                  reasoning complexity, and estimated mental effort before
                  selecting the next problem.
                </p>

              </div>

            </div>

          </div>
        </>
      ) : (
        /* Completed */
        <div className="bg-green-50 rounded-2xl p-8 text-center">

          <CheckCircle2
            className="mx-auto text-green-600"
            size={42}
          />

          <h2 className="text-2xl font-bold text-green-700 mt-3">
            Session Complete
          </h2>

          <p className="text-gray-600 mt-2">
            The session successfully alternated challenging and reinforcement
            questions to maintain a balanced cognitive load.
          </p>

        </div>
      )}

      {/* Session Analytics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <TrendingUp className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Cognitive Load Plan
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

          {questions.map((question) => (
            <div
              key={question.title}
              className="rounded-xl bg-gray-50 p-4"
            >

              <p className="text-xs text-gray-500">
                {question.type}
              </p>

              <p className="font-semibold mt-1">
                {question.difficulty}
              </p>

              <p className="text-indigo-600 font-bold mt-2">
                {question.load}% load
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}