import React, { useState } from "react";
import {
  Brain,
  Search,
  Filter,
  BookOpen,
  Bookmark,
  Clock3,
  FolderOpen,
} from "lucide-react";

const AIInterviewPreparationResourceHub = () => {

  const [stats] = useState({
    resources: 128,
    savedBooks: 18,
    bookmarkedQuestions: 246,
    flashcards: 540,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState("All");

  const recentResources = [
    {
      title: "Dynamic Programming Handbook",
      type: "Book",
      time: "10 mins ago",
    },
    {
      title: "Amazon SDE Interview Questions",
      type: "Interview Questions",
      time: "45 mins ago",
    },
    {
      title: "Operating Systems Notes",
      type: "Notes",
      time: "Today",
    },
    {
      title: "System Design Flashcards",
      type: "Flashcards",
      time: "Yesterday",
    },
  ];

  const savedBooks = [
    "Cracking the Coding Interview",
    "System Design Interview",
    "Grokking Algorithms",
    "Clean Code",
  ];

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <FolderOpen
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Preparation Resource Hub

            </h1>

            <p className="text-gray-500 mt-2">

              Access all your interview preparation resources from one
              centralized dashboard with AI-powered recommendations.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <FolderOpen
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Resources

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.resources}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Saved Books

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.savedBooks}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Bookmark
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Bookmarks

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.bookmarkedQuestions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Flashcards

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.flashcards}

            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Resource Hub Overview

          </h2>

          <p className="leading-8 text-white/90">

            Keep all interview preparation materials in one place.
            Access books, notes, flashcards, resume drafts,
            bookmarked questions, and AI recommendations without
            switching between multiple modules.

          </p>

        </div>

        {/* Search & Filters */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="relative">

              <Search className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] pl-12 pr-4 py-4"
              />

            </div>

            <div className="relative">

              <Filter className="absolute left-4 top-4 text-gray-400" />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] pl-12 pr-4 py-4"
              >

                <option>All</option>
                <option>Books</option>
                <option>Notes</option>
                <option>Flashcards</option>
                <option>Interview Questions</option>
                <option>Resume</option>

              </select>

            </div>

          </div>

        </div>

        {/* Recently Viewed */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Recently Viewed Resources

            </h2>

          </div>

          <div className="space-y-5">

            {recentResources.map((resource, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">

                    {resource.title}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    {resource.type}

                  </p>

                </div>

                <span className="text-sm text-gray-500">

                  {resource.time}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Saved Books */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Saved Books

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {savedBooks.map((book, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                📘 {book}

              </div>

            ))}

          </div>

        </div>
                {/* Bookmarked Interview Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bookmark className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Bookmarked Interview Questions

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Two Sum - Amazon",
              "LRU Cache - Google",
              "Design Twitter - Meta",
              "Merge Intervals - Microsoft",
            ].map((question, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🔖 {question}

              </div>

            ))}

          </div>

        </div>

        {/* Flashcards & Notes */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Flashcards

            </h2>

            <div className="space-y-5">

              {[
                "Arrays",
                "Dynamic Programming",
                "Operating Systems",
                "Behavioral Questions",
              ].map((card, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  🃏 {card}

                </div>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Notes & Resume Drafts

            </h2>

            <div className="space-y-5">

              {[
                "Operating Systems Notes",
                "DBMS Revision Notes",
                "Resume Draft v4",
                "System Design Notes",
              ].map((note, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  📝 {note}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* AI Recommended Resources */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommended Resources

          </h2>

          <ul className="space-y-4">

            <li>• Continue reading System Design Interview.</li>

            <li>• Review Dynamic Programming flashcards daily.</li>

            <li>• Practice Amazon interview question set.</li>

            <li>• Complete the latest mock interview series.</li>

            <li>• Update your resume with recent projects.</li>

          </ul>

        </div>

        {/* Resource Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resource Usage Summary

          </h2>

          {[
            ["Books Completed", 82],
            ["Flashcard Progress", 91],
            ["Question Practice", 86],
            ["Overall Resource Usage", 89],
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

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Everything You Need, One Place 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Organize all your interview preparation materials in a
                single dashboard. Spend less time searching and more
                time learning with AI-powered recommendations and a
                personalized resource hub.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📚

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Resources

              </h3>

              <p className="text-5xl font-black">

                {stats.resources}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewPreparationResourceHub;