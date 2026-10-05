import React from "react";
import {
  Brain,
  Clock,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

const topics = [
  {
    name: "Dynamic Programming",
    retention: 54,
    days: 9,
    status: "Revise Soon",
  },
  {
    name: "Graphs",
    retention: 68,
    days: 6,
    status: "Monitor",
  },
  {
    name: "SQL",
    retention: 88,
    days: 3,
    status: "Strong",
  },
];

export default function AIInterviewPreparationTopicRetentionForecast() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Retention Forecast
          </h1>

          <p className="text-gray-500">
            Predict which topics may need revision soon.
          </p>
        </div>

      </div>

      {/* Forecast */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <TrendingUp
          className="mx-auto text-indigo-600"
          size={30}
        />

        <p className="text-gray-500 mt-3">
          Topics Requiring Attention
        </p>

        <p className="text-6xl font-black text-indigo-600">
          1
        </p>

        <p className="text-gray-600 mt-2">
          Dynamic Programming is predicted to benefit most from revision.
        </p>

      </div>

      {/* Topics */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Retention Forecast
        </h2>

        {topics.map((topic) => (
          <div
            key={topic.name}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="font-bold">
                  {topic.name}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Last revision: {topic.days} days ago
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  topic.status === "Revise Soon"
                    ? "bg-red-100 text-red-600"
                    : topic.status === "Monitor"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {topic.status}
              </span>

            </div>

            <div className="mt-4">

              <div className="flex justify-between text-sm">
                <span>Estimated Retention</span>
                <b>{topic.retention}%</b>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${topic.retention}%` }}
                />
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Factors */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Forecast Factors
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">

          <div className="border rounded-xl p-4">
            <Clock className="text-indigo-600" />
            <p className="font-semibold mt-2">
              Time Since Revision
            </p>
            <p className="text-sm text-gray-500">
              Older revisions receive higher priority.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <AlertTriangle className="text-orange-600" />
            <p className="font-semibold mt-2">
              Repeated Mistakes
            </p>
            <p className="text-sm text-gray-500">
              Frequent mistakes increase revision priority.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <TrendingUp className="text-green-600" />
            <p className="font-semibold mt-2">
              Recall Performance
            </p>
            <p className="text-sm text-gray-500">
              Strong recall lowers immediate revision priority.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <RotateCcw className="text-indigo-600" />
            <p className="font-semibold mt-2">
              Topic Difficulty
            </p>
            <p className="text-sm text-gray-500">
              Difficult topics receive more frequent checks.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}