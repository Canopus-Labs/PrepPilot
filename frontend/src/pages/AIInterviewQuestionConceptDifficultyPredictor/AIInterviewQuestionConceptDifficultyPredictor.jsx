import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  BookOpen,
  Code2,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
  Zap,
  Layers,
  Gauge,
} from "lucide-react";

const AIInterviewQuestionConceptDifficultyPredictor = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState("prediction");
  const [predicting, setPredicting] = useState(false);

  const questions = [
    {
      question: "Find the longest substring without repeating characters.",
      topic: "Sliding Window",
      difficulty: "Moderate",
      score: 68,
      confidence: 84,
      concepts: ["Hash Map", "Two Pointers", "Sliding Window"],
      reasoningSteps: 4,
      prerequisites: ["Hash Maps", "String Traversal", "Two Pointers"],
      complexity: "O(n)",
      expectedTime: "15–20 min",
      userHistory: "Strong",
      explanation:
        "This question requires combining a sliding-window strategy with a hash-based lookup. The concept combination makes it moderately challenging for your current skill level.",
      recommendation:
        "Good next challenge. You have enough prerequisite knowledge to attempt this question independently.",
    },
    {
      question: "Detect a cycle in a directed graph.",
      topic: "Graph Algorithms",
      difficulty: "Challenging",
      score: 82,
      confidence: 78,
      concepts: ["Graphs", "DFS", "Recursion Stack"],
      reasoningSteps: 5,
      prerequisites: ["Graph Representation", "DFS", "Recursion"],
      complexity: "O(V + E)",
      expectedTime: "20–30 min",
      userHistory: "Developing",
      explanation:
        "The question requires graph traversal plus tracking the current recursion path. Your previous graph performance indicates that this concept may require additional preparation.",
      recommendation:
        "Review DFS and recursion-stack concepts before attempting this question.",
    },
    {
      question: "Implement an LRU Cache.",
      topic: "Data Structures",
      difficulty: "Advanced",
      score: 94,
      confidence: 71,
      concepts: ["Hash Map", "Doubly Linked List", "Design"],
      reasoningSteps: 7,
      prerequisites: [
        "Hash Maps",
        "Linked Lists",
        "Object Design",
        "Time Complexity",
      ],
      complexity: "O(1) operations",
      expectedTime: "30–40 min",
      userHistory: "Needs Practice",
      explanation:
        "This problem combines multiple data structures and requires maintaining constant-time operations. It is significantly more complex than questions you have recently completed.",
      recommendation:
        "Practice linked-list manipulation and hash-map combinations before attempting the full problem.",
    },
    {
      question: "Find the second largest element in an array.",
      topic: "Arrays",
      difficulty: "Easy",
      score: 32,
      confidence: 96,
      concepts: ["Arrays", "Comparison", "Iteration"],
      reasoningSteps: 2,
      prerequisites: ["Array Traversal", "Conditional Logic"],
      complexity: "O(n)",
      expectedTime: "5–10 min",
      userHistory: "Excellent",
      explanation:
        "The problem requires a simple array traversal with a small number of reasoning steps. Your previous performance suggests that this should be a comfortable exercise.",
      recommendation:
        "Use this as a warm-up before moving to a more challenging array problem.",
    },
  ];

  const selected = questions[selectedQuestion];

  const averageDifficulty = useMemo(() => {
    return Math.round(
      questions.reduce((sum, question) => sum + question.score, 0) /
        questions.length
    );
  }, []);

  const handlePredict = () => {
    setPredicting(true);

    setTimeout(() => {
      setPredicting(false);
      setActiveTab("prediction");
    }, 800);
  };

  const getDifficultyColor = (score) => {
    if (score >= 85) return "text-red-600";
    if (score >= 65) return "text-orange-500";
    if (score >= 45) return "text-yellow-600";
    return "text-green-600";
  };

  const getDifficultyBg = (difficulty) => {
    if (difficulty === "Advanced") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (difficulty === "Challenging") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    if (difficulty === "Moderate") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  const getHistoryColor = (history) => {
    if (history === "Excellent" || history === "Strong") {
      return "text-green-600";
    }

    if (history === "Developing") {
      return "text-orange-500";
    }

    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Gauge size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Concept Difficulty Predictor
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Predict how difficult an interview question will be for you
              based on its concepts, reasoning requirements, prerequisites,
              and your previous performance.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              {questions.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Gauge
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Avg Difficulty
            </p>

            <p className="text-5xl font-black mt-3">
              {averageDifficulty}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Prediction Accuracy
            </p>

            <p className="text-5xl font-black mt-3">
              91%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Personalization
            </p>

            <p className="text-5xl font-black mt-3">
              87%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Brain size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Concept Difficulty Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                Instead of relying only on fixed Easy, Medium, and Hard
                labels, AI estimates how challenging each question is for
                you specifically. The prediction considers concepts,
                reasoning steps, prerequisites, solution complexity, and
                your historical performance.
              </p>

            </div>

            <button
              type="button"
              onClick={handlePredict}
              disabled={predicting}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {predicting ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Predicting...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Predict Difficulty
                </>
              )}

            </button>

          </div>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedQuestion(index);
                  setActiveTab("prediction");
                }}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-4">

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyBg(
                      question.difficulty
                    )}`}
                  >
                    {question.difficulty}
                  </span>

                  <span
                    className={`font-black ${getDifficultyColor(
                      question.score
                    )}`}
                  >
                    {question.score}/100
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {question.question}
                </h3>

                <p className="text-sm text-violet-600 font-semibold mt-3">
                  {question.topic}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">

                  {question.concepts.map((concept) => (

                    <span
                      key={concept}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {concept}
                    </span>

                  ))}

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-wrap items-center gap-3">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold">
              {selected.topic}
            </span>

            <span
              className={`px-4 py-2 rounded-full font-semibold ${getDifficultyBg(
                selected.difficulty
              )}`}
            >
              AI Prediction: {selected.difficulty}
            </span>

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-5">
            {selected.question}
          </h2>

        </div>

        {/* Analyze Button */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handlePredict}
            disabled={predicting}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition disabled:opacity-60"
          >

            {predicting ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />
                Analyzing Question...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Concept Difficulty
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["prediction", "Difficulty Prediction"],
            ["concepts", "Required Concepts"],
            ["reasoning", "Reasoning Analysis"],
            ["readiness", "Readiness Check"],
          ].map(([tab, label]) => (

            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Prediction */}

        {activeTab === "prediction" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Gauge className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Personalized Difficulty
                </h2>

              </div>

              <div className="flex justify-center py-6">

                <div className="relative w-52 h-52 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-6xl font-black ${getDifficultyColor(
                        selected.score
                      )}`}
                    >
                      {selected.score}
                    </p>

                    <p className="text-gray-500 mt-2">
                      / 100
                    </p>

                    <p className="font-bold mt-2">
                      {selected.difficulty}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 via-orange-500 to-red-600"
                  style={{
                    width: `${selected.score}%`,
                  }}
                />

              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-3">

                <span>Easy</span>
                <span>Moderate</span>
                <span>Advanced</span>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Prediction Explanation
                </h2>

              </div>

              <p className="text-gray-500 leading-7">
                {selected.explanation}
              </p>

              <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <div className="flex items-start gap-3">

                  <Lightbulb
                    className="text-violet-600 shrink-0"
                    size={22}
                  />

                  <div>

                    <p className="font-bold">
                      AI Recommendation
                    </p>

                    <p className="text-gray-500 mt-2 leading-6">
                      {selected.recommendation}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-7 grid sm:grid-cols-2 gap-5">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Prediction Confidence
                  </p>

                  <p className="text-3xl font-black text-violet-600 mt-2">
                    {selected.confidence}%
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Expected Time
                  </p>

                  <p className="text-xl font-black mt-3">
                    {selected.expectedTime}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Concepts */}

        {activeTab === "concepts" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Layers className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Required Concepts
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {selected.concepts.map((concept, index) => (

                <div
                  key={concept}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                      <span className="font-black text-violet-600">
                        {index + 1}
                      </span>

                    </div>

                    <div>

                      <h3 className="font-bold text-lg">
                        {concept}
                      </h3>

                      <p className="text-sm text-green-600 font-semibold mt-1">
                        Relevant concept
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">

                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{
                        width: `${Math.max(
                          55,
                          selected.confidence - index * 7
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-8 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <div className="flex items-start gap-3">

                <BookOpen
                  className="text-blue-600 shrink-0"
                  size={22}
                />

                <div>

                  <p className="font-bold">
                    Prerequisite Knowledge
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {selected.prerequisites.map((item) => (

                      <span
                        key={item}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-sm font-semibold"
                      >
                        {item}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Reasoning */}

        {activeTab === "reasoning" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Reasoning Complexity
                </h2>

              </div>

              <div className="text-center py-5">

                <p className="text-6xl font-black text-violet-600">
                  {selected.reasoningSteps}
                </p>

                <p className="text-gray-500 mt-2">
                  estimated reasoning steps
                </p>

              </div>

              <div className="space-y-4 mt-5">

                {Array.from(
                  { length: selected.reasoningSteps },
                  (_, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 p-4"
                    >

                      <div className="w-9 h-9 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <p className="font-semibold">
                        {[
                          "Understand the problem constraints",
                          "Identify the appropriate concept",
                          "Build the solution approach",
                          "Handle edge cases and validation",
                          "Analyze complexity and optimize",
                          "Combine multiple data structures",
                          "Verify the final solution",
                        ][index]}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Solution Complexity
                </h2>

              </div>

              <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900/30 p-7 text-center">

                <p className="text-sm text-gray-500">
                  Expected Complexity
                </p>

                <p className="text-4xl font-black text-indigo-600 mt-3">
                  {selected.complexity}
                </p>

              </div>

              <div className="mt-7 space-y-5">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Expected Completion Time
                  </p>

                  <p className="font-bold text-lg mt-2">
                    {selected.expectedTime}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <p className="text-sm text-gray-500">
                    Your Historical Performance
                  </p>

                  <p
                    className={`font-bold text-lg mt-2 ${getHistoryColor(
                      selected.userHistory
                    )}`}
                  >
                    {selected.userHistory}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Readiness */}

        {activeTab === "readiness" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Target className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Personalized Readiness Check
              </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  title: "Prerequisites",
                  score: 88,
                  icon: BookOpen,
                },
                {
                  title: "Past Performance",
                  score:
                    selected.userHistory === "Excellent"
                      ? 96
                      : selected.userHistory === "Strong"
                      ? 88
                      : selected.userHistory === "Developing"
                      ? 67
                      : 52,
                  icon: TrendingUp,
                },
                {
                  title: "Concept Familiarity",
                  score: selected.confidence,
                  icon: Layers,
                },
                {
                  title: "Overall Readiness",
                  score: Math.round(
                    (selected.confidence +
                      (selected.userHistory === "Excellent"
                        ? 96
                        : selected.userHistory === "Strong"
                        ? 88
                        : selected.userHistory === "Developing"
                        ? 67
                        : 52) +
                      88) /
                      3
                  ),
                  icon: CheckCircle2,
                },
              ].map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
                  >

                    <Icon
                      className="mx-auto text-violet-600"
                      size={28}
                    />

                    <h3 className="font-bold mt-4">
                      {item.title}
                    </h3>

                    <p className="text-4xl font-black text-violet-600 mt-3">
                      {item.score}%
                    </p>

                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  className="text-green-600 shrink-0"
                  size={24}
                />

                <div>

                  <p className="font-bold text-lg">
                    {selected.score < 50
                      ? "Warm-up Recommended"
                      : selected.score < 75
                      ? "Good Challenge Level"
                      : "Prepare Before Attempting"}
                  </p>

                  <p className="text-gray-500 mt-2 leading-6">
                    {selected.score < 50
                      ? "This question should be a comfortable warm-up based on your current preparation."
                      : selected.score < 75
                      ? "This question provides an appropriate challenge for your current skill level."
                      : "Review the prerequisite concepts before attempting this question to avoid an unexpectedly difficult experience."}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Difficulty Factors */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Layers className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Difficulty Factors
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

            {[
              {
                title: "Concepts",
                score: 78,
                icon: Layers,
              },
              {
                title: "Reasoning",
                score: selected.reasoningSteps * 10 + 30,
                icon: Brain,
              },
              {
                title: "Prerequisites",
                score: 72,
                icon: BookOpen,
              },
              {
                title: "Complexity",
                score: selected.score,
                icon: BarChart3,
              },
              {
                title: "User History",
                score:
                  selected.userHistory === "Excellent"
                    ? 35
                    : selected.userHistory === "Strong"
                    ? 45
                    : selected.userHistory === "Developing"
                    ? 65
                    : 82,
                icon: TrendingUp,
              },
            ].map((factor) => {

              const Icon = factor.icon;

              return (
                <div
                  key={factor.title}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <Icon
                    className="text-violet-600"
                    size={25}
                  />

                  <h3 className="font-bold mt-4">
                    {factor.title}
                  </h3>

                  <p className="text-3xl font-black text-violet-600 mt-3">
                    {Math.min(factor.score, 100)}%
                  </p>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-4 overflow-hidden">

                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{
                        width: `${Math.min(factor.score, 100)}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Difficulty Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Fixed Difficulty vs Personalized Difficulty
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-7">

              <div className="flex items-center gap-3">

                <AlertTriangle className="text-orange-500" />

                <h3 className="text-xl font-bold">
                  Traditional Label
                </h3>

              </div>

              <p className="text-5xl font-black text-orange-500 mt-6">
                {selected.difficulty}
              </p>

              <p className="text-gray-500 mt-4 leading-6">
                The same difficulty label is shown to every user regardless
                of their individual knowledge and experience.
              </p>

            </div>

            <div className="rounded-2xl border border-violet-200 dark:border-violet-900/30 bg-violet-50 dark:bg-violet-900/10 p-7">

              <div className="flex items-center gap-3">

                <Sparkles className="text-violet-600" />

                <h3 className="text-xl font-bold">
                  AI Personalized Score
                </h3>

              </div>

              <p className="text-5xl font-black text-violet-600 mt-6">
                {selected.score}/100
              </p>

              <p className="text-gray-500 mt-4 leading-6">
                The difficulty is adjusted according to your concepts,
                prerequisites, reasoning ability, and historical
                performance.
              </p>

            </div>

          </div>

        </div>

        {/* Recommended Practice Path */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <ArrowRight className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Recommended Practice Path
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <p className="text-4xl">
                🟢
              </p>

              <h3 className="text-xl font-bold mt-4">
                Start Here
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Attempt questions that match your current skill level to
                build confidence and reinforce concepts.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <p className="text-4xl">
                🟠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Challenge Yourself
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Gradually move toward questions with higher reasoning and
                concept complexity.
              </p>

            </div>

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6">

              <p className="text-4xl">
                🔴
              </p>

              <h3 className="text-xl font-bold mt-4">
                Advanced Practice
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Attempt advanced questions after building the required
                prerequisite knowledge.
              </p>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Personalized Difficulty Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 48,
              },
              {
                label: "Week 2",
                score: 57,
              },
              {
                label: "Week 3",
                score: 64,
              },
              {
                label: "Current",
                score: averageDifficulty,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {item.score}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  difficulty exposure
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                Concept Recognition
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You are becoming better at identifying the concepts needed
                to solve interview problems.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Multi-Concept Problems
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice questions that combine multiple data structures or
                algorithms to improve advanced reasoning.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Challenge
              </p>

              <h3 className="text-xl font-bold mt-2">
                Moderate → Challenging
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Gradually increase question difficulty rather than jumping
                directly to advanced problems.
              </p>

            </div>

          </div>

        </div>

        {/* Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Difficulty Prediction Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Understand Concepts
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Difficulty depends on the number and interaction of
                concepts required by a question.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📊
              </p>

              <h3 className="text-xl font-bold mt-4">
                Learn From History
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Previous performance helps determine whether a question
                will be easy or challenging for a specific user.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Personalize Challenges
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                The goal is to provide the right challenge at the right
                stage of preparation.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Personalized Difficulty Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                This score represents how challenging the selected question
                is expected to be for your current preparation level. As
                your skills improve, the same question may receive a lower
                personalized difficulty score.
              </p>

            </div>

            <div className="text-center">

              <p
                className={`text-7xl font-black ${getDifficultyColor(
                  selected.score
                )}`}
              >
                {selected.score}
              </p>

              <p className="text-gray-500 mt-2">
                Personalized Difficulty
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-500 via-orange-500 to-red-600"
              style={{
                width: `${selected.score}%`,
              }}
            />

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Question difficulty should not be identical for every
                learner. A problem that is easy for an experienced
                candidate may be challenging for someone still learning
                the required concepts. This predictor uses your preparation
                history and the question's conceptual complexity to help
                you choose challenges that support steady growth.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Difficulty
              </h3>

              <p className="text-4xl font-black">
                {selected.difficulty}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionConceptDifficultyPredictor;