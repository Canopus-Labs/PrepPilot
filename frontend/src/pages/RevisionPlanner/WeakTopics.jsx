import React from "react";
import { AlertTriangle, BookOpen } from "lucide-react";

const WeakTopics = ({ topics }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
          <AlertTriangle
            size={24}
            className="text-red-500"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Weak Topics
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Focus on these topics during your next revision.
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {topics.map((topic, index) => (

          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-violet-400 transition-all"
          >

            <div className="flex items-center gap-3">

              <BookOpen
                size={20}
                className="text-violet-600 dark:text-violet-400"
              />

              <span className="font-medium text-gray-900 dark:text-white">
                {topic}
              </span>

            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300">
              High Priority
            </span>

          </div>

        ))}

      </div>

      <div className="mt-6 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">

        <h3 className="font-semibold text-violet-700 dark:text-violet-300">
          💡 AI Recommendation
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Revise these topics first before attempting new concepts. Consistent
          revision will improve long-term retention and interview confidence.
        </p>

      </div>

    </div>
  );
};

export default WeakTopics;