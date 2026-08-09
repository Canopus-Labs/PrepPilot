import React, { useState } from "react";
import {
  BookOpen,
  PenSquare,
  CalendarDays,
  Smile,
  Tag,
  Building2,
  Brain,
} from "lucide-react";

const InterviewPreparationJournal = () => {

  const [entry, setEntry] = useState({
    title: "",
    topic: "Data Structures",
    company: "Google",
    mood: "😊 Motivated",
    confidence: 85,
    content: "",
  });

  const [stats] = useState({
    entries: 48,
    streak: 15,
    reflections: 32,
    confidence: 85,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <BookOpen
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Interview Preparation Journal

            </h1>

            <p className="text-gray-500 mt-2">

              Record your daily preparation, interview reflections,
              and learning journey in one organized place.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Journal Entries

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.entries}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarDays
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Writing Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <PenSquare
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Reflections

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.reflections}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Confidence

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.confidence}%

            </p>

          </div>

        </div>

        {/* New Journal Entry */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            New Journal Entry

          </h2>

          <div className="space-y-6">

            <div>

              <label className="block font-semibold mb-2">

                Title

              </label>

              <input
                type="text"
                placeholder="Today's preparation summary"
                value={entry.title}
                onChange={(e) =>
                  setEntry({
                    ...entry,
                    title: e.target.value,
                  })
                }
                className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block font-semibold mb-2">

                  Topic

                </label>

                <select
                  value={entry.topic}
                  onChange={(e) =>
                    setEntry({
                      ...entry,
                      topic: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
                >

                  <option>Data Structures</option>
                  <option>Algorithms</option>
                  <option>System Design</option>
                  <option>Operating Systems</option>
                  <option>DBMS</option>

                </select>

              </div>

              <div>

                <label className="block font-semibold mb-2">

                  Company

                </label>

                <select
                  value={entry.company}
                  onChange={(e) =>
                    setEntry({
                      ...entry,
                      company: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
                >

                  <option>Google</option>
                  <option>Amazon</option>
                  <option>Microsoft</option>
                  <option>Meta</option>
                  <option>Apple</option>

                </select>

              </div>

            </div>

            <div>

              <label className="block font-semibold mb-2">

                Journal Entry

              </label>

              <textarea
                rows={8}
                value={entry.content}
                onChange={(e) =>
                  setEntry({
                    ...entry,
                    content: e.target.value,
                  })
                }
                placeholder="Write your preparation notes, interview reflections, and learning experience..."
                className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
              />

            </div>

          </div>

        </div>

        {/* Mood & Confidence */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Smile className="text-yellow-500" />

              <h2 className="text-2xl font-bold">

                Mood

              </h2>

            </div>

            <select
              value={entry.mood}
              onChange={(e) =>
                setEntry({
                  ...entry,
                  mood: e.target.value,
                })
              }
              className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >

              <option>😊 Motivated</option>
              <option>😃 Confident</option>
              <option>🙂 Calm</option>
              <option>😐 Neutral</option>
              <option>😓 Stressed</option>

            </select>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Brain className="text-blue-600" />

              <h2 className="text-2xl font-bold">

                Confidence Level

              </h2>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={entry.confidence}
              onChange={(e) =>
                setEntry({
                  ...entry,
                  confidence: e.target.value,
                })
              }
              className="w-full"
            />

            <p className="mt-4 text-xl font-bold text-violet-600">

              {entry.confidence}%

            </p>

          </div>

        </div>

        {/* Journal Preview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-2xl font-bold mb-6">

            Journal Preview

          </h2>

          <p><strong>Title:</strong> {entry.title || "Untitled Entry"}</p>

          <p className="mt-2">
            <strong>Topic:</strong> {entry.topic}
          </p>

          <p className="mt-2">
            <strong>Company:</strong> {entry.company}
          </p>

          <p className="mt-2">
            <strong>Mood:</strong> {entry.mood}
          </p>

          <p className="mt-2">
            <strong>Confidence:</strong> {entry.confidence}%
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-5">

            {entry.content || "Your journal entry preview will appear here..."}

          </div>

        </div>
                {/* Search Journal */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Search Previous Entries

          </h2>

          <input
            type="text"
            placeholder="Search by title, topic, company or keyword..."
            className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
          />

        </div>

        {/* Journal Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Journal Timeline

          </h2>

          {[
            ["Aug 4, 2026", "Solved Dynamic Programming problems"],
            ["Aug 3, 2026", "Completed Google mock interview"],
            ["Aug 2, 2026", "Revised Graph algorithms"],
            ["Aug 1, 2026", "Practiced HR interview questions"],
          ].map(([date, note], index) => (

            <div
              key={index}
              className="flex gap-5 border-l-4 border-violet-600 pl-5 py-4"
            >

              <div>

                <h3 className="font-bold">

                  {date}

                </h3>

                <p className="text-gray-600 dark:text-gray-300">

                  {note}

                </p>

              </div>

            </div>

          ))}

        </div>

        {/* AI Reflection */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Reflection Insights

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Your confidence has steadily improved over the last two weeks.</li>

            <li>• Most journal entries focus on DSA preparation.</li>

            <li>• Consider adding more interview reflection notes after mock sessions.</li>

            <li>• Continue maintaining your writing streak for better self-awareness.</li>

            <li>• Schedule weekly reviews to reinforce learning.</li>

          </ul>

        </div>

        {/* Writing Statistics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Writing Statistics

          </h2>

          {[
            ["Journal Completion", 92],
            ["Reflection Quality", 86],
            ["Writing Consistency", 88],
            ["Confidence Growth", 85],
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

        {/* Export */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Export Journal

          </h2>

          <button className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

            Export Journal as PDF

          </button>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Reflect, Learn, Grow 🌱

              </h2>

              <p className="leading-8 text-white/90">

                Recording your preparation journey helps reinforce
                learning, identify improvement areas, and celebrate
                progress. Small daily reflections lead to meaningful
                long-term growth.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📖

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Journal Score

              </h3>

              <p className="text-5xl font-black">

                90%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default InterviewPreparationJournal;