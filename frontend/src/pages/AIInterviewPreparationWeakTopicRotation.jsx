import React, { useState } from "react";
import {
  Brain,
  RotateCw,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Layers,
} from "lucide-react";

const topics = [
  {
    name: "System Design",
    score: 62,
    priority: "High",
    frequency: "3x / week",
    next: "Today",
    improvement: "+8%",
    color: "orange",
  },
  {
    name: "Dynamic Programming",
    score: 68,
    priority: "High",
    frequency: "2x / week",
    next: "Tomorrow",
    improvement: "+11%",
    color: "orange",
  },
  {
    name: "Technical Communication",
    score: 74,
    priority: "Medium",
    frequency: "2x / week",
    next: "Wed",
    improvement: "+6%",
    color: "yellow",
  },
  {
    name: "Graphs",
    score: 81,
    priority: "Maintenance",
    frequency: "1x / week",
    next: "Fri",
    improvement: "+3%",
    color: "green",
  },
  {
    name: "SQL",
    score: 88,
    priority: "Maintenance",
    frequency: "1x / week",
    next: "Sun",
    improvement: "+1%",
    color: "green",
  },
];

const rotation = [
  {
    day: "Today",
    topic: "System Design",
    type: "Weak Topic",
    duration: "35 min",
  },
  {
    day: "Tomorrow",
    topic: "Dynamic Programming",
    type: "Weak Topic",
    duration: "30 min",
  },
  {
    day: "Wednesday",
    topic: "Technical Communication",
    type: "Weak Topic",
    duration: "25 min",
  },
  {
    day: "Thursday",
    topic: "System Design",
    type: "Weak Topic",
    duration: "30 min",
  },
  {
    day: "Friday",
    topic: "Graphs",
    type: "Maintenance",
    duration: "20 min",
  },
  {
    day: "Saturday",
    topic: "Dynamic Programming",
    type: "Weak Topic",
    duration: "30 min",
  },
];

export default function AIInterviewPreparationWeakTopicRotation() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Weak Topic Rotation
          </h1>

          <p className="text-gray-500">
            Balance weak-topic improvement with maintenance practice across
            your preparation schedule.
          </p>
        </div>

      </div>

      {/* Rotation Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <RotateCw
            className="text-indigo-600"
            size={32}
          />

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              AI Rotation Strategy
            </p>

            <h2 className="text-xl font-bold text-indigo-700 mt-1">
              Balanced Weakness Improvement
            </h2>

            <p className="text-gray-600 mt-2">
              AI identified three weak areas and two maintenance areas. The
              schedule gives higher-frequency practice to weaker skills while
              ensuring stronger topics remain fresh.
            </p>

            {!started && (
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Start Rotation Plan
              </button>
            )}

          </div>

        </div>

      </div>

      {started && (
        <>
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Weak Topics
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Layers className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Maintenance Topics
              </p>

              <p className="text-3xl font-black text-indigo-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <RotateCw className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Weekly Rotation
              </p>

              <p className="text-3xl font-black text-indigo-600">
                6
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <TrendingUp className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Balance Score
              </p>

              <p className="text-3xl font-black text-green-600">
                89%
              </p>

            </div>

          </div>

          {/* Topic Frequencies */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Topic Practice Frequency
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Practice frequency automatically changes as your performance
              improves.
            </p>

            <div className="space-y-4 mt-5">

              {topics.map((topic) => (
                <button
                  type="button"
                  key={topic.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === topic.name
                        ? null
                        : topic
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">

                      {topic.priority === "Maintenance" ? (
                        <CheckCircle2
                          className="text-green-600 mt-1"
                          size={21}
                        />
                      ) : (
                        <AlertTriangle
                          className="text-orange-600 mt-1"
                          size={21}
                        />
                      )}

                      <div>

                        <h3 className="font-semibold">
                          {topic.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Current proficiency: {topic.score}%
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-indigo-600">
                        {topic.frequency}
                      </p>

                      <span
                        className={`text-xs font-semibold ${
                          topic.priority === "Maintenance"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {topic.priority}
                      </span>

                    </div>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${topic.score}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-3 text-sm">

                    <span className="text-gray-500">
                      Next: {topic.next}
                    </span>

                    <span className="text-green-600 font-semibold">
                      {topic.improvement} improvement
                    </span>

                  </div>

                  {selected?.name === topic.name && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-sm text-gray-600">
                        AI selected this frequency based on current
                        proficiency, recent improvement, topic importance, and
                        the need to maintain other skills.
                      </p>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Weekly Rotation */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-3">

              <CalendarDays className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Weekly Rotation
                </h2>

                <p className="text-sm text-gray-500">
                  AI-balanced practice schedule
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-5">

              {rotation.map((item, index) => (
                <div
                  key={`${item.day}-${item.topic}`}
                  className="flex items-center gap-4 border rounded-xl p-4"
                >

                  <div className="w-24 font-semibold">
                    {item.day}
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold">
                      {item.topic}
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === "Maintenance"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.type}
                    </span>

                  </div>

                  <span className="text-sm text-gray-500">
                    {item.duration}
                  </span>

                  {index === 0 && (
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                      Next
                    </span>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* Rotation Logic */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              How AI Adjusts the Rotation
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <AlertTriangle className="text-orange-600" />

                <h3 className="font-semibold mt-3">
                  Weakness Detected
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Increase the topic's practice frequency when performance
                  remains below the target.
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <TrendingUp className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Improvement Detected
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Gradually reduce frequency when consistent improvement is
                  observed.
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <CheckCircle2 className="text-green-600" />

                <h3 className="font-semibold mt-3">
                  Mastery Reached
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Move the topic into maintenance rotation to prevent
                  knowledge decay.
                </p>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Focus most heavily on <strong>System Design</strong>, but do
                  not practice it exclusively. Rotate it with Dynamic
                  Programming and Communication while maintaining Graphs and
                  SQL with lower-frequency sessions.
                </p>

              </div>

            </div>

          </div>

          {/* Fatigue Protection */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Preparation Balance
            </h2>

            <p className="text-gray-600 mt-2">
              The rotation prevents one weak topic from dominating your entire
              schedule. This reduces repetitive practice while ensuring that
              important weaknesses continue receiving attention.
            </p>

            <div className="mt-5 h-4 bg-gray-200 rounded-full overflow-hidden">

              <div className="h-full bg-indigo-600 w-[55%]" />

            </div>

            <div className="flex justify-between text-sm mt-2">

              <span>
                Weakness Improvement: 55%
              </span>

              <span>
                Maintenance: 45%
              </span>

            </div>

          </div>

        </>
      )}

    </div>
  );
}