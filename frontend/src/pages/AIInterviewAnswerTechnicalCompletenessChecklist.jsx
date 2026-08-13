import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
  ClipboardCheck,
  Target,
  RefreshCw,
} from "lucide-react";

const checklistItems = [
  {
    title: "Problem Understanding",
    description: "Clearly explain what the problem is asking.",
    importance: "Critical",
  },
  {
    title: "Proposed Approach",
    description: "State the selected algorithm or technical approach.",
    importance: "Critical",
  },
  {
    title: "Reasoning",
    description: "Explain why the chosen approach works.",
    importance: "Critical",
  },
  {
    title: "Complexity",
    description: "Mention time and space complexity.",
    importance: "High",
  },
  {
    title: "Edge Cases",
    description: "Discuss important boundary and unusual cases.",
    importance: "High",
  },
  {
    title: "Trade-offs",
    description: "Explain relevant advantages, limitations, or alternatives.",
    importance: "Medium",
  },
  {
    title: "Final Conclusion",
    description: "Summarize the solution and expected result.",
    importance: "Medium",
  },
];

export default function AIInterviewAnswerTechnicalCompletenessChecklist() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [checked, setChecked] = useState([
    true,
    true,
    false,
    true,
    false,
    false,
    false,
  ]);

  const toggleItem = (index) => {
    setChecked((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const completedCount = checked.filter(Boolean).length;
  const completion = Math.round(
    (completedCount / checklistItems.length) * 100
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
            AI Technical Completeness Checklist
          </h1>

          <p className="text-gray-500">
            Make sure your interview answer covers the technical elements
            that matter for the question.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you design a URL shortening service?
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "System Design",
            "Architecture",
            "Scalability",
            "Trade-offs",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Answer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste your response and let AI generate a question-specific
          completeness checklist.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Write your interview answer here..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          <ClipboardCheck size={18} />
          Generate Completeness Checklist
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Technical Completeness
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  {completion}%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Needs Review
                </span>

                <p className="text-gray-600 mt-3">
                  Your answer covers several important elements, but
                  scalability, edge cases, and trade-offs need more attention.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Covered
              </p>

              <p className="text-3xl font-black text-green-600">
                {completedCount}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Missing
              </p>

              <p className="text-3xl font-black text-orange-600">
                {checklistItems.length - completedCount}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Critical Items
              </p>

              <p className="text-3xl font-black text-indigo-600">
                3
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <ClipboardCheck className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Question Type
              </p>

              <p className="text-lg font-black text-indigo-600 mt-2">
                System Design
              </p>
            </div>

          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex justify-between items-start">

              <div>
                <h2 className="font-bold text-lg">
                  AI-Generated Answer Checklist
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  This checklist adapts to the requirements of the current
                  question.
                </p>
              </div>

              <span className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
                {completedCount}/{checklistItems.length}
              </span>

            </div>

            <div className="h-3 bg-gray-200 rounded-full mt-5">

              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${completion}%` }}
              />

            </div>

            <div className="space-y-3 mt-6">

              {checklistItems.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => toggleItem(index)}
                  className={`w-full text-left rounded-2xl border p-5 transition ${
                    checked[index]
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >

                  <div className="flex gap-4">

                    {checked[index] ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={24}
                      />
                    ) : (
                      <Circle
                        className="text-gray-400 mt-1"
                        size={24}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-3">

                        <h3 className="font-bold">
                          {item.title}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.importance === "Critical"
                              ? "bg-red-100 text-red-700"
                              : item.importance === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.importance}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Missing Elements */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Technical Elements
                </h2>

                <div className="space-y-3 mt-4">

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-semibold">
                      Scalability
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Explain how the system would handle increasing traffic
                      and large numbers of URLs.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-semibold">
                      Edge Cases
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Consider duplicate URLs, invalid URLs, expired links,
                      and unavailable services.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-semibold">
                      Trade-offs
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Explain important choices such as database type,
                      caching, and identifier generation.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Question Adaptive Checklist */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Checklist Adaptation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              The checklist changes depending on the type of interview
              question.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              {[
                ["Coding", "Algorithm, complexity, edge cases"],
                ["System Design", "Scale, architecture, trade-offs"],
                ["Behavioral", "Situation, action, result, ownership"],
                ["Conceptual", "Definition, reasoning, examples"],
              ].map(([type, details]) => (
                <div
                  key={type}
                  className={`rounded-xl p-4 border ${
                    type === "System Design"
                      ? "border-indigo-400 bg-indigo-50"
                      : "bg-gray-50"
                  }`}
                >

                  <p className="font-bold">
                    {type}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {details}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Recommended Structure */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Recommended Answer Structure
            </h2>

            <div className="space-y-3 mt-5">

              {[
                "Clarify the problem and requirements",
                "State the high-level architecture",
                "Explain the main components",
                "Discuss data flow and reasoning",
                "Address scalability and performance",
                "Discuss edge cases and failure handling",
                "Explain important trade-offs",
                "Conclude with the final design",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-indigo-50 rounded-xl p-4"
                >

                  <span className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>

                  <p className="font-medium">
                    {item}
                  </p>

                </div>
              ))}

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
                  Before finalizing your answer, add{" "}
                  <strong>scalability, edge cases, and trade-offs</strong>.
                  These are especially important for this system-design
                  question.
                </p>

              </div>

            </div>

          </div>

          {/* Self Review */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <RefreshCw className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Final Self-Review
                </h2>

                <p className="text-gray-600 mt-1">
                  Review every checklist item once before submitting your
                  answer.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Recheck My Answer
            </button>

          </div>

        </>
      )}

    </div>
  );
}