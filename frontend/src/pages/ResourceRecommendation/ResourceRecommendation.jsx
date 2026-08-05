import { useState } from "react";



const ResourceRecommendation = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Brain
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Interview Resource Recommendation Engine
              </h1>

              <p className="text-gray-500 mt-2">

                Discover personalized learning resources
                recommended by AI based on your preparation
                progress and interview goals.

              </p>

            </div>

          </div>

        </div>

        {/* Search & Filter */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 mb-10">

          <div className="grid md:grid-cols-2 gap-6">

            {/* Search */}

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            {/* Category */}

            <div className="relative">

              <Filter
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] outline-none"
              >

                <option>All</option>
                <option>Books</option>
                <option>DSA Sheets</option>
                <option>Projects</option>
                <option>Interview Experiences</option>
                <option>Open Source</option>
                <option>Aptitude</option>
                <option>Practice Questions</option>

              </select>

            </div>

          </div>

        </div>

        {/* AI Recommendation Banner */}

        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-10">

          <div className="flex items-center gap-4">

            <Brain size={40} />

            <div>

              <h2 className="text-2xl font-bold">

                AI Personalized Recommendations

              </h2>

              <p className="mt-2 text-white/90">

                Based on your recent preparation,
                AI recommends resources that can
                improve your interview readiness.

              </p>

            </div>

          </div>

        </div>
                {/* Recommended Resources */}

        <div className="grid lg:grid-cols-2 gap-8">

          {[
            {
              category: "Books",
              title: "Cracking the Coding Interview",
              description:
                "One of the most recommended books for coding interviews.",
              difficulty: "Intermediate",
            },
            {
              category: "DSA Sheets",
              title: "Striver A2Z DSA Sheet",
              description:
                "Complete roadmap covering all important interview topics.",
              difficulty: "Intermediate",
            },
            {
              category: "Projects",
              title: "AI Resume Analyzer",
              description:
                "Build an AI-powered ATS Resume Analyzer using React & Node.js.",
              difficulty: "Advanced",
            },
            {
              category: "Interview Experiences",
              title: "Google SDE Interview Experience",
              description:
                "Real interview experience with coding rounds and HR discussion.",
              difficulty: "Advanced",
            },
            {
              category: "Open Source",
              title: "Contribute to PrepPilot",
              description:
                "Gain practical experience through real-world open source contributions.",
              difficulty: "Beginner",
            },
            {
              category: "Aptitude",
              title: "Quantitative Aptitude Revision",
              description:
                "Practice probability, percentage, profit & loss, and time-speed-distance.",
              difficulty: "Easy",
            },
          ]
            .filter(
              (item) =>
                category === "All" || item.category === category
            )
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-start mb-5">

                  <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                    {item.category}

                  </span>

                  <button className="text-yellow-500 hover:scale-110 transition">

                    <Bookmark size={22} />

                  </button>

                </div>

                <h2 className="text-2xl font-bold mb-4">

                  {item.title}

                </h2>

                <p className="text-gray-500 leading-7 mb-6">

                  {item.description}

                </p>

                <div className="flex justify-between items-center">

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      item.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : item.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {item.difficulty}

                  </span>

                  <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-semibold transition">

                    <BookOpen size={18} />

                    View Resource

                  </button>

                </div>

              </div>

            ))}

        </div>

        {/* AI Practice Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Star
              size={26}
              className="text-yellow-500"
            />

            <h2 className="text-2xl font-bold">

              AI Generated Practice Questions

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Explain the difference between process and thread.",
              "Design an LRU Cache with O(1) operations.",
              "What happens during the Virtual DOM reconciliation process?",
              "How would you optimize SQL queries for large datasets?",
            ].map((question, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition"
              >

                <p className="font-medium">

                  {index + 1}. {question}

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Recommendation Statistics */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              AI Recommendations
            </h3>

            <p className="text-5xl font-black text-violet-600 mt-4">
              28
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Saved Resources
            </h3>

            <p className="text-5xl font-black text-green-600 mt-4">
              14
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Completed
            </h3>

            <p className="text-5xl font-black text-blue-600 mt-4">
              9
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              AI Match Score
            </h3>

            <p className="text-5xl font-black text-orange-600 mt-4">
              94%
            </p>

          </div>

        </div>

        {/* Personalized Learning Path */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Personalized Learning Path
          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Complete Striver DSA Sheet",
                progress: 82,
              },
              {
                title: "Practice Mock Interviews",
                progress: 68,
              },
              {
                title: "System Design Basics",
                progress: 42,
              },
              {
                title: "Behavioral Interview Questions",
                progress: 74,
              },
              {
                title: "Resume Improvements",
                progress: 95,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">
                    {item.title}
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

        {/* Bookmarked Resources */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bookmark
              size={24}
              className="text-yellow-500"
            />

            <h2 className="text-2xl font-bold">
              Saved Resources
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Cracking the Coding Interview",
              "Striver A2Z Sheet",
              "PrepPilot Open Source",
              "Google Interview Experience",
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <span className="font-semibold">
                  {item}
                </span>

                <Bookmark
                  size={20}
                  className="text-yellow-500 fill-yellow-500"
                />

              </div>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            AI Learning Insights
          </h2>

          <p className="leading-8 text-white/90">

            Based on your preparation history, you learn
            most effectively through structured DSA sheets,
            practical projects, and mock interview practice.

            AI recommends focusing on advanced DSA,
            System Design, and Behavioral Interviews
            before your upcoming interview schedule.

          </p>

        </div>
                {/* AI Recommendation Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Recommendation Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your interview preparation progress,
            AI recommends prioritizing structured DSA practice,
            real interview experiences, resume refinement,
            and open-source contributions.

            Your current learning path is balanced, but
            additional focus on System Design and Behavioral
            Interview preparation will significantly improve
            your interview readiness.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Learn Smarter, Not Harder 🚀

              </h2>

              <p className="leading-8 text-white/90">

                The right resources at the right time
                accelerate your interview preparation.

                Continue exploring AI recommendations,
                complete suggested learning paths,
                and build practical projects to
                maximize your success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📚

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Resource Match

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

export default ResourceRecommendation;