import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock3,
  RotateCcw,
  Lightbulb,
  Mic2,
  Bug,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const practiceModes = [
  {
    name: "Timed Practice",
    icon: Clock3,
    reason: "Best for improving speed and time management.",
    target: "Speed Issues",
    color: "orange",
  },
  {
    name: "Recall Mode",
    icon: RotateCcw,
    reason: "Strengthens memory and concept retention.",
    target: "Retention Issues",
    color: "purple",
  },
  {
    name: "Concept Challenge",
    icon: Lightbulb,
    reason: "Builds understanding of weak concepts.",
    target: "Knowledge Gaps",
    color: "yellow",
  },
  {
    name: "Mock Interview",
    icon: Mic2,
    reason: "Improves communication and interview confidence.",
    target: "Communication Issues",
    color: "blue",
  },
  {
    name: "Debugging Practice",
    icon: Bug,
    reason: "Improves implementation and error-detection skills.",
    target: "Implementation Errors",
    color: "red",
  },
];

const weaknesses = [
  {
    name: "Communication",
    severity: "High",
    issue: "Answers lack structure and clear reasoning.",
    recommended: "Mock Interview",
  },
  {
    name: "Concept Retention",
    severity: "Medium",
    issue: "Previously learned concepts are frequently forgotten.",
    recommended: "Recall Mode",
  },
  {
    name: "Coding Speed",
    severity: "Medium",
    issue: "Solutions are correct but frequently exceed the time limit.",
    recommended: "Timed Practice",
  },
];

export default function AIInterviewPreparationPracticeModeRecommender() {
  const [selectedWeakness, setSelectedWeakness] = useState(weaknesses[0]);
  const [recommended, setRecommended] = useState(false);
  const [started, setStarted] = useState(false);

  const generateRecommendation = () => {
    setRecommended(true);
  };

  const startPractice = () => {
    setStarted(true);
  };

  const selectedMode = practiceModes.find(
    (mode) => mode.name === selectedWeakness.recommended
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
            AI Practice Mode Recommender
          </h1>

          <p className="text-gray-500">
            Get personalized practice recommendations based on your current
            weaknesses.
          </p>

        </div>

      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Personalized Practice Overview
            </h2>

            <p className="text-sm text-gray-500">
              AI matches weaknesses with the practice mode most likely to
              address them.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Weaknesses Analyzed
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              8
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              High Priority
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              3
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Practice Modes
            </p>

            <p className="text-3xl font-black text-purple-600 mt-1">
              5
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Recommendation Fit
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              92%
            </p>

          </div>

        </div>

      </div>

      {/* Weakness Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Current Weaknesses
            </h2>

            <p className="text-sm text-gray-500">
              Select a weakness to receive a targeted practice recommendation.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {weaknesses.map((weakness) => {

            const selected =
              selectedWeakness.name === weakness.name;

            return (
              <button
                type="button"
                key={weakness.name}
                onClick={() => {
                  setSelectedWeakness(weakness);
                  setRecommended(false);
                  setStarted(false);
                }}
                className={`text-left border rounded-2xl p-5 transition ${
                  selected
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-3">

                  <h3 className="font-bold">
                    {weakness.name}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      weakness.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {weakness.severity}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {weakness.issue}
                </p>

                <div className="flex items-center gap-2 mt-4 text-indigo-600 text-sm font-semibold">

                  <Sparkles size={16} />

                  Suggested:
                  {weakness.recommended}

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Current Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <div className="p-4 bg-white rounded-2xl">

            <Brain
              className="text-indigo-600"
              size={32}
            />

          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Selected Weakness
            </p>

            <h2 className="text-2xl font-black text-indigo-700">
              {selectedWeakness.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedWeakness.issue}
            </p>

          </div>

        </div>

      </div>

      {/* Recommendation Button */}
      {!recommended && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex items-center gap-4">

            <Sparkles
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <h2 className="font-bold text-lg">
                Find the Best Practice Mode
              </h2>

              <p className="text-sm text-gray-500">
                AI will match your selected weakness with the most appropriate
                practice activity.
              </p>

            </div>

            <button
              type="button"
              onClick={generateRecommendation}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Generate Recommendation
            </button>

          </div>

        </div>
      )}

      {recommended && selectedMode && (
        <>
          {/* Main Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-4 bg-white rounded-2xl">

                {React.createElement(selectedMode.icon, {
                  className: "text-green-600",
                  size: 32,
                })}

              </div>

              <div className="flex-1">

                <p className="text-xs font-bold text-green-600">
                  AI RECOMMENDATION
                </p>

                <h2 className="text-3xl font-black text-green-700 mt-1">
                  {selectedMode.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {selectedMode.reason}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  <span className="px-3 py-1 rounded-full bg-white text-green-700 text-sm font-semibold">
                    Best Match
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white text-gray-600 text-sm">
                    Target: {selectedMode.target}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white text-gray-600 text-sm">
                    92% Fit
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Why This Mode */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Why AI Recommended This Mode
                </h2>

                <p className="text-sm text-gray-500">
                  The recommendation is based on your observed performance
                  pattern.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <Target className="text-indigo-600" />

                  <div>

                    <h3 className="font-bold">
                      Detected Weakness
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {selectedWeakness.issue}
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <Brain className="text-purple-600" />

                  <div>

                    <h3 className="font-bold">
                      Practice-Mismatch Detected
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Your recent activities do not directly target the main
                      cause of this weakness.
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <CheckCircle2 className="text-green-600" />

                  <div>

                    <h3 className="font-bold">
                      Expected Benefit
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      This mode directly trains the skill responsible for the
                      detected weakness.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Mode Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Practice Mode Comparison
                </h2>

                <p className="text-sm text-gray-500">
                  See why one practice mode is prioritized over the others.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {practiceModes.map((mode) => {

                const Icon = mode.icon;
                const isRecommended =
                  mode.name === selectedMode.name;

                return (
                  <div
                    key={mode.name}
                    className={`border rounded-xl p-5 ${
                      isRecommended
                        ? "border-indigo-500 bg-indigo-50"
                        : ""
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="p-3 bg-white rounded-xl">

                        <Icon
                          className="text-indigo-600"
                          size={22}
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex items-center gap-3">

                          <h3 className="font-bold">
                            {mode.name}
                          </h3>

                          {isRecommended && (
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                              Recommended
                            </span>
                          )}

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {mode.reason}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-xs text-gray-500">
                          Match
                        </p>

                        <p
                          className={`text-xl font-black ${
                            isRecommended
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {isRecommended ? "92%" : "—"}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Practice Plan */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Personalized Practice Plan
                </h2>

                <p className="text-sm text-gray-500">
                  AI-generated plan for addressing your current weakness.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  Step 1
                </p>

                <h3 className="font-bold mt-2">
                  Warm-up
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Complete one low-difficulty activity.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  Step 2
                </p>

                <h3 className="font-bold mt-2">
                  Targeted Practice
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Complete three exercises focused on the weakness.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  Step 3
                </p>

                <h3 className="font-bold mt-2">
                  Reflection
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Review mistakes and identify improvement areas.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  Step 4
                </p>

                <h3 className="font-bold mt-2">
                  Reassessment
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Measure whether the weakness has improved.
                </p>

              </div>

            </div>

          </div>

          {/* Start Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl">

                {React.createElement(selectedMode.icon, {
                  className: "text-indigo-600",
                  size: 28,
                })}

              </div>

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Ready to Practice?
                </h2>

                <p className="text-gray-600 mt-1">
                  Start a personalized {selectedMode.name.toLowerCase()}{" "}
                  session targeting your {selectedWeakness.name.toLowerCase()}{" "}
                  weakness.
                </p>

                <button
                  type="button"
                  onClick={startPractice}
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Recommended Practice
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

          {started && (
            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <CheckCircle2
                  className="text-green-600"
                  size={28}
                />

                <div>

                  <h2 className="font-bold text-green-700">
                    Practice Session Started
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Your session is configured for{" "}
                    <strong>{selectedMode.name}</strong> and will focus on
                    improving{" "}
                    <strong>{selectedWeakness.name}</strong>.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Recommendation Rules */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Practice Recommendation Rules
                </h2>

                <p className="text-sm text-gray-500">
                  Different weaknesses require different forms of practice.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Clock3 className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Speed Problems
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Recommend timed practice when the candidate regularly
                  exceeds expected solution time.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <RotateCcw className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Retention Problems
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Recommend recall exercises when previously learned concepts
                  are frequently forgotten.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Lightbulb className="text-yellow-600" />

                <h3 className="font-bold mt-3">
                  Knowledge Gaps
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Recommend concept challenges and guided explanations when
                  fundamentals are missing.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Mic2 className="text-blue-600" />

                <h3 className="font-bold mt-3">
                  Communication Problems
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Recommend mock interviews when technical understanding is
                  stronger than verbal explanation.
                </p>

              </div>

            </div>

          </div>

          {/* Final Insight */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Personalized practice should change as the user's weakness
                  changes. Once performance improves, AI can automatically
                  reduce the current mode and recommend another activity that
                  addresses the next highest-impact weakness.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}