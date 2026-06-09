import React, { useContext } from "react";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { UserContext } from "../context/userContext";
import { useBookmarks } from "../hooks/useBookmarks";

/**
 * Reusable bookmark toggle button.
 * Uses the centralized useBookmarks hook for O(1) status lookup and optimistic toggling.
 *
 * @param {object} props
 * @param {string} props.resourceId - Unique identifier for the resource
 * @param {string} props.resourceType - One of RESOURCE_TYPES constants
 * @param {string} props.title - Display title stored in the bookmark
 * @param {string} [props.description] - Optional description
 * @param {object} [props.metadata] - Optional extra data (company, url, techStack, etc.)
 * @param {string} [props.className] - Additional CSS classes
 * @param {"icon" | "button"} [props.variant="icon"] - Display variant
 */
const BookmarkButton = ({
  resourceId,
  resourceType,
  title,
  description,
  metadata,
  className = "",
  variant = "icon",
}) => {
  const { user } = useContext(UserContext);
  const { isBookmarked, toggleBookmark, loading } = useBookmarks();

  // Don't render for unauthenticated users
  if (!user) return null;

  const bookmarked = isBookmarked(resourceId, resourceType);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (loading) return;
    toggleBookmark({ resourceId, resourceType, title, description, metadata });
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
          bookmarked
            ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20"
            : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-white/10 dark:hover:text-violet-300 border border-transparent"
        } ${className}`}
        title={bookmarked ? "Remove bookmark" : "Bookmark this"}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : bookmarked ? (
          <BookmarkCheck size={16} />
        ) : (
          <Bookmark size={16} />
        )}
        <span className="hidden sm:inline">
          {bookmarked ? "Saved" : "Save"}
        </span>
      </button>
    );
  }

  // Default: icon variant
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-xl transition-colors duration-200 flex items-center justify-center ${
        bookmarked
          ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 shadow-sm"
          : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-white/10 dark:hover:text-violet-300 border border-transparent"
      } ${className}`}
      title={bookmarked ? "Remove bookmark" : "Bookmark this"}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : bookmarked ? (
        <BookmarkCheck size={18} />
      ) : (
        <Bookmark size={18} />
      )}
    </button>
  );
};

export default BookmarkButton;
