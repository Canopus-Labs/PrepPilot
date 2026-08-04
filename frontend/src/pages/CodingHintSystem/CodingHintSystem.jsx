import React, { useState } from "react";
import {
  Brain,
  Code2,
  Lightbulb,
  Clock3,
  Target,
} from "lucide-react";

const CodingHintSystem = () => {

  const [problem] = useState({
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  });

  const [currentHint, setCurrentHint] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Brain
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Coding Interview Hint System

              </h1>

              <p className="text-gray-500 mt-2">

                Get progressive AI hints without revealing
                the complete solution.

              </p>

            </div>

          </div>

        </div>

        {/* Coding Problem */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">

              {problem.title}

            </h2>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

              {problem.difficulty}

            </span>

          </div>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            {problem.description}

          </p>

        </div>

        {/* Progress */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Lightbulb
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              Hints Used

            </h3>

            <p className="text-4xl font-black mt-3">

              {currentHint}/3

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Clock3
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Estimated Time

            </h3>

            <p className="text-4xl font-black mt-3">

              15 min

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              AI Confidence

            </h3>

            <p className="text-4xl font-black mt-3">

              96%

            </p>

          </div>

        </div>
                {/* Progressive Hints */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb
              size={26}
              className="text-yellow-500"
            />

            <h2 className="text-2xl font-bold">
              Progressive AI Hints
            </h2>

          </div>

          {[
            {
              title: "Hint 1",
              hint: "Think about what information you need to remember while scanning the array only once.",
            },
            {
              title: "Hint 2",
              hint: "A Hash Map can help you quickly determine whether the required complement already exists.",
            },
            {
              title: "Hint 3",
              hint: "For each number x, calculate target - x and check if it has already been seen.",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="mb-6 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold">

                    {item.title}

                  </h3>

                  {currentHint > index ? (

                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">

                      {item.hint}

                    </p>

                  ) : (

                    <p className="mt-3 text-gray-400 italic">

                      Hint locked

                    </p>

                  )}

                </div>

                <button
                  disabled={currentHint > index}
                  onClick={() =>
                    currentHint <= index &&
                    setCurrentHint(currentHint + 1)
                  }
                  className={`px-5 py-3 rounded-xl font-semibold transition ${
                    currentHint > index
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-violet-600 hover:bg-violet-700 text-white"
                  }`}
                >

                  {currentHint > index
                    ? "Unlocked"
                    : "Reveal Hint"}

                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Hint Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            Hint Progress

          </h2>

          <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
              style={{
                width: `${(currentHint / 3) * 100}%`,
              }}
            />

          </div>

          <p className="mt-4 text-gray-500">

            {currentHint} of 3 hints revealed

          </p>

        </div>
                {/* Algorithm Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2
              size={26}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              AI Algorithm Suggestions
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "Hash Map",
                description:
                  "Store previously visited values for constant-time lookups.",
              },
              {
                title: "One Pass Traversal",
                description:
                  "Traverse the array only once to achieve optimal performance.",
              },
              {
                title: "Complement Lookup",
                description:
                  "Instead of searching the array repeatedly, calculate the complement and check the map.",
              },
              {
                title: "Avoid Nested Loops",
                description:
                  "A brute-force O(n²) solution is unnecessary for this problem.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition"
              >

                <h3 className="text-xl font-bold mb-3">

                  {item.title}

                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-7">

                  {item.description}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Complexity Hints */}

        <div className="mt-10 grid md:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Time Complexity Hint
            </h2>

            <div className="text-6xl font-black text-violet-600 mb-4">

              O(n)

            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-7">

              Try finding a solution that scans the input only
              once instead of using nested loops.

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Space Complexity Hint
            </h2>

            <div className="text-6xl font-black text-green-600 mb-4">

              O(n)

            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-7">

              Using additional memory can significantly reduce
              execution time for this problem.

            </p>

          </div>

        </div>

        {/* Edge Cases */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Edge Case Reminders
          </h2>

          <div className="space-y-5">

            {[
              "The array may contain duplicate values.",
              "Negative numbers should also be handled correctly.",
              "There is exactly one valid answer.",
              "Do not use the same element twice.",
              "Return indices instead of values.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">

                  !

                </div>

                <p className="leading-7">

                  {item}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Strategy */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            AI Problem Solving Strategy
          </h2>

          <p className="leading-8 text-white/90">

            Before writing code, identify the information you
            need to remember while traversing the array.
            Choose a data structure that enables constant-time
            lookups and avoid unnecessary repeated work.

            Start with a simple approach, then optimize it
            using appropriate algorithms and data structures.

          </p>

        </div>
                {/* AI Coding Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Coding Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Great progress! Instead of immediately revealing the
            solution, the AI gradually guided you toward the optimal
            approach by suggesting the appropriate data structure,
            highlighting important edge cases, and providing
            complexity hints.

            Continue solving problems with minimal hints to
            strengthen your problem-solving skills and improve
            interview confidence.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Think Before You Code 🚀

              </h2>

              <p className="leading-8 text-white/90">

                The best interview candidates don't memorize
                solutions—they understand patterns.

                Use hints only when necessary, practice
                explaining your thought process, and aim
                to solve problems independently.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                💡

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Hint Efficiency

              </h3>

              <p className="text-5xl font-black">

                94%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CodingHintSystem;