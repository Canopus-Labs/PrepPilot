import { useState } from "react";



const MilestoneTimeline = () => {

  const milestones = [
    {
      id: 1,
      type: "Account",
      title: "PrepPilot Account Created",
      date: "10 Jan 2026",
      description: "Started interview preparation journey.",
      icon: <User size={22} />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "Resume",
      title: "Resume Completed",
      date: "25 Jan 2026",
      description: "Finished ATS-friendly resume.",
      icon: <FileText size={22} />,
      color: "bg-green-500",
    },
    {
      id: 3,
      type: "DSA",
      title: "Solved 100 DSA Questions",
      date: "15 Feb 2026",
      description: "Reached first DSA milestone.",
      icon: <Code2 size={22} />,
      color: "bg-violet-600",
    },
    {
      id: 4,
      type: "Mock",
      title: "Completed 10 Mock Interviews",
      date: "05 Mar 2026",
      description: "Improved interview confidence.",
      icon: <Brain size={22} />,
      color: "bg-orange-500",
    },
    {
      id: 5,
      type: "Certificate",
      title: "Earned Interview Ready Badge",
      date: "20 Mar 2026",
      description: "Received milestone certificate.",
      icon: <Trophy size={22} />,
      color: "bg-yellow-500",
    },
    {
      id: 6,
      type: "Streak",
      title: "30-Day Study Streak",
      date: "28 Mar 2026",
      description: "Maintained continuous preparation.",
      icon: <Flame size={22} />,
      color: "bg-red-500",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filteredMilestones =
    filter === "All"
      ? milestones
      : milestones.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Calendar
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Milestone Timeline
              </h1>

              <p className="text-gray-500 mt-2">

                View your complete interview preparation journey,
                achievements, and learning milestones.

              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold">

            Export Timeline

          </button>

        </div>

        {/* Filters */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 mb-10">

          <div className="flex items-center gap-3 mb-5">

            <Filter
              size={20}
              className="text-violet-600"
            />

            <h2 className="text-xl font-bold">
              Filter Milestones
            </h2>

          </div>

          <div className="flex flex-wrap gap-3">

            {[
              "All",
              "Account",
              "Resume",
              "DSA",
              "Mock",
              "Certificate",
              "Streak",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  filter === item
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>
                {/* Timeline */}

        <div className="relative">

          {/* Vertical Line */}

          <div className="absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>

          <div className="space-y-8">

            {filteredMilestones.map((item) => (

              <div
                key={item.id}
                className="relative flex gap-6"
              >

                {/* Icon */}

                <div
                  className={`w-14 h-14 rounded-full ${item.color} text-white flex items-center justify-center shadow-lg z-10 shrink-0`}
                >
                  {item.icon}
                </div>

                {/* Card */}

                <div className="flex-1 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-xl transition">

                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {item.title}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {item.description}
                      </p>

                    </div>

                    <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                      {item.type}

                    </span>

                  </div>

                  <div className="flex items-center gap-3 mt-6 text-gray-500">

                    <Calendar
                      size={18}
                      className="text-violet-600"
                    />

                    <span className="font-medium">
                      {item.date}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Journey Summary */}

        <div className="mt-12 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Journey Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/20 p-6">

              <h3 className="text-gray-500">
                Total Milestones
              </h3>

              <p className="text-4xl font-black mt-3 text-violet-600">
                {filteredMilestones.length}
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-6">

              <h3 className="text-gray-500">
                Certificates
              </h3>

              <p className="text-4xl font-black mt-3 text-green-600">
                5
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/20 p-6">

              <h3 className="text-gray-500">
                Current Streak
              </h3>

              <p className="text-4xl font-black mt-3 text-orange-600">
                🔥 30
              </p>

            </div>

          </div>

        </div>
                {/* Achievement Dashboard */}

        <div className="mt-12 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Achievement Dashboard
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 p-6 text-center">

              <Trophy
                size={34}
                className="mx-auto text-yellow-500 mb-4"
              />

              <h3 className="text-gray-500">
                Badges Earned
              </h3>

              <p className="text-4xl font-black mt-3">
                12
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-6 text-center">

              <Code2
                size={34}
                className="mx-auto text-green-600 mb-4"
              />

              <h3 className="text-gray-500">
                DSA Solved
              </h3>

              <p className="text-4xl font-black mt-3">
                245
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6 text-center">

              <Brain
                size={34}
                className="mx-auto text-blue-600 mb-4"
              />

              <h3 className="text-gray-500">
                Mock Interviews
              </h3>

              <p className="text-4xl font-black mt-3">
                18
              </p>

            </div>

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-6 text-center">

              <Flame
                size={34}
                className="mx-auto text-red-500 mb-4"
              />

              <h3 className="text-gray-500">
                Study Streak
              </h3>

              <p className="text-4xl font-black mt-3">
                30 Days
              </p>

            </div>

          </div>

        </div>

        {/* Earned Certificates */}

        <div className="mt-12 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Certificates & Badges
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Interview Ready Certificate",
              "100 DSA Problems Badge",
              "30-Day Study Streak",
              "Resume Excellence Badge",
              "Mock Interview Master",
              "Skill Assessment Expert",
            ].map((badge, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition"
              >

                <Trophy
                  size={28}
                  className="text-yellow-500 mb-4"
                />

                <h3 className="font-semibold">
                  {badge}
                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Export Section */}

        <div className="mt-12 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-4">
            Export Your Journey
          </h2>

          <p className="leading-8 text-white/90 mb-8">

            Save your complete interview preparation timeline
            as an image or PDF and share your achievements.

          </p>

          <div className="flex flex-wrap gap-4">

            <button className="px-6 py-3 rounded-xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition">

              Export as PDF

            </button>

            <button className="px-6 py-3 rounded-xl border border-white text-white font-bold hover:bg-white hover:text-violet-700 transition">

              Export as Image

            </button>

          </div>

        </div>
                {/* Timeline Summary */}

        <div className="mt-12 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Preparation Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your interview preparation journey shows consistent
            progress across multiple learning modules including
            DSA, Mock Interviews, Resume Building, Skill
            Assessments, Flashcards, and Study Streaks.

            Continue maintaining your preparation consistency
            to unlock more milestones, certificates,
            and achievement badges.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Every Milestone Matters 🚀
              </h2>

              <p className="leading-8 text-white/90">

                Every solved problem, completed interview,
                earned certificate, and study session
                contributes to your success.

                Keep learning consistently and your
                timeline will continue to grow with
                achievements.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🏆
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Timeline Score
              </h3>

              <p className="text-4xl font-black">
                96%
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MilestoneTimeline;