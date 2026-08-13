import React, { useState } from "react";
import {
  Brain,
  Target,
  BarChart3,
  Clock3,
  RotateCcw,
  Lightbulb,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  MessageSquareText,
} from "lucide-react";

const AIInterviewQuestionDifficultyCalibration = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const stats = {
    calibrationAccuracy: 91,
    questionsAnalyzed: 48,
    recalibratedQuestions: 17,
    averagePerformance: 76,
  };

  const questions = [
    {
      title: "Implement Binary Search on a Sorted Array",
      category: "DSA",
      originalDifficulty: "Medium",
      effectiveDifficulty: "Easy",
      successRate: 91,
      completionTime: 8,
      attempts: 1,
      hints: 0,
      performance: 92,
    },
    {
      title: "Design a URL Shortener",
      category: "System Design",
      originalDifficulty: "Medium",
      effectiveDifficulty: "Hard",
      successRate: 42,
      completionTime: 38,
      attempts: 3,
      hints: 4,
      performance: 48,
    },
    {
      title: "Find the First Non-Repeating Character",
      category: "Programming",
      originalDifficulty: "Easy",
      effectiveDifficulty: "Medium",
      successRate: 64,
      completionTime: 17,
      attempts: 2,
      hints: 2,
      performance: 67,
    },
  ];

  const selected = questions[selectedQuestion];

  const getDifficultyClasses = (difficulty) => {
    if (difficulty === "Easy") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (difficulty === "Medium") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  const getPerformanceClasses = (score) => {
    if (score >= 80) {
      return "text-green-600";
    }

    if (score >= 60) {
      return "text-yellow-600";
    }

    return "text-red-600";
  };

  const getCalibrationMessage = () => {
    if (
      selected.originalDifficulty === "Medium" &&
      selected.effectiveDifficulty === "Easy"
    ) {
      return "Users are consistently performing above the expected level. The question appears easier for this user profile than its original Medium classification.";
    }

    if (
      selected.originalDifficulty === "Medium" &&
      selected.effectiveDifficulty === "Hard"
    ) {
      return "Users are struggling more than expected. Low success rate, longer completion time, repeated attempts, and frequent hints indicate that the effective difficulty should be increased.";
    }

    return "Performance signals indicate that the original difficulty does not fully represent the practical difficulty experienced by users.";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Gauge
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Question Difficulty Calibration
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Dynamically adjust interview question difficulty based on
              actual user performance instead of relying only on fixed
              difficulty labels.
            </p>
          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Calibration Accuracy
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.calibrationAccuracy}%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <BarChart3
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Questions Analyzed
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.questionsAnalyzed}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <Sparkles
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Recalibrated
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.recalibratedQuestions}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Avg Performance
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.averagePerformance}%
            </p>
          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">
            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Difficulty Calibration Engine
            </h2>
          </div>

          <p className="leading-8 text-white/90">
            The calibration engine analyzes success rate, completion time,
            number of attempts, hint usage, and overall performance to
            determine how difficult a question actually is for a user.
            The effective difficulty can therefore differ from the
            original difficulty assigned to the question.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">
            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {question.category}
                </span>

                <h3 className="font-bold text-lg mt-4">
                  {question.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyClasses(
                      question.originalDifficulty
                    )}`}
                  >
                    Original: {question.originalDifficulty}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyClasses(
                      question.effectiveDifficulty
                    )}`}
                  >
                    AI: {question.effectiveDifficulty}
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <p className="text-sm text-gray-500">
            Selected Question
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3">
            {selected.title}
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {selected.category}
            </span>

            <span
              className={`px-4 py-2 rounded-full ${getDifficultyClasses(
                selected.originalDifficulty
              )}`}
            >
              Original: {selected.originalDifficulty}
            </span>

            <span
              className={`px-4 py-2 rounded-full ${getDifficultyClasses(
                selected.effectiveDifficulty
              )}`}
            >
              AI Effective: {selected.effectiveDifficulty}
            </span>

          </div>

        </div>

        {/* Difficulty Comparison */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <p className="text-gray-500">
              Original Difficulty
            </p>

            <div className="flex items-center gap-5 mt-5">

              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Gauge
                  size={32}
                  className="text-gray-600"
                />
              </div>

              <div>
                <h3 className="text-3xl font-black">
                  {selected.originalDifficulty}
                </h3>

                <p className="text-gray-500 mt-1">
                  Static question classification
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <p className="text-gray-500">
              AI Effective Difficulty
            </p>

            <div className="flex items-center gap-5 mt-5">

              <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                <Sparkles
                  size={32}
                  className="text-violet-600"
                />
              </div>

              <div>
                <h3 className="text-3xl font-black">
                  {selected.effectiveDifficulty}
                </h3>

                <p className="text-gray-500 mt-1">
                  Personalized difficulty classification
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Calibration Explanation */}

        <div className="mt-10 bg-violet-50 dark:bg-violet-900/10 rounded-3xl border border-violet-200 dark:border-violet-900/30 p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Brain className="text-violet-600" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Why AI Recalibrated This Question
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-7">
                {getCalibrationMessage()}
              </p>

            </div>

          </div>

        </div>

        {/* Performance Signals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Performance Signals
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <TrendingUp
                className="text-green-600"
                size={26}
              />

              <p className="text-gray-500 mt-4">
                Success Rate
              </p>

              <p
                className={`text-3xl font-black mt-2 ${getPerformanceClasses(
                  selected.successRate
                )}`}
              >
                {selected.successRate}%
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Clock3
                className="text-blue-600"
                size={26}
              />

              <p className="text-gray-500 mt-4">
                Avg Time
              </p>

              <p className="text-3xl font-black mt-2">
                {selected.completionTime}m
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <RotateCcw
                className="text-orange-500"
                size={26}
              />

              <p className="text-gray-500 mt-4">
                Attempts
              </p>

              <p className="text-3xl font-black mt-2">
                {selected.attempts}
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Lightbulb
                className="text-yellow-500"
                size={26}
              />

              <p className="text-gray-500 mt-4">
                Hints Used
              </p>

              <p className="text-3xl font-black mt-2">
                {selected.hints}
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Target
                className="text-violet-600"
                size={26}
              />

              <p className="text-gray-500 mt-4">
                Performance
              </p>

              <p
                className={`text-3xl font-black mt-2 ${getPerformanceClasses(
                  selected.performance
                )}`}
              >
                {selected.performance}%
              </p>

            </div>

          </div>

        </div>

        {/* Success Rate Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col sm:flex-row justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold">
                Success Rate Analysis
              </h2>

              <p className="text-gray-500 mt-2">
                How frequently users successfully complete this question.
              </p>
            </div>

            <span className="text-3xl font-black text-violet-600">
              {selected.successRate}%
            </span>

          </div>

          <div className="mt-7 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all"
              style={{
                width: `${selected.successRate}%`,
              }}
            />

          </div>

          <div className="flex justify-between text-sm text-gray-500 mt-3">
            <span>Low success</span>
            <span>High success</span>
          </div>

        </div>

        {/* Completion Time */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Completion Time Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "User Average",
                value: `${selected.completionTime} min`,
              },
              {
                title: "Expected Time",
                value:
                  selected.effectiveDifficulty === "Easy"
                    ? "10 min"
                    : selected.effectiveDifficulty === "Medium"
                    ? "20 min"
                    : "35 min",
              },
              {
                title: "Time Efficiency",
                value:
                  selected.completionTime <= 15
                    ? "Excellent"
                    : selected.completionTime <= 25
                    ? "Good"
                    : "Needs Improvement",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <p className="text-gray-500">
                  {item.title}
                </p>

                <p className="text-2xl font-black mt-3">
                  {item.value}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Attempt & Hint Analysis */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <RotateCcw className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Attempt Analysis
              </h2>

            </div>

            <p className="text-gray-500 leading-7">
              The user has attempted this question{" "}
              <strong className="text-gray-900 dark:text-white">
                {selected.attempts}
              </strong>{" "}
              time{selected.attempts !== 1 ? "s" : ""}. Multiple attempts
              can indicate that the question is more difficult than its
              original label suggests.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-gray-500">
                Current Attempts
              </p>

              <p className="text-4xl font-black mt-2">
                {selected.attempts}
              </p>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                Hint Usage Analysis
              </h2>

            </div>

            <p className="text-gray-500 leading-7">
              The user requested{" "}
              <strong className="text-gray-900 dark:text-white">
                {selected.hints}
              </strong>{" "}
              hint{selected.hints !== 1 ? "s" : ""}. Frequent hint usage
              is an important signal when estimating the practical
              difficulty of an interview question.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-gray-500">
                Hints Used
              </p>

              <p className="text-4xl font-black mt-2">
                {selected.hints}
              </p>

            </div>

          </div>

        </div>

        {/* AI Calibration Factors */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Calibration Factors
            </h2>

          </div>

          <div className="space-y-6">

            {[
              {
                label: "Success Rate",
                value: selected.successRate,
                weight: "30%",
              },
              {
                label: "Completion Time",
                value:
                  selected.completionTime <= 15
                    ? 90
                    : selected.completionTime <= 25
                    ? 70
                    : 45,
                weight: "25%",
              },
              {
                label: "Attempt Efficiency",
                value:
                  selected.attempts === 1
                    ? 95
                    : selected.attempts === 2
                    ? 70
                    : 45,
                weight: "20%",
              },
              {
                label: "Hint Independence",
                value:
                  selected.hints === 0
                    ? 100
                    : selected.hints <= 2
                    ? 70
                    : 40,
                weight: "15%",
              },
              {
                label: "Overall Performance",
                value: selected.performance,
                weight: "10%",
              },
            ].map((factor, index) => (

              <div key={index}>

                <div className="flex justify-between items-center mb-2">

                  <div className="flex items-center gap-3">

                    <span className="font-semibold">
                      {factor.label}
                    </span>

                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      Weight {factor.weight}
                    </span>

                  </div>

                  <span className="font-bold">
                    {factor.value}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${factor.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Personalized Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <p className="text-white/90 leading-8">
            Based on your current performance, the AI recommends using
            <strong> {selected.effectiveDifficulty} </strong>
            questions as your effective practice level. Continue solving
            questions at this level until your success rate and time
            efficiency improve consistently, then gradually increase
            difficulty.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-white/70 text-sm">
                Current Level
              </p>

              <p className="text-2xl font-black mt-2">
                {selected.effectiveDifficulty}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-white/70 text-sm">
                Target Success Rate
              </p>

              <p className="text-2xl font-black mt-2">
                80%+
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-white/70 text-sm">
                Next Step
              </p>

              <p className="text-2xl font-black mt-2">
                Adaptive Practice
              </p>
            </div>

          </div>

        </div>

        {/* Difficulty Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Difficulty Calibration Trend
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

            {[
              {
                session: "Week 1",
                difficulty: "Easy",
                performance: 62,
              },
              {
                session: "Week 2",
                difficulty: "Easy",
                performance: 69,
              },
              {
                session: "Week 3",
                difficulty: "Medium",
                performance: 73,
              },
              {
                session: "Week 4",
                difficulty: "Medium",
                performance: 81,
              },
              {
                session: "Current",
                difficulty: selected.effectiveDifficulty,
                performance: selected.performance,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <p className="text-sm text-gray-500">
                  {item.session}
                </p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-4 ${getDifficultyClasses(
                    item.difficulty
                  )}`}
                >
                  {item.difficulty}
                </span>

                <p className="text-3xl font-black mt-5">
                  {item.performance}%
                </p>

                <p className="text-sm text-gray-500">
                  performance
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Difficulty Distribution */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Personalized Difficulty Distribution
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                label: "Easy",
                percentage: 35,
                description: "Questions mastered or nearly mastered.",
              },
              {
                label: "Medium",
                percentage: 45,
                description: "Questions appropriate for current practice.",
              },
              {
                label: "Hard",
                percentage: 20,
                description: "Questions providing the next challenge.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyClasses(
                      item.label
                    )}`}
                  >
                    {item.label}
                  </span>

                  <span className="text-2xl font-black">
                    {item.percentage}%
                  </span>

                </div>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.percentage * 2}%`,
                    }}
                  />

                </div>

                <p className="text-gray-500 mt-4 text-sm leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Calibration Rules */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              AI Calibration Rules
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "High Success + Low Time",
                description:
                  "Increase the effective difficulty because the user is demonstrating strong mastery.",
                icon: <TrendingUp className="text-green-600" />,
              },
              {
                title: "Low Success + High Time",
                description:
                  "Decrease the difficulty or recommend prerequisite practice before attempting harder questions.",
                icon: <Clock3 className="text-red-600" />,
              },
              {
                title: "Repeated Attempts",
                description:
                  "Treat repeated failures as evidence that the effective difficulty may be higher than the original label.",
                icon: <RotateCcw className="text-orange-500" />,
              },
              {
                title: "Frequent Hint Usage",
                description:
                  "Increase the difficulty estimate when users depend heavily on hints to complete questions.",
                icon: <AlertTriangle className="text-yellow-500" />,
              },
            ].map((rule, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {rule.icon}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {rule.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {rule.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Improvement Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <h2 className="text-2xl font-bold mb-8">
            Adaptive Learning Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "📊",
                title: "Track Performance",
                description:
                  "Continuously monitor success rate and solution quality.",
              },
              {
                icon: "⏱️",
                title: "Monitor Timing",
                description:
                  "Compare completion time with expected time for each level.",
              },
              {
                icon: "💡",
                title: "Track Hints",
                description:
                  "Use hint dependency as a signal for actual difficulty.",
              },
              {
                icon: "🎯",
                title: "Adjust Difficulty",
                description:
                  "Gradually increase or decrease difficulty based on evidence.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Calibration Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                AI Calibration Confidence
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                The calibration engine has enough performance evidence to
                confidently adjust the effective difficulty of this
                question. More attempts and additional performance data
                can further improve calibration accuracy.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.calibrationAccuracy}%
              </p>

              <p className="text-gray-500 mt-2">
                High Confidence
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.calibrationAccuracy}%`,
              }}
            />

          </div>

        </div>

        {/* AI Final Insight */}

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
                Fixed difficulty labels provide a useful starting point,
                but real user behavior gives a better indication of
                practical difficulty. By combining success rate,
                completion time, attempts, hints, and performance, the
                system can continuously personalize the question level
                for each learner.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Effective Level
              </h3>

              <p className="text-5xl font-black">
                {selected.effectiveDifficulty}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionDifficultyCalibration;