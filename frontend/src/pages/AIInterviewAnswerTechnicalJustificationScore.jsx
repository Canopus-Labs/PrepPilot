import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const criteria = [
  {
    name: "Technology Choice",
    score: 84,
    feedback: "The technology is identified, but the reason for choosing it could be stronger.",
  },
  {
    name: "Algorithm Selection",
    score: 91,
    feedback: "The algorithm is well matched to the problem requirements.",
  },
  {
    name: "Design Decision",
    score: 72,
    feedback: "The design is reasonable, but the decision-making process is not fully explained.",
  },
  {
    name: "Performance Considerations",
    score: 64,
    feedback: "Performance impact is mentioned without concrete complexity or scale reasoning.",
  },
  {
    name: "Alternatives Considered",
    score: 48,
    feedback: "Alternative approaches are not clearly discussed.",
  },
  {
    name: "Trade-offs",
    score: 59,
    feedback: "The answer should explain what was gained and what was sacrificed.",
  },
];

export default function AIInterviewAnswerTechnicalJustificationScore() {
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
            AI Technical Justification Score
          </h1>

          <p className="text-gray-500">
            Evaluate how clearly you explain the reasoning behind your
            technical decisions.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Why did you choose this technology and architecture for your
          project?
        </h2>

        <p className="text-gray-600 mt-3">
          Explain not only what you selected, but why it was appropriate and
          what alternatives you considered.
        </p>

      </div>

      {/* Answer */}
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
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Justification
        </button>

      </div>

      {analyzed && (
        <>
          {/* Main Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={36}
            />

            <p className="text-gray-500 mt-3">
              Technical Justification Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              70%
            </p>

            <p className="text-gray-600 mt-2">
              Your technical decisions are mostly reasonable, but the
              reasoning and trade-offs need stronger explanation.
            </p>

          </div>

          {/* Criteria */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Justification Breakdown
            </h2>

            <div className="space-y-5 mt-5">

              {criteria.map((criterion) => (
                <div key={criterion.name}>

                  <div className="flex justify-between">

                    <span className="font-semibold">
                      {criterion.name}
                    </span>

                    <span className="font-bold text-indigo-600">
                      {criterion.score}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${criterion.score}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {criterion.feedback}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Strong Areas */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  Strong Justification Areas
                </h2>

                <p className="text-gray-600 mt-2">
                  Your algorithm selection is well connected to the problem
                  requirements. Continue explaining the relationship between
                  constraints and your chosen approach.
                </p>

              </div>

            </div>

          </div>

          {/* Improvement */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Main Improvement Area
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer should explicitly explain why alternative
                  approaches were rejected and what trade-offs your chosen
                  solution introduces.
                </p>

              </div>

            </div>

          </div>

          {/* Follow-up Practice */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Follow-Up Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  An interviewer might ask: "What other approach did you
                  consider, and why did you reject it?"
                </p>

                <textarea
                  rows={4}
                  placeholder="Explain the alternative and trade-off..."
                  className="w-full border rounded-xl p-3 mt-4 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  className="mt-3 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Practice Follow-Up
                </button>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-gray-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Structure technical justifications as:
                  <strong> requirement → decision → reason → alternative →
                  trade-off → expected outcome</strong>. This makes your
                  engineering reasoning easier for interviewers to evaluate.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}