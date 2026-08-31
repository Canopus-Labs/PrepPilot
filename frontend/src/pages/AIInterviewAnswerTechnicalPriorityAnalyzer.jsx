import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowUp,
  Lightbulb,
  Layers,
  BarChart3,
} from "lucide-react";

const technicalPoints = [
  {
    title: "Architecture Decision",
    type: "Core Decision",
    priority: 96,
    impact: "Critical",
    status: "Strong",
    feedback:
      "This is one of the most important parts of the answer because it explains why the overall architecture was selected.",
  },
  {
    title: "Scalability Strategy",
    type: "Core Decision",
    priority: 92,
    impact: "Critical",
    status: "Missing Detail",
    feedback:
      "Explain how the design handles increasing traffic and workload.",
  },
  {
    title: "Database Selection",
    type: "Core Decision",
    priority: 88,
    impact: "High",
    status: "Strong",
    feedback:
      "The database choice is relevant, but briefly connect it to the system requirements.",
  },
  {
    title: "Caching Configuration",
    type: "Supporting Detail",
    priority: 63,
    impact: "Medium",
    status: "Overexplained",
    feedback:
      "The configuration details are useful only after the main caching strategy has been established.",
  },
  {
    title: "Variable Naming",
    type: "Implementation Detail",
    priority: 28,
    impact: "Low",
    status: "Low Priority",
    feedback:
      "This detail is unlikely to influence the interviewer's assessment of your technical decision-making.",
  },
];

const recommendedOrder = [
  "Problem Requirements",
  "Architecture Decision",
  "Scalability Strategy",
  "Database Choice",
  "Trade-offs",
  "Implementation Details",
];

export default function AIInterviewAnswerTechnicalPriorityAnalyzer() {
  const [answer, setAnswer] = useState("");
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
            AI Technical Priority Analyzer
          </h1>

          <p className="text-gray-500">
            Identify which technical points deserve the most attention in your
            interview answer.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you design a scalable backend for a high-traffic
          application?
        </h2>

        <p className="text-gray-600 mt-3">
          Focus on the technical decisions that have the greatest impact on
          the system rather than explaining every implementation detail.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Technical Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Paste or write your technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Technical Priorities
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <BarChart3
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Technical Priority Score
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  81%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Good — Improve Focus
                </span>

                <p className="text-gray-600 mt-3">
                  Your answer contains strong technical information, but some
                  low-impact implementation details receive too much attention
                  compared with important architectural decisions.
                </p>

              </div>

            </div>

          </div>

          {/* Priority Distribution */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Critical Points
              </p>

              <p className="text-3xl font-black text-red-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <ArrowUp className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                High Impact
              </p>

              <p className="text-3xl font-black text-indigo-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Layers className="text-yellow-600" />

              <p className="text-sm text-gray-500 mt-4">
                Supporting Details
              </p>

              <p className="text-3xl font-black text-yellow-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-gray-500" />

              <p className="text-sm text-gray-500 mt-4">
                Low Priority
              </p>

              <p className="text-3xl font-black text-gray-600">
                1
              </p>

            </div>

          </div>

          {/* Technical Point Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Technical Point Priorities
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a technical point to understand why it matters.
            </p>

            <div className="space-y-4 mt-5">

              {technicalPoints.map((point) => (
                <button
                  type="button"
                  key={point.title}
                  onClick={() =>
                    setSelected(
                      selected?.title === point.title
                        ? null
                        : point
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {point.priority >= 85 ? (
                      <Target
                        className="text-red-600 mt-1"
                        size={22}
                      />
                    ) : point.priority >= 60 ? (
                      <ArrowUp
                        className="text-indigo-600 mt-1"
                        size={22}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-gray-500 mt-1"
                        size={22}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            {point.title}
                          </h3>

                          <div className="flex gap-2 mt-2">

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                              {point.type}
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                point.priority >= 85
                                  ? "bg-red-100 text-red-700"
                                  : point.priority >= 60
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {point.impact}
                            </span>

                          </div>

                        </div>

                        <span className="font-bold text-indigo-600">
                          {point.priority}%
                        </span>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-4">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${point.priority}%`,
                          }}
                        />

                      </div>

                      <div className="flex justify-between mt-3">

                        <span
                          className={`text-xs font-semibold ${
                            point.status === "Strong"
                              ? "text-green-600"
                              : point.status === "Missing Detail"
                              ? "text-orange-600"
                              : "text-gray-500"
                          }`}
                        >
                          {point.status}
                        </span>

                        <span className="text-xs text-gray-500">
                          Priority Score
                        </span>

                      </div>

                      {selected?.title === point.title && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            {point.feedback}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Missing Critical Information */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Critical Information
                </h2>

                <p className="text-gray-600 mt-2">
                  The answer needs a clearer explanation of the{" "}
                  <strong>scalability strategy</strong>.
                </p>

                <ul className="mt-3 space-y-2 text-gray-600">

                  <li>
                    • Explain how the architecture handles increasing traffic.
                  </li>

                  <li>
                    • Mention how bottlenecks are identified and handled.
                  </li>

                  <li>
                    • Explain why the chosen scaling strategy fits the
                    requirements.
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* Recommended Order */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <ArrowUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Explanation Order
                </h2>

                <p className="text-sm text-gray-500">
                  Lead with high-impact decisions before supporting details.
                </p>

              </div>

            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-2 mt-6">

              {recommendedOrder.map((item, index) => (
                <React.Fragment key={item}>

                  <div
                    className={`px-4 py-3 rounded-xl font-semibold ${
                      index < 4
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {index + 1}. {item}
                  </div>

                  {index < recommendedOrder.length - 1 && (
                    <span className="text-gray-400">
                      →
                    </span>
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Core vs Supporting */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2
                  className="text-green-600"
                  size={26}
                />

                <div>

                  <h2 className="font-bold text-green-700">
                    Focus More On
                  </h2>

                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>• Architecture decisions</li>
                    <li>• Algorithm selection</li>
                    <li>• Scalability strategy</li>
                    <li>• Trade-offs</li>
                    <li>• Constraint handling</li>
                  </ul>

                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <Layers
                  className="text-gray-500"
                  size={26}
                />

                <div>

                  <h2 className="font-bold text-gray-700">
                    Keep Concise
                  </h2>

                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>• Variable naming</li>
                    <li>• Minor configuration details</li>
                    <li>• Low-impact implementation choices</li>
                    <li>• Repeated explanations</li>
                    <li>• Unnecessary technical jargon</li>
                  </ul>

                </div>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Start your answer with the{" "}
                  <strong>problem requirements and major technical decisions</strong>.
                  Explain supporting implementation details only after the
                  interviewer understands the important design choices.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Technical Priority Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Rewrite your answer in under two minutes. Give the most
              explanation time to the architectural and algorithmic decisions
              that have the greatest impact.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Priority-Based Answer
            </button>

          </div>

        </>
      )}

    </div>
  );
}