
const StreakCard = ({ streak }) => {
  return (
    <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl shadow-lg p-6 text-white">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm opacity-90">
            Current Streak
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {streak} Days
          </h2>
        </div>

        <div className="bg-white/20 p-4 rounded-full">
          <Flame size={34} />
        </div>

      </div>

      <div className="mt-8 border-t border-white/20 pt-4">

        <div className="flex items-center gap-2">

          <Trophy size={18} />

          <span className="text-sm">
            Keep solving daily challenges to unlock more badges!
          </span>

        </div>

      </div>

    </div>
  );
};

export default StreakCard;