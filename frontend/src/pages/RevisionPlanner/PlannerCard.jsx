import React from "react";
import { CalendarDays, Flame, CheckCircle, ListTodo } from "lucide-react";

const PlannerCard = ({ planner }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Today's Revision Plan
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Stay consistent with your daily learning goals.
          </p>
        </div>

        <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-full">
          <CalendarDays
            size={28}
            className="text-violet-600 dark:text-violet-400"
          />
        </div>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-3">

            <ListTodo
              className="text-violet-600"
              size={22}
            />

            <span className="text-gray-500 dark:text-gray-400">
              Total Tasks
            </span>

          </div>

          <h3 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
            {planner.totalTasks}
          </h3>

        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-3">

            <CheckCircle
              className="text-green-500"
              size={22}
            />

            <span className="text-gray-500 dark:text-gray-400">
              Completed
            </span>

          </div>

          <h3 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
            {planner.completed}
          </h3>

        </div>

        <div className="col-span-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl p-6 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm opacity-90">
                Revision Streak
              </p>

              <h2 className="text-4xl font-bold mt-2">
                🔥 {planner.streak} Days
              </h2>

            </div>

            <Flame size={42} />

          </div>

          <p className="mt-4 opacity-90 text-sm">
            Keep revising every day to maintain your streak and unlock future achievements.
          </p>

        </div>

      </div>

    </div>
  );
};

export default PlannerCard;