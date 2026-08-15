import { Flame } from "lucide-react";

const StreakBadge = ({ streak }) => {
  if (!streak || streak <= 0) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold text-sm">
      <Flame size={18} className="fill-orange-500 text-orange-500" />
      {streak} day{streak === 1 ? "" : "s"} streak
    </div>
  );
};

export default StreakBadge;