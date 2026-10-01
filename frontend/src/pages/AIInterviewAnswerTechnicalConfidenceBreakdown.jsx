import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

const confidenceAreas = [
  {
    name: "Concept Understanding",
    score: 91,
    level: "High",
    icon: Brain,
    feedback:
      "You clearly understand the underlying concept and explain its purpose correctly.",
    action: "Continue with occasional recall practice.",
  },
  {
    name: "Approach Selection",
    score: 86,
    level: "High",
    icon: Target,
    feedback:
      "Your selected approach matches the problem requirements and constraints.",
    action: "Practice comparing alternative approaches.",
  },
  {
    name: "Implementation",
    score: 72,
    level: "Moderate",
    icon: ShieldCheck,
    feedback:
      "The implementation idea is correct, but some implementation details remain uncertain.",
    action: "Practice implementing the approach without reference material.",
  },
  {
    name: "Complexity",
    score: 61,
    level: "Moderate",
    icon: BookOpen,
    feedback:
      "You identified the main complexity but were less confident about the exact space requirements.",
    action: "Revise time and space complexity analysis.",
  },
  {
    name: "Edge Cases",
    score: 48,
    level: "Low",
    icon: AlertTriangle,
    feedback:
      "Several important boundary cases were not clearly considered.",
    action: "Practice edge-case identification before implementation.",
  },
  {
    name: "Trade-offs",
    score: 55,
    level: "Low",
    icon: Target,
    feedback:
      "The answer mentions the chosen solution but provides limited comparison with alternatives.",
    action: "Practice explaining advantages, disadvantages, and alternatives.",
  },
];

const revisionAreas = [
  {
    title: "Edge Case Reasoning",
    priority: "Critical",
    reason:
      "Your lowest confidence area is edge-case identification.",
  },
  {
    title: "Technical Trade-offs",
    priority: "High",
    reason:
      "You should become more comfortable comparing alternative approaches.",
  },
  {
    title: "Complexity Analysis",
    priority: "Medium",
    reason:
      "Strengthen confidence in both time and space complexity.",
  },
];

export default function AIInterviewAnswerTechnicalConfidenceBreakdown() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const overallConfidence = Math.round(
    confidenceAreas.reduce((sum, area) => sum + area.score, 0) /
      confidenceAreas.length
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
            AI Technical Confidence Breakdown
          </h1>

          <p className="text-gray-500">
            Discover exactly which parts of your technical answer you are
            confident or uncertain about.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how you would find the longest substring without repeating
          characters.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Strings",
            "Sliding Window",
            "Complexity",
            "Edge Cases",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Technical Answer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste your answer. AI will estimate confidence across individual
          technical dimensions.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Explain your approach, implementation, complexity, edge cases, and trade-offs..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Technical Confidence
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Confidence */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <ShieldCheck
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Overall Technical Confidence
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    {overallConfidence}%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Moderate-High
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your core understanding and approach selection are strong,
                  while edge cases and trade-off reasoning need targeted
                  revision.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${overallConfidence}%` }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Summary Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                High Confidence
              </p>

              <p className="text-3xl font-black text-green-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Moderate Confidence
              </p>

              <p className="text-3xl font-black text-orange-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Low Confidence
              </p>

              <p className="text-3xl font-black text-red-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <BookOpen className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Revision Areas
              </p>

              <p className="text-3xl font-black text-indigo-600">
                3
              </p>

            </div>

          </div>

          {/* Confidence Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Confidence Breakdown
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI evaluates confidence independently across important parts of
              a technical interview answer.
            </p>

            <div className="space-y-5 mt-6">

              {confidenceAreas.map((area, index) => {
                const Icon = area.icon;

                return (
                  <button
                    type="button"
                    key={area.name}
                    onClick={() =>
                      setSelectedArea(
                        selectedArea === index ? null : index
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>

                            <h3 className="font-bold">
                              {area.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              {area.level} confidence
                            </p>

                          </div>

                          <span
                            className={`text-lg font-black ${
                              area.score >= 80
                                ? "text-green-600"
                                : area.score >= 60
                                ? "text-orange-600"
                                : "text-red-600"
                            }`}
                          >
                            {area.score}%
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-3">

                          <div
                            className={`h-full rounded-full ${
                              area.score >= 80
                                ? "bg-green-500"
                                : area.score >= 60
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${area.score}%`,
                            }}
                          />

                        </div>

                        {selectedArea === index && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-indigo-700">
                              AI Analysis
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {area.feedback}
                            </p>

                            <div className="mt-3 flex gap-2">

                              <Lightbulb
                                size={17}
                                className="text-indigo-600"
                              />

                              <p className="text-sm text-gray-600">
                                <strong>Next:</strong> {area.action}
                              </p>

                            </div>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Confidence Heatmap */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Technical Confidence Map
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Quickly identify where confidence is strongest and where
              uncertainty may affect your interview performance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

              {confidenceAreas.map((area) => (
                <div
                  key={area.name}
                  className={`rounded-2xl p-5 ${
                    area.score >= 80
                      ? "bg-green-50"
                      : area.score >= 60
                      ? "bg-orange-50"
                      : "bg-red-50"
                  }`}
                >

                  <p className="font-semibold">
                    {area.name}
                  </p>

                  <p
                    className={`text-4xl font-black mt-3 ${
                      area.score >= 80
                        ? "text-green-600"
                        : area.score >= 60
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {area.score}%
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {area.level} confidence
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Targeted Revision */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Targeted Revision Needed
                </h2>

                <p className="text-gray-600 mt-2">
                  Instead of revising the entire topic, focus on the areas
                  where your technical confidence is lowest.
                </p>

                <div className="space-y-3 mt-5">

                  {revisionAreas.map((area, index) => (
                    <div
                      key={area.title}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >

                      <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>

                      <div className="flex-1">

                        <div className="flex justify-between">

                          <p className="font-semibold">
                            {area.title}
                          </p>

                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              area.priority === "Critical"
                                ? "bg-red-100 text-red-700"
                                : area.priority === "High"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {area.priority}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {area.reason}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Hidden Uncertainty */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Hidden Uncertainty Detection
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Areas that may appear acceptable in the overall answer but show
              weaker technical confidence when analyzed separately.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="border border-red-200 rounded-xl p-5 bg-red-50">

                <AlertTriangle className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Edge Cases
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Your main solution is correct, but the answer does not
                  demonstrate strong confidence when handling empty strings,
                  repeated characters, or very large inputs.
                </p>

              </div>

              <div className="border border-orange-200 rounded-xl p-5 bg-orange-50">

                <Target className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Trade-offs
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  You selected an efficient approach but did not clearly
                  explain why it is preferable to alternative solutions.
                </p>

              </div>

            </div>

          </div>

          {/* Strong Areas */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Your Strongest Areas
                </h2>

                <p className="text-gray-600 mt-2">
                  Your strongest confidence is in concept understanding and
                  approach selection. These areas do not require immediate
                  intensive revision.
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
                  AI Confidence Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your overall confidence is good, but it hides uncertainty in
                  edge-case reasoning and trade-off analysis. Prioritize short
                  exercises that ask you to identify failure scenarios and
                  compare your approach against alternatives. This will improve
                  confidence without requiring you to relearn the entire topic.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}