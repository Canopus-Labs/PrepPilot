import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  GitCompare,
  Target,
  Scale,
  Lightbulb,
} from "lucide-react";

const criteria = [
  {
    name: "Decision Relevance",
    score: 91,
    feedback:
      "The selected technology directly addresses the stated requirement.",
  },
  {
    name: "Constraints Considered",
    score: 72,
    feedback:
      "Performance was considered, but cost and operational constraints were not fully discussed.",
  },
  {
    name: "Alternatives Considered",
    score: 64,
    feedback:
      "You selected one option but did not clearly compare it with alternatives.",
  },
  {
    name: "Trade-offs",
    score: 69,
    feedback:
      "Some benefits were explained, but the disadvantages of the decision need more detail.",
  },
  {
    name: "Expected Consequences",
    score: 78,
    feedback:
      "The likely performance impact was identified correctly.",
  },
  {
    name: "Justification Quality",
    score: 84,
    feedback:
      "Your reasoning is understandable but can be supported with more concrete evidence.",
  },
];

export default function AIInterviewAnswerDecisionQualityAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  const overallScore = 76;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Decision Quality Analyzer
          </h1>

          <p className="text-gray-500">
            Evaluate the reasoning, trade-offs, and consequences behind your
            technical decisions.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Scenario
        </p>

        <h2 className="text-xl font-bold mt-2">
          Your application is experiencing increasing traffic. Would you
          introduce caching, database optimization, or horizontal scaling?
          Explain your decision.
        </h2>

        <p className="text-gray-600 mt-3">
          Consider requirements, constraints, alternatives, trade-offs, and
          expected consequences before making your recommendation.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Decision Explanation
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain which option you would choose and why..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Decision
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Scale
              className="mx-auto text-indigo-600"
              size={40}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overall Decision Quality
            </p>

            <p className="text-6xl font-black text-indigo-600">
              {overallScore}%
            </p>

            <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              Good Engineering Judgment
            </span>

            <p className="text-gray-600 mt-3">
              Your decision is technically reasonable, but stronger
              comparison of alternatives and trade-offs would improve the
              response.
            </p>

          </div>

          {/* Decision Summary */}
          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Selected Decision
              </p>

              <p className="font-bold text-lg mt-1">
                Caching
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <GitCompare className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Alternatives Discussed
              </p>

              <p className="font-bold text-lg mt-1">
                2 / 3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Scale className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Trade-off Coverage
              </p>

              <p className="font-bold text-lg mt-1">
                69%
              </p>

            </div>

          </div>

          {/* Criteria */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Decision Quality Breakdown
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a criterion to view detailed feedback.
            </p>

            <div className="space-y-4 mt-5">

              {criteria.map((criterion) => (
                <button
                  type="button"
                  key={criterion.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === criterion.name
                        ? null
                        : criterion
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">

                      {criterion.score >= 80 ? (
                        <CheckCircle2
                          className="text-green-600 mt-1"
                          size={21}
                        />
                      ) : (
                        <AlertTriangle
                          className="text-orange-600 mt-1"
                          size={21}
                        />
                      )}

                      <div>

                        <h3 className="font-semibold">
                          {criterion.name}
                        </h3>

                      </div>

                    </div>

                    <span className="font-bold text-indigo-600">
                      {criterion.score}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${criterion.score}%`,
                      }}
                    />

                  </div>

                  {selected?.name === criterion.name && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-sm text-gray-600">
                        {criterion.feedback}
                      </p>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Trade-offs */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Trade-off Gap
                </h2>

                <p className="text-gray-600 mt-2">
                  You explained why caching could improve read performance,
                  but you did not clearly discuss its drawbacks, such as stale
                  data, cache invalidation complexity, or additional
                  infrastructure.
                </p>

              </div>

            </div>

          </div>

          {/* Alternative Comparison */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Alternative Decision Comparison
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              {[
                {
                  name: "Caching",
                  strength: "Fast read performance",
                  weakness: "Cache invalidation",
                },
                {
                  name: "Database Optimization",
                  strength: "Improves underlying queries",
                  weakness: "May not solve traffic bottlenecks",
                },
                {
                  name: "Horizontal Scaling",
                  strength: "Handles higher workload",
                  weakness: "Adds infrastructure complexity",
                },
              ].map((option) => (
                <div
                  key={option.name}
                  className="border rounded-xl p-4"
                >

                  <h3 className="font-bold">
                    {option.name}
                  </h3>

                  <p className="text-sm text-green-700 mt-3">
                    ✓ {option.strength}
                  </p>

                  <p className="text-sm text-orange-700 mt-2">
                    ⚠ {option.weakness}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Improve the answer by explicitly stating the requirement,
                  comparing at least two alternatives, explaining the
                  trade-offs, and predicting what happens if traffic
                  continues to increase.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              Decision Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Re-answer the scenario using this structure:
              <strong> Requirement → Decision → Alternatives → Trade-offs →
              Consequences.</strong>
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Technical Decision
            </button>

          </div>

        </>
      )}

    </div>
  );
}