import React, { useState } from "react";
import {
  Brain,
  Layers,
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const sources = [
  {
    name: "LeetCode",
    percentage: 46,
    questions: 92,
    styles: "Coding",
    risk: "High",
  },
  {
    name: "HackerRank",
    percentage: 21,
    questions: 42,
    styles: "Coding",
    risk: "Low",
  },
  {
    name: "InterviewBit",
    percentage: 15,
    questions: 30,
    styles: "Coding",
    risk: "Low",
  },
  {
    name: "Mock Interviews",
    percentage: 10,
    questions: 20,
    styles: "Interview",
    risk: "Low",
  },
  {
    name: "Learning Resources",
    percentage: 8,
    questions: 16,
    styles: "Conceptual",
    risk: "Low",
  },
];

const formats = [
  { name: "Coding Problems", value: 48 },
  { name: "Conceptual Questions", value: 18 },
  { name: "Debugging", value: 12 },
  { name: "System Design", value: 10 },
  { name: "Behavioral", value: 7 },
  { name: "Scenario Based", value: 5 },
];

const diversityFactors = [
  {
    name: "Question Sources",
    score: 61,
    description:
      "Multiple sources are being used, but one platform accounts for nearly half of practice.",
  },
  {
    name: "Problem Formats",
    score: 73,
    description:
      "Several formats are covered, although scenario-based practice is limited.",
  },
  {
    name: "Topic Distribution",
    score: 81,
    description:
      "Preparation covers a reasonably broad range of technical topics.",
  },
  {
    name: "Learning Resources",
    score: 66,
    description:
      "Conceptual resources are used less frequently than coding platforms.",
  },
  {
    name: "Interview Style Diversity",
    score: 58,
    description:
      "More realistic interview-style and open-ended questions would improve adaptability.",
  },
];

const recommendations = [
  {
    title: "Reduce Single-Source Dependence",
    reason:
      "46% of practice currently comes from one source.",
    action:
      "Move approximately 10–15% of future practice toward alternative sources.",
  },
  {
    title: "Increase Scenario-Based Practice",
    reason:
      "Scenario questions currently represent only a small portion of preparation.",
    action:
      "Add debugging, system-design, and changing-requirement scenarios.",
  },
  {
    title: "Add More Interview-Style Questions",
    reason:
      "Platform-specific coding patterns may not fully represent real interviews.",
    action:
      "Mix open-ended questions, follow-ups, and ambiguous problem statements.",
  },
];

const analysisFlow = [
  {
    title: "Collect Sources",
    description: "Track where preparation activities originate.",
  },
  {
    title: "Classify",
    description: "Group questions by style and format.",
  },
  {
    title: "Measure",
    description: "Calculate source and format distribution.",
  },
  {
    title: "Detect Bias",
    description: "Identify over-reliance patterns.",
  },
  {
    title: "Recommend",
    description: "Suggest targeted diversity improvements.",
  },
];

export default function AIInterviewPreparationPracticeSourceDiversityAnalyzer() {
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [showSources, setShowSources] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const diversityScore = 68;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Practice Source Diversity Analyzer
          </h1>

          <p className="text-gray-500">
            Analyze whether your interview preparation includes enough
            variety across sources, formats, topics, and question styles.
          </p>
        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">
              <p className="text-3xl font-black text-indigo-700">
                {diversityScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>
            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PRACTICE DIVERSITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Moderate Diversity
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation covers several sources, but there is noticeable
              dependence on one question platform and limited scenario-based
              practice.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Layers className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Sources Used
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Dominant Source
            </p>

            <p className="text-3xl font-black text-orange-600">
              46%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Formats Covered
            </p>

            <p className="text-3xl font-black text-green-600">
              6
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Target className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Diversity Score
            </p>

            <p className="text-3xl font-black text-purple-600">
              {diversityScore}%
            </p>
          </div>

        </div>

      </div>

      {/* Source Distribution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Practice Source Distribution
              </h2>

              <p className="text-sm text-gray-500">
                Identify whether one source is dominating preparation.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSources(!showSources)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSources ? "Hide Sources" : "Show Sources"}
          </button>

        </div>

        {showSources && (
          <div className="space-y-4 mt-6">

            {sources.map((source) => (

              <button
                type="button"
                key={source.name}
                onClick={() => setSelectedSource(source)}
                className={`w-full text-left border rounded-xl p-5 transition ${
                  selectedSource.name === source.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>
                    <h3 className="font-bold">
                      {source.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {source.questions} activities · {source.styles}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                      source.risk === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {source.risk} Dependence
                  </span>

                </div>

                <div className="flex items-center gap-4 mt-4">

                  <div className="flex-1 h-3 bg-gray-200 rounded-full">

                    <div
                      className={`h-full rounded-full ${
                        source.risk === "High"
                          ? "bg-orange-500"
                          : "bg-indigo-500"
                      }`}
                      style={{
                        width: `${source.percentage * 2}%`,
                      }}
                    />

                  </div>

                  <span className="font-black text-indigo-600">
                    {source.percentage}%
                  </span>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Source */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <BookOpen
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED SOURCE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedSource.name}
            </h2>

            <p className="text-gray-600 mt-2">
              This source represents{" "}
              <strong>{selectedSource.percentage}%</strong> of your tracked
              preparation. The AI considers this a{" "}
              <strong>{selectedSource.risk.toLowerCase()}</strong> level of
              source dependence.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  ACTIVITIES
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedSource.questions}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  SHARE
                </p>

                <p className="text-3xl font-black mt-1">
                  {selectedSource.percentage}%
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  DEPENDENCE
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedSource.risk}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Format Distribution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Layers className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Question Format Diversity
              </h2>

              <p className="text-sm text-gray-500">
                Measure how varied the actual practice experience is.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFormats(!showFormats)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFormats ? "Hide Formats" : "Show Formats"}
          </button>

        </div>

        {showFormats && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {formats.map((format) => (

              <div
                key={format.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {format.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {format.value}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${format.value * 2}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Diversity Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Diversity Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to calculate the practice diversity score.
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
          <div className="space-y-4 mt-6">

            {diversityFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}/100
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
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

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                AI Diversity Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Actions to reduce familiarity bias and broaden interview
                preparation.
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

            {recommendations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {item.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Diversity Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                Convert preparation history into actionable diversity insights.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFlow(!showFlow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFlow ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showFlow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {analysisFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[155px]">

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

                {index < analysisFlow.length - 1 && (
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Practice Diversity
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
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
                Practice diversity analysis generated successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can aggregate question sources,
                learning resources, formats, and topic distribution to detect
                source dependence and recommend broader preparation.
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
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Practice variety matters more than raw question count.
            </h2>

            <p className="text-gray-600 mt-2">
              Repeating one platform can improve familiarity with its patterns
              without necessarily improving adaptability. A diverse preparation
              mix exposes candidates to different problem styles, formats,
              assumptions, and interview expectations.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}