import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { UserContext } from "../context/userContext";
import { addBookmark, removeBookmark, getBookmarks } from "../services/bookmarkService";
import toast from "react-hot-toast";

/**
 * Custom hook for centralized bookmark state management.
 * Fetches all bookmarks once on mount, builds an O(1) lookup Map,
 * and provides optimistic toggle with automatic revert on failure.
 */
export function useBookmarks() {
  const { user } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Fetch all bookmarks (no pagination for the lookup cache)
      const { data } = await getBookmarks({ limit: 500 });
      setBookmarks(data.bookmarks || []);
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch bookmarks once when user is available
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Build a Map for O(1) bookmark status lookups: "TYPE:resourceId" -> bookmark doc
  const bookmarkMap = useMemo(() => {
    const map = new Map();
    bookmarks.forEach((b) => map.set(`${b.resourceType}:${b.resourceId}`, b));
    return map;
  }, [bookmarks]);

  /** Check if a resource is bookmarked (O(1) lookup) */
  const isBookmarked = useCallback(
    (resourceId, resourceType) => bookmarkMap.has(`${resourceType}:${resourceId}`),
    [bookmarkMap]
  );

  /** Get the full bookmark document for a resource (needed for _id on removal) */
  const getBookmarkDoc = useCallback(
    (resourceId, resourceType) => bookmarkMap.get(`${resourceType}:${resourceId}`) || null,
    [bookmarkMap]
  );

  /**
   * Toggle bookmark with optimistic UI.
   * If bookmarked → remove; if not → add. Reverts on API failure.
   */
  const toggleBookmark = useCallback(
    async ({ resourceId, resourceType, title, description, metadata }) => {
      if (!user) {
        toast.error("Please log in to bookmark resources");
        return;
      }

      const existing = getBookmarkDoc(resourceId, resourceType);

      if (existing) {
        // --- Optimistic Remove ---
        setBookmarks((prev) => prev.filter((b) => b._id !== existing._id));
        try {
          await removeBookmark(existing._id);
          toast.success("Bookmark removed");
        } catch (err) {
          // Revert on failure
          setBookmarks((prev) => [...prev, existing]);
          toast.error(err.response?.data?.message || "Failed to remove bookmark");
        }
      } else {
        // --- Optimistic Add ---
        const tempId = `temp-${Date.now()}`;
        const optimistic = {
          _id: tempId,
          resourceId,
          resourceType,
          title,
          description: description || "",
          metadata: metadata || {},
          createdAt: new Date().toISOString(),
        };
        setBookmarks((prev) => [optimistic, ...prev]);
        try {
          const { data } = await addBookmark({
            resourceId,
            resourceType,
            title,
            description,
            metadata,
          });
          // Replace temp with real bookmark from server
          setBookmarks((prev) =>
            prev.map((b) => (b._id === tempId ? data.bookmark : b))
          );
          toast.success("Bookmarked!");
        } catch (err) {
          // Revert on failure
          setBookmarks((prev) => prev.filter((b) => b._id !== tempId));
          if (err.response?.status === 409) {
            toast.error("Already bookmarked");
            fetchAll(); // Sync state
          } else {
            toast.error(err.response?.data?.message || "Failed to bookmark");
          }
        }
      }
    },
    [user, getBookmarkDoc, fetchAll]
  );

  return {
    bookmarks,
    loading,
    isBookmarked,
    getBookmarkDoc,
    toggleBookmark,
    refetch: fetchAll,
  };
}
