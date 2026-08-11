import React, { useState } from "react";
import {
  FolderKanban,
  Building2,
  BookOpen,
  Code2,
  Layers,
  Search,
  Brain,
} from "lucide-react";

const InterviewQuestionCollections = () => {

  const [collection, setCollection] = useState({
    name: "Google SDE Collection",
    company: "Google",
    topic: "Data Structures",
    difficulty: "Medium",
    technology: "React",
    round: "Technical",
  });

  const [stats] = useState({
    collections: 14,
    questions: 486,
    favorites: 6,
    shared: 9,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <FolderKanban
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Question Collections

            </h1>

            <p className="text-gray-500 mt-2">

              Organize interview questions into smart,
              personalized collections for faster revision.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <FolderKanban
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Collections

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.collections}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Questions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.questions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Favorites

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.favorites}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Layers
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Shared

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.shared}

            </p>

          </div>

        </div>

        {/* Create Collection */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Create Question Collection

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <label className="block font-semibold mb-2">

                Collection Name

              </label>

              <input
                value={collection.name}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">

                Company

              </label>

              <select
                value={collection.company}
                onChange={(e) =>
                  setCollection({
                    ...collection,
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

              </select>

            </div>

            <div>

              <label className="block font-semibold mb-2">

                Topic

              </label>

              <select
                value={collection.topic}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    topic: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>Data Structures</option>
                <option>Algorithms</option>
                <option>Operating Systems</option>
                <option>DBMS</option>
                <option>System Design</option>

              </select>

            </div>

            <div>

              <label className="block font-semibold mb-2">

                Difficulty

              </label>

              <select
                value={collection.difficulty}
                onChange={(e) =>
                  setCollection({
                    ...collection,
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

            <div>

              <label className="block font-semibold mb-2">

                Technology

              </label>

              <select
                value={collection.technology}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    technology: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>React</option>
                <option>Node.js</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>

              </select>

            </div>

            <div>

              <label className="block font-semibold mb-2">

                Interview Round

              </label>

              <select
                value={collection.round}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    round: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
              >

                <option>Technical</option>
                <option>HR</option>
                <option>Managerial</option>
                <option>Online Assessment</option>

              </select>

            </div>

          </div>

        </div>

        {/* Preview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-2xl font-bold mb-6">

            Collection Preview

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <p><strong>Name:</strong> {collection.name}</p>

            <p><strong>Company:</strong> {collection.company}</p>

            <p><strong>Topic:</strong> {collection.topic}</p>

            <p><strong>Difficulty:</strong> {collection.difficulty}</p>

            <p><strong>Technology:</strong> {collection.technology}</p>

            <p><strong>Round:</strong> {collection.round}</p>

          </div>

          <button className="mt-8 px-8 py-3 bg-white text-violet-700 rounded-xl font-bold hover:bg-gray-100">

            Generate Collection

          </button>

        </div>
                {/* Search Collections */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Search className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Search Collections

            </h2>

          </div>

          <input
            type="text"
            placeholder="Search collections by company, topic or technology..."
            className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
          />

        </div>

        {/* Favorite Collections */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Favorite Collections

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                name: "Google DSA",
                company: "Google",
                questions: 120,
              },
              {
                name: "Amazon OA",
                company: "Amazon",
                questions: 95,
              },
              {
                name: "React Interview",
                company: "Frontend",
                questions: 80,
              },
              {
                name: "System Design",
                company: "Architecture",
                questions: 65,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">

                    {item.name}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.company} • {item.questions} Questions

                  </p>

                </div>

                <span className="text-yellow-500 text-2xl">

                  ⭐

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Share & Export */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Share & Export

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <button className="rounded-2xl bg-violet-600 hover:bg-violet-700 text-white p-5 font-semibold">

              Share Collection

            </button>

            <button className="rounded-2xl bg-green-600 hover:bg-green-700 text-white p-5 font-semibold">

              Export PDF

            </button>

            <button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white p-5 font-semibold">

              Export CSV

            </button>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Collection Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Create separate collections for each target company.</li>

            <li>• Group questions by interview rounds for focused practice.</li>

            <li>• Keep Easy, Medium, and Hard questions in different collections.</li>

            <li>• Add recently asked interview questions every week.</li>

            <li>• Share collections with teammates for collaborative preparation.</li>

          </ul>

        </div>

        {/* Collection Statistics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Collection Statistics

          </h2>

          {[
            ["Google Questions", 92],
            ["Amazon Questions", 84],
            ["Frontend Topics", 78],
            ["System Design", 66],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Collection Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Organizing interview questions into themed collections
            makes revision faster and more focused. AI recommends
            maintaining separate collections based on company,
            technology, difficulty, and interview round to maximize
            preparation efficiency.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Organize. Practice. Succeed. 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Well-organized interview questions make revision
                easier and improve long-term retention. Build smart
                collections and stay prepared for every interview.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📚

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Collection Score

              </h3>

              <p className="text-5xl font-black">

                95%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default InterviewQuestionCollections;