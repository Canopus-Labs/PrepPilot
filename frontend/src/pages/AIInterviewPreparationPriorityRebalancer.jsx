import React, { useState } from "react";
import { Brain, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";

const tasks = [
  { name: "DSA Practice", priority: "High", change: "↑ Increased" },
  { name: "System Design", priority: "High", change: "↑ Increased" },
  { name: "Communication", priority: "Medium", change: "→ Stable" },
  { name: "Resume Review", priority: "Low", change: "↓ Reduced" },
];

export default function AIInterviewPreparationPriorityRebalancer() {
  const [rebalancing, setRebalancing] = useState(false);

  const rebalance = () => {
    setRebalancing(true);
    setTimeout(() => setRebalancing(false), 800);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
            <Brain size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              AI Preparation Priority Rebalancer
            </h1>
            <p className="text-gray-500">
              Automatically adjust preparation priorities based on progress.
            </p>
          </div>
        </div>

        <button
          onClick={rebalance}
          disabled={rebalancing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={rebalancing ? "animate-spin" : ""}
          />
          {rebalancing ? "Updating..." : "Rebalance"}
        </button>
      </div>

      {/* AI Summary */}
      <div className="rounded-2xl bg-indigo-50 p-5">
        <h2 className="font-bold text-lg">AI Recommendation</h2>
        <p className="text-gray-600 mt-2">
          Your DSA performance needs improvement, so AI has increased DSA and
          System Design priority while reducing time spent on mastered areas.
        </p>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-3">
        <h2 className="font-bold text-lg mb-4">Updated Priorities</h2>

        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex items-center justify-between border rounded-xl p-4"
          >
            <div>
              <p className="font-semibold">{task.name}</p>
              <p className="text-sm text-gray-500">{task.change}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>

      {/* Changes */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-red-50">
          <ArrowUp className="text-red-500" />
          <h3 className="font-bold mt-2">Priority Increased</h3>
          <p className="text-sm text-gray-600">
            DSA and System Design require more attention.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-green-50">
          <ArrowDown className="text-green-500" />
          <h3 className="font-bold mt-2">Priority Reduced</h3>
          <p className="text-sm text-gray-600">
            Resume preparation can receive less time for now.
          </p>
        </div>
      </div>
    </div>
  );
}