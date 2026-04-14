import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Loader,
  AlertCircle,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const OSSBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          article.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://dev.to/api/articles?tag=opensource&per_page=100",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setArticles(data);
      setFilteredArticles(data);
    } catch (err) {
      setError(
        err.message || "Failed to fetch articles. Please try again later.",
      );
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen
              size={32}
              className="text-violet-600 dark:text-violet-400"
            />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              OSS Learning Hub
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover curated articles, guides, and stories about open-source
            development, contribution tips, and best practices from the
            community.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, author, or topic..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
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
              Loading articles...
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredArticles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white dark:bg-[#0f1729] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Cover Image */}
                {article.cover_image && (
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-white/5">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  {/* Tags */}
                  {article.tag_list && article.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tag_list.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                    {article.description || "No description available"}
                  </p>

                  {/* Author & Meta Info */}
                  <div className="border-t border-gray-200 dark:border-white/5 pt-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      {article.user?.profile_image && (
                        <img
                          src={article.user.profile_image}
                          alt={article.user.name}
                          className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {article.user?.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {formatDate(article.published_at)}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Heart size={16} />
                        <span className="font-medium">
                          {article.positive_reactions_count || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle size={16} />
                        <span className="font-medium">
                          {article.comments_count || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>
                          📖 {calculateReadTime(article.body_markdown)} min
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen
              size={48}
              className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No articles found. Please try again later.
            </p>
          </motion.div>
        )}

        {/* No Search Results */}
        {!loading &&
          filteredArticles.length === 0 &&
          searchQuery &&
          articles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen
                size={48}
                className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found for "{searchQuery}". Try a different search.
              </p>
            </motion.div>
          )}

        {/* Results Count */}
        {!loading && filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-gray-600 dark:text-gray-400"
          >
            <p>
              Showing {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OSSBlog;
