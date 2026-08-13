import React, { useState } from "react";
import {
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";

export default function AIInterviewPreparationGoalFeasibilityChecker() {
  const [goal, setGoal] = useState("");
  const [tasks, setTasks] = useState(10);
  const [hours, setHours] = useState(5);
  const [checked, setChecked] = useState(false);

  const estimatedHours = tasks * 0.75;
  const feasible = estimatedHours <= hours;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Goal Feasibility Checker
          </h1>

          <p className="text-gray-500">
            Check whether your interview preparation goals are realistic.
          </p>
        </div>

      </div>

      {/* Goal */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Preparation Goal
        </h2>

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Example: Complete 10 DSA questions"
          className="w-full border rounded-xl p-3 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-4">

          <div>
            <label className="text-sm text-gray-500">
              Number of Tasks
            </label>

            <input
              type="number"
              min="1"
              value={tasks}
              onChange={(e) => setTasks(Number(e.target.value))}
              className="w-full border rounded-xl p-3 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Available Study Hours
            </label>

            <input
              type="number"
              min="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full border rounded-xl p-3 mt-1"
            />
          </div>

        </div>

        <button
          disabled={!goal.trim()}
          onClick={() => setChecked(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Check Feasibility
        </button>

      </div>

      {checked && (
        <>
          {/* Result */}
          <div
            className={`rounded-2xl p-6 text-center ${
              feasible ? "bg-green-50" : "bg-orange-50"
            }`}
          >

            {feasible ? (
              <CheckCircle2
                className="mx-auto text-green-600"
                size={32}
              />
            ) : (
              <AlertTriangle
                className="mx-auto text-orange-600"
                size={32}
              />
            )}

            <p className="text-gray-500 mt-3">
              Goal Feasibility
            </p>

            <p
              className={`text-4xl font-black ${
                feasible
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {feasible ? "Realistic" : "Too Ambitious"}
            </p>

          </div>

          {/* Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Time Analysis
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mt-4">

              <div className="border rounded-xl p-4">
                <Clock className="text-indigo-600" />

                <p className="text-sm text-gray-500 mt-2">
                  Estimated Time
                </p>

                <p className="text-xl font-bold">
                  {estimatedHours.toFixed(1)} hrs
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <Target className="text-indigo-600" />

                <p className="text-sm text-gray-500 mt-2">
                  Available Time
                </p>

                <p className="text-xl font-bold">
                  {hours} hrs
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <Brain className="text-indigo-600" />

                <p className="text-sm text-gray-500 mt-2">
                  Tasks
                </p>

                <p className="text-xl font-bold">
                  {tasks}
                </p>
              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              {feasible
                ? "This goal fits within your available preparation time. Keep a small time buffer for unexpected delays."
                : `Reduce the goal to approximately ${Math.max(
                    1,
                    Math.floor(hours / 0.75)
                  )} tasks so you can complete it without overloading your schedule.`}
            </p>

          </div>

        </>
      )}

    </div>
  );
}