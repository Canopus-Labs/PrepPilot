import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  FileText,
} from "lucide-react";

const analysis = [
  {
    type: "Simplify",
    original: "The service utilizes asynchronous distributed processing mechanisms.",
    simplified: "The service processes tasks asynchronously across multiple workers.",
    reason: "Uses concrete wording instead of abstract terminology.",
  },
  {
    type: "Preserve",
    original: "Requests are cached to reduce repeated database operations.",
    simplified: "Requests are cached to reduce repeated database operations.",
    reason: "This is already technically clear and should be preserved.",
  },
  {
    type: "Clarify",
    original: "This improves overall performance significantly.",
    simplified: "This reduces database load and improves response time.",
    reason: "Replaces a vague performance claim with a specific technical effect.",
  },
];

export default function AIInterviewAnswerTechnicalSimplificationCoach() {
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
            AI Technical Simplification Coach
          </h1>

          <p className="text-gray-500">
            Simplify complex technical explanations without losing important
            meaning.
          </p>
        </div>

      </div>

      {/* Goal */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Sparkles
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              Simplification Goal
            </h2>

            <p className="text-gray-600 mt-2">
              AI will preserve technical concepts while removing unnecessary
              jargon, vague wording, repetition, and unnecessarily complicated
              sentence structures.
            </p>

          </div>

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Technical Answer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste an interview response that you feel is too complicated.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Example: Our distributed asynchronous architecture leverages..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Simplify Technical Answer
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <FileText
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Technical Clarity Score
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  79%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Can Be Simplified
                </span>

                <p className="text-gray-600 mt-3">
                  Your explanation contains the correct technical ideas, but
                  several statements use unnecessary complexity or vague
                  wording.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Complex Statements
              </p>

              <p className="text-3xl font-black text-orange-600">
                4
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Sparkles className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Simplifiable
              </p>

              <p className="text-3xl font-black text-indigo-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Technical Meaning
              </p>

              <p className="text-3xl font-black text-green-600">
                96%
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <ArrowRight className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Expected Clarity Gain
              </p>

              <p className="text-3xl font-black text-indigo-600">
                +18%
              </p>

            </div>

          </div>

          {/* Before / After */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Simplified Answer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI preserves the technical meaning while making the explanation
              easier to follow.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border rounded-2xl p-5">

                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  Original
                </span>

                <p className="text-gray-700 mt-4 leading-7">
                  Our distributed asynchronous architecture leverages
                  independent processing workers to facilitate non-blocking
                  execution of computational workloads while minimizing
                  synchronous dependencies.
                </p>

              </div>

              <div className="border border-green-300 rounded-2xl p-5 bg-green-50">

                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Simplified
                </span>

                <p className="text-gray-700 mt-4 leading-7">
                  Our system processes tasks asynchronously using multiple
                  workers, so one task does not have to wait for another to
                  finish.
                </p>

              </div>

            </div>

          </div>

          {/* Change Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Change Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a statement to see why the wording was changed.
            </p>

            <div className="space-y-4 mt-5">

              {analysis.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() =>
                    setSelected(
                      selected === index
                        ? null
                        : index
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {item.type === "Preserve" ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={22}
                      />
                    ) : (
                      <Sparkles
                        className="text-indigo-600 mt-1"
                        size={22}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <h3 className="font-semibold">
                          Statement {index + 1}
                        </h3>

                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                          {item.type}
                        </span>

                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">

                        <div className="bg-gray-50 rounded-xl p-4">

                          <p className="text-xs text-gray-500">
                            Original
                          </p>

                          <p className="text-sm text-gray-700 mt-2">
                            {item.original}
                          </p>

                        </div>

                        <div className="bg-green-50 rounded-xl p-4">

                          <p className="text-xs text-gray-500">
                            Suggested
                          </p>

                          <p className="text-sm text-gray-700 mt-2">
                            {item.simplified}
                          </p>

                        </div>

                      </div>

                      {selected === index && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            <strong>Why:</strong> {item.reason}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* What AI Preserved */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Technical Meaning Preserved
                </h2>

                <p className="text-gray-600 mt-2">
                  The simplification keeps the important concepts about
                  asynchronous processing, worker-based execution, and reduced
                  dependencies. Only unnecessary wording and abstraction were
                  removed.
                </p>

              </div>

            </div>

          </div>

          {/* Issues */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Clarity Issues Detected
                </h2>

                <ul className="mt-3 space-y-2 text-gray-600">

                  <li>
                    • Overuse of abstract technical terminology
                  </li>

                  <li>
                    • Long sentence structures
                  </li>

                  <li>
                    • Vague performance statements
                  </li>

                  <li>
                    • Technical relationships could be explained more
                    directly
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* Communication Levels */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Audience Adaptation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              The same technical idea can be communicated at different levels.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Non-Technical Audience
                </p>

                <p className="font-semibold mt-2">
                  "We process tasks independently so one task does not block
                  another."
                </p>

              </div>

              <div className="border border-indigo-300 rounded-xl p-4 bg-indigo-50">

                <p className="text-xs text-gray-500">
                  Interviewer
                </p>

                <p className="font-semibold mt-2">
                  "We use asynchronous workers to process tasks independently
                  and reduce blocking."
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Technical Deep Dive
                </p>

                <p className="font-semibold mt-2">
                  "A worker pool processes queued tasks asynchronously,
                  decoupling task execution from the request lifecycle."
                </p>

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
                  Prefer{" "}
                  <strong>direct technical language</strong> over abstract
                  terminology. Explain the main idea first, then add technical
                  depth only when it helps answer the interviewer's question.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Simplification Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Explain the same technical concept in one clear sentence without
              removing the core technical meaning.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Simplification
            </button>

          </div>

        </>
      )}

    </div>
  );
}