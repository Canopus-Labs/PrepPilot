import React, { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Target,
  BookOpen,
  FileText,
  MessageSquare,
  Mic,
  AlertTriangle,
  HelpCircle,
  Clock,
  Brain,
  Star,
} from "lucide-react";

const checklistItems = [
  {
    id: 1,
    title: "Revise Sliding Window",
    category: "Technical Revision",
    priority: "Critical",
    reason: "Repeated mistakes were detected in recent practice.",
    duration: "30 min",
    completed: false,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Review Hashing Patterns",
    category: "Technical Revision",
    priority: "High",
    reason: "Frequently used concept for the target role.",
    duration: "20 min",
    completed: false,
    icon: Brain,
  },
  {
    id: 3,
    title: "Review Resume Projects",
    category: "Resume & Projects",
    priority: "Critical",
    reason: "Your projects are likely to be discussed during the interview.",
    duration: "25 min",
    completed: false,
    icon: FileText,
  },
  {
    id: 4,
    title: "Practice Project Explanation",
    category: "Communication",
    priority: "High",
    reason: "Previous answers lacked clear ownership and technical impact.",
    duration: "15 min",
    completed: false,
    icon: MessageSquare,
  },
  {
    id: 5,
    title: "Complete Final Mock Interview",
    category: "Mock Interview",
    priority: "Critical",
    reason: "One final realistic practice session is recommended.",
    duration: "45 min",
    completed: false,
    icon: Mic,
  },
  {
    id: 6,
    title: "Prepare Behavioral Questions",
    category: "Behavioral",
    priority: "High",
    reason: "Behavioral preparation has lower recent activity.",
    duration: "25 min",
    completed: false,
    icon: MessageSquare,
  },
  {
    id: 7,
    title: "Prepare Questions for Interviewer",
    category: "Interview Strategy",
    priority: "Medium",
    reason: "No interviewer questions have been prepared yet.",
    duration: "10 min",
    completed: false,
    icon: HelpCircle,
  },
  {
    id: 8,
    title: "Check Remaining Preparation Tasks",
    category: "Final Review",
    priority: "Medium",
    reason: "Two preparation activities remain incomplete.",
    duration: "10 min",
    completed: false,
    icon: AlertTriangle,
  },
];

const priorityStyles = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
};

export default function AIInterviewPreparationInterviewDayChecklist() {
  const [items, setItems] = useState(checklistItems);
  const [filter, setFilter] = useState("All");

  const toggleItem = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);

  const completedCount = items.filter((item) => item.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <CalendarCheck size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview-Day Checklist
          </h1>

          <p className="text-gray-500">
            Your personalized final preparation checklist based on your
            interview goals and preparation history.
          </p>

        </div>

      </div>

      {/* Interview Information */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row justify-between gap-5">

          <div>

            <p className="text-sm text-gray-500">
              Upcoming Interview
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Software Engineer Technical Interview
            </h2>

            <div className="flex flex-wrap gap-3 mt-4">

              <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-semibold">
                Data Structures
              </span>

              <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-semibold">
                Algorithms
              </span>

              <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-semibold">
                System Design
              </span>

              <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-semibold">
                Behavioral
              </span>

            </div>

          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Interview Date
            </p>

            <p className="text-2xl font-black text-indigo-600">
              Tomorrow
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Final preparation day
            </p>

          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="p-4 bg-white rounded-2xl">
            <Target
              size={38}
              className="text-indigo-600"
            />
          </div>

          <div className="flex-1">

            <div className="flex justify-between items-end">

              <div>

                <p className="text-sm text-gray-500">
                  Final Preparation Progress
                </p>

                <p className="text-4xl font-black text-indigo-600">
                  {progress}%
                </p>

              </div>

              <p className="text-sm text-gray-500">
                {completedCount}/{items.length} completed
              </p>

            </div>

            <div className="h-3 bg-white rounded-full mt-4">

              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <Star className="text-red-600" />

          <p className="text-sm text-gray-500 mt-4">
            Critical Tasks
          </p>

          <p className="text-3xl font-black text-red-600">
            3
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <BookOpen className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Technical Revision
          </p>

          <p className="text-3xl font-black text-indigo-600">
            2
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Mic className="text-purple-600" />

          <p className="text-sm text-gray-500 mt-4">
            Final Mock
          </p>

          <p className="text-3xl font-black text-purple-600">
            1
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Clock className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-4">
            Estimated Time
          </p>

          <p className="text-3xl font-black text-orange-600">
            3h
          </p>

        </div>

      </div>

      {/* AI Priorities */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-red-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-red-700">
              AI Top Priorities
            </h2>

            <p className="text-gray-600 mt-2">
              Based on your preparation history, these are the highest-impact
              activities to complete before the interview.
            </p>

            <div className="space-y-3 mt-5">

              {items
                .filter((item) => item.priority === "Critical")
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 flex gap-3"
                  >

                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </span>

                    <div>

                      <p className="font-semibold">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.reason}
                      </p>

                    </div>

                  </div>
                ))}

            </div>

          </div>

        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex flex-wrap gap-2">

          {[
            "All",
            "Technical Revision",
            "Resume & Projects",
            "Communication",
            "Mock Interview",
            "Behavioral",
            "Interview Strategy",
            "Final Review",
          ].map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                filter === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Personalized Interview-Day Checklist
            </h2>

            <p className="text-sm text-gray-500">
              Complete the highest-impact items before your interview.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {filteredItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  item.completed
                    ? "bg-green-50 border-green-200"
                    : "hover:border-indigo-400"
                }`}
              >

                <div className="flex gap-4">

                  <div className="pt-1">

                    {item.completed ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={25}
                      />
                    ) : (
                      <Circle
                        className="text-gray-400"
                        size={25}
                      />
                    )}

                  </div>

                  <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
                    <Icon size={21} />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-col md:flex-row md:justify-between gap-2">

                      <div>

                        <h3
                          className={`font-bold ${
                            item.completed
                              ? "line-through text-gray-500"
                              : ""
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.category}
                        </p>

                      </div>

                      <div className="flex gap-2">

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            priorityStyles[item.priority]
                          }`}
                        >
                          {item.priority}
                        </span>

                        <span className="px-3 py-1 h-fit rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                          {item.duration}
                        </span>

                      </div>

                    </div>

                    <p className="text-sm text-gray-600 mt-3">
                      {item.reason}
                    </p>

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Frequently Missed */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              Frequently Missed Areas
            </h2>

            <p className="text-gray-600 mt-2">
              AI identified these areas as common weaknesses in your recent
              preparation.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              {[
                "Edge-case reasoning",
                "Project ownership",
                "Trade-off explanations",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl p-4"
                >

                  <AlertTriangle
                    size={20}
                    className="text-orange-600"
                  />

                  <p className="font-semibold mt-3">
                    {item}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Recommended for final review
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Resume Review */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
            <FileText size={24} />
          </div>

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Resume & Project Final Review
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Prepare concise explanations for anything the interviewer may
              ask about your resume.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              {[
                "Explain your strongest project",
                "Know your technical contributions",
                "Prepare measurable achievements",
              ].map((item) => (
                <div
                  key={item}
                  className="border rounded-xl p-4"
                >

                  <CheckCircle2
                    size={19}
                    className="text-green-600"
                  />

                  <p className="text-sm font-semibold mt-2">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Behavioral Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <div className="p-3 rounded-xl bg-purple-100 text-purple-600 h-fit">
            <MessageSquare size={24} />
          </div>

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Behavioral Interview Preparation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Prepare concise examples using your real experiences.
            </p>

            <div className="space-y-3 mt-5">

              {[
                "Tell me about yourself.",
                "Describe a difficult technical problem you solved.",
                "Tell me about a time you disagreed with a teammate.",
                "Describe a project you are most proud of.",
              ].map((question) => (
                <div
                  key={question}
                  className="border rounded-xl p-4 flex items-center gap-3"
                >

                  <Circle
                    size={20}
                    className="text-gray-400"
                  />

                  <p className="text-sm font-semibold">
                    {question}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Questions to Ask */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <div className="p-3 rounded-xl bg-green-100 text-green-600 h-fit">
            <HelpCircle size={24} />
          </div>

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Questions to Ask the Interviewer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Prepare thoughtful questions that demonstrate genuine interest
              in the role.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              {[
                "What does success look like in this role?",
                "What are the biggest technical challenges the team is facing?",
                "How does the team approach technical design decisions?",
                "What would you expect from someone in the first six months?",
              ].map((question) => (
                <div
                  key={question}
                  className="border rounded-xl p-4"
                >
                  <p className="text-sm font-semibold">
                    {question}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Final AI Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI Final Preparation Summary
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation is in a strong position. Avoid trying to learn
              large amounts of new material on the final day. Focus on the
              three critical tasks, review your projects, practice behavioral
              responses, and complete one final mock interview. This checklist
              is prioritized from your preparation history rather than being a
              generic interview checklist.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}