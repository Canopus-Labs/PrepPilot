import { useEffect, useState } from "react";



const modes = {
  study: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const StudyTimer = () => {

  const [mode, setMode] = useState("study");
  const [seconds, setSeconds] = useState(modes.study);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (running && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    setSeconds(modes[mode]);
    setRunning(false);
  }, [mode]);

  const minutes = String(
    Math.floor(seconds / 60)
  ).padStart(2, "0");

  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Brain
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Study Session Timer
            </h1>

            <p className="text-gray-500 mt-2">
              Pomodoro timer with focus analytics and
              productivity tracking.
            </p>

          </div>

        </div>

        {/* Timer */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-10 text-center mb-10">

          <Timer
            size={45}
            className="mx-auto text-violet-600 mb-6"
          />

          <div className="text-7xl font-black tracking-wider mb-8">

            {minutes}:{secs}

          </div>

          <div className="flex justify-center gap-4 mb-8">

            <button
              onClick={() => setMode("study")}
              className={`px-6 py-3 rounded-xl font-semibold ${
                mode === "study"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Study
            </button>

            <button
              onClick={() => setMode("short")}
              className={`px-6 py-3 rounded-xl font-semibold ${
                mode === "short"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Short Break
            </button>

            <button
              onClick={() => setMode("long")}
              className={`px-6 py-3 rounded-xl font-semibold ${
                mode === "long"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Long Break
            </button>

          </div>
                    {/* Controls */}

          <div className="flex justify-center gap-5">

            <button
              onClick={() => setRunning(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <Play size={18} />
              Start
            </button>

            <button
              onClick={() => setRunning(false)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <Pause size={18} />
              Pause
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setSeconds(modes[mode]);
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <RotateCcw size={18} />
              Reset
            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Today's Sessions
            </h3>

            <p className="text-3xl font-bold mt-3">
              6
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Focus Time
            </h3>

            <p className="text-3xl font-bold mt-3">
              2h 30m
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Focus Streak
            </h3>

            <p className="text-3xl font-bold mt-3">
              🔥 12
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Productivity
            </h3>

            <p className="text-3xl font-bold mt-3 text-green-600">
              91%
            </p>

          </div>

        </div>

        {/* Current Session */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <div className="flex items-center gap-3 mb-6">

            <Coffee
              size={24}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Current Session
            </h2>

          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-8">

            Stay focused until the timer finishes.
            After every study session, take a short break to
            improve concentration and productivity.
            Long breaks are automatically recommended after
            completing multiple study sessions.

          </p>

        </div>
                {/* Weekly Productivity */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Weekly Productivity
          </h2>

          <div className="space-y-6">

            {[
              { day: "Monday", value: 90 },
              { day: "Tuesday", value: 75 },
              { day: "Wednesday", value: 100 },
              { day: "Thursday", value: 82 },
              { day: "Friday", value: 65 },
              { day: "Saturday", value: 95 },
              { day: "Sunday", value: 88 },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    {item.day}
                  </span>

                  <span className="font-bold">
                    {item.value}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Study Session History */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Study Session History
          </h2>

          <div className="space-y-5">

            {[
              {
                subject: "Dynamic Programming",
                duration: "25 min",
                status: "Completed",
              },
              {
                subject: "System Design",
                duration: "25 min",
                status: "Completed",
              },
              {
                subject: "React Revision",
                duration: "25 min",
                status: "Completed",
              },
              {
                subject: "Behavioral Interview",
                duration: "15 min",
                status: "Break",
              },
            ].map((session, index) => (

              <div
                key={index}
                className="flex justify-between items-center p-5 rounded-2xl border border-gray-200 dark:border-white/10"
              >

                <div>

                  <h3 className="font-semibold">
                    {session.subject}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {session.duration}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    session.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {session.status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Focus Analytics */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Focus Analytics
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/20 p-6">

              <h3 className="text-gray-500">
                Best Focus Time
              </h3>

              <p className="text-2xl font-bold mt-3">
                10:00 AM
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-6">

              <h3 className="text-gray-500">
                Average Session
              </h3>

              <p className="text-2xl font-bold mt-3">
                24 min
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6">

              <h3 className="text-gray-500">
                Longest Focus
              </h3>

              <p className="text-2xl font-bold mt-3">
                55 min
              </p>

            </div>

          </div>

        </div>
                {/* Settings */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Study Settings
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <div>
                <h3 className="font-semibold">
                  Auto Start Next Session
                </h3>

                <p className="text-sm text-gray-500">
                  Automatically begin the next Pomodoro session after a break.
                </p>

              </div>

              <label className="relative inline-flex items-center cursor-pointer">

                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />

                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-violet-600 transition"></div>

              </label>

            </div>

            <div className="flex justify-between items-center">

              <div>
                <h3 className="font-semibold">
                  Daily Goal
                </h3>

                <p className="text-sm text-gray-500">
                  Complete 8 Pomodoro sessions today.
                </p>

              </div>

              <span className="font-bold text-violet-600">
                6 / 8
              </span>

            </div>

            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                style={{ width: "75%" }}
              />

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-4">
            Stay Focused 🚀
          </h2>

          <p className="leading-8 text-white/90">

            Small focused sessions every day produce
            extraordinary results. Continue your preparation,
            maintain your streak, and become interview-ready
            one Pomodoro at a time.

          </p>

        </div>

      </div>

    </div>
  );
};

export default StudyTimer;