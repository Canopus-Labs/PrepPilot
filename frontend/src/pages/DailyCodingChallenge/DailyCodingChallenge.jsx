const challenge = {
  title: "Two Sum",
  difficulty: "Easy",
  topic: "Arrays",
  time: "20 Minutes",
  description:
    "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
};

const badges = [
  {
    title: "Beginner",
    icon: "🥉",
  },
  {
    title: "7-Day Streak",
    icon: "🥈",
  },
  {
    title: "30-Day Streak",
    icon: "🥇",
  },
  {
    title: "Consistency Master",
    icon: "🚀",
  },
];

const week = [
  { day: "Mon", done: true },
  { day: "Tue", done: true },
  { day: "Wed", done: true },
  { day: "Thu", done: false },
  { day: "Fri", done: true },
  { day: "Sat", done: false },
  { day: "Sun", done: false },
];

const DailyCodingChallenge = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🔥 Daily Coding Challenge
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Solve one challenge every day and build your coding streak.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          <div className="lg:col-span-2">
            <ChallengeCard challenge={challenge} />
          </div>

          <div>
            <StreakCard streak={5} />
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <WeeklyProgress week={week} />

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold mb-5">
              Achievement Badges
            </h2>

            <div className="grid grid-cols-2 gap-4">

              {badges.map((badge) => (
                <BadgeCard
                  key={badge.title}
                  badge={badge}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DailyCodingChallenge;