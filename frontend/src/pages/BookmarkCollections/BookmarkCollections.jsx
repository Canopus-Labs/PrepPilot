import React, { useMemo, useState } from "react";
import {
  Bookmark,
  Folder,
  Search,
  Plus,
  Filter,
  Download,
  Share2,
  StickyNote,
} from "lucide-react";

const BookmarkCollections = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [company, setCompany] = useState("All");

  const collections = [
    {
      id: 1,
      name: "Google DSA",
      questions: 18,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      name: "HR Interview",
      questions: 12,
      color: "bg-violet-100 text-violet-700",
    },
    {
      id: 3,
      name: "React",
      questions: 15,
      color: "bg-green-100 text-green-700",
    },
  ];

  const bookmarkedQuestions = [
    {
      id: 1,
      question: "Explain React Virtual DOM.",
      company: "Google",
      difficulty: "Medium",
      tags: ["React", "Frontend"],
      notes: "Focus on reconciliation.",
    },
    {
      id: 2,
      question: "What is Dynamic Programming?",
      company: "Amazon",
      difficulty: "Hard",
      tags: ["DSA"],
      notes: "Practice memoization.",
    },
    {
      id: 3,
      question: "Tell me about yourself.",
      company: "Microsoft",
      difficulty: "Easy",
      tags: ["HR"],
      notes: "Use STAR format.",
    },
    {
      id: 4,
      question: "Difference between process and thread?",
      company: "Adobe",
      difficulty: "Medium",
      tags: ["OS"],
      notes: "Mention scheduling.",
    },
  ];

  const filteredQuestions = useMemo(() => {
    return bookmarkedQuestions.filter((item) => {
      const searchMatch =
        item.question.toLowerCase().includes(search.toLowerCase());

      const companyMatch =
        company === "All" || item.company === company;

      const difficultyMatch =
        difficulty === "All" ||
        item.difficulty === difficulty;

      return (
        searchMatch &&
        companyMatch &&
        difficultyMatch
      );
    });
  }, [search, company, difficulty, bookmarkedQuestions]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
              <Bookmark
                size={32}
                className="text-violet-600"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Interview Question Bookmark Collections
              </h1>

              <p className="text-gray-500 mt-1">
                Organize important interview questions into
                custom collections.
              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-semibold transition">

            <Plus size={18} />

            New Collection

          </button>

        </div>
                {/* Search & Filters */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 mb-10">

          <div className="grid md:grid-cols-3 gap-5">

            {/* Search */}

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search bookmarked questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            {/* Company Filter */}

            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] px-4 py-3"
            >
              <option>All</option>
              <option>Google</option>
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>Adobe</option>
            </select>

            {/* Difficulty Filter */}

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] px-4 py-3"
            >
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

        </div>

        {/* Collections */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {collections.map((collection) => (

            <div
              key={collection.id}
              className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-center mb-5">

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${collection.color}`}
                >
                  <Folder size={28} />
                </div>

                <button className="text-violet-600 hover:text-violet-700">
                  <Plus size={20} />
                </button>

              </div>

              <h2 className="text-xl font-bold">
                {collection.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {collection.questions} Questions
              </p>

            </div>

          ))}

        </div>
                {/* Bookmarked Questions */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bookmark
              size={24}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Bookmarked Questions
            </h2>

          </div>

          <div className="space-y-6">

            {filteredQuestions.map((item) => (

              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition"
              >

                {/* Top */}

                <div className="flex flex-wrap justify-between gap-4">

                  <h3 className="text-lg font-semibold max-w-2xl">
                    {item.question}
                  </h3>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${
                      item.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : item.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.difficulty}
                  </span>

                </div>

                {/* Company */}

                <p className="text-gray-500 mt-3">
                  Company:
                  <span className="font-semibold ml-2">
                    {item.company}
                  </span>
                </p>

                {/* Tags */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {item.tags.map((tag, index) => (

                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-medium"
                    >
                      #{tag}
                    </span>

                  ))}

                </div>

                {/* Notes */}

                <div className="mt-6 rounded-xl bg-gray-50 dark:bg-[#1f2937] p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <StickyNote
                      size={18}
                      className="text-violet-500"
                    />

                    <h4 className="font-semibold">
                      Personal Notes
                    </h4>

                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    {item.notes}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Total Bookmarks
            </h3>

            <p className="text-3xl font-bold mt-2">
              {bookmarkedQuestions.length}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Collections
            </h3>

            <p className="text-3xl font-bold mt-2">
              {collections.length}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Companies
            </h3>

            <p className="text-3xl font-bold mt-2">
              4
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow border border-gray-200 dark:border-white/10">
            <h3 className="text-gray-500 text-sm">
              Tags
            </h3>

            <p className="text-3xl font-bold mt-2">
              5
            </p>
          </div>

        </div>

        {/* Export & Share */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Export & Share
          </h2>

          <div className="flex flex-wrap gap-4">

            <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              <Download size={18} />
              Export Collection
            </button>

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              <Share2 size={18} />
              Share Collection
            </button>

            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Filter size={18} />
              Filter by Tags
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookmarkCollections;