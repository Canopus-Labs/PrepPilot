import React from "react";
import { Trophy, Lock } from "lucide-react";

const AchievementBadge = ({ title, description, unlocked }) => {
  return (
    <div
    className={`rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
    unlocked
      ? "bg-gradient-to-br from-yellow-50 to-amber-100 border-amber-300 dark:from-amber-500/20 dark:to-yellow-500/20 dark:border-amber-500"
      : "bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-700 hover:dark:bg-slate-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            unlocked
              ? "bg-amber-500 text-white"
              : "bg-slate-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          {unlocked ? <Trophy size={22} /> : <Lock size={20} />}
        </div>

        <div>
          <h3
            className={`font-semibold ${
              unlocked
                ? "text-amber-900 dark:text-amber-200"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-xs mt-1 ${
              unlocked
                ? "text-amber-700 dark:text-amber-300"
                : "text-gray-600 dark:text-slate-300"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;