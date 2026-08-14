import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Target,
  Lightbulb,
  BarChart3,
  Clock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const interviewQuestions = [
  {
    question: "Design a scalable URL shortener.",
    score: 86,
    category: "System Design",
    result: "Strong",
  },
  {
    question: "Explain the difference between BFS and DFS.",
    score: 72,
    category: "Algorithms",
    result: "Good",
  },
  {
    question: "How would you handle database failure?",
    score: 58,
    category: "Reliability",
    result: "Needs Work",
  },
  {
    question: "Tell me about a difficult project you worked on.",
    score: 81,
    category: "Behavioral",
    result: "Strong",
  },
];

const recurringMistakes = [
  {
    title: "Missing Failure Scenarios",
    frequency: 4,
    severity: "High",
    trend: "up",
  },
  {
    title: "Incomplete Trade-Off Explanation",
    frequency: 3,
    severity: "Medium",
    trend: "up",
  },
  {
    title: "Complexity Explanation",
    frequency: 2,
    severity: "Medium",
    trend: "down",
  },
];

const actions = [
  {
    title: "Practice Failure Scenario Questions",
    reason:
      "Your weakest answer involved handling database failure.",
    priority: "High",
  },
  {
    title: "Review System Design Trade-Offs",
    reason:
      "Several answers selected an approach without fully defending alternatives.",
    priority: "High",
  },
  {
    title: "Practice Complexity Explanations",
    reason:
      "Complexity reasoning improved but still caused occasional hesitation.",
    priority: "Medium",
  },
];

export default function AIInterviewPreparationInterviewSimulationDebrief() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const averageScore = Math.round(
    interviewQuestions.reduce(
      (sum, item) => sum + item.score,
      0
    ) / interviewQuestions.length
  );

  const strongest = [...interviewQuestions].sort(
    (a, b) => b.score - a.score
  )[0];

  const weakest = [...interviewQuestions].sort(
    (a, b) => a.score - b.score
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Simulation Debrief
          </h1>

          <p className="text-gray-500">
            Get a complete interview-level analysis immediately after your
            mock interview.
          </p>
        </div>

      </div>

      {/* Session Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <BarChart3
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              POST-INTERVIEW DEBRIEF
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Overall Interview Score: {averageScore}%
            </h2>

            <p className="text-gray-600 mt-2">
              AI analyzed your complete mock interview instead of evaluating
              each answer independently.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-white rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Questions
            </p>
            <p className="text-3xl font-black text-indigo-600 mt-1">
              {interviewQuestions.length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Average Score
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              {averageScore}%
            </p>
          </div>

          <div className="bg-white rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Strongest
            </p>
            <p className="text-lg font-black text-green-600 mt-1">
              {strongest.category}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Needs Work
            </p>
            <p className="text-lg font-black text-red-600 mt-1">
              {weakest.category}
            </p>
          </div>

        </div>

      </div>

      {/* Strongest Moment */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              STRONGEST MOMENT
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              {strongest.question}
            </h2>

            <p className="text-gray-600 mt-2">
              You scored {strongest.score}% on this question, demonstrating
              strong understanding and effective technical reasoning.
            </p>

          </div>

        </div>

      </div>

      {/* Weakest Moment */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              WEAKEST MOMENT
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              {weakest.question}
            </h2>

            <p className="text-gray-600 mt-2">
              You scored {weakest.score}%. The main difficulty was explaining
              how the solution should behave when a critical dependency fails.
            </p>

          </div>

        </div>

      </div>

      {/* Question Performance */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Interview Performance
              </h2>

              <p className="text-sm text-gray-500">
                Review how each part of the interview contributed to the final
                result.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-4 mt-6">

            {interviewQuestions.map((item) => (

              <button
                type="button"
                key={item.question}
                onClick={() => setSelectedQuestion(item)}
                className={`w-full text-left border rounded-xl p-5 ${
                  selectedQuestion?.question === item.question
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {item.question}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.category}
                    </p>

                  </div>

                  <div className="text-right">

                    <p
                      className={`text-2xl font-black ${
                        item.score >= 80
                          ? "text-green-600"
                          : item.score >= 65
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.score}%
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.result}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Question */}
      {selectedQuestion && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Target
              className="text-indigo-600"
              size={28}
            />

            <div>

              <p className="text-xs font-bold text-indigo-600">
                QUESTION DEBRIEF
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedQuestion.question}
              </h2>

              <p className="text-gray-600 mt-2">
                Score:{" "}
                <strong>{selectedQuestion.score}%</strong>
              </p>

              <p className="text-gray-600 mt-2">
                AI identified this response as{" "}
                <strong>{selectedQuestion.result}</strong> based on technical
                correctness, reasoning, communication, and follow-up handling.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Recurring Mistakes */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recurring Mistakes
            </h2>

            <p className="text-sm text-gray-500">
              Patterns that appeared across multiple parts of the interview.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {recurringMistakes.map((mistake) => (

            <div
              key={mistake.title}
              className="border rounded-xl p-5"
            >

              <div className="flex items-center gap-4">

                <AlertTriangle
                  className={
                    mistake.severity === "High"
                      ? "text-red-600"
                      : "text-orange-600"
                  }
                />

                <div className="flex-1">

                  <h3 className="font-bold">
                    {mistake.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Appeared {mistake.frequency} times during recent practice.
                  </p>

                </div>

                {mistake.trend === "up" ? (
                  <TrendingUp
                    className="text-red-600"
                    size={22}
                  />
                ) : (
                  <TrendingDown
                    className="text-green-600"
                    size={22}
                  />
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Communication Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Communication Debrief
            </h2>

            <p className="text-sm text-gray-500">
              AI evaluates how effectively technical knowledge was communicated.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Clarity
            </p>

            <p className="text-2xl font-black text-green-600 mt-1">
              84%
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Structure
            </p>

            <p className="text-2xl font-black text-green-600 mt-1">
              79%
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Precision
            </p>

            <p className="text-2xl font-black text-orange-600 mt-1">
              68%
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Conciseness
            </p>

            <p className="text-2xl font-black text-green-600 mt-1">
              82%
            </p>

          </div>

        </div>

        <div className="mt-5 bg-orange-50 rounded-xl p-4">

          <div className="flex gap-3">

            <MessageSquare
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-600">
              Your explanations were generally clear, but technical trade-offs
              were sometimes stated without enough supporting reasoning.
            </p>

          </div>

        </div>

      </div>

      {/* Technical Gaps */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Technical Gaps
            </h2>

            <p className="text-sm text-gray-500">
              Concepts or skills that affected your interview performance.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {[
            {
              title: "Failure Handling",
              score: 58,
              description:
                "Needs stronger reasoning around dependency failures and recovery.",
            },
            {
              title: "System Design Trade-Offs",
              score: 64,
              description:
                "Approaches were correct but alternative decisions were not always discussed.",
            },
            {
              title: "Complexity Reasoning",
              score: 72,
              description:
                "Generally strong, with occasional hesitation when explaining space complexity.",
            },
          ].map((gap) => (

            <div
              key={gap.title}
              className="border rounded-xl p-5"
            >

              <div className="flex items-center gap-4">

                <div className="flex-1">

                  <h3 className="font-bold">
                    {gap.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {gap.description}
                  </p>

                </div>

                <div className="text-right">

                  <p
                    className={`text-2xl font-black ${
                      gap.score >= 75
                        ? "text-green-600"
                        : gap.score >= 65
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {gap.score}%
                  </p>

                </div>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-4">

                <div
                  className={`h-full rounded-full ${
                    gap.score >= 75
                      ? "bg-green-500"
                      : gap.score >= 65
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${gap.score}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Difficult Follow-Ups */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-red-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              DIFFICULT FOLLOW-UPS
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Questions that exposed uncertainty
            </h2>

            <div className="space-y-3 mt-4">

              <div className="bg-white rounded-xl p-4">

                <p className="font-semibold">
                  "What happens if the primary database fails?"
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Difficulty: High · Reliability reasoning
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="font-semibold">
                  "Why would you choose this approach over the alternative?"
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Difficulty: Medium · Trade-off reasoning
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="font-semibold">
                  "How does your complexity change when the input doubles?"
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Difficulty: Medium · Complexity reasoning
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Top Recommended Actions
              </h2>

              <p className="text-sm text-gray-500">
                AI converts the debrief into prioritized preparation tasks.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowActions(!showActions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showActions
              ? "Hide Actions"
              : "Show Actions"}
          </button>

        </div>

        {showActions && (
          <div className="space-y-4 mt-6">

            {actions.map((action, index) => (

              <div
                key={action.title}
                className="flex items-center gap-4 border rounded-xl p-5"
              >

                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-3">

                    <h3 className="font-bold">
                      {action.title}
                    </h3>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        action.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {action.priority}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {action.reason}
                  </p>

                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold flex items-center gap-2"
                >
                  Practice
                  <ArrowRight size={16} />
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Session Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Session Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Key moments from the complete mock interview.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {[
            {
              time: "00:08",
              event: "Strong opening",
              detail:
                "Clearly restated the first problem and identified constraints.",
              type: "positive",
            },
            {
              time: "12:34",
              event: "Strong technical reasoning",
              detail:
                "Selected an appropriate scalable architecture.",
              type: "positive",
            },
            {
              time: "24:18",
              event: "Follow-up difficulty",
              detail:
                "Required additional prompting when discussing database failure.",
              type: "warning",
            },
            {
              time: "31:42",
              event: "Communication improvement",
              detail:
                "Final behavioral answer was structured and concise.",
              type: "positive",
            },
          ].map((item) => (

            <div
              key={item.time}
              className="flex gap-4"
            >

              <div className="font-mono text-sm text-gray-500 w-16">
                {item.time}
              </div>

              <div
                className={`w-3 h-3 rounded-full mt-1 ${
                  item.type === "positive"
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
              />

              <div>

                <p className="font-bold">
                  {item.event}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {item.detail}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Final Readiness */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW READINESS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Mostly Ready — Targeted Practice Recommended
            </h2>

            <p className="text-gray-600 mt-2">
              Your overall performance is solid, but reliability reasoning and
              technical trade-off explanations should be strengthened before
              the next mock interview.
            </p>

          </div>

        </div>

      </div>

      {/* Debrief Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Debrief Workflow
            </h2>

            <p className="text-sm text-gray-500">
              How the complete interview is converted into actionable
              preparation.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Collect Session Results",
            "Find Strongest Moments",
            "Detect Weaknesses",
            "Group Mistake Patterns",
            "Analyze Communication",
            "Generate Actions",
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

      {/* Refresh */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setRefreshed(true)}
          className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh Debrief
        </button>

      </div>

      {refreshed && (
        <div className="bg-green-50 rounded-xl p-4">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-green-700">
              Interview debrief refreshed using the latest session analysis.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}