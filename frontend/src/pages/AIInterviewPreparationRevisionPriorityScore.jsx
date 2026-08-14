import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  CalendarDays,
} from "lucide-react";

const topics = [
  {
    name: "System Design",
    performance: 62,
    errors: 8,
    daysSinceRevision: 9,
    importance: 95,
    mastery: 64,
    urgency: 91,
    trend: "up",
    recommendation: "Revise scalability, reliability, and trade-offs.",
  },
  {
    name: "Data Structures",
    performance: 78,
    errors: 5,
    daysSinceRevision: 6,
    importance: 90,
    mastery: 81,
    urgency: 73,
    trend: "down",
    recommendation: "Practice trees, graphs, and hash-based structures.",
  },
  {
    name: "Algorithms",
    performance: 84,
    errors: 3,
    daysSinceRevision: 4,
    importance: 92,
    mastery: 86,
    urgency: 57,
    trend: "down",
    recommendation: "Review complexity and optimization patterns.",
  },
  {
    name: "Behavioral Questions",
    performance: 69,
    errors: 4,
    daysSinceRevision: 12,
    importance: 75,
    mastery: 70,
    urgency: 82,
    trend: "up",
    recommendation: "Practice STAR-based behavioral responses.",
  },
  {
    name: "Database Concepts",
    performance: 88,
    errors: 2,
    daysSinceRevision: 3,
    importance: 82,
    mastery: 90,
    urgency: 42,
    trend: "down",
    recommendation: "Maintain with short periodic revision.",
  },
];

const factors = [
  {
    name: "Recent Performance",
    value: 62,
    weight: "25%",
  },
  {
    name: "Error Frequency",
    value: 78,
    weight: "20%",
  },
  {
    name: "Revision Recency",
    value: 81,
    weight: "15%",
  },
  {
    name: "Topic Importance",
    value: 95,
    weight: "20%",
  },
  {
    name: "Current Mastery",
    value: 64,
    weight: "10%",
  },
  {
    name: "Interview Timeline",
    value: 90,
    weight: "10%",
  },
];

export default function AIInterviewPreparationRevisionPriorityScore() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showFactors, setShowFactors] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const highestPriority = [...topics].sort(
    (a, b) => b.urgency - a.urgency
  )[0];

  const averageUrgency = Math.round(
    topics.reduce((sum, topic) => sum + topic.urgency, 0) /
      topics.length
  );

  const urgentTopics = topics.filter(
    (topic) => topic.urgency >= 80
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Revision Priority Score
          </h1>

          <p className="text-gray-500">
            Discover which interview topics need revision first based on your
            preparation history and upcoming interview.
          </p>
        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI PRIORITY INSIGHT
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {highestPriority.name} should be revised first.
            </h2>

            <p className="text-gray-600 mt-2">
              Its revision priority score is{" "}
              <strong>{highestPriority.urgency}/100</strong>, driven by recent
              performance, repeated errors, topic importance, and time since
              the last revision.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Average Priority
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              {averageUrgency}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Urgent Topics
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              {urgentTopics}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Topics Analyzed
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {topics.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Highest Priority
            </p>

            <p className="text-lg font-black text-green-600 mt-1">
              {highestPriority.urgency}/100
            </p>

          </div>

        </div>

      </div>

      {/* Priority Ranking */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Topic Revision Ranking
            </h2>

            <p className="text-sm text-gray-500">
              Higher scores indicate greater revision urgency.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {[...topics]
            .sort((a, b) => b.urgency - a.urgency)
            .map((topic, index) => (

              <button
                type="button"
                key={topic.name}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedTopic?.name === topic.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {topic.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {topic.recommendation}
                    </p>

                  </div>

                  <div className="text-right">

                    <p
                      className={`text-2xl font-black ${
                        topic.urgency >= 80
                          ? "text-red-600"
                          : topic.urgency >= 60
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {topic.urgency}
                    </p>

                    <p className="text-xs text-gray-500">
                      priority
                    </p>

                  </div>

                  {topic.trend === "up" ? (
                    <ArrowUp
                      className="text-red-600"
                      size={22}
                    />
                  ) : (
                    <ArrowDown
                      className="text-green-600"
                      size={22}
                    />
                  )}

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-5">

                  <div
                    className={`h-full rounded-full ${
                      topic.urgency >= 80
                        ? "bg-red-500"
                        : topic.urgency >= 60
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${topic.urgency}%`,
                    }}
                  />

                </div>

              </button>
            ))}

        </div>

      </div>

      {/* Selected Topic */}
      {selectedTopic && (
        <div className="bg-orange-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <AlertTriangle
              className="text-orange-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-orange-600">
                REVISION PRIORITY ANALYSIS
              </p>

              <h2 className="text-2xl font-black text-orange-800 mt-1">
                {selectedTopic.name}
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mt-5">

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    PRIORITY SCORE
                  </p>

                  <p className="text-2xl font-black text-red-600 mt-1">
                    {selectedTopic.urgency}/100
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    CURRENT MASTERY
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-1">
                    {selectedTopic.mastery}%
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    DAYS SINCE REVISION
                  </p>

                  <p className="text-2xl font-black text-orange-600 mt-1">
                    {selectedTopic.daysSinceRevision}
                  </p>

                </div>

              </div>

              <div className="mt-5 bg-white rounded-xl p-5">

                <div className="flex gap-3">

                  <Lightbulb
                    className="text-indigo-600"
                    size={22}
                  />

                  <div>

                    <p className="text-xs font-bold text-indigo-600">
                      AI RECOMMENDATION
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {selectedTopic.recommendation}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Score Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3Icon />

            <div>

              <h2 className="font-bold text-lg">
                Priority Score Factors
              </h2>

              <p className="text-sm text-gray-500">
                AI combines multiple preparation signals instead of using only
                the lowest score.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors
              ? "Hide Factors"
              : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {factors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-xl p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <p className="font-bold">
                        {factor.name}
                      </p>

                      <span className="text-sm text-gray-500">
                        Weight: {factor.weight}
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-3">

                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{
                          width: `${factor.value}%`,
                        }}
                      />

                    </div>

                  </div>

                  <p className="text-xl font-black text-indigo-600">
                    {factor.value}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Timeline Impact
            </h2>

            <p className="text-sm text-gray-500">
              Revision urgency increases when an interview is approaching.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <Clock className="text-green-600" />

            <h3 className="font-bold mt-3">
              More Than 14 Days
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Lower urgency. Use regular revision cycles.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Clock className="text-orange-600" />

            <h3 className="font-bold mt-3">
              7–14 Days
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Increase focus on important weak topics.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Clock className="text-red-600" />

            <h3 className="font-bold mt-3">
              Less Than 7 Days
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Prioritize high-impact topics with recent mistakes.
            </p>

          </div>

        </div>

      </div>

      {/* Revision Plan */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI REVISION PLAN
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Focus your next revision session on System Design.
            </h2>

            <p className="text-gray-600 mt-2">
              Its combination of high role importance, lower recent performance,
              repeated mistakes, and time since revision makes it the
              highest-impact topic right now.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3 mt-5">

          {[
            "Review Core Concepts",
            "Practice 3 Questions",
            "Review Recent Mistakes",
            "Complete Mini Assessment",
          ].map((action) => (

            <button
              type="button"
              key={action}
              className="px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold text-sm"
            >
              {action}
            </button>

          ))}

        </div>

      </div>

      {/* Scoring Principle */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              How AI Determines Priority
            </h2>

            <p className="text-sm text-gray-500">
              A topic is not automatically urgent just because its score is
              low.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Performance",
            "Error Frequency",
            "Revision Gap",
            "Importance",
            "Mastery",
            "Interview Timeline",
            "Priority Score",
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

      {/* Final Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Do not revise topics only because they have the lowest score.
              Prioritize topics where weakness, repeated mistakes, importance,
              revision recency, and interview timing combine to create the
              greatest preparation risk.
            </p>

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setRefreshed(true)}
          className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
        >
          <TrendingUp size={18} />
          Recalculate Priority
        </button>

      </div>

      {refreshed && (
        <div className="bg-green-50 rounded-xl p-4">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-green-700">
              Revision priority scores have been recalculated using the latest
              preparation signals.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

function BarChart3Icon() {
  return (
    <div className="text-indigo-600">
      <BarChart3 size={24} />
    </div>
  );
}