import React from "react";
import { Clock3, Bot, TrendingUp } from "lucide-react";

const FeedbackTimeline = ({ timeline }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-violet-100 dark:bg-violet-900/20 p-3 rounded-full">
          <Clock3
            size={24}
            className="text-violet-600 dark:text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Feedback Timeline
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Review the interview flow and AI observations.
          </p>
        </div>

      </div>

      <div className="relative border-l-2 border-violet-300 dark:border-violet-700 ml-4">

        {timeline.map((item, index) => (

          <div
            key={index}
            className="relative mb-8 ml-8"
          >

            <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">

              <Bot
                size={14}
                className="text-white"
              />

            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">

              <span className="text-xs font-semibold text-violet-600">
                {item.time}
              </span>

              <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                {item.event}
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                AI analyzed this stage and recorded observations to help improve
                your future interview performance.
              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700 p-5">

        <div className="flex items-center gap-3">

          <TrendingUp
            size={22}
            className="text-violet-600"
          />

          <h3 className="font-bold text-violet-700 dark:text-violet-300">
            AI Improvement Suggestion
          </h3>

        </div>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Improve confidence during behavioral rounds, provide more structured
          explanations, and include real-world examples when answering
          technical questions.
        </p>

      </div>

    </div>
  );
};

export default FeedbackTimeline;