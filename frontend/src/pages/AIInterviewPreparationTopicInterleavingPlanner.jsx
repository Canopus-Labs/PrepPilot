import React, { useState } from "react";
import {
  Brain,
  Shuffle,
  Target,
  Layers,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const questions = [
  {
    title: "Longest Subarray",
    topic: "Sliding Window",
    difficulty: "Medium",
    familiarity: "Familiar",
    technique: "Window + Hash Map",
    reason: "Builds recognition without revealing the technique.",
  },
  {
    title: "Course Schedule",
    topic: "Graph",
    difficulty: "Medium",
    familiarity: "Unfamiliar",
    technique: "Topological Sort",
    reason: "Tests independent technique identification.",
  },
  {
    title: "Two Sum Variant",
    topic: "Hashing",
    difficulty: "Easy",
    familiarity: "Familiar",
    technique: "Hash Map",
    reason: "Reinforces a previously practiced pattern.",
  },
  {
    title: "Minimum Path Cost",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    familiarity: "Unfamiliar",
    technique: "State Transition",
    reason: "Introduces a less obvious technique.",
  },
  {
    title: "Merge Intervals",
    topic: "Intervals",
    difficulty: "Medium",
    familiarity: "Familiar",
    technique: "Sorting + Greedy",
    reason: "Tests whether the candidate can recognize a known pattern.",
  },
];

const topicStats = [
  {
    topic: "Algorithms",
    questions: 8,
    recognition: 82,
    diversity: "High",
  },
  {
    topic: "Data Structures",
    questions: 6,
    recognition: 76,
    diversity: "Medium",
  },
  {
    topic: "Dynamic Programming",
    questions: 4,
    recognition: 61,
    diversity: "Medium",
  },
  {
    topic: "Graphs",
    questions: 3,
    recognition: 58,
    diversity: "Growing",
  },
];

const interleavingFlow = [
  {
    title: "Analyze Mastery",
    description: "Review familiar and weak topics.",
  },
  {
    title: "Select Topics",
    description: "Choose complementary concepts.",
  },
  {
    title: "Mix Questions",
    description: "Remove predictable topic grouping.",
  },
  {
    title: "Test Recognition",
    description: "Hide the expected technique.",
  },
  {
    title: "Measure Adaptability",
    description: "Track independent technique selection.",
  },
];

const insights = [
  {
    title: "Topic Recognition Improving",
    message:
      "Mixed practice increased correct technique identification compared with topic-grouped practice.",
    type: "Positive",
  },
  {
    title: "Dynamic Programming Needs More Exposure",
    message:
      "Recognition accuracy remains below the target threshold when DP questions appear without labels.",
    type: "Focus",
  },
  {
    title: "Topic Diversity Increasing",
    message:
      "Recent sessions contain more varied concepts while maintaining appropriate difficulty.",
    type: "Positive",
  },
];

export default function AIInterviewPreparationTopicInterleavingPlanner() {
  const [selectedQuestion, setSelectedQuestion] = useState(
    questions[0]
  );
  const [showInsights, setShowInsights] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [generated, setGenerated] = useState(false);

  const familiarCount = questions.filter(
    (question) => question.familiarity === "Familiar"
  ).length;

  const unfamiliarCount = questions.filter(
    (question) => question.familiarity === "Unfamiliar"
  ).length;

  const topicCount = new Set(
    questions.map((question) => question.topic)
  ).size;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Topic Interleaving Planner
          </h1>

          <p className="text-gray-500">
            Mix related and unfamiliar concepts so candidates learn to
            recognize techniques independently.
          </p>

        </div>

      </div>

      {/* Main Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <Shuffle
              className="text-indigo-600"
              size={38}
            />

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              INTERLEAVED SESSION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {topicCount} Topics Mixed
            </h2>

            <p className="text-gray-600 mt-2">
              The session intentionally removes predictable topic grouping so
              candidates must determine which technique fits each problem.
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
              Topics Mixed
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {topicCount}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Familiar
            </p>

            <p className="text-3xl font-black text-green-600">
              {familiarCount}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Lightbulb
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Unfamiliar
            </p>

            <p className="text-3xl font-black text-orange-600">
              {unfamiliarCount}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recognition
            </p>

            <p className="text-3xl font-black text-purple-600">
              72%
            </p>

          </div>

        </div>

      </div>

      {/* Interleaved Session */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Shuffle className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interleaved Practice Session
            </h2>

            <p className="text-sm text-gray-500">
              Questions are intentionally mixed instead of grouped by topic.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {questions.map((question, index) => (

            <button
              type="button"
              key={question.title}
              onClick={() => setSelectedQuestion(question)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedQuestion.title === question.title
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
                        {question.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Technique hidden from candidate
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        question.familiarity === "Familiar"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {question.familiarity}
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">

                    <span className="px-3 py-1 bg-white rounded-full text-xs">
                      {question.topic}
                    </span>

                    <span className="px-3 py-1 bg-white rounded-full text-xs">
                      {question.difficulty}
                    </span>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Question */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              TECHNIQUE RECOGNITION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedQuestion.title}
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate sees the problem without being told which topic
              or technique should be used.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  TOPIC
                </p>

                <p className="font-bold mt-1">
                  {selectedQuestion.topic}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>

                <p className="font-bold mt-1">
                  {selectedQuestion.difficulty}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  FAMILIARITY
                </p>

                <p className="font-bold mt-1">
                  {selectedQuestion.familiarity}
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  EXPECTED TECHNIQUE
                </p>

                <p className="font-bold text-indigo-600 mt-1">
                  {selectedQuestion.technique}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Topic Mix */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Layers className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Topic Diversity
            </h2>

            <p className="text-sm text-gray-500">
              Track how preparation is distributed across different concepts.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {topicStats.map((stat) => (

            <div key={stat.topic}>

              <div className="flex justify-between">

                <div>

                  <p className="font-semibold">
                    {stat.topic}
                  </p>

                  <p className="text-xs text-gray-500">
                    {stat.questions} questions · {stat.diversity} diversity
                  </p>

                </div>

                <span className="font-bold">
                  {stat.recognition}%
                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${stat.recognition}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Interleaving Insights
              </h2>

              <p className="text-sm text-gray-500">
                Understand how mixed practice affects technique recognition.
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
                          insight.type === "Focus"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {insight.type}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {insight.message}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Interleaving Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Interleaving Strategy
              </h2>

              <p className="text-sm text-gray-500">
                Gradually increase topic diversity as recognition improves.
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

            {interleavingFlow.map((step, index) => (

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

                {index < interleavingFlow.length - 1 && (
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Interleaved Session
          <ArrowRight size={18} />
        </button>

      </div>

      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                SESSION GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Interleaved practice session is ready.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can dynamically select questions
                from multiple topics based on mastery, familiarity, recent
                performance, and recognition accuracy.
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
              Learn to recognize the technique, not just the topic.
            </h2>

            <p className="text-gray-600 mt-2">
              Real interviews rarely announce which algorithm or data
              structure to use. Interleaved practice removes those labels and
              helps candidates build the flexibility needed to identify the
              right approach independently.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}