import { useState } from "react";



const GoalTracker = () => {
  const [goals] = useState([
    {
      id: 1,
      title: "Solve 300 DSA Questions",
      completed: 185,
      total: 300,
      deadline: "30 Sept 2026",
      status: "In Progress",
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 2,
      title: "Complete 20 Mock Interviews",
      completed: 12,
      total: 20,
      deadline: "15 Sept 2026",
      status: "In Progress",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Finish Resume",
      completed: 1,
      total: 1,
      deadline: "5 Aug 2026",
      status: "Completed",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Weekly Aptitude Revision",
      completed: 3,
      total: 5,
      deadline: "Every Sunday",
      status: "In Progress",
      color: "from-orange-500 to-red-500",
    },
  ]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Target
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Interview Preparation Goal Tracker
              </h1>

              <p className="text-gray-500 mt-2">
                Set goals, monitor milestones, and stay on track
                throughout your interview preparation journey.
              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition">

            <PlusCircle size={18} />

            Create Goal

          </button>

        </div>

        {/* Overview Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <Target
              size={30}
              className="text-violet-600 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Active Goals
            </h3>

            <p className="text-3xl font-bold mt-2">
              4
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <CheckCircle2
              size={30}
              className="text-green-600 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Completed
            </h3>

            <p className="text-3xl font-bold mt-2">
              8
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <Flame
              size={30}
              className="text-orange-500 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Goal Streak
            </h3>

            <p className="text-3xl font-bold mt-2">
              🔥 16 Days
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <Trophy
              size={30}
              className="text-yellow-500 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Achievement Score
            </h3>

            <p className="text-3xl font-bold mt-2">
              87%
            </p>

          </div>

        </div>
                {/* Goals */}

        <div className="space-y-8 mb-10">

          {goals.map((goal) => {

            const progress = Math.round(
              (goal.completed / goal.total) * 100
            );

            return (

              <div
                key={goal.id}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold mb-3">
                      {goal.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 mb-6">

                      <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                        {goal.completed} / {goal.total}

                      </span>

                      <span
                        className={`px-4 py-2 rounded-full font-semibold ${
                          goal.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {goal.status}
                      </span>

                    </div>

                    {/* Progress */}

                    <div className="mb-6">

                      <div className="flex justify-between mb-3">

                        <span className="font-semibold">
                          Progress
                        </span>

                        <span className="font-bold">
                          {progress}%
                        </span>

                      </div>

                      <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Deadline */}

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                      <Calendar
                        size={18}
                        className="text-violet-600"
                      />

                      <span>
                        Deadline: {goal.deadline}
                      </span>

                    </div>

                  </div>

                  {/* Side */}

                  <div className="flex flex-col justify-center items-center lg:w-52">

                    <div
                      className={`w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-r ${goal.color} text-white text-3xl font-black shadow-lg`}
                    >
                      {progress}%
                    </div>

                    <button className="mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition w-full">

                      Update Progress

                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>
                {/* Achievement Notifications */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">

            <Trophy
              size={26}
              className="text-yellow-500"
            />

            Recent Achievements

          </h2>

          <div className="space-y-5">

            {[
              "🏆 Completed Resume Preparation Goal",
              "🔥 Maintained a 16-day preparation streak",
              "✅ Solved 150+ DSA Questions",
              "🎯 Finished 10 Mock Interviews",
            ].map((achievement, index) => (

              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/20"
              >

                <Trophy
                  size={22}
                  className="text-yellow-500"
                />

                <p className="font-medium">
                  {achievement}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Goal Completion History */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Goal Completion History
          </h2>

          <div className="space-y-5">

            {[
              {
                goal: "Resume Completed",
                date: "02 Aug 2026",
                status: "Completed",
              },
              {
                goal: "Portfolio Updated",
                date: "26 Jul 2026",
                status: "Completed",
              },
              {
                goal: "Mock Interview Milestone",
                date: "20 Jul 2026",
                status: "Completed",
              },
              {
                goal: "Aptitude Weekly Revision",
                date: "14 Jul 2026",
                status: "Completed",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center p-5 rounded-2xl border border-gray-200 dark:border-white/10"
              >

                <div>

                  <h3 className="font-semibold">
                    {item.goal}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.date}
                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

                  {item.status}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Upcoming Milestones */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Upcoming Milestones
          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Solve 200 DSA Questions",
                progress: 92,
              },
              {
                title: "15 Mock Interviews",
                progress: 80,
              },
              {
                title: "Complete Weekly Revision",
                progress: 60,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    {item.title}
                  </span>

                  <span className="font-bold">
                    {item.progress}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Motivation Section */}

        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl mb-10">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Keep Moving Towards Your Dream Job 🚀
              </h2>

              <p className="leading-8 text-white/90">

                Every solved problem, every mock interview,
                every revision session, and every completed goal
                takes you one step closer to your dream company.

                Stay consistent and keep improving every day.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Success Rate
              </h3>

              <p className="text-4xl font-black">
                87%
              </p>

            </div>

          </div>

        </div>

        {/* Overall Summary */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Preparation Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your interview preparation is progressing well.
            You have completed several important milestones,
            maintained an excellent preparation streak,
            and consistently achieved your learning goals.

            Continue solving DSA questions,
            participating in mock interviews,
            revising aptitude,
            and improving your resume to maximize your interview readiness.

          </p>

        </div>

      </div>

    </div>
  );
};

export default GoalTracker;
        