import React from "react";
import { Code2, Clock, ArrowRight } from "lucide-react";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-slate-700">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {challenge.title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Today's Coding Challenge
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            difficultyColors[challenge.difficulty]
          }`}
        >
          {challenge.difficulty}
        </span>

      </div>

      <div className="flex flex-wrap gap-4 mt-6">

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Code2 size={18} />
          <span>{challenge.topic}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Clock size={18} />
          <span>{challenge.time}</span>
        </div>

      </div>

      <p className="mt-6 text-gray-700 dark:text-gray-300 leading-7">
        {challenge.description}
      </p>

      <button
        className="mt-8 flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition-colors"
      >
        Start Challenge
        <ArrowRight size={18} />
      </button>

    </div>
  );
};

export default ChallengeCard;