import React from "react";
import { CheckCircle2, Circle, ClipboardList } from "lucide-react";

const TaskCard = ({ tasks }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">
        <ClipboardList
          className="text-violet-600 dark:text-violet-400"
          size={28}
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Today's Revision Tasks
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Complete today's learning targets.
          </p>
        </div>
      </div>

      <div className="space-y-4">

        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              task.completed
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-3">

              {task.completed ? (
                <CheckCircle2
                  size={22}
                  className="text-green-500"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-gray-400"
                />
              )}

              <span
                className={`font-medium ${
                  task.completed
                    ? "text-green-700 dark:text-green-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {task.title}
              </span>

            </div>

            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                task.completed
                  ? "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-200"
                  : "bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TaskCard;