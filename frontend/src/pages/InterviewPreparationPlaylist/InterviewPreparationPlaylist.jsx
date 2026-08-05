import React, { useState } from "react";
import {
  ListMusic,
  BookOpen,
  FileText,
  Code2,
  Brain,
  PlayCircle,
  Layers,
} from "lucide-react";

const InterviewPreparationPlaylist = () => {

  const [playlist, setPlaylist] = useState({
    name: "Google Interview Preparation",
    dsa: true,
    notes: true,
    questions: true,
    books: false,
    mocks: true,
    flashcards: true,
  });

  const [stats] = useState({
    playlists: 8,
    completed: 5,
    resources: 127,
    progress: 74,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <ListMusic
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Interview Preparation Playlist

            </h1>

            <p className="text-gray-500 mt-2">

              Create personalized interview preparation
              playlists by combining your favorite resources.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ListMusic
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Playlists

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.playlists}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <PlayCircle
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Resources

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.resources}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Progress

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.progress}%

            </p>

          </div>

        </div>

        {/* Playlist Builder */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Create Playlist

          </h2>

          <label className="block font-semibold mb-3">

            Playlist Name

          </label>

          <input
            value={playlist.name}
            onChange={(e) =>
              setPlaylist({
                ...playlist,
                name: e.target.value,
              })
            }
            className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] mb-8"
          />

          <div className="grid md:grid-cols-2 gap-6">

            {[
              ["DSA Sheets", "dsa", Code2],
              ["Notes", "notes", FileText],
              ["Interview Questions", "questions", Brain],
              ["Books", "books", BookOpen],
              ["Mock Interviews", "mocks", PlayCircle],
              ["Flashcards", "flashcards", Layers],
            ].map(([title, key, Icon]) => (

              <label
                key={key}
                className="flex items-center justify-between rounded-2xl border border-gray-200 dark:border-white/10 p-5 cursor-pointer"
              >

                <div className="flex items-center gap-4">

                  <Icon
                    className="text-violet-600"
                    size={24}
                  />

                  <span className="font-semibold">

                    {title}

                  </span>

                </div>

                <input
                  type="checkbox"
                  checked={playlist[key]}
                  onChange={(e) =>
                    setPlaylist({
                      ...playlist,
                      [key]: e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />

              </label>

            ))}

          </div>

        </div>

        {/* Playlist Preview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

          <h2 className="text-2xl font-bold mb-6">

            Playlist Preview

          </h2>

          <div className="space-y-4">

            {playlist.dsa && <p>✅ DSA Sheets</p>}
            {playlist.notes && <p>✅ Notes</p>}
            {playlist.questions && <p>✅ Interview Questions</p>}
            {playlist.books && <p>✅ Books</p>}
            {playlist.mocks && <p>✅ Mock Interviews</p>}
            {playlist.flashcards && <p>✅ Flashcards</p>}

          </div>

          <button className="mt-8 px-8 py-3 bg-white text-violet-700 rounded-xl font-bold hover:bg-gray-100">

            Save Playlist

          </button>

        </div>
                {/* Playlist Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Playlist Progress

          </h2>

          {[
            ["DSA Sheets", 85],
            ["Notes", 70],
            ["Interview Questions", 62],
            ["Mock Interviews", 45],
            ["Flashcards", 91],
          ].map(([title, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{title}</span>

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

        {/* Favorite Playlists */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Favorite Playlists

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                name: "Google SDE Prep",
                resources: 42,
              },
              {
                name: "Amazon OA",
                resources: 35,
              },
              {
                name: "System Design Mastery",
                resources: 28,
              },
              {
                name: "Core CS Revision",
                resources: 22,
              },
            ].map((playlist, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">

                    {playlist.name}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {playlist.resources} Resources

                  </p>

                </div>

                <span className="text-yellow-500 text-2xl">

                  ⭐

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Playlist Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Begin each playlist with DSA practice.</li>

            <li>• Add one mock interview after every 20 coding questions.</li>

            <li>• Include flashcards before ending your session.</li>

            <li>• Reserve notes for quick revision after mock interviews.</li>

            <li>• Schedule book reading on weekends for deeper understanding.</li>

          </ul>

        </div>

        {/* Playlist Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Playlist Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your personalized playlist combines coding practice,
            interview preparation, revision materials, and mock
            interviews into one structured learning sequence.
            Following this playlist consistently can improve
            organization, reduce context switching, and help
            maintain a balanced interview preparation routine.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Learn in the Right Order 🎯

              </h2>

              <p className="leading-8 text-white/90">

                Organizing your preparation into a structured
                playlist helps you stay focused, revise
                effectively, and make steady progress toward
                interview success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎵

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Playlist Score

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

export default InterviewPreparationPlaylist;