import React, { useState } from "react";
import {
  BookOpen,
  Bookmark,
  CheckCircle,
  Target,
  BarChart3,
} from "lucide-react";

const ReadingTracker = () => {

  const [stats] = useState({
    reading: 6,
    completed: 18,
    bookmarked: 27,
    readingGoal: 75,
  });

  const [goal] = useState("Read 5 resources this month");

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

                Interview Resource Reading Tracker

              </h1>

              <p className="text-gray-500 mt-2">

                Track your reading progress, manage bookmarks,
                resume where you left off, and achieve your
                learning goals.

              </p>

            </div>

          </div>

        </div>

        {/* Reading Goal */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-xl font-bold mb-4">

            Current Reading Goal

          </h2>

          <div className="flex justify-between items-center">

            <p className="text-lg">

              {goal}

            </p>

            <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

              Active

            </span>

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Reading

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.reading}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <CheckCircle
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Bookmark
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Bookmarks

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.bookmarked}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Goal Progress

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.readingGoal}%

            </p>

          </div>

        </div>
                {/* Currently Reading */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Currently Reading

          </h2>

          <div className="space-y-6">

            {[
              {
                title: "System Design Interview",
                progress: 72,
                section: "Chapter 8 • Load Balancing",
              },
              {
                title: "Operating Systems Notes",
                progress: 45,
                section: "Process Synchronization",
              },
              {
                title: "DBMS Handbook",
                progress: 91,
                section: "Transaction Management",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div className="flex-1">

                    <h3 className="text-xl font-bold">

                      {item.title}

                    </h3>

                    <p className="text-gray-500 mt-2">

                      Last Viewed: {item.section}

                    </p>

                    <div className="mt-5 h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                        style={{
                          width: `${item.progress}%`,
                        }}
                      />

                    </div>

                    <p className="mt-3 font-semibold text-violet-600">

                      {item.progress}% Completed

                    </p>

                  </div>

                  <div className="flex items-center">

                    <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

                      Resume Reading

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Completed Resources */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Completed Resources

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Computer Networks Notes",
              "DSA Cheat Sheet",
              "Behavioral Interview Guide",
              "SQL Interview Handbook",
            ].map((resource, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {resource}

                </span>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

                  Completed

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* To Read */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            To Read

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Low Level Design Guide",
              "AWS Fundamentals",
              "Java Interview Notes",
              "React Performance Guide",
            ].map((resource, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {resource}

                </span>

                <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">

                  Start Reading

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Resume Reading */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            Resume Where You Left Off

          </h2>

          <p className="leading-8 text-white/90">

            Continue reading <strong>System Design Interview</strong>
            from <strong>Chapter 8 – Load Balancing</strong>.
            Your last progress was <strong>72%</strong>.

          </p>

          <button className="mt-8 px-8 py-3 rounded-xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition">

            Continue Reading

          </button>

        </div>
                {/* Bookmarks */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Bookmarks

          </h2>

          <div className="space-y-5">

            {[
              {
                resource: "System Design Interview",
                chapter: "Chapter 5 • Caching",
              },
              {
                resource: "Operating Systems Notes",
                chapter: "Deadlock Prevention",
              },
              {
                resource: "DBMS Handbook",
                chapter: "Normalization",
              },
              {
                resource: "React Guide",
                chapter: "Hooks",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div>

                  <h3 className="font-bold">

                    {item.resource}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.chapter}

                  </p>

                </div>

                <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

                  Open

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Highlights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Highlights

          </h2>

          <div className="space-y-5">

            {[
              "Caching improves application performance by reducing repeated database queries.",
              "Deadlocks occur when multiple processes wait indefinitely for resources.",
              "Normalization minimizes redundancy in relational databases.",
              "React Hooks simplify state and lifecycle management.",
            ].map((text, index) => (

              <div
                key={index}
                className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-6"
              >

                <p className="leading-8 text-gray-700 dark:text-gray-200">

                  {text}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Reading Goal Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Reading Goal Progress

          </h2>

          <div className="space-y-6">

            {[
              {
                goal: "Monthly Reading Goal",
                progress: 75,
              },
              {
                goal: "Books Completed",
                progress: 90,
              },
              {
                goal: "Notes Reviewed",
                progress: 68,
              },
              {
                goal: "Interview Guides",
                progress: 81,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.goal}

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

        {/* Reading Statistics */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          {[
            {
              title: "Pages Read",
              value: "1,280",
            },
            {
              title: "Hours Studied",
              value: "154",
            },
            {
              title: "Resources Finished",
              value: "18",
            },
            {
              title: "Bookmarks",
              value: "27",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center"
            >

              <h3 className="text-gray-500">

                {item.title}

              </h3>

              <p className="text-5xl font-black text-violet-600 mt-4">

                {item.value}

              </p>

            </div>

          ))}

        </div>

        {/* AI Reading Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Reading Recommendations

          </h2>

          <p className="leading-8 text-white/90">

            Based on your reading history, AI recommends
            focusing next on System Design, Operating Systems,
            Distributed Systems, and Behavioral Interview
            preparation to strengthen your interview readiness.

          </p>

        </div>
                {/* AI Reading Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Reading Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your reading progress shows consistent improvement across
            interview preparation resources. You have completed several
            core topics while maintaining a healthy reading streak.

            AI recommends prioritizing System Design, Low-Level Design,
            Cloud Computing, and Behavioral Interview preparation next.
            Continue reviewing highlighted sections and revisiting your
            bookmarks to strengthen long-term retention.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Read. Learn. Grow. 📚

              </h2>

              <p className="leading-8 text-white/90">

                Every page you read adds to your interview confidence.
                Small daily reading sessions build strong technical
                knowledge over time. Stay consistent, revisit important
                highlights, and achieve your learning goals one chapter
                at a time.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📖

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Reading Score

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
export default ReadingTracker;