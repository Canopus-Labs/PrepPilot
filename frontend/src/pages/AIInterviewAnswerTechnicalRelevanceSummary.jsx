import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  FileText,
  Scale,
} from "lucide-react";

const summarySections = [
  {
    title: "Main Technical Point",
    icon: Target,
    content:
      "Use database indexing to reduce the amount of data scanned for frequently executed queries.",
    quality: "Strong",
  },
  {
    title: "Supporting Reasoning",
    icon: Brain,
    content:
      "An index allows the database engine to locate relevant records more efficiently instead of scanning the entire table.",
    quality: "Strong",
  },
  {
    title: "Important Evidence",
    icon: CheckCircle2,
    content:
      "The response mentions reduced query time, but does not provide a specific benchmark or workload comparison.",
    quality: "Partial",
  },
  {
    title: "Key Trade-off",
    icon: Scale,
    content:
      "Indexes can improve read performance but introduce additional storage requirements and write overhead.",
    quality: "Missing",
  },
  {
    title: "Final Conclusion",
    icon: FileText,
    content:
      "Indexing is appropriate when the query pattern is stable and read performance is a priority.",
    quality: "Strong",
  },
];

const missingPoints = [
  "A measurable performance comparison or benchmark.",
  "Expected workload or query volume.",
  "Specific trade-offs involving writes and storage.",
];

export default function AIInterviewAnswerTechnicalRelevanceSummary() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Relevance Summary
          </h1>

          <p className="text-gray-500">
            Identify the strongest technical points in your interview answer
            and discover what important information is missing.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you improve the performance of a slow database query?
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Database",
            "Performance",
            "Technical Reasoning",
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

      {/* Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Answer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste your response and AI will extract the most relevant technical
          information.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Explain your technical solution..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Generate Relevance Summary
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Technical Relevance
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    82%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Strong
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your answer contains a strong central technical idea, but
                  some evidence and trade-off information could be clearer.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "82%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Main Point
              </p>

              <p className="text-3xl font-black text-indigo-600">
                Strong
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Brain className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Reasoning
              </p>

              <p className="text-3xl font-black text-green-600">
                Strong
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Evidence
              </p>

              <p className="text-3xl font-black text-orange-600">
                Partial
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Missing Areas
              </p>

              <p className="text-3xl font-black text-red-600">
                3
              </p>

            </div>

          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              AI-Generated Technical Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your response condensed into the key elements an interviewer
              would care about.
            </p>

            <div className="space-y-4 mt-6">

              {summarySections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <button
                    type="button"
                    key={section.title}
                    onClick={() =>
                      setSelectedSection(
                        selectedSection === index
                          ? null
                          : index
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>

                            <p className="text-xs text-gray-500">
                              Point {index + 1}
                            </p>

                            <h3 className="font-bold mt-1">
                              {section.title}
                            </h3>

                          </div>

                          <span
                            className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                              section.quality === "Strong"
                                ? "bg-green-100 text-green-700"
                                : section.quality === "Partial"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {section.quality}
                          </span>

                        </div>

                        <p className="text-sm text-gray-600 mt-3">
                          {section.content}
                        </p>

                        {selectedSection === index && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-indigo-700">
                              AI Refinement
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              Keep this point concise and connect it directly
                              to the question before moving to supporting
                              details.
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Missing Information */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Important Information Missing
                </h2>

                <p className="text-gray-600 mt-2">
                  Your central idea is clear, but these points would make the
                  answer more complete and technically convincing.
                </p>

                <div className="space-y-3 mt-5">

                  {missingPoints.map((point, index) => (
                    <div
                      key={point}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >

                      <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>

                      <p className="text-sm text-gray-600">
                        {point}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Key Point Ranking */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Technical Point Relevance Ranking
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI ranks the technical information according to how directly it
              answers the interviewer's question.
            </p>

            <div className="space-y-5 mt-6">

              {[
                ["Database Indexing", 96],
                ["Reduced Data Scanning", 89],
                ["Query Performance", 82],
                ["Storage Overhead", 64],
                ["General Database Details", 38],
              ].map(([name, score], index) => (
                <div key={name}>

                  <div className="flex justify-between">

                    <div className="flex gap-3 items-center">

                      <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>

                      <span className="font-semibold">
                        {name}
                      </span>

                    </div>

                    <span className="font-bold text-indigo-600">
                      {score}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Concise Answer Preview */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Strongest Version of Your Answer
                </h2>

                <p className="text-gray-600 mt-3">
                  "I would first identify the slow query and inspect its
                  execution plan. If the query repeatedly filters or sorts on
                  specific columns, I would consider adding an appropriate
                  index to reduce unnecessary table scanning. I would then
                  measure the performance improvement and consider the
                  trade-off of additional storage and write overhead."
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  {[
                    "Main Point",
                    "Reasoning",
                    "Evidence",
                    "Trade-off",
                    "Conclusion",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white text-green-700 text-xs font-semibold"
                    >
                      ✓ {tag}
                    </span>
                  ))}

                </div>

              </div>

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
                  Lead with your main technical decision, immediately explain
                  why it solves the problem, support it with measurable
                  evidence, mention the most important trade-off, and finish
                  with a concise conclusion. Avoid spending equal time on
                  secondary implementation details.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}