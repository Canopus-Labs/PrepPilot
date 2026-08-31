import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const answerPoints = [
  {
    point: "Define the core approach",
    priority: "Essential",
    order: 1,
    time: "10 sec",
  },
  {
    point: "Explain the key reasoning",
    priority: "Essential",
    order: 2,
    time: "15 sec",
  },
  {
    point: "Mention time and space complexity",
    priority: "High",
    order: 3,
    time: "10 sec",
  },
  {
    point: "Discuss an edge case",
    priority: "Supporting",
    order: 4,
    time: "10 sec",
  },
  {
    point: "Mention an alternative approach",
    priority: "Optional",
    order: 5,
    time: "15 sec",
  },
];

export default function AIInterviewAnswerTechnicalResponsePrioritization() {
  const [points, setPoints] = useState(answerPoints);
  const [showStructure, setShowStructure] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const movePoint = (index, direction) => {
    const next = [...points];
    const target = index + direction;

    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];

    setPoints(
      next.map((item, i) => ({
        ...item,
        order: i + 1,
      }))
    );
  };

  const essential = points.filter(
    (item) => item.priority === "Essential"
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
            AI Technical Response Prioritization
          </h1>

          <p className="text-gray-500">
            Learn what to communicate first when answering technical
            interview questions under time constraints.
          </p>
        </div>

      </div>

      {/* Main Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Target className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI RESPONSE STRATEGY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Lead with the core solution
            </h2>

            <p className="text-gray-600 mt-2">
              Start with the approach and key reasoning. Add complexity,
              edge cases, and alternatives only if sufficient interview time
              remains.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Answer Points
            </p>
            <p className="text-3xl font-black text-indigo-600">
              5
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Essential
            </p>
            <p className="text-3xl font-black text-green-600">
              2
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Target className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              High Priority
            </p>
            <p className="text-3xl font-black text-orange-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Clock className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Short Answer
            </p>
            <p className="text-3xl font-black text-purple-600">
              35s
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <Clock className="text-yellow-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Expanded Answer
            </p>
            <p className="text-3xl font-black text-yellow-600">
              60s
            </p>
          </div>

        </div>

      </div>

      {/* Prioritized Answer Points */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-bold text-lg">
              Prioritized Answer Points
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Deliver the highest-value information first.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
            AI Ranked
          </span>

        </div>

        <div className="space-y-4 mt-6">

          {points.map((item, index) => (

            <div
              key={item.point}
              className={`border rounded-2xl p-5 ${
                item.priority === "Essential"
                  ? "border-green-400 bg-green-50"
                  : ""
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">
                  {item.order}
                </div>

                <div className="flex-1">

                  <h3 className="font-bold">
                    {item.point}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Recommended delivery time: {item.time}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.priority === "Essential"
                      ? "bg-green-100 text-green-700"
                      : item.priority === "High"
                        ? "bg-orange-100 text-orange-700"
                        : item.priority === "Supporting"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.priority}
                </span>

                <div className="flex flex-col gap-2">

                  <button
                    type="button"
                    onClick={() => movePoint(index, -1)}
                    disabled={index === 0}
                    className="p-2 border rounded-lg disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => movePoint(index, 1)}
                    disabled={index === points.length - 1}
                    className="p-2 border rounded-lg disabled:opacity-30"
                  >
                    <ArrowDown size={16} />
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Short Answer */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              35-SECOND SHORT ANSWER
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Essential information only
            </h2>

            <div className="bg-white rounded-xl p-5 mt-4">

              {essential.map((item, index) => (
                <div
                  key={item.point}
                  className="flex items-center gap-3 py-2"
                >
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="font-semibold">
                    {item.point}
                  </p>
                </div>
              ))}

              <div className="border-t mt-3 pt-3">
                <p className="text-sm text-gray-500">
                  Add complexity information if time permits.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Expanded Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Clock className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Expanded Answer Structure
              </h2>

              <p className="text-sm text-gray-500">
                Use additional details when the interviewer gives you more
                time.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowStructure(!showStructure)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showStructure ? "Hide Structure" : "Show Structure"}
          </button>

        </div>

        {showStructure && (
          <div className="grid md:grid-cols-5 gap-3 mt-6">

            {[
              "Core Approach",
              "Reasoning",
              "Complexity",
              "Edge Cases",
              "Alternative",
            ].map((step, index) => (

              <div
                key={step}
                className="border rounded-xl p-4"
              >

                <p className="text-xs font-bold text-indigo-600">
                  {index + 1}
                </p>

                <p className="font-bold mt-1">
                  {step}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Time Adaptation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Time Constraint Adaptation
            </h2>

            <p className="text-sm text-gray-500">
              The response structure changes depending on available time.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              20 SECONDS
            </p>

            <h3 className="font-bold text-red-700 mt-2">
              Core Answer
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Give only the approach and most important reasoning.
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              40 SECONDS
            </p>

            <h3 className="font-bold text-orange-700 mt-2">
              Focused Answer
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Add complexity and one important edge case.
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              60+ SECONDS
            </p>

            <h3 className="font-bold text-green-700 mt-2">
              Expanded Answer
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Discuss trade-offs, alternatives, and edge cases.
            </p>

          </div>

        </div>

      </div>

      {/* AI Guidance */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI COMMUNICATION COACH
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Don't spend your first 30 seconds on secondary details.
            </h2>

            <p className="text-gray-600 mt-2">
              If the interviewer interrupts early, your core solution should
              already be communicated. Supporting details can be added only
              after the essential reasoning is clear.
            </p>

          </div>

        </div>

      </div>

      {/* Analyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Analyze Answer Prioritization
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Let AI identify the most important points and generate
              time-adaptive answer structures.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Prioritization Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Response prioritization analysis completed successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Generate New Prioritization Challenge
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Practice prioritizing another technical answer under different
              time constraints.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Challenge
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                New prioritization challenge generated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Final Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Communicate the highest-value information first.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong technical answer does not need to contain every detail
              immediately. Lead with the core approach, establish the key
              reasoning, and expand into complexity, edge cases, and
              alternatives when time allows.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}