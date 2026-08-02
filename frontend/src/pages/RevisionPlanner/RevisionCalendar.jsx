import React from "react";
import { CalendarDays, CheckCircle2, Circle } from "lucide-react";

const RevisionCalendar = ({ week }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-violet-100 dark:bg-violet-900/20 p-3 rounded-full">
          <CalendarDays
            size={24}
            className="text-violet-600 dark:text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Weekly Revision Calendar
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Track your weekly revision consistency.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-7 gap-3">

        {week.map((item) => (
          <div
            key={item.day}
            className={`rounded-xl p-4 text-center border transition-all duration-300 ${
              item.done
                ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
            }`}
          >
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
              {item.day}
            </h3>

            {item.done ? (
              <CheckCircle2
                size={26}
                className="mx-auto text-green-500"
              />
            ) : (
              <Circle
                size={26}
                className="mx-auto text-gray-400"
              />
            )}
          </div>
        ))}

      </div>

      <div className="mt-8 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700 rounded-xl p-4">

        <h3 className="font-semibold text-violet-700 dark:text-violet-300">
          🔥 Keep the Streak Alive!
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Completing your daily revision helps improve memory retention and
          keeps your preparation on track.
        </p>

      </div>

    </div>
  );
};

export default RevisionCalendar;