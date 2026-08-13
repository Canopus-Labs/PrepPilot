import React from "react";
import {
  Brain,
  Target,
  Clock,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const topics = [
  {
    name: "Arrays",
    difficulty: "Easy",
    score: 28,
    accuracy: 94,
    time: "2.4 min",
    hints: 0,
    improvement: "+12%",
  },
  {
    name: "Dynamic Programming",
    difficulty: "Hard",
    score: 82,
    accuracy: 61,
    time: "9.2 min",
    hints: 4,
    improvement: "+5%",
  },
  {
    name: "Graph Algorithms",
    difficulty: "Challenging",
    score: 74,
    accuracy: 68,
    time: "7.6 min",
    hints: 2,
    improvement: "+14%",
  },
];

export default function AIInterviewPreparationTopicDifficultyCalibration() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Difficulty Calibration
          </h1>

          <p className="text-gray-500">
            Discover how difficult each topic is specifically for you.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Target
          className="mx-auto text-indigo-600"
          size={32}
        />

        <p className="text-gray-500 mt-3">
          Personalized Difficulty Model
        </p>

        <p className="text-gray-700 mt-2">
          Difficulty is calculated from your actual performance rather than
          relying only on predefined question labels.
        </p>

      </div>

      {/* Topic Cards */}
      <div className="space-y-4">

        {topics.map((topic) => (
          <div
            key={topic.name}
            className="bg-white rounded-2xl shadow p-5"
          >

            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-lg font-bold">
                  {topic.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Personalized difficulty
                </p>
              </div>

              <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold">
                {topic.difficulty}
              </span>

            </div>

            {/* Difficulty Bar */}
            <div className="mt-5">

              <div className="flex justify-between text-sm">
                <span>Difficulty Score</span>

                <span className="font-bold">
                  {topic.score}/100
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${topic.score}%` }}
                />
              </div>

            </div>

            {/* Metrics */}
            <div className="grid sm:grid-cols-4 gap-3 mt-5">

              <div className="bg-gray-50 rounded-xl p-3">

                <p className="text-sm text-gray-500">
                  Accuracy
                </p>

                <p className="font-bold">
                  {topic.accuracy}%
                </p>

              </div>

              <div className="bg-gray-50 rounded-xl p-3">

                <Clock
                  size={18}
                  className="text-indigo-600"
                />

                <p className="text-sm text-gray-500 mt-1">
                  Avg. Time
                </p>

                <p className="font-bold">
                  {topic.time}
                </p>

              </div>

              <div className="bg-gray-50 rounded-xl p-3">

                <Lightbulb
                  size={18}
                  className="text-indigo-600"
                />

                <p className="text-sm text-gray-500 mt-1">
                  Hints Used
                </p>

                <p className="font-bold">
                  {topic.hints}
                </p>

              </div>

              <div className="bg-gray-50 rounded-xl p-3">

                <TrendingUp
                  size={18}
                  className="text-green-600"
                />

                <p className="text-sm text-gray-500 mt-1">
                  Improvement
                </p>

                <p className="font-bold text-green-600">
                  {topic.improvement}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingUp className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              AI Calibration Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Arrays are currently easy for you despite their general
              difficulty classification. Dynamic Programming remains
              challenging because of lower accuracy, longer solving time, and
              higher hint usage. Future practice can use these personalized
              difficulty levels to select better questions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}