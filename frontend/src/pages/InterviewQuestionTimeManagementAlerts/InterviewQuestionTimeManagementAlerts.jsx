import React, { useEffect, useState } from "react";
import {
  Clock3,
  AlertTriangle,
  TimerReset,
  Target,
  TrendingUp,
  Zap,
  Settings2,
} from "lucide-react";

const InterviewQuestionTimeManagementAlerts = () => {
  const [settings, setSettings] = useState({
    warningThreshold: 60,
    criticalThreshold: 90,
  });

  const [seconds, setSeconds] = useState(74);
  const [isRunning, setIsRunning] = useState(true);
  const [showWarning, setShowWarning] = useState(true);

  const [stats] = useState({
    averageTime: "1m 18s",
    pacingScore: 86,
    questionsCompleted: 24,
    totalTime: "31m 12s",
  });

  const [questions] = useState([
    {
      title: "Two Sum",
      difficulty: "Easy",
      time: "0m 48s",
      status: "On Time",
    },
    {
      title: "Merge Intervals",
      difficulty: "Medium",
      time: "1m 24s",
      status: "Warning",
    },
    {
      title: "LRU Cache",
      difficulty: "Hard",
      time: "2m 11s",
      status: "Over Time",
    },
    {
      title: "Binary Search",
      difficulty: "Easy",
      time: "0m 42s",
      status: "On Time",
    },
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (seconds >= settings.warningThreshold) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [seconds, settings.warningThreshold]);

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const remainingSeconds = value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(true);
    setShowWarning(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">

            <Clock3
              size={34}
              className="text-orange-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Interview Question Time Management Alerts
            </h1>

            <p className="text-gray-500 mt-2">
              Track your question-solving pace, receive timely warnings,
              and learn when to move on during interview practice.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Average Question Time
            </h3>

            <p className="text-4xl font-black mt-3">
              {stats.averageTime}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Pacing Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.pacingScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Zap
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Questions Completed
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.questionsCompleted}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Total Practice Time
            </h3>

            <p className="text-4xl font-black mt-3">
              {stats.totalTime}
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            Smart Time Management
          </h2>

          <p className="leading-8 text-white/90">
            AI monitors how long you spend on each question and compares
            your pacing against configurable thresholds. When you're
            spending too much time on a problem, the system provides a
            gentle reminder to reassess your approach or move forward.
          </p>

        </div>

        {/* Active Question Timer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <div className="flex items-center gap-3">

                <TimerReset className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Active Question Timer
                </h2>

              </div>

              <h3 className="text-xl font-semibold mt-6">
                Design an LRU Cache
              </h3>

              <p className="text-gray-500 mt-2">
                Difficulty: Hard
              </p>

            </div>

            <div className="text-center">

              <p
                className={`text-7xl font-black ${
                  seconds >= settings.criticalThreshold
                    ? "text-red-600"
                    : seconds >= settings.warningThreshold
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
              >
                {formatTime(seconds)}
              </p>

              <div className="flex gap-3 justify-center mt-6">

                <button
                  onClick={() => setIsRunning((value) => !value)}
                  className="px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold"
                >
                  {isRunning ? "Pause" : "Resume"}
                </button>

                <button
                  onClick={resetTimer}
                  className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold"
                >
                  Reset
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Time Warning */}

        {showWarning && (

          <div className="mt-8 rounded-3xl border border-orange-300 bg-orange-50 dark:bg-orange-900/10 p-8">

            <div className="flex items-start gap-5">

              <AlertTriangle
                size={32}
                className="text-orange-500 shrink-0"
              />

              <div>

                <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  Time Management Alert
                </h2>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  You have spent more than{" "}
                  {settings.warningThreshold} seconds on this question.
                  Consider reviewing your current approach and deciding
                  whether to continue or move to the next question.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <button className="px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold">
                    Move to Next Question
                  </button>

                  <button
                    onClick={() => setShowWarning(false)}
                    className="px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-orange-200 dark:border-white/10 font-semibold"
                  >
                    Dismiss Warning
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* Threshold Settings */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Settings2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Time Threshold Settings
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <label className="block font-semibold mb-3">
                Warning Threshold
              </label>

              <div className="flex items-center gap-4">

                <input
                  type="range"
                  min="30"
                  max="180"
                  step="10"
                  value={settings.warningThreshold}
                  onChange={(e) =>
                    setSettings((previous) => ({
                      ...previous,
                      warningThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />

                <span className="font-bold min-w-[70px]">
                  {settings.warningThreshold}s
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2">
                Receive a gentle warning after this amount of time.
              </p>

            </div>

            <div>

              <label className="block font-semibold mb-3">
                Critical Threshold
              </label>

              <div className="flex items-center gap-4">

                <input
                  type="range"
                  min="60"
                  max="300"
                  step="10"
                  value={settings.criticalThreshold}
                  onChange={(e) =>
                    setSettings((previous) => ({
                      ...previous,
                      criticalThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />

                <span className="font-bold min-w-[70px]">
                  {settings.criticalThreshold}s
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2">
                Marks a question as significantly over time.
              </p>

            </div>

          </div>

        </div>

        {/* Question Pacing Overview */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Question Pacing Overview
          </h2>

          <div className="space-y-5">

            {questions.map((question, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      {question.title}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {question.difficulty} • {question.time}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full w-fit ${
                      question.status === "On Time"
                        ? "bg-green-100 text-green-700"
                        : question.status === "Warning"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {question.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Slowest Questions */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle className="text-red-500" />

              <h2 className="text-2xl font-bold">
                Slowest Questions
              </h2>

            </div>

            <div className="space-y-5">

              {[
                ["LRU Cache", "2m 11s"],
                ["Graph Shortest Path", "1m 58s"],
                ["Dynamic Programming", "1m 51s"],
              ].map(([question, time], index) => (

                <div
                  key={index}
                  className="flex justify-between items-center rounded-xl border border-red-200 dark:border-red-900/20 p-5"
                >

                  <span className="font-semibold">
                    {question}
                  </span>

                  <span className="font-bold text-red-600">
                    {time}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Fastest Questions */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-8">

              <Zap className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Fastest Questions
              </h2>

            </div>

            <div className="space-y-5">

              {[
                ["Binary Search", "0m 42s"],
                ["Two Sum", "0m 48s"],
                ["Valid Parentheses", "0m 51s"],
              ].map(([question, time], index) => (

                <div
                  key={index}
                  className="flex justify-between items-center rounded-xl border border-green-200 dark:border-green-900/20 p-5"
                >

                  <span className="font-semibold">
                    {question}
                  </span>

                  <span className="font-bold text-green-600">
                    {time}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Post Session Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Post-Session Time Management Analytics
          </h2>

          {[
            ["Questions Completed Within Target", 78],
            ["Questions Requiring Warning", 17],
            ["Questions Going Over Critical Limit", 5],
            ["Overall Pacing Efficiency", stats.pacingScore],
          ].map(([label, value], index) => (

            <div key={index} className="mb-7">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className={`h-full ${
                    index === 2
                      ? "bg-gradient-to-r from-red-500 to-rose-600"
                      : "bg-gradient-to-r from-violet-500 to-purple-600"
                  }`}
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Time Management Recommendations
          </h2>

          <div className="space-y-5">

            {[
              "Set a 90-second checkpoint for medium-difficulty coding questions.",
              "If you have not identified an approach after the warning threshold, move to another question.",
              "Avoid spending excessive time debugging one small implementation detail.",
              "Practice timed problem sets to improve your pacing.",
              "Review your slowest questions after each session to identify recurring bottlenecks.",
              "Use the remaining interview time strategically instead of trying to fully solve every difficult problem.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                💡 {recommendation}

              </div>

            ))}

          </div>

        </div>

        {/* Pacing Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Your Interview Pacing Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your pacing indicates that you generally manage time
                effectively, but a few difficult questions are consuming
                more time than recommended.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.pacingScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Good Pacing
              </p>

            </div>

          </div>

        </div>

        {/* Practice Strategy */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Recommended Practice Strategy
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["⏱️", "Timed Practice", "Solve questions under realistic time limits."],
              ["🎯", "Checkpoint", "Review your approach at the warning threshold."],
              ["🔄", "Move Forward", "Skip and return when a problem consumes too much time."],
              ["📊", "Review", "Analyze slow questions after each session."],
            ].map(([icon, title, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Master Your Interview Pace 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Great interview performance is not only about solving
                problems correctly. Knowing when to continue, rethink
                your approach, or move forward is an essential interview
                skill. Use these alerts to build confident and efficient
                pacing.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                ⏱️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Pacing Score
              </h3>

              <p className="text-5xl font-black">
                {stats.pacingScore}%
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InterviewQuestionTimeManagementAlerts;