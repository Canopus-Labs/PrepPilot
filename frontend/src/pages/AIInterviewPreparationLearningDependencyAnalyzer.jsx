import React, { useState } from "react";
import {
  Brain,
  Lock,
  Unlock,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Arrays Fundamentals",
    type: "Foundation",
    status: "Completed",
    prerequisite: "None",
  },
  {
    id: 2,
    title: "Hashing Techniques",
    type: "Core Concept",
    status: "Completed",
    prerequisite: "Arrays Fundamentals",
  },
  {
    id: 3,
    title: "Sliding Window Problems",
    type: "Advanced Practice",
    status: "Blocked",
    prerequisite: "Hashing Techniques + Two Pointer Concepts",
  },
  {
    id: 4,
    title: "Two Pointer Concepts",
    type: "Core Concept",
    status: "Not Started",
    prerequisite: "Arrays Fundamentals",
  },
  {
    id: 5,
    title: "Advanced String Problems",
    type: "Advanced Practice",
    status: "Blocked",
    prerequisite: "Sliding Window Problems",
  },
];

const dependencies = [
  {
    from: "Arrays Fundamentals",
    to: "Hashing Techniques",
    status: "Satisfied",
  },
  {
    from: "Hashing Techniques",
    to: "Sliding Window Problems",
    status: "Satisfied",
  },
  {
    from: "Two Pointer Concepts",
    to: "Sliding Window Problems",
    status: "Blocking",
  },
  {
    from: "Sliding Window Problems",
    to: "Advanced String Problems",
    status: "Blocking",
  },
];

const blockedActivities = [
  {
    title: "Sliding Window Problems",
    reason:
      "The activity requires Two Pointer Concepts, which has not been completed.",
    prerequisite: "Two Pointer Concepts",
    priority: "High",
  },
  {
    title: "Advanced String Problems",
    reason:
      "This activity depends on Sliding Window Problems, which is currently blocked.",
    prerequisite: "Sliding Window Problems",
    priority: "Medium",
  },
];

export default function AIInterviewPreparationLearningDependencyAnalyzer() {
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const completed = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const blocked = activities.filter(
    (activity) => activity.status === "Blocked"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Learning Dependency Analyzer
          </h1>

          <p className="text-gray-500">
            Discover which preparation activities depend on foundational
            knowledge and identify what is blocking your progress.
          </p>
        </div>

      </div>

      {/* Goal */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Current Preparation Goal
        </p>

        <h2 className="text-xl font-bold mt-2">
          Become Interview Ready for Software Engineering Roles
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Data Structures",
            "Algorithms",
            "Problem Solving",
            "System Design",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Analyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Analyze Learning Dependencies
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          AI analyzes your preparation activities and identifies prerequisite
          relationships between them.
        </p>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Dependencies
        </button>

      </div>

      {analyzed && (
        <>
          {/* Summary */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Completed Activities
              </p>

              <p className="text-3xl font-black text-green-600">
                {completed}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Lock className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Blocked Activities
              </p>

              <p className="text-3xl font-black text-red-600">
                {blocked}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Missing Prerequisites
              </p>

              <p className="text-3xl font-black text-orange-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Unlock className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Dependency Health
              </p>

              <p className="text-3xl font-black text-indigo-600">
                75%
              </p>

            </div>

          </div>

          {/* Activity Dependency List */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Preparation Activity Dependencies
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Each activity is analyzed against the knowledge required to
              complete it successfully.
            </p>

            <div className="space-y-4 mt-6">

              {activities.map((activity) => (
                <button
                  type="button"
                  key={activity.id}
                  onClick={() =>
                    setSelectedActivity(
                      selectedActivity === activity.id
                        ? null
                        : activity.id
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div
                      className={`p-3 rounded-xl h-fit ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : activity.status === "Blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {activity.status === "Completed" ? (
                        <CheckCircle2 size={23} />
                      ) : activity.status === "Blocked" ? (
                        <Lock size={23} />
                      ) : (
                        <Target size={23} />
                      )}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {activity.title}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {activity.type}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            activity.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : activity.status === "Blocked"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {activity.status}
                        </span>

                      </div>

                      <div className="mt-4 bg-gray-50 rounded-xl p-3">

                        <p className="text-xs text-gray-500">
                          Prerequisite
                        </p>

                        <p className="text-sm font-semibold mt-1">
                          {activity.prerequisite}
                        </p>

                      </div>

                      {selectedActivity === activity.id && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-indigo-700">
                            AI Dependency Analysis
                          </p>

                          <p className="text-sm text-gray-600 mt-1">

                            {activity.status === "Blocked"
                              ? `This activity cannot be recommended as the immediate next step because "${activity.prerequisite}" has not been fully completed.`
                              : activity.status === "Completed"
                              ? "The required foundation is satisfied, so dependent activities can safely build on this knowledge."
                              : "This activity is available once its listed prerequisites are completed."}

                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Dependency Graph */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Learning Dependency Graph
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Follow the learning path from foundational concepts to advanced
              activities.
            </p>

            <div className="flex flex-col items-center mt-7">

              <div className="px-6 py-4 rounded-xl bg-green-100 text-green-700 font-semibold">
                Arrays Fundamentals
              </div>

              <ArrowDown
                className="text-indigo-400 my-2"
                size={22}
              />

              <div className="px-6 py-4 rounded-xl bg-green-100 text-green-700 font-semibold">
                Hashing Techniques
              </div>

              <ArrowDown
                className="text-indigo-400 my-2"
                size={22}
              />

              <div className="grid md:grid-cols-2 gap-5 w-full max-w-2xl">

                <div className="border rounded-xl p-5 text-center bg-orange-50">

                  <p className="font-bold">
                    Two Pointer Concepts
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                    Missing Prerequisite
                  </span>

                </div>

                <div className="border rounded-xl p-5 text-center bg-green-50">

                  <p className="font-bold">
                    Hashing
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    Satisfied
                  </span>

                </div>

              </div>

              <ArrowDown
                className="text-orange-400 my-2"
                size={22}
              />

              <div className="px-6 py-4 rounded-xl bg-red-100 text-red-700 font-semibold">
                Sliding Window Problems
              </div>

              <ArrowDown
                className="text-red-400 my-2"
                size={22}
              />

              <div className="px-6 py-4 rounded-xl bg-red-100 text-red-700 font-semibold">
                Advanced String Problems
              </div>

            </div>

          </div>

          {/* Blocked Activities */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lock
                className="text-red-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-red-700">
                  Blocked Activities
                </h2>

                <p className="text-gray-600 mt-2">
                  These activities should not be prioritized until their
                  foundational dependencies are completed.
                </p>

                <div className="space-y-4 mt-5">

                  {blockedActivities.map((activity) => (
                    <div
                      key={activity.title}
                      className="bg-white rounded-xl p-5"
                    >

                      <div className="flex justify-between gap-4">

                        <h3 className="font-bold">
                          {activity.title}
                        </h3>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            activity.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {activity.priority} Priority
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {activity.reason}
                      </p>

                      <div className="mt-4 flex items-center gap-2">

                        <AlertTriangle
                          size={18}
                          className="text-orange-600"
                        />

                        <p className="text-sm font-semibold text-orange-700">
                          Complete first: {activity.prerequisite}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Recommended Order */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              AI Recommended Learning Order
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              The system reorganizes your preparation based on prerequisite
              relationships instead of simply sorting by task date.
            </p>

            <div className="space-y-3 mt-6">

              {[
                "Arrays Fundamentals",
                "Hashing Techniques",
                "Two Pointer Concepts",
                "Sliding Window Problems",
                "Advanced String Problems",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                    {index + 1}
                  </div>

                  <div className="flex-1 border rounded-xl p-4">

                    <p className="font-semibold">
                      {item}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {index < 2
                        ? "Foundation already completed"
                        : "Recommended after prerequisite completion"}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Why Blocked */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Why Your Progress Is Blocked
                </h2>

                <p className="text-gray-600 mt-2">
                  Sliding Window Problems require both Hashing Techniques and
                  Two Pointer Concepts. Hashing is already complete, but Two
                  Pointer Concepts is still unfinished. Completing that
                  foundation will unlock the advanced practice activity.
                </p>

              </div>

            </div>

          </div>

          {/* Next Best Activity */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  AI Recommended Next Activity
                </h2>

                <p className="text-gray-600 mt-2">
                  Complete <strong>Two Pointer Concepts</strong> before
                  attempting Sliding Window Problems. This removes the current
                  dependency bottleneck and unlocks the next stage of your
                  preparation path.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Start Prerequisite

                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}