
const BadgeCard = ({ badge }) => {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-slate-800 dark:to-slate-900 border border-violet-200 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      <div className="text-5xl mb-3">
        {badge.icon}
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {badge.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Achievement Unlocked
      </p>

    </div>
  );
};

export default BadgeCard;