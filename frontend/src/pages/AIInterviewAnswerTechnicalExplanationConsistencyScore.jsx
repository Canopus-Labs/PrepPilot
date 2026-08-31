import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  GitCompare,
  MessageSquare,
  TrendingUp,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const explanations = [
  {
    session: "Session 1",
    concept: "Hash Table",
    explanation:
      "A hash table provides average O(1) lookup using a hash function to map keys to positions.",
    score: 94,
    status: "Consistent",
  },
  {
    session: "Session 2",
    concept: "Hash Table",
    explanation:
      "A hash map usually provides constant-time lookup by converting a key into an index.",
    score: 89,
    status: "Consistent",
  },
  {
    session: "Session 3",
    concept: "Hash Table",
    explanation:
      "Hash tables always provide O(1) lookup regardless of collisions.",
    score: 61,
    status: "Conflict",
  },
];

const consistencyFactors = [
  {
    name: "Core Concept",
    score: 92,
    description: "The central definition remains stable across answers.",
  },
  {
    name: "Technical Accuracy",
    score: 81,
    description: "Most explanations preserve technically correct details.",
  },
  {
    name: "Terminology",
    score: 88,
    description: "Equivalent technical terms are used consistently.",
  },
  {
    name: "Complexity Explanation",
    score: 69,
    description: "One answer introduces an inaccurate absolute O(1) claim.",
  },
];

const workflow = [
  "Collect Answers",
  "Identify Concepts",
  "Compare Explanations",
  "Detect Conflicts",
  "Calculate Score",
];

export default function AIInterviewAnswerTechnicalExplanationConsistencyScore() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const selected = explanations[selectedAnswer];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Explanation Consistency Score
          </h1>

          <p className="text-gray-500">
            Measure whether technical concepts are explained consistently
            across interview answers.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <GitCompare className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CONSISTENCY ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Overall Consistency: 81%
            </h2>

            <p className="text-gray-600 mt-2">
              Your core explanation is mostly consistent, but one answer makes
              an inaccurate absolute claim about hash-table complexity.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <MessageSquare className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Answers Compared
            </p>
            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Consistent
            </p>
            <p className="text-3xl font-black text-green-600">
              2
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Conflicts
            </p>
            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <TrendingUp className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Concept Match
            </p>
            <p className="text-3xl font-black text-purple-600">
              92%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Target className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Consistency
            </p>
            <p className="text-3xl font-black text-orange-600">
              81%
            </p>
          </div>

        </div>

      </div>

      {/* Concept */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Concept Being Compared
            </h2>

            <p className="text-sm text-gray-500">
              The AI groups answers that discuss the same technical concept.
            </p>
          </div>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 mt-5">

          <p className="text-xs font-bold text-indigo-600">
            TECHNICAL CONCEPT
          </p>

          <h2 className="text-2xl font-black text-indigo-800 mt-1">
            Hash Tables
          </h2>

          <p className="text-gray-600 mt-2">
            3 explanations from previous interview sessions were identified
            as describing the same concept.
          </p>

        </div>

      </div>

      {/* Explanation Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <GitCompare className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Explanation Comparison
              </h2>

              <p className="text-sm text-gray-500">
                Compare how the same concept was explained across sessions.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAnswers(!showAnswers)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAnswers ? "Hide Answers" : "Show Answers"}
          </button>

        </div>

        {showAnswers && (
          <div className="space-y-4 mt-6">

            {explanations.map((item, index) => (

              <button
                type="button"
                key={item.session}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedAnswer === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-black text-indigo-600">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.session}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Consistent"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.explanation}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="flex-1 h-2 bg-gray-200 rounded-full">

                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      <span className="text-sm font-bold text-indigo-600">
                        {item.score}%
                      </span>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Selected Explanation: {selected.session}
            </h2>

            <p className="text-sm text-gray-500">
              Detailed consistency analysis.
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="text-gray-700 leading-7">
            {selected.explanation}
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              CONSISTENCY
            </p>
            <p className="text-3xl font-black text-indigo-600 mt-1">
              {selected.score}%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              CONCEPT
            </p>
            <p className="font-bold text-green-700 mt-2">
              Hash Table
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              STATUS
            </p>
            <p className="font-bold text-red-700 mt-2">
              {selected.status}
            </p>
          </div>

        </div>

      </div>

      {/* Contradiction Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              TECHNICAL CONTRADICTION DETECTED
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Avoid saying hash tables "always" provide O(1) lookup.
            </h2>

            <p className="text-gray-600 mt-2">
              Earlier answers correctly described average-case O(1) lookup,
              while the latest answer makes an unconditional claim. This
              changes the technical meaning of the explanation.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-green-600">
                  CONSISTENT VERSION
                </p>

                <p className="text-gray-700 mt-2">
                  "Hash tables provide average O(1) lookup, assuming a good hash
                  function and typical collision behavior."
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-red-600">
                  INCONSISTENT VERSION
                </p>

                <p className="text-gray-700 mt-2">
                  "Hash tables always provide O(1) lookup regardless of
                  collisions."
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Consistency Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Consistency Factors
              </h2>

              <p className="text-sm text-gray-500">
                Dimensions used to calculate the consistency score.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {consistencyFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {factor.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Maintain a stable technical definition across sessions.
            </h2>

            <p className="text-gray-600 mt-2">
              When explaining a concept repeatedly, keep the core definition,
              assumptions, complexity, and important limitations consistent.
              Wording can change, but the technical meaning should remain the
              same.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  CORE IDEA
                </p>
                <p className="font-bold mt-1">
                  Keep Consistent
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  TERMINOLOGY
                </p>
                <p className="font-bold mt-1">
                  Use Precisely
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  LIMITATIONS
                </p>
                <p className="font-bold text-indigo-700 mt-1">
                  Don't Contradict
                </p>
              </div>

            </div>

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
              Analyze New Answer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Compare a new explanation against previous answers for the same
              concept.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Consistency Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Technical explanation consistency analysis completed.
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
              Refresh Consistency Score
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate consistency after completing more interview
              sessions.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Score
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Technical explanation consistency score updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Consistency Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI compares technical explanations.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((item, index) => (

              <React.Fragment key={item}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {item}
                  </p>

                </div>

                {index < workflow.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={18}
                  />
                )}

              </React.Fragment>
            ))}

          </div>
        )}

      </div>

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Consistent explanations build technical credibility.
            </h2>

            <p className="text-gray-600 mt-2">
              Your wording can change between interviews, but the underlying
              technical meaning should remain accurate and consistent. This
              helps demonstrate genuine understanding instead of memorized
              responses.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}