import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const weaknesses = [
  {
    name: "Dynamic Programming",
    score: 42,
    cause: "Recursion",
    impact: "High",
    status: "Dependent Weakness",
  },
  {
    name: "Recursion",
    score: 58,
    cause: "Problem Decomposition",
    impact: "High",
    status: "Root Weakness",
  },
  {
    name: "Problem Decomposition",
    score: 51,
    cause: "None",
    impact: "Critical",
    status: "Foundational Gap",
  },
];

export default function AIInterviewPreparationWeaknessDependencyAnalyzer() {
  const [showChain, setShowChain] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [reassessed, setReassessed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Weakness Dependency Analyzer
          </h1>

          <p className="text-gray-500">
            Discover foundational weaknesses that may be causing difficulties
            in advanced interview topics.
          </p>
        </div>

      </div>

      {/* Main Insight */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <GitBranch className="text-orange-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              ROOT CAUSE DETECTED
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Problem Decomposition is the underlying weakness
            </h2>

            <p className="text-gray-600 mt-2">
              Difficulty with Problem Decomposition appears to affect
              Recursion, which is contributing to weaker Dynamic Programming
              performance.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Weaknesses Analyzed
            </p>
            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Root Weaknesses
            </p>
            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <GitBranch className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Dependency Links
            </p>
            <p className="text-3xl font-black text-orange-600">
              2
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Brain className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Root Impact
            </p>
            <p className="text-3xl font-black text-purple-600">
              High
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Analysis Confidence
            </p>
            <p className="text-3xl font-black text-green-600">
              91%
            </p>
          </div>

        </div>

      </div>

      {/* Weaknesses */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div>
          <h2 className="font-bold text-lg">
            Detected Weaknesses
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            AI analyzes performance relationships instead of treating each
            weakness independently.
          </p>
        </div>

        <div className="space-y-4 mt-6">

          {weaknesses.map((weakness) => (

            <div
              key={weakness.name}
              className="border rounded-2xl p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-bold text-lg">
                    {weakness.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Score: {weakness.score}%
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    weakness.status === "Foundational Gap"
                      ? "bg-red-100 text-red-700"
                      : weakness.status === "Root Weakness"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {weakness.status}
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    POSSIBLE CAUSE
                  </p>

                  <p className="font-bold text-indigo-700 mt-1">
                    {weakness.cause}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    IMPACT
                  </p>

                  <p className="font-bold text-orange-700 mt-1">
                    {weakness.impact}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Dependency Chain */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <GitBranch className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Weakness Dependency Chain
              </h2>

              <p className="text-sm text-gray-500">
                Follow the likely root cause through dependent skills.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowChain(!showChain)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showChain ? "Hide Chain" : "Show Chain"}
          </button>

        </div>

        {showChain && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            <div className="border rounded-2xl p-5 bg-red-50">

              <p className="text-xs font-bold text-red-600">
                ROOT WEAKNESS
              </p>

              <h3 className="font-black text-lg mt-1">
                Problem Decomposition
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                51% mastery
              </p>

            </div>

            <ArrowRight className="text-gray-400" />

            <div className="border rounded-2xl p-5 bg-orange-50">

              <p className="text-xs font-bold text-orange-600">
                DEPENDENT SKILL
              </p>

              <h3 className="font-black text-lg mt-1">
                Recursion
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                58% mastery
              </p>

            </div>

            <ArrowRight className="text-gray-400" />

            <div className="border rounded-2xl p-5 bg-yellow-50">

              <p className="text-xs font-bold text-yellow-600">
                ADVANCED IMPACT
              </p>

              <h3 className="font-black text-lg mt-1">
                Dynamic Programming
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                42% mastery
              </p>

            </div>

          </div>
        )}

      </div>

      {/* Root Cause Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Address the root weakness before repeating advanced practice.
            </h2>

            <p className="text-gray-600 mt-2">
              Start with Problem Decomposition. Once foundational reasoning
              improves, reassess Recursion and then Dynamic Programming rather
              than repeatedly practicing Dynamic Programming in isolation.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  STEP 1
                </p>

                <p className="font-bold text-red-700 mt-1">
                  Fix Foundation
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  STEP 2
                </p>

                <p className="font-bold text-orange-700 mt-1">
                  Reassess Dependency
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  STEP 3
                </p>

                <p className="font-bold text-green-700 mt-1">
                  Re-test Advanced Skill
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Impact Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Root Cause Impact
            </h2>

            <p className="text-sm text-gray-500">
              Improving one foundational skill may improve several dependent
              areas.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              CURRENT ROOT SCORE
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              51%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Problem Decomposition
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              DEPENDENT SKILLS
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              2
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Recursion and Dynamic Programming
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              POTENTIAL IMPACT
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              High
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Improvement can propagate through the dependency chain.
            </p>

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
              Analyze Weakness Dependencies
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Analyze recent performance to identify likely foundational
              causes behind recurring weaknesses.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Dependency Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Weakness dependency analysis completed successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Reassessment */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Reassess Dependent Skills
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate related skills after improving the identified root
              weakness.
            </p>

            <button
              type="button"
              onClick={() => setReassessed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Reassess Skills
              <ArrowRight size={18} />
            </button>

            {reassessed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Dependent skills are ready for reassessment.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Final Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Fix the cause, not just the symptom.
            </h2>

            <p className="text-gray-600 mt-2">
              When an advanced topic repeatedly causes problems, investigate
              the foundational concepts behind it. Improving the root weakness
              can make practice across multiple dependent skills more
              effective.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}