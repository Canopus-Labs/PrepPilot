import React, { useState } from "react";
import {
  Brain,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Target,
  Lightbulb,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const abstractionLevels = [
  {
    level: "High-Level",
    description: "Architecture, components, responsibilities, and major trade-offs.",
    score: 92,
  },
  {
    level: "Mid-Level",
    description: "Component interactions, APIs, data flow, and design decisions.",
    score: 84,
  },
  {
    level: "Implementation",
    description: "Algorithms, classes, functions, data structures, and code details.",
    score: 76,
  },
];

const detectedSections = [
  {
    section: "Architecture Overview",
    expected: "High-Level",
    actual: "High-Level",
    status: "Aligned",
    score: 94,
    feedback:
      "The explanation clearly describes the major components without unnecessary implementation details.",
  },
  {
    section: "Database Selection",
    expected: "Mid-Level",
    actual: "Implementation",
    status: "Too Detailed",
    score: 58,
    feedback:
      "The answer spends too much time discussing query syntax and indexing internals instead of explaining why the database fits the requirements.",
  },
  {
    section: "Caching Strategy",
    expected: "Mid-Level",
    actual: "High-Level",
    status: "Too Abstract",
    score: 63,
    feedback:
      "The candidate mentions caching but does not explain cache invalidation, consistency, or where the cache sits in the request flow.",
  },
  {
    section: "Request Handling",
    expected: "Mid-Level",
    actual: "Mid-Level",
    status: "Aligned",
    score: 88,
    feedback:
      "The explanation provides enough detail about the request flow while avoiding unnecessary code-level discussion.",
  },
];

const recommendations = [
  {
    title: "Reduce Database Implementation Detail",
    reason:
      "The interviewer needs the reasoning behind the database choice rather than SQL-level implementation details.",
    action:
      "Explain workload, consistency, query patterns, and scalability before discussing indexes.",
  },
  {
    title: "Add Depth to Caching Explanation",
    reason:
      "The current explanation does not establish how caching interacts with the request flow.",
    action:
      "Explain cache placement, invalidation, consistency, and the expected performance benefit.",
  },
];

const flow = [
  {
    title: "Question Context",
    description: "Determine what the interviewer is asking for.",
  },
  {
    title: "Expected Depth",
    description: "Identify the appropriate abstraction level.",
  },
  {
    title: "Answer Analysis",
    description: "Analyze the candidate's explanation.",
  },
  {
    title: "Alignment",
    description: "Compare expected and actual depth.",
  },
  {
    title: "Coaching",
    description: "Recommend how to adjust the explanation.",
  },
];

export default function AIInterviewAnswerTechnicalAbstractionLevelCoach() {
  const [selectedSection, setSelectedSection] = useState(
    detectedSections[0]
  );
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);

  const aligned = detectedSections.filter(
    (item) => item.status === "Aligned"
  ).length;

  const misaligned = detectedSections.filter(
    (item) => item.status !== "Aligned"
  ).length;

  const alignmentScore = Math.round(
    detectedSections.reduce(
      (sum, item) => sum + item.score,
      0
    ) / detectedSections.length
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
            AI Technical Abstraction Level Coach
          </h1>

          <p className="text-gray-500">
            Learn how much technical detail to provide based on the question,
            context, and interviewer expectations.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {alignmentScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ABSTRACTION ALIGNMENT SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {alignmentScore >= 85
                ? "Excellent Explanation Depth"
                : alignmentScore >= 70
                ? "Mostly Well Calibrated"
                : "Adjust Explanation Depth"}
            </h2>

            <p className="text-gray-600 mt-2">
              The AI checks whether each part of your explanation contains
              enough detail without going unnecessarily deep.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Layers
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Expected Levels
            </p>

            <p className="text-3xl font-black text-indigo-600">
              3
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Aligned Sections
            </p>

            <p className="text-3xl font-black text-green-600">
              {aligned}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Misaligned
            </p>

            <p className="text-3xl font-black text-orange-600">
              {misaligned}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Alignment
            </p>

            <p className="text-3xl font-black text-purple-600">
              {alignmentScore}%
            </p>

          </div>

        </div>

      </div>

      {/* Expected Abstraction Levels */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Layers className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Abstraction Levels
              </h2>

              <p className="text-sm text-gray-500">
                Different interview questions require different explanation
                depths.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowLevels(!showLevels)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showLevels ? "Hide Levels" : "Show Levels"}
          </button>

        </div>

        {showLevels && (
          <div className="space-y-4 mt-6">

            {abstractionLevels.map((level, index) => (

              <div
                key={level.level}
                className="border rounded-2xl p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {level.level}
                      </h3>

                      <span className="text-indigo-600 font-bold">
                        {level.score}%
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {level.description}
                    </p>

                    <div className="h-2 bg-gray-200 rounded-full mt-4">

                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${level.score}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Detected Sections */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Explanation Depth Analysis
            </h2>

            <p className="text-sm text-gray-500">
              AI compares the expected abstraction level with the level used
              in each part of your answer.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {detectedSections.map((section) => (

            <button
              type="button"
              key={section.section}
              onClick={() => setSelectedSection(section)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedSection.section === section.section
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {section.status === "Aligned" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={25}
                  />
                ) : section.status === "Too Detailed" ? (
                  <ArrowDown
                    className="text-orange-600"
                    size={25}
                  />
                ) : (
                  <ArrowUp
                    className="text-orange-600"
                    size={25}
                  />
                )}

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {section.section}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-2">

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                          Expected: {section.expected}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                          Actual: {section.actual}
                        </span>

                      </div>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        section.status === "Aligned"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {section.status}
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        section.status === "Aligned"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${section.score}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          {selectedSection.status === "Aligned" ? (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          ) : selectedSection.status === "Too Detailed" ? (
            <ArrowDown
              className="text-orange-600"
              size={30}
            />
          ) : (
            <ArrowUp
              className="text-orange-600"
              size={30}
            />
          )}

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              ABSTRACTION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedSection.section}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedSection.feedback}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  EXPECTED
                </p>

                <p className="text-xl font-black text-indigo-600 mt-2">
                  {selectedSection.expected}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  ACTUAL
                </p>

                <p className="text-xl font-black text-orange-600 mt-2">
                  {selectedSection.actual}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  ALIGNMENT
                </p>

                <p className="text-xl font-black text-green-600 mt-2">
                  {selectedSection.score}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Depth Correction */}
      {selectedSection.status !== "Aligned" && (
        <div className="bg-orange-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Lightbulb
              className="text-orange-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-orange-600">
                DEPTH ADJUSTMENT
              </p>

              <h2 className="text-xl font-bold text-orange-800 mt-1">
                {selectedSection.status === "Too Detailed"
                  ? "Move one level higher."
                  : "Move one level deeper."}
              </h2>

              <p className="text-gray-600 mt-2">

                {selectedSection.status === "Too Detailed"
                  ? "Focus on the decision, reasoning, trade-offs, and impact instead of implementation-level details."
                  : "Add the mechanism, component interaction, constraints, or concrete technical reasoning needed to make the explanation convincing."}

              </p>

            </div>

          </div>

        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Coaching Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Adjust your explanation depth where the AI detects a mismatch.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(!showRecommendations)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRecommendations
              ? "Hide Recommendations"
              : "Show Recommendations"}
          </button>

        </div>

        {showRecommendations && (
          <div className="space-y-4 mt-6">

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Practice Your Explanation
            </h2>

            <p className="text-sm text-gray-500">
              Write an answer and let the AI determine whether the explanation
              is too detailed, too abstract, or appropriately calibrated.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            EXAMPLE QUESTION
          </p>

          <h3 className="font-bold mt-2">
            "Design a scalable URL shortening service."
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Start with the architecture and major design decisions. Add
            implementation details only when they support your reasoning.
          </p>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Explain your solution at the level you think is appropriate..."
          className="w-full mt-5 min-h-[160px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Abstraction Level
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Layers className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Abstraction Analysis Flow
            </h2>

            <p className="text-sm text-gray-500">
              The system adapts feedback to the expected depth of the question.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {flow.map((step, index) => (

            <React.Fragment key={step.title}>

              <div className="border rounded-xl p-4 min-w-[150px]">

                <p className="text-xs font-bold text-indigo-600">
                  STEP {index + 1}
                </p>

                <h3 className="font-bold mt-1">
                  {step.title}
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                  {step.description}
                </p>

              </div>

              {index < flow.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Complete */}
      {analyzed && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Abstraction-level analysis completed.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can send the question and
                candidate answer to the AI evaluator to determine the expected
                depth and generate section-specific coaching.
              </p>

            </div>

          </div>

        </div>
      )}

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
              Match the depth of your explanation to the question.
            </h2>

            <p className="text-gray-600 mt-2">
              Start at the appropriate abstraction level and move deeper when
              the interviewer asks for implementation details. This keeps
              technical explanations clear without sacrificing important
              reasoning.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}