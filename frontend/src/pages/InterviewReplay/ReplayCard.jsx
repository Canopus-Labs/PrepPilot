import React from "react";
import {
  Briefcase,
  Building2,
  CalendarDays,
  Star,
  PlayCircle,
  Download,
} from "lucide-react";

const ReplayCard = ({ session }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <Briefcase
              className="text-violet-600 dark:text-violet-400"
              size={22}
            />

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Role
              </p>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {session.role}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Building2
              className="text-blue-600 dark:text-blue-400"
              size={22}
            />

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Company
              </p>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                {session.company}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays
              className="text-green-600 dark:text-green-400"
              size={22}
            />

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Interview Date
              </p>

              <h2 className="font-semibold text-gray-900 dark:text-white">
                {session.date}
              </h2>
            </div>
          </div>

        </div>

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg">

            <div className="text-center">
              <Star className="mx-auto mb-1" size={22} />

              <h2 className="text-3xl font-bold">
                {session.score}
              </h2>
            </div>

          </div>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            AI Interview Score
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-4 mt-8">

        <button
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition"
        >
          <PlayCircle size={20} />
          Replay Interview
        </button>

        <button
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          <Download size={20} />
          Export Report
        </button>

      </div>

    </div>
  );
};

export default ReplayCard;