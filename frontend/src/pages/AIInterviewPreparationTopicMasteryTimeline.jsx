import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  BookOpen,
  Code2,
  RotateCcw,
  ClipboardCheck,
  Trophy,
  CalendarDays,
  Lightbulb,
} from "lucide-react";

const timelineData = [
  {
    date: "Jun 12",
    title: "Topic Started",
    type: "Initial",
    score: 42,
    icon: BookOpen,
    description: "Initial assessment showed weak understanding of core concepts.",
  },
  {
    date: "Jun 15",
    title: "Learning Module Completed",
    type: "Learning",
    score: 58,
    icon: BookOpen,
    description: "Completed the fundamentals and reviewed common patterns.",
  },
  {
    date: "Jun 20",
    title: "Practice Session",
    type: "Practice",
    score: 67,
    icon: Code2,
    description: "Solved 8 practice questions with improved accuracy.",
  },
  {
    date: "Jun 25",
    title: "Revision Session",
    type: "Revision",
    score: 73,
    icon: RotateCcw,
    description: "Reviewed weak concepts and corrected recurring mistakes.",
  },
  {
    date: "Jul 02",
    title: "Assessment",
    type: "Assessment",
    score: 81,
    icon: ClipboardCheck,
    description: "Passed the topic assessment with strong application performance.",
  },
  {
    date: "Jul 08",
    title: "Mastery Milestone",
    type: "Milestone",
    score: 88,
    icon: Trophy,
    description: "Reached the mastery threshold after consistent performance.",
  },
];

const activityImpact = [
  {
    activity: "Practice Questions",
    improvement: "+15%",
    contribution: "High",
  },
  {
    activity: "Revision Sessions",
    improvement: "+9%",
    contribution: "High",
  },
  {
    activity: "Learning Modules",
    improvement: "+16%",
    contribution: "High",
  },
  {
    activity: "Assessments",
    improvement: "+7%",
    contribution: "Medium",
  },
];

export default function AIInterviewPreparationTopicMasteryTimeline() {
  const [topic, setTopic] = useState("Dynamic Programming");
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredTimeline =
    filter === "All"
      ? timelineData
      : timelineData.filter((item) => item.type === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Mastery Timeline
          </h1>

          <p className="text-gray-500">
            See how your understanding and mastery develop throughout your
            preparation journey.
          </p>
        </div>

      </div>

      {/* Topic Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Topic
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {topic}
            </h2>

            <p className="text-gray-600 mt-2">
              Track learning activities, performance changes, and mastery
              milestones for this topic.
            </p>
          </div>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none"
          >
            <option>Dynamic Programming</option>
            <option>Graph Algorithms</option>
            <option>Database Indexing</option>
            <option>System Design</option>
            <option>REST APIs</option>
          </select>

        </div>

      </div>

      {/* Current Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="p-4 rounded-2xl bg-white">
            <TrendingUp
              className="text-indigo-600"
              size={40}
            />
          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Current Mastery
            </p>

            <div className="flex items-end gap-3">
              <p className="text-6xl font-black text-indigo-600">
                88%
              </p>

              <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                Mastered
              </span>
            </div>

            <p className="text-gray-600 mt-2">
              Improved by <strong>46 percentage points</strong> since the
              initial assessment.
            </p>

            <div className="h-3 bg-white rounded-full mt-4">

              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: "88%" }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">
          <CalendarDays className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Journey Duration
          </p>

          <p className="text-3xl font-black text-indigo-600">
            26 days
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <BookOpen className="text-green-600" />

          <p className="text-sm text-gray-500 mt-4">
            Learning Activities
          </p>

          <p className="text-3xl font-black text-green-600">
            12
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <Code2 className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Practice Attempts
          </p>

          <p className="text-3xl font-black text-indigo-600">
            34
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <Trophy className="text-yellow-600" />

          <p className="text-sm text-gray-500 mt-4">
            Milestones
          </p>

          <p className="text-3xl font-black text-yellow-600">
            3
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex flex-wrap gap-2">

          {[
            "All",
            "Initial",
            "Learning",
            "Practice",
            "Revision",
            "Assessment",
            "Milestone",
          ].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                filter === item
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Mastery Journey
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Click an event to view the evidence behind the performance change.
        </p>

        <div className="relative mt-8">

          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-8">

            {filteredTimeline.map((event, index) => {
              const Icon = event.icon;

              return (
                <button
                  type="button"
                  key={event.title}
                  onClick={() =>
                    setSelected(
                      selected?.title === event.title
                        ? null
                        : event
                    )
                  }
                  className="relative w-full text-left"
                >

                  <div className="flex gap-5">

                    <div className="relative z-10 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center border-4 border-white shadow">

                      <Icon size={20} />

                    </div>

                    <div className="flex-1 border rounded-2xl p-5 hover:border-indigo-400 transition">

                      <div className="flex flex-wrap justify-between gap-3">

                        <div>

                          <p className="text-xs text-gray-500">
                            {event.date}
                          </p>

                          <h3 className="font-bold mt-1">
                            {event.title}
                          </h3>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-black text-indigo-600">
                            {event.score}%
                          </p>

                          <span className="text-xs text-gray-500">
                            Mastery
                          </span>

                        </div>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-4">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${event.score}%`,
                          }}
                        />

                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        {event.description}
                      </p>

                      {selected?.title === event.title && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs text-indigo-600 font-semibold">
                            AI Evidence
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            This milestone contributed to the mastery trend
                            through {event.type.toLowerCase()} activity and
                            measurable performance improvement.
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

      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Mastery Progress
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Performance improvement across the preparation journey.
        </p>

        <div className="flex items-end gap-3 h-64 mt-8">

          {timelineData.map((item) => (

            <div
              key={item.title}
              className="flex-1 flex flex-col justify-end items-center gap-2"
            >

              <span className="text-xs font-bold text-indigo-600">
                {item.score}%
              </span>

              <div
                className="w-full max-w-12 bg-indigo-600 rounded-t-xl"
                style={{
                  height: `${item.score * 2}px`,
                }}
              />

              <span className="text-[10px] text-gray-500 text-center">
                {item.date}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Activity Impact */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Lightbulb className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Activities That Contributed to Mastery
            </h2>

            <p className="text-sm text-gray-500">
              AI estimates which activities had the strongest relationship
              with your improvement.
            </p>
          </div>

        </div>

        <div className="space-y-4 mt-6">

          {activityImpact.map((item) => (

            <div
              key={item.activity}
              className="border rounded-xl p-4"
            >

              <div className="flex justify-between">

                <div>
                  <p className="font-semibold">
                    {item.activity}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Contribution: {item.contribution}
                  </p>
                </div>

                <p className="font-black text-green-600">
                  {item.improvement}
                </p>

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-3">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width:
                      item.contribution === "High"
                        ? "85%"
                        : "60%",
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Milestones */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Trophy
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              Mastery Milestones
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-4">

              {[
                ["Foundation", "60%", "Jun 15"],
                ["Practice Ready", "75%", "Jun 27"],
                ["Mastered", "85%", "Jul 08"],
              ].map(([name, score, date]) => (
                <div
                  key={name}
                  className="bg-white rounded-xl p-4"
                >

                  <p className="font-bold">
                    {name}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {score}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Achieved {date}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <TrendingUp
            className="text-green-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Progress Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your mastery increased from <strong>42%</strong> to{" "}
              <strong>88%</strong>. The strongest improvement followed
              consistent practice and targeted revision. Your progress suggests
              that short revision sessions combined with practical questions
              are particularly effective for this topic.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}