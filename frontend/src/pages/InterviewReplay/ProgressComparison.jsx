import React from "react";
import { TrendingUp, Trophy } from "lucide-react";

const ProgressComparison = ({ comparison }) => {
  const improvement = comparison.current - comparison.previous;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
          <TrendingUp
            size={24}
            className="text-green-600 dark:text-green-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Progress Comparison
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Compare your previous and latest interview performance.
          </p>
        </div>

      </div>

      <div className="space-y-8">

        {/* Previous Score */}

        <div>

          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Previous Interview
            </span>

            <span className="font-bold text-violet-600">
              {comparison.previous}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-slate-700">

            <div
              className="h-3 rounded-full bg-violet-500"
              style={{
                width: `${comparison.previous}%`,
              }}
            />

          </div>

        </div>

        {/* Current Score */}

        <div>

          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Current Interview
            </span>

            <span className="font-bold text-green-600">
              {comparison.current}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-slate-700">

            <div
              className="h-3 rounded-full bg-green-500"
              style={{
                width: `${comparison.current}%`,
              }}
            />

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white">

        <div className="flex items-center gap-3">

          <Trophy size={28} />

          <div>

            <h3 className="text-xl font-bold">
              Overall Improvement
            </h3>

            <p className="opacity-90 mt-1">
              Your interview score improved by
              <span className="font-bold"> {improvement}% </span>
              compared to your previous attempt.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProgressComparison;