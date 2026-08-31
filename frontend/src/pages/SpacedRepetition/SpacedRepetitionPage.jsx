import React, { useState, useEffect, useCallback } from "react";
import {
  RotateCcw, Brain, CheckCircle2, Clock,
  Plus, Trash2, BookOpen, Layers, Flame, Award, ChevronRight, RefreshCw, X
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const CATEGORIES = ["All", "DSA", "Aptitude", "Role-Prep", "AI", "General", "Custom"];

const notifyStreakMilestones = (newlyUnlockedAchievements) => {
  (newlyUnlockedAchievements || [])
    .filter((badge) => badge.endsWith("Streak"))
    .forEach((badge) => toast.success(`🏆 Milestone unlocked: ${badge}!`));
};

const SpacedRepetitionPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [stats, setStats] = useState({ totalCards: 0, dueCount: 0, masteredCount: 0, reviewedToday: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("due"); // "due" | "all"
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Review Queue state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("Custom");
  const [submitting, setSubmitting] = useState(false);

  const fetchFlashcards = useCallback(async () => {
    try {
      setLoading(true);
      const isDueQuery = activeTab === "due" ? "?due=true" : "";
      const catQuery = selectedCategory !== "All" ? `${isDueQuery ? "&" : "?"}category=${selectedCategory}` : "";

      const res = await axiosInstance.get(`${API_PATHS.FLASHCARD.GET_ALL}${isDueQuery}${catQuery}`);
      if (res.data.success) {
        setFlashcards(res.data.flashcards);
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load flashcards");
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedCategory]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.FLASHCARD.GET_STATS);
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Failed to load SRS stats", err);
    }
  }, []);

  useEffect(() => {
    fetchFlashcards();
    fetchStats();
  }, [fetchFlashcards, fetchStats]);

  const handleReviewRating = async (rating) => {
    if (reviewing || flashcards.length === 0) return;
    const currentCard = flashcards[currentIndex];
    if (!currentCard) return;

    try {
      setReviewing(true);
      const res = await axiosInstance.put(API_PATHS.FLASHCARD.REVIEW(currentCard._id), { rating });
      if (res.data.success) {
        toast.success(`Review saved! Next due in ${res.data.flashcard.interval} day(s)`);
        notifyStreakMilestones(res.data.newlyUnlockedAchievements);

        // Remove current card from queue or move to next
        const updatedList = flashcards.filter((_, idx) => idx !== currentIndex);
        setFlashcards(updatedList);
        setIsFlipped(false);
        if (currentIndex >= updatedList.length) {
          setCurrentIndex(0);
        }
        fetchStats();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewing(false);
    }
  };

  const handleDeleteCard = async (id, e) => {
    e?.stopPropagation();
    try {
      const res = await axiosInstance.delete(API_PATHS.FLASHCARD.DELETE(id));
      if (res.data.success) {
        toast.success("Flashcard removed from deck");
        setFlashcards((prev) => prev.filter((card) => card._id !== id));
        fetchStats();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete flashcard");
    }
  };

  const handleAddCustomCard = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast.error("Please enter both question and answer");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axiosInstance.post(API_PATHS.FLASHCARD.CREATE, {
        question: newQuestion,
        answer: newAnswer,
        category: newCategory,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Flashcard created!");
        setShowAddModal(false);
        setNewQuestion("");
        setNewAnswer("");
        fetchFlashcards();
        fetchStats();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create card");
    } finally {
      setSubmitting(false);
    }
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 p-4 md:p-8 custom-scrollbar">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/8 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Brain size={14} /> Cognitive Revision System (SM-2)
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Spaced Repetition Deck
              </h1>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
                Boost long-term recall with adaptive flashcard scheduling. Review key interview patterns at optimal cognitive intervals.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shrink-0"
            >
              <Plus size={16} /> Add Custom Flashcard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#111827]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Due Today</p>
              <p className="text-2xl font-bold text-white">{stats.dueCount}</p>
            </div>
          </div>

          <div className="bg-[#111827]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Deck</p>
              <p className="text-2xl font-bold text-white">{stats.totalCards}</p>
            </div>
          </div>

          <div className="bg-[#111827]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Award size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Mastered (21+ days)</p>
              <p className="text-2xl font-bold text-white">{stats.masteredCount}</p>
            </div>
          </div>

          <div className="bg-[#111827]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Flame size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Reviewed Today</p>
              <p className="text-2xl font-bold text-white">{stats.reviewedToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Deck Container */}
      <div className="max-w-6xl mx-auto">
        {/* Navigation Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1.5 bg-[#111827] rounded-2xl border border-white/5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("due")}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "due"
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Due Queue ({stats.dueCount})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Cards ({stats.totalCards})
            </button>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? "bg-white/15 text-white border border-white/20"
                    : "bg-[#111827] text-gray-400 hover:bg-white/5 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <RefreshCw className="animate-spin text-violet-400" size={32} />
          </div>
        ) : flashcards.length === 0 ? (
          <div className="bg-[#111827]/60 border border-white/5 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-4 border border-emerald-500/20">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {activeTab === "due" ? "All Caught Up for Today! 🎉" : "No Flashcards Found"}
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              {activeTab === "due"
                ? "Great job maintaining your recall! Check back tomorrow or review all cards in your deck."
                : "Bookmark questions from DSA sheets, Aptitude, or Role Prep to populate your SRS deck."}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all"
            >
              <Plus size={16} /> Create Custom Card
            </button>
          </div>
        ) : activeTab === "due" ? (
          /* Interactive Flashcard Deck View */
          <div className="max-w-2xl mx-auto">
            {/* Card Progress Indicator */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3 px-1">
              <span>Card {currentIndex + 1} of {flashcards.length}</span>
              <span className="bg-violet-500/10 text-violet-400 px-2.5 py-0.5 rounded-full border border-violet-500/20 font-semibold">
                {currentCard.category}
              </span>
            </div>

            {/* Flip Card */}
            <div className="mb-6 relative w-full min-h-[320px] cursor-pointer" style={{ perspective: "1200px" }}
              onClick={() => setIsFlipped(!isFlipped)}>
              
              {/* Card container */}
              <div className="relative w-full min-h-[320px] transition-transform duration-500"
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>

                {/* Front */}
                <div className="absolute inset-0 rounded-3xl bg-[#111827] border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="inline-flex items-center gap-1"><BookOpen size={14} /> Question</span>
                      <span>Click card to reveal answer</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                      {currentCard.question}
                    </h2>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                    <span>Interval: {currentCard.interval}d</span>
                    <span className="text-violet-400 font-semibold flex items-center gap-1">
                      Flip Card <ChevronRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 rounded-3xl bg-[#111827] border border-emerald-500/20 p-6 md:p-8 shadow-2xl flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400"><CheckCircle2 size={14} /> Answer</span>
                      <span>Ease Factor: {currentCard.efactor}</span>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-200 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[220px] custom-scrollbar pr-2">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {currentCard.answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 text-xs text-gray-400 text-center">
                    Rate difficulty below to schedule next review
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Buttons */}
            {isFlipped && (
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                <button
                  disabled={reviewing}
                  onClick={() => handleReviewRating("again")}
                  className="p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition-all"
                >
                  <span>Again</span>
                  <span className="text-[10px] font-normal text-rose-300/70">1 day</span>
                </button>

                <button
                  disabled={reviewing}
                  onClick={() => handleReviewRating("hard")}
                  className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition-all"
                >
                  <span>Hard</span>
                  <span className="text-[10px] font-normal text-amber-300/70">2 days</span>
                </button>

                <button
                  disabled={reviewing}
                  onClick={() => handleReviewRating("good")}
                  className="p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition-all"
                >
                  <span>Good</span>
                  <span className="text-[10px] font-normal text-blue-300/70">
                    {Math.max(6, Math.round((currentCard.interval || 1) * currentCard.efactor))} days
                  </span>
                </button>

                <button
                  disabled={reviewing}
                  onClick={() => handleReviewRating("easy")}
                  className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs md:text-sm flex flex-col items-center gap-1 transition-all"
                >
                  <span>Easy</span>
                  <span className="text-[10px] font-normal text-emerald-300/70">
                    {Math.max(7, Math.round((currentCard.interval || 1) * currentCard.efactor * 1.3))} days
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* All Flashcards List View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcards.map((card) => (
              <div
                key={card._id}
                className="bg-[#111827] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      {card.category}
                    </span>
                    <button
                      onClick={(e) => handleDeleteCard(card._id, e)}
                      className="p-1 text-gray-500 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete flashcard"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2 line-clamp-2">
                    {card.question}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-3 mb-4">
                    {card.answer}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                  <span>Interval: {card.interval}d</span>
                  <span>Due: {new Date(card.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Custom Flashcard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={20} className="text-violet-400" /> Create Custom Flashcard
            </h3>

            <form onSubmit={handleAddCustomCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Question Prompt
                </label>
                <textarea
                  rows={3}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter technical question or prompt..."
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Answer / Solution
                </label>
                <textarea
                  rows={4}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter key concept, code snippet, or detailed answer..."
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-md"
                >
                  {submitting ? "Adding..." : "Add Flashcard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpacedRepetitionPage;