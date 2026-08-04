import React, { useState } from "react";
import {
  BookOpen,
  Brain,
  Target,
  Trophy,
  Flame,
} from "lucide-react";

const VocabularyBuilder = () => {

  const [stats] = useState({
    learnedWords: 128,
    todayWords: 10,
    streak: 18,
    quizzesPassed: 34,
  });

  const [role, setRole] = useState("Software Engineer");

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <BookOpen
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Interview Vocabulary Builder

              </h1>

              <p className="text-gray-500 mt-2">

                Learn technical and professional interview
                vocabulary with AI-powered recommendations.

              </p>

            </div>

          </div>

        </div>

        {/* Role Selector */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <label className="block font-semibold mb-3">

            Target Role

          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-white/10 p-3 bg-white dark:bg-[#1f2937] outline-none"
          >

            <option>Software Engineer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>Data Scientist</option>
            <option>AI/ML Engineer</option>

          </select>

        </div>

        {/* Dashboard */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Learned Words

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.learnedWords}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Today's Words

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.todayWords}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Flame
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Daily Streak

            </h3>

            <p className="text-5xl font-black mt-4">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Trophy
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              Quizzes Passed

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.quizzesPassed}

            </p>

          </div>

        </div>
                {/* Daily Vocabulary */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Today's AI Vocabulary

          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            {[
              {
                word: "Scalability",
                definition:
                  "The ability of a system to handle increasing workload efficiently.",
                example:
                  "I designed the application with scalability in mind using microservices.",
                company: "Google",
              },
              {
                word: "Latency",
                definition:
                  "The delay between a request and its response.",
                example:
                  "Caching significantly reduced API latency.",
                company: "Amazon",
              },
              {
                word: "Concurrency",
                definition:
                  "Executing multiple tasks during overlapping time periods.",
                example:
                  "Java supports concurrency using threads and executors.",
                company: "Microsoft",
              },
              {
                word: "Idempotent",
                definition:
                  "An operation that produces the same result when repeated.",
                example:
                  "REST PUT requests should be idempotent.",
                company: "Netflix",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-2xl font-bold">

                    {item.word}

                  </h3>

                  <span className="px-3 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">

                    {item.company}

                  </span>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold">

                    Definition

                  </h4>

                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-7">

                    {item.definition}

                  </p>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold">

                    Interview Example

                  </h4>

                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-7">

                    {item.example}

                  </p>

                </div>

                <div className="flex gap-4 mt-8">

                  <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition">

                    Mark Learned

                  </button>

                  <button className="flex-1 border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white py-3 rounded-xl font-semibold transition">

                    Save Word

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Company Vocabulary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Company-Specific Vocabulary

          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "System Design",
              "Leadership Principles",
              "Distributed Systems",
              "Load Balancing",
              "Microservices",
              "Event Streaming",
              "Caching",
              "Observability",
              "Containerization",
              "Cloud Native",
            ].map((word, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-medium"
              >

                {word}

              </span>

            ))}

          </div>

        </div>
                {/* Vocabulary Quiz */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Daily Vocabulary Quiz

          </h2>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-xl font-bold">

              What does "Scalability" mean?

            </h3>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {[
                "Ability to handle increasing workload",
                "Database Backup",
                "Software Installation",
                "UI Animation",
              ].map((option, index) => (

                <button
                  key={index}
                  className="text-left px-5 py-4 rounded-xl border border-gray-300 dark:border-white/10 hover:bg-violet-600 hover:text-white transition"
                >

                  {option}

                </button>

              ))}

            </div>

          </div>

        </div>

        {/* Learning Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Vocabulary Progress

          </h2>

          <div className="space-y-6">

            {[
              {
                label: "Technical Vocabulary",
                progress: 82,
              },
              {
                label: "Behavioral Vocabulary",
                progress: 75,
              },
              {
                label: "System Design Terms",
                progress: 69,
              },
              {
                label: "Communication Skills",
                progress: 88,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.label}

                  </span>

                  <span className="font-bold">

                    {item.progress}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommended Words

          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "Horizontal Scaling",
              "Load Balancer",
              "Fault Tolerance",
              "Message Queue",
              "Thread Safety",
              "Authentication",
              "Authorization",
              "Consistency",
            ].map((word, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-medium"
              >

                {word}

              </span>

            ))}

          </div>

        </div>

        {/* Favorite Words */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Saved Vocabulary

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Scalability",
              "Latency",
              "Concurrency",
              "Microservices",
              "REST API",
              "Containerization",
            ].map((word, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {word}

                </span>

                <button className="text-violet-600 font-semibold">

                  Review

                </button>

              </div>

            ))}

          </div>

        </div>
                {/* AI Vocabulary Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Vocabulary Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your learning progress and target role,
            you have built a strong foundation in technical
            interview terminology.

            AI recommends focusing next on distributed systems,
            cloud computing, system design concepts, and
            behavioral communication vocabulary to improve
            confidence during technical interviews.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Master Words, Master Interviews 📖

              </h2>

              <p className="leading-8 text-white/90">

                Strong technical vocabulary helps you explain
                ideas with confidence. Learn a few new words
                every day, revise regularly, and apply them
                naturally during mock and real interviews.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📚

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Vocabulary Score

              </h3>

              <p className="text-5xl font-black">

                92%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VocabularyBuilder;