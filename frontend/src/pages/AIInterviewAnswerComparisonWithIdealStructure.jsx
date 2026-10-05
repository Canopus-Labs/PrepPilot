import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Target,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    name: "Opening",
    status: "Covered",
    feedback: "Clearly states the main approach.",
  },
  {
    name: "Problem Understanding",
    status: "Covered",
    feedback: "Explains the problem requirements correctly.",
  },
  {
    name: "Key Explanation",
    status: "Partial",
    feedback: "Main idea is present but needs more reasoning.",
  },
  {
    name: "Evidence / Example",
    status: "Missing",
    feedback: "No concrete example or supporting evidence was provided.",
  },
  {
    name: "Technical Reasoning",
    status: "Partial",
    feedback: "Mentions implementation details but does not explain trade-offs.",
  },
  {
    name: "Conclusion",
    status: "Missing",
    feedback: "The answer ends without summarizing the decision.",
  },
];

function StatusIcon({ status }) {
  if (status === "Covered") {
    return <CheckCircle2 className="text-green-600" size={22} />;
  }

  if (status === "Partial") {
    return <AlertTriangle className="text-orange-600" size={22} />;
  }

  return <XCircle className="text-red-600" size={22} />;
}

function StatusBadge({ status }) {
  const styles = {
    Covered: "bg-green-100 text-green-700",
    Partial: "bg-orange-100 text-orange-700",
    Missing: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AIInterviewAnswerComparisonWithIdealStructure() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Ideal Structure Comparison
          </h1>

          <p className="text-gray-500">
            Compare your answer structure with an ideal interview response.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how you would improve the performance of a web application.
        </h2>

      </div>

      {/* User Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste your interview response..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Compare Structure
          <ArrowRight size={18} />
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={34}
            />

            <p className="text-gray-500 mt-3">
              Structure Alignment Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              67%
            </p>

            <p className="text-gray-600 mt-2">
              Your core explanation is present, but evidence, technical
              reasoning, and conclusion sections need improvement.
            </p>

          </div>

          {/* Visual Structure */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Answer Structure Comparison
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              {/* Ideal Structure */}
              <div>

                <h3 className="font-semibold text-indigo-700 mb-4">
                  Ideal Answer Structure
                </h3>

                <div className="space-y-3">

                  {sections.map((section) => (
                    <div
                      key={section.name}
                      className="p-4 rounded-xl bg-indigo-50 border border-indigo-100"
                    >

                      <div className="flex justify-between items-center">

                        <span className="font-semibold">
                          {section.name}
                        </span>

                        <span className="text-xs text-gray-500">
                          Expected
                        </span>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* User Coverage */}
              <div>

                <h3 className="font-semibold text-indigo-700 mb-4">
                  Your Coverage
                </h3>

                <div className="space-y-3">

                  {sections.map((section) => (
                    <div
                      key={section.name}
                      className="p-4 rounded-xl bg-gray-50 border"
                    >

                      <div className="flex justify-between items-center">

                        <div className="flex items-center gap-3">
                          <StatusIcon status={section.status} />

                          <span className="font-semibold">
                            {section.name}
                          </span>
                        </div>

                        <StatusBadge status={section.status} />

                      </div>

                      <p className="text-sm text-gray-600 mt-2 ml-8">
                        {section.feedback}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Gap Summary */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Main Structural Gaps
                </h2>

                <ul className="mt-3 space-y-2 text-gray-600">

                  <li>
                    • Add a concrete example or measurable evidence.
                  </li>

                  <li>
                    • Explain why your technical choices were selected.
                  </li>

                  <li>
                    • End with a concise summary of the recommended approach.
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* Independent Improvement */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Improvement Guidance
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer does not need to copy the ideal structure
                  exactly. Use the comparison to identify missing reasoning,
                  then improve your own response while keeping your natural
                  explanation style.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Revise My Answer
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}