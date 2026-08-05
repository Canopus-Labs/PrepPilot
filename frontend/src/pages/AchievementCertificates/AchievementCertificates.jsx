import { useState } from "react";



const AchievementCertificates = () => {
  const [certificates] = useState([
    {
      id: "PP-1001",
      title: "100 Interview Questions Completed",
      date: "10 Aug 2026",
      unlocked: true,
      progress: 100,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "PP-1002",
      title: "Completed DSA Sheet",
      date: "15 Aug 2026",
      unlocked: true,
      progress: 100,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "PP-1003",
      title: "30-Day Study Streak",
      date: "Locked",
      unlocked: false,
      progress: 72,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "PP-1004",
      title: "10 Mock Interviews",
      date: "Locked",
      unlocked: false,
      progress: 50,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "PP-1005",
      title: "90% Assessment Score",
      date: "20 Aug 2026",
      unlocked: true,
      progress: 100,
      color: "from-pink-500 to-rose-500",
    },
  ]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">

              <Award
                size={34}
                className="text-yellow-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Interview Preparation Certificates
              </h1>

              <p className="text-gray-500 mt-2">
                Earn achievement certificates as you complete
                interview preparation milestones.
              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

            <Download size={18} />

            Download All

          </button>

        </div>
                {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <Trophy
              size={32}
              className="text-yellow-500 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Certificates Earned
            </h3>

            <p className="text-3xl font-bold mt-2">
              3
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <Target
              size={32}
              className="text-violet-600 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Questions Solved
            </h3>

            <p className="text-3xl font-bold mt-2">
              124
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <Star
              size={32}
              className="text-orange-500 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Current Streak
            </h3>

            <p className="text-3xl font-bold mt-2">
              21 Days
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <BadgeCheck
              size={32}
              className="text-green-600 mb-4"
            />

            <h3 className="text-gray-500 text-sm">
              Mock Interviews
            </h3>

            <p className="text-3xl font-bold mt-2">
              8
            </p>

          </div>

        </div>

        {/* Progress */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Achievement Progress
          </h2>

          <div className="space-y-8">

            {certificates.map((item) => (

              <div key={item.id}>

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    {item.title}
                  </span>

                  <span className="font-bold">
                    {item.progress}%
                  </span>

                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Certificate Gallery */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold mb-8">
            Achievement Certificates
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {certificates.map((certificate) => (

              <div
                key={certificate.id}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow-lg border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-xl transition"
              >

                {/* Top Banner */}

                <div
                  className={`bg-gradient-to-r ${certificate.color} p-6 text-white`}
                >

                  <Award size={42} className="mb-4" />

                  <h3 className="text-xl font-bold">
                    {certificate.title}
                  </h3>

                  <p className="text-sm opacity-90 mt-2">
                    Certificate of Achievement
                  </p>

                </div>

                {/* Body */}

                <div className="p-6">

                  <div className="flex items-center gap-3 mb-4">

                    <Calendar
                      size={18}
                      className="text-violet-600"
                    />

                    <span className="font-medium">
                      {certificate.date}
                    </span>

                  </div>

                  <div className="mb-4">

                    <span className="text-gray-500 text-sm">
                      Certificate ID
                    </span>

                    <p className="font-bold">
                      {certificate.id}
                    </p>

                  </div>

                  {/* QR Placeholder */}

                  <div className="flex justify-center my-6">

                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">

                      <QrCode
                        size={42}
                        className="text-gray-500"
                      />

                    </div>

                  </div>

                  {/* Status */}

                  <div className="flex justify-center mb-6">

                    {certificate.unlocked ? (

                      <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                        Unlocked
                      </span>

                    ) : (

                      <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 font-semibold">
                        Locked
                      </span>

                    )}

                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3">

                    <button
                      className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition"
                      disabled={!certificate.unlocked}
                    >
                      <Download size={18} />
                      Download
                    </button>

                    <button
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-white/10 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      disabled={!certificate.unlocked}
                    >
                      <Share2 size={18} />
                      Share
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Motivation Section */}

        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Keep Unlocking New Achievements 🚀
              </h2>

              <p className="text-white/90 leading-7 max-w-2xl">
                Every interview question solved, every mock interview completed,
                and every study streak brings you one step closer to your dream
                job. Continue preparing consistently to unlock more certificates
                and showcase your achievements.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl font-black">
                🏆
              </div>

              <p className="mt-3 text-lg font-semibold">
                Next Milestone
              </p>

              <p className="text-white/80">
                Complete 10 Mock Interviews
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AchievementCertificates;