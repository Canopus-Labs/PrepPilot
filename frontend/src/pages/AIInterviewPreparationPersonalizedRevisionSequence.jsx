import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const topics = [
  {
    name: "Dynamic Programming",
    mastery: 48,
    importance: 95,
    retentionRisk: 82,
    priority: 1,
    prerequisite: "Recursion",
  },
  {
    name: "Recursion",
    mastery: 62,
    importance: 88,
    retentionRisk: 70,
    priority: 2,
    prerequisite: "Data Structures",
  },
  {
    name: "Data Structures",
    mastery: 76,
    importance: 90,
    retentionRisk: 55,
    priority: 3,
    prerequisite: "None",
  },
  {
    name: "SQL",
    mastery: 81,
    importance: 75,
    retentionRisk: 42,
    priority: 4,
    prerequisite: "None",
  },
];

const factors = [
  "Concept prerequisites",
  "Current mastery",
  "Topic importance",
  "Recent mistakes",
  "Retention risk",
  "Interview timeline",
];

export default function AIInterviewPreparationPersonalizedRevisionSequence() {
  const [sequence, setSequence] = useState(topics);
  const [showFactors, setShowFactors] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const moveTopic = (index, direction) => {
    const next = [...sequence];
    const target = index + direction;

    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];

    setSequence(
      next.map((topic, i) => ({
        ...topic,
        priority: i + 1,
      }))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Personalized Revision Sequence
          </h1>

          <p className="text-gray-500">
            Generate the most effective order for revising your weak
            interview concepts.
          </p>
        </div>

      </div>

      {/* Main Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Target className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI REVISION RECOMMENDATION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Start with Dynamic Programming
            </h2>

            <p className="text-gray-600 mt-2">
              It has low mastery, high interview importance, and high
              retention risk. Its prerequisite relationship also makes the
              revision order important.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target size={22} className="text-indigo-600" />
            <p className="text-sm text-gray-500 mt-3">
              Weak Concepts
            </p>
            <p className="text-3xl font-black text-indigo-600">
              4
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle size={22} className="text-orange-600" />
            <p className="text-sm text-gray-500 mt-3">
              High Priority
            </p>
            <p className="text-3xl font-black text-orange-600">
              2
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Brain size={22} className="text-purple-600" />
            <p className="text-sm text-gray-500 mt-3">
              Prerequisite Links
            </p>
            <p className="text-3xl font-black text-purple-600">
              2
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <Clock size={22} className="text-yellow-600" />
            <p className="text-sm text-gray-500 mt-3">
              Revision Window
            </p>
            <p className="text-3xl font-black text-yellow-600">
              7d
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 size={22} className="text-green-600" />
            <p className="text-sm text-gray-500 mt-3">
              Plan Efficiency
            </p>
            <p className="text-3xl font-black text-green-600">
              91%
            </p>
          </div>

        </div>

      </div>

      {/* Revision Sequence */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-bold text-lg">
              Recommended Revision Sequence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Topics are ordered using mastery, dependencies, importance,
              mistakes, retention risk, and timeline.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "View Factors"}
          </button>

        </div>

        <div className="space-y-4 mt-6">

          {sequence.map((topic, index) => (

            <div
              key={topic.name}
              className={`border rounded-2xl p-5 ${
                index === 0
                  ? "border-indigo-400 bg-indigo-50"
                  : ""
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">
                  {topic.priority}
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-bold text-lg">
                      {topic.name}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        topic.priority === 1
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {topic.priority === 1
                        ? "Highest Priority"
                        : `Priority ${topic.priority}`}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Prerequisite: {topic.prerequisite}
                  </p>

                </div>

                <div className="flex flex-col gap-2">

                  <button
                    type="button"
                    onClick={() => moveTopic(index, -1)}
                    disabled={index === 0}
                    className="p-2 border rounded-lg disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveTopic(index, 1)}
                    disabled={index === sequence.length - 1}
                    className="p-2 border rounded-lg disabled:opacity-30"
                  >
                    <ArrowDown size={16} />
                  </button>

                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-5">

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    MASTERY
                  </p>
                  <p className="text-2xl font-black text-indigo-600">
                    {topic.mastery}%
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    IMPORTANCE
                  </p>
                  <p className="text-2xl font-black text-orange-600">
                    {topic.importance}%
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    RETENTION RISK
                  </p>
                  <p className="text-2xl font-black text-purple-600">
                    {topic.retentionRisk}%
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Factors */}
      {showFactors && (
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="font-bold text-lg">
            AI Prioritization Factors
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mt-5">

            {factors.map((factor, index) => (

              <div
                key={factor}
                className="border rounded-xl p-4"
              >

                <p className="text-xs font-bold text-indigo-600">
                  FACTOR {index + 1}
                </p>

                <p className="font-semibold mt-1">
                  {factor}
                </p>

              </div>

            ))}

          </div>

        </div>
      )}

      {/* Dependency Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Concept Dependency Analysis
            </h2>

            <p className="text-sm text-gray-500">
              The AI considers foundational concepts before advanced topics.
            </p>
          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          <div className="border rounded-xl p-4 bg-gray-50">
            <p className="text-xs text-gray-500">
              FOUNDATION
            </p>
            <p className="font-bold">
              Data Structures
            </p>
          </div>

          <ArrowRight className="text-gray-400" />

          <div className="border rounded-xl p-4 bg-indigo-50">
            <p className="text-xs text-indigo-600">
              PREREQUISITE
            </p>
            <p className="font-bold">
              Recursion
            </p>
          </div>

          <ArrowRight className="text-gray-400" />

          <div className="border rounded-xl p-4 bg-orange-50">
            <p className="text-xs text-orange-600">
              ADVANCED
            </p>
            <p className="font-bold">
              Dynamic Programming
            </p>
          </div>

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Interview Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Revision order is adjusted based on the available preparation
              window.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-red-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              URGENT
            </p>
            <p className="text-3xl font-black text-red-600 mt-1">
              2
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Topics requiring immediate revision.
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              NEXT
            </p>
            <p className="text-3xl font-black text-orange-600 mt-1">
              1
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Topic scheduled after prerequisites.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              MAINTENANCE
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              1
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Topic needing lightweight revision.
            </p>
          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI REVISION INSIGHT
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Do not revise topics only by their lowest score.
            </h2>

            <p className="text-gray-600 mt-2">
              Dynamic Programming has the highest priority because it combines
              low mastery, high interview importance, high retention risk, and
              a dependency on recursion. Revising the prerequisite first can
              make the advanced topic more effective to learn.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  FIRST
                </p>
                <p className="font-bold text-indigo-700 mt-1">
                  Foundations
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  THEN
                </p>
                <p className="font-bold text-orange-700 mt-1">
                  High-Impact Weaknesses
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  FINALLY
                </p>
                <p className="font-bold text-green-700 mt-1">
                  Maintenance Topics
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Generate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Generate Revision Sequence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Build a personalized revision order using your latest
              preparation data.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Sequence
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Personalized revision sequence generated successfully.
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
              Refresh Revision Plan
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate the sequence after new practice results or changes
              to the interview timeline.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Plan
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Revision plan updated successfully.
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
                Revision Planning Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI generates the personalized revision sequence.
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

            {[
              "Analyze Weaknesses",
              "Check Prerequisites",
              "Estimate Impact",
              "Consider Timeline",
              "Generate Sequence",
            ].map((item, index) => (

              <React.Fragment key={item}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {item}
                  </p>

                </div>

                {index < 4 && (
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
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              The best revision order is not always the lowest-score-first
              order.
            </h2>

            <p className="text-gray-600 mt-2">
              Revision should account for dependencies, interview importance,
              retention risk, recent mistakes, and the time remaining before
              the interview. This produces a more useful preparation sequence
              than simply sorting concepts by score.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}