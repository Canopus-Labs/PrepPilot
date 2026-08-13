import React, { useEffect, useState } from "react";
import {
  Brain,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Target,
  ArrowRight,
  Lightbulb,
  Flag,
} from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Two Sum Variant",
    difficulty: "Easy",
    budget: 8,
    completed: true,
  },
  {
    id: 2,
    title: "Longest Substring",
    difficulty: "Medium",
    budget: 15,
    completed: false,
  },
  {
    id: 3,
    title: "Graph Shortest Path",
    difficulty: "Hard",
    budget: 22,
    completed: false,
  },
  {
    id: 4,
    title: "System Design Follow-up",
    difficulty: "Medium",
    budget: 15,
    completed: false,
  },
];

const totalMinutes = questions.reduce(
  (sum, question) => sum + question.budget,
  0
);

export default function AIInterviewQuestionInterviewTimeBudgetPlanner() {
  const [current, setCurrent] = useState(1);
  const [elapsed, setElapsed] = useState(6 * 60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[current];

  const remainingSeconds = Math.max(
    totalMinutes * 60 - elapsed,
    0
  );

  const currentBudgetSeconds =
    currentQuestion.budget * 60;

  const questionElapsed =
    current === 1
      ? Math.max(elapsed - questions[0].budget * 60, 0)
      : 0;

  const overBudget =
    questionElapsed > currentBudgetSeconds;

  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setElapsed((value) => {
        if (value >= totalMinutes * 60) {
          setFinished(true);
          return value;
        }

        return value + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  const moveToNext = () => {
    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
    }
  };

  const progress =
    (elapsed / (totalMinutes * 60)) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Time Budget Planner
          </h1>

          <p className="text-gray-500">
            Manage your time across multiple interview questions without
            getting stuck on one problem.
          </p>
        </div>

      </div>

      {/* Session Setup */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:justify-between gap-5">

          <div>

            <p className="text-sm text-gray-500">
              Mock Interview Session
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Technical Interview
            </h2>

            <p className="text-gray-600 mt-2">
              4 questions · {totalMinutes} minute recommended budget
            </p>

          </div>

          {!started && !finished && (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Interview Timer
            </button>
          )}

        </div>

        {/* Overall Progress */}
        <div className="mt-6">

          <div className="flex justify-between text-sm">

            <span className="font-semibold">
              Interview Time Used
            </span>

            <span>
              {formatTime(elapsed)} / {formatTime(totalMinutes * 60)}
            </span>

          </div>

          <div className="h-3 bg-gray-200 rounded-full mt-2">

            <div
              className={`h-full rounded-full ${
                progress > 90
                  ? "bg-red-500"
                  : "bg-indigo-600"
              }`}
              style={{
                width: `${Math.min(progress, 100)}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Main Timer */}
      <div
        className={`rounded-2xl p-6 ${
          overBudget
            ? "bg-red-50"
            : "bg-indigo-50"
        }`}
      >

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center ${
              overBudget
                ? "bg-red-100 text-red-600"
                : "bg-white text-indigo-600"
            }`}
          >

            <Clock3 size={30} />

            <p className="text-3xl font-black mt-1">
              {formatTime(remainingSeconds)}
            </p>

            <p className="text-xs">
              Remaining
            </p>

          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Current Question
            </p>

            <h2 className="text-2xl font-black mt-1">
              {currentQuestion.title}
            </h2>

            <div className="flex flex-wrap gap-2 mt-3">

              <span className="px-3 py-1 rounded-full bg-white text-gray-600 text-xs font-semibold">
                {currentQuestion.difficulty}
              </span>

              <span className="px-3 py-1 rounded-full bg-white text-indigo-600 text-xs font-semibold">
                Suggested: {currentQuestion.budget} min
              </span>

            </div>

            {overBudget && (
              <div className="mt-4 flex gap-3 bg-white rounded-xl p-4">

                <AlertTriangle
                  className="text-red-600 flex-shrink-0"
                  size={23}
                />

                <div>

                  <p className="font-bold text-red-700">
                    Suggested Budget Exceeded
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Consider summarizing your current approach and moving to
                    the next question. You can return later if time remains.
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Question Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Interview Time Plan
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          AI assigns different budgets according to question complexity.
        </p>

        <div className="space-y-4 mt-6">

          {questions.map((question, index) => {

            const isCurrent = index === current;

            return (
              <div
                key={question.id}
                className={`border rounded-2xl p-5 ${
                  isCurrent
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex gap-4 items-center">

                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-black ${
                      question.completed
                        ? "bg-green-100 text-green-600"
                        : isCurrent
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {question.completed ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {question.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {question.difficulty} difficulty
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="font-black text-indigo-600">
                          {question.budget} min
                        </p>

                        <p className="text-xs text-gray-500">
                          Recommended
                        </p>

                      </div>

                    </div>

                    <div className="h-2 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${
                          question.completed
                            ? "bg-green-500"
                            : isCurrent
                            ? "bg-indigo-600"
                            : "bg-gray-400"
                        }`}
                        style={{
                          width: question.completed
                            ? "100%"
                            : isCurrent
                            ? "45%"
                            : "0%",
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Current Budget Breakdown */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <Target className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Suggested Budget
          </p>

          <p className="text-3xl font-black text-indigo-600">
            {currentQuestion.budget}m
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Clock3 className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-4">
            Time Remaining
          </p>

          <p className="text-3xl font-black text-orange-600">
            {formatTime(
              Math.max(
                currentBudgetSeconds - questionElapsed,
                0
              )
            )}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Flag className="text-green-600" />

          <p className="text-sm text-gray-500 mt-4">
            Questions Remaining
          </p>

          <p className="text-3xl font-black text-green-600">
            {questions.length - current}
          </p>

        </div>

      </div>

      {/* Time Allocation Strategy */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          AI Time Allocation Strategy
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          {[
            [
              "Understand",
              "10–15%",
              "Read the question, clarify requirements, and identify constraints.",
            ],
            [
              "Solve",
              "65–75%",
              "Develop and implement the solution while monitoring the time budget.",
            ],
            [
              "Review",
              "15–20%",
              "Test edge cases, explain complexity, and verify the final answer.",
            ],
          ].map(([title, percentage, description]) => (
            <div
              key={title}
              className="border rounded-xl p-5"
            >

              <p className="font-bold">
                {title}
              </p>

              <p className="text-2xl font-black text-indigo-600 mt-2">
                {percentage}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {description}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Move On Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              AI Move-On Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              If you cannot make meaningful progress after using your
              allocated time, explain your current approach, state what you
              would investigate next, and move to the next question.
            </p>

            <button
              type="button"
              onClick={moveToNext}
              disabled={current >= questions.length - 1}
              className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              Move to Next Question
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-green-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Interview Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Do not treat the time budget as a hard deadline for every
              question. Use it as a decision signal. Easier questions should
              be solved quickly, while harder questions receive more time when
              they have a reasonable path toward completion.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}