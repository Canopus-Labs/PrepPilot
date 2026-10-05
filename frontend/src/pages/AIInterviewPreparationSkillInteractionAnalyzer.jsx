import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  AlertTriangle,
  Target,
  TrendingUp,
} from "lucide-react";

const interactions = [
  {
    skills: ["Problem Solving", "Communication"],
    score: 86,
    status: "Strong",
    insight:
      "You solve problems well and explain your reasoning clearly.",
  },
  {
    skills: ["Technical Knowledge", "Reasoning"],
    score: 78,
    status: "Strong",
    insight:
      "Technical knowledge is usually supported by logical reasoning.",
  },
  {
    skills: ["Coding", "Debugging"],
    score: 61,
    status: "Developing",
    insight:
      "Coding accuracy is good, but debugging explanations need improvement.",
  },
  {
    skills: ["System Design", "Trade-off Analysis"],
    score: 54,
    status: "Needs Practice",
    insight:
      "You can design components but need stronger trade-off justification.",
  },
];

export default function AIInterviewPreparationSkillInteractionAnalyzer() {
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Interaction Analyzer
          </h1>

          <p className="text-gray-500">
            Discover how multiple interview skills perform when they must be
            used together.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Network className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              Combined-Skill Analysis
            </h2>

            <p className="text-gray-600 mt-2">
              AI analyzes interview activities where two or more skills are
              required simultaneously instead of treating every skill as an
              isolated score.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Skill Interactions
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall */}
          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Interactions Analyzed
              </p>

              <p className="text-4xl font-black text-indigo-600 mt-2">
                12
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Strong Combinations
              </p>

              <p className="text-4xl font-black text-green-600 mt-2">
                7
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Needs Practice
              </p>

              <p className="text-4xl font-black text-orange-600 mt-2">
                3
              </p>

            </div>

          </div>

          {/* Interaction Cards */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Skill Interaction Map
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select an interaction to see the AI analysis.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              {interactions.map((interaction) => (
                <button
                  type="button"
                  key={interaction.skills.join("-")}
                  onClick={() =>
                    setSelected(
                      selected === interaction ? null : interaction
                    )
                  }
                  className={`text-left border rounded-2xl p-5 transition ${
                    selected === interaction
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div className="flex gap-2 flex-wrap">

                      <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                        {interaction.skills[0]}
                      </span>

                      <span className="text-indigo-600 font-bold py-2">
                        +
                      </span>

                      <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                        {interaction.skills[1]}
                      </span>

                    </div>

                    {interaction.status === "Strong" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={21}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600"
                        size={21}
                      />
                    )}

                  </div>

                  <div className="flex justify-between mt-5">

                    <span className="text-sm text-gray-500">
                      Interaction Score
                    </span>

                    <span className="font-bold text-indigo-600">
                      {interaction.score}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${interaction.score}%`,
                      }}
                    />

                  </div>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      interaction.status === "Strong"
                        ? "bg-green-100 text-green-700"
                        : interaction.status === "Developing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {interaction.status}
                  </span>

                  {selected === interaction && (
                    <p className="text-sm text-gray-600 mt-4">
                      {interaction.insight}
                    </p>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Strong Combination */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  Strong Combined Skill
                </h2>

                <p className="text-gray-600 mt-2">
                  Your strongest interaction is{" "}
                  <strong>Problem Solving + Communication</strong>. You are
                  generally able to explain your reasoning while solving a
                  problem, which is an important interview skill.
                </p>

              </div>

            </div>

          </div>

          {/* Weak Combination */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Combined-Skill Weakness
                </h2>

                <p className="text-gray-600 mt-2">
                  <strong>System Design + Trade-off Analysis</strong> is your
                  weakest combination. Practice explaining why one
                  architecture is preferred over another under different
                  constraints.
                </p>

              </div>

            </div>

          </div>

          {/* Targeted Practice */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Recommended Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Complete system-design scenarios that require you to make
                  an architectural decision and verbally defend the
                  trade-offs.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Start Combined-Skill Practice
                </button>

              </div>

            </div>

          </div>

          {/* Insight */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold">
                  AI Performance Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Individual skill scores do not always predict real interview
                  performance. Your interaction scores show that your
                  communication supports problem solving well, while
                  architectural reasoning requires additional combined
                  practice.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}