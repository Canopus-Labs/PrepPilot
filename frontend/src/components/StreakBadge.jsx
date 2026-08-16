import { Flame, Trophy } from "lucide-react";

/**
 * @param {number} streak - current streak length in days.
 * @param {string[]} [milestones] - optional list of unlocked streak
 *   milestone badge names (e.g. "7-Day Streak", "30-Day Streak") from
 *   `user.unlockedAchievements`. When provided, renders a compact row of
 *   trophy chips beneath the flame badge. Purely additive — omit the prop
 *   to get the original flame-only badge.
 */
const StreakBadge = ({ streak, milestones = [] }) => {
  if (!streak || streak <= 0) return null;

  // Sort milestones by the day-count baked into their name so chips read
  // left-to-right in unlock order (3 → 7 → 14 → 30).
  const sortedMilestones = [...milestones].sort(
    (a, b) => (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0)
  );

  return (
    <div className="inline-flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold text-sm w-fit">
        <Flame size={18} className="fill-orange-500 text-orange-500" />
        {streak} day{streak === 1 ? "" : "s"} streak
      </div>

      {sortedMilestones.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {sortedMilestones.map((badge) => (
            <span
              key={badge}
              title={badge}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-semibold"
            >
              <Trophy size={11} className="fill-amber-500 text-amber-500" />
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StreakBadge;