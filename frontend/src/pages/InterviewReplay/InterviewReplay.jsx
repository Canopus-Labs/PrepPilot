import React from "react";
import ReplayCard from "../../components/InterviewReplay/ReplayCard";
import SearchBar from "../../components/InterviewReplay/SearchBar";
import QuestionReplay from "../../components/InterviewReplay/QuestionReplay";
import FeedbackTimeline from "../../components/InterviewReplay/FeedbackTimeline";
import ProgressComparison from "../../components/InterviewReplay/ProgressComparison";

const session = {
  role: "Frontend Developer",
  company: "Google",
  date: "03 Aug 2026",
  score: 84,
};

const questions = [
  {
    question: "Explain React Hooks.",
    answer: "Hooks allow functional components to use state and lifecycle methods.",
    feedback: "Good explanation, include useEffect examples."
  },
  {
    question: "Difference between var, let and const?",
    answer: "let and const are block scoped.",
    feedback: "Mention hoisting and temporal dead zone."
  }
];

const timeline = [
  {
    time: "00:02",
    event: "Introduction",
  },
  {
    time: "04:30",
    event: "Technical Round",
  },
  {
    time: "12:20",
    event: "Behavioral Round",
  },
  {
    time: "18:10",
    event: "Final Feedback",
  },
];

const comparison = {
  previous: 72,
  current: 84,
};

const InterviewReplay = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🎥 Interview Replay
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Review previous interview sessions and AI feedback.
        </p>

        <div className="mt-8">
          <SearchBar />
        </div>

        <div className="mt-8">
          <ReplayCard session={session} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <QuestionReplay questions={questions} />

          <FeedbackTimeline timeline={timeline} />

        </div>

        <div className="mt-8">

          <ProgressComparison comparison={comparison} />

        </div>

      </div>

    </div>
  );
};

export default InterviewReplay;