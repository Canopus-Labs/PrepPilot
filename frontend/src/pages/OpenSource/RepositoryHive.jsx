import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  Github,
  Star,
  GitFork,
  Eye,
  Code,
  Loader,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  FILTER_OPTIONS,
  REPOSITORY_SORT_OPTIONS,
  ISSUE_SORT_OPTIONS,
  buildGitHubSearchUrl,
  normalizeSearchResponse,
  usesIssueLabelSearch,
  getSearchPageInfo,
} from "../../utils/repositoryHiveSearch";

const PER_PAGE = 30;
const EMPTY_PAGE_INFO = {
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const RepositoryHive = () => {
  const [selectedFilters, setSelectedFilters] = useState(["good-first-issue"]);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(EMPTY_PAGE_INFO);
  const abortRef = useRef(null);

  const showingIssueBackedResults = usesIssueLabelSearch(selectedFilters);
  const sortOptions = showingIssueBackedResults
    ? ISSUE_SORT_OPTIONS
    : REPOSITORY_SORT_OPTIONS;

  const fetchRepositories = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const url = buildGitHubSearchUrl({
        selectedFilters,
        searchQuery,
        sortBy,
        perPage: PER_PAGE,
        page,
      });

      if (!url) {
        if (controller.signal.aborted) return;
        setRepositories([]);
        setPageInfo(EMPTY_PAGE_INFO);
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      if (controller.signal.aborted) return;

      setRepositories(normalizeSearchResponse(selectedFilters, data));
      setPageInfo(getSearchPageInfo(data, page, PER_PAGE));
    } catch (err) {
      if (err?.name === "AbortError" || controller.signal.aborted) return;
      setError(
        err.message || "Failed to fetch repositories. Please try again later.",
      );
      setRepositories([]);
      setPageInfo(EMPTY_PAGE_INFO);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [selectedFilters, searchQuery, sortBy, page]);

  // Auto-fetch on filter/sort/page; search text applies only via Search / Enter.
  useEffect(() => {
    fetchRepositories();
    return () => {
      abortRef.current?.abort();
    };
    // intentionally omit searchQuery — typing should not hit GitHub until Search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, sortBy, page]);

  const toggleFilter = (filterId) => {
    setPage(1);
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (page !== 1) {
      setPage(1);
      return;
    }
    fetchRepositories();
  };

  const handleSortChange = (nextSort) => {
    setPage(1);
    setSortBy(nextSort);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Github
              size={32}
              className="text-violet-600 dark:text-violet-400"
            />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Repository Hive
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover open-source projects perfect for contributing. Find
            repositories with good first issues and beginner-friendly
            contributions.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search repositories (e.g., react, django, tensorflow)..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              Sort by:
            </span>
            <div className="flex gap-2 flex-wrap">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={`px-4 py-2 rounded-lg border transition-all font-medium text-sm ${
                    sortBy === option.id
                      ? "bg-violet-600 text-white border-violet-600"
                      : "border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Filter by Topics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                  selectedFilters.includes(filter.id)
                    ? "bg-violet-600/10 border-violet-600 text-violet-600 dark:text-violet-400"
                    : "border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-400 hover:border-violet-400 dark:hover:border-violet-400"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg flex items-start gap-3"
          >
            <AlertCircle
              size={20}
              className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
            />
            <div className="text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader
              size={40}
              className="text-violet-600 dark:text-violet-400 animate-spin mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400">
              {showingIssueBackedResults
                ? "Looking for open labelled issues..."
                : "Loading repositories..."}
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && repositories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-6 hover:border-violet-400 dark:hover:border-violet-400 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Github
                      size={20}
                      className="text-violet-600 dark:text-violet-400 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors block"
                      >
                        {repo.name}
                      </a>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {repo.owner.login}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                </div>

                {repo.matchingIssue && (
                  <a
                    href={repo.matchingIssue.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-4 block rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-2 hover:bg-violet-500/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-violet-500 mb-1">
                          Open starter issue
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                          #{repo.matchingIssue.number} {repo.matchingIssue.title}
                        </p>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-violet-500 flex-shrink-0 mt-1"
                      />
                    </div>
                  </a>
                )}

                {/* Language & Topics */}
                <div className="mb-4 flex-1">
                  {repo.language && (
                    <div className="inline-flex items-center gap-2 mb-3">
                      <Code
                        size={14}
                        className="text-violet-600 dark:text-violet-400"
                      />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                        {repo.language}
                      </span>
                    </div>
                  )}

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-xs px-2 py-1 text-gray-600 dark:text-gray-400">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Stats — issue metrics vs repository metrics */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 text-sm">
                  {repo.metricsMode === "issue" ? (
                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400"
                        title="Issue reactions"
                      >
                        <ThumbsUp size={14} />
                        <span className="font-medium">
                          {repo.reactions_count ?? 0}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400"
                        title="Issue comments"
                      >
                        <MessageCircle size={14} />
                        <span className="font-medium">
                          {repo.comments_count ?? 0}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Star size={14} />
                          <span className="font-medium">
                            {repo.stargazers_count}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <GitFork size={14} />
                          <span className="font-medium">{repo.forks_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Eye size={14} />
                          <span className="font-medium">
                            {repo.watchers_count}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {repo.open_issues_count} issues
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && repositories.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Github
              size={48}
              className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {showingIssueBackedResults
                ? "No open issues found for the selected labels. Try another filter or search term."
                : "No repositories found. Try adjusting your filters or search query."}
            </p>
          </motion.div>
        )}

        {/* Results Count + Pagination */}
        {!loading && repositories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400"
          >
            <p>
              Showing {repositories.length}{" "}
              {showingIssueBackedResults
                ? "repositories with open labelled issues"
                : "repositories"}
              {pageInfo.totalCount > 0
                ? ` · page ${pageInfo.currentPage} of ${pageInfo.totalPages}`
                : ""}
            </p>
            {(pageInfo.hasPrevPage || pageInfo.hasNextPage) && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!pageInfo.hasPrevPage || loading}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 text-sm font-medium disabled:opacity-40 hover:border-violet-400"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!pageInfo.hasNextPage || loading}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 text-sm font-medium disabled:opacity-40 hover:border-violet-400"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RepositoryHive;
