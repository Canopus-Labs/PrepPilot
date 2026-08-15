import React from "react";
import {
  Brain,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const topics = [
  {
    name: "Binary Search",
    previous: 94,
    current: 87,
    status: "Declining",
  },
  {
    name: "Arrays",
    previous: 91,
    current: 93,
    status: "Stable",
  },
  {
    name: "Hashing",
    previous: 89,
    current: 76,
    status: "Needs Review",
  },
];

export default function AIInterviewPreparationTopicMasteryDecayMonitor() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Mastery Decay Monitor
          </h1>

          <p className="text-gray-500">
            Monitor previously mastered topics and prevent knowledge decay.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <RefreshCw
          className="mx-auto text-indigo-600"
          size={32}
        />

        <p className="text-gray-500 mt-3">
          Topics Requiring Reinforcement
        </p>

        <p className="text-6xl font-black text-indigo-600">
          2
        </p>

        <p className="text-gray-600 mt-2">
          Some previously mastered concepts are showing performance decline.
        </p>

      </div>

      {/* Topic List */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Mastery History
        </h2>

        <div className="space-y-4 mt-5">

          {topics.map((topic) => (
            <div
              key={topic.name}
              className="border rounded-xl p-5"
            >

              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-bold">
                    {topic.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Previous: {topic.previous}% → Current: {topic.current}%
                  </p>
                </div>

                {topic.status === "Stable" ? (
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle2 size={18} />
                    Stable
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-orange-600 font-semibold">
                    <TrendingDown size={18} />
                    {topic.status}
                  </span>
                )}

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-4">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${topic.current}%` }}
                />
              </div>

              {topic.current < topic.previous && (
                <div className="mt-4 p-3 rounded-lg bg-orange-50 text-orange-700 text-sm">
                  Mastery declined by{" "}
                  {topic.previous - topic.current} percentage points.
                </div>
              )}

            </div>
          ))}

        </div>

      </div>

      {/* Decay Alert */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              Knowledge Decay Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Hashing performance has declined significantly since the last
              mastery assessment. A short targeted revision session is
              recommended.
            </p>
          </div>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <RefreshCw className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Reinforcement Plan
            </h2>

            <p className="text-gray-600 mt-2">
              Complete 5 quick recall questions on Hashing and 3 Binary Search
              questions. Your mastery will be reassessed after the review.
            </p>

            <button className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold">
              Start Reinforcement
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}