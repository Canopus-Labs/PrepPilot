import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const topics = [
  {
    topic: "Arrays & Hashing",
    confidence: 92,
    accuracy: 76,
    difficulty: 82,
    recall: 71,
    mistakes: 4,
    gap: 16,
    status: "Overconfidence",
    action: "Practice medium and hard problems without hints.",
  },
  {
    topic: "Binary Search",
    confidence: 68,
    accuracy: 89,
    difficulty: 86,
    recall: 91,
    mistakes: 1,
    gap: 21,
    status: "Underconfidence",
    action: "Increase difficulty and trust demonstrated performance.",
  },
  {
    topic: "Dynamic Programming",
    confidence: 61,
    accuracy: 54,
    difficulty: 63,
    recall: 49,
    mistakes: 8,
    gap: 7,
    status: "Aligned",
    action: "Continue targeted concept revision.",
  },
  {
    topic: "Graphs",
    confidence: 74,
    accuracy: 78,
    difficulty: 72,
    recall: 75,
    mistakes: 3,
    gap: 4,
    status: "Aligned",
    action: "Maintain regular mixed practice.",
  },
  {
    topic: "System Design",
    confidence: 84,
    accuracy: 63,
    difficulty: 67,
    recall: 60,
    mistakes: 6,
    gap: 21,
    status: "Overconfidence",
    action: "Practice architecture trade-offs and follow-up questions.",
  },
];

const analysisFactors = [
  {
    title: "Self-Reported Confidence",
    description:
      "Measures how confident the candidate feels about the selected topic.",
    value: 92,
  },
  {
    title: "Actual Accuracy",
    description:
      "Measures correctness across recent practice and assessments.",
    value: 76,
  },
  {
    title: "Difficulty Handled",
    description:
      "Measures the complexity of questions the candidate can successfully solve.",
    value: 82,
  },
  {
    title: "Recall Performance",
    description:
      "Measures how well the candidate can reproduce knowledge without assistance.",
    value: 71,
  },
];

const recommendations = [
  {
    title: "Validate High Confidence",
    reason:
      "Confidence is significantly higher than demonstrated accuracy in Arrays & Hashing.",
    action:
      "Complete mixed, unlabeled questions and compare performance without hints.",
  },
  {
    title: "Increase Challenge",
    reason:
      "Binary Search performance is stronger than the candidate's confidence suggests.",
    action:
      "Move toward harder questions and interview-style timed practice.",
  },
  {
    title: "Strengthen Recall",
    reason:
      "Dynamic Programming has low recall and frequent recent mistakes.",
    action:
      "Use active recall and concept reconstruction before attempting new problems.",
  },
];

const confidenceFlow = [
  {
    title: "Collect Confidence",
    description: "Record the user's self-reported confidence.",
  },
  {
    title: "Measure Performance",
    description: "Analyze accuracy, recall, and difficulty.",
  },
  {
    title: "Calculate Gap",
    description: "Compare perceived and demonstrated mastery.",
  },
  {
    title: "Classify",
    description: "Detect overconfidence, underconfidence, or alignment.",
  },
  {
    title: "Recommend",
    description: "Generate an appropriate preparation action.",
  },
];

export default function AIInterviewPreparationTopicMasteryConfidenceGap() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [showFactors, setShowFactors] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overconfident = topics.filter(
    (topic) => topic.status === "Overconfidence"
  ).length;

  const underconfident = topics.filter(
    (topic) => topic.status === "Underconfidence"
  ).length;

  const aligned = topics.filter(
    (topic) => topic.status === "Aligned"
  ).length;

  const averageGap = Math.round(
    topics.reduce((sum, topic) => sum + topic.gap, 0) /
      topics.length
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
            AI Topic Mastery Confidence Gap
          </h1>

          <p className="text-gray-500">
            Compare perceived confidence with demonstrated mastery to reveal
            overconfidence and underconfidence.
          </p>

        </div>

      </div>

      {/* Main Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {averageGap}
              </p>

              <p className="text-xs text-gray-500">
                avg gap
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CONFIDENCE VS MASTERY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {overconfident + underconfident} Confidence Gaps Detected
            </h2>

            <p className="text-gray-600 mt-2">
              The AI compares confidence with actual accuracy, difficulty,
              recall, and recent mistakes to determine whether perception
              matches demonstrated ability.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <ShieldAlert
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overconfidence
            </p>

            <p className="text-3xl font-black text-red-600">
              {overconfident}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Underconfidence
            </p>

            <p className="text-3xl font-black text-orange-600">
              {underconfident}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Confidence Aligned
            </p>

            <p className="text-3xl font-black text-green-600">
              {aligned}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <BarChart3
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Average Gap
            </p>

            <p className="text-3xl font-black text-purple-600">
              {averageGap}%
            </p>

          </div>

        </div>

      </div>

      {/* Topic Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Topic Confidence Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Select a topic to inspect perceived and demonstrated mastery.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {topics.map((topic, index) => (

            <button
              type="button"
              key={topic.topic}
              onClick={() => setSelectedTopic(topic)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedTopic.topic === topic.topic
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {topic.topic}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {topic.mistakes} recent mistakes
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        topic.status === "Overconfidence"
                          ? "bg-red-100 text-red-700"
                          : topic.status === "Underconfidence"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {topic.status}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <div>

                      <div className="flex justify-between text-xs mb-1">

                        <span>
                          Confidence
                        </span>

                        <span>
                          {topic.confidence}%
                        </span>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${topic.confidence}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div>

                      <div className="flex justify-between text-xs mb-1">

                        <span>
                          Demonstrated Mastery
                        </span>

                        <span>
                          {topic.accuracy}%
                        </span>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            topic.status === "Overconfidence"
                              ? "bg-red-500"
                              : topic.status === "Underconfidence"
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${topic.accuracy}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Topic Analysis */}
      <div
        className={`rounded-2xl p-6 ${
          selectedTopic.status === "Overconfidence"
            ? "bg-red-50"
            : selectedTopic.status === "Underconfidence"
            ? "bg-orange-50"
            : "bg-green-50"
        }`}
      >

        <div className="flex gap-4">

          {selectedTopic.status === "Overconfidence" ? (
            <ShieldAlert
              className="text-red-600"
              size={30}
            />
          ) : selectedTopic.status === "Underconfidence" ? (
            <AlertTriangle
              className="text-orange-600"
              size={30}
            />
          ) : (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          )}

          <div className="flex-1">

            <p className="text-xs font-bold">
              SELECTED TOPIC ANALYSIS
            </p>

            <h2 className="text-xl font-bold mt-1">
              {selectedTopic.topic}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedTopic.status === "Overconfidence"
                ? "Your reported confidence is significantly higher than your demonstrated performance."
                : selectedTopic.status === "Underconfidence"
                ? "Your demonstrated performance is significantly stronger than your reported confidence."
                : "Your confidence is reasonably aligned with your demonstrated performance."}
            </p>

            <div className="grid md:grid-cols-5 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  CONFIDENCE
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-1">
                  {selectedTopic.confidence}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  ACCURACY
                </p>

                <p className="text-2xl font-black text-green-600 mt-1">
                  {selectedTopic.accuracy}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>

                <p className="text-2xl font-black mt-1">
                  {selectedTopic.difficulty}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  RECALL
                </p>

                <p className="text-2xl font-black text-purple-600 mt-1">
                  {selectedTopic.recall}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  GAP
                </p>

                <p
                  className={`text-2xl font-black mt-1 ${
                    selectedTopic.status === "Overconfidence"
                      ? "text-red-600"
                      : selectedTopic.status === "Underconfidence"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedTopic.gap}%
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs font-bold text-indigo-600">
                RECOMMENDED ACTION
              </p>

              <p className="text-sm text-gray-600 mt-2">
                {selectedTopic.action}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Analysis Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Mastery Analysis Factors
              </h2>

              <p className="text-sm text-gray-500">
                Confidence is compared against multiple performance signals.
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

            {analysisFactors.map((factor) => (

              <div
                key={factor.title}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {factor.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {factor.description}
                    </p>

                  </div>

                  <span className="text-xl font-black text-indigo-600">
                    {factor.value}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${factor.value}%`,
                    }}
                  />

                </div>

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
                AI Confidence Gap Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Actions based on the relationship between confidence and
                demonstrated mastery.
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

      {/* Confidence Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Confidence Gap Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                Convert perceived confidence and performance data into
                actionable preparation guidance.
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

            {confidenceFlow.map((step, index) => (

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

                {index < confidenceFlow.length - 1 && (
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
          Analyze Confidence Gaps
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
                Topic confidence and mastery gaps identified.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can compare confidence with
                accuracy, difficulty handled, recall, and recent mistakes to
                personalize preparation recommendations.
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
              Confidence should be calibrated by evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong preparation system should help candidates understand
              not only what they know, but also whether their confidence
              accurately reflects their demonstrated ability.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}