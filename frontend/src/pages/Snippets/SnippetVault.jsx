import React, { useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Code2,
  Copy,
  Check,
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  Languages,
  FolderOpen,
  StarOff,
  Sparkles,
} from "lucide-react";
import interviewSnippets from "../../data/interviewSnippets";

const CATEGORY_META = {
  javascript: { label: "JavaScript", classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  react: { label: "React", classes: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
  css: { label: "CSS", classes: "bg-sky-500/10 text-sky-400 border-sky-500/30" },
  node: { label: "Node / Express", classes: "bg-green-500/10 text-green-400 border-green-500/30" },
  sql: { label: "SQL", classes: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
  git: { label: "Git", classes: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
};

const LANGUAGE_LABELS = {
  javascript: "JavaScript",
  css: "CSS",
  sql: "SQL",
  bash: "Bash",
};

const FAVORITES_KEY = "snippetVault:favorites";

const loadFavorites = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

const SnippetVault = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState(loadFavorites);
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const categories = useMemo(() => {
    const seen = new Set();
    interviewSnippets.forEach((s) => seen.add(s.category));
    return ["all", ...Array.from(seen)];
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return interviewSnippets.filter((snippet) => {
      if (activeCategory !== "all" && snippet.category !== activeCategory) return false;
      if (onlyFavorites && !favorites.has(snippet.id)) return false;
      if (!query) return true;

      const haystack = [
        snippet.title,
        snippet.description,
        snippet.language,
        ...snippet.tags,
      ]
        .join(" ")
        .toLowerCase();

      return query
        .split(/\s+/)
        .every((token) => haystack.includes(token));
    });
  }, [search, activeCategory, onlyFavorites, favorites]);

  const favoriteCount = useMemo(
    () => favorites.size,
    [favorites]
  );

  const handleCopy = async (snippet) => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopiedId(snippet.id);
      setTimeout(() => setCopiedId((id) => (id === snippet.id ? null : id)), 1500);
    } catch {
      setCopiedId(null);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next)));
      } catch {
        /* storage unavailable - keep in-memory only */
      }
      return next;
    });
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setOnlyFavorites(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                <Code2 size={24} className="text-violet-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Snippet Vault
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Quick-reference code patterns for interview revision
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Languages size={14} className="text-violet-500" />
              {interviewSnippets.length} snippets
            </span>
            <button
              type="button"
              onClick={() => setOnlyFavorites((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                onlyFavorites
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                  : "bg-gray-100 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-300"
              }`}
            >
              <Star size={14} />
              {favoriteCount} favorites
            </button>
          </div>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, tag or language..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? "bg-violet-500 text-white border-violet-500"
                      : "bg-white dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400"
                  }`}
                >
                  {cat === "all" ? "All" : meta ? meta.label : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results counter */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {filtered.length === 0
            ? "No snippets match your filters"
            : `Showing ${filtered.length} of ${interviewSnippets.length} snippets`}
        </p>

        {/* Snippet grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <FolderOpen size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              No snippets found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-5">
              Try a different keyword, or reset the category and favorite filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
            {filtered.map((snippet) => {
              const meta = CATEGORY_META[snippet.category];
              const isFavorite = favorites.has(snippet.id);
              const isCopied = copiedId === snippet.id;
              const isExpanded = expandedId === snippet.id;
              const codeLines = snippet.code.split("\n").length;

              return (
                <article
                  key={snippet.id}
                  className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden hover:shadow-lg hover:shadow-violet-500/5 transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${meta.classes}`}
                        >
                          {meta.label}
                        </span>
                        <span className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                          {LANGUAGE_LABELS[snippet.language] || snippet.language}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(snippet.id)}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                          isFavorite
                            ? "text-amber-400 hover:text-amber-500"
                            : "text-gray-400 hover:text-amber-400"
                        }`}
                      >
                        {isFavorite ? <Star size={16} /> : <StarOff size={16} />}
                      </button>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                      {snippet.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                      {snippet.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {snippet.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-violet-500/5 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 text-[11px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleExpand(snippet.id)}
                        aria-label="Toggle code expansion"
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-gray-800/80 text-gray-200 hover:bg-gray-700 transition-colors"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(snippet)}
                        aria-label="Copy snippet to clipboard"
                        className="absolute top-2 right-10 z-10 p-1.5 rounded-lg bg-gray-800/80 text-gray-200 hover:bg-gray-700 transition-colors"
                      >
                        {isCopied ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>

                      <div className={isExpanded ? "" : "max-h-48 overflow-hidden"}>
                        <SyntaxHighlighter
                          language={snippet.language}
                          style={oneDark}
                          customStyle={{
                            margin: 0,
                            padding: "14px 14px 14px 14px",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            background: "#0b1120",
                          }}
                          codeTagProps={{
                            style: { fontFamily: "'JetBrains Mono', ui-monospace, monospace" },
                          }}
                        >
                          {snippet.code}
                        </SyntaxHighlighter>
                      </div>
                      {!isExpanded && codeLines > 14 && (
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0b1120] to-transparent pointer-events-none" />
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                    <span className="text-[11px] text-gray-400">
                      {codeLines} lines
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleExpand(snippet.id)}
                      className="text-[11px] font-medium text-violet-500 hover:text-violet-400 transition-colors"
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer hint */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 pb-10">
          <Sparkles size={13} className="text-violet-500" />
          Favorites persist locally on this device. Snippets are curated for quick revision.
        </div>
      </div>
    </div>
  );
};

export default SnippetVault;
