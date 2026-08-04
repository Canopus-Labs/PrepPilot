import React, { useState } from "react";
import {
  Bookmark,
  Search,
  Folder,
  StickyNote,
  Building2,
} from "lucide-react";

const BookmarkExperiences = () => {

  const [search, setSearch] = useState("");

  const [stats] = useState({
    bookmarks: 24,
    folders: 6,
    favorites: 8,
    notes: 15,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Bookmark
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Bookmark Interview Experiences

              </h1>

              <p className="text-gray-500 mt-2">

                Save useful interview experiences,
                organize them into folders,
                and add your own preparation notes.

              </p>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search bookmarked interview experiences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] outline-none"
            />

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Bookmark
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Bookmarks

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.bookmarks}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Folder
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              Folders

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.folders}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Building2
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Companies

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.favorites}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <StickyNote
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Notes

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.notes}

            </p>

          </div>

        </div>
                {/* Bookmarked Experiences */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Saved Interview Experiences

          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            {[
              {
                company: "Google",
                role: "Software Engineer Intern",
                folder: "FAANG",
                favorite: true,
                note: "Focus on Graphs, DP, and Behavioral questions.",
                date: "Saved 2 days ago",
              },
              {
                company: "Microsoft",
                role: "SDE Intern",
                folder: "Product Companies",
                favorite: false,
                note: "Strong emphasis on OOP and System Design basics.",
                date: "Saved 5 days ago",
              },
              {
                company: "Amazon",
                role: "SDE I",
                folder: "Dream Companies",
                favorite: true,
                note: "Prepare Leadership Principles thoroughly.",
                date: "Saved 1 week ago",
              },
              {
                company: "Adobe",
                role: "Frontend Developer",
                folder: "Frontend",
                favorite: false,
                note: "Revise React, JavaScript, CSS, and projects.",
                date: "Saved 2 weeks ago",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-2xl font-bold">

                      {item.company}

                    </h3>

                    <p className="text-violet-600 font-semibold mt-2">

                      {item.role}

                    </p>

                  </div>

                  {item.favorite && (

                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

                      ★ Favorite

                    </span>

                  )}

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <span className="px-3 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">

                    📂 {item.folder}

                  </span>

                  <span className="px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">

                    {item.date}

                  </span>

                </div>

                <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                  <h4 className="font-semibold mb-2">

                    Personal Note

                  </h4>

                  <p className="text-gray-600 dark:text-gray-300 leading-7">

                    {item.note}

                  </p>

                </div>

                <div className="flex gap-4 mt-8">

                  <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition">

                    View Experience

                  </button>

                  <button className="flex-1 border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white py-3 rounded-xl font-semibold transition">

                    Edit Note

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Bookmark Overview */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          {[
            {
              title: "FAANG",
              value: "9",
            },
            {
              title: "Startups",
              value: "5",
            },
            {
              title: "Product",
              value: "7",
            },
            {
              title: "Service",
              value: "3",
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
                {/* Folder Organization */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Bookmark Folders

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                name: "FAANG",
                count: 9,
              },
              {
                name: "Product Companies",
                count: 7,
              },
              {
                name: "Frontend",
                count: 4,
              },
              {
                name: "Dream Companies",
                count: 6,
              },
            ].map((folder, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center hover:bg-violet-50 dark:hover:bg-violet-900/10 transition"
              >

                <Folder
                  size={40}
                  className="mx-auto text-violet-600 mb-4"
                />

                <h3 className="text-xl font-bold">

                  {folder.name}

                </h3>

                <p className="text-gray-500 mt-2">

                  {folder.count} Experiences

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Recent Notes */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recent Personal Notes

          </h2>

          <div className="space-y-5">

            {[
              "Revise Dynamic Programming before Google interview.",
              "Practice LLD questions for Microsoft.",
              "Prepare STAR format answers for behavioral interviews.",
              "Review JavaScript closures before frontend interviews.",
            ].map((note, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <StickyNote
                  size={22}
                  className="text-blue-600 mt-1"
                />

                <p className="leading-7">

                  {note}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommended Experiences */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommended Experiences

          </h2>

          <p className="leading-8 text-white/90">

            Based on your bookmarked companies and
            preparation history, AI recommends reading
            interview experiences from Amazon, Atlassian,
            Uber, and Flipkart.

            These experiences closely match your
            preparation goals and highlight frequently
            asked DSA, System Design, and Behavioral
            Interview questions.

          </p>

        </div>

        {/* Bookmark Insights */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Saved Today

            </h3>

            <p className="text-5xl font-black text-violet-600 mt-4">

              5

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Favorite Companies

            </h3>

            <p className="text-5xl font-black text-yellow-500 mt-4">

              8

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              AI Match

            </h3>

            <p className="text-5xl font-black text-green-600 mt-4">

              95%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Weekly Reads

            </h3>

            <p className="text-5xl font-black text-blue-600 mt-4">

              14

            </p>

          </div>

        </div>
                {/* AI Bookmark Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Bookmark Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your bookmarked interview experiences indicate a
            strong focus on product-based companies and
            frontend development roles. AI recommends
            revisiting your saved notes weekly and exploring
            additional interview experiences from companies
            with similar hiring patterns.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Learn From Every Interview 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every interview experience contains valuable
                lessons. Organize your bookmarks, review your
                notes regularly, and build a personalized
                interview knowledge base to boost your
                preparation.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🔖

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Knowledge Score

              </h3>

              <p className="text-5xl font-black">

                94%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookmarkExperiences;