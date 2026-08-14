import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const skills = [
  {
    skill: "Algorithms",
    confidence: 82,
    performance: 76,
    difficulty: 78,
    improvement: 12,
    mistakes: 18,
    status: "Slight Overconfidence",
  },
  {
    skill: "Data Structures",
    confidence: 74,
    performance: 81,
    difficulty: 79,
    improvement: 16,
    mistakes: 12,
    status: "Underconfidence",
  },
  {
    skill: "System Design",
    confidence: 58,
    performance: 61,
    difficulty: 55,
    improvement: 9,
    mistakes: 24,
    status: "Aligned",
  },
  {
    skill: "Technical Communication",
    confidence: 67,
    performance: 49,
    difficulty: 52,
    improvement: 5,
    mistakes: 31,
    status: "Overconfidence",
  },
  {
    skill: "Behavioral",
    confidence: 63,
    performance: 71,
    difficulty: 68,
    improvement: 14,
    mistakes: 14,
    status: "Underconfidence",
  },
];

const trendData = [
  {
    period: "Week 1",
    confidence: 48,
    performance: 44,
  },
  {
    period: "Week 2",
    confidence: 56,
    performance: 51,
  },
  {
    period: "Week 3",
    confidence: 67,
    performance: 62,
  },
  {
    period: "Week 4",
    confidence: 72,
    performance: 68,
  },
  {
    period: "Week 5",
    confidence: 76,
    performance: 71,
  },
];

const insights = [
  {
    title: "Technical Communication Gap",
    type: "Overconfidence",
    message:
      "Confidence is 18 points above demonstrated performance. Focus on clearer explanations and follow-up handling.",
    action:
      "Complete communication-focused mock interviews and review unclear responses.",
  },
  {
    title: "Data Structures Confidence Gap",
    type: "Underconfidence",
    message:
      "Performance is 7 points above self-reported confidence. Your recent results suggest stronger ability than you perceive.",
    action:
      "Review successful attempts and gradually increase problem difficulty.",
  },
  {
    title: "Algorithms Alignment",
    type: "Slight Overconfidence",
    message:
      "Confidence is moderately higher than performance, with recurring mistakes still appearing.",
    action:
      "Practice timed algorithm questions and analyze recurring mistakes.",
  },
];

const analysisFlow = [
  {
    title: "Self Confidence",
    description: "Collect the candidate's confidence rating.",
  },
  {
    title: "Performance",
    description: "Measure actual skill performance.",
  },
  {
    title: "Difficulty",
    description: "Account for the difficulty handled.",
  },
  {
    title: "Mistakes",
    description: "Analyze recurring errors.",
  },
  {
    title: "Compare",
    description: "Identify perception-performance gaps.",
  },
  {
    title: "Trend",
    description: "Track changes over time.",
  },
];

export default function AIInterviewPreparationSkillConfidenceTrend() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [showTrend, setShowTrend] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overconfident = skills.filter(
    (skill) =>
      skill.confidence - skill.performance >= 10
  ).length;

  const underconfident = skills.filter(
    (skill) =>
      skill.performance - skill.confidence >= 7
  ).length;

  const aligned = skills.filter(
    (skill) =>
      Math.abs(skill.confidence - skill.performance) < 7
  ).length;

  const averageConfidence = Math.round(
    skills.reduce(
      (sum, skill) => sum + skill.confidence,
      0
    ) / skills.length
  );

  const averagePerformance = Math.round(
    skills.reduce(
      (sum, skill) => sum + skill.performance,
      0
    ) / skills.length
  );

  const averageGap =
    averageConfidence - averagePerformance;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Skill Confidence Trend
          </h1>

          <p className="text-gray-500">
            Compare how confident you feel with how you actually perform
            across interview skills.
          </p>

        </div>

      </div>

      {/* Main Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {Math.abs(averageGap)}
              </p>

              <p className="text-xs text-gray-500">
                point gap
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PERCEPTION VS PERFORMANCE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">

              {averageGap > 5
                ? "Confidence is ahead of demonstrated performance."
                : averageGap < -5
                ? "Performance is ahead of confidence."
                : "Confidence and performance are well aligned."}

            </h2>

            <p className="text-gray-600 mt-2">
              The AI compares self-reported confidence with measurable
              performance, difficulty handled, improvement, and mistake
              frequency.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Avg. Confidence
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {averageConfidence}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <BarChart3
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Avg. Performance
            </p>

            <p className="text-3xl font-black text-green-600">
              {averagePerformance}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <TrendingUp
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overconfident Skills
            </p>

            <p className="text-3xl font-black text-orange-600">
              {overconfident}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <TrendingDown
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Underconfident Skills
            </p>

            <p className="text-3xl font-black text-purple-600">
              {underconfident}
            </p>

          </div>

        </div>

      </div>

      {/* Skill Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Confidence vs Performance
            </h2>

            <p className="text-sm text-gray-500">
              Select a skill to inspect its perception-performance gap.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {skills.map((skill) => {

            const gap =
              skill.confidence - skill.performance;

            return (
              <button
                type="button"
                key={skill.skill}
                onClick={() => setSelectedSkill(skill)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedSkill.skill === skill.skill
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  {gap >= 10 ? (
                    <TrendingUp
                      className="text-orange-600"
                      size={25}
                    />
                  ) : gap <= -7 ? (
                    <TrendingDown
                      className="text-blue-600"
                      size={25}
                    />
                  ) : (
                    <CheckCircle2
                      className="text-green-600"
                      size={25}
                    />
                  )}

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {skill.skill}
                      </h3>

                      <span
                        className={`text-xs font-semibold ${
                          gap >= 10
                            ? "text-orange-600"
                            : gap <= -7
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {gap > 0 ? "+" : ""}
                        {gap} pts
                      </span>

                    </div>

                    {/* Confidence */}
                    <div className="mt-4">

                      <div className="flex justify-between text-xs mb-1">

                        <span>
                          Confidence
                        </span>

                        <span>
                          {skill.confidence}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${skill.confidence}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Performance */}
                    <div className="mt-3">

                      <div className="flex justify-between text-xs mb-1">

                        <span>
                          Performance
                        </span>

                        <span>
                          {skill.performance}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${skill.performance}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      skill.status === "Overconfidence" ||
                      skill.status === "Slight Overconfidence"
                        ? "bg-orange-100 text-orange-700"
                        : skill.status === "Underconfidence"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {skill.status}
                  </span>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Selected Skill */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SKILL CONFIDENCE ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedSkill.skill}
            </h2>

            <div className="grid md:grid-cols-5 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  CONFIDENCE
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-1">
                  {selectedSkill.confidence}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  PERFORMANCE
                </p>

                <p className="text-2xl font-black text-green-600 mt-1">
                  {selectedSkill.performance}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>

                <p className="text-2xl font-black text-purple-600 mt-1">
                  {selectedSkill.difficulty}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  IMPROVEMENT
                </p>

                <p className="text-2xl font-black text-blue-600 mt-1">
                  +{selectedSkill.improvement}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  MISTAKES
                </p>

                <p className="text-2xl font-black text-red-600 mt-1">
                  {selectedSkill.mistakes}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Interpretation */}
      <div
        className={`rounded-2xl p-6 ${
          selectedSkill.confidence -
            selectedSkill.performance >=
          10
            ? "bg-orange-50"
            : selectedSkill.performance -
                selectedSkill.confidence >=
              7
            ? "bg-blue-50"
            : "bg-green-50"
        }`}
      >

        <div className="flex gap-4">

          {selectedSkill.confidence -
            selectedSkill.performance >=
          10 ? (
            <TrendingUp
              className="text-orange-600"
              size={30}
            />
          ) : selectedSkill.performance -
              selectedSkill.confidence >=
            7 ? (
            <TrendingDown
              className="text-blue-600"
              size={30}
            />
          ) : (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          )}

          <div>

            <p className="text-xs font-bold">
              AI INTERPRETATION
            </p>

            <h2 className="text-xl font-bold mt-1">

              {selectedSkill.status}

            </h2>

            <p className="text-gray-600 mt-2">

              {selectedSkill.confidence -
                selectedSkill.performance >=
              10
                ? "Your confidence is noticeably higher than demonstrated performance. Use recent mistakes and difficult questions as evidence for where additional practice is needed."
                : selectedSkill.performance -
                    selectedSkill.confidence >=
                  7
                ? "Your demonstrated performance is stronger than your confidence suggests. Review successful attempts and gradually increase difficulty to build evidence-based confidence."
                : "Your confidence and demonstrated performance are reasonably aligned. Continue monitoring both as question difficulty increases."}

            </p>

          </div>

        </div>

      </div>

      {/* Trend */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Confidence & Performance Trend
              </h2>

              <p className="text-sm text-gray-500">
                Track whether confidence and actual ability are moving
                together.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTrend(!showTrend)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTrend ? "Hide Trend" : "Show Trend"}
          </button>

        </div>

        {showTrend && (
          <div className="space-y-5 mt-6">

            {trendData.map((item) => (

              <div
                key={item.period}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {item.period}
                  </h3>

                  <span className="text-xs text-gray-500">
                    Gap: {item.confidence - item.performance} pts
                  </span>

                </div>

                <div className="mt-4">

                  <div className="flex justify-between text-xs">
                    <span>Confidence</span>
                    <span>{item.confidence}%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">

                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${item.confidence}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="mt-3">

                  <div className="flex justify-between text-xs">
                    <span>Performance</span>
                    <span>{item.performance}%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${item.performance}%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Confidence Insights
              </h2>

              <p className="text-sm text-gray-500">
                Identify perception gaps that can affect preparation
                decisions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowInsights(!showInsights)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showInsights ? "Hide Insights" : "Show Insights"}
          </button>

        </div>

        {showInsights && (
          <div className="space-y-4 mt-6">

            {insights.map((insight, index) => (

              <div
                key={insight.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="font-bold">
                        {insight.title}
                      </h3>

                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          insight.type === "Overconfidence"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {insight.type}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {insight.message}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {insight.action}
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

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Confidence Analysis Flow
            </h2>

            <p className="text-sm text-gray-500">
              Confidence is evaluated alongside actual evidence rather than
              treated as a standalone score.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Self Confidence",
            "Performance",
            "Difficulty",
            "Mistake Frequency",
            "Compare",
            "Detect Gap",
            "Track Trend",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {step}
              </span>

              {index < array.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Confidence Trend
          <ArrowRight size={18} />
        </button>

      </div>

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
                Confidence-performance analysis completed.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can combine self-reported
                confidence with assessment results, question difficulty,
                improvement, and mistake frequency to calculate meaningful
                skill confidence trends.
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
              Confidence should be supported by evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not simply to increase confidence. The system should
              help candidates build confidence that matches their demonstrated
              ability while identifying areas where either perception or
              performance needs attention.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}