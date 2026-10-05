import React from "react";
import { BookOpen, Brain, Layers, ExternalLink } from "lucide-react";

const TYPE_META = {
  "dsa-subtopic": { icon: BookOpen, label: "DSA Problem" },
  "adaptive-topic": { icon: Brain, label: "Adaptive Session" },
  "flashcard-review": { icon: Layers, label: "Flashcard Review" },
};

const PRIORITY_STYLES = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const LinkButton = ({ href, label, children }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline"
    >
      {children}
      <ExternalLink size={11} />
    </a>
  );
};

const QueueItem = ({ item }) => {
  const { icon: Icon, label: typeLabel } = TYPE_META[item.type] || TYPE_META["dsa-subtopic"];

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5 bg-white dark:bg-[#111827]">
      {/* Type icon */}
      <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
        <Icon size={18} className="text-violet-600" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {/* Priority badge */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.low}`}
            aria-label={`${item.priority} priority`}
          >
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </span>

          {/* Type chip */}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {typeLabel}
          </span>

          {/* Topic chip */}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400">
            {item.topic}
          </span>
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{item.title}</p>

        {/* External links */}
        {item.links && (
          <div className="flex flex-wrap gap-3 mt-2">
            <LinkButton href={item.links.gfg} label={`Open ${item.title} on GeeksForGeeks`}>
              GFG
            </LinkButton>
            <LinkButton href={item.links.leetcode} label={`Open ${item.title} on LeetCode`}>
              LeetCode
            </LinkButton>
            <LinkButton href={item.links.youtube} label={`Watch ${item.title} on YouTube`}>
              YouTube
            </LinkButton>
          </div>
        )}
      </div>
    </li>
  );
};

/**
 * RevisionQueueList
 *
 * Props:
 *   items       — current list of queue items
 *   totalItems  — total count from the API
 *   onLoadMore  — callback(nextPage) to fetch more items
 *   currentPage — current page number (1-indexed)
 *   loading     — boolean while a load-more is in progress
 */
const RevisionQueueList = ({ items = [], totalItems = 0, onLoadMore, currentPage = 1, loading = false }) => {
  if (items.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-6 text-center">
        No revision items yet — your queue will populate once weak topics are identified.
      </p>
    );
  }

  const hasMore = items.length < totalItems;

  return (
    <div>
      <ul aria-label="Revision queue" className="space-y-3">
        {items.map((item, idx) => (
          <QueueItem key={`${item.topic}-${item.type}-${idx}`} item={item} />
        ))}
      </ul>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => onLoadMore(currentPage + 1)}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl border border-violet-300 dark:border-violet-700 text-violet-600 dark:text-violet-400 text-sm font-semibold hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors disabled:opacity-50"
          >
            {loading ? "Loading…" : `Load more (${totalItems - items.length} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default RevisionQueueList;
