import React, { useState } from "react";
import { Brain, Sparkles, MessageSquare, Send } from "lucide-react";

const challenges = [
  "What happens when the input becomes very large?",
  "Why did you choose this approach?",
  "What would you change to improve scalability?",
  "What are the main disadvantages of your solution?",
];

export default function AIInterviewAnswerCounterargumentCoach() {
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState(0);
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitResponse = () => {
    if (!response.trim()) return;

    setFeedback(
      "Good reasoning. Try supporting your decision with a specific technical trade-off or measurable constraint."
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Counterargument Coach
          </h1>
          <p className="text-gray-500">
            Defend your technical decisions against realistic interviewer
            challenges.
          </p>
        </div>
      </div>

      {/* Original Answer */}
      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="text-purple-600" size={20} />
          <h2 className="font-bold">Your Technical Answer</h2>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your interview answer..."
          rows={5}
          className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* AI Challenge */}
      <div className="bg-purple-50 rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-600" />
          <h2 className="font-bold">AI Counterargument</h2>
        </div>

        <p className="text-lg font-semibold mt-4">
          {challenges[selected]}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {challenges.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelected(index);
                setFeedback("");
                setResponse("");
              }}
              className={`px-3 py-2 rounded-lg text-sm ${
                selected === index
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Challenge {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Response */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="font-bold mb-3">Defend Your Answer</h2>

        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Explain how you would respond to the interviewer..."
          rows={5}
          className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={submitResponse}
          disabled={!response.trim()}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          <Send size={18} />
          Get AI Feedback
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h2 className="font-bold text-green-700">
            AI Feedback
          </h2>

          <p className="text-gray-600 mt-2">
            {feedback}
          </p>
        </div>
      )}
    </div>
  );
}