import React, { useState } from "react";
import {
  Brain,
  CheckSquare,
  BookOpen,
  Code2,
  FileText,
  TrendingUp,
  Target,
} from "lucide-react";

const AIPersonalizedRevisionChecklist = () => {

  const [stats] = useState({
    readiness: 91,
    completed: 18,
    remaining: 9,
    progress: 67,
  });

  const [tasks, setTasks] = useState([
    {
      title: "Revise Binary Search",
      category: "DSA",
      completed: false,
    },
    {
      title: "Practice Dynamic Programming",
      category: "DSA",
      completed: false,
    },
    {
      title: "Review DBMS Normalization",
      category: "Core Subject",
      completed: true,
    },
    {
      title: "Update Resume Projects",
      category: "Resume",
      completed: false,
    },
  ]);

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Brain
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Personalized Revision Checklist

            </h1>

            <p className="text-gray-500 mt-2">

              Get a personalized revision checklist generated
              automatically from your preparation history,
              weak areas, and interview goals.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckSquare
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Remaining

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.remaining}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Progress

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.progress}%

            </p>

          </div>

        </div>

        {/* Revision Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Generated Revision Checklist

          </h2>

          <div className="space-y-5">

            {tasks.map((task, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div>

                  <h3 className="font-semibold">

                    {task.title}

                  </h3>

                  <p className="text-gray-500 text-sm">

                    {task.category}

                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="w-5 h-5"
                />

              </div>

            ))}

          </div>

        </div>

        {/* Weak DSA Topics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Weak DSA Topics

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Dynamic Programming",
              "Graphs",
              "Trie",
              "Segment Tree",
            ].map((topic, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                {topic}

              </div>

            ))}

          </div>

        </div>

        {/* Core Subjects */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Core Subject Revision

            </h2>

          </div>

          {[
            "Operating Systems",
            "DBMS",
            "Computer Networks",
            "OOP Concepts",
          ].map((subject, index) => (

            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-white/10 p-5 mb-4"
            >

              {subject}

            </div>

          ))}

        </div>

        {/* Resume Review */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <FileText />

            <h2 className="text-2xl font-bold">

              Resume Review

            </h2>

          </div>

          <p className="leading-8">

            ✔ Update project descriptions

            <br />

            ✔ Verify technical skills

            <br />

            ✔ Add latest achievements

            <br />

            ✔ Check ATS-friendly formatting

          </p>

        </div>
                {/* HR & Aptitude Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            HR & Aptitude Revision

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Practice HR Introduction",
              "Behavioral Questions",
              "Quantitative Aptitude",
              "Logical Reasoning",
              "Verbal Ability",
              "Company Research",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex items-center gap-3"
              >

                <CheckSquare className="text-violet-600" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

        {/* Flashcard Review */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Flashcard Review Tasks

          </h2>

          <div className="space-y-4">

            {[
              "Operating Systems Flashcards",
              "DBMS Flashcards",
              "Networking Flashcards",
              "OOP Flashcards",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                {item}

              </div>

            ))}

          </div>

        </div>

        {/* Mock Interview Reminder */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Mock Interview Reminder

          </h2>

          <p className="text-lg">

            🎤 Your next mock interview is scheduled for tomorrow.

          </p>

          <p className="mt-4">

            Complete today's revision checklist before starting
            the mock interview session.

          </p>

        </div>

        {/* Regenerate Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8 text-center">

          <button className="px-10 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

            🔄 Regenerate AI Revision Checklist

          </button>

        </div>

        {/* Revision Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Revision Analytics

          </h2>

          {[
            ["Checklist Completion", 67],
            ["DSA Revision", 74],
            ["Core Subjects", 81],
            ["Interview Readiness", 91],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Revise Smarter, Not Harder 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Personalized revision helps you focus on your weakest
                areas while reinforcing important concepts. Complete
                your checklist consistently and let AI guide your
                interview preparation journey.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                ✅

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Readiness

              </h3>

              <p className="text-5xl font-black">

                {stats.readiness}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIPersonalizedRevisionChecklist;