


const ReadinessPredictor = () => {
  const readinessScore = 82;

  const readinessLevel =
    readinessScore >= 90
      ? "Excellent"
      : readinessScore >= 75
      ? "Interview Ready"
      : readinessScore >= 50
      ? "Intermediate"
      : "Beginner";

  const progressData = [
    {
      title: "Mock Interviews",
      score: 85,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "DSA Progress",
      score: 78,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Skill Assessments",
      score: 90,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Resume",
      score: 88,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Flashcards",
      score: 74,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "AI Practice",
      score: 80,
      color: "from-indigo-500 to-violet-500",
    },
  ];

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (readinessScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

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
              Interview Readiness Predictor
            </h1>

            <p className="text-gray-500 mt-2">
              Analyze your interview preparation and discover
              how ready you are for your next opportunity.
            </p>

          </div>

        </div>

        {/* Score Section */}

        <div className="grid lg:grid-cols-2 gap-10 mb-12">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-10 flex flex-col items-center">

            <svg
              width="220"
              height="220"
              className="-rotate-90"
            >

              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />

              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />

              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  x2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#7C3AED"
                  />
                  <stop
                    offset="100%"
                    stopColor="#9333EA"
                  />
                </linearGradient>
              </defs>

            </svg>

            <div className="-mt-36 text-center">

              <h2 className="text-5xl font-black text-violet-600">
                {readinessScore}%
              </h2>

              <p className="mt-3 text-lg font-semibold">
                {readinessLevel}
              </p>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-10 flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-6">

              <Target
                size={26}
                className="text-violet-600"
              />

              <h2 className="text-2xl font-bold">
                Overall Summary
              </h2>

            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-8">

              Your interview preparation is progressing well.
              Continue practicing mock interviews, improving
              DSA consistency, and revising flashcards to
              maximize your readiness score.

            </p>

            <div className="mt-8 flex items-center gap-3">

              <CheckCircle2
                className="text-green-500"
                size={22}
              />

              <span className="font-semibold">
                Current Level:
              </span>

              <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-bold">
                {readinessLevel}
              </span>

            </div>

          </div>

        </div>
                {/* Progress Breakdown */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <div className="flex items-center gap-3 mb-8">

            <Trophy
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Readiness Breakdown
            </h2>

          </div>

          <div className="space-y-8">

            {progressData.map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    {item.title}
                  </span>

                  <span className="font-bold">
                    {item.score}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Performance Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Mock Interviews
            </h3>

            <p className="text-3xl font-bold mt-3">
              18
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              DSA Problems
            </h3>

            <p className="text-3xl font-bold mt-3">
              245
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Flashcards Revised
            </h3>

            <p className="text-3xl font-bold mt-3">
              320
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-gray-500 text-sm">
              Daily Streak
            </h3>

            <p className="text-3xl font-bold mt-3">
              27 Days
            </p>

          </div>

        </div>
                {/* AI Insights */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* Strengths */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

              <CheckCircle2
                size={24}
                className="text-green-500"
              />

              Your Strengths

            </h2>

            <div className="space-y-5">

              {[
                "Excellent technical assessment scores.",
                "Strong resume completion and optimization.",
                "Consistent AI interview practice.",
                "Good mock interview performance.",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="text-green-500 mt-1"
                  />

                  <p>{item}</p>

                </div>

              ))}

            </div>

          </div>

          {/* Weak Areas */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

              <Target
                size={24}
                className="text-orange-500"
              />

              Areas to Improve

            </h2>

            <div className="space-y-5">

              {[
                "Increase daily flashcard revisions.",
                "Complete remaining DSA sheet questions.",
                "Practice more behavioral interviews.",
                "Maintain a longer daily study streak.",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3"
                >

                  <Target
                    size={18}
                    className="text-orange-500 mt-1"
                  />

                  <p>{item}</p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <div className="flex items-center gap-3 mb-8">

            <Brain
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              AI Recommendations
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Complete 15 additional DSA questions this week.",
              "Take two mock interviews before your next application.",
              "Revise flashcards for at least 20 minutes daily.",
              "Improve behavioral interview answers using the STAR framework.",
              "Update your resume after completing new projects.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20"
              >

                <Brain
                  size={18}
                  className="text-violet-600 mt-1"
                />

                <p>{item}</p>

              </div>

            ))}

          </div>

        </div>
                {/* Next Action Plan */}

        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl mb-10">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Recommended Next Actions 🚀
              </h2>

              <ul className="space-y-3 text-white/90">

                <li>• Complete 20 additional DSA problems.</li>

                <li>• Finish 2 mock interviews this week.</li>

                <li>• Maintain a 30-day study streak.</li>

                <li>• Revise flashcards for 15–20 minutes daily.</li>

                <li>• Improve behavioral interview responses.</li>

              </ul>

            </div>

            <div className="text-center">

              <div className="text-6xl font-black">
                🎯
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Target Score
              </h3>

              <p className="text-3xl font-black">
                90%
              </p>

            </div>

          </div>

        </div>

        {/* Final Summary */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Final Readiness Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your current preparation progress,
            interview performance, DSA completion,
            resume quality, skill assessments,
            flashcard revision, and AI practice sessions,
            you are currently classified as

            <span className="font-bold text-violet-600">
              {" "}Interview Ready
            </span>.

            Continue improving your weaker areas to reach the
            <span className="font-bold text-green-600">
              {" "}Excellent
            </span>
            readiness level and maximize your chances of success
            in technical and HR interviews.

          </p>

        </div>

      </div>

    </div>
  );
};

export default ReadinessPredictor;