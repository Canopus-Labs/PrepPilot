import React, { useState } from "react";
import {
  Brain,
  CalendarDays,
  CheckCircle2,
  Trophy,
  Target,
  TrendingUp,
  BookOpen,
  Mic,
  Star,
  Clock,
} from "lucide-react";

const milestones = [
  {
    date: "Jan 08, 2026",
    title: "First Practice Session",
    type: "Practice",
    icon: BookOpen,
    description:
      "Completed the first algorithm practice session and established a preparation baseline.",
    metric: "12 questions attempted",
    impact: "+5% readiness",
  },
  {
    date: "Jan 19, 2026",
    title: "Arrays Completed",
    type: "Topic",
    icon: CheckCircle2,
    description:
      "Completed fundamentals, practice questions, and an assessment for Arrays.",
    metric: "87% topic mastery",
    impact: "+8% readiness",
  },
  {
    date: "Feb 02, 2026",
    title: "First Assessment Milestone",
    type: "Assessment",
    icon: Target,
    description:
      "Successfully completed the first comprehensive technical assessment.",
    metric: "82% assessment score",
    impact: "+6% readiness",
  },
  {
    date: "Feb 17, 2026",
    title: "Problem Solving Improved",
    type: "Skill",
    icon: TrendingUp,
    description:
      "Problem-solving performance improved after targeted practice on weak concepts.",
    metric: "64% → 78%",
    impact: "+9% readiness",
  },
  {
    date: "Mar 05, 2026",
    title: "First Mock Interview",
    type: "Mock Interview",
    icon: Mic,
    description:
      "Completed the first full mock interview covering coding and technical communication.",
    metric: "71% interview score",
    impact: "+7% readiness",
  },
  {
    date: "Mar 22, 2026",
    title: "System Design Milestone",
    type: "Topic",
    icon: Trophy,
    description:
      "Completed the system-design learning path and passed the readiness checkpoint.",
    metric: "Ready to practice",
    impact: "+11% readiness",
  },
  {
    date: "Apr 10, 2026",
    title: "Interview Readiness Increased",
    type: "Readiness",
    icon: Star,
    description:
      "Overall readiness crossed the interview-ready threshold after consistent practice.",
    metric: "84% readiness",
    impact: "+12% readiness",
  },
];

const typeStyles = {
  Practice: "bg-indigo-100 text-indigo-700",
  Topic: "bg-green-100 text-green-700",
  Assessment: "bg-orange-100 text-orange-700",
  Skill: "bg-purple-100 text-purple-700",
  "Mock Interview": "bg-pink-100 text-pink-700",
  Readiness: "bg-yellow-100 text-yellow-700",
};

export default function AIInterviewPreparationProgressMilestoneTimeline() {
  const [filter, setFilter] = useState("All");
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const filters = [
    "All",
    "Practice",
    "Topic",
    "Assessment",
    "Skill",
    "Mock Interview",
    "Readiness",
  ];

  const filteredMilestones =
    filter === "All"
      ? milestones
      : milestones.filter((milestone) => milestone.type === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <CalendarDays size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Preparation Progress Milestone Timeline
          </h1>

          <p className="text-gray-500">
            View your complete interview-preparation journey through one
            unified timeline of important milestones.
          </p>
        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div className="p-5 rounded-2xl bg-indigo-50">
            <Trophy
              className="text-indigo-600"
              size={42}
            />
          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Preparation Journey
            </p>

            <div className="flex items-end gap-3">

              <p className="text-5xl font-black text-indigo-600">
                7
              </p>

              <span className="mb-1 text-gray-500">
                major milestones achieved
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              Your preparation has progressed from your first practice session
              to crossing the interview-ready threshold.
            </p>

          </div>

          <div className="text-center">

            <p className="text-sm text-gray-500">
              Current Readiness
            </p>

            <p className="text-4xl font-black text-green-600">
              84%
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <BookOpen className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Practice Milestones
          </p>

          <p className="text-3xl font-black text-indigo-600">
            1
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <CheckCircle2 className="text-green-600" />

          <p className="text-sm text-gray-500 mt-4">
            Topics Completed
          </p>

          <p className="text-3xl font-black text-green-600">
            2
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Mic className="text-purple-600" />

          <p className="text-sm text-gray-500 mt-4">
            Mock Interviews
          </p>

          <p className="text-3xl font-black text-purple-600">
            1
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <TrendingUp className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-4">
            Readiness Growth
          </p>

          <p className="text-3xl font-black text-orange-600">
            +58%
          </p>

        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-3 flex-wrap">

          <p className="font-semibold mr-2">
            Filter Timeline:
          </p>

          {filters.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                filter === item
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-indigo-50"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Preparation Journey
            </h2>

            <p className="text-sm text-gray-500">
              Major events are ordered chronologically to show how your
              preparation evolved.
            </p>

          </div>

        </div>

        <div className="relative mt-8">

          {/* Timeline line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-indigo-100" />

          <div className="space-y-8">

            {filteredMilestones.map((milestone, index) => {
              const Icon = milestone.icon;

              return (
                <button
                  type="button"
                  key={`${milestone.date}-${milestone.title}`}
                  onClick={() =>
                    setSelectedMilestone(
                      selectedMilestone === index ? null : index
                    )
                  }
                  className="relative w-full text-left"
                >

                  <div className="flex gap-5">

                    {/* Timeline node */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        typeStyles[milestone.type]
                      }`}
                    >
                      <Icon size={21} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 border rounded-2xl p-5 hover:border-indigo-400 transition">

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">

                        <div>

                          <p className="text-xs text-gray-500">
                            {milestone.date}
                          </p>

                          <h3 className="font-bold text-lg mt-1">
                            {milestone.title}
                          </h3>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                            typeStyles[milestone.type]
                          }`}
                        >
                          {milestone.type}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        {milestone.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-4">

                        <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                          {milestone.metric}
                        </span>

                        <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">
                          {milestone.impact}
                        </span>

                      </div>

                      {selectedMilestone === index && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-indigo-700">
                            AI Milestone Insight
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            This milestone represents a meaningful change in
                            your preparation journey and contributed to the
                            improvement shown in your readiness trend.
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

      {/* Readiness Trend */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Readiness Changes Across Milestones
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          See how major preparation events contributed to changes in overall
          readiness.
        </p>

        <div className="mt-7 flex items-end gap-3 h-64 border-b border-l p-5">

          {[26, 31, 39, 48, 55, 69, 84].map((value, index) => (
            <div
              key={value}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >

              <span className="text-xs font-bold text-indigo-600 mb-2">
                {value}%
              </span>

              <div
                className="w-full max-w-12 bg-indigo-500 rounded-t-xl"
                style={{
                  height: `${value * 2.3}px`,
                }}
              />

              <span className="text-xs text-gray-400 mt-2">
                M{index + 1}
              </span>

            </div>
          ))}

        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

          <TrendingUp
            size={18}
            className="text-green-600"
          />

          <span>
            Readiness increased from <strong>26%</strong> to{" "}
            <strong>84%</strong> across the tracked milestones.
          </span>

        </div>

      </div>

      {/* Milestone Impact */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Milestone Impact Analysis
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Identify which preparation milestones had the largest impact on
          readiness.
        </p>

        <div className="space-y-4 mt-6">

          {milestones
            .slice()
            .sort(
              (a, b) =>
                parseInt(b.impact.replace(/\D/g, "")) -
                parseInt(a.impact.replace(/\D/g, ""))
            )
            .slice(0, 5)
            .map((milestone) => (
              <div
                key={milestone.title}
                className="border rounded-xl p-4"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <p className="font-semibold">
                      {milestone.title}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {milestone.type}
                    </p>

                  </div>

                  <span className="text-green-600 font-black">
                    {milestone.impact}
                  </span>

                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${parseInt(
                        milestone.impact.replace(/\D/g, "")
                      ) * 7}%`,
                    }}
                  />

                </div>

              </div>
            ))}

        </div>

      </div>

      {/* Journey Highlights */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-green-50 rounded-2xl p-6">

          <CheckCircle2 className="text-green-600" />

          <h3 className="font-bold mt-4">
            Biggest Achievement
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            Crossing the interview-ready threshold after completing multiple
            preparation milestones.
          </p>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6">

          <TrendingUp className="text-indigo-600" />

          <h3 className="font-bold mt-4">
            Strongest Growth
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            Problem-solving performance improved significantly after targeted
            practice.
          </p>

        </div>

        <div className="bg-orange-50 rounded-2xl p-6">

          <Target className="text-orange-600" />

          <h3 className="font-bold mt-4">
            Next Milestone
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            Complete additional mock interviews to validate readiness under
            realistic interview conditions.
          </p>

        </div>

      </div>

      {/* AI Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI Preparation Journey Summary
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation shows a steady progression from foundational
              practice toward interview readiness. The largest improvements
              followed topic completion, targeted skill practice, and mock
              interview experience. Reviewing this timeline helps identify
              which activities produced the strongest improvement rather than
              looking at isolated statistics.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}