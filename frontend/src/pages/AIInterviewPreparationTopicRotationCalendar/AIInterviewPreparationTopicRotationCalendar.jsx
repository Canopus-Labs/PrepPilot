import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  CalendarDays,
  Target,
  TrendingUp,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Code2,
  Database,
  MessageSquare,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

const topics = [
  {
    name: "Data Structures",
    icon: Code2,
    score: 78,
    priority: "High",
    sessions: 4,
  },
  {
    name: "Algorithms",
    icon: Brain,
    score: 84,
    priority: "High",
    sessions: 3,
  },
  {
    name: "System Design",
    icon: Database,
    score: 68,
    priority: "Critical",
    sessions: 4,
  },
  {
    name: "Databases",
    icon: Database,
    score: 74,
    priority: "High",
    sessions: 2,
  },
  {
    name: "Communication",
    icon: MessageSquare,
    score: 88,
    priority: "Medium",
    sessions: 2,
  },
  {
    name: "Behavioral",
    icon: Briefcase,
    score: 91,
    priority: "Low",
    sessions: 1,
  },
];

const weekSchedule = [
  {
    day: "Monday",
    date: "Aug 17",
    topics: ["Data Structures", "Communication"],
    duration: "75 min",
    status: "Planned",
  },
  {
    day: "Tuesday",
    date: "Aug 18",
    topics: ["System Design", "Algorithms"],
    duration: "90 min",
    status: "Planned",
  },
  {
    day: "Wednesday",
    date: "Aug 19",
    topics: ["Databases", "Behavioral"],
    duration: "60 min",
    status: "Planned",
  },
  {
    day: "Thursday",
    date: "Aug 20",
    topics: ["System Design", "Data Structures"],
    duration: "90 min",
    status: "Planned",
  },
  {
    day: "Friday",
    date: "Aug 21",
    topics: ["Algorithms", "Communication"],
    duration: "75 min",
    status: "Planned",
  },
  {
    day: "Saturday",
    date: "Aug 22",
    topics: ["System Design", "Databases"],
    duration: "90 min",
    status: "Planned",
  },
  {
    day: "Sunday",
    date: "Aug 23",
    topics: ["Mixed Revision", "Mock Interview"],
    duration: "90 min",
    status: "Review",
  },
];

const AIInterviewPreparationTopicRotationCalendar = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [weekOffset, setWeekOffset] = useState(0);
  const [isRebalancing, setIsRebalancing] = useState(false);

  const handleRebalance = () => {
    setIsRebalancing(true);

    setTimeout(() => {
      setIsRebalancing(false);
    }, 700);
  };

  const getPriorityClass = (priority) => {
    if (priority === "Critical") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (priority === "High") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <CalendarDays size={34} className="text-blue-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Topic Rotation Calendar
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Build a balanced preparation schedule that automatically
                rotates topics based on your performance and priorities.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleRebalance}
            disabled={isRebalancing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isRebalancing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Rebalancing...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Rebalance Calendar
              </>
            )}
          </button>

        </div>

        {/* Banner */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Practice the Right Topic at the Right Time
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes your target role, skill level, weak areas, interview
            timeline, and previous practice history to build a balanced
            preparation calendar. The schedule automatically adapts as your
            performance changes.
          </p>

        </div>

        {/* Summary */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CalendarDays className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Weekly Sessions
            </p>

            <p className="text-5xl font-black mt-2">
              13
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-red-600" size={30} />

            <p className="text-gray-500 mt-4">
              Critical Topics
            </p>

            <p className="text-5xl font-black text-red-600 mt-2">
              1
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingUp className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Schedule Balance
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              86%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Clock className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Weekly Practice
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              9h
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["calendar", "Rotation Calendar"],
            ["topics", "Topic Priorities"],
            ["analytics", "Balance Analytics"],
            ["recommendations", "AI Recommendations"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Calendar */}

        {activeTab === "calendar" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-8">

                <div>

                  <p className="text-sm text-gray-500">
                    AI-generated schedule
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    August 17 – August 23, 2026
                  </h2>

                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setWeekOffset((previous) => previous - 1)
                    }
                    className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setWeekOffset(0)}
                    className="px-4 h-11 rounded-xl border border-gray-200 dark:border-white/10 font-semibold"
                  >
                    Today
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setWeekOffset((previous) => previous + 1)
                    }
                    className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center"
                  >
                    <ChevronRight size={20} />
                  </button>

                </div>

              </div>

              <div className="grid lg:grid-cols-7 gap-4">

                {weekSchedule.map((day) => (

                  <div
                    key={day.day}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="font-bold">
                          {day.day}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {day.date}
                        </p>

                      </div>

                      {day.status === "Review" ? (
                        <CheckCircle2
                          size={18}
                          className="text-green-600"
                        />
                      ) : (
                        <CalendarDays
                          size={18}
                          className="text-blue-600"
                        />
                      )}

                    </div>

                    <div className="mt-5 space-y-3">

                      {day.topics.map((topic) => (

                        <div
                          key={topic}
                          className="rounded-xl bg-blue-50 dark:bg-blue-900/10 p-3"
                        >

                          <p className="text-sm font-bold">
                            {topic}
                          </p>

                        </div>

                      ))}

                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">

                      <Clock size={14} />

                      {day.duration}

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Today's Focus */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Target className="text-red-600" />

                  <h2 className="text-2xl font-bold">
                    Today's Priority
                  </h2>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-red-600 font-bold">
                        CRITICAL
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        System Design
                      </h3>

                    </div>

                    <p className="text-4xl font-black text-red-600">
                      68%
                    </p>

                  </div>

                  <p className="text-gray-500 mt-5 leading-7">
                    Your current system-design score is below your other
                    preparation areas. AI has increased its frequency this
                    week to close the gap before your interview.
                  </p>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    Why This Schedule?
                  </h2>

                </div>

                <p className="text-gray-500 leading-8">
                  The calendar intentionally gives more sessions to weak and
                  interview-relevant topics while maintaining regular revision
                  of stronger areas. This prevents over-practicing familiar
                  subjects while keeping mastered skills active.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Topics */}

        {activeTab === "topics" && (
          <div className="mt-6 space-y-8">

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {topics.map((topic) => {

                const Icon = topic.icon;

                return (
                  <div
                    key={topic.name}
                    className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-blue-600"
                        />

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityClass(
                          topic.priority
                        )}`}
                      >
                        {topic.priority}
                      </span>

                    </div>

                    <h3 className="text-xl font-bold mt-6">
                      {topic.name}
                    </h3>

                    <div className="mt-5">

                      <div className="flex justify-between mb-2">

                        <span className="text-sm text-gray-500">
                          Current mastery
                        </span>

                        <strong>
                          {topic.score}%
                        </strong>

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                        <div
                          className={`h-full rounded-full ${
                            topic.score >= 85
                              ? "bg-green-500"
                              : topic.score >= 75
                              ? "bg-blue-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${topic.score}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="flex items-center justify-between mt-6 text-sm">

                      <span className="text-gray-500">
                        Planned sessions
                      </span>

                      <strong>
                        {topic.sessions}
                      </strong>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Priority Logic */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  AI Topic Prioritization
                </h2>

              </div>

              <div className="space-y-5">

                {topics
                  .slice()
                  .sort((a, b) => a.score - b.score)
                  .map((topic, index) => {

                    const Icon = topic.icon;

                    return (
                      <div
                        key={topic.name}
                        className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                      >

                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
                          {index + 1}
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shrink-0">

                          <Icon
                            size={23}
                            className="text-blue-600"
                          />

                        </div>

                        <div className="flex-1">

                          <h3 className="font-bold">
                            {topic.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {topic.score}% mastery · {topic.priority} priority
                          </p>

                        </div>

                        <span className="font-bold text-blue-600">
                          Rank #{index + 1}
                        </span>

                      </div>
                    );
                  })}

              </div>

            </div>

          </div>
        )}

        {/* Analytics */}

        {activeTab === "analytics" && (
          <div className="mt-6 space-y-8">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <TrendingUp className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Balance Score
                </p>

                <p className="text-5xl font-black text-green-600 mt-2">
                  86%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Target className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Topics Covered
                </p>

                <p className="text-5xl font-black mt-2">
                  6/6
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Clock className="text-violet-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Avg. Daily Time
                </p>

                <p className="text-5xl font-black text-violet-600 mt-2">
                  77m
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <CheckCircle2 className="text-orange-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Schedule Adherence
                </p>

                <p className="text-5xl font-black text-orange-600 mt-2">
                  92%
                </p>

              </div>

            </div>

            {/* Topic Distribution */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Weekly Topic Distribution
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  ["System Design", 24],
                  ["Data Structures", 19],
                  ["Algorithms", 18],
                  ["Databases", 14],
                  ["Communication", 13],
                  ["Behavioral", 12],
                ].map(([topic, percentage]) => (

                  <div key={topic}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {topic}
                      </span>

                      <span className="font-bold">
                        {percentage}%
                      </span>

                    </div>

                    <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${percentage * 4}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Neglected Topics */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <AlertTriangle className="text-orange-500" />

                  <h2 className="text-2xl font-bold">
                    Neglected Topic Detection
                  </h2>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6">

                  <h3 className="text-xl font-bold">
                    Databases
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    Your recent practice history shows fewer database sessions
                    compared with its importance for your target role.
                  </p>

                  <button
                    type="button"
                    onClick={handleRebalance}
                    className="mt-5 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-600 text-white font-semibold"
                  >
                    Add Sessions
                    <RefreshCw size={17} />
                  </button>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <TrendingUp className="text-green-600" />

                  <h2 className="text-2xl font-bold">
                    Balance Improvement
                  </h2>

                </div>

                <p className="text-gray-500 leading-7">
                  Your preparation balance increased from 71% to 86% after AI
                  introduced more system-design and database sessions.
                </p>

                <div className="flex items-center gap-4 mt-7">

                  <p className="text-5xl font-black text-green-600">
                    +15%
                  </p>

                  <p className="text-gray-500">
                    improvement in topic balance
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Recommendations
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-6">

                {[
                  {
                    title: "Increase System Design",
                    description:
                      "Your current mastery is 68%, making system design the highest-priority topic this week.",
                    icon: Database,
                  },
                  {
                    title: "Maintain Strong Topics",
                    description:
                      "Continue shorter revision sessions for communication and behavioral preparation.",
                    icon: BookOpen,
                  },
                  {
                    title: "Add Database Practice",
                    description:
                      "Your recent practice history shows that databases need more consistent attention.",
                    icon: Target,
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-gray-200 dark:border-white/10 p-7"
                    >

                      <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-blue-600"
                        />

                      </div>

                      <h3 className="text-xl font-bold mt-6">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {item.description}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* AI Logic */}

            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Sparkles size={30} />

                <h2 className="text-3xl font-bold">
                  How AI Rebalances Your Calendar
                </h2>

              </div>

              <div className="grid md:grid-cols-5 gap-4">

                {[
                  ["1", "Analyze", "Review recent performance."],
                  ["2", "Prioritize", "Rank weak and important topics."],
                  ["3", "Schedule", "Distribute topics across days."],
                  ["4", "Monitor", "Track performance changes."],
                  ["5", "Adapt", "Automatically rebalance sessions."],
                ].map(([number, title, description]) => (

                  <div
                    key={number}
                    className="rounded-2xl bg-white/10 p-5"
                  >

                    <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-black">
                      {number}
                    </div>

                    <h3 className="font-bold text-lg mt-5">
                      {title}
                    </h3>

                    <p className="text-white/80 mt-2 leading-6">
                      {description}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "⚖️",
                "Balanced Preparation",
                "Prevents users from focusing too heavily on preferred topics.",
              ],
              [
                "🎯",
                "Targeted Practice",
                "Gives weak and important topics more preparation time.",
              ],
              [
                "📅",
                "Structured Schedule",
                "Creates a clear daily and weekly preparation plan.",
              ],
              [
                "🔄",
                "Adaptive Calendar",
                "Automatically changes the schedule as performance changes.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your preparation is well balanced at 86%, but system design
                and databases require additional attention. AI recommends
                increasing their practice frequency while maintaining lighter
                revision sessions for your stronger communication and
                behavioral skills.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                📅
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Balance Score
              </h3>

              <p className="text-5xl font-black">
                86%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationTopicRotationCalendar;