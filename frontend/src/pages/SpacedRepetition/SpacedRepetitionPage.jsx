import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SpacedRepetitionPage = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  // Add Card Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    title: "",
    question: "",
    answer: "",
    category: "General",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDueCards = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/srs/due`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCards(response.data.data);
      }
    } catch (err) {
      toast.error("Failed to load flashcards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDueCards();
  }, []);

  const handleReview = async (rating) => {
    const currentCard = cards[currentIndex];
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/srs/${currentCard._id}/review`,
        { rating },
        { withCredentials: true }
      );
      toast.success("Progress saved!");
      setShowAnswer(false);
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCards([]);
      }
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!newCard.title || !newCard.question || !newCard.answer) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/srs/add`,
        newCard,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Flashcard added successfully!");
        setNewCard({ title: "", question: "", answer: "", category: "General" });
        setShowAddModal(false);
        fetchDueCards();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add flashcard");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading revision cards...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">🎴 Spaced Repetition Revision</h1>
          <p className="text-gray-400 text-sm mt-1">
            Review your flagged concepts and technical questions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition flex items-center gap-1.5 shadow"
          >
            <span>➕</span> Add Card
          </button>
          {cards.length > 0 && (
            <span className="bg-indigo-600/30 text-indigo-300 text-sm px-3 py-1 rounded-full">
              Card {currentIndex + 1} of {cards.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Flashcard view / Empty state */}
      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-gray-800/50 border border-gray-700/60 rounded-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">🎉 All caught up!</h2>
          <p className="text-gray-400 max-w-md">
            No cards due for revision today. Click the <strong className="text-emerald-400">"➕ Add Card"</strong> button above to create a new flashcard directly in the app!
          </p>
        </div>
      ) : (
        <>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 min-h-[250px] shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                {cards[currentIndex]?.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{cards[currentIndex]?.title}</h3>
              <p className="text-gray-300 mt-4 text-lg">{cards[currentIndex]?.question}</p>
            </div>

            {showAnswer && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-indigo-400">Answer / Key Takeaway:</h4>
                <p className="text-gray-200 mt-2 whitespace-pre-line">{cards[currentIndex]?.answer}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition"
              >
                Show Answer
              </button>
            ) : (
              <div className="grid grid-cols-4 gap-3 w-full">
                <button
                  onClick={() => handleReview(1)}
                  className="bg-red-600/20 hover:bg-red-600/30 border border-red-500 text-red-300 font-medium py-2 rounded-lg transition"
                >
                  Again (1d)
                </button>
                <button
                  onClick={() => handleReview(2)}
                  className="bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500 text-amber-300 font-medium py-2 rounded-lg transition"
                >
                  Hard (3d)
                </button>
                <button
                  onClick={() => handleReview(3)}
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500 text-blue-300 font-medium py-2 rounded-lg transition"
                >
                  Good (7d)
                </button>
                <button
                  onClick={() => handleReview(4)}
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500 text-emerald-300 font-medium py-2 rounded-lg transition"
                >
                  Easy (14d)
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">➕ Add New Flashcard</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title / Topic <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Reverse a Linked List"
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. DSA, System Design, Aptitude"
                  value={newCard.category}
                  onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Question / Concept <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. How to detect a cycle in a Linked List?"
                  value={newCard.question}
                  onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Answer / Key Takeaway <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Use Floyd's Cycle Detection (Fast & Slow Pointers)."
                  value={newCard.answer}
                  onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Flashcard"}
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

