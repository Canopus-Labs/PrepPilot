import React, { useState, useMemo } from "react";
import {
  Bookmark,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  Code2,
  Brain,
  Lightbulb,
  MessageSquare,
  Bot,
  Filter,
  BookmarkX,
  Sparkles,
} from "lucide-react";
import { useBookmarks } from "../../hooks/useBookmarks";
import {
  RESOURCE_TYPES,
  RESOURCE_TYPE_LABELS,
} from "../../constants/resourceTypes";

// Category filter config with icons and colors
const CATEGORY_FILTERS = [
  { key: "ALL", label: "All", icon: Bookmark, color: "violet" },
  { key: RESOURCE_TYPES.AI_QUESTION, label: RESOURCE_TYPE_LABELS.AI_QUESTION, icon: Bot, color: "fuchsia" },
  { key: RESOURCE_TYPES.DSA, label: RESOURCE_TYPE_LABELS.DSA, icon: Code2, color: "blue" },
  { key: RESOURCE_TYPES.APTITUDE, label: RESOURCE_TYPE_LABELS.APTITUDE, icon: Brain, color: "emerald" },
  { key: RESOURCE_TYPES.BOOK, label: RESOURCE_TYPE_LABELS.BOOK, icon: BookOpen, color: "amber" },
  { key: RESOURCE_TYPES.PROJECT, label: RESOURCE_TYPE_LABELS.PROJECT, icon: Lightbulb, color: "orange" },
  { key: RESOURCE_TYPES.INTERVIEW_EXPERIENCE, label: RESOURCE_TYPE_LABELS.INTERVIEW_EXPERIENCE, icon: MessageSquare, color: "rose" },
];

// Color map for resource type badges
const TYPE_COLORS = {
  AI_QUESTION: "bg-fuchsia-500/10 text-fuchsia-500 dark:text-fuchsia-400 border-fuchsia-500/20",
  DSA: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  APTITUDE: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
  BOOK: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  PROJECT: "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20",
  INTERVIEW_EXPERIENCE: "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20",
};

const TYPE_ICONS = {
  AI_QUESTION: Bot,
  DSA: Code2,
  APTITUDE: Brain,
  BOOK: BookOpen,
  PROJECT: Lightbulb,
  INTERVIEW_EXPERIENCE: MessageSquare,
};

/** Individual bookmark card */
const BookmarkCard = ({ bookmark, onRemove }) => {
  const Icon = TYPE_ICONS[bookmark.resourceType] || Bookmark;
  const colorClass = TYPE_COLORS[bookmark.resourceType] || TYPE_COLORS.AI_QUESTION;
  const label = RESOURCE_TYPE_LABELS[bookmark.resourceType] || bookmark.resourceType;
  const meta = bookmark.metadata || {};

  // Build a clickable URL for books
  const externalUrl = bookmark.resourceType === RESOURCE_TYPES.BOOK && meta.url
    ? meta.url
    : null;

  return (
    <div className="group relative bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5 transition-all duration-300">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-violet-500/60 to-fuchsia-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${colorClass}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">
            {bookmark.title}
          </h3>
          <span className={`inline-flex items-center mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colorClass}`}>
            {label}
          </span>
        </div>
      </div>

      {/* Description */}
      {bookmark.description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {bookmark.description}
        </p>
      )}

      {/* Metadata chips */}
      {Object.keys(meta).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {meta.company && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
              {meta.company}
            </span>
          )}
          {meta.difficulty && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
              {meta.difficulty}
            </span>
          )}
          {meta.topic && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
              {meta.topic}
            </span>
          )}
          {meta.domain && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
              {meta.domain}
            </span>
          )}
          {meta.category && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
              {meta.category}
            </span>
          )}
          {Array.isArray(meta.techStack) && meta.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20">
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-white/5">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
          {new Date(bookmark.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        <div className="flex items-center gap-2">
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors"
              title="Open resource"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            title="Remove bookmark"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

/** Skeleton loading card */
const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-2xl p-5">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-white/10 rounded" />
      <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-2/3" />
    </div>
  </div>
);

const SavedItems = () => {
  const { bookmarks, loading, toggleBookmark } = useBookmarks();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Client-side filtering (data already fetched by hook)
  const filtered = useMemo(() => {
    let result = bookmarks;

    if (activeFilter !== "ALL") {
      result = result.filter((b) => b.resourceType === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.description && b.description.toLowerCase().includes(q))
      );
    }

    return result;
  }, [bookmarks, activeFilter, search]);

  // Stats
  const totalCount = bookmarks.length;
  const filteredCount = filtered.length;

  const handleRemove = (bookmark) => {
    toggleBookmark({
      resourceId: bookmark.resourceId,
      resourceType: bookmark.resourceType,
      title: bookmark.title,
      description: bookmark.description,
      metadata: bookmark.metadata,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] px-5 py-10 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 shadow-sm flex items-center justify-center shrink-0">
              <Bookmark size={26} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Saved Items
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                Your bookmarked resources — all in one place.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 px-3 py-1.5 rounded-xl">
              {totalCount} saved
            </span>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/5 rounded-2xl p-4 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your saved items..."
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <Filter size={14} className="text-gray-400 shrink-0" />
            {CATEGORY_FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              const count = f.key === "ALL"
                ? bookmarks.length
                : bookmarks.filter((b) => b.resourceType === f.key).length;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                      : "bg-transparent border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-400"
                  }`}
                >
                  {f.label}
                  <span className={`text-[9px] font-extrabold px-1 py-0.5 rounded-full min-w-[16px] text-center ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-white/10 text-gray-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        {search || activeFilter !== "ALL" ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Showing <span className="text-violet-400 font-bold">{filteredCount}</span> of {totalCount} saved items
          </p>
        ) : null}

        {/* Content */}
        {loading ? (
          /* Loading skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#151c2f]">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
              <BookmarkX size={28} className="text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {search || activeFilter !== "ALL"
                ? "No matching bookmarks"
                : "No saved items yet"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-5">
              {search || activeFilter !== "ALL"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Start exploring resources and bookmark the ones you want to revisit later."}
            </p>
            {(search || activeFilter !== "ALL") && (
              <button
                onClick={() => { setSearch(""); setActiveFilter("ALL"); }}
                className="px-5 py-2 rounded-xl border border-violet-500/30 text-violet-500 text-sm font-semibold hover:bg-violet-500/10 transition"
              >
                Clear Filters
              </button>
            )}
            {!search && activeFilter === "ALL" && (
              <div className="flex items-center gap-2 text-violet-500 dark:text-violet-400 text-sm font-semibold">
                <Sparkles size={16} className="animate-pulse" />
                Explore DSA sheets, books, and interview experiences to start saving!
              </div>
            )}
          </div>
        ) : (
          /* Bookmarks grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onRemove={() => handleRemove(bookmark)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItems;
