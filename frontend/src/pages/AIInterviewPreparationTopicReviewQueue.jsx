import React, { useState } from "react";
import {
  Brain,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const topics = [
  {
    name: "Dynamic Programming",
    priority: 95,
    errors: 8,
    daysSinceReview: 12,
    performance: 62,
    reason: "Low recent accuracy and repeated mistakes.",
  },
  {
    name: "Graph Algorithms",
    priority: 86,
    errors: 5,
    daysSinceReview: 9,
    performance: 71,
    reason: "Revision is overdue and interview relevance is high.",
  },
  {
    name: "Binary Search",
    priority: 68,
    errors: 3,
    daysSinceReview: 6,
    performance: 81,
    reason: "Performance is improving but needs reinforcement.",
  },
  {
    name: "Arrays",
    priority: 42,
    errors: 1,
    daysSinceReview: 3,
    performance: 94,
    reason: "Strong recent performance; lower review priority.",
  },
];

export default function AIInterviewPreparationTopicReviewQueue() {
  const [queue, setQueue] = useState(topics);
  const [completed, setCompleted] = useState([]);

  const completeReview = (name) => {
    setCompleted([...completed, name]);
    setQueue(queue.filter((topic) => topic.name !== name));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Review Queue
          </h1>

          <p className="text-gray-500">
            Review the topics that need your attention most.
          </p>
        </div>

      </div>

      {/* Queue Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              Intelligent Review Priority
            </h2>

            <p className="text-gray-600 mt-2">
              AI ranks your topics using recent performance, error frequency,
              revision history, importance, and your preparation timeline.
            </p>

          </div>

        </div>

      </div>

      {/* Next Topic */}
      {queue.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6 border-2 border-indigo-200">

          <p className="text-sm text-gray-500">
            Review Next
          </p>

          <div className="flex justify-between items-center mt-2">

            <h2 className="text-2xl font-bold">
              {queue[0].name}
            </h2>

            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-sm">
              Priority {queue[0].priority}
            </span>

          </div>

          <p className="text-gray-600 mt-3">
            {queue[0].reason}
          </p>

          <button
            type="button"
            onClick={() => completeReview(queue[0].name)}
            className="mt-5 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Start Review
            <ArrowRight size={18} />
          </button>

        </div>
      )}

      {/* Queue */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex justify-between items-center">

          <h2 className="font-bold text-lg">
            Review Queue
          </h2>

          <span className="text-sm text-gray-500">
            {queue.length} topics remaining
          </span>

        </div>

        <div className="space-y-4 mt-5">

          {queue.map((topic, index) => (
            <div
              key={topic.name}
              className="border rounded-2xl p-5"
            >

              <div className="flex justify-between gap-4">

                <div className="flex gap-3">

                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {topic.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {topic.reason}
                    </p>

                  </div>

                </div>

                <span className="h-fit px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  Priority {topic.priority}
                </span>

              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-5">

                <div className="flex items-center gap-2">

                  <AlertTriangle
                    size={17}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Recent Errors
                    </p>
                    <p className="font-bold">
                      {topic.errors}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <Clock
                    size={17}
                    className="text-gray-500"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Days Since Review
                    </p>
                    <p className="font-bold">
                      {topic.daysSinceReview}
                    </p>
                  </div>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Recent Performance
                  </p>

                  <p className="font-bold">
                    {topic.performance}%
                  </p>

                </div>

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-4">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${topic.performance}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex gap-3">

            <CheckCircle2 className="text-green-600" />

            <div>

              <h2 className="font-bold text-green-700">
                Completed Reviews
              </h2>

              <p className="text-gray-600 mt-2">
                {completed.length} topic
                {completed.length > 1 ? "s have" : " has"} been reviewed and
                removed from the current priority queue.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Empty State */}
      {queue.length === 0 && (
        <div className="bg-green-50 rounded-2xl p-8 text-center">

          <CheckCircle2
            className="mx-auto text-green-600"
            size={40}
          />

          <h2 className="text-xl font-bold text-green-700 mt-3">
            Review Queue Complete
          </h2>

          <p className="text-gray-600 mt-2">
            There are currently no high-priority topics waiting for review.
          </p>

        </div>
      )}

    </div>
  );
}