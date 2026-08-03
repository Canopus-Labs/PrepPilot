import React from "react";
import { Trophy } from "lucide-react";

const ProgressCard = ({ planner }) => {
  const progress = Math.round(
    (planner.completed / planner.totalTasks) * 100
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
          <Trophy
            size={24}
            className="text-yellow-500"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Today's Progress
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Revision Completion
          </p>
        </div>

      </div>

      <div className="mb-4">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-gray-500">
            Progress
          </span>

          <span className="font-bold text-violet-600">
            {progress}%
          </span>

        </div>

        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">

          <div
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      <div className="mt-6">

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {planner.completed} of {planner.totalTasks} tasks completed today.
        </p>

      </div>

    </div>
  );
};

export default ProgressCard;