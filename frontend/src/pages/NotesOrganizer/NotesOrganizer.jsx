import React, { useState } from "react";
import {
  NotebookPen,
  Search,
  Plus,
  Pin,
  Folder,
  Save,
} from "lucide-react";

const NotesOrganizer = () => {
  const [search, setSearch] = useState("");

  const [selectedNote, setSelectedNote] = useState(0);

  const [notes] = useState([
    {
      id: 1,
      title: "Binary Tree Notes",
      folder: "DSA",
      pinned: true,
      updated: "Today",
    },
    {
      id: 2,
      title: "HR Interview Questions",
      folder: "Interview",
      pinned: false,
      updated: "Yesterday",
    },
    {
      id: 3,
      title: "Operating System Revision",
      folder: "CS Fundamentals",
      pinned: false,
      updated: "2 Days Ago",
    },
    {
      id: 4,
      title: "React Interview Notes",
      folder: "Frontend",
      pinned: true,
      updated: "Last Week",
    },
  ]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <NotebookPen
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Interview Notes Organizer
              </h1>

              <p className="text-gray-500 mt-2">

                Create, organize, search, and manage your
                interview preparation notes in one place.

              </p>

            </div>

          </div>

          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold">

            <Plus size={18} />

            New Note

          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Sidebar */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6">

            <div className="relative mb-6">

              <Search
                size={18}
                className="absolute left-4 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] outline-none"
              />

            </div>

            <div className="space-y-4">

              {filteredNotes.map((note, index) => (

                <div
                  key={note.id}
                  onClick={() => setSelectedNote(index)}
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    selectedNote === index
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >

                  <div className="flex justify-between items-center">

                    <h3 className="font-semibold">
                      {note.title}
                    </h3>

                    {note.pinned && (
                      <Pin
                        size={16}
                        className="text-violet-600"
                      />
                    )}

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {note.folder}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Updated {note.updated}
                  </p>

                </div>

              ))}

            </div>

          </div>
                    {/* Editor */}

          <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            {/* Toolbar */}

            <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 dark:border-white/10 pb-5">

              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold">
                Bold
              </button>

              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold">
                Italic
              </button>

              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold">
                Heading
              </button>

              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold">
                List
              </button>

              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold">
                Code
              </button>

              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold">
                Markdown
              </button>

            </div>

            {/* Note Title */}

            <input
              type="text"
              defaultValue="Binary Tree Notes"
              className="w-full text-3xl font-bold bg-transparent outline-none mb-6"
            />

            {/* Rich Text Area */}

            <textarea
              rows={18}
              defaultValue={`# Binary Trees

Definition:
A Binary Tree is a hierarchical data structure in which each node has at most two children.

Types:
- Full Binary Tree
- Complete Binary Tree
- Perfect Binary Tree
- Balanced Binary Tree

Traversal:
- Inorder
- Preorder
- Postorder
- Level Order

Interview Tips:
• Practice recursive traversal
• Learn iterative traversal using stacks
• Solve BST problems
`}
              className="w-full rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1f2937] p-6 outline-none leading-8 resize-none"
            />

            {/* Footer */}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">

              <div className="flex items-center gap-2 text-green-600 font-medium">

                <Save size={18} />

                Auto Saved 2 minutes ago

              </div>

              <button className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

                Save Changes

              </button>

            </div>

          </div>

        </div>
                {/* Folders */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Folder
              size={24}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Topic Folders
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              "DSA",
              "Frontend",
              "Backend",
              "Interview",
              "System Design",
              "CS Fundamentals",
              "Aptitude",
              "HR Questions",
            ].map((folder, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:shadow-lg transition cursor-pointer"
              >

                <Folder
                  size={28}
                  className="text-violet-600 mb-4"
                />

                <h3 className="font-semibold">
                  {folder}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {Math.floor(Math.random() * 15) + 2} Notes
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Pinned Notes */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Pin
              size={24}
              className="text-yellow-500"
            />

            <h2 className="text-2xl font-bold">
              Pinned Notes
            </h2>

          </div>

          <div className="space-y-5">

            {notes
              .filter((note) => note.pinned)
              .map((note) => (

                <div
                  key={note.id}
                  className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <div>

                    <h3 className="font-semibold">
                      {note.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {note.folder}
                    </p>

                  </div>

                  <Pin
                    size={20}
                    className="text-yellow-500"
                  />

                </div>

              ))}

          </div>

        </div>

        {/* Export */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-5">
            Export Notes
          </h2>

          <p className="leading-8 text-white/90 mb-8">

            Export your interview notes as a PDF or Markdown
            document and keep your preparation material
            available offline.

          </p>

          <div className="flex flex-wrap gap-4">

            <button className="px-6 py-3 rounded-xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition">

              Export PDF

            </button>

            <button className="px-6 py-3 rounded-xl border border-white font-bold hover:bg-white hover:text-violet-700 transition">

              Export Markdown

            </button>

          </div>

        </div>

        {/* Notes Statistics */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Total Notes
            </h3>

            <p className="text-4xl font-black mt-3">
              42
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Pinned
            </h3>

            <p className="text-4xl font-black mt-3 text-yellow-500">
              8
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Folders
            </h3>

            <p className="text-4xl font-black mt-3 text-violet-600">
              8
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">
              Auto Saves
            </h3>

            <p className="text-4xl font-black mt-3 text-green-600">
              156
            </p>

          </div>

        </div>
                {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Notes Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your interview notes are well organized across
            multiple folders including DSA, Frontend,
            Backend, HR Questions, and Computer Science
            Fundamentals.

            Continue revising your pinned notes regularly
            and maintain concise summaries for faster
            interview preparation.

          </p>

        </div>

        {/* Auto Save */}

        <div className="mt-10 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/20 rounded-3xl p-8">

          <div className="flex items-center gap-3">

            <Save
              size={26}
              className="text-green-600"
            />

            <div>

              <h2 className="text-2xl font-bold">
                Auto Save Enabled
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2">

                Your notes are automatically saved while you
                type, ensuring that your work is never lost.

              </p>

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Keep Learning Every Day 📚

              </h2>

              <p className="leading-8 text-white/90">

                Organized notes are one of the best ways
                to retain interview concepts.
                Continue documenting important ideas,
                algorithms, HR answers, and revision tips
                to build your personal interview handbook.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                📝
              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Notes Score

              </h3>

              <p className="text-4xl font-black">

                98%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default NotesOrganizer;