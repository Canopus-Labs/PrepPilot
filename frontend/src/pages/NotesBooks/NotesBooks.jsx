import React, { useEffect, useMemo, useState } from "react";
import {
  BookMarked,
  BookOpen,
  Download,
  FolderOpen,
  RefreshCw,
  Search,
  FileText,
  XCircle,
} from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths";

const NotesBooks = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [query, setQuery] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      setWarnings([]);
      const res = await fetch(`${BASE_URL}/api/books`);
      if (!res.ok) {
        throw new Error("Unable to load books right now.");
      }
      const data = await res.json();
      setCategories(data.categories || []);
      setWarnings(data.warnings || []);
    } catch (err) {
      setError(err.message || "Unexpected error while loading books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredCategories = useMemo(() => {
    const normalize = (value) =>
      (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const term = normalize(query.trim());
    if (!term) return categories;

    return categories.filter((cat) => normalize(cat.title).includes(term));
  }, [categories, query]);

  return (
    <div className="min-h-full bg-[var(--color-background)] text-[var(--color-text-dark)]">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        <div className="flex flex-col gap-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
                <BookMarked size={22} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Notes & Books</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Browse shared PDFs and notes straight from the project books
                  collection.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-72">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search categories"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-violet-400/70"
                />
              </div>
              <button
                onClick={fetchBooks}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-violet-300 dark:hover:border-violet-400/50 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FolderOpen size={16} />
              <span>{categories.length} categories</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <BookOpen size={16} />
              <span>
                {(categories || []).reduce(
                  (acc, cat) => acc + (cat.count || 0),
                  0,
                )}{" "}
                files
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FileText size={16} />
              <span>Direct download links</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Search size={16} />
              <span>Search by category title</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-red-200 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-200">
            <XCircle size={18} />
            <div>
              <p className="font-semibold">Could not load books</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {!error && warnings.length > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-100">
            <div className="mt-1 w-2 h-2 rounded-full bg-amber-400" />
            <div>
              <p className="font-semibold">Loaded with some skips</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {warnings.map((w) => (
                  <li
                    key={w}
                    className="text-amber-700 dark:text-amber-100 truncate"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5 h-36"
              />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
            <p className="text-lg font-semibold">No books found</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Try clearing your search or refresh the library.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-300 flex items-center justify-center">
                      <FolderOpen size={18} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {category.title}
                      </h2>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {(category.items || []).length} file
                        {(category.items || []).length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {(category.items || []).map((item) => (
                    <a
                      key={item.name}
                      href={
                        item.url?.startsWith("http")
                          ? item.url
                          : `${BASE_URL}${item.url}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-400/50 hover:bg-violet-50/40 dark:hover:bg-violet-500/5 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300">
                        <FileText size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          Direct link • opens in new tab
                        </p>
                      </div>
                      <Download size={16} className="text-gray-500" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesBooks;
