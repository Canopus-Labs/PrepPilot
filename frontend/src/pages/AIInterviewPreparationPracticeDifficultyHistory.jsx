import React from "react";
import {
  Brain,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const history = [
  {
    date: "Jan 2026",
    level: "Easy",
    topic: "Arrays",
    accuracy: 91,
    time: "18 min",
    status: "Progress",
  },
  {
    date: "Mar 2026",
    level: "Medium",
    topic: "Algorithms",
    accuracy: 86,
    time: "24 min",
    status: "Progress",
  },
  {
    date: "May 2026",
    level: "Medium",
    topic: "Data Structures",
    accuracy: 82,
    time: "29 min",
    status: "Stable",
  },
  {
    date: "Jul 2026",
    level: "Hard",
    topic: "Algorithms",
    accuracy: 78,
    time: "41 min",
    status: "New Level",
  },
  {
    date: "Aug 2026",
    level: "Medium",
    topic: "Dynamic Programming",
    accuracy: 68,
    time: "46 min",
    status: "Regression",
  },
];

const levelStyles = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-orange-100 text-orange-700",
};

export default function AIInterviewPreparationPracticeDifficultyHistory() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Practice Difficulty History
          </h1>

          <p className="text-gray-500">
            Track how your successful interview practice difficulty has
            progressed over time.
          </p>
        </div>

      </div>

      {/* Current Level */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <TrendingUp
          className="mx-auto text-indigo-600"
          size={34}
        />

        <p className="text-gray-500 mt-3">
          Highest Consistently Successful Difficulty
        </p>

        <p className="text-4xl font-black text-indigo-600">
          Hard
        </p>

        <p className="text-gray-600 mt-2">
          You have successfully progressed from Easy → Medium → Hard.
        </p>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Difficulty Progression Timeline
        </h2>

        <div className="relative mt-8">

          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200" />

          <div className="space-y-8">

            {history.map((item) => (
              <div
                key={`${item.date}-${item.topic}`}
                className="relative flex gap-5"
              >

                {/* Timeline Point */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">

                  {item.status === "Regression" ? (
                    <AlertTriangle
                      className="text-orange-600"
                      size={18}
                    />
                  ) : (
                    <CheckCircle2
                      className="text-indigo-600"
                      size={18}
                    />
                  )}

                </div>

                {/* Event */}
                <div className="flex-1 border rounded-2xl p-4">

                  <div className="flex flex-wrap justify-between gap-3">

                    <div>

                      <p className="text-sm text-gray-500">
                        {item.date}
                      </p>

                      <h3 className="font-bold text-lg">
                        {item.topic}
                      </h3>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold h-fit ${
                        levelStyles[item.level]
                      }`}
                    >
                      {item.level}
                    </span>

                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mt-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Accuracy
                      </p>

                      <p className="font-bold">
                        {item.accuracy}%
                      </p>
                    </div>

                    <div className="flex items-center gap-2">

                      <Clock
                        size={16}
                        className="text-gray-400"
                      />

                      <div>
                        <p className="text-xs text-gray-500">
                          Avg. Time
                        </p>

                        <p className="font-bold">
                          {item.time}
                        </p>
                      </div>

                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Status
                      </p>

                      <p
                        className={
                          item.status === "Regression"
                            ? "font-bold text-orange-600"
                            : "font-bold text-green-600"
                        }
                      >
                        {item.status}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Difficulty Summary */}
      <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

        <h2 className="font-bold text-lg">
          Difficulty Performance Summary
        </h2>

        <table className="w-full min-w-[650px] mt-5 border-collapse">

          <thead>
            <tr className="bg-gray-50">

              <th className="text-left p-4 border">
                Difficulty
              </th>

              <th className="p-4 border">
                Accuracy
              </th>

              <th className="p-4 border">
                Avg. Time
              </th>

              <th className="p-4 border">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="p-4 border font-semibold">
                Easy
              </td>

              <td className="p-4 border text-center">
                91%
              </td>

              <td className="p-4 border text-center">
                18 min
              </td>

              <td className="p-4 border text-center text-green-600 font-semibold">
                Mastered
              </td>
            </tr>

            <tr>
              <td className="p-4 border font-semibold">
                Medium
              </td>

              <td className="p-4 border text-center">
                84%
              </td>

              <td className="p-4 border text-center">
                27 min
              </td>

              <td className="p-4 border text-center text-green-600 font-semibold">
                Consistent
              </td>
            </tr>

            <tr>
              <td className="p-4 border font-semibold">
                Hard
              </td>

              <td className="p-4 border text-center">
                78%
              </td>

              <td className="p-4 border text-center">
                41 min
              </td>

              <td className="p-4 border text-center text-orange-600 font-semibold">
                Developing
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingUp className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              AI Progress Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your overall difficulty has progressed from Easy to Hard.
              However, Dynamic Programming currently shows a regression in
              accuracy. Strengthening this topic before attempting more Hard
              problems may help maintain your progression.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}