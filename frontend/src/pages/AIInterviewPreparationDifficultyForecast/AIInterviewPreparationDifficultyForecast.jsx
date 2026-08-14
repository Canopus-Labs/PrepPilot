import React, { useMemo, useState } from "react";
import {
  Brain,
  CalendarDays,
  Clock3,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Gauge,
  SlidersHorizontal,
  ArrowRight,
  Zap,
  BarChart3,
} from "lucide-react";

const AIInterviewPreparationDifficultyForecast = () => {
  const [studyHours, setStudyHours] = useState(3);
  const [daysUntilInterview, setDaysUntilInterview] = useState(21);
  const [dailyQuestions, setDailyQuestions] = useState(10);

  const topics = [
    {
      name: "Data Structures & Algorithms",
      questions: 42,
      difficulty: "Hard",
      hours: 18,
      completion: 52,
      icon: BookOpen,
    },
    {
      name: "Core Computer Science",
      questions: 30,
      difficulty: "Medium",
      hours: 12,
      completion: 35,
      icon: Brain,
    },
    {
      name: "Programming",
      questions: 25,
      difficulty: "Medium",
      hours: 9,
      completion: 64,
      icon: Zap,
    },
    {
      name: "Aptitude",
      questions: 20,
      difficulty: "Easy",
      hours: 6,
      completion: 70,
      icon: Target,
    },
    {
      name: "Behavioral",
      questions: 15,
      difficulty: "Medium",
      hours: 5,
      completion: 40,
      icon: Sparkles,
    },
  ];

  const totalQuestions = topics.reduce(
    (sum, topic) => sum + topic.questions,
    0
  );

  const totalHours = topics.reduce(
    (sum, topic) => sum + topic.hours,
    0
  );

  const estimatedDays = Math.ceil(totalHours / studyHours);

  const workloadPerDay =
    daysUntilInterview > 0
      ? Math.ceil(totalHours / daysUntilInterview)
      : totalHours;

  const forecast = useMemo(() => {
    const availableHours = studyHours * daysUntilInterview;
    const requiredHours = totalHours;

    if (availableHours >= requiredHours * 1.3) {
      return {
        label: "Comfortable",
        score: 86,
        message:
          "Your available preparation time provides a healthy buffer for revision and unexpected delays.",
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      };
    }

    if (availableHours >= requiredHours) {
      return {
        label: "Manageable",
        score: 72,
        message:
          "Your plan is achievable, but you should maintain a consistent daily study routine.",
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
      };
    }

    if (availableHours >= requiredHours * 0.75) {
      return {
        label: "Challenging",
        score: 58,
        message:
          "Your current plan is possible but leaves little room for missed study sessions or difficult topics.",
        className:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
      };
    }

    return {
      label: "Overloaded",
      score: 38,
      message:
        "Your remaining workload is larger than your available study capacity. AI recommends reducing or redistributing the workload.",
      className:
        "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    };
  }, [studyHours, daysUntilInterview]);

  const getDifficultyClasses = (difficulty) => {
    if (difficulty === "Hard") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (difficulty === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  const getForecastBarWidth = () => {
    if (forecast.label === "Comfortable") return 86;
    if (forecast.label === "Manageable") return 72;
    if (forecast.label === "Challenging") return 58;
    return 38;
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
            <Gauge
              size={34}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Difficulty Forecast
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Forecast the difficulty of your remaining preparation
              workload and build a realistic plan around your available
              time and interview deadline.
            </p>
          </div>

        </div>

        {/* Overview Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Remaining Questions
            </p>

            <p className="text-5xl font-black mt-3">
              {totalQuestions}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Estimated Hours
            </p>

            <p className="text-5xl font-black mt-3">
              {totalHours}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarDays
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Estimated Days
            </p>

            <p className="text-5xl font-black mt-3">
              {estimatedDays}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Gauge
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Forecast
            </p>

            <p className="text-3xl font-black mt-5">
              {forecast.label}
            </p>

          </div>

        </div>

        {/* AI Forecast Banner */}

        <div className="mt-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Workload Forecast
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI evaluates your remaining topics, question difficulty,
            historical completion speed, available study hours, and
            interview deadline to estimate whether your preparation plan
            is realistic.
          </p>

        </div>

        {/* Forecast Status */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <Gauge className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Current Difficulty Forecast
                </h2>

              </div>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                {forecast.message}
              </p>

              <span
                className={`inline-block mt-5 px-4 py-2 rounded-full font-semibold ${forecast.className}`}
              >
                {forecast.label} Workload
              </span>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-indigo-600">
                {forecast.score}%
              </p>

              <p className="text-gray-500 mt-2">
                Preparation Feasibility
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
              style={{
                width: `${getForecastBarWidth()}%`,
              }}
            />

          </div>

        </div>

        {/* Planning Controls */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <SlidersHorizontal className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Preparation Plan Settings
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Study Hours */}

            <div>

              <label className="block font-semibold mb-3">
                Available Study Hours / Day
              </label>

              <input
                type="number"
                min="1"
                max="16"
                value={studyHours}
                onChange={(event) =>
                  setStudyHours(
                    Math.max(
                      1,
                      Math.min(
                        16,
                        Number(event.target.value) || 1
                      )
                    )
                  )
                }
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              />

              <input
                type="range"
                min="1"
                max="16"
                value={studyHours}
                onChange={(event) =>
                  setStudyHours(Number(event.target.value))
                }
                className="w-full mt-5 accent-indigo-600"
              />

              <p className="text-sm text-gray-500 mt-2">
                {studyHours} hours available each day
              </p>

            </div>

            {/* Deadline */}

            <div>

              <label className="block font-semibold mb-3">
                Days Until Interview
              </label>

              <input
                type="number"
                min="1"
                max="365"
                value={daysUntilInterview}
                onChange={(event) =>
                  setDaysUntilInterview(
                    Math.max(
                      1,
                      Math.min(
                        365,
                        Number(event.target.value) || 1
                      )
                    )
                  )
                }
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              />

              <input
                type="range"
                min="1"
                max="90"
                value={Math.min(daysUntilInterview, 90)}
                onChange={(event) =>
                  setDaysUntilInterview(
                    Number(event.target.value)
                  )
                }
                className="w-full mt-5 accent-indigo-600"
              />

              <p className="text-sm text-gray-500 mt-2">
                Interview in {daysUntilInterview} days
              </p>

            </div>

            {/* Daily Questions */}

            <div>

              <label className="block font-semibold mb-3">
                Target Questions / Day
              </label>

              <input
                type="number"
                min="1"
                max="100"
                value={dailyQuestions}
                onChange={(event) =>
                  setDailyQuestions(
                    Math.max(
                      1,
                      Math.min(
                        100,
                        Number(event.target.value) || 1
                      )
                    )
                  )
                }
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 outline-none"
              />

              <input
                type="range"
                min="1"
                max="50"
                value={Math.min(dailyQuestions, 50)}
                onChange={(event) =>
                  setDailyQuestions(
                    Number(event.target.value)
                  )
                }
                className="w-full mt-5 accent-indigo-600"
              />

              <p className="text-sm text-gray-500 mt-2">
                Targeting {dailyQuestions} questions daily
              </p>

            </div>

          </div>

        </div>

        {/* Capacity vs Workload */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <Clock3 className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Available Capacity
              </h2>

            </div>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Daily study time
                </span>

                <span className="font-bold">
                  {studyHours} hrs
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Remaining days
                </span>

                <span className="font-bold">
                  {daysUntilInterview}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Total available time
                </span>

                <span className="font-bold">
                  {studyHours * daysUntilInterview} hrs
                </span>

              </div>

              <div className="pt-5 border-t border-gray-200 dark:border-white/10">

                <div className="flex justify-between">

                  <span className="font-semibold">
                    Required preparation
                  </span>

                  <span className="font-black text-indigo-600">
                    {totalHours} hrs
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <BarChart3 className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Workload Distribution
              </h2>

            </div>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Remaining questions
                </span>

                <span className="font-bold">
                  {totalQuestions}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Estimated hours
                </span>

                <span className="font-bold">
                  {totalHours}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Required hours / day
                </span>

                <span className="font-bold">
                  {workloadPerDay.toFixed(1)} hrs
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Target questions / day
                </span>

                <span className="font-bold">
                  {dailyQuestions}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Topic Workload */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Remaining Preparation Workload
            </h2>

          </div>

          <div className="space-y-5">

            {topics.map((topic, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">

                      <topic.icon
                        size={23}
                        className="text-indigo-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-lg">
                        {topic.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {topic.questions} questions remaining
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap items-center gap-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyClasses(
                        topic.difficulty
                      )}`}
                    >
                      {topic.difficulty}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold">
                      {topic.hours} hrs
                    </span>

                  </div>

                </div>

                <div className="mt-6">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-gray-500">
                      Completion
                    </span>

                    <span className="font-semibold">
                      {topic.completion}%
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
                      style={{
                        width: `${topic.completion}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Difficulty Breakdown */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Gauge className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Difficulty Breakdown
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 p-6">

              <p className="text-green-700 dark:text-green-400 font-semibold">
                Easy
              </p>

              <p className="text-4xl font-black mt-3">
                20
              </p>

              <p className="text-gray-500 mt-2">
                questions
              </p>

              <p className="text-sm text-gray-500 mt-5">
                Estimated time: 4 hours
              </p>

            </div>

            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6">

              <p className="text-orange-700 dark:text-orange-400 font-semibold">
                Medium
              </p>

              <p className="text-4xl font-black mt-3">
                55
              </p>

              <p className="text-gray-500 mt-2">
                questions
              </p>

              <p className="text-sm text-gray-500 mt-5">
                Estimated time: 15 hours
              </p>

            </div>

            <div className="rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-6">

              <p className="text-red-700 dark:text-red-400 font-semibold">
                Hard
              </p>

              <p className="text-4xl font-black mt-3">
                57
              </p>

              <p className="text-gray-500 mt-2">
                questions
              </p>

              <p className="text-sm text-gray-500 mt-5">
                Estimated time: 23 hours
              </p>

            </div>

          </div>

        </div>

        {/* Deadline Forecast */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Deadline Forecast
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Expected Completion
              </p>

              <p className="text-3xl font-black mt-3">
                {estimatedDays} days
              </p>

              <p className="text-gray-500 mt-2">
                from today
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Interview Deadline
              </p>

              <p className="text-3xl font-black mt-3">
                {daysUntilInterview} days
              </p>

              <p className="text-gray-500 mt-2">
                remaining
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="text-sm text-gray-500">
                Preparation Buffer
              </p>

              <p
                className={`text-3xl font-black mt-3 ${
                  daysUntilInterview - estimatedDays >= 3
                    ? "text-green-600"
                    : daysUntilInterview - estimatedDays >= 0
                    ? "text-orange-500"
                    : "text-red-600"
                }`}
              >
                {daysUntilInterview - estimatedDays} days
              </p>

              <p className="text-gray-500 mt-2">
                before interview
              </p>

            </div>

          </div>

        </div>

        {/* Overload Warning */}

        {forecast.label === "Overloaded" ||
        forecast.label === "Challenging" ? (
          <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-8">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                <AlertTriangle className="text-orange-500" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Workload Adjustment Recommended
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                  Your current workload may be difficult to complete
                  comfortably before the interview. Consider reducing
                  daily question targets, prioritizing high-value topics,
                  or increasing study time gradually rather than creating
                  an unrealistic schedule.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 font-semibold">
                    Prioritize hard topics
                  </span>

                  <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 font-semibold">
                    Add revision buffer
                  </span>

                  <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 font-semibold">
                    Reduce overload
                  </span>

                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="mt-10 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-3xl p-8">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">

                <CheckCircle2 className="text-green-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Preparation Plan Looks Healthy
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                  Your available preparation time is sufficient for the
                  estimated workload. Keep some of your available time
                  reserved for revision, mock interviews, and unexpected
                  delays.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* AI Suggested Plan */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Suggested Workload Plan
            </h2>

          </div>

          <p className="text-white/90 leading-8 max-w-4xl">
            Based on your current settings, AI recommends approximately{" "}
            <strong>
              {workloadPerDay.toFixed(1)} hours
            </strong>{" "}
            of focused preparation per day. Use the remaining time for
            revision, mock interviews, and reviewing mistakes rather than
            filling every available hour with new questions.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Daily Focus
              </p>

              <p className="text-3xl font-black mt-2">
                {workloadPerDay.toFixed(1)} hrs
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Question Target
              </p>

              <p className="text-3xl font-black mt-2">
                {dailyQuestions}
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Revision Buffer
              </p>

              <p className="text-3xl font-black mt-2">
                {Math.max(
                  0,
                  daysUntilInterview - estimatedDays
                )} days
              </p>

            </div>

          </div>

        </div>

        {/* Daily Preparation Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Suggested Preparation Timeline
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                <span className="font-black text-violet-600">
                  01
                </span>

              </div>

              <h3 className="text-xl font-bold mt-5">
                Learn & Practice
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Focus on remaining concepts and solve new questions
                consistently.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                <span className="font-black text-blue-600">
                  02
                </span>

              </div>

              <h3 className="text-xl font-bold mt-5">
                Review Weak Areas
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Revisit mistakes, difficult topics, and questions that
                required hints.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                <span className="font-black text-green-600">
                  03
                </span>

              </div>

              <h3 className="text-xl font-bold mt-5">
                Mock & Revise
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Reduce new material and focus on mock interviews,
                revision, and confidence building.
              </p>

            </div>

          </div>

        </div>

        {/* Burnout Prevention */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Zap className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Burnout Prevention Recommendations
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "⏱️",
                title: "Use Study Blocks",
                description:
                  "Break long sessions into focused blocks with short breaks.",
              },
              {
                icon: "🧘",
                title: "Keep Buffer Time",
                description:
                  "Do not schedule every available hour for new questions.",
              },
              {
                icon: "🔄",
                title: "Mix Difficulty",
                description:
                  "Combine easy, medium, and hard questions instead of only difficult ones.",
              },
              {
                icon: "😴",
                title: "Protect Rest",
                description:
                  "Consistent rest helps maintain learning quality and interview performance.",
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

        {/* Deadline Action Plan */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Deadline Action Plan
            </h2>

          </div>

          <div className="space-y-5">

            {[
              {
                title: "Complete highest-priority topics",
                detail:
                  "Finish DSA and Core CS topics before spending additional time on low-priority areas.",
                icon: "🎯",
              },
              {
                title: "Reserve time for weak areas",
                detail:
                  "Use your historical performance to revisit topics where accuracy is lowest.",
                icon: "📊",
              },
              {
                title: "Schedule mock interviews",
                detail:
                  "Include realistic mock sessions before the final interview week.",
                icon: "🎤",
              },
              {
                title: "Create a revision buffer",
                detail:
                  "Avoid planning new material right up to the interview date.",
                icon: "📝",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-3xl">
                  {item.icon}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-2 leading-6">
                    {item.detail}
                  </p>

                </div>

                <ArrowRight
                  className="ml-auto text-gray-400 shrink-0 hidden sm:block"
                />

              </div>

            ))}

          </div>

        </div>

        {/* AI Personalized Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <p className="text-white/90 leading-8 max-w-4xl">
            Your preparation plan should prioritize sustainable progress
            over maximum daily question counts. AI estimates that your
            remaining workload requires around{" "}
            <strong>
              {totalHours} hours
            </strong>{" "}
            of focused preparation. With{" "}
            <strong>
              {studyHours} hours per day
            </strong>{" "}
            available, you are expected to complete the current workload
            in approximately{" "}
            <strong>
              {estimatedDays} days
            </strong>
            .
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Estimated Workload
              </p>

              <p className="text-3xl font-black mt-2">
                {totalHours} hrs
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Completion Estimate
              </p>

              <p className="text-3xl font-black mt-2">
                {estimatedDays} days
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Current Forecast
              </p>

              <p className="text-3xl font-black mt-2">
                {forecast.label}
              </p>

            </div>

          </div>

        </div>

        {/* Preparation Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <h2 className="text-2xl font-bold mb-8">
            Preparation Difficulty Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "📚",
                title: "Remaining Topics",
                description:
                  "Know exactly which concepts still need to be covered.",
              },
              {
                icon: "🎯",
                title: "Question Difficulty",
                description:
                  "Account for the extra time required by difficult questions.",
              },
              {
                icon: "⏱️",
                title: "Completion Speed",
                description:
                  "Use your historical pace instead of guessing study duration.",
              },
              {
                icon: "📅",
                title: "Interview Deadline",
                description:
                  "Keep enough time for revision before the interview.",
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

        {/* Overall Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Preparation Feasibility Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                This score represents how realistic your current
                preparation workload is compared with your available time
                and interview deadline.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-indigo-600">
                {forecast.score}%
              </p>

              <p className="text-gray-500 mt-2">
                {forecast.label}
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
              style={{
                width: `${forecast.score}%`,
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
                A strong preparation plan is not simply about completing
                the maximum number of questions. The goal is to finish the
                most important topics, leave enough time for revision, and
                maintain a sustainable workload. Use this forecast to
                adjust your plan whenever your available time or interview
                deadline changes.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                📅
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Workload
              </h3>

              <p className="text-5xl font-black">
                {forecast.label}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationDifficultyForecast;