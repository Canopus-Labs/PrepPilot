import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowUp,
  Lightbulb,
  BarChart3,
  Filter,
} from "lucide-react";

const technicalPoints = [
  {
    point: "Using a hash map to achieve O(n) lookup time",
    relevance: 96,
    category: "Core Answer",
    status: "Highly Relevant",
    reason:
      "Directly addresses the algorithmic requirement of efficiently finding the target pair.",
  },
  {
    point: "Handling duplicate values in the input",
    relevance: 91,
    category: "Supporting Detail",
    status: "Highly Relevant",
    reason:
      "Important because duplicate values can affect correctness.",
  },
  {
    point: "Using a REST API in the project",
    relevance: 34,
    category: "Unnecessary Detail",
    status: "Low Relevance",
    reason:
      "The question focuses on the array algorithm and does not require API architecture.",
  },
  {
    point: "Using Git for version control",
    relevance: 12,
    category: "Unnecessary Detail",
    status: "Irrelevant",
    reason:
      "This does not contribute to solving or explaining the asked algorithm.",
  },
  {
    point: "Explaining the O(n) space requirement",
    relevance: 86,
    category: "Core Answer",
    status: "Relevant",
    reason:
      "Space complexity is directly relevant when evaluating the chosen approach.",
  },
];

export default function AIInterviewAnswerTechnicalRelevanceRanking() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredPoints =
    filter === "All"
      ? technicalPoints
      : technicalPoints.filter((item) => item.category === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Relevance Ranking
          </h1>

          <p className="text-gray-500">
            Rank the technical points in your answer by how relevant they are
            to the interview question.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you find two numbers in an array that add up to a target?
        </h2>

        <div className="mt-4 px-4 py-3 rounded-xl bg-indigo-50 text-gray-700">
          <strong>AI Focus:</strong> Algorithm selection, correctness,
          complexity, and edge cases are highly relevant to this question.
        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Paste or write your interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Relevance
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
                  Technical Relevance Score
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  84%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                  Strong Focus
                </span>

                <p className="text-gray-600 mt-3">
                  Most of your technical content is relevant, but a few
                  unrelated implementation details could be removed.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Highly Relevant
              </p>

              <p className="text-3xl font-black text-green-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <ArrowUp className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Supporting Points
              </p>

              <p className="text-3xl font-black text-indigo-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Low Relevance
              </p>

              <p className="text-3xl font-black text-orange-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Filter className="text-gray-500" />

              <p className="text-sm text-gray-500 mt-4">
                Irrelevant
              </p>

              <p className="text-3xl font-black text-gray-600">
                1
              </p>

            </div>

          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex flex-wrap gap-2">

              {[
                "All",
                "Core Answer",
                "Supporting Detail",
                "Unnecessary Detail",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    filter === item
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* Relevance Ranking */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Technical Point Ranking
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Points are ranked according to how directly they answer the
              interviewer's question.
            </p>

            <div className="space-y-4 mt-6">

              {filteredPoints.map((item, index) => (
                <button
                  type="button"
                  key={item.point}
                  onClick={() =>
                    setSelected(
                      selected?.point === item.point
                        ? null
                        : item
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${
                        item.relevance >= 85
                          ? "bg-green-100 text-green-600"
                          : item.relevance >= 60
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            {item.point}
                          </h3>

                          <div className="flex flex-wrap gap-2 mt-2">

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                              {item.category}
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.relevance >= 85
                                  ? "bg-green-100 text-green-700"
                                  : item.relevance >= 60
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {item.status}
                            </span>

                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-black text-indigo-600">
                            {item.relevance}%
                          </p>

                          <p className="text-xs text-gray-500">
                            Relevance
                          </p>

                        </div>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-4">

                        <div
                          className={`h-full rounded-full ${
                            item.relevance >= 85
                              ? "bg-green-500"
                              : item.relevance >= 60
                              ? "bg-indigo-600"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${item.relevance}%`,
                          }}
                        />

                      </div>

                      {selected?.point === item.point && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            <strong>AI Reasoning:</strong>{" "}
                            {item.reason}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Focus More */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2
                  className="text-green-600"
                  size={27}
                />

                <div>

                  <h2 className="font-bold text-green-700">
                    Give More Attention To
                  </h2>

                  <ul className="mt-3 space-y-2 text-gray-600">

                    <li>
                      • Hash-map algorithm choice
                    </li>

                    <li>
                      • Time and space complexity
                    </li>

                    <li>
                      • Duplicate and edge-case handling
                    </li>

                    <li>
                      • Why the selected approach works
                    </li>

                  </ul>

                </div>

              </div>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-orange-600"
                  size={27}
                />

                <div>

                  <h2 className="font-bold text-orange-700">
                    Remove or Shorten
                  </h2>

                  <ul className="mt-3 space-y-2 text-gray-600">

                    <li>
                      • Unrelated REST API discussion
                    </li>

                    <li>
                      • Git workflow details
                    </li>

                    <li>
                      • Project implementation history
                    </li>

                    <li>
                      • Technical details unrelated to the question
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

          {/* Recommended Answer Order */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Recommended Answer Focus
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Lead with the information that most directly answers the
              interviewer's question.
            </p>

            <div className="space-y-3 mt-5">

              {[
                "1. State the selected algorithm",
                "2. Explain why it fits the constraints",
                "3. Explain how the algorithm works",
                "4. Discuss time and space complexity",
                "5. Mention important edge cases",
                "6. Avoid unrelated implementation details",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    index < 5
                      ? "bg-indigo-50"
                      : "bg-gray-50"
                  }`}
                >

                  <span className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>

                  <p className="font-medium">
                    {item.replace(/^\d+\.\s/, "")}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Focus your answer on the{" "}
                  <strong>algorithm, correctness, complexity, and relevant
                  edge cases</strong>. Remove unrelated technologies and
                  implementation history unless the interviewer specifically
                  asks about them.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Relevance Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Try answering the same question again in under two minutes.
              Every technical point should directly support your answer.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Focused Answer
            </button>

          </div>

        </>
      )}

    </div>
  );
}