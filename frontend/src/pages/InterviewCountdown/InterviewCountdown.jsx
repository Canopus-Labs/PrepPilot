import { useState } from "react";



const InterviewCountdown = () => {
  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Software Engineer");
  const [mode, setMode] = useState("Online");
  const [date, setDate] = useState("2026-09-20T10:00");

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Clock3
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Interview Deadline Countdown
              </h1>

              <p className="text-gray-500 mt-2">

                Track your upcoming interviews,
                receive milestone reminders,
                and stay prepared.

              </p>

            </div>

          </div>

        </div>

        {/* Interview Details */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Interview Details

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Company */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">

                <Building2
                  size={18}
                  className="text-violet-600"
                />

                Company

              </label>

              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            {/* Role */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">

                <Briefcase
                  size={18}
                  className="text-violet-600"
                />

                Role

              </label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            {/* Interview Date */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">

                <Calendar
                  size={18}
                  className="text-violet-600"
                />

                Interview Date

              </label>

              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            {/* Mode */}

            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">

                <MapPin
                  size={18}
                  className="text-violet-600"
                />

                Interview Mode

              </label>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
              >

                <option>Online</option>

                <option>Offline</option>

              </select>

            </div>

          </div>

        </div>
                {/* Live Countdown */}

        <div className="mt-10 grid lg:grid-cols-4 gap-6">

          {[
            {
              label: "Days",
              value: "18",
            },
            {
              label: "Hours",
              value: "14",
            },
            {
              label: "Minutes",
              value: "36",
            },
            {
              label: "Seconds",
              value: "45",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center"
            >

              <Clock3
                size={30}
                className="mx-auto text-violet-600 mb-4"
              />

              <p className="text-5xl font-black text-violet-600">

                {item.value}

              </p>

              <p className="mt-3 text-gray-500 font-semibold">

                {item.label}

              </p>

            </div>

          ))}

        </div>

        {/* Milestone Reminders */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bell
              size={24}
              className="text-yellow-500"
            />

            <h2 className="text-2xl font-bold">

              Milestone Reminders

            </h2>

          </div>

          <div className="space-y-5">

            {[
              {
                title: "30 Days Remaining",
                desc: "Complete resume review and finish core DSA topics.",
                color: "bg-blue-100 text-blue-700",
              },
              {
                title: "7 Days Remaining",
                desc: "Take mock interviews and revise HR questions.",
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "1 Day Remaining",
                desc: "Review notes, sleep well, and prepare documents.",
                color: "bg-red-100 text-red-700",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.desc}

                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${item.color}`}
                >

                  Reminder

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Countdown Overview */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Company

            </h3>

            <p className="text-3xl font-black mt-4">

              {company}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Position

            </h3>

            <p className="text-3xl font-black mt-4">

              {role}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Mode

            </h3>

            <p className="text-3xl font-black mt-4">

              {mode}

            </p>

          </div>

        </div>
                {/* AI Recommended Preparation Tasks */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            AI Recommended Tasks
          </h2>

          <div className="space-y-5">

            {[
              "Complete 3 Mock Interviews",
              "Solve 50 Medium DSA Problems",
              "Revise Operating System Notes",
              "Practice Behavioral Interview Questions",
              "Review Resume & LinkedIn Profile",
              "Practice Aptitude Questions",
            ].map((task, index) => (

              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <p className="font-medium">
                  {task}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Preparation Roadmap */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Preparation Roadmap

          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Resume Preparation",
                progress: 100,
              },
              {
                title: "DSA Practice",
                progress: 82,
              },
              {
                title: "Mock Interviews",
                progress: 65,
              },
              {
                title: "Core Subjects",
                progress: 75,
              },
              {
                title: "HR Preparation",
                progress: 55,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    {item.title}
                  </span>

                  <span className="font-bold">
                    {item.progress}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Readiness Dashboard */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Overall Readiness
            </p>

            <p className="text-5xl font-black text-green-600 mt-4">
              84%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Completed Tasks
            </p>

            <p className="text-5xl font-black text-violet-600 mt-4">
              42
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              Pending Tasks
            </p>

            <p className="text-5xl font-black text-orange-600 mt-4">
              11
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <p className="text-gray-500">
              AI Confidence
            </p>

            <p className="text-5xl font-black text-blue-600 mt-4">
              92%
            </p>

          </div>

        </div>

        {/* Priority Checklist */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            Priority Checklist
          </h2>

          <div className="space-y-4">

            {[
              "Review Resume",
              "Complete Mock Interview",
              "Revise DSA Notes",
              "Prepare Behavioral Answers",
              "Sleep Well Before Interview",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <div className="w-7 h-7 rounded-full bg-white text-violet-700 flex items-center justify-center font-bold">

                  ✓

                </div>

                <p className="text-lg">

                  {item}

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* AI Countdown Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Countdown Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your interview schedule and preparation
            progress, you are making excellent progress.
            Focus on completing pending mock interviews,
            revising important DSA concepts, and practicing
            behavioral questions during the remaining days.

            Continue following your preparation roadmap to
            maximize your interview performance.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Your Dream Job is Getting Closer 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every day before your interview is an
                opportunity to improve your skills.
                Stay calm, remain consistent, and trust
                your preparation.

                Small daily improvements create big
                interview success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                ⏳

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Preparation Score

              </h3>

              <p className="text-5xl font-black">

                91%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InterviewCountdown;