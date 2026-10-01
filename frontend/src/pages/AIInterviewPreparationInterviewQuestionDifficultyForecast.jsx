import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Gauge,
} from "lucide-react";

const difficultyData = [
  {
    level: "Easy",
    score: 94,
    accuracy: 96,
    speed: 91,
    confidence: 93,
    risk: "Low",
    color: "green",
    description:
      "The candidate consistently performs well on foundational questions.",
  },
  {
    level: "Medium",
    score: 81,
    accuracy: 84,
    speed: 78,
    confidence: 80,
    risk: "Moderate",
    color: "indigo",
    description:
      "Performance remains strong, but speed and accuracy begin to decline on multi-step problems.",
  },
  {
    level: "Hard",
    score: 58,
    accuracy: 61,
    speed: 52,
    confidence: 65,
    risk: "High",
    color: "orange",
    description:
      "Performance is likely to decline significantly when questions require deeper reasoning and multiple concepts.",
  },
];

const topicPerformance = [
  {
    topic: "Arrays & Strings",
    easy: 96,
    medium: 88,
    hard: 67,
    trend: "+8%",
  },
  {
    topic: "Data Structures",
    easy: 92,
    medium: 79,
    hard: 54,
    trend: "+5%",
  },
  {
    topic: "Algorithms",
    easy: 91,
    medium: 76,
    hard: 48,
    trend: "+3%",
  },
  {
    topic: "System Design",
    easy: 82,
    medium: 67,
    hard: 43,
    trend: "+7%",
  },
];

const difficultyFactors = [
  {
    name: "Historical Difficulty Performance",
    score: 76,
    description:
      "Previous attempts provide enough evidence to estimate the likely difficulty threshold.",
  },
  {
    name: "Topic-Specific Performance",
    score: 71,
    description:
      "Some topics show stronger performance than others at the same difficulty.",
  },
  {
    name: "Solving Speed",
    score: 64,
    description:
      "Time pressure becomes a stronger factor as question difficulty increases.",
  },
  {
    name: "Recent Improvement",
    score: 82,
    description:
      "Recent performance indicates positive improvement in medium-level questions.",
  },
  {
    name: "Error Patterns",
    score: 69,
    description:
      "Complexity mistakes and incomplete reasoning appear more frequently on hard questions.",
  },
];

const recommendations = [
  {
    title: "Increase Hard-Question Exposure",
    reason:
      "The largest predicted performance decline occurs between Medium and Hard questions.",
    action:
      "Practice a small number of hard problems regularly and focus on reasoning rather than completion speed.",
  },
  {
    title: "Strengthen Algorithmic Reasoning",
    reason:
      "Hard algorithm questions show the lowest predicted performance.",
    action:
      "Practice optimization, invariants, edge cases, and complexity analysis.",
  },
  {
    title: "Improve Speed Under Complexity",
    reason:
      "Solving speed decreases significantly as difficulty increases.",
    action:
      "Use timed medium-to-hard sessions with gradual time-pressure increases.",
  },
];

const forecastFlow = [
  {
    title: "Collect History",
    description: "Analyze previous question attempts.",
  },
  {
    title: "Analyze Difficulty",
    description: "Measure performance at each difficulty.",
  },
  {
    title: "Detect Patterns",
    description: "Identify topics and errors causing decline.",
  },
  {
    title: "Forecast",
    description: "Predict the likely performance threshold.",
  },
  {
    title: "Prepare",
    description: "Recommend targeted difficulty practice.",
  },
];

export default function AIInterviewPreparationInterviewQuestionDifficultyForecast() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficultyData[1]
  );
  const [showTopics, setShowTopics] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [forecasted, setForecasted] = useState(false);

  const overallForecast = Math.round(
    difficultyData.reduce(
      (sum, item) => sum + item.score,
      0
    ) / difficultyData.length
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
            AI Interview Question Difficulty Forecast
          </h1>

          <p className="text-gray-500">
            Predict the question difficulty where your performance is likely
            to decline and prepare specifically for that gap.
          </p>

        </div>

      </div>

      {/* Forecast Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallForecast}
              </p>

              <p className="text-xs text-gray-500">
                forecast
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PREDICTED DIFFICULTY THRESHOLD
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Medium → Hard Transition
            </h2>

            <p className="text-gray-600 mt-2">
              Your performance is expected to remain strong through Medium
              questions but decline more noticeably when questions become Hard.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Gauge className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Forecast Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallForecast}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Easy Performance
            </p>

            <p className="text-3xl font-black text-green-600">
              94%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Hard Performance
            </p>

            <p className="text-3xl font-black text-orange-600">
              58%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <TrendingUp
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recent Trend
            </p>

            <p className="text-3xl font-black text-purple-600">
              +7%
            </p>

          </div>

        </div>

      </div>

      {/* Difficulty Forecast */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Difficulty Performance Forecast
            </h2>

            <p className="text-sm text-gray-500">
              Select a difficulty level to inspect the prediction.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          {difficultyData.map((item) => (

            <button
              type="button"
              key={item.level}
              onClick={() => setSelectedDifficulty(item)}
              className={`text-left border rounded-2xl p-5 transition ${
                selectedDifficulty.level === item.level
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex justify-between gap-3">

                <h3 className="font-bold text-lg">
                  {item.level}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.risk === "Low"
                      ? "bg-green-100 text-green-700"
                      : item.risk === "Moderate"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.risk} Risk
                </span>

              </div>

              <p className="text-4xl font-black text-indigo-600 mt-5">
                {item.score}%
              </p>

              <p className="text-sm text-gray-500 mt-3">
                {item.description}
              </p>

              <div className="space-y-3 mt-5">

                <div>

                  <div className="flex justify-between text-xs">
                    <span>Accuracy</span>
                    <span>{item.accuracy}%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">

                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${item.accuracy}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between text-xs">
                    <span>Speed</span>
                    <span>{item.speed}%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">

                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${item.speed}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between text-xs">
                    <span>Confidence</span>
                    <span>{item.confidence}%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${item.confidence}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </button>

          ))}

        </div>

      </div>

      {/* Selected Difficulty */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED DIFFICULTY ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedDifficulty.level} Questions
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedDifficulty.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  PREDICTED PERFORMANCE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedDifficulty.score}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  ACCURACY
                </p>

                <p className="text-3xl font-black mt-1">
                  {selectedDifficulty.accuracy}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  SPEED
                </p>

                <p className="text-3xl font-black text-purple-600 mt-1">
                  {selectedDifficulty.speed}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Topic Performance */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Topic-Specific Difficulty Forecast
              </h2>

              <p className="text-sm text-gray-500">
                The same difficulty can produce different outcomes depending
                on the topic.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTopics(!showTopics)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTopics ? "Hide Topics" : "Show Topics"}
          </button>

        </div>

        {showTopics && (
          <div className="space-y-4 mt-6">

            {topicPerformance.map((topic) => (

              <div
                key={topic.topic}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {topic.topic}
                  </h3>

                  <span className="text-sm font-semibold text-green-600">
                    {topic.trend}
                  </span>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">

                  <div>

                    <p className="text-xs text-gray-500">
                      EASY
                    </p>

                    <p className="font-black text-green-600">
                      {topic.easy}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      MEDIUM
                    </p>

                    <p className="font-black text-indigo-600">
                      {topic.medium}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      HARD
                    </p>

                    <p className="font-black text-orange-600">
                      {topic.hard}%
                    </p>

                  </div>

                </div>

                <div className="flex gap-1 mt-4">

                  {[topic.easy, topic.medium, topic.hard].map(
                    (value, index) => (
                      <div
                        key={index}
                        className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"
                      >
                        <div
                          className={`h-full ${
                            index === 0
                              ? "bg-green-500"
                              : index === 1
                              ? "bg-indigo-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${value}%`,
                          }}
                        />
                      </div>
                    )
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Forecast Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Gauge className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Forecast Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used by the AI to estimate difficulty performance.
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

            {difficultyFactors.map((factor) => (

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
                AI Preparation Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Target preparation toward the predicted difficulty gap.
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

      {/* Forecast Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Forecast Workflow
              </h2>

              <p className="text-sm text-gray-500">
                From historical performance to targeted preparation.
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

            {forecastFlow.map((step, index) => (

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

                {index < forecastFlow.length - 1 && (
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

      {/* Forecast Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setForecasted(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Difficulty Forecast
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {forecasted && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                FORECAST GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Your predicted difficulty gap is Medium → Hard.
              </h2>

              <p className="text-gray-600 mt-2">
                Focused hard-question practice, algorithmic reasoning, and
                timed medium-to-hard sessions are the highest-priority actions
                based on the current forecast.
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
              Readiness is not just one score.
            </h2>

            <p className="text-gray-600 mt-2">
              A candidate may be highly prepared for Easy questions but struggle
              when complexity increases. Forecasting the difficulty threshold
              makes preparation more targeted and useful.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}