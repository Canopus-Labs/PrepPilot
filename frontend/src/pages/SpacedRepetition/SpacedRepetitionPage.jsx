import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SpacedRepetitionPage = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading revision cards...</div>;
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl font-bold text-emerald-400 mb-2">🎉 All caught up!</h2>
        <p className="text-gray-400">No cards due for revision today. Great job!</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">🎴 Spaced Repetition Revision</h1>
        <span className="bg-indigo-600/30 text-indigo-300 text-sm px-3 py-1 rounded-full">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 min-h-[250px] shadow-lg flex flex-col justify-between">
        <div>
          <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
            {currentCard.category}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{currentCard.title}</h3>
          <p className="text-gray-300 mt-4 text-lg">{currentCard.question}</p>
        </div>

        {showAnswer && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-indigo-400">Answer / Key Takeaway:</h4>
            <p className="text-gray-200 mt-2 whitespace-pre-line">{currentCard.answer}</p>
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
              className="bg-red-600/20 hover:bg-red-600/30 border border-red-500 text-red-300 font-medium py-2 rounded-lg"
            >
              Again (1d)
            </button>
            <button
              onClick={() => handleReview(2)}
              className="bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500 text-amber-300 font-medium py-2 rounded-lg"
            >
              Hard (3d)
            </button>
            <button
              onClick={() => handleReview(3)}
              className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500 text-blue-300 font-medium py-2 rounded-lg"
            >
              Good (7d)
            </button>
            <button
              onClick={() => handleReview(4)}
              className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500 text-emerald-300 font-medium py-2 rounded-lg"
            >
              Easy (14d)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpacedRepetitionPage;
