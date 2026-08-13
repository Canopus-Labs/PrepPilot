import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  RefreshCw,
} from "lucide-react";

const exercises = [
  {
    type: "Quick Recall",
    title: "Recall the Core Idea",
    question:
      "In one sentence, explain why a hash table can provide average O(1) lookup.",
    time: "1 min",
  },
  {
    type: "Mini Example",
    title: "Complete the Example",
    question:
      "Give one practical situation where using a hash table would be better than searching an array.",
    time: "2 min",
  },
  {
    type: "True / False",
    title: "Check Your Understanding",
    question:
      "True or False: Hash table lookup is guaranteed to be O(1) in every case.",
    time: "30 sec",
  },
  {
    type: "Concept Comparison",
    title: "Compare Concepts",
    question:
      "What is one important difference between a hash table and a binary search tree?",
    time: "2 min",
  },
  {
    type: "One-Minute Explanation",
    title: "Explain Without Notes",
    question:
      "Explain how collisions are handled in a hash table as if you were answering an interviewer.",
    time: "1 min",
  },
];

export default function AIInterviewPreparationConceptReinforcementGenerator() {
  const [generated, setGenerated] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [answer, setAnswer] = useState("");

  const markComplete = (index) => {
    if (!completed.includes(index)) {
      setCompleted([...completed, index]);
    }
    setAnswer("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Reinforcement Generator
          </h1>

          <p className="text-gray-500">
            Practice weak concepts with short, targeted reinforcement
            exercises.
          </p>
        </div>

      </div>

      {/* Weak Concept */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Target className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              Detected Weak Concept: Hash Table Collisions
            </h2>

            <p className="text-gray-600 mt-2">
              Your recent answers show difficulty explaining collision
              handling. The AI has generated lightweight exercises focused
              specifically on this concept.
            </p>
          </div>

        </div>

      </div>

      {/* Generate */}
      {!generated && (
        <div className="bg-indigo-50 rounded-2xl p-6 text-center">

          <Sparkles
            className="mx-auto text-indigo-600"
            size={34}
          />

          <h2 className="text-xl font-bold mt-3">
            Generate Reinforcement Exercises
          </h2>

          <p className="text-gray-600 mt-2">
            Create a short personalized practice session for this weak
            concept.
          </p>

          <button
            type="button"
            onClick={() => setGenerated(true)}
            className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Generate Exercises
          </button>

        </div>
      )}

      {generated && (
        <>
          {/* Progress */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Reinforcement Progress
                </p>

                <p className="text-2xl font-black">
                  {completed.length}/{exercises.length}
                </p>
              </div>

              <RefreshCw className="text-indigo-600" />

            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-4">

              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{
                  width: `${
                    (completed.length / exercises.length) * 100
                  }%`,
                }}
              />

            </div>

          </div>

          {/* Exercises */}
          <div className="space-y-4">

            {exercises.map((exercise, index) => {
              const isComplete = completed.includes(index);

              return (
                <div
                  key={exercise.title}
                  className={`rounded-2xl shadow p-5 ${
                    isComplete
                      ? "bg-green-50"
                      : "bg-white"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                        {exercise.type}
                      </span>

                      <h2 className="font-bold text-lg mt-3">
                        {exercise.title}
                      </h2>

                    </div>

                    {isComplete ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={24}
                      />
                    ) : (
                      <Clock
                        className="text-gray-400"
                        size={22}
                      />
                    )}

                  </div>

                  <p className="text-gray-600 mt-3">
                    {exercise.question}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    Estimated time: {exercise.time}
                  </p>

                  {!isComplete && (
                    <>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={4}
                        placeholder="Write your answer..."
                        className="w-full border rounded-xl p-3 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
                      />

                      <button
                        type="button"
                        disabled={!answer.trim()}
                        onClick={() => markComplete(index)}
                        className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
                      >
                        Complete Exercise
                      </button>
                    </>
                  )}

                </div>
              );
            })}

          </div>

          {/* Completion */}
          {completed.length === exercises.length && (
            <div className="bg-green-50 rounded-2xl p-5">

              <div className="flex gap-3">

                <CheckCircle2 className="text-green-600" />

                <div>

                  <h2 className="font-bold text-green-700">
                    Reinforcement Complete
                  </h2>

                  <p className="text-gray-600 mt-2">
                    You completed all targeted exercises. Your responses can
                    now be reassessed to determine whether the weak concept
                    has improved enough for more advanced practice.
                  </p>

                  <button
                    type="button"
                    className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                  >
                    Reassess Concept
                  </button>

                </div>

              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
}