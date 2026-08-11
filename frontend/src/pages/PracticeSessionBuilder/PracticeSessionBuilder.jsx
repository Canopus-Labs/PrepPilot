import React, { useState } from "react";
import {
  Target,
  BookOpen,
  Building2,
  Clock,
  Brain,
  BarChart3,
  PlayCircle,
} from "lucide-react";

const PracticeSessionBuilder = () => {

  const [session, setSession] = useState({
    topic: "Data Structures",
    difficulty: "Medium",
    company: "Google",
    questions: 10,
    time: 45,
    type: "Mixed",
  });

  const [stats] = useState({
    sessions: 32,
    completed: 28,
    avgScore: 91,
    streak: 15,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Target
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Custom Practice Session Builder

            </h1>

            <p className="text-gray-500 mt-2">

              Build personalized interview practice sessions
              tailored to your goals.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Sessions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.sessions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <PlayCircle
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

            <BarChart3
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Avg Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.avgScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

        </div>

        {/* Builder */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Build Your Session

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Topic */}

            <div>

              <label className="font-semibold mb-2 block">

                Topic

              </label>

              <select
                value={session.topic}
                onChange={(e) =>
                  setSession({
                    ...session,
                    topic: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>Data Structures</option>
                <option>Algorithms</option>
                <option>System Design</option>
                <option>DBMS</option>
                <option>Operating Systems</option>
                <option>Computer Networks</option>

              </select>

            </div>

            {/* Difficulty */}

            <div>

              <label className="font-semibold mb-2 block">

                Difficulty

              </label>

              <select
                value={session.difficulty}
                onChange={(e) =>
                  setSession({
                    ...session,
                    difficulty: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

              </select>

            </div>

            {/* Company */}

            <div>

              <label className="font-semibold mb-2 block">

                Company Focus

              </label>

              <select
                value={session.company}
                onChange={(e) =>
                  setSession({
                    ...session,
                    company: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>Google</option>
                <option>Amazon</option>
                <option>Microsoft</option>
                <option>Meta</option>
                <option>Apple</option>
                <option>Netflix</option>

              </select>

            </div>

            {/* Questions */}

            <div>

              <label className="font-semibold mb-2 block">

                Number of Questions

              </label>

              <input
                type="number"
                value={session.questions}
                onChange={(e) =>
                  setSession({
                    ...session,
                    questions: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              />

            </div>

            {/* Time */}

            <div>

              <label className="font-semibold mb-2 block">

                Time Limit (Minutes)

              </label>

              <div className="relative">

                <Clock
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="number"
                  value={session.time}
                  onChange={(e) =>
                    setSession({
                      ...session,
                      time: e.target.value,
                    })
                  }
                  className="w-full pl-12 p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
                />

              </div>

            </div>

            {/* Type */}

            <div>

              <label className="font-semibold mb-2 block">

                Question Type

              </label>

              <select
                value={session.type}
                onChange={(e) =>
                  setSession({
                    ...session,
                    type: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>Mixed</option>
                <option>Coding</option>
                <option>Aptitude</option>
                <option>Behavioral</option>
                <option>MCQ</option>

              </select>

            </div>

          </div>

        </div>

        {/* AI Preview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

          <h2 className="text-2xl font-bold mb-5">

            AI Session Preview

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p><strong>Topic:</strong> {session.topic}</p>
              <p><strong>Difficulty:</strong> {session.difficulty}</p>
              <p><strong>Company:</strong> {session.company}</p>

            </div>

            <div>

              <p><strong>Questions:</strong> {session.questions}</p>
              <p><strong>Time:</strong> {session.time} Minutes</p>
              <p><strong>Type:</strong> {session.type}</p>

            </div>

          </div>

          <button className="mt-8 bg-white text-violet-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-100">

            Generate Practice Session

          </button>

        </div>
                {/* Practice Goal */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Practice Goal

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Interview Readiness",
                value: "92%",
              },
              {
                title: "Estimated Score",
                value: "88%",
              },
              {
                title: "Completion Time",
                value: `${session.time} mins`,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-gray-500">

                  {item.title}

                </h3>

                <p className="text-4xl font-black text-violet-600 mt-4">

                  {item.value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Difficulty Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Estimated Difficulty Score

          </h2>

          {[
            ["Technical Complexity", 84],
            ["Problem Solving", 90],
            ["Time Pressure", 78],
            ["Overall Challenge", 87],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Increase difficulty to "Hard" if your average score stays above 90%.</li>

            <li>• Include one System Design question every session.</li>

            <li>• Mix coding and behavioral questions for balanced preparation.</li>

            <li>• Reduce the time limit gradually to improve speed.</li>

            <li>• Practice company-specific questions before interviews.</li>

          </ul>

        </div>

        {/* Session Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Session Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your custom session focuses on <strong>{session.topic}</strong>
            with <strong>{session.questions}</strong> questions at
            <strong> {session.difficulty}</strong> difficulty,
            targeting <strong>{session.company}</strong> interview
            patterns within a <strong>{session.time}-minute</strong>
            practice session.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Practice with Purpose 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Personalized practice helps you focus on the
                skills that matter most. Build sessions that
                match your goals, challenge yourself regularly,
                and track your improvement over time.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Session Ready

              </h3>

              <p className="text-5xl font-black">

                96%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default PracticeSessionBuilder;