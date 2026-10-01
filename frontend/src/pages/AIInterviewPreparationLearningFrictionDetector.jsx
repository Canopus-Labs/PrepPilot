import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock3,
  AlertTriangle,
  TrendingDown,
  Lightbulb,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const topics = [
  {
    name: "Dynamic Programming",
    attempts: 18,
    time: "6h 20m",
    hints: 14,
    mistakes: 11,
    improvement: 8,
    friction: "High",
  },
  {
    name: "Binary Search",
    attempts: 12,
    time: "3h 10m",
    hints: 5,
    mistakes: 4,
    improvement: 24,
    friction: "Medium",
  },
  {
    name: "Arrays",
    attempts: 9,
    time: "1h 45m",
    hints: 2,
    mistakes: 2,
    improvement: 42,
    friction: "Low",
  },
];

const interventions = [
  {
    title: "Switch from Practice to Concept Review",
    description:
      "Repeated mistakes suggest that additional questions alone may not address the underlying knowledge gap.",
    priority: "High",
  },
  {
    title: "Use Guided Examples",
    description:
      "Study two or three worked examples before attempting another independent problem.",
    priority: "High",
  },
  {
    title: "Reduce Problem Difficulty Temporarily",
    description:
      "Build confidence with simpler problems before returning to advanced questions.",
    priority: "Medium",
  },
];

export default function AIInterviewPreparationLearningFrictionDetector() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [analyzed, setAnalyzed] = useState(false);
  const [showIntervention, setShowIntervention] = useState(false);

  const analyzeFriction = () => {
    setAnalyzed(true);
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
            AI Learning Friction Detector
          </h1>

          <p className="text-gray-500">
            Identify preparation areas where effort is high but progress is
            slower than expected.
          </p>

        </div>

      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Learning Friction Overview
            </h2>

            <p className="text-sm text-gray-500">
              AI analyzes preparation behavior rather than looking only at
              current scores.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Topics Analyzed
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              24
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              High-Friction Areas
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              3
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Repeated Mistakes
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              37
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Strategy Opportunities
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              6
            </p>

          </div>

        </div>

      </div>

      {/* Topic Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Learning Friction by Topic
            </h2>

            <p className="text-sm text-gray-500">
              Select a topic to inspect its preparation pattern.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {topics.map((topic) => {

            const selected = selectedTopic.name === topic.name;

            return (
              <button
                type="button"
                key={topic.name}
                onClick={() => setSelectedTopic(topic)}
                className={`text-left border rounded-2xl p-5 transition ${
                  selected
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-3">

                  <h3 className="font-bold">
                    {topic.name}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      topic.friction === "High"
                        ? "bg-red-100 text-red-700"
                        : topic.friction === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {topic.friction} Friction
                  </span>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Improvement
                    </span>

                    <span className="font-bold">
                      {topic.improvement}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${topic.improvement}%`,
                      }}
                    />

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Selected Topic Metrics */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4 items-center">

          <div className="p-4 bg-white rounded-2xl">

            <AlertTriangle
              className="text-orange-600"
              size={34}
            />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Selected Topic
            </p>

            <h2 className="text-2xl font-black text-indigo-700">
              {selectedTopic.name}
            </h2>

            <p className="text-gray-600 mt-1">
              AI detected a{" "}
              <strong>{selectedTopic.friction.toLowerCase()}</strong>{" "}
              learning-friction pattern.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Friction Indicators
            </h2>

            <p className="text-sm text-gray-500">
              These signals are used to determine whether your current
              learning strategy is producing enough progress.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-5 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <Target className="text-indigo-600" />

            <p className="text-sm text-gray-500 mt-3">
              Attempts
            </p>

            <p className="text-3xl font-black mt-1">
              {selectedTopic.attempts}
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Clock3 className="text-orange-600" />

            <p className="text-sm text-gray-500 mt-3">
              Time Spent
            </p>

            <p className="text-2xl font-black mt-1">
              {selectedTopic.time}
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Lightbulb className="text-purple-600" />

            <p className="text-sm text-gray-500 mt-3">
              Hints Used
            </p>

            <p className="text-3xl font-black mt-1">
              {selectedTopic.hints}
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <AlertTriangle className="text-red-600" />

            <p className="text-sm text-gray-500 mt-3">
              Repeated Mistakes
            </p>

            <p className="text-3xl font-black mt-1">
              {selectedTopic.mistakes}
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <TrendingDown className="text-green-600" />

            <p className="text-sm text-gray-500 mt-3">
              Improvement
            </p>

            <p className="text-3xl font-black mt-1">
              {selectedTopic.improvement}%
            </p>

          </div>

        </div>

      </div>

      {/* Analyze Button */}
      {!analyzed && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex items-center gap-4">

            <Brain
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <h2 className="font-bold text-indigo-700">
                Analyze Learning Pattern
              </h2>

              <p className="text-gray-600 mt-1">
                AI will determine whether repeated effort is producing
                proportional improvement.
              </p>

            </div>

            <button
              type="button"
              onClick={analyzeFriction}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Analyze Friction
            </button>

          </div>

        </div>
      )}

      {analyzed && (
        <>
          {/* Friction Verdict */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <AlertTriangle
                className="text-red-600"
                size={30}
              />

              <div>

                <p className="text-xs font-bold text-red-600">
                  HIGH FRICTION DETECTED
                </p>

                <h2 className="text-2xl font-black text-red-700 mt-1">
                  Effort Is Not Producing Proportional Improvement
                </h2>

                <p className="text-gray-600 mt-2">
                  You have spent {selectedTopic.time} across{" "}
                  {selectedTopic.attempts} attempts, but improvement is only{" "}
                  {selectedTopic.improvement}%. You also used{" "}
                  {selectedTopic.hints} hints and repeated{" "}
                  {selectedTopic.mistakes} mistakes.
                </p>

              </div>

            </div>

          </div>

          {/* Pattern Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Learning Pattern Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Identify why progress is slower than expected.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <AlertTriangle className="text-red-600" />

                  <div>

                    <h3 className="font-bold">
                      Repeated Mistake Pattern
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Similar errors appear across multiple attempts,
                      suggesting that repeating questions alone may not fix
                      the underlying issue.
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <Clock3 className="text-orange-600" />

                  <div>

                    <h3 className="font-bold">
                      High Time Investment
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      The amount of time spent is significantly higher than
                      the improvement generated.
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <Lightbulb className="text-purple-600" />

                  <div>

                    <h3 className="font-bold">
                      High Hint Dependence
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Frequent hints indicate that independent recall or
                      application may need additional support.
                    </p>

                  </div>

                </div>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex gap-3">

                  <TrendingDown className="text-red-600" />

                  <div>

                    <h3 className="font-bold">
                      Slow Improvement Rate
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Additional attempts are not currently producing enough
                      improvement to justify the same strategy.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Friction Score */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <BarChart3 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Learning Friction Score
                </h2>

                <p className="text-sm text-gray-500">
                  Higher scores indicate more inefficient learning patterns.
                </p>

              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Friction Level
                </span>

                <span className="font-black text-red-600">
                  86 / 100
                </span>

              </div>

              <div className="h-5 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: "86%" }}
                />

              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-5">

                <div className="bg-red-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Effort
                  </p>

                  <p className="text-2xl font-black text-red-600">
                    High
                  </p>

                </div>

                <div className="bg-orange-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Improvement
                  </p>

                  <p className="text-2xl font-black text-orange-600">
                    Low
                  </p>

                </div>

                <div className="bg-purple-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Strategy Fit
                  </p>

                  <p className="text-2xl font-black text-purple-600">
                    Poor
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Intervention */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Strategy Change
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not simply increase the number of practice questions.
                  Change the learning method before continuing with advanced
                  problems.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowIntervention(!showIntervention)
                  }
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  {showIntervention
                    ? "Hide Strategy"
                    : "View Recommended Strategy"}
                </button>

              </div>

            </div>

          </div>

          {showIntervention && (
            <div className="bg-white rounded-2xl shadow p-6">

              <div className="space-y-4">

                {interventions.map((item) => (

                  <div
                    key={item.title}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex justify-between gap-3">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* Recommended Learning Cycle */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <RefreshCw className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Learning Cycle
                </h2>

                <p className="text-sm text-gray-500">
                  Replace repeated unsuccessful practice with a structured
                  intervention.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Review Concept",
                "Study Example",
                "Solve Easy Problem",
                "Explain Reasoning",
                "Return to Practice",
              ].map((step, index, array) => (

                <React.Fragment key={step}>

                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
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

          {/* Other Topics */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Friction Comparison
                </h2>

                <p className="text-sm text-gray-500">
                  Compare learning efficiency across topics.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {topics.map((topic) => (

                <div
                  key={topic.name}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between gap-3">

                    <span className="font-semibold">
                      {topic.name}
                    </span>

                    <span
                      className={`font-bold ${
                        topic.friction === "High"
                          ? "text-red-600"
                          : topic.friction === "Medium"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {topic.friction}
                    </span>

                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">

                    <span>
                      {topic.attempts} attempts
                    </span>

                    <span>
                      {topic.time}
                    </span>

                    <span>
                      +{topic.improvement}% improvement
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Final Verdict */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Learning Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your main issue is not lack of effort. The data suggests that
                  your current learning strategy is producing limited
                  improvement. Change the learning approach, address recurring
                  mistakes, and then return to independent practice.
                </p>

              </div>

            </div>

          </div>

          {/* Next Action */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Action
                </h2>

                <p className="text-gray-600 mt-2">
                  Start a guided Dynamic Programming concept review before
                  attempting another advanced problem.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Guided Intervention
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}