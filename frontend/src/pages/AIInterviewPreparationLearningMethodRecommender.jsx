import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  Layers,
  Code2,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  Target,
} from "lucide-react";

const recommendations = [
  {
    concept: "Binary Search",
    weakness: "Recall",
    method: "Flashcards",
    score: 92,
    reason:
      "Your implementation is strong, but you frequently forget the conditions required for binary search.",
    icon: Layers,
  },
  {
    concept: "Dynamic Programming",
    weakness: "Concept Understanding",
    method: "Visual Explanations",
    score: 88,
    reason:
      "You can solve simple problems but struggle to understand state transitions and overlapping subproblems.",
    icon: Lightbulb,
  },
  {
    concept: "Graph Algorithms",
    weakness: "Implementation",
    method: "Coding Practice",
    score: 95,
    reason:
      "Your conceptual understanding is good, but implementation errors occur during BFS and DFS problems.",
    icon: Code2,
  },
  {
    concept: "Technical Communication",
    weakness: "Communication",
    method: "Mock Questions",
    score: 86,
    reason:
      "Your technical knowledge is strong, but your explanations become less structured during interview-style questions.",
    icon: MessageSquare,
  },
  {
    concept: "SQL Joins",
    weakness: "Retention",
    method: "Spaced Repetition",
    score: 83,
    reason:
      "Performance decreases after long revision gaps, indicating a retention issue.",
    icon: RefreshCw,
  },
];

export default function AIInterviewPreparationLearningMethodRecommender() {
  const [selected, setSelected] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Learning Method Recommender
          </h1>

          <p className="text-gray-500">
            Find the most effective learning method for each specific
            weakness.
          </p>
        </div>

      </div>

      {/* Introduction */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              Personalized Learning Strategy
            </h2>

            <p className="text-gray-600 mt-2">
              AI analyzes your recent performance to determine whether a
              weakness is caused by recall, understanding, implementation,
              communication, or retention.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Analyze My Weaknesses
            </button>

          </div>

        </div>

      </div>

      {analyzed && (
        <>
          {/* Summary */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Weak Concepts
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-2">
                5
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Recommended Methods
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-2">
                5
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                High Confidence
              </p>

              <p className="text-3xl font-black text-green-600 mt-2">
                4
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Personalized
              </p>

              <p className="text-3xl font-black text-green-600 mt-2">
                100%
              </p>

            </div>

          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Recommended Learning Methods
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a recommendation to view why AI selected the method.
            </p>

            <div className="space-y-4 mt-5">

              {recommendations.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.concept}
                    onClick={() =>
                      setSelected(
                        selected?.concept === item.concept
                          ? null
                          : item
                      )
                    }
                    className={`w-full text-left border rounded-2xl p-5 transition ${
                      selected?.concept === item.concept
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-400"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      <div className="p-3 rounded-xl bg-white">
                        <Icon className="text-indigo-600" size={22} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>

                            <h3 className="font-bold">
                              {item.concept}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              Weakness: {item.weakness}
                            </p>

                          </div>

                          <span className="font-bold text-indigo-600">
                            {item.score}%
                          </span>

                        </div>

                        <div className="flex items-center gap-2 mt-4">

                          <span className="px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
                            {item.method}
                          </span>

                          <span className="text-sm text-gray-500">
                            Recommended
                          </span>

                        </div>

                        {selected?.concept === item.concept && (
                          <div className="mt-4 bg-white rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                              Why this method?
                            </p>

                            <p className="text-gray-600 mt-2">
                              {item.reason}
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Method Guide */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Learning Method Guide
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="border rounded-xl p-4">

                <Layers className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Flashcards
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Best for terminology, definitions, formulas, and recall
                  weaknesses.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <Lightbulb className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Visual Explanations
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Useful when relationships, processes, or conceptual models
                  are difficult to understand.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <Code2 className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Coding Practice
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Recommended when implementation and debugging performance
                  are the primary weaknesses.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <MessageSquare className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Mock Questions
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Helps improve explanation quality, communication, and
                  interview confidence.
                </p>

              </div>

            </div>

          </div>

          {/* Priority Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  Highest Priority Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Start with <strong>Dynamic Programming visual
                  explanations</strong>. Your performance suggests that the
                  main problem is conceptual understanding rather than coding
                  ability. Strengthening the mental model first should make
                  later coding practice more effective.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Start Recommended Method
                </button>

              </div>

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              AI Learning Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Not every weakness should be solved with more questions. Your
              results show that different concepts require different
              interventions. Using the recommended method before repeating
              difficult practice can make your preparation more efficient.
            </p>

          </div>

        </>
      )}

    </div>
  );
}